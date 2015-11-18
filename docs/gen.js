'use strict';

const dox = require('dox');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../lib/functions');
const filenames = fs.readdirSync(dir);

const results = filenames.map(filename => {
  const code = fs.readFileSync(path.join(dir, filename), 'utf8');
  return dox.parseComments(code);
});

const out = [];
results.forEach((result, index) => {
  if (index > 0) return;
  result.forEach(docs => {
    const desc = docs.description.full;
    const html = docs.tags.map(tag => {
      return `#### ${tag.type}: ${tag.html}`;
    }).join('\n');
    out.push(desc+html);
  });
});
console.log(out);

// debug...
fs.writeFileSync(
  path.join(__dirname, 'docs.json'),
  JSON.stringify(results, null, 2)
);
