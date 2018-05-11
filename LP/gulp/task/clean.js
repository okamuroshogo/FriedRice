var gulp = require('gulp');
var del = require('del');

var taskName = 'clean';
var config = require('../config');

gulp.task(taskName, del.bind(null, [
  config.projectPath.public.root,
  config.projectPath.styleguide.root
]));
