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

- badi.es / badi.com (colocation) — re-sondé le 27/06/2026 via WebSearch seul, toujours aucune annonce Huesca concrète remontée (juste la page plateforme générique). Reste à tenter en session interactive.
- **wallapop.com** (es.wallapop.com/inmobiliaria/...-huesca) — **nouveau site identifié le 27/06/2026**, plusieurs annonces piso/habitación à Huesca existent (ex. 74 m² 2 chambres centre-ville, attico avec terrasse, appart Calle Neveria/Coso Bajo) mais WebSearch ne remonte aucune adresse exacte ni numéro de rue ni prix précis — à retenter avec WebFetch en session interactive pour ouvrir les annonces individuelles.
- Facebook Marketplace / groupes Huesca identifiés mais pas explorés en détail (accès manuel requis, pas d'API, WebSearch ne lit pas le contenu des posts) :
  - "De Piso en Piso - Pisos Estudiantes Huesca" — facebook.com/PisosHuesca
  - "COMPARTIR PISO EN HUESCA / ALQUILER Y VENTA" — facebook.com/groups/1110399279051272
  - "Alquiler Huesca" — facebook.com/groups/1597576086921260
  - "Pisos en Venta y Alquiler, Zaragoza y Huesca" — facebook.com/groups/1179868945760409
- pisos.com, habitaclia.com, rentola.es, indomio.es, tucasa.com, alquilarhabitacion.es, flatio.com, housingtarget.com : sondés en surface via WebSearch uniquement le 23/06 **et de nouveau le 27/06** (WebFetch bloqué les deux fois en environnement routine cloud, 403 systématique — pas un blocage spécifique au site). Toujours aucune adresse exacte récupérable via WebSearch seul (les réponses agrègent plusieurs annonces sans numéro de rue). À retenter en session interactive (WebFetch fonctionne normalement hors routine) avant de les classer définitivement "déjà couverts".

## Sites sondés en environnement restreint (WebFetch bloqué) — 23/06/2026 et 27/06/2026

- pisos.com, habitaclia.com, rentola.es, indomio.es, tucasa.com, alquilarhabitacion.es, flatio.com, housingtarget.com : WebFetch 403 dans le sandbox de la routine cloud (confirmé les deux jours), sondés via WebSearch seulement.
- spotahome.com : aucune annonce à Huesca ville (seulement Jaca, hors zone) — celui-ci est vraiment vide, pas besoin de retenter.
- badi.com : sondé pour la colocation à deux reprises (23/06 et 27/06), résultat non concluant via WebSearch seul les deux fois.
- wallapop.com : sondé le 27/06/2026, annonces existantes confirmées mais aucune adresse exacte récupérable via WebSearch seul.

## Piste trouvée le 23/06 (non ajoutée à Notion, distance non vérifiable à l'époque)

- **Calle Valentín Gardeta, n° 30, 2ºA (Huesca)** — agence **Fincas Montearagón** (nouvelle agence, Trustlocal 7,8/10, ~8/10 sur 23 avis, ⚠️ un client signale des annonces fantômes déjà louées) — 40 m², meublé, 2 chambres, salon-cuisine, chauffage gaz individuel, terrasse couverte — 360€/mois (180€/pers.). Distance vérifiée depuis en session interactive : 834 m / ~14,4 min à pied de Plaza de la Constitución → respecte le critère ≤15 min.

## Agences identifiées le 27/06/2026 (avis collectés, aucun logement précis encore rattaché)

- **Aragón Fincas** (Calle Coso Alto, S/N, Huesca, aragonfincas.com) — avis Google 3,3/5 sur 103 avis, mitigé. Positif : accueil personnalisé, équipe (Sara et Sergio) réactive, vente conclue rapidement pour un client. Négatif à rapporter : plusieurs clients signalent des soucis de gestion de la caution/dépôt de garantie et un avis qualifie l'agence de "pire agence pour louer, zéro suivi". Aucune annonce individuelle avec adresse précise trouvée via WebSearch — leur page /alquiler existe mais le contenu n'est pas extractible sans WebFetch.
- **Fincas Alto Aragón** (Calle Mariano Cavia, 8, 22005 Huesca, tél. 974 238682, fincasaltoaragon.com) — avis Google 4,4/5 (22 avis) ou 4,2/5 (21 avis) selon la source, majoritairement positif (professionnalisme, efficacité, écoute du budget). Négatif à rapporter : au moins un cas de locataire mauvais payeur placé par l'agence et un retour sur un manque de communication. Une annonce 1 chambre à 700€/mois repérée sur leur site mais sans détail (adresse, surface) ni certitude qu'elle correspond aux critères — non retenue en l'état.
- Su Vivienda Huesca : toujours pas re-sondée en détail le 27/06 (déjà notée comme piste le 23/06, infos inchangées : Calle Fatás 6, tél. 974 353 641 / 648 581 170, avis "mitigés selon les cas").

## 27/06/2026 — INCIDENT RÉSEAU + OUTILS NOTION INDISPONIBLES : aucun nouveau logement ajouté à Notion

Deux blocages cumulés ce jour-là :
1. **Réseau** : WebFetch et le script `geocode_distance.py` bloqués (403 systématique, confirmé sur idealista.com, en.wikipedia.org et l'API Nominatim — donc blocage d'environnement, pas spécifique à un site), exactement comme le 23/06. Seul WebSearch fonctionnait, et ses réponses agrègent plusieurs annonces sans jamais restituer un numéro de rue exact ni un prix certain rattaché à une adresse précise → impossible de constituer une fiche fiable (adresse + prix + annonceur réel) pour un nouveau logement.
2. **Outils Notion** : les outils `notion-fetch` / `notion-update-page` / `notion-search` requis par le skill n'étaient pas connectés dans cette session (seuls des outils de requête de base de données Notion étaient disponibles, inutilisables sur une page simple). Donc même avec un bon candidat, la mise à jour de la page Notion aurait été impossible ce jour-là.
Conséquence : aucune fiche poussée dans Notion, conformément à la règle de ne jamais forcer un résultat non fiable. Nouvelles pistes identifiées (Wallapop, Aragón Fincas, Fincas Alto Aragón — voir ci-dessus) à reprendre en session interactive avec WebFetch et les outils Notion complets.

**Règle :** après chaque recherche, ajouter les sites utilisés à la section "déjà couverts" ci-dessus et retirer les agences nouvellement notées de la liste "pistes à explorer". Ne déplacer un site listé ci-dessus dans "déjà couverts" qu'une fois qu'il a été *réellement* exploré avec WebFetch (annonces individuelles consultées), pas seulement via des snippets WebSearch. Tenir aussi à jour la section équivalente sur la page Notion (voir `references/format-notion.md`), canal de persistance fiable même si une exécution de routine n'a pas le droit de commit ce jour-là — **sauf si les outils Notion eux-mêmes sont indisponibles dans la session, comme le 27/06/2026, où ce fichier local reste alors le seul canal de persistance.**
