# ogechindubuisi.com — Portfolio v2

Professional portfolio for Ogechi Daniel Ndubuisi, IT Infrastructure Engineer.

---

## 📁 Files in This Package

```
portfolio_v2/
├── index.html                  ← Complete website (single file)
├── README.md                   ← This file
└── [Add these files yourself]
    ├── NDUBUISI_OGECHI_CV.pdf  ← Your CV for the download button
    └── ogechi-ndubuisi.jpg     ← Your professional headshot
```

---

## ✅ 3 Things To Do Before Going Live

### 1. Add Your Photo
- Get a professional headshot (well-lit, neutral background, business attire)
- Name the file: `ogechi-ndubuisi.jpg`
- Place it alongside `index.html`
- Open `index.html` in a text editor, find the comment `── HOW TO ADD YOUR PHOTO ──`
- Replace the `<div class="photo-placeholder">...</div>` block with:
  ```html
  <img src="ogechi-ndubuisi.jpg" alt="Ogechi Daniel Ndubuisi" />
  ```

### 2. Add Your CV PDF
- Export your CV as PDF
- Name it: `NDUBUISI_OGECHI_CV.pdf`
- Place in same folder as `index.html`

### 3. Set Up a Real Contact Form (10 minutes, free)
1. Go to **https://formspree.io** → Sign up free
2. Click **+ New Form** → Name it "Portfolio Contact"
3. Copy the endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`)
4. Open `index.html`, find `action="YOUR_FORMSPREE_URL"`
5. Replace with your real URL
6. Done — submissions go directly to your Gmail

**Without step 3:** The form still works — it opens the visitor's email app as a fallback.

---

## 🚀 Deployment Options

### Option A — Netlify (Recommended, FREE)
1. Sign up at https://netlify.com
2. Drag and drop the `portfolio_v2/` folder onto the Netlify dashboard
3. Live in 30 seconds at a random URL
4. Go to **Domain Management → Add Custom Domain**
5. Enter: `ogechindubuisi.com`
6. Point your domain registrar's nameservers to Netlify (they provide the values)

### Option B — Vercel (Also FREE)
1. Sign up at https://vercel.com
2. New Project → Deploy → Upload folder
3. Settings → Domains → add `ogechindubuisi.com`

### Option C — cPanel / Shared Hosting
1. Log into cPanel → File Manager → `public_html/`
2. Upload `index.html`, your PDF, and your photo
3. Your domain serves the site automatically

---

## 🎨 Quick Customization

All colors are CSS variables at the top of `index.html`:

| Variable       | Value     | Used For              |
|----------------|-----------|----------------------|
| `--cream`      | `#F7F3EE` | Page background       |
| `--ink`        | `#1C1917` | Primary text          |
| `--copper`     | `#C2692A` | Accent / highlights   |
| `--copper-bg`  | `#FDF0E8` | Accent backgrounds    |

Change `--copper` to any color to re-theme the entire site instantly.

---

## 📞 Optional Next Steps

- **LinkedIn link**: Find the commented-out LinkedIn row in the contact section and add your profile URL
- **GitHub link**: If you have projects on GitHub, add it similarly
- **Google Analytics**: Add your GA4 tracking code before `</head>`
- **Favicon**: Add a `favicon.ico` or `favicon.png` in the folder and link it in `<head>`

---

Built for ogechindubuisi.com · IT Infrastructure Engineer
