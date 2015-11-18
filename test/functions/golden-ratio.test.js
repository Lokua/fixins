import test from 'ava';
import goldenRatio from '../../lib/functions/o-golden-ratio';

test('goldenRatio', t => {
  const results = [
    goldenRatio(30, 1),
    goldenRatio(30, 2),
    goldenRatio(30, -1),
    goldenRatio(30, -2)
  ].map(x => parseFloat(x).toFixed(5));
  t.same(results, [48.54102, 78.54102, 18.54102, 11.45898].map(String));
  t.end();
});
