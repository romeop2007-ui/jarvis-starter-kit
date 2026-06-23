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

**Caractéristiques :**
- Superficie : <X> m²
- Type de location : <seul / colocation> — <nombre> colocataires si colocation

**Mobilier et équipements :**
- <liste à puces>
- ⚠️ <mentionner si l'annonce ne précise pas le mobilier>

**Équipements du logement :**
- Machine à laver : <oui/non/⚠️ non précisé>
- Chauffage : <type, ex. électrique/gaz/⚠️ non précisé>
- Eau chaude : <mode de production/⚠️ non précisé>
- Isolation : <info si disponible/⚠️ non précisé>

**Charges et dépenses :**
- Électricité : <incluse / en sus, estimation €/mois si connue>
- Mode de paiement électricité : <compteur au nom du locataire / via propriétaire-agence/⚠️ non précisé>
- Autres charges : <taxe poubelles, parties communes, nettoyage/entretien si mentionnés, sinon "aucune mentionnée">

**Conditions de location :**
- Réservation possible en juin avec caution : <oui/non/⚠️ non précisé>
- Paiement à partir de septembre uniquement (pas juillet/août) : <oui/non/⚠️ non précisé>
- Durée de bail proposée : <X mois> — bail court (6 mois) accepté : <oui/non/⚠️ non précisé>

**Confort saisonnier :**
- Été : <info si disponible/⚠️ non précisé>
- Hiver : <info si disponible/⚠️ non précisé>

**Équipement personnel à prévoir :**
- Linge de lit (draps, couverture, oreiller) : <fourni/à apporter/⚠️ non précisé>

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
