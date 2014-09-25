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

gulp.task('build-chrome-extension', function() {
  (function() {
    // Move tbpl-hou script into chrome-extension folder.
    var deferred = Q.defer();
    gulp.src('js/**/*.js')
      .pipe(gulp.dest('chrome-extension/js'))
      .on('end', function() {
        deferred.resolve();
      });
    return deferred.promise;
  })()
  .then(function() {
    // Build it.
    sh.run('sh ./chrome-extension/crxmake.sh ./chrome-extension ./chrome-extension/key.pem');
    gulp.src('chrome-extension.crx')
      .pipe(clean())
      .pipe(gulp.dest('build'));
  });
});
