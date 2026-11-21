/* =========================================================
   Spectrum06 — script
   1. Menu téléphone   2. Bouton « haut de page »
   3. Lien activité → formulaire   4. Formulaire de réservation
   5. Animations d'apparition
   ========================================================= */

document.documentElement.classList.add('js');

/* 1. Menu téléphone */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
function fermerMenu() {
  nav.classList.remove('ouvert');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
}
burger.addEventListener('click', () => {
  const ouvert = nav.classList.toggle('ouvert');
  burger.setAttribute('aria-expanded', String(ouvert));
  burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', fermerMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') fermerMenu(); });

/* 2. Bouton « haut de page » : apparaît quand on descend */
const haut = document.getElementById('haut');
const majHaut = () => haut.classList.toggle('visible', window.scrollY > 600);
window.addEventListener('scroll', majHaut, { passive: true });
majHaut();

/* 3. Cliquer « Réserver » sur une carte pré-remplit l'activité */
const choixActivite = document.getElementById('activite');
document.querySelectorAll('[data-activite]').forEach(lien => {
  lien.addEventListener('click', () => { choixActivite.value = lien.dataset.activite; });
});

/* 4. Formulaire de réservation */
const form = document.getElementById('form-reservation');
function erreur(id, message) {
  document.getElementById('erreur-' + id).textContent = message;
  document.getElementById(id).classList.toggle('invalide', Boolean(message));
  return !message;
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const enfant = form.prenomEnfant.value.trim();
  const parent = form.parent.value.trim();
  const tel = form.tel.value.replace(/[\s.-]/g, '');
  const email = form.email.value.trim();
  let ok = true;
  ok = erreur('prenom-enfant', enfant ? '' : "Indiquez le prénom de l'enfant.") && ok;
  ok = erreur('parent', parent.length >= 2 ? '' : 'Indiquez votre nom.') && ok;
  ok = erreur('tel', /^(\+33|0)[1-9]\d{8}$/.test(tel) ? '' : 'Numéro invalide, par exemple 06 12 34 56 78.') && ok;
  ok = erreur('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Adresse e-mail invalide.') && ok;
  if (!ok) { form.querySelector('.invalide').focus(); return; }

  const conf = document.getElementById('confirmation');
  conf.textContent = `Merci ${parent} ! Votre demande pour ${enfant} (${form.activite.value}) est bien notée. Nous vous rappelons sous 48 heures.`;
  conf.hidden = false;
  form.reset();
});

/* 5. Animations d'apparition au défilement */
const elements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
  }), { threshold: 0.12 });
  elements.forEach(el => obs.observe(el));
} else {
  elements.forEach(el => el.classList.add('visible'));
}
