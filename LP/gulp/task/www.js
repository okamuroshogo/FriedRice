var gulp = require('gulp');
var browserSync = require('browser-sync');

var taskName = 'www';
var config = require('../config')[taskName];

gulp.task(taskName, function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
