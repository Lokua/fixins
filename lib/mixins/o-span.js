'use strict';

module.exports = span;

const parseArgs = require('../parse-args');

const defaults = new Set([
  ['cols', 12],
  ['float', 'left']
]);

/**
 * @mixin o-span([cols=12], [float=left])
 * @desc
 * Dynamically add `$number` of columns to an element.
 * Assumes a 12 column grid with no gutters (no gutters? that's right,
 * using box-sizing:border-box on everything, wrappers for your grid classes
 * and padding for inner content and things become much simpler in grid land).
 */
function span() {
  const args = parseArgs(defaults, arguments);
  return {
    float: args.float,
    width: 100*(args.cols/12) + '%',
  };
}
