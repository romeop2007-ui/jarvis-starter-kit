# Filtre anti-ban Meta — ce qu'un hook n'a pas le droit de dire

> Source : Meta Advertising Standards, section *Privacy Violations and Personal Attributes*
> (transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes),
> complétée par la politique Santé et bien-être du Business Help Center et par l'état de
> l'application au 07/08/2026.
>
> **Ce fichier passe AVANT toute écriture de hook.** Un hook refusé ne coûte pas seulement une
> pub : les rejets répétés dégradent le compte publicitaire, et la restriction d'un compte pub
> neuf est bien plus rapide qu'on ne le croit. Sur Zooryn on écrit le hook conforme du premier
> coup, on ne teste pas la limite.

---

## 1. La règle, en une phrase

**Meta refuse toute publicité qui a l'air de savoir quelque chose de sensible sur la personne
qui la lit.**

Ce n'est pas le produit qui est jugé, c'est la formulation. Un produit parfaitement autorisé à
la vente (un boxer absorbant, une orthèse, un complément non ingéré) se fait refuser si le texte
attribue une condition au spectateur.

### Les attributs protégés

Santé physique · santé mentale · handicap · situation financière vulnérable · race ou origine
ethnique · religion · orientation sexuelle · identité de genre · âge · casier judiciaire ou
statut d'immigration · opinions politiques.

Pour Zooryn, les trois qui mordent réellement sont **la santé physique, l'âge et le handicap**.

---

## 2. Le test de la phrase (à appliquer mécaniquement)

> **Retire le nom du produit de la phrase. Est-ce qu'elle décrit ce que l'entreprise propose,
> ou est-ce qu'elle affirme un fait sur la personne qui lit ?**

- Décrit l'offre → conforme.
- Affirme, suppose ou sous-entend un fait sur le lecteur → refusé.

Le mot « tu » ou « vous » **n'est pas interdit en soi**. Ce qui déclenche le refus, c'est de
**relier un pronom à une condition**. « Trouve ta taille » passe. « Tu as des fuites » ne passe
pas.

---

## 3. Grilles refusé / conforme

### Santé physique

| Refusé | Pourquoi | Conforme |
|---|---|---|
| « Tu as des fuites urinaires ? » | Affirme la condition du lecteur | « Sous-vêtement absorbant, 3 niveaux de protection » |
| « Fatigué de te lever 3 fois par nuit ? » | Suppose un symptôme | « Conçu pour tenir toute la nuit » |
| « Tes douleurs chroniques s'aggravent ? » | Relie le lecteur à une évolution médicale | « Options d'évaluation et de soulagement disponibles » |
| « Besoin de perdre 20 kilos ? » | Suppose le poids et l'objectif | « Coupe gainante, du S au 4XL » |

### Âge et handicap

| Refusé | Pourquoi | Conforme |
|---|---|---|
| « Tu es handicapé ? On peut t'aider » | Exemple de violation cité par Meta | « Solutions d'accessibilité conçues avec des spécialistes » |
| « Après 60 ans, ton corps change » | Attribue l'âge au lecteur | « Pensé pour durer, à tout âge » |
| « Rejoins **d'autres** seniors » | Voir piège n°2 ci-dessous | « Rejoins la communauté » |

### Situation financière

| Refusé | Conforme |
|---|---|
| « Tu vis d'un salaire à l'autre ? » | « Paiement en 3 fois disponible » |
| « Ton mauvais crédit te bloque ? » | « Options de financement accessibles » |

### Le « tu » qui reste autorisé

« Trouve ta taille » · « Reçois ton guide gratuit » · « Commande la tienne aujourd'hui » ·
« Livré chez toi ».

Le pronom porte sur **une action commerciale**, pas sur un état.

---

## 4. Les trois pièges qui coûtent des refus

### Piège n°1 — La troisième personne ne sauve plus (durci en mars 2026)

L'application automatique a été étendue aux **tournures indirectes**. « Pour les personnes qui
gèrent X » et « ceux qui souffrent de Y » sont aujourd'hui flaggés **au même taux** que le « tu »
direct, parce que le signal de ciblage entre dans l'évaluation de la policy. Contourner en
passant de « tu » à « les personnes qui » est une fausse solution.

**Ce qui marche vraiment, c'est de changer de sujet grammatical**, pas de personne : la phrase
doit parler du produit, d'un résultat ou d'un narrateur identifié, jamais d'un groupe défini par
sa condition.

### Piège n°2 — Le mot « autre »

Ajouter « autre » transforme une phrase saine en violation, parce qu'il signale au lecteur qu'il
appartient au groupe.

- « Des hommes de plus de 60 ans nous écrivent » → passe.
- « **D'autres** hommes de plus de 60 ans nous écrivent » → refusé.

### Piège n°3 — Ce qui ne répare rien

- Supprimer le « tu » sans changer l'inférence.
- Transformer une affirmation en question (souvent pire : la question interpelle).
- Changer seulement le visuel en gardant le texte.
- Croire qu'une pub approuvée règle la catégorisation des données dans Events Manager. Ce sont
  **deux systèmes distincts** : une réécriture conforme ne retire pas une catégorie Santé et
  bien-être d'un jeu de données, et corriger le pixel ne répare pas un texte non conforme.

### Cohérence sur toute la chaîne

La même langue doit tenir sur **la pub, la fiche produit et la landing**. Un hook conforme qui
renvoie vers une page produit qui, elle, demande « Souffrez-vous d'incontinence ? » remet le
compte en risque.

---

## 5. Les quatre portes de sortie (à utiliser dans cet ordre)

Quand le produit touche un sujet protégé, la charge émotionnelle du hook doit sortir de la
personne qui regarde. Quatre déplacements possibles, du plus sûr au plus tendu :

1. **Sur le produit** — démonstration physique, matière, coupe, absorption, épaisseur.
   *« 400 ml. Zéro épaisseur visible. »*
2. **Sur un narrateur à la première personne** — quelqu'un parle de lui-même. Un « je » ne
   déclenche jamais la policy, c'est le « tu » qui la déclenche.
   *« J'ai arrêté de m'asseoir près des portes. »*
3. **Sur une situation générique non médicale** — un long trajet, un vol, une nuit entière, une
   journée de golf. La situation porte l'émotion, la condition n'est jamais nommée.
4. **Sur une conséquence sociale racontée en scène** — la mécanique historique du direct response
   sur les sujets gênants (voir `synthese-caples-schwab-accroches.md`, section « sujets gênants »).
   La plus puissante, la plus délicate à écrire : elle doit rester une scène, jamais un diagnostic.

---

## 6. Application Staydries (boxer absorbant, hommes 60+)

Le concurrent cible frontalement l'état de santé supposé dans ses hooks. **On ne les traduit
pas.** Réécritures prêtes :

| Hook concurrent (type) | Statut | Réécriture Zooryn |
|---|---|---|
| « Fuites urinaires ? La solution » | Refus certain | « 400 ml absorbés. Invisible sous un jean. » (produit) |
| « Après 60 ans, votre vessie change » | Refus certain | « J'ai reporté ce moment pendant deux ans. » (narrateur) |
| « Fini les protections qui font du bruit » | Refus probable (sous-entend l'usage) | « Le coton fait moins de bruit que le plastique. » (produit) |
| « Pour les hommes qui gèrent l'incontinence » | Refus (tournure indirecte, mars 2026) | « Pour les hommes qui n'aiment pas les compromis. » |

**Règle de session :** aucun hook Staydries ne part en production sans être passé au test de la
phrase de la section 2. En cas de doute sur une formulation, elle est réécrite, pas soumise.
