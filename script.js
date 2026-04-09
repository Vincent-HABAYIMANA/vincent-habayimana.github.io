/**
 * Vincent Habayimana — Portfolio Scripts
 * Handles: theme toggle, mobile nav, typed text,
 *          scroll reveal, navbar scroll effect, contact form
 */

/* ============================================
   1. THEME TOGGLE (Dark / Light Mode)
   ============================================ */
const html         = document.documentElement;
const themeToggle  = document.getElementById('theme-toggle');
const savedTheme   = localStorage.getItem('vh-theme') || 'dark';

html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('vh-theme', next);
});


/* ============================================
   2. MOBILE HAMBURGER MENU
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ============================================
   3. NAVBAR SCROLL EFFECT
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ============================================
   4. TYPED TEXT ANIMATION (Hero Tagline)
   ============================================ */
const typedEl = document.getElementById('typed');

const phrases = [
  'real-world problems.',
  'Rwanda\'s future.',
  'smart software.',
  'embedded systems.',
  'AI-powered tools.',
  'a better Africa.',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typeTimeout;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    // Pause at end
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typeTimeout = setTimeout(typeLoop, delay);
}

// Start after a short delay for load polish
setTimeout(typeLoop, 800);


/* ============================================
   5. SCROLL REVEAL ANIMATIONS
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal (fire once)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  }
);

// Observe all reveal elements
revealElements.forEach((el) => revealObserver.observe(el));


/* ============================================
   6. ACTIVE NAV LINK (highlight on scroll)
   ============================================ */
const sections   = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));


/* ============================================
   7. CONTACT FORM (simulated send)
   ============================================ */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate async send (replace with EmailJS / Formspree / etc.)
    setTimeout(() => {
      formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
      contactForm.reset();
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;

      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
      }, 5000);
    }, 1400);
  });
}


/* ============================================
   8. SMOOTH HERO ENTRANCE (stagger on load)
   ============================================ */
window.addEventListener('DOMContentLoaded', () => {
  const heroItems = document.querySelectorAll('.hero .reveal');
  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 130);
  });
});


/* ============================================
   9. SKILL PILLS — hover ripple on click
   ============================================ */
document.querySelectorAll('.pill').forEach((pill) => {
  pill.addEventListener('click', function () {
    this.style.transform = 'scale(0.92)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});


/* ============================================
  10. ADD ACTIVE STYLE FOR NAV LINKS (CSS)
   ============================================ */
// Inject active style dynamically so we don't have to add it in CSS
const styleEl = document.createElement('style');
styleEl.textContent = `
  .nav-links a.active {
    color: var(--heading) !important;
  }
  .nav-links a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(styleEl);
