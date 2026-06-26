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
- Petites agences locales non encore identifiées (chercher "inmobiliaria Huesca" sur Google Maps/avis) : Fincas Alto Aragón, Aragón Fincas, Su Vivienda Huesca (Calle Fatás 6, tél. 974 353 641, avis Google "mitigés selon les cas")
- pisos.com, habitaclia.com, rentola.es, badi.com, indomio.es, tucasa.com, alquilarhabitacion.es, flatio.com, housingtarget.com : sondés en surface via WebSearch uniquement le 23/06 (WebFetch bloqué en environnement routine cloud, 403 systématique confirmé via `/__agentproxy/status` — pas un blocage spécifique au site). À retenter en session interactive (WebFetch fonctionne normalement hors routine) avant de les classer définitivement "déjà couverts".

## Sites sondés en environnement restreint (WebFetch bloqué) — 23/06/2026

- pisos.com, habitaclia.com, rentola.es, indomio.es, tucasa.com, alquilarhabitacion.es, flatio.com, housingtarget.com : WebFetch 403 dans le sandbox de la routine cloud, sondés via WebSearch seulement.
- spotahome.com : aucune annonce à Huesca ville (seulement Jaca, hors zone) — celui-ci est vraiment vide, pas besoin de retenter.
- badi.com : sondé pour la colocation, résultat non concluant via WebSearch seul.

## Piste trouvée le 23/06 (non ajoutée à Notion, distance non vérifiable à l'époque)

- **Calle Valentín Gardeta, n° 30, 2ºA (Huesca)** — agence **Fincas Montearagón** (nouvelle agence, Trustlocal 7,8/10, ~8/10 sur 23 avis, ⚠️ un client signale des annonces fantômes déjà louées) — 40 m², meublé, 2 chambres, salon-cuisine, chauffage gaz individuel, terrasse couverte — 360€/mois (180€/pers.). Distance vérifiée depuis en session interactive : 834 m / ~14,4 min à pied de Plaza de la Constitución → respecte le critère ≤15 min.

## 26/06/2026 — Routine cloud, Notion page tools indisponibles (blocage distinct du réseau)

**Constat important, différent de l'incident du 23/06 :** cette fois le réseau lui-même n'a pas été retesté inutilement (cf. règle de ne pas re-tenter), mais une vérification ciblée a confirmé via `WebFetch` sur un domaine neutre (wikipedia.org) un nouveau 403 côté proxy — donc le blocage réseau général documenté le 23/06 est toujours actif. **En plus de ça**, les outils Notion de page (`notion-fetch`, `notion-update-page`, `notion-search`, `notion-create-pages` listés dans le frontmatter du skill) se sont révélés **structurellement absents** de cette session : `ToolSearch` exhaustif (mots-clés larges, `select:` avec préfixes `mcp__claude_ai_Notion__` et `mcp__Notion__`) ne renvoie que 4 outils de requête de base de données Notion (`notion-query-data-sources`, `notion-query-database-view`, `notion-query-meeting-notes`, `notion-get-async-task`), jamais les outils de lecture/écriture de page. Donc impossible de lire OU d'écrire la page Notion "Logement Huesca" ce jour-là, indépendamment du réseau. **Tout le travail de cette session est donc consigné ci-dessous, à reporter manuellement sur Notion à la prochaine session où les outils de page sont disponibles** (cf. aussi le candidat Gardeta du 23/06 jamais poussé, toujours en attente).

### Sites explorés en profondeur via WebSearch (annonces individuelles identifiées, mais pas via WebFetch — donc gardés ici plutôt que déplacés en "déjà couverts", conformément à la règle ci-dessous)

- **Rentola.es** — exploré en profondeur (recherches ciblées par rue/prix). Plusieurs annonces de l'agence **Fincas Montearagón** identifiées avec adresse, m² et prix précis (voir candidats B et C ci-dessous). Beaucoup de petites annonces particulières aussi repérées sur Paseo Gregoria Ciprés (22003) mais zone jugée trop excentrée/incertaine pour la marche (voir "écartés" ci-dessous).
- **Nuroa.es** — exploré en profondeur. Annonce centrale identifiée (voir candidat E). Annonce Calle Loreto repérée (très centrale, Casco Antiguo) mais **prix introuvable via WebSearch** malgré 4 tentatives — à reprendre en session interactive (visite directe du site).
- **Habitaclia.com** — exploré. Annonces Parque Miguel Servet / Calle Vicente Campo confirmées, recoupées avec une annonce de chambre individuelle sur Idealista (voir candidat D).
- **Idealista.com (section "alquiler-habitacion", chambres)** — nouvelle sous-section explorée (le site général idealista.com était déjà "déjà couvert" pour les pisos entiers, mais pas pour les chambres en colocation) : a permis de trouver le prix exact du candidat D.
- **Fincas Alto Aragón** (C/ Cavia 8, 22005 Huesca, tél. 974 238 682) — agence explorée : une référence de location identifiée (502-2869, 700€/mois) mais **adresse/m²/chambres introuvables via WebSearch** malgré plusieurs tentatives → candidat non retenu cette fois, à recontacter directement (tél/mail) ou reprendre en session avec WebFetch.
- **Aragón Fincas** (Calle Coso Alto s/n) — agence explorée, avis collectés (voir ci-dessous), mais **aucune annonce de location précise trouvée** via WebSearch → pas encore un site "déjà couvert" à part entière, à retenter.
- **Su Vivienda Huesca** (Calle Fatás 6, tél. 974 353 641) — agence approfondie : avis ProvenExpert précisés (voir ci-dessous), mais les seules annonces trouvées via WebSearch sont des **locaux commerciaux** (pas des logements). Aucun appartement résidentiel en alquiler identifié cette fois.

### Nouveaux avis d'agences collectés

- **Fincas Alto Aragón** — Google My Business : 4,4/5 sur 22 avis (une autre source indique 4,2/5 sur 21 avis). Positif : professionnalisme, efficacité, accompagnement personnalisé selon budget/calendrier client. Aucun avis négatif significatif trouvé via WebSearch.
- **Aragón Fincas** — avis mitigés. Positif : accueil sympathique, traitement personnalisé (clients citent nommément "Sara et Sergio"), fidélité de certains clients sur plusieurs années. Négatif (à ne pas omettre) : plusieurs signalements de commissions non mentionnées au contrat, de frais de nettoyage facturés en fin de bail malgré logement rendu propre (difficulté à obtenir facture), et de manque de réactivité/responsabilité de l'agence en cas de problème. Pas de profil Trustpilot trouvé.
- **Su Vivienda Huesca** — ProvenExpert : 3,80/5 sur 20 avis ("très bien"). Pas de profil Trustpilot trouvé. Pas d'avis négatif détaillé trouvé via WebSearch (échantillon limité).

### Nouveaux candidats logement trouvés (non poussés sur Notion — outils de page indisponibles, voir constat ci-dessus)

**Rappel prioritaire : le candidat "Calle Valentín Gardeta n°30, 2ºA" trouvé le 23/06 (agence Fincas Montearagón, 360€/mois, distance vérifiée 834m/14,4 min) n'a toujours pas été poussé sur Notion — à pousser en priorité avec les 4 candidats ci-dessous dès que les outils de page sont disponibles.**

#### Candidat — Calle Zarandia, 22 (réf. agence "C/ Castilla nº3"), Huesca
- Source : Rentola.es — annonceur réel : **Fincas Montearagón**
- Prix : 300€/mois (150€/personne) — 50 m²
- Distance à pied : ⚠️ non calculée précisément (WebFetch/geocodage bloqués). Estimation via repères : rue du Casco Antiguo, barrio La Catedral, située "entre San Pedro, la Cathédrale et les vestiges du Círculo Católico" — donc probablement à moins de 10 min de Plaza de la Constitución. **⚠️ distance estimée via recherche, à reconfirmer.**
- Caractéristiques : 50 m², colocation à 2 (appartement entier, pas une chambre)
- Mobilier/équipements/charges/conditions/confort/linge de lit : ⚠️ non précisé avec certitude — les résultats WebSearch agrégeaient plusieurs annonces Montearagón ensemble, donc les détails mobilier ne sont pas attribués de façon fiable à cette adresse précise. Seul point recoupé plusieurs fois : meublé.
- Avis agence : Fincas Montearagón — Trustlocal 7,8/10 (~8/10 sur 23 avis), déjà noté le 23/06. ⚠️ Un client signale des annonces fantômes déjà louées.

#### Candidat — Calle San Orencio, nº8, Huesca
- Source : Rentola.es — annonceur réel : **Fincas Montearagón**
- Prix : 500€/mois (250€/personne) — 76 m²
- Distance à pied : ⚠️ non calculée précisément. Rue du barrio San Lorenzo, code postal **22001** (même zone postale que Plaza de la Constitución s/n), à ≈152 m de la Basílica de San Lorenzo. Très probablement dans le centre historique, proche du campus. **⚠️ distance estimée via recherche, à reconfirmer.**
- Caractéristiques : 76 m², colocation à 2 (appartement entier)
- Mobilier/équipements/charges/conditions/confort/linge de lit : ⚠️ non précisé (annonce non consultée en détail, WebFetch bloqué)
- Avis agence : Fincas Montearagón (même agence, avis déjà collectés ci-dessus/le 23/06)

#### Candidat — Vicente Campo, 4 (barrio San José), Huesca — ⚠️ colocation avec inconnus, pas un appartement dédié
- Source : Idealista.com (section chambres/colocation) — annonceur : ⚠️ non identifié précisément (particulier ou agence non précisé dans les résultats WebSearch)
- Prix : 290€/mois **par chambre** → si Roméo et son colocataire prennent chacun une chambre : 580€/mois pour les deux, bien sous le budget de 1000€/mois total
- **⚠️ Particularité importante : il s'agit d'un appartement de 5 chambres au total. En louant 2 chambres, Roméo et son colocataire partageraient le logement avec 3 autres colocataires inconnus (étudiants), contrairement aux autres candidats qui sont des appartements entiers réservés aux deux.**
- Distance à pied : ⚠️ non calculée précisément. Proche du Parque Miguel Servet, de la Plaza de Navarra et de l'Estación Intermodal — ces repères sont décrits ailleurs comme à 10-15 min du centre historique/cathédrale, donc **proche de la limite des 15 minutes, à reconfirmer précisément avant de s'engager.**
- Caractéristiques : chambre dans appartement de 5 chambres, colocation
- Conditions de location : disponible uniquement de septembre à juin (année académique) — correspond bien au critère "pas de paiement juillet/août"
- Équipements : toutes charges comprises sauf le chauffage (mentionné dans l'annonce). Reste (machine à laver, type de chauffage, isolation, linge de lit) : ⚠️ non précisé.
- Avis agence : non applicable (pas d'agence identifiée clairement)

#### Candidat — Appartement à côté de l'Hôtel Abba, centre de Huesca — ⚠️ distance proche de la limite
- Source : Nuroa.es — annonceur réel : ⚠️ non identifié (particulier ou agence non précisé dans les résultats WebSearch)
- Prix : 750€/mois (375€/personne) — surface ⚠️ non précisée
- Distance à pied : ⚠️ non calculée précisément. À côté de l'Hôtel Abba (C. Tarbes 14), proche de la gare et du Palais des Congrès — l'hôtel se décrit lui-même comme à 10 min à pied du centre historique/cathédrale. **⚠️ estimation 10-12 min, proche de la limite des 15 minutes, à reconfirmer précisément avant de s'engager.**
- Caractéristiques : 2 chambres, salon-cuisine quasi indépendante
- Mobilier : entièrement meublé et équipé, salle de bain avec baignoire, terrasse orientée est (soleil du matin)
- Équipements du logement / charges / conditions de location / confort saisonnier / linge de lit : ⚠️ non précisé dans l'annonce
- Avis agence : non applicable (annonceur non identifié)

### Pistes laissées de côté cette fois (prix ou adresse introuvables via WebSearch, ou critère non respecté)

- **Fincas Alto Aragón, réf. 502-2869, 700€/mois** — adresse/m²/chambres introuvables via WebSearch → à reprendre en contactant l'agence directement ou avec WebFetch disponible.
- **Calle Loreto, Huesca (Nuroa.es)** — très bien situé (Casco Antiguo, barrio La Catedral), meublé, 2 chambres, terrasse, débarras — mais **prix introuvable** malgré 4 tentatives de recherche → piste forte à reprendre en priorité dès que possible (visite directe nuroa.es).
- **C/ Gibraltar nº10 / "Carretera de Huesca a Puente la Reina" (Fincas Montearagón)**, 66 m², 280€/mois — **écarté : zone proche du CDAN, décrite comme à ~25 min à pied du centre**, dépasse le critère des 15 min.
- **Av. de los Monegros nº24 (Fincas Montearagón)**, chambre 28 m² à 280€/mois en colocation — non retenu cette fois (priorité donnée aux appartements entiers et au candidat Vicente Campo déjà documenté pour le format chambre).
- **Paseo Gregoria Ciprés, 22003 Huesca** — toujours pas vérifié avec certitude (plusieurs annonces Rentola à 330-500€ selon configuration) ; zone (barrio San José/Santiago) jugée potentiellement trop excentrée → à vérifier précisément la distance avant de retenir.
- **Aragón Fincas** — avis collectés mais aucune annonce de location précise trouvée → à retenter.

### Mise à jour des pistes à explorer

- ~~Su Vivienda Huesca~~ → exploré cette fois (avis collectés), mais aucun logement résidentiel trouvé, seulement des locaux. Retiré de "à explorer", noté comme agence sans annonce actuelle.
- Toujours non explorés : **badi.es** (colocation), les 3 groupes Facebook Huesca (liens dans la section précédente), **Fincas Alto Aragón** (à recontacter directement pour la réf. 502-2869), **Calle Loreto/Nuroa.es** (prix à trouver), **Aragón Fincas** (annonces à trouver), **Paseo Gregoria Ciprés** (distance à vérifier).
- Nouvelle piste suggérée : la sous-section "chambres en colocation" d'Idealista.com et d'autres portails (séparée des résultats "pisos entiers" déjà couverts) s'est révélée utile (candidat Vicente Campo) — à creuser davantage si Roméo est ouvert aux colocations avec inconnus.

## Date de dernière mise à jour de cette liste

26/06/2026 (3e passage — 4 nouveaux candidats documentés + rappel du candidat Gardeta du 23/06 toujours non poussé ; Notion inaccessible cette session pour une raison structurelle, pas seulement réseau — voir constat ci-dessus).

**Règle :** après chaque recherche, ajouter les sites utilisés à la section "déjà couverts" ci-dessus et retirer les agences nouvellement notées de la liste "pistes à explorer". Ne déplacer un site listé ci-dessus dans "déjà couverts" qu'une fois qu'il a été *réellement* exploré avec WebFetch (annonces individuelles consultées), pas seulement via des snippets WebSearch. Tenir aussi à jour la section équivalente sur la page Notion (voir `references/format-notion.md`), canal de persistance fiable même si une exécution de routine n'a pas le droit de commit ce jour-là.
