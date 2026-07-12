---
name: budget
description: Met a jour le Google Sheet "Investissement E-commerce" de Romeo (suivi du budget e-commerce) a partir des vraies donnees Shopify (ventes) et Facebook Ads (depenses pub). A declencher quand Romeo dit "mets a jour mon budget", "remplis mon tableau d'investissement", "actualise ma compta", "mets a jour le sheet du budget". Romeo declenche, le skill va chercher ce qui a bouge depuis la derniere fois et ecrit les cases d'entree. Il n'y a aucune automatisation autonome : c'est toujours Romeo qui lance.
---

# Skill budget — suivi de l'investissement e-commerce

Met a jour le Google Sheet **"Investissement E-commerce"** sans que Romeo ait a retaper ses chiffres a la main. Romeo declenche le skill par message, le skill va chercher les vraies donnees (ventes Shopify, depenses pub Meta), ecrit **uniquement les cases d'entree**, et laisse les formules recalculer le reste.

## Pre-requis techniques (deja en place)
- **Cle Google** : `.google-service-account.json` a la racine du workspace (compte de service `budget-bot@claude-gws-setup-497511.iam.gserviceaccount.com`, partage en Editeur sur le Sheet). Gitignoree.
- **Moteur d'ecriture** : `scripts/budget.mjs` (lib `googleapis` installee dans ce dossier).
- **Sheet ID** : `1fyhxCFPPbML84eSnb2q_BhbpJY8NF_54xOoigm_pNIM`, feuille `Feuille 1`.

## Regle d'or
**N'ecrire QUE les cases d'entree.** Le tableau est entierement formule : le CA, les totaux et la case finale B34 se recalculent seuls. Ne JAMAIS ecrire dans une cellule de formule (voir carte ci-dessous), ca casserait le calcul.

Toujours **montrer a Romeo les valeurs trouvees et les cellules visees AVANT d'ecrire**, et confirmer. Apres ecriture, relire les totaux recalcules et les lui montrer.

**⚠️ Piege majeur decouvert le 12/07/2026, deux fois : `copyformat` (copyPaste PASTE_FORMAT) ET `deleteTable` peuvent EFFACER les valeurs/formules d'une plage qui contenait une Table Google Sheets structuree**, pas juste toucher la structure/mise en forme. Constate en conditions reelles a deux reprises le meme jour (blocs T1/T2/T3 puis tableau "Charges") — a chaque fois restaure a partir d'une lecture prealable. Depuis le 12/07/2026, le Sheet ne contient plus AUCUNE Table structuree (tout est en cellules simples). Regles a vie :
1. **Avant toute operation structurelle (deleteTable, insertDimension, mergeCells...) sur une plage qui contient des donnees**, faire un `read` complet de la zone et la garder en tete avant d'agir, pour pouvoir restaurer immediatement si besoin.
2. **Ne plus utiliser `copyformat` sur une plage de destination qui contient deja des donnees.** Uniquement sur une plage vide. Pour styler une plage existante, capturer le format exact (`userEnteredFormat`) puis l'appliquer via `updateCells` avec `fields` restreint a `userEnteredFormat` (jamais `userEnteredValue`).
3. **Verifier systematiquement avec un `read`/`values` juste apres toute operation structurelle.**
4. Les couleurs d'un bloc (vert header, alternance blanc/vert clair, gris pour les totaux) doivent parfois etre **posees explicitement** (`repeatCell` avec `backgroundColorStyle`) plutot que "copiees" : une ancienne Table rendait ses couleurs via son propre mecanisme de banding, pas via `userEnteredFormat` sur les cellules — une simple capture/restauration de format peut donc paraitre "sans couleur" apres coup. Si ca arrive, reposer les couleurs a la main (voir palette ci-dessous).

**Palette de couleurs du Sheet** (a reutiliser telle quelle) :
- Vert header : `{red:0.20784314, green:0.40784314, blue:0.32941177}` (texte blanc gras)
- Blanc : `{red:1,green:1,blue:1}`
- Vert tres clair (alternance) : `{red:0.9647059, green:0.972549, blue:0.9764706}`
- Gris (ligne total) : `{red:0.7176471, green:0.7176471, blue:0.7176471}`

---

## Carte du tableau (structure finale au 12/07/2026 — tout en cellules simples, zero Table structuree)

Deux grandes sections, chacune avec un titre fusionne en gros/gras/blanc sur fond vert :
- **A1** (fusionne A1:O1) = titre **"ABONNEMENTS ET DÉPENSES"**
- **A15** (fusionne A15:N15) = titre **"TESTING"**

Aucune ligne n'est figee (`frozenRowCount:0`, degele le 12/07/2026 a la demande de Romeo).

### Tableau du haut — abonnements / depenses fixes (lignes 2-13, cellules simples)
- Header colonnes : ligne **2** (Nature / Mai / Juin / .../ avril / Total annee / Résumé...)
- Lignes (nature) : 3 Claude IA · 4 Shopify · 5 LegalPlace · 6 TrendTrack · 7 Qonto · 8 Vmake · 9 ElevenLabs · 10 Capcut · 11 Zecom
- Colonnes (mois) : **B**=Mai · **C**=Juin · **D**=juillet · **E**=aout · **F**=septembre · **G**=octobre · **H**=novembre · **I**=decembre · **J**=janvier · **K**=fevrier · **L**=mars · **M**=avril
- **FORMULES — ne pas toucher** :
  - Colonne **N** (lignes 3-11) : `=SUM(B:M)` de la ligne, total annee de cet abonnement.
  - **Ligne 12 "TOTAL mensuel"** : `B12=SUM(B3:B11)` ... `M12=SUM(M3:M11)`, `N12=SUM(B12:M12)` (grand total annee des abonnements).
  - Colonne **O** = texte de rappel des abonnements (libre, pas une formule).
- **Ligne 13 : "Déclaration mensuelle (cotisations Urssaf)"** (ajoutee le 12/07/2026). *Entree* : B13/C13/... = montant des cotisations Urssaf **reellement payees/prelevees** ce mois-la (pas le CA declare). N13 = `=SUM(B13:M13)`, **FORMULE**. O13 = note libre (CA declare du mois, taux applique). Alimentee a chaque fois que Romeo envoie sa capture/PDF de declaration Urssaf.
- Ligne 14 = ligne vide (separateur visuel avant le titre TESTING).

### Tableau du bas — un bloc par testing (lignes 16-30, cellules simples)
Chaque testing occupe 2 colonnes (libelles a gauche, valeurs a droite) :

| Testing | Colonne libelles | Colonne valeurs | Modele de lignes |
|---------|------------------|-----------------|-------------------|
| T1 (Sculpted) | A | **B** | ancien modele (COGS unique en bas de bloc, ligne 32) |
| T2 (protege-tibias) | D | **E** | ancien modele |
| T3 (matelas) | G | **H** | ancien modele |
| T4 (Luma, guirlande) | J | **K** | ancien modele |
| T5 (sac sling) | M | **N** | **nouveau modele : COGS par palier, depuis le 12/07/2026** |
| T6+ (a creer) | plus a droite (P/Q...) | a creer | **nouveau modele, obligatoire** |

**⚠️ Piege metier decouvert le 12/07/2026 (sac sling) : le COGS n'est PAS le meme selon l'offre achetee.** Expedier 1 exemplaire seul coute plus cher a l'unite qu'expedier 2 exemplaires d'un bundle "1 achete = 1 offert" ensemble (frais de port mieux repartis a plusieurs). Un flat rate "Charges 1 produit" unique pour tout le bloc est donc FAUX des qu'un produit a plusieurs paliers de vente. **Regle actee : chaque palier de prix a son propre COGS, saisi juste en dessous de son "Nombre de ventes".** **Toujours verifier sur Aplusfulfill (capture envoyee par Romeo, "Coût du produit" + frais de port PAR COMMANDE) le detail reel, ne jamais supposer qu'une commande correspond au palier attendu** : un client peut acheter "1 seul" un produit normalement vendu en bundle (cf. commande #1005 : le client a pris uniquement le produit standard sans prendre le second exemplaire offert, meme prix affiche que le bundle mais COGS tres different).

**Nouveau modele (T5 et tout T6+), 3 lignes par palier :**
- Ligne header (Nature / T5...)
- **Prix de vente palier X** — *entree*
- **Nombre de ventes palier X** — *entree*
- **Coût du produit (COGS) palier X** — *entree* (cout reel production+expedition pour CE palier precis, pas un tarif generique)
- *(repeter pour les 3 paliers)*
- **CA** — **FORMULE** = somme de (prix x ventes) sur les 3 paliers.
- **Charges fournisseurs** — **FORMULE** = somme de (ventes x COGS) sur les 3 paliers.
- **Charges publicitaires** — *entree* (depuis Facebook Ads)
- **Total charges** — **FORMULE** = charges fournisseurs + charges publicitaires
- **Total produit** — **FORMULE** = CA - Total charges

**Structure exacte T5 (colonnes M/N) au 12/07/2026 :**
16=header · 17=prix palier1 "Standard (offre 1+1)" (39€) · 18=ventes palier1 (1) · 19=COGS palier1 (16,62€, cout du bundle 2 unites expediees ensemble) · 20=prix palier2 "Large (offre 1+1)" (49€) · 21=ventes palier2 (0) · 22=COGS palier2 (a renseigner a la 1ere vente) · 23=prix palier3 "Standard (achat seul, sans offre)" (39€) · 24=ventes palier3 (1) · 25=COGS palier3 (11,24€, cout d'1 seul exemplaire expedie seul) · 26=CA (`=N24*N23+N21*N20+N18*N17`) · 27=charges fournisseurs (`=N18*N19+N21*N22+N24*N25`) · 28=charges pub · 29=total charges · 30=total produit · 31=vide · 32=Charges 1 produit (obsolete pour T5, vestige de l'ancien modele, non utilise par les formules) · 33=vide · 34=case finale.

**Ancien modele (T1-T4, non retouche, colonnes A/B, D/E, G/H, J/K) :** 2 lignes par palier (prix + ventes) : 17/18, 20/21, 23/24. Puis 26=CA · 27=Charges fournisseurs (**FORMULE** = ligne 32 (COGS unique) x nombre TOTAL d'unites vendues ; ex T4 Luma `=K32*(K18+K21*2+K24*3)`) · 28=Charges publicitaires · 29=Total charges · 30=Total produit · 32=Charges 1 produit (le COGS unique, source de la ligne 27).

### Case finale
- **B34** = "Produit - charges" (total global de l'annee, **inclut les cotisations Urssaf**). **FORMULE** :
  `=B30-N13+E30+H30+K30+N30-N12`
  (Total produit T1 - cotisations Urssaf payees (N13) + Total produit T2 + T3 + T4 + T5 - total annee des charges fixes (N12)). Se recalcule seule. Quand on ajoute un testing, etendre cette formule (voir plus bas).

---

## Process quand Romeo declenche

1. **Demander quel testing** est concerne si ce n'est pas evident (ex : une guirlande = T4 Luma, un matelas = T3). En cas de doute, demander, ne jamais deviner le mauvais bloc.
2. **Recuperer les ventes** du produit via le **connecteur Shopify MCP** (`list-orders`, verifier d'abord avec `get-shop-info` qu'il pointe bien sur Zooryn/zooryn.com). Ne compter que les commandes **PAID** (ignorer les REFUNDED et les anciennes commandes test en GBP). Repartir par palier selon la correspondance du produit — **verifier chaque commande individuellement** (voir piege COGS par palier ci-dessus), ne pas juste compter par variante Shopify sans regarder le detail Aplusfulfill.
3. **Recuperer le COGS reel** de chaque palier vendu via **Aplusfulfill** (capture/lien envoye par Romeo : "Coût du produit" + frais de port, en dollars, a convertir en euros au taux effectif deja utilise pour ce produit — ex T5 : taux ≈0,907 deduit de la 1re conversion connue).
4. **Recuperer la depense pub** via le **MCP Facebook Ads** (`ads_get_ad_entities`, compte EUR `1952596875395674`, `level: campaign`, `date_preset: this_month`). Prendre le `amount_spent` de la campagne du testing.
5. **Montrer a Romeo** : valeurs trouvees + cellules visees. Attendre son OK.
6. **Ecrire** via le moteur (voir ci-dessous).
7. **Relire** les totaux recalcules (CA, Total produit, B34) et les montrer a Romeo.

### Declarations Urssaf (ligne 13)
Romeo envoie sa capture/PDF de recap de declaration Urssaf mensuelle a chaque fois. En extraire : le mois, le montant de **cotisations** (pas le CA), et noter le CA declare + taux en commentaire (colonne O). Ecrire le montant de cotisations dans la cellule du mois correspondant (ligne 13), ca vient automatiquement en deduction de B34.

### Correspondance palier par produit (a tenir a jour)
Chaque produit a ses propres variantes/paliers Shopify : mapper au cas par cas. Romeo precise le mapping la premiere fois pour chaque produit.
- **T3 matelas** (ancien modele) : Pack Solo -> ligne 18 · Pack 2 -> ligne 21 · Pack 4 -> ligne 24.
- **T4 Luma** (ancien modele, colonnes J/K) : pas d'offerts, 3 paliers = variantes Shopify "1 Luma" / "2 Luma" / "3 Luma". Prix : K17/K20/K23. Ventes : K18/K21/K24.
- **T5 sac sling** (nouveau modele, colonnes M/N) : "Standard offre 1+1" -> palier1 (17-19) · "Large offre 1+1" -> palier2 (20-22) · "Standard achat seul sans offre" -> palier3 (23-25).

---

## Lancer le moteur

Depuis `.claude/skills/budget/` :

```bash
# Lire une plage (formules) pour se reperer
node scripts/budget.mjs read A16:N30

# Lire les valeurs calculees (CA, totaux)
node scripts/budget.mjs values A26:N34

# Ecrire des cases d'entree (USER_ENTERED : nombres restent numeriques, virgule FR toleree)
node scripts/budget.mjs write "N24=2" "N25=11.24" "N28=52.40"

# Copier la mise en forme d'un bloc existant vers un nouveau bloc VIDE (couleurs, gras, police, fond)
# ⚠️ Uniquement sur une destination vide, jamais sur une plage qui contient deja des donnees (voir piege plus haut)
node scripts/budget.mjs copyformat M16:N30 P16:Q30
```

Le moteur ecrit en `USER_ENTERED` (un nombre reste un nombre, une chaine commencant par `=` reste une formule). Il refuse les arguments mal formes. Toujours verifier la cellule visee avec `read` avant d'ecrire.

---

## Ajouter un nouveau testing (T6+)

**Regle absolue (actee par Romeo le 02/07/2026, precisee le 12/07/2026) : tout nouveau bloc reprend le NOUVEAU modele (COGS par palier, cf structure T5 ci-dessus), jamais l'ancien modele a COGS unique.** Meme mise en forme (couleurs/gras copiees depuis T5), memes types de formules, adaptees a la colonne du nouveau bloc et au nombre reel de paliers du produit.

Methode a suivre pour T6+ (colonnes suivantes, ex P/Q) :
1. Creer le bloc en recopiant la structure de **T5** (lignes 16-30), avec les memes formules pour CA / Charges fournisseurs / Total charges / Total produit, adaptees a la colonne du nouveau bloc. Adapter les libelles des paliers et le nombre de paliers au produit reel.
2. Etendre la formule de **B34** en ajoutant `+<colonne>30` (le Total produit du nouveau bloc).
3. **Copier la mise en forme** de T5 avec `copyformat` **uniquement si la destination est vide** (ex `copyformat M16:N30 P16:Q30`) : indispensable, sinon le bloc est fonctionnel mais moche. Si la destination a deja des valeurs a proteger, utiliser `updateCells` (fields restreint a `userEnteredFormat`) a la place.
4. Verifier que B34 reflete bien le nouveau testing apres une ecriture test.
Faire ces operations de structure avec validation explicite de Romeo (c'est de la modif de production sur sa compta).

## Limites assumees
- Aucune automatisation autonome : Romeo declenche, le skill execute dans la session. Pas de reveil sur commande client (impossible sur abonnement sans n8n/webhook).
- Le COGS fournisseur par palier n'est pas recuperable automatiquement (invisible cote Shopify, verifie manuellement sur Aplusfulfill) : Romeo le fournit ou envoie la capture.
- Les versements Shopify -> Qonto prennent plusieurs jours : on se base sur les commandes Shopify, pas sur les arrivees bancaires.
