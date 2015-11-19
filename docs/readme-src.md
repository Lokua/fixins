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
Most mixins can be called with positional or named arguments.

$$$

***

More goodies to come.

## License
[MIT][2]

[0]: https://github.com/jonathantneal/precss
[1]: https://github.com/andyjansson/postcss-functions
[2]: http://lokua.net/license-mit.html
[3]: https://github.com/postcss/postcss#usage
[4]: https://github.com/postcss/postcss
