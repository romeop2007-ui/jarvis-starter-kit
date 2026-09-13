# Prise en main — Google Sheet "Tops statics - Zecom academy"

> Sheet partagé par Roméo le 10/09/2026 (lecture seule, via `budget-bot@claude-gws-setup-497511.iam.gserviceaccount.com`), trouvé et lu via le connecteur Google Drive de Roméo.
> ID Drive : `12zWG-v86ldrJxUqTu3Xvlq7zLF8rO-8j9D9dxU5FCNw`.
> C'est la version "Google Sheet" du même fonds que le whiteboard Canva (`catalogue-formats-statics-canva.md`), mais **beaucoup plus volumineux et structuré/filtrable** (fichier ~500 Mo, essentiellement à cause des vignettes photo intégrées — des centaines/milliers de lignes). Ce document sert de fiche de prise en main : structure des colonnes + taxonomies numérotées repérées, pour savoir filtrer efficacement au moment où on en aura besoin sur un produit précis.

## ⚠️ Limite technique à retenir

Le fichier est trop volumineux pour être lu intégralement d'un coup (l'extraction se tronque après quelques centaines de lignes). **Toute exploitation réelle devra se faire par requête CIBLÉE** (niche + pays + format précis), pas par lecture exhaustive. Si besoin d'aller plus loin que ce que Roméo peut voir à l'œil dans Google Sheets (filtres natifs), il faudra soit demander un export CSV/plage précise, soit accepter de ne travailler que sur un échantillon à chaque lecture.

## Structure des colonnes

`Photo | Country | Niche | Sous-Niche | Reach | Date de création | afterlib url | website url | Format | Specific format | Special event`

- **Photo** : vignette de la créa (non exploitable via lecture texte).
- **Country** : pays du shop (France, Germany, US, Sweden, Italy, Spain, Croatia, Hungary, Romania, Denmark, Nederland...).
- **Niche** : catégorie numérotée (cf. taxonomie ci-dessous).
- **Sous-Niche** : sous-catégorie numérotée (peut être multiple sur une même ligne).
- **Reach** : tranche de reach atteinte (`500k - 1M`, `7 - 10M`, sans doute d'autres tranches intermédiaires/inférieures non vues sur cet échantillon).
- **Date de création** : mois/année de la créa.
- **afterlib url** : lien direct vers la créa sur AfterLib (accessible à Roméo, à vérifier si couvert par Spybox).
- **website url** : le shop concurrent source.
- **Format** : catégorie de format numérotée (cf. taxonomie ci-dessous), peut cumuler plusieurs formats sur une créa.
- **Specific format** : sous-variante précise du format.
- **Special event** : rempli seulement si la créa est liée à un événement (`Q4 - Black Friday`, `Q4 - Nouvel an`, `Q4 - Cyber Monday`, `Q4 - Noël`), vide sinon.

## Taxonomie NICHE (numérotée, telle qu'observée dans l'échantillon)

| # | Niche | Sous-niches observées |
|---|---|---|
| 2 | Beauty/Woman | Bronzage, Rasoir/dépilatoire, Ongles, Cheveux, Compression |
| 4 | Fashion/Jewelry | Chaussures, Orthopédique, Outdoor, Accessoires, Montre |
| 5 | Health | Orthopédique, Compression, Mycose, Compléments, Sommeil, Menstruel, Autre |
| 6 | Home | Nettoyage, Déco, Jardin/Bricolage |
| 7 | Kitchen | — |
| 8 | Men | Montre |
| 9 | Pets | — |
| 10 | Sport | Vélo |
| 11 | Other | — |

⚠️ Numéros 1 et 3 non rencontrés dans l'échantillon lu (probablement d'autres niches existantes, ex. bébé/enfant — à vérifier avec Roméo ou par une lecture ciblée ultérieure).

## Taxonomie FORMAT (numérotée)

| # | Format | Sous-variantes observées |
|---|---|---|
| 1 | Bullet point | Bullet point normal, Bullet point nombreux, Flèches |
| 3 | Hand writing | Post-it, Body writing |
| 4 | Headline | Classique, Questions, Humour, Urgence, Personne connue |
| 5 | Offre | Offre normal, Code promo, Remboursement, Gros bundle |
| 6 | Produit simple | Collage |
| 7 | Créative split en 2 | Avant/Après, Us vs Them, Problème/Solution, Split + bénéfice |
| 8 | Social Proof | Avis classique, Multi-Avis, Personne connue |
| 9 | Textuel | Long format, FB native |
| 10 | Autre | Iphone, Dessin, Google recherche, Press/Fake News/Blog, Unboxing/Stock/Entrepôt |
| — | Carousel | (catégorie à part, vue une fois, hors numérotation classique) |

⚠️ Numéro 2 non rencontré (probablement IA, vu sur le whiteboard Canva mais pas croisé ici). Une même créa cumule souvent 2-3 formats/sous-formats (ex. "4 - Headline, 1 - Bullet point" + "4 - Classique, 1 - Bullet point normal").

## Recoupement avec les autres références déjà écrites

Cette taxonomie Format numérotée **confirme et précise** `catalogue-formats-statics-canva.md` et `synthese-statics-scaling.md` : mêmes concepts (Bullet point, Headline, Hand writing/Post-it, Offre, Us vs Them, Avant/Après, Social Proof, Iphone, Textuel/Long format), mais ici avec un système de classement stable (numéro fixe) qui permettra de filtrer le Sheet directement dans Google Sheets par ces libellés exacts.

## Comment s'en servir pour conseiller sur un produit (usage futur)

1. **Filtrer par Niche + Sous-Niche** correspondant au produit (ex. "5 - Health" + "5 - Compression" pour un produit de contention).
2. **Repérer les Format/Specific format qui reviennent le plus** dans ce sous-ensemble → ce sont les concepts qui ont statistiquement le plus marché sur des produits comparables.
3. **Croiser avec Reach** pour prioriser les créas à plus fort reach comme modèles à répliquer en premier.
4. **Vérifier Special event** si on prépare une période spécifique (Q4, Black Friday...).
5. Toujours ouvrir le lien `afterlib url` (Roméo) pour voir le rendu visuel réel avant de répliquer — le Sheet donne la CATÉGORIE, pas le contenu exact.

## Exemples de shops/niches déjà repérés dans l'échantillon (repères utiles)

- **Orthopédique/Compression** (chaussures, contention) : très représenté — `orthoback.de`, `careneroldsbrand.com`, `bergxperten.de`, `flytex.fr`, `duneva.de`, `happyflops.se`, `wearrevived.com`, `bambusleeve.se`, `zirafa.hr`, `happykoala.hu` — pertinent vu la catégorie douleur/posture/orthopédie déjà rouverte côté recherche produit Zooryn.
- **Health générique** (compléments, sommeil, menstruel) : `happymammoth.com` (nombreuses variantes de format sur le même shop, bon cas d'étude de diversification), `femdisc.de`, `vargifarma.com`, `gesundheits-woche.de` (spécialiste du format Textuel/Long format + Press/Fake News).
- **Beauty/rasoir-dépilatoire** : `belle-body.de`, `onlybabe.de`, `doonails.com` (ongles).
