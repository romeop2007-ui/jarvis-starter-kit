# Catalogue versionné des méthodes de recherche produit

> Créé le 04/08/2026. Principe posé par Roméo : ne jamais s'accrocher à 1-2 filtres qui finissent par retomber sur les mêmes shops que tout le monde dans la formation. On construit un **panel de méthodes numérotées (V1, V2, V3...)**, chacune un angle de filtre différent sur TrendTrack. Chaque méthode se teste en conditions réelles : **si elle trouve au moins un vrai shop/candidat exploitable → elle reste ✅ validée. Si elle sort sèche plusieurs fois de suite → elle passe ❌ retirée** (ou en pause, à retenter dans quelques semaines, le marché change).
>
> **Règle d'usage à chaque recherche produit :** ne pas relancer les 20 méthodes à chaque fois (ça coûte des crédits pour rien). Commencer par les ✅ validées, puis piocher 3-4 🧪 en test qu'on n'a pas encore essayées, puis noter le résultat ici. Ce fichier s'enrichit et s'élague à l'usage — c'est un outil vivant, pas une liste figée.

## Règle de présentation par statut (actée 04/08/2026, non négociable)

**Sur une méthode ✅ validée** : le bénéfice du doute existe. Un candidat moyen/borderline peut être présenté avec ses défauts assumés (comme d'habitude, pour/contre honnête) — la méthode a déjà prouvé qu'elle trouve de vrais candidats, une hésitation ponctuelle ne la disqualifie pas.

**Sur une méthode 🧪 en test** : binaire, zéro zone grise. Deux issues possibles seulement :
- Elle sort un candidat en **net début de scale** (pente claire, plancher franchi, pas un cas limite) → je le présente.
- Elle ne sort rien d'aussi net → **je ne présente RIEN de cette méthode**, je dis juste "V-machin : rien de net cette fois". Pas de candidat "pourrait être pas mal", pas de compromis pour avoir quelque chose à montrer.

**Conséquence directe** : une méthode en test qui ne sort jamais un "oui" clair après plusieurs vraies tentatives passe ❌ retirée. On ne la garde pas "au cas où" sur la base d'un espoir — soit elle produit, soit elle sort du catalogue.

## Statuts

- ✅ **Validée** — a déjà fait remonter un shop réel exploitable (même si le produit n'a pas scalé au testing, la MÉTHODE a fait son travail : trouver un candidat qui correspond aux critères)
- 🧪 **En test** — nouvelle, jamais essayée en conditions réelles ou pas assez de sessions pour juger
- ⏸️ **En pause** — a fait ses preuves mais tourne à vide depuis plusieurs sessions (le marché change, se recharge parfois ; à retenter périodiquement, pas supprimée)
- ❌ **Retirée** — testée plusieurs fois, n'a jamais rien sorti d'exploitable, on arrête d'y perdre des crédits

---

## ✅ V1 — Catégorie + pente 7 jours + shop frais (LA méthode de base, celle qui a déjà trouvé des vrais candidats)

```
category_ids: [niche du jour]
min_active_ads: 40
max_traffic: 2000
shop_created_after: <6 semaines
sort_by: reachDelta7d
max_ads_per_brand: 1
```
**Track record** : c'est elle qui a sorti le matelas gonflable, le sac sling, valotalo, bryngrill (tous des candidats réels, testés ou en pipeline). C'est la colonne vertébrale de la méthode V3 du skill. Toujours la première à lancer.

## 🧪 V2 — Dépense directe sur la vraie fenêtre 24h

```
category_ids: [niche]
min_spend: 60
spend_period: last24h
shop_created_after: <6 semaines
max_traffic: 2000
max_ads_per_brand: 10
```
Corrige le bug qu'on a identifié le 04/08 : `estimatedSpend` par défaut est cumulé sur toute la vie de la pub, pas journalier. Ici on demande littéralement "combien cette pub a dépensé hier".

## 🧪 V3 — Reach cumulé fort (le vrai seuil formation, testé sur la bonne fenêtre)

```
category_ids: [niche]
min_reach: 500000
reach_period: total
shop_created_after: <6 semaines
max_traffic: 2000
max_ads_per_brand: 10
```

## 🧪 V4 — Pente de la créa elle-même (accélération, pas volume absolu)

```
category_ids: [niche]
ad_reach_growth: [{period: last7d, comparison: greater, value: 100}]
shop_created_after: <8 semaines
```
Capte des candidats encore petits en valeur absolue mais qui doublent leur reach en une semaine — souvent en avance de phase sur V1/V3.

## 🧪 V5 — Croissance du nombre de pubs actives de la page

```
category_ids: [niche]
ads_growth: [{period: last7d, comparison: greater, value: 50}]
max_traffic: 2000
```
Le pattern qu'on a vu sur Zomesi (11→26→44→72 pubs en 4 semaines) : une marque qui recrute des créas vite a probablement trouvé un angle gagnant et le décline.

## 🧪 V6 — Rank movers (signal précoce, avant l'explosion du reach affiché)

```
category_ids: [niche]
sort_by: rankDelta7d
min_rank_delta: 10
order: desc
```
Une pub qui grimpe vite dans le classement Meta de son marché — souvent quelques jours d'avance sur le moment où le reach devient visible dans les autres tris.

## 🧪 V7 — Split-testing actif (duplicates élevés)

```
category_ids: [niche]
min_duplicates: 5
max_traffic: 2000
```
Une marque qui décline la même créa en 5+ variantes teste activement un angle qui marche. Signal indirect, jamais utilisé avant le 04/08.

## 🧪 V8 — Early signal (le plus tôt possible dans le cycle)

```
category_ids: [niche]
max_days_running: 14
ad_reach_growth: [{period: last7d, comparison: greater, value: 300}]
```
Créa apparue il y a <2 semaines qui a quadruplé son reach en 7 jours. Le plus risqué (peu d'historique) mais le plus tôt — cohérent avec "timing entre les deux" si recroisé avec la fraîcheur du shop.

## 🧪 V9 — Rotation géographique sous-explorée

```
category_ids: [niche]
main_countries: ["PL"] (puis tourner : RO, GR, PT, HU, SK, BG, CZ)
shop_created_after: <6 semaines
max_traffic: 2000
```
Les 700 élèves de la formation regardent en priorité FR/DE/IT/ES/UK. Les petits marchés EU sont statistiquement moins copiés au moment où on les trouve.

## 🧪 V10 — Combo confirmé (le plus strict)

```
category_ids: [niche]
min_spend: 60
spend_period: last7d
min_active_ads: 60
ads_growth: [{period: last30d, comparison: greater, value: 100}]
max_ads_per_brand: 15
```
Dépense soutenue sur 7 jours ET volume de pubs qui a doublé sur 30 jours. Rare mais très fiable quand ça sort.

## 🧪 V11 — Exclusion Shopify Plus (cible spécifiquement le petit dropshipper frais)

```
category_ids: [niche]
shopify_plus: non-plus
shop_created_after: <6 semaines
max_traffic: 2000
```
Shopify Plus = plan réservé aux gros volumes/grosses boîtes établies. L'exclure filtre mécaniquement les marques trop installées pour être un "winner frais à copier", sans avoir à le juger a posteriori.

## 🧪 V12 — Thèmes Shopify typiques dropship

```
category_ids: [niche]
theme_ids: [Shrine, Kalles, Impulse — résoudre via lookup_filter_ids type=themes]
shop_created_after: <8 semaines
max_traffic: 2000
```
Ces thèmes reviennent sans arrêt chez les dropshippers qui montent vite (rapidité de setup). Un shop qui les utilise + est frais + a des pubs actives coche plusieurs cases de légitimité d'un coup.

## 🧪 V13 — Apps d'optimisation installées (signal d'investissement réel)

```
category_ids: [niche]
shopify_app_ids: [Loox, Judge.me, Rebuy, ReConvert — résoudre via lookup_filter_ids type=shopify_apps]
shop_created_after: <8 semaines
```
Un shop qui a déjà installé des apps d'avis/upsell a investi du temps/argent dans l'optimisation — probablement pas un test bâclé abandonné après 2 jours, plutôt un shop qui a déjà un peu de traction.

## 🧪 V14 — Devise USD sur audience EU (dropshipper anglophone pas encore localisé)

```
category_ids: [niche]
currencies: ["USD"]
ad_countries: {include: [FR, DE, IT, ES, ...]}
shop_created_after: <6 semaines
```
Un shop encore en USD qui commence à cibler l'EU est souvent très frais (pas encore pris le temps de localiser la devise) — signal de fraîcheur avant que la copie se généralise.

## 🧪 V15 — Copy courte / CTA direct (signal de test rapide, pas d'advertorial établi)

```
category_ids: [niche]
max_description_length: 200
cta: [SHOP_NOW]
shop_created_after: <6 semaines
```
S'oppose au pattern "advertorial long" (type Holmgaard) qui demande un vrai travail de copywriting pour copier. Une copy courte + CTA direct = produit-hook simple, plus rapide à traduire et tester.

## 🧪 V16 — Vidéo courte pure (hooks UGC typiques)

```
category_ids: [niche]
media_type: video
min_video_duration: 1
max_video_duration: 15
shop_created_after: <8 semaines
```
Isole les hooks UGC courts et percutants plutôt que les formats longs — souvent le format qui scale le plus vite en dropship pur.

## 🧪 V17 — Croissance stable sur deux fenêtres (pas un pic isolé)

```
category_ids: [niche]
growth_rank: [{period: last7d, direction: rising}, {period: last14d, direction: rising}]
```
Une pub qui monte à la fois sur 7 ET 14 jours est en croissance réelle, pas un pic d'un jour qui va retomber (piège classique déjà identifié avec `reachDelta1d` isolé).

## 🧪 V18 — Pixel Meta confirmé (tracking sérieux)

```
category_ids: [niche]
pixel_ids: [Facebook Pixel — résoudre via lookup_filter_ids type=pixels]
shop_created_after: <6 semaines
max_traffic: 2000
```
Filtre les sites qui n'ont même pas posé de pixel Meta correctement (souvent des tests abandonnés day-1) pour ne garder que ceux qui pilotent vraiment leur campagne.

## ⏸️ V19 — Daily radar sur brandtracker

Utiliser `daily_radar` (focus `scaling` ou `new_ads`) sur les marques déjà suivies en BrandTracker plutôt que `search_ads` pur. Déjà utilisé comme "moteur d'appoint" avant le 04/08 mais jamais isolé comme méthode à part entière avec un vrai suivi de résultat — à tester proprement avant de statuer.

## ❌ Méthodes déjà écartées (ne pas retester telles quelles)

- **`find_similar_shops`** en mode découverte pure : remonte des grosses marques établies (REI, Decathlon...), inadapté pour trouver un dropshipper frais. Reste utile UNIQUEMENT en aval, une fois un candidat déjà trouvé, pour cartographier ses concurrents (cf. `trouver-concurrents.md`).
- **Recherche par mot-clé** (`keywords`) : 100% bruit.
- **`find_winning_products`** / **`search_advertisers` trié growth** : marques établies, pas de dropshippers frais.
- **Tri `reachDelta30d`** sans fenêtre de fraîcheur : remonte des accumulateurs anciens (cas RideLab, 4 mois de scaling, trop tard).

---

## Journal des tests (à compléter à chaque usage réel)

| Date | Méthode(s) testée(s) | Résultat | Décision |
|------|----------------------|----------|----------|
| 03/08/2026 | V1 sur 10 catégories (maison élargie) | Rien qui passe le plancher (Zomesi 66€/j, Holmgaard 40€/j) | V1 reste ✅ validée (track record antérieur), mais sèche sur cette niche neuve — normal, niche jamais explorée avant |
