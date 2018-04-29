var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');

var paths = {
	dist: 'dist/',
	html: 'src/**/*.html',
	static: 'src/static/',
	lessDir: 'src/static/less/',
	less: 'src/static/less/style.less',
	fonts: 'src/static/less/typo/fonts/*',
	jsDir: 'src/static/js/',
	js: 'src/static/js/index.js',
	watch: {
		less: 'src/static/less/**/*.less',
		html: 'src/**/*.html',
		js: 'src/static/js/**/*.js'
	}
}

gulp.task('default', ['html', 'less', 'static', 'js', 'fonts']);

gulp.task('less', function() {
	return gulp.src(paths.less)
		.pipe(sourcemaps.init())
			.pipe(less()).on('error', reportError)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist + '/static/css'))
		.pipe(livereload())
});

gulp.task('html', function() {
	return gulp.src([paths.html, '!' + paths.fonts])
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
});

gulp.task('fonts', function() {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dist + '/static/css/fonts/'))
});

gulp.task('static', function() {
	return gulp.src([paths.static + '**/*', '!' + paths.lessDir, '!' + paths.lessDir + '**/*', '!' + paths.jsDir, '!' + paths.jsDir + '**/*'])
		.pipe(gulp.dest(paths.dist + '/static/'))
});

gulp.task('js', function() {
	return gulp.src(paths.js)
		.pipe(webpack({
			devtool: 'inline-source-map',
			output: {
				filename: 'index.js'
			}
		})).on('error', reportError)
		.pipe(gulp.dest(paths.dist + '/static/js'))
		.pipe(livereload())
});

gulp.task('watch', ['default'], function() {
	livereload.listen();

	watch(paths.watch.less, function() {
		gulp.start('less');
	});

	watch(paths.watch.html, function() {
		gulp.start('html');
	});

	watch(paths.static, function() {
		gulp.start('static');
	});

	watch(paths.watch.js, function() {
		gulp.start('js');
	});
});


var reportError = function(error) {
	var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + error.message,
        sound: 'Frog'
    }).write(error);

    this.emit('end');
}