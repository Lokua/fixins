'use strict';

module.exports = horizontalList;

const parseArgs = require('../parse-args');

/**
 * @mixin fx-horizontal-list
 * @desc
 * Bare bones horizontal list. Note that this mixin
 * is meant to be placed directly under a `ul|ol` or
 * class placed directly on a `ul|ol`
 */
function horizontalList() {
  return {
    'list-style-type': 'none',
    display: 'inline-block',
    'padding-left': 0,
    '> li': {
      display: 'inline-block',
      float: 'left'
    }
  };
}
