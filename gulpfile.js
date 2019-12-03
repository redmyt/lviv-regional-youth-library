// Dependencies packages

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autopref = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');


// Path variables

var src = './bibliotekanarynku9_ui/src/',
    dest = './bibliotekanarynku9_ui/build/';


// Tasks declaration

gulp.task('pug', function(done) {
    gulp.src(src + 'views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest(dest));
    done()
});

gulp.task('sass', function(done) {
    gulp.src(src + 'sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(sass())
        .pipe(autopref())
        .pipe(cleanCSS())
        .pipe(gulp.dest(dest + 'css'));
    done()
});

gulp.task('js', function(done) {
    gulp.src(require('./dependencies.json').js)
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(dest + 'js/'));
    done()
});

gulp.task('fonts', function(done) {
    gulp.src(src + 'fonts/*')
        .pipe(gulp.dest(dest + 'fonts/'));
    done()
});

gulp.task('images', function (done) {
    gulp.src(src + 'images/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 10
        }))
        .pipe(gulp.dest(dest + 'images'));
    done()
});

gulp.task('watch', function() {
    gulp.watch(src + 'views/**/*.pug', ['pug']);
    gulp.watch(src + 'sass/**/*.scss', ['sass']);
    gulp.watch(src + 'js/**/*.js', ['js']);
});

gulp.task('build', gulp.parallel('pug', 'sass', 'js', 'fonts', 'images'));
