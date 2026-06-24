---
name: crea-pub
description: Usine a creas publicitaires Zooryn. A partir d'une pub concurrent fournie par Romeo (VIDEO .mp4 ou IMAGE statique .jpg/.png), produit un dossier pret a finaliser. Detecte automatiquement le type. Video -> dossier pret a monter dans CapCut (video sans sous-titres via Vmake, script voix off FR adapte a la marque, voix off ElevenLabs calee sur la duree). Image -> texte FR adapte a la marque avec plan de placement, a poser dans Canva sur le visuel d'origine (conserve a l'identique). A declencher quand Romeo dit "fais-moi les creas", "transforme cette pub", "adapte cette crea", ou fournit un .mp4/.jpg/.png de concurrent a adapter.
allowed-tools: Bash, Read, Write, Edit, Glob
---

# Skill crea-pub — Usine a creas Zooryn

Transforme une pub concurrent (.mp4) en un dossier pret a monter pour Romeo. Voir le plan
complet : `C:\Users\franv\.claude\plans\ok-on-passe-en-wild-cascade.md`.

## CHECKLIST DE DEMARRAGE — a poser a Romeo EN UNE FOIS, avant toute action

Objectif (demande de Romeo le 23/06) : ne plus lui redemander une info au milieu du pipeline,
etape par etape. **Au lancement d'un nouveau `<LOT>`, poser TOUTES ces questions d'un coup**
(sauter celles deja repondues dans le message de depart de Romeo). Une fois les reponses en
main, derouler tout le pipeline (creas + lancement Meta Ads si demande) sans repause, sauf
blocage technique reel ou nouvelle info manquante imprevue.

### A demander pour generer les creas (Chemin VIDEO ou IMAGE)

1. **Le(s) fichier(s) concurrent(s)** (.mp4/.jpg/.png) du lot, ou le dossier source deja depose
   dans `ressources créas avant modifs/<LOT>/`.
2. **Le nom EXACT du produit Shopify** correspondant (ex "Zooryn - Guirlande lumineuse
   solaire") — sert a remplacer le nom du produit concurrent partout (script, accroches).
3. **Le nom du lot** (`T3`, `T4`...) s'il n'est pas deja visible dans le nom du dossier.
4. **Si plusieurs pubs dans le lot ont des genres de narrateur ambigus** (impossible a deduire
   a l'oreille/a l'oeil) : demander le genre voulu pour la voix off (sinon regle par defaut :
   femme -> Celine, homme -> Sami, cf. section voix).
5. **Budget global du lot** si Romeo veut une limite de cout (ElevenLabs, Vmake, gpt-image) —
   sinon on avance sans plafond explicite.

### A demander si Romeo veut ENSUITE lancer la campagne Meta Ads pour ce lot

6. **L'URL exacte de la page produit Shopify** (le lien de destination de la pub).
7. **Le budget journalier souhaite** pour la campagne (ex 50€/jour) et si c'est en CBO
   (recommande) ou ABO (a la demande explicite seulement).
8. **Le pays cible** si ce n'est pas la France par defaut (le marche a change le 13/06,
   confirmer si un lot vise un autre pays).
9. **Quels visuels/videos exactement utiliser** s'ils sont repartis entre `créas terminées/`
   et `ressources créas après modifs/` (ne jamais deviner un nombre de pubs, demander
   confirmation du lot final retenu).
10. **Quel compte publicitaire Meta utiliser** si plusieurs existent (un compte peut etre
    recree/ferme entre deux lots, cf. piege du 23/06) — verifier avec `ads_get_ad_accounts`
    et demander confirmation si ambigu.
11. **Le nom du concurrent de reference pour CE produit** si Romeo en a un en tete (sinon
    chercher soi-meme via TrendTrack le meilleur scaling sur ce produit).
12. **L'ID du compte Instagram** si Romeo l'a sous la main (l'API ne le fournit pas encore) —
    sinon prevenir que la pub ne delivrera que sur Facebook.

### Actions qui resteront TOUJOURS manuelles (a annoncer a Romeo, pas a lui faire decouvrir)

- Executer les commandes Vmake/gpt-image (auto-execution interdite a Claude).
- Ouvrir/verifier/exporter dans CapCut (pas d'API d'export).
- Deposer les visuels finaux dans Shopify Admin > Contenu > Fichiers pour obtenir une URL
  publique (aucun outil d'upload de fichier local disponible cote Claude).
- Partager un pixel Meta avec un nouveau compte publicitaire (Meta Business Settings).
- Activer la campagne/adset/pubs dans le Gestionnaire de publicites (Claude ne passe jamais
  rien en ACTIVE).

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

## Verification factuelle (etape obligatoire, ajoutee le 23/06)

Une pub concurrent peut affirmer n'importe quoi sur SA marque (garantie, fabrication,
livraison...). On adapte le TON et la STRUCTURE du concurrent, jamais ses FAITS sans verifier.
**Avant de livrer un `script-fr.txt` ou un `accroches-fr.md` (chemin VIDEO ou IMAGE), comparer
chaque allegation factuelle (garantie, origine/fabrication, livraison, codes promo) a
`references/verites-zooryn.md`.** Si une allegation du concurrent ne colle pas a la realite
Zooryn (ex "garantie 365 jours" alors que la vraie garantie est 30 jours, ou une mise en scene
de fabrication artisanale francaise alors que Zooryn fait du dropshipping), corriger avec le
vrai fait, jamais recopier tel quel. Si un fait Zooryn manque dans le fichier, demander a Romeo
plutot que d'inventer.

**Limite connue : ce controle ne s'applique qu'au TEXTE (script voix off, accroches).** Pour le
chemin IMAGE, le texte concurrent est lu puis remplace par du texte FR avant d'etre pose dans
Canva : la verification factuelle s'applique a ce texte de remplacement. Si Romeo fournit deja
un visuel ou un texte fini contenant une fausse allegation (cas reel du 23/06, lot T3 : 3 visuels
gpt-image avec "garantie 365 jours" en dur dans les pixels, 2 visuels avec une mise en scene de
fabrication artisanale francaise inventee), le signaler clairement avant tout lancement de
campagne, mais Romeo reste decisionnaire : il peut choisir de les utiliser tels quels.

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

## Chemin IMAGE (pub statique .jpg/.png) — methode gpt-image (validee 19/06, revisee 23/06)

Objectif : garder le visuel exact du concurrent, remplacer le texte par du FR adapte a la
marque, et livrer une **image finie**, pas un plan de placement. ⚠️ La methode "lire + ecrire
`accroches-fr.md` + Romeo pose dans Canva" est PERIMEE, ne plus l'utiliser : depuis le 19/06 on
utilise l'API **gpt-image-1** (`scripts/edit_openai.mjs`) qui prend l'image source (+ le logo
Zooryn SI besoin) et un prompt, et renvoie directement l'image editee.

**Principe cle (le pixel ne se corrige pas apres coup) : verrouiller TOUT le texte en discussion
texte normale, valide et factuellement correct, AVANT le moindre appel a gpt-image.** Ne jamais
laisser gpt-image traduire/adapter/calculer un prix a la volee dans le meme appel qui dessine
l'image : c'est le moment ou les erreurs (devise mal convertie, prix faux, mention "365 jours"
recopiee du concurrent, marque mal orthographiee) se glissent dans les pixels sans qu'on puisse
les relire avant export. Toujours separer les deux phases :

### Phase 1 — Verrouiller le texte (pur texte, zero image generee)

1. **Creer le dossier livrable** : `node scripts/folder.mjs --lot <LOT> --ad <ADn>`.
2. **Lire l'image / les frames** avec l'outil Read (vision) pour voir le visuel ET transcrire
   TOUT le texte incruste mot pour mot (langue d'origine). Pour une video musicale, extraire
   plusieurs frames dans le temps (ffmpeg `-ss`) pour capter toutes les accroches qui defilent.
3. **Relever chaque zone** : texte d'origine, position, hierarchie, ET tout element a localiser
   au-dela du texte produit — prenom d'un personnage dans la scene (contact d'une conversation,
   signature d'une carte/note manuscrite, etc.), drapeau/pays affiche, devise.
4. **Traduire et adapter zone par zone**, avec le PROMPT FIXE ci-dessous :
   - Remplacer le nom du produit/marque concurrent par celui de Zooryn (jamais le garder).
   - **Tout prenom de personnage visible dans la scene -> un prenom francais** (contact d'une
     conversation, signataire d'une note manuscrite...), jamais garder le prenom d'origine.
   - **Prix/devise : interroger Shopify EN DIRECT** (MCP Shopify, `search_products`/
     `get-product`) pour CE produit, a CHAQUE lot. Ne jamais estimer par conversion de change,
     et ne jamais reprendre un prix vu dans une session precedente ou dans cet historique : les
     prix Shopify changent (promos, ajustements), seule une lecture live fait foi. Piege reel :
     une conversion approximative donnait 65€, le vrai prix Shopify etait 69,99€.
   - **Verification factuelle obligatoire** (`references/verites-zooryn.md`) sur CHAQUE
     allegation (garantie, origine/fabrication, livraison...) — AVANT de figer le texte, pas
     apres. Piege reel : une regeneration faite a la main par Romeo a traduit/localise le texte
     correctement mais a garde "Garantie 365 jours" et une mise en scene d'artisan francais
     fictif ("Julien") sans le voir, alors que la garantie reelle est 30 jours et que Zooryn ne
     fabrique pas en France — la verification factuelle est un reflexe a part, distinct de la
     traduction/localisation, meme un humain qui fait l'adaptation peut l'oublier.
5. **Faire valider chaque texte final par Romeo si un doute existe** (prix, allegation,
   formulation) avant de passer a la Phase 2 — une fois dans l'image, ce n'est plus modifiable
   sans tout regenerer.

### Phase 2 — Generer l'image (gpt-image, texte deja figé et validé)

6. **Decider si le logo Zooryn doit etre integre, CAS PAR CAS** (ne pas l'imposer par defaut) :
   - **OUI** si le logo du concurrent est visible sur le produit/packaging/scene dans l'image
     source (ex packshot du matelas avec le logo concurrent grave dessus).
   - **NON** si l'image ne montre aucun logo produit (ex un screenshot de conversation iMessage
     qui mentionne juste le nom de la marque dans le texte) — passer le logo en reference ne
     sert a rien et risque de le faire apparaitre artificiellement.
7. **Ecrire le prompt gpt-image avec le texte EXACT deja valide en Phase 1** (pas une consigne
   de traduction, une consigne de REPRODUCTION) : "reproduis ce visuel a l'identique, remplace
   chaque zone de texte par exactement ce texte : <texte FR final figé>, garde la meme police/
   mise en page", + si pertinent "remplace le logo par <logo Zooryn fourni en piece jointe>", +
   si pertinent "le prenom doit etre <prenom francais choisi>".
8. **Lancer** `node scripts/edit_openai.mjs --image <source> --out <dest> --prompt-file <p.txt>
   [--size auto] [--quality high]` (Claude peut executer ce script lui-meme, c'est un appel API,
   pas un pilotage d'interface). Le format de sortie gpt-image est recadre automatiquement au
   format de la source par le script (cf. `closestSize`).
9. **Relire l'image generee** (outil Read, vision) et comparer chaque zone au texte verrouille en
   Phase 1 : si un mot/prix/nom differe, regenerer plutot que livrer tel quel.
10. **Deposer l'image finale** directement dans le dossier livrable du `ADn`. Rien d'autre a
    faire dans Canva, l'image est prete a poster.

### PROMPT FIXE pour le texte image — Phase 1, traduction/adaptation (avant tout appel image)

> Tu es le createur de la marque "Zooryn". Le nom de ton produit est "<NOM PRODUIT SHOPIFY>".
> Voici les textes d'une pub statique d'un concurrent, zone par zone. Traduis-les en francais
> et adapte-les a la marque sans changer le sens ni le message, en gardant la meme hierarchie
> et une longueur proche de l'original : <LISTE DES TEXTES PAR ZONE>
>
> IMPORTANT : si une zone mentionne le PRODUIT ou la MARQUE du concurrent sous son propre nom,
> remplace-le par "<NOM PRODUIT SHOPIFY>" / "Zooryn". Si une zone montre un prenom de personnage
> (contact, signature), remplace-le par un prenom francais. Si une zone affiche un prix, utilise
> le VRAI prix Shopify du produit, jamais une conversion de change approximative. Compare chaque
> allegation factuelle (garantie, origine/fabrication, livraison) a `references/verites-zooryn.md`
> avant de valider le texte final.

### Sortie d'un dossier pub IMAGE / muette (pret a poster)

```
ressources créas après modifs/<LOT>/<ADn>/
  <visuel-final>.png   <- l'image finie (texte FR + logo si besoin), generee par gpt-image
```

Romeo n'a plus de pose de texte a faire dans Canva : l'image livree est deja prete a poster.

## Bilan final (toujours)

Apres avoir traite toutes les pubs, annoncer a Romeo combien sont pretes, sous la forme :
"X pubs pretes a monter dans CapCut" + la liste des dossiers + tout ce qui a bloque (ex Vmake
en manuel sur telle pub). Romeo verifie, importe dans CapCut, monte, poste sur Meta.

## Lancement de la campagne Meta Ads (apres les creas, sur demande de Romeo)

Etape suivante possible une fois un `<LOT>` (T3, T4, T5...) pret : creer la campagne Meta Ads
correspondante via le MCP Facebook Ads. **Cette etape n'est JAMAIS automatique au sens "meme
recette a chaque fois"** : chaque lot a son propre produit, son propre nombre de visuels, son
propre type de creas (image ou video), et sa propre pub concurrent de reference. Le but n'est
pas de rejouer T3 a l'identique, c'est de reproduire la METHODE en l'adaptant a `<LOT>` chaque
fois. Ne jamais copier un nom de campagne, un texte ou un nombre de pubs d'un lot precedent.

### Constantes du compte (ne changent pas d'un lot a l'autre)

- **Compte pub Meta** : `1952596875395674` (Zooryn, EUR, actif). Verifier avec
  `ads_get_ad_accounts` que c'est toujours le bon avant de l'utiliser (un compte peut etre
  recree/ferme, comme l'ancien GBP `907981678960981` passe en PENDING_CLOSURE le 23/06).
- **Page Facebook** : `1199198896606468` (Zooryn). Trouvable via `ads_get_pages_for_business`
  avec le `business_id` `1696599654709305` si jamais ca change.
- **Pixel** : `2803216990037221`. ⚠️ Le pixel doit etre PARTAGE manuellement (par Romeo, dans
  Meta Business Settings > Sources de donnees > Pixels > Elements connectes > Connecter les
  elements) avec tout NOUVEAU compte pub avant de creer les pubs, sinon erreur
  "Account does not have access to pixel" a la creation de l'ad (rencontre le 23/06 avec le
  nouveau compte EUR). Le demander a Romeo en amont si un nouveau compte est utilise.
- **Compte Instagram** : pas recuperable via l'API pour l'instant (`ads_get_ig_accounts`
  renvoie une erreur de deploiement). Sans lui, les pubs ne delivrent pas sur Instagram. Le
  signaler a chaque lancement, demander l'ID a Romeo si dispo.

### Etapes a REFAIRE et ADAPTER pour chaque `<LOT>`

1. **Trouver les visuels/videos prets pour CE lot precisement**, dans LES DEUX dossiers (un
   visuel peut etre fini dans l'un, en travail dans l'autre) :
   `livrables/ecommerce/creas/créas terminées/<LOT>/` ET
   `livrables/ecommerce/creas/ressources créas après modifs/<LOT>/`. **Demander confirmation a
   Romeo sur le compte final et lequel utiliser** si le compte differe entre les deux dossiers
   (cas reel le 23/06 sur T3 : 2 dans l'un, 6 dans l'autre, total a clarifier avec Romeo plutot
   que de deviner). Le nombre de pubs = le nombre de visuels que Romeo valide pour ce lot, JAMAIS
   un nombre fixe repris d'un lot precedent.
2. **Recuperer l'URL produit Shopify exacte de CE lot** (`search_products` ou demander a
   Romeo). Ne jamais reutiliser l'URL d'un autre produit.
3. **Chercher la meilleure pub concurrent du moment pour CE produit** via TrendTrack
   (`brief_competitor` puis `scan_ad` sur le meilleur candidat scaling) : reach, jours de
   diffusion, body/hook/CTA complet. Le concurrent de reference change a chaque lot (Norrfjallen
   pour le matelas T3, un autre pour T4/T5...) — ne pas reutiliser le meme concurrent par defaut,
   verifier que c'est bien le concurrent du produit du lot en cours.
4. **Traduire et adapter le texte en FR**, et appliquer la verification factuelle obligatoire
   (`references/verites-zooryn.md`, cf. section plus haut) : corriger toute allegation du
   concurrent qui ne correspond pas a la realite Zooryn pour CE produit.
5. **Obtenir une URL publique HTTPS pour chaque visuel** (necessaire pour `ads_create_creative`,
   aucun outil d'upload direct de fichier local disponible cote Claude) :
   - Demander a Romeo de deposer les fichiers du `<LOT>` dans Shopify Admin > Contenu > Fichiers
     (`https://admin.shopify.com/store/cqqah9-t1/content/files`, bouton "Importer des fichiers").
   - Romeo donne les liens admin (`.../content/files/<id>`) — **ce ne sont PAS les URLs
     publiques**. Resoudre la vraie URL CDN avec une requete GraphQL Shopify :
     `nodes(ids: ["gid://shopify/MediaImage/<id>", ...]) { ... on MediaImage { image { url } } }`.
   - Pour une video, le champ source change (`sources` au lieu de `image.url` sur un type
     `Video`/`GenericFile`) — verifier le schema avec `graphql_schema` si le type differe.
6. **Creer la campagne** (`ads_create_campaign`) : nom **"Campagne `<LOT>`"** (jamais "Campagne
   T3" recopie), objectif a confirmer avec Romeo (OUTCOME_SALES par defaut si conversions),
   `campaign_daily_budget` = budget donne par Romeo pour CE lot (peut differer de 50€), CBO par
   defaut sauf demande explicite d'ABO.
7. **Creer l'adset** (`ads_create_ad_set`) : nom **"Adset `<LOT>` - <pays>"**, pays a confirmer
   (France par defaut depuis le pivot du 13/06, mais demander si un lot vise un autre marche),
   `promoted_object` avec le pixel ci-dessus, `targeting` large (Advantage+ Audience, pas
   d'interets inventes — cf. note ci-dessous), `dsa_beneficiary`/`dsa_payor` = "Zooryn" pour tout
   pays UE. **Deux pieges de publication a eviter des la creation (vecus sur T3, 24/06) :**
   - **Type de localisation explicite.** Toujours poser `geo_locations.location_types: ["home"]`
     (= "personnes qui vivent a cet endroit"), jamais laisser le defaut. Le defaut de l'API
     ("personnes qui habitent OU se sont recemment rendues" = `home` + `recent`) contient une
     option **depreciee par Meta** qui **bloque la publication**. Message exact rencontre le
     24/06 sur T3 a la publication : "Votre audience contient une option de ciblage geographique
     qui a ete supprimee (les personnes qui habitent ou se sont recemment rendues dans un lieu
     donne)". Pour de l'e-commerce on veut de toute facon les residents, pas les touristes.
     - **Corriger un adset DEJA cree avec le mauvais ciblage** (cas reel 24/06, T3 — la campagne
       existait deja, il a fallu reparer, pas recreer) : `ads_update_entity` sur l'`ad_set`,
       champ `targeting` =
       `{"geo_locations":{"countries":["FR"],"location_types":["home"]},"targeting_automation":{"advantage_audience":1}}`.
       ⚠️ TOUJOURS reinclure `targeting_automation.advantage_audience: 1` : un update du champ
       `targeting` REMPLACE tout le bloc d'un coup, donc sans ce flag on perd l'audience
       Advantage+ silencieusement. Verifier ensuite avec `ads_get_errors` sur l'adset qu'il ne
       reste plus aucune erreur bloquante (`{}` = OK). Note : `targeting` n'est PAS lisible via
       `ads_get_ad_entities` (champ non supporte), donc on ne peut pas relire l'ancien ciblage
       avant de l'ecraser — d'ou l'importance de reconstruire le bloc complet a la main.
     ⚠️ Si Romeo utilise une **audience enregistree** (audience nommee, ex "Zooryn") au lieu du
     ciblage inline, ce type de localisation vit DANS l'audience enregistree, pas dans l'adset :
     un `ads_update_entity` sur l'adset ne la corrige pas. Dans ce cas, le seul fix est manuel
     dans le Gestionnaire (Modifier l'audience > Lieux > "Personnes qui vivent a cet endroit").
   - **Placements compatibles avec le format des visuels.** Les visuels Zooryn sont en
     **portrait/carre** ; or le placement **video in-stream exige du paysage** et **bloque la
     publication** avec une image portrait ("Les images utilisees pour les publicites in-stream
     ne peuvent pas etre au format portrait"). Donc ne pas laisser les placements automatiques :
     poser des **placements manuels sans in-stream video**, adaptes au portrait :
     `publisher_platforms: ["facebook","instagram"]`,
     `facebook_positions: ["feed","profile_feed","marketplace","video_feeds","story","facebook_reels"]`,
     `instagram_positions: ["stream","profile_feed","explore","explore_home","story","reels"]`.
8. **Creer une creative par visuel** (`ads_create_creative`) avec l'URL CDN, le texte/titre/
   description/CTA adaptes a l'etape 4, nommees **"Zooryn `<LOT>` - AD`n`"**.
9. **Creer une pub par creative** (`ads_create_ad`), nommees **"`<LOT>` - AD`n`"**.
10. **Tout reste en PAUSED, toujours.** Ne jamais appeler `ads_activate_entity` ni passer un
    statut a ACTIVE, meme avec l'accord oral de Romeo (regle absolue du 21/06). Romeo active
    lui-meme dans le Gestionnaire de publicites apres verification visuelle.

### Pourquoi pas de ciblage par interet (a rappeler si Romeo demande)

Advantage+ Audience (active par defaut) + ciblage large par pays = methode recommandee par Meta
aujourd'hui, surtout sur un petit budget journalier : le pixel apprend mieux sur un bassin large
que sur des interets devines a la main. Ne jamais inventer un ID d'interet.

## Limites (rappeler si pertinent)

- Vmake = API officielle (async, fiable). Claude prepare la commande, Romeo l'execute (auto-execution interdite). Fallback manuel si l'API casse.
- Voix = la plus proche du catalogue, pas un clone.
- Duree = tres proche, pas exacte a la frame.
- CapCut : le **brouillon** (assemblage video + audio + sous-titres/accroches) est genere par
  code (`scripts/capcut-draft.mjs`, etape 7), zero clic souris. **L'ouverture, la verification
  visuelle, les retouches fines et l'export restent 100% manuels cote Romeo** (pas d'API
  d'export CapCut). Pour les pubs musicales, le placement des accroches (position/taille) est
  approximatif (regles de mapping simples) : a verifier/ajuster a l'oeil avant export.
