'use strict';

const Levenshtein = require('levenshtein');
const util = require('../util');
const md = require('../md');

const f = {

  /**
   * ### `fx-lerp(color, color, [factor=0.5])`
   *
   * Interpolate (blend) `color1` and `color2` by `factor`.
   * The algorhythm used is simple and naive; added here
   * for convenience. For more serious use, see
   * [postcss-color-mix](https://github.com/iamstarkov/postcss-color-mix)
   *
   * #### Example
   * ```
   * // input
   * fx-lerp(#ff0000, rgb(0,0,255,0))
   * // output
   * rgba(128,0,128,0.5)
   * ```
   * #### Params
   * + `color1` - CSS rgb, rgba, or hex string
   * + `color2` - CSS rgb, rgba, or hex string
   * + `[factor=0.5]` - range [0,1] or [0,100%]
   *
   * #### Return
   * + CSS rgba color
   *
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
   * ### `fx-md-color(color1, [shade=500], [alpha])`
   *
   * Material design colors accessor
   *
   * #### Example
   * ```
   * // input
   * fx-md(red, 500)
   * // output
   * #f44336
   *
   * // alpha support:
   * // input
   * fx-md(red, 500, 0.5)
   * // output
   * rgba(244, 67, 54, 0.5)
   * ```
   *
   * #### Params
   * + color - material design color name
   * + shade - material design color shade
   * + [alpha=1] - range [0 1]
   *
   * #### Return
   * + CSS hex color if `alpha` argument is not passed
   * + CSS rgba color if `alpha` was passed
   *
   * ##### Alias
   * + `fx-mdc`
   * + `fx-md`
   *
   */
  mdc(color, shade, alpha) {
    if (color.includes('gray')) {
      color = color.replace('gray', 'grey');
    }
    color = util.dashToCamel(color);
    color = md.materialColors[color][shade || 500];
    if (alpha) {
      color = util.hexToRgb(color);
      color.push(alpha);
      return `rgba(${color.join})`;
    }
    return color;
  },

  /**
   * ### `fx-closest-md-color(color)`
   *
   * Find the material design color that is closest to `color`.
   *
   * #### Params
   * + color - CSS hex color
   *
   * #### Return
   * + CSS hex color
   *
   * ##### Alias
   * + `fx-cmd`
   * + `fx-cmdc`
   * + `fx-closest`
   *
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
   * ### `fx-<red|orange|yellow|green|cyan|blue|violet|magenta|gray>(value, [alpha=1])`
   *
   * Get a shade of <color> between 0-255
   *
   * #### Params
   * + `value` - range [0, 255]
   * + `[alpha=1]` - range [0, 1]
   *
   * #### Return
   * + CSS rgba color
   *
   * ##### Alias
   * + gray: `grayscale`, `gray-scale`, and for you britts: `grey`, `greyscale`, `grey-scale`
   * + violet: `purple`
   * + magenta: `pink`
   */


  red(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, 0, 0, ${alpha||1})`;
  },

  orange(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, ${clamp(x/2)}, 0, ${alpha||1})`;
  },

  yellow(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, ${x}, 0, ${alpha||1})`;
  },

  green(x, alpha) {
    x = clamp(x);
    return `rgba(0, ${x}, 0, ${alpha||1})`;
  },

  cyan(x, alpha) {
    x = clamp(x);
    return `rgba(0, ${x}, ${x}, ${alpha||1})`;
  },

  blue(x, alpha) {
    x = clamp(x);
    return `rgba(0, 0, ${x}, ${alpha||1})`;
  },

  violet(x, alpha) {
    x = clamp(x);
    return `rgba(${clamp(x/2)}, 0, ${x}, ${alpha||1})`;
  },

  magenta(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, 0, ${x}, ${alpha||1})`;
  },

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
f.closest = f.cmdc;
f.cmd = f.cmdc;

module.exports = f;

function clamp(x) {
  x = x > 255 ? 255 : x < 0 ? 0 : x;
  return Math.round(x);
}
