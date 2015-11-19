'use strict';

module.exports = str;

/**
 * ### `fx-str([input])`
 *
 * Wrap input as string, ensures output
 * in css is wrapped in quotes.
 *
 * #### Params
 * + `input` - anything
 *
 * #### Return
 * + "`input`"
 */
function str(input) {
  return `"${input}"`;
}
