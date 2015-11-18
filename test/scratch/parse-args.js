'use strict';

const parseArgs = require('../../lib/parse-args');

const defaults = new Set([
  ['radius', 0],
  ['top-opacity', 0.3],
  ['bottom-opacity', 0.25],
  ['background-opacity', 0.2]
]);

const pos = parseArgs(defaults, [null, '2px', '0.9', '0.8', '0.7']);
console.log(pos);
console.log('---');

const named = parseArgs(defaults, [null, `(
  background-opacity:0.66,
  top-opacity:0.5,
  bottom-opacity:0.1,
  radius: 4px
);`]);
console.log(named);
