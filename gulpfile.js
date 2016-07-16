const path = require('path');

const gulp = require('gulp');
const ava = require('gulp-ava');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const less = require('gulp-less');
const util = require('gulp-util');
const webpack = require('gulp-webpack');
const xo = require('gulp-xo');

const nodeExternals = require('webpack-node-externals');

var paths = {
  static: 'static/**/*',
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
    	entry: './static/index.js',
    	output: {
    		path: path.join(__dirname, 'build'),
    		filename: 'bundle.js'
    	},
      target: "electron",
      externals: [nodeExternals()],
      module: {
        loaders: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader'
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
    .pipe(less())
    .pipe(gulp.dest('build'))
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
