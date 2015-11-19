'use strict';

module.exports = boxShadow;

const parseArgs = require('../parse-args');

const defaults = new Set([['color', 'rgba(0, 0, 0, 0.25)']]);

/**
 * ### `fx-box-shadow([color=rgba(0, 0, 0, 0.25)])`
 */
function boxShadow() {
  const color = parseArgs(defaults, arguments).color;
  return {
    'box-shadow': `0px 1px 2px 1px ${color}`
  };
}
