const path = require('path');

const gulp = require('gulp');
const ava = require('gulp-ava');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const less = require('gulp-less');
const util = require('gulp-util');
// const webpack = require('webpack');
const webpack = require('gulp-webpack');
const xo = require('gulp-xo');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const paths = {
  static: 'static/**/*.html',
  scripts: ['src/**/*.js', 'src/**/*.jsx'],
  styles: 'static/**/*.less',
  tests: 'test/**/test*.js'
};

gulp.task('test', () =>
	gulp.src(paths.tests)
		// gulp-ava needs filepaths so you can't have any plugins before it
		.pipe(ava())
);

gulp.task('lint', () =>
  gulp.src(paths.scripts)
    .pipe(xo())
);

gulp.task('build-static', () =>
  gulp.src(paths.static)
    .pipe(gulp.dest('build'))
);

gulp.task('build-scripts', () =>
  gulp.src(paths.scripts)
    .pipe(webpack({
      entry: './src/index.js',
      output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
      },
      target: 'electron',
      externals: [nodeExternals()],
      module: {
        loaders: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    }))
    // .pipe(babel({
    //   presets: ['react']
    // }))
    .pipe(gulp.dest('build'))
);

gulp.task('build-styles', () =>
  gulp.src(paths.styles)
    .pipe(webpack({
      entry: './static/styles/main.less',
      output: {
        path: path.join(__dirname, 'build/css'),
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            loader: 'file-loader'
          },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('bundle.css')
      ]
    }))
    .pipe(gulp.dest('build/css'))
);

gulp.task('watch', () => {
  gulp.watch(paths.static, ['build-static']);
  gulp.watch(paths.scripts, ['build-scripts']);
  gulp.watch(paths.styles, ['build-styles']);
});

gulp.task('default', ['lint', 'test']);
gulp.task('build', [
  'build-static',
  'build-scripts',
  'build-styles'
]);
