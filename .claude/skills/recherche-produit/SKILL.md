---
name: recherche-produit
description: Recherche produit dropshipping pour Zooryn via TrendTrack, selon la méthode V3 de Roméo (data avant produit, pente de reach, filtre shop frais, concurrence FR alignée formation). À déclencher quand Roméo dit "recherche produit", "trouve-moi un produit", "cherche un winner", "lance une recherche produit", "on alimente le pipeline", ou toute demande de nouveau produit à tester.
---

# Recherche produit

## Objectif

Sortir des candidats produits à tester sous la marque Zooryn (test 50 €/jour), en filtrant d'abord sur la **preuve de scale visible et analysable**, puis en présentant une short-list honnête (pour/contre, défauts inclus). C'est Roméo qui tranche, jamais Claude.

## Principe prioritaire : LA DATA AVANT LE PRODUIT

Ordre strict, non négociable :
1. **Preuve de scale visible ET analysable** (pente de pubs qui monte, reach réel, data EU révélable sur TrendTrack). Si "no data" / créas nulles / shop à 1 pub → mort d'office, on ne présente même pas, peu importe la qualité de l'idée.
2. **Le fit produit est secondaire.** L'ombrelle Zooryn (voyage / extérieur / avion / nature / outdoor / nomade) est si large que presque tout y rentre par l'angle.
3. **C'est Roméo qui juge le produit** une fois la data donnée. Le job de Claude = tenir la porte sur la data, pas trier sur le goût produit.

## Arbitrages de fond (V3, actés le 15/06/2026)

1. **Timing = "entre les deux".** Produit qui scale depuis ~2-4 semaines à l'étranger : début de preuve réelle, pas encore au pic, pas encore copié partout en FR. Ni le tout-début-sans-preuve, ni le déjà-au-pic (~2 mois de diffusion = trop tard pour copier).
2. **Preuve ads = une PENTE, pas un seuil.** 2-3 créas dont le reach/dépense grimpe sur 2-4 semaines (`reachDelta30d` positif fort), actives et fraîches (first_seen ≤ ~1,5 mois). Pas de couperet absolu type "4 créas ≥400k" (abandonné).
3. **Présence FR ≠ kill.** Règle d'or de la formation "traduire avant d'innover" : on copie un winner dont le marché principal n'est PAS la France et on lance en FR. La saturation n'est jamais un motif de kill. Seul un funnel exact déjà DOMINANT en FR appelle prudence/différenciation, pas une fuite automatique.
4. **Aucun ancrage thématique** hors exclusions dures. Le branding Zooryn se tranche après un winner.
5. **Tester dès "assez bon".** Un candidat 7/10 qui passe les critères durs part en test. Le test à 50 € EST le filtre final, il tranche ce que 2h d'analyse ne trancheront jamais.

**Cadence réaliste** : sous ces standards, aucune niche ne fournit un winner tous les 3-4 jours. Objectif = ~1-2 produits testables/semaine, on ne force jamais un candidat bancal pour remplir.

## Exclusions dures (priment sur tout)

- **Produits à risque (précisé 12/07/2026)** : ingéré/complément alimentaire = exclusion totale, sans exception. Pour le topique/peau, la distinction est **le problème adressé, pas le fait d'être appliqué sur la peau** : un produit décoratif/cosmétique sans promesse de résoudre un problème physique (rouge à lèvres, maquillage) est OK. Un produit qui prétend RÉSOUDRE un vrai problème physique/de santé via application cutanée (sérum anti-rides, sérum pousse des cheveux, autobronzant) = même niveau de risque qu'un complément alimentaire → exclusion dure, ne pas présenter (perte de temps sur un candidat déjà mort d'office).
- **Saisonnier** : le produit doit tourner à l'année.
- **Irréel / non copiable** : il faut un vrai shop, de vraies créas, un vrai tunnel à recopier.
- **Réseaux de domaines** : mêmes créas/page FB déclinées en .de/.fr/.nl/.es = expansion géo d'un shop existant, pas une explosion produit → écarter.
- **Déjà rejeté** : ne JAMAIS reproposer un produit de `references/liste-rejetes.md`. Consulter cette liste avant toute présentation.

## Garde-fou frais de port (acté 01/07/2026)

Le port tue la marge sur le lourd/volumineux et les produits à batterie lithium (transport restreint). Dès la recherche : pour tout produit **lourd/encombrant ou à batterie**, exiger que le winner le vende déjà à **≥45-50 €**. Vendu <30 € = le port explosera la marge → écarter ou signaler qu'il faudra repricer haut. On ne bannit pas l'électronique, on price correctement (objectif x3, marge nette 20-25 %).

## Exécution

### Étape 1 — Sourcer les candidats (marché de copie ≠ FR)

**Filtre catégorie ouvert depuis le 12/07/2026 : le pivot "niche maison" (cf. `context/CONTEXT.md`) rend la niche outdoor/voyage définitivement acquise (1re collection verrouillée, 4 produits déjà testés).** Elle ne fait plus l'objet de nouvelles recherches. L'objectif désormais est de trouver une **2e (puis 3e...) sous-niche candidate à devenir une collection à part entière** : ni trop pointue (un seul produit dedans, pas de matière pour une collection), ni trop large (un fourre-tout sans identité). Sourcer sur **n'importe quelle catégorie TrendTrack**, sauf exclusion dure ci-dessous.

**Exclusions de niche pour cette recherche de 2e collection** (en plus des exclusions dures produit) : **santé/bien-être** et **niches 100% féminines** (ex. rendu impossible du fait des exclusions dures de toute façon, mais à écarter dès le sourcing pour ne pas perdre de temps).

Méthode principale : **filtrer par CATÉGORIE, jamais par tri global** (le tri global noie tout sous la santé/beauté et le maison/jardin, qui dominent TrendTrack). Via `search_ads` (MCP TrendTrack) :
- `category_ids` : large éventail hors santé/féminin (liste des IDs dans `references/outils-trendtrack.md`)
- `min_active_ads` ≥ 40, `max_traffic` < 2000
- **`sort_by reachDelta7d`** (⚠️ PAS `reachDelta30d`), `max_ads_per_brand` 1, marché ≠ FR
- **`shop_created_after` = il y a ~5-6 SEMAINES max** (pas "< 3 mois" large)

**⚠️ Réglage critique du tri et de la fraîcheur (leçon 03/07/2026, corrige l'erreur de la 1re passe).** `sort_by reachDelta30d` + `shop_created_after` à 3 mois remonte des **accumulateurs anciens** : des shops qui scalent depuis des mois (cas RideLab, sorti en tête alors qu'il scale depuis mars = déjà trop vieux à copier, déjà vu par Roméo). Ces deux réglages trahissent la règle "timing entre les deux". Le bon couple = **`reachDelta7d` (ce qui décolle MAINTENANT) + shop créé il y a <6 semaines**. Ne jamais ressortir un produit qui scale depuis >6 semaines : c'est un fail garanti (Roméo l'a déjà vu, et/ou c'est déjà copié).

Moteurs d'appoint : `daily_radar` (produits/shops qui montent) et le filet nordique (`shop_creation_countries` SE/DK/NO/FI/DE/NL/AT + `max_products` bas). Les outils qui NE marchent PAS (find_similar_shops, keywords, find_winning_products, search_advertisers growth) sont documentés dans `references/outils-trendtrack.md` : ne pas perdre de crédits dessus.

**Une fois un produit identifié (candidat en validation, ou déjà en test)**, pour trouver un maximum de SES concurrents (plus de data, plus de créas à adapter en optimisation/scaling) : voir `references/trouver-concurrents.md` (3 méthodes formation : TrendTrack mots-clés multilingues, TrendTrack par niche/catégorie, Kalodata par catégorie, + liste d'outils alternatifs).

Sorties volumineuses → sauver en fichier et parser avec `node -e` ou PowerShell `ConvertFrom-Json` (pas de jq).

### Étape 2 — Filtre shop

- Shop créé **< 3 mois**.
- **Peu de produits** (un winner clair à copier, pas un catalogue flou).
- **Trafic réel < 1700 visiteurs/mois, vérifié À LA MAIN** (`monthlyVisits`). ⚠️ `visits:0` = donnée MANQUANTE, pas faible trafic. Si un candidat est excellent partout mais affiche 2-4k visites, le présenter quand même en signalant le dépassement : Roméo tranche, ne jamais tuer en silence.

### Étape 3 — Traçabilité Meta

- L'origine géo du shop (US, HK…) n'est PAS un motif d'exclusion.
- Ce qui compte : la data EU est-elle révélable (Reveal EU Spend) ? Oui → exploitable. "No EU Data" → inexploitable, on jette.
- ⚠️ Le NOMBRE de pubs actives ne prouve rien (cas IROND : 44 pubs, 5k reach). C'est la pente du reach qui parle.

### Étape 4 — Preuve ads = la pente + un plancher minimum (précisé 12/07/2026)

2-3 créas dont le reach/dépense GRIMPE **là, maintenant** (`reachDelta7d` positif fort), actives et fraîches. Croiser avec `daysRunning` et l'historique `advertising.history` du shop (`search_shops`) : la courbe de pubs actives doit **monter récemment** (ex : 4→9→25→43 sur les 6 dernières semaines), pas être un plateau installé depuis des mois. Un plateau ancien = trop tard.

**Plancher dur (repris de la méthode du tableau de recherche produit, cf. [[project_tableau_recherche_produit]]) : au moins 3 créas sur TrendTrack, chacune avec ≥500k de reach ET/OU ≥70€/jour de daily spend.** Plus il y en a, mieux c'est, mais 3 est le minimum en dessous duquel le candidat n'est pas présenté. Ce plancher se cumule avec le critère de pente ci-dessus, il ne le remplace pas.

### Étape 5 — Concurrence FR (mesurer le degré, pas fuir)

`advertising.topCountries` pour mesurer la présence FR du produit exact :
- Marché principal du concurrent ≠ FR = idéal.
- Présence FR légère / quelques vendeurs qui tâtonnent = on y va, on exécute mieux.
- Funnel exact déjà dominant en FR = prudence/différenciation, à signaler dans la présentation.

### Étape 6 — Présentation de la short-list

Format : pour/contre par candidat, **défauts inclus, sans survendre** (pas de "banger de l'année", les chiffres parlent). Pour chaque candidat : shop + lien, produit, prix du winner, data (pente reach, nb créas qui montent, fraîcheur), trafic, concurrence FR, défauts. Tout candidat "assez bon" qui passe les étapes 1→5 se présente, même imparfait.

Si rien ne passe les critères durs : le dire clairement. Un résultat nul honnête vaut mieux qu'un faux candidat forcé.

### Quand le puits est sec (constat récurrent, acté 16/06 et reconfirmé 03/07)

La niche outdoor/voyage EU-analysable ne fournit qu'une **poignée de winners frais à un instant T** (~1,5 page de résultats), et Roméo a déjà écumé les frais. Il est NORMAL qu'une passe ne sorte rien de neuf. Dans ce cas, ne pas s'acharner ni brûler des crédits : rendre le constat, et proposer une des sorties suivantes (Roméo tranche) :
- **Attendre 1-2 semaines** que le puits se recharge (souvent la meilleure option : pas d'urgence si un produit est déjà en test).
- **Élargir consciemment** l'ombrelle (une catégorie adjacente que Roméo désigne).
- Ne JAMAIS ressortir un déjà-vu/rejeté pour "remplir" (cf. `references/liste-rejetes.md`).

Signal de puits sec = les mêmes shops reviennent (matelas/clones, déjà-testés, stores fourre-tout), OU le tri sans catégorie est dominé par le santé/corps et le maison/jardin (exclusions).

### Après validation par Roméo

- **Sourcing (Ali/CJ/1688, marge, livraison FR) = Roméo s'en charge.** Claude fait la recherche market/ads, pas le sourcing.
- Rappeler la règle : **obtenir le COGS rendu du fournisseur AVANT de fixer le prix et de lancer** (leçon Luma).
- Ajouter les candidats validés/écartés à `references/liste-rejetes.md` (section pipeline ou rejetés) pour l'anti-doublon des prochaines sessions.

### Étape 7 — Tableau de recherche produit (Google Sheet, acté 12/07/2026)

Le tableau (`.claude/skills/recherche-produit/scripts/tableau.mjs`, Sheet "Products", même compte de service que le skill `budget`) est un **stockage + priorisation des candidats déjà validés**, pas un espace de brainstorming. Règle stricte : **Claude n'y écrit QUE quand Roméo dit explicitement "ajoute-le au tableau"**, jamais avant, jamais de sa propre initiative. Les étapes 1→6 ci-dessus (présentation short-list, tri de Roméo) restent inchangées et se passent AVANT le tableau, en dehors de lui.

Une fois l'ordre donné, remplir la ligne complète : nom, URL fiche produit (pas la home), pays (trafic majoritaire via TrendTrack, pas le siège social), niche, nombre d'ads (cap 15), Kalodata (lien si trouvé, sinon vide — Kalodata = outil d'analytics TikTok Shop, un lien = green flag de traction supplémentaire, pas un canal de vente Zooryn), COGS et prix (demandés à Roméo si absents, jamais mémorisés/approximés, prix converti en euros exact), puis pour chaque ad retenue (classées par vues décroissantes) : lien (priorité TrendTrack > Afterlib > Facebook Ads Library, le premier est pérenne les autres peuvent expirer), impressions/spend, date début, date fin ("now" si active).

**Le tableau n'engage à rien tester.** C'est un réservoir : on vise 15-20 candidats validés, on les classe (Priorité : Urgent/Important/Normal/Faible) selon nb d'ads, pays non saturé, multiplicateur prix/COGS, volume de vues, Time to Market (mois où les ads du concurrent sont concentrées), présence Kalodata. Le rythme de testing réel reste inchangé (séquentiel, 50 €/jour, ~1-2 produits/semaine, cf. modèle A). Des candidats bien classés peuvent ne jamais être testés (un winner trouvé avant, une donnée qui se dégrade) — normal, pas un échec du tableau.

## Posture (règles de conduite)

- Vérifier SOI-MÊME chaque critère (trafic réel, traçabilité EU, pente, nb produits, concurrence FR) avant de présenter.
- Ne JAMAIS inventer de métrique hors-fiche ni durcir un critère sans demander à Roméo.
- Ne jamais survendre, ne jamais killer avant présentation : Roméo décide.
