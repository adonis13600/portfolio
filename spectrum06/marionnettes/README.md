# Le Petit Théâtre des Marionnettes — site vitrine

Site d'une page (10 « pages » affichées via `#ancre`) pour un atelier de théâtre de marionnettes destiné aux enfants de 6 à 9 ans.

## Ouvrir le site

Double-cliquer sur `index.html`. Aucune installation n'est nécessaire.
`presentation.html` présente le projet (aperçus ordinateur et mobile, plan du site, charte graphique).

## Structure

```
petit-theatre/
├── index.html         Contenu de toutes les pages
├── presentation.html  Présentation du projet pour le client
├── css/style.css      Styles, découpés en 12 sections commentées
├── js/app.js          Navigation, menu mobile, décors animés, formulaires
└── assets/favicon.svg Icône d'onglet
```

## Modifications courantes

| Je veux changer…              | Où                                                        |
|-------------------------------|-----------------------------------------------------------|
| Horaires, tarifs              | `index.html` → section `PAGE : PARENTS` + `<select>` du formulaire d'inscription |
| Téléphone / e-mail            | `index.html` → topbar (en haut) et `PAGE : CONTACT`       |
| Une couleur du site           | `css/style.css` → bloc `:root` (variables `--gold`, `--crimson`…) |
| Le texte d'une étape          | `index.html` → `PAGE : ÉTAPE 1…4`                         |
| Ajouter une page              | Ajouter `<div id="page-xxx" class="page">` + son titre dans `PAGE_TITLES` (`js/app.js`) |

## Formulaires

Les formulaires affichent un message de confirmation mais **n'envoient encore rien**.
Pour les brancher, compléter la fonction `initForm()` dans `js/app.js` (par exemple avec Formspree ou une API).

## Navigation

Chaque lien utilise une vraie ancre (`#atelier`, `#inscrire`…) : les pages peuvent être partagées par lien direct et les boutons Précédent / Suivant du navigateur fonctionnent.
