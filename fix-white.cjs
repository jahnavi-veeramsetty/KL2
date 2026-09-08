const fs = require('fs');
const path = require('path');

const dir = 'src/components/select-v2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let o = c;

  // 1. bg-white on section
  c = c.replace(/<section([^>]*) bg-white/g, '<section$1 bg-transparent');
  // 2. remaining bg-white inside classes
  c = c.replace(/bg-white/g, 'bg-panel');
  // 3. other stray colors
  c = c.replace(/bg-\[#F5F6F8\]/g, 'bg-raised');
  c = c.replace(/border-\[#F5F6F8\]/g, 'border-line');
  c = c.replace(/bg-\[#16204D\]/g, 'bg-accent/20');
  c = c.replace(/text-\[#E2E4E9\]/g, 'text-subtle');
  c = c.replace(/border-\[#1A1B1E\]/g, 'border-line-strong');
  c = c.replace(/border-white/g, 'border-line-strong');
  c = c.replace(/text-white/g, 'text-strong'); // replace any remaining text-white with text-strong so it matches theme

  if (c !== o) {
    fs.writeFileSync(f, c);
    console.log('Fixed styles in ' + f);
  }
}
