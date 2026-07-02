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
**N'ecrire QUE les cases d'entree.** Le tableau est entierement formule : le CA, les totaux et la case finale B28 se recalculent seuls. Ne JAMAIS ecrire dans une cellule de formule (voir carte ci-dessous), ca casserait le calcul.

Toujours **montrer a Romeo les valeurs trouvees et les cellules visees AVANT d'ecrire**, et confirmer. Apres ecriture, relire les totaux recalcules et les lui montrer.

---

## Carte du tableau

### Tableau du haut — abonnements / depenses fixes (table "Charges")
- Lignes (nature) : 2 Claude IA · 3 Shopify · 4 LegalPlace · 5 TrendTrack · 6 Qonto · 7 Vmake · 8 ElevenLabs · 9 Capcut · 10 Zecom
- Colonnes (mois) : **B**=Mai · **C**=Juin · **D**=juillet · **E**=aout · **F**=septembre · **G**=octobre · **H**=novembre · **I**=decembre · **J**=janvier · **K**=fevrier · **L**=mars · **M**=avril
- **FORMULES — ne pas toucher** : colonne **N** (Total annee), ligne **11** (TOTAL mensuel). Colonne **O** = texte de rappel des abonnements.
- Usage : surtout des abonnements recurrents (voir colonne O pour les montants). Au passage a un nouveau mois, reporter les recurrents connus dans la colonne du mois. Les depenses pub des tests ne vont PAS ici, elles vont dans le tableau du bas.

### Tableau du bas — un bloc par testing
Chaque testing occupe 2 colonnes (libelles a gauche, valeurs a droite) :

| Testing | Colonne libelles | Colonne valeurs | Table nommee |
|---------|------------------|-----------------|--------------|
| T1 (Sculpted) | A | **B** | Produits |
| T2 (protege-tibias) | D | **E** | Tableau1 |
| T3 (matelas) | G | **H** | Tableau2 |
| T4 (Luma, guirlande) | J | **K** | cellules simples (pas une table nommee), agregee dans B28 via `+K25` |
| T5+ (a creer) | M | **N** | a creer (voir plus bas) |

Lignes (memes pour tous les blocs), dans la colonne valeurs du testing :
- **15** Prix de vente 1 achete — *entree*
- **16** Nombre de ventes (palier 1 achete) — *entree*
- **17** Prix de vente 2 achetes + 1 offert — *entree*
- **18** Nombre de ventes (palier 2+1) — *entree*
- **19** Prix de vente 4 achetes + 2 offerts — *entree*
- **20** Nombre de ventes (palier 4+2) — *entree*
- **21** CA — **FORMULE, ne pas toucher**
- **22** Charges fournisseurs (COGS : production + expedition) — **FORMULE** = ligne 27 (prix fournisseur unitaire) x nombre TOTAL d'unites vendues. Ne pas ecraser par une valeur en dur. Le calcul des unites depend des paliers du produit (voir mapping). Ex T4 Luma : `=K27*(K16+K18*2+K20*3)`. Pour un produit avec offerts (T1-T3) compter les unites EXPEDIEES : palier "2+1" = 3 unites, "4+2" = 6 unites.
- **23** Charges publicitaires — *entree* (depuis Facebook Ads)
- **24** Total charges — **FORMULE, ne pas toucher**
- **25** Total produit — **FORMULE, ne pas toucher**

### Ligne "Charges 1 produit" (ligne 27, ajoutee par Romeo)
- Ligne **27** = **prix fournisseur unitaire** d'un exemplaire du produit (production + expedition), saisi par Romeo une fois que le fournisseur lui donne le prix. Une cellule par testing (B27 / E27 / H27 / **K27** pour T4). Vaut 0 tant que non renseigne.
- C'est la source de la formule de la ligne 22 (charges fournisseurs = ligne 27 x unites vendues).

### Case finale
- **B29** = Produit - charges (total global de l'annee). **FORMULE**, somme des totaux de tous les blocs + total des charges fixes. Se recalcule seule. (Etait en B28 avant que Romeo insere la ligne 27 le 29/06.) Quand on ajoute un testing, etendre cette formule (voir plus bas).

---

## Process quand Romeo declenche

1. **Demander quel testing** est concerne si ce n'est pas evident (ex : une guirlande = T4 Luma, un matelas = T3). En cas de doute, demander, ne jamais deviner le mauvais bloc.
2. **Recuperer les ventes** du produit via le **connecteur Shopify MCP** (`list-orders`, verifier d'abord avec `get-shop-info` qu'il pointe bien sur Zooryn/zooryn.com). Ne compter que les commandes **PAID** (ignorer les REFUNDED et les anciennes commandes test en GBP). Repartir par palier selon la correspondance du produit. Le COGS (ligne 22) se calcule a part (voir ligne 22).
   - Note canal : la CLI `shopify store execute` n'a PAS le scope `read_orders` (acces commandes refuse), elle sert seulement a lire les **prix** des variantes (`read_products`). Les ventes passent donc par le connecteur MCP, pas la CLI.
3. **Recuperer la depense pub** via le **MCP Facebook Ads** (`ads_get_ad_entities`, compte EUR `1952596875395674`, `level: campaign`, `date_preset: this_month`). Prendre le `amount_spent` de la campagne du testing (ex "Campagne T4"). C'est la ligne 23 (Charges publicitaires).
4. **Montrer a Romeo** : valeurs trouvees + cellules visees. Attendre son OK.
5. **Ecrire** via le moteur (voir ci-dessous).
6. **Relire** les totaux recalcules (CA, Total produit, B28) et les montrer a Romeo.

### Correspondance palier par produit (a tenir a jour)
Le tableau a des paliers fixes (1 / 2+1 / 4+2, modele du matelas). Chaque produit a ses propres variantes Shopify : mapper au cas par cas. Romeo precise le mapping la premiere fois pour chaque produit.
- **T3 matelas** : Pack Solo -> ligne 16 · Pack 2 -> ligne 18 · Pack 4 -> ligne 20.
- **T4 Luma** (colonnes J/K) : pas d'offerts, les 3 paliers sont les variantes Shopify "1 Luma" / "2 Luma" / "3 Luma".
  - Libelles : K15="Prix de vente 1 Luma" (29,99) · K17="Prix de vente 2 Lumas" (49,99) · K19="Prix de vente 3 Lumas" (64,99).
  - Ventes : variante "1 Luma" -> K16 · "2 Luma" -> K18 · "3 Luma" -> K20.

---

## Lancer le moteur

Depuis `.claude/skills/budget/` :

```bash
# Lire une plage (formules) pour se reperer
node scripts/budget.mjs read A14:K28

# Lire les valeurs calculees (CA, totaux)
node scripts/budget.mjs values A21:H28

# Ecrire des cases d'entree (USER_ENTERED : nombres restent numeriques, virgule FR toleree)
node scripts/budget.mjs write "H16=3" "H23=52.40" "H22=27"

# Copier la mise en forme d'un bloc existant vers un nouveau (couleurs, gras, police, fond)
node scripts/budget.mjs copyformat G14:H27 J14:K27
```

Le moteur ecrit en `USER_ENTERED` (un nombre reste un nombre, une chaine commencant par `=` reste une formule). Il refuse les arguments mal formes. Toujours verifier la cellule visee avec `read` avant d'ecrire.

---

## Ajouter un nouveau testing (T4+)

**Regle absolue (actee par Romeo le 02/07/2026) : tout nouveau bloc est une REPLIQUE EXACTE des blocs existants.** Meme modele, memes couleurs/mise en forme, memes calculs/formules, meme structure de lignes, tout pareil que ce qui est deja en place. Les SEULES choses qui changent d'un bloc a l'autre : les **prix** et les **offres du produit** (libelles des paliers : avec/sans offerts, noms des packs). Ne jamais improviser une variante de structure, de style ou de formule.

Methode rodee sur T4 (Luma), a reproduire pour T5+ (colonnes M/N) :
1. Creer le bloc en recopiant la structure d'un bloc existant (lignes 14-25 + ligne 27), avec les memes formules pour CA / Total charges / Total produit / Charges fournisseurs, adaptees a la colonne du nouveau bloc. Adapter les libelles des paliers au produit (avec/sans offerts).
2. Etendre la formule de **B29** en ajoutant `+<colonne>25` (le Total produit du nouveau bloc). Ex pour T4 : `...+K25`.
3. **Copier la mise en forme** d'un bloc voisin avec `copyformat` (ex `copyformat G14:H27 J14:K27`) : indispensable, sinon le bloc est fonctionnel mais moche (pas de couleurs ni gras).
4. Verifier que B29 reflete bien le nouveau testing apres une ecriture test.
Faire ces operations de structure avec validation explicite de Romeo (c'est de la modif de production sur sa compta).

## Limites assumees
- Aucune automatisation autonome : Romeo declenche, le skill execute dans la session. Pas de reveil sur commande client (impossible sur abonnement sans n8n/webhook).
- Le COGS fournisseur (ligne 22) n'est pas recuperable automatiquement (invisible cote Shopify) : Romeo le fournit.
- Les versements Shopify -> Qonto prennent plusieurs jours : on se base sur les commandes Shopify, pas sur les arrivees bancaires.
