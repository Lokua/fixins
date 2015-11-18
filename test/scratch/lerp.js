'use strict';

const fns = require('../../lib/functions/colors');

let c = fns.lerp2('rgba(255,0,0,0.75)', 'rgba(0,0,255,0.25)');
console.log(c);
