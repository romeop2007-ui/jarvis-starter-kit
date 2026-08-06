# Trouver un maximum de concurrents sur un produit donné

> Source : vidéo formation Zecom Academy "3.1 Trouver des nouveaux concurrents" (transcrite le 14/07/2026, `livrables/ecommerce/formation/3.1 Trouver des nouveaux concurrents/video/concurrents-3.1.txt`).
>
> Différent de l'étape 1 du `SKILL.md` (sourcer une NOUVELLE niche/produit à tester). Ici, le produit est déjà identifié (candidat en cours de validation, ou déjà en test) et l'objectif est de trouver TOUS ses concurrents pour multiplier les points de data et/ou les créas à adapter. Utile en phase d'optimisation (recharger des créas quand celles du concurrent actuel sont toutes lancées) et en phase de scaling (concurrents indirects pour s'inspirer).

## Méthode 1 — TrendTrack, recherche par mots-clés

1. Construire une liste géante de mots-clés autour du produit : nom produit, variantes, problèmes qu'il résout, bénéfices (ex. pour une chaussure orthopédique : "chaussure orthopédique", "orthopédie", "fasciite plantaire", "hallux valgus"...).
2. Traduire cette liste en plusieurs langues (EN, DE, IT, ES, FR, nordiques), au format exact attendu par TrendTrack : `motclé,motclé,` (virgule sans espace, pas de retour à la ligne) pour pouvoir tout coller d'un coup.
3. Dans TrendTrack, coller la liste complète dans la search bar, onglet **AddCopy** puis **Website**.
4. Filtrer impressions ≥150-200k, trier par **Top Impression**.
5. Plus la liste de mots-clés est large (viser 250-300+ mots-clés cumulés), plus on remonte de concurrents. Rester quand même dans le champ lexical du produit (pas n'importe quoi).

### 🔧 Prompt prêt à l'emploi pour l'étape 1 (source : prompt formateur, Notion "Les prompts Claude", ajouté le 06/08/2026)

Mise à jour par rapport à la vidéo formation (transcrite le 14/07/2026) : plus besoin de passer par ChatGPT pour construire la liste, Claude génère directement les mots-clés quasi-identiques (mêmes types d'objets, mêmes catégories, même utilité, variations du même concept), avec ce prompt exact :

```
Tu es un expert en recherche produit e-commerce et en génération de mots-clés.

À partir du nom de produit suivant : {NOM_DU_PRODUIT}, génère une liste de mots-clés
extrêmement proches, c'est-à-dire :
– mêmes types d'objets
– mêmes catégories
– même utilité
– variations du même concept

✅ Le but est de créer des mots-clés presque identiques, à la manière de :
chaussure orthopédique → chaussures orthopédiques → basket orthopédique → baskets
orthopédiques → chaussure ergonomique → chaussures ergonomiques → basket ergonomique →
baskets ergonomiques → chaussure médicale → chaussures de confort → basket corrective

✅ Règles :
– Tous les mots-clés doivent être des produits très similaires (pas d'accessoires, pas
  d'objets différents).
– Tu peux créer des variations de genre (chaussure / baskets), nombre (singulier/pluriel)
  et adjectifs proches (orthopédique, ergonomique, médical, confort, correctif, stabilisant,
  amortissant…).
– Chaque mot-clé doit être unique (pas de doublons exacts).
– Pas de phrases longues, uniquement des noms de produits ou expressions très courtes.

Génère maintenant 30 mots-clés pour : {NOM_DU_PRODUIT}
```

Enchaîner directement avec l'étape 2 (traduction multilingue, même format `motclé,motclé,`
sans espace) dans le même échange, sans repasser par un autre outil : Claude fait les deux
étapes (génération + traduction) lui-même.

## Méthode 2 — TrendTrack, recherche par niche/catégorie

1. Aller dans **Trending Shop > Category**, sélectionner la ou les catégories pertinentes (ex. Shoes, Fashion Accessories).
2. Trier par **Monthly Visit** (trafic).
3. Sur un site qui semble pertinent, utiliser l'**extension Chrome TrendTrack** pour lister tous ses produits et vérifier s'il vend le même produit ou un produit très proche.
4. Même si ce n'est pas exactement le même produit : en phase de scaling, tout concurrent indirect de la même catégorie est utile à garder de côté (créas à réutiliser plus tard). Descendre progressivement dans le classement trafic : les plus gros sites (souvent multi-produits, pas des dropshippers) sont moins intéressants que les sites plus modestes et spécialisés.

## Méthode 3 — Kalodata, recherche par catégorie

Kalodata est cher à l'abonnement seul ; le formateur recommande de passer par **Spybox** (~30 €/mois), qui groupe Kalodata et plusieurs autres outils pour moins cher que les licences individuelles. ⚠️ Non souscrit à ce jour côté Zooryn, à évaluer si le besoin de diversifier les sources devient réel.

1. Dans Kalodata (via Spybox) : **Product > Category**, sélectionner la catégorie. Regarder de préférence sur **United States** (bien plus de volume qu'en France : un top produit FR sur 30 jours ≈ 120k€ de CA vs plusieurs millions aux US).
2. Filtrer les 30 derniers jours, ne garder que les produits ≥50 000 € de CA.
3. Sur un produit qui matche : ouvrir l'onglet **Vidéo & Ads**, période 180 jours. Toute pub ayant généré ≥7-8 000 € de revenu est à traduire/reprendre (phase d'optimisation = les 3-4 meilleures ; phase de scaling = tout récupérer, y compris des b-rolls à recouper).
4. Répéter mois par mois (30/07→30/06, puis 30/06→1er juin, etc.) pour élargir la fenêtre de recherche au-delà des 30 derniers jours par défaut.
5. Vérifier la répartition des revenus par canal (colonne détail) : une grosse part en "Product Card / Shopping Mall / Showcase" (affichage passif) plutôt qu'en "Vidéo" ou "Live" signifie que la traction ne vient pas des pubs vidéo → moins pertinent pour sourcer des créas.

## Autres outils à connaître (diversifier, ne pas dépendre d'un seul)

Le formateur insiste : un outil peut manquer une pub qu'un autre remonte (et inversement), donc ne pas se reposer uniquement sur TrendTrack. Liste donnée (accessibles via Spybox) :

- **AdSparrow** — bon outil de recherche
- **Dropispy** / **Dropship.io** — corrects sans être les meilleurs
- **Kalodata** — cf. méthode 3
- **PPAds** — excellent, spécialisé TikTok Ads
- **PPSpy** — correct pour diversifier
- **Minea** — bon outil généraliste
- **Winning Hunter** / **Afterleap** — logique proche de TrendTrack

Aucun de ces outils n'est actuellement souscrit ou testé côté Zooryn ; à considérer seulement si le pipeline TrendTrack devient limitant.
