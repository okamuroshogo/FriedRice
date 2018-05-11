// 各種モジュールの読み込み
var webpack = require('webpack-stream');
var bowerWebpackPlugin = require('bower-webpack-plugin');

// ------------------------------
//  初期設定
// ------------------------------

// true  リリース時 css, js の minify を実施、sourcemap を出力しない
// false 開発中    css, js の minify を実施せず、sourcemap を出力する
var product = false;

// minify, concat, sourcemap, styleguide などの On/Off
var projectMode = {
  'init': function(product) {
    if (0 >= arguments.length) {
      var product = false;
    }

    this.product = product,         // 開発、製品バージョンの切り替え
    this.styleGuide = true,         // スタイルガイドの出力
    this.styleMinify = product,     // stylesheet をミニファイする
    // this.styleConcat = true,     // stylesheet を統合する
    this.styleSourcemap = !product, // stylesheet のソースマップを出力する
    this.scriptConcat = true,       // javascript を統合する
    this.scriptMinify = product,    // javascript をミニファイする
    this.scriptSourcemap = !product // javascript のソースマップを出力する
  },
};
projectMode.init(product);

// ------------------------------
//  ディレクトリ構成
// ------------------------------

var projectName = 'bootstrap3';        // 作成するプロジェクトの名前（CSS, JS の出力ファイル名）
var sourceDir = './source/';         // HTML, CSS, JS などソースファイルの保存ディレクトリ
var publicDir = './public/';         // 公開する HTML, CSS, JS などの保存ディレクトリ
var styleGuideDir = './styleguide/'; // スタイルガイドの保存ディレクトリ

var bootstrapDir = './bower_components/bootstrap-sass/';

var projectPath = {
  'source': {
    'root': sourceDir,
    'script': sourceDir + 'script/',
    'style': sourceDir + 'scss/',
    'www': sourceDir + 'www/',
    'scriptfile': projectName + '.js',
    'stylefile': projectName + '.scss'
  },
  'public': {
    'root': publicDir,
    'script': publicDir + 'script/',
    'style': publicDir + 'style/',
    'www': publicDir,
    'scriptfile': projectName + '-bundle.js',
    'stylefile': projectName + '-bundle.css'
  },
  'styleguide': {
    'root': styleGuideDir
  },
  'bootstrap': {
    'root': bootstrapDir,
    'asset': bootstrapDir + 'assets/'
  }
};


module.exports = {
  'projectName': projectName,
  'projectMode': projectMode,
  'projectPath': projectPath,

  // bootstrap 初期準備
  'bootstrap': {
    'asset': projectPath.bootstrap.asset,
    'style': {
      'src': [
        projectPath.bootstrap.asset + 'stylesheets/bootstrap/_variables.scss'
      ],
      'dst': projectPath.source.style
    },
    'font': {
      'src': [
        projectPath.bootstrap.asset + 'fonts/**/*'
      ],
      'dst': projectPath.source.www + 'fonts/'
    },
    'script': {
      'src': [
        projectPath.bootstrap.asset + 'javascripts/'
      ],
      'dst': projectPath.source.script
    },
  },

  // jsの設定
  'js': {
    'src': [
      projectPath.source.script + '**/*.js',
      '!' + projectPath.source.script + '**/*.min.js'
    ],
    'dest': projectPath.public.script,
    'outputFile': projectPath.public.scriptfile,
    'product': product
  },

  // sassの設定
  'sass': {
    'src': [
      projectPath.source.style + '**/*.scss'
    ],
    'dest': projectPath.public.style,
    'sourceDir': projectPath.source.style,
    'outputFile': projectPath.public.stylefile,
    'sassOption': {
      'includePaths': [
        projectPath.bootstrap.asset + 'stylesheets/'
      ],
      'outputStyle': 'expanded', // expanded, nested, compact, compressed
    },

    'browsers': [
      'last 2 versions',
      'ie >= 9',
      'android >= 2.3',
      'opera 12',
      '> 10% in JP'
    ],

    // StyleGuide
    'styleguide': {
      'css': projectPath.public.stylefile,
      'dest': projectPath.styleguide.root
    }
  },

  // webpackの設定
  'webpack': {
    'dest': projectPath.public.script,
    'entry': projectPath.source.script + projectPath.source.scriptfile,
    'output': {
      filename: projectPath.public.scriptfile
    },
    'module':  {
      'loaders': [
        // {test: /\.css$/, loader: 'style!css'},
        // {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: 'file-loader?name=[name].[ext]'}
      ]
    },
    'resolve': {
      // root: [path.join(__dirname, 'bower_components')],
      // extensions: ['', '.js']
    },
    'plugins': [
      // bower.json の main を取得する
      new bowerWebpackPlugin({
        'excludes': [
          /.*\.less/,
          /.*\.scss/
        ]
      }),
      // jQuery を自動的にロードする(require('jqueyr')せずに使用可)
      new webpack.webpack.ProvidePlugin({
        '$':      'jquery',
        'jQuery': 'jquery'
      }),
    ],
    // webpack minify
    'pluginsUglify':
      new webpack.webpack.optimize.UglifyJsPlugin({
        'sourceMap': false,
        'mangle': {
          // except: ['$', 'jQuery']
        }
      }),
    'devtool': 'source-map', // source-map, inline-source-map
  },

  'www': {
    'src': [
      projectPath.source.www + '**/*'
    ],
    'dest': projectPath.public.www
  }
};
