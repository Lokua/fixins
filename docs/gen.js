'use strict';

const fs = require('fs');
const path = require('path');

const paths = [
  path.join(__dirname, '/../lib/functions'),
  path.join(__dirname, '/../lib/mixins')
];

const functions = [];
const mixins = [];
const names = [];
const docDelim = '\n***\n';

paths.forEach(dirpath => fs.readdirSync(dirpath).forEach(filename => {
  const source = fs.readFileSync(path.join(dirpath, filename), 'utf8');
  if (filename === 'colors.js') {
    names.push('+ Functions\n');
  } else if (filename === 'fx-ab.js') {
    names.push('+ Mixins\n');
  }
  let docs = parseComments(source);
  if (dirpath.includes('functions')) {
    if (filename === 'colors.js') {
      docs = docs.join(docDelim);
    }
    functions.push(docs);
  } else {
    mixins.push(docs);
  }
}));

let out = `
# API (Table of Contents)

${linkifyNames().join('\n')}

## Functions

${functions.join(docDelim)}

## Mixins

${mixins.join(docDelim)}
`;

fs.writeFile(__dirname + '/docs.md', out, 'utf8', err => {
  if (!err) console.log('docs written');
});


function parseComments(code) {
  const lines = code.split('\n');
  const docs = [];
  let i = 0;
  while (i++ < lines.length-1) {
    let doc = [];
    if (lines[i].trim().startsWith('/**')) {
      i++;
      while (!lines[i].trim().startsWith('*/')) {
        let line = stripStar(lines[i]);
        // turn name into anchor
        if (/^###\s`fx-.+`/.test(line)) {
          const anameMatch = line.match(/^###\s`([a-z-<>|]+)(?=\(.+)*|/);
          let aname = '';
          if (anameMatch) {
            aname = anameMatch[1];
            if (/[<>]/.test(aname)) {
              aname = aname.replace(/[<>]/g, '');
            }
            names.push(aname);
          };
          line = `\n<a name="${aname}" style="font-size:22px;color:cornflowerblue">\n${line}\n</a>\n`;
        }
        if (line === '*') line = '\n';
        doc.push(line);
        i++;
      }
      docs.push(doc.join('\n'));
    }
  }
  return docs;
}

function linkifyNames() {
  const ret = [];
  for (let n of names) {
    if (n.startsWith('+')) ret.push(n);
    else ret.push(`  + [${n}](#${n})`);
  }
  return ret;
}

function stripStar(line) {
  return line.trim().replace(/^\*\s/, '');
}
