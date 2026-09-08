const fs = require('fs');
const path = require('path');

const dir = 'src/components/select-v2';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace top-level bg-* classes on sections/navs/footers
  content = content.replace(/<section([^>]*) bg-page/g, '<section$1 bg-transparent');
  content = content.replace(/<section([^>]*) bg-panel/g, '<section$1 bg-transparent');
  content = content.replace(/<section([^>]*) bg-raised/g, '<section$1 bg-transparent');
  
  content = content.replace(/<nav([^>]*) bg-page/g, '<nav$1 bg-transparent border-b border-white\/10 backdrop-blur-md');
  content = content.replace(/<footer([^>]*) bg-page/g, '<footer$1 bg-transparent');
  content = content.replace(/<footer([^>]*) bg-panel/g, '<footer$1 bg-transparent');
  content = content.replace(/<footer([^>]*) bg-raised/g, '<footer$1 bg-transparent');

  // Any remaining generic bg-page on section
  content = content.replace(/className="([^"]*)bg-page([^"]*)"/g, (match, p1, p2) => {
    if (match.includes('<section')) return match; // Already handled
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated transparent bg in ${file}`);
  }
}
