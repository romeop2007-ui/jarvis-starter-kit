// F74 — Regroupe une ou plusieurs sorties search_ads PAR PRODUIT (landingPageUrl normalisée)
// et compte les créas >=70 EUR/j sur chaque produit. Anti-doublon lu dans liste-rejetes.md.
// usage: node group-par-produit.mjs <fichier1.json> [fichier2.json ...]
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REJ = join(dirname(fileURLToPath(import.meta.url)), '..', 'references', 'liste-rejetes.md');
const rejTxt = readFileSync(REJ, 'utf8').toLowerCase();
const rej = new Set(
  rejTxt.match(/[a-z0-9][a-z0-9.-]*\.(com|de|fr|nl|se|dk|no|fi|it|es|pl|cz|eu|store|shop|at|be|ro|pt|ie|uk|gr|hu|bg)\b/g) || []
);

const norm = (u) => {
  try { const x = new URL(u); return x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/$/, ''); }
  catch { return u || '?'; }
};

const groups = new Map();
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  for (const a of j.data || []) {
    const days = a.daysRunning || 0;
    const sp = a.metrics?.estimatedSpend;
    const perDay = sp && days ? sp / days : 0; // FORMULE OFFICIELLE spend/daysRunning
    const key = norm(a.content?.landingPageUrl);
    const dom = (a.content?.landingPageDomain || '').replace(/^www\./, '');
    if (!groups.has(key)) groups.set(key, { dom, key, brand: a.advertiser?.name, fb: a.advertiser?.facebookLikes, live: a.advertiser?.liveAdsCount, ads: [], body: '' });
    const g = groups.get(key);
    g.ads.push({ d: days, e: Math.round(perDay), st: a.status, c: a.audience?.mainCountry });
    if (!g.body) g.body = (a.content?.body || '').replace(/\s+/g, ' ').slice(0, 120);
  }
}

const rows = [...groups.values()].map((g) => {
  const seen = new Set();
  const uniq = g.ads.filter((a) => { const k = a.d + '|' + a.e; if (seen.has(k)) return false; seen.add(k); return true; });
  return { ...g, n70: uniq.filter((a) => a.e >= 70 && a.st === 'active').length, nAds: uniq.length, uniq };
}).sort((a, b) => b.n70 - a.n70 || b.nAds - a.nAds);

console.log(`produits=${rows.length}  (n70 ne compte que les créas ACTIVES >=70 EUR/j)`);
for (const r of rows) {
  console.log(
    `${rej.has(r.dom) ? '☠REJ' : '★NEW'} [${r.n70}x>=70E/j actives sur ${r.nAds}] ${r.dom} | ${r.brand} fb:${r.fb} live:${r.live}\n` +
    `   ${r.key}\n   ${r.uniq.map((a) => `${a.e}E/j(${a.d}j,${a.st[0]},${a.c})`).join(' ')}\n   "${r.body}"`
  );
}
