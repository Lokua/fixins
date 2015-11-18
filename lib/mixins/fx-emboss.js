'use strict';

module.exports = emboss;

const parseArgs = require('../parse-args');

// using set as we can't rely on object insertion order
const defaults = new Set([
  ['radius', 0],
  ['top-opacity', 0.3],
  ['bottom-opacity', 0.25],
  ['background-opacity', 0.2]
]);

/**
 * @mixin fx-emboss([radius=0], [top-opacity=0.3], [bottom-opacity=0.25], [background-opacity=0.2])
 * @desc
 * An opinionated emboss effect suitable for square containers.
 * Currently only suitable for light themes.
 */
function emboss() {
  const args = parseArgs(defaults, arguments);
  return {
    'border-radius': args.radius,
    'box-shadow': `inset 0 3px 3px rgba(0, 0, 0, ${args['top-opacity']})`,
    'border-bottom': `1px solid rgba(255, 255, 255, ${args['bottom-opacity']})`,
    background: `rgba(0, 0, 0, ${args['background-opacity']})`
  };
}
