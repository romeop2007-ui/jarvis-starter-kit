# Defyne — Page Contact (Shopify)

Recréation de la maquette `Defyne Contact.html` au format Shopify.

## Ce que contient ce dossier

```
defyne-shopify/
├── sections/
│   ├── defyne-contact.liquid        # Intro "Questions?" + formulaire contact natif
│   └── defyne-trust-badges.liquid   # La rangée de 4 badges de confiance (réutilisable)
└── templates/
    └── page.contact.json            # Assemble les 2 sections sur la page Contact
```

Le **header, le footer et le ticker** ne sont pas ici : sur Shopify ils viennent du thème
et s'affichent automatiquement sur toutes les pages. On ne recrée que le contenu propre à la page contact.

## Le formulaire

Il utilise le **formulaire contact natif de Shopify** (`{% form 'contact' %}`). Les messages
arrivent directement sur l'email admin de ta boutique. Pas de Formspree, pas de code externe,
rien à brancher. La confirmation après envoi est gérée par Shopify (pas de JavaScript).

Pour changer l'adresse de réception : Shopify admin > Paramètres > Notifications.

## Comment l'installer (2 méthodes)

### Méthode A — Copier-coller dans l'éditeur de code (la plus simple pour débuter)

1. Shopify admin > **Boutique en ligne > Thèmes**
2. Sur ton thème : bouton `...` > **Modifier le code**
3. Dans `sections/`, clique **Ajouter une section**, nomme-la `defyne-contact`, colle le contenu de `sections/defyne-contact.liquid`
4. Répète pour `defyne-trust-badges`
5. Dans `templates/`, clique **Ajouter un modèle** > type **page** > nom `contact`, format **JSON**, colle le contenu de `templates/page.contact.json`
6. Va dans **Pages**, ouvre (ou crée) ta page "Contact", et à droite dans **Modèle de thème** choisis `contact`

### Méthode B — Shopify CLI (tu l'as déjà : v4.1.0)

Depuis ce dossier, après `shopify theme dev` ou `shopify theme push`, les fichiers
se synchronisent dans le thème. À utiliser une fois que tu es à l'aise avec le CLI.

## Personnalisation

Tous les textes (titre, intro, email, libellés du formulaire, badges) sont éditables
sans toucher au code, via **Personnaliser** dans l'éditeur de thème. Les valeurs par
défaut reprennent exactement la maquette (anglais, marché UK).

## À faire plus tard

- Brancher le même design sur la homepage et la page "Track my order" (mêmes sections partagées)
- Vérifier que la police Archivo n'est pas chargée deux fois (si le thème la charge déjà,
  retirer le bloc `<link>` en haut de `defyne-contact.liquid`)
