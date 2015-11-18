'use strict';

module.exports = {

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) return result.slice(1).map(x => parseInt(x, 16));
  },

  rgbToHex(rgb) {
    return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
      .toString(16).slice(1);
  },

  colorToArray(str) {
    str = str.trim();
    if (str.startsWith('rgb')) {
      const m = str.match(/[0-9.,\s]+/g);
      return m && m[0].split(',').map((x, i) => {
        return i > 2 ? parseFloat(x) : parseInt(x);
      });
    } else if (str.startsWith('#')) {
      return this.hexToRgb(str);
    }
    throw new Error('unsupported color format');
  },

  lerp(color1, color2, factor) {
    if (!color1 || !color2) {
      throw new Error('lerp needs two [r,g,b] colors');
    }
    factor = factor || 0.5;
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
    }

    return result;
  },

  dashToCamel(str) {
    return str.replace(/-+[a-z]/g, m => m.toUpperCase().replace('-', ''));
  }

};
