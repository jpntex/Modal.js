var gulp = require('gulp'),
  sass = require('gulp-sass');

gulp.task('default', function() {
  gulp.src('sass/modal.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css/'));
});
