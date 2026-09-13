#!/usr/bin/env node
/**
 * Valide un template Shopify (JSON) contre les schémas réels du thème Shrine Pro
 * AVANT de le pousser, pour éviter le "pushed with errors" que le CLI n'explique jamais.
 *
 * Détecte les 3 causes réelles de rejet rencontrées sur Titanox (08/08/2026) :
 *   1. valeur de `select` hors des options du schéma
 *   2. valeur de `range` qui ne respecte pas le `step` (le piège invisible)
 *   3. type de bloc non accepté par sa section/son bloc parent
 *
 * Usage :
 *   node .claude/skills/fiche-produit/scripts/validate-template.mjs \
 *     livrables/ecommerce/boutiques/zooryn-shrine/templates/product.<slug>.json
 *
 * Sortie : code 0 si valide, 1 sinon (donc chaînable avant un `theme push`).
 */

import fs from 'fs';
import path from 'path';

const THEME_DIR = 'livrables/ecommerce/boutiques/zooryn-shrine';

const cache = {};
function schema(kind, type) {
  const key = kind + ':' + type;
  if (key in cache) return cache[key];
  const p = path.join(THEME_DIR, kind, type + '.liquid');
  if (!fs.existsSync(p)) return (cache[key] = null);
  const m = fs.readFileSync(p, 'utf8').match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (!m) return (cache[key] = null);
  try { return (cache[key] = JSON.parse(m[1])); } catch { return (cache[key] = null); }
}

const errs = [];

function checkSettings(label, sch, settings) {
  if (!sch || !settings) return;
  const defs = Object.fromEntries((sch.settings || []).filter(s => s.id).map(s => [s.id, s]));
  for (const [k, v] of Object.entries(settings)) {
    const d = defs[k];
    if (!d) continue; // setting inconnu : Shopify l'ignore, pas bloquant
    if (d.type === 'select') {
      if (!(d.options || []).some(o => o.value === v)) {
        errs.push(`${label} > ${k}: "${v}" invalide — attendu : ${(d.options || []).map(o => o.value).join(' | ')}`);
      }
    } else if (d.type === 'range') {
      if (typeof v !== 'number') {
        errs.push(`${label} > ${k}: "${v}" doit être un nombre`);
      } else if (v < d.min || v > d.max) {
        errs.push(`${label} > ${k}: ${v} hors bornes ${d.min}..${d.max}`);
      } else {
        const steps = (v - d.min) / d.step;
        if (Math.abs(steps - Math.round(steps)) > 1e-9) {
          const lo = d.min + Math.floor(steps) * d.step;
          const hi = lo + d.step;
          errs.push(`${label} > ${k}: ${v} ne respecte pas le step ${d.step} (base ${d.min}) — prendre ${lo} ou ${hi}`);
        }
      }
    } else if (d.type === 'checkbox' && typeof v !== 'boolean') {
      errs.push(`${label} > ${k}: "${v}" doit être un booléen`);
    }
  }
}

function walkBlocks(label, parentSch, container) {
  const accepts = parentSch && parentSch.blocks ? parentSch.blocks.map(b => b.type) : null;
  for (const [id, blk] of Object.entries(container.blocks || {})) {
    const lbl = `${label} > ${blk.type}[${id}]`;
    if (blk.type.startsWith('shopify://apps/')) continue; // bloc d'app tierce : pas de schéma local
    if (accepts && accepts.length && !accepts.includes(blk.type) && !accepts.includes('@app')) {
      errs.push(`${lbl}: type de bloc NON ACCEPTÉ ici — autorisés : ${accepts.join(', ')}`);
    }
    let sch = schema('blocks', blk.type);
    if (!sch && parentSch && parentSch.blocks) {
      sch = parentSch.blocks.find(b => b.type === blk.type) || null; // bloc local à la section
    }
    if (!sch) errs.push(`${lbl}: schéma introuvable (type de bloc inexistant ?)`);
    checkSettings(lbl, sch, blk.settings);
    if (blk.blocks) walkBlocks(lbl, sch, blk);
  }
}

const file = process.argv[2];
if (!file) {
  console.error('Usage : node validate-template.mjs <chemin/vers/template.json>');
  process.exit(2);
}

let j;
try {
  j = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\/\*[\s\S]*?\*\//, ''));
} catch (e) {
  console.error('❌ JSON invalide : ' + e.message);
  process.exit(1);
}

for (const [sid, s] of Object.entries(j.sections || {})) {
  const lbl = `section ${sid}(${s.type})`;
  const sch = schema('sections', s.type);
  if (!sch) { errs.push(`${lbl}: section introuvable dans le thème`); continue; }
  checkSettings(lbl, sch, s.settings);
  walkBlocks(lbl, sch, s);
}

if (errs.length) {
  console.log(`❌ ${errs.length} problème(s) — le push serait rejeté :`);
  errs.forEach(e => console.log('  - ' + e));
  process.exit(1);
}
console.log('✅ template valide — push possible');
