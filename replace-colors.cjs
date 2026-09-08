const fs = require('fs');
const path = require('path');

const dir = 'src/components/select-v2';
const pagePath = 'src/pages/KnowvationSelectPage.tsx';

const replacements = [
  { from: /bg-\[#0A0A0B\]/g, to: 'bg-page' },
  { from: /bg-\[#1A1B1E\]/g, to: 'bg-raised' },
  { from: /bg-\[#FFFFFF\]/g, to: 'bg-panel' },
  { from: /text-\[#0A0A0B\]/g, to: 'text-strong' },
  { from: /text-\[#1A1B1E\]/g, to: 'text-body' },
  { from: /text-\[#2447D1\]/g, to: 'text-accent' },
  { from: /text-\[#2F5CFF\]/g, to: 'text-accent' },
  { from: /bg-\[#2F5CFF\]/g, to: 'bg-accent' },
  { from: /bg-\[#2447D1\]/g, to: 'bg-accent-strong' },
  { from: /border-\[#2447D1\]/g, to: 'border-accent' },
  { from: /border-\[#2F5CFF\]/g, to: 'border-accent' },
  { from: /border-\[#0A0A0B\]/g, to: 'border-line-strong' },
  { from: /border-\[#E2E4E9\]/g, to: 'border-line' },
  { from: /bg-\[#E2E4E9\]/g, to: 'bg-line' },
  { from: /bg-\[#EDF1FF\]/g, to: 'bg-accent/10' }, // tinted background
  { from: /text-\[#6B7280\]/g, to: 'text-faint' },
  { from: /border-\[rgba\(255,255,255,0\.1\)\]/g, to: 'border-line' },
  { from: /border-\[rgba\(255,255,255,0\.05\)\]/g, to: 'border-line' },
  { from: /border-\[rgba\(255,255,255,0\.3\)\]/g, to: 'border-line-strong' },
  { from: /bg-\[rgba\(255,255,255,0\.1\)\]/g, to: 'bg-line' },
  { from: /bg-\[rgba\(255,255,255,0\.05\)\]/g, to: 'bg-line/50' },
  { from: /text-\[rgba\(255,255,255,0\.7\)\]/g, to: 'text-subtle' },
  { from: /text-\[rgba\(255,255,255,0\.5\)\]/g, to: 'text-faint' },
  { from: /text-\[rgba\(255,255,255,0\.3\)\]/g, to: 'text-faint opacity-60' },
  { from: /border-\[rgba\(47,92,255,0\.2\)\]/g, to: 'border-accent/20' },
];

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }

  // Also replace some hardcoded font stuff if needed, but Tailwind 'font-inter' is fine.
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));
files.push(pagePath);

for (const file of files) {
  processFile(file);
}
