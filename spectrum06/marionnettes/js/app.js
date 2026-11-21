/* ==========================================================================
   Le Petit Théâtre des Marionnettes — scripts
   --------------------------------------------------------------------------
   1. Navigation entre les pages (routage par #ancre)
   2. Menu mobile
   3. Décors animés (étoiles, guirlande, fanions)
   4. Formulaires
   5. Initialisation
   ========================================================================== */
(function () {
  'use strict';

  const PAGE_TITLES = {
    home: 'Atelier enfants 6-9 ans',
    atelier: "L'atelier",
    programme: 'Programme',
    histoires: 'Inventer des histoires',
    marionnettes: 'Choisir les marionnettes',
    spectacle: 'Préparer le spectacle',
    scene: 'Jouer sur scène',
    parents: 'Espace parents',
    inscrire: 'Inscription',
    contact: 'Contact'
  };
  const SITE_NAME = 'Le Petit Théâtre des Marionnettes';


  /* ───── 1. NAVIGATION ───── */
  function goTo(id, { scroll = true } = {}) {
    if (!document.getElementById('page-' + id)) id = 'home';

    document.querySelectorAll('.page').forEach(p => {
      p.classList.toggle('active', p.id === 'page-' + id);
    });

    document.querySelectorAll('[data-page]').forEach(a => {
      const current = a.dataset.page === id;
      a.classList.toggle('active', current);
      if (current) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    document.title = id === 'home'
      ? `${SITE_NAME} — ${PAGE_TITLES.home}`
      : `${PAGE_TITLES[id]} — ${SITE_NAME}`;

    if (scroll) scrollToTop();
    closeMenu();
  }

  // Anciens Safari : scrollTo(options) non supporté -> repli sur scrollTo(0, 0)
  function scrollToTop() {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function currentPage() {
    return decodeURIComponent(location.hash.replace('#', '')) || 'home';
  }


  /* ───── 2. MENU MOBILE ───── */
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }


  /* ───── 3. DÉCORS ANIMÉS ───── */
  const rand = (min, max) => Math.random() * (max - min) + min;

  function makeStars() {
    const bg = document.querySelector('.hero-stars');
    if (!bg) return;
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('div');
      const size = rand(1, 4);
      s.className = 'star';
      s.style.cssText =
        `width:${size}px;height:${size}px;left:${rand(0, 100)}%;top:${rand(0, 100)}%;` +
        `--d:${rand(1.5, 4.5).toFixed(1)}s;--dl:${rand(0, 3).toFixed(1)}s`;
      bg.appendChild(s);
    }
  }

  function makeLights() {
    const line = document.querySelector('.lights-line');
    if (!line) return;
    const colors = ['#FFD700', '#FF7F00', '#E63030', '#3A8FE6', '#2ECC71'];
    for (let i = 0; i < 24; i++) {
      const b = document.createElement('div');
      b.className = 'bulb';
      b.style.setProperty('--c', colors[i % colors.length]);
      b.style.setProperty('--dl', `${(i % colors.length) * 0.4}s`);
      line.appendChild(b);
    }
  }

  function makeCTAStars() {
    const wrap = document.querySelector('.cta-stars');
    if (!wrap) return;
    const positions = [[15, 20], [25, 60], [40, 15], [55, 75], [70, 30], [80, 65], [90, 20], [10, 80], [60, 10], [35, 90]];
    positions.forEach(([left, top], i) => {
      const s = document.createElement('span');
      s.className = 'cta-star';
      s.textContent = '✦';
      s.style.cssText = `left:${left}%;top:${top}%;animation-delay:${i * 0.3}s`;
      wrap.appendChild(s);
    });
  }

  function makeBunting() {
    const b = document.querySelector('.bunting');
    if (!b) return;
    const colors = ['#E74C3C', '#F39C12', '#2ECC71', '#3498DB', '#9B59B6', '#E67E22', '#1ABC9C'];
    for (let i = 0; i < 28; i++) {
      const f = document.createElement('div');
      f.className = 'flag';
      f.style.background = colors[i % colors.length];
      b.appendChild(f);
    }
  }


  /* ───── 4. FORMULAIRES ───── */
  // Démo : aucun envoi réel. Brancher ici un service (Formspree, API, e-mail…)
  function initForm(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = document.getElementById(form.dataset.success);
      form.hidden = true;
      if (ok) {
        ok.classList.add('show');
        ok.focus();
      }
    });
  }


  /* ───── 5. INITIALISATION ───── */
  document.addEventListener('DOMContentLoaded', () => {
    makeStars();
    makeLights();
    makeCTAStars();
    makeBunting();

    // Les liens sont de vraies ancres (#page) : le routage suit l'URL,
    // donc les boutons Précédent / Suivant du navigateur fonctionnent.
    goTo(currentPage(), { scroll: false });
    window.addEventListener('hashchange', () => {
      const id = currentPage();
      if (document.getElementById('page-' + id)) goTo(id); // ignore #main (lien d'évitement)
    });

    if (toggle) toggle.addEventListener('click', toggleMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    document.querySelectorAll('form[data-success]').forEach(initForm);

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
