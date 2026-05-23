# Prompt Portfolio Personnel — Roméo PIAT

> Prompt prêt à l'emploi pour générer le portfolio via Claude (frontend-design).
> Coller dans une nouvelle session Claude ou utiliser la skill /frontend-design.
> Fichiers à placer dans le même dossier que index.html : photo.jpg + PIAT_Romeo_CV.pdf

---

```
Tu es un expert en développement frontend. Crée un portfolio personnel
complet en HTML / CSS / JS vanilla (aucun framework, aucune dépendance
externe sauf Google Fonts). Tout doit tenir dans un seul fichier index.html.

---

## Profil

- Nom : Roméo PIAT
- Formation : BUT GEA (Gestion des Entreprises et des Administrations)
  Section Euro, IUT de Valenciennes
- Tagline : "Étudiant en BUT GEA · Gestion, Finance & Comptabilité"
- Email : romeop2007@gmail.com
- Téléphone : 07 69 93 85 45
- Photo de profil : fichier photo.jpg à la racine (même dossier que index.html)

---

## Style visuel

Moderne et minimaliste :
- Palette sombre : fond #0f0f0f, sections alternées #141414 / #1a1a1a
- Accent unique : bleu électrique #3b82f6
- Typographie : Inter (Google Fonts), titres bold, corps regular
- Beaucoup d'espace blanc, pas de surcharge visuelle
- Animations subtiles : fade-in au scroll via IntersectionObserver,
  hover smooth sur les cartes
- Entièrement responsive (mobile-first)

---

## Sections (dans cet ordre)

### 1. Hero
- Photo de profil ronde (photo.jpg) à gauche, texte à droite
- Nom : Roméo PIAT en grand
- Tagline sous le nom
- Deux boutons CTA : "Voir mon CV" (scroll vers #cv) et
  "Me contacter" (scroll vers #contact)
- Indicateur de scroll animé en bas de section

### 2. À propos
Courte bio générée à partir de ces éléments :
- Étudiant en BUT GEA Section Euro à l'IUT de Valenciennes
- Titulaire du Baccalauréat (Lycée Saint-Luc, Cambrai, 2025)
- Titulaire du BAFA (2025)
- Permis B, véhiculé et mobile
- Passionné par la gestion, la comptabilité et les outils numériques
- Loisirs : Football en club (2011-2024), Musculation

3 cartes "points forts" avec icône SVG inline :
- Rigueur & Fiabilité
- Esprit d'équipe
- Adaptabilité

### 3. Expériences & Stages
Timeline verticale interactive (clic pour déplier le détail).
Tri du plus récent au plus ancien.
Tag "Stage" en bleu sur chaque entrée.

Expériences :

1. Poste : Assistant comptable - Service comptabilité
   Entreprise : DALKIA | Saint-André-lez-Lille
   Période : Février 2026 (1 mois)
   Missions :
   - Réalisation de liasse fiscale sur Cegid Tax Ultimate
   - Écriture comptable et lettrage de compte sur Oracle
   - Utilisation quotidienne d'Excel

2. Poste : Animateur en petite enfance
   Entreprise : Centre de Loisirs | Cambrai
   Période : Juillet - Août 2025 (1 mois et demi)
   Missions :
   - Organisation des activités pour les enfants
   - Mise en place des protocoles de sécurité
   - Collaboration avec une équipe éducative

3. Poste : Stagiaire pluridisciplinaire
   Entreprise : Expert Comptable Associé (ECA) | Cambrai
   Période : Juin 2023 (1 semaine)
   Missions :
   - Découverte du pôle social
   - Découverte du pôle comptabilité
   - Découverte du pôle juridique

4. Poste : Stagiaire administratif
   Entreprise : ATINORD, mandataire judiciaire à la protection des majeurs
   | Cambrai
   Période : Juin 2022 (1 semaine)
   Missions :
   - Gestion du bureau administratif
   - Observation au Tribunal

### 4. CV interactif (id="cv")
Section avec deux onglets (JS vanilla, pas de lib) :

Onglet 1 — "Parcours" :
Frise chronologique mêlant formations et expériences, du plus récent
au plus ancien :
- 2025/2026 : BUT GEA Section Euro - IUT de Valenciennes (en cours)
- Fév. 2026 : Stage DALKIA - Comptabilité
- Juil/Août 2025 : Animateur Centre de Loisirs
- 2025 : Baccalauréat - Lycée Saint-Luc Cambrai
  (spécialités : AMC, Maths, SI en première)
- 2025 : BAFA
- Juin 2023 : Stage ECA - Expert Comptable
- Juin 2022 : Stage ATINORD

Onglet 2 — "Compétences" :
Barres de progression animées (se remplissent au scroll) :
- Outils numériques (Excel, Oracle, Cegid) : 80%
- Comptabilité & Fiscalité : 70%
- Gestion de projet : 65%
- Communication écrite & orale : 72%
- Anglais (B1+) : 65%
- Espagnol (A2) : 35%

Section "Divers & Certifications" sous les barres :
- BAFA (2025)
- Permis B - véhiculé / mobile
- Football en club 13 ans (2011-2024)

Bouton "Télécharger mon CV (PDF)" visible dans les deux onglets.
href="PIAT_Romeo_CV.pdf" (placer le PDF à la racine du projet)

### 5. Relevés de notes — BUT GEA S1 (2025-2026)
Titre de section : "Mes meilleures notes — BUT GEA S1"
Sous-titre : "IUT de Valenciennes · Année 2025-2026"

Afficher UNIQUEMENT les matières avec note >= 12/20.
Présentation : grille de cartes (3 colonnes desktop, 2 tablette,
1 mobile).

Chaque carte contient :
- Nom de la matière
- Note en grand (colorée : vert si >= 16, bleu si >= 12)
- Barre de progression proportionnelle (/20), animée au scroll
- Badge UE d'appartenance

Notes à afficher (toutes >= 12) :

UE 1.1 — Identifier les processus de l'organisation :
- Ressources Humaines : 16.00/20 (vert)
- Environnement sociologique : 14.50/20 (bleu)
- S1C1 Situer une organisation dans son environnement : 16.00/20 (vert)

UE 1.2 — Identifier les EAD :
- Outils numériques de gestion : 19.00/20 (vert)
- Fiscalité : 14.58/20 (bleu)
- Outils mathématiques de gestion : 12.17/20 (bleu)

UE 1.3 — Identifier les relations :
- LV2 (Espagnol) : 14.08/20 (bleu)
- LV1 - Anglais : 12.75/20 (bleu)
- S1C3 Piloter : 13.00/20 (bleu)

Mention discrète en bas de section :
"Toutes les UE du S1 validées · Rang moyen : top 35/162 étudiants"

### 6. Contact (id="contact")
- Message d'accroche : "Une opportunité, un projet, une question ?
  Écris-moi."
- Email cliquable : romeop2007@gmail.com
- Téléphone cliquable : 07 69 93 85 45
- Icônes LinkedIn et GitHub SVG inline avec href="#" (placeholder)

---

## Comportement technique attendu

- Navigation sticky en haut avec liens ancres lisses vers chaque section
- Smooth scroll natif CSS (scroll-behavior: smooth)
- Menu hamburger fonctionnel sur mobile
- Animations au scroll via IntersectionObserver uniquement (pas de lib)
- Onglets CV en JS pur (addEventListener sur les boutons)
- Timeline expériences : clic pour déplier/replier le détail (accordion)
- Barres de progression : animation déclenchée à l'entrée dans le viewport
- Tout le contenu est dans le HTML, aucun fetch, aucune API externe
- Fichiers attendus à la racine : index.html, photo.jpg,
  PIAT_Romeo_CV.pdf

---

## Livrable

Un unique fichier index.html, complet et fonctionnel dès l'ouverture
dans un navigateur. Aucun TODO, aucun placeholder de code. Le fichier
doit être prêt à l'emploi une fois photo.jpg et PIAT_Romeo_CV.pdf
placés dans le même dossier.
```
