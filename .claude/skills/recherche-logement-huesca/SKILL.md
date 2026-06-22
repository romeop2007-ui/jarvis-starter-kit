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

## Étape 1 — Lire la liste anti-doublon
Lire `references/sites-deja-couverts.md`. Ne jamais relancer une recherche sur un site listé en "déjà couverts". Choisir des sites dans "pistes à explorer" ou en trouver de nouveaux.

## Étape 2 — Chercher
Pour chaque nouveau site : WebSearch puis WebFetch sur les pages de listing. Si l'annonce est sur un portail agrégateur, identifier l'agence/particulier réel derrière (souvent en bas de fiche, section "anunciante"/contact).

## Étape 3 — Pour chaque logement retenu, collecter
1. Adresse + lien source + agence/annonceur réel
2. Avis : WebSearch "<agence> Trustpilot", sinon ProvenExpert/RealAdvisor/avis Google. Toujours rapporter le négatif s'il existe.
3. Mobilier/équipements détaillés depuis l'annonce (⚠️ si absent)
4. Distance à pied :
   ```bash
   python .claude/skills/recherche-logement-huesca/scripts/geocode_distance.py "<adresse ou rue>, Huesca"
   ```
   Si `"precise": false` dans la sortie JSON, signaler que l'estimation est large (adresse exacte inconnue).

## Étape 4 — Mettre à jour Notion
Suivre exactement `references/format-notion.md` : `notion-fetch` sur la page existante, puis `notion-update-page` en ajout (jamais en réécriture totale), numérotation continue, tableau de synthèse mis à jour.

## Étape 5 — Mettre à jour la liste anti-doublon
Éditer `references/sites-deja-couverts.md` : déplacer les sites utilisés vers "déjà couverts", ajouter les nouvelles agences notées.

## Étape 6 — Résumer à Roméo
En fin de tâche, lister en quelques lignes les nouveaux logements trouvés (numéro, lieu, prix, distance) et le lien Notion. Pas de validation intermédiaire requise pendant la recherche.

## Cas particuliers
- Aucun nouveau candidat trouvé après avoir exploré toutes les pistes connues → le dire honnêtement à Roméo plutôt que de forcer un résultat médiocre, et proposer 2-3 nouvelles pistes de sites/canaux à essayer la prochaine fois.
- Site qui bloque (403/captcha) → noter dans `sites-deja-couverts.md` qu'il est bloqué pour WebFetch direct, mais qu'il reste exploitable via WebSearch.
