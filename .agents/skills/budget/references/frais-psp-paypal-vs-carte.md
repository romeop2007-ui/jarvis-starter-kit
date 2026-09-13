# Répartition PayPal / Shopify Payments par commande (frais PSP réels)

> Procédure actée le 12/09/2026, à la demande de Roméo, pour remplir la ligne
> "frais de PSP" du P&L. Il pose la question ("qui a payé par PayPal hier ?"),
> Claude exécute la requête ci-dessous et rend le tableau.

## Le piège, et pourquoi la méthode du formateur ne se reproduisait pas

Sur la boutique Zooryn, **PayPal passe À TRAVERS Shopify Payments**. Conséquence :

- `paymentGatewayNames` vaut `["shopify_payments"]` pour TOUTES les commandes,
  PayPal comprises.
- Le champ `gateway` de la transaction vaut `shopify_payments` dans les deux cas.

Chercher un gateway nommé "paypal" ne renvoie donc jamais rien. C'est ce qui
bloquait Roméo.

## Le vrai discriminant : `fees.rateName`

| `rateName` | Moyen de paiement | Taux constaté |
|---|---|---|
| `paypal_domestic_card_not_present` | **PayPal** | 2,9 % + 0,35 € |
| `domestic_card_not_present` | **Carte (Shopify Payments)** | 1,5 % + 0,25 € |

Confirmation croisée disponible avec `accountNumber` : rempli avec les 4 derniers
chiffres pour une carte, vide pour PayPal.

⚠️ PayPal coûte donc **presque le double** de la carte. Ne jamais utiliser un taux
PSP unique dans le P&L : il faut la répartition réelle commande par commande.

## La requête (Admin GraphQL, lecture seule)

```graphql
query PaiementsParCommande($q: String) {
  orders(first: 20, query: $q, sortKey: CREATED_AT) {
    edges {
      node {
        name
        createdAt
        totalPriceSet { shopMoney { amount currencyCode } }
        paymentGatewayNames
        transactions {
          gateway
          formattedGateway
          kind
          status
          processedAt
          accountNumber
          amountSet { shopMoney { amount currencyCode } }
          fees {
            type
            rate
            rateName
            flatFee { amount currencyCode }
            amount { amount currencyCode }
          }
        }
      }
    }
  }
}
```

Variable `q`, bornes en **UTC** pour une journée en heure de Paris (CEST, UTC+2) :

```
created_at:>='AAAA-MM-JJT22:00:00Z' AND created_at:<'AAAA-MM-(JJ+1)T22:00:00Z'
```

En hiver (CET, UTC+1), utiliser `23:00:00Z`.

## Format de rendu attendu (fixé par Roméo le 12/09/2026)

Quand Roméo demande "qui a payé par PayPal [jour] ?", il veut **deux chiffres, rien
d'autre**, prêts à copier-coller dans le P&L :

- le **nombre de commandes** PayPal
- le **CA** réalisé via PayPal

Pas de tableau détaillé, pas de calcul intermédiaire, pas de commentaire, sauf s'il
le demande explicitement. Le reste (frais PSP, répartition carte, taux moyen) ne
sort que sur demande.

## Exemple vérifié — vendredi 11/09/2026

| Commande | Montant | Paiement | Frais |
|---|---|---|---|
| #1013 | 59,99 € | PayPal | 2,09 € |
| #1014 | 59,99 € | Carte | 1,15 € |
| #1015 | 30,00 € | PayPal | 1,22 € |

CA 149,98 €, frais PSP totaux 4,46 €, soit 2,97 % du CA.
Répartition : PayPal 89,99 € (60 % du CA), carte 59,99 € (40 %).

## À ne pas confondre

Ces frais PSP sont ceux encaissés côté **client**. Ils sont distincts des ~13 %
perdus sur les **recharges PayPal du compte Aplusfulfill** (côté fournisseur,
mesurés via le connecteur Qonto le 11/09/2026). Les deux lignes coexistent dans
le P&L.
