# Barèmes d'analyse — formation vs orientation marché

> ⚠️ Distinction NON négociable à respecter dans le tableau comparatif :
> ce qui vient **de la formation de Roméo** (gravé, fait foi) et ce qui est
> une **orientation marché** (indicatif, dropshipping standard, pas la formation).
> Ne jamais présenter une orientation marché comme une règle de la formation.

---

## 1. Ce que la formation pose vraiment (le juge de paix)

La formation décide **sur la rentabilité**, pas sur des seuils de vanité.

- **ROAS BE (break-even)** = seuil pour ne pas perdre d'argent.
  - Calcul : `ROAS BE = prix de vente / (prix de vente − COGS)`, soit `1 / marge`.
  - Exemple : produit à 49,99 €, COGS 15 € → marge = (49,99−15)/49,99 = 70 % → ROAS BE ≈ 1,43.
  - Sous ce seuil = on perd de l'argent sur la journée.
- **ROAS TARGET** = seuil pour scaler avec **20-25 % de marge nette**.
  - Approche simple : `ROAS TARGET ≈ ROAS BE / (1 − 0,225)` (≈ +29 % au-dessus du BE), à ajuster selon les frais réels (Shopify Payments ~1,5-2 %, frais de pub déjà dans le ROAS).
  - Au-dessus = zone de scaling.
- **Décision de la journée** (règle kill/continue actée par Roméo + formation) :
  - On laisse le **budget journalier se dépenser entièrement (~20h)** avant de juger. Jamais de décision à chaud sur quelques euros.
  - **Journée rentable** (ROAS réalisé ≥ ROAS BE) → on **relance 50 €** le lendemain et on cherche à scaler.
  - **Journée non rentable** → on **coupe les pubs, on retire le produit**, on relance un autre produit sous 3-4 jours.
- **Signal de scaling** : scaling **vertical dès +20 % de marge** (ROAS ≥ ROAS TARGET), par paliers de budget : `100 → 200 → 300 → 400 → 500 → 700 → 1000 → 1500 → +500/+1000`.
- **Setup de test** (rappel, pour vérifier que la campagne est conforme) : CBO, 50 €/jour, 1 adset broad, event **Achat**, 5 à 15 créas.
- **Lisibilité de la donnée** : la formation raisonne sur le **funnel complet**, pas sur un élément isolé. Si ça ne convertit pas, lire OÙ le tunnel casse (cf. section 3). Leçon Sculpted : CTR correct + 0 ajout panier = problème **page produit**, pas créa.

---

## 2. Orientation marché (PAS la formation — indicatif dropshipping FR, broad, testing 50 €/j)

À mettre dans le tableau avec la mention explicite **(orientation marché)**.
Servent à lire le funnel, jamais à décider seuls.

| Métrique | Fourchette d'orientation | Lecture |
|----------|--------------------------|---------|
| **CTR (lien)** | ~1,5 % à 3 %+ | < 1 % = créa/angle/audience faible ; > 2 % = le haut du tunnel accroche |
| **CPC (lien)** | ~0,40 € à 1,20 € | Élevé = créa peu cliquée ou CPM cher |
| **CPM** | ~10 € à 40 € (FR broad) | Très élevé = créa pénalisée / audience saturée |
| **Taux d'ajout au panier** | ~5 % à 10 % des clics lien | Bas avec bon CTR = page produit/offre qui ne convainc pas |
| **Taux de conversion (achat)** | ~1 % à 3 % des clics lien | Le vrai goulot si le reste est bon |
| **CPA (coût par achat)** | doit rester **< marge brute** (prix − COGS) | Au-dessus = non rentable, c'est le ROAS BE en valeur absolue |

> Ces fourchettes bougent selon le prix, le marché, le format. Elles cadrent la lecture,
> elles ne remplacent JAMAIS le calcul ROAS BE / ROAS TARGET de la section 1.

---

## 3. Grille de lecture "où le tunnel casse"

À utiliser pour le diagnostic, dans l'ordre du tunnel :

1. **Peu d'impressions / CPM délirant** → problème de diffusion (créa rejetée, audience, budget pas encore lancé).
2. **CPM ok mais CTR faible** → la **créa / l'angle / l'audience** n'accroche pas (haut du tunnel).
3. **CTR ok mais peu/pas d'ajouts panier** → la **page produit / l'offre / le prix** ne convainc pas (cas Sculpted).
4. **Ajouts panier ok mais peu d'achats** → **checkout / réassurance / frais de port / moyens de paiement**.
5. **Tout est ok mais ROAS < ROAS BE** → la **marge** est trop faible pour ce CPA : revoir prix/bundle/AOV avant de killer.

---

## 4. Caveat d'attribution (à dire à Roméo)

Le ROAS et les achats **rapportés par Meta** (pixel) peuvent **sur- ou sous-estimer**
les ventes réelles (fenêtre d'attribution, achats multi-appareils, refus de cookies).
La vérité comptable, ce sont les **ventes Shopify**. Si l'écart compte pour la décision,
le signaler et proposer de recouper avec Shopify (hors périmètre MCP de ce skill).
