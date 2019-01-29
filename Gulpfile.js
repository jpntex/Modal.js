const { src, dest } = require('gulp');
const sass = require('gulp-sass');

exports.default = () => {
  return src('sass/modal.scss')
  .pipe(sass())
  .pipe(dest('./build/css/'));
};
