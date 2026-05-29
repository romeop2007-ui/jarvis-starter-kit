# Defyne — Boutique Shopify (sections éditables)

Recréation des maquettes Claude Design (homepage, contact, track order) au format
Shopify, **entièrement éditables dans Personnaliser** tout en gardant un rendu
identique à la maquette.

## Pourquoi ce dossier a changé

Avant, la homepage et la page Track order étaient un seul gros bloc de HTML codé
en dur. Shopify affichait *"Cette page ne contient aucune section"* : impossible
de modifier quoi que ce soit dans l'éditeur.

Maintenant tout est découpé en **sections** avec des réglages (`{% schema %}`).
Chaque texte, image, lien, prix, avis, question de FAQ... est éditable dans
**Boutique en ligne > Thèmes > Personnaliser**, sans toucher au code.

## Structure

```
defyne-shopify/
├── assets/
│   └── defyne.css                       # TOUT le CSS (rendu identique à la maquette). Chargé par le layout.
├── layout/
│   └── defyne.liquid                    # Layout isolé (pas de header/footer Dawn). Rend le chrome partagé.
├── snippets/
│   └── defyne-benefit-icon.liquid       # Icônes de la section Bénéfices
├── sections/
│   │  # --- Chrome partagé (rendu par le layout, sur toutes les pages Defyne) ---
│   ├── defyne-ticker.liquid             # Bandeau défilant du haut (1 bloc par message)
│   ├── defyne-header.liquid             # Menu de navigation (1 bloc par lien)
│   ├── defyne-footer.liquid             # Pied de page (newsletter, 2 colonnes de liens, paiements)
│   │  # --- Contenu homepage ---
│   ├── defyne-hero.liquid               # Hero (titre, note, 3 atouts, image de fond optionnelle)
│   ├── defyne-press.liquid              # Barre "As seen in" (1 bloc par logo)
│   ├── defyne-benefits.liquid           # 4 bénéfices autour d'une image
│   ├── defyne-social-proof.liquid       # Témoignages (1 bloc par carte)
│   ├── defyne-product.liquid            # Buy box : galerie, puces, paliers de prix, options, UGC, accordéons
│   ├── defyne-how.liquid                # "How it works" (4 notes + diagramme)
│   ├── defyne-stats.liquid              # Stats de transformation + avant/après
│   ├── defyne-comparison.liquid         # Tableau comparatif (1 bloc par ligne)
│   ├── defyne-size-guide.liquid         # Guide des tailles (1 bloc par taille)
│   ├── defyne-faq.liquid                # FAQ (1 bloc par question)
│   ├── defyne-reviews.liquid            # Mur d'avis (1 bloc par avis)
│   ├── defyne-trust-badges.liquid       # Rangée des 4 garanties (réutilisée partout)
│   │  # --- Contenu page Contact / Track order ---
│   ├── defyne-contact.liquid            # Intro + formulaire contact natif Shopify
│   └── defyne-track.liquid              # Bloc de suivi de commande
└── templates/
    ├── index.liquid                     # Homepage : assemble les sections de contenu
    ├── page.contact.json                # Page Contact : contact + badges
    └── page.defyne-track-order.liquid   # Page Track order : suivi + badges
```

## Comment ça marche (le principe à retenir)

- **Le chrome (ticker + menu + footer)** est rendu par le **layout** `defyne.liquid`.
  Tu l'édites **une seule fois** et il s'applique à la homepage et à la page Track order.
- **Le contenu** de chaque page est une liste de sections appelées dans le template.
- **Tout le CSS** vit dans `assets/defyne.css`. Ne le duplique pas dans les sections :
  c'est lui qui garantit le rendu identique à la maquette.
- Les sections sont **statiques** : tu peux éditer tous les réglages et ajouter /
  supprimer / réordonner les **blocs** (avis, FAQ, paliers...). L'ordre des grandes
  sections est fixé dans le template (modifiable dans le code, par moi sur demande).

## Images

Chaque cadre placeholder rayé de la maquette accepte une vraie photo : dans
Personnaliser, ouvre la section concernée et utilise le champ **Image**. Si tu n'en
mets pas, le cadre + son libellé s'affichent (comme aujourd'hui). Upload tes photos
produit au fur et à mesure, sans rien casser.

## Installation (éditeur de code Shopify)

1. Shopify admin > **Boutique en ligne > Thèmes** > ton thème de travail (preview) > `...` > **Modifier le code**
2. **assets/** : Ajouter un asset > `defyne.css` > colle le contenu du fichier
3. **snippets/** : Ajouter > `defyne-benefit-icon` > colle le contenu
4. **layout/** : ouvre (ou crée) `defyne` > colle le contenu de `layout/defyne.liquid`
5. **sections/** : pour chaque fichier de `sections/`, Ajouter une section avec le même nom, colle le contenu
6. **templates/** :
   - `index` (Liquid) > colle `templates/index.liquid`
   - modèle de **page** nommé `defyne-track-order` (Liquid) > colle `templates/page.defyne-track-order.liquid`
   - modèle de **page** nommé `contact` (JSON) > colle `templates/page.contact.json`
7. Assigne les modèles : **Pages** > ta page Contact > Modèle `contact` ; ta page de suivi > Modèle `defyne-track-order`
8. Va dans **Personnaliser** : tu vois maintenant toutes les sections, éditables.

> Méthode CLI (`shopify theme push`) possible une fois à l'aise : la structure de dossiers ci-dessus est déjà au bon format.

## Le formulaire de contact

Formulaire **natif Shopify** (`{% form 'contact' %}`) : les messages arrivent sur
l'email admin de la boutique, aucun service externe. Pour changer l'adresse :
Shopify admin > Paramètres > Notifications.

## Détail technique

- Sections statiques → blocs par défaut définis via la clé `default` du schema
  (et non `presets`, réservé aux templates JSON), conformément aux recommandations Shopify.
- La police Archivo est chargée par le layout. La section `defyne-contact` la recharge
  pour elle-même car la page Contact utilise le thème Dawn (template JSON), pas le layout `defyne`.
- Le bouton "Buy now" et le champ de suivi sont cosmétiques : à brancher sur un vrai
  produit Shopify / un suivi transporteur plus tard.
