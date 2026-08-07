# Watchlist externe (routine ChatGPT) — snapshot du 06/08/2026

> Cette liste est un **extrait figé** de `liste-rejetes.md`, limité aux candidats bloqués par un facteur **objectivement vérifiable de l'extérieur** (prix affiché, présence de pubs dans une zone géo). Elle sert de base au prompt de tâche programmée ChatGPT ci-dessous.
>
> **Ce fichier se périme.** Le vivier réel évolue à chaque session de recherche produit. Redemander à Claude « régénère la watchlist ChatGPT » après une session qui ajoute/tranche des candidats plutôt que de faire confiance à une vieille copie collée dans ChatGPT.
>
> **Hors périmètre de ce fichier** (nécessitent TrendTrack, pas une simple visite de page web) : la pente d'ads, le daily spend, le nombre de créas au plancher. Ces candidats (Fjellvaro, ScandicBeam, Holmgaard Titanium, Aurenis/PackMate, Babilo, NordCap, EnkelDyne, filtre douche anti-calcaire, pièges à souris, busy board bébé) se re-checkent via une session `recherche-produit` normale, pas via ChatGPT.

## Bucket 1 — Prix à re-vérifier

| Shop (domaine) | Produit | Marché | Prix actuel bloquant | Condition de réouverture |
|---|---|---|---|---|
| `pearcehaley.com`, `slimstep.shop`, `thenextgenelectronics.com`, `fhgugi.top`/`gjhiifh.top`, `shomathy.com` | Projecteur galaxie/océan « 5D » (cluster à 5 shops) | CZ, RO, AU/GB, EE/LT, FR | 23-35 € partout | Un des shops passe à ≥60 € |
| `huber-outdoor.at` | Lampe frontale 230° USB-C | AT/DE | 39,90 € (19,95 €/u en offre 1+1) | Repasse à ~49,90 € |
| `elyndra.it` | Collier pendentif fleur pressée | IT | 19,99 € solo / 40,98 € bundle 2 | Priorité basse — écart trop large pour être probable à court terme |

## Bucket 2 — Présence de pubs en zone UE à re-vérifier

| Shop (domaine) | Produit | Diffusion actuelle (bloquante) | Condition de réouverture |
|---|---|---|---|
| `stillwellshower.com` / `stillwelluk.com` | Douche portable rechargeable | 100 % GB, data non analysable pour un lancement FR | Le shop commence à diffuser des pubs visibles dans l'UE/EEE (Bibliothèque publicitaire Meta) |
| `hydiqo.com` | Douche portable | US/NZ | Idem |

## Prompt prêt à coller dans ChatGPT (tâche programmée quotidienne)

```
Tu es mon assistant de veille concurrentielle e-commerce. Une fois par jour, vérifie l'état de chacun des shops ci-dessous et signale-moi UNIQUEMENT ce qui a changé par rapport à la condition indiquée. Si rien n'a changé sur un shop, ne le mentionne pas dans ta réponse — je ne veux pas d'un rapport qui répète "rien de neuf" dix fois.

Pour chaque shop, visite la page produit indiquée (ou cherche la si l'URL a changé) et vérifie le prix affiché. Compare-le au prix bloquant noté. Vérifie aussi si le shop existe toujours et vend toujours ce produit.

--- BUCKET PRIX ---

1. Projecteur galaxie/océan "5D" (5 shops à vérifier, un seul suffit à débloquer) :
   - pearcehaley.com/products/... (CZ) — actuellement 35€
   - slimstep.shop (RO)
   - thenextgenelectronics.com (AU/GB)
   - fhgugi.top / gjhiifh.top (EE/LT)
   - shomathy.com (FR)
   Condition : signale-moi si UN de ces shops vend le produit à 60€ ou plus.

2. huber-outdoor.at — lampe frontale 230° USB-C, actuellement 39,90€ (19,95€/unité en offre 1+1).
   Condition : signale-moi si le prix repasse à environ 49,90€ ou plus.

3. elyndra.it — collier pendentif fleur pressée, actuellement 19,99€ solo / 40,98€ bundle de 2.
   Condition : signale-moi si le prix double ou plus (priorité basse, peu probable).

--- BUCKET PRÉSENCE UE ---

Pour ces deux shops, cherche sur la Bibliothèque publicitaire Meta (facebook.com/ads/library) le nom de la marque, et regarde dans quels pays les publicités sont diffusées.

4. stillwellshower.com / stillwelluk.com — douche portable rechargeable, diffusion actuelle 100% Royaume-Uni.
   Condition : signale-moi si tu vois des publicités diffusées dans un pays de l'Union Européenne (France, Allemagne, Espagne, Italie, etc.).

5. hydiqo.com — douche portable, diffusion actuelle États-Unis/Nouvelle-Zélande.
   Condition : idem, signale-moi toute diffusion visible dans un pays de l'UE.

--- FORMAT DE RÉPONSE ---

Si rien n'a changé sur aucun shop : réponds juste "RAS aujourd'hui."
Si quelque chose a changé : liste uniquement le(s) shop(s) concerné(s), avec l'ancienne valeur, la nouvelle valeur, et la date de ta vérification. Je copierai ta réponse dans Claude Code pour réévaluer le candidat.
```

**Limite assumée** : ce prompt ne couvre pas la pente d'ads (daily spend, nombre de créas au plancher), qui n'est pas visible sur les sites eux-mêmes — seul TrendTrack la donne. Pour ces candidats-là (Fjellvaro, ScandicBeam, Holmgaard, Aurenis, Babilo, NordCap, EnkelDyne...), la routine reste : redemander une session `recherche-produit` à Claude tous les quelques jours.
