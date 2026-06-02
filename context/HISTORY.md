# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-06-02

### Sections boutique en image unique 1254×1254 + vidéos UGC + règle de synchro

- Plusieurs sections homepage/produit converties en **image unique 1254×1254** : témoignages (preuve sociale, qui gardent nom + citation), size guide, bénéfices, how it works, et l'image droite de la section Stats (le bloc avant/après à deux cadres a été supprimé au profit d'une seule image).
- **Cadres UGC** (homepage `sculpted-product` + page produit `sculpted-buybox`) : passés d'une vignette image à un **vrai lecteur vidéo** (setting `video`, upload Shopify, rendu `video_tag`). Plus possible d'insérer une image, seulement des vidéos.
- **Fix taille image Stats** : un bug d'`aspect-ratio` combiné à `align-items:center` réduisait l'image à un carré de 120px. Corrigé avec `width:100%` (le carré se calcule sur la largeur de colonne) + colonne image élargie (ratio 1 / 1,5).
- Classe CSS `size-single` créée et rendue réutilisable pour toutes les sections "image unique".
- **Règle de synchro Shopify actée (gravée dans CLAUDE.md + mémoire)** : la boutique vit à deux endroits non synchronisés (éditeur en ligne = contenu de Roméo dans `settings_data.json` / fichiers locaux Git = code de Claude). Désormais : pull avant toute intervention, jamais de push `settings_data.json` sans prévenir, push ciblé `--only`, validation explicite avant tout déploiement live. Permet de bosser à deux sans s'écraser.
- Tout déployé sur le thème live "Sculpted UK" (#200683258201) via Shopify CLI + committé (`bc3288b`).
- **Reste à faire côté Roméo** : uploader ses visuels 1254×1254 et ses vidéos UGC dans l'éditeur Shopify pour voir le rendu final.

---

## 2026-05-31 (mise à jour 7)

### Header nettoyé + "Buy now" vers le panier

**Bouton "Buy now" :** redirige désormais vers la page panier `/cart` au lieu d'aller direct au checkout, pour laisser le client revoir avant de payer. Modif dans `sculpted-buybox.liquid` (page produit) et `sculpted-product.liquid` (homepage). Note conversion restituée à Roméo : ajouter une étape avant le paiement peut faire baisser le taux de conversion (Underfit va direct au checkout), candidat idéal à un A/B test plus tard.

**Header (section partagée `sculpted-header.liquid`, donc appliqué à toutes les pages via le layout) :**
- Loupe de recherche supprimée (inutile sur un one-product store)
- Sélecteur de devise GBP£ supprimé (marché UK only, devise non changeable) + réglage "Libellé devise" retiré du schéma
- Icône panier remplacée par un sac arrondi (anse) en bleu de la marque `#1496d6`, style `.cart-bag` ajouté dans `sculpted.css`

**Déployé** en live sur "Sculpted UK" (#200683258201) via Shopify CLI (push des 4 fichiers : header, css, buybox, product). À figer dans Git via `/commit`.

---

## 2026-05-31 (mise à jour 6)

### Panier : 2 lignes max + partage payé/offert calé sur le montant réel

**Problème signalé par Roméo (capture à l'appui) :** le panier affichait des lignes qui se multipliaient quand on ajoutait des articles, et un décalage visuel (quantité affichée 3 alors que le total facturé = 4 unités à £119.96, offert affiché 3 incohérent).

**Cause 1 (lignes multiples) :** le code bouclait `for item in cart.items` et générait une paire (payée + offerte) PAR article → 4, 6 lignes dès qu'on ajoute des variantes.
**Fix 1 :** agrégation. Le panier affiche désormais **2 lignes max** quel que soit le nombre d'articles : une ligne payée (somme des unités payées) + une ligne offerte (somme des offertes, verte, badge Gift, "Free"). En dessous de 3 unités : 1 seule ligne (pas encore de cadeau).

**Cause 2 (décalage prix) :** le partage payé/offert était **deviné** par une formule "÷3", qui ne tombait pas toujours d'accord avec la remise réelle appliquée par Shopify → affichage ≠ montant checkout.
**Fix 2 :** on ne devine plus. `paid_units = cart.total_price ÷ prix unitaire` (arrondi) = ce que Shopify facture vraiment ; `free_units = cart.item_count − paid_units`. L'affichage colle donc toujours au prix réel du checkout, quelle que soit la remise active.

**Détails :** lien "Remove" de la ligne payée → vide tout le panier (`cart_clear_url`). Quantité éditable seulement quand une seule vraie ligne Shopify (cas normal one-product) ; agrégée et figée si plusieurs variantes. Champs cachés `updates[]` conservés pour l'intégrité du panier sans JS.

**Déployé** sur le thème live "Sculpted UK" (#200683258201) via Shopify CLI. Commit `7dae57f`.

**À confirmer au prochain coup :** Roméo doit valider visuellement le rendu après ce 2e push (×3 → 2 payés + 1 offert ; ×6 → 4 payés + 2 offerts).

---

## Semaine du 1er au 7 juin 2026 (premier `/semaine`)

**Bilan semaine écoulée (sans objectifs formels, c'était le 1er RDV) :** grosse semaine de fondation. Produit + marché actés, boutique Shopify créée (site, produits, structure), micro-entreprise validée. Énergie correcte, motivation en légère baisse de nouveauté → Roméo identifie lui-même le bon levier : discipline > motivation. Reprise muscu prévue aux vacances (carburant énergie).

**Changement acté :** compte pro = **Qonto** (opérationnel 31/05). Revolut business refusé. Qonto remplace Revolut partout dans le contexte.

**Objectifs de la semaine :**
- [ ] **Objectif 1 :** Boutique Sculpted 100% fonctionnelle et prête à vendre (photos intégrées, parcours testé de bout en bout panier → checkout réel UK, zéro bug)
- [ ] **Objectif 2 :** Meta Business Manager créé et configuré, Qonto relié comme moyen de paiement (socle pub prêt, sans lancer)
- [ ] **Objectif 3 :** 5-6 créatives adaptées en anglais (sous-titres EN + voix off anglaise), prêtes à charger dans Meta, pas publiées

**Décision :** lancement des pubs Meta repoussé au sprint #1 (13 juin), pas pendant les exams / dispo réduite (impossible de surveiller et optimiser, gaspillage du budget test).

**Note créas :** ce ne sont pas des créas à créer mais à **adapter** (5-6 gagnantes d'underfitmen.com, juste à traduire). Méthode "traduire avant d'innover" appliquée aux créas.

**Risque principal identifié :** les créatives (brique technique neuve, niveau zéro). Risque de blocage = traduction/tournures anglaises.
**Blocages possibles :** cours + sorties improvisées avec les copains.
**Préparation Claude :** dès que Roméo donne les transcriptions FR des créas, produire les sous-titres + scripts de voix off en anglais UK prêts à l'emploi, pour transformer l'objectif le plus risqué en simple tâche d'exécution.

---

## 2026-05-31 (mise à jour 5)

### Création de la page panier Shopify (fix des 404 caddie + logo checkout)

**Point de départ :** Roméo voulait supprimer le logo affiché au checkout (il faisait une 404 au clic). Diagnostic : le checkout Shopify n'est **pas éditable** sur le plan **Basic** (l'API `checkoutBranding` exige le plan Plus, ~2 000 $/mois). Mutation `checkoutBrandingUpsert` tentée pour preuve → refus explicite de Shopify. Idée du logo abandonnée par Roméo.

**Vraie cause des 404 :** le thème n'avait **aucun template `cart.liquid`**. L'icône caddie du header ET le logo du checkout pointent tous deux vers `/cart` → page inexistante → 404 (même classe de bug que l'ancien 404 collection).

**Solution livrée :** création d'une vraie page panier.
- `templates/cart.liquid` (nouveau) + `sections/sculpted-cart.liquid` (nouveau) + styles dans `assets/sculpted.css` (+56 lignes), au design exact de la boutique.
- Fonctionne sans JS (formulaire Shopify standard `updates[]` + bouton update + checkout), avec **recalcul live des quantités** en JS (changement de quantité → `/cart/change.js` → rechargement, prix à jour instantanément, plus besoin de cliquer "Update").
- **Verrouillage des lignes offertes** : toute ligne à 0 € (article cadeau) voit sa quantité figée (champ caché pour garder l'alignement `updates[]`), badge "Gift", pas de suppression, prix "Free". Robuste si un vrai cadeau séparé est ajouté plus tard ; sur le BXGY même-produit actuel, pas de ligne offerte distincte (gratuité fondue dans la ligne produit).
- Poussé en ligne via Shopify CLI (`--only` sur les 3 fichiers, plan Basic, thème "Sculpted UK" #200683258201). Commit `1071337`.

**Sujets résolus :** le doute de la session précédente sur le checkout qty=1 ("Standard (Example)") était bien un aperçu éditeur, et le recalcul de prix est maintenant correct. Bundle confirmé fonctionnel par Roméo.

**Détail noté (sans urgence) :** fuseau horaire de la boutique réglé sur **CEST** (heure française) alors que le marché est UK. À passer sur Londres plus tard pour lire les stats à l'heure locale.

**Prochaine étape boutique :** uploader les vraies photos produit, puis créas Meta Ads.

---

## 2026-05-31 (mise à jour 4)

### Fix bundle + livraison gratuite (réglages Shopify, pas le thème) + sécurité Git

**Contexte :** Roméo signale que les paliers (×1 / ×3 / ×6) facturent toujours le même montant au checkout, et que la livraison n'est pas gratuite.

**Diagnostic :** les deux problèmes étaient des **réglages boutique Shopify** (remises + frais de port), pas du code de thème. Le variant produit est unique à £29.99 ; les prix £59.98/£119.96 des paliers sont du texte, le vrai montant = £29.99 × quantité moins remise.

**Fixes appliqués via l'API Admin (MCP) :**
- **Bundle :** deux remises automatiques BXGY actives se télescopaient ("Buy 2, Get 1 Free" + "Buy 3, Get 2 Free"). Shopify n'en applique qu'une → totaux faussés. "Buy 3, Get 2 Free" (`2264120590681`) **désactivée** (statut EXPIRED, réversible). "Buy 2, Get 1 Free" seule suffit pour les 2 paliers (elle se répète) : ×3 → paie 2 = £59.98, ×6 → paie 4 = £119.96.
- **Livraison :** le UK était dans la zone "International" facturée 29 €. Tarif mis à **0 € et renommé "Free Shipping"** via `deliveryProfileUpdate`. Toute la zone International devient gratuite (sans impact, ads UK-only). Isoler une zone UK dédiée butait sur l'exigence de provinces des autres pays.
- Thème publié vérifié = **"Sculpted UK" (#200683258201)**, bien en MAIN. Aucun `theme push` nécessaire (rien de modifié côté fichiers).

**⚠️ Point resté OUVERT (à reprendre) :** une capture du checkout envoyée par Roméo montrait **qty = 1** (sous-total 29,99 £) alors qu'il testait le palier ×3, + un mode d'expédition "**Standard (Example)**" à 10 £ et une adresse bidon (+33 1 42 34 56 10). Forte suspicion que c'était l'**aperçu du checkout de l'éditeur Shopify** (données fictives), pas un vrai passage en caisse. À confirmer au prochain coup : faire un **vrai test sur le storefront en ligne avec adresse UK**. Si la quantité reste à 1 sur un vrai checkout, alors il y a un **bug de quantité à corriger dans le thème** (vérifier les `data-qty` des blocs tier dans le settings_data.json live). Question non tranchée par Roméo (il a lancé /commit avant de répondre).

**Sécurité Git :** fichier `livrables/ecommerce/boutiques/shopify_recovery_codes.txt` (codes de récupération = secret) détecté en untracked. Ajout de `*recovery_codes*` / `*recovery-codes*` au `.gitignore`. Commit `0937072` (seul le .gitignore, le fichier de codes reste hors Git).

---

## 2026-05-31 (mise à jour 3)

### Fix snippet sculpted-benefit-icon manquant

**Problème :** La section `sculpted-benefits` affichait des erreurs Liquid "Could not find asset snippets/sculpted-benefit-icon.liquid" à la place des icônes SVG, sur chacun des 4 blocs bénéfices.

**Cause :** Le rebrand Defyne → Sculpted avait renommé tous les fichiers mais avait loupé `snippets/defyne-benefit-icon.liquid`. La section appelait `sculpted-benefit-icon` qui n'existait pas.

**Fix appliqué :** Création de `snippets/sculpted-benefit-icon.liquid` (contenu identique au fichier defyne, 4 icônes SVG : ribs, shirt-check, waves, shirt).

**Commit :** `5f78de7`

**Push effectué :** oui (via `shopify theme push --allow-live`). Thème en ligne sur cqqah9-t1.myshopify.com (#200683258201). Erreurs résiduelles non bloquantes au push : 3 fichiers protégés Shopify (`layout/theme.liquid`, `templates/gift_card.liquid`, `config/settings_schema.json`) ne peuvent pas être supprimés par le CLI — comportement normal, sans impact sur le thème.

---

## 2026-05-30 (mise à jour 8)

### Fix double header sur la page Contact

**Problème :** La page Contact affichait deux headers empilés : le bon (SCULPTED, rendu par le layout `sculpted`) et un header DEFYNE codé en dur directement dans `page.sculpted-contact.liquid` (vestige du rebrand Defyne → Sculpted).

**Fix appliqué :** Suppression du bloc ticker + header hardcodé dans `templates/page.sculpted-contact.liquid`, ainsi que les styles CSS associés (sections 4 et 5). Le layout `sculpted` s'occupe déjà du chrome.

**Commit :** `2dd8a34`

**Prochaine étape :** `shopify theme push --store cqqah9-t1.myshopify.com --theme 200683258201 --path "livrables/ecommerce/boutiques/sculpted-shopify"` pour mettre tous les commits locaux en ligne.

---

## 2026-05-30 (mise à jour 7)

### Galerie homepage alignée sur la page produit (sculpted-product)

**Problème :** La section "Sculpted — Produit" de la homepage utilisait des images codées en dur via `image_picker`, au lieu de lire les photos de l'onglet Produit Shopify comme la page produit.

**Fix appliqué dans `sculpted-product.liquid` :**
- Résolution `sc_prod` corrigée : fallback sur `product` si le réglage "Produit Shopify" est vide (aligné sur `sculpted-buybox`)
- Galerie remplacée : lit maintenant `sc_prod.images` automatiquement avec vignettes cliquables (`sculptedSwapHero`)
- Repli intelligent conservé sur les blocs `image_picker` si le produit n'a aucune photo
- Fonction `sculptedSwapHero` ajoutée au bloc `<script>` de la section

**Commit :** `11fe5c1`

**Prochaine étape :** `shopify theme push --store cqqah9-t1.myshopify.com --theme 200683258201 --path "livrables/ecommerce/boutiques/sculpted-shopify"` pour mettre en ligne tous les commits en attente (galerie buybox, fix 404 nav, galerie homepage).

---

## 2026-05-31 (mise à jour 2)

### Fix 404 : lien nav "Sculpted" redirigé vers la fiche produit

**Problème :** Cliquer sur "Sculpted" dans la navigation amenait sur une page 404. Cause : le lien pointait vers `/collections/sculpted`, mais le template `collection.liquid` est absent du thème Sculpted UK (on n'a que nos sections custom + product/index templates). Shopify ne sait pas rendre la collection → 404.

**Diagnostic :** Le produit (`sculptd-compression-shaping-tank-top`, actif, handle confirmé via MCP) et la collection (`sculpted`, handle confirmé via MCP) existent bien côté Shopify. Le problème était uniquement l'absence du template collection côté thème.

**Fix appliqué :** Mise à jour de `settings_data.json` — lien "Sculpted" dans le header ET le footer redirigé de `/collections/sculpted` vers `/products/sculptd-compression-shaping-tank-top`.

Cohérent avec la stratégie one-product store : tout le trafic va directement à la fiche produit, pas via une collection intermédiaire.

**Commit :** `59035e0`

**Prochaine étape :** `shopify theme push --store cqqah9-t1.myshopify.com --theme 200683258201 --path "livrables/ecommerce/boutiques/sculpted-shopify"` pour mettre le fix en ligne.

---

## 2026-05-31

### Galerie page produit branchée sur les photos de l'onglet Produit Shopify

**Problème résolu :** La galerie de la page produit utilisait des images posées en dur dans le design (réglages `image_picker` du thème). Il fallait uploader les photos deux fois : une fois sur le produit, une fois dans Personnaliser. Plus le carrousel ne fonctionnait pas (vignettes non cliquables).

**Ce qui a été fait :**
- `sculpted-buybox.liquid` : galerie refactorisée. Elle lit maintenant `product.images` automatiquement (photos de l'onglet Produit Shopify). Repli intelligent sur les images de design si le produit n'a pas encore de photo.
- Vignettes cliquables : fonction JS `sculptedSwapHero()` ajoutée pour switcher la grande image au clic.
- CSS `sculpted.css` : contour bleu ajouté sur la vignette active (`.frame.sel`).
- Labels des anciens réglages de galerie renommés "(repli uniquement)" dans le schéma pour éviter la confusion.
- Résolution produit/variant corrigée : `sc_prod` = réglage "Produit Shopify" sinon produit courant de la page.
- Commit : `c8ae3ca`

**Prochaine étape :** uploader les vraies photos sur le produit Shopify (Admin → Produits → Médias), puis `shopify theme push --store cqqah9-t1.myshopify.com --theme 200683258201 --path "livrables/ecommerce/boutiques/sculpted-shopify"`.

**Question ouverte :** la homepage a sa propre buy box (`sculpted-product`) qui utilise encore les images de design. À aligner avec la même logique lors de la prochaine session si besoin.

---

## 2026-05-30 (mise à jour 6)

### Bouton Buy now branché + remise automatique BXGY Shopify

**Ce qui a été fait :**
- `sculpted-buybox.liquid` et `sculpted-product.liquid` entièrement refaits : bouton Buy now fonctionnel via AJAX `/cart/add.js` → vide le panier, ajoute la bonne quantité, redirige vers `/checkout`
- Paliers réels : ×1 (£29.99) / ×3 "2+1 Free" (£59.98) / ×6 "4+2 Free" (£119.96), chaque palier porte son attribut `data-qty`
- Sélecteurs couleur + taille transmis en propriétés de ligne (visibles sur la commande pour le fournisseur)
- Remise automatique BXGY créée sur Shopify (id `gid://shopify/DiscountAutomaticNode/2263845110105`) : "Buy 2 Get 1 Free", active, le 3e article est offert à 100% automatiquement au checkout
- `sculpted.css` : styles pour les sélecteurs + état disabled du bouton pendant l'ajout
- `snippets/meta-tags.liquid` créé pour corriger l'erreur Liquid du thème Dawn ("Could not find asset snippets/meta-tags.liquid")
- ID thème corrigé : l'ancien (200671494489) n'existait plus → bon ID = 200683258201 ("Sculpted UK")
- Commits : `40ffbc8`

**Prochaine étape :** pousser le thème (`shopify theme push --store cqqah9-t1.myshopify.com --theme 200683258201 --path "livrables/ecommerce/boutiques/sculpted-shopify"`) puis faire 1 commande test avec la Bogus Gateway pour vérifier le checkout. Activer "continuer la vente en rupture" sur le produit (stock actuel : 8 unités).

---

## 2026-05-30 (mise à jour 5)

### Fix page produit Shopify + correction homepage cassée

**Problème :** page produit en 404 (template manquant), puis homepage cassée après un premier fix incorrect.

**Cause du bug homepage :** le premier `product.liquid` réutilisait toutes les sections de `index.liquid`. Dans Shopify, une section statique ne peut appartenir qu'à un seul template dans l'éditeur. Résultat : conflit qui cassait la homepage.

**Fix propre :**
- Création de `sections/sculpted-buybox.liquid` : section dédiée à la page produit (copie de `sculpted-product` mais avec un nom distinct pour éviter tout conflit)
- `templates/product.liquid` refait pour n'appeler que `sculpted-buybox`, sans aucune section partagée avec `index.liquid`
- Commit `a1c8937`

**Prochaine étape :** lancer `shopify theme push --store cqqah9-t1.myshopify.com --theme 200671494489` pour pousser les fixes.

---

## 2026-05-30 (mise à jour 4)

### Micro-entreprise validée

Micro-entreprise confirmée validée. Demande ACRE déposée, résultat en attente (ne bloque rien).

**Débloqué :** Meta Business Manager et Revolut pro peuvent être ouverts maintenant.

---

## 2026-05-30 (mise à jour 3)

### Structure Shopify rendue fonctionnelle

**Ce qui a été fait :**
- Collection "Sculpted" créée sur Shopify (ID : gid://shopify/Collection/702588911961), produit "Sculptd - Compression Shaping Tank Top" ajouté dedans
- Page Contact : template corrigé `defyne-contact` → `sculpted-contact`
- Page Track my order : template corrigé `defyne-track-order` → `sculpted-track-order`
- `config/settings_data.json` créé en local avec toutes les URLs branchées : nav (Home `/`, Sculpted `/collections/sculpted`, Contact `/pages/contact`, Track my order `/pages/track-order`), footer idem + liens policies
- Footer corrigé : `🇺🇸 United States (USD $)` → `🇬🇧 United Kingdom (GBP £)`
- Commits `daee2ab` (banner) + `ea809df` (settings)

**Prochaine étape :** lancer `shopify theme push` pour pousser le `settings_data.json` sur le store, puis uploader les vraies photos produit dans Personnaliser.

---

## 2026-05-30 (mise à jour 2)

### Ajout section banner image (boutique Sculpted)

- Nouvelle section `sculpted-banner.liquid` insérée entre le header et le hero dans `templates/index.liquid`
- Paramètres éditables dans Personnaliser : image (image_picker), hauteur (champ number, sans limite), cadrage haut/centre/bas, lien optionnel
- CSS ajouté dans `sculpted.css`
- Bug Shopify contourné : le type `range` cachait l'ancienne valeur max (900px) malgré le push → remplacé par type `number` (champ texte libre, pas de limite)
- Thème poussé sur Shopify (`shopify theme push`) par Roméo
- Commit `daee2ab`

**Prochaine étape :** uploader la photo produit dans Personnaliser → "Sculpted — Banner image", puis uploader les vraies photos produit sur les autres sections, brancher le bouton "Buy now" sur un vrai produit Shopify, puis créas Meta Ads.

---

## 2026-05-30

### Rebrand boutique : Defyne → Sculpted

La marque s'appelle désormais **Sculpted** et le produit s'appelle le **Sculpted**.

**Ce qui a été fait :**
- Renommage complet du dossier `defyne-shopify` → `sculpted-shopify`
- Renommage de tous les fichiers : `defyne-*.liquid` → `sculpted-*.liquid`, `defyne.css` → `sculpted.css`, `defyne.liquid` → `sculpted.liquid`, templates idem
- Remplacement de toutes les occurrences textuelles "Defyne/defyne" → "Sculpted/sculpted" dans le contenu des fichiers (noms de sections, commentaires, balises Liquid, références CSS)
- Commit `c5a89f5` : 29 fichiers modifiés

**Prochaine étape :** pousser les fichiers sur Shopify (`shopify theme push --store cqqah9-t1.myshopify.com --theme 200671494489`), puis continuer les modifications de la boutique étape par étape.

---

## 2026-05-29 (mise à jour 3)

### Boutique Defyne : conversion en sections Shopify éditables + déploiement

- Toute la boutique Defyne a été refactorisée : homepage et page Track order passent de templates HTML statiques à des sections Shopify avec `{% schema %}`, entièrement éditables dans l'éditeur Personnaliser.
- 21 fichiers créés ou modifiés : 1 CSS partagé (`assets/defyne.css`), 1 layout, 1 snippet, 15 sections (chrome + contenu), 2 templates.
- Chrome partagé (ticker, header, footer) éditable une seule fois pour toutes les pages Defyne.
- Sections de contenu homepage : hero, presse, bénéfices, preuve sociale, buy box, how it works, stats, comparatif, guide des tailles, FAQ, avis.
- Thème "Defyne (preview)" créé et déployé via Shopify CLI sur cqqah9-t1.myshopify.com (thème ID 200671494489).
- Commit : 6077124.
- Prochaine étape : remplir les vraies images produit dans Personnaliser, et brancher le bouton "Buy now" sur un vrai produit Shopify.

---

## 2026-05-29 (mise à jour 2)

### Décision produit + marché : débardeur gainant homme, lancement Royaume-Uni

**Roméo avait déjà refait sa recherche produit de son côté (il aime chercher seul) et est revenu avec une cible : la niche sport/confiance corporelle masculine, via le site français underfitmen.com.**

**Le produit :** débardeur de compression gainant pour homme. Angle émotionnel fort (ventre de bière, poignées d'amour, "seins d'homme", confiance). One-product store, evergreen, achat impulsif. Coche les cases d'un bon produit.

**Analyse TrendTrack (29/05/2026) :**
- Le concurrent original (page "Trywhite", domaine underfitmen.com) est un gagnant FRAIS : page démarrée ~avril 2026, explose en mai (~9M reach/30j, 142 pubs actives, top pub ~987k reach et ~8 900 € spend estimé sur 28j). Offre 23 €/pièce, 2 achetés = 1 offert.
- Il ne cible QUE la France et la Belgique.
- Le produit "débardeur gainant homme" est quasi désert hors de France : personne ne le scale ailleurs. La version femme du shapewear, elle, explose (notamment en Allemagne).
- La verticale "insécurité masculine" (calvitie, testostérone, ED) scale fort en UK, Allemagne, Espagne, Italie → demande validée pour les produits confiance/corps homme.

**Correction honnête restituée à Roméo :** j'avais d'abord affirmé (sans donnée) que ce produit était saturé dans l'anglophone. Les chiffres TrendTrack montrent l'inverse : le produit précis est ouvert hors de France. Le cas est un "traduire avant d'innover" idéal (gagnant FR récent → marché neuf).

**Décisions actées par Roméo :**
- **Niche** : confiance corporelle masculine
- **Produit** : débardeur de compression gainant homme (modèle Underfit)
- **Marché** : **Royaume-Uni uniquement** au lancement, en anglais
- **Expansion** : US et Allemagne en réserve, à rajouter seulement si le produit performe
- **Modèle** : one-product store, copie/traduction du concept underfitmen.com vers l'anglais UK
- **Marque** : nom anglais à créer

**Mise à jour CONTEXT.md :**
- Section business : niche / produit / marché renseignés (UK au lieu de France par défaut)
- Sujet "Recherche produit V2" passé en ✅ résolu, nouveau sujet 🟡 "Boutique UK" en priorité active
- Engagement "refaire la recherche produit" remplacé par "Boutique UK à construire"

**Prochaine étape :** creuser le marché UK pour de vrai (saturation fine, CPM, concurrents locaux, offre en £).

---

## 2026-05-26 (mise à jour 7)

### Création du skill `connaissance-mutuelle` + commande `/decouverte`

Roméo a voulu un skill qui pose proactivement des questions hors-sujet, à fréquence régulière, pour que Claude le connaisse de mieux en mieux et qu'on construise une relation associé authentique. Posture demandée : feedback objectif sur l'utilité de l'idée à la fin de la conception.

**Analyse objective restituée à Roméo :**
- Idée valable car le `CONTEXT.md` est statique et la vie évolue, surtout à 18 ans
- Risques identifiés : friction avec le focus actif (études écartées), risque de "questionnaire" superficiel, risque de pollution des sessions business, risque de répétition
- Recommandation : commande dédiée plutôt qu'auto-déclenchement seul, tracker des questions posées

**Décisions de Roméo :**
- **Scope** : tous sujets autorisés SAUF les études (cohérent avec le focus actif jusqu'à Saragosse)
- **Mode de déclenchement** : mix commande dédiée + relances ponctuelles (1 question hors-sujet max par session)

**Construction :**
- Skill `connaissance-mutuelle` créé dans [.claude/skills/connaissance-mutuelle/SKILL.md](.claude/skills/connaissance-mutuelle/SKILL.md), avec :
  - 6 catégories de questions en rotation (famille, santé-sport, social-amis, business qualitatif, vision-valeurs, vie quotidienne)
  - Exemples concrets pour chaque catégorie
  - Règles strictes : pas d'études, pas pendant moments intenses, pas de répétition
- Commande `/decouverte` créée dans [.claude/commands/decouverte.md](.claude/commands/decouverte.md) pour invoquer le mode session dédiée (10 min, 3 à 5 questions)
- Journal `context/journal-questions.md` créé pour tracer les questions posées

**Modes d'usage :**
- **Mode 1** : Roméo lance `/decouverte` quand il veut, déroulé de 10 min
- **Mode 2** : Claude glisse 1 question hors-sujet par session naturelle, à un moment de pause, format transparent ("Au fait, sujet complètement différent...")

---

## 2026-05-26 (mise à jour 6)

### Création de la routine de travail Roméo × Jarvis : commande `/semaine`

Roméo a voulu construire une routine de travail avec Jarvis pour qu'on apprenne à se connaître et à bosser ensemble efficacement avant d'attaquer les décisions business stratégiques (notamment la niche).

**Format retenu :**
- 1 rendez-vous hebdomadaire, **tous les dimanches de 17h à 18h**
- Durée cible 30 à 60 min selon la phase de dispo en cours
- Méthode : **mix à chaud** (brainstorm ensemble puis challenge en fin)
- Objectif principal : faire le bilan de la semaine écoulée et fixer 2-3 objectifs court terme pour la semaine à venir, pour que Roméo se voie avancer concrètement

**Déroulé en 5 phases (voir [.claude/commands/semaine.md](.claude/commands/semaine.md)) :**
1. Bilan semaine écoulée (~10 min)
2. État des chantiers (~5 min)
3. Brainstorm objectifs (~15 min)
4. Challenge + obstacles (~5 min)
5. Trace écrite dans HISTORY.md

**Modifications effectuées :**
- Création de la commande `/semaine` dans `.claude/commands/`
- Référencement dans `CLAUDE.md` (section Commands)
- Engagement récurrent ajouté dans `CONTEXT.md` (section Engagements actifs)
- Premier rendez-vous fixé : **dimanche 31 mai 2026 à 17h**

**Démarche :** étape 1 (touchpoints) et étape 2 (détail) du process de construction de routine bouclées. Étapes 3 (adaptation phases) et 4 (test 7 jours) reportées : on ajustera la durée du rendez-vous à l'usage selon que Roméo est en sprint ou en phase calme.

---

## 2026-05-26 (mise à jour 5)

### Recadrage du focus : 100% business jusqu'à Saragosse

Roméo a clarifié sa priorité absolue pour les mois à venir : il ne veut plus que Claude aborde proactivement les études. Les sujets études sont ré-ouverts à partir de Saragosse (sept 2026).

**Modifications CONTEXT.md :**
- Nouvelle section **"Focus actif"** dans les préférences de communication : focus exclusif business jusqu'au 10/09/2026, pas de relance études sauf si Roméo en parle spontanément.
- Sujets "Stage BUT 2", "Préparation Saragosse" et "Examens 8 juin" passés en statut ⏸️ reporté.
- Sujet "Affectation centre aéré" maintenu car business-adjacent (trésorerie sprint).
- Sujet "Choix de la niche" précisé : en attente volontaire de la Phase 4 personnalisation Jarvis (13-14 juin), Roméo veut d'abord qu'on apprenne à bosser ensemble avant de plonger sur la niche. Pas de pression à relancer avant cette date.

**Raison :** Roméo veut maximiser le temps avant Saragosse pour le business, et préfère que la relation associé/business soit calibrée avant de prendre des décisions de niche.

---

## 2026-05-26 (mise à jour 4)

### Mécanique "Sujets ouverts à relancer" mise en place

Roméo a demandé à Claude de relancer proactivement sur les sujets dont il a parlé en passant, parce qu'il oublie ce qu'il a raconté.

**Mise en place :**
- Nouvelle section **"Sujets ouverts à relancer"** dans `CONTEXT.md`, distincte de "Engagements actifs" :
  - **Engagements actifs** = ce que TU dois faire (RDV, deadlines) → Claude te rappelle
  - **Sujets ouverts à relancer** = ce que tu m'as raconté avec une suite → Claude te questionne
- Statut visuel : 🟡 en cours, ✅ résolu, ⏸️ reporté, ❌ abandonné
- Modif `/prime` : ajout d'une étape "Au fait, où en sont ces sujets ?" qui sélectionne 1 à 3 sujets pertinents et pose une question concrète

**Sujets initialement peuplés (9) :**
- Business (4) : validation micro-entreprise, choix niche, choix produit, choix fournisseur
- Études (3) : affectation centre aéré, stage BUT 2 entrepreneur, préparation Saragosse
- Personnel (2) : reprise musculation, examens semaine du 8 juin

---

## 2026-05-26 (mise à jour 3)

### Personnalisation Jarvis — phases 1 à 3 complétées + recalibrage objectifs

**Méthode :** série de 4 phases pour faire de Jarvis un service 100% personnalisé. Aujourd'hui phases 1 (identité personnelle), 2 (études BUT GEA) et 3 (setup business) complétées. Phase 4 (workflow et préférences) reportée au 13-14 juin 2026 après examens.

**Posture actée :** Claude est désormais "associé", pas "assistant". Communication d'égal à égal, avec mission de rappeler les engagements pris.

**Nouveautés capturées dans CONTEXT.md :**
- Identité complète : 18 ans, famille (parents François commercial / Véronique Borflex, sœur Pénélope 20 ans, frère Oscar 17 ans), axes Cambrai/Valenciennes
- Santé/sport pilier de vie (musculation en pause volontaire, foot freiné par ligaments arrachés aux chevilles)
- Valeurs et drive : peur du CDI remplacé par l'IA, mindset à construire dans la durée, cercle restreint volontaire
- Vision 2031 : Bali ou France proche famille, dropshipping puis prestations IA
- Études BUT GEA 1A confirmé (GEMA spé future), moyenne ~12 à corriger, fin de cours mi-juin
- Saragosse 10 sept 2026 → début février 2027 (~6 mois), moment charnière personnel et business
- Business : budget 200-400 €/mois max test pub, micro-entreprise en cours de validation, niveau technique zéro sur tout (Shopify, Meta Ads, copy, créas), aucune tentative passée
- Sources d'apprentissage actuelles : YouTube (Yassine Sdiri), Claude, aucune formation payée

**Recalibrage objectifs :**
- Retrait de l'objectif "1000 € de CA en 3 mois" (objectif de résultat dépendant du marché)
- Remplacement par objectif d'action sprint #1 : "Fin juin 2026, boutique Shopify lancée + premier test ads tournant sur Meta"

**Calendrier business établi :**
- 13-27 juin 2026 : sprint #1, 5-6h/jour
- 28 juin → fin juillet : job animateur centre aéré, 1h/jour business
- Août → 10 sept : sprint #2, 5-6h/jour
- 10 sept 2026 → début février 2027 : Saragosse, 2h/jour

**Engagements actifs tracés dans CONTEXT.md :**
- 30 mai 14h30 : RDV centre aéré
- En attente : validation micro-entreprise
- 13-14 juin : faire Phase 4 personnalisation
- 13-27 juin : sprint #1 business

**Modif `/prime` :** ajout d'une section "Engagements actifs" dans le résumé de session pour que Claude rappelle automatiquement les engagements en cours à chaque démarrage.

---

## 2026-05-26 (mise à jour 2)

### Installation skills marketing/e-commerce dans `.claude/skills/`

**Sources installées (Tier 1 + Tier 2 par étoiles GitHub) :**
- `anthropics/skills` (141k ⭐, repo officiel Anthropic) : skills bureautiques et utilitaires
- `coreyhaines31/marketingskills` (30k ⭐, référence marketing community) : skills marketing/CRO/copywriting

**Process suivi :**
- Téléchargement manuel des ZIP par Roméo (le clonage auto bloqué par le classifier de sécurité)
- 45 skills extraits, vérifiés avec `SKILL.md` présent, ZIPs nettoyés
- 4 faux amis supprimés après lecture des descriptions chargées par le système : `launch` (skill VS Code dev), `analytics-events` (Metabase), `onboarding-verification-skill` (test Warp), `social-graph-ranker` (B2B networking)
- 10 skills SaaS B2B supprimés car inapplicables au modèle dropshipping B2C : `paywalls`, `churn-prevention`, `revops`, `sales-enablement`, `prospecting-research`, `cold-email`, `co-marketing`, `free-tools`, `directory-submissions`, `pricing-page`

**État final : 33 skills actifs**, dont :
- **Cœur dropshipping/e-commerce (18)** : ads, ad-creative, copywriting, copy-editing, marketing-psychology, competitor-profiling, imagegen, video-editing, emails, sms, popups, ab-testing, signup-flow-cro, crosspost, brainstorming, browser-use, marketing-ideas, product-marketing-context
- **Études BUT GEA (6)** : docx, pdf, ppt-generation, pptx-author, xlsx-official, frontend-design
- **Long terme / scaling (8)** : ai-seo, schema-markup, seo-audit, site-architecture, programmatic-seo, community-marketing, referrals, lead-magnets
- **Jarvis natif (1)** : recherche-actualites

**Décision posture :** Claude détecte automatiquement les skills pertinents selon le contexte, pas besoin de les activer manuellement.

---

## 2026-05-26

### Session de travail — PPP, portfolio BUT GEA et auto-évaluation

**PPP (Projet Professionnel Personnalisé) :**
- Synthèse PPP conférences métiers (RRH et Manager) rédigée sur Notion à recopier à la main
- 5 questions traitées : correspondance, surprises, compétence essentielle, influence parcours, spécialité envisagée (GEMA)
- Posture sincère sur RRH (pas de projection long terme) et enthousiaste sur Manager (cohérent avec le métier de rêve DG club sportif)

**Portfolio BUT GEA — mise à niveau aux attendus :**
- Lecture des documents officiels (PORTFOLIO_attendus_GEA1_vf.docx et Grille autoeval étudiant.docx) déposés dans `livrables/etudes/projets/portfolio/PORTFOLIO_RAPPELS_extracted/`
- Auto-évaluation initiale en l'état : 3,33/20 (page Notion dédiée), projection cible 15/20 après ajouts
- Trois nouvelles sections ajoutées à `livrables/etudes/projets/portfolio/index.html` :
  - **05 - Référentiel** : Compétences BUT GEA 1ère année avec apprentissages critiques et traces argumentées (3 cartes, une par compétence)
  - **06 - Situations d'apprentissage** : SAÉ 1 (sociologie, rôle de meneur de fait) et SAÉ 2 (compta/fisca/management 3 jours), avec contexte, rôle, productions, AC mobilisés et REX
  - **07 - Démarche réflexive** : 4 cartes (forces, axes de progrès, analyse honnête des notes décevantes, compétence transverse leadership de fait)
- Nav mise à jour avec les 3 nouveaux liens
- Renumérotation Contact de 05 à 08
- CSS dédié ajouté pour les nouvelles sections (comp-card, sae-card, reflex-card), cohérent avec le design existant
- Notice réflexive 2 pages créée sur Notion (questions A/B/C des attendus)

**Décision personnelle :**
- Auto-entrepreneur dropshipping volontairement écarté du portfolio scolaire, à mobiliser plus tard quand les résultats seront probants

---

## 2026-05-25 (mise à jour 2)

### Intégration d'une formation dropshipping complète comme base de connaissances

- Dépôt du fichier `context/import/plan stratégique e-commerce.txt` (2944 lignes, 37 000+ mots) : formation complète "0 à 1M de CA" en e-commerce/dropshipping
- Lecture intégrale du fichier
- Création de `context/formation-dropshipping-synthese.md` : synthèse opérationnelle structurée par chapitres (stratégie globale, recherche produit, Meta Ads, Shopify, méthodologie testing, créatives par phase de CA, CRO, agents/sourcing, délégation, autres tips)
- Mise à jour de `CLAUDE.md` : ajout d'une section "Expertise e-commerce / dropshipping" qui indique de s'appuyer sur la synthèse pour toute question business, et structure de workspace mise à jour
- Posture définie : expert e-commerce dédié, pas assistant généraliste. Toutes les recommandations business doivent s'aligner sur cette stratégie

## 2026-05-25 (mise à jour 1)

### Mise en pause du projet dropshipping

- Décision : tout le travail mené sur la recherche produit dropshipping via TrendTrack est mis en pause et retiré du contexte actif
- Éléments supprimés du contexte : niche retenue, produit cible, concurrents à surveiller, prochaine étape opérationnelle
- Raison : choix personnel de remettre le projet à plat pour le reprendre prochainement sur de nouvelles bases
- Reprise prévue très prochainement

---

## 2026-05-24 (session 2)

### Session de travail — Portfolio, GitHub, Netlify et MCP

**Portfolio :**
- Repo GitHub créé : `romeop2007-ui/portfolio` et fichiers poussés
- Formulaire contact rendu fonctionnel via Formspree (`mwvznpgv`) — envoi direct sans ouvrir de client mail
- Nom "Roméo PIAT" mis en blanc dans la nav
- Token GitHub sécurisé : retiré de l'URL git, stocké dans Windows Credential Manager

**Outils et config :**
- Extension VS Code Speech installée pour la saisie vocale en français
- MCP TrendTrack confirmé actif (plan Business, 10 000 crédits/mois) — prévu pour recherche produit dropshipping
- Mémoire créée pour rappeler TrendTrack au prochain `/prime`

**Netlify :**
- Site portfolio déployé et connecté au repo GitHub
- Formulaire contact Formspree opérationnel (plus de dépendance à Netlify Forms)

---

## 2026-05-24

### Session de travail — Structure, organisation et portfolio

**Structure du workspace :**
- Création de l'arborescence complète `livrables/` (46 dossiers) adaptée au profil entrepreneur-étudiant : ecommerce, etudes, dev-perso, finances-perso, freelance
- Création du fichier `.env` (variables d'exemple par service) et `.gitignore`
- Initialisation du dépôt Git avec premier commit

**Commandes Jarvis :**
- Création de la commande `/commit` avec scan de secrets intégré (5 étapes : vérif dépôt, analyse, message, scan secrets, exécution)
- 2 commits effectués au cours de la session

**Portfolio étudiant :**
- Génération d'un prompt complet pour Claude Design afin de créer le portfolio HTML/CSS/JS vanilla
- Données réelles intégrées : CV complet (4 stages, formations, compétences, langues), notes BUT GEA S1 filtrées >= 12/20 (9 matières affichées), photo de profil
- Prompt sauvegardé dans `livrables/etudes/projets/prompt-portfolio.md`

**Mémoire :**
- Règle mémorisée : afficher un récap à chaque ajout dans `livrables/`

---

## 2026-05-23

### Installation initiale du Jarvis
- Workspace personnalisé pour Roméo, basé à Valenciennes en semaine (études) et Cambrai chez ses parents les week-ends et vacances
- Profil principal : auto-entrepreneur en e-commerce, en parallèle des études
- Activité : lancement d'une activité en dropshipping (statut auto-entrepreneur créé, boutique et niche à définir)
- Objectifs court terme identifiés : trouver une niche, identifier des produits gagnants, lancer une boutique Shopify, atteindre 1 000 euros de CA en 3 mois
- Vision long terme : maîtriser le dropshipping, potentiellement en vivre, ouvert à diversifier en parallèle d'une boutique qui scale
- Projets actifs au démarrage : maîtrise de l'IA, application de l'IA au e-commerce, portfolio étudiant (priorité moindre)
- Outils utilisés : Claude, ChatGPT, Google Sheets, Google Docs, TrendTrack, Shopify, Prompt Cowboy, Gmail, Vinted
- Domaine d'aide prioritaire : apprentissage et formation (maîtrise de l'IA et du dropshipping)
- Style de communication choisi : mélange selon le contexte (direct ou pédagogique)
