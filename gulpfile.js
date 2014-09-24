'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    download = require('gulp-download'),
    fs = require('fs'),
    unzip = require('gulp-unzip'),
    sh = require('execSync'),
    Q = require('q');

gulp.task('build', function() {
  (function() {
    // Download Firefox Add-ons SDK.
    var deferred = Q.defer();
    if (fs.existsSync(__dirname + '/build/addon-sdk-1.17/bin/cfx')) {
      deferred.resolve();
    } else {
      download('https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip')
        .pipe(unzip())
        .pipe(gulp.dest('build'))
        .on('end', deferred.resolve);
    }
    return deferred.promise;
  })()
  .then(function() {
    // Move tbpl-hou script into firefox-addon folder.
    gulp.src('js/**/*.js')
      .pipe(gulp.dest('firefox-addon/data'));
  })
  .then(function() {
    // Build it.
    sh.run('./build/addon-sdk-1.17/bin/cfx xpi --pkgdir=./firefox-addon/');
    gulp.src('tbpl-hou.xpi')
      .pipe(clean())
      .pipe(gulp.dest('build'));
  });
});
