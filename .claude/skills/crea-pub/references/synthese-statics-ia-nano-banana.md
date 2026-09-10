# Génération de statics par IA — Nano Banana Pro (Module 11, 1.5.3 "Création de statics IA")

> Source : transcription intégrale locale (Whisper) de la leçon Zecom Academy "1.5.3 Création de statics IA"
> (`livrables/ecommerce/formation/Module 11 - Les créatives/1.5.3 Création de statics IA/video/1.5.3-creation-de-statics-ia.txt`), formateur Adam (méthode "Loops").
> Complète `synthese-statics-scaling.md` (catalogue de formats) et `synthese-mashup-video-scaling.md` (créas vidéo) : ici, le **pipeline technique de génération** des statiques par IA.

## ⚠️ Pipeline PERSONNEL de Roméo, pas piloté par Claude

**Décision actée le 10/09/2026 : Roméo exécute ce pipeline lui-même, de bout en bout, sans passer par Claude à chaque génération.** Il a adapté la méthode du formateur à ses outils déjà payés :
- **Étape 1 (agent de prompt-crafting) : ChatGPT Project** (abonnement ChatGPT Plus déjà payé), au lieu de l'OpenAI Playground/API (facturé à la génération) montré dans la vidéo. Roméo garde les 3 prompts du formateur (prompt système, prompt de brief marque, prompt de créa) **dans son propre Projet ChatGPT** — il a choisi de ne pas les transmettre à Claude, ce pan du travail lui appartient entièrement.
- **Étape 2 (génération d'image) : Google AI Studio, modèle Nano Banana Pro**, identique à la vidéo (facturé à l'usage, quelques centimes/génération).
- **Étape 3 (retouches) : identique à la vidéo** (re-prompt sur Google AI Studio pour le visuel, Canva pour le texte éditable et les marges de sécurité au crop).

**Conséquence pour Claude : ne pas proposer de générer un prompt d'image pour une statique de scaling sans que Roméo le demande explicitement** — il pilote ce pipeline seul (cohérent avec sa préférence générale pour les outils autonomes, cf. mémoire `feedback_outils_autonomes_sans_claude`). Le **"Chemin IMAGE" existant du skill `crea-pub`** (Claude écrit un prompt, Roméo colle dans ChatGPT) reste la méthode par défaut pour **traduire/adapter une pub concurrent précise** ; le pipeline Nano Banana Pro ci-dessous est une méthode **complémentaire**, réservée par Roméo à la phase de génération en volume (test de static-friendliness, cf. `synthese-statics-scaling.md`).

## Le déclic technique du formateur (contexte, pas une action à faire)

Nano Banana Pro (Google, sorti ~2 mois avant la leçon) = modèle de génération d'image entraîné sur des milliards d'images dont des publicités : quasi plus de bugs de texte, raisonnement approfondi sur la composition. Un prompt bien construit suffit à sortir une statique quasi prête à poster.

## Pipeline complet (tel que montré, avec la substitution actée ci-dessus)

1. **Agent de prompt-crafting** (ChatGPT Project chez Roméo, OpenAI Playground/GPT-5.1 dans la vidéo) : reçoit un **doc de marque complet** (marché, angles marketing, persona, exemples) en amont — brief à prendre très au sérieux, un brief incomplet dégrade directement la qualité de sortie.
2. **3 modes d'utilisation de l'agent**, au choix :
   - **Mode A — copier une structure** : donner une créative existante + l'angle marketing voulu → l'agent adapte la structure à la marque.
   - **Mode B — donner juste le concept** : ex. "je veux une créa avant/après qui parle de X" → l'agent développe.
   - **Mode C — tout décrire** : headline, sous-headline, bullet points exacts → l'agent restitue tel quel.
3. **Génération de l'image** (Google AI Studio, Nano Banana Pro) : coller le prompt sorti par l'agent + une image du produit + le logo, choisir le format (carré / 4:5 / 9:16), lancer. Réglage température/top-p laissé à 1 (pas à 0) pour garder la capacité de raisonnement du modèle sur la cohérence de structure.
4. **Retouches visuelles** : re-prompt sur la même interface (ex. "retire les noix de coco en bas de l'image", en gardant le même ratio) — fonctionne aussi bien sur le texte que sur les éléments visuels.
5. **Retouches finales sur Canva** : texte détectable et re-éditable via "capture de texte" (police, contenu modifiables), puis "agrandissement d'image / page entière / développer" pour ajouter des marges de sécurité si la créa doit être crop-able en carré sans perte.

## Point de méthode à retenir (indépendant de l'outil)

Le formateur insiste : **la qualité du brief de marque conditionne tout**. Un agent qui ne connaît pas la marque ou reçoit un brief flou produira une créa générique ou avec des erreurs de copywriting — cohérent avec la doctrine `crea-pub` existante de verrouiller le texte/l'offre AVANT toute génération d'image (cf. Phase 1 du "Chemin IMAGE" dans `SKILL.md`).

## Ce que ce document NE contient PAS (volontairement)

Les 3 prompts exacts fournis par le formateur (prompt système de l'agent, prompt de génération du brief de marque, prompt de génération de la créa) : Roméo les garde dans son Projet ChatGPT personnel, pas dans ce repo.
