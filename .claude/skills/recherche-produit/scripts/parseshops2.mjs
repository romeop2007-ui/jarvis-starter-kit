// Parseur search_shops v2 : anti-doublon lu directement depuis liste-rejetes.md
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REJ_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'references', 'liste-rejetes.md');
const rejTxt = readFileSync(REJ_FILE, 'utf8').toLowerCase();
const rejDomains = new Set(
  (rejTxt.match(/[a-z0-9][a-z0-9.-]*\.(com|de|fr|nl|se|dk|no|fi|it|es|pl|cz|eu|co|store|shop|at|be|ro|pt|ie|uk|top)\b/g) || [])
);
// racine de marque (sans TLD) pour attraper les domaines soeurs
const rejRoots = new Set([...rejDomains].map((d) => d.split('.')[0]).filter((r) => r.length > 4));

const j = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const rows = j.data || [];
const maxAds = Number(process.argv[3] || 900); // au-dela = reseau/gros compte

console.log(
  `n=${rows.length} total=${j.pagination?.total} credits=${j.credits?.creditsRemaining}`
);

let shown = 0;
for (const s of rows) {
  const d = (s.domain || '').toLowerCase();
  const root = d.split('.')[0];
  const seen = rejDomains.has(d) || rejRoots.has(root);
  const ads = s.advertising?.activeAds ?? 0;
  const cur = s.profile?.currency;
  const blind = ['NOK', 'CHF', 'USD'].includes(cur); // loi n°6
  if (seen) { console.log(`- deja-vu: ${d}`); continue; }
  if (ads > maxAds) { console.log(`- gros compte (${ads} ads): ${d}`); continue; }

  shown++;
  const bs = (s.catalog?.bestSellers || [])
    .slice(0, 3)
    .map((b) => `${(b.title || '').slice(0, 46)} ${b.price}${b.currency}`)
    .join(' | ');
  const hist = (s.advertising?.history || []).slice(-9).map((h) => h.value).join('>');
  const top = (s.advertising?.topCountries || [])
    .slice(0, 4)
    .map((c) => `${c.countryCode}${Math.round(c.share * 100)}`)
    .join(',');
  console.log(
    `\n■ ${s.name} | ${d}${blind ? ' ⛔' + cur : ''}\n` +
      `  cree:${(s.createdAt || '').slice(0, 10)} ${s.profile?.countryCode} ${cur} | prod:${s.catalog?.productsCount}\n` +
      `  visits:${s.traffic?.monthlyVisits} | ads:${ads} | PENTE:${hist}\n` +
      `  pays-ads:${top}\n  BS: ${bs}`
  );
}
console.log(`\n=== ${shown} shops a examiner sur ${rows.length} ===`);
