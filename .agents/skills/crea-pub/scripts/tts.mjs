// Genere la voix off FR via l'API ElevenLabs TTS, puis cale la duree au plus proche de la video.
// Usage :
//   node scripts/tts.mjs --voice <voice_id> --target <secondes> --out <dossier> --text-file <script.txt>
//   (ou --text "le script directement")
// Ecrit voix-off.mp3 dans le dossier de sortie et imprime la duree obtenue.
//
// Calibrage : on genere, on mesure, et si l'ecart depasse la tolerance on ajuste le reglage
// "speed" d'ElevenLabs (borne 0,9 - 1,15) et on regenere, 2 essais max. Honnete : on vise tres
// proche, pas la frame exacte. Le bon levier reste la longueur du script (voir SKILL.md).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { elevenFetch } from "./lib.mjs";
import { getDuration } from "./duration.mjs";

const MODEL = "eleven_multilingual_v2";
const TOLERANCE = 0.6; // secondes d'ecart acceptees
const SPEED_MIN = 0.9;
const SPEED_MAX = 1.15;

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

async function synth({ voiceId, text, speed, outPath }) {
  const body = JSON.stringify({
    text,
    model_id: MODEL,
    voice_settings: { stability: 0.5, similarity_boost: 0.75, speed },
  });
  const res = await elevenFetch(`/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "audio/mpeg" },
    body,
  });
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
  return getDuration(outPath);
}

export async function generateVoiceover({ voiceId, text, targetSec, outDir }) {
  const outPath = join(outDir, "voix-off.mp3");
  let speed = 1.0;
  let got = await synth({ voiceId, text, speed, outPath });
  let tries = 1;

  // Ajuste la vitesse pour se rapprocher de la cible (si une cible est fournie).
  while (targetSec && Math.abs(got - targetSec) > TOLERANCE && tries < 3) {
    // si trop long -> accelerer (>1), si trop court -> ralentir (<1)
    const ratio = got / targetSec;
    speed = clamp(speed * ratio, SPEED_MIN, SPEED_MAX);
    got = await synth({ voiceId, text, speed, outPath });
    tries += 1;
    if (speed === SPEED_MIN || speed === SPEED_MAX) break; // borne atteinte, inutile d'insister
  }

  return { path: outPath, duration: got, speed, target: targetSec || null };
}

if (process.argv[1]?.endsWith("tts.mjs")) {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };
  const voiceId = get("--voice");
  const target = get("--target");
  const outDir = get("--out");
  const textFile = get("--text-file");
  const inlineText = get("--text");
  const text = textFile ? readFileSync(textFile, "utf8").trim() : inlineText;

  if (!voiceId || !outDir || !text) {
    console.error(
      'Usage : node scripts/tts.mjs --voice <id> --out <dossier> (--text-file <f> | --text "...") [--target <sec>]'
    );
    process.exit(1);
  }

  generateVoiceover({ voiceId, text, targetSec: target ? parseFloat(target) : null, outDir })
    .then((r) => {
      console.error(
        `Voix off : ${r.duration.toFixed(2)}s` +
          (r.target ? ` (cible ${r.target}s, vitesse ${r.speed.toFixed(2)})` : "")
      );
      console.log(r.path);
    })
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
