'use strict';

// gulpプラグインの読みこみ
var gulp         = require('gulp');
var sass         = require('gulp-sass');

// gulp-sassのタスクを登録
gulp.task('sass', function () {
  return gulp.src('./html/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./html/css/dest/'));
});
// gulp-sassの自動監視タスクを登録
gulp.task('sass:watch', function () {
  gulp.watch('./html/css/*.scss', ['sass']);
});

// デフォルトのタスクを登録
gulp.task('default', ['sass', 'sass:watch']);