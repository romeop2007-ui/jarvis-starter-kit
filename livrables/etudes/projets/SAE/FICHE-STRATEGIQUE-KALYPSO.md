# FICHE STRATÉGIQUE — SIMULATION KALYPSO (SAÉ BUT GEA)

> Fiche opérationnelle créée par Jarvis (chef de projet du groupe) pour être rechargée le jour J.
> Source : `Livret joueur.pdf` (règles du jeu) + `IDENTITE VISUELLE.docx` (volet branding).
> But : maîtriser le jeu sur le bout des doigts et piloter les décisions trimestre par trimestre.
>
> ⚠️ **À COMPLÉTER LE JOUR J** : la grille de notation (sur quoi le groupe est noté). Roméo la transmettra. C'est ce qui oriente l'allocation d'efforts. À traiter en priorité #1 dès qu'on la reçoit.

---

## 0. LE PROJET EN UNE PHRASE

Simulation de gestion **Kalypso** (éditeur ARKHÉ International) : on dirige une **SA au capital de 2 000 000 €** qui **fabrique et vend des bateaux de pêche/plaisance**, en **concurrence directe avec les autres équipes** de la classe. Projet sur **3 jours**, équipe de **4** (Roméo + 3 camarades), Jarvis = 5e homme / cerveau / chef de projet.

**Mécanique centrale** : décisions prises **en début de chaque trimestre**, sur une **feuille de décisions remplie au stylo rouge**, reconduites identiquement sur les 3 mois du trimestre. On part de l'état au **31/12 de l'année 0**.

**Greffe pédagogique** (hors moteur du jeu, probablement notée à part) :
- **Identité visuelle** : trouver un nom de marque + logo.
- **Internationalisation Espagne** : recruter un commercial (fiche de poste en espagnol fournie en annexe) + **elevator pitch** (oral à préparer, 3 articles imposés).

---

## 1. PRODUCTION — ce qu'on fabrique et avec quoi

### Les 3 bateaux
| Bateau | Profil | Plastique | Bois | HTM Moulage | HTM Finition |
|--------|--------|-----------|------|-------------|--------------|
| **A** | Simple, pêche, 4 m | 0,20 t | 0,10 m³ | 8,00 | 10,00 |
| **B** | Promenade, cabine 2 pers, 5,50 m | 0,40 t | 0,20 m³ | 12,00 | 14,00 |
| **C** | Luxe, 8 m, 2 cabines | 1,00 t | 0,50 m³ | 28,00 | 28,00 |

> Process : atelier **moulage** (coques plastique → en-cours "bêta") puis atelier **finition** (ajout bois + fournitures → produit fini). On peut abandonner/reprendre un bateau à chaque trimestre. On peut commercialiser **0 à 3 types** (un prix de vente nul = bateau non commercialisé).

### Capacité des ateliers (au 31/12/00)
| Atelier | Robots | Capacité/robot | **Capacité totale/mois** |
|---------|--------|----------------|--------------------------|
| Moulage | 4 | 200 HTM | **800 HTM/mois** |
| Finition | 6 | 200 HTM | **1 200 HTM/mois** |

**Production max théorique par mois (si un seul modèle, capacité actuelle) :**
- 100 % A → moulage limite à **100 A** (800/8), finition OK (1200/10=120). **Goulot = moulage.**
- 100 % B → moulage limite à **66 B** (800/12), finition (1200/14=85). **Goulot = moulage.**
- 100 % C → moulage limite à **28 C** (800/28), finition (1200/28=42). **Goulot = moulage.**

➡️ **Le MOULAGE est le goulot d'étranglement.** Toute la programmation de production se cale dessus. Si on veut plus de volume, on achète des robots de moulage en priorité.

### Robots (investissement)
- Achat en début de trimestre, opérationnel immédiatement. Facturé/payé le mois de l'acquisition.
- Valeur unitaire : **75 000 € HT** par robot (moulage : 300 000/4 ; finition : 450 000/6).
- Revente possible au fournisseur : reprise forfaitaire ≈ **1/4 de la valeur d'acquisition** (~18 750 €), quel que soit l'âge → **la revente est punitive**, on n'achète pas à la légère.
- Pas de cession de robots entre entreprises.
- Amortissement linéaire **60 mois**.

### Coûts de production
- **Variables** : coût des HTM → **25 €/HTM moulage**, **35 €/HTM finition**.
- **Fixes** : entretien robot **2 000 €/robot/mois** (les 2 ateliers) ; entretien atelier **4 000 €/mois moulage**, **3 000 €/mois finition** ; + amortissements.
- Entretien = 10 % consommables + 90 % services extérieurs de maintenance.

### Coût de revient unitaire (matières + HTM, hors fixes) — repères
- **A** : plastique 0,20×~4200 + bois 0,10×~1450 + (8×25 + 10×35) = 840 + 145 + (200+350) = **~1 535 €**
- **B** : 0,40×4200 + 0,20×1450 + (12×25 + 14×35) = 1680 + 290 + (300+490) = **~2 760 €**
- **C** : 1,00×4200 + 0,50×1450 + (28×25 + 28×35) = 4200 + 725 + (700+980) = **~6 605 €**

> (Repère "coût direct". Le coût complet ajoute les fixes répartis. Stock produit fini C au départ valorisé 8 094 €/unité, ce qui confirme l'ordre de grandeur fixes compris.)

---

## 2. APPROVISIONNEMENT — matières premières

### Fournisseurs (qualité identique, on arbitre prix vs délai de paiement)
| Matière | Fournisseur | Prix | Délai paiement |
|---------|-------------|------|----------------|
| Plastique | P1 | 4 100 €/t | Comptant |
| | P2 | 4 200 €/t | 1 mois |
| | P3 | 4 300 €/t | 2 mois |
| Bois | B1 | 1 300 €/m³ | Comptant |
| | B2 | 1 450 €/m³ | 1 mois |
| | B3 | 1 600 €/m³ | 2 mois |

**Règles clés :**
- Contrat **trimestriel** : on ne change de fournisseur qu'en janvier/avril/juillet/octobre. Quantité commandée = même pour les 3 mois.
- **Décalage de livraison : commande du mois M livrée en M+1.** (Janvier commandé → livré février ; mars → livré avril = trimestre suivant). Donc en janvier on reçoit la commande de décembre.
- Facturation/compta à la livraison. Délai de paiement court à partir de la livraison.
- Sorties de stock valorisées au **CUMP** (coût unitaire moyen pondéré).
- Possibilité d'acheter/vendre aux **concurrents ou animateurs** (prix librement négocié, paiement comptant/30/60/90 j) pour éviter les ruptures.

**État de départ (31/12/00) :**
- Stock : **53,40 t plastique** à 4 200 €/t (224 280 €) ; **61,70 m³ bois** à 1 449,99 €/m³ (89 464 €).
- Commande de décembre déjà passée (livrée en janvier) : **30 t plastique + 20 m³ bois** chez P2/B2.

**Arbitrage stratégique appro** : comptant = moins cher mais pèse sur la trésorerie ; délai 1-2 mois = +2 à +5 % sur le prix mais soulage la tréso. Au démarrage, si tréso tendue → privilégier le délai. Si tréso confortable → comptant pour la marge.

---

## 3. COMMERCIALISATION — les 4 armes

### Deux débouchés
1. **Marché concurrentiel des revendeurs** (le classique) : ventes réalisées par les représentants. Concurrence par prix/pub/force de vente/délai.
2. **Sous-traitance** : vendre directement des bateaux à une entreprise concurrente (prix/quantité/délai négociés de gré à gré, en début de trimestre). Pas de commission représentant. Ventes négociées **prioritaires** sur le marché concurrentiel.

### Arme 1 — FORCE DE VENTE
- Départ : **7 représentants**, indice salarial **100** (= 1 700 € brut/mois), commission **8 % du CA** (versée le mois suivant : COMm = Taux × CA(m-1)).
- Embauche/licenciement en début de trimestre. **Licenciement = indemnité de 3 mois de salaire** (coûteux, on évite les yo-yo).
- Effet quantitatif (nombre → coefficient d'attractivité) + qualitatif (rémunération → compétence/motivation/image).
- Pas besoin de représentants si on ne fait QUE de la sous-traitance.

### Arme 2 — PUBLICITÉ
- **Pub de marque** (le client connaît la marque) : ~**12 000 €/mois** en moyenne.
- **Pub spécifique** par bateau : moyennes ~**1 000 € (A)**, **1 200 € (B)**, **5 000 € (C)** /mois.
- Budgets fixés par trimestre. Efficacité liée au montant.
- **Choisir 2 axes de communication** parmi : prix, confort à bord, résistance des coques, esthétique. (À aligner avec le positionnement produit : C = confort/esthétique, A = prix, etc.)

### Arme 3 — PRIX DE VENTE
- Fixé par trimestre, figure au catalogue. Prix nul = bateau non commercialisé.
- **L'arme la plus puissante.** À caler sur l'étude Markinform "effet prix de vente" (prix attendus par les revendeurs).

### Arme 4 — DÉLAI DE PAIEMENT CLIENT
- Comptant / 30 j / 60 j / 90 j. Identique pour tous les clients, non modifiable en cours de trimestre.
- Délai long = plus attractif commercialement MAIS pèse sur la trésorerie + risque d'impayés.

---

## 4. ADMINISTRATION & FINANCE

### Personnel administratif (départ 31/12/00)
| Catégorie | Effectif | Indice |
|-----------|----------|--------|
| A : direction | 1 | 450 |
| B : cadre | 2 | 240 |
| C : employé | 5 | 110 |

- Indice 100 = 1 700 € brut/mois.
- Qualité du service = **quantitatif** (masse salariale, à étoffer si activité forte) + **qualitatif** (écart-type des salaires, "dispersion idéale").
- Bonne qualité admin → limite les **retards de paiement** et les **créances irrécouvrables**. ⚠️ Sous-dimensionner l'admin = se faire payer en retard et perdre des créances.

### Charges subies (incompressibles, partie fixe + % du CA)
| Charge | Fixe/mois | % du CA |
|--------|-----------|---------|
| Consommables | 10 000 € | 2,5 % |
| Fournitures | 12 000 € | 1,5 % |
| Déplacements/missions/réceptions | 8 000 € | 2,0 % |
| Postaux/télécom | 500 € | 0,5 % |

- Charges sociales = **40 %** de la rémunération. Impôts/taxes sur salaires = **5 %**.
- Créances impayées ≈ **3,75 % du CA encaissé** (réductible par une bonne qualité admin).

### Financement (banque : L'Européenne de Crédit)
- **Emprunt standard** (existant) : 1 800 000 € sur 120 mois à 5 % fixe, assurance 0,22 %/an. Mensualités constantes. Remboursement anticipé possible.
- **Emprunt libre** (crédit de campagne, négociable à tout moment) : existant 400 000 € à 7 %. Souple.
- **Découvert** : agios **13 %/an** ➡️ **À ÉVITER ABSOLUMENT**, c'est le pire financement.
- **Placements** : livret sans risque ~**3,75 %/an** (intérêts en début de mois) ; VMP (actions/obligations, cours variable). Détient déjà **9 000 obligations type B**. Dividendes/intérêts versés en avril.

### Fiscalité
- **IS 25 %** : 4 acomptes (mars/juin/sept/déc) = 25 % de l'IS de l'an précédent ; liquidation en avril.
- **TVA 20 %** sur les débits, due = collectée − déductible, décaissée le mois suivant.

---

## 5. PARTENAIRES (Espace Affaires, animateurs)

| Partenaire | Rôle | Coût |
|------------|------|------|
| **Le Petit Économiste** | Journal éco, baromètre | Gratuit |
| **Markinform** | Études de marché | **5 000 €/étude** |
| **Comptaservice** | Expert-comptable (trésorerie, compte de résultat, bilan…) | 500 €/mois/doc |
| **L'Assureur** | RC / dommages / pertes d'exploitation | 500 €/mois/police |
| **Européenne de Crédit** | Banque (négo début de trimestre) | — |
| **Ingénieur de production** | Infos internes (conso/utilisation prévues vs réalisées) | — |
| **IIPI** | Dépôt de marque : France 3 000 € / Europe 6 000 € / Monde 9 000 € | — |

### Études Markinform (5 000 € pièce) — NOTRE RADAR
**Permanentes (valables toute la session, à acheter tôt) :**
1. **Éléments de prévision des ventes** (évolution, cycle de vie, saisonnalité) → ⭐ prioritaire.
2. Étude sur la **force de vente** (effectif souhaitable).
3. Étude sur l'**effet publicité** (budgets mini/suffisants + efficacité des axes).
4. Étude sur l'**effet prix de vente** (prix attendus) → ⭐ prioritaire.
5. Étude sur le **délai de paiement** (grille 0-100).

**Concurrentielles (changent chaque trimestre)** : parts de marché en volume/valeur ; évolutives (mini/moyen/max par trimestre) ou comparatives (toutes les entreprises sur un trimestre).

➡️ **Reco** : acheter dès le 1er tour les études **prévision des ventes + effet prix + effet pub** (15 000 €). On joue informé pendant que les autres jouent à l'aveugle. Puis 1 étude concurrentielle par trimestre pour surveiller les rivaux.

---

## 6. STRATÉGIE D'INTERNATIONALISATION (volet livrables)

L'entreprise vise le **marché espagnol**.
- **Recrutement d'un commercial** : fiche de poste fournie en espagnol (annexe "SE BUSCA — Representante de ventas"). Exige notamment : expérience démontrée, MS Office, **3 langues mini (FR/EN/ES)**, diplôme bac+3 commerce, permis de conduire, mobilité. → Livrable probable : process de recrutement / sélection de profil / entretien.
- **Communication internationale = elevator pitch.** 3 articles imposés à lire :
  - https://blog.hubspot.com/sales/elevator-pitch-examples
  - https://asana.com/resources/elevator-pitch-examples
  - https://www.dynamique-mag.com/article/secrets-elevator-pitch-parfait.4780
  - → Livrable probable : un **pitch oral** (argumenter, convaincre clients/investisseurs), peut-être en anglais et/ou espagnol.

---

## 7. IDENTITÉ VISUELLE (volet livrables — doc dédié)

Méthode imposée pour **trouver le nom de marque** :
1. Brainstorm à la main (cahier/stylo, carte mentale), noter les traits de caractère de la marque, la cible, les mots du secteur.
2. **Quantité avant qualité** : générer un max de noms avant de juger.
3. **Travail d'équipe** + **être visuel** (dessiner, croquis → inspire le logo).
4. Tri : regrouper par similarité, éliminer doublons → éliminer les trop complexes à épeler/taper → dire à voix haute (facile ? ridicule ?) → tester sur des personnes externes → après un délai, voir quel nom est resté en mémoire.

**Critères d'un bon nom** : distinctif, facile à prononcer, évolutif (ne pas s'enfermer), pensé à l'international (pas de gros mot / imprononçable / déjà déposé), disponible (dépôt INPI/IIPI). Référence directe au produit = lien immédiat (cf. fast-food) ; nom abstrait = plus facile à déposer mais à expliciter via logo/slogan.

➡️ **Livrable attendu** : un nom de marque justifié + logo, cohérent avec une activité de **bateaux de plaisance** visant la France puis l'Espagne.

---

## 8. LA FEUILLE DE DÉCISIONS (ce qu'on remplit chaque trimestre, stylo rouge)

Sections à renseigner :
- **Approvisionnement** : quantités plastique (P1/P2/P3) + bois (B1/B2/B3).
- **Production** : acquisition/cession de postes (robots) moulage/finition ; quantités à produire par bateau.
- **Marketing** : force de vente (embauche +/licenciement −, indice, taux commission) ; pub de marque + 2 axes (principal/secondaire) ; marketing mix par bateau (prix de vente HT, pub spécifique, délai de paiement client).
- **Administration** : variation d'effectif A/B/C + indices ; charges spécifiées (assurances, documentations/dépôt marque).
- **Finance** : obligations/actions (achat+/vente−), livret (placement+/retrait−), emprunt (montant, remboursement anticipé, frais dossier, nature/taux), concours bancaires.
- **Commande d'études** Markinform (cocher les n° voulus).

---

## 9. PLAN DE JEU TYPE (à affiner avec la grille de notation + les études du jour J)

**Avant le jeu (prépa) :**
- [ ] Caler la **répartition des rôles** dans l'équipe de 4 (production, commercial/marketing, finance, admin/coordination). Jarvis = vision d'ensemble + arbitrages chiffrés.
- [ ] Préparer le **nom de marque + logo** (volet identité visuelle) et le **pitch** (volet international) en amont si possible.
- [ ] Lire les 3 articles elevator pitch.

**Trimestre 1 (poser les fondations, jouer informé) :**
- [ ] Acheter les études Markinform **prévision ventes + effet prix + effet pub** (~15 000 €).
- [ ] Choisir le(s) bateau(x) à pousser (spécialisation vs gamme) selon marge et capacité goulot.
- [ ] Fixer prix / pub / délais à partir des études, pas au pif.
- [ ] Sécuriser l'appro (éviter rupture) et la **trésorerie** (zéro découvert).
- [ ] Souscrire Comptaservice (au moins trésorerie + compte de résultat) pour piloter sur des chiffres réels.

**Trimestres suivants (optimiser) :**
- [ ] 1 étude concurrentielle/trimestre pour lire le jeu des rivaux (parts de marché).
- [ ] Ajuster prix/volume selon parts de marché et stocks.
- [ ] Investir en robots de **moulage** seulement si la demande dépasse durablement la capacité.
- [ ] Placer les excédents de tréso (livret), ne jamais laisser filer en découvert.
- [ ] Surveiller la qualité admin (éviter impayés/retards).

**Règles d'or à ne jamais oublier :**
1. Le **moulage** est le goulot → toute la prod se cale dessus.
2. **Décalage d'1 mois** sur les livraisons d'appro → anticiper, ne pas commander à flux tendu.
3. **Découvert 13 %** = ennemi public n°1. Toujours garder de la tréso d'avance.
4. **Jouer informé** : les études Markinform valent leur prix face à des concurrents aveugles.
5. **Ne pas négliger les livrables annexes** (identité visuelle, recrutement, pitch) : souvent une grosse part de la note.

---

## 10. CE QU'IL ME MANQUE (à remplir le jour J)

- [ ] **Grille de notation / modalités d'évaluation** ← PRIORITÉ ABSOLUE (oriente tout).
- [ ] Nombre d'équipes concurrentes.
- [ ] Combien de tours/trimestres on joue sur les 3 jours.
- [ ] Les livrables exacts demandés (rapport ? oral ? dossier identité visuelle ? dossier recrutement ?) et leur pondération.
- [ ] Les valeurs de départ précises du tableau de bord / bilan d'ouverture si fournies par les animateurs.
