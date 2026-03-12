/* ═══════════════════════════════════════════════════
   OGECHI DANIEL NDUBUISI — Portfolio Script
   script.js
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. DOM REFERENCES
───────────────────────────────────────── */
const mainNav    = document.getElementById('mainNav');
const navToggle  = document.getElementById('navToggle');
const navDrawer  = document.getElementById('navDrawer');
const navOverlay = document.getElementById('navOverlay');
const contactForm = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');


/* ─────────────────────────────────────────
   2. MOBILE NAVIGATION
───────────────────────────────────────── */

/**
 * Open the mobile drawer
 */
function openNav() {
  navDrawer.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close navigation menu');
  navDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';   // prevent background scroll
}

/**
 * Close the mobile drawer
 */
function closeNav() {
  navDrawer.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  navDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Toggle on hamburger click
 */
navToggle.addEventListener('click', () => {
  const isOpen = navDrawer.classList.contains('open');
  isOpen ? closeNav() : openNav();
});

/**
 * Close on overlay tap
 */
navOverlay.addEventListener('click', closeNav);

/**
 * Close when any drawer link is tapped
 */
navDrawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

/**
 * Close on Escape key
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
    closeNav();
    navToggle.focus();
  }
});

/**
 * If window is resized past 900px while drawer is open, close it
 */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && navDrawer.classList.contains('open')) {
    closeNav();
  }
});


/* ─────────────────────────────────────────
   3. NAV SCROLL SHADOW + ACTIVE LINK
───────────────────────────────────────── */
const sections = Array.from(document.querySelectorAll('section[id]'));
const desktopLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

function onScroll() {
  /* Shadow on nav when scrolled */
  mainNav.classList.toggle('scrolled', window.scrollY > 20);

  /* Active link tracking */
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - (window.innerHeight * 0.35);
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  desktopLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentId}`
    );
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load to set initial state


/* ─────────────────────────────────────────
   4. SCROLL REVEAL (IntersectionObserver)
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -32px 0px'
  }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────
   5. CONTACT FORM HANDLER
───────────────────────────────────────── */
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const action = contactForm.getAttribute('action');

  /* ── Fallback: Formspree not yet configured ── */
  if (!action || action === 'YOUR_FORMSPREE_URL') {
    const name    = `${document.getElementById('fname').value} ${document.getElementById('lname').value}`.trim();
    const email   = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'Portfolio Enquiry';
    const message = document.getElementById('message').value;

    const mailSubject = encodeURIComponent(`Portfolio Enquiry from ${name} — ${subject}`);
    const mailBody    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`
    );

    window.location.href = `mailto:ogendubuisi1@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    showSuccess('Message opened in your mail app!');
    return;
  }

  /* ── Live: send to Formspree via fetch ── */
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled    = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      showSuccess('✓ Message received! I\'ll get back to you within 24 hours.');
      contactForm.reset();
    } else {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Server error');
    }
  } catch (err) {
    console.error('Form error:', err);
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled    = false;
    showError('Something went wrong. Please email me directly at ogendubuisi1@gmail.com');
  }
}

function showSuccess(message) {
  formSuccess.textContent = message;
  formSuccess.classList.add('show');
  submitBtn.textContent   = '✓ Sent!';
  submitBtn.disabled      = true;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
  formSuccess.textContent = `⚠ ${message}`;
  formSuccess.style.background = 'rgba(239,68,68,.12)';
  formSuccess.style.borderColor = 'rgba(239,68,68,.25)';
  formSuccess.style.color = '#FCA5A5';
  formSuccess.classList.add('show');
}


/* ─────────────────────────────────────────
   6. SMOOTH SCROLL OFFSET
   Accounts for fixed nav height so headings
   aren't hidden behind the navbar.
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = mainNav.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
