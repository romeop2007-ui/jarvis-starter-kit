// Genere la voix off a une vitesse FIXE (pas de boucle d'auto-ajustement, deterministe).
// Usage : node scripts/tts-fixed.mjs --voice <id> --speed <0.9-1.15> --out <dossier> --text-file <f>
// Imprime la duree obtenue. Sert a controler precisement le calage sur la video.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { elevenFetch } from "./lib.mjs";
import { getDuration } from "./duration.mjs";

const args = process.argv.slice(2);
const get = (f) => { const i = args.indexOf(f); return i !== -1 ? args[i + 1] : undefined; };
const voiceId = get("--voice");
const speed = parseFloat(get("--speed") || "1.0");
const outDir = get("--out");
const text = readFileSync(get("--text-file"), "utf8").trim();
const outPath = join(outDir, "voix-off.mp3");

const res = await elevenFetch(`/text-to-speech/${voiceId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "audio/mpeg" },
  body: JSON.stringify({
    text,
    model_id: "eleven_multilingual_v2",
    voice_settings: { stability: 0.5, similarity_boost: 0.75, speed },
  }),
});
writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
console.log((await getDuration(outPath)).toFixed(2));
