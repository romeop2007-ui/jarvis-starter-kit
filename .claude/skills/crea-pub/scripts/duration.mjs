// Mesure la duree (en secondes) d'un fichier video/audio via ffprobe-static.
// Usage : node scripts/duration.mjs "chemin/vers/video.mp4"
// Sortie : la duree en secondes (nombre) sur stdout.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";

const execFileP = promisify(execFile);

export async function getDuration(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Fichier introuvable : ${filePath}`);
  }
  const ffprobe = (await import("ffprobe-static")).default;
  const ffprobePath = ffprobe.path || ffprobe;
  const { stdout } = await execFileP(ffprobePath, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);
  const sec = parseFloat(String(stdout).trim());
  if (!Number.isFinite(sec)) {
    throw new Error(`Duree illisible pour ${filePath} (sortie ffprobe : ${stdout})`);
  }
  return sec;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("duration.mjs")) {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage : node scripts/duration.mjs "chemin/video.mp4"');
    process.exit(1);
  }
  getDuration(file)
    .then((sec) => {
      console.log(sec.toFixed(2));
    })
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
