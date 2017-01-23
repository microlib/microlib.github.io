var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");

// Live browser reloading
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

// Watch
gulp.task('watch', ['browserSync'], function() {
    // Refresh the browser if any HTML changes occur
    gulp.watch('*.html', browserSync.reload);
});

// Minify CSS (not in use for now)
gulp.task('minify', function() {
    return gulp.src('css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'));
});

// And finally, build tasks
gulp.task('default', function (callback) {
    runSequence(['browserSync', 'watch'],
        callback
    );
});
