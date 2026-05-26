# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-05-26

### Session de travail — PPP, portfolio BUT GEA et auto-évaluation

**PPP (Projet Professionnel Personnalisé) :**
- Synthèse PPP conférences métiers (RRH et Manager) rédigée sur Notion à recopier à la main
- 5 questions traitées : correspondance, surprises, compétence essentielle, influence parcours, spécialité envisagée (GEMA)
- Posture sincère sur RRH (pas de projection long terme) et enthousiaste sur Manager (cohérent avec le métier de rêve DG club sportif)

**Portfolio BUT GEA — mise à niveau aux attendus :**
- Lecture des documents officiels (PORTFOLIO_attendus_GEA1_vf.docx et Grille autoeval étudiant.docx) déposés dans `livrables/etudes/projets/portfolio/PORTFOLIO_RAPPELS_extracted/`
- Auto-évaluation initiale en l'état : 3,33/20 (page Notion dédiée), projection cible 15/20 après ajouts
- Trois nouvelles sections ajoutées à `livrables/etudes/projets/portfolio/index.html` :
  - **05 - Référentiel** : Compétences BUT GEA 1ère année avec apprentissages critiques et traces argumentées (3 cartes, une par compétence)
  - **06 - Situations d'apprentissage** : SAÉ 1 (sociologie, rôle de meneur de fait) et SAÉ 2 (compta/fisca/management 3 jours), avec contexte, rôle, productions, AC mobilisés et REX
  - **07 - Démarche réflexive** : 4 cartes (forces, axes de progrès, analyse honnête des notes décevantes, compétence transverse leadership de fait)
- Nav mise à jour avec les 3 nouveaux liens
- Renumérotation Contact de 05 à 08
- CSS dédié ajouté pour les nouvelles sections (comp-card, sae-card, reflex-card), cohérent avec le design existant
- Notice réflexive 2 pages créée sur Notion (questions A/B/C des attendus)

**Décision personnelle :**
- Auto-entrepreneur dropshipping volontairement écarté du portfolio scolaire, à mobiliser plus tard quand les résultats seront probants

---

## 2026-05-25 (mise à jour 2)

### Intégration d'une formation dropshipping complète comme base de connaissances

- Dépôt du fichier `context/import/plan stratégique e-commerce.txt` (2944 lignes, 37 000+ mots) : formation complète "0 à 1M de CA" en e-commerce/dropshipping
- Lecture intégrale du fichier
- Création de `context/formation-dropshipping-synthese.md` : synthèse opérationnelle structurée par chapitres (stratégie globale, recherche produit, Meta Ads, Shopify, méthodologie testing, créatives par phase de CA, CRO, agents/sourcing, délégation, autres tips)
- Mise à jour de `CLAUDE.md` : ajout d'une section "Expertise e-commerce / dropshipping" qui indique de s'appuyer sur la synthèse pour toute question business, et structure de workspace mise à jour
- Posture définie : expert e-commerce dédié, pas assistant généraliste. Toutes les recommandations business doivent s'aligner sur cette stratégie

## 2026-05-25 (mise à jour 1)

### Mise en pause du projet dropshipping

- Décision : tout le travail mené sur la recherche produit dropshipping via TrendTrack est mis en pause et retiré du contexte actif
- Éléments supprimés du contexte : niche retenue, produit cible, concurrents à surveiller, prochaine étape opérationnelle
- Raison : choix personnel de remettre le projet à plat pour le reprendre prochainement sur de nouvelles bases
- Reprise prévue très prochainement

---

## 2026-05-24 (session 2)

### Session de travail — Portfolio, GitHub, Netlify et MCP

**Portfolio :**
- Repo GitHub créé : `romeop2007-ui/portfolio` et fichiers poussés
- Formulaire contact rendu fonctionnel via Formspree (`mwvznpgv`) — envoi direct sans ouvrir de client mail
- Nom "Roméo PIAT" mis en blanc dans la nav
- Token GitHub sécurisé : retiré de l'URL git, stocké dans Windows Credential Manager

**Outils et config :**
- Extension VS Code Speech installée pour la saisie vocale en français
- MCP TrendTrack confirmé actif (plan Business, 10 000 crédits/mois) — prévu pour recherche produit dropshipping
- Mémoire créée pour rappeler TrendTrack au prochain `/prime`

**Netlify :**
- Site portfolio déployé et connecté au repo GitHub
- Formulaire contact Formspree opérationnel (plus de dépendance à Netlify Forms)

---

## 2026-05-24

### Session de travail — Structure, organisation et portfolio

**Structure du workspace :**
- Création de l'arborescence complète `livrables/` (46 dossiers) adaptée au profil entrepreneur-étudiant : ecommerce, etudes, dev-perso, finances-perso, freelance
- Création du fichier `.env` (variables d'exemple par service) et `.gitignore`
- Initialisation du dépôt Git avec premier commit

**Commandes Jarvis :**
- Création de la commande `/commit` avec scan de secrets intégré (5 étapes : vérif dépôt, analyse, message, scan secrets, exécution)
- 2 commits effectués au cours de la session

**Portfolio étudiant :**
- Génération d'un prompt complet pour Claude Design afin de créer le portfolio HTML/CSS/JS vanilla
- Données réelles intégrées : CV complet (4 stages, formations, compétences, langues), notes BUT GEA S1 filtrées >= 12/20 (9 matières affichées), photo de profil
- Prompt sauvegardé dans `livrables/etudes/projets/prompt-portfolio.md`

**Mémoire :**
- Règle mémorisée : afficher un récap à chaque ajout dans `livrables/`

---

## 2026-05-23

### Installation initiale du Jarvis
- Workspace personnalisé pour Roméo, basé à Valenciennes en semaine (études) et Cambrai chez ses parents les week-ends et vacances
- Profil principal : auto-entrepreneur en e-commerce, en parallèle des études
- Activité : lancement d'une activité en dropshipping (statut auto-entrepreneur créé, boutique et niche à définir)
- Objectifs court terme identifiés : trouver une niche, identifier des produits gagnants, lancer une boutique Shopify, atteindre 1 000 euros de CA en 3 mois
- Vision long terme : maîtriser le dropshipping, potentiellement en vivre, ouvert à diversifier en parallèle d'une boutique qui scale
- Projets actifs au démarrage : maîtrise de l'IA, application de l'IA au e-commerce, portfolio étudiant (priorité moindre)
- Outils utilisés : Claude, ChatGPT, Google Sheets, Google Docs, TrendTrack, Shopify, Prompt Cowboy, Gmail, Vinted
- Domaine d'aide prioritaire : apprentissage et formation (maîtrise de l'IA et du dropshipping)
- Style de communication choisi : mélange selon le contexte (direct ou pédagogique)
