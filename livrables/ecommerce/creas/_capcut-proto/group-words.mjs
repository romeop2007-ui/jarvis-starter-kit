import { readFileSync, writeFileSync } from "node:fs";
const data = JSON.parse(readFileSync("stt-raw.json", "utf8"));
const words = (data.words || []).filter(w => w.type === "word");

const groups = [];
let cur = [];
let curStart = null;
const MAX_WORDS = 5;
const MAX_DUR = 2.2;

for (const w of words) {
  if (cur.length === 0) curStart = w.start;
  cur.push(w);
  const dur = w.end - curStart;
  const endsClause = /[.,!?;:]$/.test(w.text);
  if (cur.length >= MAX_WORDS || dur >= MAX_DUR || endsClause) {
    groups.push(cur);
    cur = [];
  }
}
if (cur.length) groups.push(cur);

const captions = groups.map(g => ({
  text: g.map(w => w.text).join(" "),
  start: g[0].start,
  end: g[g.length - 1].end,
}));

writeFileSync("captions.json", JSON.stringify(captions, null, 2), "utf8");
console.log(captions.length, "groupes");
for (const c of captions) console.log(`[${c.start.toFixed(2)}-${c.end.toFixed(2)}] ${c.text}`);
