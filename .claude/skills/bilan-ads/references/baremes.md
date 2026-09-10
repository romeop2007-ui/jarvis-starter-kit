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
> Source complémentaire (section 2) : vidéo "1.4 Analyse et prise de décision en phase de testing"
> (3 exemples chiffrés commentés) + board Miro officiel "Analyse résultats testing CBO - Zecom
> Academy" (accès direct via MCP Miro depuis le 05/08/2026, mêmes scénarios en visuel).
> Source complémentaire (section 3) : vidéo "3.1 Phase d'optimisation, quoi optimiser" (4 exemples
> chiffrés commentés) + board Miro officiel "Phase d'OPTI (où est le pb) - Zecom Academy" (mêmes
> 4 exemples en visuel, texte identique au mot près).
> Source complémentaire (section 3bis) : vidéo "4.1 Problème côté site, les 3 cartouches" —
> pas de board Miro dédié trouvé à ce jour (05/08/2026), contenu 100% oral.
> Source complémentaire (section 3ter) : vidéo "5.1 Problème côté ads, les 3 cartouches" —
> contenu 100% oral, capture annoncée par Roméo mais pas encore reçue au moment de l'intégration
> (05/08/2026), à compléter si elle arrive.

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
| ✅ 2 | 0 vente MAIS CPC < 1 € | Jour validé, on continue |
| ❌ 3 | 0 vente ET CPC > 1 € | **CUT** |

> ⚠️ Correction du 05/08/2026 (vidéo "1.4 Analyse et prise de décision en phase de testing" +
> board Miro officiel "Analyse résultats testing CBO") : c'est un **seuil absolu** de CPC (1 €),
> pas une variation. Le board écrit "CPC -1€ / CPC +1€" en raccourci visuel pour "< 1€" / "> 1€" ;
> la vidéo le confirme sans ambiguïté à l'oral avec des exemples chiffrés (0,40 / 0,70 / 0,90 €
> tous "inférieurs à 1€" → jour validé). L'ancienne formulation ("CPC en baisse/hausse de 1€",
> lue comme une variation) était une erreur d'interprétation au moment de l'intégration du PDF
> le 13/07/2026.

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
Exemple chiffré du PDF/vidéo (partant d'un cut technique à 48h, cf. 2bis) : 72h (150€) 🟠 ROAS 1,53
→ 4j (200€) 🟠 ROAS 1,63 → 6j (300€) ✅ ROAS 2,49 → phase de scaling.

> Note d'évolution : ce framework REMPLACE l'ancienne règle simplifiée "journée non rentable → kill
> immédiat" utilisée sur les tests T1-T5 (pré-formation). Il est plus patient : un J1 sans vente mais
> avec un CPC sain n'est plus un motif de kill.

---

## 2bis. Marge de discrétion et philosophie du plan (vidéo "1.4 Analyse et prise de décision en
phase de testing", commentaire oral du formateur, absent du PDF/Miro qui ne montrent que le
résultat écrit des grilles)

**Les paliers de spend sont approximatifs, pas des seuils au centime près.** Si l'analyse tombe à
95-97 € au lieu de 100 €, ou à 110-120 € au lieu de 100 €, ou qu'on n'a pas pu analyser pile au bon
moment et qu'on a dépensé 20-25 € de plus que prévu, ce n'est pas grave : on reste dans la tranche
et on prend quand même la décision sur cette base. Meta ne dépense jamais exactement le budget fixé,
c'est toujours une approximation.

**Le plan est un guide, pas une loi rigide — mais seulement une fois qu'on a de l'expérience.** Le
formateur est explicite : "si vous êtes vraiment débutant intermédiaire, vous n'avez toujours pas
fait vos premiers 1-2 K/day, suivez le plan à la lettre." Mais il donne un contre-exemple assumé
(l'Exemple 3 du PDF/Miro, celui qui affiche officiellement CUT ❌ à 48h avec ROAS 0,72) : le coût
par ATC y est excellent (7,40 € contre un seuil de 12,50 €), signe d'une vraie traction (beaucoup de
monde ajoute au panier) même sans vente. Dans ce cas précis, le formateur dit que lui-même aurait
laissé tourner 50 € de plus avant de couper officiellement, plutôt que d'appliquer le CUT à la
lettre — c'est cette décision qui donne l'"Exemple étendu"/"Exemple 3 bis" (qui finit par scaler à
300 €, cf. section 2). **Ce n'est pas une règle chiffrée à appliquer systématiquement** (le
formateur dit lui-même "les deux décisions sont possibles, ça dépend de votre trésorerie, de votre
expérience"), plutôt une invitation à ne pas couper de façon 100% mécanique quand un signal fort
(ATC très bas) contredit le CUT du ROAS — et à ne pas se sentir obligé de le faire non plus.

**Pourquoi on coupe tôt par défaut (rationale, pas juste la règle).** Un produit peut toujours finir
par "péter" si on s'acharne assez longtemps et qu'on dépense assez. Mais on ne sait jamais à l'avance
combien de temps ni combien d'argent ça prendrait. En dropshipping débutant, la trésorerie est
limitée : chaque jour de spend non rentable avant d'atteindre le seuil de rentabilité, c'est de la
trésorerie qui fond sans garantie de retour. Mieux vaut couper un produit trop loin de la vérité dès
le début et passer au suivant (qui a statistiquement plus de chances d'être proche de la rentabilité)
plutôt que de s'entêter à l'aveugle. C'est la même logique cash-first que la doctrine SOP "on
n'achète pas de qualité avant d'avoir prouvé la demande" (05/08/2026, cf. mémoire dédiée).

---

## 3. Phase d'OPTIMISATION — diagnostiquer ads vs fiche produit (formation, framework officiel)

**On entre en phase d'optimisation à partir de 200 € de spend (fin du testing), quand le ROAS est
entre ROAS TARGET et ROAS -20 % de perte (zone 🟠, cf. section 2).** Avant ce seuil, le testing n'est
pas terminé, on n'y est pas encore.

**Pourquoi optimiser plutôt que couper tout de suite (rationale du formateur, vidéo 3.1) :** à ce
stade, dans le pire cas on perd très peu d'argent, dans le meilleur cas on est déjà rentable ou proche
du break-even — quelques modifications ciblées du funnel peuvent suffire à faire basculer un produit
de non-rentable à très rentable. Continuer à dépenser dans cette zone ne fait pas fondre la trésorerie
de façon significative, donc autant se laisser une chance de le faire exploser plutôt que de couper
un produit qui montre déjà un peu de traction.

**⏳ Règle des 3 cartouches maximum.** On se laisse **3 tentatives d'optimisation** (3 "cartouches",
= 3 changements/tests successifs) pour tenter de faire décoller le produit. Si après ces 3 cartouches
le produit n'a toujours pas explosé, on passe au produit suivant, point final — même si c'est le
premier produit qui a montré un peu de traction et que ça fait mal d'arrêter. Rationale : n'importe
quel produit peut théoriquement finir par scaler avec assez de temps et d'ajustements, mais on ne
sait jamais à l'avance combien de temps ça prendra ; s'entêter sur un seul produit coûte plus cher
en opportunité (temps + argent) que de couper à 3 essais et de retenter un produit neuf qui a
statistiquement plus de chances d'être proche de la rentabilité dès le départ.

Pour identifier la source du problème AVANT de décider quoi optimiser, deux étapes croisées :

**Étape 1 — CPC sur l'ad account :**
- CPC > 0,70 € → le problème vient (certainement) **des ads**
- CPC < 0,70 € → le problème vient (certainement) **de la fiche produit**
- ⚠️ Seuil valable pour les **marchés européens** (France, Espagne, Italie, Pays-Bas, Allemagne...).
  Sur des marchés anglophones (UK, US, Canada), revoir ce seuil à la hausse.

**Étape 2 — Analytics Shopify :**
- CVR < 2 % ET taux ATC < 8 % → problème **fiche produit**
- CVR > 2 % ET taux ATC > 8 % → problème **ads**
- Précision terminologique (vidéo 3.1) : le **CVR** de cette grille, c'est le **taux de paiement
  initié** dans les analytics Shopify (Conversion Rate), pas le taux de conversion final panier→achat.

**⚠️ Ces seuils ne sont pas des certitudes à 100 %, juste des probabilités fortes ("certainement",
pas "sûrement").** Contre-exemple assumé par le formateur lui-même : un CPC de 1,50-1,60 € (2x le
seuil, énorme sur un marché EU) sur 40 000 € de spend, avec un ROAS de 3, largement rentable. Un
chiffre isolé qui a l'air mauvais ne veut pas dire que le produit ne marche pas ; on lit toujours au
global, jamais une métrique seule.

Lecture croisée des deux étapes, 4 configurations rencontrées dans les exemples officiels (vidéo +
board Miro "Phase d'OPTI (où est le pb)", chiffres identiques au board au centime près) :

| Exemple | CPC | Taux ATC | CVR (paiement initié) | Diagnostic | Action |
|---------|-----|----------|------------------------|------------|--------|
| 1 (ROAS 1,83, spend J+4) | 0,61 € ✅ | 6,60 % ❌ | 0,94 % ❌ | Fiche produit | On retravaille l'offre (prix, bundle, angle, preuve sociale) |
| 2 (spend 225 €) | 1,18 € ❌ | 9,45 % ✅ | 2,12 % ✅ | Ads | On rajoute des ads (nouvelles créatives), on ne touche pas à l'offre |
| 3 (ROAS 1,33, spend 212 €) | 0,83 € ❌ | ~12 % ✅ | 1,41 % ❌ | **Ambigu (1 bon, 2 mauvais partagés)** | **Cas particulier, voir ci-dessous** |
| 4 (ROAS 2,68, spend 212 €) | 0,83 € ❌ | <8 % ❌ | 2,92 % ✅ | Ads (un peu plus) | On ne touche PAS l'offre (le CVR la valide déjà), on rajoute juste des ads |

**Cas ambigu (Exemple 3) : quand les indicateurs sont vraiment partagés, on cumule les deux
premières actions au lieu de trancher.** Ici, l'ATC est excellent (~12 %, les gens ajoutent
massivement au panier) mais le CVR s'effondre à l'étape de paiement (1,41 %) ET le CPC est dégradé :
aucun côté n'est clairement validé ni clairement fautif. Plutôt que de forcer un diagnostic, le
formateur applique **la première cartouche côté ads (rajouter des ads) ET la première cartouche
côté site (changer l'offre) en même temps**, sur cette seule cartouche. Logique : le trafic clique
un peu cher mais pas de façon délirante (peut-être mal qualifié pour l'achat, bien qualifié pour
l'ajout panier), et l'offre fait ajouter au panier mais ne convainc pas de payer — les deux pistes
sont plausibles à la fois, donc on ne se prive d'aucune des deux.

⚠️ Le CVR et le taux ATC de cette grille se lisent dans **les analytics Shopify**, pas dans Meta
(hors périmètre du MCP Facebook Ads → demander à Roméo ou recouper via le connecteur Shopify).

---

## 3bis. Problème côté SITE — le détail des 3 cartouches (vidéo "4.1 Problème côté site")

**Cadrage 80/20 : "problème côté site" veut dire "problème de la fiche produit", pas du site en
général.** 80-90 % des visiteurs qui arrivent sur la fiche produit ne se baladent jamais ailleurs
sur le site (home, à propos...) : soit ils achètent, soit ils repartent depuis cette page. Donc
100 % de l'effort d'optimisation "côté site" se concentre sur la fiche produit, jamais sur la home
ou les pages annexes.

**⚠️ Fenêtre d'analyse différente de la phase de testing : après chaque cartouche, on juge
uniquement sur les 2-3 jours DEPUIS le changement, pas sur le spend cumulé depuis le lancement de
la campagne.** On laisse tourner 2-3 jours de spend après chaque changement, puis on analyse
seulement cette fenêtre glissante. Après chaque cartouche : si le ROAS dépasse le ROAS TARGET →
**scaling**, on sort de la phase d'optimisation. Si toujours entre TARGET et TARGET -20 %, ou si ça
s'est dégradé → cartouche suivante.

| Cartouche | Actions | Détail |
|-----------|---------|--------|
| **1** | Changer l'offre | L'offre est l'élément de la fiche produit qui a le plus d'impact sur le taux de conversion — c'est ce qui débloque le plus souvent la situation. **Pas d'A/B test, on change directement.** Exemple : bundle x1/x2/x3 → repasser sur x1 seul / 2 acheté 1 offert / 3 acheté 2 offerts (ou retirer carrément l'offre 3). Catalogue complet des types d'offres à tester : `references/meilleures-offres.md`. |
| **2** | Re-changer l'offre + rajouter 3-4 nouvelles créatives | Une 2e config d'offre différente. On rajoute des créas même si le problème est "côté site" car les ads influencent la qualité/le profil du trafic amené : une nouvelle créa peut ramener une audience plus encline à convertir sur la nouvelle offre. Sourcing des créas : piocher dans les meilleures créas déjà repérées chez le même concurrent mais pas encore lancées ; à défaut, redescendre un peu le seuil de reach sur ce concurrent (ex. 500k → 380k) ; à défaut, chercher un nouveau concurrent (TrendTrack, autres spy tools). |
| **3 (dernière, "big swing")** | Changer l'offre (3e config) + 1ère image du carrousel + copywriting au-dessus du bouton ATC + copywriting de la 1ère section sous le bouton ATC + 3-4 nouvelles créatives | Grand changement. Au-dessus du bouton ATC : bullet points, éventuellement le titre du produit lui-même (ex. titre "bénéfice" → titre descriptif classique, ou l'inverse). Sous le bouton ATC : uniquement la 1ère section (titre + texte, nouveau bénéfice mis en avant, ChatGPT en copilote copywriting) — inutile d'aller plus bas, peu de monde scroll toute la page. Catalogue des types de 1ère image de carrousel à tester : `references/premiere-image-carousel.md`. |

**Si toujours pas d'explosion (ou dégradation) après la cartouche 3 → CUT, produit suivant. On ne
tente pas de 4e cartouche.**

**Assouplissement de la règle des 3 cartouches (nuance importante, complète la règle stricte de la
section 3) : si le produit est déjà rentable mais pas encore au niveau de marge cible** (ex. 10-18 %
de marge nette, proche des 20 % visés), **on peut continuer au-delà des 3 cartouches** — retenter un
changement d'offre, rajouter des créas — car le produit est déjà proche de scaler et peut parfois
s'auto-optimiser avec quelques jours de plus. **En revanche, si le produit est break-even ou pas
encore rentable** (y compris une petite marge du type 5 %, traitée comme équivalente au break-even),
**on ne tente même pas une cartouche de plus : next product direct.**

**Un produit optimisé sans succès n'est pas mort définitivement.** Il peut être relancé plus tard
(2, 3, 6 mois après) et parfois surprendre positivement (nouveau contexte marché, nouvelles
audiences Meta, produit redevenu tendance). Pas une priorité immédiate, mais à garder en tête pour
le pipeline de Zooryn plutôt que de considérer un produit optimisé-mais-cut comme définitivement
mort.

---

## 3ter. Problème côté ADS — le détail des 3 cartouches (vidéo "5.1 Problème côté ads")

**Même structure générale que 3bis (fenêtre d'analyse de 2-3 jours DEPUIS chaque changement, pas le
spend cumulé ; même sourcing des créas : top créas du concurrent non encore lancées → seuil de reach
redescendu sur ce concurrent → nouveau concurrent via Calodata/TrendTrack/Spybox).** La différence
avec 3bis : ici l'accent porte sur les ads, avec un diagnostic intermédiaire propre à Meta qui
n'existe pas côté site.

| Cartouche | Actions | Détail |
|-----------|---------|--------|
| **1** | Rajouter 3-4 nouvelles créatives dans la CBO déjà lancée | Simple ajout dans la même structure existante. |
| **2** | Diagnostic + (rajouter 3-4 créas, même CBO ou nouvelle CBO) + re-changer l'offre | Voir le diagnostic ci-dessous pour choisir même CBO vs nouvelle CBO. On rechange aussi l'offre en parallèle : même si le problème est identifié "côté ads", l'offre reste le levier n°1 sur la conversion, et la fiche produit n'est pas forcément optimale juste parce qu'elle n'est pas la cause principale. |
| **3 (dernière, "big swing")** | Rajouter 3-4 créas (même CBO ou nouvelle CBO) + re-changer l'offre (3e config) + changer la 1ère image du carrousel + copywriting au-dessus du bouton ATC + copywriting de la 1ère section sous le bouton ATC | Mêmes actions que la cartouche 3 de 3bis, cumulées avec le volet ads. |

**⚠️ Diagnostic propre aux ads, à faire avant la cartouche 2 (nouveau, absent du côté site) : est-ce
que la même créative du testing initial continue de prendre tout le spend malgré l'ajout de
nouvelles créas en cartouche 1, avec des résultats moyens ?**

Exemple donné : sur 5 créas lancées au testing, la créa n°2 monopolise tout le spend avec un ROAS
1,6 alors que le ROAS TARGET est à 2,1 (loin du compte). Après la cartouche 1 (3-4 créas
supplémentaires dans la même CBO), c'est toujours la créa n°2 qui domine avec des résultats moyens.
**Deux options dans ce cas :**
1. **Couper la créative dominante de la CBO** et la remplacer par les nouvelles créas de la
   cartouche 2, dans la même CBO.
2. **Laisser tourner la CBO actuelle en l'état** (tant qu'elle n'est pas en perte, ou seulement en
   légère perte, pas grave de la laisser vivre) **ET lancer une toute NOUVELLE CBO en parallèle**
   avec les nouvelles créas de la cartouche 2 (et éventuellement celles de la cartouche 1 aussi, en
   les retirant de la 1ère CBO pour les basculer dans la 2e) — repartir **comme un testing de zéro,
   50 €/jour**, et observer.

**Point rassurant sur l'option 2 (nouvelle CBO) :** si le funnel de base a déjà une cohérence (le
produit est break-even ou proche, pas en perte totale), une nouvelle CBO donne rarement des
résultats catastrophiques. Ça vaut le coup de tenter, ce n'est pas reparti de rien.

**Si Meta ne reste PAS bloqué sur l'ancienne créature** (les nouvelles créas de la cartouche 1
captent déjà du spend dès le lendemain de leur ajout) → pas besoin de ce diagnostic, on continue
simplement dans la même CBO, Meta explore normalement les nouvelles créas.

**Nuance sur la dernière section (copywriting sous le bouton ATC), cartouche 3 :** si cette section
est difficile à changer avec profit (ex. 3 vidéos témoignages déjà traduites), **on peut la laisser
telle quelle, ce n'est pas grave** — elle a un poids secondaire comparée aux éléments au-dessus du
bouton ATC (bullet points, titre). Pas obligatoire, contrairement au reste de la cartouche 3.

**Fin de cartouche 3 : même règle d'assouplissement/CUT qu'en 3bis** (marge 10-18% proche du
target → on peut laisser tourner quelques jours de plus ; break-even/perte → CUT direct, next
product). **Note humaine du formateur, à garder en tête pour accompagner Roméo le moment venu** :
il reconnaît explicitement la difficulté psychologique de couper un premier produit qui montrait un
peu de traction après 6 à 10 jours et plusieurs cartouches de changements — la règle reste la même
malgré l'attachement (« il n'a pas envie de péter, il n'a pas envie de péter »), on coupe et on
avance. Produit relançable plus tard si le contexte marché change.

---

## 4. Phase de SCALING — pilotage du budget (vidéo "1.2 Testing validé - phase de scaling",
Module 12, intégrée le 10/09/2026 — remplace et précise l'ancienne version de cette section)

Entrée en scaling : campagne validée (ROAS ≥ ROAS TARGET avec **au moins 200 € de spend**, jamais
avant, même avec un excellent ROAS sur 100 € — trop peu de data, souvent de la chance). La décision
se prend sur **deux vues : les 3 derniers jours (glissant) + le dernier jour isolé.**

| Scénario | Condition (vue 3 jours) | Condition (dernier jour) | Décision |
|----------|------------------------|--------------------------|----------|
| ✅ 1 | ROAS > ROAS TARGET | ROAS > ROAS BE | **Scaler le budget** (palier suivant) |
| 🟠 2 | ROAS > ROAS TARGET | ROAS < ROAS BE | **Ne pas toucher** (un mauvais jour arrive, pas de panique) |
| 🟠 3 | ROAS dans le RANGE TARGET (15-20 % de marge) | — (peu importe, on ne regarde même pas) | **Ne pas toucher** |
| ❌ 4 | ROAS < RANGE TARGET (< 15 % de marge, ou perte) | — | **Déscaler** (palier inférieur) |

**⚠️ Paliers de scaling vertical — CORRECTION du 10/09/2026, VÉRIFIÉE sur le board Miro source
("SOP Media Buying petit budget META - Zecom Academy", consulté via le connecteur Miro).**
L'ancienne version de cette section indiquait `100 → 200 → 300 → 400 → 500 → 700 → 1000 → 1500`,
qui ne correspond ni à l'audio ni au board. **Ce qui est confirmé par le board (exemples concrets
suivis pas à pas, texte identique à l'écran)** : progression par tranches de **+50 €** au moins
jusqu'à 200 €/j (50→100→150→200), avec la possibilité explicite de **sauter un palier** si le ROAS
est excellent (le board donne l'exemple d'un saut direct à 250 €/j depuis 200 €/j). **Au-delà de
250 €/j, ni l'audio ni le board consultés ne donnent d'exemple concret vérifiable** — la
transcription orale évoque ensuite des tranches de +100 € jusqu'à 500 €, puis +200 € jusqu'à 700 €,
puis une valeur de fin peu claire ("1000 €" probable, "2000 €" selon la transcription automatique,
**à ne pas utiliser telle quelle**). **Ne pas traiter la suite au-delà de 250 €/j comme vérifiée** —
au moment de scaler au-delà, redemander confirmation à Roméo ou revérifier au board/à la vidéo.
**On garde la structure CBO + 1 ad set + toutes les créas dedans jusqu'à environ 1,5 K/day de CA**,
sans y toucher niveau structure (juste le budget) — passé ce cap, d'autres techniques (hors scope
ici) deviennent possibles.

**Marge de manœuvre sur les paliers** : ce ne sont pas des règles absolues. Si un palier casse tout
(ex. 50→100 € ne passe pas alors que 50 € était très rentable), on peut chercher un palier
intermédiaire (70 €) et s'y stabiliser. À l'inverse, si le ROAS est très largement au-dessus du
TARGET (>35-40 % de marge, cf. l'exemple vérifié du saut 200→250 €), on peut sauter un palier
plutôt que suivre la progression à la lettre — c'est explicitement illustré sur le board, pas
seulement une extrapolation.

### Idées fausses à débunker (formateur, explicitement)

- **"Ne jamais augmenter le budget de plus de 20 % à la fois" — FAUX sur petit budget.** La règle du
  20 % a du sens sur de très gros comptes (2000 €/j → pas direct à 4000 €/j), mais sur 50-500 €/j les
  paliers ci-dessus dépassent largement 20 % (doubler 50→100 par ex.) et ça ne pose aucun problème.
- **"Augmenter le budget rapidement casse l'optimisation Meta/la créa/la campagne" — FAUX.** Si un
  palier ne passe pas, ce n'est pas parce qu'on l'a "cassé", c'est que cet asset (créa/ad set/campagne)
  n'a tout simplement pas le potentiel de scaler plus haut — ça fait partie du jeu, toutes les créas
  n'ont pas le même plafond. **Ne jamais réagir à une seule mauvaise journée après une hausse de
  budget** : toujours réanalyser sur les 3 derniers jours avant de redescendre en panique.

### Si une nouvelle créa ajoutée dans la CBO fait chuter le ROAS global

Meta peut réallouer tout le spend vers une créa neuve qui ne convertit pas, au détriment de
l'ancienne créa qui performait. **Attendre 3 jours complets** avant de conclure (pas une seule
journée) : si le ROAS reste mauvais sur les 3 jours, couper les nouvelles créas fautives. Si ça
persiste, créer une **nouvelle CBO à 50 €/j dédiée aux nouvelles créas** (mini-testing de 5-6 créas à
la fois), plutôt que de les renvoyer dans la CBO qui gagne déjà.

### Si on plafonne malgré 20-25 créas envoyées (impossible de percer un plafond de CA)

1. Nouvelle CBO à 50 €/j, tester un nouveau lot de créas (comme un testing classique). Si ça ne
   prend toujours pas :
2. **Changer l'offre drastiquement** (PAS d'A/B test — pas assez de volume à ce stade). Cibler en
   priorité tout ce qui est **"above the fold"** (au-dessus du bouton Ajouter au panier) : 1ère image
   du carousel (le plus gros impact sur le taux de conversion), bullet points/bénéfices, offre
   commerciale (prix, structure de bundle). Laisser tourner 2-3 jours et réévaluer.
3. Si toujours rien, **changer l'offre une 2e fois** (l'offre = le levier avec le plus d'impact sur
   les résultats).
4. Si toujours rien, se laisser **une dernière cartouche** (nouvelles créas + nouveau changement
   d'offre), exactement comme la phase d'optimisation initiale (3 cartouches, cf. section 3).
5. Si ça ne marche toujours pas → **déscaler à budget minimal, laisser tourner en fond tant que
   rentable, réorienter le focus sur un autre produit.** Le produit n'est pas mort, juste mis en
   retrait — possibilité d'y remettre du focus plus tard si les conditions changent.

**Règle de sortie inchangée** : si on retombe une **2e fois** en scénario 4 alors qu'on est déjà
redescendu au budget minimum (50 €/j) → **on coupe la campagne**. Retour en phase d'optimisation avec
**3 nouvelles cartouches créatives**, sinon → produit suivant (NEXT PRODUCT).

### Mindset (formateur, explicite) : le profit avant le dashboard

**Ne jamais maintenir un niveau de CA qui n'est plus rentable par ego.** Mieux vaut 1 000 €/j de
profit à "3K/day" de CA que 500 €/j de profit à "6K/day" — c'est le profit qui compte, pas la taille
du chiffre affiché. Le formateur signale un piège classique : une fois qu'on a montré un gros
dashboard publiquement (ex. Twitter/X), l'ego rend difficile d'accepter de redescendre le budget même
quand ce n'est plus rentable. **Descaler sans hésiter dès que la rentabilité n'y est plus, peu importe
l'image que ça renvoie.**

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
