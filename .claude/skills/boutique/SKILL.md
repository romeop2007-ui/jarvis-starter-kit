---
name: boutique
description: Convertit un design Claude Design (bundle .dc.html exporté depuis claude.ai/design) en page produit Liquid fonctionnelle sur la boutique Shopify Zooryn, en conservant le header/footer du thème live. Se déclenche quand Roméo envoie un message du type "Use the claude_design MCP ... Implement: <nom>.dc.html" avec un lien claude.ai/design/p/... Couvre carrousel d'images, bundle/offres en variantes Shopify, prix, avis/FAQ en Liquid pur, prénoms francisés, déploiement live.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch
---

# Skill boutique — Claude Design → page produit Shopify

Transforme un bundle HTML exporté de Claude Design en une page produit Liquid posée sur le
thème live Zooryn (#201573302617, dossier `livrables/ecommerce/boutiques/zooryn-dawn`), avec
le carrousel, le bundle d'offres et les variantes Shopify qui en découlent.

## Déclencheur

Un message de Roméo de cette forme (ne rien exécuter avant d'avoir reçu CE message, le skill
ne se lance pas tout seul à la simple ouverture d'un fichier `.dc.html`) :

```
Use the claude_design MCP (...) to import this project:
https://claude.ai/design/p/<id>?file=<Nom>.dc.html
Implement: <Nom>.dc.html
```

## Étape 0 — Questions à poser à Roméo EN UNE FOIS, avant toute action

1. **URL du produit concurrent** copié par le design (référence à reproduire en cas de doute
   ou d'erreur sur un bloc).
2. **URL du produit Shopify Zooryn** sur lequel implémenter ce design (détermine le produit,
   son prix de référence, son template).
3. **Quel produit Shopify alimente le carrousel** (peut être le même que la question 2, mais
   le redemander explicitement — ne jamais supposer).

Ne pas avancer sans ces 3 réponses. Si Roméo a déjà tout donné dans son message initial, ne
pas reposer les questions déjà répondues.

## Étape 1 — Récupérer et lire le bundle de design

1. Récupérer le lien `claude.ai/design/p/...` (via le MCP `claude_design` si disponible,
   sinon `WebFetch` sur le lien — méthode déjà rodée le 17/06 sur la page matelas).
2. Le résultat est une archive `.gz`. La décompresser : `tar -xzf <fichier>`.
3. Lire **en intégralité** : `README.md`, le ou les fichiers dans `chats/` (transcript —
   l'intention design est dans la discussion, pas seulement dans le HTML), et le `.dc.html`
   visé dans `project/`.

## Étape 2 — Architecture Liquid (conserver le corps de la boutique)

**Règle absolue : ne jamais reconstruire le header/footer.** On garde le header/footer
actuels du thème live (section `zooryn-header` + footer Dawn), exactement comme pour les
pages matelas/oreiller déjà en ligne.

1. Créer un **template produit dédié** (`templates/product.<slug>.json`) qui pointe sur le
   header/footer du thème + une **section auto-suffisante** scopée sous une classe racine
   unique (ex. `.zmira`, `.zsac` — jamais `.zmat`/`.zore`, déjà pris) pour zéro collision CSS
   avec Dawn ou les autres pages produit.
2. **Ordre des blocs imposé par Roméo, à respecter strictement** :
   1. Header (existant, intact)
   2. Carrousel (juste après le header)
   3. Bundle / bloc d'offres (juste à côté du carrousel, même rangée)
   4. Tout le reste des blocs du HTML, dans l'ordre où ils apparaissent dans le design
   5. Footer (existant, intact)
3. Sur le reste des blocs (texte, mise en page, sections de contenu hors carrousel/bundle/
   avis/FAQ) : reproduire fidèlement le design visuel, mais la fonctionnalité exacte de ces
   blocs est secondaire — l'essentiel est que ça rende pareil.

## Étape 3 — Carrousel

- Brancher le carrousel sur les vraies photos du produit Shopify désigné à l'étape 0.3
  (`product.images`, façon `zmat-buybox`/galerie matelas), pas des images statiques en dur.
- Reprendre le style du carrousel du HTML (flèches, vignettes, comportement) tel que livré.

## Étape 4 — Bundle / offres → variantes Shopify

Le design peut contenir 3, 4 ou 5 offres différentes, avec ou sans mécanique "achetez X,
obtenez Y offert". **Lire le HTML pour déterminer la structure exacte de CE bundle**, ne
jamais supposer qu'elle est identique au lot précédent (matelas = Solo/Pack2/Pack4 sans
offert ; un autre produit peut avoir une logique différente).

1. Identifier dans le HTML : nombre d'offres, quantités, présence d'un mécanisme "offert"
   (et sur quel produit : le même ou un produit différent, comme l'oreiller offert sur le
   matelas).
2. Créer/mettre à jour les **variantes du produit Shopify** en conséquence (prix fixes par
   palier, propriétés de ligne pour couleur/taille si présentes dans le design, stock non
   suivi / `inventoryPolicy: CONTINUE` comme les produits déjà en ligne).
3. Si un mécanisme "offert" existe et qu'aucun produit gratuit dédié n'existe encore pour ce
   cadeau, créer un produit à 0 €, tagué `cadeau-cache`, masqué des collections — même
   pattern que "Oreiller gonflable Zooryn — offert" déjà construit pour le matelas. Ajout
   automatique au panier en même quantité que promis par le palier acheté.
4. Câbler le bloc bundle du Liquid sur ces variantes réelles (formulaire produit natif
   Shopify, AJAX), jamais sur des boutons décoratifs.

## Étape 5 — Prix

- **Le prix affiché doit être celui du HTML** (c'est la référence visuelle voulue).
- Si le prix du produit Shopify ne correspond pas à celui du HTML, **modifier le prix du
  produit Shopify** pour qu'il colle au visuel du design (jamais l'inverse).
- Convertir en EUR si le HTML est dans une autre devise (le design source est souvent en
  devise du concurrent).

## Étape 6 — Images

- Toute image présente dans le HTML doit être insérée dans la boutique Shopify (Admin >
  Contenu > Fichiers, déposée par Roméo si Claude ne peut pas uploader directement — résoudre
  ensuite l'URL CDN réelle par requête GraphQL, comme pour le lot T3).
- **Format imposé : toujours 1254×1254**, sans exception, même convention que les pages
  matelas/oreiller déjà en ligne.

## Étape 7 — Avis, reviews clients, FAQ : Liquid pur

- Ces blocs sont **codés en dur en Liquid** (pas d'app tierce, pas de blocs dynamiques au-delà
  de la limite Shopify de 50 blocs/section si le volume est élevé) — même méthode que la
  section avis matelas (masonry, pagination 8 par 8, sans chevron/filtre/bouton "écrire un
  avis" sauf si le design en montre un).
- **Tout prénom étranger ou non-français rencontré (avis, FAQ, mises en situation, témoignages)
  doit être remplacé par un prénom français.** Règle systématique, sans exception, y compris
  pour des prénoms qui pourraient sembler neutres.
- Rappel honnêteté (déjà tracé sur le matelas) : des avis inventés en placeholder sont
  potentiellement non conformes en France — signaler le point à Roméo une fois, sans bloquer,
  c'est lui qui tranche.

## Étape 8 — Vérification fonctionnelle avant de clore

Ne jamais annoncer "terminé" sans avoir vérifié, dans l'ordre :
1. Le bouton "Ajouter au panier" ajoute la bonne variante (ou le bon groupe variante+cadeau)
   au panier.
2. Chaque offre du bundle facture le prix exact affiché (pas un prix par défaut de variante).
3. Les images du carrousel sont bien celles du produit désigné à l'étape 0.3.
4. Les prix affichés partout sur la page correspondent au prix réellement facturé au panier.

Si un point échoue, corriger avant de répondre à Roméo. Ne dire "c'est terminé" que quand les
4 points sont vérifiés.

## Étape 9 — Déploiement (règles du CLAUDE.md, ne pas les redécouvrir)

1. **Toujours `pull` avant de toucher au thème** :
   `shopify theme pull --store cqqah9-t1.myshopify.com --theme 201573302617 --only config/settings_data.json --path "livrables/ecommerce/boutiques/zooryn-dawn"`
2. Push **ciblé** (`--only`) sur les seuls fichiers créés/modifiés (template, section,
   snippets) — jamais `settings_data.json` sans prévenir, jamais un push global.
3. **Édition directe sur le live** : pas de thème d'aperçu, pas de brouillon. Annoncer à
   Roméo les fichiers poussés au moment de le faire.
4. Une fois en ligne, vérifier le rendu réel (demander un screenshot à Roméo si le rendu
   visuel est en jeu — règle générale du workspace pour tout travail visuel Shopify).

## Limites connues

- Pas d'outil d'upload de fichier local vers Shopify côté Claude : les visuels finaux sont
  déposés par Roméo dans Shopify Admin > Contenu > Fichiers, Claude résout l'URL CDN ensuite.
- Le MCP `claude_design` peut ne pas être disponible selon la session ; dans ce cas `WebFetch`
  sur le lien `claude.ai/design/...` reste la méthode de repli déjà validée.
