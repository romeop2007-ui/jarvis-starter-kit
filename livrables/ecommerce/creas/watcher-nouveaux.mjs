// Detecte les lots NON traites dans "ressources créas avant modifs".
// Compare la liste des sous-dossiers au fichier d'etat .watcher-traites.txt.
// Imprime un nom de lot par ligne (rien si tout est a jour).
// Usage : node watcher-nouveaux.mjs
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(here, "ressources créas avant modifs");
const stateFile = join(here, ".watcher-traites.txt");

const lots = existsSync(sourceDir)
  ? readdirSync(sourceDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

const traites = existsSync(stateFile)
  ? readFileSync(stateFile, "utf8")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)
  : [];

const nouveaux = lots.filter((l) => !traites.includes(l));
for (const n of nouveaux) console.log(n);
