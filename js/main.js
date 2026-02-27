// ============================================================
// main.js — Hamburger menu toggle + dynamic copyright year
// Pattern from DMIT-2033: centralized setMenu() keeps state in sync
// ============================================================

const btn = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');

if (btn && nav) {

    /**
     * Centralized helper: syncs button aria-expanded, nav aria-hidden,
     * and the show-menu CSS class all in one place.
     */
    const setMenu = (open) => {
        btn.setAttribute('aria-expanded', String(open));
        nav.setAttribute('aria-hidden', String(!open));
        nav.classList.toggle('show-menu', open);
    };

    // Initialise to match whatever aria-expanded is set to in HTML
    setMenu(btn.getAttribute('aria-expanded') === 'true');

    // Toggle on button click
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        setMenu(!isOpen);
    });

    // Keyboard affordance: ESC closes the menu
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('show-menu')) {
            setMenu(false);
            btn.focus();
        }
    });

    // Close menu when a nav link is tapped (smooth-scroll UX on mobile)
    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('show-menu')) {
                setMenu(false);
            }
        });
    });
}

// ── Dynamic copyright year ────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
