# Format de sortie Notion

Page cible (ne jamais en créer une nouvelle, toujours compléter celle-ci) :
**Logement Huesca — Appartements pour Saragosse (Campus Huesca)**
https://app.notion.com/p/387d30267a9081edb998c5c3ec44535a

## Pour chaque nouveau logement, ajouter une section avec ce gabarit exact

```markdown
## N — <Nom de rue / quartier>

**Source de l'annonce :** [<Nom du site>](<url>) — annonceur réel : **<Agence ou particulier>**

**Prix :** <total>€/mois (<par personne>€/personne) — <surface>, <détails clés>

**Distance à pied de l'université :** ~<X> minutes (≈ <Y> m en ligne droite<, estimation large si quartier seulement>)

**Mobilier et équipements :**
- <liste à puces>
- ⚠️ <mentionner si l'annonce ne précise pas le mobilier>

**Avis sur l'agence/annonceur (<Nom>) :**
- Trustpilot : <note/lien> ou "pas de profil trouvé"
- <autres plateformes : ProvenExpert, RealAdvisor, Google avis...>
- Positif : <résumé honnête>
- Négatif : <résumé honnête, ne jamais l'omettre s'il existe>
```

`N` continue la numérotation existante (la page contient déjà les biens 1 à 5 ; le prochain logement commence à 6).

## Mise à jour du tableau de synthèse en bas de page

Après ajout des nouveaux logements, relire le tableau markdown existant en fin de page et y ajouter une ligne par nouveau logement, même format de colonnes :

```markdown
| # | Lieu | Prix/mois | €/pers. | Distance à pied univ. | Avis agence |
```

## Méthode d'écriture

Utiliser `notion-fetch` sur l'URL de la page pour récupérer son contenu actuel, puis `notion-update-page` (mode append/insertion en fin de contenu, pas de réécriture totale) pour ajouter les nouvelles sections + mettre à jour le tableau. Ne jamais écraser les sections 1-5 existantes.
