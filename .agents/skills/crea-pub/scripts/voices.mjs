// Liste les voix disponibles sur le compte ElevenLabs (pour choisir la plus proche de la crea).
// Usage : node scripts/voices.mjs [filtre]
// Affiche id | nom | genre | langue/labels. Le filtre optionnel cherche dans le nom/les labels.

import { elevenFetch } from "./lib.mjs";

export async function listVoices() {
  const res = await elevenFetch("/voices");
  const data = await res.json();
  return data.voices || [];
}

if (process.argv[1]?.endsWith("voices.mjs")) {
  const filtre = (process.argv[2] || "").toLowerCase();
  listVoices()
    .then((voices) => {
      const rows = voices
        .map((v) => ({
          id: v.voice_id,
          name: v.name,
          labels: Object.values(v.labels || {}).join(", "),
        }))
        .filter(
          (r) =>
            !filtre ||
            r.name.toLowerCase().includes(filtre) ||
            r.labels.toLowerCase().includes(filtre)
        );
      if (rows.length === 0) {
        console.log("Aucune voix (verifie la cle API ou le filtre).");
        return;
      }
      for (const r of rows) {
        console.log(`${r.id}  |  ${r.name}  |  ${r.labels}`);
      }
      console.error(`\n${rows.length} voix affichees.`);
    })
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
