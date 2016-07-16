const path = require('path');

const gulp = require('gulp');
const ava = require('gulp-ava');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const less = require('gulp-less');
const xo = require('gulp-xo');

var paths = {
  html: 'static/**/*.html',
  scripts: ['static/**/*.js', 'static/**/*.jsx'],
  styles: 'static/**/*.less'
};

gulp.task('test', () =>
	gulp.src('test/test*.js')
		// gulp-ava needs filepaths so you can't have any plugins before it
		.pipe(ava())
);

gulp.task('lint', () =>
  gulp.src(paths.scripts)
    .pipe(xo())
);

gulp.task('build-html', () =>
  gulp.src(paths.html)
    .pipe(gulp.dest('build'))
);

gulp.task('build-scripts', () =>
  gulp.src(paths.scripts)
    .pipe(changed('build'))
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest('build'))
);

gulp.task('build-styles', () =>
  gulp.src(paths.styles)
    .pipe(less())
    .pipe(gulp.dest('build'))
);

gulp.task('default', ['lint', 'test']);
gulp.task('build', [
  'build-html',
  'build-scripts',
  'build-styles'
]);

gulp.task('watch', () => {
  gulp.watch(paths.html, ['build-html']);
  gulp.watch(paths.scripts, ['build-scripts']);
  gulp.watch(paths.styles, ['build-styles']);
});
