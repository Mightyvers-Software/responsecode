// build.js
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const env = nunjucks.configure('src/templates', {
  autoescape: true
});

const pagesDir = 'src/templates/pages';
const distDir = 'dist';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.readdirSync(pagesDir).forEach(file => {
  if (!file.endsWith('.njk')) return;

  const html = env.render(`pages/${file}`);

  const outputFile = path.join(
    distDir,
    file.replace('.njk', '.html')
  );

  fs.writeFileSync(outputFile, html);

  console.log(`Built ${outputFile}`);
});