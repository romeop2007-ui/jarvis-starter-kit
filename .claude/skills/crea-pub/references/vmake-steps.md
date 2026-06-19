# Vmake — retrait des sous-titres via browser-use

> Maillon le plus fragile du pipeline. Isolé ici exprès. Si ça casse, on bascule en manuel
> (voir "Fallback" en bas) sans bloquer le reste de la pub.

## Pré-requis

- Roméo doit être **connecté à son compte Vmake** dans Chrome (l'agent réutilise ses cookies).
- On pilote donc le Chrome de Roméo, pas un Chromium vierge :
  - `browser-use connect` (si Chrome est lancé avec le debug) **ou**
  - `browser-use --profile "Default" open https://vmake.ai` (Chromium avec son profil).
- Demander à Roméo quel chemin il préfère si `connect` échoue (cf. SKILL.md du skill browser-use).

## Séquence (à adapter, l'UI Vmake change souvent)

L'outil exact = la fonctionnalité Vmake de suppression de texte/sous-titres incrustés
(souvent nommée "Remove Text" / "Video Subtitle Remover" / "Remove watermark"). Le nom et la
position des boutons bougent : **toujours faire `browser-use state` pour relire les index avant
de cliquer**, ne jamais coder les index en dur.

1. Ouvrir la page de l'outil de retrait de texte :
   `browser-use --profile "Default" open https://vmake.ai/` puis naviguer vers l'outil,
   ou ouvrir directement l'URL de l'outil si connue.
2. `browser-use state` → repérer la zone d'upload.
3. Uploader la vidéo source :
   `browser-use upload <index_input_fichier> "C:\\chemin\\vers\\crea.mp4"`.
4. `browser-use state` → attendre la fin du chargement, sélectionner la zone des sous-titres
   si l'outil le demande (sinon détection auto), puis lancer le traitement
   (`browser-use click <index_bouton_lancer>`).
5. Attendre la fin du rendu : `browser-use wait text "Download"` (ou le libellé observé),
   avec un timeout large (`--timeout 180000`), le traitement peut prendre 1-3 min.
6. Télécharger le résultat : `browser-use click <index_bouton_download>`. Le fichier arrive
   dans le dossier de téléchargements de Chrome.
7. Déplacer/renommer le fichier téléchargé vers le dossier de sortie de la pub en
   `video-sans-soustitres.mp4` (via Bash `mv`).

## Contrôles

- Vérifier que le fichier final existe et a une taille > 0.
- Ouvrir une capture si doute : `browser-use screenshot verif.png`.

## Fallback (si Vmake casse, anti-robot, quota, UI illisible)

1. S'arrêter proprement sur CETTE pub, ne pas planter le lot.
2. Dire à Roméo : "Vmake a bloqué sur <nom pub>, retire les sous-titres à la main et dépose
   la vidéo propre dans <dossier>/video-sans-soustitres.mp4, je reprends le reste."
3. Continuer le pipeline (script + voix off) si la vidéo propre est fournie, sinon passer à la
   pub suivante et le signaler dans le bilan final.
