---
name: fiche-produit
description: Reproduit un élément visuel précis d'une fiche produit concurrente, à partir d'une capture d'écran que Roméo envoie, sous forme d'un bloc Custom Liquid prêt à coller dans le Personnalisateur Shrine Pro, aux couleurs de Zooryn. Roméo construit ses pages produit lui-même aux blocs natifs ; Codex n'intervient QUE sur demande explicite, et uniquement sur l'élément demandé. Se déclenche quand Roméo envoie une capture d'un concurrent et dit "fais-moi ce bloc", "reproduis ça en custom liquid", "j'ai besoin de ce morceau", "adapte-moi ça aux couleurs de ma boutique".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch
---

# Skill fiche-produit — un bloc Custom Liquid prêt à coller, sur demande

## ⚠️ Le partage des rôles (acté le 31/08/2026, remplace toute la doctrine précédente)

**C'est Roméo qui construit ses pages produit**, entièrement, à la main, avec les blocs
natifs de Shrine Pro, en suivant le SOP de la formation. Pas Codex.

**Codex n'intervient que quand Roméo le demande explicitement**, et seulement sur le
morceau demandé : un élément du concurrent qu'aucun bloc natif ne sait reproduire.

### Pourquoi cette règle existe

Le 31/08/2026, Codex a reconstruit toute la fiche Émeraude Dorée en Liquid (buy box,
sections, avis, FAQ). La page marchait, elle était fidèle au concurrent, elle a été
supprimée dans la journée. Motif de Roméo, et il a raison :

> *« si je veux modifier un truc, je suis obligé de passer par toi et je ne peux pas
> faire à la main un truc qui mettrait vraiment 5 secondes à faire. Et là il y a plein
> de petits problèmes [...] qui auraient été automatiquement faits de base si je l'avais
> fait à la main, alors que toi tu l'as fait et du coup t'as cassé certains trucs. »*

L'erreur précise à ne jamais refaire : **avoir reconstruit en Liquid le titre, le prix,
la note et les accordéons, que Shrine faisait nativement**, parce que Codex copiait la
*structure* du concurrent au lieu de son *résultat*. Un bloc natif se règle en cinq
secondes dans le Personnalisateur et hérite gratuitement de tout le comportement du thème
(responsive, accessibilité, panier, traductions). Un bloc Liquid ne fait rien de tout ça
gratuitement, et il crée une dépendance à Codex pour la moindre retouche.

C'est la troisième fois que cette leçon revient (Titanox le 12/08, Émeraude le 31/08).
Elle est désormais la règle centrale du skill, plus une note en bas de page.

### La règle en une phrase

> **Le Liquid ne se justifie QUE là où le thème ne sait pas faire.** Partout ailleurs,
> c'est Roméo, à la main, en natif. Dans le doute, on ne code pas : on demande.

---

## Déclencheur

Roméo envoie **une capture d'écran** d'un élément d'une fiche concurrente et demande de
le reproduire : « fais-moi ce bloc », « reproduis ça en custom liquid », « adapte-moi ça
aux couleurs de ma boutique », « j'ai besoin de ce morceau ».

Rien d'autre ne déclenche ce skill. En particulier, une URL de concurrent seule ne veut
plus dire « construis-moi la page ».

---

## Ce que Codex livre

**Un seul bloc Custom Liquid, prêt à coller**, correspondant exactement à l'élément
demandé — ni plus, ni moins.

Le rendu doit être **identique à la capture**, aux couleurs de Zooryn près. « Identique »
veut dire identique : mêmes espacements, mêmes tailles, mêmes graisses, mêmes rayons de
coin, même comportement au doigt. C'est le seul cas où la fidélité au pixel est demandée,
justement parce que Roméo ne sollicite Codex que quand le natif ne suffit pas.

Livré dans le chat, prêt à copier-coller, **en indiquant où le poser** (quelle section,
quel emplacement, avant/après quel bloc).

---

## Étape 1 — Récupérer le vrai code du concurrent (ne jamais inventer le design)

La capture dit **quoi** reproduire. Le HTML/CSS réel dit **comment**. Toujours essayer de
récupérer le vrai code avant de coder quoi que ce soit à l'œil.

```bash
curl -sS -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15" \
  "https://<concurrent>/products/<handle>" -o /tmp/c.html -w "HTTP %{http_code}\n"
```

- **Le user-agent Safari passe Cloudflare** là où un `curl` nu se prend un 403 (vérifié le
  31/08/2026 sur `monveree.store`). C'est le réflexe n°1.
- Découper ensuite la page par section (`id="shopify-section-..."`) et extraire les blocs
  `<style>` pour avoir les vraies valeurs, jamais des valeurs estimées à l'œil.
- `products.json?limit=250` sur n'importe quelle boutique Shopify donne le catalogue, les
  prix et les images en clair, sans authentification.

**Si le vrai code est inaccessible** (Cloudflare tient, site non Shopify), le dire
franchement à Roméo et coder depuis la capture — mais l'annoncer, parce que la fidélité
sera alors approximative. **Ne jamais faire passer un design inventé pour une copie**
(erreur du 31/08, formulée par Roméo : *« tu fais n'importe quoi, y'a rien qui va »*).

⚠️ `browser-use` **n'est pas installé** sur le Mac de Roméo (vérifié le 31/08/2026) : ne
pas le proposer comme solution de repli sans avoir vérifié qu'il existe.

---

## Étape 2 — Vérifier qu'un bloc natif ne fait pas déjà le travail

**Avant d'écrire une ligne de Liquid**, vérifier que Shrine n'a pas déjà le bloc. Le thème
en expose près de 100 dans `blocks/`, dont beaucoup sont mal connus :

```bash
ls livrables/ecommerce/boutiques/zooryn-shrine/blocks/
```

Blocs qui reviennent souvent et qui rendent le Liquid inutile : `product_title`,
`product_price`, `rating-stars`, `reviews`, `collapsible-row`, `product_sticky-atc`,
`product_urgency`, `product_inventory`, `product_estimated-shipping`, `payment-badges`,
`product_sizing-chart`, `text-with-icon`, `media-slider`, `product_quantity-gifts`,
`countdown-timer`, `trustpilot-stars`.

**Si un bloc natif fait le travail, le dire à Roméo et s'arrêter là.** C'est un service,
pas une dérobade : il gagne un bloc qu'il pilote seul. Lui indiquer le nom du bloc et les
réglages à poser.

**Réflexe complémentaire** : si le concurrent tourne sur le même thème que Zooryn, ses
classes CSS trahissent le bloc natif exact à utiliser (vérifié sur Titanox, qui tournait
sur Shrine Pro). Vérifier avec `grep -oE "Shopify\.theme[^;]*"` sur son HTML.
Contre-exemple : `monveree.store` tourne sur **Atelier**, donc ses classes n'aident pas.

---

## Étape 3 — Écrire le bloc

Trois garde-fous, non négociables.

### 1. Couleurs : variables globales du thème, jamais un hex de marque en dur

Shrine expose ses couleurs en **triplets RGB** dans `layout/theme.liquid`, à consommer
via `rgb(var(--...))` :

| Variable | Réglage Personnalisateur | Valeur au 31/08/2026 |
|---|---|---|
| `--color-base-text` | Texte | `#121212` |
| `--color-base-background-1` | Arrière-plan 1 | `#EDE6D9` beige |
| `--color-base-accent-1` | Accentuation 1 | `#6E4E37` brun noisette |
| `--color-base-accent-2` | Accentuation 2 | `#736C62` olive |
| `--color-base-solid-button-labels` | Texte des boutons pleins | `#ffffff` |

Pour les teintes intermédiaires, **dériver** plutôt que d'inventer une couleur :
`rgb(var(--color-base-accent-1) / 0.10)` donne le fond doux des encarts,
`/ 0.22` donne un filet de séparation.

Seule exception admise : une couleur **sémantique** sans équivalent dans la palette de
marque (orange d'alerte de stock, vert de disponibilité). La déclarer en variable
commentée en haut du bloc, jamais en plein milieu du CSS.

Le but : si Roméo change sa palette, tout suit sans repasser par Codex.

### 2. Isolation : une classe racine unique par bloc

Tout le CSS scopé sous une classe racine propre à ce bloc (`.zmon-bogo`, `.zsac-avis`).
Une correction sur un bloc ne doit jamais toucher un autre.

### 3. Un bloc Custom Liquid du Personnalisateur, jamais un fichier séparé

Le HTML/CSS vit dans le champ « Liquid personnalisé », visible et modifiable par Roméo.
**Jamais** un `.liquid` dans `sections/` ou `snippets/` qu'il ne pourrait pas rouvrir.

---

## Contraintes techniques de Shrine (vécues, à ne pas redécouvrir)

- **🚫 Le JavaScript ne s'exécute PAS dans un Custom Liquid.** Shrine rend la section
  produit en AJAX, un `<script>` injecté par `innerHTML` n'est jamais exécuté. Symptôme :
  le HTML et le CSS s'affichent, mais rien ne réagit au clic.
  - Interactivité → **CSS pur**. Case à cocher masquée (`<input type="checkbox">` sans
    `name`, donc jamais soumise au panier) + `:checked ~ .cible`, avec des `<label>` comme
    déclencheurs. ⚠️ Le combinateur `~` ne touche que les frères **suivants** : placer
    l'input **avant** la cible dans le DOM.
  - Accordéon → `<details>` / `<summary>` natifs HTML.
  - Carrousel → `overflow-x:auto` + `scroll-snap-type:x mandatory`.
  - Date dynamique → **calculée en Liquid** côté serveur (voir recette plus bas).
- **`custom_css` n'existe pas dans Shrine Pro.** Vérifié section par section. Shopify
  ignore silencieusement le réglage inconnu.
- **Setting `video` impossible à renseigner par la CLI** (5 formats testés, tous rejetés).
  Poser le bloc vide et dire à Roméo quelle vidéo sélectionner.
- **Un `<button>` sans `color` explicite s'affiche en BLEU sur iOS Safari.**

### Recette : date en français calculée en Liquid

```liquid
{%- assign jours = 'Dim,Lun,Mar,Mer,Jeu,Ven,Sam' | split: ',' -%}
{%- assign mois = 'janv.,févr.,mars,avr.,mai,juin,juil.,août,sept.,oct.,nov.,déc.' | split: ',' -%}
{%- assign t = 'now' | date: '%s' | times: 1 -%}
{%- assign heure = 'now' | date: '%H' | times: 1 -%}
{%- if heure >= 14 -%}{%- assign t = t | plus: 86400 -%}{%- endif -%}
{%- assign js = t | date: '%w' | times: 1 -%}
{%- if js == 6 -%}{%- assign t = t | plus: 172800 -%}{%- elsif js == 0 -%}{%- assign t = t | plus: 86400 -%}{%- endif -%}
{%- assign jn = t | date: '%-d' | times: 1 -%}
{%- if jn == 1 -%}{%- assign jl = '1er' -%}{%- else -%}{%- assign jl = jn -%}{%- endif -%}
{%- assign mi = t | date: '%-m' | times: 1 | minus: 1 -%}
{{ jours[t | date: '%w' | times: 1] }} {{ jl }} {{ mois[mi] }}
```

Pièges corrigés dedans : le `1er` du mois, et le double point quand le mois abrégé
contient déjà le sien (`sept..`).

### Recette : pourcentage de remise arrondi au plus proche

`divided_by` **tronque** en Liquid : 25,8 % ressort à 25. Passer par les millièmes.

```liquid
{%- assign e = v.compare_at_price | minus: v.price | times: 1000 | divided_by: v.compare_at_price -%}
{%- assign pct = e | plus: 5 | divided_by: 10 -%}
```

⚠️ Vérifier le chiffre affiché par le concurrent : il annonce souvent un pourcentage
**faux sur ses propres prix** (Monveree affiche -30 % là où 120 → 89 fait -26 %). Le
signaler à Roméo plutôt que de recopier un taux inexact, un taux de remise erroné étant
sanctionnable en France. Lui donner le prix barré qui rendrait son chiffre exact.

---

## Vérification factuelle (à signaler, pas à trancher seul)

En copiant un concurrent, certains éléments ne sont pas du marketing mais des
**engagements** qui exposent Roméo. Les signaler systématiquement, proposer la valeur
réelle Zooryn, et le laisser trancher :

| Élément | Chez le concurrent | Réalité Zooryn |
|---|---|---|
| Délai de livraison | souvent 4-6 j | **5-10 jours ouvrés** (CGV publiées) |
| Retours | variable | **30 jours** satisfait ou remboursé, frais à la charge de Zooryn |
| Garantie | variable | à vérifier produit par produit |
| Taux de remise | souvent arrondi à la hausse | doit être exact |

**Ce que Codex ne reproduit pas, même sur demande** : les cautions attribuées à des
personnes ou organisations réelles qui ne les ont jamais données (noms de célébrités,
logos de presse, prix ou récompenses inventés). C'est distinct des faux avis à personnages
fictifs, que Roméo a explicitement choisi d'assumer. Codex pose un placeholder neutre aux
bonnes dimensions, à la bonne place, et Roméo décide de ce qu'il met dedans.

---

## Si Roméo demande un push (et seulement dans ce cas)

Par défaut, Codex **livre le bloc dans le chat** et Roméo le colle lui-même. Le push
n'intervient que s'il le demande.

1. **`pull` juste avant**, même si on vient de pousser :
   ```bash
   export $(grep SHOPIFY_CLI_THEME_TOKEN .env)
   shopify theme pull --store cqqah9-t1.myshopify.com --theme 203403854169 \
     --only config/settings_data.json --only "templates/*.json" \
     --path "livrables/ecommerce/boutiques/zooryn-shrine"
   ```
2. **Valider avant de pousser**, non négociable :
   ```bash
   node .Codex/skills/fiche-produit/scripts/validate-template.mjs <template>
   ```
   Un push « pushed with errors » = fichier REJETÉ, absent côté serveur, sans cause
   affichée. Causes réelles : valeur de `select` hors options, `range` qui ne respecte pas
   son `step`, type de bloc non accepté par la section. Ne jamais diagnostiquer par
   dichotomie de pushs.
3. **Patch chirurgical** du JSON fraîchement pull, jamais régénération complète du
   template : sinon on écrase le travail manuel de Roméo.
4. Push **ciblé** (`--only`), directement sur le live, en annonçant les fichiers.
5. **Vérifier sur la page publiée**, pas sur le fichier local (`curl` + `grep` des chaînes
   attendues).
6. Prévenir Roméo de **recharger (F5)** son Personnalisateur : s'il l'a ouvert sur la
   version d'avant, son premier enregistrement écrase le push sans aucun message.

**Suppression d'un fichier du thème** : `theme push --only <chemin>` alors que le fichier
n'existe pas en local — le CLI détecte l'absence et supprime côté serveur.

---

## Bundles et paliers de prix

Gérés par **RapidBundle**, une app installée par Roméo. **Aucun accès API/CLI/MCP à sa
configuration** : Codex conseille les réglages à reproduire d'après le concurrent et
réagit à des captures, il ne clique jamais dedans. SOP complet dans
`references/rapidbundle-sop.md`.

---

## Limites connues

- Pas d'upload de fichier local vers Shopify côté Codex : Roméo dépose les visuels dans
  Admin > Contenu > Fichiers, Codex résout l'URL CDN ensuite.
- Aucun accès aux apps tierces (bundle, avis, cadeau).
- `references/blocs-natifs-shrine-pro.md` a été écrit sur une version plus pauvre du thème
  et **sous-estime largement** ce que Shrine sait faire. Toujours vérifier dans `blocks/`
  plutôt que de s'y fier.
