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
2. Le **nom de la pub** (sert au nommage du dossier, ex "AD1-angle-douleur").
3. Le **nom du produit Shopify** correspondant (ex "Matelas gonflable Zooryn").

Romeo peut en donner 1 ou plusieurs d'un coup. Traiter pub par pub, puis bilan final.

## Detection du type de pub (router)

Regarder l'extension du fichier fourni :
- **Video** (`.mp4`, `.mov`, `.webm`, `.avi`, `.mkv`) -> suivre le **Chemin VIDEO**.
- **Image** (`.jpg`, `.jpeg`, `.png`, `.webp`) -> suivre le **Chemin IMAGE**.

Dans un lot mixte, router chaque pub selon son type.

## Pre-requis techniques (verifier une fois)

- `ELEVENLABS_API_KEY` presente dans le `.env` du workspace (sinon le dire et s'arreter).
- Dependances installees : `cd .claude/skills/crea-pub && npm install` (ffmpeg-static, ffprobe-static).
- Pour Vmake : Chrome de Romeo connecte a son compte (voir `references/vmake-steps.md`).

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

Travailler depuis `.claude/skills/crea-pub`. Le dossier de sortie est cree automatiquement par
les scripts sous `livrables/ecommerce/creas/<produit>__<nom-pub>/`.

1. **Duree** : `node scripts/duration.mjs "<video.mp4>"` -> note D en secondes.
2. **Transcription** : `node scripts/transcribe.mjs "<video.mp4>" "<dossier_sortie>"`
   -> recupere le texte source (langue d'origine) + ecrit `transcription-source.txt`.
3. **Sous-titres retires (Vmake)** : suivre `references/vmake-steps.md` (browser-use).
   Resultat -> `<dossier_sortie>/video-sans-soustitres.mp4`. Si Vmake casse : fallback (cf. ref).
4. **Script FR** : rediger le script avec le PROMPT FIXE ci-dessous, l'ecrire dans
   `<dossier_sortie>/script-fr.txt`. Calibrer la longueur : viser environ `D x 2,4` mots
   (debit voix off FR), sans depasser la duree.
5. **Voix off** : `node scripts/tts.mjs --voice <voice_id> --target <D> --out "<dossier_sortie>" --text-file "<dossier_sortie>/script-fr.txt"`
   -> ecrit `voix-off.mp3` cale au plus proche de D.
6. **Fiche infos** : ecrire `<dossier_sortie>/infos.md` (nom pub, produit, duree video, duree
   voix off, voice_id utilise, langue source, statut Vmake).

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

```
livrables/ecommerce/creas/<produit>__<nom-pub>/
  video-sans-soustitres.mp4   <- a importer dans CapCut
  voix-off.mp3                 <- a importer dans CapCut
  script-fr.txt                <- le texte dit par la voix off
  transcription-source.txt     <- la pub d'origine transcrite
  infos.md                     <- recap (durees, voix, statut)
```

## Chemin IMAGE (pub statique .jpg/.png)

Objectif : garder le visuel exact du concurrent, remplacer uniquement le texte par du FR adapte
a la marque. Aucune API externe : c'est de la vision (lecture image) + redaction. Romeo posera
le texte dans Canva. NE PAS regenerer l'image (le visuel produit doit rester intact).

1. **Creer le dossier** de sortie et y copier l'image source :
   `node scripts/folder.mjs "<produit>" "<nom-pub>"` affiche le chemin du dossier ; copier
   l'image dedans en `source.<ext>` (Bash `cp`).
2. **Lire l'image** avec l'outil Read (vision) pour voir le visuel ET tout le texte incruste.
3. **Relever chaque zone de texte** : accroche/titre, sous-titres, bullets/benefices, prix,
   badges, bouton/CTA, mentions. Pour chacune : texte d'origine + position (haut/centre/bas,
   gauche/droite) + hierarchie (gros titre, corps, petit).
4. **Traduire/adapter en FR a la marque** avec le PROMPT FIXE adapte (ci-dessous), sans changer
   le sens ni le message, en gardant la meme structure et la meme longueur approximative
   (pour que ca rentre dans la meme place).
5. **Ecrire `texte-fr.md`** dans le dossier : un tableau zone par zone (texte d'origine ->
   texte FR -> position -> hierarchie), pret a recopier dans Canva. Signaler les mots qui
   risquent d'etre plus longs en FR (placement a surveiller).

### PROMPT FIXE pour le texte image (adapte du prompt video de Romeo)

> Tu es le createur de la marque "Zooryn". Le nom de ton produit est "<NOM PRODUIT SHOPIFY>".
> Voici les textes d'une pub statique d'un concurrent, zone par zone. Traduis-les en francais
> et adapte-les a la marque sans changer le sens ni le message, en gardant la meme hierarchie
> et une longueur proche de l'original : <LISTE DES TEXTES PAR ZONE>

### Sortie d'un dossier pub IMAGE (pret a poser dans Canva)

```
livrables/ecommerce/creas/<produit>__<nom-pub>/
  source.<ext>     <- l'image d'origine, reference visuelle
  texte-fr.md      <- le texte FR zone par zone, a poser dans Canva
```

Romeo : ouvre l'image dans Canva, remplace chaque texte par la version FR du tableau, exporte.

## Bilan final (toujours)

Apres avoir traite toutes les pubs, annoncer a Romeo combien sont pretes, sous la forme :
"X pubs pretes a monter dans CapCut" + la liste des dossiers + tout ce qui a bloque (ex Vmake
en manuel sur telle pub). Romeo verifie, importe dans CapCut, monte, poste sur Meta.

## Limites (rappeler si pertinent)

- Vmake = fragile (fallback manuel prevu).
- Voix = la plus proche du catalogue, pas un clone.
- Duree = tres proche, pas exacte a la frame.
- CapCut = 100 % manuel (l'agent prepare, Romeo monte).
