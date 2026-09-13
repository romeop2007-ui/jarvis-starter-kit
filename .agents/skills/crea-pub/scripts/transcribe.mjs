// Transcrit la voix d'une video (langue d'origine) via l'API ElevenLabs Scribe (speech-to-text).
// Etape 1 : extrait la piste audio en mp3 avec ffmpeg-static (upload plus leger).
// Etape 2 : envoie l'audio a ElevenLabs STT (modele scribe_v1).
// Usage : node scripts/transcribe.mjs "chemin/video.mp4" [dossier_sortie]
// Ecrit transcription-source.txt dans le dossier de sortie (si fourni) et imprime le texte.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { elevenFetch } from "./lib.mjs";

const execFileP = promisify(execFile);

async function extractAudio(videoPath) {
  const ffmpeg = (await import("ffmpeg-static")).default;
  const out = join(tmpdir(), `crea-${Date.now()}.mp3`);
  await execFileP(ffmpeg, [
    "-y",
    "-i", videoPath,
    "-vn",                 // pas de video
    "-ac", "1",            // mono
    "-ar", "16000",        // 16 kHz suffit pour la STT
    "-b:a", "64k",
    out,
  ]);
  return out;
}

export async function transcribe(videoPath, outDir) {
  if (!existsSync(videoPath)) throw new Error(`Fichier introuvable : ${videoPath}`);

  const audioPath = await extractAudio(videoPath);
  const buf = readFileSync(audioPath);

  const form = new FormData();
  form.append("model_id", "scribe_v1");
  form.append("file", new Blob([buf], { type: "audio/mpeg" }), "audio.mp3");

  const res = await elevenFetch("/speech-to-text", { method: "POST", body: form });
  const data = await res.json();
  const text = (data.text || "").trim();

  if (outDir) {
    writeFileSync(join(outDir, "transcription-source.txt"), text, "utf8");
  }
  return { text, language: data.language_code || data.language || "inconnue" };
}

if (process.argv[1]?.endsWith("transcribe.mjs")) {
  const file = process.argv[2];
  const outDir = process.argv[3];
  if (!file) {
    console.error('Usage : node scripts/transcribe.mjs "chemin/video.mp4" [dossier_sortie]');
    process.exit(1);
  }
  transcribe(file, outDir)
    .then(({ text, language }) => {
      console.error(`Langue detectee : ${language}`);
      console.log(text);
    })
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
