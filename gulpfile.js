const gulp = require('gulp')
const browserSync = require('browser-sync')
const webpack = require('webpack')
const gulpWebpack = require('webpack-stream')
const plumber = require('gulp-plumber')

const reload = browserSync.reload

gulp.task('default', [
    'webpack',
    'copy-external-dep',
    'copy-external-dep-memory',
    'copy',
    'serve',
    'watch'
]);

gulp.task('copy-external-dep', () => {
    return gulp.src('./external_modules/**/*.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy-external-dep-memory', () => {
    return gulp.src('./external_modules/c3d-102057/c3d.js.mem')
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy', () => {
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('webpack', () => {
    return gulp.src('./src/app.js')
        .pipe( plumber() )
        .pipe( gulpWebpack( require('./webpack.config.js'), webpack ))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['webpack']);
    gulp.watch('src/js/**/*.js', ['webpack']);
    gulp.watch('packages/**/*.js', ['webpack']);
    gulp.watch('src/index.html', ['webpack']);
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        open: 'external'
    });
});
