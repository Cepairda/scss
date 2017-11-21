//gulp-sass
//gulp-sourcemaps
//gulp-autoprefixer
//gulp-concat
//gulp-clean-css
//gulp
//gulp-if
//browser-sync

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var config = {
    paths: {
        scss: './src/scss/**/*.scss',
        html: './public/index.html',
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public',
    },
    isDeveloped: true
};

gulp.task('scss', function () {
    return gulp.src(config.paths.scss)
        .pipe(gulpIf(config.isDeveloped, sourceMaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoPrefixer())
        .pipe(gulpIf(!config.isDeveloped, cleanCss()))
        .pipe(gulpIf(config.isDeveloped, sourceMaps.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.scss, ['scss']);
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['scss', 'serve']);
