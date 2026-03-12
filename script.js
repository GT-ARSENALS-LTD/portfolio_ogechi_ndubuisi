/* ═══════════════════════════════════════════════════
   OGECHI DANIEL NDUBUISI — Portfolio Script v2
   Your original script + all new dynamic features
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. DOM REFERENCES
───────────────────────────────────────── */
const mainNav     = document.getElementById('mainNav');
const navToggle   = document.getElementById('navToggle');
const navDrawer   = document.getElementById('navDrawer');
const navOverlay  = document.getElementById('navOverlay');
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');


/* ─────────────────────────────────────────
   2. MOBILE NAVIGATION  (unchanged)
───────────────────────────────────────── */
function openNav() {
  navDrawer.classList.add('open');
  navOverlay.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close navigation menu');
  navDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  navDrawer.classList.remove('open');
  navOverlay.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  navDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
navToggle.addEventListener('click', () => {
  navDrawer.classList.contains('open') ? closeNav() : openNav();
});
navOverlay.addEventListener('click', closeNav);
navDrawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
    closeNav();
    navToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && navDrawer.classList.contains('open')) closeNav();
});


/* ── DARK / LIGHT MODE TOGGLE ── */
(function initTheme() {
  const btn    = document.getElementById('themeToggle');
  const html   = document.documentElement;
  const stored = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply saved preference or system preference
  html.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));
  updateIcon();

  if (btn) {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateIcon();
    });
  }

  function updateIcon() {
    if (!btn) return;
    const isDark = html.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
})();

/* ─────────────────────────────────────────
   3. NAV SCROLL SHADOW + ACTIVE LINK
       + SCROLL PROGRESS BAR  (new)
───────────────────────────────────────── */
const sections     = Array.from(document.querySelectorAll('section[id]'));
const desktopLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

function onScroll() {
  mainNav.classList.toggle('scrolled', window.scrollY > 20);

  /* ── NEW: scroll progress bar ── */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((window.scrollY / docHeight) * 100) + '%';
  }

  let currentId = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - window.innerHeight * 0.35) {
      currentId = section.id;
    }
  });
  desktopLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ─────────────────────────────────────────
   4. SCROLL REVEAL  (unchanged)
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────
   5. CONTACT FORM HANDLER  (unchanged)
───────────────────────────────────────── */
if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
  e.preventDefault();
  const action = contactForm.getAttribute('action');

  if (!action || action === '#' || action === '') {
    const name    = `${document.getElementById('fname').value} ${document.getElementById('lname').value}`.trim();
    const email   = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'Portfolio Enquiry';
    const message = document.getElementById('message').value;
    const mailSubject = encodeURIComponent(`Portfolio Enquiry from ${name} — ${subject}`);
    const mailBody    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`);
    window.location.href = `mailto:ogendubuisi1@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    showSuccess('Message opened in your mail app!');
    return;
  }

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled    = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(action, {
      method: 'POST', body: formData,
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
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled    = false;
    showError('Something went wrong. Please email me directly at ogendubuisi1@gmail.com');
  }
}
function showSuccess(msg) {
  formSuccess.textContent = msg;
  formSuccess.classList.add('show');
  submitBtn.textContent   = '✓ Sent!';
  submitBtn.disabled      = true;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function showError(msg) {
  formSuccess.textContent       = `⚠ ${msg}`;
  formSuccess.style.background  = 'rgba(239,68,68,.12)';
  formSuccess.style.borderColor = 'rgba(239,68,68,.25)';
  formSuccess.style.color       = '#DC2626';
  formSuccess.classList.add('show');
}


/* ─────────────────────────────────────────
   6. SMOOTH SCROLL OFFSET  (unchanged)
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


/* ════════════════════════════════════════════
   NEW FEATURES BELOW
   All additions — nothing above was changed
   ════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   7. ANIMATED NETWORK CANVAS  (new)
   Warm copper nodes on cream background —
   matches your existing light theme.
───────────────────────────────────────── */
(function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const MAX_DIST = 120;
  const COUNT    = window.innerWidth < 600 ? 28 : 55;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 2 + 1;
  }
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  particles = Array.from({ length: COUNT }, () => new Particle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(194,105,42,${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(194,105,42,0.5)';
      ctx.fill();
    });
  }

  function loop() { particles.forEach(p => p.update()); draw(); requestAnimationFrame(loop); }
  loop();
})();


/* ─────────────────────────────────────────
   8. TYPING ANIMATION  (new)
───────────────────────────────────────── */
(function initTyping() {
  const el    = document.getElementById('typingText');
  if (!el) return;
  const words = ['Systems Engineering', 'Network Architecture', 'Cybersecurity', 'Infrastructure Design', 'IT Leadership'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function loop() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === word.length) { deleting = true; setTimeout(loop, 1800); return; }
    } else {
      el.textContent = word.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
    }
    setTimeout(loop, deleting ? 55 : 90);
  }
  setTimeout(loop, 800);
})();


/* ─────────────────────────────────────────
   9. ANIMATED COUNTERS  (new)
───────────────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.getAttribute('data-target'), 10);
    const step   = target / (1800 / 16);
    let current  = 0;
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else { el.textContent = Math.floor(current); }
    }, 16);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


/* ─────────────────────────────────────────
   10. SKILL BAR ANIMATION  (new)
───────────────────────────────────────── */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.width = entry.target.getAttribute('data-level') + '%';
    skillBarObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-fill').forEach(el => skillBarObserver.observe(el));


/* ─────────────────────────────────────────
   11. CUSTOM CURSOR  (new)
   Copper ring on desktop only — matches
   your --copper: #C2692A colour exactly.
───────────────────────────────────────── */
(function initCursor() {
  const ring = document.getElementById('customCursor');
  const dot  = document.getElementById('cursorDot');
  if (!ring || !dot) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

  document.body.style.cursor = 'none';
  let mx = -100, my = -100, cx = -100, cy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
  });
  (function animRing() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    ring.style.transform = `translate(${cx - 16}px,${cy - 16}px)`;
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
})();


/* ─────────────────────────────────────────
   12. TERMINAL EASTER EGG  (new)
   Press ` (backtick) or >_ button in nav.
───────────────────────────────────────── */
(function initTerminal() {
  const panel      = document.getElementById('terminalPanel');
  const output     = document.getElementById('termOutput');
  const input      = document.getElementById('termInput');
  const closeBtn   = document.getElementById('termClose');
  const openBtns   = document.querySelectorAll('.open-terminal-btn');
  if (!panel || !output || !input) return;

  const commands = {
    help: () => `<span class="tc-dim">Available commands:</span>
  <span class="tc-cmd">whoami</span>        — Who is Ogechi?
  <span class="tc-cmd">skills</span>        — List technical skills
  <span class="tc-cmd">experience</span>    — Work history
  <span class="tc-cmd">contact</span>       — Contact details
  <span class="tc-cmd">ping ogechi</span>   — Test connection
  <span class="tc-cmd">hire</span>          — Start hiring process
  <span class="tc-cmd">clear</span>         — Clear terminal
  <span class="tc-cmd">exit</span>          — Close terminal`,

    whoami: () => `<span class="tc-highlight">Ogechi Daniel Ndubuisi</span>
IT Infrastructure Engineer — FCT-Abuja, Nigeria
<span class="tc-dim">8+ years · 250+ nodes deployed · 3 institutions served</span>
B.Eng. Electronic & Computer Engineering, UNIZIK
IEEE ComSoc Chairman (2023–2025)`,

    skills: () => `<span class="tc-dim">── Systems ──────────────────────</span>
  Windows Server, Linux Ubuntu, Kali, Solar/UPS
<span class="tc-dim">── Networking ───────────────────</span>
  Cisco IOS, VLAN, TCP/IP, MikroTik, Ubiquiti
<span class="tc-dim">── Security ─────────────────────</span>
  Pen Testing, ESET, Incident Response, SIEM
<span class="tc-dim">── Certs ────────────────────────</span>
  Cisco Networking · Cisco Cybersecurity Specialist
  IBM Cybersecurity Professional`,

    experience: () => `<span class="tc-highlight">ICT Manager</span> — De Lord's International College
  Feb 2023 – Dec 2025 | Awka, Anambra

<span class="tc-highlight">Systems & Network Support Intern</span> — MICTU, UNIZIK
  Aug 2023 – Feb 2024 | Awka, Anambra

<span class="tc-highlight">Systems Analyst</span> — Patgabin Printing Press
  Sep 2016 – Mar 2020 | Uyo, Akwa Ibom`,

    contact: () => `<span class="tc-highlight">Email:</span>    ogendubuisi1@gmail.com
<span class="tc-highlight">Phone:</span>    09064556291
<span class="tc-highlight">Location:</span> FCT-Abuja, Nigeria
<span class="tc-highlight">Status:</span>   <span style="color:#16a34a">● Available for hire now</span>`,

    'ping ogechi': () => `PING ogechi.ndubuisi: 56 bytes
64 bytes: icmp_seq=0 time=<span class="tc-highlight">1.2ms</span>
64 bytes: icmp_seq=1 time=<span class="tc-highlight">0.9ms</span>
64 bytes: icmp_seq=2 time=<span class="tc-highlight">1.1ms</span>
--- 3 packets, 0% loss <span style="color:#16a34a">✓ Ogechi is online</span>`,

    hire: () => {
      setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }), 700);
      return `<span style="color:#16a34a">Initiating contact sequence…</span>
Redirecting to contact form in 1 second.`;
    },
    clear: () => { output.innerHTML = ''; return null; },
    exit:  () => { panel.classList.remove('open'); return null; }
  };

  function run(raw) {
    if (!raw.trim()) return;
    const line = document.createElement('div');
    line.innerHTML = `<span class="tc-prompt">ogechi@portfolio:~$</span> ${raw}`;
    output.appendChild(line);

    const result = commands[raw.trim().toLowerCase()];
    const text   = result ? result() : `<span class="tc-error">Command not found: ${raw}. Type <span class="tc-cmd">help</span></span>`;
    if (text !== null && text !== undefined) {
      const out = document.createElement('div');
      out.className = 'tc-output';
      out.innerHTML = text;
      output.appendChild(out);
    }
    output.scrollTop = output.scrollHeight;
  }

  function openTerm() {
    panel.classList.add('open');
    input.focus();
    if (!output.children.length) { run('help'); input.value = ''; }
  }

  // Backtick key
  document.addEventListener('keydown', e => {
    if (e.key === '`') { panel.classList.toggle('open'); if (panel.classList.contains('open')) openTerm(); }
    if (e.key === 'Escape' && panel.classList.contains('open')) panel.classList.remove('open');
  });

  openBtns.forEach(btn => btn.addEventListener('click', openTerm));
  if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { const v = input.value; input.value = ''; run(v); }
  });
})();


/* ─────────────────────────────────────────
   13. HERO STAGGER ENTRANCE  (new)
───────────────────────────────────────── */
document.querySelectorAll('.hero-stagger').forEach((el, i) => {
  el.style.animationDelay = `${0.1 + i * 0.15}s`;
  el.classList.add('hero-animate-in');
});
