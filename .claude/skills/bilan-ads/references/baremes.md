# Barèmes d'analyse — formation vs orientation marché

> ⚠️ Distinction NON négociable à respecter dans le tableau comparatif :
> ce qui vient **de la formation de Roméo** (gravé, fait foi) et ce qui est
> une **orientation marché** (indicatif, dropshipping standard, pas la formation).
> Ne jamais présenter une orientation marché comme une règle de la formation.
>
> Source principale : **Framework Meta Ads Testing · Optimisation · Scaling** (ressource
> officielle de la formation, intégré le 13/07/2026). PDF source :
> `livrables/ecommerce/formation/Ressource commu/Framework Meta Ads Testing Optimisation Scaling/`.
> Source complémentaire (section 5bis) : vidéo "3.2 Les KPIs sur Meta Ads",
> `livrables/ecommerce/formation/Module 10 - Meta Ads/3.2 Les KPIs sur Meta Ads/`.
> Source complémentaire (section 1bis) : vidéo "1.1 Calculer son ROAS BE & ROAS TARGET",
> `livrables/ecommerce/formation/Module 12 - Analyse et prise de décision post-testing/1.1 Calculer son ROAS BE & ROAS TARGET/`.

---

## 1. Les seuils économiques (le juge de paix)

La formation décide **sur la rentabilité**, pas sur des seuils de vanité.

- **ROAS BE (break-even)** = seuil pour ne pas perdre d'argent (0 % de marge nette).
  - Calcul : `ROAS BE = prix de vente / (prix de vente − COGS net)`, soit `1 / marge`.
  - Exemple : produit à 49,99 €, COGS 15 € → marge = (49,99−15)/49,99 = 70 % → ROAS BE ≈ 1,43.
  - Sous ce seuil = on perd de l'argent sur la journée.
- **ROAS TARGET** = le ROAS qui donne **20 % de marge nette minimum**. Au-dessus, sur les 3 derniers
  jours, on peut scaler (marge confortable).
- **RANGE ROAS TARGET** = officiellement défini par la formation comme le ROAS correspondant à
  **entre 15 % et 20 % de marge nette** (pas une simple décote de -20 % du TARGET, cf. précision
  ci-dessous). Sur les 3 derniers jours, on ne touche pas au budget dans cette zone.
- **ROAS "−20 % de perte"** = plancher sous lequel on cut à J+4 (indicateur séparé dans le fichier
  officiel de calcul, cf. section 1bis).
- **Coût ATC max** = **20 % de l'AOV** (panier moyen). Au-dessus, l'ajout au panier coûte trop cher pour être rentabilisé.
- ⚠️ **Règle du framework : ces seuils se calculent UNE FOIS avant le test (COGS + AOV du produit) et ne se
  recalculent pas en cours de test** (sauf ajustement du COGS moyen toutes les 2 semaines en scaling,
  cf. section 1bis). C'est pour ça que le COGS doit être connu AVANT de lancer (leçon Luma).

---

## 1bis. Méthode officielle de calcul (vidéo "1.1 Calculer son ROAS BE & ROAS TARGET", Module 12,
intégrée le 04/08/2026)

La formation fournit un **Google Sheet calculateur** (lien en description de la vidéo, à récupérer
par Roméo) qui calcule automatiquement multiplicateur, ROAS BE, ROAS TARGET, RANGE ROAS TARGET et
ROAS −20 % de perte à partir des colonnes suivantes, **par produit** :

- **Frais de PSP** (processeur de paiement) : Shopify Payments et/ou PayPal, à demander à chaque
  plateforme et moyenner si les deux sont utilisés. **+2 % environ** si la société est basée hors
  UE (US, UK, Hong Kong...).
- **TVA** (0 si franchise en base, cas de Zooryn) et **URSSAF** (cotisations).
- **Autres frais** : prestataires payés au %CA (rare, souvent 0).
- **Marge minimum retenue** : le fichier calcule sur la base de **15 % de marge nette** (bas de la
  RANGE ROAS TARGET) et **20 % de marge nette** (ROAS TARGET, haut de la range).
- **COGS et prix de vente** : voir méthode multi-bundle ci-dessous.

### Méthode multi-bundle (important pour Zooryn, qui utilise RapidBundle)

- **Au lancement du testing** (pas encore de data) : utiliser le COGS et le prix de vente de
  **l'offre bundle n°1 uniquement** (approximation faute de mieux).
- **Une fois en phase de scaling** : recalculer un **COGS moyen pondéré** et un **prix de vente
  moyen pondéré** sur toutes les offres du bundle, pondérés par leur **taux de conversion réel**
  (disponible dans **RapidBundle → onglet Analytics**, déjà installé sur Zooryn : "25 % des
  acheteurs prennent l'offre 1, 50 % l'offre 2, 25 % l'offre 3", etc.).
  - Raison : les offres 2/3 ont un **multiplicateur COGS moins avantageux** (rabais volume accordé
    au client) mais génèrent **plus de profit net en valeur absolue**. Ignorer cette pondération
    fausse le ROAS BE/TARGET réel dès qu'on a plusieurs paliers.
  - Exemple donné dans la vidéo : offre 1 à 30 € (25 % des ventes), offre 2 à 50 € (50 %), offre 3
    à ~65-70 € (25 %) → COGS moyen pondéré et prix de vente moyen pondéré recalculés (ex. 14,50 €
    / 59,25 € dans l'exemple).
  - **À refaire tous les 15 jours** sur les produits qui tournent et sont rentables : le mix
    d'offres acheté par les clients bouge avec le temps (Meta cible des audiences différentes à
    mesure qu'on scale, moins "chaudes"), donc le COGS/prix moyen pondéré — et donc le ROAS BE —
    peuvent légèrement dériver sans qu'aucune offre n'ait changé.
- Rejoint et précise la mémoire déjà actée côté Zooryn : *calculer la marge palier par palier,
  jamais sur le meilleur cas* — cette vidéo donne la méthode exacte de pondération à appliquer une
  fois qu'il y a assez de data (RapidBundle Analytics), plutôt qu'une simple moyenne arithmétique.

---

## 2. Phase de TESTING — seuils de décision par palier (formation, framework officiel)

Setup de départ : 1 campagne (CBO ou ABO), budget 50 €/jour, **3 à 6 créatives lancées** le jour
du testing. En amont, on constitue un **stock de 5 à 15 créas** prises chez le concurrent, gardées
sous la main pendant tout le testing : si une journée valide, on pioche dedans pour ajouter du
contenu les jours suivants (précision de Roméo, 13/07/2026 — les deux chiffres ne se contredisent
pas, c'est lancées vs en réserve).
On juge à chaque palier de spend cumulé, jamais à chaud entre deux paliers.

### Palier 24h (50 € de spend)
| Scénario | Condition | Décision |
|----------|-----------|----------|
| ✅ 1 | ≥ 1 vente | Jour validé, on continue |
| ✅ 2 | 0 vente MAIS CPC en baisse ou stable (−1 € ou moins) | Jour validé, on continue |
| ❌ 3 | 0 vente ET CPC en hausse (+1 € ou plus) | **CUT** |

### Palier 48h (100 € de spend)
| Scénario | Condition | Décision |
|----------|-----------|----------|
| ✅ 1 | ROAS > ROAS BE | Jour validé, on continue |
| ✅ 2 | ROAS ≥ 1 ET coût ATC < 20 % de l'AOV | Jour validé, on continue |
| ❌ 3 | ROAS < 1 | **CUT** |
| ❌ 4 | ROAS ≥ 1 MAIS coût ATC > 20 % de l'AOV | **CUT** |

### Palier 4 jours (200 € de spend)
| Scénario | Condition | Décision |
|----------|-----------|----------|
| ✅ 1 | ROAS ≥ ROAS TARGET | **Début de scaling** |
| 🟠 2 | ROAS < TARGET mais ROAS > TARGET −20 % | **Phase d'optimisation** (section 3) |
| ❌ 3 | ROAS < TARGET −20 % | **CUT** |

Le testing peut s'étendre au-delà de 4 jours (72h/6j…) tant qu'on reste en zone 🟠 : on réapplique
la grille J+4 à chaque journée pleine supplémentaire, jusqu'à basculer en ✅ (scaling) ou ❌ (cut).

> Note d'évolution : ce framework REMPLACE l'ancienne règle simplifiée "journée non rentable → kill
> immédiat" utilisée sur les tests T1-T5 (pré-formation). Il est plus patient : un J1 sans vente mais
> avec un CPC sain n'est plus un motif de kill.

---

## 3. Phase d'OPTIMISATION — diagnostiquer ads vs fiche produit (formation, framework officiel)

Quand une campagne n'est pas validée mais mérite d'être creusée (zone 🟠), on identifie la source
du problème AVANT de décider quoi optimiser. Deux étapes croisées :

**Étape 1 — CPC sur l'ad account :**
- CPC > 0,70 € → le problème vient (certainement) **des ads**
- CPC < 0,70 € → le problème vient (certainement) **de la fiche produit**

**Étape 2 — Analytics Shopify :**
- CVR < 2 % ET taux ATC < 8 % → problème **fiche produit**
- CVR > 2 % ET taux ATC > 8 % → problème **ads**

Lecture croisée : les deux étapes peuvent pointer chacune un coupable différent (cas mixte) ; on
priorise alors l'optimisation du côté le plus dégradé (ex. CVR très bon + CPC et taux ATC rouges =
on rajoute des ads, on ne touche pas à l'offre).

⚠️ Le CVR et le taux ATC de cette grille se lisent dans **les analytics Shopify**, pas dans Meta
(hors périmètre du MCP Facebook Ads → demander à Roméo ou recouper via le connecteur Shopify).

---

## 4. Phase de SCALING — pilotage du budget (formation, framework officiel)

Entrée en scaling : campagne validée (ROAS ≥ ROAS TARGET sur 4 jours). La décision se prend sur
**deux vues : les 3 derniers jours (glissant) + le dernier jour isolé.**

| Scénario | Condition (vue 3 jours) | Condition (dernier jour) | Décision |
|----------|------------------------|--------------------------|----------|
| ✅ 1 | ROAS > ROAS TARGET | ROAS > ROAS BE | **Scaler le budget** (palier suivant, ex. 50 → 100 €/j) |
| 🟠 2 | ROAS > ROAS TARGET | ROAS < ROAS BE | **Ne pas toucher** (un mauvais jour arrive, pas de panique) |
| 🟠 3 | ROAS dans le RANGE TARGET (target −20 % à target) | — | **Ne pas toucher** |
| ❌ 4 | ROAS < RANGE TARGET | — | **Déscaler** (palier inférieur, ex. 100 → 50 €/j) |

- Paliers de scaling vertical (formation) : `100 → 200 → 300 → 400 → 500 → 700 → 1000 → 1500 → +500/+1000`.
- **Règle de sortie** : si on retombe une **2e fois** en scénario 4 alors qu'on est déjà redescendu au
  budget minimum (50 €/j) → **on coupe la campagne**. Retour en phase d'optimisation avec **3 nouvelles
  cartouches créatives**, sinon → produit suivant (NEXT PRODUCT).

---

## 5. Orientation marché (PAS la formation — indicatif dropshipping FR, broad, testing 50 €/j)

À mettre dans le tableau avec la mention explicite **(orientation marché)**.
Servent à lire le funnel, jamais à décider seuls. Depuis l'intégration du framework, le CPC (seuil
0,70 €), le taux ATC (8 %), le CVR (2 %) et le coût ATC (20 % AOV) sont devenus des seuils
**formation** (sections 2-3) : ne plus les étiqueter orientation marché.

| Métrique | Fourchette d'orientation | Lecture |
|----------|--------------------------|---------|
| **CTR (lien)** | ~1,5 % à 3 %+ | < 1 % = créa/angle/audience faible ; > 2 % = le haut du tunnel accroche |
| **CPM** | ~10 € à 40 € (FR broad) | Très élevé = créa pénalisée / audience saturée |
| **CPA (coût par achat)** | doit rester **< marge brute** (prix − COGS) | Au-dessus = non rentable, c'est le ROAS BE en valeur absolue |

> Ces fourchettes bougent selon le prix, le marché, le format. Elles cadrent la lecture,
> elles ne remplacent JAMAIS les grilles des sections 2 à 4.

### 5bis. Fourchettes FR précisées par le formateur (vidéo "3.2 Les KPIs sur Meta Ads",
intégrée le 04/08/2026 — étiquette **formation**, mais explicitement présentées par le formateur comme
**indicatives, pas gravées dans le marbre**, avec de nombreux contre-exemples rentables)

| Métrique | Fourchette "bonne" selon le formateur | Marché |
|----------|---------------------------------------|--------|
| **CPM** | 7 € à 20 € | FR / marchés similaires (IT, ES...) |
| **CTR (lien)** | ~2 % | FR |
| **CPC** | 0,30 € à 0,70 € | FR |
| **CPA** | 7 € à 15 € | pour un AOV de référence ~40 € (le CPA "acceptable" monte avec l'AOV) |

Facteurs qui font bouger ces fourchettes (cités par le formateur) : niche (fashion/beauté/santé =
plus de concurrence donc CPM plus cher, mais achat parfois plus facile), format (image = CPM plus
bas que vidéo), structure de campagne (CBO < ABO en général), ciblage (broad < intérêts en général),
ancienneté du compte (le CPM baisse avec le temps/le spend cumulé).

**Cas réel donné en exemple par le formateur (campagne à 324 000 € dépensés / 725 000 € de CA,
ROAS 2,23)** : CPM excellent (7 €, top ads à 4,47 €) MAIS CTR très faible (0,8 %, top ads à 0,5 %)
ET CPC élevé (0,88 €, top ads à 1,60 €) — deux métriques "mauvaises" isolément. **Pourtant très
rentable** : le trafic, bien que peu cliqueur, convertissait très fort une fois sur la fiche produit
(la top ads avait généré 3 fois son CPA en profit malgré ses mauvaises stats de clic). Leçon
répétée du formateur : **ne jamais isoler une métrique, ne jamais couper sur une seule métrique qui
a l'air mauvaise** — c'est le global (et in fine le ROAS vs ROAS BE/TARGET, donc le **profit**) qui
tranche. Complète la grille "où le tunnel casse" (section 6) : un maillon faible n'est un problème
que si le ROAS global ne compense pas.

---

## 6. Grille de lecture "où le tunnel casse"

À utiliser pour le diagnostic, dans l'ordre du tunnel (complète la section 3) :

1. **Peu d'impressions / CPM délirant** → problème de diffusion (créa rejetée, audience, budget pas encore lancé).
2. **CPM ok mais CTR faible** → la **créa / l'angle / l'audience** n'accroche pas (haut du tunnel).
3. **CTR ok mais peu/pas d'ajouts panier** → la **page produit / l'offre / le prix** ne convainc pas (cas Sculpted).
4. **Ajouts panier ok mais peu d'achats** → **checkout / réassurance / frais de port / moyens de paiement**.
5. **Tout est ok mais ROAS < ROAS BE** → la **marge** est trop faible pour ce CPA : revoir prix/bundle/AOV avant de killer.

---

## 7. Caveat d'attribution (à dire à Roméo)

Le ROAS et les achats **rapportés par Meta** (pixel) peuvent **sur- ou sous-estimer**
les ventes réelles (fenêtre d'attribution, achats multi-appareils, refus de cookies).
La vérité comptable, ce sont les **ventes Shopify**. Si l'écart compte pour la décision,
le signaler et proposer de recouper avec Shopify (hors périmètre MCP de ce skill).
