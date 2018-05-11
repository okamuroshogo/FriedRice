// Script は webpack で処理しているため使わない

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var taskName = 'js';
var config = require('../config')[taskName];

// Source ディレクトリにあるスクリプトは最後に結合する
var source = require('main-bower-files')({ filter: /.*\.js/ }).concat(config.src)
// 読み込まれるファイルの確認
// node -e "console.log(require('main-bower-files')({filter:/.*\.js/}).join('\n'))"

gulp.task(taskName, function() {
  var projectMode = require('../config').projectMode;

  gulp.src(source)
    .pipe($.if(projectMode.scriptSourcemap, $.sourcemaps.init()))
      .pipe($.if(projectMode.scriptMinify, $.uglify()))
      .pipe($.if(projectMode.scriptConcat, $.concat(config.outputFile)))
    .pipe($.if(projectMode.scriptSourcemap, $.sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
