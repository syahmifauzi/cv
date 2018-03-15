'use strict';

var gulp         = require('gulp'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create(),
    reload       = browserSync.reload;


gulp.task('default', ['serve']);

gulp.task('serve', ['sass', 'pug'], function() {
  browserSync.init({
    server: './'
  });
  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch('index.pug', ['pug']);
  gulp.watch('index.html').on('change', reload);
});


gulp.task('sass', function() {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});


gulp.task('pug', function() {
  return gulp.src('index.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./'));
});