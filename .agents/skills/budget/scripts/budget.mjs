#!/usr/bin/env node
// Moteur de lecture/ecriture du Google Sheet "Investissement E-commerce".
// Utilise le compte de service Google (.google-service-account.json a la racine).
//
// Usage :
//   node budget.mjs read A14:H28          -> affiche les valeurs (formules) d'une plage
//   node budget.mjs values A14:H28         -> affiche les valeurs calculees d'une plage
//   node budget.mjs write "H16=3" "H23=52.4" ...  -> ecrit des cellules (USER_ENTERED)
//
// Regle d'or : n'ecrire QUE des cases d'entree. Ne jamais ecraser une formule
// (CA ligne 21, Total charges ligne 24, Total produit ligne 25, B28).

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const KEY_PATH = path.join(ROOT, '.google-service-account.json');
const SHEET_ID = '1fyhxCFPPbML84eSnb2q_BhbpJY8NF_54xOoigm_pNIM';
const SHEET_NAME = 'Feuille 1';

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
  const startCol = m[1].charCodeAt(0) - 65;
  const startRow = parseInt(m[2], 10);
  rows.forEach((row, i) => {
    const cells = [];
    for (let c = 0; c < row.length; c++) {
      if (row[c] !== '' && row[c] != null) {
        const col = String.fromCharCode(65 + startCol + c);
        cells.push(`${col}${startRow + i}="${row[c]}"`);
      }
    }
    if (cells.length) console.log(cells.join('  |  '));
  });
}

if (mode === 'read' || mode === 'values') {
  const range = args[0] || 'A1:O30';
  const rows = await read(range, mode === 'read' ? 'FORMULA' : 'UNFORMATTED_VALUE');
  printGrid(rows, range.split('!').pop().split(':')[0]);
} else if (mode === 'copyformat') {
  // Copie UNIQUEMENT la mise en forme (couleurs, police, gras, formats de nombre, bordures)
  // d'une plage source vers une plage destination. Ex: node budget.mjs copyformat G14:H27 J14:K27
  const [src, dst] = args;
  if (!src || !dst) { console.error('Usage: node budget.mjs copyformat SRC DST'); process.exit(1); }
  const toGrid = (a1) => {
    const [s, e] = a1.split(':');
    const cell = (ref) => {
      const m = ref.match(/^([A-Z]+)(\d+)$/);
      let col = 0; for (const ch of m[1]) col = col * 26 + (ch.charCodeAt(0) - 64);
      return { col: col - 1, row: parseInt(m[2], 10) - 1 };
    };
    const a = cell(s), b = cell(e);
    return { sheetId: 0, startRowIndex: a.row, endRowIndex: b.row + 1, startColumnIndex: a.col, endColumnIndex: b.col + 1 };
  };
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: { requests: [{ copyPaste: { source: toGrid(src), destination: toGrid(dst), pasteType: 'PASTE_FORMAT' } }] },
  });
  console.log(`OK : mise en forme copiee de ${src} vers ${dst}.`);
} else if (mode === 'write') {
  if (!args.length) { console.error('Rien a ecrire. Ex: node budget.mjs write "H16=3"'); process.exit(1); }
  const data = args.map((a) => {
    const idx = a.indexOf('=');
    if (idx < 0) throw new Error(`Format invalide (attendu CELLULE=VALEUR) : ${a}`);
    const cell = a.slice(0, idx).trim();
    let raw = a.slice(idx + 1);
    // nombre si numerique (virgule FR toleree), sinon texte/formule tel quel
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
