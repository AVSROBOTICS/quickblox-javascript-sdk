'use strict';

var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var connect = require('gulp-connect');

gulp.task('transform', function () {
    var isDevelopment = process.env.NODE_ENV === 'develop',
        browserifyOpts = {
            debug: isDevelopment,
            standalone: 'QB'
    };

    return browserify('./src/qbMain.js', browserifyOpts)
        .transform('babelify', { 'presets': ['es2015'] })
        .bundle()
        .pipe(source('quickblox.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('quickblox.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        https: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['transform']);
});

gulp.task('default', ['watch', 'connect', 'transform']);