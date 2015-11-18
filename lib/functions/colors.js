'use strict';

const Levenshtein = require('levenshtein');
const util = require('../util');
const md = require('../md');

const f = {

  /**
   * @function o-lerp(color1, color2, [factor=0.5])
   *
   * @desc
   * Interpolate (blend) `color1` and `color2` by `factor`.
   * The algorhythm used is simple and naive; added here
   * for convenience. For more serious use, see
   * [postcss-color-mix](https://github.com/iamstarkov/postcss-color-mix)
   *
   * @example
   * ```
   * // input
   * o-lerp(#ff0000, rgb(0,0,255,0))
   * // output
   * rgba(128,0,128,0.5)
   * ```
   *
   * @param color1 - CSS rgb, rgba, or hex string
   * @param color2 - CSS rgb, rgba, or hex string
   * @param factor - [0,1] or [0 100%]
   *
   * @return CSS rgba color
   */
  lerp(color1, color2, factor) {
    const c1 = util.colorToArray(color1);
    const c2 = util.colorToArray(color2);
    let c1a, c2a;
    c1a = c1.length === 4 ? c1.pop() : 1;
    c2a = c2.length === 4 ? c2.pop() : 1;
    const a = (c1a+c2a)/2;
    if (factor && factor.endsWith('%')) {
      factor = factor.replace('%', '') * 0.01;
    }
    const mixed = util.lerp(c1, c2, factor);
    mixed.push(a !== undefined ? a : 1);
    return `rgba(${mixed.join()})`;
  },

  /**
   * @function o-mdc(color, shade, [alpha=1])
   *
   * @desc
   * Material design colors accessor
   *
   * @example
   * ```
   * // input
   * o-md(red, 500)
   * // output
   * #f44336
   *
   * // alpha support:
   * // input
   * o-md(red, 500, 0.5)
   * // output
   * rgba(244, 67, 54, 0.5)
   * ```
   *
   * @param color - material design color name
   * @param shade - material design color shade
   * @param [alpha] - range [0 1]
   *
   * @return CSS hex color, or CSS rgba color if `alpha` was passed
   *
   * @alias o-md
   * @alias o-md-color
   */
  mdc(color, shade, alpha) {
    if (color.includes('gray')) {
      color = color.replace('gray', 'grey');
    }
    color = util.dashToCamel(color);
    color = md.materialColors[color][shade];
    if (alpha) {
      color = util.hexToRgb(color);
      color.push(alpha);
      return `rgba(${color.join})`;
    }
    return color;
  },

  /**
   * @function o-cmdc(color)
   *
   * @desc
   * Find the material design color that is closest to `color`.
   *
   * @param color - CSS hex color
   *
   * @return CSS hex color
   *
   * @alias o-closest
   */
  cmdc(color) {
    let min = Infinity;
    let minIndex = 0;
    if (md.flattened.indexOf(color) > -1) return color;
    md.flattened.some((x, i) => {
      const d = new Levenshtein(x, color).distance;
      if (d < min) {
        min = d;
        minIndex = i;
        // if d was zero, then the md.includes call would
        // have worked, therefor, 1 is the next closes match.
        if (d === 1) return true;
      }
      return false;
    });
    return md.flattened[minIndex];
  },

  /**
   * @function o-red(value, [alpha=1])
   *
   * @desc
   * Get a shade of red between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   */
  red(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, 0, 0, ${alpha||1})`;
  },

  /**
   * @function o-orange(value, [alpha=1])
   *
   * @desc
   * Get a shade of orange between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   */
  orange(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, ${clamp(x/2)}, 0, ${alpha||1})`;
  },

  /**
   * @function o-yellow(value, [alpha=1])
   *
   * @desc
   * Get a shade of yellow between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   */
  yellow(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, ${x}, 0, ${alpha||1})`;
  },

  /**
   * @function o-green(value, [alpha=1])
   *
   * @desc
   * Get a shade of green between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   */
  green(x, alpha) {
    x = clamp(x);
    return `rgba(0, ${x}, 0, ${alpha||1})`;
  },

  /**
   * @function o-cyan(value, [alpha=1])
   *
   * @desc
   * Get a shade of cyan between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   */
  cyan(x, alpha) {
    x = clamp(x);
    return `rgba(0, ${x}, ${x}, ${alpha||1})`;
  },

  /**
   * @function o-blue(value, [alpha=1])
   *
   * @desc
   * Get a shade of blue between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   */
  blue(x, alpha) {
    x = clamp(x);
    return `rgba(0, 0, ${x}, ${alpha||1})`;
  },

  /**
   * @function o-violet(value, [alpha=1])
   *
   * @desc
   * Get a shade of violet between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   * @alias o-purple
   */
  violet(x, alpha) {
    x = clamp(x);
    return `rgba(${clamp(x/2)}, 0, ${x}, ${alpha||1})`;
  },

  /**
   * @function o-magenta(value, [alpha=1])
   *
   * @desc
   * Get a shade of magenta between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   * @alias o-pink
   */
  magenta(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, 0, ${x}, ${alpha||1})`;
  },

  /**
   * @function o-gray(value, [alpha=1])
   *
   * @desc
   * Get a shade of gray between 0-255
   *
   * @param value - range [0, 255]
   * @param [alpha] - range [0, 1]
   *
   * @return CSS rgba color
   *
   * @alias o-grayscale
   * @alias o-gray-scale
   * @alias o-grey
   * @alias o-greyscale
   * @alias o-grey-scale
   */
  gray(x, alpha) {
    x = clamp(x);
    x = [x, x, x].join(',');
    return `rgba(${x},${alpha||1})`;
  }
};

// aliases
f.grayscale = f.gray;
f['gray-scale'] = f.gray;
f.grey = f.gray;
f.greyscale = f.gray;
f['grey-scale'] = f.gray;

f.purple = f.violet;
f.pink = f.magenta;

f['md-color'] = f.mdc;
f.md = f.mdc;
f['closest-md-color'] = f.cmdc;
f.cmd = f.cmdc;

module.exports = f;

function clamp(x) {
  x = x > 255 ? 255 : x < 0 ? 0 : x;
  return Math.round(x);
}
