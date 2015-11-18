'use strict';

module.exports = random;

const Random = require('random-js');
const _random = new Random(Random.engines.mt19937().autoSeed());

/**
 * @function o-random ([min=0], [max=256], [float=false [, inclusive=false]])
 * @desc
 * Get a random number between `min` and `max`, inclusive.
 * Random number generation provided by
 * [random-js](https://github.com/ckknight/random-js)
 * @param min - range minimum (default = 0)
 * @param max - output range maximum (default = 255)
 * @param float - if truthy, output is floating point, default is false (integer output)
 * @param inclusive - if `float` is true, choose to include 0 and 1 (default false)
 */
function random(min, max, float, inclusive) {
  min = min || 0;
  max = max || 256;
  float = !!float;
  return float
    ? _random.real(min, max, inclusive)
    : _random.integer(min, max);
}
