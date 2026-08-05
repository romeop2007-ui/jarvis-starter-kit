# P&L officiel de la formation (vidéo "1.2 Calculer son profit (P&L)", Module 12)

> Source : `livrables/ecommerce/formation/Module 12 - Analyse et prise de décision post-testing/1.2 Calculer son profit (P&L)/`.
> Intégré le 04/08/2026. **Décision en attente de Roméo** : ce tableau peut remplacer tout ou
> partie du Sheet "Investissement E-commerce" (skill `budget`) — voir section 5.

## 1. Structure du fichier (à récupérer, lien en description de la vidéo)

Cases **violettes** = à remplir à la main. Tout le reste = calculé automatiquement, ne jamais toucher.

### Onglet "Daily Report" — à remplir CHAQUE JOUR (le lendemain matin, jamais le soir même)
Une ligne par jour. Colonnes à remplir pour le jour J-1 complet (jamais avant 23h59 du jour concerné,
sinon des ventes tardives faussent la ligne) :
- **Total Orders** : nombre total de commandes Shopify de la veille, tous canaux confondus (pas
  Meta — Shopify). Visible sur le dashboard d'accueil Shopify ou dans Analytics.
- **PayPal Order Total / PayPal Sales** (ou tout 2e moyen de paiement : Klarna, etc.) : nombre de
  commandes + CA sur ce mode de paiement. Trouvable dans Shopify → Rapports → **"Revenu net par
  mode de paiement"** (Net Payment by Gateway) — trier par passerelle, additionner si plusieurs
  lignes (ex. PayPal France + PayPal Belgique). Épingler ce rapport pour le retrouver vite.
- **Returns** : montant des retours/remboursements de la veille, via le rapport **"Total des
  ventes"** (Total Sales), ligne Return / Summary.
- **Ads Cost** par canal (Facebook Ads, Google Ads, TikTok Ads...) : montant total dépensé la
  veille sur chaque ad account. Ajouter/retirer des colonnes selon les canaux réellement utilisés.
- **COGS du jour** : au début (petit volume), calcul manuel. **Au-delà de ~700-900 €/jour de CA**,
  la formation recommande l'app **TrueProfit** pour un calcul automatique et plus fiable (vidéo
  dédiée annoncée par le formateur, pas encore récupérée).
- **Multi-shop** : le fichier gère plusieurs boutiques (shop 1/2/3 + total). Zooryn n'en a qu'une
  → supprimer toutes les colonnes shop 2/3 inutilisées.
- **Fees and tax** (tout à droite, à dérouler) :
  - Frais processeur de paiement 1 (Shopify Payments/Stripe) : % + fixe par vente, **à vérifier
    soi-même auprès du support** (cf. `references/baremes.md` section 1bis pour Zooryn : 1,5 % +
    0,25 € en cartes standard FR, forfait Basique).
  - Frais PayPal séparément (souvent un % différent).
  - URSSAF / TVA si applicable.
  - **Pour les sociétés étrangères (LLC US, etc.)** : ajouter le **% de conversion de devise**
    (~2 % en plus du taux de base) si l'encaissement se fait dans une devise différente de la
    vente. Non applicable à Zooryn (micro-entreprise FR, vente et encaissement en EUR).
- Calcule automatiquement : **Net Profit**, **profit en %**, **ROAS** du jour.

### Onglet "Annual P&L" — automatique, sauf les dépenses mensuelles
Pour chaque mois, une seule zone à remplir à la main : les **dépenses fixes/récurrentes**, classées
par catégorie :
- **Shopify App** (apps internes à l'écosystème Shopify, ex. RapidBundle)
- **Software Tool & App** (apps externes, ex. TrueProfit, outils d'A/B testing)
- **Gros partenaire** (quelqu'un payé au % du CA)
- **Freelance** (VA, traducteur ponctuel, etc.)
- **Service** (agences mail, agence Ads...)
- **Other** (LLC, thème payé, abonnements divers...)

Le reste (total des ventes, ads, COGS, remboursements, frais Shopify/PayPal, taxes, net profit) se
recalcule automatiquement à partir des lignes du Daily Report, agrégé par mois puis par trimestre
(Q1/Q2/Q3/Q4) avec un graphique de répartition du CA/profit par shop (utile seulement en multi-shop).

### Onglet "COGS Check" (avancé — vérifie que l'agent ne surfacture pas)
Mécanisme anti-erreur/anti-arnaque : comparer, sur une **période propre** (idéalement chaque
semaine, alignée sur des journées complètes — ex. lundi 00h00 à jeudi 23h59, jamais en plein milieu
d'une journée) :
- Le **COGS calculé par TrueProfit** sur cette période.
- Le **montant réellement facturé par l'agent de sourcing** (Aplusfulfill pour Zooryn) sur la même
  période.
- **Logique** : TrueProfit a normalement un COGS légèrement **supérieur** à ce que facture l'agent,
  car TrueProfit n'applique la réduction de bundle que si c'est le MÊME produit répété dans une
  commande (pas de réduction si produits A+B différents dans la même commande) — donc TrueProfit
  surestime légèrement par rapport à un agent qui, lui, applique de vraies réductions multi-produits.
  Un écart stable et positif = normal.
- **Signal d'alerte** : si l'écart habituel change brutalement (devient très petit, nul, ou
  négatif), c'est le signe soit d'une erreur de saisie COGS côté TrueProfit, soit que l'**agent a
  surfacturé**. Dans ce cas, il faut éplucher la facture en détail.
- Nécessite un rythme de paiement fixe et régulier avec l'agent (peut se négocier avec le temps,
  au début souvent moins fréquent).

## 2. Leçon centrale de la vidéo

La plupart des e-commerçants calculent une marge (ex. 22 %) sans compter tous les frais réels
(PSP, conversion devise, taxes), et se retrouvent en réalité avec une marge bien plus faible
(ex. 14 %) — d'où des problèmes de trésorerie malgré une "rentabilité" apparente. Le P&L complet
sert à connaître le profit réel, pas un profit optimiste mal calculé.

## 3. Ce que ça implique pour Zooryn concrètement

- **PSP** : Zooryn a un seul processeur (Shopify Payments), pas de PayPal actif à ce jour à vérifier
  — donc la colonne PayPal du Daily Report serait à supprimer si aucune vente n'y passe.
- **COGS Check vs Aplusfulfill** : directement applicable dès que Zooryn aura un rythme de paiement
  fournisseur régulier avec Aplusfulfill (Yuri Yang) — rejoint la vigilance déjà actée côté Zooryn de
  toujours vérifier le détail réel des factures COGS par palier, plutôt que de faire confiance à un
  tarif générique.
- **TrueProfit** : app non installée à ce jour sur Zooryn, pas nécessaire tant que le volume reste
  faible (loin des 700-900 €/jour mentionnés comme seuil).
- **Devise/LLC** : non applicable, Zooryn est en micro-entreprise FR, vente et encaissement 100 % EUR.

## 4. Différence avec le Sheet "Investissement E-commerce" (skill `budget`)

| | Investissement E-commerce (actuel) | P&L officiel (cette vidéo) |
|---|---|---|
| Granularité | Par testing/produit (bloc T1, T2...) | **Par jour**, agrégé mois/trimestre/année, tous produits confondus |
| But | Décision kill/continue par produit | Vision cash réelle de **tout le business** |
| Fréquence de saisie | À la demande de Roméo (déclenché manuellement) | **Quotidienne** (routine du matin) |
| COGS | Par palier de prix (manuel, vérifié Aplusfulfill) | Idem au début, puis TrueProfit à l'échelle + COGS Check anti-erreur agent |
| Frais/taxes | URSSAF (ligne dédiée), pas de détail PSP | PSP détaillé (% + fixe, par processeur), TVA, devise LLC |
| Dépenses fixes | Bloc "Abonnements et dépenses" (par nature, par mois) | Même logique, catégorisée différemment (Shopify App / Tool / Partenaire / Freelance / Service / Other) |

**Les deux ne se recouvrent pas totalement** : le P&L officiel donne la vraie photo du profit
business global au jour le jour, l'Investissement E-commerce sert à juger un testing produit par
produit. À trancher avec Roméo : garder les deux (rôles différents) ou migrer entièrement vers le
P&L officiel et abandonner/simplifier le Sheet maison.

## 5. Décision en attente

Roméo doit :
1. Récupérer le lien du Sheet template (description de la vidéo) et le partager avec
   `budget-bot@claude-gws-setup-497511.iam.gserviceaccount.com`.
2. Trancher : garder les deux outils (rôles complémentaires) ou remplacer l'Investissement
   E-commerce par ce P&L (au risque de perdre la vue par-palier de bundle déjà construite).
