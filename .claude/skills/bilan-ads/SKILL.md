---
name: bilan-ads
description: Fait à Roméo un bilan d'analyse de sa campagne Meta Ads en cours (dépense + stats + verdict kill/continue selon sa formation), rendu directement dans le chat. À déclencher via /bilan-ads, ou quand Roméo dit "fais-moi le bilan de mes pubs", "analyse ma campagne Meta", "où on en est sur les ads", "on continue ou on kill le produit ?", "ça donne quoi la campagne". Lit les données via le MCP Facebook Ads (lecture seule), demande le COGS à Roméo, compare aux critères de la formation, recommande, puis on discute.
user-invocable: true
allowed-tools: mcp__claude_ai_Facebook_Ads_MCP__ads_get_ad_accounts, mcp__claude_ai_Facebook_Ads_MCP__ads_get_ad_entities, mcp__claude_ai_Facebook_Ads_MCP__ads_insights_performance_trend, Read
---

# Bilan ads — analyse kill/continue d'une campagne Meta

## Objectif

Sortir à Roméo, **directement dans le chat**, un bilan clair de sa campagne Meta du moment :
ce qui a été dépensé, les stats que sa formation regarde, un **tableau comparatif "ce que j'ai
vs ce que je devrais avoir"**, puis une **recommandation kill ou continue (et avec quel budget)**
fondée sur la formation. Ensuite Roméo donne son avis et on tranche à deux.

## Posture (rappels CLAUDE.md)

- En français, direct, honnête. Pas de flagornerie : si c'est un échec, on le dit.
- **Honnêteté barème** : distinguer toujours ce qui vient **de la formation** (fait foi) et ce qui
  est une **orientation marché** (indicatif). Ne jamais déguiser l'un en l'autre.
- **Lecture seule.** Ce skill ne touche JAMAIS aux campagnes (pas d'activation, pause, budget).
  La décision et l'exécution restent à Roméo.

## Inputs requis

1. **Quelle campagne** : par défaut le produit en cours dans la session (ex. au 29/06 = guirlande
   **Luma**, campagne **T4**). Si tu ne sais pas avec certitude → **demande à Roméo** (ne devine pas).
2. **Compte publicitaire** : compte EUR de Roméo. Connu historiquement = `1952596875395674`.
   Si doute, le retrouver via `ads_get_ad_accounts` (prendre le compte EUR actif, `is_queryable=true`).
3. **Économie du produit** (pour le ROAS break-even) : **demander à Roméo le COGS** (coût produit =
   prix fournisseur + frais d'achat) **et confirmer le prix de vente actuel**. On les demande à
   chaque bilan, en une seule question, sauf s'il vient de les donner dans la session.
   Règle du framework : les seuils (ROAS BE, TARGET, coût ATC max) se calculent **une fois avant le
   test** et ne se recalculent pas en cours de route.
4. **Le palier de spend atteint** (24h/50 €, 48h/100 €, 4j/200 €…) : c'est lui qui détermine quelle
   grille de décision s'applique (`references/baremes.md` section 2). Se déduit du spend cumulé.

## Étapes

### Étape 1 — Cadrer la campagne
- Confirme (ou demande) le produit/campagne à analyser et la **période** (par défaut : depuis le
  lancement de la campagne, ou `today` / `yesterday` selon ce que veut Roméo).
- Si la campagne est introuvable par son nom, liste les campagnes actives :
  `ads_get_ad_entities(level="campaign", date_preset="last_7d", fields=["id","name","effective_status","spend"])`
  et demande laquelle.

### Étape 2 — Récupérer les chiffres (MCP Facebook Ads)
- Vérifie d'abord que le compte est requêtable (`ads_get_ad_accounts` → `is_queryable`).
- Récupère les métriques au niveau campagne (et adset/ad si utile pour diagnostiquer) avec
  `ads_get_ad_entities`. Demande au minimum ces `fields` :
  `["id","name","spend","impressions","reach","clicks","ctr","cpc","cpm","actions","cost_per_action_type","purchase_roas","frequency"]`
  - Le nombre d'**achats**, d'**ajouts au panier** et la **valeur d'achat** se lisent dans
    `actions` / `cost_per_action_type` (types `purchase`, `add_to_cart`, `link_click`,
    `landing_page_view`). Vérifier les champs disponibles via `ads_get_field_context` si un champ
    est refusé ; lire les sous-types d'`actions` plutôt que de demander `action_values` comme champ nu.
  - `purchase_roas` = ROAS rapporté par Meta.
- Optionnel si Roméo veut la tendance (la pente, utile vs "copier-le-winner") :
  `ads_insights_performance_trend` sur la campagne (métrique ROAS ou CVR).
- **Si le budget du jour n'est pas entièrement dépensé** (la formation veut ~20h de diffusion avant
  de juger) : le signaler, lecture **provisoire**, pas de verdict définitif.

### Étape 3 — Calculer les seuils de la formation
Lis `references/baremes.md` et calcule, à partir du prix de vente et du COGS donnés par Roméo :
- **Marge brute** = prix − COGS (en € et en %).
- **ROAS BE** = prix / (prix − COGS). Montre le calcul.
- **ROAS TARGET** ≈ ROAS BE / (1 − 0,225) (marge nette 20-25 %).
- **RANGE ROAS TARGET** = [TARGET −20 % ; TARGET] et le plancher **TARGET −20 % de perte**.
- **Coût ATC max** = 20 % de l'AOV (demander/lire l'AOV, sinon l'approcher par le prix de vente).
- **CPA cible** = doit rester < marge brute (sinon non rentable).
- **Profit/perte de la journée** ≈ (achats × marge brute) − dépense pub.

### Étape 4 — Construire le tableau comparatif
Format imposé, rendu dans le chat (Markdown). Colonne "Cible" **étiquetée** formation vs orientation :

| Métrique | Ce que tu as | Cible | Source | Verdict |
|----------|-------------|-------|--------|---------|
| Dépense (palier) | … | 24h/50 € · 48h/100 € · 4j/200 € | **formation** | … |
| Achats | … | — | — | … |
| ROAS réalisé | … | selon palier (BE, TARGET…) | **formation** | ✅/🟠/❌ |
| ROAS pour scaler | … | ≥ ROAS TARGET (x,xx) | **formation** | … |
| CPA | … € | < marge brute (… €) | **formation** | … |
| Coût ATC | … € | < 20 % de l'AOV (… €) | **formation** | … |
| CPC (lien) | … € | < 0,70 € (diagnostic ads/fiche) | **formation** | … |
| Taux ajout panier | … % | > 8 % (analytics Shopify) | **formation** | … |
| Taux de conversion | … % | > 2 % (analytics Shopify) | **formation** | … |
| CTR (lien) | … % | ~1,5-3 % | orientation marché | … |
| CPM | … € | ~10-40 € | orientation marché | … |

### Étape 5 — Lire où le tunnel casse
Applique la grille de lecture de `references/baremes.md` (section 3) : impressions/CPM → CTR →
ajout panier → achat → marge. Dis en une ou deux phrases où ça accroche et où ça bloque.

### Étape 6 — Recommander (kill ou continue + budget)
Appliquer la grille du framework selon la phase (`references/baremes.md` sections 2 à 4) :
- **En testing** : appliquer les scénarios du palier atteint (24h : vente ou CPC stable ; 48h :
  ROAS vs BE + coût ATC vs 20 % AOV ; 4j : ROAS vs TARGET et TARGET −20 %). Le verdict est celui
  du scénario : validé / cut / phase d'optimisation.
- **En zone 🟠 (optimisation)** : dérouler le diagnostic ads vs fiche produit (section 3 : CPC 0,70 €,
  puis CVR/taux ATC Shopify) et recommander QUOI optimiser, pas seulement kill/continue.
- **En scaling** : appliquer les 4 scénarios sur la vue 3 jours + dernier jour (section 4) →
  scaler / ne pas toucher / déscaler ; rappeler la règle de sortie (2e retombée en scénario 4 au
  budget minimum = coupe, retour optimisation avec 3 nouvelles créas, sinon produit suivant).
- **Signal faible** (peu de clics/achats, palier pas atteint) → ne PAS trancher sur du bruit : dire que
  c'est trop tôt, donner la lecture provisoire et la prochaine étape (laisser tourner / recouper).
- Si le seul problème est la **marge** (CPA proche, funnel sain) → proposer d'abord prix/bundle/AOV
  avant de killer.
- Toujours rappeler le **caveat d'attribution Meta** si la décision est serrée (recouper Shopify).

### Étape 7 — Discuter
Termine par : "Voilà ma lecture. Ton avis ?" et attends. La décision se prend à deux, Roméo exécute.

## Edge cases

- **Campagne inconnue / plusieurs en cours** → lister et demander, ne jamais supposer.
- **COGS non fourni** → le demander ; sans lui, sortir quand même les stats brutes + ROAS Meta,
  mais préciser que le ROAS BE (donc le vrai verdict formation) n'est pas calculable.
- **0 achat mais peu de clics** → signal faible, pas de kill, lecture du haut de tunnel seulement.
- **Compte non requêtable** (`is_queryable=false`) → surfacer `not_queryable_reason` à Roméo.
- **Écart Meta vs Shopify** → si ça change la décision, le dire et proposer le recoupement Shopify.

## Limites assumées

- Lecture seule : aucune action sur les campagnes.
- S'appuie sur les chiffres **rapportés par Meta** (attribution pixel), pas sur la compta Shopify.
- Les fourchettes "orientation marché" ne sont pas dans la formation : elles cadrent la lecture,
  elles ne décident pas. Le verdict s'appuie sur le ROAS BE / TARGET (formation).
