// Cree (si besoin) le dossier de sortie d'une pub et imprime son chemin absolu.
// Usage : node scripts/folder.mjs "<produit>" "<nom-pub>"
// Utilise par le chemin IMAGE (et utile pour preparer un dossier a la main).

import { adFolder } from "./lib.mjs";

if (process.argv[1]?.endsWith("folder.mjs")) {
  const produit = process.argv[2];
  const nomPub = process.argv[3];
  if (!produit || !nomPub) {
    console.error('Usage : node scripts/folder.mjs "<produit>" "<nom-pub>"');
    process.exit(1);
  }
  console.log(adFolder(produit, nomPub));
}
