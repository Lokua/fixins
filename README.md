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
          mixins: fixins.mixins
        }
      }),
      functions({
        functions: fixins.functions
      }),
    ]))
    .pipe(gulp.dest('build/'));
});
```

Consult [postcss#usage][3] for a more complete overview
of how to integrate postcss plugins (this is __not__ a plugin, btw).


# Overview

All fixins are prefixed with `o-` as to not collide with other namespaces.
This practice is borrowed from the sass microlib [o-](http://github.com/Lokua/o-), where this
project started as a separate branch.

API documentation is under way, in the meantime you can
consult [test/index.html](test/index.html),
[test/style.pcss](test/style.pcss), and [test/style.css](test/style.css)
(warning - these are not pretty! don't judge me!).

## Functions

+ `o-lerp` - naive color interpolation
+ `o-mdc` - material design color accessor
+ `o-cmdc` - get the closest material design color to passed color
+ `o-red`
+ `o-orange`
+ `o-yellow`
+ `o-green`
+ `o-cyan`
+ `o-blue`
+ `o-violet`
+ `o-magenta`
+ `o-gray`
+ `o-golden-ratio`
+ `o-random` - supports integer and float values
+ `o-str` - useful for filling `content` with variable values

## Mixins

+ `o-ab` - code two classes with alternate vars at once; useful for theming.
+ `o-box-shadow` - opinionated and minimal
+ `o-center` - symantic `margin 0 auto`
+ `o-ellipsis` - too long, didn't re...
+ `o-emboss` - this one is a dud
+ `o-horizontal-list`
+ `o-list-unstyled`
+ `o-size` - width and height in one line, or simply a square
+ `o-span` - bare bones column width specifier
+ `o-underline-on-hover` - cheesy thing stolen from codepen

More goodies to come.

## License
[MIT][2]

[0]: https://github.com/jonathantneal/precss
[1]: https://github.com/andyjansson/postcss-functions
[2]: http://lokua.net/license-mit.html
[3]: https://github.com/postcss/postcss#usage
[4]: https://github.com/postcss/postcss
