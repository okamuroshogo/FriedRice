var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge-stream');

var taskName = 'bootstrap';
var config = require('../config')[taskName];

gulp.task(taskName, function() {
  return merge(
    gulp.src(config.style.src)
      .pipe($.rename({
        suffix: '-sample'
      }))
      .pipe(gulp.dest(config.style.dst)),
    gulp.src(config.font.src)
      .pipe(gulp.dest(config.font.dst)));
});
