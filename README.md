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

All fixins are prefixed with `fx-` as to not collide with other namespaces.
This practice is borrowed from the sass microlib [o-](http://github.com/Lokua/o-), where this
project started as a separate branch.

API documentation is under way, in the meantime you can
consult [test/index.html](test/index.html),
[test/style.pcss](test/style.pcss), and [test/style.css](test/style.css).

## Functions

+ `fx-lerp` - naive color interpolation
+ `fx-mdc` - material design color accessor
+ `fx-cmdc` - get the closest material design color to passed color
+ `fx-red`
+ `fx-orange`
+ `fx-yellow`
+ `fx-green`
+ `fx-cyan`
+ `fx-blue`
+ `fx-violet`
+ `fx-magenta`
+ `fx-gray`
+ `fx-golden-ratio`
+ `fx-random` - supports integer and float values
+ `fx-str` - useful for filling `content` with variable values

## Mixins

+ `fx-ab` - code two classes with alternate vars at once; useful for theming.
+ `fx-box-shadow` - opinionated and minimal
+ `fx-center` - symantic `margin 0 auto`
+ `fx-ellipsis` - too long, didn't re...
+ `fx-emboss` - this one is a dud
+ `fx-horizontal-list`
+ `fx-list-unstyled`
+ `fx-size` - width and height in one line, or simply a square
+ `fx-span` - bare bones column width specifier
+ `fx-underline-on-hover` - cheesy thing stolen from codepen

More goodies to come.

## License
[MIT][2]

[0]: https://github.com/jonathantneal/precss
[1]: https://github.com/andyjansson/postcss-functions
[2]: http://lokua.net/license-mit.html
[3]: https://github.com/postcss/postcss#usage
[4]: https://github.com/postcss/postcss
