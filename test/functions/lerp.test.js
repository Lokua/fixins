import test from 'ava';
import c from '../../lib/functions/colors';


test('lerp (hex,hex)', t => {
  const x = c.lerp('#ff0000', '#0000ff');
  t.same(x, 'rgba(128,0,128,1)');
  t.end();
});
test('lerp (hex,rgb)', t => {
  const x = c.lerp('#ff0000', 'rgb(0,0,255)');
  t.same(x, 'rgba(128,0,128,1)');
  t.end();
});
test('lerp (hex,rgba)', t => {
  const x = c.lerp('#ff0000', 'rgba(0,0,255,0)');
  t.same(x, 'rgba(128,0,128,0.5)');
  t.end();
});


test('lerp (rgb,hex)', t => {
  const x = c.lerp('rgb(255,0,0)', '#0000ff');
  t.same(x, 'rgba(128,0,128,1)');
  t.end();
});
test('lerp (rgb,rgb)', t => {
  const x = c.lerp('rgb(255,0,0)', 'rgb(0,0,255)');
  t.same(x, 'rgba(128,0,128,1)');
  t.end();
});
test('lerp (rgb,rgba)', t => {
  const x = c.lerp('rgb(255,0,0)', 'rgba(0,0,255,0)');
  t.same(x, 'rgba(128,0,128,0.5)');
  t.end();
});


test('lerp (rgba,hex)', t => {
  const x = c.lerp('rgba(255,0,0,0)', '#0000ff');
  t.same(x, 'rgba(128,0,128,0.5)');
  t.end();
});
test('lerp (rgba,rgb)', t => {
  const x = c.lerp('rgba(255,0,0,0)', 'rgb(0,0,255)');
  t.same(x, 'rgba(128,0,128,0.5)');
  t.end();
});
test('lerp (rgba,rgba)', t => {
  const x = c.lerp('rgba(255,0,0,0.75)', 'rgba(0,0,255,0.25)');
  t.same(x, 'rgba(128,0,128,0.5)');
  t.end();
});
