const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = {
  '#8b86be': '#d1de74',
  '#cbd690': '#a1c14b',
  '#ecb761': '#f3ce6e',
  '#deb0bd': '#e0912f',
  '#86abba': '#d35b50',
  '#8B86BE': '#D1DE74',
  '#CBD690': '#A1C14B',
  '#ECB761': '#F3CE6E',
  '#DEB0BD': '#E0912F',
  '#86ABBA': '#D35B50'
};

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const [oldC, newC] of Object.entries(replacements)) {
        newContent = newContent.split(oldC).join(newC);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walkAndReplace(directoryPath);
