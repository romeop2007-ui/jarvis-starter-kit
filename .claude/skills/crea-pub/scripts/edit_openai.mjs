// Edite une image via l'API OpenAI gpt-image (le moteur derriere les images de ChatGPT).
// Envoie l'image + un prompt, recupere l'image editee. C'est la voie "travailler comme ChatGPT".
//
// Usage :
//   node scripts/edit_openai.mjs --image <src> --out <dest.png> --prompt-file <p.txt> [--size auto] [--quality high]
//   (ou --prompt "le prompt directement")
//
// Cle requise : OPENAI_API_KEY (ou OPEN_AI_API_KEY) dans le .env du workspace.
// L'abonnement ChatGPT Plus ne donne PAS acces a l'API : il faut une cle API OpenAI (facturee a l'usage).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";
import sharp from "sharp";
import { readEnv, OUTPUT_ROOT } from "./lib.mjs";

const ENDPOINT = "https://api.openai.com/v1/images/edits";
const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

// gpt-image-1 ne sait sortir que ces 3 formats. On choisit le plus proche de la source,
// puis on recadre la sortie aux dimensions EXACTES de la source (cf. matchSourceFormat).
const SUPPORTED = [
  { name: "1024x1024", w: 1024, h: 1024 },
  { name: "1024x1536", w: 1024, h: 1536 },
  { name: "1536x1024", w: 1536, h: 1024 },
];

// Renvoie le format gpt-image-1 dont le ratio est le plus proche de la source (= recadrage
// minimal). gpt-image-1 RECOMPOSE l'image (ce n'est pas une retouche au pixel), donc on
// minimise le rognage ; la position du recadrage (--crop-pos) protege la zone qui porte le
// texte (ex : "bottom" pour les pubs dont le texte/badge est en bas, on rogne le haut/scene).
function closestSize(w, h) {
  const ar = w / h;
  let best = SUPPORTED[0], bestDiff = Infinity;
  for (const s of SUPPORTED) {
    const d = Math.abs(s.w / s.h - ar);
    if (d < bestDiff) { bestDiff = d; best = s; }
  }
  return best.name;
}

// Tarifs gpt-image-1 (USD par million de tokens), au 06/2026.
const PRICE = { textIn: 5, imageIn: 10, imageOut: 40 };
const LEDGER = join(OUTPUT_ROOT, "_couts_openai.json");

// Calcule le cout d'un appel a partir de l'objet usage renvoye par l'API.
function costFromUsage(u) {
  if (!u) return null;
  const textIn = u.input_tokens_details?.text_tokens ?? 0;
  const imageIn = u.input_tokens_details?.image_tokens ?? 0;
  const out = u.output_tokens ?? 0;
  const usd = (textIn * PRICE.textIn + imageIn * PRICE.imageIn + out * PRICE.imageOut) / 1e6;
  return { textIn, imageIn, out, usd };
}

// Ajoute le cout du run au registre cumulatif et renvoie le total a ce jour.
function logCost(label, c) {
  let led = { totalUsd: 0, runs: [] };
  if (existsSync(LEDGER)) { try { led = JSON.parse(readFileSync(LEDGER, "utf8")); } catch {} }
  led.runs.push({ at: new Date().toISOString(), label, usd: c.usd, tokens: { textIn: c.textIn, imageIn: c.imageIn, out: c.out } });
  led.totalUsd = Math.round((led.totalUsd + c.usd) * 1e6) / 1e6;
  writeFileSync(LEDGER, JSON.stringify(led, null, 2));
  return led.totalUsd;
}

function requireOpenAIKey() {
  const k = readEnv("OPENAI_API_KEY") || readEnv("OPEN_AI_API_KEY");
  if (!k) throw new Error("OPENAI_API_KEY manquante dans .env (cle API OpenAI, distincte de l'abonnement ChatGPT).");
  return k;
}

export async function editImage({ imagePath, prompt, outPath, size = "auto", quality = "high", extraImages = [], cropPos = "centre" }) {
  const key = requireOpenAIKey();

  // Dimensions exactes de la source : la sortie devra les respecter au pixel pres
  // (on copie le winner, donc on garde son format tel quel). "auto" = format le plus proche.
  const meta = await sharp(imagePath).metadata();
  const srcW = meta.width, srcH = meta.height;
  const apiSize = size === "auto" ? closestSize(srcW, srcH) : size;

  const form = new FormData();
  form.append("model", "gpt-image-1");
  form.append("prompt", prompt);
  form.append("size", apiSize);
  form.append("quality", quality);

  // Image(s) source. Si on passe plusieurs images (ex : crea + logo de marque),
  // gpt-image-1 les recoit toutes via le champ repete "image[]" et s'en sert comme references.
  const all = [imagePath, ...extraImages].filter(Boolean);
  const field = all.length > 1 ? "image[]" : "image";
  all.forEach((p, i) => {
    const buf = readFileSync(p);
    const type = MIME[extname(p).toLowerCase()] || "image/png";
    form.append(field, new Blob([buf], { type }), `img${i}` + extname(p));
  });

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  });
  if (!res.ok) {
    let d = ""; try { d = await res.text(); } catch {}
    throw new Error(`OpenAI ${res.status} : ${d.slice(0, 500)}`);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("Reponse OpenAI sans image : " + JSON.stringify(data).slice(0, 300));
  // On recadre la sortie aux dimensions EXACTES de la source (cover = recadrage minimal, sans
  // deformation). Garantit un format identique a l'original a chaque fois, sans verification manuelle.
  await sharp(Buffer.from(b64, "base64"))
    .resize(srcW, srcH, { fit: "cover", position: cropPos })
    .toFile(outPath);
  return { out: outPath, size: `${srcW}x${srcH}`, cost: costFromUsage(data?.usage) };
}

if (process.argv[1]?.endsWith("edit_openai.mjs")) {
  const args = process.argv.slice(2);
  const get = (f) => { const i = args.indexOf(f); return i !== -1 ? args[i + 1] : undefined; };
  const imagePath = get("--image");
  const outPath = get("--out");
  const pf = get("--prompt-file");
  const prompt = pf ? readFileSync(pf, "utf8").trim() : get("--prompt");
  const size = get("--size") || "auto";
  const quality = get("--quality") || "high";
  // --logo (ou --image2) : image supplementaire passee en reference (ex : logo de marque a integrer).
  const extraImages = [get("--logo"), get("--image2")].filter(Boolean);
  const cropPos = get("--crop-pos") || "centre"; // ex : bottom, top, centre
  if (!imagePath || !outPath || !prompt) {
    console.error('Usage : node scripts/edit_openai.mjs --image <src> --out <dest> (--prompt-file <f> | --prompt "...") [--logo <logo>] [--size auto] [--quality high] [--crop-pos centre|bottom|top]');
    process.exit(1);
  }
  editImage({ imagePath, prompt, outPath, size, quality, extraImages, cropPos })
    .then((r) => {
      console.log(`Image editee -> ${r.out} (format source conserve : ${r.size})`);
      if (r.cost) {
        const total = logCost(outPath, r.cost);
        console.log(`Cout de ce run : ${r.cost.usd.toFixed(4)} $ | Cumul depuis le debut : ${total.toFixed(4)} $`);
      }
    })
    .catch((e) => { console.error(e.message); process.exit(1); });
}
