var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('default', ['build', 'watch']);

// Build
gulp.task('build', ['js']);
gulp.task('js', jsTask);

// Watch
gulp.task('watch', watchTask);



function jsTask() {
    return browserify('./src/color.js', {debug: true})
        .bundle()
        .pipe(source('color.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('color.min.js'))
        .pipe(gulp.dest('./dist'))
}

function watchTask() {
    gulp.watch('./src/**/*', ['build']);
}