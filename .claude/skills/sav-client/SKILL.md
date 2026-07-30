---
name: sav-client
description: Génère la réponse SAV à envoyer à un client Zooryn, à partir du template officiel Zecom Academy (Module 9). Se déclenche quand Roméo colle un message client (mail, capture, résumé) et demande la réponse à envoyer, ou dit "réponds à ce client", "c'est quoi la réponse pour ça", "gère ce mail SAV". Claude ne fait qu'appliquer le template avec les vraies infos Zooryn : jamais d'improvisation, jamais de réponse inventée hors template.
---

# SAV client Zooryn

## Contexte

Roméo a déposé le template officiel de la formation Zecom Academy (`Module 9 - SAV`), qui couvre
7 catégories de situations SAV avec des mails-types pour chaque cas (voir
`references/templates-sav-zecom.md`, copie fidèle du PDF).

**Modèle de travail (acté le 30/07/2026)** : pas d'automatisation, pas de connecteur mail. Roméo
colle le message du client dans le chat, Claude génère la réponse exacte à envoyer, Roméo l'envoie
lui-même. Si Claude devient fiable dans la durée, Roméo a annoncé vouloir éventuellement automatiser
la génération plus tard — pas avant d'avoir vu que ça marche bien sur des cas réels.

## Ce que Claude doit faire, à chaque message client reçu

1. **Identifier le cas exact** dans `references/templates-sav-zecom.md` qui correspond le mieux à
   la situation décrite par Roméo (catégorie + sous-cas + étape de la conversation si plusieurs
   mails déjà échangés avec ce client).
2. **Si aucun cas ne correspond clairement**, le dire à Roméo plutôt que d'inventer une réponse
   hors template — proposer le cas le plus proche et signaler l'écart.
3. **Remplacer les placeholders** (`{nom du site web}`, `{délai réel Zooryn}`, `{lien page suivre
   ma commande}`, `[Code promo]`, `{numéro de commande}`, etc.) avec les vraies infos listées dans
   `references/verites-zooryn-sav.md`. **Ne jamais laisser un placeholder générique tel quel dans
   la réponse finale.**
4. **Si une info nécessaire n'est pas encore confirmée** (lien de suivi de commande, code promo
   dédié, adresse de retour agent — cf. section "pas encore confirmé" du fichier vérités), le dire
   à Roméo et lui demander l'info manquante plutôt que d'inventer.
5. **Sortir la réponse prête à copier-coller**, rien d'autre autour (pas de commentaire meta dans
   le corps du mail).
6. **Ton : vouvoiement**, comme le template original (pas le tutoiement de marque utilisé ailleurs
   sur Zooryn — décision spécifique au registre SAV, actée le 30/07/2026).

## Règle d'or : zéro improvisation

Le but explicite de Roméo est d'avoir une réponse fiable et cohérente, pas une réponse créative.
Si le message client sort du cadre des cas prévus dans le template (situation inédite, menace
légale non couverte, demande inhabituelle), le signaler clairement à Roméo plutôt que de générer
une réponse inventée qui n'a pas été validée par la formation.

## Point de vigilance permanent : frais de retour vs CGV

Décision actée le 30/07/2026 : on suit le template (frais de retour à la charge du client), qui
contredit actuellement les CGV publiées sur zooryn.com (qui disent que Zooryn prend en charge les
frais de retour). **Tant que Roméo n'a pas fait corriger ses CGV**, il y a un vrai risque de
contradiction si un client va vérifier. Le rappeler à Roméo dès qu'un cas de retour réel se
présente, pas seulement une fois.

## Fichiers

- `references/templates-sav-zecom.md` — le template complet, à suivre à la lettre (structure et
  contenu des mails), organisé par catégorie/cas.
- `references/verites-zooryn-sav.md` — les vraies infos Zooryn à injecter, et la liste de ce qui
  n'est pas encore confirmé (à ne jamais inventer).
