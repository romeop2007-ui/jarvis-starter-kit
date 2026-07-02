---
name: recherche-logement-huesca
description: Recherche un appartement à Huesca (Espagne) pour Roméo en élargissant chaque fois à de nouveaux sites/agences, puis pousse les résultats sur la page Notion "Logement Huesca". Déclencheurs : "trouve des appartements pour Huesca", "recherche appartement Espagne/Huesca", "cherche-moi un logement à Huesca", "continue la recherche logement Saragosse".
allowed-tools: WebSearch, WebFetch, Bash(python .claude/skills/recherche-logement-huesca/scripts/*), mcp__claude_ai_Notion__notion-fetch, mcp__claude_ai_Notion__notion-update-page, mcp__claude_ai_Notion__notion-search
---

# Recherche logement Huesca

## Objectif
Trouver de nouveaux candidats logement à Huesca pour Roméo et son colocataire, sans jamais répéter une recherche déjà faite, puis les ajouter à la page Notion de suivi.

## Critères fixes (non négociables sans confirmation de Roméo)
- 2 personnes, hommes, +18 ans
- Budget : 500 €/personne max (1000 €/mois total pour le logement)
- Max 15 min à pied de **Plaza de la Constitución s/n, 22001 Huesca** (Facultad de Empresa y Gestión Pública, vraie fac de Roméo — confirmé sur tampon officiel le 24/06/2026 ; à ≈126 m de l'ancienne référence Ronda Misericordia 5, donc tous les calculs déjà faits restent valides)

## Note environnement (routine cloud planifiée)
Si l'exécution se fait en routine cloud headless (pas une session interactive), le sandbox réseau bloque WebFetch et tout appel réseau direct (y compris `geocode_distance.py`, qui utilise urllib) sur TOUS les domaines, même non-immobiliers (403/host_not_allowed). Seul WebSearch fonctionne dans ce contexte.
- Ne pas perdre de temps à retenter WebFetch/le script s'ils échouent une fois sur un domaine neutre (ex. nominatim.openstreetmap.org) : c'est une restriction d'environnement, pas un blocage spécifique au site, donc inutile de réessayer ailleurs.
- Estimer la distance à pied uniquement via WebSearch dans ce cas (ex. rechercher "<adresse>, Huesca distancia a pie Plaza de la Constitución" ou des points de repère connus du centre de Huesca), marquer clairement l'estimation **⚠️ distance estimée via recherche, à reconfirmer**.
- **Ne jamais écarter un candidat par ailleurs valide uniquement parce que la distance ne peut pas être calculée précisément dans cet environnement.** L'ajouter à Notion avec l'estimation et l'avertissement plutôt que de ne rien ajouter — Roméo confirmera lui-même (Google Maps) à sa prochaine session.

## Étape 1 — Lire la liste anti-doublon
Lire `references/sites-deja-couverts.md` **et** la section "Sites & agences déjà explorés" de la page Notion (voir `references/format-notion.md`) — la version Notion peut être plus à jour si une routine cloud sans droit de commit a tourné depuis la dernière mise à jour du fichier local. Ne jamais relancer une recherche sur un site listé en "déjà couverts" dans l'une ou l'autre source. Choisir des sites dans "pistes à explorer" ou en trouver de nouveaux.

## Étape 2 — Chercher
Pour chaque nouveau site : WebSearch puis WebFetch sur les pages de listing. Si l'annonce est sur un portail agrégateur, identifier l'agence/particulier réel derrière (souvent en bas de fiche, section "anunciante"/contact).

**Objectif de volume : minimum 5 nouveaux logements par recherche.** Si l'exploration d'un site ne suffit pas à atteindre 5, explorer un site supplémentaire (nouveau ou dans "pistes à explorer") avant de conclure. **Aucun plafond à l'inverse : si un seul site fait remonter plus de 5 candidats qui respectent les critères fixes (ex. 7), les présenter TOUS, ne jamais en écarter pour coller à un chiffre rond.** Le seuil de 5 est un minimum à atteindre, pas un maximum à respecter.

## Étape 3 — Pour chaque logement retenu, collecter
> ⚠️ **RÈGLE ABSOLUE (prioritaire sur les critères) : chaque bien doit avoir un LIEN DIRECT vers sa fiche d'annonce** (cliquer ouvre la page du bien, pas l'accueil du site). À défaut, fournir adresse exacte + téléphone/email de l'annonceur pour le contacter. Sans lien direct ni contact exploitable → **supprimer le bien**. Un seul lien par bien, jamais un lien vers l'accueil du site. Voir `references/format-notion.md` (section "RÈGLE ABSOLUE").
>
> ⚠️ **RÈGLE RÉPUTATION (02/07/2026, durcie) : seuil Trustpilot ≥ 4/5.** Avant d'utiliser un portail comme source, vérifier sa note Trustpilot (WebSearch "<site> Trustpilot opiniones"). **Note < 4/5 = écarté.** **Pas de profil Trustpilot du tout = gardé** (bénéfice du doute, Roméo l'a demandé). Écartés à ce jour : **idealista (1,3), rentola.es (1,7, piège abonnement 1€→39€), enalquiler.com (2,83)**. Gardés sans profil : Gállego Martínez, alquilarhabitacion.es, bourse unizar. **Astuce clé : le portail n'est qu'un intermédiaire** — un bien sur un portail écarté reste valable si le vrai annonceur est une agence/particulier joignable en direct : garder le bien en reroutant vers le contact DIRECT (ex. Fincas Montearagón ☎ 974 23 82 44 ; Tecnocasa Palacio de los Reyes ☎ 974 22 96 60). Toujours vérifier aussi la réputation de l'agence/annonceur (Étape 3.2).

1. Adresse + **lien direct de la fiche** (pas l'accueil) + agence/annonceur réel + son téléphone/email
2. Avis : WebSearch "<agence> Trustpilot", sinon ProvenExpert/RealAdvisor/avis Google. Toujours rapporter le négatif s'il existe.
3. Mobilier/équipements détaillés depuis l'annonce (⚠️ si absent)
4. Distance à pied :
   ```bash
   python .claude/skills/recherche-logement-huesca/scripts/geocode_distance.py "<adresse ou rue>, Huesca"
   ```
   Si `"precise": false` dans la sortie JSON, signaler que l'estimation est large (adresse exacte inconnue).
5. Équipements du logement : machine à laver, type de chauffage, mode de production d'eau chaude, isolation (⚠️ si non précisé dans l'annonce)
6. Charges et dépenses : électricité incluse ou non, estimation des charges mensuelles, mode de paiement (compteur au nom du locataire vs payé via propriétaire/agence), autres charges possibles (taxe/redevance poubelles, électricité parties communes, nettoyage/entretien immeuble)
7. Caractéristiques : superficie, type de location (seul/colocation) et nombre de colocataires si colocation
8. Conditions de location : possibilité de réserver en juin avec caution, possibilité de ne commencer à payer qu'en septembre (pas de paiement juillet/août), durée du bail proposée et acceptation ou non d'un bail court (6 mois) par le propriétaire
9. Confort saisonnier : température/confort été et hiver (logement froid ou bien isolé) si mentionné dans l'annonce ou les avis
10. Équipement personnel à prévoir : linge de lit (draps, couverture, oreiller) fourni ou à apporter

Pour les points 5 à 10, marquer **⚠️ non précisé dans l'annonce** plutôt que de deviner ou d'inventer une info absente.

## Étape 4 — Mettre à jour Notion
Suivre exactement `references/format-notion.md` : `notion-fetch` sur la page existante, puis `notion-update-page` en ajout (jamais en réécriture totale), numérotation continue, tableau de synthèse mis à jour.

## Étape 5 — Mettre à jour la liste anti-doublon
Éditer `references/sites-deja-couverts.md` : déplacer les sites utilisés vers "déjà couverts", ajouter les nouvelles agences notées.
**Si exécuté en routine cloud et que les instructions de la routine interdisent tout commit git** : cette modification locale sera perdue à la fin du run (le sandbox cloud est jeté). Dans ce cas, écrire la mise à jour anti-doublon **directement sur la page Notion** (section dédiée, voir `references/format-notion.md`) en plus du fichier local, puisque c'est le seul canal qui persiste réellement entre deux exécutions de la routine. Le signaler explicitement dans le résumé final à Roméo.

## Étape 6 — Résumer à Roméo
En fin de tâche, lister en quelques lignes les nouveaux logements trouvés (numéro, lieu, prix, distance) et le lien Notion. Pas de validation intermédiaire requise pendant la recherche.

## Cas particuliers
- Aucun nouveau candidat trouvé après avoir exploré toutes les pistes connues → le dire honnêtement à Roméo plutôt que de forcer un résultat médiocre, et proposer 2-3 nouvelles pistes de sites/canaux à essayer la prochaine fois.
- Site qui bloque (403/captcha) → noter dans `sites-deja-couverts.md` qu'il est bloqué pour WebFetch direct, mais qu'il reste exploitable via WebSearch.
