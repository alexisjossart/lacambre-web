var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config').jshint;
var eslint  = require('gulp-eslint');
var concat = require('gulp-concat');

//
// Check yo self before yo wreck yo self
//
gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe( plumber() )
    .pipe(eslint({ configFile: '.eslintrc'}))
    .pipe( eslint.format() );
});
