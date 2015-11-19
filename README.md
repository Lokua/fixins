
# fixins

> Personal use collection of functions and mixins for use with
  [precss][0] and [postcss-functions][1]

## Install

```sh
npm install fixins --save-dev
```

## Usage

`fixins` should be required and passed into
[precss][0] and [postcss-functions][1] options within
a [postcss][4] plugin config.

Here is an example using gulp:

```js
// ...
const postcss = require('gulp-postcss');

const precss = require('precss');
const functions = require('postcss-functions');

const fixins = require('fixins');

// not required but certainly helps if you're
// using precss
const syntax = require('postcss-scss');

gulp.task('css', () => {
  return gulp.src('src/**/*.css')
    .pipe(postcss([
      precss({
        import: {
          // this is just my personal preference
          extension: 'pcss'
        },
        mixins: {
          // this is required!
          mixins: fixins.mixins
        }
      }),
      functions({
        // this is required!
        functions: fixins.functions
      }),
    ]))
    .pipe(gulp.dest('build/'));
});
```

Consult [postcss#usage][3] for a more complete overview
of how to integrate postcss plugins (this is __not__ a plugin, btw).


# Overview

All fixins are prefixed with `fx-` as to not collide with other frameworks/collections.
Most mixins can be called with positional or named arguments unless otherwise stated.
Positional arguments are separated by comma and not enclosed in parenthesis, while named arguments
can appear in any order but must be enclosed in parenthesis. Functions do not support named syntax.

##### Example: positional vs named arguments:
```scss
/* positional arguments (col and float)*/
@mixin fx-span 3, none;

/* named - col arg defaults to 12 */
@mixin fx-span(float:right);
```




























# API (Table of Contents)

+ Functions

  + [fx-lerp](#fx-lerp)
  + [fx-md-color](#fx-md-color)
  + [fx-closest-md-color](#fx-closest-md-color)
  + [fx-red|orange|yellow|green|cyan|blue|violet|magenta|gray](#fx-red|orange|yellow|green|cyan|blue|violet|magenta|gray)
  + [fx-golden-ratio](#fx-golden-ratio)
  + [fx-random](#fx-random)
  + [fx-str](#fx-str)
+ Mixins

  + [fx-ab](#fx-ab)
  + [fx-box-shadow](#fx-box-shadow)
  + [fx-center](#fx-center)
  + [fx-ellipsis](#fx-ellipsis)
  + [fx-emboss](#fx-emboss)
  + [fx-horizontal-list](#fx-horizontal-list)
  + [fx-list-unstyled](#fx-list-unstyled)
  + [fx-size](#fx-size)
  + [fx-span](#fx-span)
  + [fx-underline-on-hover](#fx-underline-on-hover)

## Functions


<a name="fx-lerp" style="font-size:22px;color:cornflowerblue">
### `fx-lerp(color, color, [factor=0.5])`
</a>



Interpolate (blend) `color1` and `color2` by `factor`.
The algorhythm used is simple and naive; added here
for convenience. For more serious use, see
[postcss-color-mix](https://github.com/iamstarkov/postcss-color-mix)


#### Example
```
// input
fx-lerp(#ff0000, rgb(0,0,255,0))
// output
rgba(128,0,128,0.5)
```
#### Params
+ `color1` - CSS rgb, rgba, or hex string
+ `color2` - CSS rgb, rgba, or hex string
+ `[factor=0.5]` - range [0,1] or [0,100%]


#### Return
+ CSS rgba color


***

<a name="fx-md-color" style="font-size:22px;color:cornflowerblue">
### `fx-md-color(color1, [shade=500], [alpha])`
</a>



Material design colors accessor


#### Example
```
// input
fx-md(red, 500)
// output
#f44336


// alpha support:
// input
fx-md(red, 500, 0.5)
// output
rgba(244, 67, 54, 0.5)
```


#### Params
+ color - material design color name
+ shade - material design color shade
+ [alpha=1] - range [0 1]


#### Return
+ CSS hex color if `alpha` argument is not passed
+ CSS rgba color if `alpha` was passed


##### Alias
+ `fx-mdc`
+ `fx-md`


***

<a name="fx-closest-md-color" style="font-size:22px;color:cornflowerblue">
### `fx-closest-md-color(color)`
</a>



Find the material design color that is closest to `color`.


#### Params
+ color - CSS hex color


#### Return
+ CSS hex color


##### Alias
+ `fx-cmd`
+ `fx-cmdc`
+ `fx-closest`


***

<a name="fx-red|orange|yellow|green|cyan|blue|violet|magenta|gray" style="font-size:22px;color:cornflowerblue">
### `fx-<red|orange|yellow|green|cyan|blue|violet|magenta|gray>(value, [alpha=1])`
</a>



Get a shade of <color> between 0-255


#### Params
+ `value` - range [0, 255]
+ `[alpha=1]` - range [0, 1]


#### Return
+ CSS rgba color


##### Alias
+ gray: `grayscale`, `gray-scale`, and for you britts: `grey`, `greyscale`, `grey-scale`
+ violet: `purple`
+ magenta: `pink`
***

<a name="fx-golden-ratio" style="font-size:22px;color:cornflowerblue">
### `fx-golden-ratio([number=100], [scale=1])`
</a>



Get the golden ratio of `number` recursively scaled
`scale` times. A scale setting less then 1 will return
the smaller portion.


#### Example
```css
fx-golden-ratio(30,  1) //=> 48.54102
fx-golden-ratio(30,  2) //=> 78.54102
fx-golden-ratio(30, -1) //=> 18.54102
fx-golden-ratio(30, -2) //=> 11.45898
```


#### Params
+ `[number=100] `- the base number
+ `[scale=1]` - the factor to scale `number` by


#### Return
+ The "A" (larger) portion if `number` is positive; "C" otherwise


##### Alias
+ fx-golden
***

<a name="fx-random" style="font-size:22px;color:cornflowerblue">
### `fx-random ([min=0], [max=256], [float=false [, inclusive=false]])`
</a>



Get a random number between `min` and `max`, inclusive.
Random number generation provided by
[random-js](https://github.com/ckknight/random-js)


#### Params
+ `min` - range minimum (default = 0)
+ `max` - output range maximum (default = 255)
+ `float` - if truthy, output is floating point, default is false (integer output)
+ `inclusive` - if `float` is true, choose to include 0 and 1 (default false)


#### Return
+ a random integer or floating point number depending on the truthyness of `float`
***

<a name="fx-str" style="font-size:22px;color:cornflowerblue">
### `fx-str([input])`
</a>



Wrap input as string, ensures output
in css is wrapped in quotes.


#### Params
+ `input` - anything


#### Return
+ "`input`"

## Mixins


<a name="fx-ab" style="font-size:22px;color:cornflowerblue">
### `fx-ab([selector], prop, variable, [template])`
</a>



This mixin outputs two rules for the passed selector:
one as is, with prop and variable as is; the other with `.b` class
appended to the selector, and a `b` prepended to the variable name before it is
evaluated. Note that `variable` is sass-like, but you should NOT include the dollar sign
of your variable when passing it into `fx-ab`. Note also that this mixin
does not support the named argument syntax like the most of the __fx-__
mixins do.


To futher compilcate things, `fx-ab` has different signatures
depending on if is being called in root context or not.
When on a root element the signature is `<selector>, <prop>, <variable>, [template]`.
In this context, `.b` is appended to the parent-most
(left-most) selector, so `x y z` will become `x.b y c`.


#### Example
```
// given input ...
$text-color: black;
$b-text-color: white;


// note the lack of `$` before `text-color`
@mixin fx-ab .box, color, text-color;


// results in ...
.box {
  color: black;
}
.box.b {
  color: white;
}
```


When inside a rule the signature is `<prop>, <variable>, [template]`.
The `.b` class will be appended to the child-most
(right-most) selector, so `x y z` will become `x y z.b`.


#### Example
```
// input
$text-color: black;
$b-text-color: white;


// note the lack of `$` before `text-color`
.box {
  .medium {
 	 @mixin fx-ab color, text-color;
  }
}


// note again the difference in output in root context
@mixin .box .medium, color, text-color;


// output
.box .medium {
  color: black;
}
.box .medium.b {
  color: white;
}


.box .medium {
  color: black;
}
.box.b .medium {
  color: white;
}
```


Using an optional template, any occurrence of `$$` will
be replaced with `variable`. This is useful when your variable
is included in a multiple word value definition./


```
$color: black;
$b-color: white;


@mixin fx-ab .box, box-shadow, color, 0 1px 0 1px $$;


// results in
.box {
  box-shadow: 0 1px 0 1px black;
}
.box.b {
  box-shadow: 0 1px 0 1px white;
}
```


#### Params
+ `[selector]` - selector
+ `prop` - left handle property key
+ `variable` - sass-like variable reference without the leading `$`.
Passing `foo` is read internally as "use $foo and $b-foo".
If no reference to $foo or $b-foo is found, foo and b-foo literals will be output.
+ `[template]` - text sequence to use as the right-hand value with
any occurrence of `$$` replaced with `variable` results.
***

<a name="fx-box-shadow" style="font-size:22px;color:cornflowerblue">
### `fx-box-shadow([color=rgba(0, 0, 0, 0.25)])`
</a>

***

<a name="fx-center" style="font-size:22px;color:cornflowerblue">
### `fx-center`
</a>



#### Return
`margin: 0 auto;`
***

<a name="fx-ellipsis" style="font-size:22px;color:cornflowerblue">
### `fx-ellipsis`
</a>



Truncate text with an ellipsis `...`.
Works best on elements with a determined height
(not `auto` or `100%`)
***

<a name="fx-emboss" style="font-size:22px;color:cornflowerblue">
### `fx-emboss([radius=0], [top-opacity=0.3], [bottom-opacity=0.25], [background-opacity=0.2])`
</a>



An opinionated emboss effect suitable for square containers.
Currently only suitable for light themes.
***

<a name="fx-horizontal-list" style="font-size:22px;color:cornflowerblue">
### `fx-horizontal-list`
</a>



Bare bones horizontal list. Note that this mixin
is meant to be placed directly under a `ul|ol` or
class placed directly on a `ul|ol`
***

<a name="fx-list-unstyled" style="font-size:22px;color:cornflowerblue">
### `fx-list-unstyled`
</a>

***

<a name="fx-size" style="font-size:22px;color:cornflowerblue">
### `fx-size([width], [height=width])`
</a>



Width and height together in one line.
Called with 1 arg, height will mimick width (output square).
Note that this mixin does not support the named
argument syntax as that is completely redundant.
***

<a name="fx-span" style="font-size:22px;color:cornflowerblue">
### `fx-span([cols=12], [float=left])`
</a>



Dynamically add `$number` of columns to an element.
Assumes a 12 column grid with no gutters (no gutters? that's right,
using box-sizing:border-box on everything, wrappers for your grid classes
and padding for inner content and things become much simpler in grid land).
***

<a name="fx-underline-on-hover" style="font-size:22px;color:cornflowerblue">
### `fx-underline-on-hover([color=#000], [speed=0.3s])`
</a>



Animated text underline.
If using with an `a` element, be sure to set
`text-decoration: none;` on the element and its `:hover`.
Credit goes to someone on Codepen, but somehow I misplaced the
link to that work... will update here when found. Thanks, whoever you are!




























***

## Road Map

[ ] - support hsla
[ ] - flex-box helpers
[ ] - tighten test demo and github.io that sucker

## License
[MIT][2]

[0]: https://github.com/jonathantneal/precss
[1]: https://github.com/andyjansson/postcss-functions
[2]: http://lokua.net/license-mit.html
[3]: https://github.com/postcss/postcss#usage
[4]: https://github.com/postcss/postcss
