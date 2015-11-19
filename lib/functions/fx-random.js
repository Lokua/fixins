'use strict';

module.exports = random;

const Random = require('random-js');
const _random = new Random(Random.engines.mt19937().autoSeed());

/**
 * ### `fx-random ([min=0], [max=256], [float=false [, inclusive=false]])`
 *
 * Get a random number between `min` and `max`, inclusive.
 * Random number generation provided by
 * [random-js](https://github.com/ckknight/random-js)
 *
 * #### Params
 * + `min` - range minimum (default = 0)
 * + `max` - output range maximum (default = 255)
 * + `float` - if truthy, output is floating point, default is false (integer output)
 * + `inclusive` - if `float` is true, choose to include 0 and 1 (default false)
 *
 * #### Return
 * + a random integer or floating point number depending on the truthyness of `float`
 */
function random(min, max, float, inclusive) {
  min = min || 0;
  max = max || 256;
  float = !!float;
  return float
    ? _random.real(min, max, inclusive)
    : _random.integer(min, max);
}
