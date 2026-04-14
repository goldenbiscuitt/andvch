import './style.css';

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

// 1. New Logic: Card Blur Overlays & Navigation
const overlayTexts = ["view", "explore", "details", "process", "case"];
const denseCards = document.querySelectorAll('.dense-card');

denseCards.forEach(card => {
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

  // Handle navigation
  card.addEventListener('click', () => {
    window.location.href = 'project.html';
  });
});

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

window.addEventListener('mousemove', (e) => {
  if (customCursor && !customCursor.classList.contains('card-mode')) {
    customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }
});

// Detect interaction with text to change to "|" blue line
document.addEventListener('mouseover', (e) => {
  const target = e.target;

  // Exclude magnetic elements and their children from drawing the text cursor
  const inMagneticElement = target.closest('.interaction-card, .magnetic-link');
  if (inMagneticElement) {
    if (customCursor) customCursor.classList.remove('text-mode');
    return;
  }

  const textTags = ['H1', 'P', 'SPAN', 'A', 'DIV', 'TEXTAREA'];
  const isTextElement =
    ['H1', 'P', 'SPAN', 'A', 'TEXTAREA'].includes(target.tagName) ||
    target.classList.contains('spec-label') ||
    target.classList.contains('spec-size');

  if (isTextElement && !target.closest('.project-card.placeholder-1') && !target.closest('.color-spheres-container')) {
    const computedStyle = window.getComputedStyle(target);
    let h = parseFloat(computedStyle.lineHeight);
    if (isNaN(h) || computedStyle.lineHeight === 'normal') {
      h = parseFloat(computedStyle.fontSize) * 1.2;
    }

    if (customCursor) {
      customCursor.classList.add('text-mode');
      customCursor.style.height = `${h}px`;
    }
  } else {
    if (customCursor) {
      customCursor.classList.remove('text-mode');
      customCursor.style.height = '';
    }
  }
});

// Magnetic Interaction Logic
document.querySelectorAll('.interaction-card, .magnetic-link').forEach(card => {
  let rect, centerX, centerY;

  card.addEventListener('mouseenter', (e) => {
    if (customCursor) {
      customCursor.classList.add('card-mode');
      customCursor.classList.add('transitioning');
      clearTimeout(cursorTransitionTimeout);

      cursorTransitionTimeout = setTimeout(() => {
        customCursor.classList.remove('transitioning');
      }, 300);
    }

    // Get card dimensions and center
    rect = card.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;

    if (customCursor) {
      customCursor.style.width = `${rect.width}px`;
      customCursor.style.height = `${rect.height}px`;

      // Ensure the highlight perfectly hugs buttons that are physically pill-shaped
      if (card.classList.contains('say-hi-btn') || card.classList.contains('social-link') || card.classList.contains('expand-btn')) {
        customCursor.style.borderRadius = '9999px';
      } else {
        customCursor.style.borderRadius = '24px';
      }
    }

    card.style.transition = 'transform 0.1s ease-out, background-color 0.1s ease';

    const xDist = e.clientX - centerX;
    const yDist = e.clientY - centerY;
    const moveX = xDist * 0.03;
    const moveY = yDist * 0.03;

    if (customCursor) {
      customCursor.style.transform = `translate(${centerX + moveX}px, ${centerY + moveY}px) translate(-50%, -50%)`;
    }
  });

  card.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDist = mouseX - centerX;
    const yDist = mouseY - centerY;

    const moveX = xDist * 0.03;
    const moveY = yDist * 0.03;

    // Magnetize main container with minimized parallax
    card.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Cursor aligns exactly with the transformed card
    if (customCursor) {
      customCursor.style.transform = `translate(${centerX + moveX}px, ${centerY + moveY}px) translate(-50%, -50%)`;
    }
  });

  card.addEventListener('mouseleave', (e) => {
    if (customCursor) {
      // Revert cursor to circle
      customCursor.classList.remove('card-mode');
      customCursor.classList.add('transitioning');

      clearTimeout(cursorTransitionTimeout);
      cursorTransitionTimeout = setTimeout(() => {
        customCursor.classList.remove('transitioning');
      }, 300);

      customCursor.style.width = '';
      customCursor.style.height = '';
      customCursor.style.borderRadius = '';

      // Restore transform immediately to current mouse leaving point avoiding drift
      customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }

    // Give back the bounce transition to the main card
    card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease';
    card.style.transform = 'translate(0px, 0px)';
  });
});

// Message Session Logic
const heroSayHiBtn = document.getElementById('hero-say-hi');
const messageOverlay = document.getElementById('message-overlay');
const messageInput = document.getElementById('message-input');
const msgSendBtn = document.getElementById('msg-send-btn');
const heroActions = document.getElementById('hero-actions');
const messageActions = document.getElementById('message-actions');

let messageSent = false;

if (heroSayHiBtn) {
  heroSayHiBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (document.body.classList.contains('session-active')) {
      // Act as "Go Back"
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

      setTimeout(() => heroSayHiBtn.style.transition = '', 600);

    } else {
      // Act as "Say Hi"
      messageSent = false; // Reset sent state if opened again

      const currentRect = heroSayHiBtn.getBoundingClientRect();

      document.body.classList.add('session-active');
      messageInput.value = '';
      msgSendBtn.classList.remove('fade-in');
      msgSendBtn.classList.add('hidden');

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
    } else {
      msgSendBtn.classList.add('hidden');
      msgSendBtn.classList.remove('fade-in');
    }
  });
}

if (msgSendBtn) {
  msgSendBtn.addEventListener('click', () => {
    messageSent = true;

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
