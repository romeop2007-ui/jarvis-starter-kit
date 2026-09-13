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

## 3bis. Onglet "Testing" (vidéo complémentaire "1.3 Calculer son profit par testing", intégrée le 05/08/2026)

Le formateur a ajouté un **3e onglet "Testing"** au même fichier P&L (à côté de Daily Report et
Annual P&L) : une vue **par produit/testing** plutôt que par jour global.

- **10-11 sections** dans l'onglet, une par testing, extensible (copier/coller une section pour
  en ajouter une 12e, etc.).
- Chaque section = un mini P&L allégé pour CE testing : date de début, **statut** (coupé / en
  cours / opti (phase d'optimisation) / scaling), puis jour par jour les mêmes infos essentielles
  que le Daily Report mais **simplifiées** (pas de détail PayPal/retours fins — pas nécessaire au
  stade testing). Calcule net profit, profit %, ROAS par jour de test.
- Si un testing est cut à J2, on peut supprimer les lignes des jours non utilisés (clic droit →
  supprimer les lignes) pour garder le tableau compact.
- **Deux façons de gérer une fois que ça scale (plusieurs produits actifs en même temps)** :
  1. **Garder intégré au fichier P&L principal** (comme fourni par défaut) : simple au début, mais
     devient vite lourd/confus une fois plusieurs testings accumulés.
  2. **Faire un document séparé "Testing P&L"**, dupliqué du fichier principal en ne gardant QUE
     l'onglet Testing (supprimer Daily Report, Annual P&L, COGS Check de la copie) — une ligne de
     produits qu'on empile au fil du temps, un peu comme l'actuel Sheet "Investissement E-commerce".
- **Position du formateur, à prendre en compte pour Zooryn** : cette vue par-produit est surtout
  utile en tout DÉBUT d'activité. Une fois plusieurs produits actifs (7-8+), il déconseille de
  continuer à analyser produit par produit au quotidien — le pilotage doit redevenir **global**
  (via le ROAS de chaque campagne Meta, cf. skill `bilan-ads`), sous peine de perdre un temps fou.
  Donc : utile maintenant pour Zooryn (encore en phase de recherche du premier winner), à
  réévaluer une fois plusieurs produits qui tournent en parallèle.

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

## 4bis. Règles d'or de remplissage (actées par Roméo le 05/08/2026, à ne jamais enfreindre)

Sheet réel : **"P&L - Zecom Academy 2026"**, ID `1bNuSkdCGIH2jM0whvLOfSoVth8nJwvJe6RsHCF6_C8s`.
21 onglets : `DAILY REPORT`, `TESTINGS`, `COGS CHECK`, `Annual P&L ` (espace final dans le nom réel),
`Q1`/`Jan-26`/`Feb-26`/`Mar-26`, `Q2`/`Apr-26`/`May-26`/`Jun-26`, `Q3`/`Jul-26`/`Aug-26`/`Sep-26`,
`Q4`/`Oct-26`/`Nov-26`/`Dec-26`, `Fees/Taxes`.

**Règle absolue : ne remplir QUE les cases violettes (cases d'entrée). Tout le reste = formule,
ne jamais toucher, sinon on casse le calcul.**

### DAILY REPORT
- Une ligne = un jour, **toute l'année 2026 pré-mappée par date** : ligne 3 = 1er janvier 2026,
  ligne N = 1er janvier + (N-3) jours. Formule : `serial = 46023 + (jour - 1 janvier 2026 en jours)`.
  Ex. ligne pour le 5 août 2026 = ligne 219.
- Colonnes violettes à remplir (aller chercher dans Shopify, jamais inventer) : **Total Orders**,
  **PayPal Order Total**, **PayPal Sales**, **Returns Paypal**, **FB Ads Costs**, **Google Ads
  Costs**, **Pinterest Ads Costs**, **COGS**.
- **Ne remplir que les jours où l'activité a réellement eu lieu** (ne pas remplir le 1er janvier
  2026, l'activité Zooryn n'existait pas encore). Point de départ réel = date du premier vrai
  lancement (Sculpted, 06/06/2026).
- Colonnes automatiques, **NE JAMAIS ÉCRIRE DEDANS** : Total Sales, Net Profit, Net Profit %,
  ROAS, AOV, Fees/Taxes.
- **Vérifié le 05/08/2026 via Shopify direct (GraphQL orders, financial_status:paid) : aucune
  commande PayPal n'a jamais existé sur Zooryn (4 commandes payées au total, toutes
  `shopify_payments`).** Donc colonnes PayPal + taux PayPal dans Fees/Taxes restent à 0/vides.
  Idem Pinterest (jamais utilisé, Meta = seul canal ads Zooryn).

### TESTINGS
- Colonnes violettes à remplir : **Nom du produit**, **Date**, **Statut**, **Total Orders**,
  **FB Ads Costs**, **COGS**, **Total Sales**.
- **Statut = un choix STRICT parmi les 4 valeurs existantes du menu déroulant** (ex. "⏳En cours",
  "🟠 Opti", + les 2 autres à identifier sur place : cut / scaling). **Ne jamais inventer un
  nouveau statut** — sélectionner comme si Roméo cliquait lui-même à la main.
- Colonnes automatiques, **NE JAMAIS ÉCRIRE DEDANS** : Net Profit, Net Profit %, ROAS, AOV,
  Fees/Taxes, et les lignes TOTAL (formules SUM).
- **Historique T1-T5 : PAS besoin de reconstituer jour par jour.** Consigne explicite de Roméo :
  "tu n'es pas obligé de mettre un nombre d'informations énorme, le but c'est que dans le total du
  produit on arrive à voir la perte que j'ai faite, c'est tout." → une seule ligne agrégée par
  ancien testing suffit (total commandes, total dépense FB, total COGS, total ventes), pas un
  historique jour par jour.
- Le nombre de blocs testing à remplir pour l'instant = **5** (T1 Sculpted, T2 protège-tibias,
  T3 matelas, T4 Luma, T5 sac sling), pas la peine de pré-remplir les 11 blocs.

### TESTINGS — gestion des lignes par bloc (actée le 05/08/2026)
Chaque bloc doit avoir **exactement autant de lignes de données que de jours réels du testing**,
suivies immédiatement de sa ligne TOTAL (formule `SUM` sur la plage de lignes du bloc, qui
s'adapte automatiquement si on ajoute/supprime des lignes à l'intérieur du bloc). **Ne jamais
laisser de lignes vides inutilisées entre les données et le TOTAL.**
- **Testing d'1 jour** : 1 seule ligne de données + TOTAL juste en dessous.
- **Testing de plusieurs jours** : une ligne par jour réel, TOTAL juste après la dernière.
- **Pour compacter un bloc** (ex. après une saisie agrégée) : `deleteDimension` (ROWS) sur les
  lignes vides en trop, **du bas vers le haut sur l'ensemble du fichier** (traiter le bloc le plus
  bas en premier) pour ne pas décaler les numéros de ligne des blocs pas encore traités dans la
  même série d'opérations.
- **Pour un futur testing multi-jours** : `insertDimension` (ROWS) juste avant la ligne TOTAL du
  bloc concerné à chaque nouveau jour, saisir la nouvelle ligne, laisser le TOTAL s'auto-étendre.
- **Confirmé le 05/08/2026 : l'onglet TESTINGS n'est référencé par AUCUNE formule ailleurs dans
  le fichier** (ni Annual P&L, ni les onglets mensuels). C'est une vue isolée, indépendante du
  cumul global du P&L (qui lui se base uniquement sur DAILY REPORT). Conséquence : les pertes/gains
  historiques saisis dans TESTINGS (T1-T5) **n'apparaissent nulle part dans le total cumulé
  Annual P&L** tant qu'ils ne sont pas aussi injectés quelque part dans le flux Daily Report /
  dépenses mensuelles (cf. section 5bis).

### COGS CHECK (onglet 3) — **NE PAS TOUCHER pour l'instant**
Utilisé seulement une fois en phase de scaling avec un agent facturé régulièrement. Rien à faire
tant que Zooryn n'y est pas.

### Annual P&L (onglet 4) — **NE PAS TOUCHER, tout est automatique**
Se recalcule entièrement à partir des onglets mensuels et du Daily Report.

### Onglets mensuels (Jan-26 → Dec-26)
- **Tout est automatique SAUF les colonnes Y (Expense Name), Z (Categories), AA (Amount)** —
  c'est le seul endroit à remplir à la main, un par un, pour chaque dépense fixe/abonnement du
  mois (Shopify, TrendTrack, Claude, freelance, partenaire...). Montant **en positif** (le tableau
  le soustrait tout seul du résultat final).
- **Ne jamais y mettre ce qui est dû au fournisseur (COGS)** — le COGS vit uniquement dans
  DAILY REPORT ou TESTINGS, jamais dans les dépenses mensuelles.
- Catégories disponibles (via `SUMIF` sur la colonne Z) : Shopify App, Software/Tools/App,
  Growth Partner (%), Freelance, Services, Other.

## 5. Migration TERMINÉE le 05/08/2026

**Le Sheet "Investissement E-commerce" a été supprimé par Roméo.** Le P&L officiel de la
formation est désormais l'unique outil de suivi budget/profit. Ce qui a été fait :

1. **Sheet ROAS BE & TARGET** (`1QkCJdp5MnCgDyYrBu2KB2diL46pMyjrjx10PyM0sgag`) : ligne de base
   Zooryn configurée dans l'onglet ROAS BE+TARGET.
2. **Sheet P&L** (`1bNuSkdCGIH2jM0whvLOfSoVth8nJwvJe6RsHCF6_C8s`) : Fees/Taxes rempli, historique
   T1-T5 migré dans Testings (une ligne par testing, compactée), abonnements Mai-Août portés dans
   les onglets mensuels, mise en forme conditionnelle rouge/vert posée sur les totaux Testings.
3. **Total réel reconstitué : -2 699,45 €** (subscriptions -2 502,72 € + testings historiques
   -196,73 €, avec les vrais frais PSP/Urssaf déduits — plus précis que l'ancien -2 554,37 €).
4. **Décision Urssaf** : comptée uniquement via l'estimation automatique 6,2 % du CA dans
   Fees/Taxes, jamais de ligne manuelle "cotisation réelle" en plus dans les dépenses mensuelles
   (évite le double comptage).
5. **À partir du 05/08/2026, DAILY REPORT prend le relais au jour le jour** pour tout nouveau
   testing (plus de reconstruction rétroactive — cf. règles d'or section 4bis).

**RapidBundle et Parcel Panel volontairement exclus des abonnements pour l'instant** (à venir,
ne pas les ajouter sans confirmation de Roméo).

## 6. COGS de la veille (routine actée le 13/09/2026)

Roméo demande « combien de COGS hier ? ». Claude calcule, Roméo copie dans DAILY REPORT
colonne I.

1. Lister les commandes du jour (heure de Paris) via la requête de
   `frais-psp-paypal-vs-carte.md`, en ajoutant `lineItems { title quantity }`.
2. Lire les COGS par offre dans le Sheet ROAS BE & TARGET, onglet
   **`CALCULATEUR COGS + PV`** (colonnes Produit / Bundle / COGS / Prix de vente). Toujours
   relire la source, les COGS peuvent changer. État au 13/09/2026 pour PureShot :
   x1 49,99 € → 11,19 € ; x1 + upsell 79,99 € → 15,68 € ; x1 + 3 recharges 59,99 € → 13,26 € ;
   x1 + 3 recharges + upsell (6 recharges) 89,99 € → 18,06 €.
3. Associer chaque commande à son offre par le **contenu** (lineItems), pas seulement par le
   montant (un code promo peut changer le prix).
4. **Compter TOUTES les commandes, dons compris** (tag `don-asso`, commande à 0 €). Le produit
   offert est payé à l'agent, donc son COGS entre dans le total (décision de Roméo le 13/09/2026,
   qui remplace la règle du 12/09 « COGS du don dans les Other charges »). Signaler le don en
   une ligne dans le rendu. Ne pas le remettre aussi dans les Other charges : ce serait un
   double comptage.
5. Offre absente du calculateur (ex. 6 recharges seules à 30 €, #1015) : ~8,33 €, la valeur
   saisie par Roméo le 11/09 (facture Yuri 9,64 $). Le signaler dans la réponse.

Rendu : le total brut, plus le détail en une ligne par offre.
