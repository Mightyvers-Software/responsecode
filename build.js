const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const { minify } = require('html-minifier-terser');

const isProd = process.env.NODE_ENV === 'production';

const env = nunjucks.configure('src/templates', {
  autoescape: true
});

const pagesDir = 'src/templates/pages';
const distDir = 'dist';
const cssFile = path.join(distDir, 'css', 'main.css');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

let inlineCss = '';
if (isProd && fs.existsSync(cssFile)) {
  inlineCss = fs.readFileSync(cssFile, 'utf8');
}

fs.readdirSync(pagesDir).forEach(async (file) => {
  if (!file.endsWith('.njk')) return;

  let html = env.render(`pages/${file}`, {
    inlineCss,
    isProd
  });

  if (isProd) {
    html = await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true
    });
  }

  const outputFile = path.join(distDir, file.replace('.njk', '.html'));
  fs.writeFileSync(outputFile, html);

  console.log(`Built ${outputFile}`);
});