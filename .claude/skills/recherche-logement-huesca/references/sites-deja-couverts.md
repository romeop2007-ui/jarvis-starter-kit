# Sites déjà couverts (à ne jamais re-chercher)

Cette liste est mise à jour par Claude après chaque session de recherche. Avant de lancer une nouvelle recherche, lire cette liste et choisir des sites/agences absents d'ici.

## Portails de listing déjà passés au crible

- idealista.com (bloque WebFetch en 403, mais déjà sondé via WebSearch — ne pas retenter)
- fotocasa.es
- enalquiler.com
- gallegomartinez.com (agence Gállego Martínez)
- milanuncios.com (bloque WebFetch par captcha — ne pas retenter)
- yaencontre.com
- rentola.es (sondé en profondeur le 28/06/2026 via WebSearch — particulier Paseo Gregoria Ciprés corroboré et poussé en Notion bien n°7 ; WebFetch toujours bloqué dans cet environnement, à retenter en session interactive avant de classer définitivement "couvert")
- nuroa.es (idem 28/06 — secteur Plaza Navarra/Parque Miguel Servet poussé en Notion bien n°8 ; ⚠️ prix incohérent entre deux recherches WebSearch, 550€ vs 580€ pour la même fiche — à reconfirmer)
- habitaclia.com (sondé à nouveau le 28/06 — annonces Coso Bajo repérées mais toujours sans prix exploitable via WebSearch ; à retenter avec WebFetch en session interactive)
- indomio.es (sondé le 28/06 — nouvelle piste Calle Doña Sancha 33 poussée en Notion bien n°9, mais distance à risque de dépasser le critère 15 min — à vérifier en priorité)
- tucasa.com (sondé le 28/06 — une piste 99 m² sans prix trouvé, pas assez fiable pour fiche, écarté)
- flatio.com (confirmé vide pour Huesca le 28/06 — 0 annonce, comme spotahome.com — inutile de retenter)
- wallapop.com (nouveau site sondé le 28/06 — aucun prix ferme trouvé, inconcluant)
- roomlala.es (nouveau site sondé le 28/06 — plateforme de colocation par chambre, ne correspond pas au format "appartement entier 2 chambres" recherché ; utile seulement si on élargit aux chambres individuelles)
- uniplaces.com (sondé le 28/06 — vide/inconcluant pour Huesca)

## Agences/annonceurs déjà identifiés et notés (avis déjà collectés)

- Gállego Martínez Inmobiliaria (C/ Cavia, 8) — ProvenExpert 3,70/5 (299 avis), Directoriocom 4,7/5 (29 avis)
- Fincas Osca (Calle Zaragoza, 9) — RealAdvisor 4,5/5 (161 avis)
- Tecnocasa Estudio Palacio de los Reyes SL (Calle Ramón y Cajal, 28) — avis positifs épars, pas de profil Trustpilot
- Fincas Montearagón (nouvelle, notée le 28/06/2026) — Trustlocal 7,8/10 (~8/10 sur 23 avis), ⚠️ un client signale des annonces fantômes déjà louées — bien Calle Valentín Gardeta 30 2ºA poussé en Notion bien n°6

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

- **Calle Valentín Gardeta, n° 30, 2ºA (Huesca)** — agence **Fincas Montearagón** (nouvelle agence, Trustlocal 7,8/10, ~8/10 sur 23 avis, ⚠️ un client signale des annonces fantômes déjà louées) — 40 m², meublé, 2 chambres, salon-cuisine, chauffage gaz individuel, terrasse couverte — 360€/mois (180€/pers.). Distance vérifiée depuis en session interactive : 834 m / ~14,4 min à pied de Plaza de la Constitución → respecte le critère ≤15 min. **Poussé en Notion bien n°6 le 28/06/2026.**

## Session du 28/06/2026 — 5 nouveaux logements poussés en Notion (biens 6 à 10)

Recherche menée intégralement via WebSearch (sandbox réseau cloud confirmé bloquant WebFetch et `geocode_distance.py` en 403 sur tous les domaines, y compris neutres — pas un blocage site par site). Biens ajoutés à la page Notion de suivi :

- **N°6 — Calle Valentín Gardeta, 30, 2ºA** (Fincas Montearagón) — 360€/mois (180€/pers.), 40 m², meublé — distance déjà vérifiée précisément (834 m / ~14,4 min) lors d'une session interactive antérieure.
- **N°7 — Paseo Gregoria Ciprés, 22003 Huesca** (Rentola.es, particulier) — 420€/mois (210€/pers.), 90 m², 2 chambres — ⚠️ distance non vérifiée, secteur potentiellement excentré.
- **N°8 — Secteur Plaza Navarra / Parque Miguel Servet** (Nuroa.es) — ⚠️ 550-580€/mois (écart entre sources), 74 m², meublé, construit 2005 — ⚠️ distance non vérifiée, adresse exacte masquée par l'annonce.
- **N°9 — Calle Doña Sancha, 33** (Indomio.es) — nouvelle piste, prix/surface non précisés — ⚠️ **risque réel de dépasser le critère des 15 min** (secteur 22005, ~1 km de la Cathédrale), à vérifier en priorité absolue.
- **N°10 — Calle Padre Huesca, 7, quartier San Lorenzo** (Enalquiler.com) — ⚠️ 680-750€/mois (écart entre sources), 72 m² — ⚠️ distance non vérifiée.

Sites probés ce jour sans résultat exploitable ou confirmés vides : flatio.com (vide, confirmé), wallapop.com, roomlala.es (colocation par chambre, hors format recherché), uniplaces.com, tucasa.com, habitaclia.com (Coso Bajo sans prix exploitable).

**Piste prioritaire identifiée pour la prochaine session interactive (WebFetch fonctionnel) :** housingtarget.com confirmé avoir ~22 annonces réelles à Huesca, mais WebSearch seul n'a pas pu en extraire le détail (adresse/prix). À retenter avec WebFetch avant tout autre nouveau site.

**Règle :** après chaque recherche, ajouter les sites utilisés à la section "déjà couverts" ci-dessus et retirer les agences nouvellement notées de la liste "pistes à explorer". Ne déplacer un site listé ci-dessus dans "déjà couverts" qu'une fois qu'il a été *réellement* exploré avec WebFetch (annonces individuelles consultées), pas seulement via des snippets WebSearch. Tenir aussi à jour la section équivalente sur la page Notion (voir `references/format-notion.md`), canal de persistance fiable même si une exécution de routine n'a pas le droit de commit ce jour-là.
