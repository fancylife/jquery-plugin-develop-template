var gulp = require("gulp");
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var srcPath = 'src/';
var distDir = 'dist/';


gulp.task('less', function() {
    var onError = function(err) {
        plugins.notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "less error: <%= error.message %>",
            sound: "Beep"
        })(err);
        this.emit('end');
    };
    return gulp.src([srcPath + '/style/tl.less'])
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(distDir))
        .pipe(plugins.notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'less OK',
            sound: "Pop"
        }))
        .pipe(plugins.livereload());
});


gulp.task('es6', function() {
    gulp.src([srcPath + 'js/tl.js'])
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(distDir));
});


gulp.task('look', function() {
    plugins.livereload.listen();
    gulp.watch([srcPath + '**/*.less'], ['less']);
    gulp.watch([srcPath + '**/*.js'], ['es6']);

});
gulp.task("default", ['look', 'less', 'es6']);