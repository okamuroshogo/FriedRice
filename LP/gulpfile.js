// 各種モジュールの読み込み
var gulp = require('gulp');
var runSequence = require('run-sequence');

// gulp タスクの読み込み
require('require-dir')('./gulp/task', {recurse: true});

// 設定ファイルの読み込み
var config = require('./gulp/config');

// ------------------------------
//  タスク
// ------------------------------

// build タスク [npm start build]
gulp.task('build', ['sass', 'webpack', 'www']);

// release タスク [npm start release] (ミニファイあり)
gulp.task('release', function() {
  require('./gulp/config').projectMode.init(true);
  runSequence('clean', 'build');
});

// default タスク [npm start]
gulp.task('default', ['server', 'build'], function() {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.js.src, ['webpack']);
  gulp.watch(config.www.src, ['www']);
});

// help タスク [npm start help]
gulp.task('help', function() {
  console.log(
    "##################################################\n\n" +
    " default (npm start)\n" +
    "     -- [server], [build]を実行完了後に、SCSS、JS、WWWディレクトリのファイル変更監視を行います。\n\n" +
    " build (npm start build)\n" +
    "     -- [sass], [webpack], [www] を並行実行します。\n\n" +
    " release (npm start release)\n" +
    "     -- [clean]の実行完了後に、[build]を実行します。\n\n" +
    " clean (npm start clean)\n" +
    "     -- public, styleguide ディレクトリを削除します。\n\n" +
    " sample (npm start sample)\n" +
    "     -- [bootstrap]と[clean]を並列実行し完了後に、[build]を実行します。\n\n" +
    " bootstrap (npm start bootstrap)\n" +
    "     -- カスタマイズ用「_variables.scss」とFontをSourceディレクトリにコピーします。\n\n" +
    "##################################################"
  );
});
