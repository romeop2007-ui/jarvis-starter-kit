// Compacte une sortie search_ads TrendTrack en tableau lisible.
// usage: node parse.mjs <fichier.txt>
import { readFileSync } from 'node:fs';

const raw = readFileSync(process.argv[2], 'utf8');
const j = JSON.parse(raw);

const eur = (n) => (n == null ? '?' : Math.round(n));
const rows = (j.data || []).map((a) => {
  const days = a.daysRunning || 0;
  const spend = a.metrics?.estimatedSpend;
  const perDay = spend && days ? Math.round(spend / days) : null; // FORMULE OFFICIELLE
  return {
    brand: a.advertiser?.name,
    dom: a.content?.landingPageDomain,
    live: a.advertiser?.liveAdsCount,
    fbL: a.advertiser?.facebookLikes,
    reach: a.metrics?.reach,
    d7: a.metrics?.reachDelta7d,
    days,
    eurJ: perDay,
    pays: a.audience?.mainCountry,
    tgt: (a.audience?.targetedCountries || []).slice(0, 4).join('/'),
    url: a.content?.landingPageUrl,
    body: (a.content?.body || '').replace(/\s+/g, ' ').slice(0, 110),
  };
});

console.log(`n=${rows.length}  credits_left=${j.credits?.creditsRemaining}`);
for (const r of rows) {
  console.log(
    `\n■ ${r.brand} | ${r.dom} | ${r.pays} [${r.tgt}]\n` +
      `  ads:${r.live} fbLikes:${r.fbL} | reach:${eur(r.reach)} d7:${eur(r.d7)} | ${r.days}j -> ${r.eurJ}EUR/j\n` +
      `  ${r.url}\n  "${r.body}"`
  );
}
