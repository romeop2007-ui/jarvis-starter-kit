import { readFileSync, writeFileSync } from "node:fs";
import { elevenFetch } from "../../../../.claude/skills/crea-pub/scripts/lib.mjs";

const filePath = process.argv[2];
const buf = readFileSync(filePath);

const form = new FormData();
form.append("model_id", "scribe_v1");
form.append("file", new Blob([buf], { type: "audio/mpeg" }), "audio.mp3");
form.append("timestamps_granularity", "word");

const res = await elevenFetch("/speech-to-text", { method: "POST", body: form });
const data = await res.json();
writeFileSync("stt-raw.json", JSON.stringify(data, null, 2), "utf8");
console.log("language:", data.language_code);
console.log("text:", data.text);
console.log("words count:", (data.words || []).length);
console.log(JSON.stringify((data.words || []).slice(0, 15), null, 2));
