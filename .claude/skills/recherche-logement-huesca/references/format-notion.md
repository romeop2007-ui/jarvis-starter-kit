# Format de sortie Notion

Page cible (ne jamais en créer une nouvelle, toujours compléter celle-ci) :
**Logement Huesca — Appartements pour Saragosse (Campus Huesca)**
https://app.notion.com/p/387d30267a9081edb998c5c3ec44535a

## RÈGLE ABSOLUE — Lien direct vers l'annonce (prioritaire sur tout le reste)

**Chaque logement DOIT être immédiatement contactable par Roméo, sinon il ne sert à rien.** Cette exigence prime sur les critères (budget, distance, mobilier) : un bien parfait mais qu'on ne peut pas ouvrir/contacter est inutile.

Pour chaque bien, l'ordre de préférence est :
1. **Idéal — un lien DIRECT vers la fiche de l'annonce** : cliquer dessus doit ouvrir la page du bien précis, PAS l'accueil ni une page catégorie du site.
2. **À défaut — assez d'infos pour retrouver/contacter le bien** : adresse exacte + téléphone/email de l'annonceur (proprio ou agence). Écrire alors explicitement "Pas de lien de fiche direct — contact : \<tel/email\>, adresse exacte : \<adresse\>".
3. **Si ni l'un ni l'autre → SUPPRIMER le bien.** Ne jamais laisser une fiche avec seulement un lien vers l'accueil du site (ex. `https://rentola.es`) : c'est inutilisable, on retire.

**Format du lien OBLIGATOIRE — un seul lien, cliquable et évident :**
- Le texte cliquable EST le lien direct. Écrire `**Fiche de l'annonce :** <url-directe-complète>` en collant l'URL en clair, ou `[Voir l'annonce](<url-directe>)` où l'URL est bien la fiche.
- **JAMAIS deux liens collés** comme `[Fiche directe sur ](url-directe)[Rentola.es](https://rentola.es)`. Le second (vers l'accueil) est ce sur quoi Roméo clique et se retrouve perdu. Un seul lien, celui de la fiche.
- **Ne jamais mettre le nom du site comme lien vers son accueil.** Le nom du site peut être mentionné en texte simple (non cliquable) : "sur Rentola".

## Pour chaque nouveau logement, ajouter une section avec ce gabarit exact

```markdown
## N — <Nom de rue / quartier>

**Fiche de l'annonce :** <URL directe complète de la fiche, collée en clair> (site : <Nom du site> ; annonceur réel : <Agence ou particulier>)
<!-- si pas de fiche directe mais contact solide : remplacer la ligne ci-dessus par -->
<!-- **Pas de lien de fiche direct — contact :** <tel/email> — adresse exacte : <adresse> (annonceur : <nom>) -->
<!-- si ni fiche directe ni contact : NE PAS créer la fiche, supprimer le bien -->


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

## Section anti-doublon (persistance hors dépôt git)

En fin de page, maintenir une section `## Sites & agences déjà explorés` qui reprend le contenu de `references/sites-deja-couverts.md`. Cette section sur Notion est le **canal de persistance fiable** : si la recherche est exécutée en routine cloud sans droit de commit git, la mise à jour du fichier local sera perdue à la fin du run, alors que l'écriture Notion persiste réellement. Toujours mettre à jour cette section Notion en même temps que le fichier local (même si le fichier local ne peut pas être committé), et au début de chaque recherche, lire cette section Notion en complément du fichier local pour avoir l'état le plus à jour.

## Méthode d'écriture

Utiliser `notion-fetch` sur l'URL de la page pour récupérer son contenu actuel, puis `notion-update-page` (mode append/insertion en fin de contenu, pas de réécriture totale) pour ajouter les nouvelles sections + mettre à jour le tableau. Ne jamais écraser les sections 1-5 existantes.
