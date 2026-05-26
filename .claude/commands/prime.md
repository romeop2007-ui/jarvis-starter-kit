# /prime

> Commande pour démarrer une nouvelle session avec contexte complet.

---

## Mission

Quand je lance `/prime` au début d'une session, exécute la séquence suivante :

### Étape 1 : Charger le contexte

Lis dans cet ordre, en intégralité :
1. `CLAUDE.md` (le fichier racine du workspace)
2. `context/CONTEXT.md` (mon contexte personnel et professionnel)
3. `context/HISTORY.md` (l'historique de mes sessions précédentes)

### Étape 2 : Résumer ta compréhension

Présente-moi un résumé clair et synthétique en suivant cette structure :

```
Bonjour [Prénom], j'ai bien chargé ton contexte. Voici où on en est :

**Qui tu es**
- [Synthèse en 2-3 lignes du profil]

**Tes objectifs court terme**
- [Top 3 des objectifs en cours]

**Tes projets actifs**
- [Liste des projets en cours]

**Engagements actifs (rappel)**
- [Lire la section "Engagements actifs" de CONTEXT.md et lister chaque engagement avec sa date/échéance. Si la section est vide ou inexistante, écrire "Aucun engagement actif en cours."]

**Dernière session**
- [Si HISTORY.md contient une entrée récente, la résumer]

**Au fait, où en sont ces sujets ?**
- [Lire la section "Sujets ouverts à relancer" de CONTEXT.md, sélectionner 1 à 3 sujets pertinents au moment présent (en privilégiant ceux dont l'échéance approche ou dont le statut n'a pas bougé depuis longtemps), et poser une question concrète pour chacun, format : "au fait, la dernière fois tu m'avais parlé de X, où ça en est ?". Ne pas tout lister à chaque fois, choisir intelligemment. Si la section est vide, ne rien afficher.]

Je suis prêt à t'aider. Que veux-tu faire aujourd'hui ?
```

### Étape 3 : Attendre les instructions

Ne lance aucune action de toi-même. Attends que je te donne le sujet de la session.

---

## Règles importantes

- Si certains fichiers sont vides ou incomplets, signale-le et propose de les remplir
- Si tu détectes une incohérence entre les fichiers, signale-le calmement
- Ne fais pas de suppositions sur ce qu'on doit faire aujourd'hui, attends mes instructions
- Le résumé doit être en français et utiliser le tutoiement
- Pas de tirets longs (em dashes) dans tes réponses
