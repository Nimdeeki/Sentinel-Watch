# Sentinel Watch — Project Documentation

## 1. Project overview

**Goal:** Build a complete, responsive, multi-page business/blog website
demonstrating HTML, CSS and JavaScript fundamentals learned across Weeks 1–3,
deployed live on a free host.

**Concept:** Sentinel Watch is a defence-forces news and exam-prep blog,
targeted at CDS/OTA and NDA aspirants. The "dispatch" framing (SITREP ticker,
stamped meta info, DSP-00x article numbering) gives the site a consistent
editorial identity instead of a generic template look.

## 2. Design decisions

| Decision | Reasoning |
|---|---|
| **Color palette** — olive (`#4A5233`), khaki (`#A99A6B`), parchment paper (`#E8E2CE`), signal red (`#B23A24`) | Evokes field gazettes/dispatches rather than a generic tech blog; signal red is reserved for stamps, tags and calls to action so it stays meaningful, not decorative. |
| **Typography** — Rajdhani (display/headings), Source Serif 4 (body), JetBrains Mono (meta/utility text) | Rajdhani's condensed, technical letterforms read as military/stencil-adjacent for headings; a serif body keeps long-form articles readable; mono type marks anything "logged" — bylines, dates, filter labels — like a field log. |
| **Near-zero border radius** | Paper/stamp aesthetic rather than soft app-like UI. |
| **SITREP ticker** | Reinforces the "live dispatch" concept and demonstrates CSS keyframe animation; respects `prefers-reduced-motion`. |
| **Mobile-first CSS** | Base styles target the smallest viewport; `min-width` media queries progressively add layout complexity for tablet (640px) and desktop (900px, 1180px), matching how most aspirants will actually browse (phone-first). |
| **SVG illustrations instead of photos** | No licensing concerns, near-zero file size (under 1.2 KB each vs. typical 100KB+ JPEGs), and they stay sharp on any screen density — a direct answer to the "image optimization" requirement. |

## 3. Site architecture

```
index.html      → Home: hero + 4 featured articles
articles.html    → Full archive of 6 articles, filterable by category
about.html       → Mission, audience, author bio
contact.html     → Contact form (client-side validated)
```

All four pages share the same header/nav/footer markup and a single
`css/style.css` + `js/main.js`, so styling and behavior stay consistent
without duplication of logic.

### Navigation
A single `<nav>` with `aria-current="page"` marking the active link. On
screens under 900px it becomes a slide-in panel triggered by a hamburger
button; the button's `aria-expanded` attribute is kept in sync with the
panel's open/closed state for screen readers.

### Category filter (articles.html)
Each `.card` carries a `data-category` attribute. Filter buttons carry a
matching `data-filter`. Clicking a button toggles `display: none` on
non-matching cards and updates an `aria-live` result count — no page reload,
no framework needed.

### Contact form validation (contact.html)
Validation rules live in a single `rules` object in `main.js`, keyed by
field name (`name`, `email`, `subject`, `message`), so adding a new field
means adding one rule rather than duplicating logic. Fields validate on
`blur` (first pass) and then live on `input` once an error is showing, so
users aren't shown errors while still mid-typing on first attempt. On
submit, all fields are re-checked; if any fail, focus moves to the first
invalid field for accessibility. This is a **static front-end demo** — no
backend is wired up, so "submission" only validates and confirms; connecting
it to a real inbox would mean adding a service like Formspree or a small
backend endpoint.

## 4. Responsive design testing

Tested by resizing the browser viewport and using browser dev tools' device
emulation at the following widths:

| Breakpoint | Width | What changes |
|---|---|---|
| Mobile (base) | 320–639px | Single-column cards, hamburger nav, stacked hero |
| Tablet | 640–899px | 2-column article grid, tag row wraps |
| Desktop | 900–1179px | Full horizontal nav, 3-column grid, 2-column hero/about/contact |
| Large desktop | 1180px+ | 4-column grid on homepage |

**Manual checklist covered:**
- [ ] No horizontal scroll at 320px width
- [ ] Nav toggle opens/closes correctly, closes on link tap and on Escape
- [ ] All images scale within their containers (no overflow)
- [ ] Form fields remain usable and legible at mobile width
- [ ] Text remains readable without zooming at any breakpoint

*(Check these boxes off once you've tested on your own device — see Section 6.)*

## 5. Accessibility features

- Semantic landmarks: `header`, `nav`, `main`, `article`, `aside`, `footer`
- Skip-to-content link, visible on keyboard focus
- Visible focus outline (`:focus-visible`) on all interactive elements
- All images carry descriptive `alt` text
- Form fields have associated `<label>`s and `aria-describedby` error text
- Filter buttons use `aria-pressed`; nav toggle uses `aria-expanded`
- Live regions (`aria-live="polite"`) announce filter results and form status
- Animation disabled for users with `prefers-reduced-motion: reduce`

## 6. Testing evidence

Add your own results here before submission:

1. **Cross-browser check** — open the deployed site in Chrome, Firefox, and
   (if available) Edge/Safari; note any visual differences found.
2. **Real device check** — open the deployed link on your phone; confirm the
   nav toggle and form both work with touch.
3. **Screenshots** — take screenshots of:
   - Homepage at mobile width
   - Homepage at desktop width
   - Articles page with a filter applied
   - Contact form showing a validation error
   - Contact form showing the success message

   Save them into a `screenshots/` folder and link them here, e.g.:
   ```markdown
   ![Homepage mobile](screenshots/home-mobile.png)
   ```

## 7. Known limitations / next steps

- Article "Read dispatch →" links currently point to `#` or back to the
  archive — there's no individual article template (`post.html`) yet. This
  would be a natural Week 5+ extension.
- Contact form has no real backend; messages aren't actually sent anywhere.
- Article content is placeholder/sample text for demonstration purposes.
