const fs = require('fs');
const path = require('path');

const dir = 'src/components/select-v2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let o = c;
  c = c.replace(/ease:\s*'easeOut'/g, "ease: 'easeOut' as const");
  if (c !== o) {
    fs.writeFileSync(f, c);
    console.log('Fixed TS in ' + f);
  }
}
