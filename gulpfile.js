'use strict';


var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpPostcss = require('gulp-postcss');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');

/*
 * The default task is to start the development server.
 */
gulp.task('default', ['serve']);


/*
 * Build lets-nope-bingo.
 */
gulp.task('build', ['build:js', 'build:css', 'build:html']);


/*
 * Clean the build directory.
 */
gulp.task('clean', function(done) {
  del(['build/**/*'], done);
});


/*
 * Copy the HTML to the build directory.
 */
gulp.task('build:html', function() {
  var pipeline = gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('./build'));

  if (browserSync.active) {
    browserSync.reload();
  }

  return pipeline;
});


/*
 * Build the JavaScript with webpack.
 */
gulp.task('build:js', function(done) {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('build:js', err);
    }

    gulpUtil.log('[build:js]', stats.toString({ colors: true }));
    done();
  });
});


/*
 * Build the CSS with postcss.
 */
gulp.task('build:css', function() {
  var pipeline = gulp
    .src([
      './node_modules/normalize.css/normalize.css',
      './src/css/**/*.css'
    ])
    .pipe(gulpSourcemaps.init())
    .pipe(gulpPostcss([
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
      require('cssnano')
    ]))
    .pipe(gulpConcat('letsNope.min.css'))
    .pipe(gulpSourcemaps.write());

  if (browserSync.active) {
    pipeline.pipe(browserSync.stream({
      match: '**/*.css'
    }));
  }

  return pipeline.pipe(gulp.dest('./build/css'));
});


/*
 * Start the development server.
 *
 * The development server will live reload whenever JS(X) files are updated.
 *
 * NB: This does not depend on `build:js` because it will manage its own instance of webpack.
 */
gulp.task('serve', ['build:css', 'build:html'], function() {
  var firstRun = true;

  webpackConfig.watch = true;
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('serve', err);
    }

    gulpUtil.log('[serve]', stats.toString({ colors: true }));

    if (firstRun) {
      browserSync.init({ server: './build' });
      firstRun = false;
    } else {
      browserSync.reload();
    }
  })

  gulp.watch('./src/**/*.html', ['build:html']);
  gulp.watch('./src/**/*.css', ['build:css']);
});
