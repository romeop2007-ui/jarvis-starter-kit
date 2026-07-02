// Genere un brouillon CapCut (draft_content.json) pour une pub ADn d'un lot crea-pub,
// sans aucun pilotage souris/clavier. Deux types de pub, traites differemment :
//   - "voice"    : pub avec voix off (voix-off.mp3 present) -> sous-titres mot a mot
//                  generes depuis la voix off (STT ElevenLabs), son d'origine coupe.
//   - "musical"  : pub musicale/muette (accroches-fr.md present) -> accroches FR reposees
//                  aux memes moments/positions que l'original, son d'origine CONSERVE.
// Usage :
//   node scripts/capcut-draft.mjs --lot T4 --ad AD2 [--type voice|musical] [--register]
// Le type est auto-detecte (voix-off.mp3 -> voice, accroches-fr.md -> musical) si omis.
// --register inscrit le nouveau projet dans root_meta_info.json (CapCut le voit alors
// sans "chemin inhabituel"). Sans --register, CapCut detecte aussi tout seul un dossier
// de brouillon depose sur le disque (a verifier a l'ouverture).

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync, existsSync, rmSync } from "node:fs";
import { join, basename } from "node:path";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { elevenFetch, FINAL_ROOT } from "./lib.mjs";
import { getDuration } from "./duration.mjs";

const execFileP = promisify(execFile);
async function getDimensions(filePath) {
  const ffprobe = (await import("ffprobe-static")).default;
  const { stdout } = await execFileP(ffprobe.path || ffprobe, [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-of", "csv=p=0:s=x", filePath,
  ]);
  const [width, height] = stdout.trim().split("x").map(Number);
  return { width, height };
}

const CAPCUT_ROOT = "C:/Users/franv/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft";
const BASE_PROJECT_NAME = "0604"; // projet de reference (9:16, 1 video + 1 piste texte + 1 piste audio)
const BASE_PROJECT_DIR = join(CAPCUT_ROOT, BASE_PROJECT_NAME);

const uuid = () => randomUUID().toUpperCase();
const ms2us = (sec) => Math.round(sec * 1000000);
// CapCut stocke tous les chemins en "/" dans draft_content.json, meme sur Windows. node:path
// join()/resolve() y mettent des "\\" : a utiliser seulement pour les vrais appels fs, JAMAIS
// pour une valeur ecrite dans le JSON du brouillon (sinon CapCut affiche le projet dans la
// liste mais ne charge pas le materiau au clic - bug rencontre et corrige le 23/06).
const toPosix = (p) => p.replace(/\\/g, "/");
// "local_material_id" est la cle du cache media interne de CapCut (proxy/decodage/miniature),
// distincte de l'id du materiau dans le projet. Si on la garde telle que clonee depuis le
// template, CapCut associe le NOUVEAU fichier au cache d'un ANCIEN fichier (duree/resolution
// differentes) -> vignette rouge "..." et plantage a l'export (bug reel rencontre le 23/06).
// Toujours regenerer une nouvelle id (format minuscule, comme CapCut le fait lui-meme).
const lowerUuid = () => randomUUID();

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : undefined; };
  return { lot: get("--lot"), ad: get("--ad")?.toUpperCase(), type: get("--type"), register: args.includes("--register") };
}

function copyRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const t = join(dest, entry);
    if (statSync(s).isDirectory()) copyRecursive(s, t);
    else copyFileSync(s, t);
  }
}

// Corrige la transcription phonetique de la marque "Zooryn" (souvent mal entendue par la STT).
function fixZoorynSpelling(text) {
  // Couvre les variantes phonetiques entendues par la STT : Zorrine, Zooreen, Zohrin...
  return text.replace(/\bzo+h?r+[iey]+n?e?\b/gi, "Zooryn");
}

// Regroupe des mots horodates (STT) en legendes courtes (4-5 mots / ~2.2s / coupe a la ponctuation).
function groupWords(items, { maxWords = 5, maxDur = 2.2 } = {}) {
  const groups = [];
  let cur = [];
  let curStart = null;
  for (const it of items) {
    if (it.type === "word") {
      if (cur.length === 0) curStart = it.start;
      cur.push(it);
      const dur = it.end - curStart;
      const endsClause = /[.,!?;:]$/.test(it.text);
      if (cur.filter((x) => x.type === "word").length >= maxWords || dur >= maxDur || endsClause) {
        groups.push(cur);
        cur = [];
      }
    } else if (cur.length > 0) {
      cur.push(it);
    }
  }
  if (cur.length) groups.push(cur);
  for (const g of groups) { while (g.length && g[g.length - 1].type !== "word") g.pop(); }
  return groups;
}

// Parse le tableau markdown d'accroches-fr.md : | Ordre | ~temps | origine | FR | Position | Hierarchie |
function parseAccrochesMd(mdPath) {
  const txt = readFileSync(mdPath, "utf8");
  const rows = [];
  for (const line of txt.split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) continue;
    const cols = line.split("|").slice(1, -1).map((c) => c.trim());
    if (cols.length < 6) continue;
    const [ordre, temps, , textFr, position, hierarchy] = cols;
    if (!/^\d+$/.test(ordre)) continue; // ignore l'entete et la ligne de separation ---
    const m = temps.match(/([\d.,]+)\s*-\s*([\d.,]+)/);
    if (!m || !textFr) continue;
    rows.push({
      start: parseFloat(m[1].replace(",", ".")),
      end: parseFloat(m[2].replace(",", ".")),
      textFr,
      position,
      hierarchy,
    });
  }
  return rows;
}

// Style (taille police + position verticale) d'apres la colonne Hierarchie/Position du tableau.
// Reglages approximatifs : Romeo ajuste a l'oeil dans CapCut si besoin.
function styleForRow(row) {
  let fontSize = 22, scale = 0.38; // defaut = taille legende standard du template
  if (/gros titre/i.test(row.hierarchy)) { fontSize = 26; scale = 0.62; }
  else if (/titre moyen/i.test(row.hierarchy)) { fontSize = 24; scale = 0.5; }
  else if (/sous-titre/i.test(row.hierarchy)) { fontSize = 22; scale = 0.4; }

  let y = -0.56; // defaut = bas (legende classique)
  if (/sous le titre/i.test(row.position)) y = -0.18;
  else if (/centre/i.test(row.position)) y = 0;
  else if (/haut/i.test(row.position)) y = 0.58;

  return { fontSize, scale, y };
}

function wrapTwoLines(text, position) {
  if (!/2 lignes/i.test(position)) return text;
  const words = text.split(" ");
  if (words.length < 4) return text;
  const mid = Math.ceil(words.length / 2);
  return words.slice(0, mid).join(" ") + "\n" + words.slice(mid).join(" ");
}

function makeTextMaterial(template, { text, words, language = "fr-FR" }) {
  const mat = JSON.parse(JSON.stringify(template));
  mat.id = uuid();
  mat.name = uuid();
  mat.recognize_text = text;
  const style = JSON.parse(template.content).styles[0];
  mat.content = JSON.stringify({
    text,
    styles: [{
      fill: { content: { render_type: "solid", solid: { color: [1, 1, 1] } } },
      font: { path: style.font.path, id: style.font.id },
      strokes: [{ content: { render_type: "solid", solid: { color: [0, 0, 0] } }, width: 0.06, mode: 0 }],
      size: style.size,
      useLetterColor: true,
      range: [0, text.length],
    }],
  });
  mat.words = words || { start_time: [], end_time: [], text: [] };
  mat.language = language;
  return mat;
}

async function buildVoiceType({ lot, ad, adDir, videoPath, audioPath, captionAudioPath }) {
  // audioPath = piste audio POSEE dans la timeline (peut etre voix-sur-musique.mp3 = voix FR +
  // musique de fond d'origine, voix etrangere retiree). captionAudioPath = fichier utilise pour
  // la STT des sous-titres : toujours la VOIX SEULE (voix-off.mp3), sinon la musique brouille la
  // transcription. Si captionAudioPath absent, on retombe sur audioPath.
  const sttPath = captionAudioPath && existsSync(captionAudioPath) ? captionAudioPath : audioPath;
  const videoDur = await getDuration(videoPath);
  const audioDur = await getDuration(audioPath);

  console.log(`Type VOICE : video ${videoDur.toFixed(2)}s, piste audio ${audioDur.toFixed(2)}s (${basename(audioPath)}), sous-titres depuis ${basename(sttPath)}`);
  if (Math.abs(videoDur - audioDur) > 1.5) {
    console.warn(`Ecart > 1.5s entre video et piste audio : Vmake a pu raccourcir la video, la fin d'audio depassera (a rogner dans CapCut).`);
  }

  console.log("STT de la voix (ElevenLabs)...");
  const buf = readFileSync(sttPath);
  const form = new FormData();
  form.append("model_id", "scribe_v1");
  form.append("file", new Blob([buf], { type: "audio/mpeg" }), "audio.mp3");
  form.append("timestamps_granularity", "word");
  const res = await elevenFetch("/speech-to-text", { method: "POST", body: form });
  const stt = await res.json();
  const items = (stt.words || []);
  for (const it of items) if (it.text) it.text = fixZoorynSpelling(it.text);

  const groups = groupWords(items);

  const d = JSON.parse(readFileSync(join(BASE_PROJECT_DIR, "draft_content.json"), "utf8"));

  const videoMat = d.materials.videos[0];
  videoMat.path = toPosix(videoPath);
  videoMat.duration = ms2us(videoDur);
  videoMat.local_material_id = lowerUuid();
  videoMat.material_name = basename(videoPath);
  d.materials.videos = [videoMat];
  const videoTrack = d.tracks.find((t) => t.type === "video");
  const videoSeg = videoTrack.segments[0];
  videoSeg.target_timerange = { start: 0, duration: ms2us(videoDur) };
  videoSeg.source_timerange = { start: 0, duration: ms2us(videoDur) };
  videoSeg.volume = 0; // son d'origine coupe, remplace par la voix off
  videoTrack.segments = [videoSeg];

  const audioMat = d.materials.audios[0];
  audioMat.path = toPosix(audioPath);
  audioMat.local_material_id = lowerUuid();
  audioMat.duration = ms2us(audioDur);
  audioMat.name = basename(audioPath);
  d.materials.audios = [audioMat];
  const audioTrack = d.tracks.find((t) => t.type === "audio");
  const audioSeg = audioTrack.segments[0];
  audioSeg.target_timerange = { start: 0, duration: ms2us(audioDur) };
  audioSeg.source_timerange = { start: 0, duration: ms2us(audioDur) };
  audioTrack.segments = [audioSeg];

  const textTemplate = d.materials.texts[0];
  const textTrack = d.tracks.find((t) => t.type === "text");
  const textSegTemplate = textTrack.segments[0];

  // Si une bande de masquage a ete posee sur la trace du detourage (bande.json ecrit par la
  // pose de la bande noire), on cale les sous-titres SUR cette bande (captionY), pour couvrir
  // proprement la zone et faire un bandeau naturel. Sinon position par defaut du template (bas).
  const bandePath = join(adDir, "bande.json");
  let captionY = null;
  if (existsSync(bandePath)) {
    try { captionY = JSON.parse(readFileSync(bandePath, "utf8")).captionY; } catch {}
  }

  const newTexts = [], newSegs = [];
  for (const g of groups) {
    const fullText = g.map((it) => it.text).join("");
    const start = g[0].start, end = g[g.length - 1].end;
    const mat = makeTextMaterial(textTemplate, {
      text: fullText,
      words: {
        start_time: g.map((it) => Math.round((it.start - start) * 1000)),
        end_time: g.map((it) => Math.round((it.end - start) * 1000)),
        text: g.map((it) => it.text),
      },
    });
    newTexts.push(mat);
    const seg = JSON.parse(JSON.stringify(textSegTemplate));
    seg.id = uuid();
    seg.material_id = mat.id;
    seg.target_timerange = { start: ms2us(start), duration: ms2us(end - start) };
    seg.source_timerange = null;
    if (captionY !== null && seg.clip && seg.clip.transform) seg.clip.transform.y = captionY;
    newSegs.push(seg);
  }
  d.materials.texts = newTexts;
  textTrack.segments = newSegs;
  d.duration = Math.max(ms2us(videoDur), ms2us(audioDur));

  return { d, totalCaptions: newTexts.length };
}

async function buildMusicalType({ lot, ad, adDir, videoPath, mdPath }) {
  const videoDur = await getDuration(videoPath);
  const rows = parseAccrochesMd(mdPath);
  console.log(`Type MUSICAL : video ${videoDur.toFixed(2)}s, ${rows.length} accroches lues depuis accroches-fr.md`);
  if (rows.length === 0) {
    throw new Error(`Aucune ligne de tableau trouvee dans ${mdPath} (verifier le format).`);
  }

  const d = JSON.parse(readFileSync(join(BASE_PROJECT_DIR, "draft_content.json"), "utf8"));

  const videoMat = d.materials.videos[0];
  videoMat.path = toPosix(videoPath);
  videoMat.duration = ms2us(videoDur);
  videoMat.local_material_id = lowerUuid();
  videoMat.material_name = basename(videoPath);
  d.materials.videos = [videoMat];
  const videoTrack = d.tracks.find((t) => t.type === "video");
  const videoSeg = videoTrack.segments[0];
  videoSeg.target_timerange = { start: 0, duration: ms2us(videoDur) };
  videoSeg.source_timerange = { start: 0, duration: ms2us(videoDur) };
  videoSeg.volume = 1; // PAS de voix off ici : on garde la musique/le son d'origine
  videoTrack.segments = [videoSeg];

  // Pas de voix off -> pas de piste audio separee.
  d.materials.audios = [];
  const audioTrack = d.tracks.find((t) => t.type === "audio");
  audioTrack.segments = [];

  const textTemplate = d.materials.texts[0];
  const textTrack = d.tracks.find((t) => t.type === "text");
  const textSegTemplate = textTrack.segments[0];

  const newTexts = [], newSegs = [];
  for (const row of rows) {
    const start = row.start, end = Math.min(row.end, videoDur);
    if (end <= start) continue;
    const text = wrapTwoLines(row.textFr, row.position);
    const { fontSize, scale, y } = styleForRow(row);

    const mat = makeTextMaterial(textTemplate, { text });
    const style = JSON.parse(mat.content).styles[0];
    style.size = fontSize;
    mat.content = JSON.stringify({ text, styles: [style] });
    newTexts.push(mat);

    const seg = JSON.parse(JSON.stringify(textSegTemplate));
    seg.id = uuid();
    seg.material_id = mat.id;
    seg.target_timerange = { start: ms2us(start), duration: ms2us(end - start) };
    seg.source_timerange = null;
    seg.clip.transform.y = y;
    seg.clip.scale = { x: scale, y: scale };
    newSegs.push(seg);
  }
  d.materials.texts = newTexts;
  textTrack.segments = newSegs;
  d.duration = ms2us(videoDur);

  return { d, totalCaptions: newTexts.length };
}

function registerDraft(NEW_DIR, meta) {
  const rootMetaPath = join(CAPCUT_ROOT, "root_meta_info.json");
  const root = JSON.parse(readFileSync(rootMetaPath, "utf8"));
  root.all_draft_store = root.all_draft_store.filter((e) => e.draft_fold_path !== NEW_DIR);
  const template = root.all_draft_store.find((e) => e.draft_fold_path.replace(/\\/g, "/").endsWith(`/${BASE_PROJECT_NAME}`));
  const entry = JSON.parse(JSON.stringify(template));
  entry.draft_fold_path = NEW_DIR;
  entry.draft_cover = `${NEW_DIR}/draft_cover.jpg`;
  entry.draft_id = meta.draft_id;
  entry.draft_name = meta.draft_name;
  entry.tm_duration = meta.tm_duration;
  entry.tm_draft_create = Date.now() * 1000;
  entry.tm_draft_modified = Date.now() * 1000;
  root.all_draft_store.push(entry);
  root.draft_ids = (root.draft_ids || 0) + 1;
  writeFileSync(rootMetaPath, JSON.stringify(root), "utf8");
  console.log(`Inscrit dans root_meta_info.json, total drafts : ${root.all_draft_store.length}`);
}

async function main() {
  const { lot, ad, type: typeArg, register } = parseArgs();
  if (!lot || !ad) {
    console.error("Usage : node scripts/capcut-draft.mjs --lot T4 --ad AD2 [--type voice|musical] [--register]");
    process.exit(1);
  }
  const adDir = join(FINAL_ROOT, lot, ad);
  if (!existsSync(adDir)) throw new Error(`Dossier introuvable : ${adDir}`);

  const videoPath = join(adDir, "video-sans-soustitres.mp4");
  const voixOffPath = join(adDir, "voix-off.mp3");
  const comboPath = join(adDir, "voix-sur-musique.mp3");
  const mdPath = join(adDir, "accroches-fr.md");
  if (!existsSync(videoPath)) throw new Error(`video-sans-soustitres.mp4 manquant dans ${adDir}`);

  // Piste audio posee : si voix-sur-musique.mp3 existe (voix FR + musique de fond conservee),
  // on la prefere a la voix seule -> le rendu garde la musique sans la voix etrangere.
  const audioPath = existsSync(comboPath) ? comboPath : voixOffPath;

  const type = typeArg || (existsSync(voixOffPath) ? "voice" : existsSync(mdPath) ? "musical" : null);
  if (!type) throw new Error("Type indetectable : ni voix-off.mp3 ni accroches-fr.md dans ce dossier.");

  const { d, totalCaptions } =
    type === "voice"
      ? await buildVoiceType({ lot, ad, adDir, videoPath, audioPath, captionAudioPath: voixOffPath })
      : await buildMusicalType({ lot, ad, adDir, videoPath, mdPath });

  d.id = uuid();

  // Largeur/hauteur reelles du fichier final (le template 0604 met 720x1280 par defaut,
  // a corriger si la video source a un autre format).
  const { width, height } = await getDimensions(videoPath);
  const videoMatFinal = d.materials.videos[0];
  videoMatFinal.width = width;
  videoMatFinal.height = height;

  // IMPORTANT : concatenation en "/" (pas node:path join, qui mettrait des "\\" sur Windows
  // et casserait la comparaison de chemin dans root_meta_info.json -> entree dupliquee).
  const NEW_PROJECT_NAME = `ZOORYN-${lot}-${ad}`;
  const NEW_PROJECT_DIR = `${CAPCUT_ROOT}/${NEW_PROJECT_NAME}`;
  copyRecursive(BASE_PROJECT_DIR, NEW_PROJECT_DIR);

  // Le dossier clone du template contient des caches miroirs de SON ANCIEN contenu (la cle :
  // Timelines/<id>/ porte le nom de l'ID DU TEMPLATE, jamais renomme ni mis a jour -> CapCut
  // ouvre la fiche projet mais l'edition/l'export utilisent un cache perime -> plantage
  // silencieux (bug majeur rencontre le 23/06). Plus sur et plus simple que de re-synchroniser
  // chaque fichier a la main : supprimer ces caches derives pour forcer CapCut a les
  // reconstruire proprement a partir du VRAI draft_content.json au premier chargement.
  for (const stale of ["Timelines", "template.tmp", "template-2.tmp", "timeline_layout.json", "draft_content.json.bak"]) {
    rmSync(join(NEW_PROJECT_DIR, stale), { recursive: true, force: true });
  }

  writeFileSync(join(NEW_PROJECT_DIR, "draft_content.json"), JSON.stringify(d), "utf8");

  const metaPath = join(NEW_PROJECT_DIR, "draft_meta_info.json");
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  meta.draft_name = NEW_PROJECT_NAME;
  meta.draft_id = d.id;
  meta.tm_duration = d.duration;
  meta.draft_fold_path = NEW_PROJECT_DIR;
  meta.draft_root_path = CAPCUT_ROOT;

  // CapCut a aussi besoin de retrouver chaque materiau dans draft_meta_info.json
  // (draft_materials, type 0 = bibliotheque de ressources) avec le MEME id que dans
  // draft_content.json. Sans cette entree, le projet s'affiche dans la liste CapCut mais
  // l'ouverture ne fait rien (bug reel rencontre le 23/06 sur AD1/AD2-5, absent seulement
  // du brouillon de TEST qui ouvrait correctement).
  const newMaterialEntries = [{
    ai_group_type: "", create_time: -1, duration: videoMatFinal.duration, enter_from: 0,
    extra_info: basename(videoPath), file_Path: videoMatFinal.path, height, id: videoMatFinal.id,
    import_time: -1, import_time_ms: -1, item_source: 1, md5: "", metetype: "video",
    roughcut_time_range: { duration: videoMatFinal.duration, start: 0 },
    sub_time_range: { duration: -1, start: -1 }, type: 0, width,
  }];
  if (d.materials.audios[0]) {
    const audioMatFinal = d.materials.audios[0];
    newMaterialEntries.push({
      ai_group_type: "", create_time: -1, duration: audioMatFinal.duration, enter_from: 0,
      extra_info: basename(audioPath), file_Path: audioMatFinal.path, height: 0, id: audioMatFinal.id,
      import_time: -1, import_time_ms: -1, item_source: 1, md5: "", metetype: "music",
      roughcut_time_range: { duration: audioMatFinal.duration, start: 0 },
      sub_time_range: { duration: -1, start: -1 }, type: 0, width: 0,
    });
  }
  const lib = meta.draft_materials.find((g) => g.type === 0);
  lib.value = [...newMaterialEntries, ...lib.value];

  // Taille reelle des fichiers sur le disque (cosmetique pour la liste CapCut, mais on evite
  // de laisser la valeur du template 0604 qui ne correspond a rien).
  meta.draft_timeline_materials_size_ =
    statSync(videoPath).size + (existsSync(audioPath) ? statSync(audioPath).size : 0);

  writeFileSync(metaPath, JSON.stringify(meta), "utf8");

  console.log(`Projet CapCut cree (${type}) : ${NEW_PROJECT_DIR} - ${totalCaptions} legende(s), duree ${(d.duration / 1e6).toFixed(2)}s`);

  if (register) registerDraft(NEW_PROJECT_DIR, meta);
  else console.log("Pas inscrit dans root_meta_info.json (relancer avec --register si CapCut ne le voit pas tout seul).");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
