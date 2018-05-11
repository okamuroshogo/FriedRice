var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var taskName = 'sample';

gulp.task(taskName, function() {
  runSequence(
    ['bootstrap', 'clean'],
    'build'
  );
});
