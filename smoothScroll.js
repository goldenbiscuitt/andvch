/**
 * SmoothScroller - High-performance smooth scroll & velocity easing engine
 * Features boundary cushioning & deceleration braking so reaching the top (hero section)
 * or the bottom (speak section) smoothly eases up without slamming into the edges.
 */

// Easing functions
export const easings = {
  // Cubic ease-in-out: silky acceleration and deceleration
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // Quartic ease-in-out: deep, velocity-cushioned curve
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,

  // Quintic ease-in-out: feather-soft landing with 5th-order zero jerk at arrival
  easeInOutQuint: (t) =>
    t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2,

  // Exponential ease-out
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
};

export class SmoothScroller {
  constructor(options = {}) {
    this.damping = options.damping ?? 0.082; // Inertial damping factor
    this.wheelMultiplier = options.wheelMultiplier ?? 1.0;
    this.keyboardMultiplier = options.keyboardMultiplier ?? 60;

    // Cushion zone distance in pixels where boundary braking engages (decreased for a lighter, natural feel)
    this.cushionDistance = options.cushionDistance ?? 220;

    this.currentY = window.scrollY;
    this.targetY = window.scrollY;
    this.lastRenderedY = window.scrollY;

    this.isRunning = false;
    this.isAnimating = false;
    this.isProgrammatic = false;
    this.programmaticAnimation = null;

    this.rafId = null;
    this.lastTime = null;

    // Cached layout metrics (avoids forced synchronous layout every frame)
    this._cachedMaxScroll = 0;
    this._cachedHeroY = 0;
    this._heroEl = null;
    this._splashEl = null;
    this._resizeObserver = null;

    // Cached wheel-target scrollability check (avoids DOM getComputedStyle walk on every wheel tick)
    this._lastWheelTarget = null;
    this._lastWheelIsNestedScrollable = false;
    this._lastWheelCheckTime = 0;

    // Check reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Bind methods
    this.onWheel = this.onWheel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onNativeScroll = this.onNativeScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.tick = this.tick.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);

    this.init();
  }

  updateMetrics() {
    this._cachedMaxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    if (!this._heroEl) {
      this._heroEl =
        document.getElementById('hero') ||
        document.querySelector('.hero') ||
        document.querySelector('.project-info');
    }
    if (!this._splashEl) {
      this._splashEl = document.getElementById('splash-screen');
    }

    const splash = this._splashEl;
    const isSplashVisible =
      splash &&
      splash.style.display !== 'none' &&
      !document.documentElement.classList.contains('no-splash') &&
      !document.body.classList.contains('splash-revealed');

    if (isSplashVisible && this._heroEl) {
      const rect = this._heroEl.getBoundingClientRect();
      this._cachedHeroY = Math.max(0, Math.round(window.scrollY + rect.top));
    } else {
      this._cachedHeroY = 0;
    }
  }

  getMaxScroll() {
    return this._cachedMaxScroll;
  }

  /**
   * Top destination is explicitly the "Hi, I'm Arian" hero section (#hero / .hero),
   * never the intro splash animation/video.
   */
  getHeroY() {
    return this._cachedHeroY;
  }

  /**
   * Bottom destination is explicitly the "Speak" section on index.html (#speak),
   * or the last visual project container on project.html.
   */
  getBottomY() {
    // Explicitly target the Speak section on index.html
    const speakEl =
      document.getElementById('speak') ||
      document.querySelector('.speak-section') ||
      document.querySelector('.speak-grid')?.closest('section');

    if (speakEl) {
      const rect = speakEl.getBoundingClientRect();
      const speakTop = window.scrollY + rect.top;
      // Offset slightly (40px) so the Speak section title and header have breathing room
      const targetPos = Math.max(0, Math.round(speakTop - 40));
      return Math.min(this.getMaxScroll(), targetPos);
    }

    // Fallback on project.html: target the last visual element
    const visuals = document.getElementById('project-visuals-container');
    if (visuals && visuals.lastElementChild) {
      const lastVis = visuals.lastElementChild;
      const rect = lastVis.getBoundingClientRect();
      const pos = Math.max(0, Math.round(window.scrollY + rect.top));
      return Math.min(this.getMaxScroll(), pos);
    }

    return this.getMaxScroll();
  }

  init() {
    this.updateMetrics();
    this.syncPosition();

    // Observe document height changes (e.g., expandable sections, dynamic project content)
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this.updateMetrics();
      });
      this._resizeObserver.observe(document.documentElement);
    }

    // Listen for resize to recalculate boundaries
    window.addEventListener('resize', this.onResize, { passive: true });

    // Listen for manual native scroll (scrollbar thumb drag, etc.)
    window.addEventListener('scroll', this.onNativeScroll, { passive: true });

    // Listen to wheel events
    window.addEventListener('wheel', this.onWheel, { passive: false });

    // Listen to keyboard navigation
    window.addEventListener('keydown', this.onKeyDown, { passive: false });

    // Listen to touch start to cancel programmatic scroll on touch
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });

    // Listen to all link clicks for velocity link easing
    document.addEventListener('click', this.onLinkClick, false);

    // Apply smooth-scrolling marker to html
    document.documentElement.classList.add('has-smooth-scroll');

    // Enable scroller (RAF loop runs on-demand only while scrolling)
    if (!this.prefersReducedMotion) {
      this.start();
    }
  }

  syncPosition() {
    this.updateMetrics();
    this.currentY = window.scrollY;
    this.targetY = window.scrollY;
    this.lastRenderedY = window.scrollY;
  }

  _wakeLoop() {
    if (!this.isRunning || this.rafId !== null) return;
    this.isAnimating = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.updateMetrics();
  }

  stop() {
    this.isRunning = false;
    this.isAnimating = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.programmaticAnimation) {
      this.isProgrammatic = false;
      this.programmaticAnimation = null;
    }
  }

  onResize() {
    this.updateMetrics();
    const minScroll = this.getHeroY();
    const maxScroll = this.getMaxScroll();
    this.targetY = Math.max(minScroll, Math.min(this.targetY, maxScroll));
    this.currentY = Math.max(minScroll, Math.min(this.currentY, maxScroll));
  }

  onNativeScroll() {
    // If the scroll position changed from an external source (like dragging the scrollbar),
    // sync our internal coordinates
    const actualScrollY = window.scrollY;
    if (Math.abs(actualScrollY - this.lastRenderedY) > 2 && !this.isProgrammatic) {
      this.currentY = actualScrollY;
      this.targetY = actualScrollY;
      this.lastRenderedY = actualScrollY;
    }
  }

  onTouchStart() {
    // If user touches during programmatic scroll, cancel it smoothly
    if (this.isProgrammatic) {
      this.isProgrammatic = false;
      this.programmaticAnimation = null;
      this.syncPosition();
    }
  }

  onWheel(e) {
    if (!this.isRunning) return;

    // Do not scroll during overlay session or splash screen
    if (
      document.body.classList.contains('session-active') ||
      document.body.classList.contains('splash-active')
    ) {
      return;
    }

    // Respect defaultPrevented from child handlers (e.g. Wish lock, modals)
    if (e.defaultPrevented) return;

    // Allow native scrolling inside nested scrollable elements (cached per target to avoid per-wheel getComputedStyle walk)
    const now = performance.now();
    if (e.target !== this._lastWheelTarget || now - this._lastWheelCheckTime > 250) {
      this._lastWheelTarget = e.target;
      this._lastWheelCheckTime = now;
      this._lastWheelIsNestedScrollable = false;

      let target = e.target;
      while (target && target !== document.body && target !== document.documentElement) {
        if (
          target.hasAttribute &&
          (target.hasAttribute('data-no-smooth-scroll') ||
            target.hasAttribute('data-lenis-prevent'))
        ) {
          this._lastWheelIsNestedScrollable = true;
          break;
        }
        if (target.scrollHeight > target.clientHeight) {
          const style = window.getComputedStyle(target);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            this._lastWheelIsNestedScrollable = true;
            break;
          }
        }
        target = target.parentElement;
      }
    }
    if (this._lastWheelIsNestedScrollable) {
      return;
    }

    // Cancel any ongoing programmatic link scroll so user takes immediate control
    if (this.isProgrammatic) {
      this.isProgrammatic = false;
      this.programmaticAnimation = null;
      this.syncPosition();
    }

    // Normalize wheel delta across browsers and devices
    let delta = e.deltaY;
    if (e.deltaMode === 1) {
      delta *= 24; // Lines
    } else if (e.deltaMode === 2) {
      delta *= window.innerHeight; // Pages
    }

    delta *= this.wheelMultiplier;

    const minScroll = this.getHeroY();
    const maxScroll = this.getMaxScroll();

    // ============================================================
    // BOUNDARY BRAKING & VELOCITY EASING:
    // Light, organic deceleration as we near top or bottom
    // ============================================================
    if (delta < 0) {
      // Scrolling UP towards the hero section
      const distanceToTop = Math.max(0, this.currentY - minScroll);
      if (distanceToTop < this.cushionDistance) {
        const proximity = Math.max(0, distanceToTop / this.cushionDistance);
        const brake = Math.pow(proximity, 0.75);
        delta *= Math.max(0.48, brake);
      }
    } else if (delta > 0) {
      // Scrolling DOWN towards the bottom / Speak section
      const distanceToBottom = Math.max(0, maxScroll - this.currentY);
      if (distanceToBottom < this.cushionDistance) {
        const proximity = Math.max(0, distanceToBottom / this.cushionDistance);
        const brake = Math.pow(proximity, 0.75);
        delta *= Math.max(0.48, brake);
      }
    }

    // Prevent default browser jump to allow RAF velocity interpolation
    e.preventDefault();

    let newTarget = this.targetY + delta;

    // Light elastic resistance at boundaries
    const maxCushion = 10;
    if (newTarget < minScroll) {
      const over = minScroll - newTarget;
      newTarget = minScroll - (1 - Math.exp(-over / 40)) * maxCushion;
    } else if (newTarget > maxScroll) {
      const over = newTarget - maxScroll;
      newTarget = maxScroll + (1 - Math.exp(-over / 40)) * maxCushion;
    }

    this.targetY = newTarget;
    this._wakeLoop();
  }

  onKeyDown(e) {
    if (!this.isRunning) return;
    if (e.defaultPrevented) return;

    if (
      document.body.classList.contains('session-active') ||
      document.body.classList.contains('splash-active')
    ) {
      return;
    }

    // Ignore keyboard if typing in input, textarea, or contenteditable
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable)
    ) {
      return;
    }

    let delta = 0;
    const minScroll = this.getHeroY();
    const maxScroll = this.getMaxScroll();

    switch (e.key) {
      case 'ArrowDown':
        delta = this.keyboardMultiplier;
        break;
      case 'ArrowUp':
        delta = -this.keyboardMultiplier;
        break;
      case 'PageDown':
      case ' ':
        if (!e.shiftKey) {
          delta = window.innerHeight * 0.85;
        } else {
          delta = -window.innerHeight * 0.85;
        }
        break;
      case 'PageUp':
        delta = -window.innerHeight * 0.85;
        break;
      case 'Home':
        e.preventDefault();
        this.scrollTo(this.getHeroY(), {
          duration: 1300,
          easing: easings.easeInOutQuint
        });
        return;
      case 'End':
        e.preventDefault();
        this.scrollTo(this.getBottomY(), {
          duration: 1300,
          easing: easings.easeInOutQuint
        });
        return;
      default:
        return;
    }

    if (delta !== 0) {
      e.preventDefault();
      if (this.isProgrammatic) {
        this.isProgrammatic = false;
        this.programmaticAnimation = null;
        this.syncPosition();
      }

      // Apply boundary braking to keyboard scroll as well
      if (delta < 0) {
        const distanceToTop = Math.max(0, this.currentY - minScroll);
        if (distanceToTop < this.cushionDistance) {
          const proximity = Math.max(0, distanceToTop / this.cushionDistance);
          delta *= Math.max(0.48, Math.pow(proximity, 0.75));
        }
      } else if (delta > 0) {
        const distanceToBottom = Math.max(0, maxScroll - this.currentY);
        if (distanceToBottom < this.cushionDistance) {
          const proximity = Math.max(0, distanceToBottom / this.cushionDistance);
          delta *= Math.max(0.48, Math.pow(proximity, 0.75));
        }
      }

      this.targetY = Math.max(minScroll, Math.min(this.targetY + delta, maxScroll));
      this._wakeLoop();
    }
  }

  tick(time) {
    if (!this.isRunning) {
      this.rafId = null;
      this.isAnimating = false;
      return;
    }

    if (!this.lastTime) this.lastTime = time;
    const dt = Math.min(100, time - this.lastTime) / 1000;
    this.lastTime = time;

    const minScroll = this.getHeroY();
    const maxScroll = this.getMaxScroll();
    let needsNextFrame = false;

    if (this.isProgrammatic && this.programmaticAnimation) {
      const anim = this.programmaticAnimation;
      const elapsed = time - anim.startTime;
      const progress = Math.min(1, Math.max(0, elapsed / anim.duration));
      const easedProgress = anim.easing(progress);

      this.currentY = anim.startY + anim.distance * easedProgress;
      this.targetY = this.currentY;

      const roundedY = Math.round(this.currentY * 100) / 100;
      this.lastRenderedY = roundedY;
      window.scrollTo(0, roundedY);

      if (progress >= 1) {
        this.isProgrammatic = false;
        this.programmaticAnimation = null;
        this.currentY = anim.targetY;
        this.targetY = anim.targetY;
        this.lastRenderedY = anim.targetY;
        window.scrollTo(0, anim.targetY);
        if (anim.onComplete) anim.onComplete();
      } else {
        needsNextFrame = true;
      }
    } else {
      // 1. Soft Elastic Rebound: If targetY was pushed slightly into the edge cushion,
      // smoothly ease it back to the resting boundary
      if (this.targetY < minScroll) {
        this.targetY += (minScroll - this.targetY) * 0.12;
        if (Math.abs(minScroll - this.targetY) < 0.2) {
          this.targetY = minScroll;
        } else {
          needsNextFrame = true;
        }
      } else if (this.targetY > maxScroll) {
        this.targetY += (maxScroll - this.targetY) * 0.12;
        if (Math.abs(maxScroll - this.targetY) < 0.2) {
          this.targetY = maxScroll;
        } else {
          needsNextFrame = true;
        }
      }

      const diff = this.targetY - this.currentY;

      if (Math.abs(diff) > 0.05) {
        // Dynamic Damping Near Boundaries:
        // Soften damping as we get close to the edges so the velocity curve
        // gracefully flattens into 0 without a harsh stop.
        let effectiveDamping = this.damping;

        const distanceToTop = Math.max(0, this.currentY - minScroll);
        const distanceToBottom = Math.max(0, maxScroll - this.currentY);

        if (distanceToTop < 150 && diff < 0) {
          const factor = Math.max(0.82, distanceToTop / 150);
          effectiveDamping *= factor;
        } else if (distanceToBottom < 150 && diff > 0) {
          const factor = Math.max(0.82, distanceToBottom / 150);
          effectiveDamping *= factor;
        }

        const lerpFactor = 1 - Math.pow(1 - effectiveDamping, dt * 60);
        this.currentY += diff * lerpFactor;

        // Gentle resting snap when fully stopped at boundary
        if (Math.abs(this.currentY - minScroll) < 0.25 && Math.abs(this.targetY - minScroll) < 0.3) {
          this.currentY = minScroll;
          this.targetY = minScroll;
        } else if (Math.abs(this.currentY - maxScroll) < 0.25 && Math.abs(this.targetY - maxScroll) < 0.3) {
          this.currentY = maxScroll;
          this.targetY = maxScroll;
        } else {
          needsNextFrame = true;
        }

        const roundedY = Math.round(this.currentY * 100) / 100;
        this.lastRenderedY = roundedY;
        window.scrollTo(0, roundedY);
      } else if (this.currentY !== this.targetY) {
        this.currentY = this.targetY;
        this.lastRenderedY = this.targetY;
        window.scrollTo(0, this.targetY);
      }
    }

    if (needsNextFrame) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
      this.isAnimating = false;
    }
  }

  /**
   * Programmatically scroll to target with tailored quintic velocity easing
   * @param {number|string|HTMLElement} target - Scroll position, CSS selector, or Element
   * @param {Object} options - { duration, easing, offset, onComplete, immediate }
   */
  scrollTo(target, options = {}) {
    let targetY = 0;
    const maxScroll = this.getMaxScroll();
    let chosenEasing = options.easing ?? easings.easeInOutQuint;

    if (typeof target === 'number') {
      targetY = target;
    } else if (typeof target === 'string') {
      if (
        target === '#' ||
        target === '#top' ||
        target === '#hero' ||
        target === '.hero' ||
        target === '.back-to-top'
      ) {
        // Specifically the "Hi, I'm Arian" hero section
        targetY = this.getHeroY();
        if (!options.easing) chosenEasing = easings.easeInOutQuint;
      } else if (
        target === '#speak' ||
        target === '#bottom' ||
        target === '#last-section' ||
        target === '#footer' ||
        target === '.speak-section'
      ) {
        // Specifically the "Speak" section
        targetY = this.getBottomY();
        if (!options.easing) chosenEasing = easings.easeInOutQuint;
      } else {
        const el = document.querySelector(target);
        if (el) {
          if (el.id === 'hero' || el.classList.contains('hero')) {
            targetY = this.getHeroY();
            if (!options.easing) chosenEasing = easings.easeInOutQuint;
          } else if (el.id === 'speak' || el.classList.contains('speak-section')) {
            targetY = this.getBottomY();
            if (!options.easing) chosenEasing = easings.easeInOutQuint;
          } else {
            const rect = el.getBoundingClientRect();
            targetY = window.scrollY + rect.top;
          }
        } else {
          return;
        }
      }
    } else if (target instanceof HTMLElement) {
      if (target.id === 'hero' || target.classList.contains('hero')) {
        targetY = this.getHeroY();
        if (!options.easing) chosenEasing = easings.easeInOutQuint;
      } else if (target.id === 'speak' || target.classList.contains('speak-section')) {
        targetY = this.getBottomY();
        if (!options.easing) chosenEasing = easings.easeInOutQuint;
      } else {
        const rect = target.getBoundingClientRect();
        targetY = window.scrollY + rect.top;
      }
    }

    if (options.offset) {
      targetY += options.offset;
    }

    targetY = Math.max(0, Math.min(targetY, maxScroll));

    if (options.immediate || this.prefersReducedMotion) {
      if (this.programmaticAnimation) {
        this.isProgrammatic = false;
        this.programmaticAnimation = null;
      }
      this.currentY = targetY;
      this.targetY = targetY;
      this.lastRenderedY = targetY;
      window.scrollTo(0, targetY);
      if (options.onComplete) options.onComplete();
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;

    // If already at target, finish immediately
    if (Math.abs(distance) < 1) {
      this.syncPosition();
      if (options.onComplete) options.onComplete();
      return;
    }

    // Dynamic velocity duration based on travel distance with graceful bounds (800ms - 1500ms)
    const duration =
      options.duration ??
      Math.min(1500, Math.max(800, 600 + Math.sqrt(Math.abs(distance)) * 18));

    this.isProgrammatic = true;
    this.programmaticAnimation = {
      startY,
      targetY,
      distance,
      duration,
      easing: chosenEasing,
      startTime: performance.now(),
      onComplete: options.onComplete
    };

    if (!this.isRunning) {
      this.start();
    }
    this._wakeLoop();
  }

  /**
   * Intercept link clicks and apply velocity easing to the "Hi, I'm Arian" hero section,
   * the "Speak" bottom section, or other in-page anchors
   */
  onLinkClick(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const isBackToTop =
      link.classList.contains('back-to-top') ||
      link.getAttribute('aria-label') === 'Back to top';

    const href = link.getAttribute('href');

    // Handle back-to-top: velocity easing to the "Hi, I'm Arian" hero section
    if (isBackToTop || href === '#' || href === '#hero' || href === '#top') {
      if (href && !href.startsWith('#') && href !== '') return;

      e.preventDefault();

      this.scrollTo(this.getHeroY(), {
        duration: 1300,
        easing: easings.easeInOutQuint
      });
      return;
    }

    // Handle links to the "Speak" section / bottom
    if (
      href === '#speak' ||
      href === '#last-section' ||
      href === '#footer' ||
      href === '#bottom' ||
      link.classList.contains('to-last-section') ||
      link.classList.contains('to-speak')
    ) {
      e.preventDefault();

      this.scrollTo(this.getBottomY(), {
        duration: 1300,
        easing: easings.easeInOutQuint
      });
      return;
    }

    // Handle other in-page hash links (e.g. #projects, #write, #play)
    if (href && href.startsWith('#') && href.length > 1) {
      if (link.id === 'hero-say-hi') {
        return;
      }

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();

        const isHero =
          targetEl.classList.contains('hero') ||
          targetEl.classList.contains('project-info') ||
          targetEl.id === 'hero';

        const isSpeak =
          targetEl.classList.contains('speak-section') ||
          targetEl.id === 'speak';

        const chosenEasing =
          isHero || isSpeak ? easings.easeInOutQuint : easings.easeInOutCubic;

        const duration = isHero || isSpeak ? 1300 : 1000;

        this.scrollTo(targetEl, {
          duration,
          easing: chosenEasing
        });
      }
    }
  }

  destroy() {
    this.stop();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onNativeScroll);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('click', this.onLinkClick, false);
    document.documentElement.classList.remove('has-smooth-scroll');
  }
}

/**
 * Initialize SmoothScroller singleton and attach to window
 */
export function initSmoothScroll(options = {}) {
  if (typeof window === 'undefined') return null;

  if (window.smoothScroller) {
    return window.smoothScroller;
  }

  const scroller = new SmoothScroller(options);
  window.smoothScroller = scroller;

  // Lenis-compatible API wrapper for developer ergonomics
  window.lenis = {
    start: () => scroller.start(),
    stop: () => scroller.stop(),
    scrollTo: (target, opts) => scroller.scrollTo(target, opts),
    destroy: () => scroller.destroy(),
    get scroll() {
      return scroller.currentY;
    }
  };

  return scroller;
}
