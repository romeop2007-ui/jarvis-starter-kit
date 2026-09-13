// Detecte la bande "cicatrice" du detourage en comparant la video ORIGINALE et la video
// DETOUREE : les lignes qui different le plus = la zone exacte que Vmake a modifiee.
// Robuste (independant du decor). Sortie JSON : {height, bandTop, bandBottom}.
// Usage : node scripts/detect-band-diff.mjs "<original.mp4>" "<detouree.mp4>" [t1,t2,...]
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);
const ffmpeg = (await import("ffmpeg-static")).default;

const [orig, det] = [process.argv[2], process.argv[3]];
const times = (process.argv[4] || "6,14,22,30,38").split(",").map(Number);

async function rowGray(video, t) {
  const { stdout } = await execFileP(ffmpeg, [
    "-y", "-ss", String(t), "-i", video, "-frames:v", "1",
    "-vf", "scale=1:ih,format=gray", "-f", "rawvideo", "-",
  ], { encoding: "buffer", maxBuffer: 1 << 24 });
  return new Uint8Array(stdout);
}

let H = null;
let diff = null;
let count = 0;
for (const t of times) {
  try {
    const [a, b] = await Promise.all([rowGray(orig, t), rowGray(det, t)]);
    const h = Math.min(a.length, b.length);
    if (H === null) { H = h; diff = new Float64Array(H); }
    for (let y = 0; y < H; y++) diff[y] += Math.abs(a[y] - b[y]);
    count++;
  } catch {}
}
for (let y = 0; y < H; y++) diff[y] /= count;

// seuil = 40% du pic de difference
const peak = Math.max(...diff);
const thr = Math.max(6, peak * 0.4);
let top = -1, bot = -1;
for (let y = 0; y < H; y++) { if (diff[y] >= thr) { if (top === -1) top = y; bot = y; } }
console.log(JSON.stringify({ height: H, bandTop: top, bandBottom: bot, peak: Math.round(peak), thr: Math.round(thr) }));
