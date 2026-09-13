// Compacte une sortie search_shops TrendTrack : pente d'ads + prix best-seller.
import { readFileSync } from 'node:fs';
const j = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const rows = j.data || [];
const REJ = /mirelia|chillneck|belmont|dasana|strykr|almapure|ergosteg|slimstep|pearcehaley|kkkoxx|vitalshop|cumpario|biocyte|vanisia|elyndra|monveree|lavina|muvcollection|vysioneyewear|palmsite|ariellera|sivora|semori|heim-zauber|maisonvantier|nextgen|splashandray|babilo|huber-outdoor|exovella|mavaro|velt-ro|shomathy|staydries|scandicbeam|vivalyo|klynero|nattly|reeest|pleene|sennly|calina|lunebo|scarletintimates|lenceriarosa|waxclean|kura|hayesandporter|daalenco|brackenbrands|labottegaonly|pastrate|cottoncartel|balkanblood|korean-essence|nordicgrowlab|sanne-printables|gesundheit-im-alltag|thenovagel|crobavault|ahriet|shoppalast|enthuellungmj|calmy|hofschild|alessandrovaretti|maison-swanee|faith-path|kopchant|confortelle|verador|petloom/i;

console.log(`n=${rows.length} total=${j.pagination?.total} credits=${j.credits?.creditsRemaining}`);
for (const s of rows) {
  const known = REJ.test(s.domain) ? ' [DEJA-VU]' : '';
  const bs = (s.catalog?.bestSellers || [])
    .slice(0, 3)
    .map((b) => `${b.title?.slice(0, 42)} ${b.price}${b.currency}`)
    .join(' | ');
  const hist = (s.advertising?.history || []).slice(-8).map((h) => h.value).join('>');
  const th = (s.traffic?.history || []).slice(-4).map((h) => h.value).join('>');
  console.log(
    `\n■ ${s.name} | ${s.domain}${known}\n` +
      `  cree:${(s.createdAt || '').slice(0, 10)} ${s.profile?.countryCode} ${s.profile?.currency} | prod:${s.catalog?.productsCount} cat:${s.catalog?.mainCategory}\n` +
      `  visits:${s.traffic?.monthlyVisits} (${th}) | ads:${s.advertising?.activeAds} PENTE:${hist}\n` +
      `  BS: ${bs}`
  );
}
