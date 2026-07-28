---
name: fiche-produit
description: Construit une fiche produit Shopify sur le thème live Zooryn (Shrine Pro) en copiant le funnel d'un concurrent réel avec les blocs natifs du thème (Testimonials, Image with text, Sizing chart, Collapsible content, etc.), pas en recodant une page entière en Liquid sur-mesure. Se déclenche quand Roméo donne l'URL d'un concurrent à reproduire + le produit Shopify cible, ou dit "fais-moi la fiche produit", "reproduis cette page", "copie ce concurrent". Le Liquid sur-mesure n'intervient qu'en dernier recours, toujours visible et modifiable par Roméo dans le Personnalisateur (jamais un fichier séparé que lui ne peut pas toucher).
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch
---

# Skill fiche-produit — construire une page produit Shopify (Shrine Pro)

Reconstruit la fiche produit d'un concurrent réel sur le thème live Zooryn
(shrine-theme-pro #203403854169, dossier `livrables/ecommerce/boutiques/zooryn-shrine`), en
utilisant en priorité les sections/blocs **natifs** du thème.

**Renommé et réécrit le 26/07/2026** (ex-skill `boutique`, qui était calé sur l'ancien thème
Dawn et une méthode Claude Design → Liquid intégral, entièrement abandonnée : trop lourde, et
surtout, elle produisait des sections en Liquid sur-mesure que Roméo ne pouvait plus retoucher
lui-même sans risquer de tout casser). Si un jour un besoin sort vraiment du cadre des blocs
natifs + `custom_css`/"Liquid personnalisé", on définira une nouvelle méthode à ce moment-là,
pas en ressortant celle-ci.

## Principe directeur

1. **Le funnel compte, pas le pixel.** Reproduire la même info, au même endroit, avec le même
   poids visuel que le concurrent — jamais besoin des mêmes coins arrondis, du même alignement
   au pixel, de la même icône exacte. (Confirmé par la leçon 1.10 de la formation : "ce n'est
   pas la forme qui compte, c'est le fond".)
2. **Construire avec les blocs natifs Shrine Pro en priorité absolue.** Jamais recoder une page
   entière en Liquid sur-mesure quand un bloc natif fait le travail. Voir la check-list complète
   par zone dans `references/blocs-natifs-shrine-pro.md`.
3. **Règle d'or, actée par Roméo le 26/07/2026 : rien ne doit devenir une boîte noire.** Tout ce
   que Claude produit doit rester visible et modifiable par Roméo directement dans le
   Personnalisateur Shopify, sans qu'il ait besoin de repasser par Claude pour un simple
   ajustement. C'est la raison d'être de cette réécriture : l'ancienne méthode (tout en Liquid
   sur-mesure) empêchait Roméo d'intervenir sans risquer de casser le travail.

## Déclencheur

- Roméo donne l'URL d'un concurrent à reproduire + le produit Shopify Zooryn cible (peut être
  dans le même message ou en deux temps).
- Ou il dit "fais-moi la fiche produit", "reproduis cette page", "copie ce concurrent".

## Étape 0 — Infos à demander à Roméo EN UNE FOIS

1. **URL du produit concurrent** à reproduire.
2. **URL/handle du produit Shopify Zooryn** cible (détermine le produit, son prix de référence,
   son template).
3. **Le produit a-t-il un guide des tailles ?** Une app de bundle est-elle déjà installée pour
   gérer les paliers de prix (voir Étape 4), ou fait-on un prix simple pour le moment ?

Ne pas avancer sans ces réponses. Ne pas reposer une question déjà répondue dans le message
initial de Roméo.

## Étape 1 — Observer le concurrent réel, jamais un mockup

1. `WebFetch`/`curl` la vraie page concurrent (souvent accessible directement, contrairement à
   claude.ai qui bloque en 403). Si Cloudflare bloque aussi le concurrent, basculer sur le skill
   `browser-use` (navigateur réel).
2. Inspecter le HTML/CSS réel pour : structure des sections, ordre exact des blocs, couleurs
   réelles (`grep -oE "#[0-9a-fA-F]{6}"`), variables CSS nommées, apps installées (attributs de
   classe type `kaching-bundles`, scripts JSON de config visibles en clair).
3. **Regarder aussi le rendu mobile réel du concurrent** (DevTools format téléphone, ou
   screenshots demandés à Roméo) — le comportement mobile diverge souvent du desktop
   (galerie en swipe plutôt qu'en vignettes, ordre image/texte inversé, etc.).

## Étape 1.5 — Couleurs de marque : mapping depuis le concurrent

Palette Zooryn, **ordonnée par rang** (jamais un jeu figé de 4 couleurs à plaquer partout, un
mapping rang par rang) :

1. Brun noisette `#6E4E37` — marque, header, texte fort
2. Beige clair `#EDE6D9` — fond de travail
3. Terracotta `#C1522A` — CTA, accents dynamiques
4. Olive/moss `#736C62` — accent secondaire, texte discret

1. Extraire les vraies couleurs du concurrent (jamais celles d'un mockup, qui les invente
   parfois) : `grep -oE "#[0-9a-fA-F]{6}"` sur le HTML/CSS réel, trier par fréquence pour
   distinguer une couleur de marque d'une couleur de badge/promo isolée.
2. Classer par rôle (dominante/texte → fond → accent CTA → accent secondaire).
3. Mapper rang pour rang avec la palette Zooryn, sans forcer : si le concurrent n'utilise que 2
   couleurs fortes, n'en poser que 2. Si le concurrent en utilise plus que la palette n'en
   compte, en discuter avec Roméo plutôt que d'improviser.
4. **Le CTA et les sélecteurs de bundle sont le point le plus sensible : reproduire le niveau de
   contraste/vivacité que le concurrent a délibérément posé là, pas juste "quelle couleur Zooryn
   va sur ce bouton".** Vérifier que la couleur Zooryn assignée reproduit un contraste
   équivalent contre le fond du bloc concerné ; sinon, le signaler à Roméo avant de conclure.

## Étape 2 — Construire avec les blocs natifs Shrine Pro (méthode par défaut)

Voir `references/blocs-natifs-shrine-pro.md` pour la check-list complète, zone par zone (bloc
produit principal, prix, bullet points, guide des tailles, badges paiement, réassurance,
carrousel, avis, FAQ, sticky add to cart...), issue de l'analyse détaillée de la leçon 1.10.

Blocs natifs disponibles à connaître : **Rating stars, Text with icon, Image with text,
Image/Video Slider, Sizing chart (popup), Payment badges, Testimonials, Contenu réductible
(Collapsible content), Sticky Add To Cart, Custom columns.**

## Étape 3 — Mécanismes autorisés pour le sur-mesure (quand un bloc natif ne suffit pas)

Deux mécanismes natifs seulement, jamais un fichier `.liquid` séparé ni une section sur-mesure
sans accord explicite de Roméo :

1. **Besoin de style seul** (couleur, taille, espacement d'un élément existant) → le champ
   natif **`custom_css`** de LA section concernée. C'est un vrai réglage de plateforme Shopify
   (vérifié dans le thème : `templates/product.json` contient `"custom_css": []` au niveau de
   chaque section), visible et éditable par Roméo directement dans le panneau "CSS personnalisé"
   de la section, dans le Personnalisateur. Éditer ce champ via le JSON du template revient
   exactement à ce que Roméo le fasse lui-même à la main.
2. **Besoin de vrai contenu/structure** (un badge stylé, une bulle de texte, un mini-widget que
   le concurrent a et qu'aucun bloc natif ne couvre) → le **bloc natif "Liquid personnalisé"**
   (Custom Liquid), posé DANS la section concernée comme n'importe quel autre bloc (via
   "Ajouter un bloc"). Son contenu (le HTML/CSS/Liquid) vit dans le champ du bloc, visible et
   modifiable par Roméo directement dans le Personnalisateur — jamais un fichier séparé dans
   `sections/` ou `snippets/` que lui ne pourrait pas rouvrir sans risquer de casser autre chose.
3. Écrire ce code directement (pas besoin de passer par un aller-retour ChatGPT comme le fait le
   formateur dans la vidéo — observer le concurrent réel via WebFetch/DevTools suffit pour
   écrire le HTML/CSS soi-même), scopé pour ne jamais entrer en collision avec le reste du thème.
4. **Toujours annoncer à Roméo** quand `custom_css` ou un bloc "Liquid personnalisé" est utilisé,
   et pourquoi un bloc natif ne suffisait pas — jamais silencieusement.

## Étape 4 — Bundle / prix par palier

- Géré par une **app dédiée** installée par Roméo (**RapidBundle**), pas par un bloc natif Shrine
  ni par du Liquid custom, sauf absence d'app sur ce produit (voir méthode de repli).
- **Vérifié le 26/07/2026 : aucun accès API/CLI/MCP à la configuration de ces apps** (requête
  `appInstallations` refusée, "access denied" ; les blocs d'app embed n'exposent aucun réglage
  côté thème). Le rôle de Claude ici : conseiller les réglages exacts à reproduire d'après ce
  que fait le concurrent, réagir à des captures d'écran de l'app envoyées par Roméo — jamais
  cliquer soi-même dans l'app.
- **SOP complet de configuration dans `references/rapidbundle-sop.md`** (installation, timing,
  type de bundle à choisir, design des blocs, réglages avancés critiques, astuce "dupliquer" pour
  scaler sur un nouveau produit sans repartir de zéro).

## Étape 5 — Vérification avant de clore

Ne jamais annoncer "terminé" sans avoir vérifié, dans l'ordre :
1. Le bouton "Ajouter au panier" ajoute la bonne variante.
2. Chaque bloc rendu correspond à ce que montre le concurrent (info présente, au bon endroit).
3. Les images utilisées sont bien celles du produit Shopify désigné à l'Étape 0.
4. Si un bloc "Liquid personnalisé" ou un `custom_css` a été utilisé, Roméo sait où le retrouver
   et le modifier lui-même dans le Personnalisateur.

## Étape 6 — Passe mobile obligatoire

Vécu sur Luma (28/06) : la page rendait bien sur desktop mais a dû être reprise cinq fois sur
des détails mobile. Toujours faire cette passe AVANT de clore, en s'appuyant sur le vrai rendu
mobile du concurrent (pas un mockup desktop-only) :

1. **Galerie produit = swipe à la main sur mobile**, pas forcément les mêmes vignettes que
   desktop.
2. **Compteur "X / N"** sur une galerie/carrousel si le concurrent en a un.
3. **Blocs "image + texte" : vérifier l'ordre DOM sur mobile** (image avant texte si c'est ce
   que fait le concurrent — en une colonne, l'ordre par défaut peut donner texte-en-haut).
4. **Texte toujours aligné à gauche sur mobile**, jamais centré (lisibilité).
5. **Tout `<button>` textuel ajouté en Liquid personnalisé doit avoir `color:inherit` explicite**
   (sinon il s'affiche en bleu sur iOS Safari, rendu par défaut du système Apple — vécu sur
   Luma avec les boutons de FAQ/accordéon).

## Étape 7 — Déploiement (règles du CLAUDE.md)

1. **Toujours `pull` avant de toucher au thème** :
   `shopify theme pull --store cqqah9-t1.myshopify.com --theme 203403854169 --only config/settings_data.json --only "templates/*.json" --path "livrables/ecommerce/boutiques/zooryn-shrine"`
2. Push **ciblé** (`--only`) sur les seuls fichiers modifiés (le plus souvent
   `templates/product.<slug>.json`, jamais `settings_data.json` sans prévenir).
3. **Édition directe sur le live** : pas de thème d'aperçu, pas de brouillon. Annoncer à Roméo
   les fichiers poussés au moment de le faire.
4. Une fois en ligne, vérifier le rendu réel (demander un screenshot à Roméo si le rendu visuel
   est en jeu).

## Erreurs déjà commises (à ne pas refaire)

- **Un `<button>` sans `color` explicite s'affiche en BLEU sur iOS Safari.** Voir Étape 6.5.
- **Le `default:` Liquid n'est PAS le défaut réel d'un setting.** Tant qu'aucune valeur n'est
  enregistrée dans `settings_data.json`/le template, Shopify utilise le `"default"` du
  **schéma**, jamais le filtre `{{ s.x | default: '...' }}`. Si on change un texte par défaut,
  modifier les DEUX endroits, puis vérifier le fichier réellement stocké côté serveur (pas
  seulement le rendu public, qui peut sembler périmé à cause du cache serveur Shopify —
  en-tête `etag: page_cache:...`).
- **Renommer un produit touche bien plus que le texte visible** : noms de fichiers, classe
  racine CSS, `id`/variables JS, `"type"`/`"name"` de section, texte en dur partout (`grep -ri`
  sur l'ancien nom avant de pousser), titres de variantes Shopify, `templateSuffix`. Nettoyer les
  anciens fichiers avec `shopify theme push --allow-live --only "<chemin>"` sans que le fichier
  existe en local (le CLI détecte l'absence et supprime côté serveur, sans synchronisation
  complète). Demander confirmation à Roméo avant les mutations Shopify (variantes,
  `templateSuffix`, suppression de fichiers).

## Limites connues

- Pas d'outil d'upload de fichier local vers Shopify côté Claude : les visuels finaux sont
  déposés par Roméo dans Shopify Admin > Contenu > Fichiers, Claude résout l'URL CDN ensuite.
- Aucun accès API/CLI/MCP aux apps tierces installées (bundle, avis, etc.) — voir Étape 4.
