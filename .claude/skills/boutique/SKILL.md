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

1. Récupérer le projet de design. **Méthode qui marche réellement (validée 27/06) : l'outil
   `DesignSync`**, PAS un `.gz` à télécharger :
   - `DesignSync method=get_project projectId=<id>` (l'id est dans l'URL `claude.ai/design/p/<id>`)
     pour confirmer l'accès.
   - `DesignSync method=list_files projectId=<id>` pour lister les fichiers (le `.dc.html`,
     `support.js`, `uploads/`, `screenshots/`).
   - `DesignSync method=get_file projectId=<id> path="<Nom>.dc.html"` pour lire le contenu —
     le retour peut être volumineux (>80 Ko), il est sauvegardé dans un fichier de résultat
     d'outil ; le décoder en JSON (le champ `content` contient le HTML avec des `\n` littéraux)
     pour le relire proprement, par ex. via un petit script Node qui réécrit le HTML dans un
     vrai fichier `.html` (sinon `Read`/`Grep` butent sur une seule ligne géante).
   - `WebFetch` direct sur le lien `claude.ai/design/...` échoue systématiquement (403,
     Cloudflare exige le login claude.ai) : ne pas perdre de temps à réessayer, basculer sur
     `DesignSync` tout de suite si le lien renvoie 403.
   - Il n'y a en général **pas** de `README.md` ni de dossier `chats/` accessibles via
     `DesignSync` (contrairement à ce que décrivait une version antérieure de ce skill) —
     l'intention design se déduit du `.dc.html` lui-même (commentaires de section, structure).
2. **Récupérer aussi la vraie page du concurrent (étape 0.1), pas seulement le mockup
   Claude Design.** Le bundle `.dc.html` est une interprétation stylisée par l'IA, pas une copie
   1:1 — elle peut inventer une police, un style de widget, et **carrément oublier des blocs**
   qui existent sur la vraie page (vécu sur Luma : police Playfair/DM Sans inventée au lieu du
   vrai Poppins du thème concurrent, widget de bundle réinventé au lieu du vrai widget app
   "Kaching Bundles", et un carrousel de citations clients entièrement absent du mockup alors
   qu'il existe bien sur la page réelle, juste sous les icônes de paiement). **Toujours** :
   - `curl` la vraie URL concurrent (souvent sans blocage, contrairement à claude.ai) et
     `grep -o "font-family:[^;]*"` pour trouver la vraie police du thème.
   - Repérer les apps installées (`grep -o 'class="[a-z-]*"' `, noms d'extensions Shopify type
     `kaching-bundles`, `judge.me`, etc.) et leurs `<script type="application/json">` de config
     — ils contiennent souvent les vraies données (textes, prix, structure) en clair.
   - Comparer bloc par bloc le mockup au DOM réel de la page concurrent avant de considérer la
     conversion terminée, pas seulement avant de répondre à Roméo une première fois.

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
- **Format imposé : toujours 1254×1254, sans exception, sur TOUT appel `image_url` de la
  page** (galerie produit principale ET vignettes plein format, blocs "story"/lifestyle,
  photos clients/avis, swatches) — pas seulement sur "les images à insérer" au sens upload.
  **Erreur déjà commise (Luma, 27/06) : galerie posée en 1100px, blocs story en 1400×1100,
  photos clients en 600×450 (4:3)** — aucun n'était en 1254×1254, corrigé après coup. Avant de
  clore, faire un `grep -n "image_url: width" sections/*.liquid` sur tous les fichiers
  créés/modifiés et vérifier que CHAQUE occurrence a `width: 1254, height: 1254` (sauf les
  vraies miniatures UI de petite taille type vignette 220×220, qui restent un rendu CDN plus
  petit de la même source, pas un format à part).

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

## Erreurs déjà commises sur ce skill (à ne pas refaire)

- **Le `default:` Liquid n'est PAS le défaut réel d'un setting de section.** Tant qu'aucune
  valeur n'est enregistrée dans `settings_data.json`, Shopify utilise le `"default"` du
  **schéma** (`{ "type": "text", "id": "x", "default": "..." }`), jamais le filtre
  `{{ s.x | default: '...' }}` du Liquid (ce filtre ne sert qu'à couvrir une vraie valeur
  vide/blank). **Erreur déjà commise : changé le texte dans le filtre `| default:` sans
  changer le `"default"` du schéma** → le push réussissait, le fichier serveur était bien à
  jour, mais la page continuait d'afficher l'ancien texte, ce qui ressemblait à un bug de
  cache alors que c'était une incohérence entre les deux défauts. **Réflexe à prendre : quand
  on change un texte par défaut, modifier les DEUX endroits (le `"default"` du `{% schema %}`
  ET le filtre `| default:` du Liquid), puis vérifier en relisant le fichier réellement stocké
  sur le thème** (`shopify store execute` avec une query `theme(id:...) { files(filenames:[...])
  { nodes { body { ... on OnlineStoreThemeFileBodyText { content } } } } }`, scope
  `read_themes` requis) plutôt que de faire confiance au seul rendu public.
- **Après un push, le rendu public peut sembler périmé alors que le fichier serveur est déjà
  bon.** Shopify a son propre cache de page produit côté serveur (visible dans l'en-tête
  `etag: page_cache:...`, indépendant de Cloudflare qui lui affiche `cf-cache-status: DYNAMIC`).
  Avant de conclure à un bug, vérifier le fichier réellement stocké via l'API Admin (ci-dessus)
  — s'il est correct, c'est juste une question de propagation (quelques minutes), pas une
  erreur à corriger.
- **Renommer un produit (ex. Mira → Luma) touche bien plus que le texte visible.** Liste
  complète à reprendre intégralement, pas seulement les morceaux de texte évidents :
  1. Noms de fichiers (`sections/z<préfixe>-*.liquid`, `snippets/z<préfixe>-styles.liquid`,
     `templates/product.<slug>.json`) — `mv`, puis adapter les `{%- render '...' -%}`.
  2. Classe racine CSS (`.zmira` → `.zluma`), tous les `id="z..."`, toutes les fonctions/variables
     JS exposées en `window.z...` et les `document.getElementById('z...')`.
  3. Les `"type"` de section référencés dans le template JSON, et les `"name"` de section dans
     chaque `{% schema %}`.
  4. **Le texte produit lui-même partout où il est en dur** (accordéons, FAQ, titres par
     défaut côté schéma ET Liquid comme ci-dessus) — un `grep -ri "ancien-nom"` sur tous les
     fichiers concernés avant de pousser pour être sûr de n'avoir rien laissé.
  5. **Les vraies données Shopify** : titres de variantes (`productOptionUpdate` sur les
     `optionValues`, pas seulement le Liquid), `templateSuffix` du produit s'il référence
     l'ancien nom de fichier.
  6. **Nettoyer les anciens fichiers du thème** une fois le renommage validé : la mutation
     GraphQL `themeFilesDelete` est bloquée côté API Admin (accès réservé, exemption Shopify
     requise) même avec `write_themes`. La méthode qui marche : `shopify theme push --allow-live
     --only "<chemin-de-l'ancien-fichier>"` (un `--only` par fichier à supprimer) **sans que le
     fichier existe en local** — le CLI le détecte absent et le supprime côté serveur, sans
     toucher au reste du thème (contrairement à un push sans aucun `--only`, qui ferait une
     synchronisation complète et risquerait de supprimer des fichiers non liés).
  Demander confirmation à Roméo avant les mutations Shopify (variantes, templateSuffix,
  suppression de fichiers) : le classifier de sécurité bloque ces actions sur la production
  sans validation explicite de l'action précise, même si la demande globale ("renomme tout")
  est déjà donnée.

## Limites connues

- Pas d'outil d'upload de fichier local vers Shopify côté Claude : les visuels finaux sont
  déposés par Roméo dans Shopify Admin > Contenu > Fichiers, Claude résout l'URL CDN ensuite.
- `WebFetch` direct sur `claude.ai/design/...` échoue presque toujours (403 Cloudflare) :
  utiliser l'outil `DesignSync` (voir Étape 1), pas une archive `.gz` téléchargée à la main.
