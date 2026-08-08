# SOP RapidBundle — configurer les paliers de prix (bundle)

> Issue de la transcription intégrale de la leçon "3.1 L'application de bundle" (Module 7,
> Zecom Academy), le formateur reconstruisant un bundle en copiant un concurrent réel.
> Rappel Étape 4 du `SKILL.md` : Claude n'a aucun accès API/CLI/MCP à cette app. Ce fichier sert
> de check-list à donner à Roméo (ou à commenter sur ses captures d'écran) pour qu'il configure
> lui-même le bundle à l'identique du concurrent, sans redécouvrir l'app à chaque produit.

## App retenue : RapidBundle

Pas l'app de bundle la plus connue/utilisée par la masse des dropshippers — choix assumé du
formateur pour se différencier visuellement ET pour le prix : plafonné à 60 $/mois même en
scalant, contre 80-200 $/mois chez la concurrence.

## Timing d'installation

**Ne jamais installer l'app au lancement de la boutique.** L'installer la veille du lancement du
premier produit testé, pour ne pas gâcher des jours d'essai gratuit (14 jours offerts) pendant
que la boutique n'a encore aucune vente.

## Installation et plan

1. Installer l'app → l'épingler dans la navigation Shopify.
2. Prendre le plan **Starter, en mensuel** (pas le plan annuel "early" dès le départ, pas le plan
   Free trop limité pour créer des bundles).
3. Une fois approuvé, l'app affiche "not activated yet" → cliquer **Activate**.
4. Ça renvoie vers le thème Shopify, section **intégrations d'application** : cocher RapidBundle,
   enregistrer. (Si Shopify n'y amène pas automatiquement : thème > Intégration d'application >
   RapidBundle.)
5. Retour sur l'app, rafraîchir : elle doit apparaître installée. Passer l'interface en français
   si plus simple.

## Créer un bundle

**Toujours choisir le type "Bundle classique"** (réduction sur quantité). C'est le seul type
utilisé à 95 % du temps : tous les autres formats proposés à la création (pastilles de couleur,
"Frequently Bought Together", free gifts, upsell, disposition alternative) se recréent en fait à
partir du bundle classique en le personnalisant ensuite — inutile de les choisir en type de base.

1. **Nom du bundle** = nom exact du produit Shopify concerné.
2. **Visibilité** = un seul produit spécifique, sauf cas particulier : plusieurs variantes d'un
   même produit standardisé (même prix, juste un design/logo différent) peuvent partager un seul
   bundle.
3. **Texte d'entête** (ex. "Choose your offer") : le supprimer par défaut. Le français a tendance
   à rallonger les phrases courtes du concurrent anglophone (une accroche courte en anglais
   devient vite un pavé en français) — ne garder un texte que si une formule courte et fidèle
   passe bien visuellement.
4. **Planification** : laisser "immédiatement" sauf date de lancement précise à respecter.

## Design des blocs de bundle

- Style de bloc : **"Prestige"** (recommandé par le formateur, jugé le plus qualitatif
  visuellement parmi Prestige / Light / Block / Royal).
- **Rayon de coin et épaisseur du bloc calqués sur le bouton "Ajouter au panier" du thème** (ex.
  6 px de rayon, épaisseur 2) — jamais une valeur choisie au hasard, aller vérifier le réglage
  réel du bouton A2C dans le thème avant de configurer RapidBundle.
- Espacement modéré (ni trop serré ni trop aéré).
- Précochage du bundle (bouton radio) : peut être désactivé, l'offre par défaut sélectionnée
  reste visible car mise en évidence visuellement (couleur différente).
- Couleurs et typographies (taille d'en-tête, gras, taille du prix) : **standardiser une fois
  pour tous les bundles Zooryn**, pas les redéfinir à chaque produit.

## Les 3 offres (paliers)

Reproduire fidèlement la structure du concurrent, palier par palier :

1. **Titre de chaque offre** = ce que vend le palier (ex. "1 paire", "2 paires", "3 paires").
2. **Prix** : toujours en **prix fixe** (pas en % de réduction), collé sur le prix réel affiché
   par le concurrent pour ce palier.
3. **Étiquette de mise en avant** (ex. "Meilleure vente", "Meilleure offre") sur l'offre que le
   concurrent met en avant — généralement l'offre du milieu, **sélectionnée par défaut**.
4. **Sous-titre/prix par unité** en étiquette sous le prix principal (ex. "Seulement 18,30 € par
   paire") si le concurrent l'utilise — reprendre le même texte traduit.
5. Ne pas activer le clignotement de l'étiquette (jugé too much par le formateur). Un timer
   d'urgence est possible mais reste optionnel, à activer seulement si Roméo le décide vraiment.
6. Pas de widget de quantité (fois 1/fois 2/fois 3) par défaut — inutile, le nombre d'unités du
   palier est déjà explicite dans le titre.

## Paramètres avancés (critiques, à ne jamais sauter)

- **Masquer le sélecteur de variante natif du thème** ET **masquer le prix natif du thème** —
  double affichage sinon avec le widget RapidBundle. Ces deux éléments doivent aussi être masqués
  côté thème (section "Informations produit" > Variant picker / Prix), voir Étape 4 du
  `SKILL.md`.
- **Garder "Afficher les prix barrés" activé** — jugé important par le formateur pour l'effet de
  réduction perçue.
- **Ne jamais activer "passer le panier, aller directement au paiement"** — on veut que le client
  passe par l'étape panier (réassurance, upsells éventuels).
- "Permettre au client de choisir des variantes pour chaque article" : laisser activé si le
  produit a des variantes (couleur, taille), sinon ça n'affiche rien de toute façon.
- "Afficher les bundles sur la page d'accueil" : non par défaut, seulement si Roméo veut mettre
  un produit + son bundle en avant sur la home.

## Carte des réglages RapidBundle — ce qui sert, ce qui ne sert JAMAIS (relevé du 07/08/2026)

Relevé exhaustif de l'onglet **Offers** fait sur le bundle Titanox. Demande explicite de Roméo :
mémoriser ce qui est inutile pour aller au plus simple et ne pas re-trier l'app à chaque produit.

**Le SEUL bloc à activer : `Volume Discount`.** Tout le reste de l'onglet Offers reste OFF par
défaut sur un produit Zooryn, sauf décision contraire explicite :

| Bloc | État | Pourquoi |
|---|---|---|
| Let the customer build his own bundle | OFF | sert à mixer des produits DIFFÉRENTS ; nos paliers portent sur un seul produit |
| Timer | OFF | urgence artificielle, non utilisée par les concurrents copiés jusqu'ici |
| Scratch Deal | OFF | gadget |
| **Volume Discount** | **ON** | c'est le quantity-break, le cœur de l'offre |
| Subscriptions | OFF | Zooryn ne vend pas d'abonnement |
| Add different product / Cross-sell (Beta) | OFF | l'upsell se gère ailleurs, pas dans le bloc d'offre |
| Progress bar (goals free shipping) | OFF | la livraison est **déjà gratuite sur toute la boutique**, une barre de progression vers "livraison offerte" n'a aucun sens ici |
| Live Social Proof ("X people are viewing") | OFF | si le concurrent affiche un compteur de stock/vues, il se reproduit dans le THÈME, pas dans l'app de bundle |
| Sticky add to cart (Beta) | OFF | Shrine Pro a son propre sticky ATC natif, ne pas empiler les deux |
| Custom Liquid/Html | OFF | dernier recours, jamais sans accord de Roméo |

**Dans une offre du Volume Discount**, champs qui servent vs champs à ignorer :

- **Servent** : `Title`, `Subtitle`, `Quantity`, `Tag` (= le badge du concurrent), `Image`,
  `Selected by default`, `Price`, `Highlight this offer`.
- **À laisser tel quel / OFF** : `Add quantity widget` (le nombre d'unités est déjà dans le
  titre), `Manual compare-at price` (laisser **Auto** : le prix barré vient des variantes
  Shopify), `COGS` (le P&L se suit dans le Sheet officiel de la formation, pas ici),
  `Mark as out of stock`, `Add Benefits`, `Add upsell`, `Add free gift`,
  `Require item selection to complete bundle purchase`, `Design "Select" Product Popup`.
- **Offer Type** : toujours **Volume Discount**, jamais `Combo Bundle` (qui sert à associer des
  produits différents).

## Bug connu : masquage du prix natif

Masquer le prix natif du thème peut produire un rendu visuel bizarre selon le thème/section
utilisée. Vérifier le rendu réel après avoir masqué (Personnalisateur + page publiée), et ajuster
manuellement la couleur/l'affichage du prix restant si besoin — ne pas juste décocher et partir.

## Passe mobile

Toujours vérifier le rendu sur mobile (DevTools ou vrai téléphone) après config : les libellés de
palier ("1 paire, 2 paires, 3 paires") et le texte en gras peuvent paraître trop gros sur petit
écran — réduire la taille de police et le poids du gras si besoin, en particulier sur l'offre
sélectionnée par défaut.

## Test avant de considérer terminé

1. Ajouter chaque offre au panier une par une : bonne variante, bonne quantité, prix et économie
   affichés corrects.
2. Vérifier que l'offre censée être précochée par défaut l'est bien après un rafraîchissement de
   la page (pas seulement au premier chargement).
3. Aller jusqu'à l'étape panier (pas besoin d'aller jusqu'au paiement réel).

## Scaler sur un nouveau produit : dupliquer, ne jamais repartir de zéro

Une fois qu'un premier bundle est configuré et validé (design + réglages avancés), pour le
produit suivant :

1. Sur le bundle existant, cliquer les **3 petits points > Dupliquer**.
2. Le design (couleurs, rayons, typographies, réglages avancés) est **entièrement conservé**.
3. Ne reste à modifier que : le **nom du bundle** (nouveau nom de produit), la **sélection du
   produit** ciblé, et le **contenu des 3 offres** (titres, prix, étiquettes) pour coller au
   nouveau concurrent copié.

Cette astuce est la raison d'être de la standardisation du design évoquée plus haut : plus les
bundles Zooryn partagent un même habillage, moins il y a de travail de design à refaire à chaque
nouveau produit testé.
