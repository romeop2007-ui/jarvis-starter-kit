// Genere une image via l'API kie.ai (Nano Banana Pro par defaut), cle KIE_API_KEY dans le .env racine.
// Usage : node scripts/kie-image.mjs --prompt "..." [--prompt-file p.txt] [--ref img1.png --ref https://...]
//         [--model nano-banana-pro] [--ratio 4:5] [--res 2K] [--format png] --out AD113.png
//         --out = nom de fichier seul, toujours ecrit dans livrables/ecommerce/creas/kie.ai/
//         node scripts/kie-image.mjs --credits   (affiche le solde)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const API = "https://api.kie.ai/api/v1";
const UPLOAD = "https://kieai.redpandaai.co/api/file-stream-upload";
// Dossier unique impose par Romeo (22/09/2026) : toute image kie y atterrit.
const OUT_DIR = join(ROOT, "livrables/ecommerce/creas/kie.ai");

// Chaque modele nomme ses champs differemment : on traduit ici, le reste du script ne change pas.
const MODELS = {
  "nano-banana-pro": (o) => ({
    prompt: o.prompt,
    ...(o.refs.length && { image_input: o.refs }),
    aspect_ratio: o.ratio, resolution: o.res, output_format: o.format,
  }),
  "4o-image-api": (o) => ({ prompt: o.prompt, size: o.ratio, ...(o.refs.length && { files_url: o.refs }) }),
};

function readKey() {
  const line = readFileSync(join(ROOT, ".env"), "utf8").split(/\r?\n/).find((l) => l.startsWith("KIE_API_KEY="));
  if (!line) throw new Error("KIE_API_KEY absente du .env");
  return line.slice("KIE_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
}
const KEY = readKey();
const auth = { Authorization: `Bearer ${KEY}` };

async function api(path, init = {}) {
  const res = await fetch(`${API}${path}`, { ...init, headers: { ...auth, "Content-Type": "application/json", ...init.headers } });
  const json = await res.json();
  if (json.code !== 200) throw new Error(`kie ${path} : ${json.code} ${json.msg}`);
  return json.data;
}

// Fichier local -> URL temporaire kie (supprimee apres 3 jours).
async function toUrl(ref) {
  if (/^https?:\/\//.test(ref)) return ref;
  if (!existsSync(ref)) throw new Error(`reference introuvable : ${ref}`);
  const form = new FormData();
  form.append("file", new Blob([readFileSync(ref)]), basename(ref));
  form.append("uploadPath", "zooryn-refs");
  form.append("fileName", basename(ref));
  const res = await fetch(UPLOAD, { method: "POST", headers: auth, body: form });
  const json = await res.json();
  if (!json.success && json.code !== 200) throw new Error(`upload ${ref} : ${json.code} ${json.msg}`);
  return json.data.downloadUrl;
}

function parseArgs(argv) {
  const o = { refs: [], model: "nano-banana-pro", ratio: "4:5", res: "2K", format: "png" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i], v = argv[i + 1];
    if (a === "--credits") o.credits = true;
    else if (a === "--prompt") (o.prompt = v), i++;
    else if (a === "--prompt-file") (o.prompt = readFileSync(v, "utf8")), i++;
    else if (a === "--ref") o.refs.push(v), i++;
    else if (a === "--model") (o.model = v), i++;
    else if (a === "--ratio") (o.ratio = v), i++;
    else if (a === "--res") (o.res = v), i++;
    else if (a === "--format") (o.format = v), i++;
    else if (a === "--out") (o.out = v), i++;
  }
  return o;
}

const o = parseArgs(process.argv.slice(2));
if (o.credits) {
  console.log(`Solde kie.ai : ${await api("/chat/credit")} credits`);
  process.exit(0);
}
if (!o.prompt || !o.out) throw new Error("--prompt (ou --prompt-file) et --out obligatoires");
if (!MODELS[o.model]) throw new Error(`modele non configure : ${o.model} (dispo : ${Object.keys(MODELS).join(", ")})`);

const before = await api("/chat/credit");
o.refs = await Promise.all(o.refs.map(toUrl));
const { taskId } = await api("/jobs/createTask", {
  method: "POST",
  body: JSON.stringify({ model: o.model, input: MODELS[o.model](o) }),
});
console.log(`Tache ${taskId} lancee (${o.model}, ${o.ratio}, ${o.res})`);

const t0 = Date.now();
let task;
while (true) {
  await new Promise((r) => setTimeout(r, 4000));
  task = await api(`/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`);
  if (task.state === "success") break;
  if (task.state === "fail") throw new Error(`generation echouee : ${task.failMsg || task.failCode}`);
  if (Date.now() - t0 > 5 * 60 * 1000) throw new Error(`delai depasse, tache ${taskId} toujours ${task.state}`);
}

const url = JSON.parse(task.resultJson).resultUrls[0];
o.out = join(OUT_DIR, basename(o.out));
writeFileSync(o.out, Buffer.from(await (await fetch(url)).arrayBuffer()));
const after = await api("/chat/credit");
console.log(`OK -> ${o.out} (${Math.round((Date.now() - t0) / 1000)} s, ${before - after} credits, solde ${after})`);
