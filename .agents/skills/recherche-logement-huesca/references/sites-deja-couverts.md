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

## 29/06/2026 (session interactive, après-midi) — WebFetch fonctionnel

- **rentola.es** : enfin exploré avec WebFetch (fonctionne hors routine cloud). La quasi-totalité des annonces de location à Huesca y passe par **Fincas Montearagón**. Attention : les libellés de rue de la page liste sont trompeurs, la vraie adresse est dans l'URL de chaque fiche individuelle (ex. un "Travesía Nevería 360€" pointait en réalité sur Valentín Gardeta 30 = bien 6, doublon).
- **2 nouveaux logements ajoutés à Notion (biens 13 et 14)** :
  - 13 — Calle de Camila Gracia, 8 (380€, 65 m², 2 ch, ~4 min, meublé, gaz, charges comunidad incluses) — Fincas Montearagón
  - 14 — Paseo Gregoria Ciprés / C/ Santo Grial, 4 (330€, 60 m², 2 ch, ~12 min, meublé+rénové, charges incluses, le moins cher) — Fincas Montearagón
- **Distances des biens 7 à 12 vérifiées en dur** (script geocode, qui fonctionne hors routine) :
  - 7 Paseo Gregoria Ciprés ~12 min ✓ ; 8 Plaza Navarra ~11 min ✓ ; 10 Padre Huesca ~11 min ✓ ; 11 Pedro Sopeña ~12 min ✓
  - **9 Calle Doña Sancha : 27,6 min → HORS CRITÈRE, écarté.** **12 Calle Menéndez Pidal : 18,6 min → HORS CRITÈRE, écarté** (fiche Fincas Alcoraz en 404 de surcroît).
- Pool Fincas Montearagón non encore détaillé sur Rentola (à creuser la prochaine fois si besoin de plus de candidats) : plusieurs 3-4 chambres Paseo Gregoria Ciprés (350-500€), Camila Gracia 3 ch 400€, López Allué 3 ch 600-690€.

## 02/07/2026 (session interactive) — Bolsa unizar exploitée + page Notion nettoyée (règle lien direct)

- **NOUVELLE SOURCE EN OR : Bolsa de pisos officielle de l'Université de Saragosse** — https://alojamiento.unizar.es/alojamientos — liste des logements avec **adresse exacte + téléphone direct du propriétaire** (particuliers, zéro frais d'agence, service gratuit). WebFetch fonctionne dessus. 3 biens Huesca ce jour : Plaza San Bernardo 4 (1000€, 4ch, ☎620514266, ~5,9min ✓), Paseo Ramón y Cajal 21 (840€, 3ch, ☎699521260, ~5,4min ✓), Avenida Martínez de Velasco 41 (740€, 3ch, ☎626262020, ~46min ✗ écarté). **À re-consulter à chaque recherche, stock renouvelé mensuellement.** Filtrer sur "Localidad = Huesca". Autres pistes institutionnelles : Facebook @UniZarAlojamientos.
- **housingtarget.com sondé avec WebFetch** : 25 annonces à Huesca mais fiches sans adresse ni lien direct exploitable (photos stock, contact uniquement via la plateforme) → **écarté au titre de la règle "lien direct obligatoire"**, inutile d'y revenir.
- **RÈGLE LIEN DIRECT actée le 02/07/2026** (voir `format-notion.md` section "RÈGLE ABSOLUE" + mémoire `feedback_logement_lien_direct`) : chaque bien = 1 lien direct vers la fiche OU téléphone/adresse du proprio, sinon supprimer. Page Notion nettoyée : 8 biens supprimés (liens morts/introuvables), 6 conservés avec lien vérifié en ligne, 2 ajoutés via la bolsa unizar. Liens rentola confirmés actifs : valentin-gardeta-30 (p3e28c8), pedro-sopena-6 (p57b6fa), av-ramon-y-cajal-5=Camila Gracia 8 (2ed7fc), santo-grial-4 (f7e715). Liens morts : enalquiler 7066170 (Casco Antiguo), gallegomartinez id=11138 (Nevería).

## 02/07/2026 (suite) — Règle réputation : idealista + rentola BANNIS

- **idealista.com : Trustpilot 1,3 → BANNI.** Ne plus proposer, y compris pour les chambres.
- **rentola.es : Trustpilot 1,7 + piège abonnement (1€ pour accéder, puis 39€ prélevés une semaine après) → BANNI.** Les 10 biens Huesca qui en venaient (tous Fincas Montearagón) sont conservés sur la page Notion mais **reroutés vers le contact direct de l'agence** : **Fincas Montearagón, ☎ 974 23 82 44, fincasmontearagon.com, Av. Monreal 15** (agence sérieuse depuis 1977, 8/10). Le site de l'agence a un certificat HTTPS cassé (hébergé chez ecomputer) → WebFetch échoue, passer par téléphone.
- **Principe : le portail n'est qu'un intermédiaire.** Un bien sur un portail banni reste valable si le vrai annonceur (agence/particulier) est joignable en direct et sérieux. Vérifier la note Trustpilot de tout NOUVEAU portail avant de s'en servir.
- **SEUIL DURCI le 02/07/2026 : Trustpilot ≥ 4/5.** Note < 4 = écarté ; pas de profil Trustpilot = gardé (bénéfice du doute, demandé par Roméo).
- **enalquiler.com : 2,83 < 4 → ÉCARTÉ.** Le bien 2 (Santo Domingo) rerouté vers l'annonceur direct : **Tecnocasa — Estudio Palacio de los Reyes SL, ☎ 974 22 96 60, huaa2@tecnocasa.es, site huesca1.tecnocasa.es, Calle Ramón y Cajal 28**.
- **Gardés faute de profil Trustpilot :** gallegomartinez.com (site propre de l'agence), alquilarhabitacion.es, alojamiento.unizar.es.
- **alquilarhabitacion.es** (chambres C2-C5) : pas de profil Trustpilot trouvé, réputation non vérifiable, contact uniquement via inscription/WhatsApp sur le site → toléré avec réserve, ne jamais verser d'acompte avant visite.

**Règle :** après chaque recherche, ajouter les sites utilisés à la section "déjà couverts" ci-dessus et retirer les agences nouvellement notées de la liste "pistes à explorer". Ne déplacer un site listé ci-dessus dans "déjà couverts" qu'une fois qu'il a été *réellement* exploré avec WebFetch (annonces individuelles consultées), pas seulement via des snippets WebSearch. Tenir aussi à jour la section équivalente sur la page Notion (voir `references/format-notion.md`), canal de persistance fiable même si une exécution de routine n'a pas le droit de commit ce jour-là.
