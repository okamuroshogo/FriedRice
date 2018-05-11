var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');

var taskName = 'webpack';
var config = require('../config')[taskName];

gulp.task(taskName, function () {
  if (require('../config').projectMode.scriptMinify) {
    config.plugins.push(config.pluginsUglify);
  }

  return gulp.src(config.entry)
    .pipe($.plumber())
    .pipe(webpack(config))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
