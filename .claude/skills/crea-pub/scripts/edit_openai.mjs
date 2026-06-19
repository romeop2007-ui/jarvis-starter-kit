// Edite une image via l'API OpenAI gpt-image (le moteur derriere les images de ChatGPT).
// Envoie l'image + un prompt, recupere l'image editee. C'est la voie "travailler comme ChatGPT".
//
// Usage :
//   node scripts/edit_openai.mjs --image <src> --out <dest.png> --prompt-file <p.txt> [--size auto] [--quality high]
//   (ou --prompt "le prompt directement")
//
// Cle requise : OPENAI_API_KEY (ou OPEN_AI_API_KEY) dans le .env du workspace.
// L'abonnement ChatGPT Plus ne donne PAS acces a l'API : il faut une cle API OpenAI (facturee a l'usage).

import { readFileSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import { readEnv } from "./lib.mjs";

const ENDPOINT = "https://api.openai.com/v1/images/edits";
const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

function requireOpenAIKey() {
  const k = readEnv("OPENAI_API_KEY") || readEnv("OPEN_AI_API_KEY");
  if (!k) throw new Error("OPENAI_API_KEY manquante dans .env (cle API OpenAI, distincte de l'abonnement ChatGPT).");
  return k;
}

export async function editImage({ imagePath, prompt, outPath, size = "auto", quality = "high" }) {
  const key = requireOpenAIKey();
  const buf = readFileSync(imagePath);
  const type = MIME[extname(imagePath).toLowerCase()] || "image/png";

  const form = new FormData();
  form.append("model", "gpt-image-1");
  form.append("prompt", prompt);
  form.append("size", size);
  form.append("quality", quality);
  form.append("image", new Blob([buf], { type }), "source" + extname(imagePath));

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
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  return { out: outPath };
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
  if (!imagePath || !outPath || !prompt) {
    console.error('Usage : node scripts/edit_openai.mjs --image <src> --out <dest> (--prompt-file <f> | --prompt "...") [--size auto] [--quality high]');
    process.exit(1);
  }
  editImage({ imagePath, prompt, outPath, size, quality })
    .then((r) => console.log("Image editee -> " + r.out))
    .catch((e) => { console.error(e.message); process.exit(1); });
}
