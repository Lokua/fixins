'use strict';

const materialColors = require('material-colors');
const Levenshtein = require('levenshtein');
const util = require('util');

const flattened = [];
const rgbs = [[],[],[]];

Object.keys(materialColors).map(color => {
  if (color === 'white' || color === 'black') return;
  Object.keys(materialColors[color]).map(shade => {
    const c = materialColors[color][shade];
    if (c !== '#ffffff' && c !== '#000000') {
      flattened.push(c.toLowerCase());
    }
  });
});

// no point in these...
// flattened.push('#ffffff', '#000000');

flattened.sort();

module.exports = {
  materialColors,
  flattened
};
