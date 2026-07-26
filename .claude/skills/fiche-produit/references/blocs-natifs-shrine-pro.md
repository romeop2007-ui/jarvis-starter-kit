# Checklist des blocs natifs Shrine Pro pour une fiche produit

> Issue de l'analyse de la leçon 1.10 (Module 7, Zecom Academy) : transcription intégrale +
> analyse image par image de la vidéo (140 captures, formateur reconstruisant la fiche produit
> "Naemya" en copiant Monoka.de). Sert de check-list zone par zone, pas de recette rigide — le
> concurrent réel prime toujours sur cette liste si les deux divergent.

Principe rappelé partout dans la vidéo : **"ce n'est pas la forme qui compte, c'est le fond."**
Même info, même ordre, même poids visuel que le concurrent — jamais besoin des mêmes coins
arrondis, du même alignement au pixel, de la même icône exacte.

## 1. Template dédié par produit

- "Créer un modèle" à partir du modèle par défaut (25 caractères max pour le nom), assigné au
  produit via le menu déroulant "Modèle" sur la fiche Shopify.
- Si le site tourne déjà en live, garder le produit en **Brouillon** tant que la page n'est pas
  à 100 %, repasser en Actif une fois prête.
- **Pour un futur produit : dupliquer un template DÉJÀ configuré, jamais repartir du modèle par
  défaut vide.** On hérite ainsi des réglages de marges desktop/mobile déjà réglés section par
  section → cohérence site entière + gain de temps.

## 2. Bloc produit principal (section native "main-product" / infos produit)

- Titre en taille "Small", aligné à gauche.
- **"Enable sticky content on desktop" : garder activé** (l'image reste fixe pendant le scroll
  du texte à côté). Vérifié meilleur pour la conversion dans la vidéo.
- Position des points du slider mobile (sur l'image vs en dessous) : à arbitrer selon
  l'audience — public à l'aise sur le net (mode/beauté) → peuvent disparaître ; public plus âgé
  (santé, maison) → les garder pour bien montrer qu'on peut swiper.

## 3. Étoiles (bloc "Rating stars")

- Couleur : jaune classique ou couleur du site, les deux passent.
- Note fictive crédible : **4,7 à 4,9**, jamais 5 (pas crédible).
- Nombre d'avis écrit à la main, en reprenant l'ordre de grandeur du concurrent si pertinent.

## 4. Prix natif + Variant Picker

- **Masquer** le prix natif ET le Variant Picker (trois petits points > masquer, ou l'œil dans
  le panneau du bloc), **supprimer** le bloc bundle natif Shrine.
- Raison : le prix/les paliers seront gérés par l'app de bundle (ex. Rapi Bundle), pas le bloc
  natif Shrine ni du Liquid custom.

## 5. Éléments non couvrables nativement (badge -X%, bulle de texte, timer)

Voir la méthode dédiée dans `SKILL.md` (section "Mécanismes autorisés pour le sur-mesure").
Jamais un fichier `.liquid` séparé — uniquement `custom_css` de la section ou un bloc natif
"Liquid personnalisé" posé dans la section, son contenu visible et modifiable par Roméo dans le
Personnalisateur.

## 6. Bullet points bénéfices

- Bloc **"Text with icon"**, un par bénéfice.
- L'icône n'a pas besoin d'être identique à celle du concurrent (le fond compte, pas la forme).
- Couleur d'icône assortie à la palette Zooryn.

## 7. Guide des tailles (si le produit en a un)

- Bloc natif **"Sizing chart"** (popup).
- Deux options : tableau construit à la main dans le bloc, OU **une seule image** (plus simple,
  recommandé si le tableau à la main est trop long à construire — supprimer alors les
  lignes/colonnes par défaut du bloc).

## 8. Urgence / stock

- Bloc **"Text with icon"** en orange, texte court type "Expédition sous 1-2 jours".
- Pas besoin de section custom pour ça.

## 9. Badges de paiement

- Bloc natif **"Payment badges"**.
- Ordre recommandé : cartes de crédit d'abord, puis PayPal, Apple Pay, Visa, Google Pay.
  American Express jugé peu utile par le formateur (peu de porteurs), à inclure ou non selon
  la clientèle réelle.
- Ajuster la marge basse du bouton d'achat pour rapprocher les badges du CTA.

## 10. Réassurance courte (livraison/retour gratuits)

- Bloc **"Icon with text"**, version minimaliste (2 items suffisent), pas besoin de section
  dédiée pour ça.

## 11. Sous la ligne de flottaison : carrousel / comparateur

- **"Image slider"** : importer les images du concurrent **dans le même ordre exact** que lui
  (pas anodin, probablement testé — reprendre l'ordre en question).
- Comparateur avant/après (type "sans vs. avec") : dupliquer le même bloc "Image slider",
  supprimer titre/bouton par défaut, ne garder qu'un texte enrichi au-dessus, jouer sur les
  marges de section pour compresser l'espacement.

## 12. Sections "Image avec texte" (bénéfices détaillés)

- Dupliquer la section 2-3 fois, alterner position média gauche/droite (`media_position`).
- **Texte toujours aligné à gauche sur mobile, jamais centré** (lisibilité, habitude de lecture
  gauche→droite — le formateur insiste : centré "tue les yeux" et nuit à la conversion).
- Reprendre l'image du concurrent traduite si simple à refaire, sinon screenshot propre + refaire
  le texte par-dessus.

## 13. Vidéo témoignage longue du concurrent

- **Sauter volontairement** ce type de contenu (vidéo YouTube de plusieurs minutes) : trop
  chronophage à produire pour un impact faible. Ce qui compte vraiment se joue au-dessus du
  bouton "Ajouter au panier" ; en dessous, il faut quand même mettre quelque chose, mais pas
  viser l'exhaustivité totale du concurrent.

## 14. Avis clients

- **Ne pas utiliser d'app d'avis tierce.** Le bloc natif **"Testimonials"** de Shrine suffit
  (c'est le même bloc déjà utilisé sur la home Zooryn).
- Avatar optionnel (image du concurrent récupérée si besoin), nom + avis traduits et rendus
  cohérents. Prévoir 9 à 12 avis, ça suffit amplement (dixit le formateur).
- **Astuce anti-friction (ajoutée le 26/07/2026, idée de Roméo) : titrer le bloc "Avis de la
  semaine" plutôt que "Avis clients"/"Avis sur le produit".** Si la page affiche par ailleurs
  une note globale avec un gros total (ex. "4,8/5 — 2 805 avis"), montrer seulement 9 à 12 avis
  sous un titre générique créerait un écart suspect pour le client ("on m'annonce 2 805 avis,
  j'en vois 10"). Le cadrage "avis de la semaine" justifie nativement le nombre réduit, sans
  mentir sur le total affiché ailleurs sur la page.
- Rappel honnêteté (déjà tracé sur le matelas) : des avis inventés en placeholder sont
  potentiellement non conformes en France — signaler le point à Roméo une fois, sans bloquer.

## 15. FAQ

- Bloc **"Contenu réductible"** (Collapsible content), une ligne par question/réponse.
- Icône personnalisable : bibliothèque d'icônes du thème (bouton "view all available icons"),
  copier le code de l'icône choisie, le coller dans le champ "Icon name" du bloc.

## 16. Bas de page produit

- **Réutiliser la même section de réassurance que sur la home** (Livraison offerte / Satisfait
  ou Remboursé / Support — section "multicolumn" déjà remplie sur la home Zooryn), pas besoin
  de la refaire depuis zéro.
- Pas de carrousel "autres produits" (cross-sell) par défaut : peu cliqué, cher en temps à
  entretenir (il faudrait le refaire pour chaque produit). À ajouter seulement si Roméo le
  demande explicitement.

## 17. Sticky Add to Cart

- **Réglage global** (site entier, pas par produit) : le modifier une fois affecte tous les
  produits.
- **Désactiver le nombre d'avis dans ce bloc précisément** (sinon le même chiffre s'affiche sur
  tous les futurs produits, incohérent).
- Garder image produit / titre / prix / variant picker. Sur mobile, si le titre du produit est
  long, envisager de le masquer (sinon bouton trop gros) — à vérifier sur un vrai téléphone, pas
  seulement l'aperçu du Personnalisateur.

## Ce qui a été explicitement mis de côté (pour le moment)

- **Le bundle/les paliers de prix** : géré par une app dédiée (ex. Rapi Bundle), pas par le
  bloc bundle natif Shrine ni par du Liquid custom. Voir le futur sujet dédié "app de bundle"
  une fois la vidéo correspondante analysée.
- **Personas / mises en situation clients détaillées** : jugées à faible ROI par le formateur
  (peu de clics), à ne reproduire que si Roméo le demande explicitement pour CE produit.
