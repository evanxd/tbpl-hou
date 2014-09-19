'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    download = require('gulp-download'),
    exec = require('sync-exec'),
    unzip = require('gulp-unzip');

gulp.task('build', function() {
  download('https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip')
    .pipe(gulp.dest('build'))
    .pipe(unzip())
    .pipe(gulp.dest('build'))
    .on('end', function() {
      gulp.src('js/**/*.js')
        .pipe(gulp.dest('firefox-addon/data'))
        .on('end', function() {
          exec('./build/addon-sdk*/bin/cfx xpi --pkgdir=./firefox-addon/');
          gulp.src('tbpl-hou.xpi')
            .pipe(clean())
            .pipe(gulp.dest('build'));
        });
    });
});
