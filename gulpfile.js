var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autopref = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

gulp.task('pug', function() {
    gulp.src('./src/views/index.pug')
        .pipe( pug() )
        .pipe( gulp.dest('build/') );
});

gulp.task('sass', function() {
    gulp.src('./src/sass/main.scss')
        .pipe( sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }) )
        .pipe( sass() )
        .pipe( autopref() )
        .pipe( cleanCSS() )
        .pipe( gulp.dest('build/css') );
});

gulp.task('js', function() {
    gulp.src( require('./dependencies.json').js )
        // .pipe( uglify() )
        .pipe( concat('main.js') )
        .pipe( gulp.dest('build/js/') );
});

gulp.task('fonts', function() {
    gulp.src('./src/fonts/*')
        .pipe( gulp.dest('build/fonts/') );
});

gulp.task('images', function () {
    gulp.src('./src/images/**/*')
        .pipe( imagemin({
            progressive: true,
            optimizationLevel: 10
        }) )
        .pipe( gulp.dest('build/images') );
});

gulp.task('info', function() {
    gulp.src('./src/*.xml')
        .pipe( gulp.dest('build/') );
});

gulp.task('watch', function() {
    gulp.watch('src/views/**/*.pug', ['pug']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('build', ['pug', 'sass', 'js', 'fonts', 'images', 'info']);