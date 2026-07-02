// Detecte la bande horizontale "cicatrice" laissee par le detourage Vmake, en analysant le
// profil de luminosite par ligne (moyenne de chaque rangee) sur plusieurs frames, et en
// reperant les deux fronts (haut/bas) ou la luminosite chute brutalement.
// Usage : node scripts/detect-band.mjs "<video.mp4>" [t1,t2,t3]
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);

const video = process.argv[2];
const times = (process.argv[3] || "6,20,34").split(",").map(Number);
const ffmpeg = (await import("ffmpeg-static")).default;

async function rowProfile(t) {
  // reduit la largeur a 1 (moyenne horizontale) -> hauteur H octets gris
  const { stdout } = await execFileP(ffmpeg, [
    "-y", "-ss", String(t), "-i", video, "-frames:v", "1",
    "-vf", "scale=1:ih,format=gray", "-f", "rawvideo", "-",
  ], { encoding: "buffer", maxBuffer: 1 << 24 });
  return new Uint8Array(stdout);
}

const profiles = [];
for (const t of times) { try { profiles.push(await rowProfile(t)); } catch {} }
const H = Math.min(...profiles.map((p) => p.length));
// moyenne des profils sur les frames
const avg = new Float64Array(H);
for (let y = 0; y < H; y++) { let s = 0; for (const p of profiles) s += p[y]; avg[y] = s / profiles.length; }

// gradient vertical (variation de luminosite d'une ligne a l'autre)
const grad = new Float64Array(H);
for (let y = 1; y < H; y++) grad[y] = avg[y] - avg[y - 1];

// On cherche, dans la moitie basse (y 45%-80%), un front descendant (entree dans la bande
// sombre) suivi d'un front montant (sortie). On prend les extremes du gradient dans cette zone.
const lo = Math.floor(H * 0.45), hi = Math.floor(H * 0.82);
let topY = lo, topV = 0, botY = hi, botV = 0;
for (let y = lo; y < hi; y++) {
  if (grad[y] < topV) { topV = grad[y]; topY = y; }   // plus forte chute = haut de bande
}
for (let y = topY; y < hi; y++) {
  if (grad[y] > botV) { botV = grad[y]; botY = y; }    // plus forte remontee = bas de bande
}
console.log(JSON.stringify({ height: H, bandTop: topY, bandBottom: botY, dropStrength: Math.round(-topV), riseStrength: Math.round(botV) }));
