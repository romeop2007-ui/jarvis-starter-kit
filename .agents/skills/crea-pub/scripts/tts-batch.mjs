// Genere un lot de voix off ElevenLabs, un fichier par ligne, avec nom impose.
// Usage : node scripts/tts-batch.mjs <plan.json> <dossier_sortie>
// plan.json = [{ name, voice, text, target, mode }]  mode: "fit" (caler pile) | "cap" (ne pas depasser)
import { readFileSync, writeFileSync, renameSync, existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { elevenFetch } from "./lib.mjs";

const MODEL = "eleven_multilingual_v2";
const SPEED_MIN = 0.9, SPEED_MAX = 1.15;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function dur(p) {
  const out = execFileSync("ffprobe", ["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1", p]);
  return parseFloat(String(out).trim());
}

// Retire les silences en debut et fin (seuil bas, marge conservee).
function trimEdges(p) {
  const tmp = p.replace(/\.mp3$/, ".trim.mp3");
  execFileSync("ffmpeg", ["-v","error","-y","-i",p,
    "-af","silenceremove=start_periods=1:start_duration=0.05:start_threshold=-45dB:detection=peak,areverse,silenceremove=start_periods=1:start_duration=0.05:start_threshold=-45dB:detection=peak,areverse",
    tmp]);
  if (existsSync(tmp) && dur(tmp) > 0.2) { unlinkSync(p); renameSync(tmp, p); }
  else if (existsSync(tmp)) unlinkSync(tmp);
  return dur(p);
}

async function synth(voiceId, text, speed, outPath) {
  const res = await elevenFetch(`/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: { stability: 0.5, similarity_boost: 0.75, speed } }),
  });
  writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
  return trimEdges(outPath);
}

const plan = JSON.parse(readFileSync(process.argv[2], "utf8"));
const outDir = process.argv[3];
const rows = [];

for (const item of plan) {
  const out = join(outDir, `${item.name}.mp3`);
  let speed = item.speed ?? 1.0;
  let got = await synth(item.voice, item.text, speed, out);
  let tries = 1;
  const need = item.mode === "fit"
    ? () => Math.abs(got - item.target) > 0.6
    : () => got > item.target + 0.05;
  while (item.mode !== "fixed" && item.target && need() && tries < 3) {
    speed = clamp(speed * (got / item.target), SPEED_MIN, SPEED_MAX);
    got = await synth(item.voice, item.text, speed, out);
    tries += 1;
    if (speed === SPEED_MIN || speed === SPEED_MAX) break;
  }
  const flag = item.mode === "fixed" ? "FIXE" : item.mode === "fit"
    ? (Math.abs(got - item.target) <= 1 ? "OK" : "ECART")
    : (got <= item.target + 0.05 ? "OK" : "DEPASSE");
  rows.push({ name: item.name, got: got.toFixed(2), target: item.target, speed: speed.toFixed(2), flag });
  console.log(`${item.name.padEnd(10)} ${got.toFixed(2)}s / cible ${String(item.target).padEnd(5)} speed ${speed.toFixed(2)}  ${flag}`);
}
