# Barèmes d'analyse — formation vs orientation marché

> ⚠️ Distinction NON négociable à respecter dans le tableau comparatif :
> ce qui vient **de la formation de Roméo** (gravé, fait foi) et ce qui est
> une **orientation marché** (indicatif, dropshipping standard, pas la formation).
> Ne jamais présenter une orientation marché comme une règle de la formation.
>
> Source principale : **Framework Meta Ads Testing · Optimisation · Scaling** (ressource
> officielle de la formation, intégré le 13/07/2026). PDF source :
> `livrables/ecommerce/formation/Ressource commu/Framework Meta Ads Testing Optimisation Scaling/`.

---

## 1. Les seuils économiques (le juge de paix)

La formation décide **sur la rentabilité**, pas sur des seuils de vanité.

- **ROAS BE (break-even)** = seuil pour ne pas perdre d'argent.
  - Calcul : `ROAS BE = prix de vente / (prix de vente − COGS)`, soit `1 / marge`.
  - Exemple : produit à 49,99 €, COGS 15 € → marge = (49,99−15)/49,99 = 70 % → ROAS BE ≈ 1,43.
  - Sous ce seuil = on perd de l'argent sur la journée.
- **ROAS TARGET** = seuil pour scaler avec **20-25 % de marge nette**.
  - Approche simple : `ROAS TARGET ≈ ROAS BE / (1 − 0,225)` (≈ +29 % au-dessus du BE), à ajuster selon les frais réels (Shopify Payments ~1,5-2 %, frais de pub déjà dans le ROAS).
- **RANGE ROAS TARGET** = la zone entre `ROAS TARGET − 20 %` et `ROAS TARGET`. Sert de zone tampon
  dans les décisions (phase d'optimisation en testing, "ne pas toucher" en scaling).
- **ROAS "−20 % de perte"** = `ROAS TARGET × 0,80` appliqué côté perte : le plancher sous lequel on cut à J+4.
- **Coût ATC max** = **20 % de l'AOV** (panier moyen). Au-dessus, l'ajout au panier coûte trop cher pour être rentabilisé.
- ⚠️ **Règle du framework : ces seuils se calculent UNE FOIS avant le test (COGS + AOV du produit) et ne se
  recalculent pas en cours de test.** C'est pour ça que le COGS doit être connu AVANT de lancer (leçon Luma).

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
