'use strict';

// 読みこみ
var autoprefixer  = require('autoprefixer');
var gulp          = require('gulp');
var babel         = require('gulp-babel');
var postcss       = require('gulp-postcss');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');

// パスを定義
var paths = {
  'src'      : './html/src/',
  'src_css'  : './html/src/css/**/*.scss',
  'src_js'   : './html/src/js/**/*.js',
  'dest'     : './html/dest/',
  'dest_css' : './html/dest/css/',
  'dest_js'  : './html/dest/js/',
}

// CSSビルドのタスクを登録
gulp.task('css', function () {
  // postcssの設定
  var processors = [
    autoprefixer({
      cascade: false,
    }),
  ];
  return gulp.src(paths.src_css)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dest_css));
});

// javascriptビルドのタスクを登録
gulp.task('js', () => {
    return gulp.src(paths.src_js)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(paths.dest_js));
});

// 自動監視タスクを登録
gulp.task('watch', function () {
  gulp.watch(paths.src_css, ['css']);
  gulp.watch(paths.src_js, ['js']);
});

// デフォルトのタスクを登録
gulp.task('default', ['css', 'js', 'watch']);