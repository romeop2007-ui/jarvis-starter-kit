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

**Corollaire découvert le 06/08/2026 (soirée) : retirer `max_traffic` en triant sur une valeur ABSOLUE (reachDelta7d, ou un seuil de % sans autre garde-fou) fait exactement le même dégât dans l'autre sens.** Deux tests visant à "découpler l'âge du shop de la fraîcheur du produit" (proposition externe testée le 06/08) ont été lancés sans plafond de trafic, en triant sur `reachDelta7d` : **les 40 résultats cumulés des deux requêtes étaient à 100% des marques déjà énormes** (Nestlé, Pepco, Disney+, Red Bull, Whiskas, Deborah Milano, Shark, Pringles...), pas un seul petit dropshipper. `max_traffic < 2000` n'est donc pas qu'un proxy de fraîcheur commode à retirer : c'est un garde-fou indispensable qui empêche les gros comptes d'écraser le tri dès qu'on trie sur une métrique absolue. **Règle : ne jamais retirer `max_traffic` en même temps qu'on relâche la fraîcheur du shop, sauf à trier sur un signal en % pur et à accepter un bruit énorme à filtrer à la main.**

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

## ❌ F6 — Rank movers (signal précoce, RETESTÉ et RETIRÉ le 06/08/2026)

```
sort_by: rankDelta7d
min_rank_delta: 10
order: desc
max_traffic: 2000
shop_created_after: <6 semaines
technologies: [shopify]  (filtre qualitatif ajouté au 2e essai)
```
Une pub qui grimpe vite dans le classement Meta de son marché — souvent quelques jours d'avance sur le moment où le reach devient visible. **Dérivée → en théorie valable.**

**Testé le 05/08/2026 : signal très bruité.** 20 résultats, mais majorité de pages sans shop lié exploitable (`country: null`, `reach: 0/null`) ou de pages à contenu limite/spam. **Retesté le 06/08/2026 combiné à `technologies: [shopify]`** (comme suggéré) : toujours aussi bruité, reach quasi nul sur tous les résultats (0-262 reach total), un seul motif récurrent — Viqzen.com/Viqzes.com (pattes de fixation murale) répété 9 fois sur 20 résultats avec un reach de 7 à 99 — plus des advertorials santé/deuil manipulateurs (Julia's Blog, Collagennight). **Verdict : le rank delta seul mesure du bruit de classement, pas un vrai signal de scale, même combiné à un filtre qualitatif.** ❌ **F6 retiré définitivement.**

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
technologies: [shopify]  (filtre e-commerce ajouté au 2e essai)
```
Les 700 élèves de la formation regardent en priorité FR/DE/IT/ES/UK. Les petits marchés EU sont statistiquement moins copiés. **Filtre qualitatif → aucun problème de stock, priorité haute à tester.**

**Testé le 05/08/2026 (Pologne) : filtre mal calibré, 0 candidat.** `main_countries` seul remonte les plus gros annonceurs nationaux (Warner Bros, Danio, Żabka...), pas des dropshippers. **Retesté le 06/08/2026 avec `technologies: [shopify]` ajouté : correction efficace**, 483 résultats disponibles (page 1 lue), de vrais petits shops PL remontent (WideDogs, Ziarivy Shop, Titano Polska, PewnaLapka, Heltavo). **Mais aucun candidat neuf/validable** : WideDogs et Titano déjà rejetés (session du 04-05/08), Ziarivy Shop est un généraliste (chusteczki animaux, pilnik, worki, t-shirt... plusieurs niches sans rapport dans le même shop = pas un mono-produit à copier), le reste sous le plancher. **Reste ⏸️ en pause côté résultat concret**, mais le fix technique (ajouter `technologies`) est validé et réutilisable — la Pologne elle-même semble juste un marché déjà bien exploré par les 700 élèves malgré l'hypothèse de départ.

## ❌ F10 — Combo confirmé (le plus strict, testé et RETIRÉ le 05/08/2026)

```
min_spend: 60
spend_period: last7d
min_active_ads: 60
ads_growth: [{period: last30d, comparison: greater, value: 100}]
```
⚠️ **Cumule DEUX seuils absolus (`min_spend` + `min_active_ads 60`) : la loi structurelle prédit 0 résultat sur du frais.**

**Testé le 05/08/2026 : hypothèse confirmée.** Seulement 7 résultats remontés (sur 20 demandés), et TOUS des pages déjà installées (81 à 875 pubs actives : xTool, HairFiller, Cloudless, Shilajit Daddy, Kolosstern 293 pubs, Sajjadah 455 pubs/159 jours de diffusion, Aurora Health 307 pubs) — aucun shop frais, en plus d'être presque tous santé/ingéré ou marques établies. **F10 ❌ retiré**, confirme la loi structurelle en tête de fichier : ne pas relancer tant qu'on veut du shop récent.

## ❌ F11 — Exclusion Shopify Plus (testé et RETIRÉ le 06/08/2026)

```
shopify_plus: non-plus
shop_created_after: <6 semaines
max_traffic: 2000
```
Shopify Plus = plan des gros volumes. L'exclure filtre mécaniquement les marques trop installées. **Filtre qualitatif → sûr, en théorie.**

**Testé le 06/08/2026 : ne discrimine quasiment rien.** 20 résultats, tous de très gros reach (100k-1,4M), la quasi-totalité déjà vue/rejetée cette session ou en session précédente (Humaniti ingéré, WaxClean, trydentalbeam santé, Brapp Society, NordBand personnalisable, Havengrand généraliste, Orthovita santé, Grace & Victoria féminin, NovaHome santé pieds, Ziarivy/WideDogs/Valizigo/Maxsound déjà vus). **`shopify_plus: non-plus` est presque toujours vrai** (Plus est un plan cher réservé aux très gros volumes) donc le filtre n'élimine quasiment personne dans ce contexte — il ne fait que reproduire le tri par défaut. **1 découverte notable en aval, cf. Hazel & Ivy/Astrid Göteborg ci-dessous (tuée sur le fit).** ❌ **F11 retiré** : aucune valeur ajoutée par rapport à une recherche sans lui.

## ⏸️ F12 — Thèmes Shopify typiques dropship

```
theme_ids: [SHRINE PRO, SHRINE, KALLES, IMPULSE — résolus via lookup_filter_ids]
shop_created_after: <8 semaines
max_traffic: 2000
```
Ces thèmes reviennent sans arrêt chez les dropshippers qui montent vite. **Filtre qualitatif → sûr.**

**Testé le 06/08/2026 : 5 résultats seulement (sur 20 demandés), signal trop rare pour ces thèmes précis sur un shop <8 semaines.** Rien d'exploitable : Resin Art (guide gratuit, pas un produit physique), TrueRoots (poudre camouflage barbe, cosmétique léger mais reach trop faible 16k), Lusitania (jean dentelle PT, féminin), Doglivo (harnais chien anti-traction DK, sous le plancher 61k reach), Heltavo (ceinture confort PL, sous le plancher 17k reach). **Mis en pause** : le filtre fonctionne mais le volume de résultats est trop faible pour être une source principale, à combiner avec une fenêtre plus large ou d'autres thèmes.

## ⏸️ F13 — Apps d'optimisation installées

```
shopify_app_ids: [Loox 1357, Judge.me 2555, Rebuy 4521, ReConvert 2953]
shop_created_after: <8 semaines
max_traffic: 2000
```
Un shop qui a déjà installé des apps d'avis/upsell a investi du temps et de l'argent — probablement pas un test bâclé. **Filtre qualitatif → sûr.**

**Testé le 06/08/2026 : 20 résultats mais reproduit presque exactement le même lot que F9 (rotation géo Pologne)** — WideDogs, Ziarivy Shop (×5 produits différents du même shop généraliste), Titano Polska, Piękno Ognia Kominki (poêles/inserts, lourd/encombrant), Strefa Higieny Uszu (déjà vu WaxClean), Sofia Moda Manhattan (robes, féminin). Rien de neuf. **Mis en pause** : le filtre en lui-même ne semble pas assez discriminant seul, sur-représente les mêmes gros comptes shopify PL que d'autres filtres.

## ❌ F14 — Devise USD sur audience EU (testé et RETIRÉ le 06/08/2026)

```
currencies: ["USD"]
ad_countries: {include: [FR, DE, IT, ES, NL, BE, SE, DK]}
shop_created_after: <6 semaines
max_traffic: 2000
```
Un shop encore en USD qui commence à cibler l'EU n'a pas pris le temps de localiser sa devise = signal de fraîcheur. **Filtre qualitatif → sûr, en théorie.**

**Testé le 06/08/2026 : 0 résultat.** La combinaison devise USD + audience EU spécifique + shop <6 semaines + trafic <2000 est trop stricte simultanément (probablement peu de shops USD encore jeunes qui ciblent déjà l'EU avec un budget mesurable). ❌ **F14 retiré**, hypothèse invalidée telle quelle (pourrait être retentée sans `max_traffic` ou avec une fenêtre plus large, mais pas prioritaire).

## ⏸️ F15 — Copy courte / CTA direct

```
max_description_length: 200
cta: [SHOP_NOW]
shop_created_after: <6 semaines
max_traffic: 2000
```
S'oppose au pattern « advertorial long » (type Holmgaard) qui demande un gros travail de réécriture. Copy courte = produit-hook simple, plus rapide à traduire et tester. **Filtre qualitatif → sûr.**

**Testé le 06/08/2026 : 20 résultats, mais rien de neuf.** Pandaestore (reseller t-shirt générique), Valizigo (déjà vu, marché FR), Retro Games (montre, marque floue), Kairo.gr (nébuliseur bébé, santé), Nuqia (oreiller douleur cou FR, même positionnement que NAE Recovery déjà tué), Wild Jerky (ingéré), Eyfel Polska (parfum reseller). **Mis en pause** : le filtre isole bien des copies courtes mais la plupart sont des resellers génériques ou de la santé, pas des mono-produits copiables.

## 🟡 F16 — Vidéo courte pure (hooks UGC)

```
media_type: video
min_video_duration: 1
max_video_duration: 15
shop_created_after: <8 semaines
max_traffic: 2000
```
Isole les hooks UGC courts plutôt que les formats longs. **Filtre qualitatif → sûr.**

**Testé le 06/08/2026 : le filtre le plus prometteur de la session en volume/qualité**, 20 résultats avec des reach substantiels (30k-260k), très peu de bruit santé/spam comparé aux autres. Mais **majorité de shops déjà connus** (NordBand, Vibraja/sonnfit rejeté, Ecoawear, Madamme, Nuventra/Mosqaro déjà tué ce jour) **ou hors modèle** (mode féminine : Charmora, Lucia Bianchi, Illiora, Carter & Grace, Sofia Vergaraa, Bellamy London ; marques établies : Phaze, Galeria DasBeste). **1 piste neuve notée** : **Fjellvaro.com** (chaussures 1ers pas enfant, DK, 12 jours, 70k reach total, ~53€/j de moyenne) — catégorie inédite (bébé/enfant), mais **sous le plancher dur** (loin de 500k reach / 70€/j soutenu) et marché DK seul. À re-checker si la pente s'accélère. **Statut 🟡 prometteur mais pas encore validé** : bon rapport signal/bruit, à relancer sur un nouvel échantillon avant de trancher V ou ❌.

## ❌ F17 — Croissance stable sur deux fenêtres (testé et RETIRÉ le 06/08/2026)

```
growth_rank: [{period: last7d, direction: rising}, {period: last14d, direction: rising}]
max_traffic: 2000
```
Une pub qui monte à la fois sur 7 ET 14 jours est en croissance réelle, pas un pic d'un jour. **Dérivée → candidat valable en théorie.**

**Testé le 06/08/2026 : capte exclusivement des marques déjà massivement établies.** 20/20 résultats sont des entreprises connues avec des millions de reach — Zentralfut (équipements sport personnalisés, 10M reach), Humantra (boisson électrolyte, 100M+ reach cumulé), Syoss (L'Oréal), Bolt Food, Meroda Cosmetics (1927 pubs actives), GUESS, Warner Bros, Novakid, The Ridge, Ooni, Baleària (ferry), BRD (banque roumaine). **`max_traffic: 2000` n'a rien filtré** : ces marques ont un trafic organique mesuré comme faible sur certains sous-domaines/marchés malgré des budgets pub énormes, ce qui contourne le garde-fou. **La double-croissance 7j+14j est structurellement un signal de marque déjà installée** (rang qui se maintient en continu), pas de découverte fraîche. ❌ **F17 retiré**, confirme que `growth_rank` seul (sans fraîcheur du shop en paramètre direct, que le filtre ne propose pas) est inutilisable pour la découverte.

## 🟡 F18 — Pixel Meta confirmé

```
pixel_ids: [Facebook Pixel — 915edbd5-d4be-46da-9c35-da4519de040b]
shop_created_after: <6 semaines
max_traffic: 2000
```
Écarte les sites sans pixel correctement posé (souvent des tests abandonnés day-1). **Filtre qualitatif → sûr.**

**Testé le 06/08/2026 : gros volume de résultats à fort reach (100k-1,4M), mais dominé par la santé/exclusions dures.** ScandicBeam (déjà en réserve), Zomesi (déjà en réserve), Havengrand/NordBand/Grace&Victoria/Brapp/WaxClean/trydentalbeam déjà vus, le reste très majoritairement santé (NovaHome pieds, Eva&Marie pieds, Proměna poids déjà rejeté, Imran Saleem statines/peur cardiaque, Serenia sommeil bébé). **Statut 🟡** : le filtre confirme bien des shops avec une vraie infra e-commerce (pixel posé = sérieux), mais sans combinaison avec les exclusions dures en amont, il remonte trop de santé. Cohérent avec le reste de la session, pas de candidat neuf.

## ⏸️ F19 — Daily radar sur brandtracker

Utiliser `daily_radar` (focus `scaling` ou `new_ads`) sur les marques suivies en BrandTracker plutôt que `search_ads` pur. Déjà utilisé comme moteur d'appoint mais jamais isolé avec un vrai suivi de résultat.

**Testé le 06/08/2026 : 0 brandtracker suivi dans le workspace**, donc `daily_radar` ne scanne rien (`scannedBrandtrackers: 0`). **Ce filtre ne peut fonctionner qu'après avoir ajouté des marques en BrandTracker manuellement** (fonction non utilisée à ce jour). Reste en pause, pas un filtre de découverte à froid.

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

## 🔑 Enseignement du 06/08/2026 : le trou du filet était le signal 24h

Analyse de l'historique demandée par Roméo après le rejet de Core Armour It et la mise sous surveillance d'EnkelDyne (potentiel d'explosion à court terme, 3-4 jours). **Constat : tous les filtres qui ont produit de vrais candidats (V1, V4, et le F8 corrigé qui a sorti EnkelDyne) sont basés sur une dérivée — jamais un seuil absolu — mais tous mesurée sur une fenêtre de 7 jours minimum (`reachDelta7d`, `ad_reach_growth last7d`).** Aucun filtre du catalogue n'avait jamais exploité `reachDelta1d` / `trend_signal: reach_growth_1d`, alors que ce champ est présent sur chaque résultat depuis le début. Exemple concret : EnkelDyne avait généré 23 756 de ses 77 487 reach total (~30%) en une seule journée — c'est exactement le signal "produit qui peut décoller sur quelques jours" que Roméo demande, et il était invisible pour tous les filtres testés jusqu'ici parce qu'aucun ne triait/filtrait sur 24h.

## ❌ F21 — Explosion 24h (testé et RETIRÉ le 06/08/2026)

```
sort_by: reachDelta1d
shop_created_after: <8 semaines
max_traffic: 2000
max_ads_per_brand: 1
```
Trie directement sur l'explosion d'hier plutôt que la pente sur 7 jours. Capte les produits en train de percer littéralement en ce moment, avant même que `reachDelta7d` ne le reflète pleinement. **Dérivée la plus courte possible → signal le plus précoce, mais aussi le plus bruité (un pic d'un jour peut être un accident).**

**Testé le 06/08/2026 : hypothèse invalidée.** 20 résultats, mais un ratio 1j/total élevé (souvent 80-100%) se révèle être le signal d'un **budget pub qui vient d'exploser sur une campagne DÉJÀ ancienne** (19 à 51 jours de diffusion), pas d'un produit qui vient de percer. Confusion entre « quelqu'un a mis un gros coup de budget hier » et « ce produit démarre ». Tous les résultats exploitables (Havengrand, Charmora, Grace & Victoria, Humaniti...) étaient déjà vus/exclus. ❌ **F21 retiré** : `reachDelta1d` seul n'est pas un filtre de découverte fiable, il faut le croiser avec `daysRunning` bas pour distinguer un vrai décollage d'un simple pic de budget — piste non explorée faute de paramètre dédié dans l'API.

## 🧪 F22 — Early signal resserré (variante durcie de F8)

```
max_days_running: 7  (au lieu de 14)
ad_reach_growth: [{period: last7d, comparison: greater, value: 200}]  (au lieu de 300 sur F8, desserré pour compenser la fenêtre plus courte)
shop_created_after: <6 semaines
max_traffic: 2000
```
F8 corrigé (avec `shop_created_after`) a sorti EnkelDyne le 06/08. F22 resserre encore la fenêtre de jours (7 au lieu de 14) pour ne garder que les créas vraiment naissantes.

**Testé le 06/08/2026 : reproduit correctement le même type de résultats que F8/F16 (EnkelDyne, Afterfade x2 marchés, Astrid Göteborg déjà rejeté), confirmant la mécanique, mais aucun candidat neuf.** 1 piste notée en passant : Fated Duo (jeu/coffret soirée romantique, IT) et Torsivo.cz — signal trop faible pour être présentés. **Reste 🧪 en test**, cohérent avec F8, pas encore assez de sessions pour trancher V ou ❌.

## 🧪 F23 — Dérivée + qualitatif vidéo courte (combo inédit)

```
ad_reach_growth: [{period: last7d, comparison: greater, value: 100}]  (V4)
media_type: video
min_video_duration: 1
max_video_duration: 15
shop_created_after: <8 semaines
max_ads_per_brand: 1
```
Combine V4 (le filtre le plus productif à ce jour) avec F16 (meilleur rapport signal/bruit qualitatif de la session) — jamais testés ensemble. Hypothèse : les hooks UGC courts sont le format qui scale le plus vite, donc les combiner avec la dérivée devrait concentrer les vrais decollages.

**Testé le 06/08/2026 : 1 découverte, tuée sur exclusion dure.** **Luke Store 12 (lukestore2005.myshopify.com)** — boutique multi-marché (11 pays) vendant des parfums de grandes marques (Dior Sauvage, YSL Black Opium, Mon Paris...) à prix cassé sous un nom de domaine `.myshopify.com` générique jamais personnalisé. **Contrefaçon/marché gris de parfums de marque = risque légal direct, exclusion dure.** Sinon rien de neuf (Kidora déjà vu, Phaze/Madamme déjà vus). **F23 reste 🧪** : la combinaison marche pour faire remonter des shops actifs, mais échantillon encore trop petit pour juger, et le seul candidat inédit était à écarter.

## 🧪 F24 — Dérivée + pixel confirmé (combo inédit)

```
ad_reach_growth: [{period: last7d, comparison: greater, value: 100}]  (V4)
pixel_ids: [Facebook Pixel]
shop_created_after: <8 semaines
max_traffic: 2000
```
F18 (pixel) remontait de vrais shops sérieux mais noyés de santé faute de dérivée pour prioriser. En combinant avec V4, l'hypothèse est de ne garder que les shops avec une vraie infra tracking ET qui accélèrent, plutôt que juste l'un ou l'autre.

**Testé le 06/08/2026 : confirme le problème déjà identifié sur F18, la dérivée seule ne suffit pas à filtrer la santé.** 20 résultats, tous déjà vus (Humaniti, WaxClean, Vivalyo, Havengrand, Grace & Victoria, NovaHome, SilkyShave...), aucun candidat neuf. **⏸️ F24 en pause** : le croisement dérivée+pixel ne change rien sans un filtre d'exclusion santé en amont, que l'API ne propose pas nativement — il faudrait le faire à la lecture, ce que le plancher créa-par-créa fait déjà de toute façon.

## ⏸️ F25 — Croissance de trafic organique du shop (`traffic_growth`, nouvel axe hors reach publicitaire)

```
shop_created_after: <6 semaines
max_traffic: 2000
traffic_growth: [{period: last30d, comparison: greater, value: 30}]  (testé aussi à 50, même résultat)
sort_by: reachDelta7d
max_ads_per_brand: 1
```
Idée : le reach Meta mesure la pub, pas la demande réelle. Un shop dont le trafic SITE grimpe (recherches de marque, direct, retargeting qui convertit) est une confirmation de demande sur un axe différent, potentiellement moins gamé que les métriques ads. **Filtre qualitatif en théorie → pas de problème de stock attendu.**

**Testé le 06/08/2026 à deux seuils (50% puis 30%) : exactement les 2 mêmes résultats aux deux seuils** (Eyfel Polska, reseller parfum PL déjà vu ; Haslev vingård, un vrai vignoble danois, pas un dropshipper). **Desserrer le seuil ne change rien : ce n'est pas la sévérité du critère qui bloque, c'est la disponibilité de la donnée elle-même.** La plupart des petits shops frais et à faible trafic n'ont tout simplement pas de trafic mesurable/tracké par l'outil sous-jacent (device de mesure de trafic web tiers), donc `traffic_growth` ne peut rien calculer dessus. **⏸️ F25 en pause en position de filtre de découverte primaire** : la combinaison "shop frais + petit trafic + croissance de trafic mesurable" est structurellement rare, cousine de la loi du seuil absolu mais pour une raison différente (donnée absente, pas donnée insuffisante dans le temps). Reste utilisable en confirmation a posteriori sur un candidat déjà trouvé par V1/V4 (vérifier si son trafic grimpe aussi), jamais comme filtre de recherche à froid.

## ⏸️ F26 — Signal TikTok croisé (présence/croissance TikTok + croissance de pubs)

```
min_tiktok_active_ads: 3
ads_growth: [{period: last30d, comparison: greater, value: 50}]
creation_date_from: <6 semaines
max_monthly_visits: 2000
```
Idée : beaucoup de winners dropship apparaissent sur TikTok organique/ads avant ou en parallèle de Meta, signal cross-plateforme jamais exploité dans le catalogue. **Filtre qualitatif → pas de problème de stock attendu.**

**Testé le 06/08/2026 en 2 passes.** Seul (`min_tiktok_active_ads≥3` + fraîcheur) : bruité, remonte surtout des marques établies ou des shops généralistes hors-EU (Maroc, Mexique, Pakistan, Corée). **Recalibré en le combinant à `ads_growth` (croissance de pubs Meta) : seulement 4 résultats au total** — TenniixUK (gadget tennis HK, prix 829-1199 £, très au-dessus du plafond AOV ~100€, catalogue multi-produits) et 3 clones du même shop Laurus Aroma (savons/beauté Koweït/Oman/Bahreïn, marché Golfe non-EU, niche féminine beauté). **Aucun candidat.** **⏸️ F26 en pause** : le signal TikTok, seul ou combiné à une croissance de pubs, ne discrimine pas sans une contrainte géographique EU explicite en plus — et le volume de shops qui cumulent TikTok actif + croissance + fraîcheur semble de toute façon très faible (4 résultats sans même filtrer l'EU). À reconsidérer seulement si un filtre EU strict peut être ajouté à la requête sans faire tomber le volume à 0.

## 🧪 F27 — Google Ads Library (canal Google Shopping/Search, jamais interrogé)

```
first_seen_after: <8 semaines
eu_only: true
sort_by: newest
```
Idée : les 700 élèves de la formation regardent tous Meta. Un produit qui scale via Google Shopping/Search pourrait être invisible pour la concurrence qui ne surveille que Facebook Ads Library.

**Testé le 06/08/2026 : l'outil fonctionne mais `shop_created_after`/`max_traffic` ne sont pas des champs vérifiés sur cet index** (contrainte technique de l'API Google Ads MCP, pas un choix de paramétrage). Résultat sans ces filtres de fraîcheur : mélange de gros acteurs installés (Galaxus, Myntra, Fruugo, l'automobile club néo-zélandais) et de très petites structures de service local (institut de coiffure, agence immobilière) — aucun candidat physique dropship. **🧪 F27 reste en test** : canal prometteur en théorie mais qui demande une méthode différente pour approximer la fraîcheur (filtrer sur `min_reach`/`max_advertiser_reach` bas plutôt que sur une date, puisque l'API ne permet pas de filtrer par date de création du shop lié sur cet index).

## ❌ F28 — Filtre de genre `sex: men` sur V1/V4 (testé et RETIRÉ le 06/08/2026)

Idée : couper le flot de mode/beauté féminine qui pollue systématiquement V1/V4 en forçant l'audience sur `sex: men`, en combinaison avec V1 (min_active_ads≥40) puis avec V4 (ad_reach_growth≥100%).

**Testé le 06/08/2026 : 0 résultat dans les deux cas.** La quasi-totalité des campagnes de ce segment (petits dropshippers frais) ciblent `sex: all` par défaut ; très peu segmentent explicitement sur un genre, donc le filtre élimine presque tout au lieu de juste couper le bruit féminin. ❌ **F28 retiré**, ne pas reforcer le genre en filtre de découverte — le tri du bruit féminin doit continuer à se faire à la lecture (exclusion de niche), pas via ce paramètre.

## 🧪 F29 — Rotation géographique Baltique (LT/LV/EE), extension de F9

```
main_countries: ["LT", "LV", "EE"]
shop_created_after: <6 semaines
max_traffic: 2000
sort_by: reachDelta7d
max_ads_per_brand: 1
```
Suite logique de F9 (Pologne) : tester d'autres petits marchés EU statistiquement moins regardés par les 700 élèves. **⚠️ NO et IS ne fonctionnent PAS avec `main_countries`** (l'API ne couvre que le set de transparence Meta EU/EEA/UK ; utiliser `ad_countries` pour ces marchés, jamais testé).

**Testé le 06/08/2026 : 10 résultats, aucun candidat.** Dominé par des domaines génériques à chaîne de lettres aléatoire type "jetable" (fhgugi.top, gjhiifh.top — un projecteur de veilleuse enfant "SCNDR 5D", décliné sur 2 pages différentes EE/LT, reach trop faible <25k), un reseller déjà vu (Luva Rotaslietas), un ebook immobilier (hors modèle), et de nouveau le mill générique Viqzes. **🧪 F29 reste en test** : le marché Balte semble encore plus mince que la Pologne, mais un seul passage ne suffit pas à conclure, à retenter sur un échantillon différent avant de trancher.

## ❌ F30 — Découplage âge du shop / fraîcheur produit, sans plafond de trafic (testé et RETIRÉ TEL QUEL le 06/08/2026)

```
shop_created_after: 2 à 24 mois (fenêtre glissante)
min_active_ads: 5, max_active_ads: 40
created_after (ad) : <14 jours
sort_by: reachDelta7d
aucun max_traffic
ad_countries: exclude FR
```
Idée (proposition externe, ChatGPT) : ce n'est pas le shop qui doit être frais, c'est la campagne/le produit. Un shop de 6-12 mois peut très bien avoir trouvé un winner il y a 2 semaines.

**Testé le 06/08/2026 : 20 résultats, 100% marques déjà établies et énormes** (Haibike vélos, Pepco, Prénatal, Deborah Milano, Shark, Valenti Milano...). **❌ F30 retiré tel quel** : l'idée de fond (découpler shop et créa) reste valable, mais sans `max_traffic`, trier sur `reachDelta7d` en valeur absolue favorise mécaniquement les plus gros comptes, peu importe l'âge du shop. À retester en réintroduisant un plafond de trafic ou de reach total, jamais sans aucun garde-fou de taille.

## ❌ F31 — Double confirmation 7 jours + 14 jours, sans plafond de trafic (testé et RETIRÉ TEL QUEL le 06/08/2026)

```
ad_reach_growth: [{period: last7d, comparison: greater, value: 50}, {period: last14d, comparison: greater, value: 50}]
created_after/before (ad) : 10-30 jours
min_active_ads: 5, max_active_ads: 30
aucun filtre de shop
```
Idée : une créa qui accélère à la fois sur 7j ET 14j est une vraie pente, pas un pic isolé. Fenêtre 14 jours jamais testée avant.

**Testé le 06/08/2026 : 20 résultats, de nouveau 100% marques mondiales** (Nestlé, Disney+, Red Bull, Whiskas, NYX, Pringles, Ben & Jerry's...). **❌ F31 retiré tel quel**, même cause que F30 : sans plafond de trafic/reach, même une double confirmation en % se fait dominer par les budgets énormes. **La fenêtre `last14d` elle-même reste à tester**, juste jamais seule sans garde-fou de taille.

## 🟡 F5 élargi — Croissance du nombre de pubs, shop <90 jours, AVEC plafond de trafic conservé (retesté le 06/08/2026)

```
ads_growth: [{period: last7d, comparison: greater, value: 50}]
shop_created_after: <90 jours (au lieu de <8 semaines dans le F5 original)
max_traffic: 2000 (conservé, contrairement à F30/F31)
sort_by: reachDelta7d
```
Reprise de F5 (❌ retiré le 04/08 avec une fenêtre de fraîcheur trop stricte) avec la seule fenêtre de shop élargie, en gardant `max_traffic` cette fois.

**Testé le 06/08/2026 : nettement plus riche que la version originale et que F30/F31.** 0 candidat qui franchit le plancher dur, mais plusieurs signaux utiles : **2 cas de clonage de créa confirmés** (le même set de blocs "pub irlandaise" kroue.shop tournant sous deux pages annonceur différentes ; la même robe "azalia" tournant sous deux domaines quasi-identiques calinaglam.com/noaglam.com) — validation empirique du signal "duplication du winner" évoqué en théorie. **2 pistes fraîches sous le plancher à noter** : Lovi/trakpin.com (traceur GPS/Bluetooth compatible Apple Find My et Android, sans abonnement, SE, quasi 100% de son reach fait dans les 7 derniers jours = très précoce) et Tech & Wash/trydrwash.com (accessoire de lavage de sol compatible aspirateurs Dyson, ES). **🟡 F5 élargi devient prometteur** : garder `max_traffic`, élargir la fraîcheur du shop plutôt que la retirer, c'est la bonne formule. À relancer sur un nouvel échantillon avant de trancher V ou ❌.

## ❌ F32 — Segment natif "rising-star" (testé et RETIRÉ le 06/08/2026)

```
spender: rising-star
shop_created_after: <6 semaines
max_traffic: 2000
sort_by: reachDelta7d
max_ads_per_brand: 1
```
Idée : TrendTrack propose un segment catégoriel natif "pages en forte croissance" (`spender: rising-star`), jamais exploité jusqu'ici (le catalogue ne construisait que des combinaisons de paramètres bruts). Hypothèse : ce tri interne pourrait capter un signal que `reachDelta7d` seul ne voit pas.

**Testé le 06/08/2026 : reproduit exactement le même lot que V1/V4 de ces derniers jours**, aucun candidat neuf — Humaniti, trydentalbeam, Brapp Society, NordBand, Havengrand, Hazel & Ivy/Astrid Göteborg, Custom Sneakers, Orthovita, Afterfade, WideDogs, valizigo, Eva & Marie, Proměna, ScandicBeam, Maxsound, sabrstack, EnkelDyne (nattlyshop.dk) — tous déjà vus/rejetés/en réserve. **❌ F32 retiré** : le segment "rising-star" n'ajoute rien à `reachDelta7d`, il semble calculé sur une base très proche (même population de résultats).

## ❌ F33 — Bande étroite d'avis Trustpilot (testé et RETIRÉ le 06/08/2026)

```
min_trustpilot_reviews: 3
max_trustpilot_reviews: 80
shop_created_after: <8 semaines
max_traffic: 2000
sort_by: reachDelta7d
max_ads_per_brand: 1
```
Idée inédite : un shop avec 3 à 80 avis Trustpilot a déjà eu de vraies commandes/livraisons (pas une coquille vide) mais n'a pas encore accumulé la réputation d'une marque installée — fenêtre de crédibilité minimale sans être un accumulateur ancien. **Filtre qualitatif → pas de problème de stock en théorie.**

**Testé le 06/08/2026 : seulement 2 résultats sur 20 demandés.** Woodify Česko (plans de menuiserie PDF, produit numérique donc hors modèle Zooryn) et Numora (lit berceau bébé DK, signal faible : 14k reach, 127€ de spend). **❌ F33 retiré** : la quasi-totalité des shops frais/petit trafic (le profil recherché) n'ont tout simplement pas encore d'avis Trustpilot indexés à ce stade — même défaut structurel que F25 (donnée absente sur ce segment, pas un seuil mal calibré). Idée à garder en confirmation a posteriori sur un candidat déjà trouvé, jamais en filtre de découverte à froid.

## ❌ F34 — Rollup TikTok côté `search_shops` (testé et RETIRÉ le 06/08/2026)

```
sort_by: tiktokAvgActiveAds7d
creation_date_from: <6 semaines
max_monthly_visits: 2000
min_tiktok_active_ads: 3
```
Variante technique de F26 : au lieu du signal TikTok côté `search_ads`, utiliser le rollup dédié `tiktokAvgActiveAds7d` de `search_shops` (jamais interrogé), pour voir si la moyenne lissée sur 7 jours change le tri par rapport au TikTok brut de F26.

**Testé le 06/08/2026 : même défaut structurel que F26.** Sur 20 résultats, écrasante majorité de shops hors-EU non pertinents pour un test FR (Kuwait, Oman, Bahrain, Algérie, Egypte, Chili) — même famille que Laurus Aroma (Golfe) déjà écarté en F26. **❌ F34 retiré** : le signal TikTok, quel que soit l'angle technique pour l'obtenir, est structurellement dominé par des marchés hors-EU sur ce segment shop frais/petit trafic ; confirme et referme F26 plutôt que de rouvrir une piste.

## 🟢 F35 — Plancher direct + techno Shopify + shop semi-frais (LE FILTRE DE LA SESSION, 06/08/2026)

```
min_reach: 300000
reach_period: total
technologies: ["shopify"]          ← INDISPENSABLE, voir la loi ci-dessous
max_traffic: 2000
shop_created_after: <4 mois        ← volontairement plus large que les 6-8 semaines habituelles
max_ads_per_brand: 2 à 4           ← 15 pour compter les créas d'un shop, 2 pour balayer plus de shops
sort_by: reachDelta7d
cta: ["SHOP_NOW"]                  ← option, coupe une partie des advertorials santé
```

**C'est le premier filtre du catalogue qui produit réellement le format demandé par Roméo : des shops avec 4 créas ou plus au-dessus du plancher.** Là où V1/V4 ne remontaient qu'une créa forte par shop (dédup à 1), F35 filtre directement sur le plancher de reach et lève la déduplication, donc chaque ligne retournée EST une créa qui passe le seuil, et il suffit de compter par annonceur.

**Logique de conception** : la loi structurelle du 04/08 dit qu'un seuil absolu est incompatible avec un shop très frais. F35 ne contourne pas cette loi, il l'ACCEPTE — on relâche volontairement la fraîcheur à ~4 mois (au lieu de 6-8 semaines) pour laisser le temps à l'accumulation, et on compense en gardant les deux garde-fous de taille (`max_traffic` ET `technologies`). C'est la généralisation de ce qui rendait F5 élargi prometteur.

**Résultats du premier passage (06/08/2026) : le filtre marche, mais tous les shops remontés tombent sur des exclusions dures.** Mirelia (5 créas au plancher, mais complément ingéré), Gift Soul (10 créas, mais 100% personnalisé), Tekko (3 créas, mais console rétro à 20 000 jeux préchargés = piratage de ROMs, même famille de risque légal que Luke Store), SkinLab/Vertaline (santé), Nuara (topique), Anea (féminin), Zoomad (ingéré), Cumpario (topique), Pure Comfort/Ergosteg (santé). **2 pistes physiques non-exclues creusées puis écartées** : Splash&Ray (voile d'ombrage, saisonnier + encombrant) et Babilo (porte-bébé de hanche, plancher pas franchi créa par créa).

**🟢 Statut : prometteur, à relancer sur les pages suivantes.** Le taux d'exclusion dure est ici mécanique (à 4 mois d'ancienneté et 300k+ de reach, le gisement est majoritairement santé/beauté/personnalisé), mais c'est le seul filtre qui atteint enfin le format cible. Prochain passage : monter à `min_reach: 500000` pour coller au plancher strict, et parcourir les pages 3-6.

## 🔑 Loi corollaire n°2 découverte le 06/08/2026 : `max_traffic` seul ne protège pas, il faut `technologies`

Test `min_reach: 400000` + `max_traffic: 2000` **sans** filtre techno : 20 résultats à 100% Procter & Gamble (Fairy España, Lenor Unstoppables, ARIEL — jusqu'à 50 millions de reach sur une seule créa). Le garde-fou de trafic n'avait rien filtré.

**Explication : `max_traffic` porte sur le trafic du SHOP LIÉ. Quand une pub pointe vers un lien d'application ou un domaine de tracking (ici `lacuponera.go.link`), il n'y a pas de shop indexé, donc pas de trafic mesuré, donc le plafond ne s'applique jamais.** Les plus gros annonceurs du monde passent au travers par un simple effet de bord technique.

**Correctif validé : ajouter `technologies: ["shopify"]` force l'existence d'un vrai shop e-commerce indexé et referme le trou** (le test relancé avec ce paramètre a immédiatement éliminé tous les P&G). **Règle : sur tout filtre basé sur un seuil de reach ou de dépense, `max_traffic` et `technologies` vont par paire, jamais l'un sans l'autre.**

## ❌ F36 — Reach de PAGE sur 7 jours, seuil bas seul (testé et RETIRÉ le 06/08/2026)

```
min_reach_per_page: 2000000
reach_per_page_period: last7d
technologies: ["shopify"] + max_traffic: 2000
shop_created_after: <6 mois
sort_by: reachDelta7d
```
Idée : filtrer sur le reach de la PAGE entière (pas d'une créa isolée) sur 7 jours, pour capter « tout le compte scale cette semaine » — donc mécaniquement un shop à plusieurs créas fortes, le format que Roméo demande.

**Testé le 06/08/2026 : ne discrimine pas.** Résultats dominés par les pages déjà connues et les gros comptes (My-personaltrainer, Gift Soul, Humantra, Zelesta, Blaine Box). **Cause : `min_reach_per_page` seul reste un SEUIL ABSOLU**, même borné à 7 jours — il favorise donc mécaniquement les plus gros comptes, exactement comme F30/F31. 2 shops neufs seulement, tous deux exclus (Proudly Support Local = merch mémoriel sous licence, Chiara Rossi/`myalmapure-it.com` = clone italien de `myalmapure.com`, donc réseau de domaines). **❌ F36 retiré tel quel**, mais l'idée du reach au niveau page est bonne : elle devient exploitable dès qu'on la BORNE (voir F37).

## 🟢 F37 — FENÊTRE de reach de page + signature « peu de likes FB » (LE FILTRE DE LA SESSION, 06/08/2026)

```
min_reach_per_page: 400000
max_reach_per_page: 3000000      ← LA correction clé : borner en HAUT
reach_per_page_period: last7d
max_facebook_likes: 1000          ← signature du dropshipper frais
technologies: ["shopify"] + max_traffic: 2000
shop_created_after: <6 mois
max_ads_per_brand: 1
sort_by: reachDelta7d
```

**Correction de F36 : on ne cherche pas « la page qui fait le plus de reach », on cherche la page qui est EN TRAIN de décoller.** C'est une fenêtre, pas un plancher. Le plafond haut évacue les marques installées, le plancher bas garantit un vrai volume. `max_facebook_likes` ajoute une deuxième barrière qualitative très efficace : un vrai dropshipper frais a 5 à 700 likes (Dasana 5, Huber-Outdoor 31, Mon-Veree 8, Heim-Zauber 127, Mirelia 114), une marque installée en a des dizaines de milliers (Humantra 11 289, Zelesta 43 723).

**Résultat : meilleur rapport signal/bruit de tout le catalogue à ce jour.** Nettement moins de gros comptes que V1/V4/F35/F36, et c'est lui qui a fait remonter le cluster « projecteur galaxie 5D » et, une fois combiné au prix (F38), les deux seuls candidats sérieux de la session.

## 🟢 F38 — F37 + plancher de PRIX du best-seller (le filtre à garder, 06/08/2026)

```
(tout F37) +
min_best_seller_price: 45
max_best_seller_price: 110
```

**Raison d'être : appliquer le test de réplicabilité du prix EN AMONT plutôt qu'après 30 minutes d'analyse.** La session du 06/08 a tué trois candidats de suite (Elyndra, projecteur galaxie, Huber-Outdoor) pour exactement la même raison : le winner vend trop bas pour qu'on puisse le copier avec notre structure de coûts. Autant l'empêcher de remonter.

**Résultat : le filtre le plus productif de la session.** Sur 20 résultats, une majorité de shops jamais vus, et les 2 seuls candidats présentables sont sortis de là (Mon-Veree, Huber-Outdoor). Il fait aussi remonter des catégories neuves (couteaux forgés `katanuki.nl`, ceinture sans boucle `wellbetter.nl`).

**Page 2 (même session) : 0 nouveau candidat.** Le gisement se referme vite — page 2 dominée par la mode féminine (Sivora, Novelya, Casa Provincial, Maison Tropez, Project Wayne), le santé/ingéré/topique (Nervia ×2, Forhairver, Divaya, Vertaline) et le marché FR frontal (Chatinou, Zenvora). Seul signal noté : **Klynero (`klyneroshop.com`, lanterne solaire à effet flamme, DE, 74 €/j, 181 pubs)** — écarté car saisonnier en fin d'été et trop proche de la guirlande Luma déjà testée et killée. **Conclusion pratique : F38 se joue sur la page 1, ne pas s'acharner au-delà de la page 2.**

**⚠️ Limite importante à connaître : `min_best_seller_price` filtre sur le prix CATALOGUE, pas sur le prix réellement payé.** Huber-Outdoor est passé au travers avec un affichage 59,90 € barré alors que le prix réel est 39,90 € (et 19,95 €/unité sur l'offre 1+1). Le filtre réduit énormément le bruit mais **ne dispense jamais d'ouvrir la page produit** pour relever les vrais paliers (étape 5bis).

## 🔑 Loi corollaire n°3 découverte le 06/08/2026 : en dessous de ~40 € chez le concurrent, le produit est structurellement non réplicable

Trois candidats indépendants ont été tués le même jour par le même calcul, ce n'est pas une coïncidence :

| Candidat | Prix concurrent | COGS rendu estimé | ×3,5 imposé | Écart |
|----------|----------------|-------------------|-------------|-------|
| Elyndra (collier) | 19,99 € solo | ~13,85 € | 49,99 € | **+150 %** |
| Projecteur galaxie 5D | 35 € (CZ), 33 € (AU), 23 € (NL) | ~18-22 € | 63-77 € | **+28 à +42 €** |
| Huber-Outdoor (lampe frontale) | 39,90 € (19,95 €/u en 1+1) | ~15-18 € | 52-63 € | **+12 à +23 €** |

**Explication : le plancher logistique (~10 à 13 € de transport + 3 € de taxe) est un coût quasi FIXE, indépendant du prix du produit.** Sur un article vendu 20-40 €, ce plancher représente 50 à 90 % du COGS rendu, donc le ×3,5 explose mécaniquement au-dessus du prix du marché. Sur un article vendu 80-100 €, le même plancher se dilue et le ×3,5 retombe dans l'épure.

**Conséquence opérationnelle : ne plus creuser un candidat dont le prix concurrent réel est inférieur à ~40 €** (sauf offre bundle qui remonte le panier au-dessus de ce seuil). Ça ne remplace pas le test de réplicabilité de l'étape 5bis, ça évite juste d'y arriver pour rien.

## ❌ F39 — Plancher de reach PAR CRÉA + dédup levée (testé et RETIRÉ le 06/08/2026)

```
min_reach_per_page: 400000 / max_reach_per_page: 3000000 (last7d)
min_reach: 400000, reach_period: total        ← plancher par créa
max_ads_per_brand: 15                          ← dédup LEVÉE
max_facebook_likes: 1500 + technologies:["shopify"] + max_traffic: 2000
shop_created_after: <6 mois
```
Idée : corriger le motif d'échec dominant de la session précédente (« un seul hero creative par shop ») en levant la déduplication et en posant le plancher par créa, pour que chaque ligne retournée SOIT une créa au plancher et qu'il suffise de compter par annonceur.

**Testé le 06/08/2026 : 6 résultats seulement**, tous déjà connus (Mirelia ingéré, Splash&Ray saisonnier, Elara-DK déjà rejeté). **❌ Retiré tel quel** : cumuler un plancher de reach de page ET un plancher de reach cumulé par créa fait deux seuils absolus dans la même requête — la loi structurelle du 04/08 s'applique deux fois. L'idée de lever `max_ads_per_brand` reste bonne, mais elle appartient à la **phase 2** (compter les créas d'un shop déjà trouvé), pas à la découverte.

## ❌ F40 — Plancher de RYTHME de dépense (`min_spend` sur 7 jours) (testé et RETIRÉ le 06/08/2026)

```
min_spend: 490, spend_period: last7d          ← 70 €/jour × 7
technologies:["shopify"] + max_traffic: 2000 + max_facebook_likes: 1500
shop_created_after: <6 mois
```
Idée séduisante : le plancher de la doctrine est « ≥70 €/jour ». Plutôt que le reach cumulé à vie (un stock, donc soumis à la loi structurelle), filtrer directement sur la **vitesse de dépense actuelle**, censée être une dérivée.

**Testé le 06/08/2026 : 0 résultat**, confirmant l'échec déjà constaté à 350 € le 06/08 (session 9). **Diagnostic établi cette fois** : `min_spend`+`last7d` fonctionne (testé nu, il rend Belluna 651 pubs, Holafly, Mother's Earth) mais **ne laisse passer que des annonceurs massifs**. Croisé avec la signature « shop frais + petit trafic + peu de likes », l'intersection est vide. **❌ Retiré** : malgré les apparences, `min_spend` reste un **seuil absolu** au niveau de la créa, pas une dérivée — il mesure un volume sur une fenêtre, pas une accélération.

## 🟢 F41 — Signature « dropshipper frais » seule + vitesse de reach (LE FILTRE DE DÉCOUVERTE, 06/08/2026)

```
technologies: ["shopify"] + max_traffic: 2000
max_facebook_likes: 1500                       ← la signature découverte le 06/08
shop_created_after: <6 mois
min_reach: 150000, reach_period: last7d        ← vitesse, PAS cumul à vie
max_ads_per_brand: 1
sort_by: reachDelta7d
```
**La leçon de F39/F40 retournée** : au lieu d'empiler des planchers absolus, on n'en garde **qu'un seul et il porte sur la fenêtre 7 jours** (`reach_period: last7d`), donc sur ce qui bouge maintenant. Tout le reste du filtrage est **qualitatif** (techno, trafic, likes, fraîcheur), là où la loi structurelle ne mord pas.

**Résultat : 20 résultats, majorité de shops jamais vus**, et le meilleur rapport signal/bruit de la session. C'est lui qui a ouvert les 3 pistes neuves (`sitslouch.eu`, `staydries.se` via sa variante F43, les clusters couette et oreiller enfant). **🟢 À lancer en tête de session avec F38.**

## 🟢 F42 — F41 + fenêtre de prix du best-seller

```
(tout F41, avec min_reach abaissé à 120 000 last7d) +
min_best_seller_price: 45
max_best_seller_price: 130
```
Greffe la fenêtre de prix de F38 sur la mécanique de F41. **Testé le 06/08/2026 : bon rendement**, c'est lui qui a fait remonter le 3e shop du cluster couette (`pleene.com`) et confirmé Difhouser/Belmont. Même limite que F38 : `min_best_seller_price` lit le prix **catalogue**, jamais le prix payé → ne dispense pas d'ouvrir la page.

## 🟢 F43 — V1 corrigé par le plafond de likes (LE FILTRE QUI A SORTI STAYDRIES, 06/08/2026)

```
min_active_ads: 40                             ← V1 historique
max_facebook_likes: 1200                       ← LE garde-fou qui manquait à V1
technologies: ["shopify"] + max_traffic: 2000
shop_created_after: <3 mois
min_best_seller_price: 45
max_ads_per_brand: 1, sort_by: reachDelta7d
```
**V1 tourne depuis le début sans plafond de likes.** Or `max_facebook_likes` est la meilleure signature qualitative trouvée (un dropshipper frais a 5 à 700 likes, une marque installée en a des dizaines de milliers) et elle ne coûte rien en volume. Le simple ajout de ce paramètre à la recette historique a produit **le premier candidat depuis longtemps à franchir le plancher de 3 créas** : `staydries.se` (4 créas ≥70 €/j, pente d'ads monotone 5→97 sur 10 semaines).

**🟢 Statut : validé sur sa première sortie.** Enseignement général : **avant d'inventer un filtre neuf, vérifier si un filtre historique tourne encore sans un garde-fou découvert depuis.** V1 était amputé, pas épuisé.

## ❌ F44 — Duplicates élevés + signature fraîche (testé et RETIRÉ le 06/08/2026)

```
min_duplicates: 8
technologies:["shopify"] + max_traffic: 2000 + max_facebook_likes: 1500
shop_created_after: <4 mois
min_reach: 100000 (last7d), sort_by: reachDelta7d
```
Reprise de F7 (`min_duplicates` seul, resté 🧪) en le croisant cette fois avec la signature dropshipper frais. Hypothèse : un shop qui décline une créa en 8+ variantes teste/scale activement un angle qui marche.

**Testé le 06/08/2026 : 0 candidat neuf.** Les 20 résultats sont soit déjà vus/rejetés (Mirelia, slimstep, kkkoxx, pearcehaley, myalmapure, mundozelora, justeasy, portefeuille-corval, Mon-Veree, Caobea), soit des exclusions dures (Cumpario topique, Cortii/quavionx ingéré-santé, ergosteg santé), soit du hors-modèle (Ferranosa débroussailleuse encombrante, selovaire chimique FR, vasariclo mode). **❌ F44 retiré, et F7 peut être considéré comme refermé par la même occasion** : le nombre de duplicates est une conséquence du scaling, pas un signal avancé — il ne fait que re-trier une population déjà visible par `reachDelta7d`.

## 🔑 Loi corollaire n°4 découverte le 06/08/2026 : la fenêtre du plancher compte autant que sa valeur

F39 et F40 ont échoué le même jour pour une raison commune, et elle affine la loi structurelle du 04/08 :

> **Un plancher n'est pas « absolu » ou « dérivé » par nature — c'est la FENÊTRE sur laquelle on le mesure qui décide.** `min_reach` mesuré sur `total` est un stock (incompatible avec un shop frais) ; le **même** `min_reach` mesuré sur `last7d` devient une mesure de vitesse et fonctionne parfaitement (c'est tout F41/F42/F43). Inversement `min_spend`, qui a l'air d'un débit parce qu'il est borné à 7 jours, reste un volume cumulé et ne laisse passer que les gros comptes.

**Règle pratique : un seul plancher chiffré par requête, et il se mesure sur `last7d`. Tout le reste du filtrage doit être qualitatif** (technologies, max_traffic, max_facebook_likes, shop_created_after, fenêtre de prix). Empiler deux planchers chiffrés (F39 : reach de page + reach par créa) vide la requête même quand chacun pris isolément fonctionne.

## ❌ F45 — F41 + plafond de produits du shop (testé et RETIRÉ le 07/08/2026)

```
(tout F41) + max_products: 15
```
Hypothèse : le motif d'échec le plus visible des sessions précédentes était le **shop généraliste** (Havengrand 429 produits, NextGen 127, LaVina ~70, Gift Soul, Acquahome 30+). `max_products` n'avait jamais été combiné à la signature dropshipper frais.

**Testé le 07/08/2026 : 16 résultats sur 20 étaient des shops déjà rejetés.** ❌ Retiré. **Diagnostic à retenir : le généraliste n'est PAS le motif d'échec dominant.** Les vrais tueurs sont les **exclusions santé/ingéré/topique** et le **marché FR frontal** — or ces shops-là sont justement des mono-produits, donc `max_products` ne mord pas dessus. Le paramètre reste inoffensif mais inutile : il ne coûte rien et n'apporte rien.

## 🟢 F47 — Fenêtre d'ancienneté de la créa + exclusion du marché FR (07/08/2026)

```
technologies: ["shopify"] + max_traffic: 2000 + max_facebook_likes: 1500
shop_created_after: <6 mois
min_reach: 150000, reach_period: last7d     ← plancher unique sur last7d (loi n°4)
min_days_running: 8, max_days_running: 40   ← NEUF : le « timing entre les deux » enfin paramétré
ad_countries: {exclude: ["FR"]}             ← NEUF : tue le marché FR frontal en amont
max_ads_per_brand: 1, sort_by: reachDelta7d
```

**Deux paramètres jamais utilisés dans les 44 filtres précédents, et les deux marchent :**

1. **`min_days_running`/`max_days_running`** traduit enfin en paramètre la règle de doctrine « timing entre les deux » (produit qui scale depuis 2-4 semaines), qui n'avait jamais été qu'un critère de lecture manuelle. Effet vérifié : **renouvelle réellement l'échantillon** en éliminant d'office les accumulateurs (Mirelia 53 j, Vanisia 83 j, Belmont 90 j, Bracken 123 j...).
2. **`ad_countries: {exclude:["FR"]}`** élimine les shops à marché FR frontal (Revyv, Mavaro, Exovella, shomathy sont sortis des résultats), motif de rejet le plus fréquent du fichier `liste-rejetes.md`.

**⚠️ Piège vérifié : `market: {exclude:["FR"]}` NE FONCTIONNE PAS pour ça.** Il porte sur le marché visiteur du *shop lié*, souvent non indexé sur un shop frais, donc les shops FR passent au travers. C'est bien **`ad_countries`** (distribution réelle des pubs) qu'il faut utiliser. Les deux se ressemblent, un seul mord.

## 🟢 F48 — Marchés à fort pouvoir d'achat (nordique + DACH) + prix plancher (07/08/2026)

```
(signature dropshipper frais) + min_reach: 80000 last7d
main_countries: ["SE","DK","FI","DE","AT","NL","BE","IE"]
min_best_seller_price: 45
```
Raison d'être : **tous les bons candidats historiques viennent de là** (Staydries SE/DK, matelas SE, sac sling SE, Huber AT), et ce sont les marchés à ticket élevé, donc ceux qui répondent structurellement à la loi corollaire n°3 (prix concurrent ≥40 €).

**Résultat : le filtre RETROUVE Staydries** (bonne validation croisée) et sort 1 candidat neuf. **Gisement étroit** (9 résultats avec le prix, ~40 sans), à lancer en complément et non en filtre principal. ⚠️ `main_countries` ne couvre que le jeu EU/UK de la transparence Meta : **NO et CH n'y matchent rien** (warning explicite de l'API), il faut passer par `ad_countries` pour ces deux marchés.

## ❌ F50 — Concentration budgétaire (peu de créas actives, gros reach) (testé et RETIRÉ le 07/08/2026)

```
(signature) + max_active_ads: 35 + min_reach: 200000 last7d + max_ads_per_brand: 3
```
Hypothèse séduisante : le motif d'échec qui tue le plus de candidats est la **dispersion** (Ridrplug, Babilo, oreiller enfant : beaucoup de pubs, aucune concentration). `max_active_ads` (l'inverse de `min_active_ads`) n'avait jamais été utilisé. L'idée était de sélectionner directement les shops qui concentrent leur budget sur peu de créas fortes.

**Testé : 8 résultats, un seul neuf (sandales orthopédiques IT, saisonnier).** ❌ Retiré. La combinaison est trop restrictive : à ce niveau de reach, les shops qui plafonnent à 35 pubs sont déjà tous connus.

## 🟢🟢 F51 — ENTRÉE PAR LES SHOPS (`search_shops`) au lieu des ADS — LA PERCÉE DU 07/08/2026

```
search_shops:
  min_active_ads: 15-30
  max_monthly_visits: 2500-3000
  creation_date_from: <4 mois
  max_products_count: 15-25
  main_market_countries: [SE,DK,NO,FI,DE,AT,NL,BE,IT,ES,PL,CZ,GB,IE,PT]   ← OBLIGATOIRE, voir piège
  sort_by: growth30d  (ou activeAds)
```

**Tous les filtres du catalogue, de V1 à F50, interrogent `search_ads` : ils partent de la CRÉA et remontent au shop. Ils partagent donc le même gisement, et c'est pour ça que toutes leurs variantes finissent par retomber sur le même pool d'une quarantaine de shops.** `search_shops` part du SHOP et trie sur des métriques de shop (croissance de trafic, nombre de pubs actives, date de création) : population **totalement différente**. Premier passage : **5 014 shops, dont un seul déjà vu**, puis 112 une fois restreint aux marchés EU.

**Avantage secondaire décisif** : la réponse contient `catalog.bestSellers` (titre + **prix** + devise), `advertising.history` (**la pente semaine par semaine**) et `traffic.history`. On lit donc le prix, la pente et la fraîcheur **avant** de dépenser un seul appel de vérification — là où `search_ads` oblige à ouvrir chaque shop pour ça.

**⚠️⚠️ PIÈGE MAJEUR, à ne jamais oublier : sans `main_market_countries` EU, ce filtre remonte des shops SANS DATA EU.** Cas fondateur **Weloria** (`weloria.store`, sac à dos de voyage NL, pente 4→88 monotone sur 8 semaines, exactement le type recherché) : toutes ses créas sont en `targetedCountries:["US"]`, avec `reach: 0`, `estimatedSpend: 0`, `isEuAd: null`. Diffusion 100 % américaine = aucune transparence DSA = **inanalysable**, donc inexploitable (même famille que MIRIS, Coziya, Hydiqo). `search_ads` filtrait ce cas implicitement, `search_shops` non : ses tris (trafic, nombre de pubs) existent même sans data EU. **Toujours imposer le marché EU dans la requête, et toujours re-vérifier `isEuAd`/`reach` sur les créas avant de creuser.**

**Parseur dédié** : `scratchpad/parseshops.mjs` (compacte la sortie en une ligne par shop : création, pays, produits, prix best-sellers, pente d'ads, trafic).

## ⏸️ F52 — Filtrer sur le THÈME Shopify (Shrine / Shrine Pro) (testé le 07/08/2026, EN PAUSE)

```
search_shops:
  theme_ids: [Shrine Pro, Shrine, Shrine Pro Ecom Elite, Shrine+, Shrine PRO]
  main_market_countries: EU + max_monthly_visits: 3000 + creation_date_from: <6 mois
  sort_by: activeAds
```
IDs résolus via `lookup_filter_ids type=themes query=Shrine` : `fe4bee86-5947-4725-8c3b-943c347663bd` (SHRINE PRO, 89 213 shops), `b8d5ff70-08eb-4e4f-95d2-d3992abf8907` (SHRINE, 25 557), `3d77efb0-b641-4ddd-8da6-ac859d1c6ff3` (SHRINE PRO ECOM ELITE, 11 900), `ff5ccdae-3d89-4dc9-806f-f4b20cbb4dfb` (SHRINE⁺, 2 275), `e53f5993-f72c-46ff-bd5d-4689d134ad3b` (Shrine PRO, 2 042).

**Double intérêt théorique** : (1) un shop qui paie un thème pro est un dropshipper sérieux, pas un bricoleur ; (2) **c'est le thème de Zooryn**, donc son tunnel est directement transposable en blocs natifs, sans Liquid — un gain de temps considérable au moment de copier.

**Testé le 07/08/2026 : le gisement existe (887 shops sur le seul filtre thème) mais l'intersection avec « frais + petit trafic + marché EU » est quasi vide (6 résultats, dont 5 à ZÉRO pub active).** Le seul vivant, `levorialab.com`, a été tué au test de dispersion. En desserrant les contraintes, on retombe sur des gros comptes, du hors-EU et des réseaux de clones (`ference01/02/03.shop` + `krisztina01.shop`, 4 domaines HK identiques à 999 pubs).

**⏸️ Statut : en pause comme filtre de DÉCOUVERTE, mais à garder comme signal en AVAL.** Une fois un candidat trouvé par un autre filtre, vérifier s'il tourne sous Shrine : si oui, sa page produit se recopie bloc à bloc dans le thème de Zooryn. C'est une information d'exécution, pas de sourcing.

## 🔑 Loi corollaire n°6 découverte le 07/08/2026 : NO et CH sont des angles morts de la transparence Meta

Le warning renvoyé par l'API sur `main_countries` le dit noir sur blanc : *« main_countries only covers Meta's EU/UK ad transparency set, so NO, CH matches no ad »*.

**Conséquence : un shop dont le marché principal est la Norvège ou la Suisse est INANALYSABLE, exactement comme un shop américain.** Cas fondateur **Titankjokken** (`titankjokken.com`, poêles titane, page FB « Caléna ») : 126 pubs actives, pente monotone 43→116 sur 8 semaines, 3e shop indépendant sur un type déjà confirmé — et pourtant `reach: 0`, `estimatedSpend: 0`, `targetedCountries: null`, `isEuAd: null`, `totalReach: 6 712` sur toute la page. Rien d'exploitable.

**Réflexe à prendre : la DEVISE est le signal d'alerte le moins cher.** Dans une sortie `search_shops`, `NOK` ou `CHF` en `profile.currency` = probable angle mort, à vérifier avant d'investir la moindre analyse. Ça disqualifie rétroactivement plusieurs shops croisés le 07/08 : `kurasko.no`, `grillnordic.no`, `arkverk.no` (NOK), `flofrei.com`, `sivorakleidung.ch` (CHF).

⚠️ Ne pas confondre avec le cas Weloria : là c'était le marché **US**. La cause diffère, le résultat est le même — pas de data DSA, donc pas de candidat.

## 🔑 Loi corollaire n°5 découverte le 07/08/2026 : la DISPERSION est le motif d'échec dominant, pas le produit

Sept candidats ont été creusés créa par créa dans la même session, tous avec une pente d'ads propre. **Les sept échouent au plancher, et six pour exactement la même raison** :

| Candidat | Pubs actives | Meilleure créa | Verdict |
|----------|--------------|----------------|---------|
| Petloom (`petloom.de`) | 26 | 203k / 57 €/j | 1 hero + 25 pubs de bruit |
| LederKur (`lederkur.de`) | 167 | **aucune ≥80k** | dispersion totale (cas IROND) |
| Ciriel (`ciriel.de`) | 239 | **aucune ≥100k** | dispersion totale (cas IROND) |
| Nordscrub (`nordscrub.dk`) | 34 | 139k / 32 €/j | dispersion |
| Borvane (`borvane.com`) | 137 | 159k / 24 €/j | pente d'ads sans reach (cas Pälshem) |
| Verador (`verador.ro`) | 51 | 956k / 86 €/j | 2 créas au plancher, catalogue multi-produits |
| Weloria (`weloria.store`) | 89 | — | no EU data |

> **Un shop frais qui monte en nombre de créas ne monte presque jamais en dépense par créa.** La croissance du compteur de pubs est le signal le plus facile à trouver et le moins fiable qui soit : il se satisfait de dizaines de micro-créas à 5-20 €/j. Le plancher « 3 créas ≥70 €/j » sélectionne en réalité une population **très rare**, et c'est ce qui explique le taux de kill de ces dernières sessions bien plus que la qualité des filtres.

**Conséquence opérationnelle : ne jamais présenter un candidat sur la seule foi de la pente `advertising.history`.** Vérifier `estimatedSpend ÷ daysRunning` créa par créa AVANT de creuser le produit, le prix ou la page — c'est le test le moins cher et le plus discriminant. Un `search_ads` par domaine avec `min_reach: 100000, reach_period: total` répond en un appel : s'il rend 0 ou 1 ligne, le candidat est mort, inutile d'aller plus loin.

**✅ TRANCHÉ PAR ROMÉO LE 07/08/2026 : on TIENT le plancher tel quel, 3 créas ≥70 €/j, sans exception ni assouplissement pour les shops frais.** La question lui a été posée explicitement (assouplir à 2 créas sur shop <10 semaines / tenir / descendre la barre à 50 €/j) ; il a choisi de tenir. Cohérent avec sa doctrine constante : *« on pourrait valider un produit malgré un prix hors tranche ou un produit lourd, s'il a de bonnes créas. Mais mauvais marketing + bon produit, c'est mort »* (kill Ridrplug, 04/08).

**Conséquence assumée : ~1 candidat validable toutes les 2-3 sessions.** Une session à 0 candidat n'est donc PAS un échec de méthode ni un signal qu'il faut baisser les critères — c'est le régime normal de ce plancher. **Ne plus reposer la question**, et ne jamais présenter un candidat sous le plancher en espérant qu'il passe : le remonter en réserve avec ses chiffres, point.

## ❌ Approches déjà écartées (ne pas retester telles quelles)

- **`find_similar_shops`** en découverte pure : remonte les grosses marques établies (REI, Decathlon...). Reste utile UNIQUEMENT en aval pour cartographier les concurrents d'un candidat déjà trouvé (cf. `trouver-concurrents.md`).
- **Recherche par mot-clé** (`keywords`) : 100 % bruit.
- **`find_winning_products`** / **`search_advertisers` trié growth** : marques établies.
- **Tri `reachDelta30d`** sans fenêtre de fraîcheur : accumulateurs anciens (cas RideLab).

---

## Journal des tests

| Date | Filtre(s) testé(s) | Résultat | Décision |
|------|--------------------|----------|----------|
| 07/08/2026 (13) | **F51 page 2 + F52 (thème Shopify Shrine)** — suite de la même journée, Roméo demande de rester en autonomie sur la recherche et de continuer à faire évoluer les filtres pendant qu'il prépare la copy Staydries de son côté. | F51 p2 : 40 shops de plus, 1 seul candidat sérieux (`titankjokken.com`, poêle titane, 3e shop du type). **F52 ⏸️** : le gisement Shrine existe (887 shops) mais l'intersection avec frais+petit trafic+EU est quasi vide (6 résultats dont 5 à zéro pub active). | **3 kills de plus : `titankjokken.com` (NO DATA, marché NO), `levorialab.com` (1 créa au plancher sur 9, créas de 67-160 j, pente qui redescend), + 5 shops Shrine morts.** **Loi corollaire n°6 actée** : NO et CH sont des angles morts de la transparence Meta au même titre que les US → la devise (`NOK`/`CHF`/`USD`) est le signal d'alerte le moins cher. **F52 reste utile en AVAL** : si un candidat tourne sous Shrine, sa page se recopie bloc à bloc dans le thème de Zooryn. **Total journée : 10 candidats creusés, 10 kills, pipeline toujours à 1 (Staydries).** |
| 07/08/2026 (12) | **F45 à F51 (7 filtres inédits)** — session autonome, consigne de Roméo : continuer sur la lancée, tester les filtres qui marchent et en recréer d'autres en autonomie plutôt que conclure. Objectif : 2-3 candidats pour porter le pipeline à 3-4 avant le premier testing. | **F45 ❌** (`max_products` : le généraliste n'est pas le motif d'échec dominant). **F47 🟢** (`min/max_days_running` traduit enfin le « timing entre les deux » en paramètre + `ad_countries.exclude` tue le FR frontal ; piège : `market.exclude` ne marche pas pour ça). **F48 🟢** (marchés nordique/DACH + prix ≥45 : **retrouve Staydries**, gisement étroit). **F50 ❌** (concentration budgétaire : trop restrictif). **F51 🟢🟢 = LA PERCÉE** : passer par `search_shops` au lieu de `search_ads` ouvre un gisement totalement neuf (5 014 shops, 1 seul déjà vu) et donne prix + pente + fraîcheur avant toute vérification. | **7 candidats creusés créa par créa, 7 kills** : Weloria (no EU data, piège F51), Petloom, LederKur, Ciriel, Nordscrub, Borvane, Verador. **Aucun candidat présentable, pipeline reste à 1 (Staydries).** **Loi corollaire n°5 actée** : la DISPERSION budgétaire est le motif d'échec dominant (6 kills sur 7), la pente du compteur de pubs est le signal le plus facile et le moins fiable → vérifier `estimatedSpend ÷ daysRunning` AVANT de creuser produit/prix/page. **Question de méthode remontée à Roméo** : le plancher 3 créas ≥70 €/j est-il tenable sur des shops <3 mois ? |
| 06/08/2026 (11) | **F39 à F44 (6 filtres inédits)** — 2e session autonome longue, consigne de Roméo : conserver ce qui marche, corriger ce qui ne marche pas, et revenir avec des concurrents littéralement copiables. Contrainte de départ : même journée que la session 10, donc relancer F37/F38 à l'identique aurait rendu exactement le même échantillon → obligation de reparamétrer. | **F39 ❌** (empiler plancher de page + plancher par créa = 6 résultats, tous connus). **F40 ❌** (`min_spend` 7 j = 0 résultat ; diagnostiqué : ne laisse passer que Belluna/Holafly/Mother's Earth, c'est un volume déguisé). **F41 🟢** = la correction (un seul plancher, mesuré sur `last7d`, tout le reste qualitatif) → 20 résultats, majorité de shops neufs. **F42 🟢** (F41 + fenêtre de prix). **F43 🟢 = V1 + `max_facebook_likes`, qui sort STAYDRIES**, premier candidat depuis longtemps à franchir le plancher de 3 créas. **F44 ❌** (duplicates : ne fait que re-trier une population déjà visible). | **1 candidat présenté : `staydries.se`** (boxer anti-fuites hommes 60+, SE/DK, 4 créas au plancher à 152/99/78/77 €/j, pente d'ads monotone **5→97 sur 10 semaines**, shop de 11 sem., 4 produits, 54 likes FB, zéro présence FR, ads → page produit unique). Point à trancher : devis Yuri par palier (3/6/9), le palier d'entrée à 54 € est tendu au ×3,5. **Loi corollaire n°4 actée** (c'est la FENÊTRE du plancher qui décide, pas sa nature ; un seul plancher chiffré par requête, sur `last7d`). **3 clusters produit documentés** : sous-vêtement anti-fuites (4 shops, SE/ES, angle homme libre) ✅, couette 2-en-1 (3 shops DK/IT/GB) ❌ poids volumétrique, oreiller enfant (2 shops PL/FR) ❌ dispersion + promesse santé. Cluster projecteur galaxie porté à 5 shops (arrivée de `shomathy.com` en FR). |
| 06/08/2026 (10) | **F35 relancé à `min_reach: 500000` (pages 1-4, fenêtre shop élargie à 6 mois), puis F36, F37 et F38 (nouveaux)** — session autonome longue demandée par Roméo | **F35 à 500k : gisement quasi épuisé** (12 résultats page 1, 5 annonceurs). Élargir la fenêtre shop de 4 à 6 mois relance le volume mais tout ce qui franchit le plancher tombe en exclusion dure. **12 candidats bruts extraits des pages 1-4, TOUS écartés à la vérification** — motif dominant et récurrent : **un seul hero creative par shop** (Semori 1 créa ≥400k, Dasana 1, Belmont 2, Strykr 1 malgré 183 pubs, slimstep 1, Heim-Zauber 1 vivante). Maisonvantier tué sur une option « Custom Text Personalization » à 5,99 $ (personnalisation) + pente plate ; NextGen Electronics sur 127 produits + pente en plateau. **F36 ❌** (seuil absolu de reach de page = mêmes gros comptes). **F37 🟢** (borner la fenêtre en haut + `max_facebook_likes` ≤1000) = meilleur rapport signal/bruit du catalogue. **F38 🟢** (F37 + `min_best_seller_price` 45-110) = le plus productif, sort les 2 seuls candidats de la session. | **F36 ❌ retiré, F37 et F38 🟢 à garder et relancer en binôme.** **Loi corollaire n°3 actée** (sous ~40 € de prix concurrent, produit structurellement non réplicable — 3 candidats tués par le même calcul le même jour). Cluster produit identifié : **projecteur galaxie 5D chez 4 shops indépendants** (CZ/RO/AU-GB/EE-LT) mais tué sur le prix (23-35 €). **2 candidats présentés à Roméo : Mon-Veree (`monveree.store`, montres 89 € en 2-pour-1, ES) — seul à passer le test de réplicabilité — et Huber-Outdoor (`huber-outdoor.at`, lampe frontale, échoue le prix mais data solide).** Concept montre « 2 pour le prix d'1 » confirmé par 2 shops indépendants (ES + DE). |
| 06/08/2026 (9) | **F35 (plancher direct + techno Shopify + shop <4 mois)** + prix best-seller 45-75€ + `search_tiktok_library` (canal jamais interrogé) + `min_spend last7d` | **Percée méthodologique.** Le prix best-seller marche techniquement mais le tri ramène les mêmes têtes de liste. `min_spend 350 last7d` = 0 résultat même à 12 semaines. `search_tiktok_library` inexploitable : pas de `max_followers` dans l'API, donc impossible d'exclure les influenceurs/grandes marques (Aitana, Tokio Hotel, ALDI, Avicii...). **Mais F35 sort ENFIN des shops avec 4 à 10 créas au-dessus du plancher** — le format que Roméo demande depuis le début. Découverte en route : `max_traffic` ne filtre rien face aux pubs qui pointent vers un lien d'app (P&G passait au travers), `technologies: ["shopify"]` referme le trou. | **F35 🟢 prometteur, à poursuivre pages 3-6 avec `min_reach: 500000`.** Loi corollaire n°2 actée (`max_traffic` + `technologies` vont par paire). TikTok library définitivement écarté comme canal de découverte. 3 shops physiques creusés : Splash&Ray (saisonnier+encombrant), Tekko (ROMs piratées), Babilo (plancher pas franchi, vérifié sur 8 créas). |
| 06/08/2026 (8) | **F32 (segment natif rising-star), F33 (bande Trustpilot 3-80 avis), F34 (rollup TikTok search_shops)** — 3 angles inédits, jamais tirés du catalogue de paramètres bruts, demandés en posture "analyste senior, liberté d'innover" par Roméo, avec relèvement du plancher de présentation à 4 créas (au lieu de 3) ≥500k reach OU ≥70€/j | F32 : reproduit exactement le lot V1/V4 déjà connu, aucun candidat neuf. F33 : seulement 2 résultats (1 hors modèle, 1 trop faible), donnée Trustpilot quasi absente sur ce segment. F34 : même défaut que F26, dominé par des shops hors-EU (Golfe/Maghreb/Amérique latine). En parallèle : arbitrage des 2 candidats en attente (Origini, LaVina Milano) et vérification d'acquahome.pt (confirmé généraliste 30+ produits, spa/jacuzzi = encombrant, la plupart des modèles au-dessus du plafond AOV ~100€). | **F32, F33, F34 tous ❌ retirés.** Puits confirmé sec même sous 3 angles neufs jamais tentés avant (segment interne, Trustpilot, TikTok via shops) — le catalogue est proche de la saturation sur les axes purement TrendTrack. Acquahome.pt rejeté (généraliste + encombrant). Origini et LaVina Milano présentés à Roméo pour arbitrage final. |
| 06/08/2026 (7) | **F30 (découplage âge shop/créa), F31 (double confirmation 7j+14j), F5 élargi (<90j + trafic conservé)** — 3 pistes issues d'une proposition externe (ChatGPT), demandées par Roméo | F30 et F31 lancés sans `max_traffic` : 100% marques mondiales dans les deux cas (Nestlé, Disney+, Pepco, Red Bull...), 0 utilisable. F5 élargi (avec `max_traffic` conservé) : 0 candidat au plancher mais 2 cas de clonage de créa confirmés (kroue.shop, robe azalia) et 2 pistes fraîches sous le plancher (Lovi traceur GPS, Tech & Wash accessoire Dyson). | **F30 ❌ et F31 ❌ retirés tels quels** : nouvelle loi corollaire actée (retirer `max_traffic` en triant sur une valeur absolue ramène systématiquement les plus gros comptes, peu importe l'âge du shop). **F5 élargi 🟡 prometteur**, à relancer sur un nouvel échantillon. L'idée de fond (découpler shop et créa) reste valide, juste jamais sans garde-fou de taille. |
| 06/08/2026 (6) | **V1 page 4 + V4 page 4 + F25 desserré (30%) + F26 recalibré (TikTok+ads_growth)** — 2e relance immédiate demandée par Roméo, avec 2 nouveaux filtres (F25/F26 traffic/TikTok) testés en direct | V1 p4 : 20 résultats, 0 candidat — narratifs de fermeture bidon récurrents (Luva Rotaslietas, Nikola Miedz, Edmund Fell, même schéma qu'Holmgaard), reseller générique Viqzes revu 2x, santé/topique massif (Nudea, Nuracalm, AirSleep, Scalora), féminin (Jacinta Porto), contrefaçon montres (vivien-monaco). V4 p4 : 20 résultats (16 lus intégralement, fichier tronqué avant la fin), 0 candidat validé mais 3 catégories neuves sous le plancher à noter : filtre de douche/pomme de douche (2 shops indépendants, Vaporina UK et Doodlo.de DE, aucun ne passe 500k/70€), pièges à souris menthe poivrée (ByePest, multi-marché EU, ~18€/j), jouet Montessori bébé (Broto.pt, ~33€/j). F25 desserré à 30% (au lieu de 50%) : **exactement les 2 mêmes résultats**, confirme que c'est un problème de donnée absente, pas de seuil trop strict. F26 recalibré (TikTok + ads_growth au lieu de TikTok seul) : seulement 4 résultats, tous hors-jeu (TenniixUK trop cher/HK, 3 clones Laurus Aroma Golfe). | **Toujours 0 candidat validé.** F25 et F26 passent en ⏸️ pause (diagnostic clair : donnée insuffisante sur le segment shop frais/petit trafic, pas un problème de calibrage). F27 (Google Ads Library) reste 🧪. 3 catégories neuves (douche/filtre, piège à souris, Montessori bébé) actées comme "types à surveiller" si un shop plus frais/fort les reprend. |
| 06/08/2026 (5) | **F25 (traffic_growth, nouveau) + F26 (TikTok, nouveau) + F27 (Google Ads Library, nouveau)** — 3 nouveaux canaux jamais interrogés, sur demande de Roméo | F25 (croissance trafic organique ≥50%/30j) : 2 résultats seulement (Eyfel Polska reseller, Haslev vingård vignoble réel). F26 (TikTok actif ≥3 pubs) seul : bruité, marques établies/hors-EU. F27 (Google Ads Library EU) : mélange gros acteurs (Galaxus, Myntra, Fruugo) et micro-services locaux, aucun candidat physique. | Aucun candidat. Mais 3 nouveaux axes de recherche ouverts pour le catalogue, chacun avec un diagnostic clair plutôt qu'un simple "rien trouvé". **BrandTracker enrichi en parallèle** : ScandicBeam, Aurenis, Fjellvaro, Holmgaard ajoutés (rejoignent EnkelDyne) pour rendre F19 (`daily_radar`) enfin exploitable. |
| 06/08/2026 (4) | **F21-F24 (nouveaux, panel élargi)** — sur demande de Roméo après analyse de l'historique (EnkelDyne/Core Armour) | F21 (reachDelta1d) : invalidé, confond budget qui explose sur une vieille campagne et vrai décollage. F22 (F8 resserré) : cohérent avec F8, rien de neuf. F23 (V4+vidéo courte) : 1 découverte (Luke Store 12, contrefaçon parfums) tuée sur exclusion dure. F24 (V4+pixel) : rien de neuf, la dérivée seule ne filtre pas la santé. | **F21 ❌ retiré. F22 et F23 restent 🧪. F24 ⏸️ en pause.** Aucun candidat validé sur ce panel élargi, mais 1 enseignement clé retenu : croiser `reachDelta1d` avec `daysRunning` bas serait le vrai filtre "explosion en cours" — non testable directement, l'API ne permet pas ce croisement en un seul paramètre. |
| 06/08/2026 (3) | **V1 page 3, V4 page 3, F8 corrigé (+shop_created_after), F9 sur RO** — relance immédiate demandée par Roméo (refus du délai d'attente) | V1 p3 et F9-RO : rien de neuf exploitable (jewelry RO, reseller, ingéré). F8 corrigé : **2 candidats en réserve** — **EnkelDyne** (couette 2-en-1, DK, mono-produit frais 13j, meilleure créa ~87€/j mais plancher pas franchi au sens strict) et **Core Armour It** (débardeur compressif, IT, même famille que Sculpted déjà killé). | Aucun candidat validé, mais 2 pistes réserve ajoutées (vs 0 lors du 1er passage de la journée). Confirme que relancer V1/V4/F8 sur un nouvel échantillon (page suivante) reste la méthode la plus productive, même sans nouveau filtre. |
| 06/08/2026 (2) | **Balayage complet : F6/F9 retestés combinés, F11-F19 testés pour la 1re fois** (demande explicite de Roméo : tester tout ce qui n'avait jamais été essayé) | 0 candidat validé au global. **Retirés : F6, F11, F14, F17** (bruit ou ne discriminent rien). **Restent en pause : F9 (fix technique validé mais marché PL déjà exploré), F12, F13, F15, F19** (signal trop faible ou pas de brandtracker configuré). **F16 et F18 prometteurs** (🟡, meilleur rapport signal/bruit de la session) mais aucun candidat neuf validé, à relancer sur un nouvel échantillon. 2 pistes en réserve : Fjellvaro (chaussures bébé DK, sous le plancher) et confirmation qu'Astrid Göteborg est un généraliste féminin à ignorer malgré sa pente. | Catalogue nettoyé : sur 20 filtres (V1/V4 validés, F2/F3/F5/F6/F10/F11/F14/F17 retirés = 8 morts), il reste V1, V4, F7, F8, F9, F12, F13, F15, F16, F18, F19, F20 en vie (12 filtres), dont seulement 2 réellement productifs à ce jour (V1, V4). **Constat d'associé : le puits data-first pur est structurellement sec en ce moment, aucun filtre alternatif ne compense.** |
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
