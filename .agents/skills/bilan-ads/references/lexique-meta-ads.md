# Lexique Meta Ads — définitions de base (formation)

> Source : vidéo "2.1 Explication des termes Meta Ads" (formation Zecom Academy, produit
> "Le plan d'action de 0 à 1k/day"), transcrite localement le 03/08/2026.
> Fichiers source : `livrables/ecommerce/formation/Module 10 - Meta Ads/2.1 Explication des termes Meta Ads/video/`.
>
> Ce fichier complète `baremes.md` : ici les **définitions et la structure** (ce que sont les
> choses), dans `baremes.md` les **seuils de décision** (ce qui est bon/mauvais/quand kill).

---

## 1. Les assets (ce qu'on possède sur Meta)

Structure en poupées russes :

**Profil Facebook** → peut créer un ou plusieurs **Business Manager** → un Business Manager
peut contenir plusieurs **comptes publicitaires (adaccounts)**.

- Dans 95 % des cas : **un seul Business Manager** suffit.
- Au début : **un seul adaccount**. Avec le temps/scaling, on peut en créer plusieurs (pas de
  limite fixe), utile surtout si plusieurs sites ou besoin de diversifier. Pas d'intérêt à en
  multiplier sans raison.
- Le Business Manager, c'est là où se fait tout le paramétrage (accès, pixels, paiements...).
- L'adaccount, c'est là où on lance les campagnes.

---

## 2. Structure d'une campagne publicitaire

**Campagne** → contient un ou plusieurs **adcets** (ensembles de publicités = adsets) → chaque
adcet contient une ou plusieurs **créas** (créatives = publicités).

Raccourci retenu : `adcet = ensemble de pubs`, `créa = publicité`.

Une campagne peut n'avoir qu'un seul adcet avec une seule créa (cas le plus simple), ou
plusieurs adcets avec plusieurs créas chacun.

---

## 3. Les 3 types de campagnes

Ce qui les différencie : **à quel niveau on gère le budget**, Meta décidant ensuite comment le
répartir en dessous.

### CBO — Campaign Budget Optimization
- Budget géré **au niveau de la campagne** (ex. 100 €/jour sur la campagne).
- Meta décide seul combien allouer à chaque adcet, puis à chaque créa à l'intérieur.
- La répartition change d'un jour à l'autre selon ce que l'algorithme juge le plus prometteur.
- Rare que Meta mette 0 € quelque part (en général quelques centimes minimum).

### ABO — Adset Budget Optimization (parfois appelé "adcet budget optimization")
- Budget géré **au niveau de chaque adcet** (on attribue un budget journalier par adcet).
- Meta décide seulement comment répartir ce budget entre les créas **à l'intérieur** de cet adcet.
- Plus un adcet a de créas, plus le budget se dilue entre elles ; un adcet à une seule créa lui
  donne tout le budget qu'on lui a attribué, même si Meta la juge peu performante.

### Advantage+ (ADV+)
- Type de campagne récent. Un seul adcet dans la campagne, qui contient toutes les créas.
- Budget géré au niveau de la campagne (comme le CBO), mais structure encore plus simplifiée
  (un seul adcet possible).
- Tendance de fond : Meta pousse vers des structures de plus en plus simples (on donne budget +
  créas, l'algorithme fait le reste), car plus l'IA de Meta est performante, plus elle a intérêt
  à optimiser à notre place (Meta gagne plus quand on gagne plus, donc qu'on dépense plus).
- Encore peu utilisé dans la pratique de la formation : le CBO et l'ABO restent les plus courants.

---

## 4. Les 7 métriques (KPI) à connaître

Formules et exemples chiffrés donnés dans la vidéo. Les seuils "bon/mauvais" complets sont dans
`baremes.md` (section formation), ici seulement les définitions et calculs.

### 1. ROAS — Return on Ad Spend (retour sur investissement publicitaire)
`ROAS = chiffre d'affaires / budget publicitaire dépensé`
- Exemple : 2 500 € de CA pour 1 000 € de pub → ROAS = 2,5.
- Autre exemple réel (gros compte) : 725 000 € de CA pour 324 000 € dépensés → ROAS ≈ 2,23.
- Plus il est élevé, mieux c'est.

### 2. CPM — Coût pour 1 000 impressions
Combien ça coûte de montrer la pub à 1 000 personnes.
- Ex. : CPM à 7,25 € vs CPM à 22 € → le premier coûte bien moins cher pour la même exposition.
- Plus bas = mieux, **mais** un CPM plus élevé peut valoir le coup si le trafic est plus qualifié
  (plus d'intention d'achat) — à ne jamais lire seul.

### 3. CTR — Click-Through Rate (taux de clic)
`CTR = nombre de clics / nombre de personnes qui voient la pub`
- Ex. : 100 personnes voient la pub, 5 cliquent → CTR = 5 %.
- Plus haut = mieux (plus de monde qui va voir le site).

### 4. CPC — Cost Per Click (coût par clic)
Dépend du CPM et du CTR (calcul dérivé des deux).
- Ex. : CPM 8 € et CTR 2,30 % → CPC 0,35 € ; CPM 15 € (presque le double) avec le même CTR →
  CPC ≈ 0,65 € (presque le double aussi).
- Plus bas = mieux (moins cher pour faire cliquer quelqu'un).

### 5. CPA — Coût par achat
`CPA = budget publicitaire dépensé / nombre de commandes`
- Ex. : 2 500 € dépensés pour 45 commandes → CPA = 55,56 €.
- À budget égal entre deux campagnes, celle qui génère le plus de commandes a le CPA le plus bas
  → elle est plus efficace.
- Plus bas = mieux (coûte moins cher d'acquérir un client).

### 6. Coût par ATC — Add To Cart (ajout au panier)
`Coût ATC = budget publicitaire dépensé / nombre d'ajouts au panier`
- Ex. : 1 000 € dépensés pour 90 ATC → coût ATC = 11,11 €.
- Sert à comparer l'efficacité de deux adcets à budget égal (celui qui génère le plus d'ATC pour
  le même montant est le plus performant sur le haut/milieu de tunnel).
- Plus bas = mieux.

### 7. AOV — Average Order Value (panier moyen)
`AOV = chiffre d'affaires / nombre de commandes`
- Ex. : 1 000 € de CA pour 20 commandes → AOV = 50 €. Le même CA pour 35 commandes → AOV = 28,57 €
  (moins bien : plus de clients mais paniers plus petits pour le même CA généré).
- Plus haut = mieux, en général.

---

## 5. Principe retenu de la vidéo : "Profit first"

Chaque métrique prise isolément peut induire en erreur (ex. : un CPM plus bas n'est pas forcément
mieux si personne n'achète, un CPM plus élevé peut être rentable si le trafic est qualifié). Il
faut toujours lire les métriques **ensemble**, jamais une seule isolément.

**La métrique qui prime sur toutes les autres reste le profit.** Faire baisser le CPC ou le CPM
est utile, mais l'objectif final est de faire du cash, pas d'optimiser une métrique de vanité.
