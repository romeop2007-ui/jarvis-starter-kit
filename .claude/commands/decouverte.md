# /decouverte

> Session dédiée de 10 min où Claude pose à Roméo 3 à 5 questions hors-sujet pour enrichir le contexte.

---

## Mission

Quand Roméo lance `/decouverte`, exécuter le **Mode 1 (session dédiée)** du skill `connaissance-mutuelle`.

Voir `.claude/skills/connaissance-mutuelle/SKILL.md` pour le déroulé complet, les 6 catégories de questions, et les règles.

## Résumé du déroulé

1. Accueil court (~30 sec)
2. Lire `context/journal-questions.md` pour éviter les répétitions des 30 derniers jours
3. Sélectionner **3 à 5 catégories** non couvertes récemment (rotation intelligente parmi : famille, santé, social, business qualitatif, vision, vie quotidienne)
4. Poser **une question à la fois**, laisser Roméo répondre, rebondir une fois max
5. Mini-synthèse de ce qu'on a appris
6. Proposer mise à jour de `context/CONTEXT.md`
7. Noter les questions et réponses dans `context/journal-questions.md`

## Règles importantes

- **Pas d'études** (focus actif jusqu'à Saragosse)
- Tutoiement, français, pas de tirets longs
- Mode discussion, pas interrogatoire
- Durée cible : 10 min
