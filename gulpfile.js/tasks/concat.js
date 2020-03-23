var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config').concat;
var concat = require('gulp-concat');

gulp.task('concat', function () {
  return gulp.src( config.source )
    .pipe(concat('main.js'))
    .pipe( gulp.dest( config.dest ) );
});
