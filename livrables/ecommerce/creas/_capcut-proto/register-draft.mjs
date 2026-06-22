import { readFileSync, writeFileSync } from "node:fs";

const ROOT_DIR = "C:/Users/franv/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft";
const rootMetaPath = `${ROOT_DIR}/root_meta_info.json`;
const NEW_NAME = "ZOORYN-T4-AD1-TEST";
const NEW_DIR = `${ROOT_DIR}/${NEW_NAME}`;

const root = JSON.parse(readFileSync(rootMetaPath, "utf8"));
const newMeta = JSON.parse(readFileSync(`${NEW_DIR}/draft_meta_info.json`, "utf8"));

root.all_draft_store = root.all_draft_store.filter(e => e.draft_fold_path !== NEW_DIR);

const template = root.all_draft_store.find(e => e.draft_fold_path.replace(/\\/g, "/").endsWith("/0604"));
const entry = JSON.parse(JSON.stringify(template));
entry.draft_fold_path = NEW_DIR;
entry.draft_cover = `${NEW_DIR}/draft_cover.jpg`;
entry.draft_id = newMeta.draft_id;
entry.draft_name = newMeta.draft_name;
entry.tm_duration = newMeta.tm_duration;
entry.tm_draft_create = Date.now() * 1000;
entry.tm_draft_modified = Date.now() * 1000;

root.all_draft_store.push(entry);
root.draft_ids = (root.draft_ids || 0) + 1;

writeFileSync(rootMetaPath, JSON.stringify(root), "utf8");
console.log("Entree ajoutee au manifest, total drafts:", root.all_draft_store.length);
