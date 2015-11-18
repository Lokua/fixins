'use strict';

const PHI = (1 + Math.sqrt(5)) / 2;

module.exports = goldenRatio;

/**
 * @mixin o-golden-ratio([number=100], [scale=1])
 *
 * @desc
 * Get the golden ratio of `number` recursively scaled
 * `scale` times. A scale setting less then 1 will return
 * the smaller portion.
 *
 * @example
 * ```css
 * o-golden-ratio(30,  1) //=> 48.54102
 * o-golden-ratio(30,  2) //=> 78.54102
 * o-golden-ratio(30, -1) //=> 18.54102
 * o-golden-ratio(30, -2) //=> 11.45898
 * ```
 * @param number - the base number
 * @param scale - the factor to scale `number` by
 * @return The "A" (larger) portion if `number` is positive; "C" otherwise
 * @alias o-golden
 */
function goldenRatio(number, scale) {
  number = number || 100;
  scale = scale || 1;

  let unit = '';

  if (typeof number === 'string') {
    unit = number.replace(/\d/g, '');
    number = number.replace(/\D/g, '');
  }

  let ret = parseFloat(number);
  let n = parseFloat(scale);

  if (scale < 0) {
    while (n < 0) {
      ret = ret * (PHI - 1);
      n++;
    }

  } else if (scale > 0) {
    while (n > 0) {
      ret *= PHI;
      n--;
    }
  }

  return ret + unit;
}
