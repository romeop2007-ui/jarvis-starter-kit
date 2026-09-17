# Montage vidéo piloté par Claude avec Palmier Pro (HORS SOP)

> Source : page Notion « Stratégies hors SOP » de Roméo (17/09/2026), deux threads X sur Palmier Pro
> (19/06/2026 et 01/08/2026) + un retour de résultat. **Pas dans la formation Zecom** : à étiqueter
> « hors SOP » quand on s'en sert. Le SOP décide QUOI produire (phase, angle, concept), Palmier ne
> change que COMMENT on monte.
> Configuration vérifiée par Claude le 17/09/2026 (voir section 1).

## 1. Configuration (faite le 17/09/2026)

- App : `/Applications/PalmierPro.app` (v0.9.0, Mac uniquement). Éditeur et export gratuits ; les
  générations IA (vidéo, image, audio, upscale, Magic Mask) coûtent des crédits (plans 29 $ / 69 $).
- **Serveur MCP local** exposé par l'app sur `http://127.0.0.1:19789/mcp` (HTTP). **Il n'existe que
  quand l'app est ouverte.** Enregistré dans Claude Code en portée locale :
  `claude mcp add --transport http --scope local palmier-pro http://127.0.0.1:19789/mcp`
  (statut « Connected » vérifié). Les outils `mcp__palmier-pro__*` apparaissent dans une **nouvelle
  session** Claude Code, app ouverte.
- Aucun projet au 17/09 hormis « Palmier Sample ». Un projet par créa ou par lot : `manage_project`
  action `create` (format 9:16 pour Meta).
- **Seule action manuelle pour Roméo : télécharger le modèle d'indexation local** (onglet Média de
  l'app → « Download a local model to index your media »). 100 % sur le Mac. Sans lui, `search_media`
  en visuel ne marche pas (l'outil tente de l'installer seul à la première recherche visuelle).

## 2. Garde-fous Zooryn (priment sur les threads)

1. **Générations payantes autorisées par Roméo depuis le 17/09/2026** (`generate_video`, `generate_image`, `generate_audio`, `upscale_media`, Magic Mask), **en mode apprentissage** : une petite génération à la fois, montrée à Roméo avant la suivante, pas de gros lot tant qu'il n'a pas validé la façon de faire. L'outil n'affiche ni le prix par génération (sauf FLUX.3 en brouillon : 6 crédits/s) ni le solde : Roméo le lit dans l'app.
2. **Voix off = notre pipeline ElevenLabs** (`.claude/skills/crea-pub/scripts/tts-batch.mjs`, voix
   Clemence/Simon), puis `import_media` du mp3 local. Pas le TTS payant de Palmier.
3. **Script écrit selon ce skill** (étape 0 hook, policy Meta, vérités produit
   `verites-zooryn.md`) AVANT d'ouvrir Palmier. Palmier n'invente rien.
4. **Produit en action = nos rushes ou ceux des concurrents uniquement**, jamais un plan stock ou
   généré qui montrerait un autre appareil. Attention aux rushes où le pistolet a une tête plate
   (photos clients) et aux plans sans produit visible (cas AD28/AD29).
5. Export dans `livrables/ecommerce/creas/PureShot/` avec le nommage ADxx habituel.
6. Changement de doctrine à garder en tête : jusqu'ici le montage était 100 % manuel côté Roméo
   (CapCut). Avec Palmier, Claude monte et Roméo valide et corrige par la parole.

## 3. Le workflow (thread du 19/06)

1. **Vivier de rushes** : une vingtaine (ou plus) de vidéos concurrentes (TrendTrack, AdSpy, Content
   research `1-videos-a-traduire/`), sous-titres retirés si besoin (Vmake), importées dans Palmier
   (`import_media`, chemin absolu).
2. **`inspect_media`** sur chaque rush : Claude « regarde » (transcription + images), en local et
   gratuitement, et sait ce que contient chaque plan.
3. **Script** : écrit à partir de la **marketing research + retours clients** (mots exacts des
   clients, pas du copy IA générique).
4. **Voix off** générée (ElevenLabs), importée, mesurée, puis montage calé dessus.
5. **Montage de A à Z par Claude** : sélection des plans, coupes, rythme, sous-titres.
6. **Retouches à la parole** : « ce plan colle pas au mot », « voix plus rapide », « mets l'offre en
   CTA » → Claude remonte. On ne remonte jamais à la main.
7. **Itérer à partir d'une même bibliothèque** : changer seulement l'audio, ou l'avatar, ou les
   B-roll, ou le hook. Mauvais hook rate → nouveau hook ; mauvais CTR → nouveau CTA.
   ⚠️ Le thread propose aussi « une pub par niveau de conscience » : la leçon 3.3 dit de ne pas
   prioriser les niveaux de conscience avant 1 k€/jour. À ne pas mettre en avant avant ce seuil.

## 4. Les 6 consignes de montage (thread du 01/08) — à appliquer à chaque montage

**Consigne 1 — Jamais un plan choisi sur son nom de fichier.** `search_media` en visuel, requête
**en anglais formulée comme une légende d'image** :
❌ « plan produit » ✅ « close-up of a hand spraying a fine mist on a fabric sofa ».
Recherche sémantique, pas un Ctrl+F. **Puis regarder le clip (`inspect_media`) avant de le poser.**

**Le gros tip — Pexels.** Si le plan n'existe pas dans la bibliothèque, ne pas se rabattre sur un
rush approximatif : trouver le plan sur Pexels et l'importer **par URL HTTPS** (`import_media`).
Deux règles :
- Pexels = **beats humains, émotionnels, d'ambiance** (invités qui arrivent, chien sur le canapé,
  trajet en voiture). **Tout ce qui montre le produit en action reste sur nos rushes.**
- **La miniature ment** : regarder le clip entier avant de le poser, un clip taggé « X » montre
  souvent autre chose.

**Consigne 2 — Pré-vol des liens médias.** Des fichiers déplacés apparaissent dans la bibliothèque
mais sont illisibles : l'indexation renvoie 0 résultat et on retombe dans le choix à l'aveugle.
Avant de monter, vérifier que les médias s'ouvrent ; sinon réimporter par **chemin absolu**.

**Consigne 3 — Script beat par beat, 1 idée = 1 plan.** « Monte-moi une pub » = il invente. Chaque
ligne de voix off porte son **intention visuelle**, tirée des mots exacts des clients. Deux idées dans
une phrase (« c'est plus rapide ET ça ne coûte rien ») = **deux plans**.
Format du script remis à Palmier :
```
BEAT | Voix off (FR)                         | Intention visuelle (requête EN)                  | Source
1    | « ... »                               | "a guest wrinkling her nose at a front door"     | Pexels
2    | « ... »                               | "hand spraying fine mist on a dog bed"           | rush concurrent
```

**Consigne 4 — Voix off d'abord, et mesurée.** Débits réels : **211 mots/min en FR** (≈ 3,5 mots/s),
198 en EN. Pour un script de N secondes : **N × 3,5 mots en FR**. Le calcul sert à écrire, **la
mesure sert à monter** : générer la VO, mesurer sa durée réelle, PUIS caler les plans. (Cohérent avec
notre piège connu : deux prises ElevenLabs du même texte peuvent différer de 2-3 s.)

**Consigne 5 — Couper le son des B-roll, sous-titrer en dernier, relire.** Volume à 0 sur tous les
B-roll (`includeAudio=false` au placement, ou `volumeDb`) : sinon `add_captions` transcrit le son des
rushes au lieu de la VO et les sous-titres se désynchronisent. Transcription locale en `fr-FR`.
**Relire les sous-titres** : l'auto-transcription se trompe surtout sur **les chiffres et les
négations** (grave pour nous : prix, « sans », « ne ... pas »).

**Consigne 6 — Contrôle de la vidéo finie avant de la rendre (3 passes).** Jamais « c'est terminé »
sans :
1. détecter les images noires et les coupes qui tombent au milieu d'une phrase
   (`get_timeline`, `get_transcript` : bornes de clips vs bornes de mots) ;
2. sur les zones suspectes, extraire une image toutes les 0,3 s et la regarder (`inspect_timeline`) ;
3. phrase par phrase : **« le plan montre-t-il ce qui est dit ? »**

**Repères de rythme :**
- hook dans les 2-3 premières secondes ;
- une coupe toutes les 1 à 1,5 s ;
- 30 à 45 s ;
- varier les échelles (large / buste / macro) et les sources ;
- **1 clip = 1 seule utilisation par vidéo**, même avec un autre trim.

> « La qualité de ta créa = la qualité de tes consignes × la qualité de ton vivier. »

## 5. Résultat rapporté (non vérifié par nous)

Un utilisateur annonce une créa 100 % Palmier créée la veille, lancée le lendemain, « résultats au
rendez-vous », trop tôt pour conclure. Aucun chiffre exploitable : témoignage, pas une preuve.
