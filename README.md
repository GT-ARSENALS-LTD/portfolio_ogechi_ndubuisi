# ogechindubuisi.com — Portfolio v3

Portfolio website for Ogechi Daniel Ndubuisi, IT Infrastructure Engineer.
Split into clean, separate files: HTML · CSS · JavaScript.

---

## 📁 File Structure

```
portfolio_v3/
├── index.html               ← Page structure only (no inline CSS or JS)
├── style.css                ← All styles + responsive system
├── script.js                ← All interactivity
├── README.md                ← This file
│
│  ── Add these yourself ──
├── ogechi-ndubuisi.jpg      ← Your professional headshot
└── NDUBUISI_OGECHI_CV.pdf   ← Your CV for download
```

---

## ✅ 3 Things To Do Before Going Live

### 1 — Add Your Photo
- Name your file: `ogechi-ndubuisi.jpg`
- Place it in the same folder as `index.html`
- Open `index.html`, find the comment `═══ HOW TO ADD YOUR PHOTO`
- Delete the `<div class="photo-placeholder">...</div>` block
- Replace it with one line:
  ```html
  <img src="ogechi-ndubuisi.jpg" alt="Ogechi Daniel Ndubuisi" width="420" height="525" />
  ```

### 2 — Add Your CV PDF
- Export your CV as PDF
- Name it: `NDUBUISI_OGECHI_CV.pdf`
- Place in the same folder as `index.html`

### 3 — Connect Formspree (real contact form, 5 min, free)
1. Go to **formspree.io** → Sign up with Gmail
2. Click **+ New Form** → name it "Portfolio Contact"
3. Copy the endpoint (looks like `https://formspree.io/f/xxxxxxxx`)
4. Open `index.html`, find `action="YOUR_FORMSPREE_URL"`
5. Replace it with your real URL

Without step 3, the form falls back to opening your email app — still works.

---

## 🚀 Deploy to Your Domain

### Option A — Netlify (Recommended, FREE)
1. Go to netlify.com → sign up
2. Drag the `portfolio_v3/` folder onto the dashboard
3. Live instantly → go to Domain Management → Add `ogechindubuisi.com`
4. Point your domain registrar's nameservers to Netlify

### Option B — Vercel (Also FREE)
1. vercel.com → New Project → Upload folder
2. Settings → Domains → add `ogechindubuisi.com`

### Option C — cPanel Hosting
1. cPanel → File Manager → `public_html/`
2. Upload all 4 files + your photo + your PDF
3. Done

---

## 🎨 Customising Colours

All design tokens live at the top of `style.css` in the `:root {}` block.
Change `--copper: #C2692A` to any hex colour to re-theme the entire site instantly.

---

## 🔗 Adding LinkedIn

Open `index.html` and find the commented-out LinkedIn block in the contact section.
Uncomment it and replace `YOUR-PROFILE` with your LinkedIn username.
