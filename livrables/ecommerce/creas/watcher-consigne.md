# Consigne du watcher créas (exécutée à chaque tour de boucle)

Tu es le "deuxième cerveau" de Roméo. Ton seul job à chaque réveil : repérer un nouveau lot de
créas déposé par Roméo et le préparer jusqu'à la commande finale qu'il n'aura plus qu'à coller.
Travaille depuis la racine du repo `jarvis-starter-kit`.

## 1. Détecter

Lance :

```
node "livrables/ecommerce/creas/watcher-nouveaux.mjs"
```

- **Sortie vide** → rien de nouveau. Dis "Rien de nouveau" en une ligne et termine ce tour. Ne fais rien d'autre.
- **Un ou plusieurs noms de lot** (ex `T5`) → traite-les un par un avec la suite.

## 2. Récupérer le nom du produit

Dans le dossier du lot (`livrables/ecommerce/creas/ressources créas avant modifs/<LOT>/`), cherche
un fichier `produit.txt` : il contient le nom du produit Shopify (ex "Zooryn - Guirlande lumineuse solaire").

- Présent → utilise ce nom.
- **Absent** → traite quand même ce que tu peux, mais signale clairement dans ton message final
  qu'il manque le nom du produit (place-le en `<NOM PRODUIT A REMPLIR>` dans les scripts).

## 3. Exécuter le skill crea-pub sur le lot

Applique le **Chemin VIDEO / Chemin IMAGE** du skill `crea-pub`
(`.claude/skills/crea-pub/SKILL.md`) sur chaque pub du lot, jusqu'à produire, dans chaque
sous-dossier `ADn` de `ressources créas après modifs/<LOT>/` :

- `script-fr.txt` (pub à voix off, calée à `D × 2,4` mots, durée cible ±1 s), ou
- `accroches-fr.md` (pub muette/musicale ou image).

Fais tout ce qui ne demande pas d'auto-exécution interdite : durée (ffprobe), transcription
(ElevenLabs Scribe), détection muette/musicale, rédaction du script FR à la marque. **NE LANCE
PAS** `creas-lot.ps1` ni le SDK Vmake toi-même (interdit) : tu prépares seulement la commande.

## 4. Écrire la commande finale dans un fichier (mode headless, pas de chat)

Tu tournes sans interface : Roméo ne lit pas ta sortie. Écris donc la commande dans un fichier
texte à la racine des créas, qu'il ouvrira et collera :

`livrables/ecommerce/creas/A-COLLER-<LOT>.txt`

Contenu du fichier :

```
Lot <LOT> prêt. Colle cette commande dans ton terminal PowerShell (depuis la racine du repo) :

.claude/skills/crea-pub/scripts/creas-lot.ps1 -Lot <LOT>

Après : vérifie la durée des voix-off.mp3 (±1 s) et que tout est rangé dans
ressources créas après modifs/<LOT>/ADn/.
<+ tout point bloquant, ex : nom de produit manquant>
```

## 5. Mémoriser le lot comme traité

Ajoute le nom du lot à la fin de `livrables/ecommerce/creas/.watcher-traites.txt` (une ligne par
lot) pour ne JAMAIS le retraiter au prochain tour. Vérifie qu'il n'y est pas déjà.

## 6. Fin

Tu n'as personne à qui parler (headless). Le seul livrable qui compte est le fichier
`A-COLLER-<LOT>.txt` de l'étape 4 et les `script-fr.txt` / `accroches-fr.md` des `ADn`. La
notification Windows est gérée par le watcher, pas par toi. Termine simplement.
