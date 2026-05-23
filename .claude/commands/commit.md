# /commit

> Commande pour sauvegarder le travail en cours via Git.

---

## Mission

Quand je lance `/commit`, exécute la séquence suivante :

### Étape 1 : Vérifier l'état du dépôt

- Si aucun dépôt Git n'existe (pas de `.git/`), initialise-le avec `git init`, puis continue.
- Vérifie que `.gitignore` est présent et que `.env` y figure. Sinon, alerte-moi avant de continuer.

### Étape 2 : Analyser les changements

Lance `git status` et `git diff --stat` pour identifier :
- Les fichiers modifiés
- Les fichiers non suivis (untracked)
- Les fichiers déjà en staging

Présente-moi un résumé compact de ce qui va être committé.

### Étape 3 : Proposer un message de commit

Génère un message de commit en français, clair et descriptif, basé sur les changements détectés.
Format : `type: description courte`

Types utilisés :
- `ajout` : nouveau fichier ou nouvelle fonctionnalité
- `modif` : modification d'un fichier existant
- `suppr` : suppression
- `fix` : correction d'un problème
- `struct` : réorganisation ou renommage sans changement de contenu

Exemples :
- `ajout: structure livrables/ et README associé`
- `modif: mise à jour CONTEXT.md avec nouveaux objectifs`
- `struct: réorganisation dossier ecommerce/publicite`

Soumets-moi le message proposé et demande-moi de confirmer ou de le modifier avant de committer.

### Étape 4 : Scanner les secrets

Avant tout commit, analyse le contenu des fichiers stagés pour détecter d'éventuels secrets exposés.

Recherche les patterns suivants dans les fichiers qui vont être committés (`git diff --cached`) :

- Clés API brutes : chaînes de type `sk-`, `pk_live_`, `pk_test_`, `AIza`, `AKIA` (AWS)
- Tokens longs (40+ caractères alphanumériques sans espaces dans une valeur de variable)
- Variables dont le nom contient `KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `PASSWD`, `PWD`, `CREDENTIAL`, `AUTH` avec une valeur non vide et non commentée
- URLs contenant des credentials : `https://user:password@...`
- Fichiers `.env`, `.pem`, `.key`, `.p12`, `.pfx` inclus par erreur

Si un secret potentiel est détecté :
1. **Stoppe immédiatement** sans committer.
2. Montre-moi exactement quel fichier et quelle ligne pose problème.
3. Demande-moi si c'est un faux positif ou un vrai secret à retirer.
4. Ne reprends la séquence qu'une fois que j'ai confirmé que tout est propre.

Si aucun secret n'est détecté, indique-le brièvement et passe à l'étape suivante.

### Étape 5 : Exécuter le commit

Une fois le message validé et le scan de secrets passé :
1. `git add -A` (sauf les fichiers exclus par `.gitignore`)
2. `git commit -m "[message validé]"`
3. Confirme le succès avec le hash court du commit et le nombre de fichiers committés.

---

## Règles importantes

- Ne jamais committer `.env`, `.secrets` ou tout fichier de clés. Vérifier systématiquement.
- Ne jamais utiliser `--no-verify` ou bypasser les hooks Git.
- Toujours demander confirmation du message avant de committer.
- Si je passe un argument à la commande (ex: `/commit ajout boutique Shopify`), utilise ce texte comme base pour le message de commit plutôt que d'en générer un automatiquement.
- Répondre en français, tutoiement.
