---
name: fiche-produit
description: Construit une fiche produit Shopify sur le thème live Zooryn (Shrine Pro) en copiant le funnel d'un concurrent réel. Choisit lui-même, section par section, entre bloc natif du thème (Testimonials, Image with text, Sizing chart, Collapsible content, etc.) et Liquid personnalisé selon ce qu'il faut pour rester fidèle au concurrent — couleurs toujours pilotées par les réglages globaux du thème (jamais codées en dur), chaque Liquid personnalisé isolé sous sa propre classe racine et posé en bloc/section natif du Personnalisateur (jamais un fichier séparé). Construction mobile d'abord, adaptation desktop ensuite. Se déclenche quand Roméo donne l'URL d'un concurrent à reproduire + le produit Shopify cible, ou dit "fais-moi la fiche produit", "reproduis cette page", "copie ce concurrent".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch
---

# Skill fiche-produit — construire une page produit Shopify (Shrine Pro)

Reconstruit la fiche produit d'un concurrent réel sur le thème live Zooryn
(shrine-theme-pro #203403854169, dossier `livrables/ecommerce/boutiques/zooryn-shrine`), en
choisissant à chaque section entre bloc **natif** du thème et **Liquid personnalisé**, selon ce
qu'il faut pour rester fidèle au concurrent.

**Renommé et réécrit le 26/07/2026** (ex-skill `boutique`, qui était calé sur l'ancien thème
Dawn et une méthode Claude Design → Liquid intégral, entièrement abandonnée : trop lourde, et
surtout, elle produisait des sections en Liquid sur-mesure que Roméo ne pouvait plus retoucher
lui-même sans risquer de tout casser).

**Méthode de décision revue le 29/08/2026**, après le constat sur Titanox que la règle "bloc
natif en priorité absolue, Liquid en dernier recours avec accord à chaque fois" créait des
allers-retours inutiles (essayer un bloc natif, constater que ça ne colle pas au concurrent,
redemander un Liquid en patch par-dessus). Le vrai enjeu n'a jamais été "bloc natif vs Liquid",
mais "est-ce que ça reste modifiable par Roméo dans le Personnalisateur sans repasser par
Claude". Deux garanties tiennent lieu de garde-fou à la place d'une validation au cas par cas :
couleurs toujours pilotées par les variables du thème (jamais codées en dur), et chaque Liquid
personnalisé isolé dans son propre bloc/section, scopé sous une classe racine unique — voir
Étape 2. Claude décide donc lui-même, sans redemander l'autorisation à chaque section.

## Principe directeur

1. **Le funnel compte, pas le pixel.** Reproduire la même info, au même endroit, avec le même
   poids visuel que le concurrent — jamais besoin des mêmes coins arrondis, du même alignement
   au pixel, de la même icône exacte. (Confirmé par la leçon 1.10 de la formation : "ce n'est
   pas la forme qui compte, c'est le fond".)
2. **Choisir soi-même, section par section, entre bloc natif et Liquid personnalisé (acté le
   29/08/2026, Claude n'attend plus d'accord au cas par cas).** Partir du bloc natif Shrine Pro
   par défaut pour tout ce qui est générique et où il fait le travail sans compromis (voir la
   check-list par zone dans `references/blocs-natifs-shrine-pro.md`). Basculer en Liquid
   personnalisé dès que la fidélité au concurrent l'exige : structure, mise en page ou
   comportement que les réglages du bloc natif n'exposent pas. Toujours indiquer à Roméo, en
   passant, ce qui est natif et ce qui est du Liquid perso — jamais silencieusement.
3. **Règle d'or, actée le 26/07/2026 : rien ne doit devenir une boîte noire.** Tout ce que Claude
   produit doit rester visible et modifiable par Roméo directement dans le Personnalisateur, sans
   qu'il ait besoin de repasser par Claude pour un simple ajustement. Deux garanties tiennent lieu
   de garde-fou (précisées le 29/08/2026), quelle que soit la méthode choisie à l'étape 2 :
   - **Couleurs toujours pilotées par le thème, jamais codées en dur.** Tout Liquid personnalisé
     consomme les variables CSS globales de Shrine (posées via Personnalisateur > Couleurs), et
     utilise le réglage natif "Jeu de couleurs" de la section/du bloc quand il existe. Si Roméo
     change sa palette de marque, tout se met à jour partout, natif et Liquid perso, sans repasser
     par Claude.
   - **Chaque Liquid personnalisé est isolé** dans son propre bloc/section natif "Liquid
     personnalisé" du Personnalisateur (jamais un fichier `.liquid` séparé dans
     `sections/`/`snippets/`), scopé sous une classe CSS racine unique. Une correction sur un bloc
     ne touche jamais les autres — c'est ce qui permet à Roméo de tout modifier un par un sans
     risquer de casser le reste.
4. **Mobile d'abord, desktop ensuite (acté le 29/08/2026).** La majorité du trafic pub achète
   depuis un téléphone : on construit et on valide la version mobile en premier, la version
   desktop vient s'adapter dessus, jamais l'inverse. Voir Étape 0 (demander la référence mobile)
   et Étape 6 (checklist mobile, appliquée à la construction, pas seulement en vérification
   finale).

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
4. **La version MOBILE du concurrent** (captures d'écran de chaque section, ou lien testable en
   direct). Acté le 29/08/2026 : c'est elle qui sert de référence de départ, pas la version PC
   (voir Principe directeur, point 4). Si Roméo ne l'a pas donnée spontanément, la demander avant
   de commencer — ne jamais construire uniquement à partir d'un rendu desktop.

Ne pas avancer sans ces réponses. Ne pas reposer une question déjà répondue dans le message
initial de Roméo.

## Étape 1 — Observer le concurrent réel, jamais un mockup

1. `WebFetch`/`curl` la vraie page concurrent (souvent accessible directement, contrairement à
   claude.ai qui bloque en 403). Si Cloudflare bloque aussi le concurrent, basculer sur le skill
   `browser-use` (navigateur réel).
2. Inspecter le HTML/CSS réel pour : structure des sections, ordre exact des blocs, couleurs
   réelles (`grep -oE "#[0-9a-fA-F]{6}"`), variables CSS nommées, apps installées (attributs de
   classe type `kaching-bundles`, scripts JSON de config visibles en clair).
3. **Partir en premier du rendu MOBILE réel du concurrent** (captures fournies par Roméo à
   l'Étape 0, ou DevTools format téléphone) — acté le 29/08/2026, c'est la référence de
   construction, pas une simple vérification finale. Le rendu desktop est regardé ensuite, en
   second, pour l'adaptation. Le comportement mobile diverge souvent du desktop (galerie en swipe
   plutôt qu'en vignettes, ordre image/texte inversé, etc.), voir Étape 6 pour la checklist.

## Étape 1bis — Traduire fidèlement le titre et le texte du concurrent (source : prompts formateur, Notion "Les prompts Claude", ajouté le 06/08/2026)

Avant de remplir le moindre bloc natif à l'Étape 2, traduire le titre et le texte de la fiche
concurrente observée à l'Étape 1. Deux passes distinctes, dans cet ordre :

**Titre.** À partir du PNG complet de la fiche concurrente (sert uniquement à s'imprégner du
produit et de ses bénéfices, jamais traduit lui-même) et du titre exact à traduire : fidélité
stricte au sens, aucune adaptation marketing ni ajout d'info, formulation la plus idiomatique
possible en français.

⚠️ **Règle spécifique nom de produit inventé** : si le titre contient un nom inventé par le
concurrent (type "Mira", "Norrfjällen", un nom de modèle propre au concurrent), ne JAMAIS le
traduire littéralement ni le garder tel quel — créer un nouveau nom court, mémorisable, crédible,
qui évoque les bénéfices du produit déduits du PNG, en anglais ou anglicisé (esprit e-commerce
international), dans le même esprit que l'original sans jamais le copier ni le traduire mot à
mot. C'est ce nom traduit qui devient le nom du produit Shopify (cf. Étape 0). Cette règle
formalise ce que Zooryn fait déjà au cas par cas (Sculpted, Mira → Luma) : elle devient la
méthode par défaut à appliquer systématiquement, plus une improvisation ponctuelle.

Format : `Titre original → Titre traduit`.

**Texte (corps de la fiche).** Traduire bloc par bloc, sans jamais fusionner ni fragmenter
davantage que la structure d'origine (un titre entier → une traduction de titre, un paragraphe
entier → un paragraphe traduit, une liste à puces → puce par puce dans le même ordre). Fidélité
exacte au sens, sans adaptation marketing ni ajout/suppression d'info, mais reformulation
idiomatique française plutôt que mot-à-mot (un vrai copywriter français réécrit, il ne traduit
pas au mot près). Le gras du texte source reste du gras dans la traduction. Format de sortie,
répété bloc par bloc :

```
Texte original (bloc)
→ Traduction en français (bloc)
```

Ce résultat bloc par bloc alimente directement les blocs natifs Shrine Pro de l'Étape 2
(Testimonials, Text with icon, Collapsible content...) : copier-coller la traduction, jamais le
texte original.

⚠️ Ne pas confondre avec l'adaptation de marque des créas publicitaires (skill `crea-pub`, qui
lui ADAPTE le texte à la marque Zooryn — remplace prix/marque/prénoms) : ici, l'objectif est une
traduction fidèle du CONTENU de la fiche produit. La marque Zooryn s'applique naturellement
ensuite puisque c'est déjà la fiche du produit Shopify Zooryn qu'on remplit avec ce texte.

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

## Étape 2 — Construire : bloc natif ou Liquid personnalisé, décision de Claude (revu le 29/08/2026)

**Sur mobile d'abord** (Étape 1) : pour chaque section de la fiche, décider soi-même, sans
demander l'accord de Roméo :

- **Bloc natif Shrine Pro par défaut** dès qu'il fait le travail sans compromis vs le concurrent.
  Voir `references/blocs-natifs-shrine-pro.md` pour la check-list complète, zone par zone (bloc
  produit principal, prix, bullet points, guide des tailles, badges paiement, réassurance,
  carrousel, avis, FAQ, sticky add to cart...), issue de l'analyse détaillée de la leçon 1.10.
  Blocs natifs disponibles à connaître : **Rating stars, Text with icon, Image with text,
  Image/Video Slider, Sizing chart (popup), Payment badges, Testimonials, Contenu réductible
  (Collapsible content), Sticky Add To Cart, Custom columns.**
- **Liquid personnalisé** dès que la fidélité au concurrent l'exige (structure, mise en page ou
  comportement que les réglages du bloc natif n'exposent pas) — voir Étape 3 pour le mécanisme et
  les deux garde-fous obligatoires (couleurs, isolation).
- **Réflexe avant d'écrire du Liquid : chercher les classes du thème dans le HTML du concurrent.**
  S'il tourne lui aussi sur Shrine Pro (ou Dawn), ses classes trahissent souvent le bloc natif
  exact à utiliser (cf. leçon Titanox dans "Erreurs déjà commises" plus bas), et ses variables
  CSS inline donnent les réglages à recopier un par un.
- Dans tous les cas, **indiquer à Roméo, en passant**, ce qui est natif et ce qui est du Liquid
  perso — jamais silencieusement, mais sans attendre de feu vert avant d'écrire.

## Étape 3 — Le Liquid personnalisé : mécanisme et garde-fous obligatoires

> ⚠️ **CORRECTION du 12/08/2026 : le champ `custom_css` N'EXISTE PAS dans Shrine Pro.** L'ancienne
> version de cette étape affirmait le contraire. Vérifié section par section (`testimonials`,
> `rich-text`, `main-product`) : zéro occurrence de `custom_css` dans les schémas. C'était un
> reste de Dawn. **Ne jamais le proposer à Roméo, ne jamais l'écrire dans un template : Shopify
> ignore le réglage inconnu et rien ne s'applique.** Il ne reste donc qu'UN seul mécanisme de
> sur-mesure, le Liquid personnalisé.

Un seul mécanisme, jamais un fichier `.liquid` séparé — mais depuis le 29/08/2026, plus besoin
d'un accord explicite de Roméo avant de l'utiliser, seulement des deux garde-fous ci-dessous :

1. **Le "Liquid personnalisé"** (Custom Liquid), qui existe en deux formes, à choisir selon le
   besoin :
   - en **bloc**, posé DANS une section (via "Ajouter un bloc") → pour un élément qui vit à
     l'intérieur de la colonne d'achat (badge, alerte de stock, bandeau de réassurance) ;
   - en **section**, posée entre deux sections (via "Ajouter une section") → pour un bloc pleine
     largeur (bandeau de logos défilant, section d'arguments, bandeau de notation).
   Dans les deux cas le HTML/CSS vit dans le champ, visible et modifiable par Roméo directement
   dans le Personnalisateur — jamais un fichier séparé dans `sections/` ou `snippets/` qu'il ne
   pourrait pas rouvrir sans risquer de casser autre chose.
2. **Garde-fou couleurs (acté le 29/08/2026) : consommer les variables CSS globales du thème,
   jamais un hex codé en dur.** Shrine expose ses couleurs de marque en variables CSS globales
   (posées via Personnalisateur > Couleurs) ; les réutiliser dans le code du bloc (`var(--color-...)`)
   plutôt que d'écrire `#6E4E37` en dur. Si le bloc/la section "Liquid personnalisé" propose lui-même
   un réglage natif "Jeu de couleurs" (color scheme), l'utiliser en plus — à vérifier au cas par cas,
   ce réglage n'est pas garanti disponible sur tous les emplacements. Le but : si Roméo change sa
   palette de marque un jour, le Liquid perso suit automatiquement, sans repasser par Claude.
3. **Garde-fou isolation (acté le 29/08/2026) : scoper systématiquement sous une classe CSS
   racine unique** (ex. `.zsac` pour le sac sling, `.zmat` pour le matelas, une nouvelle par
   produit). Ça garantit qu'une correction sur un bloc ne touche jamais les autres — c'est ce qui
   permet à Roméo de tout modifier un par un sans risquer de casser le reste de la page.
4. **Toujours annoncer à Roméo** qu'un Liquid personnalisé est utilisé et pourquoi un bloc natif
   ne suffisait pas — jamais silencieusement, mais sans attendre son accord pour agir.

### 🥇 Méthode qui marche le mieux (validée par Roméo le 12/08/2026)

Roméo l'a formulé lui-même : *« ce qui est vraiment très très fort, c'est quand tu me donnes un
custom liquid que je puisse aller coller directement, parce que tu peux aller récupérer le HTML
et tout »*. **C'est le mode de travail à privilégier par défaut sur toute reprise d'un élément
visuel du concurrent :**

1. `curl` la page du concurrent, retrouver le fragment exact (HTML + `<style>`) de l'élément visé.
2. Le recopier tel quel, en ne changeant que : les textes (traduits) et les couleurs (mappées
   palette Zooryn). **Priorité aux variables CSS globales du thème** (garde-fou couleurs
   ci-dessus) ; ne déclarer une variable locale en haut du bloc que pour une couleur sans
   équivalent global (badge/promo isolé propre à cette section).
3. Livrer le bloc prêt à coller, en indiquant précisément OÙ le poser.

Le gain est double : rendu identique au pixel sans avoir à le redevisser, et zéro dépendance —
Roméo édite le bloc lui-même dans le Personnalisateur.

### ⚠️ Le JavaScript ne s'exécute PAS dans un Liquid personnalisé (vécu le 08/08/2026)

Shrine Pro rend la section produit en AJAX ; un `<script>` injecté par `innerHTML` **n'est jamais
exécuté**. Symptôme exact : le HTML et le CSS s'affichent normalement, mais rien ne réagit au
clic — un bouton "mort".

**Conséquence : toute interactivité doit être faite en HTML/CSS pur.** La technique de référence
est la case à cocher masquée (`<input type="checkbox">` sans attribut `name`, donc jamais soumise
avec le formulaire d'ajout au panier) + `:checked ~ .overlay { display:flex }`, avec des `<label>`
comme déclencheurs. C'est ce qui a débloqué le guide des tailles Titanox après deux versions JS
mortes. Un `<label>` plein écran derrière la boîte de dialogue sert de fermeture au clic sur le
fond.

Limite acceptée de cette technique : pas de fermeture à la touche Échap, et si un conteneur
parent porte un `transform`, le `position:fixed` de l'overlay est contenu dans ce parent au lieu
de couvrir l'écran — à vérifier au rendu.

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

### 🔘 Le bouton d'ajout au panier de l'app crée un doublon (vécu sur Titanox, 10/08/2026)

Par défaut l'app de bundle **injecte son propre bouton "Ajouter au panier"** collé sous les
paliers. Comme le thème a déjà le sien plus bas, la page se retrouve avec deux boutons, et tout
ce qu'on veut intercaler entre le bundle et le bouton (image d'offre, compte à rebours, badges)
se retrouve coincé APRÈS le premier bouton — l'ordre du concurrent est cassé.

**Diagnostic rapide** : compter les `<button name="add">` dans le HTML servi (`curl`). S'il n'y en
a qu'UN alors que la page en montre deux, le second est injecté en JS par l'app.

**Solution, confirmée comme étant celle du concurrent** : dans sa config Kaching on lit
`addToCartButton: null` et `intercept_cart_request: true`, et son bouton est bien le bouton natif
du thème (`main-product-atc`). Donc → **masquer le bouton de l'app** (réglage *Design* de l'app :
"Show add to cart button" / "Use theme's add to cart button"), le bouton du thème prend le relais
et l'app intercepte le formulaire.

⚠️ **Test obligatoire après ce réglage** : sélectionner le palier le plus élevé, cliquer sur le
bouton du thème, ouvrir le panier. Si le panier ne contient qu'une seule unité, l'app
n'intercepte pas → revenir en arrière et déplacer les blocs intercalaires AVANT le bundle. La
vente passe avant la fidélité de la copie.

Réglage frère à connaître : **`Selected by default`** sur un palier (= palier précoché à
l'ouverture). Le concurrent précoche **le palier n°1, l'unité seule** (`preselectedDealBarId`
pointe sur le premier), pas le bundle mis en avant par les badges.

## Étape 5 — Vérification avant de clore

Ne jamais annoncer "terminé" sans avoir vérifié, dans l'ordre :
1. Le bouton "Ajouter au panier" ajoute la bonne variante.
2. Chaque bloc rendu correspond à ce que montre le concurrent (info présente, au bon endroit).
3. Les images utilisées sont bien celles du produit Shopify désigné à l'Étape 0.
4. Si un bloc "Liquid personnalisé" a été utilisé, Roméo sait où le retrouver et le modifier
   lui-même dans le Personnalisateur.
5. **Vérifier sur la page PUBLIÉE, pas sur le fichier local.** `curl` la vraie URL produit et
   chercher les chaînes attendues (titres traduits, noms de fichiers d'images, ancres, classes
   CSS). Un push "successful" ne prouve pas que le contenu s'affiche.

## Étape 6 — Checklist mobile (appliquée à la construction, pas en vérification finale)

**Depuis le 29/08/2026, cette checklist s'applique DÈS l'Étape 2 (construction), pas seulement
avant de clore** : la page se construit mobile d'abord (cf. Principe directeur, point 4), donc
ces points sont déjà en place avant même de passer au desktop. Historique de la leçon : vécu sur
Luma (28/06), où la page rendait bien sur desktop mais a dû être reprise cinq fois sur des
détails mobile parce que le mobile n'avait été regardé qu'à la fin. S'appuyer sur le vrai rendu
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

**Une fois le mobile posé, passer au rendu desktop** : vérifier que rien ne casse en largeur
(colonnes qui doivent réapparaître, galerie qui redevient vignettes, texte qui peut se recentrer
si c'est ce que fait le concurrent) avant l'Étape 5 (vérification) et l'Étape 7 (déploiement).

## Étape 7 — Déploiement (règles du CLAUDE.md)

1. **Toujours `pull` avant de toucher au thème** :
   `shopify theme pull --store cqqah9-t1.myshopify.com --theme 203403854169 --only config/settings_data.json --only "templates/*.json" --path "livrables/ecommerce/boutiques/zooryn-shrine"`
2. **VALIDER le template AVANT de pousser** — `scripts/validate-template.mjs`, voir ci-dessous.
   Non négociable : c'est ce qui coûte le plus de temps quand on l'oublie.
3. Push **ciblé** (`--only`) sur les seuls fichiers modifiés (le plus souvent
   `templates/product.<slug>.json`, jamais `settings_data.json` sans prévenir).
4. **Édition directe sur le live** : pas de thème d'aperçu, pas de brouillon. Annoncer à Roméo
   les fichiers poussés au moment de le faire.
5. Une fois en ligne, vérifier le rendu réel sur la page publiée (cf. Étape 5.5).

### 🚨 Shopify VALIDE les settings et refuse le fichier sans dire pourquoi (vécu le 08/08/2026)

Un push qui affiche **"pushed with errors"** sans le moindre détail = le template a été REJETÉ,
le fichier n'existe pas côté serveur. Le CLI ne donne jamais la cause. Les trois causes réelles
rencontrées :

1. **Valeur de `select` hors des options du schéma** (`alignment: "flex-start"` alors que le bloc
   n'accepte que `left|center|right`).
2. **Valeur de `range` qui ne respecte pas le `step`** — le piège n°1, parce qu'il est invisible.
   Une marge à `10` sur un range `0..45 step 3` est refusée. Idem `padding_top: 30` sur un
   `step 4`. **Toujours prendre un multiple du step à partir du `min`.**
3. **Type de bloc non accepté par la section** (ex. un bloc `image` dans une section `rich-text`,
   qui n'accepte que heading/caption/text/button/rating-stars/trustpilot-stars/atc-button/container).

Ne JAMAIS diagnostiquer ça par dichotomie de pushs successifs (une demi-heure perdue le
08/08) : **lancer le validateur**, qui lit les schémas du thème et sort la liste exacte des
valeurs fautives en une seconde.

```bash
node .claude/skills/fiche-produit/scripts/validate-template.mjs \
  livrables/ecommerce/boutiques/zooryn-shrine/templates/product.<slug>.json
```

### 🚫 Setting `video` : impossible à renseigner par la CLI

Aucun format de référence n'est accepté (`shopify://videos/<id>`, `shopify://files/<id>`,
`gid://shopify/Video/<id>`, l'ID nu, le nom de fichier — les cinq testés, tous rejetés). Seule
une valeur vide passe. **Donc : poser les blocs vidéo vides, tout le reste du contenu en place,
et donner à Roméo la liste "quelle vidéo va dans quel emplacement" à sélectionner lui-même dans
le Personnalisateur.** Ne pas perdre de temps à chercher le bon format.

### ⚔️ Le Personnalisateur ouvert ÉCRASE un push (vécu le 09/08/2026)

Si Roméo a l'éditeur de thème ouvert sur la version d'avant le push, le premier enregistrement
qu'il y fait réécrit TOUT le template depuis l'état chargé dans son navigateur — le travail
poussé entre-temps disparaît sans le moindre message. Symptôme : « il ne s'est pas mis », alors
que la vérification serveur était bonne juste après le push.

**Règle des deux côtés :**
- Claude : `pull` systématique juste avant chaque modification, même quand on vient de pousser
  cinq minutes plus tôt. Puis patch chirurgical du JSON pull, jamais régénération complète du
  template (sinon on écrase le travail manuel de Roméo).
- Roméo : recharger (F5) l'éditeur avant de retoucher, et le fermer pendant que Claude pousse.

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
- **Avoir affirmé que `custom_css` existait dans Shrine Pro.** Il n'existe nulle part. Corrigé le
  12/08/2026, cf. encadré de l'Étape 3.
- **Avoir écrit du Liquid là où le concurrent utilisait un bloc natif.** Sur le carrousel d'avis
  Titanox, Roméo demandait « le custom liquid pour tout faire d'un coup » ; l'inspection de son
  HTML (`review-items-container`, `review-item--top`, `splide-component`, `--star-color:#ffcc00`)
  a montré qu'il utilisait le bloc natif **Reviews** de Shrine Pro. Écrire du Liquid aurait
  ÉLOIGNÉ de lui tout en rendant Roméo dépendant de Claude. **Réflexe : avant d'écrire du Liquid,
  chercher les classes du thème dans le HTML du concurrent — s'il tourne lui aussi sur Shrine Pro
  (c'était le cas de Titanox), ses classes trahissent le bloc natif exact à utiliser, et ses
  variables CSS inline donnent les réglages à recopier un par un.**
- **Jetons de champ à connaître** (faciles à rater, écrits en tout petit sous le champ dans le
  Personnalisateur) : dans le bloc **Reviews**, le champ *Auteur* accepte `[stars]` pour afficher
  les étoiles et `[checkmark]` pour la coche « vérifié » — sans le jeton, aucune étoile ne
  s'affiche. Le bloc est limité à **3 avis** maximum.

## Réserve — Traduction des pages légales pour un marché non francophone (source : Notion "Les prompts Claude", ajouté le 06/08/2026)

**Non actif aujourd'hui : Zooryn vend uniquement en France (cf. `context/CONTEXT.md`), les
marchés Canada francophone / US / Allemagne restent en réserve, à activer seulement si un
produit performe.** Prompt conservé ici pour ne pas le perdre, à sortir le jour où Roméo ouvre
un marché dans une langue non française (mentions légales, CGV, politique de confidentialité...).

```
Rôle & Contexte :
Tu es à la fois :
1. Un traducteur natif de [langue cible], maîtrisant parfaitement les nuances linguistiques,
   juridiques et culturelles du pays [pays cible].
2. Un expert en droit des affaires, de la consommation et de la protection des données dans ce
   pays, spécialisé dans la conformité légale des [type de document : mentions légales /
   politique de confidentialité / conditions générales de vente / etc.] pour les sites e-commerce.

Objectif : adapter le document ci-dessous, rédigé en français, pour qu'il soit conforme aux lois
en vigueur dans [pays cible], naturellement formulé dans un langage juridique local,
culturellement cohérent (références, institutions, devises, formats de date), et entièrement
fluide et professionnel, comme rédigé directement par un juriste natif.

Instructions :
1. Lis le texte source ci-dessous (français).
2. Traduis et réécris intégralement le document en [langue cible], en respectant la structure,
   les titres et les paragraphes d'origine, en adaptant chaque notion juridique, référence
   légale, autorité ou terme spécifique au système juridique et culturel de [pays cible].
3. Si aucun équivalent exact n'existe à un terme ou une notion française, réadapte-le pour la
   formulation la plus naturelle, claire et juridiquement valide possible dans le pays cible.
4. Remplace devises, adresses, formats de date et mentions locales (ex. CNIL / RGPD) par leurs
   équivalents légaux locaux.
5. Rendu final complet, fluide, professionnel, sans note explicative ni commentaire.

Format de sortie : document final entièrement adapté et traduit en [langue cible], même
structure/hiérarchie que le document source, style juridique clair et professionnel.

[langue cible] = ????
Le document est le suivant :
[COLLER LES MENTIONS LÉGALES, POLITIQUES…]
```

## Limites connues

- Pas d'outil d'upload de fichier local vers Shopify côté Claude : les visuels finaux sont
  déposés par Roméo dans Shopify Admin > Contenu > Fichiers, Claude résout l'URL CDN ensuite.
- Aucun accès API/CLI/MCP aux apps tierces installées (bundle, avis, etc.) — voir Étape 4.
