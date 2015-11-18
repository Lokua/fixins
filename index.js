'use strict';

const fs = require('fs');
const path = require('path');

const mixins = get('lib/mixins');
const _functions = get('lib/functions');

const _colorFunctions = require('./lib/functions/colors.js');
const colorFunctions = {};
// prefix `fx-` to color methods
Object.keys(_colorFunctions).forEach(key => {
  colorFunctions[`fx-${key}`] = _colorFunctions[key];
});
// add single `fx-color` "all access" function
colorFunctions['fx-color'] = function color(_color, x, alpha) {
  return colorFunctions[`fx-${_color}`](x, alpha);
};

const functions = Object.assign({}, _functions, colorFunctions);

// aliases
mixins['fx-list'] = mixins['fx-list-unstyled'];
mixins['fx-hlist'] = mixins['fx-horizontal-list'];

functions['fx-golden'] = functions['fx-golden-ratio'];

module.exports = { mixins, functions };

function get(dir) {
  dir = path.join(__dirname, dir);
  const ret = {};
  fs.readdirSync(dir).forEach(filename => {
    if (filename.startsWith('fx-')) {
      const key = filename.replace('.js', '');
      ret[key] = require(`${dir}/${filename}`);
    }
  });
  return ret;
}
