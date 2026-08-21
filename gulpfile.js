const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');

gulp.task('svg-sprite', function () {
  return gulp
    .src('shared-styles/icons/*.svg')
    .pipe(svgmin(function (file) {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      };
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest('shared-styles/dist'));
});
