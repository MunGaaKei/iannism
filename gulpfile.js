const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
	return gulp.src('css/picasso.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('default', () => {
	browserSync.init({
		server: { baseDir: './' },
		port: 27149
	});

	gulp.watch('css/scss/*.scss', () => {
		return gulp.src('css/scss/picasso.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
	});

	gulp.watch('./*.html', () => {
		return browserSync.reload();
	});

});