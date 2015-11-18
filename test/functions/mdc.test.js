import test from 'ava';
import c from '../../lib/functions/colors';
import materialColors from '../../node_modules/material-colors/dist/colors.js';

const mdc = c.mdc;

test('mdc', t => {
  t.same(mdc('red', 500), materialColors.red['500']);
  t.end();
});
