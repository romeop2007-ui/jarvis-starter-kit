#!/usr/bin/env node
// Moteur de lecture/ecriture du Google Sheet "tableau de recherche produit".
// Utilise le compte de service Google (.google-service-account.json a la racine,
// meme compte que le skill budget : budget-bot@claude-gws-setup-497511.iam.gserviceaccount.com).
//
// Usage :
//   node tableau.mjs read A1:BJ20          -> affiche les valeurs (formules) d'une plage
//   node tableau.mjs values A1:BJ20        -> affiche les valeurs calculees d'une plage
//   node tableau.mjs write "A9=Nom produit" "B9=https://..." ...  -> ecrit des cellules (USER_ENTERED)

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const KEY_PATH = path.join(ROOT, '.google-service-account.json');
const SHEET_ID = '173DPSZbX7X99voxgI_889YKntAOl-vvDOyxdpMDLAUg';
const SHEET_NAME = 'Products';

const KEY = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
const auth = new google.auth.GoogleAuth({ credentials: KEY, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
const sheets = google.sheets({ version: 'v4', auth });

const mode = process.argv[2];
const args = process.argv.slice(3);

function qualify(range) {
  return range.includes('!') ? range : `${SHEET_NAME}!${range}`;
}

async function read(range, renderOption) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: qualify(range),
    valueRenderOption: renderOption,
  });
  return res.data.values || [];
}

function printGrid(rows, startRange) {
  const m = (startRange.match(/([A-Z]+)(\d+)/) || [null, 'A', '1']);
  const startRow = parseInt(m[2], 10);
  rows.forEach((row, i) => {
    const cells = [];
    for (let c = 0; c < row.length; c++) {
      if (row[c] !== '' && row[c] != null) {
        let col = '', n = c;
        do { col = String.fromCharCode(65 + (n % 26)) + col; n = Math.floor(n / 26) - 1; } while (n >= 0);
        cells.push(`${col}${startRow + i}="${row[c]}"`);
      }
    }
    if (cells.length) console.log(cells.join('  |  '));
  });
}

if (mode === 'read' || mode === 'values') {
  const range = args[0] || 'A1:BJ20';
  const rows = await read(range, mode === 'read' ? 'FORMULA' : 'UNFORMATTED_VALUE');
  printGrid(rows, range.split('!').pop().split(':')[0]);
} else if (mode === 'write') {
  if (!args.length) { console.error('Rien a ecrire. Ex: node tableau.mjs write "A9=Nom produit"'); process.exit(1); }
  const data = args.map((a) => {
    const idx = a.indexOf('=');
    if (idx < 0) throw new Error(`Format invalide (attendu CELLULE=VALEUR) : ${a}`);
    const cell = a.slice(0, idx).trim();
    let raw = a.slice(idx + 1);
    const num = Number(raw.replace(',', '.'));
    const value = (raw.trim() !== '' && !isNaN(num) && !raw.startsWith('=')) ? num : raw;
    return { range: qualify(cell), values: [[value]] };
  });
  const res = await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: { valueInputOption: 'USER_ENTERED', data },
  });
  console.log(`OK : ${res.data.totalUpdatedCells} cellule(s) ecrite(s).`);
  for (const d of data) console.log('  ', d.range, '=', d.values[0][0]);
} else {
  console.error('Mode inconnu. Utilise : read | values | write');
  process.exit(1);
}
