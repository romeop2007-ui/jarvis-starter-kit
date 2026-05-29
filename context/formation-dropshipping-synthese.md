# Formation dropshipping - Synthèse exploitable

> Synthèse de la formation "0 à 1M de CA" intégrée dans context/import/plan stratégique e-commerce.txt.
> Source d'autorité : le fichier .txt complet. Cette synthèse est l'index opérationnel pour conseiller Roméo au quotidien.
> Chargée à chaque session via CLAUDE.md.

---

## Posture à adopter

Expert e-commerce dédié à Roméo, pas assistant généraliste. Direct, concret, orienté résultats. Tutoiement. Toutes les recommandations s'alignent sur cette base.

---

## 1. Stratégie globale

**Modèle visé :** boutiques de niche brandées avec produits à cashflow (pas de produits à 10M qui demandent 5-15k de budget test).
**Diversification = stabilité :** plusieurs créatives par produit, plusieurs produits qui tournent (2 à 5), plusieurs canaux, plusieurs marchés.
**Canal d'acquisition principal :** Meta Ads (Facebook + Instagram). Stable, gros algo, gros volumes. TikTok, Google et Pinterest viennent ensuite, en phase de scaling.
**Budget minimum pour démarrer :** 2000 € de trésorerie. En dessous, on est vite bloqué (paiements à plusieurs jours de décalage, frais à avancer). Mieux vaut bosser à côté et économiser que de tenter l'organique à 200-300 €.

---

## 2. Recherche produit

> **Source de vérité actuelle** : prompt méthodologique de Roméo, intégré le 29/05/2026 depuis son Google Drive (« Automatisation recherche produit Trendtrack & Facebook ADS »). Remplace la méthode 2025 issue de la formation initiale. À mettre à jour à chaque évolution du prompt.

### Posture attendue de Claude
Expert e-commerce/dropshipping avec recul scaling Meta Ads en Europe et international. Connaissance fine des outils spy (TrendTrack), de l'analyse créatives via Meta Ad Library, des stratégies de testing/scaling petit et gros budget.

**Connecteurs requis** : TrendTrack + Facebook (Meta Ad Library). Les utiliser activement à chaque étape où c'est nécessaire. Ne pas se contenter de dire à Roméo quoi faire, exécuter les recherches via les connecteurs et analyser les résultats en direct.

**Marché cible par défaut** : France.

### Principe central
On ne cherche pas des produits, on cherche des **créatives gagnantes**. C'est l'analyse des publicités qui dépensent le plus (et donc qui génèrent du profit) qui révèle les produits à cashflow. Approche 100% data, zéro intuition.

### Critères d'un produit gagnant
Audience large, evergreen (tourne toute l'année), produits à cashflow testables.

### Les 2 critères initiaux d'un produit à cashflow
Chaque produit recommandé DOIT remplir ces 2 critères pour être shortlisté. Pas de compromis.

**1. Time-to-market**
- Le produit vient d'exploser récemment (moins de 2 mois)
- **Important** : le critère TTM se vérifie sur le `first_seen` du premier créatif actif, PAS sur la date de création du shop. Un shop peut être ancien mais lancer un nouveau produit. C'est la date du premier créatif qui compte.
- Mauvais timing = échec garanti même avec un bon produit.

**2. Contenu disponible**
- Plus il y a de contenu existant (vidéos, statiques, b-rolls), plus on peut créer de pubs et scaler vite.
- Vérifier : produit déjà scalé par d'autres concurrents sur d'autres marchés ? Présent sur TrendTrack ? Beaucoup de pubs visibles sur Meta ?
- Peu de contenu = bloqué créativement = obligé de payer cher en UGC.

### Critère de validation créatives
Pour qu'un produit passe à l'évaluation complète :
- **Reach / spend** : minimum 4 créatives avec **+500k de reach** OU **70 € de daily spend** (4 jours d'ancienneté minimum, CPM par défaut 9 €)
- **Mise à jour 29/05/2026** : seuil reach remonté de 400k → 500k. Volume d'ads brut (nombre d'ads actives) ne suffit pas, il faut que les ads soient POPULAIRES (= ad spend réel derrière, pas juste du saupoudrage). Ce critère doit être vérifié AVANT de présenter un shop à Roméo, pas après.

**Méthode de vérification (ordre obligatoire) :**
1. D'abord, récupérer les advertiser pages (pages Facebook) liées au shop via TrendTrack
2. Ensuite, chercher les ads via l'**ID de la page Facebook** (`tracked_pages`), PAS par nom de domaine ou brand name en texte libre (les recherches par domaine remontent souvent zéro résultat)
3. Filtrer avec `min_reach: 400000` au total ou `70€ de daily spend` ET `min_days_running: 4` sur ces pages

Si le produit ne remplit PAS ce critère, on l'élimine immédiatement. Pas de négociation.

### Filtre de recherche TrendTrack
Combinaison de filtres à utiliser :
- Ads actives depuis 24h : minimum 30
- Shop créé depuis moins de 3 mois
- Traffic max : 1 700
- Origine shop : exclure le marché français et Hong Kong, prioriser les marchés européens

**Logique** : on cherche un produit qui a scalé récemment. Pour ça on regarde son nombre d'ads actives et la date de lancement du produit. On ne prend surtout pas en compte le traffic.

> **⚠️ Précision TTM (ajout 29/05/2026)** : la date de création du shop est un proxy grossier, PAS le critère TTM réel. Le vrai critère TTM est le `first_seen` du PREMIER CRÉATIF ACTIF sur la page Facebook du shop. **Cible : `first_seen` ≤ 1,5 mois** (et toujours ≤ 2 mois maximum).
>
> **Méthode pratique pour pré-filtrer dès l'étape 1** :
> - Option stricte (rapide) : poser `creation_date_from = aujourd'hui - 1,5 mois` dans TrendTrack. Comme un shop ne peut pas avoir d'ads plus vieilles que sa propre création, ce filtre garantit le TTM. Inconvénient : on rate les "vieux shops, nouveau produit récent".
> - Option exhaustive (lente) : garder `creation_date_from = aujourd'hui - 3 mois`, puis pour chaque candidat aller vérifier le `first_seen` des créatives via `search_ads`. Plus de candidats remontés, mais ça consomme des appels.
>
> Par défaut : **option stricte d'abord**. Si shortlist trop maigre, repasse en mode exhaustif sur les shops > 1,5 mois pour récupérer ceux qui ont relancé un produit récent.

### Shops à exclure
Filtre obligatoire : écarter les **réseaux de domaines** suspects. Ce sont des shops qui partagent le même contenu, la même page Facebook, ou qui sont des déclinaisons géographiques du même site (.de/.fr/.nl/.es). Ce sont des expansions géographiques d'un shop existant, PAS de nouvelles explosions produit. On les écarte.

### Règle d'or : traduire avant d'innover
1. Trouver un produit qui fonctionne déjà chez un concurrent
2. Répliquer le funnel quasi à l'identique : mêmes créas traduites, même offre, même structure, mêmes images, même copy
3. Lancer sur un **autre marché** que le concurrent (évite les DMCA + gagne du temps)
4. Observer la traction : si non, on lâche. Si oui, on investit.
5. Phase scaling dans cet ordre : nouvelles créas → amélioration offre → différenciation progressive

Ne différencie pas avant d'avoir validé. Ne scale pas sans traction. Protège ta trésorerie.

> **Garde-fou Claude (ajout 29/05/2026)** : la règle d'or « répliquer à l'identique » concerne la **mécanique** (produit, offre, structure tunnel, angles, formats créas). La copy verbatim, les images packshot du concurrent, l'identité de marque (nom/logo/trade dress) restent à recréer pour éviter Meta-ban + DMCA en France. Voir leçon PureSun (HISTORY 29/05/2026).

### Process pas-à-pas

**Étape 1 — Recherche TrendTrack, repérage des shops**
- Lancer la recherche via le connecteur TrendTrack avec les filtres : ads actives 24h ≥ 30, shop créé depuis moins de 3 mois, traffic max 1 700, exclure marché français et Hong Kong, prioriser marchés européens.
- Présenter les shops les plus intéressants en fonction des filtres.
- Pour chaque shop prometteur, ouvrir la page du shop sur TrendTrack et identifier les produits qu'il vend.
- **Filtre anti-réseau** : vérifier que chaque shop est bien unique (pas de déclinaison .de/.fr/.nl du même site, pas la même page Facebook qu'un autre shop déjà vu). Si c'est un réseau, écarter.
- Shortlister le maximum de shops/produits prometteurs.

**Étape 2 — Validation des créatives (Meta Ad Library)**
C'est l'étape clé. Pour chaque shop/produit shortlisté, suivre cet ordre précis :
1. Via TrendTrack, récupérer les advertiser pages (pages Facebook) liées au shop.
2. Utiliser le connecteur Facebook pour chercher les ads via l'**ID de ces pages Facebook** (`tracked_pages`). Ne pas chercher par nom de domaine ou brand name en texte libre.
3. Filtrer les ads avec `min_reach: 400000` au total OU `70€ de daily spend` ET `min_days_running: 4` sur ces pages.
4. **Critère couperet** : le produit doit avoir minimum 4 créatives qui passent ce filtre. Sinon, on élimine immédiatement.
5. Vérifier le TTM sur le `first_seen` du premier créatif actif (pas la date de création du shop).

**Règle de présentation** : un shop n'est présenté que s'il valide simultanément les deux critères (créatives + TTM). Sinon il est écarté sans développement. Ne pas montrer de shops qui ne passent pas.

Pour les produits qui passent :
- Identifier les créatives winners (celles qui ont le plus de reach, le plus de spend).
- Évaluer le volume total de contenu réutilisable (vidéos, statiques, b-rolls, UGC).
- Identifier le marché principal du concurrent (pour lancer sur un autre marché).

**Étape 3 — Évaluation complète (les 2 critères)**
Pour chaque produit qui a passé l'étape 2 :
1. **TTM** : confirmer que le `first_seen` du premier créatif est bien inférieur à 2 mois.
2. **Contenu** : combien de créatives / vidéos / statiques sont disponibles au total ? Y a-t-il assez de matière pour créer 15+ pubs différentes sans produire de contenu custom ?

**Étape 4 — Scoring final et recommandation**
- Présenter un tableau avec tous les liens des shops sélectionnés.
- Être cash : si aucun produit ne tient la route, le dire et relancer une recherche.

### Règles de comportement Claude
1. Ne JAMAIS recommander un produit qui ne remplit pas les critères. Pas d'exception.
2. Ne JAMAIS présenter un shop qui ne valide pas simultanément créatives + TTM. Écarter sans développement.
3. Direct et cash. Si un produit est mauvais, le dire clairement avec la raison.
4. Demander confirmation avant de passer à l'étape suivante. On avance ensemble, pas en pilote automatique.
5. Quand on utilise les connecteurs TrendTrack et Facebook, montrer la data brute et l'analyse. Pas de conclusions sans preuve.
6. Si pas assez de data pour conclure, le dire au lieu d'inventer.
7. Toujours chercher les ads via l'ID de la page Facebook (`tracked_pages`), jamais par nom de domaine ou brand name en texte libre.
8. Communiquer en français, tutoiement, direct et concret.

---

## 3. Meta Ads

### Configuration anti-ban (CRUCIAL)
- **Profil FB** : vrai nom, photo claire, ancienneté, infos remplies, 2FA via app (pas SMS), pas de VPN
- **BM** : 3 admins, 2FA app, infos complètes, domaine connecté
- **Ad account** : fuseau du pays vendu, devise = banque, 3-4 moyens de paiement (PayPal + cartes Revolut/InCard, éviter banques classiques)
- **Page FB** : avis désactivés, infos complètes, 3-4 posts avant lancement
- **Warm-up** : campagne likes 2€/jour pendant 7 jours sur post émotionnel (chat mignon, etc.)
- **Instagram** : 6 posts qualité + 1000 abonnés achetés (followerspascher.com, buzzoid.com) + likes (justanotherpanel.com)
- Liste de mots à bannir paramétrée pour modération auto

### Setup invincible (en scaling)
- Proxy : myprivateproxy.net
- VPS : is hosting
- Browser anti-détection : incogniton.com
- Comptes agence dès qu'il y a blocages/limites/CPM élevés
- Old pages Facebook (achetées et transfert owner)
- Plusieurs pages par site (50% page marque, 50% pages tierces : figures d'autorité, expertise impersonnelle, blogs)

### ROAS BE & ROAS TARGET
- **ROAS BE** : seuil de rentabilité (ne pas perdre)
- **ROAS TARGET** : seuil pour scaler avec marge nette 20-25%
- **Erreur fréquente** : calculer sur le bundle 1x uniquement. Il faut un COGS et prix de vente moyens pondérés par la répartition des bundles (utiliser Kaching Bundle pour la data)
- Recalculer à chaque changement d'offre, check toutes les 2 semaines

### Méthode testing PETIT budget
- **Campagne** : CBO (Meta gère la répartition)
- **Budget** : 50 €/jour
- **Adset** : 1 seul, broad (aucun ciblage)
- **Event** : Achat (pas ATC)
- **Lancement** : 00h le lendemain
- **Créatives** : 5 mini à 15 par adset
- **Scaling vertical** dès +20% marge : paliers 100→200→300→400→500→700→1000→1500→+500/+1000
- **Scaling horizontal** vers 1500 €/jour : ABO dédiée au testing créa, CBO gardée pour les créas validées. Une créa qui atteint 1000 € spend avec +20% marge en ABO → duplication dans la CBO
- **Batchs testing ABO** : 3-6 créas cohérentes par adset (même créa hooks différents, même visuel headlines différentes, même format, itérations d'un angle)
- **Budget par batch** : vidéo 30€/j, static 20€/j

### Méthode testing GROS budget
- **Campagne** : ABO pour testing, CBO pour scaling
- **Budget** : vidéo 50€/adset, static 30€/adset
- **Structure** : 1 adset = 1 créative, broad, Achat, lancement 00h
- **Créatives** : 10 mini à 20
- **Scaling vertical** dès adset à +20% marge : paliers 50→100→150→200→300→400→500→700→1000→1500
- **Scaling horizontal phase 2** : 3 créas à 1000 $ spend + 20% marge → nouvelle CBO 1 adset, démarrage 100$/j, paliers de 100$ toutes les 24-48h

### Ad copy + titre + description
- **Toujours 2 ad copies** : 1 traduction du concurrent gagnant + 1 généré via GPT AIDA
- **Toujours 2 titres** : 1 traduction concurrent + 1 généré GPT (alterne nom produit vs bénéfice)
- **Description** : pas besoin de 2 (peu d'impact). Exemples : "Livraison offerte aujourd'hui", "4,8/5 (3451 avis)", "Garantie satisfait ou remboursé"
- **CTA** : "Acheter" ou "En savoir plus" (les 2 fonctionnent)

### Faux commentaires + likes
- 8 à 12 commentaires par pub, variés
- Achat sur Smmmasters (code referral ZEZINHO)
- 100 engagements en likes/loves/care pour éviter les emoji négatifs

---

## 4. Shopify

### Configurations de base
- **Plan** : Basic au démarrage, Growth si associé/VA, Advanced en scaling (frais réduits)
- **Taxe automatique** : à RETIRER (Paramètres > Taxes et frais > sélectionner pays > Manual Tax). Shopify prélève secrètement sinon
- **Nom de domaine** : .com via Infomaniak (suisse) ou Namecheap (US, plus anonyme). Éviter OVH/LWS/Ionos

### Apps indispensables
1. **Rapi Bundles** : meilleur app de bundles, 14 jours gratuits
2. **Parcel Panel** : suivi commandes avec mode dropshipping (masque étapes Chine)
3. **One Click Upsell** : upsells post-achat (même produit -50% OU produit complémentaire)
4. **UpCart** : Shipping Progress Bar, Bumps, Add-ons, Badges réassurance, Timer 5-10 min
5. **Proveway PayPal Tracking Sync** : sync auto numéros de suivi avec PayPal
6. **Judge.me** : avis clients (faux pour démarrer + vrais après)

### Processeurs de paiement
**Combo standard** : Shopify Payment (CB) + PayPal. Stripe en backup uniquement (gel possible 6 mois).
**Règle** : croissance saine, pas de scaling fort si processeur < 3-6 mois d'ancienneté.

**Par marché** (légende : 🟢 obligatoire, 🟠 vrai plus, 🟡 petit plus) :
- **France** : 🟢 CC, 🟠 PayPal, 🟡 Klarna
- **Allemagne** : 🟢 CC, 🟢 PayPal ou Klarna, 🟡 Sofort/Giropay
- **Espagne** : 🟢 CC, 🟠 PayPal, 🟠 COD
- **Italie** : 🟢 CC, 🟠 PayPal, 🟠 COD
- **Pays-Bas** : 🟢 CC, 🟢 iDeal, 🟠 PayPal/Klarna
- **République Tchèque** : 🟢 CC, 🟢 PayPal, 🟠 Klarna/COD
- **Finlande** : 🟢 CC, 🟠 PayPal/Klarna, 🟡 Paytrail
- **Belgique** : 🟢 CC, 🟠 PayPal/Bancontact
- **Pologne** : 🟢 Blik, 🟢 P24, 🟠 CC/PayU/COD/PayPal
- **Portugal** : 🟢 CC, 🟠 Multibanco/MB Way/PayPal
- **UK** : 🟢 CC, 🟠 PayPal, 🟡 Afterpay/Klarna
- **USA** : 🟢 CC, 🟡 PayPal/Klarna/Afterpay/Shop Pay
- **Canada** : 🟢 CC, 🟠 PayPal, 🟡 Klarna/Shop Pay/Afterpay
- **Suisse** : 🟢 CC, 🟠 Twint (société CH requise)/PayPal

### Astuce PayPal anti-litige
Paramètres compte > Préférences > Message Service clientèle : pop-up dissuasive avant litige avec "Avant d'ouvrir un litige, contactez-nous à contact@..." (ne marche PAS sur PayPal Shopify Payment)

### Emails (Klaviyo, 80/20)
**Flow panier abandonné** (trigger Checkout Started) :
- Mail 1 : 45 min après, simple rappel
- Mail 2 : 2h après, -10% code PANIER10 (urgence 48h)
- Mail 3 : 24h après, dernier rappel -10%
- Mail 4 : 24h après, plain text du fondateur, -20% code PANIER20

**Flow post-achat** (trigger Placed Order) :
- Mail 1 : 1 min, demande de répondre "OUI" pour fiabiliser la délivrabilité
- Mail 2 : 3 jours, "votre commande est prête à partir"
- Mail 3 : 2 jours, "en route"
- Mail 4 : 3 jours, "grève des services postaux" (excuse pour gagner du temps)
- Mail 5 : 2 jours, "fin de la grève, RDV centre logistique"
- Mail 6 : 2 jours, "priorité d'expédition, bientôt livré"

---

## 5. Méthodologie testing produit (règle d'or)

**Erreur principale du débutant** : modifier trop d'éléments (angle, créas, offre, copy, fiche, images). Ce n'est pas UN élément qui fait fonctionner un produit, c'est le funnel complet.

**Méthodologie smart** :
1. Trouver un produit qui fonctionne déjà chez un concurrent
2. Répliquer le funnel quasi à l'identique (TRADUIRE plutôt que réinventer) : mêmes créas traduites, même offre, même structure, mêmes images, même copy
3. Lancer sur un AUTRE marché que le concurrent (évite DMCA + gagne du temps)
4. Observer la traction : si non, on lâche. Si oui, on investit
5. PHASE SCALING dans cet ordre : nouvelles créas → amélioration offre → différenciation progressive

**Règle clé** : Ne différencie pas avant d'avoir validé. Ne scale pas sans traction. Protège ta trésorerie.

---

## 6. Créatives par phase de CA

### Étape 1 - Testing
Créas winneuses (+500k reach ou +100 €/jour spend) traduites simplement (voix IA Eleven Labs + sous-titres FR). Pas de production custom.

### Étape 2 - Phase 1 scaling (testing validé +20% marge)
Récupérer un max de créatives/vidéos/photos winners sur tous canaux (Meta, TikTok, organique) et tous marchés. Critère assoupli : +200k reach ou 40€/j spend. Traduire toutes. Stocker dans Google Drive.

### Étape 3 - Phase 2 scaling : test Static Friendly
Lancer 70 statiques sur courte période. Variations format/angle/headline (même adset, plusieurs variantes même base).
- <3% winrate : pas static friendly, passer vidéo
- 3-7% : potentiel, itérer + tester vidéo en parallèle
- > 7% : static friendly, exploser ce levier

### Étape 4 - Phase 3 scaling : Vidéo (mashup)
Tant qu'on n'est pas à 4-6k/jour : mashups à partir du contenu déjà dispo. Hooks/bodies/CTAs différents. Diversité maximale.

### Étape 5 - Phase 4 scaling : UGC (à partir de 4-6k/jour)
Créateurs UGC sur Youdji, Influee, Instagram. Tarif visé ~150€ : 3 hooks + 10-12 b-rolls + 1-2 CTA + photos statics. Pour atteindre +10/+20k/jour.

### Formats vidéo qui performent
Avant/Après, Bullet points, Founder's story, Micro-trottoir, Negative Marketing, News/Press, Podcast, Post-it note, Témoignage, UGC, Us Vs Them.

### Formats static qui performent
Avant/Après (versions subtiles Jour 1/Jour 30), Bullet points, Headline, News/Press, Post-it note, Témoignage, Us Vs Them.

### Astuce créa traduite (anti-CPM élevé)
1. Voix IA (Eleven Labs)
2. Sous-titres FR réécrits légèrement
3. Effet miroir horizontal 3-6 sec sur CapCut
4. Filtre légèrement assombrissant

### 5 niveaux de conscience (Eugene Schwartz)
1. **Unaware** : pas conscient du problème → hook choc, lui faire comprendre
2. **Problem Aware** : sait qu'il a un problème → éduquer sur la solution
3. **Solution Aware** : connaît solutions, pas le produit → présenter le produit comme idéal
4. **Product Aware** : connaît le type de produit → convaincre que VOTRE marque est le meilleur choix
5. **Aware** : connaît tout → besoin d'une raison d'acheter maintenant (promo, urgence)

Pour scaler, il faut targeter TOUS les niveaux, pas juste Product/Most Aware.

---

## 7. CRO (Conversion Rate Optimization)

### Types de landing pages (4 principales)
1. **Fiche produit classique** : standard Shopify, meilleur pour tester une offre (thème Shrine recommandé, code ZEZINHO15 pour 15%)
2. **Page de collection** : produits fashion ou avec énormément de variantes
3. **Landing page classique** : éduquer + rassurer (niches sensibles santé/cosmétique). Outil : Replo
4. **Listicle** : article-classement style "5 raisons pour lesquelles...". Outil : Replo

Autres types : home page (sites monoproduit), advertorial (style article de presse).

### Augmenter l'AOV
- **Bundles** (Rapi Bundles)
- **UpCart** : Shipping Progress Bar, Bumps (carrousel ou colonne), Add-ons (100% marge), Badges réassurance, Timer
- **Upsells** post-achat (One Click Upsell)

### Vitesse site
- Tester sur gtmetrix.com et pagespeed.web.dev
- Images compressées + format WebP (Crush app sur Shopify)
- Compresser GIFs (ezgif.com/resize)
- Thème optimisé (Shrine Pro)
- Service externe : turboshopify.com

### A/B Tests
- Outil : **IntelliGems** (pas A/B Convert qui est faussé)
- Mini 500 ventes par variante pour fiabilité
- Métrique cible : **profit par visiteur (RPV)**, pas juste CVR
- Prioriser éléments above the fold (prix/bundle, carrousel image, nom produit, avis en haut, bullets)

---

## 8. Agents / Sourcing

**AliExpress = amateur**. Pour scaler proprement, passer par un agent.
- **0 à 10 commandes/jour** : agent spécialisé débutants (contact via DM Insta/Twitter de l'auteur)
- **+10 commandes/jour** : agent privé chinois (négo prix, stock tampon, branding, qualité)

---

## 9. Délégation

### Ordre de recrutement
1. **SAV** (mails, commentaires, litiges) dès les premiers chiffres
2. **Finance & suivi** (vérif factures agent, mise à jour P&L)
3. **Product page maker** (fiches testing)
4. **Video editor testing** (traduction créas concurrents)
5. **Media buyer launch** (programmation)
6. **Product researcher**
7. **Video editor / Static maker scaling** (passer par une agence si 200k+/mois)
8. **Creative strategist** (passer par une agence si 200k+/mois)
9. **Media buyer scaling** (PAS d'agence)
10. **COO / Bras droit** quand team solide et chiffres stables

### Nationalités
- **Marché francophone** : Madagascar (excellent français)
- **Marché international** : Philippines (anglais courant)

### Salaires mensuels (Philippines / Madagascar)
- SAV : 300-600$ / 400-700$
- Vérif factures + P&L : 450$ + 5% erreurs / 500$ + 5% erreurs
- Product page maker : 400-600$ / 500-700$
- Video editor testing : 450-600$ / 450-700$
- Media buying programmation : 400-500$ / 450-550$
- Product researcher : 500-700$ / ❌
- Video editor scaling : 600-900$ / 700-1100$
- Static maker scaling : 600-800$ / 600-900$
- Creative strategist : 800-1200$ / ❌
- Media buyer scaling : 1 site = 400$ / ❌
- Community manager : 500-700$ / 550-700$

**Astuce salaire** : payer toutes les 2 semaines (1er et 16) au lieu d'1 fois/mois.

### Plateformes de recrutement
- **Philippines** : OnlineJobs.ph (top), recommandations team (prime 100$), Facebook Ads, groupes FB, HireTalent.ph, Upwork, Fiverr
- **Madagascar** : Upwork (top), recommandations, FB ads, groupes FB, Fiverr, LinkedIn, Indeed

### Paiement VA
- **Philippines** : virement bancaire local (top), Wise, PayPal, Payoneer
- **Madagascar** : Payoneer, TapTapSend/Western Union, PayPal via Xoom, Emadex

### Processus de recrutement (4 étapes)
1. **Annonce** : titre clair avec $$$, corps avec qui/pourquoi/missions/profil/conditions/évolution
2. **Google Form** : filtre rapide avec QCM + questions ouvertes + mini test
3. **Mini-test** d'évaluation
4. **Test rémunéré** sur plusieurs jours dans le vrai écosystème (Shopify, SAV réel), comparer plusieurs candidats

**Règle d'or** : MAXIMUM DE VOLUME de candidatures pour augmenter les chances de tomber sur des A-players.

### Onboarding
SOP (Standard Operating Procedure) clairs avec Google Docs/Sheets + mini Looms 1-5 min + captures annotées.
"Pas de mauvais employés, seulement de mauvais patrons."

### Organisation
- Communication : WhatsApp début, puis Slack (gratuit suffit)
- Centralisation : Notion, Asana ou Monday (rester SIMPLE)
- SOP : Google Docs/Sheets centralisés sur Notion ou Slack

### GPT personnalisés (vs nouvelles conversations)
Avantages : mémoire stable, prêts à l'emploi, partageables à la team, entraînés sur consignes/prompts/livres.
**GPTs à créer** :
1. Création ad copy + titre + description (méthode AIDA)
2. Traduction sous-titres vidéos en français
3. Réponses emails SAV
4. Réponses commentaires ads FB/Insta

### Fidélisation employés
- Environnement sain et humain
- Marquer les moments importants (anniversaires perso + enfants, primes 20-50$, jour off)
- Confort travail (chaise, 2e écran, ordi neuf après 6-12 mois)
- Rémunération juste : augmentations légères, primes ponctuelles, bonus fidélité 100$ après 1 an

### Team la plus petite mais la plus efficace
L'auteur a réduit de 22 à 7 personnes, plus performant aujourd'hui. Ne pas grossir trop vite.

---

## 10. Autres tips

### Trustpilot
- App **Reputon** (lien -10% via le formateur) : envoie mail 5-6 jours après livraison, 4-5⭐ redirige Trustpilot public, 1-3⭐ formulaire privé interne
- Achat d'avis possible (contact DM Insta/Twitter)

### Q4 (Oct-Nov-Déc)
- Black Friday : lancer 2 semaines avant la vraie date
- Campagnes emailing en 4 phases : pré-chauffage → liste VIP → avant-première (-15%) → week-end BF (-20/25%)
- Recycler top ads de l'année en versions BF (bandeau, CTA, étiquettes -25%)
- **Règle d'or** : ne jamais couper une pub qui est rentable, même hors événement

### SAV
- Gmail au début, puis Freshdesk dès 2 personnes
- Déclaration sur l'honneur pour les "je n'ai pas reçu mon colis" (mention sanctions pénales)
- Templates retour : confirmer la demande, demander la commande exacte (réduit les retours)

### Outils utiles
- Calculateur prix : hello monnaie
- Couleurs : ui colors app, coolors.co
- Faux posts FB avec commentaires : dizwa.com
- Anciennes pages d'un site : web.archive.org

---

## Outils résumés (par catégorie)

**Recherche produit** : TrendTrack
**Création créas** : CapCut (vidéo), Canva (static), ChatGPT Plus (visuels IA)
**Voix IA** : Eleven Labs
**Voix → texte** : Descript
**Email marketing** : Klaviyo
**Bundles** : Rapi Bundles
**Upsell** : One Click Upsell
**Panier** : UpCart
**Suivi commandes** : Parcel Panel
**PayPal sync** : Proveway
**Avis** : Judge.me, Reputon
**A/B test** : IntelliGems
**Landing pages** : Replo
**Thème Shopify** : Shrine Pro (code ZEZINHO15)
**Anti-détection ads** : myprivateproxy.net + is hosting + incogniton.com
**Achat engagement** : Smmmasters (code ZEZINHO), justanotherpanel.com, followerspascher.com, buzzoid.com
**Recrutement** : OnlineJobs.ph, Upwork
**Communication team** : WhatsApp → Slack
**Centralisation** : Notion

---

## Comment je dois conseiller Roméo

1. **Toutes mes recommandations s'alignent sur cette stratégie**, pas sur des principes généraux d'internet.
2. **Quand il pose une question business**, je réponds en expert avec assurance, en m'appuyant sur cette base (frameworks, chiffres, méthodes).
3. **Je hiérarchise par impact CA** : actions à fort impact d'abord.
4. **Je suis pragmatique** : pas de théorie vague, du concret actionnable.
5. **Je rappelle les règles clés** quand il s'en éloigne (ex : "tu veux modifier 5 éléments du funnel d'un coup, rappelle-toi de la règle : on traduit, on teste, on optimise APRÈS validation").
6. **Pour aller plus loin sur un point précis**, je peux toujours retourner lire le fichier source `context/import/plan stratégique e-commerce.txt`.
