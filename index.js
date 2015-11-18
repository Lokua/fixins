'use strict';

const fs = require('fs');
const path = require('path');

const mixins = get('lib/mixins');
const _functions = get('lib/functions');

const _colorFunctions = require('./lib/functions/colors.js');
const colorFunctions = {};
// prefix `o-` to color methods
Object.keys(_colorFunctions).forEach(key => {
  colorFunctions[`o-${key}`] = _colorFunctions[key];
});
// add single `o-color` "all access" function
colorFunctions['o-color'] = function color(_color, x, alpha) {
  return colorFunctions[`o-${_color}`](x, alpha);
};

const functions = Object.assign({}, _functions, colorFunctions);

// aliases
mixins['o-list'] = mixins['o-list-unstyled'];
mixins['o-hlist'] = mixins['o-horizontal-list'];

functions['o-golden'] = functions['o-golden-ratio'];

module.exports = { mixins, functions };

function get(dir) {
  dir = path.join(__dirname, dir);
  const ret = {};
  fs.readdirSync(dir).forEach(filename => {
    if (filename.startsWith('o-')) {
      const key = filename.replace('.js', '');
      ret[key] = require(`${dir}/${filename}`);
    }
  });
  return ret;
}
