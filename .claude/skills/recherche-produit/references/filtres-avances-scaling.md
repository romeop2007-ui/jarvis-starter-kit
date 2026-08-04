# Filtres avancés — trouver un shop qui fait vraiment "péter" un produit

> Écrit le 04/08/2026 à la demande de Roméo. Constat : la recette standard (catégorie + `reachDelta7d` + shop <6 sem) ne sort parfois rien d'assez fort. La formation elle-même dit que 700 élèves qui reprennent le même filtre ne peuvent pas tomber sur les mêmes 200 produits — il faut remanier les critères en continu, pas s'accrocher à une seule recette. Ce fichier est une **panoplie de recettes différentes**, à faire tourner et enrichir au fil des sessions, pas une recette unique de plus.

## Le plancher qu'on vise (rappel)

Un candidat est "assez bon" si **au moins 4 créas distinctes** passent l'un de ces deux seuils :
- **Dépense** : ≥ 60 €/jour
- **OU reach** : ≥ 500 000

Deux erreurs à ne plus refaire :
1. Compter le reach **cumulé de la marque** (ex. "623 217 de reach total") au lieu du reach **par créa individuelle**. Une marque peut cumuler des centaines de milliers de reach sur 20 pubs qui ne dépassent individuellement jamais 50k — ça ne prouve rien.
2. Lire `estimatedSpend` comme si c'était un chiffre journalier. Par défaut ce champ est **cumulé sur toute la durée de vie de la pub** (`daysRunning`). Diviser approximativement fausse tout. → utiliser directement les filtres `spend_period`/`reach_period` ci-dessous, qui donnent la vraie fenêtre.

## Astuce n°1 : demander directement la fenêtre "hier" ou "7 derniers jours", pas le cumulé

Le paramètre `spend_period` du filtre `min_spend`/`max_spend` accepte `last24h`. C'est LE moyen de tester littéralement "cette pub a dépensé ≥60€ hier", sans faire de division approximative.

```
min_spend: 60
spend_period: last24h
```

Idem côté reach avec `reach_period` (`total` / `last24h` / `last7d` / `last30d`) sur `min_reach`.

```
min_reach: 500000
reach_period: total
```

## Astuce n°2 : voir plusieurs créas du même shop d'un coup pour compter le plancher directement

Au lieu de `max_ads_per_brand: 1` (qui masque les autres pubs de la marque), passer à `max_ads_per_brand: 10-15`. Toutes les pubs de la même marque remontent triées, on voit en un coup d'œil combien franchissent réellement le seuil — plus besoin d'aller re-scanner le domaine à la main après coup.

## Astuce n°3 : ajuster le CPM selon le pays avant de juger une dépense

`estimatedSpend` est calculé avec un CPM par défaut (Europe de l'Ouest, ~8-12€). Sur un shop qui cible la Roumanie, la Pologne, la Grèce (CPM réel ~3-5€), l'API sous-estime la vraie dépense si on ne précise rien. Passer un `cpm` cohérent avec le pays ciblé avant de conclure "ça ne dépense pas assez".

---

## Les recettes (à copier-coller, à faire tourner en rotation)

### Recette A — Plancher dépense strict (ta règle actuelle, formalisée)
```
category_ids: [niche du jour]
min_active_ads: 40
max_traffic: 2000
shop_created_after: <6 semaines
min_spend: 60
spend_period: last24h
max_ads_per_brand: 10
sort_by: reachDelta7d
```
→ Isole les shops qui ont AU MOINS une créa qui dépense encore 60€+ hier (pas juste "a dépensé" historiquement).

### Recette B — Plancher reach strict
Identique à A mais remplacer les 2 lignes spend par :
```
min_reach: 500000
reach_period: total
```
→ Isole les shops avec au moins une créa qui a dépassé 500k reach cumulé (le vrai seuil formation).

### Recette C — Pente de la créa elle-même (pas du shop)
```
ad_reach_growth: [{period: last7d, comparison: greater, value: 100}]
```
→ Une créa qui a AU MOINS doublé son reach en 7 jours. C'est le signal d'accélération réelle, indépendant du volume absolu — capte des candidats encore petits mais qui décollent vraiment, avant qu'ils soient assez gros pour passer A ou B.

### Recette D — Croissance du nombre de pubs actives de la page (le pattern Zomesi)
```
ads_growth: [{period: last7d, comparison: greater, value: 50}]
```
→ La marque ajoute des pubs vite (ex. 20→38→41 en 2 semaines observé sur Holmgaard). Souvent un signal AVANT que le reach absolu explose — un shop qui recrute des créas vite a probablement trouvé un angle qui marche et le décline.

### Recette E — Rank movers (signal précoce, avant le reach absolu)
```
sort_by: rankDelta7d
min_rank_delta: 10
order: desc
```
→ Pubs qui grimpent vite dans le classement de leur marché (algorithme Meta les pousse). Souvent précède de quelques jours l'explosion du reach affiché — utile pour être parmi les premiers dessus plutôt que d'arriver après coup.

### Recette F — Split-testing actif (duplicates élevés)
```
min_duplicates: 5
```
→ Une marque qui décline la même créa en 5+ variantes est presque toujours en train de scaler un angle gagnant (elle teste des variations pour trouver le meilleur ratio). Signal indirect mais fiable, quasi jamais utilisé dans les recherches précédentes.

### Recette G — Early signal (jeune + montée verticale, avant que tout le monde le voie)
```
max_days_running: 14
ad_reach_growth: [{period: last7d, comparison: greater, value: 300}]
```
→ Créa apparue il y a moins de 2 semaines qui a au moins quadruplé son reach en 7 jours. C'est le candidat le plus risqué (peu d'historique pour juger) mais le plus tôt dans le cycle — cohérent avec le principe "timing entre les deux" si on le recroise avec la fraîcheur du shop.

### Recette H — Rotation géographique élargie (moins regardée par les 700 élèves de la formation)
Faire tourner `main_countries` ou `ad_countries` sur des marchés EU moins évidents que IT/ES/FR/DE :
```
main_countries: ["PL"] / ["RO"] / ["GR"] / ["PT"] / ["HU"] / ["SK"] / ["BG"] / ["CZ"]
```
→ Les élèves de la formation regardent probablement en priorité les gros marchés (FR, DE, IT, ES, UK). Les petits marchés EU sont sous-explorés et sous-copiés, donc statistiquement moins saturés au moment où on les trouve.

### Recette I — Combo "confirmé sur plusieurs fronts" (le plus strict, réservé aux meilleurs jours)
```
min_spend: 60
spend_period: last7d
min_active_ads: 60
ads_growth: [{period: last30d, comparison: greater, value: 100}]
max_ads_per_brand: 15
```
→ Cumule dépense soutenue sur 7 jours + volume de pubs qui a doublé sur 30 jours. Rare mais quand ça sort quelque chose, c'est du solide.

---

## Méthode de rotation recommandée

Ne pas lancer les 9 recettes à chaque session (coûte des crédits pour rien). Rotation suggérée :
1. **Toujours commencer par A ou B** (le plancher direct) sur les catégories du jour.
2. **Si sec → C ou D** (signal de pente/accélération, capte des candidats plus jeunes/petits que A/B).
3. **Si toujours sec → E, F ou G** (signaux précoces/indirects, plus de faux positifs mais sort du lot différent).
4. **Une fois par mois → H** (balayage géographique large, indépendant du reste).
5. **I seulement si le pipeline est vraiment vide et qu'on a du temps** (filtre très restrictif, peu de résultats mais très fiables quand il en sort).

À chaque usage réel, noter ici ce qui a marché ou pas (comme `outils-trendtrack.md`), pour que la liste s'affine avec l'usage plutôt que de rester théorique.
