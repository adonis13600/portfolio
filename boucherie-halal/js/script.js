/* =========================================================
   Le Comptoir Valmont — script
   1. Liste des produits (modifier ici les viandes et les prix)
   2. Menu et en-tête
   3. Cave de maturation
   4. Vitrine et filtres
   5. Panier et commande
   6. Horaires « ouvert maintenant »
   7. Animations d'apparition
   ========================================================= */

document.documentElement.classList.add('js');

/* 1. Produits : prix en euros par kilo */
const PRODUITS = [
  { id: 'cote-boeuf', nom: 'Côte de bœuf maturée', type: 'boeuf', prix: 62, texte: 'Race Aubrac, maturée 45 jours. Persillée et fondante.', img: 'photo-1615937657715-bc7b4b7962c1' },
  { id: 'entrecote', nom: 'Entrecôte', type: 'boeuf', prix: 42, texte: 'Le morceau du boucher : goût franc, cuisson rapide.', img: 'photo-1600891964092-4316c288032e' },
  { id: 'filet', nom: 'Filet de bœuf', type: 'boeuf', prix: 58, texte: 'La pièce la plus tendre, idéale pour un tournedos.', img: 'photo-1558030006-450675393462' },
  { id: 'hache', nom: 'Bœuf haché du jour', type: 'boeuf', prix: 19, texte: 'Haché minute devant vous, 5 % de matière grasse.', img: 'photo-1602470520998-f4a52199a3d6' },
  { id: 'escalope-veau', nom: 'Escalope de veau', type: 'veau', prix: 39, texte: 'Veau de lait élevé sous la mère, en Limousin.', img: 'photo-1529692236671-f1f6cf9683ba' },
  { id: 'jarret-veau', nom: 'Jarret de veau', type: 'veau', prix: 24, texte: 'Pour un osso buco ou un tajine fondant.', img: 'photo-1633237308525-cd587cf71926' },
  { id: 'cotelettes', nom: "Côtelettes d'agneau", type: 'agneau', prix: 34, texte: 'Agneau de lait des Pyrénées, à griller.', img: 'photo-1546964124-0cce460f38ef' },
  { id: 'epaule-agneau', nom: "Épaule d'agneau", type: 'agneau', prix: 26, texte: 'Désossée ou entière, parfaite pour le tajine.', img: 'photo-1594041680534-e8c8cdebd659' },
  { id: 'poulet', nom: 'Poulet fermier', type: 'volaille', prix: 14, texte: 'Label Rouge, élevé en plein air 100 jours.', img: 'photo-1587593810167-a84920ea0781' },
  { id: 'cuisses', nom: 'Cuisses de poulet', type: 'volaille', prix: 11, texte: 'Marinées sur demande : citron, ail, ras el hanout.', img: 'photo-1606728035253-49e8a23146de' },
  { id: 'merguez', nom: 'Brochettes et merguez maison', type: 'specialite', prix: 18, texte: 'Bœuf et agneau marinés, harissa douce. Préparés chaque matin.', img: 'photo-1603360946369-dc9bb6258143' },
  { id: 'viande-sechee', nom: 'Viande séchée de bœuf', type: 'specialite', prix: 69, texte: 'Notre bresaola halal, affinée 4 semaines.', img: 'photo-1588168333986-5078d3ae3976' }
];

const NOMS_TYPES = { boeuf: 'Bœuf', veau: 'Veau', agneau: 'Agneau', volaille: 'Volaille', specialite: 'Spécialité' };
const euros = n => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
const imageUrl = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=75`;

/* 2. Menu et en-tête */
const header = document.getElementById('header');
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

const majHeader = () => header.classList.toggle('scrolle', window.scrollY > 60);
window.addEventListener('scroll', majHeader, { passive: true });
majHeader();

/* 3. Cave de maturation */
const MATURATION = {
  30: { titre: '30 jours — Tendre et franc', texte: 'La viande gagne en tendreté tout en gardant un goût de bœuf net. Parfait pour une première découverte.', prix: 'Côte de bœuf : 52 € / kg', jauge: 50 },
  45: { titre: '45 jours — Notre préférée', texte: 'Des notes de noisette apparaissent, la texture devient fondante. Le meilleur équilibre selon nos bouchers.', prix: 'Côte de bœuf : 62 € / kg', jauge: 75 },
  60: { titre: '60 jours — Pour les connaisseurs', texte: 'Un goût intense, presque de fromage affiné. À servir saignant, en fines tranches.', prix: 'Côte de bœuf : 78 € / kg', jauge: 100 }
};
const onglets = document.querySelectorAll('.onglet');
function afficherMaturation(jours) {
  const m = MATURATION[jours];
  document.getElementById('mat-titre').textContent = m.titre;
  document.getElementById('mat-texte').textContent = m.texte;
  document.getElementById('mat-prix').textContent = m.prix;
  document.getElementById('jauge-niveau').style.width = m.jauge + '%';
  onglets.forEach(o => {
    const actif = o.dataset.jours === String(jours);
    o.classList.toggle('actif', actif);
    o.setAttribute('aria-selected', String(actif));
  });
}
onglets.forEach(o => o.addEventListener('click', () => afficherMaturation(o.dataset.jours)));
afficherMaturation(30);

/* 4. Vitrine et filtres */
const grille = document.getElementById('grille-produits');
grille.innerHTML = PRODUITS.map(p => `
  <article class="produit" data-type="${p.type}">
    <div class="produit-image"><img src="${imageUrl(p.img)}" alt="${p.nom}" loading="lazy"></div>
    <div class="produit-corps">
      <span class="produit-type">${NOMS_TYPES[p.type]} · halal</span>
      <h3>${p.nom}</h3>
      <p>${p.texte}</p>
      <div class="produit-pied">
        <span class="produit-prix">${euros(p.prix)} / kg</span>
        <button type="button" data-ajout="${p.id}">Ajouter 500 g</button>
      </div>
    </div>
  </article>`).join('');

// Si une photo ne charge pas, on garde le fond bordeaux au lieu d'une image cassée
grille.querySelectorAll('img').forEach(img => img.addEventListener('error', () => img.remove()));

document.querySelectorAll('.filtre').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filtre').forEach(b => b.classList.toggle('actif', b === btn));
  const f = btn.dataset.filtre;
  grille.querySelectorAll('.produit').forEach(c => c.classList.toggle('cache', f !== 'tout' && c.dataset.type !== f));
}));

/* 5. Panier et commande */
const choixProduit = document.getElementById('choix-produit');
const choixPoids = document.getElementById('choix-poids');
const panierEl = document.getElementById('panier');
const totalEl = document.getElementById('total');
const panier = [];

choixProduit.innerHTML = PRODUITS.map(p => `<option value="${p.id}">${p.nom} — ${euros(p.prix)}/kg</option>`).join('')
  + '<option value="aid">Agneau de l\'Aïd (réservation)</option><option value="ramadan">Colis Ramadan — 79 €</option>';

function prixLigne(l) {
  if (l.id === 'ramadan') return 79;
  if (l.id === 'aid') return 50; // acompte
  const p = PRODUITS.find(x => x.id === l.id);
  return p.prix * l.poids / 1000;
}
function nomLigne(l) {
  if (l.id === 'ramadan') return 'Colis Ramadan (4 pers.)';
  if (l.id === 'aid') return "Agneau de l'Aïd — acompte";
  const p = PRODUITS.find(x => x.id === l.id);
  return `${p.nom} — ${l.poids >= 1000 ? (l.poids / 1000).toLocaleString('fr-FR') + ' kg' : l.poids + ' g'}`;
}
function afficherPanier() {
  if (!panier.length) {
    panierEl.innerHTML = '<li class="panier-vide">Votre panier est vide.</li>';
  } else {
    panierEl.innerHTML = panier.map((l, i) => `
      <li><span>${nomLigne(l)}</span><span>${euros(prixLigne(l))} <button type="button" data-retirer="${i}">Retirer</button></span></li>`).join('');
  }
  totalEl.textContent = euros(panier.reduce((s, l) => s + prixLigne(l), 0));
}
function ajouter(id, poids) {
  panier.push({ id, poids });
  afficherPanier();
  document.getElementById('erreur-panier').textContent = '';
}

document.getElementById('ajouter').addEventListener('click', () => ajouter(choixProduit.value, Number(choixPoids.value)));
panierEl.addEventListener('click', e => {
  const i = e.target.dataset.retirer;
  if (i !== undefined) { panier.splice(Number(i), 1); afficherPanier(); }
});
grille.addEventListener('click', e => {
  const id = e.target.dataset.ajout;
  if (!id) return;
  ajouter(id, 500);
  e.target.textContent = 'Ajouté ✓';
  setTimeout(() => { e.target.textContent = 'Ajouter 500 g'; }, 1500);
});
document.querySelectorAll('[data-occasion]').forEach(b => b.addEventListener('click', () => {
  choixProduit.value = b.dataset.occasion.includes('Aïd') ? 'aid' : 'ramadan';
}));

// Date de retrait : à partir d'aujourd'hui, jamais le lundi (fermé)
const dateInput = document.getElementById('date');
const auj = new Date();
const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = iso(auj);

const form = document.getElementById('form-commande');
function erreur(champ, message) {
  document.getElementById('erreur-' + champ).textContent = message;
  const input = document.getElementById(champ);
  if (input) input.classList.toggle('invalide', Boolean(message));
  return !message;
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const nom = form.nom.value.trim();
  const tel = form.tel.value.replace(/[\s.-]/g, '');
  const date = form.date.value;
  let ok = true;
  ok = erreur('nom', nom.length < 2 ? 'Indiquez votre nom.' : '') && ok;
  ok = erreur('tel', /^(\+33|0)[1-9]\d{8}$/.test(tel) ? '' : 'Numéro invalide, par exemple 06 12 34 56 78.') && ok;
  let msgDate = '';
  if (!date) msgDate = 'Choisissez un jour.';
  else if (date < dateInput.min) msgDate = 'Ce jour est déjà passé.';
  else if (new Date(date + 'T12:00').getDay() === 1) msgDate = 'Nous sommes fermés le lundi.';
  ok = erreur('date', msgDate) && ok;
  if (!panier.length) { document.getElementById('erreur-panier').textContent = 'Ajoutez au moins une pièce à votre panier.'; ok = false; }
  if (!ok) return;

  const conf = document.getElementById('confirmation');
  const jour = new Date(date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  conf.textContent = `Merci ${nom} ! Votre commande (${totalEl.textContent}) sera prête le ${jour}, créneau ${form.creneau.value}. Nous vous appelons si besoin.`;
  conf.hidden = false;
  form.reset();
  panier.length = 0;
  afficherPanier();
});
afficherPanier();

/* 6. Horaires : ouvert maintenant ? (heures en minutes depuis minuit) */
const HORAIRES = {
  0: [[510, 780]],                 // dimanche
  1: [],                           // lundi
  2: [[510, 780], [900, 1170]], 3: [[510, 780], [900, 1170]],
  4: [[510, 780], [900, 1170]], 5: [[510, 780], [900, 1170]],
  6: [[480, 1170]]                 // samedi
};
(function () {
  const el = document.getElementById('ouvert');
  const maintenant = new Date();
  const min = maintenant.getHours() * 60 + maintenant.getMinutes();
  const ouvert = HORAIRES[maintenant.getDay()].some(([a, b]) => min >= a && min < b);
  el.textContent = ouvert ? '● Ouvert en ce moment' : '● Fermé en ce moment';
  el.classList.add(ouvert ? 'oui' : 'non');
})();

/* 7. Animations d'apparition au défilement */
const elements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
  }), { threshold: 0.12 });
  elements.forEach(el => obs.observe(el));
} else {
  elements.forEach(el => el.classList.add('visible'));
}
