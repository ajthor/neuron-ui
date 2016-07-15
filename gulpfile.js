const path = require('path');

const gulp = require('gulp');
const ava = require('gulp-ava');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const xo = require('gulp-xo');

gulp.task('test', () =>
	gulp.src('test/test*.js')
		// gulp-ava needs filepaths so you can't have any plugins before it
		.pipe(ava())
);

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'lib/**/*.js'])
    .pipe(xo())
);

gulp.task('build-web', () =>
  gulp.src(['static/**/*.html', 'static/**/*.js'])
    .pipe(gulp.dest('build'))
);

gulp.task('build-react', () =>
  gulp.src(['static/**/*.jsx'])
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest('build'))
);

gulp.task('build-stylesheets', () =>
  gulp.src(['static/**/*.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
);

gulp.task('default', ['lint', 'test']);
gulp.task('build', [
  'build-web',
  'build-react',
  'build-stylesheets'
]);
