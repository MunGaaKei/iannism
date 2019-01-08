const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');


gulp.task('default', () => {
	browserSync.init({
		server: { baseDir: './' },
		port: 27149
	});

	gulp.watch(['css/scss/*.scss'], () => {
		return gulp.src('css/scss/picasso.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({ stream: true }));
	});

	gulp.watch('index.html', () => {
		return gulp.src('index.html')
		.pipe(browserSync.reload());
	});

	gulp.watch('js/*.js', () => {
		return gulp.src('js/*.js')
		.pipe(browserSync.reload());
	});

});