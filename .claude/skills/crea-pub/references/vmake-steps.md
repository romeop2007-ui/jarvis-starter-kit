# Vmake — retrait des sous-titres (methode CLIC NATIF WINDOWS, validee 20/06/2026)

> Maillon le plus fragile du pipeline, isole ici. La methode `browser-use upload` ECHOUE
> (l'uploader Ant Design de Vmake refuse l'injection programmatique) et un clic CDP
> n'ouvre PAS le dialogue Windows. La solution qui MARCHE = un vrai clic souris Windows
> natif sur le bouton Upload, puis remplissage du dialogue "Ouvrir" natif.

## Pre-requis

- Chrome lance en mode debug avec le profil ou Romeo est connecte a Vmake (compte
  RoméoPIAT / Vmake plus). Le profil par defaut est `~/.browser-use/chrome-debug` :
  ```
  "C:\Program Files\Google\Chrome\Application\chrome.exe" \
    --remote-debugging-port=9222 \
    --user-data-dir="C:\Users\franv\.browser-use\chrome-debug" \
    --start-maximized --no-first-run --no-default-browser-check about:blank
  ```
- `browser-use connect` (le CLI doit tourner avec `PYTHONUTF8=1` et `PYTHONIOENCODING=utf-8`,
  sinon `doctor`/affichage plantent en cp1252 sur Windows).
- 3 scripts PowerShell natifs dans `scripts/` :
  - `native-focus.ps1 -TitleLike "Vmake"` : ramene la fenetre Chrome au premier plan
    (INDISPENSABLE avant tout clic natif : le clic atterrit sur la fenetre de devant).
  - `native-click.ps1 -X <px> -Y <px>` : vrai clic souris Windows aux pixels ECRAN physiques.
  - `native-openfile.ps1 -Path "<chemin>"` : remplit le dialogue "Ouvrir" deja ouvert
    (presse-papiers + Ctrl+V + Entree, robuste aux accents du chemin) et valide.

⚠️ Le clic natif prend le controle physique de la souris ~1 s. Prevenir Romeo : ne pas
toucher la souris et garder Chrome devant pendant l'upload.

## Conversion coordonnees navigateur -> ecran (calibree 100% scaling, zoom Chrome 125%)

`browser-use get bbox <index>` donne le centre en pixels CSS. Sur le poste de Romeo
(ecran 1920x1080, scaling OS 100%, dpr=1.24 a cause du zoom Chrome) :

```
PX = round(cssCenterX * 1.24)
PY = round(cssCenterY * 1.24 + 107)   # 107 = hauteur du bandeau Chrome en px physiques
```

Sur la page `https://vmake.ai/video-watermark-remover`, le bouton "Upload video" tombe
de maniere stable a PX=577, PY=849. Si la page/zoom change, recalculer via le bbox.

## Sequence par video (validee de bout en bout, lot T4)

1. **Page fraiche** : `browser-use open "https://vmake.ai/video-watermark-remover"`.
   (Repartir d'une page fraiche par video evite la contamination par la liste d'historique.)
2. **Coordonnees** : `browser-use get bbox <index_bouton_Upload_video>` -> formule ci-dessus
   (ou reutiliser 577,849 si layout identique).
3. **Upload natif** (un seul appel PowerShell qui enchaine) :
   ```
   native-focus.ps1 -TitleLike "Vmake"        # Chrome au premier plan
   native-click.ps1 -X 577 -Y 849             # ouvre le dialogue "Ouvrir" Windows
   native-openfile.ps1 -Path "<...source.mp4>" # colle le chemin + Entree
   ```
   Le dialogue met ~0,6-1 s a apparaitre : `native-openfile` poll jusqu'a 8 s la fenetre
   VISIBLE de classe `#32770` titree "Ouvrir"/"Open" (EnumWindows, pas FindWindow qui
   retombe sur une fenetre invisible).
4. **Traitement AUTO** : Vmake lance le mode **Smart** tout seul des l'upload (pas besoin
   de cliquer "Apply"). Verifier le chargement : `browser-use eval` sur
   `document.querySelector('video').duration` (doit ~= la duree de la source).
5. **Attendre la fin** : poller `browser-use state` jusqu'a ce que `Processing... N%`
   disparaisse ET que `Vmake Paid Plan` apparaisse (= bouton resultat pret). Compter
   ~1-3 min selon la duree. Ne pas se fier a une disparition instantanee du %.
6. **Telecharger LE BON bouton** : le bouton du resultat courant est le `<button>` juste
   au-dessus du texte "You're already on a Vmake Paid Plan" :
   ```
   ix = browser-use state | grep -B3 "Vmake Paid Plan" | dernier index de <button>
   browser-use scroll up --amount 400     # il est souvent scrolle au-dessus du viewport
   browser-use click <ix>
   ```
   ⚠️ NE PAS cliquer un bouton "Download" de la LISTE D'HISTORIQUE (en bas, "Files are kept
   for 7 days") : il telecharge un ancien resultat. Le bon = celui lie au "Paid Plan".
7. **Recuperer le fichier** : Chrome telecharge tout seul dans `~/Downloads` (un `.crdownload`
   puis le `.mp4`). Vmake NOMME le fichier d'apres la SOURCE (ex `1454469..._video_0.mp4`).
   **Verifier que le nom telecharge correspond bien a la source attendue** (garde-fou anti
   mauvais bouton) puis `mv` vers le livrable :
   `ressources créas après modifs/<LOT>/<ADn>/video-sans-soustitres.mp4`.

## Controles

- Nom du fichier telecharge == nom de la source (sinon = mauvais bouton, recommencer l'etape 6).
- Taille > 0 et coherente (deux sources de durees differentes n'ont jamais la meme taille).
- Doute sur le rendu : capture d'ecran physique PowerShell (System.Drawing CopyFromScreen)
  puis Read l'image (les screenshots browser-use ne montrent pas les dialogues natifs).

## Fallback (si Vmake casse : anti-robot, quota, UI changee)

1. S'arreter proprement sur CETTE pub, ne pas planter le lot.
2. Dire a Romeo : "Vmake a bloque sur <ADn>, retire les sous-titres a la main et depose la
   video propre dans <LOT>/<ADn>/video-sans-soustitres.mp4, je reprends le reste."
3. Continuer le pipeline sur les autres pubs et le signaler dans le bilan final.
