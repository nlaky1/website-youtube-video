import fs from 'fs';
import path from 'path';

const APP_DIR = path.resolve('.next/server/app');

if (!fs.existsSync(APP_DIR)) {
  console.log('[patch-html-lang] .next/server/app does not exist, skipping.');
  process.exit(0);
}

const LANG_MAP = {
  es: 'es',
  de: 'de',
  'pt-br': 'pt-BR'
};

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allHtml = getAllHtmlFiles(APP_DIR);
let patchedCount = 0;

for (const filePath of allHtml) {
  const rel = path.relative(APP_DIR, filePath);
  
  for (const [prefix, langCode] of Object.entries(LANG_MAP)) {
    if (rel === `${prefix}.html` || rel.startsWith(`${prefix}/`) || rel.startsWith(`${prefix}\\`)) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('<html lang="en"')) {
        content = content.replace('<html lang="en"', `<html lang="${langCode}"`);
        fs.writeFileSync(filePath, content, 'utf8');
        patchedCount++;
      }
      break;
    }
  }
}

console.log(`[patch-html-lang] Successfully patched ${patchedCount} localized HTML files with correct <html lang="...">!`);
