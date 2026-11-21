# Refonte du blog « Les Chemins de la Pensée » — design (court)

Date : 21 novembre 2026. Choix de James : **proposition A « Nuit studieuse »**.

## Pourquoi
James veut changer l'apparence (couleurs, typo) et l'organisation de son blog, et ajouter une rubrique **Technologie**. Il a écarté la variante Blog de son design system (noir / rouge brique) : il voulait quelque chose de différent. Ce choix vaut **seulement pour le blog** ; le design system ne change pas.

## Objectifs
- Nouvelle apparence A partout : accueil, 4 articles, page Débattre.
- Nouvelle organisation de l'accueil : un grand article « À la une », puis les autres en liste numérotée.
- Rubrique Technologie : menu, filtre de l'accueil, bandeau, pied de page.
- Garder ce qui marche : filtre des rubriques, menu visible sur téléphone, barre de lecture, bloc « Débattre » en fin d'article, bouton « Me suivre » vers son Facebook.

## Hors sujet (pas maintenant)
- Commentaires, newsletter, statistiques, nom de domaine.
- Le texte de ses articles ne change pas.

## Ce qui serait un échec
- Un blog difficile à lire sur téléphone (la plupart de ses lecteurs viennent de Facebook, sur téléphone).
- Perdre un article, une image ou un crédit photo.

## Approches considérées
1. **Garder les fichiers actuels et changer leur style** (CSS + structure de l'accueil). ← choisie : rapide, rien à installer, la mise en ligne sur Hostinger reste la même.
2. Passer à WordPress ou à un générateur de site : plus lourd, nouvelle façon de publier à apprendre. Écarté.

## Le design
- **Couleurs** : bleu nuit `#0F1720` (fond), ivoire `#EDE6D6` (texte), ambre `#E0A44A` (accent). Texte secondaire `#B7B0A2`, filets `#26313D`.
- **Typo** : titres en Fraunces (un mot en italique ambre), texte en Source Sans 3.
- **Accueil** : en-tête (logo + menu : Accueil, Philosophie, Géopolitique, Histoire, Technologie, Débattre) → « À la une » (grand titre + photo + bouton « Lire l'article ») → « Derniers articles » en liste numérotée (titre, rubrique, temps de lecture) → pied de page.
- **À la une** : l'article le plus récent (proposition ; James peut en choisir un autre).
- **Technologie sans article** : la rubrique affiche « Premier article bientôt ».
- **Articles et Débattre** : mêmes couleurs et typo ; lecture confortable sur fond sombre (texte assez grand, lignes pas trop longues).
- **Temps de lecture** : calculés à partir du vrai texte de chaque article.

## Laissé au constructeur
Détails d'espacement, d'animation et de la version téléphone, tant que tout reste lisible.

## Sécurité
Copie de sauvegarde du blog actuel avant de toucher à quoi que ce soit. Le zip pour Hostinger est refait à la fin.
