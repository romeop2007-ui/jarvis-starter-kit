#!/bin/bash
# Restauration du workspace Jarvis sur macOS.
# Usage :  cd ~/Desktop/jarvis-starter-kit && bash restaurer-sur-mac.sh

set -u
cd "$(dirname "$0")"

vert()  { printf "\033[0;32m%s\033[0m\n" "$1"; }
jaune() { printf "\033[0;33m%s\033[0m\n" "$1"; }
rouge() { printf "\033[0;31m%s\033[0m\n" "$1"; }
titre() { printf "\n\033[1m== %s ==\033[0m\n" "$1"; }

titre "1. Verification du dossier"
manque=0
for f in CLAUDE.md context/CONTEXT.md .claude/skills .env _MEMOIRE-CLAUDE; do
  if [ -e "$f" ]; then vert "  OK   $f"; else rouge "  MANQUE  $f"; manque=1; fi
done
if [ "$manque" = "1" ]; then
  rouge ""
  rouge "Des elements manquent. Tu n'es peut-etre pas dans le bon dossier,"
  rouge "ou le telechargement depuis le cloud est incomplet. Arret."
  exit 1
fi

titre "2. Homebrew"
if command -v brew >/dev/null 2>&1; then
  vert "  deja installe"
else
  jaune "  installation (ton mot de passe Mac va etre demande)"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Apple Silicon : brew vit dans /opt/homebrew
  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    grep -q 'opt/homebrew/bin/brew shellenv' ~/.zprofile 2>/dev/null || \
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
  fi
fi

titre "3. Outils de base"
for outil in git node python@3.12 yt-dlp ffmpeg; do
  nom="${outil%@*}"
  if command -v "$nom" >/dev/null 2>&1; then
    vert "  deja la   $nom"
  else
    jaune "  installation  $outil"
    brew install "$outil" || rouge "  echec sur $outil, on continue"
  fi
done

titre "4. CLI Shopify"
if command -v shopify >/dev/null 2>&1; then
  vert "  deja installee"
else
  jaune "  installation"
  npm install -g @shopify/cli || rouge "  echec, a refaire a la main : npm install -g @shopify/cli"
fi

titre "5. Dependances des skills (node_modules)"
for d in .claude/skills/*/; do
  if [ -f "$d/package.json" ]; then
    jaune "  npm install dans $d"
    (cd "$d" && npm install --silent) || rouge "  echec dans $d"
  fi
done
vert "  termine"

titre "6. Droits d'execution sur les scripts"
find .claude/skills -name "*.sh" -exec chmod +x {} \; 2>/dev/null
vert "  ok"

titre "7. Etat du depot Git"
if [ -d .git ]; then
  git status --short --branch | head -5
  vert "  depot present, tu peux pusher depuis le Mac"
else
  rouge "  pas de depot git, il faudra recloner"
fi

titre "8. Ce qui reste a faire A LA MAIN"
cat <<'FIN'

  a) Ouvre le dossier dans VS Code (File > Open Folder) et installe
     l'extension Claude Code si besoin.

  b) Lance Claude Code une premiere fois dans ce dossier, dis-lui bonjour.
     Ce premier lancement cree le dossier de projet dont on a besoin.

  c) Puis reviens ici et tape :

         ls ~/.claude/projects/

     Montre le resultat a Claude : il te donnera la commande exacte pour
     deposer les 61 fiches de _MEMOIRE-CLAUDE/ au bon endroit.
     Sans cette etape, Claude ne se souvient de rien.

  d) Verifie avec /prime dans Claude Code.

  e) Une fois que tout marche : SUPPRIME ce dossier de ton cloud.
     Le fichier .env contient tes cles API en clair.

FIN

titre "Termine"
vert "Le socle est pret. Passe aux etapes a la main ci-dessus."
