var gulp = require('gulp');
var browserSync = require('browser-sync');

var taskName = 'server';
var config = require('../config');

gulp.task(taskName, function() {
  browserSync.init({
    server: config.projectPath.public.root,
    open: 'external'
  });
});
