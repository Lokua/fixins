'use strict';

let str = '(color:rgba(0,0,0,0.1),background:rgb(1,1,1),opacity:0.1)';

str = str.slice(1, str.length-1);

// [0]: 1st key,
// [1]: 1st value, 2nd key
// [2]: 2nd val, 3rd key
// ...[n-1]: last value
let split = str.split(':');

let series = [split.shift()];

split.forEach((str, i) => {

  // [n-1]: last value
  if (i === split.length-1) return series.push(str);

  let l = str.slice(0, str.lastIndexOf(','));
  let r = str.slice(str.lastIndexOf(',')+1);
  series.push(l, r);
});

const args = {};
for (let i = 0, l = series.length; i < l; i += 2) {
  args[series[i]] = series[i+1];
}

console.log(args);
