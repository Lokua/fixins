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
const docDelim = '\n\n***\n';
let a = 0;

paths.forEach(dirpath => fs.readdirSync(dirpath).forEach(filename => {
  const source = fs.readFileSync(path.join(dirpath, filename), 'utf8');
  if (filename === 'colors.js') {
    names.push('+ Functions\n');
  } else if (filename === 'fx-ab.js') {
    names.push('\n\n+ Mixins\n');
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
          if (!anameMatch) throw Error('no aname match');
          aname = anameMatch[1];
          if (/[<>]/.test(aname)) {
            aname = aname.replace(/[<>]/g, '');
          }
          names.push(aname);
          // line = `\n<a name="${a}" color="green">\n${line}\n</a>\n`;
          line = line.replace('###', '').replace(/`/g, '');
          line = `\n## <a name="a${a}"></a>${line}\n`;
          a++;
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
  let i = 0;
  names.forEach(n => {
    if (n.startsWith('+') || n.startsWith('\n\n+')) return ret.push(n);
    ret.push(`  + [${n}](#a${i})`);
    i++;
  });
  return ret;
}

function stripStar(line) {
  return line.trim().replace(/^\*\s/, '');
}
