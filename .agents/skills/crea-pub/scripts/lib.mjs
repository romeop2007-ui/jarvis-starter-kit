// Helpers communs pour le skill crea-pub.
// Tout en Node natif (v24) : fetch, fs, path. Aucune dependance externe ici.

import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Racine du workspace = .claude/skills/crea-pub/scripts -> remonter 4 niveaux.
export const WORKSPACE_ROOT = resolve(__dirname, "..", "..", "..", "..");
export const OUTPUT_ROOT = join(WORKSPACE_ROOT, "livrables", "ecommerce", "creas");

// Racine des LIVRABLES FINAUX (convention Romeo) : on range par LOT (= nom du dossier
// source dans "ressources creas avant modifs", ex "T4") puis par pub (AD1, AD2, ...).
// Chaque dossier ADn ne contient QUE le livrable utile a CapCut : la voix off (pubs video
// avec narration) OU les accroches FR (pubs muettes/musicales et pubs image). Le visuel
// (video-sans-soustitres.mp4 ou creas finale) vient s'y ajouter ensuite.
export const FINAL_ROOT = join(OUTPUT_ROOT, "ressources créas après modifs");

export const ELEVEN_BASE = "https://api.elevenlabs.io/v1";

// Lit une cle dans le fichier .env du workspace (format KEY=value, lignes # ignorees).
export function readEnv(key) {
  if (process.env[key]) return process.env[key];
  const envPath = join(WORKSPACE_ROOT, ".env");
  if (!existsSync(envPath)) return undefined;
  const txt = readFileSync(envPath, "utf8");
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    if (line.slice(0, eq).trim() === key) {
      return line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return undefined;
}

export function requireElevenKey() {
  // Accepte les deux orthographes de la variable.
  const k = readEnv("ELEVEN_LABS_API_KEY") || readEnv("ELEVENLABS_API_KEY");
  if (!k) {
    throw new Error(
      "Cle ElevenLabs manquante dans .env (ELEVEN_LABS_API_KEY ou ELEVENLABS_API_KEY)."
    );
  }
  return k;
}

// Nettoie un libelle pour en faire un nom de dossier/fichier sur.
export function slugify(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 60) || "sans-nom";
}

// Dossier de sortie d'une pub : <produit>__<nom-pub>, cree s'il n'existe pas.
// (Ancienne convention, conservee pour compat / dossiers de travail temporaires.)
export function adFolder(produit, nomPub) {
  const dir = join(OUTPUT_ROOT, `${slugify(produit)}__${slugify(nomPub)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

// Dossier LIVRABLE FINAL d'une pub : "ressources créas après modifs/<LOT>/<ADn>/".
// lot = nom du lot source (ex "T4"), ad = numero ou libelle de la pub (ex "AD1").
// C'est ici qu'on depose la voix off / les accroches, puis le visuel plus tard.
export function finalAdFolder(lot, ad) {
  const dir = join(FINAL_ROOT, String(lot).trim(), String(ad).trim().toUpperCase());
  mkdirSync(dir, { recursive: true });
  return dir;
}

// Appel ElevenLabs avec gestion d'erreur lisible.
export async function elevenFetch(path, { method = "GET", headers = {}, body } = {}) {
  const key = requireElevenKey();
  const res = await fetch(`${ELEVEN_BASE}${path}`, {
    method,
    headers: { "xi-api-key": key, ...headers },
    body,
  });
  if (!res.ok) {
    let detail = "";
    try {
      detail = await res.text();
    } catch {}
    throw new Error(`ElevenLabs ${res.status} sur ${path} : ${detail.slice(0, 400)}`);
  }
  return res;
}

// Estimation du nombre de mots cible pour une duree donnee (debit voix off FR ~2,4 mots/s).
export function targetWords(durationSec) {
  return Math.max(1, Math.round(durationSec * 2.4));
}
