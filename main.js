// import './style.css';
import { initChromaGame } from './projects/chromaGame.js';
import { projects } from './projects/index.js';
import { initTypeSpeedGame } from './projects/typeSpeedGame.js';

// Console Easter Egg for inspect element visitors
console.log(
  '%c👀 Woah there, inspect element detective!',
  'font-family: monospace; font-size: 16px; font-weight: bold; color: #ff5555; background: #1e1e2e; padding: 8px 14px; border-radius: 6px;'
);
console.log(
  '%cWhat are you doing here... you tryna hack me or something? 🤨\nJust kidding! Feel free to look around the code. If you find any cool bugs or have ideas, reach out! 🚀',
  'font-family: sans-serif; font-size: 13px; color: #a6adc8; line-height: 1.6; padding-top: 4px;'
);

// Trigger page fade-in on load
document.body.classList.add('fade-in');

const navigateWithFade = (e, targetUrl) => {
  if (e && e.preventDefault) e.preventDefault();
  document.body.classList.remove('fade-in');
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 400); // Wait for the transition to finish
};

// Hook up all home navigation links to fade transition
document.querySelectorAll('a[href="index.html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    navigateWithFade(e, link.href);
  });
});



// Hard refresh keydown listener (to persist splash screen trigger)
window.addEventListener('keydown', (e) => {
  const isR = e.key === 'r' || e.key === 'R' || e.keyCode === 82 || e.code === 'KeyR';
  const isF5 = e.key === 'F5' || e.keyCode === 116 || e.code === 'F5';
  const hasModifier = e.ctrlKey || e.metaKey || e.shiftKey;
  if (((e.ctrlKey || e.metaKey) && e.shiftKey && isR) || (isF5 && hasModifier)) {
    try {
      sessionStorage.setItem('hard_refresh_triggered', 'true');
      localStorage.removeItem('intro_shown');
    } catch (err) {}
  }
});

// Preload all main page assets (images, videos, fonts) during the splash sequence
function preloadMainPageAssets() {
  if (document.fonts) {
    document.fonts.ready.then(() => {
      // Fonts warm-loaded
    });
  }

  // Preload all document images
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const pImg = new Image();
      pImg.src = src;
    }
  });

  // Preload background images
  const bgUrls = ['assets/img/play_bg.png'];
  bgUrls.forEach(url => {
    const pImg = new Image();
    pImg.src = url;
  });

  // Preload and buffer all inline videos
  const videos = document.querySelectorAll('video[src]');
  videos.forEach(video => {
    video.preload = 'auto';
    video.load();
  });
}

// Splash Screen Controller
const splashScreen = document.getElementById('splash-screen');
let hasIntroBeenShown = false;
let isHardRefresh = false;

try {
  hasIntroBeenShown = localStorage.getItem('intro_shown') === 'true';
  isHardRefresh = sessionStorage.getItem('hard_refresh_triggered') === 'true';
  sessionStorage.removeItem('hard_refresh_triggered');
} catch (err) {}

// Show intro only if it hasn't been shown yet in localStorage OR if a hard refresh was triggered
const shouldShowIntro = !hasIntroBeenShown || isHardRefresh;

if (splashScreen) {
  if (shouldShowIntro) {
    try {
      localStorage.setItem('intro_shown', 'true');
    } catch (err) {}

    // Preload all page assets immediately while intro animation plays
    preloadMainPageAssets();

    // Prevent browser from restoring scroll position on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Exactly 3.2 seconds (3200ms) animation duration before auto-scrolling down to hero
    setTimeout(() => {
      // Unlock body scroll and enable main content
      document.body.classList.remove('splash-active');
      document.body.classList.add('splash-revealed');

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Perform real window scroll animation down the document timeline to hero section (100vh)
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      const finalizeSplash = () => {
        // Remove splash screen element from DOM so user CANNOT scroll back up to it
        splashScreen.style.display = 'none';
        splashScreen.remove();
        // Lock hero section as top of page (scrollTop = 0)
        window.scrollTo(0, 0);
      };

      if (prefersReducedMotion) {
        finalizeSplash();
      } else {
        let finalized = false;
        const handleScrollEnd = () => {
          if (!finalized) {
            finalized = true;
            finalizeSplash();
            window.removeEventListener('scrollend', handleScrollEnd);
          }
        };
        window.addEventListener('scrollend', handleScrollEnd);

        // Fallback timeout in case scrollend is unsupported or delayed
        setTimeout(() => {
          if (!finalized) {
            finalized = true;
            finalizeSplash();
            window.removeEventListener('scrollend', handleScrollEnd);
          }
        }, 1200);
      }
    }, 3200); // 3.2 seconds
  } else {
    // Skip intro animation when intro has already been shown and not hard refreshed
    preloadMainPageAssets();
    document.body.classList.remove('splash-active');
    document.body.classList.add('splash-revealed');
    splashScreen.style.display = 'none';
    splashScreen.remove();
    window.scrollTo(0, 0);
  }
}


// Disable right-click globally on all pages
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Simple in-code database (array) to collect "say hi" messages
const messageDatabase = [];

const greetings = [
  "bonjour.",
  "hola.",
  "nǐ hǎo.",
  "ciao.",
  "hallo.",
  "olá.",
  "namaste.",
  "salaam.",
  "hey.",
  "hi."
];

let currentIndex = 0;
const greetingElement = document.getElementById('greeting');
let isTransitioning = false;

const overlayTexts = ["view", "explore", "details", "process", "case"];
const denseCards = document.querySelectorAll('.dense-card');

denseCards.forEach(card => {
  // Skip adding hover overlays for no-hover cards
  if (!card.classList.contains('no-hover')) {
    // Special custom overlay for Item 15 (c-watch)
    if (card.classList.contains('c-watch')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay watch-overlay';
      overlay.innerHTML = `<span class="overlay-text watch-overlay-text">ai personal contextualization <br/> (coming soon)</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-smart')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">PesoOS (soon)</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-orb')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">experiments (soon)</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-car')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">time experiment (soon)</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-voice')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">FSL translator</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-wish')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">wish app concept</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-wallpaper')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">wavy fabric</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-directory-app')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">Map Project</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-m')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">mindful editor fork (soon)</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-g')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">play a mini game?</span>`;
      card.appendChild(overlay);
    } else if (card.classList.contains('c-green')) {
      card.classList.add('has-overlay');
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `<span class="overlay-text" style="text-transform: none;">google watch concept (soon)</span>`;
      card.appendChild(overlay);
    } else {
      // Use a simple hash of the card content/classes to decide if it has an overlay (more consistent than random)
      const shouldHaveOverlay = (card.className.length % 2 === 0);

      if (shouldHaveOverlay) {
        card.classList.add('has-overlay');
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';

        // Pick random text
        const text = overlayTexts[Math.floor(Math.random() * overlayTexts.length)];
        overlay.innerHTML = `<span class="overlay-text">${text}</span>`;
        card.appendChild(overlay);
      }
    }
  }

  // Handle navigation
  card.addEventListener('click', (e) => {
    if (card.classList.contains('non-clickable')) {
      return;
    }
    const projectId = card.getAttribute('data-project-id');
    const targetUrl = projectId ? `project.html?id=${projectId}` : 'project.html';
    navigateWithFade(e, targetUrl);
  });
});

// Dynamic Projects page logic
const projectTitleEl = document.getElementById('project-title');
const projectDescEl = document.getElementById('project-description');
const projectVisualsContainer = document.getElementById('project-visuals-container');
const prevProjectLink = document.getElementById('prev-project');
const nextProjectLink = document.getElementById('next-project');

if (projectTitleEl) {
  // We are on project.html!
  let isLocked = false;
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'wish'; // Fallback to first project

  // Find project in the database
  let projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) {
    projectIndex = 0; // fallback to first project
  }

  const currentProject = projects[projectIndex];

  // Update Title & Description
  const projectInfoEl = document.querySelector('.project-info');
  const projectMainEl = document.querySelector('.project-main');
  if (!currentProject.title && !currentProject.titleHtml && !currentProject.description) {
    if (projectInfoEl) projectInfoEl.style.display = 'none';
    if (projectMainEl) projectMainEl.style.marginTop = '14vh';
  } else {
    if (projectInfoEl) projectInfoEl.style.display = '';
    if (projectMainEl) projectMainEl.style.marginTop = '';
    if (currentProject.titleHtml) {
      projectTitleEl.innerHTML = currentProject.titleHtml;
    } else {
      projectTitleEl.textContent = currentProject.title;
    }
    projectDescEl.textContent = currentProject.description;
  }

  // Update Visuals
  if (projectVisualsContainer) {
    projectVisualsContainer.innerHTML = currentProject.visuals;

    // Initialize Mini Games if present
    if (document.getElementById('chroma-game-container')) {
      document.body.classList.add('chroma-active');
      initChromaGame();
    } else if (document.getElementById('type-speed-game-container')) {
      document.body.classList.add('chroma-active');
      initTypeSpeedGame();
    } else {
      document.body.classList.remove('chroma-active');
    }

    // Scroll reveal animation for Map Project and Wish mobile mockups
    const mocksContainer = projectVisualsContainer.querySelector('.p-vis-directory-mocks, .p-vis-wish-mocks');
    if (mocksContainer) {
      const mocks = mocksContainer.querySelectorAll('.mobile-mock-reveal');

      const handleScrollReveal = () => {
        const isDesktop = window.innerWidth > 768;

        if (isDesktop) {
          const rect = mocksContainer.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementHeight = rect.height;
          const viewportHeight = window.innerHeight;
          const totalHeight = document.documentElement.scrollHeight;
          const maxScrollY = totalHeight - viewportHeight;

          // If the mockup container starts above the fold, animate from scroll 0 and complete early
          const startY = elementTop < viewportHeight ? 0 : elementTop - viewportHeight;
          const endY = elementTop < viewportHeight
            ? Math.max(startY + 10, Math.min(maxScrollY, elementTop - viewportHeight * 0.2))
            : maxScrollY;

          let progress = 0;
          if (endY > startY) {
            progress = (window.scrollY - startY) / (endY - startY);
          } else {
            progress = 1;
          }
          progress = Math.max(0, Math.min(1, progress));

          // Stagger ranges:
          // Mock 1: 0.0 -> 0.6
          // Mock 2: 0.2 -> 0.8
          // Mock 3: 0.4 -> 1.0
          mocks.forEach((mock, index) => {
            const startRange = 0.0 + index * 0.2;
            const endRange = 0.6 + index * 0.2;

            let p = 0;
            if (progress < startRange) {
              p = 0;
            } else if (progress > endRange) {
              p = 1;
            } else {
              p = (progress - startRange) / (endRange - startRange);
            }

            mock.style.opacity = p;
            mock.style.transform = `translateX(${(1 - p) * -30}px)`;
          });
        } else {
          // Mobile: animate each mockup individually based on its own scroll position
          mocks.forEach((mock) => {
            const rect = mock.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;
            const maxScrollY = totalHeight - viewportHeight;

            const startY = elementTop < viewportHeight ? 0 : elementTop - viewportHeight;
            const endY = elementTop < viewportHeight
              ? Math.max(startY + 10, Math.min(maxScrollY, elementTop + elementHeight - viewportHeight * 0.3))
              : Math.min(maxScrollY, elementTop + elementHeight - viewportHeight * 0.3);

            let progress = 0;
            if (endY > startY) {
              progress = (window.scrollY - startY) / (endY - startY);
            } else {
              progress = 1;
            }
            progress = Math.max(0, Math.min(1, progress));

            mock.style.opacity = progress;
            mock.style.transform = `translateX(${(1 - progress) * -30}px)`;
          });
        }
      };

      // Run once on load/init
      handleScrollReveal();

      // Listen to scroll and resize events
      window.addEventListener('scroll', handleScrollReveal, { passive: true });
      window.addEventListener('resize', handleScrollReveal, { passive: true });
    }

    // Wish logo side-by-side scroll reveal animation
    const wishLogoContainer = projectVisualsContainer.querySelector('.p-vis-wish-1');
    if (wishLogoContainer) {
      const logo = wishLogoContainer.querySelector('.wish-logo-container');
      const content = wishLogoContainer.querySelector('.wish-reveal-content');
      const titleEl = wishLogoContainer.querySelector('.wish-reveal-title');
      const descEl = wishLogoContainer.querySelector('.wish-reveal-desc');
      const btnGroup = wishLogoContainer.querySelector('.wish-btn-group');

      const titleText = "Treat yourself to good music.";
      let typingTimer = null;
      let hasTriggeredTypewriter = false;
      let animationFinished = false;
      let isAnimating = false;
      let lastTouchY = 0;
      let activeMiddleScrollY = 0;

      // Initialize text and transitions so they don't flash before trigger
      if (titleEl) titleEl.textContent = "";
      if (descEl) {
        descEl.style.opacity = "0";
        descEl.style.transform = "translateY(10px)";
      }
      if (btnGroup) {
        btnGroup.style.opacity = "0";
        btnGroup.style.transform = "translateY(10px)";
      }

      const updateShiftX = () => {
        if (logo && wishLogoContainer) {
          const containerWidth = wishLogoContainer.offsetWidth;
          const logoWidth = logo.offsetWidth;
          const logoLeft = logo.offsetLeft;
          const shiftX = (containerWidth / 2) - (logoLeft + logoWidth / 2);
          wishLogoContainer.style.setProperty('--shift-x', `${shiftX}px`);
        }
      };

      const runTypewriter = (isDesktop) => {
        if (typingTimer) clearInterval(typingTimer);

        titleEl.textContent = "";
        titleEl.classList.add('typing');
        descEl.style.opacity = "0";
        descEl.style.transform = "translateY(10px)";
        btnGroup.style.opacity = "0";
        btnGroup.style.transform = "translateY(10px)";

        let index = 0;
        typingTimer = setInterval(() => {
          if (index < titleText.length) {
            titleEl.textContent += titleText[index];
            index++;
          } else {
            clearInterval(typingTimer);
            titleEl.classList.remove('typing');

            // Reveal description
            descEl.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            descEl.style.opacity = "1";
            descEl.style.transform = "translateY(0)";

            // Reveal buttons shortly after description
            setTimeout(() => {
              if (!isAnimating && isDesktop) return;
              btnGroup.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              btnGroup.style.opacity = "1";
              btnGroup.style.transform = "translateY(0)";

              // Once buttons are fully revealed, unlock scroll!
              setTimeout(() => {
                if (!isAnimating && isDesktop) return;
                animationFinished = true;
                if (isDesktop) {
                  unlockScroll();
                }
              }, 600);
            }, 300);
          }
        }, 50);
      };

      const resetTypewriter = () => {
        if (typingTimer) clearInterval(typingTimer);
        titleEl.textContent = "";
        titleEl.classList.remove('typing');
        descEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        descEl.style.opacity = "0";
        descEl.style.transform = "translateY(10px)";
        btnGroup.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        btnGroup.style.opacity = "0";
        btnGroup.style.transform = "translateY(10px)";
      };

      const handleWheel = (e) => {
        if (isLocked) {
          if (e.deltaY > 0) {
            e.preventDefault();
          } else {
            // Scrolling up - release lock immediately
            unlockScroll();
          }
        }
      };

      const handleTouchStart = (e) => {
        if (e.touches && e.touches[0]) {
          lastTouchY = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e) => {
        if (isLocked && e.touches && e.touches[0]) {
          const currentTouchY = e.touches[0].clientY;
          const deltaY = lastTouchY - currentTouchY; // Positive when scrolling down

          if (deltaY > 0) {
            e.preventDefault();
          } else {
            unlockScroll();
          }
          lastTouchY = currentTouchY;
        }
      };

      const handleKeyDown = (e) => {
        if (isLocked) {
          const keysToPrevent = [32, 34, 40]; // Space, PageDown, ArrowDown
          if (keysToPrevent.includes(e.keyCode)) {
            e.preventDefault();
          }
        }
      };

      const unlockScroll = () => {
        isLocked = false;
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', handleKeyDown);
      };

      const resetSequence = () => {
        animationFinished = false;
        isAnimating = false;
        unlockScroll();

        // Remove class to slide logo back to center
        wishLogoContainer.classList.remove('slid-left');

        resetTypewriter();
      };

      const triggerSequence = () => {
        // Slide logo to left
        wishLogoContainer.classList.add('slid-left');

        // Wait for slide transition (600ms) to complete before typing
        setTimeout(() => {
          if (!isAnimating) return; // Guard if reset in between
          runTypewriter(true);
        }, 600);
      };

      const handleWishLogoReveal = () => {
        const isDesktop = window.innerWidth > 768;
        const currentScrollY = window.scrollY;

        // Compute middle scroll position
        const rect = wishLogoContainer.getBoundingClientRect();
        const elementTop = rect.top + currentScrollY;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const middleScrollY = elementTop + elementHeight / 2 - viewportHeight / 2;

        if (isDesktop && logo && content) {
          activeMiddleScrollY = middleScrollY;

          // If scroll reaches the middle, lock it and trigger sequence
          if (currentScrollY >= middleScrollY && !animationFinished) {
            if (!isLocked) {
              isLocked = true;
              window.scrollTo({
                top: middleScrollY,
                behavior: 'smooth'
              });
              window.addEventListener('wheel', handleWheel, { passive: false });
              window.addEventListener('touchstart', handleTouchStart, { passive: true });
              window.addEventListener('touchmove', handleTouchMove, { passive: false });
              window.addEventListener('keydown', handleKeyDown, { passive: false });
            }

            if (!isAnimating) {
              isAnimating = true;
              triggerSequence();
            }
          }

          // If scrolled up past the middle, reset everything
          if (currentScrollY < middleScrollY - 80) {
            if (animationFinished || isAnimating) {
              resetSequence();
            }
          }
        } else if (logo && content) {
          // Mobile: logo stays centered, trigger typewriter when scrolled into view
          logo.style.transform = 'none';
          isAnimating = true;

          if (currentScrollY > middleScrollY) {
            if (!hasTriggeredTypewriter) {
              hasTriggeredTypewriter = true;
              runTypewriter(false);
            }
          } else {
            if (hasTriggeredTypewriter) {
              hasTriggeredTypewriter = false;
              resetTypewriter();
            }
          }
        }
      };

      // Run once on load/init
      updateShiftX();
      handleWishLogoReveal();

      // Listen to scroll and resize events
      window.addEventListener('scroll', handleWishLogoReveal, { passive: true });
      window.addEventListener('resize', () => {
        updateShiftX();
        handleWishLogoReveal();
      }, { passive: true });
    }
  }

  // Set up pagination (looping, skipping non-clickable projects)
  const nonClickableProjectIds = ['orb', 'medium', 'e', 'grad', 'g', 'ambient', '32', 'watch', 'smart', 'car', 'm', 'yellow', 'green'];
  const clickableProjects = projects.filter(p => !nonClickableProjectIds.includes(p.id));

  let clickableIndex = clickableProjects.findIndex(p => p.id === currentProject.id);
  if (clickableIndex === -1) {
    clickableIndex = 0;
  }

  const prevProject = clickableProjects[(clickableIndex - 1 + clickableProjects.length) % clickableProjects.length];
  const nextProject = clickableProjects[(clickableIndex + 1) % clickableProjects.length];



  const isMiniGamePage = currentProject && (currentProject.id === 'andvch' || currentProject.id === 'type-speed');

  if (prevProjectLink) {
    if (isMiniGamePage) {
      prevProjectLink.style.display = 'none';
    } else {
      prevProjectLink.href = `project.html?id=${prevProject.id}`;
      prevProjectLink.addEventListener('click', (e) => navigateWithFade(e, prevProjectLink.href));
    }
  }
  if (nextProjectLink) {
    if (isMiniGamePage) {
      nextProjectLink.style.display = 'none';
    } else {
      nextProjectLink.href = `project.html?id=${nextProject.id}`;
      nextProjectLink.addEventListener('click', (e) => navigateWithFade(e, nextProjectLink.href));
    }
  }

  // Hide/Show Header on Scroll
  const projectHeader = document.querySelector('.project-header');

  if (projectHeader) {
    const handleHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      // If at the very top, keep header visible
      if (currentScrollY <= 0) {
        projectHeader.classList.remove('header-hidden');
      } else {
        // Otherwise, hide header
        projectHeader.classList.add('header-hidden');
      }
    };

    // Run once on load/init
    handleHeaderVisibility();

    window.addEventListener('scroll', handleHeaderVisibility, { passive: true });
  }
}

function changeGreeting() {
  if (!greetingElement || isTransitioning) return;
  isTransitioning = true;

  // Fade out
  greetingElement.style.opacity = '0';
  greetingElement.style.transform = 'translateY(5px)';

  setTimeout(() => {
    // Update text
    currentIndex = (currentIndex + 1) % greetings.length;
    greetingElement.textContent = greetings[currentIndex];

    // Quick pop in animation
    greetingElement.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    greetingElement.style.opacity = '1';
    greetingElement.style.transform = 'translateY(0)';

    setTimeout(() => {
      isTransitioning = false;
      // Reset transition for next fade out
      greetingElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    }, 500);

  }, 400); // Wait for fade out to complete
}

// Initial setup
if (greetingElement) {
  greetingElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  setInterval(changeGreeting, 3500);
}

// Simple scroll reveal animations for project cards
// Leveraging IntersectionObserver for performance
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add a slight delay based on the DOM order if they appear together
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Clean up transform/transition after animation to remove stacking context trap
      setTimeout(() => {
        if (entry.target.style) {
          entry.target.style.transform = 'none';
          entry.target.style.transition = 'none';
        }
      }, 1000);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize state
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  // Stagger effect
  const delay = (index % 4) * 0.1;
  card.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}s`;
  observer.observe(card);
});

document.querySelectorAll('.list-section').forEach((section, index) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = `opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s`;
  observer.observe(section);
});

// Custom Cursor Logic
const customCursor = document.getElementById('custom-cursor');
let cursorTransitionTimeout;
let lastMouseX = 0;
let lastMouseY = 0;
let activeCard = null;

if (customCursor) {
  customCursor.classList.remove('card-mode', 'absorbed-active', 'text-mode', 'explore-hover', 'say-hi-hover', 'wish-btn-hover');
  customCursor.style.width = '32px';
  customCursor.style.height = '32px';
  customCursor.style.borderRadius = '50%';
}

// Helper to update custom cursor text mode (| orange line cursor) for selectable texts
function updateCursorTextMode(target) {
  if (!customCursor || customCursor.classList.contains('card-mode')) return;

  // Exclude magnetic elements and their children from drawing text cursor
  const inMagneticElement = target.closest('.interaction-card, .magnetic-link');
  if (inMagneticElement) {
    customCursor.classList.remove('text-mode');
    customCursor.style.height = '';
    return;
  }

  const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'TEXTAREA', 'INPUT', 'LABEL', 'LI', 'MARK', 'CODE', 'B', 'STRONG', 'I', 'EM'];
  const isTextTag = textTags.includes(target.tagName);
  const isDirectTextDiv = target.tagName === 'DIV' && target.children.length === 0 && target.textContent.trim().length > 0;
  const isSpecialText = (
    target.classList.contains('spec-label') ||
    target.classList.contains('spec-size') ||
    target.classList.contains('hero-title') ||
    target.classList.contains('hero-subtitle') ||
    target.classList.contains('section-title') ||
    target.classList.contains('overlay-text')
  );

  const isTextElement = (isTextTag || isDirectTextDiv || isSpecialText) &&
    !target.closest('.project-card.placeholder-1') &&
    !target.closest('.color-spheres-container');

  if (isTextElement) {
    const computedStyle = window.getComputedStyle(target);
    if (computedStyle.display === 'none') {
      customCursor.classList.remove('text-mode');
      customCursor.style.height = '';
      return;
    }

    let fontSize = parseFloat(computedStyle.fontSize) || 16;
    let lineHeight = parseFloat(computedStyle.lineHeight);
    let h = (!isNaN(lineHeight) && computedStyle.lineHeight !== 'normal') ? lineHeight : fontSize * 1.25;
    h = Math.max(14, Math.min(70, h));

    customCursor.classList.add('text-mode');
    customCursor.style.height = `${h}px`;
  } else {
    customCursor.classList.remove('text-mode');
    customCursor.style.height = '';
  }
}

window.addEventListener('mousemove', (e) => {
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  if (customCursor) {
    if (!activeCard && customCursor.classList.contains('card-mode')) {
      customCursor.classList.remove('card-mode');
      customCursor.style.width = '32px';
      customCursor.style.height = '32px';
      customCursor.style.borderRadius = '50%';
    }

    if (!customCursor.classList.contains('card-mode')) {
      customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      updateCursorTextMode(e.target);
    }
  }
});

// Helper to get inner elements that should receive subtle magnetic dragging effect
function getInnerMagneticElements(card) {
  return card.querySelectorAll(
    ':scope > *:not(.absorbed-card):not(.absorbed-pill):not(.btn-bg):not(.card-bg):not(.draft-overlay)'
  );
}

// Helper to absorb custom cursor into card with physical scaling animation
function absorbCursor(card, clientX, clientY) {
  activeCard = card;
  card.classList.add('is-absorbed');

  // Get card dimensions and center
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const cardStyle = window.getComputedStyle(card);
  const borderRadius = cardStyle.borderRadius || '24px';

  // Outer container stays strictly contained / locked in place
  card.style.transition = 'transform 0.3s ease';
  card.style.transform = 'translate(0px, 0px)';

  if (customCursor) {
    customCursor.classList.remove('text-mode');
    customCursor.style.backgroundColor = '#282833';

    // If customCursor is not in card-mode yet, initialize its position at exact entry point as 32px circle
    if (!customCursor.classList.contains('card-mode')) {
      customCursor.style.transition = 'none';
      customCursor.style.width = '32px';
      customCursor.style.height = '32px';
      customCursor.style.borderRadius = '50%';
      customCursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;

      // Force browser reflow to register starting state
      void customCursor.offsetHeight;

      customCursor.classList.add('card-mode');
    }

    // Smoothly expand customCursor to match stationary card size, border radius, and center position
    customCursor.style.transition = `
      width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.3s ease
    `;
    customCursor.style.width = `${rect.width}px`;
    customCursor.style.height = `${rect.height}px`;
    customCursor.style.borderRadius = borderRadius;
    customCursor.style.transform = `translate(${centerX}px, ${centerY}px) translate(-50%, -50%)`;
  }

  // Subtle dragging effect of inner text/icons ONLY
  const xDist = clientX - centerX;
  const yDist = clientY - centerY;
  const innerMoveX = xDist * 0.10;
  const innerMoveY = yDist * 0.10;
  const innerElements = getInnerMagneticElements(card);
  innerElements.forEach(el => {
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `translate(${innerMoveX}px, ${innerMoveY}px)`;
  });
}

// Helper to reset custom cursor back to circle
function resetActiveCard(card, clientX, clientY) {
  if (customCursor) {
    customCursor.classList.remove('card-mode');
    customCursor.classList.remove('explore-hover');
    customCursor.classList.remove('wish-btn-hover');

    // Smoothly shrink customCursor back to 32px circle centered at exit mouse position
    customCursor.style.transition = `
      width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.3s ease
    `;
    customCursor.style.width = '32px';
    customCursor.style.height = '32px';
    customCursor.style.borderRadius = '50%';
    customCursor.style.backgroundColor = '';

    if (clientX !== undefined && clientY !== undefined) {
      customCursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
    }
  }

  if (card) {
    card.classList.remove('is-absorbed');
    card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    card.style.transform = 'translate(0px, 0px)';

    const innerElements = getInnerMagneticElements(card);
    innerElements.forEach(el => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      el.style.transform = 'translate(0px, 0px)';
    });
  }
}

// Magnetic Interaction Logic
document.querySelectorAll('.interaction-card, .magnetic-link').forEach(card => {
  let rect, centerX, centerY;

  card.addEventListener('mouseenter', (e) => {
    absorbCursor(card, e.clientX, e.clientY);
    rect = card.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  });

  card.addEventListener('mousemove', (e) => {
    if (activeCard !== card) return;
    
    // Update local variables in case page has scrolled or bounding box shifted
    rect = card.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDist = mouseX - centerX;
    const yDist = mouseY - centerY;

    // Container stays contained/stationary
    card.style.transform = 'translate(0px, 0px)';

    // Keep custom cursor perfectly aligned with stationary card center
    if (customCursor && customCursor.classList.contains('card-mode')) {
      customCursor.style.transform = `translate(${centerX}px, ${centerY}px) translate(-50%, -50%)`;
    }

    // ONLY drag inner text & icon elements towards cursor position
    const innerMoveX = xDist * 0.10;
    const innerMoveY = yDist * 0.10;
    const innerElements = getInnerMagneticElements(card);
    innerElements.forEach(el => {
      el.style.transform = `translate(${innerMoveX}px, ${innerMoveY}px)`;
    });
  });

  card.addEventListener('mouseleave', (e) => {
    if (activeCard === card) {
      activeCard = null;
    }
    resetActiveCard(card, e.clientX, e.clientY);
  });
});

// Reset/Update cursor if page is scrolled while cursor is over cards
window.addEventListener('scroll', () => {
  const element = document.elementFromPoint(lastMouseX, lastMouseY);
  const cardUnderMouse = element ? element.closest('.interaction-card, .magnetic-link') : null;

  if (cardUnderMouse) {
    if (cardUnderMouse === activeCard) {
      const rect = activeCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const xDist = lastMouseX - centerX;
      const yDist = lastMouseY - centerY;

      activeCard.style.transform = 'translate(0px, 0px)';

      const innerMoveX = xDist * 0.10;
      const innerMoveY = yDist * 0.10;
      const innerElements = getInnerMagneticElements(activeCard);
      innerElements.forEach(el => {
        el.style.transform = `translate(${innerMoveX}px, ${innerMoveY}px)`;
      });

      if (customCursor) {
        customCursor.style.transform = `translate(${centerX}px, ${centerY}px) translate(-50%, -50%)`;
      }
    } else {
      const oldCard = activeCard;
      activeCard = null;
      if (oldCard) {
        resetActiveCard(oldCard, lastMouseX, lastMouseY);
      }
      absorbCursor(cardUnderMouse, lastMouseX, lastMouseY);
    }
  } else {
    if (activeCard) {
      const oldCard = activeCard;
      activeCard = null;
      resetActiveCard(oldCard, lastMouseX, lastMouseY);
    }
  }
}, { passive: true });

// Message Session Logic
const heroSayHiBtn = document.getElementById('hero-say-hi');
const messageOverlay = document.getElementById('message-overlay');
const messageInput = document.getElementById('message-input');
const msgSendBtn = document.getElementById('msg-send-btn');
const typeTestBtn = document.getElementById('type-test-btn');
const heroActions = document.getElementById('hero-actions');
const messageActions = document.getElementById('message-actions');

let messageSent = false;
let typeTestTimer = null;

if (typeTestBtn) {
  typeTestBtn.addEventListener('click', () => {
    window.location.href = 'project.html?id=type-speed';
  });
}

if (heroSayHiBtn) {
  heroSayHiBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (typeTestTimer) {
      clearTimeout(typeTestTimer);
      typeTestTimer = null;
    }

    if (document.body.classList.contains('session-active')) {
      // Act as "Go Back": Hide type test button FIRST before going back!
      const executeGoBack = () => {
        const currentRect = heroSayHiBtn.getBoundingClientRect();

        // Move back to hero
        heroActions.appendChild(heroSayHiBtn);

        const arrowSpan = heroSayHiBtn.querySelector('.btn-arrow');
        const textSpan = heroSayHiBtn.querySelector('.btn-text');

        if (messageSent) {
          if (arrowSpan) arrowSpan.style.display = 'none';
          if (textSpan) textSpan.innerHTML = 'thank you!';
        } else {
          if (arrowSpan) { arrowSpan.style.display = 'inline-block'; arrowSpan.innerHTML = '&rarr;'; }
          if (textSpan) textSpan.innerHTML = 'say hi';
        }

        document.body.classList.remove('session-active');

        // Target rect in the hero section
        const targetRect = heroSayHiBtn.getBoundingClientRect();

        const dx = currentRect.left - targetRect.left;
        const dy = currentRect.top - targetRect.top;

        heroSayHiBtn.style.transition = 'none';
        heroSayHiBtn.style.transform = `translate(${dx}px, ${dy}px)`;

        heroSayHiBtn.offsetWidth; // reflow

        heroSayHiBtn.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        heroSayHiBtn.style.transform = 'translate(0px, 0px)';

        setTimeout(() => {
          heroSayHiBtn.style.transition = '';
          if (typeTestBtn) {
            typeTestBtn.classList.add('hidden');
            typeTestBtn.classList.remove('fade-out', 'fade-in');
          }
        }, 600);
      };

      if (typeTestBtn && !typeTestBtn.classList.contains('hidden')) {
        typeTestBtn.classList.remove('fade-in');
        typeTestBtn.classList.add('fade-out');

        // Wait 200ms for type test button to fade out first, then execute go back!
        setTimeout(executeGoBack, 200);
      } else {
        executeGoBack();
      }

    } else {
      // Act as "Say Hi"
      messageSent = false; // Reset sent state if opened again

      const currentRect = heroSayHiBtn.getBoundingClientRect();

      document.body.classList.add('session-active');
      messageInput.value = '';
      msgSendBtn.classList.remove('fade-in');
      msgSendBtn.classList.add('hidden');

      if (typeTestBtn) {
        typeTestBtn.classList.add('hidden');
        typeTestBtn.classList.remove('fade-in', 'fade-out');
      }

      // Move to overlay
      messageActions.insertBefore(heroSayHiBtn, msgSendBtn);

      const arrowSpan = heroSayHiBtn.querySelector('.btn-arrow');
      const textSpan = heroSayHiBtn.querySelector('.btn-text');
      if (arrowSpan) { arrowSpan.style.display = 'inline-block'; arrowSpan.innerHTML = '&larr;'; }
      if (textSpan) textSpan.innerHTML = 'go back';

      // Target rect in the overlay
      const targetRect = heroSayHiBtn.getBoundingClientRect();

      const dx = currentRect.left - targetRect.left;
      const dy = currentRect.top - targetRect.top;

      heroSayHiBtn.style.transition = 'none';
      heroSayHiBtn.style.transform = `translate(${dx}px, ${dy}px)`;

      heroSayHiBtn.offsetWidth; // reflow

      heroSayHiBtn.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
      heroSayHiBtn.style.transform = 'translate(0px, 0px)';

      setTimeout(() => heroSayHiBtn.style.transition = '', 600);
      setTimeout(() => messageInput.focus(), 600);

      // Show type test button with a 380ms delay after clicking "say hi"
      typeTestTimer = setTimeout(() => {
        if (typeTestBtn && document.body.classList.contains('session-active') && messageInput.value.trim().length === 0) {
          typeTestBtn.classList.remove('hidden', 'fade-out');
          typeTestBtn.classList.add('fade-in');
        }
      }, 380);
    }
  });
}

if (messageInput) {
  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length > 0) {
      if (msgSendBtn.classList.contains('hidden')) {
        msgSendBtn.classList.remove('hidden');
        msgSendBtn.classList.add('fade-in');
      }
      if (typeTestBtn && !typeTestBtn.classList.contains('hidden')) {
        typeTestBtn.classList.remove('fade-in');
        typeTestBtn.classList.add('fade-out');
        setTimeout(() => {
          if (messageInput.value.trim().length > 0) {
            typeTestBtn.classList.add('hidden');
          }
        }, 180);
      }
    } else {
      msgSendBtn.classList.add('hidden');
      msgSendBtn.classList.remove('fade-in');
      if (typeTestBtn && document.body.classList.contains('session-active')) {
        typeTestBtn.classList.remove('hidden', 'fade-out');
        typeTestBtn.classList.add('fade-in');
      }
    }
  });
}

if (msgSendBtn) {
  msgSendBtn.addEventListener('click', () => {
    messageSent = true;

    // --- In-Code Database Collection & Sanitization ---
    let rawMessage = messageInput.value.trim();

    // Limit to 250 characters
    if (rawMessage.length > 250) {
      rawMessage = rawMessage.substring(0, 250);
    }

    // Sanitize to prevent XSS / injections
    const sanitizedMessage = rawMessage
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");

    if (sanitizedMessage.length > 0) {
      messageDatabase.push({
        id: Date.now(),
        text: sanitizedMessage,
        timestamp: new Date().toISOString()
      });
      console.log('Message added. Current DB:', messageDatabase);
    }
    // -------------------------------------------------

    // Minimal Confetti burst
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#00e5ff', '#ff00ff']
    });

    msgSendBtn.classList.add('hidden');
    msgSendBtn.classList.remove('fade-in');

    // Smoothly go back
    setTimeout(() => {
      heroSayHiBtn.click();
      messageInput.value = ''; // clear right after initiating transition
    }, 400); // short wait to let confetti pop start
  });
}

// Expandable Write Section Logic
const writeExpandBtn = document.getElementById('write-expand-btn');
const writeExtraList = document.getElementById('write-extra');

if (writeExpandBtn && writeExtraList) {
  const articleItems = writeExtraList.querySelectorAll('.article-item');

  writeExpandBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = writeExtraList.classList.contains('expanded');

    if (isExpanded) {
      writeExpandBtn.classList.remove('active');
      writeExtraList.classList.remove('expanded');

      // Reset transition delays
      articleItems.forEach(item => {
        item.style.transitionDelay = '0s';
      });
    } else {
      writeExpandBtn.classList.add('active');
      writeExtraList.classList.add('expanded');

      // Stagger animation for items
      articleItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
      });
    }
  });
}

// Disable dragging on all images and links
document.querySelectorAll('img, a').forEach(el => {
  el.addEventListener('dragstart', (e) => e.preventDefault());
});

// Draft overlay logic for Write cards
document.querySelectorAll('.write-card').forEach(card => {
  const overlay = document.createElement('div');
  overlay.className = 'draft-overlay';
  overlay.innerHTML = `<span class="draft-text">still in draft</span>`;
  card.appendChild(overlay);

  let timeoutId = null;

  card.addEventListener('click', (e) => {
    e.preventDefault();

    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    } else {
      overlay.classList.add('active');

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        overlay.classList.remove('active');
        timeoutId = null;
      }, 1500);
    }
  });
});

// Explore button interaction in Play section
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
  let timeoutId = null;
  let isExploreActive = false;

  exploreBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const arrowSpan = exploreBtn.querySelector('.btn-arrow');
    const textSpan = exploreBtn.querySelector('.btn-text');

    if (isExploreActive) {
      isExploreActive = false;
      if (arrowSpan) arrowSpan.style.display = 'inline-block';
      if (textSpan) textSpan.innerHTML = 'explore';
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    } else {
      isExploreActive = true;
      if (arrowSpan) arrowSpan.style.display = 'none';
      if (textSpan) textSpan.innerHTML = 'come back soon!';

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isExploreActive = false;
        if (arrowSpan) arrowSpan.style.display = 'inline-block';
        if (textSpan) textSpan.innerHTML = 'explore';
        timeoutId = null;
      }, 2000); // Switch back after 2 seconds
    }
  });
}

