'use strict';
var gulp  = require('gulp'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),	
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	sequence = require('gulp-sequence'),
	eslint = require('gulp-eslint'),
	size = require('gulp-size'),
	rename = require('gulp-rename');


//gulp.task('default', function() {
//	return gutil.log('Gulp default\n\n gulp monitor\t\tWatch mode\n gulp release\t\tRelease (minify)');
//});

gulp.task(	'default',
			function () {
				gutil.log('\n'+
					gutil.colors.green('GULP TASKS') + '\n\t' +

					// default | help
					gutil.colors.yellow('default | help') + '\n\t\t' +
					'Shows the available tasks\n\n\t' +

					// monitor
					gutil.colors.yellow('monitor') + '\n\t\t' +
					'Real time check for changes in js files.\n\t\tIt handles errors and rebuilds the minified and compiled files.\n\n\t' +


					// release
					gutil.colors.yellow('release') + '\n\t\t' +
					'Rebuild and concatenate all js files.\n\t\tIt minify and uglify js for deploy.\n\t\t'

				);
			}
);


gulp.task('monitor', function () {
	return sequence(['build-js', ], 'watch')();
});

gulp.task('release', function () {
	return sequence('build-js', 'dist-min')();
});


gulp.task('watch', function () {
	gulp.watch('src/*.js', ['build-js']);
});

gulp.task('build-js', function () {
	return gulp.src('src/*.js')
		.pipe(concat('formtools.js'))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError())
		.pipe(gulp.dest('dist/'));
});

gulp.task('dist-min', function () {
	return gulp.src('dist/formtools.js')
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(size({title: 'PRE-MINIFY'}))
		.pipe(uglify({ mangle:true })) 
		.pipe(size({title: 'POST-MINIFY'}))
		.pipe(gulp.dest('dist'));
});



