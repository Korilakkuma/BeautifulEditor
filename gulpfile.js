var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var plumber    = require('gulp-plumber');
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var del        = require('del');

gulp.task('jshint', function() {
    return gulp.src('build/BeautifulEditor.js')
               .pipe(plumber())
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
    return gulp.src('build/BeautifulEditor.js')
               .pipe(plumber())
               .pipe(sourcemaps.init())
               .pipe(uglify())
               .pipe(rename('BeautifulEditor.min.js'))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
    return del(['build/*.min.js', 'build/*.map']);
});

gulp.task('build', ['clean', 'jshint', 'compress']);

gulp.task('watch', function() {
    gulp.watch('build/BeautifulEditor.js', ['build']);
});
