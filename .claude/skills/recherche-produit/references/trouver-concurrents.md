# Trouver un maximum de concurrents/créas sur un produit déjà validé (scaling)

> Différent de l'étape 1 du `SKILL.md` (sourcer une NOUVELLE niche/produit à tester). Ici, le
> produit est déjà identifié et validé (en test payant ou déjà rentable), et l'objectif est de
> trouver un MAXIMUM de concurrents et de créas à traduire/adapter pour alimenter le scaling.
> Utile en phase d'optimisation (recharger des créas) et surtout en phase de scaling (multiplier
> les angles envoyés).
>
> **Réécrit le 09-10/09/2026** à partir de la série complète de leçons Zecom Academy (Module 12,
> "Étape 2.1 début de scaling" + Module 5, sous-partie 3.2 à 3.9), transcrites intégralement.
> Remplace l'ancienne version (moins précise, avant l'abonnement Spybox).
>
> **Abonnement Spybox souscrit par Roméo (~200 €/an)** : regroupe tous les outils ci-dessous
> (Kalodata, AdSpy, PipiAds, Dropship.io, Adsparo) en un seul accès, moins cher que les licences
> individuelles.

## Méthode générale (vue d'ensemble)

1. **Vider le stock de créas déjà repérées** dans le fichier de recherche produit d'origine mais
   jamais envoyées.
2. **Construire une liste de mots-clés précis** autour du produit (ChatGPT, prompt ci-dessous),
   traduits dans les grandes langues : FR, EN-US, EN-UK, DE, NL, ES, IT, PT (Brésil inclus via le
   portugais).
3. **Passer la liste dans chaque outil** (TrendTrack, AdSpy, Kalodata, PipiAds, Dropship.io,
   Adsparo, puis les sites de Content Research). Un outil peut manquer une pub qu'un autre remonte
   — ne jamais se limiter à un seul.
4. **Tout télécharger dans un Google Drive dédié**, même le contenu sous le seuil de reprise
   directe (utile plus tard comme b-roll/plan B dans un montage maison).
5. **Tracer chaque concurrent trouvé** dans le Sheet "Zooryn - Concurrents & Créas Scaling"
   (`https://docs.google.com/spreadsheets/d/1uohcWtipW9oISHM8PjSfFEx1z-Td3D2bsAVqxVudrTg/edit`,
   écriture via `scripts/concurrents-scaling.mjs`, onglet "Seuils par outil" pour le détail par
   outil).

## Construction des mots-clés (ChatGPT)

Prompt de base (à adapter) :

```
Tu es un expert en recherche produit e-commerce et en génération de mots-clés.

À partir du nom de produit suivant : {NOM_DU_PRODUIT}, génère une liste de mots-clés
extrêmement proches, c'est-à-dire :
– mêmes types d'objets
– mêmes catégories
– même utilité
– variations du même concept

Règles :
– Mots-clés précis, jamais génériques (proscrire "confortable", "basket" seul — trop de bruit).
– Mettre chaque mot-clé au singulier ET au pluriel.
– Pas de mot-clé redondant avec un mot-clé déjà pris (si "pommeau de douche" est pris, inutile
  d'ajouter "pommeau de douche haute pression").
– Chaque mot-clé unique, pas de doublons.

Génère 20-30 mots-clés pour : {NOM_DU_PRODUIT}
```

Puis demander la traduction dans toutes les langues cibles, formatée en une seule ligne
`mot1,mot2,mot3` (virgules collées, sans espace) pour coller directement dans les outils. Garder
la conversation ChatGPT active et la renommer, à réutiliser à chaque nouveau produit plutôt que
de tout réexpliquer.

## Outil 1 — TrendTrack (déjà souscrit, hors Spybox)

- **Trending Ads** (barre de recherche → Ad Copy) : colle la liste de mots-clés, trie par
  impression. Fait remonter les créas contenant ces mots-clés.
- **Trending Shop** (recherche par Keyword) : fait remonter les shops liés, y compris multi-produits
  où le produit n'est pas dans leur top 10 — creuser quand même.
- Sur un concurrent trouvé : clic droit → extension Chrome **"C-Shop Analytics"** → pages Facebook,
  pubs actives/inactives. Ajouter au **BrandTracker** pour ne pas le reperdre.
- Trier aussi par **Longest Running** (pas seulement impressions) pour choper des shops US/UK hors
  UE qui ne remontent pas dans les tris classiques.
- **Seuil scaling** : ≥200 000 impressions OU 40-50 €/j de daily spend (abaissé vs recherche
  initiale à 500k, le produit est déjà validé).

## Outil 2 — AdSpy (Spybox)

- Recherche par **texte** (mots-clés) dans l'onglet dédié. Ancienneté : les pubs très récentes
  (1-3 semaines) remontent mal, compter ~1 mois de délai.
- **Cadenas** = ET logique entre mots-clés (tous doivent apparaître dans l'ad copy) — ne jamais
  verrouiller trop de mots-clés à la fois (risque de 0 résultat).
- **Toujours ouvrir en Cmd/Ctrl+clic** pour ne pas perdre la position de scroll.
- Sur une pub trouvée → Cmd/Ctrl+clic sur le nom de la **page Facebook** → toutes ses pubs,
  triables par likes/partages.
- **Seuil scaling** : ≥150-200 likes par publication pour traduire telle quelle. En dessous,
  télécharger quand même pour du contenu à piocher (hook, plan B, b-roll).

## Outil 3 — Kalodata (Spybox)

- Recherche par **Product** (mot-clé), **Category**, ou **Shop**. Marché **US très largement
  dominant** (le plus de créateurs TikTok Shop) — chercher en priorité aux US, puis UK/FR une fois
  les bons mots-clés identifiés.
- Fenêtre glissante de 30 jours max, à décaler mois par mois avec le même mot-clé pour voir
  apparaître de nouveaux produits à chaque période.
- Sur une fiche produit : vue **180 derniers jours** + onglet **Video & Ads** pour voir/télécharger
  les créas.
- **Seuil scaling** : ≥5 000-7 000 $ de CA CUMULÉ sur le produit pour reprendre une créa telle
  quelle. En dessous, contenu à piocher (hook, b-roll) mais pas à copier intégralement.

## Outil 4 — PipiAds (Spybox)

- 3 modes : **Adspy** (mot-clé, TikTok + Meta + TikTok Shop), **recherche par image** (upload
  d'une photo produit, retrouve variantes/couleurs), **Ad Library Meta** (tri dépense totale /
  nombre de duplications / jours actifs — ces deux derniers signaux sont faibles, à ne pas
  surinterpréter).
- Onglet **"Concurrence"** sur une fiche produit → suggère parfois des produits similaires.
- Avis du formateur : **traduire large plutôt que trop trier** — dans une CBO, une créa
  supplémentaire ne coûte rien si elle ne performe pas.
- **Seuil scaling** : ≥50 000-100 000 vues pour traduire telle quelle. En dessous, contenu à
  piocher (b-roll).

## Outil 5 — Dropship.io (Spybox, dernier recours)

- Le formateur l'utilise en tout dernier, après avoir épuisé les autres outils — mais il ressort
  parfois un contenu que rien d'autre n'a trouvé.
- **Product Overview** (TikTok Shop) : mot-clé + tri par revenu. ⚠️ Ne jamais cliquer directement
  sur le produit (redirige vers TikTok Shop, inaccessible sans VPN US) — cliquer sur **"Product
  Insight"** à droite.
- Recherche par **image**, et **Ad Library** (tri EU Reach / Adsets / Last In Date).
- Descendre bas en revenu/vues sans hésiter — même un produit à faible CA peut cacher un plan
  utile.

## Outil 6 — Adsparo (Spybox, dernier recours)

- Se base sur Meta, utile pour des ads hors Europe. Seule vraie méthode utile selon le formateur :
  trier par **"Ads Number"** (nombre de duplications de l'ad).
- ⚠️ Signal peu fiable et de moins en moins pertinent (les media buyers dupliquent de moins en
  moins) : une ad à 400+ duplications est statistiquement "solide", mais pas de règle claire.
  Pas de seuil chiffré à en tirer.

## Content Research — sites additionnels (phase scaling/optimisation uniquement)

⚠️ Ne sert QUE si un produit est déjà en test payant ou en scaling. Ne pas utiliser en recherche
produit classique. Doc complet du formateur : Discord Zecom Academy → ZcomDoc → DocFormation
→ "Content Research".

Recherche par mot-clé (multilingue) ou par image selon les sites : **AliExpress** (FR/RU/NL —
catalogues différents selon sous-domaine, VPN parfois nécessaire), **Amazon** (multi-pays :
US/CA/NL/JP/UK...), **Meta Ads Library**, **TikTok organique + TikTok Creative Center**,
**Instagram organique**, **Pinterest**, **Alibaba**, **1688**, **Wildberries et Yandex** (Russie,
contenu souvent qualité créa/IA), **Lazada**, **Made in China**, **Temu**, **Shopee**,
**Google Images/Lens** (très efficace avec VPN multi-pays), **PicClick** (agrégateur eBay),
**eBay**, **Walmart**, **Etsy**, **Joom**, **Taobao**.

**Seuil Meta Ads Library en phase scaling : ≥40 €/j de daily spend** (vs ~70 €/j en phase testing)
— en scaling on veut plus de volume/diversité, Meta récompense la diversité et une audience
sur-sollicitée s'épuise.

## Sheet de suivi

Toutes les sessions de recherche de concurrents/créas en scaling se tracent dans
**"Zooryn - Concurrents & Créas Scaling"**
(`https://docs.google.com/spreadsheets/d/1uohcWtipW9oISHM8PjSfFEx1z-Td3D2bsAVqxVudrTg/edit`) :

- Onglet **"Concurrents à traduire"** : une ligne par concurrent/créa trouvé (statut 🔴/🟡/🟢,
  outil source, URL, lien pub, métrique/valeur/seuil, lien Drive du contenu récupéré, angle/notes).
- Onglet **"Seuils par outil"** : rappel fixe des seuils ci-dessus, à jour au 10/09/2026.
- Écriture via `.claude/skills/recherche-produit/scripts/concurrents-scaling.mjs` (`read` /
  `values` / `write`, même mécanique que `tableau.mjs`).
