'use strict';

module.exports = listUnstyled;

/**
 * @mixin o-list-unstyled
 */
function listUnstyled(mixin) {
  return {
    'list-style': 'none',
    'padding-left': 0
  };
}
