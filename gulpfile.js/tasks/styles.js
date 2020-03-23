//
// Compile using SASS, add Autoprefixer and build two versions: normal and minified
//

var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var config        = require('../config').styles;
var autoprefixer  = require('gulp-autoprefixer');
var cleanCSS      = require('gulp-clean-css');
var sass          = require('gulp-sass');
var rename        = require('gulp-rename');
var pump          = require('pump');
var sassGlob      = require('gulp-sass-glob');


// function handleError(err) {
//   console.log(err.name, ' in ', err.plugin, ': ', err.message);
//   this.emit('end');
// }

gulp.task('styles', function (cb) {
    pump([
      // normal version
      gulp.src( config.source ),
      sassGlob(),
      sass({
           outputStyle: 'compressed',
           includePaths: ['node_modules/susy/sass']
       }),
      autoprefixer( config.autoprefixer ),
      gulp.dest( config.dest ),
      browserSync.stream(),

      // minified version
      rename('main.min.css'),
      cleanCSS(),
      gulp.dest( config.dest )
    ], cb);
});
