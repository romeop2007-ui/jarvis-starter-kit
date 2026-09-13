// Cree (si besoin) le dossier d'une pub et imprime son chemin absolu.
// Deux modes :
//   LIVRABLE FINAL (convention Romeo, a privilegier) :
//     node scripts/folder.mjs --lot T4 --ad AD1
//     -> "ressources créas après modifs/T4/AD1/"
//   Ancien mode (dossier de travail <produit>__<nom-pub>) :
//     node scripts/folder.mjs "<produit>" "<nom-pub>"

import { adFolder, finalAdFolder } from "./lib.mjs";

if (process.argv[1]?.endsWith("folder.mjs")) {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };
  const lot = get("--lot");
  const ad = get("--ad");

  if (lot && ad) {
    console.log(finalAdFolder(lot, ad));
  } else {
    const produit = args[0];
    const nomPub = args[1];
    if (!produit || !nomPub) {
      console.error(
        'Usage : node scripts/folder.mjs --lot T4 --ad AD1   (livrable final)\n' +
          '    ou : node scripts/folder.mjs "<produit>" "<nom-pub>"   (dossier de travail)'
      );
      process.exit(1);
    }
    console.log(adFolder(produit, nomPub));
  }
}
