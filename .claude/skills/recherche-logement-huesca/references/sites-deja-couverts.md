# Sites déjà couverts (à ne jamais re-chercher)

Cette liste est mise à jour par Claude après chaque session de recherche. Avant de lancer une nouvelle recherche, lire cette liste et choisir des sites/agences absents d'ici.

## Portails de listing déjà passés au crible

- idealista.com (bloque WebFetch en 403, mais déjà sondé via WebSearch — ne pas retenter)
- fotocasa.es
- enalquiler.com
- gallegomartinez.com (agence Gállego Martínez)
- milanuncios.com (bloque WebFetch par captcha — ne pas retenter)
- yaencontre.com

## Agences/annonceurs déjà identifiés et notés (avis déjà collectés)

- Gállego Martínez Inmobiliaria (C/ Cavia, 8) — ProvenExpert 3,70/5 (299 avis), Directoriocom 4,7/5 (29 avis)
- Fincas Osca (Calle Zaragoza, 9) — RealAdvisor 4,5/5 (161 avis)
- Tecnocasa Estudio Palacio de los Reyes SL (Calle Ramón y Cajal, 28) — avis positifs épars, pas de profil Trustpilot
- Su Vivienda Huesca (Calle Fatás, agence dirigée par Conchita Seral et Pilar Grasa) — ProvenExpert 3,80/5 "Très bien" (20 avis) — avis polarisés : positif (professionnalisme, rapidité de gestion), négatif (logements rendus sans nettoyage ni état des lieux, litiges sur la caution pour des dégâts préexistants). Notée le 25/06/2026.
- Aragón Fincas (Calle Coso Alto, 62) — Google 3,3/5 (103 avis) — positif (ventes rapides, accompagnement personnalisé, équipe Sara/Sergio citée nommément), négatif (gestion des cautions contestée, service jugé quasi inexistant par des locataires de longue date en cas de problème). Notée le 25/06/2026.
- Fincas Alto Aragón (C/ Cavia, 8, tél. 974 238 682) — agence identifiée (à ne pas confondre avec Gállego Martínez, même adresse) ; aucune note d'avis trouvée le 25/06/2026 malgré plusieurs requêtes.

## Date de dernière mise à jour de cette liste

23/06/2026 (création initiale, 5 premiers logements trouvés)

**23/06/2026 (2e passage, même jour) — INCIDENT RÉSEAU : aucun nouveau logement ajouté à Notion.**
La session a tourné avec WebFetch et le script `geocode_distance.py` bloqués par la politique réseau (403 systématique côté proxy, y compris sur des sites neutres comme Wikipedia et sur l'API de géocodage Nominatim — confirmé via `/__agentproxy/status`, ce n'est pas un blocage site par site). Seul WebSearch fonctionnait. Conséquence : impossible de vérifier précisément adresse exacte / prix exact / annonceur réel / distance à pied pour les pistes ci-dessous → aucune n'a été poussée dans Notion plutôt que de forcer des fiches non fiables. **À reprendre en priorité dès que WebFetch fonctionne à nouveau**, avant d'explorer d'autres sites.

### Pistes entamées via WebSearch seulement, non vérifiées (WebFetch bloqué ce jour-là)

- **Rentola.es** (particuliers) — Paseo Gregoria Ciprés, 22003 Huesca : 90 m², 2 chambres, 420 €/mois annoncé. Annonceur particulier. Adresse exacte de l'immeuble et distance à pied à confirmer.
- **Nuroa.es** — appartement meublé 74 m², 2 chambres, 550 €/mois, construit 2005, chauffage individuel gaz, ascenseur, cave, terrasse fermée, à ~100 m de la gare de bus (secteur Plaza Navarra / Parque Miguel Servet). Adresse précise non divulguée par l'annonce (visible seulement après contact) — page catégorie : https://www.nuroa.es/alquiler/huesca-piso-terraza
- **Habitaclia.com** — plusieurs appartements meublés sur Coso Bajo, à côté des Porches de Galicia (hyper-centre, immeuble réhabilité, ascenseur) ; prix non trouvés via WebSearch. Aussi : un meublé 4 chambres près du Parque Miguel Servet (immeuble avec ascenseur), prix non trouvé.
- **Su Vivienda Huesca** (nouvelle agence identifiée, Calle Fatás 6, 22002 Huesca, tél. 974 353 641 / 648 581 170, site https://suviviendahuesca.com/, profil ProvenExpert existant) — site bloque WebFetch direct ; avis "mitigés selon les cas" d'après synthèse Google, note exacte ProvenExpert non récupérée. Annonces logement (hors locaux commerciaux) non encore identifiées précisément.
- **"De Piso en Piso" / PisosHuesca** (Facebook : https://www.facebook.com/PisosHuesca/) — page spécialisée logement étudiant à Huesca repérée, contenu non exploré en détail.
- Indomio.es, pisos.com, tucasa.com, alquilarhabitacion.es, flatio.com, spotahome.com, housingtarget.com — sondés en surface via WebSearch, bloquent WebFetch direct (403), rien de assez précis trouvé pour une fiche.

## Pistes de nouveaux sites à explorer (non encore tentés)

- badi.es (colocation, utile si on élargit à des chambres individuelles — pas encore creusé en détail)
- Facebook Marketplace / groupes Huesca identifiés mais pas explorés en détail (accès manuel requis, pas d'API) :
  - "COMPARTIR PISO EN HUESCA / ALQUILER Y VENTA" — facebook.com/groups/1110399279051272
  - "Alquiler Huesca" — facebook.com/groups/1597576086921260
  - "Pisos en Venta y Alquiler, Zaragoza y Huesca" — facebook.com/groups/1179868945760409
- Fincas Alto Aragón, Aragón Fincas, Su Vivienda Huesca : agences désormais identifiées et notées (voir section avis ci-dessus, mise à jour 25/06/2026). Leurs annonces individuelles ne sont sondées que via WebSearch à ce stade (voir session du 25/06 plus bas) — pas encore explorées avec WebFetch, donc à ne pas classer "déjà couvertes".
- pisos.com, habitaclia.com, rentola.es, badi.com, indomio.es, tucasa.com, alquilarhabitacion.es, flatio.com, housingtarget.com : sondés en surface via WebSearch uniquement le 23/06 (WebFetch bloqué en environnement routine cloud, 403 systématique confirmé via `/__agentproxy/status` — pas un blocage spécifique au site). À retenter en session interactive (WebFetch fonctionne normalement hors routine) avant de les classer définitivement "déjà couverts".

## Sites sondés en environnement restreint (WebFetch bloqué) — 23/06/2026

- pisos.com, habitaclia.com, rentola.es, indomio.es, tucasa.com, alquilarhabitacion.es, flatio.com, housingtarget.com : WebFetch 403 dans le sandbox de la routine cloud, sondés via WebSearch seulement.
- spotahome.com : aucune annonce à Huesca ville (seulement Jaca, hors zone) — celui-ci est vraiment vide, pas besoin de retenter.
- badi.com : sondé pour la colocation, résultat non concluant via WebSearch seul.

## Piste trouvée le 23/06 (non ajoutée à Notion, distance non vérifiable à l'époque)

- **Calle Valentín Gardeta, n° 30, 2ºA (Huesca)** — agence **Fincas Montearagón** (nouvelle agence, Trustlocal 7,8/10, ~8/10 sur 23 avis, ⚠️ un client signale des annonces fantômes déjà louées) — 40 m², meublé, 2 chambres, salon-cuisine, chauffage gaz individuel, terrasse couverte — 360€/mois (180€/pers.). Distance vérifiée depuis en session interactive : 834 m / ~14,4 min à pied de Plaza de la Constitución → respecte le critère ≤15 min.

## Session du 25/06/2026 — double blocage outils, rien poussé sur Notion, pistes non vérifiées seulement

**INCIDENT PLUS GRAVE QUE LE 23/06 : aucun outil Notion fetch/update disponible.** Contrairement à l'incident du 23/06 (où seul le réseau était bloqué mais Notion restait accessible), cette session n'avait accès qu'à un connecteur Notion limité aux requêtes de base de données (`notion-query-data-sources`, `notion-query-database-view`, `notion-query-meeting-notes`, `notion-get-async-task`) — **aucun `notion-fetch`, `notion-search`, `notion-update-page` ou `notion-create-pages`**, vérifié par plusieurs requêtes ToolSearch ciblées et par `ListMcpResourcesTool`. Donc impossible de lire OU d'écrire la page "Logement Huesca" cette fois-ci, alors même que c'est le repli prévu par le skill quand le commit git est interdit. **Les deux canaux de persistance (Notion et commit git multi-fichiers) étaient donc indisponibles simultanément** — seul ce fichier reste éditable/committable.

En complément, le blocage réseau habituel était aussi présent : WebFetch en 403 sur un domaine neutre (Wikipedia) et `geocode_distance.py` en `Tunnel connection failed: 403 Forbidden` — confirmé via `/__agentproxy/status` (proxy sain, blocage de politique réseau et non une panne). Seul WebSearch fonctionnait.

**Problème de fiabilité supplémentaire constaté cette session :** les résumés WebSearch ont donné des chiffres incohérents pour une même adresse selon la formulation de la requête (ex. Padre Huesca 7 annoncé à 750€ puis à 680€ pour apparemment le même lot ; ambiguïté non résolue entre "location de chambre" et "location d'appartement entier" pour Plaza San Antonio 7). Plutôt que de pousser ces chiffres non fiables comme logements "vérifiés" dans Notion ou dans la liste anti-doublon, ils sont consignés ci-dessous comme **pistes brutes non vérifiées**, à confirmer impérativement depuis l'annonce source (WebFetch) avant tout ajout officiel.

### Pistes brutes à vérifier en priorité dès que WebFetch + Notion fonctionnent à nouveau

- **Calle de la Merced, 7 (Centro-San Lorenzo)** — agence **Su Vivienda Huesca** — 87 m², 2 chambres, 1 salle de bain, 850 €/mois (425 €/pers., dans le budget) — ⚠️ ne pas confondre avec le programme de logement social distinct "Suelo y Vivienda de Aragón" situé Calle La Merced n° 2-4 (adresse et nature différentes, sans rapport). Distance à pied non trouvée via WebSearch — à géocoder en priorité.
- **Padre Huesca, 7 (Centro-San Lorenzo)** — 72 m², 2 chambres, 2 salles de bain — prix incohérent entre deux recherches (750 € puis 680 €/mois, soit 340-375 €/pers., dans le budget dans les deux cas) — bâtiment situé à 346 m / ~5 min à pied de l'Estación Intermodal (donc centre-ville), mais distance précise à la Plaza de la Constitución non calculée. Annonceur réel non identifié (vu sur agrégateurs enalquiler/idealista/milanuncios). ⚠️ Existe aussi un duplex distinct au 5e étage du même immeuble (93 m² construits/80 m² utiles) à ne pas confondre.
- **Plaza San Antonio, 7, 6e étage** — deux annonces tucasa.com très proches en prix (63 m²/3 chambres/1 sdb/360 €, et 82 m²/2 chambres/1 sdb/365 €) — ⚠️ **prix très suspect** (moitié du marché observé ailleurs pour une surface comparable) : pourrait être une annonce de chambre individuelle et non d'appartement entier, formulation ambiguë côté WebSearch, à clarifier impérativement sur la fiche source avant tout ajout. Emplacement très central : à ~350 m / 5 min à pied de la gare intermodale. Annonceur (particulier ou agence) non identifié.
- **Fincas Alto Aragón, réf. 502-2869** — 700 €/mois confirmé sur plusieurs requêtes, mais aucune autre caractéristique trouvée (surface, pièces, adresse précise) malgré relances — fiche trop incomplète pour être retenue en l'état.
- **Aragón Fincas** — deux biens repérés en première moitié de session (un local "adapté à une académie", 75 m²/450 €, et un bien Avenida Monreal de 163 m²) — nature résidentielle et adéquation aux critères non confirmées (le premier ressemble à un local commercial, le second dépasse probablement le budget pour une simple colocation) — **non retenus**, à écarter sauf vérification contraire.

Aucune de ces pistes n'a été ajoutée à Notion (techniquement impossible cette session) ni comptée comme "nouveau logement validé" : le seuil minimum de 5 logements du skill n'a donc pas été atteint avec un niveau de confiance suffisant, conformément au principe du skill de ne pas forcer un résultat médiocre.

### Sites sondés en surface via WebSearch seulement le 25/06 (à ne pas classer "déjà couverts")

tucasa.com (au-delà du sondage du 23/06), fincasaltoaragon.com, aragonfincas.com, suviviendahuesca.com, enalquiler.com (re-sondé), idealista.com (re-sondé en surface) — tous bloquent ou n'ont pas été testés en WebFetch direct cette session (réseau bloqué de façon générale, pas spécifique à ces sites).

**Règle :** après chaque recherche, ajouter les sites utilisés à la section "déjà couverts" ci-dessus et retirer les agences nouvellement notées de la liste "pistes à explorer". Ne déplacer un site listé ci-dessus dans "déjà couverts" qu'une fois qu'il a été *réellement* exploré avec WebFetch (annonces individuelles consultées), pas seulement via des snippets WebSearch. Tenir aussi à jour la section équivalente sur la page Notion (voir `references/format-notion.md`), canal de persistance fiable même si une exécution de routine n'a pas le droit de commit ce jour-là — **sauf le 25/06/2026, où ce canal était lui aussi indisponible (voir incident ci-dessus) : vérifier au début de chaque future session que les outils `notion-fetch`/`notion-update-page` sont bien chargés avant de présumer ce canal disponible.**
