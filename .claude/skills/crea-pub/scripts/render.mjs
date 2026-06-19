// Pipeline image local (gratuit) : efface le texte/logo d'origine via LaMa (IOPaint),
// puis repose le texte FR et le logo Zooryn par-dessus avec canvas. Sortie = image finale.
//
// Usage : node scripts/render.mjs <spec.json>
// Le spec decrit tout (voir structure plus bas). C'est Claude qui remplit le spec a partir
// de sa lecture de l'image (zones, textes FR, placements).
//
// Structure du spec :
// {
//   "source": "chemin/image.jpg",
//   "out": "chemin/finale.png",
//   "erase":  [ {x,y,w,h}, ... ],            // zones effacees par LaMa (texte/logo sur photo)
//   "fills":  [ {x,y,w,h,color,radius?}, ],  // rectangles pleins (bandeaux/pastilles unis)
//   "texts":  [ {content,x,y,size,color,font?,weight?,align?,maxWidth?,lineHeight?} ],
//   "logos":  [ {file,x,y,w} ]               // logo Zooryn a coller (largeur w, hauteur auto)
// }

import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import { makeMask } from "./mask.mjs";

const IOPAINT_EXE = join(
  process.env.LOCALAPPDATA || join(process.env.USERPROFILE, "AppData", "Local"),
  "Programs", "Python", "Python312", "Scripts", "iopaint.exe"
);

// Enregistre la police Manrope si on la trouve dans les assets du theme (sinon fallback systeme).
function registerBrandFont() {
  const candidates = [
    join(process.cwd(), "..", "..", "..", "livrables", "ecommerce", "boutiques", "zooryn-dawn", "assets", "Manrope-Bold.ttf"),
  ];
  for (const c of candidates) {
    if (existsSync(c)) {
      try { GlobalFonts.registerFromPath(c, "Manrope"); return "Manrope"; } catch {}
    }
  }
  return null;
}

async function lamaErase(source, rects) {
  if (!rects || rects.length === 0) return source; // rien a effacer
  const work = mkdtempSync(join(tmpdir(), "crea-render-"));
  const imgDir = join(work, "img"); const maskDir = join(work, "mask"); const outDir = join(work, "out");
  for (const d of [imgDir, maskDir, outDir]) mkdirSync(d, { recursive: true });
  const pngIn = join(imgDir, "shot.png");
  await sharp(source).png().toFile(pngIn);
  await makeMask(pngIn, join(maskDir, "shot.png"), rects, { pad: 5 });

  const res = spawnSync(IOPAINT_EXE, [
    "run", "--model=lama", "--device=cpu",
    `--image=${imgDir}`, `--mask=${maskDir}`, `--output=${outDir}`,
  ], { encoding: "utf8" });
  if (res.status !== 0) {
    throw new Error("IOPaint a echoue : " + (res.stderr || res.stdout || "code " + res.status));
  }
  const cleaned = join(outDir, "shot.png");
  if (!existsSync(cleaned)) throw new Error("IOPaint : pas de sortie produite.");
  return cleaned;
}

function wrapLines(ctx, text, maxWidth) {
  if (!maxWidth) return text.split("\n");
  const out = [];
  for (const para of text.split("\n")) {
    const words = para.split(/\s+/);
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line) { out.push(line); line = w; }
      else line = test;
    }
    out.push(line);
  }
  return out;
}

export async function render(spec) {
  const brandFont = registerBrandFont();
  const cleaned = await lamaErase(spec.source, spec.erase);

  const base = await loadImage(cleaned);
  const W = base.width, H = base.height;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(base, 0, 0);

  // 1) bandeaux/pastilles pleins
  for (const f of spec.fills || []) {
    ctx.fillStyle = f.color;
    if (f.radius) roundRect(ctx, f.x, f.y, f.w, f.h, f.radius), ctx.fill();
    else ctx.fillRect(f.x, f.y, f.w, f.h);
  }

  // 2) textes FR
  for (const t of spec.texts || []) {
    const font = t.font || brandFont || "sans-serif";
    const weight = t.weight || "bold";
    ctx.font = `${weight} ${t.size}px ${font}`;
    ctx.fillStyle = t.color || "#ffffff";
    ctx.textAlign = t.align || "left";
    ctx.textBaseline = "top";
    const lineHeight = t.lineHeight || Math.round(t.size * 1.15);
    const lines = wrapLines(ctx, t.content, t.maxWidth);
    lines.forEach((ln, i) => ctx.fillText(ln, t.x, t.y + i * lineHeight));
  }

  // 3) logo Zooryn
  for (const lg of spec.logos || []) {
    const img = await loadImage(lg.file);
    const ratio = img.height / img.width;
    const w = lg.w; const h = Math.round(w * ratio);
    ctx.drawImage(img, lg.x, lg.y, w, h);
  }

  // 4) overlays dessines en dernier (barres de soulignement/rature, accents)
  for (const o of spec.overlays || []) {
    ctx.fillStyle = o.color;
    if (o.radius) roundRect(ctx, o.x, o.y, o.w, o.h, o.radius), ctx.fill();
    else ctx.fillRect(o.x, o.y, o.w, o.h);
  }

  writeFileSync(spec.out, canvas.toBuffer("image/png"));
  return { out: spec.out, width: W, height: H };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

if (process.argv[1]?.endsWith("render.mjs")) {
  const specPath = process.argv[2];
  if (!specPath) { console.error("Usage : node scripts/render.mjs <spec.json>"); process.exit(1); }
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  render(spec)
    .then((r) => console.log(`Image finale : ${r.out} (${r.width}x${r.height})`))
    .catch((e) => { console.error(e.message); process.exit(1); });
}
