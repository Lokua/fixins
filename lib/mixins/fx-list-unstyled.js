'use strict';

module.exports = listUnstyled;

/**
 * @mixin fx-list-unstyled
 */
function listUnstyled(mixin) {
  return {
    'list-style': 'none',
    'padding-left': 0
  };
}
