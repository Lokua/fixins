'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const math = require('postcss-math');
const clearfix = require('postcss-clearfix');
const precss = require('precss');
const syntax = require('postcss-scss');
const stripCssComments = require('gulp-strip-css-comments');
const functions = require('postcss-functions');

const fixins = require('./index');

gulp.task('css', () => {
  const preprocessors = [
    precss({
      import: {
        extension: 'pcss'
      },
      mixins: {
        mixins: fixins.mixins
      }
    }),
    functions({
      functions: fixins.functions
    }),
    math,
    clearfix,
    autoprefixer({
      cascade: true,
      browsers: ['> 1%']
    })
  ];
  return gulp.src('test/style.pcss')
    .pipe(postcss(preprocessors, { parser: syntax }))
    .pipe(stripCssComments())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('test'));
});

gulp.task('watch', () => {
  gulp.watch('test/**/*.pcss', ['css']);
});

gulp.task('default', ['watch']);
