# À faire en arrivant sur le MacBook

Salut Roméo. Ce dossier est ton Jarvis complet, prêt à reprendre sur le Mac.
Suis les étapes dans l'ordre, ça prend une vingtaine de minutes dont beaucoup d'attente.

---

## Étape 1 : poser le dossier au bon endroit

Depuis ton cloud, télécharge le dossier et mets-le sur le Bureau.
**Renomme-le en `jarvis-starter-kit`** (enlève le `JARVIS-POUR-MAC`).

Tu dois obtenir : `/Users/<ton-nom>/Desktop/jarvis-starter-kit`

---

## Étape 2 : lancer le script de restauration

Ouvre l'app **Terminal** (touche cmd + espace, tape "Terminal"), puis colle ces deux lignes :

```bash
cd ~/Desktop/jarvis-starter-kit
bash restaurer-sur-mac.sh
```

Le script installe ce qu'il manque (Homebrew, Git, Node, Python, la CLI Shopify),
réinstalle les dépendances des skills, et te dit quoi faire pour la mémoire.

Si une commande te demande ton mot de passe Mac, c'est normal, c'est Homebrew.

---

## Étape 3 : ouvrir dans VS Code

Dans VS Code : **File → Open Folder**, puis choisis `jarvis-starter-kit`.
(C'est le bouton bleu "Open Folder" que tu vois sur l'écran d'accueil.)

Installe l'extension **Claude Code** si elle n'y est pas encore.

---

## Étape 4 : me redonner la mémoire

C'est l'étape que le script ne peut pas faire tout seul, parce qu'elle dépend
d'un dossier qui n'existe qu'après ton premier lancement de Claude Code.

1. Lance Claude Code une première fois dans le dossier, dis-moi juste bonjour.
2. Puis reviens dans le Terminal et colle :

```bash
ls ~/.claude/projects/
```

3. **Montre-moi le résultat.** Je te donnerai la commande exacte pour déposer
   les 61 fiches du dossier `_MEMOIRE-CLAUDE/` au bon endroit.

Pourquoi je ne peux pas le deviner : le nom du dossier est fabriqué à partir du
chemin complet du workspace, donc il dépend de ton nom d'utilisateur Mac.

---

## Étape 5 : vérifier que tout marche

Dans Claude Code, lance :

```
/prime
```

Si je te récite qui tu es, tes objectifs et tes engagements en cours, c'est bon.

Puis teste l'accès à ta boutique :

```bash
export $(grep SHOPIFY_CLI_THEME_TOKEN .env)
shopify theme pull --store cqqah9-t1.myshopify.com --theme 203403854169 --only config/settings_data.json --path "livrables/ecommerce/boutiques/zooryn-shrine"
```

Si le téléchargement passe, ton `.env` fonctionne et la CLI est débloquée.

---

## Ce qui est dans ce dossier

- **Tout ton workspace** : CLAUDE.md, context/, les 17 skills, livrables/
- **Le dépôt Git complet** : tu peux faire `git push` directement depuis le Mac
- **`.env`** avec tes 9 clés API, et la clé du compte de service Google
- **`_MEMOIRE-CLAUDE/`** : 61 fiches, tout ce que j'ai appris de toi depuis mai
- **La formation Zecom** : toutes les transcriptions et les PDF

## Ce qui n'y est pas, volontairement

- **Les 34 vidéos de la formation** (14,7 Go). Les transcriptions sont là, et
  c'est elles que j'utilise. Si tu veux les vidéos, copie-les à part depuis le PC.
- **Les `node_modules`** (906 Mo). Le script les réinstalle en une commande.

## Important, à faire une fois que tout marche

**Supprime ce dossier de ton cloud.** Le fichier `.env` contient tes clés API en
clair : OpenAI, ElevenLabs, Klaviyo, Anthropic, et le token Theme Access de ta
boutique Shopify. Tant qu'il est sur le cloud, il est exposé.

**Garde le PC intact une à deux semaines**, le temps d'être sûr qu'il ne manque rien.
