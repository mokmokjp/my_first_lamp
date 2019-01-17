/*********************************************************
設定
**********************************************************/

// プラグインの読みこみ
var gulp            = require('gulp');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var stylelint       = require('stylelint');
var postcssReporter = require('postcss-reporter');
var sass            = require('gulp-sass');
var cleanCSS        = require('gulp-clean-css');
var eslint          = require('gulp-eslint');
var babel           = require('gulp-babel');
var uglify          = require('gulp-uglify');

// パスを定義
var paths = {
  'src'      : './html/src/',
  'src_css'  : './html/src/css/**/*.scss',
  'src_js'   : './html/src/js/**/*.js',
  'dest'     : './html/dest/',
  'dest_css' : './html/dest/css/',
  'dest_js'  : './html/dest/js/'
}

// autoprefixerの設定
// https://github.com/postcss/autoprefixer
var autoprefixer_config = {
  cascade: false,
  // サポートブラウザ: http://bit.ly/2AcRzLq
  browsers: [
    'last 1 Chrome versions',
    'last 1 Firefox versions',
    'last 1 Explorer versions',
    'last 1 Edge versions',
    'last 1 Safari versions',
    'last 1 ios_saf versions',
    'last 1 and_chr versions',
    'last 1 Android versions'
  ]
}

// stylelintの設定
// https://stylelint.io/user-guide/rules/
// https://github.com/stylelint/stylelint-config-standard
var stylelint_config = {
  rules: {
    'at-rule-name-case': [ 'lower', {
      'message': '@ルール名は小文字で記述してください'
    } ],
    'color-hex-length': [ 'long', {
      'message': '色は#000000形式で記述してください'
    } ],
    'declaration-block-no-redundant-longhand-properties' : [ true, {
      'message': 'ショートハンドで記述してください'
    } ],
    'number-leading-zero' : [ 'always', {
      'message': '0を省略せず記述してください'
    }],
    'property-case' : [ 'lower', {
      'message': 'プロパティーは小文字で記述してください'
    }],
    'selector-list-comma-newline-after' : [ 'always', {
      'message': 'セレクタをカンマでつなげる場合は、改行して記述してください'
    }]
  },
  ignoreFiles: [
    'html/src/css/reset.css',
    'html/src/css/html5doctorreset.css'
  ]
}

// babelの設定
// https://babeljs.io/docs/plugins/preset-env/
var babel_config = {
  // ES2017を使用化にする
  presets: [
    ['env', {
      'targets': {
        // サポートブラウザ: http://bit.ly/2AcRzLq
        'browsers': [
          'last 1 Chrome versions',
          'last 1 Firefox versions',
          'last 1 Explorer versions',
          'last 1 Edge versions',
          'last 1 Safari versions',
          'last 1 ios_saf versions',
          'last 1 and_chr versions',
          'last 1 Android versions'
        ]
      }
    }]
  ]
}

// eslintの設定
// https://eslint.org/docs/user-guide/configuring
var MAX_WARNINGS = 1;
var eslint_config = {
    'parserOptions': {
      // ES2017を使用化にする
      'ecmaVersion': 2017,
      'sourceType': 'module'
    },
    rules: {
      'strict': 'off'
    },
    globals: [
      '$'
    ],
    envs: [
      'browser'
    ]
}

/*********************************************************
静的コード解析、ビルド
**********************************************************/

// CSSビルドのタスクを登録
gulp.task('css', function () {
  return gulp.src(paths.src_css)
    // ソースマップ初期化
    .pipe(sourcemaps.init())
    // postcss
    .pipe(postcss([
      // ベンダープレフィックス付与
      autoprefixer(autoprefixer_config),
      // stylelintで静的コード解析
      stylelint(stylelint_config),
      postcssReporter({clearMessages: true})
    ]))
    // sassビルド
    .pipe(sass().on('error', sass.logError))
    // cleanCSSで圧縮
    .pipe(cleanCSS({compatibility: '*'}))
    // ソースマップ生成
    .pipe(sourcemaps.write())
    // ビルドしたファイルを出力
    .pipe(gulp.dest(paths.dest_css));
});

// javascriptビルドのタスクを登録
gulp.task('js', function () {
  var count = 0;
  return gulp.src(paths.src_js)
    // ソースマップ初期化
    .pipe(sourcemaps.init())
    // eslintで静的コード解析
    .pipe(eslint(eslint_config))
    .pipe(eslint.format())
    // babelビルド
    .pipe(babel(babel_config).on('error', function(err) {
      // https://github.com/babel/gulp-babel/issues/16#issuecomment-255614767
      console.log('[Compilation Error]');
      console.log(err.fileName + ( err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '));
      console.log('error Babel: ' + err.message + '\n');
      console.log(err.codeFrame);
      this.emit('end');
    }))
    // uglifyで圧縮
    .pipe(uglify())
    // ソースマップ生成
    .pipe(sourcemaps.write())
    // ビルドしたファイルを出力
    .pipe(gulp.dest(paths.dest_js));
});

// 自動監視タスクを登録
gulp.task('watch', function () {
  gulp.watch(paths.src_css, ['css']);
  gulp.watch(paths.src_js, ['js']);
});

// デフォルトのタスクを登録
gulp.task('default', ['css', 'js']);
