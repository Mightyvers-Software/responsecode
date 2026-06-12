const fs = require('fs');
const { marked } = require('marked');

let md = fs.readFileSync('readme.md', 'utf8');

md = md.replaceAll(
  './docs/images/',
  '/docs/images/'
);

const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>ResponseCode Documentation</title>

<link rel="stylesheet" href="./css/github-markdown-dark-dimmed.css">

<style>
body{
    background:#212830; 
    margin:0;
    padding-left:40px;
    padding-right:40px;
}

.markdown-body{
    max-width:1000px;
    margin:0 auto;
}
</style>

</head>
<body>

<article class="markdown-body">
${marked.parse(md)}
</article>

</body>
</html>
`;

fs.mkdirSync('docs', { recursive: true });

fs.writeFileSync(
  'docs/index.html',
  html
);

console.log('Generated docs/index.html');