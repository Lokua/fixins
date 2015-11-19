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

$$$

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
