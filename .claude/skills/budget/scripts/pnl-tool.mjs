#!/usr/bin/env node
// Outil generique de lecture/ecriture sur le Sheet "P&L - Zecom Academy 2026".
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEY_PATH = '/Users/franv/Desktop/jarvis-starter-kit/.google-service-account.json';
const SHEET_ID = '1bNuSkdCGIH2jM0whvLOfSoVth8nJwvJe6RsHCF6_C8s';

const KEY = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
const auth = new google.auth.GoogleAuth({ credentials: KEY, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
const sheets = google.sheets({ version: 'v4', auth });

const mode = process.argv[2];
const args = process.argv.slice(3);

async function read(range, renderOption) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
    valueRenderOption: renderOption,
  });
  return res.data.values || [];
}

if (mode === 'read' || mode === 'values') {
  const range = args[0];
  const rows = await read(range, mode === 'read' ? 'FORMULA' : 'UNFORMATTED_VALUE');
  console.log(JSON.stringify(rows, null, 1));
} else if (mode === 'sheets') {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  console.log(meta.data.sheets.map(s => s.properties.title).join('\n'));
} else if (mode === 'write') {
  if (!args.length) { console.error('Rien a ecrire. Ex: node pnl-tool.mjs write "Jun-26!Y13=Frais PayPal fournisseur"'); process.exit(1); }
  const data = args.map((a) => {
    const idx = a.indexOf('=');
    if (idx < 0) throw new Error(`Format invalide (attendu CELLULE=VALEUR) : ${a}`);
    const cell = a.slice(0, idx).trim();
    let raw = a.slice(idx + 1);
    const num = Number(raw.replace(',', '.'));
    const value = (raw.trim() !== '' && !isNaN(num) && !raw.startsWith('=')) ? num : raw;
    return { range: cell, values: [[value]] };
  });
  const res = await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: { valueInputOption: 'USER_ENTERED', data },
  });
  console.log(`OK : ${res.data.totalUpdatedCells} cellule(s) ecrite(s).`);
  for (const d of data) console.log('  ', d.range, '=', d.values[0][0]);
} else {
  console.error('Mode inconnu. Utilise : sheets | read | values | write');
  process.exit(1);
}
