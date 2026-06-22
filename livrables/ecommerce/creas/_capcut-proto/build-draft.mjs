import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const BASE_PROJECT = "C:/Users/franv/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft/0604";
const NEW_PROJECT_NAME = "ZOORYN-T4-AD1-TEST";
const NEW_PROJECT_DIR = `C:/Users/franv/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft/${NEW_PROJECT_NAME}`;

const VIDEO_PATH = "C:/Users/franv/Desktop/jarvis-starter-kit/livrables/ecommerce/creas/ressources créas après modifs/T4/AD1/video-sans-soustitres.mp4";
const AUDIO_PATH = "C:/Users/franv/Desktop/jarvis-starter-kit/livrables/ecommerce/creas/ressources créas après modifs/T4/AD1/voix-off.mp3";
const VIDEO_DUR_SEC = 30.33;
const AUDIO_DUR_SEC = 30.28;
const VIDEO_W = 720, VIDEO_H = 1280;

const uuid = () => randomUUID().toUpperCase();
const ms2us = (sec) => Math.round(sec * 1000000); // microseconds (draft units)

// --- 1. charger le brouillon de reference ---
const d = JSON.parse(readFileSync(join(BASE_PROJECT, "draft_content.json"), "utf8"));

// --- 2. VIDEO : garder le 1er clip, jeter le 2e (logo PNG) ---
const videoMat = d.materials.videos[0];
videoMat.path = VIDEO_PATH;
videoMat.duration = ms2us(VIDEO_DUR_SEC);
d.materials.videos = [videoMat];

const videoTrack = d.tracks.find(t => t.type === "video");
const videoSeg = videoTrack.segments[0];
videoSeg.target_timerange = { start: 0, duration: ms2us(VIDEO_DUR_SEC) };
videoSeg.source_timerange = { start: 0, duration: ms2us(VIDEO_DUR_SEC) };
videoSeg.volume = 0; // on coupe le son d'origine
videoTrack.segments = [videoSeg];

// --- 3. AUDIO : remplacer par la voix off ElevenLabs ---
const audioMat = d.materials.audios[0];
audioMat.path = AUDIO_PATH;
audioMat.duration = ms2us(AUDIO_DUR_SEC);
audioMat.name = "voix-off.mp3";
d.materials.audios = [audioMat];

const audioTrack = d.tracks.find(t => t.type === "audio");
const audioSeg = audioTrack.segments[0];
audioSeg.target_timerange = { start: 0, duration: ms2us(AUDIO_DUR_SEC) };
audioSeg.source_timerange = { start: 0, duration: ms2us(AUDIO_DUR_SEC) };
audioTrack.segments = [audioSeg];

// --- 4. TEXTE : reconstruire les sous-titres a partir de la voix off FR ---
const stt = JSON.parse(readFileSync("stt-raw.json", "utf8"));
const items = stt.words || [];

// correction phonetique connue : la marque "Zooryn" est mal transcrite "Zorrine"
for (const it of items) {
  if (it.text && /zorrine/i.test(it.text)) it.text = it.text.replace(/zorrine/i, "Zooryn");
}

// regroupement en legendes courtes (4-5 mots / ~2.2s / coupe a la ponctuation)
const groups = [];
let cur = [];
let curStart = null;
const MAX_WORDS = 5, MAX_DUR = 2.2;
for (const it of items) {
  if (it.type === "word") {
    if (cur.length === 0) curStart = it.start;
    cur.push(it);
    const dur = it.end - curStart;
    const endsClause = /[.,!?;:]$/.test(it.text);
    if (cur.filter(x => x.type === "word").length >= MAX_WORDS || dur >= MAX_DUR || endsClause) {
      groups.push(cur);
      cur = [];
    }
  } else if (cur.length > 0) {
    cur.push(it); // espace interne au groupe en cours
  }
}
if (cur.length) groups.push(cur);
// jeter un espace de fin isole si jamais
for (const g of groups) { while (g.length && g[g.length - 1].type !== "word") g.pop(); }

const textTemplate = d.materials.texts[2]; // style de reference : blanc, contour noir, Prompt-Medium
const textTrack = d.tracks.find(t => t.type === "text");
const textSegTemplate = textTrack.segments[2];

const newTexts = [];
const newSegs = [];

for (const g of groups) {
  const fullText = g.map(it => it.text).join("");
  const start = g[0].start;
  const end = g[g.length - 1].end;

  const mat = JSON.parse(JSON.stringify(textTemplate));
  const id = uuid();
  mat.id = id;
  mat.name = uuid();
  mat.recognize_text = fullText;
  mat.content = JSON.stringify({
    text: fullText,
    styles: [{
      fill: { content: { render_type: "solid", solid: { color: [1, 1, 1] } } },
      font: { path: textTemplate.font_path, id: textTemplate.font_resource_id },
      strokes: [{ content: { render_type: "solid", solid: { color: [0, 0, 0] } }, width: 0.06, mode: 0 }],
      size: textTemplate.font_size,
      useLetterColor: true,
      range: [0, fullText.length],
    }],
  });
  mat.words = {
    start_time: g.map(it => Math.round((it.start - start) * 1000)),
    end_time: g.map(it => Math.round((it.end - start) * 1000)),
    text: g.map(it => it.text),
  };
  mat.language = "fr-FR";
  newTexts.push(mat);

  const seg = JSON.parse(JSON.stringify(textSegTemplate));
  seg.id = uuid();
  seg.material_id = id;
  seg.target_timerange = { start: ms2us(start), duration: ms2us(end - start) };
  seg.source_timerange = null;
  newSegs.push(seg);
}

d.materials.texts = newTexts;
textTrack.segments = newSegs;

// --- 5. duree globale du projet ---
d.duration = Math.max(ms2us(VIDEO_DUR_SEC), ms2us(AUDIO_DUR_SEC));
d.id = uuid();

writeFileSync("draft_content.NEW.json", JSON.stringify(d), "utf8");
console.log("draft_content.NEW.json genere -", newTexts.length, "legendes,", "duree", (d.duration/1e6).toFixed(2), "s");

// --- 6. construire le dossier projet complet (clone 0604 + remplace draft_content.json) ---
function copyRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const t = join(dest, entry);
    if (statSync(s).isDirectory()) copyRecursive(s, t);
    else copyFileSync(s, t);
  }
}
copyRecursive(BASE_PROJECT, NEW_PROJECT_DIR);
writeFileSync(join(NEW_PROJECT_DIR, "draft_content.json"), JSON.stringify(d), "utf8");

// patcher draft_meta_info.json (nom + duree + id) pour que CapCut affiche le bon nom
const metaPath = join(NEW_PROJECT_DIR, "draft_meta_info.json");
const meta = JSON.parse(readFileSync(metaPath, "utf8"));
meta.draft_name = NEW_PROJECT_NAME;
meta.draft_id = d.id;
meta.tm_duration = d.duration;
meta.draft_fold_path = NEW_PROJECT_DIR;
meta.draft_root_path = "C:/Users/franv/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft";
writeFileSync(metaPath, JSON.stringify(meta), "utf8");

console.log("Projet CapCut cree :", NEW_PROJECT_DIR);
