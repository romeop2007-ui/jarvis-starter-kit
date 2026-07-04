# Outils TrendTrack — ce qui marche, ce qui ne marche pas

> Leçons actées les 15-16/06/2026 sur plusieurs sessions de recherche réelles. À relire avant de dépenser des crédits.

## ✅ Le filet qui MARCHE : `search_ads` filtré par catégorie

Recette validée (c'est elle qui a sorti le matelas, le sac sling, valotalo, bryngrill) :

- `category_ids` : filtrer sur l'univers de l'ombrelle (voir IDs ci-dessous)
- `min_active_ads` ≥ 40 (preuve de scale = une page avec un vrai paquet de pubs)
- `max_traffic` < 2000 (petit shop frais)
- `shop_created_after` = il y a **~5-6 semaines max** (pas 3 mois)
- **`sort_by reachDelta7d`** (⚠️ PAS `reachDelta30d`, qui remonte des accumulateurs anciens type RideLab — cf. leçon ci-dessous)
- `max_ads_per_brand` 1 (déduplique)
- Variante "filet nordique" : + `shop_creation_countries` SE/DK/NO/FI/DE/NL/AT/GB/BE/PL/CZ + `max_products` ≤ 15-25

### ⚠️ Tri : `reachDelta7d`, jamais `reachDelta30d` (leçon 03/07/2026)

`reachDelta30d` classe en tête les shops qui ont **accumulé** du reach sur un mois, donc des winners qui scalent depuis longtemps (cas RideLab : sorti n°1 alors qu'il scale depuis mars = 4 mois, trop vieux pour copier, déjà vu par Roméo). Ça trahit le "timing entre les deux". **`reachDelta7d` isole ce qui décolle CETTE semaine.** Le combiner toujours avec `shop_created_after` récent (<6 semaines), sinon on remonte encore du vieux qui a un pic ponctuel.

Autre piège vu le 03/07 : **`max_products` ≤ 6-8 vide le puits** (0-3 résultats), car TrendTrack n'indexe pas toujours le catalogue → garder `max_products` à ~15-20 pour ne pas éliminer de vrais mono-produit mal indexés. Et **sans filtre catégorie**, le scaling EU récent est dominé par le santé/corps (semelles, oreillers thérapeutiques, hallux, bracelets) et le maison/jardin (débroussailleuse, balai) = exclusions → le filtre catégorie reste obligatoire pour la niche.

Puis **lire le texte des pubs** (`content.body`) pour isoler les vrais produits.

### IDs de catégories utiles (via `lookup_filter_ids type=categories`)

| ID | Catégorie |
|----|-----------|
| 753 | Outdoors |
| 755 | Hiking & Camping |
| 757 | Outdoors / Other |
| 754 | Fishing |
| 756 | Hunting |
| 1199 | Water Sports |
| 1160 | Cycling |
| 1237 | Travel & Transportation |
| 1241 | Luggage & Travel |
| 1242 | Backpacks |
| 1245 | Specialty Travel |
| 1233 | Outdoor Toys |

⚠️ Même avec ce filtre strict, l'outdoor/voyage EU-analysable tient sur ~1,5 page de résultats à un instant T. Une poignée de winners solides, pas un flux infini → cadence 1-2 tests/semaine, on ne force pas.

## ❌ Ce qui NE MARCHE PAS (ne pas y perdre des crédits)

- **`find_similar_shops`** : remonte les grosses marques établies (REI, Decathlon, Sea to Summit...) et peut se tromper de shop sur un nom proche. Inadapté pour trouver un dropshipper frais. Utile seulement pour cartographier l'univers d'un produit donné.
- **Recherche par mot-clé** (`search_ads keywords` : "camping", "waterproof", "dry bag"...) : 100 % bruit / faux positifs (matche tout ce qui *mentionne* le mot).
- **`find_winning_products`** : index anglophone, remonte des marques établies à gros catalogue, souvent 0 sur des niches précises.
- **`search_advertisers` trié par growth** : uniquement des géants (Airbnb, Decathlon, Samsonite...). Niveau annonceur = trop gros.
- **`search_tiktok_library`** : endpoint parfois HS ("API temporarily unavailable").

## Pièges de lecture de la data

- **`visits:0` = donnée MANQUANTE**, pas faible trafic (cas thefleececompany : 0 affiché, 1,7M réel). Toujours vérifier `monthlyVisits` à la main.
- **Le compteur de pubs actives ne prouve rien** (cas IROND : 44 pubs, ~5k reach total). Regarder le reach réel : `metrics.reach`, `advertiser.reach30d/totalReach`, et surtout la pente `reachDelta30d`.
- **Origine US du shop OK SI** le Reveal EU Spend montre de vraies données (cas EndoLab). "No EU Data" = inexploitable, jeter (cas MIRIS).
- Les données reach/dépense ne sont publiques que pour les pubs **diffusées en UE/UK** (transparence DSA). C'est la zone de diffusion du concurrent qui compte, pas son origine ni le marché de vente de Roméo.

## Gestion des gros résultats

Les sorties `search_ads` dépassent souvent la limite de tokens → sauver en fichier puis parser avec `node -e` (JSON.parse) ou PowerShell (`Get-Content -Raw | ConvertFrom-Json`). Pas de jq sur ce poste.

Champs utiles : `data[].advertiser.liveAdsCount/reach30d`, `data[].content.body/landingPageDomain`, `data[].metrics.reachDelta30d/reachDelta7d`, `data[].daysRunning`, `data[].audience.mainCountry`.
