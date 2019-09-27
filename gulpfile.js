'use strict';
const gulp = require('gulp'),
    log = require('fancy-log'),
    colors = require('ansi-colors'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

const default_task = function (done) {
    log('\n' +
        colors.green('GULP TASKS') + '\n\t' +

        // default | help
        colors.yellow('default | help') + '\n\t\t' +
        'Shows the available tasks\n\n\t' +

        // monitor
        colors.yellow('monitor') + '\n\t\t' +
        'Real time check for changes in js files.\n\t\tIt handles errors and rebuilds the minified and compiled files.\n\n\t' +

        // release
        colors.yellow('release') + '\n\t\t' +
        'Rebuild and concatenate all js files.\n\t\tMinifies and uglifies JS for deploy.\n\t\t'
    );
    done();
};

const build_js = function () {
    // copy index.html
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));

    return gulp.src('src/formtools.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.plugin, error.message, '\n');
                return this.emit('end');
            }
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(gulp.dest('dist/'));
};

const dist_min = function () {
    return gulp.src('dist/formtools.js')
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(size({title: 'PRE-MINIFY'}))
        .pipe(uglify({mangle: true}))
        .pipe(size({title: 'POST-MINIFY'}))
        .pipe(gulp.dest('dist/'));
};

const watch = function () {
    gulp.watch('src/**/*', gulp.series(build_js, function (done) {
        browserSync.reload();
        done();
    }));
};

const dev_server = function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        open: false,
    });
};

exports.default = default_task;
exports.help = default_task;
exports.release = gulp.series(build_js, dist_min);
exports.monitor = gulp.series(build_js, gulp.parallel(watch, dev_server));
