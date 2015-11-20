
# API (Table of Contents)

+ Functions

  + [fx-lerp](#a0)
  + [fx-md-color](#a1)
  + [fx-closest-md-color](#a2)
  + [fx-red|orange|yellow|green|cyan|blue|violet|magenta|gray](#a3)
  + [fx-golden-ratio](#a4)
  + [fx-random](#a5)
  + [fx-str](#a6)


+ Mixins

  + [fx-ab](#a7)
  + [fx-box-shadow](#a8)
  + [fx-center](#a9)
  + [fx-ellipsis](#a10)
  + [fx-emboss](#a11)
  + [fx-horizontal-list](#a12)
  + [fx-list-unstyled](#a13)
  + [fx-size](#a14)
  + [fx-span](#a15)
  + [fx-underline-on-hover](#a16)

## Functions


## <a name="a0"></a> fx-lerp(color, color, [factor=0.5])



Mix `color1` and `color2` by `factor`.
The algorithm used is pretty basic. For more serious use, see
[postcss-color-mix](https://github.com/iamstarkov/postcss-color-mix)


#### Example
```scss
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

## <a name="a1"></a> fx-md-color(color1, [shade=500], [alpha])



Material design colors accessor


#### Example
```scss
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
+ `color` - material design color name
+ `shade` - material design color shade
+ `[alpha=1]` - range [0 1]


#### Return
+ CSS hex color if `alpha` argument is not passed
+ CSS rgba color if `alpha` was passed


##### Alias
+ `fx-mdc`
+ `fx-md`



***

## <a name="a2"></a> fx-closest-md-color(color)



Find the material design color that is closest to `color`.


#### Params
+ `color` - CSS hex color


#### Return
+ CSS hex color


##### Alias
+ `fx-cmd`
+ `fx-cmdc`
+ `fx-closest`



***

## <a name="a3"></a> fx-<red|orange|yellow|green|cyan|blue|violet|magenta|gray>(value, [alpha=1])



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

## <a name="a4"></a> fx-golden-ratio([number=100], [scale=1])



Get the golden ratio of `number` recursively scaled
`scale` times. A scale setting less then 1 will return
the smaller portion.


#### Example
```scss
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

## <a name="a5"></a> fx-random ([min=0], [max=256], [float=false [, inclusive=false]])



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

## <a name="a6"></a> fx-str([input])



Wrap input as string, ensures output
in css is wrapped in quotes.


#### Params
+ `input` - anything


#### Return
+ "`input`"

## Mixins


## <a name="a7"></a> fx-ab([selector], prop, variable, [template])



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
```scss
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
```scss
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


```scss
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

## <a name="a8"></a> fx-box-shadow([color=rgba(0, 0, 0, 0.25)])


***

## <a name="a9"></a> fx-center



#### Return
`margin: 0 auto;`

***

## <a name="a10"></a> fx-ellipsis



Truncate text with an ellipsis `...`.
Works best on elements with a determined height
(not `auto` or `100%`)

***

## <a name="a11"></a> fx-emboss([radius=0], [top-opacity=0.3], [bottom-opacity=0.25], [background-opacity=0.2])



An opinionated emboss effect suitable for square containers.
Currently only suitable for light themes.

***

## <a name="a12"></a> fx-horizontal-list



Bare bones horizontal list. Note that this mixin
is meant to be placed directly under a `ul|ol` or
class placed directly on a `ul|ol`

***

## <a name="a13"></a> fx-list-unstyled


***

## <a name="a14"></a> fx-size([width], [height=width])



Width and height together in one line.
Called with 1 arg, height will mimick width (output square).
Note that this mixin does not support the named
argument syntax as that is completely redundant.

***

## <a name="a15"></a> fx-span([cols=12], [float=left])



Dynamically add `$number` of columns to an element.
Assumes a 12 column grid with no gutters (no gutters? that's right,
using box-sizing:border-box on everything, wrappers for your grid classes
and padding for inner content and things become much simpler in grid land).

***

## <a name="a16"></a> fx-underline-on-hover([color=#000], [speed=0.3s])



Animated text underline.
If using with an `a` element, be sure to set
`text-decoration: none;` on the element and its `:hover`.
Credit goes to someone on Codepen, but somehow I misplaced the
link to that work... will update here when found. Thanks, whoever you are!
