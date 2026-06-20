# Vmake — retrait des sous-titres/watermark video (methode API officielle, depuis le 20/06/2026)

> Le retrait des sous-titres se fait via l'API officielle Vmake (SDK Python), PAS par
> pilotage du navigateur. L'ancienne methode "clic souris natif Windows" est OBSOLETE
> (elle monopolisait l'ecran ~1h ; historique recuperable via git). L'API est asynchrone :
> le serveur Vmake fait le calcul, le PC est libre des la soumission.

## ⚠️ Qui execute quoi (contrainte permanente)

Claude NE PEUT PAS executer le SDK ni ecrire dans `.claude/skills` (le classifier de
securite bloque l'auto-execution de code tiers avec cles et l'auto-modification, meme si
Romeo l'autorise verbalement). Donc :
- **Claude prepare** la/les commande(s) pretes a coller.
- **Romeo execute** la commande dans son terminal PowerShell, puis verifie le resultat.

## Pre-requis (une fois)

- Cles dans le `.env` : `VMAKE_API_KEY` et `VMAKE_API_SECRET` (compte RoméoPIAT / Vmake plus).
  Auth SDK-HMAC-SHA256, le SDK signe seul.
- SDK Python officiel dans `vendor/vmake-sdk/sdk/`.
- Python 3.12 (`C:\Users\franv\AppData\Local\Programs\Python\Python312\python.exe`) avec
  `requests` et `alibabacloud_oss_v2` (`python -m pip install requests alibabacloud_oss_v2`).
- Scripts PowerShell dans `scripts/` :
  - `vmake-api.ps1` : passe-plat (charge les cles du .env, relaie au SDK).
  - `creas-detourage.ps1 -Lot <LOT>` : detoure TOUTES les .mp4 du lot, range chaque resultat
    dans `ressources créas après modifs/<LOT>/ADn/video-sans-soustitres.mp4`, ouvre le dossier.

## Tache API

- `videoscreenclear` (`/v1/videoscreenclear_async`) = retrait sous-titres/watermark video.
  Asynchrone : le SDK poll seul jusqu'au resultat, puis renvoie un JSON dont `output_urls[0]`
  est l'URL (Alibaba OSS) de la video nettoyee a telecharger.
- Autres taches (info) : `eraser_watermark` (watermark image), `image_restoration`
  (qualite image), `hdvideoallinone` (qualite video).

## Usage courant : un lot entier en une commande (Romeo execute)

```
& "C:\Users\franv\Desktop\jarvis-starter-kit\.claude\skills\crea-pub\scripts\creas-detourage.ps1" -Lot <LOT>
```

Chaque video ressort dans `<LOT>/ADn/video-sans-soustitres.mp4` (ordre des fichiers source).
Le dossier s'ouvre tout seul : Romeo verifie, puis monte dans CapCut.

## Usage unitaire (une seule video)

```
$w="C:\Users\franv\Desktop\jarvis-starter-kit\.claude\skills\crea-pub\scripts\vmake-api.ps1"
$res=(& $w run-task --task videoscreenclear --input "<chemin source.mp4>" | Out-String | ConvertFrom-Json)
Invoke-WebRequest -Uri $res.output_urls[0] -OutFile "<...>\ADn\video-sans-soustitres.mp4"
```

## Couts / controles

- `list-tasks` = 0 credit. Le detourage consomme des credits (solde = 1440 ; observe : apres
  un lot T4 le solde n'avait pas bouge, raison inconnue, a surveiller sur gros lot).
- Verifier taille du fichier > 0. Logo concurrent GRAVE sur le produit = non retire par Vmake,
  a masquer au montage CapCut.

## Fallback (si l'API echoue : quota, cle, panne)

1. S'arreter proprement sur le lot, ne pas planter.
2. Donner a Romeo l'erreur exacte (Claude debogue la commande).
3. Dernier recours : retrait manuel sur vmake.ai puis depot dans
   `<LOT>/<ADn>/video-sans-soustitres.mp4`.
