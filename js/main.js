/* =========================================================
   SENTINEL WATCH — main.js
   Three independent features, each guarded so it only runs
   on pages that actually contain the relevant elements.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initArticleFilter();
  initContactForm();
});

/* ---------- 1. Mobile navigation toggle ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after tapping a link (mobile only)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ---------- 2. Category filter (articles.html) ---------- */
function initArticleFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#articleGrid .card');
  const countEl = document.getElementById('resultCount');
  const noResultsEl = document.getElementById('noResults');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

      let visibleCount = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      if (countEl) {
        countEl.textContent = `Showing ${visibleCount} of ${cards.length} dispatches`;
      }
      if (noResultsEl) {
        noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

/* ---------- 3. Contact form validation (contact.html) ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const rules = {
    name: (v) => v.trim().length > 0,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    subject: (v) => v.trim().length > 0,
    message: (v) => v.trim().length >= 15,
  };

  // Validate a single field and toggle its error state
  function validateField(input) {
    const fieldWrap = document.getElementById(`${input.id}Field`);
    const isValid = rules[input.name](input.value);
    if (fieldWrap) fieldWrap.classList.toggle('has-error', !isValid);
    return isValid;
  }

  // Live validation once a field has been touched
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    if (!input) return;
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      const fieldWrap = document.getElementById(`${input.id}Field`);
      if (fieldWrap && fieldWrap.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(rules).forEach((name) => {
      const input = form.elements[name];
      if (input && !validateField(input)) allValid = false;
    });

    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields before sending.';
      status.classList.add('is-visible', 'is-error');
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // No backend is connected — this is a front-end validation demo.
    status.textContent = `Thanks — your message has been validated and is ready to send. (This is a static demo form; connect it to a backend or a service like Formspree to actually deliver messages.)`;
    status.classList.remove('is-error');
    status.classList.add('is-visible');
    form.reset();
  });
}
