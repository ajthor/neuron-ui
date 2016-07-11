const gulp = require('gulp');
const ava = require('gulp-ava');

gulp.task('test', () =>
	gulp.src('test/test.js')
		// gulp-ava needs filepaths so you can't have any plugins before it
		.pipe(ava())
);
