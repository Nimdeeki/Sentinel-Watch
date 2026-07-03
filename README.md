# Sentinel Watch

A responsive, multi-page blog/news website covering the Indian defence forces —
Army, Navy, Air Force, exam prep (CDS/OTA), and current affairs. Built as the
Week 4 capstone project for the Developers Arena Web Development Internship.

**Live site:** _add your GitHub Pages link here after deploying_
**Repo:** https://github.com/nimdeeki/sentinel-watch _(rename to match your actual repo)_

## Project overview

Sentinel Watch is a fictional defence-forces news and exam-prep blog. It
combines a Week 3 skillset (JavaScript interactivity, form validation) with
new Week 4 requirements: multi-page architecture, full responsive design,
image optimization, and deployment.

**Pages**
- `index.html` — homepage with hero and latest dispatches (articles)
- `articles.html` — full article archive with category filtering
- `about.html` — mission, audience, and author bio
- `contact.html` — contact form with client-side validation

## Features implemented

- Fully responsive, **mobile-first** layout (phone → tablet → desktop breakpoints)
- Accessible hamburger navigation with keyboard support (Escape to close, focus management)
- Category filter on the articles page (vanilla JS, no page reload)
- Contact form with real-time + on-submit validation (name, email format, subject, message length)
- Semantic HTML5 (`header`, `nav`, `main`, `article`, `footer`, ARIA landmarks/labels)
- Lightweight SVG illustrations instead of raster images (faster load, crisp at any size)
- Skip-to-content link and visible focus states for keyboard users
- `prefers-reduced-motion` respected for the ticker animation

## Tech stack

- HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (no frameworks)
- Google Fonts: Rajdhani (display), Source Serif 4 (body), JetBrains Mono (utility/meta text)

## Setup / running locally

No build step required.

1. Clone or download this repository
2. Open `index.html` directly in a browser, **or** serve it locally for the most accurate behavior:
   ```bash
   # Python 3
   python -m http.server 8000
   # then visit http://localhost:8000
   ```

## Folder structure

```
sentinel-watch/
├── index.html
├── about.html
├── articles.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── *.svg
├── README.md
└── DOCUMENTATION.md
```

## Deployment (GitHub Pages)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Under "Build and deployment", set **Source** to "Deploy from a branch"
4. Choose the `main` branch and `/ (root)` folder → **Save**
5. Your site will be live at `https://<username>.github.io/<repo-name>/` within a few minutes

See `DOCUMENTATION.md` for design decisions, testing notes, and screenshots checklist.
