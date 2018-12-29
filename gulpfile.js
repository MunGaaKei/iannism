const gulp = require('gulp');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


gulp.task('sass', () => {
	gulp.src('css/picasso.scss')
	.pipe(sass())
	.pipe(gulp.dest('css'));
});

gulp.task('default', () => {
	gulp.watch('css/picasso.scss', () => {
		gulp.run('sass');
	});
});