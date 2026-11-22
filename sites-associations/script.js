// En-tête : transparent sur la photo, plein quand on descend
const entete = document.getElementById('entete');
const majEntete = () => entete.classList.toggle('plein', window.scrollY > 40);
majEntete();
window.addEventListener('scroll', majEntete, { passive: true });

// Menu burger (téléphone)
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
const fermerMenu = () => {
  menu.classList.remove('ouvert');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
};
burger.addEventListener('click', () => {
  const ouvert = menu.classList.toggle('ouvert');
  burger.setAttribute('aria-expanded', String(ouvert));
  burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
  if (ouvert) entete.classList.add('plein'); else majEntete();
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', fermerMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') fermerMenu(); });

// Apparition douce des blocs
const blocs = document.querySelectorAll('.section .conteneur > *, .carte, .etapes li');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entrees => {
    entrees.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  blocs.forEach(b => { b.classList.add('apparait'); obs.observe(b); });
}

// Formulaire de contact
// Formulaire de contact : envoyé à Formspree, qui transfère la demande par mail
const form = document.getElementById('formulaire');
const msg = document.getElementById('message-form');
const bouton = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const vide = [...form.elements].find(el => el.required && !el.value.trim());
  const email = form.elements.email;
  if (vide) { msg.textContent = 'Merci de remplir tous les champs.'; vide.focus(); return; }
  if (!email.checkValidity()) { msg.textContent = 'Votre adresse mail ne semble pas valide.'; email.focus(); return; }
  bouton.disabled = true;
  msg.textContent = 'Envoi en cours…';
  try {
    const rep = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!rep.ok) throw new Error();
    msg.textContent = 'Merci ! Votre demande a bien été envoyée. Je vous réponds rapidement.';
    form.reset();
  } catch {
    msg.textContent = "Désolé, l'envoi n'a pas marché. Réessayez dans un instant.";
  } finally {
    bouton.disabled = false;
  }
});
