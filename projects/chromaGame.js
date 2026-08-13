/**
 * Color Recall Mini Game — 5-Round Memory Challenge
 */
import { supabase } from '../supabase.js';

export function initChromaGame() {
  const container = document.getElementById('chroma-game-container');
  if (!container) return;

  // Diagonal Arrow SVG Helper
  const DIAGONAL_ARROW_SVG = `
    <svg class="diagonal-arrow-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  `;

  // Game configuration
  let difficulty = 'hard'; // default 'hard' (3000ms) | 'easy' (5000ms)
  let currentRound = 1;
  const TOTAL_ROUNDS = 5;

  // Game state
  let roundScores = [];
  let roundData = [];
  
  let targetHsl = { h: 0, s: 0, l: 0 };
  let guessHsl = { h: 180, s: 70, l: 50 };
  
  let timerAnimFrame = null;
  let timerStartTime = null;

  // Smooth Fade Transition Helper (Inner content opacity fade only)
  function transitionToPhase(renderFn) {
    const card = container.querySelector('.chroma-card');
    if (card) {
      const children = Array.from(card.children);
      children.forEach(el => {
        el.style.transition = 'opacity 0.18s ease';
        el.style.opacity = '0';
      });
      setTimeout(() => {
        renderFn();
        const newCard = container.querySelector('.chroma-card');
        if (newCard) {
          const newChildren = Array.from(newCard.children);
          newChildren.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.22s ease';
          });
          void newCard.offsetHeight; // Force reflow
          newChildren.forEach(el => {
            el.style.opacity = '1';
          });
        }
      }, 180);
    } else {
      renderFn();
    }
  }

  // Initial Render
  renderStartScreen();

  function renderStartScreen() {
    container.innerHTML = `
      <div class="chroma-card color-start-card">
        <div class="color-start-content">
          <div class="color-start-top-text">
            <h1 class="color-start-title">color</h1>
            <p class="color-start-subtitle">
              Humans can't reliably recall colors. This is a simple game to see how good (or bad) you are at it.
            </p>
            <p class="color-start-desc">
              We'll show you five colors, then you'll try and recreate them.
            </p>
          </div>

          <div class="color-start-actions">
            <button class="color-primary-btn" id="color-start-btn">
              <span>START GAME</span>
              ${DIAGONAL_ARROW_SVG}
            </button>

            <div class="color-mode-switch" id="color-mode-switch">
              <button class="mode-switch-option ${difficulty === 'easy' ? 'active' : ''}" id="switch-easy">EASY</button>
              <button class="mode-switch-option ${difficulty === 'hard' ? 'active' : ''}" id="switch-hard">HARD</button>
            </div>

            ${difficulty === 'easy' ? `<span class="easy-joke-text">No judgements, I'll go easy on you.</span>` : ''}
          </div>
        </div>
      </div>
    `;

    document.getElementById('switch-easy').addEventListener('click', () => {
      difficulty = 'easy';
      renderStartScreen();
    });

    document.getElementById('switch-hard').addEventListener('click', () => {
      difficulty = 'hard';
      renderStartScreen();
    });

    document.getElementById('color-start-btn').addEventListener('click', () => {
      startNewGame();
    });
  }

  function startNewGame() {
    currentRound = 1;
    roundScores = [];
    roundData = [];
    transitionToPhase(startReadyCountdown);
  }

  function startReadyCountdown() {
    const flashColors = [
      `hsl(${Math.floor(Math.random() * 360)}, 80%, 40%)`,
      `hsl(${Math.floor(Math.random() * 360)}, 80%, 40%)`,
      `hsl(${Math.floor(Math.random() * 360)}, 80%, 40%)`
    ];

    container.innerHTML = `
      <div class="chroma-card color-ready-card" id="color-ready-card" style="background-color: ${flashColors[0]}; transition: background-color 0.3s ease;">
        <div class="color-ready-content">
          <h1 class="color-ready-count" id="color-ready-count">READY</h1>
        </div>
      </div>
    `;

    const countEl = document.getElementById('color-ready-count');
    const cardEl = document.getElementById('color-ready-card');
    const steps = ['READY', 'SET', 'GO!'];
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < steps.length) {
        if (countEl) countEl.textContent = steps[idx];
        if (cardEl && flashColors[idx]) {
          cardEl.style.backgroundColor = flashColors[idx];
        }
        idx++;
      } else {
        clearInterval(interval);
        transitionToPhase(startMemorizePhase);
      }
    }, 600);
  }

  function generateRandomHsl() {
    return {
      h: Math.floor(Math.random() * 360),
      s: Math.floor(45 + Math.random() * 50),
      l: Math.floor(35 + Math.random() * 40)
    };
  }

  function hslToCss(hsl) {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  function startMemorizePhase() {
    targetHsl = generateRandomHsl();
    const targetCss = hslToCss(targetHsl);
    const duration = difficulty === 'easy' ? 5000 : 3000;

    container.innerHTML = `
      <div class="chroma-card color-memorize-card" style="background-color: ${targetCss}; transition: background-color 0.3s ease;">
        <div class="color-memorize-header">
          <span class="color-round-badge">${currentRound}/${TOTAL_ROUNDS}</span>
          <div class="color-timer-box">
            <div class="color-timer-digits" id="color-timer-digits">
              <span class="sec-digit">0</span><span class="ms-digits">00</span>
            </div>
            <span class="color-timer-label">Seconds to remember</span>
          </div>
        </div>
      </div>
    `;

    if (timerAnimFrame) cancelAnimationFrame(timerAnimFrame);
    timerStartTime = performance.now();

    const digitsEl = document.getElementById('color-timer-digits');

    function updateTimer(now) {
      const elapsed = now - timerStartTime;
      const remaining = Math.max(0, duration - elapsed);

      const totalSecs = (remaining / 1000).toFixed(2);
      const parts = totalSecs.split('.');
      const sec = parts[0];
      const ms = parts[1] || '00';

      if (digitsEl) {
        digitsEl.innerHTML = `<span class="sec-digit">${sec}</span><span class="ms-digits">${ms}</span>`;
      }

      if (remaining > 0) {
        timerAnimFrame = requestAnimationFrame(updateTimer);
      } else {
        transitionToPhase(startGuessPhase);
      }
    }

    timerAnimFrame = requestAnimationFrame(updateTimer);
  }

  function startGuessPhase() {
    // Initial guess offset
    guessHsl = { h: (targetHsl.h + 110) % 360, s: 65, l: 50 };

    container.innerHTML = `
      <div class="chroma-card color-guess-card">
        <span class="color-round-badge color-guess-badge">${currentRound}/${TOTAL_ROUNDS}</span>

        <div class="color-guess-body">
          <div class="color-picker-left-half">
            <div id="chroma-picker-container" class="chroma-picker-container"></div>
          </div>

          <div class="color-preview-right-half">
            <div class="color-selected-swatch" id="guess-preview-swatch">
              <div class="tooltip-wrapper">
                <button class="color-next-round-btn submit-circle-btn" id="color-submit-guess-btn" aria-label="Submit Selection">
                  ${DIAGONAL_ARROW_SVG}
                </button>
                <span class="color-tooltip-popup">Submit Selection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const swatchEl = document.getElementById('guess-preview-swatch');
    if (swatchEl) swatchEl.style.backgroundColor = hslToCss(guessHsl);

    // Initialize standard iro.js Color Picker
    const pickerContainer = document.getElementById('chroma-picker-container');
    if (pickerContainer && typeof window.iro !== 'undefined') {
      const colorPicker = new window.iro.ColorPicker('#chroma-picker-container', {
        width: 180,
        color: hslToCss(guessHsl),
        borderWidth: 2,
        borderColor: '#ffffff',
        layout: [
          { component: window.iro.ui.Wheel },
          { component: window.iro.ui.Slider, options: { sliderType: 'value' } }
        ]
      });

      colorPicker.on('color:change', (color) => {
        const hsl = color.hsl;
        guessHsl = {
          h: Math.round(hsl.h),
          s: Math.round(hsl.s),
          l: Math.round(hsl.l)
        };
        if (swatchEl) swatchEl.style.backgroundColor = color.hexString;
      });
    }

    document.getElementById('color-submit-guess-btn').addEventListener('click', () => {
      calculateRoundScore();
    });
  }

  function calculateRoundScore() {
    const dh = Math.min(Math.abs(targetHsl.h - guessHsl.h), 360 - Math.abs(targetHsl.h - guessHsl.h)) / 180;
    const ds = Math.abs(targetHsl.s - guessHsl.s) / 100;
    const dl = Math.abs(targetHsl.l - guessHsl.l) / 100;

    const weightedDist = Math.sqrt(dh * dh * 0.6 + ds * ds * 0.2 + dl * dl * 0.2);
    const accuracy = Math.max(0, Math.min(1, 1 - weightedDist));
    const scoreOutof10 = (accuracy * 10).toFixed(2);

    roundScores.push(parseFloat(scoreOutof10));
    roundData.push({
      targetHsl: { ...targetHsl },
      guessHsl: { ...guessHsl },
      score: scoreOutof10,
      targetHex: hslToHex(targetHsl.h, targetHsl.s, targetHsl.l),
      guessHex: hslToHex(guessHsl.h, guessHsl.s, guessHsl.l)
    });

    transitionToPhase(() => renderRoundResult(scoreOutof10));
  }

  function getWittyRemark(scoreNum) {
    if (scoreNum >= 9.7) {
      return { line1: "Were you even blinking?", line2: "Blink. Please blink." };
    } else if (scoreNum >= 9.2) {
      return { line1: "Mantis shrimp level precision.", line2: "That's terrifyingly accurate!" };
    } else if (scoreNum >= 8.5) {
      return { line1: "Pretty solid memory!", line2: "Your eyes and rods are sharp." };
    } else if (scoreNum >= 7.5) {
      return { line1: "Decent guess!", line2: "A subtle shade away from target." };
    } else {
      return { line1: "Did you close your eyes?", line2: "That's a whole different spectrum!" };
    }
  }

  function renderRoundResult(scoreValStr) {
    const scoreNum = parseFloat(scoreValStr);
    const remark = getWittyRemark(scoreNum);
    const targetCss = hslToCss(targetHsl);
    const guessCss = hslToCss(guessHsl);

    container.innerHTML = `
      <div class="chroma-card color-result-card">
        <!-- Top Half: Your Selection (Matching Ref Image 1) -->
        <div class="color-result-top-half" style="background-color: ${guessCss}; transition: background-color 0.3s ease;">
          <span class="color-round-badge light-badge">${currentRound}/${TOTAL_ROUNDS}</span>

          <div class="result-top-right-box">
            <div class="result-score-display" id="result-score-ticker">0.00</div>
            <div class="result-witty-text">
              <p class="witty-l1">${remark.line1}</p>
              <p class="witty-l2">${remark.line2}</p>
            </div>
          </div>

          <div class="result-selection-readout">
            <span class="readout-label">Your selection</span>
            <span class="readout-code">H${guessHsl.h} S${guessHsl.s} L${guessHsl.l}</span>
          </div>
        </div>

        <!-- Bottom Half: Original (Matching Ref Image 1 - Equal 50/50 Height) -->
        <div class="color-result-bottom-half" style="background-color: ${targetCss}; transition: background-color 0.3s ease;">
          <div class="result-original-readout">
            <span class="readout-label">Original</span>
            <span class="readout-code">H${targetHsl.h} S${targetHsl.s} L${targetHsl.l}</span>
          </div>

          <div class="tooltip-wrapper result-tooltip-wrapper">
            <button class="color-next-round-btn" id="color-next-round-btn" aria-label="Next Round">
              ${DIAGONAL_ARROW_SVG}
            </button>
            <span class="color-tooltip-popup">Continue</span>
          </div>
        </div>
      </div>
    `;

    // Slot Machine / Number Ticker Animation (0.00 to scoreNum out of 10)
    const tickerEl = document.getElementById('result-score-ticker');
    if (tickerEl) {
      const targetVal = scoreNum;
      const animDuration = 1200; // 1.2s ticker animation
      const startTime = performance.now();

      function animateScoreTicker(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / animDuration);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = (targetVal * ease).toFixed(2);

        tickerEl.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(animateScoreTicker);
        } else {
          tickerEl.textContent = targetVal.toFixed(2);
        }
      }

      requestAnimationFrame(animateScoreTicker);
    }

    document.getElementById('color-next-round-btn').addEventListener('click', () => {
      if (currentRound < TOTAL_ROUNDS) {
        currentRound++;
        transitionToPhase(startReadyCountdown);
      } else {
        transitionToPhase(renderFinalSummary);
      }
    });
  }

  async function saveScoreToSupabase(initials, scoreVal) {
    const payload = {
      initials: (initials || 'YOU').toUpperCase(),
      score: parseFloat(scoreVal),
      difficulty,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('color_recall_scores').insert([payload]);
      } catch (err) {
        console.warn('Supabase save error (falling back to localStorage):', err);
      }
    }

    const existing = JSON.parse(localStorage.getItem('color_recall_stats') || '[]');
    existing.push(payload);
    localStorage.setItem('color_recall_stats', JSON.stringify(existing));
  }

  function renderFinalSummary() {
    const totalSum = roundScores.reduce((a, b) => a + b, 0);
    const totalFormatted = totalSum.toFixed(2);

    let rankNum = "#7,512,159";
    let rankTotal = "/ 7,700,252";
    let summaryRemark = "One point from thirty. Thirty isn't good either.";

    if (totalSum >= 46.5) {
      rankNum = "#12,401";
      rankTotal = "/ 7,700,252";
      summaryRemark = "Forty-eight out of fifty. We're watching you.";
    } else if (totalSum >= 42.0) {
      rankNum = "#214,890";
      rankTotal = "/ 7,700,252";
      summaryRemark = "Near perfection. Your color vision is terrifyingly accurate.";
    } else if (totalSum >= 35.0) {
      rankNum = "#1,154,203";
      rankTotal = "/ 7,700,252";
      summaryRemark = "Pretty good! Better than 90% of the population.";
    } else if (totalSum >= 28.0) {
      rankNum = "#3,412,980";
      rankTotal = "/ 7,700,252";
      summaryRemark = "One point from thirty. Thirty isn't good either.";
    } else {
      rankNum = "#7,512,159";
      rankTotal = "/ 7,700,252";
      summaryRemark = "Are you sure your monitor is turned on?";
    }

    // Generate 5 Diagonal Split Swatches (Matching Reference Image)
    const swatchesHtml = roundData.map((rd) => `
      <div class="final-split-swatch" style="--guess-bg: ${hslToCss(rd.guessHsl)}; --target-bg: ${hslToCss(rd.targetHsl)};">
        <span class="swatch-score">${rd.score}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="chroma-card color-final-card">
        <!-- Top Row: Rank & Close Button -->
        <div class="final-header-row">
          <!-- <div class="final-rank-tag">
            <span class="rank-num">${rankNum}</span>
            <span class="rank-total"> ${rankTotal}</span>
          </div> -->
          <button class="final-close-circle-btn" id="final-close-btn" aria-label="Close Summary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Main Score & Witty Remark -->
        <div class="final-score-section">
          <div class="final-big-score-wrap">
            <span class="final-big-score-val">${totalFormatted}</span>
            <span class="final-big-score-denom">/50</span>
          </div>
          <p class="final-summary-remark">${summaryRemark}</p>
        </div>

        <!-- Swatches Card Box (Matching Reference Image) -->
        <div class="final-swatches-card-box">
          <div class="swatches-box-header">
            <span class="swatches-box-user">YOU</span>
            <span class="swatches-box-score">${totalFormatted}/50</span>
          </div>
          <div class="final-swatches-grid">
            ${swatchesHtml}
          </div>
        </div>

        <!-- Bottom Actions Row -->
        <div class="final-actions-row">
          <input type="text" maxlength="3" placeholder="Initials" id="player-initials-input" class="initials-pill-input" />
          <button class="color-primary-btn post-score-btn" id="post-score-btn">
            <span>Post score & challenge a friend</span>
          </button>
        </div>
      </div>
    `;

    if (totalSum >= 42.0 && typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    document.getElementById('final-close-btn').addEventListener('click', () => {
      transitionToPhase(renderStartScreen);
    });

    document.getElementById('post-score-btn').addEventListener('click', async () => {
      const initialsInput = document.getElementById('player-initials-input');
      const initials = (initialsInput ? initialsInput.value : '').trim() || 'YOU';
      const btn = document.getElementById('post-score-btn');

      if (btn) btn.innerHTML = `<span>Saving...</span>`;

      // Save stats to Supabase / LocalStorage
      await saveScoreToSupabase(initials, totalFormatted);

      const shareText = `I scored ${totalFormatted}/50 on Color Recall! 🎨 Think you can beat my color memory? Challenge yourself on ANDVCH: ${window.location.href}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Color Recall Challenge — ANDVCH',
            text: shareText,
            url: window.location.href
          });
        } catch (err) {
          // User cancelled or share error
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareText);
          alert(`Score copied to clipboard! Share it with your friends:\n\n"${shareText}"`);
        } catch (err) {
          alert(`Your score is ${totalFormatted}/50! Share link: ${window.location.href}`);
        }
      }

      if (btn) btn.innerHTML = `<span>Posted! Play Again</span>`;
      btn.onclick = () => transitionToPhase(renderStartScreen);
    });
  }
}
