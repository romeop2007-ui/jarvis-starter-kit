# Pourquoi diversifier : le modèle des audiences qui s'épuisent (Module 11, leçon 3.2)

> Source : transcription locale de la leçon Zecom Academy « 3.2 L'importance de la diversité en
> ads » (`livrables/ecommerce/formation/Module 11 - Les créatives/3.2 L'importance de la diversité
> en ads/video/`, 22 min, transcrite le 16/09/2026) + capture du schéma dessiné pendant la vidéo.
> Complète `synthese-iterations-scaling.md` (leçon 1.3) : ce fichier-là dit SUR QUOI et COMMENT
> itérer, celui-ci explique POURQUOI la diversité est nécessaire (le mécanisme d'audience) et où
> se situe la limite entre vraie et fausse diversification. Le formateur annonce une future vidéo
> dédiée à « comment itérer au mieux » : à surveiller, risque de redite ou de contradiction avec
> la 1.3 (déjà signalé pour la numérotation « Étape 2 »).

## Le modèle : des poches d'audience emboîtées, chacune finie

Une audience globale (ex. tout le marché des semelles orthopédiques) se découpe en poches
emboîtées, chacune de taille variable et **finie** :

```
Audience globale du produit
 └─ Angle marketing 1, 2, 3... (ex. douleur / posture / confort chaussure)
     └─ Message A, B, C... par angle (ex. "tes genoux payent pour tes pieds")
         └─ Concept / créa (UGC, testimonial, founder story, mashup, statique...)
             └─ Variations (acteur/avatar, lieu/décor)
```

- **Un angle marketing** = une audience potentielle de taille propre. Certains angles touchent
  beaucoup plus de monde (plus scalables) que d'autres ; impossible de le savoir à l'avance, on le
  découvre en envoyant et en regardant ce qui dépense et convertit.
- **Un message** à l'intérieur d'un angle a lui-même sa propre taille d'audience (le message G
  peut toucher beaucoup plus de monde que le message H dans le même angle).
- **Un concept/créa** (le format d'exécution : UGC, mashup, founder story, statique...) et ses
  variantes (acteur, lieu) sont ce qui vient réellement consommer, petit bout par petit bout, la
  poche d'audience du message ciblé.

## Le schéma de la capture envoyée par Roméo (16/09)

Le tableau « Angles marketing + messages » (3 angles numérotés, messages A à J en dessous) est la
première moitié du schéma : il pose la hiérarchie angle → message. Les trois cercles colorés
(vert dense/gribouillé, rouge petit et déjà rempli, bleu partiellement rempli) sont la **deuxième
moitié**, dessinée plus loin dans la vidéo : chaque cercle représente un message ciblé par Meta,
et le remplissage progressif (gribouillage qui couvre de plus en plus le cercle) représente
**l'audience consommée** par les ads envoyées successivement sur ce message. Un cercle presque
entièrement gribouillé = poche d'audience quasi épuisée, cette poche ne rapportera bientôt plus
rien même en changeant le montage.

## Le mécanisme du plafond (pourquoi un produit se bloque)

1. Le testing tombe sur un angle/message qui marche (souvent repris du concurrent sans le
   choisir consciemment — c'était juste sa top ad).
2. Meta cible en priorité cette poche d'audience très réceptive : bons ROAS, ça scale vite.
3. Sans nouveau message, on ne fait qu'**itérer en surface** sur la même poche (changer l'ordre
   des plans, reformuler la même phrase, inverser des B-roll) : ça continue de manger la même
   audience, juste un peu moins efficacement à chaque nouvelle créa.
4. La poche s'épuise : ROAS qui se dégrade, obligation de redescendre le budget (ex. 250 €/jour
   qui retombe à 100 €/jour), plafond qui semble être celui du produit alors que c'est celui du
   **message**.
5. Dès qu'un vrai nouveau message/angle est trouvé (poche fraîche, jamais touchée), le budget peut
   repartir immédiatement à la hausse (100 → 200 → 300 €/jour du jour au lendemain), sans rien
   changer d'autre.

**Diagnostic à appliquer sur un produit qui plafonne :** avant de conclure "le produit est mort",
vérifier combien d'angles/messages *distincts* ont réellement été testés, pas combien de créas.
Beaucoup de créas sur un seul message = zéro diversification, malgré l'impression de volume.

## Vraie vs fausse diversification (le point le plus utile)

| Fausse diversification (ne débloque rien) | Vraie diversification (ouvre une nouvelle poche) |
|---|---|
| Reformuler la même phrase avec d'autres mots | Nouveau message qui attaque un point de douleur différent |
| Inverser l'ordre de 2-3 plans dans un mashup | Nouveau concept (passer de mashup à UGC/testimonial/founder story) |
| Changer juste la durée (29 s → 45 s) sans toucher au fond | Nouvel angle marketing (ex. passer de "douleur" à "posture") |
| Multiplier les statiques sur le même message unique | Nouvel avatar (âge, genre, origine) sur le même message |
| Croire qu'un nouveau format visuel = diversité | Nouveau lieu/décor qui change aussi un peu le script (pas juste le décor) |

Ce tableau recoupe et confirme la grille 🟢/🟠/🔴 de `synthese-iterations-scaling.md` : cette
leçon 3.2 justifie *pourquoi* ces distinctions existent (audience réellement différente touchée ou
non), l'autre donne la liste exhaustive des éléments à faire varier.

## Technique concrète : extraire le framework d'une créa qui marche

Exemple donné dans la leçon (ad Lumix trouvée sur TrendTrack, bandes lumineuses à détection de
mouvement) : la même créa de base (avatar locataire qui ne peut pas percer de trous) est déclinée
en changeant uniquement le lieu (cuisine → dressing), ce qui suffit à ouvrir un nouvel angle
d'attaque à moindre coût.

Méthode pour reproduire ça sur ses propres créas ou celles d'un concurrent :
1. Transcrire la créa qui marche (script complet).
2. Donner le transcript à ChatGPT/Claude avec *Breakthrough Advertising* en contexte (skill
   `eugene-schwartz-breakthrough-advertising`) et demander d'identifier le **framework structurel**
   utilisé (ex. hook qui identifie l'avatar → comparaison avec une solution existante plus chère
   → effet de contraste par le prix → preuve sociale/testimonial → offre → garantie).
3. Redonner ce framework à l'IA en précisant le nouvel angle, le nouveau message ou le nouvel
   avatar visé, et demander un script réadapté avec les *mêmes mécanismes psychologiques* mais un
   contenu différent (les arguments changent : "cuisiner correctement" en cuisine vs "bien
   s'habiller" dans un dressing).
4. Ça marche aussi bien sur une créa concurrente que sur sa propre meilleure créa.

## À retenir pour PureShot

- Avant de conclure qu'une créa ou qu'un message plafonne, vérifier qu'on a bien changé l'angle ou
  le message, pas juste le montage/le hook en surface.
- Le contenu (marketing research + variété d'angles/messages, pas seulement de formats) est le
  vrai levier de scaling à moyen terme, cohérent avec `synthese-marketing-research.md` (lecon 3.1)
  déjà utilisée pour prioriser AD10.
- Vidéo annoncée en suite : "comment itérer au mieux de manière générale" — à transcrire dès
  qu'elle sort, en vérifiant si elle rentre en écho ou en contradiction avec la 1.3.
