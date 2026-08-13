/**
 * Typing Speed Test Mini Game
 * 
 * Features:
 * - Monospace font throughout
 * - 3 lines of text displayed strictly
 * - Starts timer on first letter typed
 * - Active row auto-scrolls to the center row (row 2 of 3 visible lines)
 * - Clean results dashboard on finish
 */

const WORDS_POOL = [
  "group", "even", "form", "however", "than", "during", "and", "do", "show", "lead",
  "school", "old", "this", "thing", "against", "no", "but", "govern", "many", "child",
  "day", "one", "it", "hand", "get", "about", "same", "most", "house", "want",
  "well", "so", "system", "find", "follow", "much", "these", "tell", "between", "good",
  "on", "work", "leave", "very", "present", "need", "when", "hold", "in", "open",
  "late", "increase", "of", "real", "early", "without", "begin", "back", "consider", "change",
  "high", "mean", "know", "after", "to", "all", "just", "by", "great", "give",
  "say", "help", "not", "again", "the", "be", "a", "in", "that", "have",
  "for", "with", "he", "as", "you", "at", "his", "from", "they", "we",
  "her", "she", "or", "an", "will", "my", "would", "there", "their", "what",
  "up", "out", "if", "who", "which", "go", "me", "make", "can", "like",
  "time", "him", "take", "people", "into", "year", "your", "some", "could", "them",
  "see", "other", "now", "look", "only", "come", "its", "over", "think", "also",
  "use", "two", "how", "our", "first", "way", "new", "because", "any", "most",
  "us", "code", "design", "speed", "type", "rhythm", "focus", "pixel", "canvas", "logic"
];

const NUMBERS_POOL = ["2026", "404", "100", "42", "7", "365", "808", "12", "99", "10", "500", "24", "101", "777"];
const PUNCTUATIONS = [",", ".", "!", "?", ";", ":"];

const QUOTES_POOL = [
  "Simplicity is about subtracting the obvious and adding the meaningful.",
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Good design is as little design as possible. Less, but better.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Make it work, make it right, make it fast.",
  "Talk is cheap. Show me the code.",
  "Premature optimization is the root of all evil.",
  "First, solve the problem. Then, write the code."
];

const PARAGRAPHS_POOL = [
  "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.",
  "Computer programming is the process of performing a particular computation, usually by designing and building an executable computer program. Programming involves tasks such as analysis, generating algorithms, profiling algorithms' accuracy and resource consumption, and the implementation of algorithms.",
  "Clean code always looks like it was written by someone who cares. There is nothing obvious you can do to make it better. You try to imagine all the possible improvements, and you are led back to where you started, sitting at the feet of code that someone spent immense care crafting."
];

const RESTART_SVG = `
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
  </svg>
`;

export function initTypeSpeedGame() {
  const container = document.getElementById('type-speed-game-container');
  if (!container) return;

  let settings = {
    punctuation: false,
    numbers: false,
    mode: 'time', // 'time' | 'words' | 'quote'
    preset: '1m'  // '15s' | '30s' | '1m' | '5m'
  };

  let status = 'idle'; // 'idle' | 'running' | 'paused' | 'finished'
  let wordsData = [];  // Array of { original: string, typed: string }
  let currentWordIdx = 0;

  let totalKeystrokes = 0;
  let totalCorrectKeystrokes = 0;
  let wpmHistory = [];
  let currentSecondErrors = 0;
  let currentLineOffset = 0;

  let timerInterval = null;
  let timeRemaining = 60;
  let timeElapsed = 0;
  let totalTestDuration = 60;

  let lastAttemptResult = null;
  try {
    const saved = localStorage.getItem('type_speed_last_result');
    if (saved) lastAttemptResult = JSON.parse(saved);
  } catch (e) {
    // ignore
  }

  function getPresetSeconds(preset) {
    switch (preset) {
      case '15s': return 15;
      case '30s': return 30;
      case '1m': return 60;
      case '5m': return 300;
      default: return 60;
    }
  }

  function generateWordsList() {
    if (settings.mode === 'quote') {
      let filteredQuotes = QUOTES_POOL;
      if (settings.preset === 'short') {
        filteredQuotes = QUOTES_POOL.filter(q => q.split(' ').length <= 12);
      } else if (settings.preset === 'medium') {
        filteredQuotes = QUOTES_POOL.filter(q => q.split(' ').length > 12 && q.split(' ').length <= 20);
      } else if (settings.preset === 'long') {
        filteredQuotes = QUOTES_POOL.filter(q => q.split(' ').length > 20);
      }
      if (filteredQuotes.length === 0) filteredQuotes = QUOTES_POOL;
      const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      return quote.split(' ').map(w => ({ original: w, typed: '' }));
    }

    if (settings.mode === 'words' && settings.preset === 'paragraph') {
      const paragraph = PARAGRAPHS_POOL[Math.floor(Math.random() * PARAGRAPHS_POOL.length)];
      return paragraph.split(' ').map(w => ({ original: w, typed: '' }));
    }

    const wordCount = 90;
    let list = [];

    for (let i = 0; i < wordCount; i++) {
      let word = WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)];

      if (settings.numbers && Math.random() < 0.25) {
        word = NUMBERS_POOL[Math.floor(Math.random() * NUMBERS_POOL.length)];
      }

      if (settings.punctuation) {
        if (Math.random() < 0.2) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        if (Math.random() < 0.3) {
          const punc = PUNCTUATIONS[Math.floor(Math.random() * PUNCTUATIONS.length)];
          word += punc;
        }
      }

      list.push({ original: word, typed: '' });
    }

    return list;
  }

  function render() {
    totalTestDuration = getPresetSeconds(settings.preset);
    if (status === 'idle') {
      timeRemaining = totalTestDuration;
      timeElapsed = 0;
    }

    const displayTimer = settings.mode === 'time' ? timeRemaining : timeElapsed;

    let presetButtonsHTML = '';
    if (settings.mode === 'time') {
      presetButtonsHTML = `
        <button class="ts-chip-btn ${settings.preset === '15s' ? 'active' : ''}" data-preset="15s">15s</button>
        <button class="ts-chip-btn ${settings.preset === '30s' ? 'active' : ''}" data-preset="30s">30s</button>
        <button class="ts-chip-btn ${settings.preset === '1m' ? 'active' : ''}" data-preset="1m">1m</button>
        <button class="ts-chip-btn ${settings.preset === '5m' ? 'active' : ''}" data-preset="5m">5m</button>
      `;
    } else if (settings.mode === 'words') {
      presetButtonsHTML = `
        <button class="ts-chip-btn ${settings.preset === 'words' ? 'active' : ''}" data-preset="words">words</button>
        <button class="ts-chip-btn ${settings.preset === 'paragraph' ? 'active' : ''}" data-preset="paragraph">paragraph</button>
      `;
    } else if (settings.mode === 'quote') {
      presetButtonsHTML = `
        <button class="ts-chip-btn ${settings.preset === 'short' ? 'active' : ''}" data-preset="short">short</button>
        <button class="ts-chip-btn ${settings.preset === 'medium' ? 'active' : ''}" data-preset="medium">medium</button>
        <button class="ts-chip-btn ${settings.preset === 'long' ? 'active' : ''}" data-preset="long">long</button>
      `;
    }

    container.innerHTML = `
      <div class="chroma-card color-type-speed-card">
        <div class="ts-top-header">
          <div class="ts-big-timer" id="ts-timer-val" style="font-family: var(--font-mono); font-size: 2.8rem; font-weight: 700; color: #ff4d00; line-height: 1;">
            ${displayTimer}
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="ts-bars-container">
              <button class="ts-chip-btn ${settings.punctuation ? 'active' : ''}" data-setting="punctuation">@ punctuation</button>
              <button class="ts-chip-btn ${settings.numbers ? 'active' : ''}" data-setting="numbers"># numbers</button>
              <div style="width: 1px; height: 16px; background: rgba(255,255,255,0.2);"></div>
              <button class="ts-chip-btn ${settings.mode === 'time' ? 'active' : ''}" data-mode="time">time</button>
              <button class="ts-chip-btn ${settings.mode === 'words' ? 'active' : ''}" data-mode="words">words</button>
              <button class="ts-chip-btn ${settings.mode === 'quote' ? 'active' : ''}" data-mode="quote">quote</button>
              <div style="width: 1px; height: 16px; background: rgba(255,255,255,0.2);"></div>
              ${presetButtonsHTML}
            </div>

            <button id="ts-restart-btn" class="ts-restart-icon-btn" title="Restart (Ctrl+Enter)">
              ${RESTART_SVG}
            </button>
          </div>
        </div>

        ${status === 'finished' ? renderResults() : renderTypingArea()}
      </div>
    `;

    attachEventListeners();
    setTimeout(positionCaretAndScroll, 20);
  }

  function renderTypingArea() {
    return `
      <!-- 3-Line Monospace Text Display Box with Caret -->
      <div class="ts-display-box" id="ts-display-box">
        ${renderTextHTML()}
        <!-- Blur Pause Overlay -->
        <div class="ts-pause-overlay ${status === 'paused' ? 'visible' : ''}" id="ts-pause-overlay">
          <div class="ts-pause-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Click or press ESC to resume</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderTextHTML() {
    let html = `<div class="ts-words-wrapper" id="ts-words-wrapper" style="transform: translateY(-${currentLineOffset}px);">`;
    html += '<div id="ts-caret" class="ts-caret-line"></div>';

    wordsData.forEach((wObj, wIdx) => {
      const orig = wObj.original;
      const typed = wObj.typed;
      const isActiveWord = wIdx === currentWordIdx;
      let wordClass = 'ts-word';
      if (isActiveWord) wordClass += ' active';

      html += `<div class="${wordClass}" id="ts-word-${wIdx}">`;

      const maxLen = Math.max(orig.length, typed.length);

      for (let c = 0; c < maxLen; c++) {
        if (c < orig.length) {
          const origChar = orig[c];
          if (c < typed.length) {
            const typedChar = typed[c];
            if (typedChar === origChar) {
              html += `<span class="ts-char correct" id="ts-char-${wIdx}-${c}">${escapeHtml(origChar)}</span>`;
            } else {
              html += `<span class="ts-char incorrect" id="ts-char-${wIdx}-${c}">${escapeHtml(origChar)}</span>`;
            }
          } else {
            html += `<span class="ts-char untyped" id="ts-char-${wIdx}-${c}">${escapeHtml(origChar)}</span>`;
          }
        } else {
          const extraChar = typed[c];
          html += `<span class="ts-char extra" id="ts-char-${wIdx}-${c}">${escapeHtml(extraChar)}</span>`;
        }
      }

      if (wIdx < wordsData.length - 1) {
        let spaceClass = 'ts-char space';
        if (wIdx < currentWordIdx) {
          spaceClass += ' correct';
        } else {
          spaceClass += ' untyped';
        }
        html += `<span class="${spaceClass}" id="ts-char-${wIdx}-${maxLen}"> </span>`;
      }

      html += `</div>`;
    });

    html += '</div>';
    return html;
  }

  function positionCaretAndScroll() {
    const displayBox = container.querySelector('#ts-display-box');
    const wordsWrapper = container.querySelector('#ts-words-wrapper');
    const caret = container.querySelector('#ts-caret');
    if (!displayBox || !wordsWrapper || !caret) return;

    if (status === 'finished' || status === 'paused') {
      caret.style.display = 'none';
      return;
    }

    const currentWordEl = document.getElementById(`ts-word-${currentWordIdx}`);
    if (!currentWordEl) return;

    const currentWordObj = wordsData[currentWordIdx];
    if (!currentWordObj) return;

    const typedLen = currentWordObj.typed.length;
    const charEls = currentWordEl.querySelectorAll('.ts-char');

    let leftPos = currentWordEl.offsetLeft;
    let topPos = currentWordEl.offsetTop;
    let heightPos = 38.4;

    if (typedLen === 0) {
      if (charEls.length > 0) {
        leftPos = charEls[0].offsetLeft;
        topPos = charEls[0].offsetTop;
        heightPos = charEls[0].offsetHeight || 38.4;
      }
    } else {
      if (typedLen <= charEls.length) {
        const lastChar = charEls[typedLen - 1];
        if (lastChar) {
          leftPos = lastChar.offsetLeft + lastChar.offsetWidth;
          topPos = lastChar.offsetTop;
          heightPos = lastChar.offsetHeight || 38.4;
        }
      } else {
        const lastChar = charEls[charEls.length - 1];
        if (lastChar) {
          leftPos = lastChar.offsetLeft + lastChar.offsetWidth;
          topPos = lastChar.offsetTop;
          heightPos = lastChar.offsetHeight || 38.4;
        }
      }
    }

    caret.style.display = 'block';
    caret.style.left = `${leftPos}px`;
    caret.style.top = `${topPos}px`;
    caret.style.height = `${heightPos}px`;

    // Active row centering auto-scroll: ONLY shift transform when active line index changes!
    const lineHeight = 38.4;
    const lineIndex = Math.round(currentWordEl.offsetTop / lineHeight);
    const targetOffset = Math.max(0, lineIndex - 1) * lineHeight;

    if (targetOffset !== currentLineOffset) {
      currentLineOffset = targetOffset;
      wordsWrapper.style.transform = `translateY(-${currentLineOffset}px)`;
    }
  }

  function updateDisplayBox() {
    const displayBox = container.querySelector('#ts-display-box');
    if (!displayBox) return;

    const wordsWrapper = displayBox.querySelector('#ts-words-wrapper');
    if (wordsWrapper) {
      wordsWrapper.outerHTML = renderTextHTML();
    } else {
      displayBox.innerHTML = renderTextHTML();
    }

    positionCaretAndScroll();
  }

  function startTest() {
    status = 'running';
    timeElapsed = 0;
    timeRemaining = totalTestDuration;
    wpmHistory = [];

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      timeElapsed++;

      if (settings.mode === 'time') {
        timeRemaining--;
        const timerEl = container.querySelector('#ts-timer-val');
        if (timerEl) timerEl.textContent = timeRemaining;

        if (timeRemaining <= 0) {
          finishTest();
        }
      } else {
        const timerEl = container.querySelector('#ts-timer-val');
        if (timerEl) timerEl.textContent = timeElapsed;
      }

      wpmHistory.push({
        second: timeElapsed,
        wpm: calculateWPM(),
        raw: calculateRawWPM(),
        errors: currentSecondErrors
      });
      currentSecondErrors = 0;
    }, 1000);
  }

  function finishTest() {
    status = 'finished';
    if (timerInterval) clearInterval(timerInterval);
    render();
  }

  function resetTest() {
    status = 'idle';
    if (timerInterval) clearInterval(timerInterval);
    currentWordIdx = 0;
    totalKeystrokes = 0;
    totalCorrectKeystrokes = 0;
    wpmHistory = [];
    currentSecondErrors = 0;
    wordsData = generateWordsList();
    render();
  }

  function calculateWPM() {
    const timeInMins = (timeElapsed || 1) / 60;
    const netWords = (totalCorrectKeystrokes / 5);
    return Math.max(0, Math.round(netWords / timeInMins));
  }

  function calculateRawWPM() {
    const timeInMins = (timeElapsed || 1) / 60;
    const grossWords = (totalKeystrokes / 5);
    return Math.max(0, Math.round(grossWords / timeInMins));
  }

  function calculateAccuracy() {
    if (totalKeystrokes === 0) return 100;
    return Math.min(100, Math.max(0, Math.round((totalCorrectKeystrokes / totalKeystrokes) * 100)));
  }

  function renderResults() {
    const finalWpm = calculateWPM();
    const finalAcc = calculateAccuracy();
    const rawWpm = calculateRawWPM();
    const errorsCount = Math.max(0, totalKeystrokes - totalCorrectKeystrokes);

    if (!wpmHistory || wpmHistory.length === 0) {
      const sampleSecs = Math.max(1, timeElapsed);
      wpmHistory = Array.from({ length: sampleSecs }, (_, i) => ({
        second: i + 1,
        wpm: calculateWPM(),
        rawWpm: calculateRawWPM(),
        errors: 0
      }));
    }

    const svgWidth = 650;
    const svgHeight = 170;
    const padL = 35;
    const padR = 25;
    const padT = 20;
    const padB = 25;
    const chartW = svgWidth - padL - padR;
    const chartH = svgHeight - padT - padB;

    let maxWpmVal = 100;
    wpmHistory.forEach(h => {
      if (h.wpm > maxWpmVal) maxWpmVal = h.wpm;
      if (h.rawWpm > maxWpmVal) maxWpmVal = h.rawWpm;
    });
    maxWpmVal = Math.ceil((maxWpmVal + 15) / 20) * 20;

    const count = wpmHistory.length;

    function getCoords(index, val) {
      const x = padL + (count > 1 ? (index / (count - 1)) * chartW : chartW / 2);
      const y = padT + chartH - (val / maxWpmVal) * chartH;
      return { x, y };
    }

    const netPoints = wpmHistory.map((h, i) => getCoords(i, h.wpm));
    const rawPoints = wpmHistory.map((h, i) => getCoords(i, h.rawWpm));

    function buildSplinePath(pts) {
      if (pts.length < 2) return `M ${pts[0].x},${pts[0].y}`;
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const c1x = p0.x + (p1.x - p0.x) / 2;
        const c1y = p0.y;
        const c2x = p0.x + (p1.x - p0.x) / 2;
        const c2y = p1.y;
        d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p1.x},${p1.y}`;
      }
      return d;
    }

    const netPath = buildSplinePath(netPoints);
    const rawPath = buildSplinePath(rawPoints);

    const gridStep = maxWpmVal >= 120 ? 40 : 20;
    let gridLinesHTML = '';
    for (let v = 0; v <= maxWpmVal; v += gridStep) {
      const y = padT + chartH - (v / maxWpmVal) * chartH;
      gridLinesHTML += `
        <line x1="${padL}" y1="${y}" x2="${svgWidth - padR}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3"/>
        <text x="${padL - 8}" y="${y + 4}" fill="#646669" font-size="9" font-family="Space Mono, monospace" text-anchor="end">${v}</text>
      `;
    }

    let xLabelsHTML = '';
    const labelStep = Math.max(1, Math.floor(count / 10));
    for (let i = 0; i < count; i += labelStep) {
      const p = getCoords(i, 0);
      xLabelsHTML += `
        <text x="${p.x}" y="${svgHeight - 6}" fill="#646669" font-size="9" font-family="Space Mono, monospace" text-anchor="middle">${wpmHistory[i].second}</text>
      `;
    }

    let errorMarkersHTML = '';
    wpmHistory.forEach((h, i) => {
      if (h.errors > 0) {
        const p = getCoords(i, h.rawWpm + 8);
        errorMarkersHTML += `
          <text x="${p.x}" y="${p.y}" fill="#ca4754" font-size="10" font-family="Space Mono, monospace" font-weight="bold" text-anchor="middle">×</text>
        `;
      }
    });

    let comparisonHTML = '';
    if (lastAttemptResult) {
      const wpmDiff = finalWpm - lastAttemptResult.wpm;
      const accDiff = finalAcc - lastAttemptResult.acc;
      const consistencyDiff = calculateConsistency() - (lastAttemptResult.consistency || 85);

      const wpmDiffStr = wpmDiff > 0 ? `+${wpmDiff}` : `${wpmDiff}`;
      const accDiffStr = accDiff > 0 ? `+${accDiff}%` : `${accDiff}%`;
      const consistencyDiffStr = consistencyDiff > 0 ? `+${consistencyDiff}%` : `${consistencyDiff}%`;

      const wpmColor = wpmDiff >= 0 ? '#10b981' : '#ef4444';
      const accColor = accDiff >= 0 ? '#10b981' : '#ef4444';
      const consistencyColor = consistencyDiff >= 0 ? '#10b981' : '#ef4444';

      comparisonHTML = `
        <div style="width: 100%; max-width: 650px; margin: 12px auto 0; padding: 10px 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono), monospace; font-size: 0.85rem;">
          <span style="color: rgba(255,255,255,0.6); font-weight: 600;">⚡ vs Last Attempt:</span>
          <div style="display: flex; gap: 16px;">
            <span>WPM: <strong style="color: ${wpmColor};">${wpmDiffStr}</strong></span>
            <span>Accuracy: <strong style="color: ${accColor};">${accDiffStr}</strong></span>
            <span>Consistency: <strong style="color: ${consistencyColor};">${consistencyDiffStr}</strong></span>
          </div>
        </div>
      `;
    }

    return `
      <div class="ts-results-container" style="width: 100%; max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; width: 100%;">
          <div style="display: flex; gap: 36px; align-items: flex-end;">
            <div>
              <div style="font-size: 0.9rem; color: rgba(255,255,255,0.5); text-transform: lowercase;">wpm</div>
              <div style="font-size: 3.5rem; font-weight: 700; color: #ff4d00; line-height: 1;">${finalWpm}</div>
            </div>
            <div>
              <div style="font-size: 0.9rem; color: rgba(255,255,255,0.5); text-transform: lowercase;">acc</div>
              <div style="font-size: 3.5rem; font-weight: 700; color: #ffffff; line-height: 1;">${finalAcc}%</div>
            </div>
          </div>

          <div style="display: flex; gap: 28px; font-size: 0.95rem;">
            <div>
              <div style="color: rgba(255,255,255,0.4);">raw</div>
              <div style="font-size: 1.4rem; font-weight: 700; color: #ffffff;">${rawWpm}</div>
            </div>
            <div>
              <div style="color: rgba(255,255,255,0.4);">consistency</div>
              <div style="font-size: 1.4rem; font-weight: 700; color: #ffffff;">${calculateConsistency()}%</div>
            </div>
            <div>
              <div style="color: rgba(255,255,255,0.4);">errors</div>
              <div style="font-size: 1.4rem; font-weight: 700; color: #ef4444;">${errorsCount}</div>
            </div>
          </div>
        </div>

        <div style="width: 100%; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); padding: 12px;">
          <svg class="ts-results-chart-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="none">
            ${gridLinesHTML}
            ${xLabelsHTML}
            <path d="${rawPath}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
            <path d="${netPath}" fill="none" stroke="#ff4d00" stroke-width="2.5" stroke-linecap="round"/>
            ${netPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="2.5" fill="#ff4d00"/>`).join('')}
            ${errorMarkersHTML}
          </svg>
        </div>

        ${comparisonHTML}
      </div>
    `;
  }

  // WPM Formula
  function calculateWPM() {
    if (timeElapsed <= 0) return 0;
    const elapsedMinutes = Math.max(timeElapsed, 1) / 60;
    const wpm = Math.round((totalCorrectKeystrokes / 5) / elapsedMinutes);
    return Math.max(0, wpm);
  }

  // Raw WPM Formula
  function calculateRawWPM() {
    if (timeElapsed <= 0) return 0;
    const elapsedMinutes = Math.max(timeElapsed, 1) / 60;
    const rawWpm = Math.round((totalKeystrokes / 5) / elapsedMinutes);
    return Math.max(0, rawWpm);
  }

  // Accuracy % Formula
  function calculateAccuracy() {
    if (totalKeystrokes <= 0) return 100;
    return Math.round((totalCorrectKeystrokes / totalKeystrokes) * 100);
  }

  // Consistency % Formula
  function calculateConsistency() {
    if (!wpmHistory || wpmHistory.length < 2) return 85;
    const wpms = wpmHistory.map(h => h.wpm);
    const avg = wpms.reduce((a, b) => a + b, 0) / wpms.length;
    if (avg <= 0) return 100;
    const variance = wpms.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / wpms.length;
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / avg) * 100;
    return Math.max(1, Math.min(100, Math.round(100 - cv)));
  }

  // Attach Event Listeners
  function attachEventListeners() {
    const barsContainer = container.querySelector('.ts-bars-container');
    if (barsContainer) {
      barsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const setting = btn.getAttribute('data-setting');
          const mode = btn.getAttribute('data-mode');
          const preset = btn.getAttribute('data-preset');

          if (setting) {
            settings[setting] = !settings[setting];
            restartTest();
          } else if (mode) {
            settings.mode = mode;
            if (mode === 'time') settings.preset = '1m';
            else if (mode === 'words') settings.preset = 'words';
            else if (mode === 'quote') settings.preset = 'medium';
            restartTest();
          } else if (preset) {
            settings.preset = preset;
            restartTest();
          }
        });
      });
    }

    const restartBtn = container.querySelector('#ts-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        restartTest();
      });
    }

    const pauseOverlay = container.querySelector('#ts-pause-overlay');
    if (pauseOverlay) {
      pauseOverlay.addEventListener('click', () => {
        resumeTest();
      });
    }

    const displayBox = container.querySelector('#ts-display-box');
    if (displayBox) {
      displayBox.focus();
      displayBox.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
      displayBox.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    }
  }

  // Start or resume timer interval
  function startTimerInterval() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      if (status !== 'running') return;
      
      timeElapsed++;
      
      wpmHistory.push({
        second: timeElapsed,
        wpm: calculateWPM(),
        rawWpm: calculateRawWPM(),
        errors: currentSecondErrors
      });
      currentSecondErrors = 0;

      if (settings.mode === 'time') {
        timeRemaining = Math.max(0, totalTestDuration - timeElapsed);
        if (timeRemaining <= 0) {
          finishTest();
          return;
        }
      }

      const timerValEl = container.querySelector('#ts-timer-val');
      if (timerValEl) {
        timerValEl.textContent = settings.mode === 'time' ? `${timeRemaining}` : `${timeElapsed}`;
      }
    }, 1000);
  }

  // Start test
  function startTest() {
    status = 'running';
    document.body.classList.add('ts-focused-mode');
    wpmHistory = [];
    currentSecondErrors = 0;
    startTimerInterval();
  }

  // Pause test
  function pauseTest() {
    if (status !== 'running') return;
    status = 'paused';
    if (timerInterval) clearInterval(timerInterval);
    document.body.classList.remove('ts-focused-mode');
    
    const pauseOverlay = container.querySelector('#ts-pause-overlay');
    if (pauseOverlay) pauseOverlay.classList.add('visible');
    positionCaretAndScroll();
  }

  // Resume test
  function resumeTest() {
    if (status !== 'paused') return;
    status = 'running';
    document.body.classList.add('ts-focused-mode');

    const pauseOverlay = container.querySelector('#ts-pause-overlay');
    if (pauseOverlay) pauseOverlay.classList.remove('visible');

    startTimerInterval();

    const displayBox = container.querySelector('#ts-display-box');
    if (displayBox) displayBox.focus();
    positionCaretAndScroll();
  }

  // Finish test
  function finishTest() {
    status = 'finished';
    if (timerInterval) clearInterval(timerInterval);
    document.body.classList.remove('ts-focused-mode');

    const finalWpm = calculateWPM();
    const finalAcc = calculateAccuracy();
    const rawWpm = calculateRawWPM();
    const consistency = calculateConsistency();
    const errorsCount = Math.max(0, totalKeystrokes - totalCorrectKeystrokes);

    const currentResult = {
      wpm: finalWpm,
      acc: finalAcc,
      raw: rawWpm,
      consistency: consistency,
      errors: errorsCount,
      timestamp: Date.now()
    };

    render();

    // Store current result to localStorage for future comparison
    try {
      localStorage.setItem('type_speed_last_result', JSON.stringify(currentResult));
      lastAttemptResult = currentResult;
    } catch (e) {
      // ignore
    }

    if (window.confetti) {
      try {
        window.confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff4d00', '#ffffff', '#ff8800']
        });
      } catch (e) {
        // ignore fallback
      }
    }
  }

  // Restart test
  function restartTest() {
    if (timerInterval) clearInterval(timerInterval);
    status = 'idle';
    currentWordIdx = 0;
    currentLineOffset = 0;
    totalKeystrokes = 0;
    totalCorrectKeystrokes = 0;
    timeElapsed = 0;
    wpmHistory = [];
    currentSecondErrors = 0;
    timeRemaining = getPresetSeconds(settings.preset);

    document.body.classList.remove('ts-focused-mode');
    wordsData = generateWordsList();
    render();
  }

  // Global Keydown Handler
  function handleKeyDown(e) {
    // Restart shortcut: Ctrl + Enter or Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      restartTest();
      return;
    }

    // Escape Key: Pause test
    if (e.key === 'Escape') {
      e.preventDefault();
      if (status === 'running') {
        pauseTest();
      } else if (status === 'paused') {
        resumeTest();
      }
      return;
    }

    if (status === 'paused') {
      e.preventDefault();
      resumeTest();
      return;
    }

    if (status === 'finished') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const currentWordObj = wordsData[currentWordIdx];

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (currentWordObj && currentWordObj.typed.length > 0) {
        // Delete last character from current word
        currentWordObj.typed = currentWordObj.typed.slice(0, -1);
        updateDisplayBox();
      } else if (currentWordIdx > 0 && (!currentWordObj || currentWordObj.typed.length === 0)) {
        // Backspace into previous word if user wants to fix errors
        currentWordIdx--;
        updateDisplayBox();
      }
      return;
    }

    // Handle Space key (Advance to next word)
    if (e.key === ' ') {
      e.preventDefault();

      if (status === 'idle') {
        startTest();
      }

      if (currentWordObj.typed.length > 0) {
        currentWordIdx++;

        if (currentWordIdx >= wordsData.length) {
          if (settings.mode === 'time') {
            wordsData = wordsData.concat(generateWordsList());
          } else {
            finishTest();
            return;
          }
        }

        updateDisplayBox();
      }
      return;
    }

    // Handle Printable Characters (length === 1)
    if (e.key.length === 1) {
      e.preventDefault();

      if (status === 'idle') {
        startTest();
      }

      // Limit max extra characters per word to 10. Once reached, block further typing until Space or Backspace!
      const MAX_EXTRA_CHARS = 10;
      if (currentWordObj.typed.length >= currentWordObj.original.length + MAX_EXTRA_CHARS) {
        return; // Stop typing for this word!
      }

      const typedIdx = currentWordObj.typed.length;
      const typedChar = e.key;
      const expectedChar = currentWordObj.original[typedIdx];

      currentWordObj.typed += typedChar;
      totalKeystrokes++;

      if (typedIdx < currentWordObj.original.length) {
        if (typedChar === expectedChar) {
          totalCorrectKeystrokes++;
        } else {
          currentSecondErrors++;
        }
      } else {
        // Extra letter beyond word limit!
        currentSecondErrors++;
      }

      updateDisplayBox();
    }
  }

  // Update display box DOM without full re-render
  function updateDisplayBox() {
    const displayBox = container.querySelector('#ts-display-box');
    if (!displayBox) return;

    const wordsWrapper = displayBox.querySelector('.ts-words-wrapper');
    if (wordsWrapper) {
      wordsWrapper.outerHTML = renderTextHTML();
    } else {
      displayBox.innerHTML = renderTextHTML();
    }

    positionCaretAndScroll();
  }

  // Window Blur Handler
  function handleWindowBlur() {
    if (status === 'running') {
      pauseTest();
    }
  }

  // Escape HTML helper
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Window Listeners Setup
  if (window._tsBlurHandler) {
    window.removeEventListener('blur', window._tsBlurHandler);
  }
  window._tsBlurHandler = handleWindowBlur;
  window.addEventListener('blur', handleWindowBlur);

  if (window._tsResizeHandler) {
    window.removeEventListener('resize', window._tsResizeHandler);
  }
  window._tsResizeHandler = positionCaretAndScroll;
  window.addEventListener('resize', positionCaretAndScroll);

  if (window._tsKeydownHandler) {
    window.removeEventListener('keydown', window._tsKeydownHandler);
  }
  window._tsKeydownHandler = handleKeyDown;
  window.addEventListener('keydown', handleKeyDown);

  // Initial setup
  wordsData = generateWordsList();
  render();
}
