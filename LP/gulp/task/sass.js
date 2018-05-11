var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var taskName = 'sass';
var config = require('../config')[taskName];
var styleguide = config.styleguide;

gulp.task(taskName, function() {
  var projectMode = require('../config').projectMode;

  return gulp.src(config.src)
    .pipe($.plumber())

    .pipe($.if(projectMode.styleGuide, $.frontnote({
      'css': styleguide.css,
      'out': styleguide.dest,
    })))

    .pipe($.if(projectMode.styleSourcemap, $.sourcemaps.init()))
      .pipe($.sass(config.sassOption))
      .pipe($.pleeease({
        'autoprefixer': { 'browsers': config.browsers },
        'filters': true,
        'rem': true,
        'pseudoElements': true,
        'opacity': true,
        'import': { 'path': config.sourceDir },
        'minifier': projectMode.styleMinify,
        'mqpacker': true,
      }))
      .pipe($.rename(config.outputFile))
    .pipe($.if(projectMode.styleSourcemap, $.sourcemaps.write('.')))

    .pipe(gulp.dest(config.dest))

    .pipe($.if(projectMode.styleGuide, gulp.dest(styleguide.dest)))
    .pipe(browserSync.stream());
});
