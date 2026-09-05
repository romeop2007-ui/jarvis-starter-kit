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

---

# Filtres ajoutés le 07/08/2026 (session 13) — exploitation des angles F51 restants

## 🟢 F53 — F51 trié par `createdAt` (les shops les plus jeunes qui ont déjà des pubs)

```
search_shops:
  sort_by: createdAt            ← NEUF, jamais utilisé
  min_active_ads: 15
  max_monthly_visits: 3000
  creation_date_from: <4 mois
  max_products_count: 25
  main_market_countries: EU (SANS NO ni CH, cf. loi n°6)
```
Angle : au lieu de trier sur une métrique de performance (qui favorise mécaniquement les shops installés), on trie sur la **date de naissance**. On voit donc le vivier dans l'ordre exact où il se renouvelle, ce qui garantit un échantillon neuf à chaque session sans avoir à inventer un filtre.

**Testé le 07/08/2026 : 63 shops, 12 neufs sur 30 en page 1.** A sorti `trueone.pl` (candidat retenu) et `mannenkamer.nl`. **🟢 Validé.** Limite connue : gisement étroit (63 résultats seulement), à relancer chaque semaine plutôt qu'à paginer en profondeur.

## 🟢 F54 — F51 filtré sur les APPS DE BUNDLE installées

```
search_shops:
  shopify_app_ids: [4277, 309, 3590, 1408, 172]   ← Kaching Bundle Quantity Breaks,
                                                     Rapi Bundle, Pumper Bundles,
                                                     Xboost, Kaching Bundles
  min_active_ads: 15 + max_monthly_visits: 3000
  creation_date_from: <5 mois + max_products_count: 30
  main_market_countries: EU
```
Angle : un shop qui installe une app de paliers de quantité est un dropshipper qui **travaille son AOV**, donc quelqu'un de sérieux qui a déjà un produit à pousser. Le paramètre `shopify_app_ids` n'avait jamais été utilisé en 52 filtres. IDs résolus via `lookup_filter_ids type=shopify_apps query=bundle`.

**Testé le 07/08/2026 : 49 shops, 17 neufs sur 30.** A sorti `velcor.co` et `allcarsfix-es.com` (tous deux tués en dispersion). **🟢 Validé comme filtre de découverte** (il renouvelle l'échantillon), mais rendement final nul sur cette passe. Bénéfice secondaire : les shops qu'il remonte ont par construction une **structure d'offre multi-unités**, ce que la doctrine demande de signaler à chaque candidat.

## ❌ F55 — Plancher directement mesuré, sans déduplication par marque (testé et RETIRÉ le 07/08/2026)

```
search_ads:
  technologies:["shopify"] + max_traffic: 2000-2500 + max_facebook_likes: 1500
  shop_created_after: <5 mois
  min_reach: 40 000 à 55 000, reach_period: last7d   ← ≈ 70 à 100 €/j soutenus
  max_ads_per_brand: 4-5        ← NEUF : on ne déduplique PAS, pour compter les créas par shop
  sort_by: reachDelta7d
```
**L'idée était bonne et mérite d'être retenue même si le filtre est retiré** : en laissant 4-5 créas par marque au lieu d'1, la requête **compte directement le plancher** (un shop qui sort 3 lignes a 3 créas fortes), au lieu de trouver un shop puis de dépenser un appel de dispersion par candidat. Conversion utile : à CPM 9 €, **70 €/j ⇔ ~55 000 de reach sur `last7d`**.

**Retiré parce qu'il ne sourcé rien de neuf** : les deux passes n'ont remonté que des shops déjà connus ou rejetés (Mirelia, Vanisia, Splash&Ray, NBA Paris, Overstore, ChillNeck, Difhouser, Alessandro Varetti, Biocyte). **C'est la confirmation directe de la thèse de F51** : tout ce qui passe par `search_ads` partage le même gisement, quelle que soit l'astuce de paramétrage. ❌ Ne pas y revenir pour du sourcing — en revanche, **garder la mécanique `max_ads_per_brand` élevé + `min_reach` sur `last7d` comme test de plancher groupé** quand on a déjà une liste de shops à qualifier.

## ⏸️ F56 — Marchés GB/IE seuls (testé le 07/08/2026, EN PAUSE)

```
search_shops: main_market_countries: ["GB","IE"] + signature F51 habituelle
```
Angle jamais tenté : le marché anglophone, jamais exploré depuis le pivot France. **Gisement quasi inexistant : 8 shops au total**, dont 6 déjà rejetés et 2 exclusions dures. ⏸️ En pause — pas assez de volume pour justifier un appel régulier, à retenter dans plusieurs semaines.

## 🔑 Loi corollaire n°7 (07/08/2026) : le plancher de créas et le test de réplicabilité du prix se contredisent structurellement

Constat de la session : **les deux seuls shops à franchir le plancher de 3 créas ≥70 €/j échouent tous les deux au test de réplicabilité du prix**, et pour la même raison de fond.

> Un concurrent qui soutient 3 créas à plus de 70 €/j a nécessairement du volume. Le volume lui donne un COGS que le dropshipping unitaire ne peut pas égaler : il achète en gros et expédie souvent par fret groupé, là où nous payons ~10-13 € de transport + 3 € de taxe **par colis**. Plus il scale, plus son prix de vente descend sous notre plancher `COGS × 3,5`.

**Conséquence pratique** : sur un produit **lourd ou volumineux**, l'écart devient rédhibitoire (cas Titanox : poêle ~1 kg volumétrique, COGS rendu estimé 33-41 €, soit 115-143 € au ×3,5 contre 64,99 € affichés). Sur un produit **petit et léger**, il reste discutable (cas TRUE ONE : ~18 € de COGS rendu, 63 € au ×3,5 contre 47 €).

**Règle à appliquer dès le sourcing** : à plancher de créas égal, **privilégier systématiquement les produits légers et compacts**, parce que ce sont les seuls où l'écart de COGS entre le winner et nous reste rattrapable par une négociation avec l'agent. Le poids est le vrai discriminant, pas le prix affiché.

## Journal — session 13 (07/08/2026, mise à jour 2)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 07/08/2026 (2) | **F53** (`search_shops` tri `createdAt`) | 63 shops, 12 neufs/30 en p1. Sort `trueone.pl` (**candidat retenu**) + `mannenkamer.nl`. | **🟢 Validé.** À relancer chaque semaine (le tri par date se renouvelle tout seul). |
| 07/08/2026 (2) | **F54** (apps de bundle) | 49 shops, 17 neufs/30. Sort `velcor.co`, `allcarsfix-es.com` (tués en dispersion). | **🟢 Validé** comme renouvellement d'échantillon, rendement nul cette passe. |
| 07/08/2026 (2) | **F55** (plancher groupé sur `search_ads`) | 2 passes, **100 % de shops déjà connus/rejetés**. | **❌ Retiré** pour le sourcing. Confirme la thèse F51. Mécanique à garder pour qualifier une liste existante. |
| 07/08/2026 (2) | **F56** (GB/IE) | 8 shops au total, aucun exploitable. | **⏸️ En pause**, gisement trop étroit. |
| 07/08/2026 (2) | **F51** variantes (mono-produit `max_products_count: 4`, tri `growth30d`, marchés SE/DK/FI purs) | Beaucoup de volume mais **saturé de beauté/santé** (exclusions dures). Sort `titanoxufficiale.com` (**candidat retenu**) via la variante « très frais + 30 pubs min ». | **🟢 F51 reste le meilleur filtre du catalogue.** Le tri `activeAds` sur une fenêtre de création serrée (mai+) est la variante la plus rentable. |

---

# Filtres ajoutés le 08/08/2026 (session 14) — changer le TRI plutôt que les filtres

## 🟢 F57 — Plancher groupé trié par `newest` (le filtre de la session)

```
search_ads:
  technologies:["shopify"] + max_traffic: 2500 + max_facebook_likes: 1500
  shop_created_after: <5 mois
  min_reach: 55000, reach_period: last7d     ← plancher unique sur last7d (loi n°4)
  max_ads_per_brand: 3-5                     ← on ne déduplique pas : compte le plancher directement
  ad_countries: {exclude:["FR"]}             ← seul paramètre qui tue vraiment le FR frontal
  sort_by: newest                            ← NEUF : le tri, pas les filtres
```

**L'idée qui change tout : F55 avait été retiré parce qu'il ne sourçait que du déjà-vu, mais on avait changé les FILTRES en gardant `sort_by: reachDelta7d`.** Or c'est le tri qui détermine la population : trier sur « ce qui accélère le plus » ramène toujours les mêmes têtes de liste, quels que soient les garde-fous. `sort_by: newest` répond à une autre question — **« quelles créas viennent d'apparaître ET dépassent déjà le plancher ? »** — ce qui est exactement le « timing entre les deux » de la doctrine, doublé du test de concentration.

**Testé le 08/08/2026 : sort `securetechstore.com`, shop jamais vu, avec 5 créas ≥70 €/j** (493, 345, 263, 206, 72 €/j) — le meilleur profil de concentration rencontré depuis Staydries. Le candidat a été tué ensuite sur le prix (29,90 €), mais **le filtre a fait exactement son travail**. 🟢 À lancer en tête de session avec F51.

**Tris jamais essayés et disponibles** : `createdAt`, `longestRunning`, `mostDuplicates`, `adOrder`, `relevanceScore`. Le catalogue n'a exploité que `reachDelta1d/7d/30d`, `rankDelta*`, `reach` et maintenant `newest`.

## ❌ F58 — F57 + plancher de prix du best-seller (testé et RETIRÉ le 08/08/2026)

```
(tout F57) + min_best_seller_price: 50
```
Hypothèse : viser directement la zone gagnante de la loi n°8 (léger ET cher) en filtrant le prix en amont.

**Testé : 100 % de déjà-vu/déjà-rejeté** (Mon-Veree, Vivalyo, Skeye/`vysioneyewear.com`, Valeria Montel, Page studios). ❌ Retiré. **Diagnostic : `min_best_seller_price` est un filtre trop rare pour se combiner à un plancher de reach** — il réduit la population à la poignée de shops chers déjà connus, et annule le bénéfice du tri `newest`. Même conclusion que F42/F38 avant lui : le pré-filtre prix se paie en volume. **Appliquer le prix à la LECTURE (parseur), jamais dans la requête.**

## ⏸️ F59 — Preuve de VENTES via Trustpilot (`search_shops`), pas preuve de dépense

```
search_shops:
  min_trustpilot_review_count: 8
  min_active_ads: 25 + max_active_ads: 500 + max_monthly_visits: 3500
  creation_date_from: <6 mois + max_products_count: 25
  currencies: ["EUR","SEK","DKK","PLN"]
  sort_by: growth30d
```
**Angle inédit et conceptuellement le meilleur du catalogue** : tous les autres filtres mesurent ce que le concurrent DÉPENSE, jamais ce qu'il VEND. Un shop frais avec déjà 8+ avis Trustpilot **et** 25+ pubs actives a converti pour de vrai.

**Testé le 08/08/2026 : gisement de 15 shops au total** (contre 742 sans le paramètre). 0 candidat : `leichtkraut.de` (ingéré), `rigenerati.instantcare.it` (iPhones 549 €), `vanherman.nl` (topper 259-339 €), le reste déjà rejeté. **⏸️ En pause pour la même raison que F33 : la donnée Trustpilot est quasi absente sur les shops frais** (un dropshipper de 3 mois n'a pas encore d'avis indexés). L'angle reste juste, mais il ne devient exploitable qu'à partir de ~6-9 mois d'ancienneté, c'est-à-dire trop tard pour copier. **À réserver comme signal de CONFIRMATION sur un candidat déjà trouvé.**

## 🔑 Loi corollaire n°8 (08/08/2026) : la zone gagnante est l'intersection étroite « léger ET cher »

La loi n°7 disait « à plancher égal, privilégier les produits légers et compacts ». Cette session montre que ça ne suffit pas, parce que **le poids et le prix sont corrélés** :

| Produit rencontré | Poids | Prix concurrent | Verdict |
|---|---|---|---|
| SmartCard Pro (`securetechstore.com`) | ultra-léger (1,8 mm) | **29,90 €** | mort sur la loi n°3 |
| Tapis chien (`get-kovah.com`) | léger | 34,95 € | mort sur la loi n°3 |
| Livre Montessori (`kidora.nl`) | léger | 37,90 € | mort sur la loi n°3 |
| Poêle titane (Titanox) | ~1 kg volumétrique | 64,99 € | mort sur le COGS transport |
| Topper de lit (`vanherman.nl`) | volumineux | 259-339 € | mort sur l'AOV >100 € |

> **Un produit léger se vend structurellement pas cher, et un produit cher est structurellement lourd ou hors AOV.** La cible n'est donc pas « léger » (loi n°7) ni « ≥45 € » (loi n°3) pris séparément, mais leur **intersection**, qui est étroite : un objet à **forte valeur perçue et faible volume**, vendu **45-100 €**. En pratique : textile technique, accessoire premium non électronique, dispositif compact sans batterie. C'est la description exacte de Staydries (boxer technique, 54 €, quelques centaines de grammes) — le seul candidat validé du pipeline.

**Conséquence opérationnelle : trier les shops sur `prix du best-seller ≥45 €` À LA LECTURE dès la sortie `search_shops`, avant tout appel de vérification** (le parseur le fait en local, coût zéro : 36 shops écartés sur 40 en une passe le 08/08). Ne pas mettre ce prix dans la requête (cf. F58 ❌).

## ⚠️ Piège confirmé le 08/08/2026 : `exclude_market_countries` ne filtre PAS le marché FR sur `search_shops`

Requête lancée avec `exclude_market_countries: ["FR"]` → a quand même remonté `bebysh.com` (48 % FR), `bellesimone.com` (55 % FR), `laycelia.com` (50 % FR). **Le paramètre porte sur le marché VISITEUR du shop (trafic web), pas sur la distribution géographique des pubs.** Exactement le même piège que `market.exclude` sur `search_ads` (documenté en F47).

> **Seul `ad_countries: {exclude:["FR"]}` mord réellement — et il n'existe que sur `search_ads`.** Sur `search_shops`, le marché FR doit donc être filtré **à la lecture**, jamais dans la requête.

## Journal — session 14 (08/08/2026)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 08/08/2026 | **F57** (plancher groupé, tri `newest`) | Sort `securetechstore.com`, **shop neuf à 5 créas ≥70 €/j**. Tué ensuite sur le prix (29,90 €). | **🟢 Validé.** Le tri est le vrai levier de renouvellement, pas les filtres. À lancer en tête avec F51. |
| 08/08/2026 | **F58** (F57 + prix ≥50 €) | 100 % déjà-vu/rejeté. | **❌ Retiré.** Le pré-filtre prix annule le bénéfice du tri. Prix = à la lecture. |
| 08/08/2026 | **F59** (Trustpilot sur `search_shops`) | 15 shops au total, 0 candidat. | **⏸️ En pause.** Donnée absente sur les shops frais (cf. F33). À garder en confirmation aval. |
| 08/08/2026 | **F51/F53 variantes** (tris `activeAds`, `createdAt`, `growth30d` + `currencies` EU) | `currencies` EU 🟢 utile (traduit la loi n°6 en paramètre, élimine NOK/CHF/USD en amont). Tri `activeAds` ❌ ramène les réseaux (3 400 pubs) → **toujours plafonner `max_active_ads` ~400-500**. | Gisement pauvre cette passe : dominé par mode, topique et marché FR frontal. |

**Bilan session 14 : 6 kills, 0 candidat présentable, pipeline inchangé à 1 (Staydries).** Régime normal du plancher (cf. loi n°5, tranchée par Roméo le 07/08). ~700 unités TrendTrack consommées.

---

# Session 14 (suite) — les 3 derniers tris inexploités, testés le 08/08/2026

## ❌ F60 — Tri `mostDuplicates` (testé et RETIRÉ le 08/08/2026)

```
(signature dropshipper frais) + min_reach: 50000 last7d + sort_by: mostDuplicates
```
Hypothèse : un shop qui décline la même créa en dizaines de variantes scale activement un angle qui marche. Reprend l'idée de F7/F44 (`min_duplicates` en FILTRE, tous deux retirés) mais en TRI, jamais essayé.

**Testé : le pire rapport signal/bruit du catalogue.** Les résultats affichent 143 à **1 994 duplicates** par créa et sont à ~90 % des **patchs minceur transdermiques** vendus en cash-on-delivery sur HU/CZ/RO (BSWELL, Funutri, `peststyle.shop`, `benudaily.com`, `lcjywl.shop`, `mingminghungg.shop`), tous en advertorial narratif (faux témoignages de mères). ❌ Retiré. **Diagnostic : dupliquer une créa 500 fois n'est pas une signature de scaling, c'est une signature de contournement de ban Meta.**

## ❌ F61 — Tri `longestRunning` + créa de 25-90 jours sur shop frais (testé et RETIRÉ le 08/08/2026)

```
(signature) + min_days_running: 25, max_days_running: 90
min_reach: 40000 last7d + sort_by: longestRunning
```
**L'hypothèse était la meilleure de la session** : tous les filtres du catalogue mesurent ce que le concurrent DÉPENSE ; une créa qu'on laisse tourner 30 à 90 jours est une créa qu'on ne coupe pas, donc un proxy de RENTABILITÉ. Personne ne paie 2 mois pour une créa qui ne convertit pas.

**Testé : même population que F60.** Advertorials santé cash-on-delivery (`benudaily.com`, `feliorna.com` diffuseur nasal, `peststyle.shop`), infoproduits (`redazione-culturamoderna.it`, guide « Claude pour enseignants »), et `slimpur.de` (t-shirt de compression homme = famille Sculpted, déjà killée en T1). ❌ Retiré.

## 🔑 Loi corollaire n°9 (08/08/2026) : seuls les tris de FRAÎCHEUR et de VITESSE sont exploitables

Les trois tris jamais utilisés ont été testés le même jour, et deux échouent en désignant **exactement le même archétype d'annonceur** :

| Tri | Population sélectionnée | Verdict |
|---|---|---|
| `newest` (F57) | créas qui viennent d'apparaître et passent déjà le plancher | 🟢 le seul bon |
| `longestRunning` (F61) | advertorials santé cash-on-delivery HU/CZ/RO/PL | ❌ |
| `mostDuplicates` (F60) | fermes à duplication anti-ban, mêmes marchés | ❌ |

> **Les tris « exotiques » sélectionnent un MODÈLE D'ANNONCEUR, pas un bon produit.** Le funnel santé en paiement à la livraison sur les marchés d'Europe centrale maximise structurellement la durée de vie des créas (pas de ban immédiat) et leur duplication (contournement organisé). Il n'a rien à voir avec le modèle Zooryn. **À retenir : ne trier que sur la FRAÎCHEUR (`newest`, `createdAt`) ou la VITESSE (`reachDelta7d`).** Le catalogue a désormais épuisé tous les tris disponibles de `search_ads` ; le renouvellement du gisement doit venir de `search_shops` (F51) et de ses paramètres, pas d'un nouveau tri d'ads.

## Journal — session 14 (suite)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 08/08/2026 | **F61** (tri `longestRunning`) | Advertorials santé COD + infoproduits + `slimpur.de` (famille Sculpted). | **❌ Retiré.** Bonne hypothèse (rentabilité), mauvaise population. |
| 08/08/2026 | **F60** (tri `mostDuplicates`) | ~90 % patchs minceur HU/CZ/RO à 143-1 994 duplicates. | **❌ Retiré.** Duplication = contournement de ban, pas scaling. |
| 08/08/2026 | **F51 variante mono-produit** (`min/max_products_count` 1-3, tri `growth30d`) | 305 shops, 4 retenus après pré-filtre prix+pente local. Tous tués : `mynivashop-ge.com` (FR frontal), `jewelrydesignersprokit.com` (infoproduit, reach US/LT/AU dispersé), `impaktwear.com` (1 créa ≥80k sur 91 pubs, et elle s'éteint : 5 714 de reach sur 7j contre 141 738 sur 30j), `mkt-pt.shop` (**0 créa ≥80k sur 120 pubs**). | Variante 🟢 utile (gisement propre, 305 shops mono-produit), rendement nul cette passe. |

**Bilan consolidé session 14 : 9 kills, 0 candidat présentable.** Pipeline porté à **2** par la validation de Titanox par Roméo (Staydries + Titanox). ~1 100 unités TrendTrack consommées, 30 686 restantes.

## 🟢🟢 F62 — RATIO DE CONCENTRATION : reach de PAGE ÷ nombre de créas actives (08/08/2026)

```
search_ads:
  min_reach_per_page: 220000, reach_per_page_period: last7d   ← le numérateur
  max_active_ads: 40                                          ← le dénominateur
  technologies:["shopify"] + max_traffic: 2500 + max_facebook_likes: 1500
  shop_created_after: <6 mois
  ad_countries: {exclude:["FR"]}
  max_ads_per_brand: 2, sort_by: reachDelta7d
```

**C'est la traduction directe de la loi n°5 en paramètre, et c'est le premier filtre du catalogue qui attaque la dispersion EN AMONT au lieu de la constater après coup.** L'idée : ni le reach de page ni le nombre de créas ne disent quoi que ce soit pris isolément (F36 l'avait montré pour le premier, F50 pour le second) — c'est leur **rapport** qui mesure la concentration. Une page à 220 000 de reach hebdomadaire répartie sur ≤40 créas ne PEUT PAS être dispersée : la moyenne impose des créas fortes.

**F50 avait eu la bonne intuition mais le mauvais numérateur** : il utilisait `min_reach` (reach de la CRÉA), ce qui empilait deux planchers et vidait la requête (loi n°4). `min_reach_per_page` est un agrégat de page, il se combine donc librement avec `max_active_ads`.

**Résultat du test : 100 % des shops remontés sont concentrés** — Alessandro Varetti 246 €/j, ChillNeck 210 €/j, Sit Slouch 188 €/j, Kovana 108 €/j, Velar 240 €/j, belmont-shop 70 €/j. Aucun autre filtre du catalogue n'avait jamais produit un lot sans un seul cas de dispersion.

**⚠️ Verdict honnête, à ne pas enjoliver : 7 des 8 annonceurs étaient DÉJÀ dans `liste-rejetes.md`** (Velar, Overstore, Sit Slouch, ChillNeck, belmont-shop, Alessandro Varetti, + GaloppGlamour écarté le jour même). Le filtre **valide la méthode a posteriori** — il retrouve précisément les meilleurs shops déjà identifiés par d'autres voies, ce qui prouve qu'il sélectionne la bonne population — mais il n'a pas révélé de gisement neuf à cet instant. Seul inédit : `kovana.fr` (stick fond de teint coréen DE/AT, 8 pubs actives, 1 créa à 108 €/j), sous le plancher.

**🟢 À garder et à relancer à chaque session** : c'est le meilleur détecteur de concentration du catalogue, donc le jour où un shop concentré neuf apparaît, F62 le verra immédiatement et sans qu'on ait à dépenser un appel de dispersion par candidat. Seuil à moduler : 600k = trop haut (3 annonceurs, tous des gros déjà connus), 220k = bon équilibre.

## 🔑 Enseignement de fin de session 14 : le plancher n'est plus le goulot, le GISEMENT l'est

Le catalogue sait désormais faire deux choses correctement : **trouver du frais** (F51/F53 via `search_shops`) et **détecter la concentration** (F62). Or F62 démontre que la population « shop frais + budget concentré + marché EU analysable » à un instant T se compte en **une petite dizaine d'annonceurs**, et que Zooryn les a déjà tous vus et arbitrés.

> **Conséquence pour les prochaines sessions : arrêter d'inventer des filtres.** Le catalogue a épuisé les tris (loi n°9), les seuils (lois n°2/4), les signaux qualitatifs (thème, apps, pixel, Trustpilot, TikTok, devise) et mesure enfin la concentration (F62). Le facteur limitant n'est plus la méthode de filtrage, c'est le **renouvellement naturel du vivier**. La bonne cadence devient : **relancer F62 + F51/F53 une à deux fois par semaine** sur l'échantillon renouvelé, plutôt que multiplier les angles dans la même journée sur un vivier déjà écumé.

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 08/08/2026 | **F62** (ratio reach page ÷ créas actives, seuils 600k puis 220k) | 100 % de shops concentrés (108 à 246 €/j), mais 7/8 déjà rejetés. 1 inédit : `kovana.fr`, sous le plancher. | **🟢🟢 Validé et à relancer chaque semaine.** Premier filtre qui attaque la dispersion en amont. |
| 08/08/2026 | **F51 `has_tiktok: true`** | 45 shops. `absolutparfum.com`/`deseoabsolutoit.com` (3e shop parfum, 55-69 €) creusé puis tué : **0 créa ≥100k pour 427 pubs**, pire dispersion du catalogue. Reste : mystery box, infoproduits, ingéré. | Paramètre 🟢 utile (gisement propre et distinct) mais rendement nul. |
| 08/08/2026 | **F51 mono-produit page 2** | 12 retenus après pré-filtre local. `kuraskor.se` creusé : 3 créas ≥100k mais à **7-8 €/j** (créas de 142 jours qui accumulent lentement) + ads vers une landing page. | Confirme : un reach total élevé sur une créa ancienne n'est jamais un plancher. |

---

# Session 15 (08/08/2026) — la confusion de doctrine enfin corrigée

## 🟢🟢 F63 — RATIO DE CONCENTRATION + fraîcheur de la CRÉA (et non plus du SHOP)

```
search_ads:
  min_reach_per_page: 220000, reach_per_page_period: last7d   ← ratio F62 conservé
  max_active_ads: 40                                          ← ratio F62 conservé
  min_days_running: 8, max_days_running: 45                   ← REMPLACE shop_created_after
  technologies:["shopify"] + max_traffic: 2500 + max_facebook_likes: 1500
  ad_countries: {exclude:["FR"]}
  max_ads_per_brand: 1, sort_by: reachDelta7d
```

**C'est la correction d'une confusion de doctrine traînée depuis le tout premier filtre.** La règle du « timing entre les deux » porte sur **le produit qui scale depuis 2-4 semaines**, c'est-à-dire sur **l'âge de la CRÉA**. Or le catalogue l'a toujours implémentée par `shop_created_after`, c'est-à-dire sur **l'âge du SHOP** — deux choses différentes. Un shop de 8 mois qui lance une créa neuve qui décolle est exactement le profil recherché, et il était exclu d'office par tous les filtres depuis V1.

**Mesure directe du gain, faite le même jour sur le même ratio de concentration :**

| Filtre | Fraîcheur portée sur | Shops neufs |
|---|---|---|
| F62 (relancé à l'identique) | le SHOP (`shop_created_after`) | **1 sur 8** |
| F63 (même ratio, fraîcheur déplacée) | la CRÉA (`min/max_days_running`) | **13 sur 20** |

> Le goulot n'était pas la méthode de filtrage ni le vivier, c'était `shop_created_after`. L'enseignement de fin de session 14 (« le facteur limitant est le renouvellement naturel du vivier ») est donc **partiellement infirmé** : le vivier était bien plus large que mesuré, il était amputé par un paramètre mal placé.

**⚠️ Le garde-fou reste nécessaire ailleurs.** `max_traffic: 2500` + `max_facebook_likes: 1500` continuent de faire le travail que `shop_created_after` faisait accessoirement (écarter les marques installées). Ne pas retirer ces deux-là en même temps, sinon retour du problème documenté en loi corollaire n°2.

**⚠️ Ne PAS combiner avec `sort_by: newest`** (testé le même jour) : `newest` + `min_days_running: 8` sélectionne mécaniquement les créas d'exactement 8 jours, donc du micro-reach (`sonoearplugs.com` à 0-1 €/j, `vvsshop.ro` à 0-2 €/j). Le tri de vitesse `reachDelta7d` est le bon.

**⚠️ `min_best_seller_price: 45` reste à éviter dans la requête** (confirmé une 3e fois, cf. F58/F42/F38) : la variante prix de F63 a rendu 8 déjà-vus sur 20 contre 7 sur 20 sans lui, pour un gisement plus pauvre. Prix = à la lecture.

## Journal — session 15 (08/08/2026)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 08/08/2026 | **F62** relancé à l'identique | 7 déjà-rejetés sur 8 (Velar, Sit Slouch, Overstore, ChillNeck, Belmont/Lithemo, Alessandro Varetti, Dasana, LaVina Milano). 1 inédit : `livrapid.ro` (spray anti-papillomes = topique santé, exclusion dure). | Confirme que le vivier « shop frais » est écumé — mais c'était le mauvais axe de fraîcheur. |
| 08/08/2026 | **F63** (fraîcheur portée sur la créa) | **13 shops neufs sur 20.** Meilleur taux de renouvellement du catalogue. | **🟢🟢 Validé, à lancer en tête de session devant F62 et F51.** |
| 08/08/2026 | **F63 + `sort_by: newest`** | Micro-reach uniquement (créas de 8 jours à 0-3 €/j). | ❌ Ne pas combiner. |
| 08/08/2026 | **F63 + `min_best_seller_price: 45`** | Gisement plus pauvre, davantage de déjà-vus. | ❌ Confirme F58 : le prix se lit, il ne se filtre pas. |

**Bilan session 15 : 8 kills, 0 candidat au plancher, pipeline inchangé à 2 (Staydries + Titanox).** ~350 unités TrendTrack consommées, 30 331 restantes. L'acquis de la session est méthodologique (F63), pas un candidat.

## 🔑 Événement à suivre : Huber-Outdoor a franchi sa condition de réouverture

`huber-outdoor.at` (lampe frontale 230° USB-C, DE/AT) avait été killé le 06/08/2026 sur le prix, avec une condition de réouverture explicite actée par Roméo : *« si le concurrent repasse son prix à ~49,90 €, on pourrait se placer à ~54 € »*.

**Relevé le 08/08/2026 : il est passé de 39,90 € à 59,90 €** (`compare_at_price` 59,91). La condition est donc dépassée. Sa data tient toujours : 141 €/j sur la créa principale (42 j) et **une 2e créa de 10 j déjà à 156 €/j**, sur 25 pubs actives et 31 likes FB.

**Il reste à 2 créas ≥70 €/j, pas 3** — aucun domaine sœur trouvé (recherche `search_shops` sur « huber-outdoor » ne ramène que du bruit sans rapport). Sous la règle du plancher tenu sans exception (tranchée par Roméo le 07/08), il ne se présente donc pas comme candidat prêt. **À re-checker en priorité à chaque session : c'est le shop le plus proche du plancher de tout le fichier, et son prix joue désormais en notre faveur.**

**⚠️ Réserve à ne pas oublier** : l'offre poussée en créa est « la 2e OFFERTE », donc 59,90 € pour deux lampes = ~29,95 €/unité. Le test de réplicabilité doit se calculer sur le bundle de 2 (deux produits dans un colis), pas sur le prix affiché.

## Session 15 (suite) — profondeur de F63 et bornes du filtre

### ❌ F64 — Ratio de concentration DURCI (`max_active_ads: 15`, `min_reach_per_page: 150k`)
Hypothèse : viser les shops à très peu de créas et gros reach, donc encore plus concentrés que F63.
**Testé : 7 neufs sur 19, contre 13 sur 20 pour F63.** Le durcissement fait perdre du volume sans gagner en qualité — les shops à ≤15 créas actives sont majoritairement des pages d'advertorial (2 à 5 créas) et non des dropshippers concentrés. ❌ Retiré, garder F63 tel quel (`max_active_ads: 40`).

### ❌ F65 — F63 à fenêtre resserrée (10-25 j) + plancher de reach par créa
```
(tout F63) + min_days_running: 10, max_days_running: 25 + min_reach: 120000 last7d
```
Hypothèse : cibler le cœur du « timing entre les deux » et ne garder que les créas fortes.
**Testé : 0 shop neuf**, uniquement des annonceurs déjà arbitrés dans la même session. ❌ Retiré. **Diagnostic : c'est la loi corollaire n°4 qui frappe** — `min_reach_per_page` est déjà un plancher chiffré, y ajouter `min_reach` par créa en empile un second et réduit le gisement aux mêmes têtes de liste. Un seul plancher chiffré par requête, toujours.

### 📏 Bornes établies pour F63
- Fenêtre de créa **8-45 jours** = le bon réglage. Plus court (10-25) vide, plus long ramène les accumulateurs.
- `max_active_ads: 40` = le bon plafond. À 15, on sélectionne des pages d'advertorial.
- Un seul plancher chiffré : le ratio (`min_reach_per_page`). Ne rien empiler dessus.
- Rendement par page (session 15) : p1 13/20 neufs, p2 ~15/20, p3 14/20, p4 **19/20**, p5 18/20 mais **qualité en chute** (advertorials santé, marques tierces, produits sous plancher). **En pratique : exploiter les pages 1 à 4, s'arrêter à la 5.**

## 🔍 Observation de session à confirmer : concentration et prix semblent anti-corrélés

Sur les 15 shops creexaminés créa par créa cette session, un motif revient :

| Shop | Concentration | Prix | Verdict |
|---|---|---|---|
| `kilvona.shop` | **3 créas ≥70 €/j sur 5 pubs** (la meilleure de la session) | 31,95 € | mort loi n°3 |
| `packfreund.de` | 1 hero sur 38 pubs | **69,90 €** | mort dispersion |
| `homevision-shop.de` | 1 hero sur 13 pubs | **99,95 €** | mort dispersion |
| `huber-outdoor.at` | 2 créas | **59,90 €** | plancher raté |
| `movewell.se` | 2 créas sur 6 fortes | ? | plancher raté |

> Les seuls shops vraiment concentrés de la session vendent des produits impulsifs à moins de 40 €, et tous les produits dans la bonne fourchette 45-100 € reposent sur un hero creative unique. **Hypothèse : un produit impulsif bon marché supporte une créa unique très diffusée (achat sans réflexion), là où un produit à 60-100 € demande plusieurs angles pour convaincre, donc disperse le budget.**

**⚠️ À traiter comme une observation d'une seule session, pas comme une loi.** Échantillon de 15 shops, non représentatif. À reconfirmer sur 2-3 sessions avant d'en tirer une règle. Si elle se confirme, elle durcirait la loi n°8 : la zone « léger ET cher ET concentré » serait une intersection de trois contraintes, encore plus étroite que les deux déjà connues.

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 08/08/2026 | **F63 pages 2 à 5** | ~50 shops neufs au total. 15 creusés créa par créa. **0 au plancher.** | Filtre 🟢🟢 confirmé sur le volume ; rendement final nul cette passe. |
| 08/08/2026 | **F64** (ratio durci) | 7 neufs sur 19, sélectionne des pages d'advertorial. | ❌ Retiré. |
| 08/08/2026 | **F65** (fenêtre 10-25 j + plancher créa) | 0 neuf. | ❌ Retiré (loi n°4). |

---

# Session 16 (02/09/2026) — reprise après 3,5 semaines, aucun filtre neuf inventé

**Décision de méthode prise par Roméo en début de session, à conserver** : après un arrêt de 3 semaines et demie, on ne cherche PAS un nouvel angle de filtre, on **rejoue les filtres validés dans le bon ordre** sur un vivier qui s'est renouvelé tout seul. Son raisonnement : « ça fait 3 semaines qu'on n'a rien fait, il pourrait très bien y avoir des shops qui commencent à scaler qu'on n'avait pas vus ».

**Correction à acter sur le tri des filtres retirés** (l'enseignement de session 14 était trop large) : il faut distinguer deux motifs de retrait.
- **Retrait STRUCTUREL** — le filtre est mort par construction, ne jamais le rejouer : F3/F5/F10 (stock + fraîcheur, loi structurelle), F30/F31/F14 (plafond de trafic retiré, corollaire n°2), F39/F55/F58/F65 (deux planchers chiffrés empilés, loi n°4), F60/F61 (tris exotiques, loi n°9).
- **Retrait D'ÉCHANTILLON** — le filtre n'avait rien sorti ce jour-là sur un vivier déjà écumé. Ceux-là redeviennent jouables après quelques semaines. C'est le cas de V1 et V4, qui n'avaient plus été lancés depuis le 04/08 et qui ont fourni cette session le meilleur gisement des trois recettes essayées.

## Résultat : V1 et V4 battent F63 sur un vivier reposé

| Filtre | Lancé | Qualité du gisement | Candidats à creuser |
|---|---|---|---|
| **V1** (`min_active_ads`≥40 + `max_traffic` 2000 + shop <6 sem + `reachDelta7d`), sans `category_ids` | p1 + p2 | **p1 excellent**, p2 s'effondre (advertorials, mode en collection, sous plancher) | 5 |
| **V4** (`ad_reach_growth` >100 % last7d + shop <8 sem + `max_traffic` 2500) | p1 + p2 | **p1 excellent**, recoupe V1 à ~40 % mais apporte du neuf (kneeplex, fatedduo, mylovlygioielli) | 4 |
| **F63** (ratio de concentration + fraîcheur créa 8-45 j) | p1 | **Décevant cette fois** : dominé par les advertorials santé DE/IT et les collections de mode. Sur 20 lignes, ~12 inexploitables d'office. | 1 (Huber-Outdoor, déjà arbitré) |
| **F53** (`search_shops` trié `createdAt`) | p1 (30 shops sur 72) | Gisement 100 % neuf comme prévu, mais **3 candidats sur 30 seulement**, tous morts à 0 créa ≥100k | 3 |

> **À retenir pour la prochaine session : lancer V1 et V4 en tête, pas F63.** F63 garde sa valeur (il détecte la concentration en amont) mais son gisement s'est nettement dégradé en 3 semaines, alors que V1/V4 se sont rechargés. Confirme que le catalogue ne se hiérarchise pas une fois pour toutes : **l'ordre optimal dépend de la date de la dernière passe de chaque filtre**, pas d'un classement figé.

## 🔑 Loi corollaire n°10 (confirmée, plus une hypothèse) : LE HÉRO UNIQUE EST LE MOTIF DE KILL DOMINANT

L'« observation à confirmer » de la session 15 est confirmée sur un second échantillon indépendant. **Sur 10 candidats creusés au test de dispersion : 4 à une seule créa ≥100k, 3 à zéro, 2 à deux créas, 1 seul à trois créas mais réparties sur deux produits différents. Zéro candidat au plancher.**

Le cas le plus net est `velmadora-it.com` : **82 pubs actives, une créa à 339 €/j, et rien d'autre au-dessus de 100k**. Le compteur de pubs de la page ne dit toujours rien, c'est la loi n°5 dans sa forme la plus pure.

**Conséquence opérationnelle : le test de dispersion doit rester la PREMIÈRE chose faite sur chaque candidat, avant la page produit, avant le prix, avant tout.** Il coûte 1 à 4 unités et tue 9 candidats sur 10. Toute analyse faite avant lui est du temps perdu.

**Nuance nouvelle sur le comptage des créas** (née d'`asileap.com`) : un shop peut atteindre 3 créas ≥70 €/j **sans qu'aucun de ses produits ne les atteigne**, si les créas portent des produits différents. **Le plancher se compte par PRODUIT, jamais par shop** — vérifier que les créas retenues pointent bien vers la même `landingPageUrl`. À ajouter à la checklist de l'étape 4 du `SKILL.md`.

## Journal — session 16 (02/09/2026)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 02/09/2026 | **V1** p1 (sans `category_ids`) | Gisement neuf et riche. 5 candidats creusés (velmadora, defentor, rotafix, asileap, ecoawear) — tous morts en dispersion ou sur le prix. | 🟢 **À relancer en tête de session.** Rechargé après 4 semaines. |
| 02/09/2026 | **V1** p2 | Qualité en chute libre (advertorials, mode, <70 €/j). 1 seul candidat (nordvera.dk), mort en dispersion. | Exploiter la p1, s'arrêter à la p2. |
| 02/09/2026 | **V4** p1 | Recoupe V1 à ~40 % mais apporte kneeplex (196 €/j) et fatedduo. Tous morts. | 🟢 **Complément systématique de V1, confirmé.** |
| 02/09/2026 | **V4** p2 | Rien au plancher. | Idem V1 : p1 seulement. |
| 02/09/2026 | **F63** p1 | Gisement dégradé : advertorials santé DE/IT + mode. Aucun candidat neuf exploitable. | 🟢 Filtre conservé, mais **déclassé derrière V1/V4** pour la prochaine passe. |
| 02/09/2026 | **F53** (`search_shops`, `createdAt`) | 72 shops, 30 lus. Échantillon 100 % neuf comme attendu. 3 creusés (bedbuddy, megafort, nordivadanmark), **tous à 0 créa ≥100k**. | 🟢 Toujours valide comme renouveleur d'échantillon, rendement nul cette passe. |

**Bilan session 16 : 6 passes, 10 candidats creusés, 0 au plancher, ~180 unités consommées (19 561 restantes).** Deux candidats historiques fermés définitivement par Roméo (Staydries sur la dégradation de sa data, Huber-Outdoor sur le prix jamais monté à 49,90 €). Acquis de la session : la loi n°10, la règle « le plancher se compte par produit », et l'ordre de lancement V1/V4 devant F63.

## Session 16 (suite) — élargissement en largeur : marchés neufs, F62/F51/F54, saisonnier Q4

### ❌ F66 — V1 et V4 portés sur les MARCHÉS SOUS-EXPLOITÉS (NL, PT, GR, RO, CZ, IE)
```
(V1 et V4 à l'identique) + main_countries: ["NL","PT","GR","RO","CZ","IE"]
```
Angle : ces 6 marchés n'avaient jamais été ciblés explicitement, l'hypothèse était un vivier vierge.

**Testé le 02/09/2026 : 40 lignes, un seul candidat au-dessus de 100 €/j hors advertorials et infoproduits, mort en dispersion (`kineticsbrace.com`, 1 créa).** Le plafond de €/j y est structurellement plus bas : sur les 40 résultats, la médiane tourne autour de 25-45 €/j, contre 100-340 €/j sur les mêmes filtres en DE/IT/ES/GB.

> **Explication, à retenir comme règle : le €/jour est une mesure de DÉPENSE, donc il suit le CPM et la taille du marché.** Un plancher exprimé en €/j (70 €/j) est mécaniquement plus dur à franchir sur un petit marché à CPM bas. Cibler NL/PT/GR/RO/CZ/IE ne donne donc pas un vivier vierge exploitable : ça donne le même type de shops avec des budgets plus petits. ❌ **Retiré. Rester sur DE, IT, ES, GB, SE, DK, PL, AT, NL** (les marchés où les budgets existent).

Effet de bord notable : RO et CZ font remonter beaucoup d'advertorials santé et d'infoproduits, ce qui recoupe la loi n°9 (ces marchés attirent un modèle d'annonceur particulier, pas de bons produits).

### F62 relancé — toujours valide, mais le gisement a viré à l'advertorial
Relancé à l'identique le 02/09. Sur 18 lignes : `ripovex.com/pages/adv1`, `100tageautark.de`, `ferranosaitalia.com/pages/kit-4-in-1`, plus des collections de mode italiennes et **un réseau de domaines** (`theqazedc.shop` + `zormella.shop`, même page « Cosmic Glow », handles `JK8181`/`X8181` = exclusion dure). Seul produit réel : `gloewhole.com` (power bank 96 €/j + setting spray 61 €/j) — **2 produits différents, donc sous le plancher par produit**, et le power bank tombe sous le garde-fou lithium.
> Le ratio de concentration attire mécaniquement les pages d'advertorial : peu de créas, gros reach, c'est leur signature exacte. 🟢 Filtre conservé, mais **il faut lire les `landingPageUrl` avant tout** et jeter tout ce qui contient `/pages/adv`, `/adtorial`, `/reverse`, `/7-reasons-why`.

### F51 relancé (`growth30d`) — 3 candidats, 3 morts
`officialdadbag.com` (sac à langer 74,99 £, pente 4→57 en 2 semaines) : **0 créa ≥100k**. `nordscrub.dk` (brosses cuisine 47-62 €) : **0 créa ≥100k**. `campingbruser.com` : voir ci-dessous.

### ❌ F54 — RETIRÉ : le gisement n'existe plus (02/09/2026)
Relancé avec les paramètres d'origine : **0 résultat**. Puis desserré au maximum (création depuis janvier 2026, ≥10 pubs, ≤4000 visites, sans filtre de marché) : **2 shops au total dans le monde**, dont un vendeur d'ebooks argentin et `waxfree.se` (nettoyeur d'oreille 299 SEK ≈ 27 €, sous la loi n°3 et dispositif intra-auriculaire).
**Les IDs d'apps ont été revérifiés via `lookup_filter_ids` et sont toujours valides** (Kaching 4277 à 151 033 installs, Rapi 309, Pumper 3590, Xboost 1408, Kaching 172). Ce n'est donc pas un problème d'IDs : l'intersection « app de bundle × feed trending × shop frais × petit trafic » est passée de 49 shops (07/08) à 2 (02/09). ❌ **Retiré du catalogue.**

## 📅 Recherche saisonnière Q4 — première exécution du SOP officiel (02/09/2026)

La brique « recherche saisonnière N-1/N-2 » du SOP formation (notée le 05/08, jamais exécutée) a enfin tourné. Recette utilisée, à réutiliser telle quelle :
```
search_ads:
  created_after / created_before : le mois cible de l'année N-1 puis N-2
  min_reach: 400000, reach_period: total     ← impressions seules, JAMAIS le €/jour
  max_facebook_likes: 70000, max_instagram_followers: 30000
  technologies: ["shopify"], ad_countries: {exclude:["FR"]}
  status: "all"        ← indispensable, ces créas sont pour la plupart inactives
  sort_by: "reach", max_ads_per_brand: 1
```
⚠️ `status: "all"` est le paramètre critique : sans lui on ne voit que les créas encore actives, donc on rate tout le cœur du sujet.

**Résultat octobre 2025 (20 lignes) — deux populations distinctes :**
- **Les evergreen lancés en octobre** (`daysRunning` 275-323, souvent encore actifs) : sac de frappe, oreiller cervical, fond de teint color-changing, serviette de sport.
- **Les vrais cadeaux de Noël** (`daysRunning` 52-105, arrêtés) : escape room outdoor (`mysteryguides.co.uk`, 7,9M), puzzles (`originaljigsaw.co.uk`, 6,8M), jeu de société familial (`outsmarted.co.uk`, 6,6M), journal à remplir (`collectivebooks.co`, 5,3M), portefeuille compact (`darako.de`, 5,8M).

**Résultat octobre 2024 (20 lignes) :** presque uniquement des evergreen (`daysRunning` 620-690, soit encore actifs deux ans après) — tabouret de toilette, bonde de douche, semelles orthopédiques, mousse nettoyante, matelas d'acupression.

> **Conclusion honnête, qui corrige l'attente de départ : octobre n'est PAS d'abord une fenêtre de produits saisonniers, c'est la fenêtre où se lancent les winners DURABLES.** Le message de la formation (« le Q4 est la période au plus fort volume de bons produits ») est confirmé, mais le mécanisme n'est pas celui qu'on croyait : ce n'est pas qu'il y a plus de produits de saison, c'est que les gros lancements de l'année se font là. Conséquence pratique : la recherche saisonnière sert surtout à **repérer des TYPES de produits qui se relancent chaque octobre**, pas à trouver un shop à copier tout de suite.

**Deux types notés pour la fenêtre octobre-novembre 2026** (à rechasser avec un shop frais le moment venu, jamais à copier depuis ces shops-là qui sont trop installés) :
1. **Jeu / livre-cadeau familial non personnalisé** — puzzle, jeu de société, journal à remplir. Léger, ticket 30-50 €, très gros volume en novembre-décembre.
2. **Accessoire compact homme à forte valeur perçue** — profil portefeuille `darako.de`. C'est exactement la cible de la loi n°8 (léger ET cher).

**⚠️ Constat qui appelle un arbitrage de Roméo : la moitié du gisement Q4 est du CADEAU PERSONNALISÉ** (paillasson animaux, couverts gravés, bijou à gravure, chaussettes au prénom, carte de ville imprimée), qui tombe sous l'exclusion dure « personnalisable » actée le 18/07/2026. Sur les deux années regardées, c'est le motif d'écartement n°1 du gisement saisonnier.

## Journal — session 16 (suite)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 02/09/2026 | **F66** (V1+V4 sur NL/PT/GR/RO/CZ/IE) | 40 lignes, 1 candidat creusé (`kineticsbrace.com`), mort en dispersion. Médiane 25-45 €/j contre 100-340 €/j sur les gros marchés. | ❌ **Retiré.** Le €/j suit le CPM : un petit marché ne peut pas franchir un plancher exprimé en dépense. |
| 02/09/2026 | **F62** relancé | Advertorials + mode + réseau de domaines. `gloewhole.com` seul produit réel, 2 produits différents. | 🟢 Conservé, mais lire les `landingPageUrl` en premier et jeter les `/pages/adv*`. |
| 02/09/2026 | **F51** (`growth30d`) | 30 shops, 3 creusés, **tous à 0 créa ≥100k**. | 🟢 Conservé comme renouveleur, rendement nul. |
| 02/09/2026 | **F54** (apps de bundle) | 0 résultat, puis 2 shops au monde en desserrant tout. IDs revérifiés et valides. | ❌ **Retiré, gisement disparu.** |
| 02/09/2026 | **Saisonnier Q4 oct-2025** | 2 populations : evergreen lancés en octobre + cadeaux de Noël courts. 5 types cadeau identifiés. | 🟢 **SOP validé et opérationnel.** À relancer chaque mois sur M+1. |
| 02/09/2026 | **Saisonnier Q4 oct-2024** | Quasi que des evergreen encore actifs 2 ans après. | Confirme : octobre = fenêtre de lancement des winners durables. |

## Session 16 (fin) — F57, F63 pages 2-4, et le premier shop de la journée à passer le plancher

### 🔓 Décision de doctrine du 02/09/2026 : la catégorie DOULEUR / POSTURE / ORTHOPÉDIE est rouverte
Roméo a tranché en fin de session : on ne ferme pas cette catégorie, on **traduit les hooks du concurrent comme le reste**, et le risque de ban est assumé. *« Si tous ces trucs-là fonctionnent avec Meta, moi ça devrait aussi fonctionner avec Meta. On a toujours un risque de ban mais vraiment je m'en fous. »* Et : *« on ne recrée pas les hooks, on est trop nuls pour ça, on le fera quand on aura de l'expérience. »*
**Ne plus jamais écarter ni déprioriser un candidat sur le risque policy Meta.** Détail dans le `SKILL.md` et dans `crea-pub/SKILL.md` (Étape 0 renversée).
⚠️ **Précision importante : aucun candidat de la journée n'était mort sur la policy.** Les 19 sont morts sur le plancher. La réouverture ne ressuscite rien rétroactivement, elle change le futur.

### 🟢 F57 relancé — 5 résultats seulement, mais un enseignement de bord
`sort_by: newest` + plancher `min_reach 55000 last7d` rend un échantillon minuscule (5 lignes contre 20 pour les autres filtres) : c'est normal, il pose une question très étroite (« quelles créas viennent d'apparaître ET dépassent déjà le plancher ? »).
**Sorti `reinhab-de.com`** (tablettes anti-biofilm pour lave-linge, DE/AT, 70 pubs actives, **6 likes FB**, 68 €/j sur une créa de 8 jours) : **0 créa ≥100k au test de dispersion**, parce que le shop vient littéralement de démarrer.
> **Cas d'école du bord AVANT la fenêtre « entre les deux ».** F57 attrape des shops à J+8, donc trop tôt pour avoir accumulé le reach qui prouve quoi que ce soit. Ce n'est pas un défaut du filtre, c'est sa nature : **F57 alimente la veille (BrandTracker), pas le pipeline.** Un shop qu'il sort se re-checke à 2-3 semaines.

### F63 pages 2 à 4 — le volume est là, la qualité non
60 lignes de plus. 4 candidats sortis et creusés, **tous morts** :

| Shop | Produit | Dispersion | Verdict |
|---|---|---|---|
| `fataswan.com` | Gabarit de mortaise pour charnières, GB, 139 €/j | **1 créa ≥100k** sur 30 pubs | Mort |
| `fuelmover.se` | Pompe de transfert de carburant, SE, 130 €/j | 3 créas ≥100k, **1 seule ≥70 €/j** (les 2 autres à 16 et 14 €/j sur 97 jours) | Mort. Winner installé de toute façon (7,99M de reach total) |
| `boreanova.com` | Veilleuse d'ambiance à variateur, ES | **9 créas ≥100k, toutes sur la même page produit**, mais 1 seule ≥70 €/j | Mort. Tourne depuis 344 jours, 6,6M de reach, et diffuse via **Marie Claire España** et **Muy Interesante** (pages média à 1M et 4,7M de likes) = achat d'espace média, non réplicable à 50 €/jour |
| `bootei.it` | Chaussures « Made in Italy », IT | **3 créas ≥70 €/j** (151, 152, 88) | Voir ci-dessous |

### ⭐ `bootei.it` — le seul shop de la journée à franchir le plancher, et il n'est pas copiable
9 pubs actives, **7 likes FB**, 1,19M de reach total, 3 créas à 151, 152 et 88 €/j. Sur le papier c'est le meilleur ratio de concentration rencontré depuis Staydries.
**Mais les 3 créas pointent vers `https://bootei.it/`, la HOME**, et la copy est du branding pur (« Bootei interpreta il Made in Italy attraverso un design contemporaneo »), sans produit, sans prix, sans offre, en CTA `LEARN MORE` et non `SHOP NOW`.
> **C'est une campagne de notoriété de marque, pas un tunnel de vente dropshipping.** S'ajoute le produit : des chaussures, donc tailles multiples. Le critère de redirection du 06/08 (page produit vs collection) trouve ici son **troisième cas, le pire** : redirection vers la HOME. À ajouter à l'échelle : page produit unique > collection > home. Une redirection vers la home signifie qu'il n'y a rien à copier du tout.

## Journal — session 16 (fin)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 02/09/2026 | **F57** (`newest` + plancher last7d) | 5 lignes. `reinhab-de.com` sorti, 0 créa ≥100k (shop de 8 jours). | 🟢 Conservé, mais **reclassé en filtre de VEILLE**, pas de pipeline. |
| 02/09/2026 | **F63** p2, p3, p4 | 60 lignes, 4 candidats creusés, 4 morts. Beaucoup d'advertorials, de handles chinois codés (`E8251`, `xyl1`, `viocore2`, `mceqzt11` = réseau de shops génériques) et de cadeaux personnalisés. | Confirme le rendement décroissant après la p1. |
| 02/09/2026 | **`bootei.it`** | 3 créas ≥70 €/j — **le seul du jour** — mais redirection vers la home et branding pur. | Présenté à Roméo avec ses défauts, non retenu comme candidat prêt. |

## 📊 Bilan complet de la session 16 (02/09/2026)

**18 passes de recherche, 19 candidats passés au test de dispersion, 1 seul au plancher et non copiable.** ~800 unités TrendTrack consommées (19 225 restantes sur 20 000).

**Acquis de la journée, par ordre d'importance :**
1. **Loi n°10 confirmée** : le héros unique est le motif de kill dominant (13 des 19 candidats à 0 ou 1 créa ≥100k).
2. **Le plancher se compte par PRODUIT, pas par shop** (cas `asileap.com` et `gloewhole.com`).
3. **L'échelle de redirection à trois niveaux** : page produit unique > collection > **home** (cas `bootei.it`, le pire).
4. **Le €/jour suit le CPM** : un plancher en euros par jour ne peut pas être franchi sur un petit marché (F66 retiré).
5. **L'ordre du catalogue n'est pas figé** : il dépend de la date de dernière passe de chaque filtre. Ce jour-là V1/V4 > F63 > F53 > F57.
6. **Octobre = fenêtre de lancement des winners durables**, pas fenêtre de produits saisonniers.
7. **F54 et F66 retirés**, F57 reclassé en veille.
8. **Catégorie douleur/posture rouverte** par décision de Roméo.

**Filtres jamais essayés qui restent au catalogue** : tris `adOrder` et `relevanceScore`, deep-dive bibliothèque Meta (nécessite un navigateur), saisonnière sur novembre (M+2).

# Session 17 (02/09/2026, soir) — trois hypothèses testées, trois négatifs informatifs

Roméo : *« tu es libre, ton objectif c'est d'aller trouver des créas winneuses avec la data qu'on a l'habitude de chercher. Si les filtres n'ont rien validé, tu enchaînes, tu vas en rechercher d'autres. »*

## ❌ F67 — V1 et V4 découpés PAR MARCHÉ (un pays à la fois)
Hypothèse : le tri global est monopolisé par le marché qui dépense le plus, donc les autres marchés sont écrasés avant d'être vus. Découper par pays devrait multiplier l'échantillon.

**Testé sur DE, ES et le bloc nordique (SE/DK/FI/NO). Résultat : l'hypothèse est fausse, et ce qu'elle révèle est plus utile qu'elle.**

| Marché | Meilleure ligne | Décrochage |
|---|---|---|
| **IT** (via le tri global) | 339 €/j | tient jusqu'à ~75 €/j sur 20 lignes |
| **DE** | 158 €/j | 4 lignes au-dessus de 50 €/j, puis chute à 15, 11, 8, 5, 2, 1, **0** |
| **ES** | 296 €/j (Voro, déjà écarté) | 2e ligne à 37 €/j, puis 20, 18, 3, 2, 0, 0, 0 |
| **Nordiques** | 84 €/j | plafond de la page |

> **Le résultat global de V1 était italien à ~90 % parce que c'est là que se trouve l'argent du dropshipping frais en ce moment, pas à cause d'un biais du tri.** Découper par marché ne multiplie pas l'échantillon, ça montre que l'échantillon était concentré pour une bonne raison. ❌ Retiré. **Corollaire opérationnel : sur une passe V1/V4, l'Italie mérite d'être paginée en profondeur avant d'aller chercher ailleurs.**

Effet de bord utile : la coupe par marché fait remonter en clair des **réseaux de domaines** invisibles dans le tri global — `suzvo.com` apparaît 5 fois avec 5 pages Facebook différentes (Suzvo, Suzvo/1, Suzvo/us, Suzvo Studio, Suzvo/Gift), et la famille `try*` (`tryserelia.com`, `tryallevora.com`, `tryirones.com`, `tryguardality.com`, `tryeska.com`) est un réseau d'advertorials à compléments. Plus un faux `mediamarkt-munich.com` (site frauduleux usurpant MediaMarkt).

## ❌ F68 — V1 avec le plafond de trafic relevé de 2 000 à 6 000
Hypothèse : `max_traffic: 2000` exclut peut-être des shops qui viennent de commencer à convertir, donc à avoir des acheteurs.
**Testé : le résultat est quasi identique à V1 (19 lignes sur 20 en commun).** Le plafond n'était pas contraignant du tout.
> **Explication, à retenir : sur un shop de moins de 6 semaines, le trafic n'a pas eu le temps d'exister.** `max_traffic` ne mord que lorsqu'on relâche la fraîcheur — ce qui est exactement la loi corollaire n°2, mesurée cette fois par l'autre bout. Inutile de toucher à ce paramètre tant que `shop_created_after` est strict. ❌ Retiré.

## 🟡 F69 — Plancher unique sur la CRÉA, sans `min_active_ads`
```
search_ads:
  min_reach: 120000, reach_period: last7d      ← plancher unique (loi n°4)
  shop_created_after: <11 semaines
  technologies:["shopify"] + max_facebook_likes: 1500
  max_ads_per_brand: 3 + ad_countries:{exclude:["FR"]}
  sort_by: reachDelta7d
```
Comble un trou documenté depuis le 04/08 : **V1 impose ≥40 pubs actives et rate donc les shops en début de scale**, et V4 ne couvre ce trou que via un filtre en pourcentage qui a son propre biais. F69 pose la question directement : « quelles créas de shops frais tournent fort cette semaine, quel que soit le nombre de pubs de la page ? »

**A sorti `soleria-store.com`** (IT, 151 pubs, 147 likes FB) avec une créa à **404 €/j sur 11 jours** — la plus grosse dépense par créa vue de toute la journée. 🟡 **À reconduire**, l'angle est bon même si le candidat est mort (voir ci-dessous).

## 🎯 La règle « plancher par PRODUIT » a payé dès sa première application

`soleria-store.com` rend **4 créas ≥100k**, ce qui l'aurait fait passer pour un candidat solide au niveau shop. Réparties par produit :
- **Slip de compression post-partum** (`/pages/listicle-slip-soleria`) : 404 et 139 €/j → **2 créas ≥70 €/j**
- **Gouttes de drainage lymphatique** (`/products/drenaggio-linfatico-...`) : 72 et 54 €/j → **1 créa**

Aucun des deux n'atteint 3. Et le second est un **complément ingéré** (gouttes sous la langue), donc exclusion dure de toute façon. Le shop entier tourne sur des personas fabriqués (« Mi chiamo Julie, ho 39 anni », « Dr. Susan Griffin, MD ») et des allégations médicales.
> **Sans la règle écrite ce matin, ce shop passait pour un candidat au plancher.** C'est le premier cas où elle change le verdict.

## Journal — session 17

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 02/09/2026 | **F67** (V1/V4 par marché) | DE, ES et nordiques s'effondrent sous 50 €/j. Le gisement frais est italien. | ❌ Retiré. Corollaire : paginer l'Italie en profondeur. |
| 02/09/2026 | **F68** (`max_traffic` 6000) | 19 lignes sur 20 identiques à V1. | ❌ Retiré. Le plafond ne mord pas sur du shop frais. |
| 02/09/2026 | **F69** (plancher créa sans `min_active_ads`) | `soleria-store.com`, créa à 404 €/j. Mort au plancher par produit (2 créas) + moitié du catalogue ingérée. | 🟡 **Angle à reconduire**, il voit ce que V1 ne voit pas. |

---

# Session 18 (03/09/2026) — cinq recettes neuves, deux canaux fermés, et la mesure du gisement

Consigne de Roméo en ouverture : *« reteste des filtres qui ont déjà marché, ou reteste des filtres tout courts qui n'ont jamais existé, recrées-en toi-même et teste-les jusqu'à ce que ça marche. Sois autonome pendant longtemps. »* Contrainte de la journée : la session 16-17 a tourné **la veille** (25 passes), donc rejouer V1/V4/F63/F51/F57/F62/F69 à l'identique était garanti de rendre le même échantillon. Toute la session porte donc sur des angles neufs.

## 🟢 F70 — CONCENTRATION BUDGÉTAIRE EN EUROS (le ratio F62, mais au dénominateur monétaire)

```
search_ads:
  min_spend_per_page: 1500, spend_per_page_period: last7d   ← le numérateur, en EUROS
  max_active_ads: 40                                        ← le dénominateur
  min_days_running: 8, max_days_running: 45                 ← fraîcheur portée sur la CRÉA (F63)
  technologies:["shopify"] + max_traffic: 2500 + max_facebook_likes: 1500
  ad_countries: {exclude:["FR"]}
  max_ads_per_brand: 1, sort_by: reachDelta7d
```

**`min_spend_per_page` / `max_spend_per_page` n'avaient JAMAIS été utilisés dans les 69 recettes du catalogue.** Tout le catalogue mesure la concentration en REACH (F62/F63 : `min_reach_per_page` ÷ `max_active_ads`). Or le plancher de la doctrine est exprimé en **euros par jour**, pas en reach : mesurer directement la dépense de page sur 7 jours et la diviser par le nombre de créas actives est la traduction exacte du critère.

**Résultat : 8 shops neufs sur 20 en page 1, et surtout TOUTES les lignes rendues sont ≥88 €/j** (408, 405, 361, 306, 273, 234, 222, 199, 186, 181, 168, 167, 164, 136, 94, 88…). Aucun autre filtre du catalogue ne produit un lot où même la dernière ligne franchit le plancher. C'est le meilleur plancher-par-ligne jamais obtenu.

**⚠️ Page 2 s'effondre** (advertorials santé, mode IT, marchés COD BG/RO/GR, 100 % déjà-vu ou exclusion dure). **F70 se joue en page 1 uniquement.**

🟢 **À lancer en tête de session**, à côté de V1/V4. Seuil : 1 500 € / 7 j est le bon réglage ; il équivaut à ~214 €/j de dépense de page répartie sur ≤40 créas.

## 🟢🟢 F71 — FORCER LA REDIRECTION PAGE PRODUIT (`search_in: "url_contains"`)

```
(n'importe quel filtre) +
  query: "/products/"
  search_in: "url_contains"
```

**Paramètre jamais utilisé dans tout le catalogue.** `search_in` acceptait `ad_copy`, `brand`, `website`, `domain`, `url`, `url_contains` — seul `domain` avait servi (test de dispersion). En passant `/products/`, **100 % des créas rendues pointent vers une page produit Shopify**, ce qui élimine d'un seul paramètre les trois populations qui polluent chaque passe :
1. les **collections de mode** (`/collections/…`),
2. les **advertorials et listicles** (`/pages/…`),
3. les **redirections home** (le motif qui a tué `bootei.it` le 02/09).

C'est la traduction en paramètre de l'échelle de redirection actée le 02/09 (page produit unique > collection > home). Vérifié sur 20 résultats : 20 URLs `/products/`.

🟢🟢 **À greffer par défaut sur tout filtre de découverte.** Coût en volume : modéré (le gisement se réduit d'environ un tiers), bénéfice : on ne dépense plus un seul appel sur un shop non copiable par sa structure.

## 🟢🟢 F74 — PLANCHER PAR PRODUIT MESURÉ DÈS LA DÉCOUVERTE (dédup levée + regroupement local)

```
search_ads:
  min_reach_per_page: 220000, reach_per_page_period: last7d   ← base F63
  max_active_ads: 40
  min_days_running: 8, max_days_running: 45
  technologies:["shopify"] + max_traffic: 2500 + max_facebook_likes: 1500
  ad_countries: {exclude:["FR"]}
  max_ads_per_brand: 5        ← ★ la dédup est LEVÉE (F62/F63 étaient à 1 ou 2)
  sort_by: reachDelta7d
puis regroupement LOCAL par landingPageUrl normalisée (scratchpad/g.mjs)
```

**La règle « le plancher se compte par PRODUIT, jamais par shop » (actée le 02/09 sur `asileap.com`) était appliquée en aval, après avoir dépensé un appel de dispersion par candidat. F74 l'applique en amont.** En levant `max_ads_per_brand`, chaque annonceur rend jusqu'à 5 de ses créas ; le parseur les regroupe par URL de page produit et affiche directement `[N créas ≥70 €/j sur M]`. Un candidat au plancher se voit en une ligne, sans aucun appel supplémentaire.

**Validé sur 3 pages le 03/09** : le meilleur groupe de la journée est `my-ne.es` avec **4 créas ≥70 €/j sur la même URL** (361, 387, 143, 124 €/j) — tué uniquement parce que ce sont des compléments alimentaires. Aucun autre produit n'a dépassé 2.

🟢🟢 **À utiliser comme filtre de découverte principal.** Il remplace F62/F63 en usage courant (mêmes filtres, dédup levée, lecture par produit) et supprime l'étape « test de dispersion » pour tout ce qui sort de la page 1.

## 🟢 F75 — CROISSANCE DU NOMBRE DE PUBS, CÔTÉ SHOP (`ads_growth` sur `search_shops`)

```
search_shops:
  ads_growth: [{period: last30d, comparison: greater, value: 100}]
  min_active_ads: 20, max_active_ads: 400
  max_monthly_visits: 3000, max_products_count: 15
  main_market_countries: EU + currencies: [EUR,SEK,DKK,GBP,PLN,CZK]
  sort_by: growth30d, limit: 100
```

`ads_growth` avait été testé **sur `search_ads`** (F5, retiré le 04/08 : sans fraîcheur il rend des accumulateurs, avec fraîcheur il rend 0). **Sur `search_shops` il n'avait jamais été essayé**, et il se comporte différemment : c'est une dérivée pure, donc la loi structurelle ne mord pas, et on peut se passer de `creation_date_from`.

**Résultat : 59 shops, quasiment tous inédits** — population complètement disjointe de tout ce que le catalogue avait produit. **Réserve honnête : sans filtre de fraîcheur du shop, la population est majoritairement composée de marques installées** (créations 2019-2025 : N-Pro rugby 2016, Aqualux 2022, Scrubols 2023, Boomnutritions 2024…). Ce n'est pas disqualifiant — la doctrine F63 dit que c'est la fraîcheur de la CRÉA qui compte — mais il faut trier à la lecture.

🟢 **À garder comme renouveleur d'échantillon**, au même titre que F53. Meilleures sorties du jour : `shophoki.com` (89,99 €, pente 73→266) et `aqualux.fi` (69-79 €, 6 créas ≥100k sur une seule page produit), tous deux tués ensuite au plancher.

## ❌ F72 / F73 — le plafond de trafic, mesuré une troisième fois par un troisième chemin

- **F72** = F71 + plancher créa `min_reach: 55000 last7d` + `max_traffic: 2500` → **9 résultats seulement**. Pas un échec : c'est une **mesure**. Voir plus bas.
- **F73** = F72 avec `max_traffic` relevé de 2 500 à **20 000**. Hypothèse : un shop qui convertit vraiment a du trafic, et 2 500 l'exclut. **Testé : le lot bascule immédiatement sur des accumulateurs** — `lantecy.com` (créa de 276 j), `wauzy.com` (319 j, coussins personnalisés Disney-Pixar), `anewsleep.dk` (243 j). ❌ Retiré.

> **Troisième confirmation de la loi corollaire n°2, par un chemin neuf.** F30/F31 l'avaient montrée en retirant `max_traffic` avec un tri absolu ; F68 en le relevant avec `shop_created_after` strict (aucun effet) ; F73 le relève **sans** fraîcheur de shop et **avec** fraîcheur de créa — et cette fois le plafond mord violemment. Conclusion consolidée : **`max_traffic ≤ 2 500` est le garde-fou anti-accumulateur dès qu'on relâche `shop_created_after`. Ne jamais le toucher.**

## ❌ Google Ads Library (F27) — canal FERMÉ définitivement

```
search_google_ads_library: eu_only + status active + min_reach 50000
  + min/max_days_running 8-60 + exclude_audience_countries ["FR"] + sort impressions
```
F27 était 🧪 « jamais testé » depuis le 04/08. **Testé : 28 résultats au total**, dont Amazon Web Services, google.com, youtube.com (via Cycleurope), et deux agences média italiennes (PHD S.r.l., Mindshare Spa). **Un seul shop exploitable dans tout le canal** : `qookie-baby.com` (tué ensuite, vraie marque).

⚠️ **Limites techniques constatées** : `max_traffic` et `shop_creation_after` sont **rejetés par l'API** (`website.traffic.monthly_visits is not verified for public Google Ads MCP reads`). Impossible d'appliquer la signature dropshipper frais. Et le reach Google n'est renseigné que sur une fraction des annonces.

❌ **Retiré. Le dropshipping frais ne fait pas de Google Ads, et TrendTrack ne l'indexe pas.** Ne plus dépenser de crédits dessus.

## ❌ TikTok Library — canal FERMÉ (même maladie que la loi n°9)

```
search_tiktok_library: type=ad + has_shop_linked=yes + countries EU
  + min_views 300000 + published_after 2026-07-15 + sort_by views
```
Jamais tenté dans le catalogue. **Résultat : 2 756 items, et le tri par vues sélectionne des célébrités et des grandes marques** — TikTok España, Cat Burns, Becky Hill, Aitana, Latto, Tokio Hotel, ALDI Nord, MediaMarkt, L'Oréal, Liquid I.V. Le champ `shop` rattaché est du bruit (`danumystical.com` accroché au compte officiel de TikTok Espagne).

> **C'est exactement la loi corollaire n°9, transposée à un autre réseau : un tri de POPULARITÉ sélectionne un modèle d'annonceur (l'influenceur), pas un bon produit.** Un usage de TikTok resterait possible en aval, pour vérifier la traction d'un candidat déjà trouvé (`has_shop_linked` + `domain`), jamais en découverte.

## 📏 LA MESURE DU GISEMENT — 8 shops. C'est tout.

Requête posée sans tri, pour compter la population et non pour en extraire une tête de liste :

```
search_shops:
  creation_date_from: 2026-06-01        ← shop de moins de 3 mois
  min_active_ads: 25, max_active_ads: 400
  max_monthly_visits: 2500
  max_products_count: 10                ← mono-produit
  main_market_countries: [IT,DE,ES,NL,SE,DK,FI,PL,AT,BE,GB,IE,PT,CZ,NO]
  currencies: [EUR,SEK,DKK,GBP]
```

**Réponse de l'API : `total: 8`.**

`thewarmbox.se`, `sleepynights.se`, `megafort.nl`, `aktivnord.se`, `barutz.com`, `autwild.at`, `neuropur.de`, `shop-velia.com`. **Six étaient déjà dans `liste-rejetes.md`**, `autwild.at` a été tué le jour même, `barutz.com` est une marque d'influenceur.

> **Ce n'est plus une impression, c'est un chiffre : la population « shop EU frais + mono-produit + volume de pubs sérieux » se compte à UN CHIFFRE à un instant T, et Zooryn l'a intégralement vue.** Toute recette qui impose simultanément `shop_created_after < 3 mois` ET `min_active_ads ≥ 25` puise donc dans un vivier de 8 lignes, quelles que soient ses autres options. C'est l'explication mécanique du « 0 candidat » des sessions 16, 17 et 18.
>
> **Conséquence de doctrine, à appliquer dès la prochaine session : abandonner la fraîcheur du SHOP comme filtre de découverte principal, et ne garder que la fraîcheur de la CRÉA** (`min_days_running` / `max_days_running`, la correction F63 du 08/08). Le vivier utile n'est pas « les shops nés il y a 2 mois », c'est « les produits qui décollent cette semaine », et il est un ordre de grandeur plus large. `max_traffic: 2500` + `max_facebook_likes: 1500` suffisent à écarter les marques installées (F73 le confirme a contrario).

## 🎯 Deux TYPES à rechasser (data insuffisante aujourd'hui, profil idéal)

1. **Filtre de douche anti-chlore, 69-79 €** (`aqualux.fi`, FI). Léger, non électronique, sans batterie, non saisonnier, page produit unique, forte valeur perçue : c'est la description littérale de la zone gagnante de la loi n°8. Le winner finlandais concentre 6 créas ≥100k sur une seule page produit mais aucune à 70 €/j — **plafond de CPM d'un petit marché**, pas un défaut de produit. Recherche mots-clés multilingues (`Duschfilter`, `filtro doccia`, `filtro de ducha`, `douchefilter`, `shower filter`) sur DE/IT/ES/NL avec plancher 50k/7j : **0 résultat**. Personne ne l'a encore porté sur un grand marché. À relancer chaque semaine.
2. **Chaise de camping ultra-compacte, 99,90 €** (`autwild.at`, DE/AT). Mono-produit parfait, 100 % des créas sur une seule page, pente 54→130 en 8 semaines. Tué aujourd'hui parce que ses trois grosses créas sont passées inactives et qu'on est en fin de saison. **À re-checker en mars-avril 2027** : le type et le point de prix sont bons, la fenêtre ne l'est pas.

## Journal — session 18 (03/09/2026)

| Date | Filtre | Résultat | Décision |
|------|--------|----------|----------|
| 03/09/2026 | **F70** (concentration en €, `min_spend_per_page`) | 8 shops neufs sur 20 en p1, **toutes les lignes ≥88 €/j**. p2 s'effondre. | 🟢 **Validé, à lancer en tête. Page 1 uniquement.** |
| 03/09/2026 | **F71** (`search_in: url_contains` = `/products/`) | 20/20 des créas pointent vers une page produit. Tue collections, advertorials et redirections home en un paramètre. | 🟢🟢 **À greffer par défaut sur tout filtre de découverte.** |
| 03/09/2026 | **F72** (F71 + plancher créa 55k/7j + trafic <2500) | 9 résultats. Mesure du gisement plus qu'un filtre. | Conservé comme sonde. |
| 03/09/2026 | **F73** (F72, `max_traffic` porté à 20 000) | Accumulateurs immédiats (créas de 243 à 319 jours). | ❌ Retiré. 3e confirmation de la loi n°2. |
| 03/09/2026 | **F74** (F63 + dédup levée + regroupement par `landingPageUrl`) | Le plancher par produit se lit directement dans la sortie. Meilleur groupe : 4 créas ≥70 €/j sur une même URL. | 🟢🟢 **Filtre de découverte principal. Remplace F62/F63 en usage courant.** |
| 03/09/2026 | **F75** (`ads_growth` sur `search_shops`) | 59 shops, population quasi 100 % inédite, mais majoritairement des marques installées. | 🟢 Renouveleur d'échantillon, à trier à la lecture. |
| 03/09/2026 | **F27 Google Ads Library** | 28 résultats, que des géants. `max_traffic` et `shop_creation_after` rejetés par l'API. | ❌ **Canal fermé définitivement.** |
| 03/09/2026 | **TikTok Library** (tri vues) | Célébrités et grandes marques. Loi n°9 transposée. | ❌ **Pas un canal de découverte.** Usage aval seulement. |
| 03/09/2026 | **Sonde de gisement** (`search_shops`, shop <3 mois + ≥25 pubs + mono-produit + EU) | **`total: 8`**, dont 6 déjà rejetés. | 📏 **Mesure structurante : abandonner la fraîcheur du SHOP en découverte.** |

**Bilan session 18 : ~15 passes, 13 candidats creusés, 13 tués, 0 au plancher.** Pipeline toujours vide. ~500 unités TrendTrack consommées, 18 588 restantes sur 20 000. L'acquis est méthodologique (F70, F71, F74, F75, deux canaux fermés) et surtout **la mesure du gisement**, qui explique enfin pourquoi trois sessions de suite rendent 0.

## Dernière passe de la session 18 — F74 + F71 combinés, plancher de page abaissé à 150k

```
(tout F74) + query "/products/" search_in url_contains
           + min_reach_per_page: 150000 (au lieu de 220000)
           + max_days_running: 60 (au lieu de 45)
```
Passe de contrôle lancée après la mesure du gisement, pour appliquer la doctrine corrigée (fraîcheur de créa seule) avec l'aperture la plus large encore propre. **Résultat : 4 annonceurs seulement en page 1** (kneeplex, peroatelier, zormella, defentor), tous déjà arbitrés. Meilleur groupe : **`defentor.pl`** (répulsif à souris aux huiles essentielles, PL, 45 pubs, 61 likes FB, 100 % des créas sur `/products/defentor`) avec **2 créas ≥70 €/j** (156 et 117 €/j) — le meilleur profil de concentration de la journée, mais sous le plancher de 3, et déjà creusé et tué la veille en session 16. Confirme la mesure : à aperture large et propre, le marché EU rend aujourd'hui une poignée d'annonceurs, tous connus.

## 🔴 CORRECTION MAJEURE de fin de session 18 : F73 était un test INVALIDE, et le plafond de trafic coupait la moitié du gisement

**Erreur commise et corrigée le 03/09/2026 dans la même session.** F73 (« relever `max_traffic` de 2 500 à 20 000 ») a été lancé **sans `min_days_running`/`max_days_running`**. Ce n'était donc pas un test du plafond de trafic, c'était un test du retrait de TOUTE fraîcheur. D'où les accumulateurs (Lantecy 276 j, Wauzy 319 j, anewsleep 243 j) et la conclusion erronée « ne jamais toucher `max_traffic` ».

**Test refait correctement — `max_traffic: 15000` ET fenêtre de créa 8-45 jours maintenue :**

```
search_ads:
  query "/products/", search_in url_contains        ← F71
  min_reach_per_page: 150000, reach_per_page_period: last7d
  max_active_ads: 45
  min_days_running: 8, max_days_running: 45          ← ★ LE paramètre qui manquait à F73
  technologies:["shopify"] + max_facebook_likes: 1500
  max_traffic: 15000                                 ← relevé de 2500
  ad_countries:{exclude:["FR"]} + max_ads_per_brand: 4-5
  sort_by: reachDelta7d
```

**Résultat immédiat, page 1 : deux produits au-dessus du plancher de 3, ce que trois sessions consécutives disaient impossible.**

| Produit | Créas ≥70 €/j sur la MÊME page produit |
|---|---|
| `vysioneyewear.com/it-it/products/grey` (Skeye, lunettes ES+IT) | **4** : 1 061, 506, 251, 201 €/j |
| `cazzatrend.it/products/o-lei-o-niente-red` (t-shirt IT) | **3** : 571, 400, 145 €/j |

Les deux tombent sur des exclusions (Skeye = saisonnier + marque installée, déjà rejeté le 06/08 ; Cazzatrend = personnalisation). **Mais la démonstration tient : le plancher EST franchissable, on ne le voyait plus.**

> **Loi corrigée : `max_traffic: 2500` n'est un garde-fou nécessaire QUE lorsqu'on filtre sur la fraîcheur du SHOP.** Dès qu'on porte la fraîcheur sur la CRÉA (`min/max_days_running`), c'est cette fenêtre qui écarte les accumulateurs, et le plafond de trafic ne fait plus que couper des shops parfaitement copiables — un shop de 6 mois à 8 000 visites/mois qui lance un produit qui décolle est exactement la cible. **Nouveau réglage par défaut : `max_traffic: 15000` AVEC fenêtre de créa obligatoire. Ne jamais relever le plafond sans la fenêtre.**

**Leçon de méthode, à retenir au-delà de ce cas : quand un test « retire un garde-fou », vérifier que TOUS les autres garde-fous sont bien restés dans la requête avant de conclure.** Le `meta.filters` de la réponse le dit ; je ne l'avais pas relu.

## 🟢 Le BrandTracker comme source de produits (première exploitation systématique, 03/09/2026)

14 marques suivies. `list_tracked_brands` donne en une requête le nombre de **nouvelles créas sur 1 / 7 / 30 jours** par marque : c'est un détecteur de LANCEMENT, pas de scaling. Deux signaux forts ce jour-là : **Nattly DK, 91 nouvelles créas en 7 jours** (148 actives) et **ScandicBeam, 34 en 7 jours** (274 actives).

`get_brandtracker_scaling_ads` sur Nattly révèle un **produit entièrement neuf** : **EnkelDyne**, une couette dont la housse est intégrée (lavable en machine domestique, sèche en 2 h), 899 NOK (~77 €) avec 2 taies offertes et 40 nuits d'essai, poussée sur deux nouveaux domaines (`sovna.eu` pour la Norvège, `nattlyshop.dk` pour le Danemark). Aucun filtre TrendTrack ne l'aurait sorti : le shop est déjà rejeté, donc invisible pour l'anti-doublon.

> **C'est la tactique « Google Sheet secondaire des shops de niche à surveiller » de la formation, enfin outillée.** Un shop rejeté n'est pas mort : il reste le meilleur endroit où voir apparaître le PROCHAIN winner avant tout le monde. **À faire au début de chaque session, avant tout filtre : `list_tracked_brands`, repérer les marques à fort `newAdsLast7Days`, et ouvrir leur ScalingTab.** Coût : 2 requêtes.

Rappel du 28/08 : Monveree avait été trouvé exactement comme ça, par un passage en revue du BrandTracker, pas par un filtre.
