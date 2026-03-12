/* ═══════════════════════════════════════════════════
   OGECHI DANIEL NDUBUISI — Portfolio Script v2
   script.js  — Enhanced Dynamic Edition
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
   2. MOBILE NAVIGATION
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
    closeNav(); navToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && navDrawer.classList.contains('open')) closeNav();
});


/* ─────────────────────────────────────────
   3. NAV SCROLL + ACTIVE LINK
───────────────────────────────────────── */
const sections     = Array.from(document.querySelectorAll('section[id]'));
const desktopLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

function onScroll() {
  mainNav.classList.toggle('scrolled', window.scrollY > 20);

  // Scroll progress bar
  const scrollBar = document.getElementById('scrollProgress');
  if (scrollBar) {
    const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled    = (window.scrollY / docHeight) * 100;
    scrollBar.style.width = scrolled + '%';
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
   4. SCROLL REVEAL
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
   5. ANIMATED COUNTERS
───────────────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step     = target / (duration / 16);
  let   current  = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


/* ─────────────────────────────────────────
   6. TYPING HEADLINE ANIMATION
───────────────────────────────────────── */
const typingEl    = document.getElementById('typingText');
const typingWords = ['Systems Engineering', 'Network Architecture', 'Cybersecurity', 'Infrastructure Design', 'IT Leadership'];
let   wordIndex   = 0;
let   charIndex   = 0;
let   isDeleting  = false;

function typeLoop() {
  if (!typingEl) return;
  const word = typingWords[wordIndex];

  if (!isDeleting) {
    typingEl.textContent = word.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typingEl.textContent = word.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      wordIndex   = (wordIndex + 1) % typingWords.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 55 : 90);
}
setTimeout(typeLoop, 800);


/* ─────────────────────────────────────────
   7. CANVAS NETWORK PARTICLE BACKGROUND
   Draws animated network nodes — perfect
   visual metaphor for a network engineer.
───────────────────────────────────────── */
(function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let   W, H, particles;
  const MAX_DIST = 130;
  const COUNT    = window.innerWidth < 600 ? 35 : 65;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.r  = Math.random() * 2.5 + 1;
  }
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  particles = Array.from({ length: COUNT }, () => new Particle());

  // Copper/amber accent colour matching the portfolio theme
  const NODE_COLOR = 'rgba(184,115,51,';   // copper
  const LINE_COLOR = 'rgba(184,115,51,';

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.strokeStyle = LINE_COLOR + (alpha * 0.35) + ')';
          ctx.lineWidth   = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR + '0.7)';
      ctx.fill();
      // Outer glow ring on some particles
      if (p.r > 2.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = NODE_COLOR + '0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }

  function loop() {
    particles.forEach(p => p.update());
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();


/* ─────────────────────────────────────────
   8. CUSTOM CURSOR
───────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('customCursor');
  const dot    = document.getElementById('cursorDot');
  if (!cursor || !dot || window.matchMedia('(pointer: coarse)').matches) return;

  document.body.style.cursor = 'none';

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  // Smooth trailing cursor ring
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale up on interactive elements
  const interactEls = document.querySelectorAll('a, button, [data-cursor-grow]');
  interactEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
})();


/* ─────────────────────────────────────────
   9. DARK / LIGHT MODE TOGGLE
───────────────────────────────────────── */
(function initTheme() {
  const btn      = document.getElementById('themeToggle');
  const htmlEl   = document.documentElement;
  const stored   = localStorage.getItem('ogechi-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default: dark
  const theme = stored || (prefersDark ? 'dark' : 'light');
  htmlEl.setAttribute('data-theme', theme);
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  if (btn) {
    btn.addEventListener('click', () => {
      const current  = htmlEl.getAttribute('data-theme');
      const next     = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('ogechi-theme', next);
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
})();


/* ─────────────────────────────────────────
   10. TERMINAL EASTER EGG
   Type commands in the hidden terminal
   that appears when pressing `  (backtick)
───────────────────────────────────────── */
(function initTerminal() {
  const terminal    = document.getElementById('terminalPanel');
  const termOutput  = document.getElementById('termOutput');
  const termInput   = document.getElementById('termInput');
  const termClose   = document.getElementById('termClose');
  if (!terminal || !termOutput || !termInput) return;

  const commands = {
    help: () => `
<span class="tc-comment">Available commands:</span>
  <span class="tc-cmd">whoami</span>        — Who is Ogechi?
  <span class="tc-cmd">skills</span>        — List all technical skills
  <span class="tc-cmd">experience</span>    — Work history summary
  <span class="tc-cmd">contact</span>       — Get contact details
  <span class="tc-cmd">ping ogechi</span>   — Test connection
  <span class="tc-cmd">hire</span>          — Start the hiring process
  <span class="tc-cmd">clear</span>         — Clear terminal
  <span class="tc-cmd">exit</span>          — Close terminal`,

    whoami: () => `
<span class="tc-highlight">Ogechi Daniel Ndubuisi</span>
IT Infrastructure Engineer — FCT-Abuja, Nigeria
<span class="tc-comment">8+ years • 250+ nodes deployed • 3 institutions served</span>
B.Eng. Electronic & Computer Engineering, UNIZIK
IEEE ComSoc Chairman (2023–2025)`,

    skills: () => `
<span class="tc-comment">── Systems ──────────────────────</span>
  Windows Server, Linux Ubuntu, Kali, Parrot OS
  Server Deployment, UPS, Solar Infrastructure
<span class="tc-comment">── Networking ───────────────────</span>
  Cisco IOS, VLAN, TCP/IP, LAN/WAN
  MikroTik, Ubiquiti, VoIP/PBX, Cat6
<span class="tc-comment">── Security ─────────────────────</span>
  Penetration Testing, ESET, Malwarebytes
  SIEM, Incident Response, System Hardening
<span class="tc-comment">── Certs ─────────────────────────</span>
  Cisco Networking Basics
  Cisco Cybersecurity Specialist
  IBM Cybersecurity Professional`,

    experience: () => `
<span class="tc-highlight">ICT Manager</span> @ De Lord's International College
  Feb 2023 – Dec 2025 | Awka, Anambra

<span class="tc-highlight">Systems & Network Support Intern</span> @ MICTU, UNIZIK
  Aug 2023 – Feb 2024 | Awka, Anambra

<span class="tc-highlight">Systems Analyst</span> @ Patgabin Printing Press
  Sep 2016 – Mar 2020 | Uyo, Akwa Ibom`,

    contact: () => `
<span class="tc-highlight">Email:</span>   ogendubuisi1@gmail.com
<span class="tc-highlight">Phone:</span>   09064556291
<span class="tc-highlight">Location:</span> FCT-Abuja, Nigeria
<span class="tc-highlight">Status:</span>  <span style="color:#4ade80">● Available for hire now</span>`,

    'ping ogechi': () => `
PING ogechi.ndubuisi (198.51.100.42): 56 data bytes
64 bytes from ogechi: icmp_seq=0 ttl=64 time=<span class="tc-highlight">1.2ms</span>
64 bytes from ogechi: icmp_seq=1 ttl=64 time=<span class="tc-highlight">0.9ms</span>
64 bytes from ogechi: icmp_seq=2 ttl=64 time=<span class="tc-highlight">1.1ms</span>
--- ogechi ping statistics ---
3 packets transmitted, 3 received, <span style="color:#4ade80">0% packet loss</span>
<span class="tc-comment">Connection established. Ogechi is responsive. ✓</span>`,

    hire: () => {
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 800);
      return `<span style="color:#4ade80">Initiating contact sequence...</span>
Redirecting to contact form in 1 second...`;
    },

    clear: () => { termOutput.innerHTML = ''; return null; },
    exit:  () => {
      terminal.classList.remove('open');
      return null;
    }
  };

  function runCommand(raw) {
    const input = raw.trim().toLowerCase();
    if (!input) return;

    const line = document.createElement('div');
    line.innerHTML = `<span class="tc-prompt">ogechi@portfolio:~$</span> ${raw}`;
    termOutput.appendChild(line);

    const handler = commands[input];
    const result  = handler ? handler() : `<span class="tc-error">Command not found: ${raw}. Type <span class="tc-cmd">help</span> for available commands.</span>`;

    if (result !== null && result !== undefined) {
      const out = document.createElement('div');
      out.className = 'tc-output';
      out.innerHTML = result;
      termOutput.appendChild(out);
    }

    termOutput.scrollTop = termOutput.scrollHeight;
  }

  // Open terminal with backtick key
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === 'F1') {
      terminal.classList.toggle('open');
      if (terminal.classList.contains('open')) {
        termInput.focus();
        if (termOutput.children.length === 0) {
          runCommand('help');
          termInput.value = '';
        }
      }
    }
  });

  // Open from button
  const termBtn = document.getElementById('openTerminal');
  if (termBtn) {
    termBtn.addEventListener('click', () => {
      terminal.classList.toggle('open');
      if (terminal.classList.contains('open')) {
        termInput.focus();
        if (termOutput.children.length === 0) runCommand('help');
      }
    });
  }

  if (termClose) termClose.addEventListener('click', () => terminal.classList.remove('open'));

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      runCommand(val);
    }
  });
})();


/* ─────────────────────────────────────────
   11. SKILL BAR ANIMATION
───────────────────────────────────────── */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar   = entry.target;
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
      skillBarObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-fill').forEach(el => skillBarObserver.observe(el));


/* ─────────────────────────────────────────
   12. CONTACT FORM HANDLER
───────────────────────────────────────── */
if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
  e.preventDefault();
  const action = contactForm.getAttribute('action');

  if (!action || action.includes('YOUR_FORMSPREE')) {
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

function showSuccess(message) {
  formSuccess.textContent = message;
  formSuccess.classList.add('show');
  submitBtn.textContent   = '✓ Sent!';
  submitBtn.disabled      = true;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function showError(message) {
  formSuccess.textContent = `⚠ ${message}`;
  formSuccess.style.background  = 'rgba(239,68,68,.12)';
  formSuccess.style.borderColor = 'rgba(239,68,68,.25)';
  formSuccess.style.color       = '#FCA5A5';
  formSuccess.classList.add('show');
}


/* ─────────────────────────────────────────
   13. SMOOTH SCROLL WITH NAV OFFSET
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


/* ─────────────────────────────────────────
   14. STAGGER HERO ENTRANCE ANIMATION
───────────────────────────────────────── */
(function heroEntrance() {
  const items = document.querySelectorAll('.hero-stagger');
  items.forEach((el, i) => {
    el.style.animationDelay = `${0.1 + i * 0.15}s`;
    el.classList.add('hero-animate-in');
  });
})();
