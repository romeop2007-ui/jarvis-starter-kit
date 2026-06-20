---
name: crea-pub
description: Usine a creas publicitaires Zooryn. A partir d'une pub concurrent fournie par Romeo (VIDEO .mp4 ou IMAGE statique .jpg/.png), produit un dossier pret a finaliser. Detecte automatiquement le type. Video -> dossier pret a monter dans CapCut (video sans sous-titres via Vmake, script voix off FR adapte a la marque, voix off ElevenLabs calee sur la duree). Image -> texte FR adapte a la marque avec plan de placement, a poser dans Canva sur le visuel d'origine (conserve a l'identique). A declencher quand Romeo dit "fais-moi les creas", "transforme cette pub", "adapte cette crea", ou fournit un .mp4/.jpg/.png de concurrent a adapter.
allowed-tools: Bash, Read, Write, Edit, Glob
---

# Skill crea-pub — Usine a creas Zooryn

Transforme une pub concurrent (.mp4) en un dossier pret a monter pour Romeo. Voir le plan
complet : `C:\Users\franv\.claude\plans\ok-on-passe-en-wild-cascade.md`.

## Entrees attendues (a demander a Romeo si manquantes)

Pour CHAQUE pub :
1. Le **fichier video .mp4** (la crea concurrent).
2. Le **nom du produit Shopify** correspondant (ex "Zooryn - Guirlande lumineuse solaire").

Romeo fournit en general un **lot** : un dossier source dans `ressources créas avant modifs/`
nomme `T3`, `T4`, etc. (un dossier = un produit/test). Traiter chaque pub du lot une par une,
puis bilan final. Les pubs sont numerotees AD1, AD2, ... dans l'ordre du lot.

## Convention de sortie (livrables) — IMPOSEE PAR ROMEO

Le livrable final de chaque pub va dans :

```
livrables/ecommerce/creas/ressources créas après modifs/<LOT>/<ADn>/
```

ex `ressources créas après modifs/T4/AD1/`. Le `<LOT>` = le nom du dossier source (T4...).
Helper : `node scripts/folder.mjs --lot T4 --ad AD1` cree et imprime ce dossier.

**Chaque dossier ADn ne contient QUE ce dont Romeo a besoin dans CapCut :**
- pub video AVEC voix off -> `voix-off.mp3` (le seul fichier utile : c'est la voix off generee) ;
- pub muette/musicale OU pub image -> `accroches-fr.md` (les textes FR a poser).

Le **visuel** (`video-sans-soustitres.mp4` apres Vmake, ou la creas image finale) viendra
s'ajouter dans ce meme dossier ADn plus tard. Romeo assemble visuel + audio dans CapCut.

Les fichiers de TRAVAIL (transcription source, brouillon de script, frames) ne vont PAS dans
le livrable final : les garder dans un dossier de travail temporaire (ancien helper
`scripts/folder.mjs "<produit>" "<nom-pub>"`) et ne pas encombrer `ADn`.

## Detection du type de pub (router)

Regarder l'extension du fichier fourni :
- **Video** (`.mp4`, `.mov`, `.webm`, `.avi`, `.mkv`) -> suivre le **Chemin VIDEO**.
- **Image** (`.jpg`, `.jpeg`, `.png`, `.webp`) -> suivre le **Chemin IMAGE**.

Dans un lot mixte, router chaque pub selon son type.

## Pre-requis techniques (verifier une fois)

- `ELEVEN_LABS_API_KEY` presente dans le `.env` (voix off, sinon le dire et s'arreter).
- `VMAKE_API_KEY` + `VMAKE_API_SECRET` dans le `.env` (retrait sous-titres via API Vmake).
- Dependances : `cd .claude/skills/crea-pub && npm install` (Node) ; `python -m pip install requests alibabacloud_oss_v2` (SDK Vmake).
- Vmake = API officielle (SDK `vendor/vmake-sdk/`), voir `references/vmake-steps.md`. ⚠️ Claude NE PEUT PAS executer le SDK : il prepare la commande, Romeo l'execute.


## Choix de la voix (1re fois, puis memorise)

Objectif de Romeo : la voix off doit ressembler le plus possible a la voix de la crea d'origine.
On ne CLONE PAS la voix reelle du concurrent (interdit par ElevenLabs). On choisit la voix du
catalogue la plus proche.

- Lister les voix : `node scripts/voices.mjs` (filtre possible : `node scripts/voices.mjs french`).
  **Si erreur "missing permission voices_read"** : la cle de Romeo n'autorise pas le listing.
  Dans ce cas, Romeo choisit la voix directement dans son dashboard ElevenLabs et donne le
  `voice_id` (ou le nom). La generation (TTS) marche sans cette permission.
- La 1re fois sur un type de pub : proposer 2-3 voix candidates (genre, age, energie, accent
  proches de la crea), laisser Romeo trancher.
- Memoriser le `voice_id` choisi par defaut (le noter dans la fiche infos de la pub et le
  reproposer ensuite). Romeo peut le changer a tout moment.

## Chemin VIDEO (pub .mp4)

Travailler depuis `.claude/skills/crea-pub`. Utiliser un **dossier de travail** temporaire pour
les fichiers intermediaires, et le **dossier livrable** `ressources créas après modifs/<LOT>/<ADn>/`
(via `node scripts/folder.mjs --lot <LOT> --ad <ADn>`) pour le seul fichier final utile.

⚠️ Important : certaines pubs video sont **muettes / musicales** (pas de voix off, juste des
accroches texte incrustees). Verifier la transcription : si elle ne contient que de la musique
(ex "(musique de fin)"), il n'y a PAS de voix off a generer -> traiter comme une pub image
(relever les accroches incrustees et les adapter en FR, cf. Chemin IMAGE), livrable
`accroches-fr.md`. Ne generer une voix off QUE si la pub d'origine en a une.

1. **Duree** : `node scripts/duration.mjs "<video.mp4>"` -> note D en secondes.
2. **Transcription** : `node scripts/transcribe.mjs "<video.mp4>" "<dossier_travail>"`
   -> recupere le texte source (langue d'origine) + ecrit `transcription-source.txt`.
   Si la transcription = musique seule -> bascule sur le traitement "accroches" (voir encadre).
3. **Texte FR dans le ADn** : ecrire le script rendu en francais (PROMPT FIXE ci-dessous)
   DIRECTEMENT dans le dossier livrable du ADn : `script-fr.txt` (pub a voix off) ou
   `accroches-fr.md` (pub muette/musicale). Calibrer : viser environ `D x 2,4` mots sans
   depasser la duree, et prevoir GENEREUX (Sarah debite vite, plancher vitesse 0,9 ; un
   script trop court sort une voix plus courte que la video).
4. **Detourage + voix off (commande unique, lancee par Romeo)** : donner a Romeo
   `creas-lot.ps1 -Lot <LOT>`. Pour chaque video du lot, elle retire les sous-titres via
   l'API Vmake ET, si un `script-fr.txt` est present dans le ADn, synthetise `voix-off.mp3`
   cale sur la duree de la source ; tout est range dans `<LOT>/ADn/`
   (`video-sans-soustitres.mp4` + `voix-off.mp3`). Details/fallback : `references/vmake-steps.md`.
   (Une seule video hors lot : `vmake-api.ps1 run-task --task videoscreenclear --input X`.)
5. **Controle STRICT de la duree voix off (tolerance 1 s)** : apres la commande, comparer la
   duree de `voix-off.mp3` a la duree de la video source. La voix off doit durer le MEME temps
   que la video, a +/- 1 seconde pres. Exemple (lot TEST, video 24,2 s) : 16 s = MORT, il faut
   tomber entre 23 et 25 s. Si l'ecart depasse 1 s : REECRIRE `script-fr.txt` (l'ALLONGER si la
   voix est trop courte, le raccourcir si trop longue) puis RELANCER `creas-lot.ps1 -Lot <LOT>`,
   et repeter jusqu'a etre dans les +/- 1 s. Le vrai levier = la LONGUEUR du script (la vitesse
   TTS seule ne suffit pas, elle est bornee a 0,9-1,15).
6. **Fiche infos** (optionnelle, dans le dossier de travail) : durees, voice_id, langue source,
   statut Vmake.

## PROMPT FIXE de generation du script (impose par Romeo)

Utiliser exactement cette consigne pour produire le script FR :

> Tu es le createur de la marque "Zooryn". Le nom de ton produit est "<NOM PRODUIT SHOPIFY>".
> Traduis ce script en francais, ne depasse pas <D> secondes (en fonction du temps de la video
> crea, et adapte si besoin sans changer le sens du script) :
> <TRANSCRIPTION DE LA CREA CONCURRENT>

Le script FR doit : garder le sens et la structure de la pub d'origine, sonner naturel a l'oral
(c'est une voix off, pas un texte ecrit), et tenir dans la duree. Pas de mention d'une autre
marque que Zooryn.

## Sortie d'un dossier pub (pret a monter)

Livrable final, minimaliste (Romeo n'y veut que l'essentiel) :

```
ressources créas après modifs/<LOT>/<ADn>/
  voix-off.mp3                 <- pub video avec narration (le SEUL fichier audio utile)
  accroches-fr.md              <- pub muette/musicale ou image (textes FR a poser)
  video-sans-soustitres.mp4    <- le visuel, ajoute apres Vmake (vient plus tard)
```

Romeo importe ensuite visuel + audio (ou accroches) dans CapCut pour le rendu final.

## Chemin IMAGE (pub statique .jpg/.png)

Objectif : garder le visuel exact du concurrent, remplacer uniquement le texte par du FR adapte
a la marque. Aucune API externe : c'est de la vision (lecture image) + redaction. Romeo posera
le texte dans Canva. NE PAS regenerer l'image (le visuel produit doit rester intact).

1. **Creer le dossier livrable** : `node scripts/folder.mjs --lot <LOT> --ad <ADn>`.
2. **Lire l'image / les frames** avec l'outil Read (vision) pour voir le visuel ET tout le texte
   incruste. Pour une video musicale, extraire plusieurs frames dans le temps (ffmpeg `-ss`)
   pour capter TOUTES les accroches qui defilent, pas juste une.
3. **Relever chaque zone de texte** : accroche/titre, sous-titres, bullets/benefices, prix,
   badges, bouton/CTA, mentions. Pour chacune : texte d'origine + position (haut/centre/bas,
   gauche/droite) + hierarchie (gros titre, corps, petit) + (video) le moment ~en secondes.
4. **Traduire/adapter en FR a la marque** avec le PROMPT FIXE adapte (ci-dessous), sans changer
   le sens ni le message, en gardant la meme structure et la meme longueur approximative
   (pour que ca rentre dans la meme place).
5. **Ecrire `accroches-fr.md`** dans le dossier livrable : un tableau zone par zone (ordre,
   moment, texte d'origine -> texte FR -> position -> hierarchie), pret a poser dans CapCut/Canva.
   Signaler les mots plus longs en FR (placement a surveiller) et tout logo concurrent grave sur
   le produit (non retirable par Vmake, a masquer/couper au montage).

### PROMPT FIXE pour le texte image (adapte du prompt video de Romeo)

> Tu es le createur de la marque "Zooryn". Le nom de ton produit est "<NOM PRODUIT SHOPIFY>".
> Voici les textes d'une pub statique d'un concurrent, zone par zone. Traduis-les en francais
> et adapte-les a la marque sans changer le sens ni le message, en gardant la meme hierarchie
> et une longueur proche de l'original : <LISTE DES TEXTES PAR ZONE>

### Sortie d'un dossier pub IMAGE / muette (pret a poser)

```
ressources créas après modifs/<LOT>/<ADn>/
  accroches-fr.md   <- les textes FR zone par zone, a poser dans Canva/CapCut
  (le visuel finalise viendra ici plus tard)
```

Romeo : pose chaque texte FR du tableau sur le visuel d'origine (Canva pour une image, CapCut
pour une video muette), exporte.

## Bilan final (toujours)

Apres avoir traite toutes les pubs, annoncer a Romeo combien sont pretes, sous la forme :
"X pubs pretes a monter dans CapCut" + la liste des dossiers + tout ce qui a bloque (ex Vmake
en manuel sur telle pub). Romeo verifie, importe dans CapCut, monte, poste sur Meta.

## Limites (rappeler si pertinent)

- Vmake = API officielle (async, fiable). Claude prepare la commande, Romeo l'execute (auto-execution interdite). Fallback manuel si l'API casse.
- Voix = la plus proche du catalogue, pas un clone.
- Duree = tres proche, pas exacte a la frame.
- CapCut = 100 % manuel (l'agent prepare, Romeo monte).
