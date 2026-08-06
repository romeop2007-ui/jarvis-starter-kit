# Catalogue des filtres de recherche produit (F / V)

> Créé le 03/08/2026, **renommé le 04/08/2026** pour lever une collision de noms. Principe posé par Roméo : ne jamais s'accrocher à 1-2 filtres qui finissent par retomber sur les mêmes shops que tout le monde dans la formation. On construit un panel de filtres numérotés, chacun un angle différent sur TrendTrack.

## ⚠️ Ne pas confondre les deux « V » du skill

| Nom | De quoi on parle | Où c'est écrit |
|-----|------------------|----------------|
| **Méthode générale V3** | La **doctrine** de recherche produit de Roméo, 3e itération (actée le 15/06/2026) : data avant produit, pente plutôt que seuil, timing « entre les deux », présence FR pas un kill, tester dès « assez bon ». | `SKILL.md`, section « Arbitrages de fond » |
| **F1…F19 / V1…V19** | Les **recettes de requête TrendTrack**. Rien à voir avec la doctrine : ce sont juste des combinaisons de paramètres. | Ce fichier |

**Retirer un filtre F3 ne touche donc en rien la méthode générale V3.** Ce sont deux choses indépendantes.

## Convention de nommage (actée par Roméo le 04/08/2026)

- **`F` = filtre en test / attesté.** Il a une hypothèse derrière lui, mais il n'a pas encore prouvé qu'il trouve de vrais shops.
- **`V` = filtre validé.** Il a fait remonter au moins un shop réel exploitable en conditions réelles.
- **Le numéro ne change jamais**, seule la lettre bouge. F15 validé devient V15, et garde son numéro à vie. Ça permet de citer un filtre sans ambiguïté même après changement de statut.
- Un filtre retiré garde son `F` (il n'a jamais été validé) + le marqueur ❌.

## Règle de présentation par statut (non négociable)

**Sur un filtre `V` (validé)** : le bénéfice du doute existe. Un candidat moyen/borderline peut être présenté avec ses défauts assumés (pour/contre honnête) — le filtre a déjà prouvé qu'il trouve de vrais candidats.

**Sur un filtre `F` (en test)** : binaire, zéro zone grise. Soit il sort un candidat en **net début de scale** et je le présente, soit je ne présente **rien** de ce filtre et je dis juste « F-machin : rien de net cette fois ». Pas de candidat « pourrait être pas mal » pour avoir quelque chose à montrer.

**Conséquence** : un `F` qui ne sort jamais un « oui » clair après plusieurs vraies tentatives passe ❌ retiré. Soit il produit, soit il sort du catalogue.

## ⛔ Correction du 04/08/2026 : `category_ids` retiré de TOUS les filtres

Toutes les recettes ci-dessous ont été écrites avec `category_ids: [niche]` en première ligne. **Ce paramètre est à supprimer partout.** « Maison » est une ombrelle généraliste, pas une catégorie TrendTrack — filtrer dessus ampute la recherche de la majorité des produits éligibles (détail dans `outils-trendtrack.md`).

🚫 **Et surtout : on cherche large SANS jamais juger le fit produit.** Aucun tri à l'intuition, aucun « ça a l'air hors sujet ». Seuls comptent la **data** et les **exclusions dures**. Électronique et gadgets : à signaler, pas à écarter.

Là où les blocs de code ci-dessous montrent encore `category_ids: [niche]`, **l'ignorer**.

## Statuts

- ✅ **Validé (`V`)** — a fait remonter un shop réel exploitable (même si le produit n'a pas scalé au testing, le FILTRE a fait son travail)
- 🧪 **En test (`F`)** — jamais essayé en conditions réelles, ou pas assez de sessions pour juger
- ⏸️ **En pause (`F`)** — l'hypothèse tient mais le réglage actuel tourne à vide ; à retenter avec un paramétrage corrigé
- ❌ **Retiré (`F`)** — testé, n'a rien sorti d'exploitable, on arrête d'y perdre des crédits

---

## 🔑 Loi structurelle découverte le 04/08/2026 : SEUIL ABSOLU + SHOP FRAIS = TOUJOURS VIDE

En testant F2, F3 et F5 dans la même session, les trois ont échoué **pour exactement la même raison**, et ce n'est pas un hasard de marché :

> **Un seuil absolu cumulé (reach total, dépense totale, nombre de pubs) est mathématiquement incompatible avec un filtre de fraîcheur du shop.** Accumuler prend du temps. Un shop créé il y a moins de 6-8 semaines n'a par construction pas eu le temps d'atteindre 500k de reach sur une créa, ni de tenir 60 €/jour, ni d'accumuler assez d'historique pour qu'un delta de +50 % soit calculable. Donc : soit on garde la fraîcheur et on obtient 0 résultat, soit on la retire et on ne remonte que des accumulateurs de 1 à 3 ans, déjà trop tard à copier.

**Les seuls filtres qui fonctionnent sur du frais sont ceux basés sur une DÉRIVÉE — vitesse ou accélération — jamais sur un stock.** C'est précisément ce qui fait marcher les deux validés : V1 (`reachDelta7d` = vitesse) et V4 (`ad_reach_growth` en % = accélération).

**Avant de tester un nouveau filtre, se poser la question : stock ou dérivée ?**
- **Stock → ne pas perdre de crédits dessus** tant qu'on veut du shop frais. Concerne F10 et, dans une moindre mesure, F7.
- **Dérivée → candidat valable.** Concerne F6, F8, F17.
- **Filtre qualitatif** (thème Shopify, app, devise, pixel, pays, durée vidéo, longueur de copy) → **aucun problème de stock**, se combine librement avec la fraîcheur. Concerne F9, F11 à F16, F18. **Ce sont les plus sûrs à tester ensuite.**

---

## ✅ V1 — Catégorie + pente 7 jours + shop frais (le filtre de base)

```
category_ids: [niche du jour]
min_active_ads: 40
max_traffic: 2000
shop_created_after: <6 semaines
sort_by: reachDelta7d
max_ads_per_brand: 1
```
**Track record** : c'est lui qui a sorti le matelas gonflable, le sac sling, valotalo, bryngrill (tous des candidats réels, testés ou en pipeline). Toujours le premier à lancer.

**Limite identifiée le 04/08/2026** : `min_active_ads ≥ 40` élimine mécaniquement tout shop en début de scale qui n'a que 5-25 créas. V1 ne voit donc que la phase déjà avancée → **toujours le lancer en binôme avec V4**, qui couvre la phase antérieure.

## ⏸️ F2 — Dépense directe sur la vraie fenêtre 24h

```
category_ids: [niche]
min_spend: 60
spend_period: last24h
shop_created_after: <6 semaines
max_traffic: 2000
max_ads_per_brand: 10
```
Corrige un piège réel : `estimatedSpend` par défaut est cumulé sur toute la vie de la pub, pas journalier. Ici on demande littéralement « combien cette pub a dépensé hier ».

**Diagnostic 04/08/2026 : 0 résultat sur 9 catégories.** Vérifié que ce n'est pas un bug de paramètres (`min_spend:1` sur la même catégorie renvoie 158 résultats, le filtre fonctionne). Testé aussi sans `max_traffic` : toujours 0. **Le blocage est la combinaison `min_spend:60 last24h` + shop <6 semaines** : aucun shop récent ne tient 60 €/jour. Un shop qui dépense ça de façon soutenue a mis plus de 6 semaines à y monter. **Pas cassé, juste incompatible avec la fraîcheur stricte** → à retenter en desserrant à <10-12 semaines avant de le retirer définitivement.

## ❌ F3 — Reach cumulé fort (testé et RETIRÉ le 04/08/2026)

```
category_ids: [niche]
min_reach: 500000
reach_period: total
shop_created_after: <6 semaines
max_traffic: 2000
```

**Résultat : même défaut structurel que F2 et F5.** Testé en 3 variantes :
- **Tel que catalogué** : **0 résultat** sur 10 catégories.
- **Sans le filtre de fraîcheur** : que des monstres anciens — Italian Style Store (380 j, 12,6M de reach), Cek Store Italia (1045 j, 11,6M), Frilla (432 j, 9,3M), Zefo.ro (924 j), Prima Shopping (787 j), RosaValentino (1045 j). Inutilisables.
- **Fraîcheur gardée, seuil abaissé à 200k** : 1 seul résultat, SomnoLab (gouttière anti-ronflement) = exclusion dure santé.

⚠️ **Piège technique, valable pour tout filtre utilisant `min_reach`** : le `trend_signal` par défaut (`reach_growth_7d`) **écrase silencieusement** `reach_period: total` en `last7d`. Un premier passage a donc filtré sur « 500k de reach en 7 jours », bien plus dur que voulu. **Toujours passer `sort_by: "reach"` explicitement**, et **vérifier le bloc `meta.filters` de la réponse** pour confirmer quel filtre a réellement tourné.

## ✅ V4 — Pente de la créa elle-même (accélération, pas volume absolu)

```
category_ids: [niche]
ad_reach_growth: [{period: last7d, comparison: greater, value: 100}]
shop_created_after: <8 semaines
max_ads_per_brand: 1
```
Capte des candidats encore petits en valeur absolue mais qui doublent leur reach en une semaine — en avance de phase sur V1.

**Validé le 04/08/2026, le filtre le plus productif de la session.** Testé sur 5 catégories (824, 822, 820, 794, 231), il a sorti **une dizaine de shops que V1 n'avait jamais fait remonter** : Ridrplug, NordCap, Kakelo, Contoura/CleanPaw, Titano, NordicGrip, Blok Earplugs. **Il voit ce que V1 ne voit pas** (cf. limite de V1 ci-dessus) → **complément systématique de V1, pas alternative**. Réserve honnête : aucun de ces candidats n'a franchi le plancher dur lors de cette session.

## ❌ F5 — Croissance du nombre de pubs actives de la page (testé et RETIRÉ le 04/08/2026)

```
category_ids: [niche]
ads_growth: [{period: last7d, comparison: greater, value: 50}]
max_traffic: 2000
```

**Retiré, défaut confirmé sur les deux variantes :**
- **Sans filtre de fraîcheur** : que des accumulateurs anciens — Cevio (713 j), Bivaxfabriken, Dadareduceri, Lindner & Co, Petree, Novus, 4 Home Malta. Une grosse page qui ajoute 50 % de créas en une semaine, c'est du bruit de gros annonceur.
- **Avec `shop_created_after` <8 semaines** : **0 résultat** partout.

**Ni avec ni sans : c'est la métrique elle-même qui ne discrimine pas.** À noter : le signal reste excellent **en aval** (vérifier un candidat déjà trouvé via `advertising.history` de `search_shops`, comme fait sur Ridrplug 19→91), jamais **en amont** comme filtre de découverte. L'idée n'était pas mauvaise, juste mal placée dans le pipeline.

**Corollaire produit (validé par Roméo le 04/08 sur Pälshem)** : une croissance du nombre de créas **sans** croissance du reach ni du daily spend est un **faux signal** — le shop teste dans le vide. Les trois doivent monter ensemble.

## ⏸️ F6 — Rank movers (signal précoce)

```
sort_by: rankDelta7d
min_rank_delta: 10
order: desc
max_traffic: 2000
shop_created_after: <6 semaines
```
Une pub qui grimpe vite dans le classement Meta de son marché — souvent quelques jours d'avance sur le moment où le reach devient visible. **Dérivée → en théorie valable.**

**Testé le 05/08/2026 : signal très bruité.** 20 résultats, mais majorité de pages sans shop lié exploitable (`country: null`, `reach: 0/null` — pas de data shop réelle) ou de pages à contenu limite/spam (fausse urgence, deuil, allégations santé non vérifiables). Le classement Meta bouge trop vite/trop bruyamment tout seul pour servir de filtre de découverte en l'état. **Mis en pause** : à retenter uniquement combiné à un filtre qualitatif supplémentaire (ex. `min_active_ads` bas + fraîcheur) plutôt qu'en solo.

## 🧪 F7 — Split-testing actif (duplicates élevés)

```
min_duplicates: 5
max_traffic: 2000
shop_created_after: <6 semaines
```
Une marque qui décline la même créa en 5+ variantes teste activement un angle qui marche. **Seuil absolu faible → risque modéré de tomber dans le piège du stock.**

**Testé le 05/08/2026 : 0 candidat exploitable sur 20 résultats.** Presque tous déjà vus/rejetés cette session (Humaniti, Havengrand, Custom Sneakers/mrpaint, Valizigo) ou exclusions dures classiques (Orthovita genou, Proměna perte de poids, Feline Wellness santé chat, OAS Mobility = fauteuil roulant électrique donc dispositif médical, Ziarivy = beauté). Pas de faux négatif identifié, juste rien de neuf. **Reste 🧪 en test**, une seule session ne suffit pas à trancher, à retenter sur un autre échantillon.

## 🧪 F8 — Early signal (le plus tôt possible dans le cycle)

```
max_days_running: 14
ad_reach_growth: [{period: last7d, comparison: greater, value: 300}]
max_traffic: 2000
```
Créa apparue il y a <2 semaines qui a quadruplé son reach en 7 jours. Le plus risqué (peu d'historique) mais le plus tôt. **Dérivée → candidat valable.**

**Testé le 05/08/2026 : 0 candidat exploitable sur 8 résultats.** Sans `shop_created_after`, remonte des marques déjà établies (xTool, 875 pubs actives, badge partenaire) et des produits ingérés/santé (HairFiller repousse cheveux, Cloudless acné, Shilajit Daddy testostérone, Aurora Health acouphènes). **1 piste non-exclue** : Kolosstern (sacs de rangement compression sans pompe, DE) — vérifiée puis écartée, cf. F10 ci-dessous. **Reste 🧪 en test**, à retenter avec `shop_created_after` ajouté (absent du run de cette fois).

## ⏸️ F9 — Rotation géographique sous-explorée

```
main_countries: ["PL"] (puis tourner : RO, GR, PT, HU, SK, BG, CZ)
shop_created_after: <6 semaines
max_traffic: 2000
```
Les 700 élèves de la formation regardent en priorité FR/DE/IT/ES/UK. Les petits marchés EU sont statistiquement moins copiés. **Filtre qualitatif → aucun problème de stock, priorité haute à tester.**

**Testé le 05/08/2026 (Pologne) : filtre mal calibré, 0 candidat.** `main_countries` seul (sans signal e-commerce/produit) remonte les plus gros annonceurs nationaux du pays (Warner Bros, Danio, Żabka, DAZN, Milka, Orbit Polska, McDonald's, MB WAY...) — des marques et médias établis, pas des dropshippers. **Mis en pause** : à retenter uniquement combiné à un filtre qui force un vrai profil e-commerce (ex. `technologies: ["shopify"]` ou `max_products`), sinon `main_countries` seul est trop large.

## ❌ F10 — Combo confirmé (le plus strict, testé et RETIRÉ le 05/08/2026)

```
min_spend: 60
spend_period: last7d
min_active_ads: 60
ads_growth: [{period: last30d, comparison: greater, value: 100}]
```
⚠️ **Cumule DEUX seuils absolus (`min_spend` + `min_active_ads 60`) : la loi structurelle prédit 0 résultat sur du frais.**

**Testé le 05/08/2026 : hypothèse confirmée.** Seulement 7 résultats remontés (sur 20 demandés), et TOUS des pages déjà installées (81 à 875 pubs actives : xTool, HairFiller, Cloudless, Shilajit Daddy, Kolosstern 293 pubs, Sajjadah 455 pubs/159 jours de diffusion, Aurora Health 307 pubs) — aucun shop frais, en plus d'être presque tous santé/ingéré ou marques établies. **F10 ❌ retiré**, confirme la loi structurelle en tête de fichier : ne pas relancer tant qu'on veut du shop récent.

## 🧪 F11 — Exclusion Shopify Plus

```
category_ids: [niche]
shopify_plus: non-plus
shop_created_after: <6 semaines
max_traffic: 2000
```
Shopify Plus = plan des gros volumes. L'exclure filtre mécaniquement les marques trop installées. **Filtre qualitatif → sûr.**

## 🧪 F12 — Thèmes Shopify typiques dropship

```
category_ids: [niche]
theme_ids: [Shrine, Kalles, Impulse — via lookup_filter_ids type=themes]
shop_created_after: <8 semaines
max_traffic: 2000
```
Ces thèmes reviennent sans arrêt chez les dropshippers qui montent vite. **Filtre qualitatif → sûr.**

## 🧪 F13 — Apps d'optimisation installées

```
category_ids: [niche]
shopify_app_ids: [Loox, Judge.me, Rebuy, ReConvert — via lookup_filter_ids]
shop_created_after: <8 semaines
```
Un shop qui a déjà installé des apps d'avis/upsell a investi du temps et de l'argent — probablement pas un test bâclé. **Filtre qualitatif → sûr.**

## 🧪 F14 — Devise USD sur audience EU

```
category_ids: [niche]
currencies: ["USD"]
ad_countries: {include: [FR, DE, IT, ES, ...]}
shop_created_after: <6 semaines
```
Un shop encore en USD qui commence à cibler l'EU n'a pas pris le temps de localiser sa devise = signal de fraîcheur. **Filtre qualitatif → sûr.**

## 🧪 F15 — Copy courte / CTA direct

```
category_ids: [niche]
max_description_length: 200
cta: [SHOP_NOW]
shop_created_after: <6 semaines
```
S'oppose au pattern « advertorial long » (type Holmgaard) qui demande un gros travail de réécriture. Copy courte = produit-hook simple, plus rapide à traduire et tester. **Filtre qualitatif → sûr.**

## 🧪 F16 — Vidéo courte pure (hooks UGC)

```
category_ids: [niche]
media_type: video
min_video_duration: 1
max_video_duration: 15
shop_created_after: <8 semaines
```
Isole les hooks UGC courts plutôt que les formats longs. **Filtre qualitatif → sûr.**

## 🧪 F17 — Croissance stable sur deux fenêtres

```
category_ids: [niche]
growth_rank: [{period: last7d, direction: rising}, {period: last14d, direction: rising}]
```
Une pub qui monte à la fois sur 7 ET 14 jours est en croissance réelle, pas un pic d'un jour. **Dérivée → candidat valable.**

## 🧪 F18 — Pixel Meta confirmé

```
category_ids: [niche]
pixel_ids: [Facebook Pixel — via lookup_filter_ids type=pixels]
shop_created_after: <6 semaines
max_traffic: 2000
```
Écarte les sites sans pixel correctement posé (souvent des tests abandonnés day-1). **Filtre qualitatif → sûr.**

## ⏸️ F19 — Daily radar sur brandtracker

Utiliser `daily_radar` (focus `scaling` ou `new_ads`) sur les marques suivies en BrandTracker plutôt que `search_ads` pur. Déjà utilisé comme moteur d'appoint mais jamais isolé avec un vrai suivi de résultat.

## 🧪 F20 — Combo formation : technologie + CTA + langue + plafond followers (leçons 1.5/4.1/4.3, testé le 06/08/2026)

```
technologies: [shopify]  (variante B : woocommerce/prestashop/clickfunnels/gempages)
cta: [SHOP_NOW]  (variante B : LEARN_MORE, typique advertorial)
ad_languages: [en, de, sv, da, nl, fi]
max_instagram_followers: 30000
max_facebook_likes: 70000
shop_created_after: <6 semaines
max_traffic: 2000
sort_by: reachDelta7d
max_ads_per_brand: 1
```
Signal issu de la formation (Module 5, 1.5/4.1/4.3) : repérer des dropshippers via leur techno de site + type de CTA + langue de pub + plafond de followers, plutôt que via le trafic/pays utilisés jusqu'ici. **Filtre qualitatif → pas de problème de stock en théorie.**

**Testé le 06/08/2026, 2 variantes :**
- **Variante Shopify + SHOP_NOW** : 20 résultats. Aucun candidat exploitable : exclusions dures massives (Cunordic bouteille cuivre « guérit » 6 marqueurs sanguins, Korean Essence crème dépigmentante, Orthovita genou, OAS Mobility fauteuil roulant électrique — tous santé/topique/médical), marques établies (Usevantory sacs contrefaits Fendi/LV, Ecoawear, Urban Smartwatch/VORO 7 ans), niches féminines (Grace & Victoria, Eleanor & Grace, Madamme), ingéré (Wild Jerky), déjà rejetés (WaxClean, Orthovita, Kakelo, Ridrplug). **2 pistes creusées en aval** (NAE Recovery Pillow, Mosqaro Pro/Nuventra) : toutes deux tuées, cf. `liste-rejetes.md`.
- **Variante advertorial (WooCommerce/PrestaShop/ClickFunnels/GemPages) + LEARN_MORE** : **1 seul résultat sur 20 demandés** (Rücken Insider, advertorial douleur dorsale, exclusion santé). Le croisement techno-alternative + CTA advertorial + shop frais + petit trafic est trop étroit : très peu de dropshippers EU sur ces technologies avec un shop de moins de 6 semaines.

**Verdict** : F20 reste 🧪 en test (statut mitigé, pas d'échec structurel comme F2/F3/F5 mais aucun candidat net non plus). La variante Shopify+SHOP_NOW mérite un 2e essai sur un autre échantillon avant de trancher ; la variante advertorial semble trop restrictive pour être un filtre de découverte principal, à garder en appoint occasionnel plutôt qu'en routine.

## 🟡 Recherche saisonnière Q4 (shops créés en septembre 2025) — v1 ratée puis recalibrée le 06/08/2026

**v1 (testée le 06/08/2026, via `search_ads`)** : `shop_created_after: 2025-09-01` / `shop_created_before: 2025-09-30` + `max_traffic: 2000` + `sort_by: reachDelta7d`. **Résultat inexploitable** : la plupart des annonces retournées ont un `createdAt` d'annonce très postérieur à septembre 2025 (jusqu'à juin 2026) et des reach en millions (Soelia, PureUtil, Cellumove — des marques établies depuis longtemps, pas des shops encore au stade « fresh »). Le filtre `shop_created_after/before` cible bien la date de création du shop lié, mais beaucoup de ces shops sont restés actifs et ont grossi énormément depuis septembre 2025 — l'inverse de ce qu'on cherche.

**v2 recalibrée (même jour, via `search_shops`)** : ajout de `max_active_ads: 20` (shop actuellement PEU actif) + `ads_growth: [{period: last30d, comparison: greater, value: 30}]` (mais en croissance récente = signal de redémarrage) + `max_monthly_visits: 2000`. **Correction structurelle validée** : ça a bien éliminé les mega-marques et fait remonter de vrais petits shops (8-400 produits selon les cas). Mais **nouveau problème identifié : la grande majorité sont hors-UE non pertinents ou hors modèle Zooryn** — Maroc/Inde/Mexique/Togo/Pakistan (marchés non exploitables pour un test FR), catalogues fourre-tout de plusieurs centaines à milliers de produits (morinoexpress 3310 produits, ohflorafun 16749, gai-lisva 405), ingéré/santé (Jumaa Nutrition compléments, Aurenis.es "Kit AirFlow" respiratoire, crème anti-prostate togolaise), ou déjà en fin de cycle (moontwentyfour IT décor : pic à 152 pubs déjà redescendu à 17, selyn.co US : 171→15, cycle terminé pas un redémarrage).

**1 piste borderline notée** : **Aurenis** — la marque derrière `aurenis.es` (Kit AirFlow, santé, exclu) a en fait pivoté vers un **2e produit sous domaine `aurenis.de` : PackMate, cubes de compression pour ranger ses vêtements en camping-car/voyage** — pile dans la niche voyage déjà acquise de Zooryn. Mais **plancher pas franchi** : meilleure créa à 245 082 reach total (loin de 500k) et dépense moyenne ~35 €/j sur 62 jours (loin de 70 €/j). Structure de marque à 2 domaines/2 produits différents notée pour information, pas un motif d'exclusion. **À re-checker sous 1-2 semaines** si la pente s'accélère (`reachDelta7d` déjà positif sur la créa principale : +10k sur 7j).

**Verdict recherche saisonnière** : la recalibration corrige le défaut structurel de la v1, mais montre que début août reste tôt pour ce signal côté marchés EU pertinents (le gisement remonté est surtout non-UE ou hors-modèle). À refaire fin août/septembre quand le vrai redémarrage Q4 s'amorcera.

## ❌ Approches déjà écartées (ne pas retester telles quelles)

- **`find_similar_shops`** en découverte pure : remonte les grosses marques établies (REI, Decathlon...). Reste utile UNIQUEMENT en aval pour cartographier les concurrents d'un candidat déjà trouvé (cf. `trouver-concurrents.md`).
- **Recherche par mot-clé** (`keywords`) : 100 % bruit.
- **`find_winning_products`** / **`search_advertisers` trié growth** : marques établies.
- **Tri `reachDelta30d`** sans fenêtre de fraîcheur : accumulateurs anciens (cas RideLab).

---

## Journal des tests

| Date | Filtre(s) testé(s) | Résultat | Décision |
|------|--------------------|----------|----------|
| 06/08/2026 | **F20 (2 variantes : Shopify+SHOP_NOW, puis advertorial+LEARN_MORE)** + recherche saisonnière Q4 (shops créés sept. 2025) | F20 variante A : 20 résultats, 0 candidat (exclusions dures massives + marques établies), 2 pistes creusées en aval (NAE Recovery, Mosqaro Pro) tuées sur plancher/prix. F20 variante B : 1 seul résultat, exclusion santé. Recherche saisonnière : filtre `shop_created_after/before` sept. 2025 remonte des marques déjà énormes (reach en millions), signal inexploitable tel quel, probablement prématuré début août. | **F20 reste 🧪** (mitigé, pas d'échec structurel net). **Recherche saisonnière à recalibrer** (cf. section dédiée) ou reporter à fin août/septembre. Pipeline toujours vide. |
| 05/08/2026 (3) | **F7 + F8 + F9 + F10** lancés d'un coup (demande Roméo) | **0 candidat sur les 4.** F7 : que du déjà-vu/exclu. F8 : marques établies + santé, 1 piste (Kolosstern) non liée à un vrai shop indexé (funnel de media buyer, pas un dropshipper). F9 : `main_countries` seul remonte les plus gros annonceurs nationaux du pays (Danio, Żabka, McDonald's...), filtre mal calibré sans signal e-commerce. F10 : confirme la loi structurelle, que des pages à 80-875 pubs actives. | F7 reste 🧪, F8 reste 🧪 (à refaire avec `shop_created_after`), **F9 ⏸️ en pause** (besoin d'un filtre e-commerce en plus), **F10 ❌ retiré** (hypothèse confirmée). |
| 05/08/2026 (2) | **F6** (rank movers) seul, 20 résultats | Bruité : majorité de pages sans shop lié exploitable ou à contenu limite/spam. Aucun candidat exploitable. | **F6 ⏸️ en pause**, à retenter combiné à un filtre qualitatif plutôt qu'en solo. |
| 05/08/2026 (1) | **V1 page 2 + V4 page 2** (sans catégorie) | V1 p2 : rien qui passe le plancher, exclusions dures nombreuses (santé/corps, féminin, personnalisable). V4 p2 : 2 pistes ouvertes puis tuées — **maison-swanee.com** (répulsif moustique, DE) n'a plus que 1 pub active (déclin 3→1→1 sur 3 sem, le pic de reach était un spike ponctuel pas une pente réelle) ; **valizigo.com** (valise cabine avec balance intégrée) en déclin (10→14→8→3→2 pubs) ET marché 100% FR (concurrence frontale). | Aucun nouveau candidat. Confirme V1/V4 comme le duo de base, mais le puits sur cet axe (sans catégorie, shop <6-8 sem) commence à se tarir après 2 sessions consécutives (04/08 et 05/08). |
| 04/08/2026 (4) | **V1 SANS filtre catégorie** (correction de fond) | **Le filtre catégorie était LE blocage depuis le début.** Même requête V1, seule différence = `category_ids` retiré → **20 résultats, majorité de shops jamais vus**, et surtout **le premier candidat de la journée à franchir le plancher** : NordBand (bracelet à message, SE/DK/DE, shop de 3,5 semaines, 209 pubs, pente 5→210 en 6 sem., **3 créas à 366 €/j, 104 €/j et 103 €/j dont une à 976k de reach**). Avant : 0 candidat toute la journée sur 4 filtres testés. | **Règle actée : ne plus JAMAIS filtrer par catégorie.** « Maison » est une ombrelle généraliste, pas une catégorie TrendTrack. On cherche large, on juge le fit à la lecture. Ceci invalide rétroactivement le verdict « puits sec » des sessions du 03 et 04/08 : le puits n'était pas sec, on regardait dans 6 catégories sur des centaines. |
| 04/08/2026 (3) | **F3** sur 10 catégories, 3 variantes | Tel que catalogué : 0. Sans fraîcheur : accumulateurs de 1-3 ans (Cek Store 1045 j, Frilla, Zefo.ro...). Fraîcheur + seuil 200k : 1 résultat, exclusion santé. | **F3 ❌ retiré.** 3e échec identique après F2 et F5 → a permis de formuler la **loi structurelle « seuil absolu + shop frais = vide »**, qui prédit désormais quels filtres ne valent pas le coup. |
| 04/08/2026 (2) | **F4 → V4** sur 5 catégories (824, 822, 820, 794, 231) | **~10 shops neufs jamais vus via V1** : Ridrplug (91 pubs, pente 19→91 en 8 sem.), NordCap, Kakelo, Contoura/CleanPaw, Titano, NordicGrip, Blok Earplugs. **Aucun ne franchit le plancher dur.** | **F4 passe ✅ V4.** Découverte clé : V1 rate structurellement cette phase à cause de `min_active_ads ≥ 40`. V4 = complément systématique de V1. |
| 04/08/2026 (2) | **F5** sur 3 catégories, 2 variantes | Sans fraîcheur : accumulateurs anciens (Cevio 713 j, Petree...). Avec fraîcheur : **0 partout**. | **F5 ❌ retiré.** Métrique inexploitable dans les deux configs. Le signal reste bon en **aval**, jamais en amont. |
| 04/08/2026 (1) | **F2** sur 9 catégories | 0 partout. Diagnostic : incompatibilité `min_spend 60/24h` + shop <6 semaines, pas un bug. | **F2 ⏸️ en pause**, à retenter avec fraîcheur desserrée à 10-12 semaines. |
| 04/08/2026 (1) | **V1** sur 8 catégories | **0 nouveau candidat.** Re-sort Holmgaard (déjà vu 03/08) et 2 déjà rejetés (Filterboxen, Lenixi). Reste : bruit santé, gros généralistes non copiables (Havengrand, Viqzes), signaux <30k reach. Storage (816) : 0 résultat. | **V1 reste ✅.** Il confirme de façon cohérente les mêmes signaux forts = il fonctionne, mais le puits est sec par CET angle. Ne pas le relancer sur les mêmes catégories avant 1-2 semaines. |
| 03/08/2026 | V1 sur 10 catégories (maison élargie) | Rien qui passe le plancher (Zomesi 66 €/j, Holmgaard 40 €/j) | V1 reste ✅ (track record antérieur), sèche sur cette niche neuve — normal, jamais explorée avant. |
