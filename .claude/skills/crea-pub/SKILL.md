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


## Choix de la voix (regle fixe, 22/06 : fin de l'imitation du concurrent)

Objectif de Romeo : une voix off NATURELLE en FRANCAIS, jamais robotique, jamais avec un accent. On ne cherche PLUS a imiter la voix/l'accent de la pub d'origine (bug identifie le 22/06 :
une voix anglophone "Owen" donnait un rendu robotique avec accent anglais en francais). On ne
CLONE PAS la voix reelle du concurrent (interdit par ElevenLabs, et inutile desormais).

**Regle simple : seul le genre de la voix d'origine compte.**
- Narrateur/trice FEMME dans la pub source -> voix par defaut **Celine FR** (`voice_id`
  `3fxbs2pB9bs8S6Z1N38A`, "Celine - Warm & Immersive", francais standard, chaleureuse).
- Narrateur/trice HOMME dans la pub source -> voix par defaut **Sami FR** (`voice_id`
  `CHgMYjn76aYQJxan8fTm`, "Sami - Studio-Quality French", francais standard, naturel).
- Ces deux voix sont deja ajoutees a la bibliotheque ElevenLabs du compte (ajoutees le 22/06).
  Toujours utiliser `model_id: eleven_multilingual_v2` (verifie compatible francais "standard").

- Si Romeo veut varier : chercher d'autres voix FR natives via la bibliotheque partagee
  (`GET /v1/shared-voices?language=fr`, filtrer `accent: standard` pour eviter les accents
  regionaux/etrangers sauf demande explicite), jamais une voix dont la langue de base n'est pas
  le francais (meme les voix "multilingues" anglaises gardent un accent residuel en francais).
- Lister les voix deja dans le compte : `node scripts/voices.mjs` (filtre possible :
  `node scripts/voices.mjs french`). **Si erreur "missing permission voices_read"** : la cle de
  Romeo n'autorise pas le listing ; dans ce cas Romeo choisit directement dans son dashboard
  ElevenLabs et donne le `voice_id`. La generation (TTS) marche sans cette permission.
- Memoriser le `voice_id` choisi (genre + defaut ci-dessus, sauf changement explicite de Romeo)
  dans la fiche infos de la pub.

## Chemin VIDEO (pub .mp4)

Travailler depuis `.claude/skills/crea-pub`. Utiliser un **dossier de travail** temporaire pour
les fichiers intermediaires, et le **dossier livrable** `ressources créas après modifs/<LOT>/<ADn>/`
(via `node scripts/folder.mjs --lot <LOT> --ad <ADn>`) pour le seul fichier final utile.

⚠️ Important : certaines pubs video sont **muettes / musicales** (pas de voix off, juste des
accroches texte incrustees). Verifier la transcription : si elle ne contient que de la musique
(ex "(musique de fin)"), il n'y a PAS de voix off a generer -> traiter comme une pub image
(relever les accroches incrustees et les adapter en FR, cf. Chemin IMAGE), livrable
`accroches-fr.md`. Ne generer une voix off QUE si la pub d'origine en a une.

⚠️ **Piege reel rencontre le 23/06 (lot T4/AD3) : une pub classee "musicale" avait en fait une
vraie voix off, jamais detectee.** La transcription de l'epoque (19/06) avait conclu "musique
seule" alors que l'audio contenait bel et bien un narrateur (meme script que AD2). La STT
ElevenLabs peut HALLUCINER une annotation generique de musique dans une langue au hasard quand
elle echoue a transcrire (ex "(轻快的片尾音乐)", "(트로트 음악)") — un texte entre
parentheses qui ressemble a une legende de musique n'est PAS une preuve fiable d'absence de
voix, surtout sur un fond musical fort. **Si un doute existe (ou si Romeo signale a l'oreille
qu'il y a une voix dans une pub deja livree en "musicale")** : retranscrire le
`video-sans-soustitres.mp4` final (pas seulement la source brute) et, si du texte parle reel
apparait, **re-traiter cette pub comme un type "voice"** : ecrire `script-fr.txt` (PROMPT FIXE
ci-dessous, voix choisie selon le genre), generer `voix-off.mp3` (`tts.mjs`, cible = duree du
`video-sans-soustitres.mp4`), puis regenerer le brouillon CapCut (etape 7, le script
auto-detecte "voice" des que `voix-off.mp3` existe). Mettre l'ancien `accroches-fr.md` de cote
(renommer `accroches-fr.OBSOLETE-*.md`) plutot que le supprimer, pour garder une trace.

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
>
> IMPORTANT : la transcription source mentionne le PRODUIT du concurrent sous son propre nom
> (ex "Mira", "Aurora", un nom de modele invente par le concurrent). Remplace CHAQUE mention de
> ce nom de produit concurrent par le nom de TON produit ("<NOM PRODUIT SHOPIFY>", ou sa forme
> orale naturelle et courte, ex "la guirlande Zooryn" plutot que de repeter tout le nom Shopify).
> Ne garde JAMAIS le nom de produit d'origine du concurrent, meme s'il sonne bien ou est court.

Le script FR doit : garder le sens et la structure de la pub d'origine, sonner naturel a l'oral
(c'est une voix off, pas un texte ecrit), tenir dans la duree, et ne mentionner NI la marque NI
le nom de produit du concurrent (uniquement Zooryn + le nom de TON produit).

⚠️ Avant de deposer `script-fr.txt` dans le ADn : RELIRE le script et verifier qu'aucun nom de
produit concurrent (celui present dans la transcription source) n'a ete conserve par erreur.
Bug reel rencontre le 22/06 sur la guirlande Mira (Belysningshuset) : le script genere disait
"la guirlande Mira de Zooryn" — "Mira" est le nom du produit CONCURRENT, jamais a garder.

## Etape 7 — Generer le brouillon CapCut par code (zero clic souris)

Une fois le dossier ADn complet (video-sans-soustitres.mp4 + voix-off.mp3 OU accroches-fr.md),
generer directement le projet CapCut avec :

```
node .claude/skills/crea-pub/scripts/capcut-draft.mjs --lot <LOT> --ad <ADn> --register
```

Le script auto-detecte le type (voix-off.mp3 present -> "voice", accroches-fr.md present ->
"musical") et traite les deux tres differemment :

- **Type "voice"** (pub a voix off, ex AD1/AD2) : transcrit `voix-off.mp3` via STT ElevenLabs
  (timestamps mot par mot), regroupe en legendes courtes (4-5 mots / ~2,2 s / coupe a la
  ponctuation), coupe le son d'origine de la video (`volume: 0`) et pose la voix off comme
  seule piste audio. Legendes en bas (`y: -0.56`), style blanc/contour noir Prompt-Medium.
- **Type "musical"** (pub musicale/muette, ex AD3/AD4/AD5) : AUCUNE transcription/STT.
  Parse directement le tableau de `accroches-fr.md` (colonnes Ordre/~temps/origine/FR/
  Position/Hierarchie) pour placer chaque accroche FR au bon moment. **Le son d'origine
  (musique) est CONSERVE** (`volume: 1`, pas de piste audio separee) : il n'y a pas de voix
  off a remplacer. Position/taille mappees depuis les colonnes du tableau : "Haut" -> haut
  d'ecran, "Centre" -> milieu, "Sous le titre" -> juste en dessous ; "Gros titre" -> plus
  grand, "Titre moyen" -> taille moyenne, "Sous-titre" -> petit. Le suffixe "(2 lignes)" dans
  la colonne Position force un retour a la ligne au milieu du texte. **Reglages
  approximatifs** : Romeo verifie/ajuste la position a l'oeil dans CapCut si besoin.

Projet de base clone : `0604` (template 9:16, 1 piste video + 1 piste texte + 1 piste audio)
dans `C:/Users/franv/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft/`. Le nouveau
projet est nomme `ZOORYN-<LOT>-<ADn>` (ex `ZOORYN-T4-AD2`).

**`--register` inscrit le projet dans `root_meta_info.json`** (sinon CapCut peut afficher
"chemin inhabituel" a l'ouverture). Autorise par Romeo le 23/06 (renverse l'ancienne regle du
22/06 qui interdisait d'y toucher).

⚠️ **Piege majeur rencontre le 23/06, a ne JAMAIS reproduire : CapCut stocke TOUS les chemins
en "/" dans `draft_content.json`, meme sur Windows.** `path.join()`/`path.resolve()` de Node y
mettent des "\\" sur Windows. Consequence si on ecrit un chemin avec des "\\" dans le JSON
(`materials.videos[0].path`, `materials.audios[0].path`, `draft_fold_path` du registre) : **le
projet apparait dans la liste CapCut (les metadonnees en cache suffisent a l'affichage), mais
cliquer pour l'ouvrir ne fait RIEN** (le materiau ne se charge pas, pas de message d'erreur).
Symptome reel rencontre par Romeo sur AD2-AD5. Regle : utiliser `path.join()` librement pour
les vrais appels `fs` (lire/copier des fichiers), mais TOUJOURS repasser par un helper
`toPosix()` (remplace `\\` par `/`) avant d'ecrire une valeur de chemin dans le JSON du
brouillon ou dans une entree du registre.

Ce script est du Node pur + un appel a l'API ElevenLabs (STT), comme la transcription de
l'etape 2 : Claude peut l'executer lui-meme normalement. CapCut lui-meme (ouverture, montage,
export) reste 100% manuel cote Romeo.

⚠️ **Deuxieme piege majeur rencontre le 23/06 : le projet OUVRE mais l'export plante CapCut
(l'appli se ferme et ne se rouvre jamais).** Symptome visible avant export : vignette
rouge/marron avec "..." dans la liste CapCut (au lieu d'une vraie image de la video), taille
du projet identique et louche sur plusieurs brouillons differents (signe de donnees pas a
jour). Cause : chaque materiau (`materials.videos[0]`, `materials.audios[0]`) porte un champ
`local_material_id` — la cle du **cache media interne de CapCut** (proxy/decodage/miniature),
distincte de l'`id` du materiau dans le projet. En clonant le template `0604` sans la changer,
le NOUVEAU fichier herite de la cle de cache de l'ANCIEN fichier (Sculpted/voix Owen, duree et
resolution differentes) → CapCut essaie de reutiliser un cache qui ne correspond pas → echec
silencieux a l'affichage, plantage a l'export (qui doit vraiment decoder/encoder le fichier).
**Le script regenere systematiquement un nouveau `local_material_id` (minuscule, format UUID
natif CapCut) pour la video ET l'audio**, et remet `material_name` au vrai nom de fichier ainsi
que `draft_timeline_materials_size_` (taille reelle des fichiers) dans `draft_meta_info.json` —
sinon meme symptome. Si un futur brouillon refait le meme plantage : verifier en premier que
CES TROIS CHAMPS sont bien neufs et pas des restes du template clone.

⚠️ **Troisieme piege, le plus profond, rencontre le 23/06 (celui qui causait reellement le
plantage) : CapCut garde un CACHE MIROIR complet du projet dans `Timelines/<id_du_template>/`**
(sa propre copie de `draft_content.json`, un "mini_draft" de secours avec tous les ids de pistes/
segments, un `project.json`...). Ce dossier porte le nom de l'ID DU TEMPLATE clone (`0604`),
jamais renomme ni resynchronise avec le nouveau projet -> CapCut affiche bien la fiche projet
(lecture du `draft_content.json` racine), mais l'edition et l'export passent par ce cache
perime et incoherent -> plantage silencieux de l'appli (se ferme, ne se rouvre pas), sans aucun
message. Egalement perimes pour la meme raison : `template.tmp`, `template-2.tmp`,
`timeline_layout.json`, `draft_content.json.bak` (tous reference l'ancien id ou contiennent une
copie figee de l'ancien contenu). **Le script SUPPRIME desormais ces caches dans chaque nouveau
projet genere** (plus simple et plus fiable que de les resynchroniser un par un) : CapCut les
reconstruit proprement depuis le vrai `draft_content.json` au premier chargement. Si un futur
brouillon replante a l'edition/export : verifier en premier qu'aucun de ces caches stales n'est
revenu (ex si on change de PROJET DE BASE ou si CapCut en recree d'autres avec de nouveaux noms).

### Controle apres generation (toujours)

Comparer la duree de `video-sans-soustitres.mp4` a la duree de `voix-off.mp3` (pour le type
voice) : ecart > 1 s = STOP, regenerer le script-fr.txt avant de monter (cf. regle de duree
ci-dessus). **Piege reel rencontre le 23/06 (lot T4/AD2)** : la voix off avait ete generee le
19/06 pour la duree de la video SOURCE (avant Vmake), mais le fichier `video-sans-soustitres.mp4`
issu de Vmake (20/06) etait 2 s plus court — le detourage Vmake peut legerement changer la duree
exportee. Toujours mesurer les deux fichiers FINAUX juste avant de generer le brouillon CapCut,
jamais se fier a une duree notee plus tot dans le process.

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
>
> IMPORTANT : si une zone mentionne le PRODUIT du concurrent sous son propre nom (ex "Mira"),
> remplace-le par le nom de TON produit ("<NOM PRODUIT SHOPIFY>" ou sa forme orale/courte
> naturelle). Ne garde JAMAIS le nom de produit d'origine du concurrent.

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
- CapCut : le **brouillon** (assemblage video + audio + sous-titres/accroches) est genere par
  code (`scripts/capcut-draft.mjs`, etape 7), zero clic souris. **L'ouverture, la verification
  visuelle, les retouches fines et l'export restent 100% manuels cote Romeo** (pas d'API
  d'export CapCut). Pour les pubs musicales, le placement des accroches (position/taille) est
  approximatif (regles de mapping simples) : a verifier/ajuster a l'oeil avant export.
