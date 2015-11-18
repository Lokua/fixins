'use strict';

module.exports = size;

/**
 * @mixin fx-size([width], [height=width])
 * @desc
 * Width and height together in one line.
 * Called with 1 arg, height will mimick width (output square).
 * Note that this mixin does not support the named
 * argument syntax as that is completely redundant.
 */
function size(mixin, width, height) {
  width = width || '100%';
  if (height === undefined) height = width;
  return { width, height };
}
