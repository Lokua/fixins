'use strict';

module.exports = parseArgs;

/**
 * parse input args to mixin function (catering to both
 * individual positional arguments, or a single string containing named arguments),
 * and merge with mixin's defaults.
 *
 * @param  {Set} defaults - a set of key-value arrays
 * @param  {Arguments} originalArguments - the mixin's `arguments` object
 * @return {Object}
 */
function parseArgs(defaults, originalArguments) {
  let argsString = originalArguments[1];
  if (argsString) argsString = argsString.trim();

  let values = [];
  let args = {};

  // extract values from named vs positional arguments
  if (
      originalArguments.length === 2 &&
      argsString &&
      /^\([\s\S]+\)$/g.test(argsString)
  ) {
    // [0]: 1st key,
    // [1]: 1st value, 2nd key
    // [2]: 2nd val, 3rd key
    // ...[n-1]: last value
    let split = argsString.slice(1, argsString.length-1).split(':');
    let series = [split.shift()];

    // turn series into [key,val,key,val,...]
    split.forEach((str, i) => {

      // [n-1]: last value
      if (i === split.length-1) return series.push(str);

      let l = str.slice(0, str.lastIndexOf(','));
      let r = str.slice(str.lastIndexOf(',')+1);
      series.push(l, r);
    });

    for (let i = 0, l = series.length; i < l; i += 2) {
      args[series[i].trim()] = series[i+1].trim();
    }
    
    // merge with defaults
    for (let entry of defaults.values()) {
      if (!args[entry[0]]) args[entry[0]] = entry[1];
    }

  } else {
    values = Array.from(originalArguments).slice(1);

    // merge with defaults
    for (
        let i = 0,
          dvals = defaults.values(),
          dlen = defaults.size,
          vlen = values.length;
        i < dlen;
        i++
    ) {
      const entry = dvals.next().value;
      if (i < vlen) {
        args[entry[0]] = values[i];
      } else {
        args[entry[0]] = entry[1];
      }
    }
  }

  return args;
}
