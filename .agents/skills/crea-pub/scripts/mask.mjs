// Genere un masque PNG (noir = garder, blanc = effacer) aux dimensions d'une image source.
// Les zones a effacer sont des rectangles {x,y,w,h} en pixels (origine haut-gauche).
// Usage CLI : node scripts/mask.mjs <image_source> <mask_out> "x,y,w,h" "x,y,w,h" ...
// Aussi exporte makeMask() pour le pipeline.

import sharp from "sharp";
import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "node:fs";

export async function makeMask(srcPath, outPath, rects, { pad = 4 } = {}) {
  const meta = await sharp(srcPath).metadata();
  const W = meta.width;
  const H = meta.height;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#ffffff";
  for (const r of rects) {
    const x = Math.max(0, r.x - pad);
    const y = Math.max(0, r.y - pad);
    const w = Math.min(W - x, r.w + pad * 2);
    const h = Math.min(H - y, r.h + pad * 2);
    ctx.fillRect(x, y, w, h);
  }
  writeFileSync(outPath, canvas.toBuffer("image/png"));
  return { width: W, height: H, count: rects.length };
}

function parseRect(s) {
  const [x, y, w, h] = s.split(",").map((n) => parseInt(n.trim(), 10));
  return { x, y, w, h };
}

if (process.argv[1]?.endsWith("mask.mjs")) {
  const [src, out, ...rectArgs] = process.argv.slice(2);
  if (!src || !out || rectArgs.length === 0) {
    console.error('Usage : node scripts/mask.mjs <image> <mask_out> "x,y,w,h" ...');
    process.exit(1);
  }
  makeMask(src, out, rectArgs.map(parseRect))
    .then((r) => console.log(`Masque ${r.width}x${r.height}, ${r.count} zone(s) -> ${out}`))
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
