
'use strict';
const gulp = require('gulp'); // gulp-сборщик require - подключение файла или плагина, либо другой зависимости
const sass = require('gulp-sass')(require('sass')); // компиляция файлов scss
const cssmin = require('gulp-cssmin'); //минимизация (сжатие) файлов scss
const rename = require('gulp-rename'); //добавляем суффикс .min минимизированным файлам
const uglify = require('gulp-uglify'); // минимизация (сжатие) файлов JS
const plumber = require('gulp-plumber'); // предотвращает остановку Gulp-процесса в случае ошибки в одной из задач

gulp.task('assets', () => {
    return gulp.src('src/assets/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets'));
});
// Компиляция SCSS В CSS и минификация
gulp.task('sass', () => {
    return gulp.src('src/styles/style.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});
// Компиляция, минимизация и обьединение JS-файлов
gulp.task('js', () => {
    return gulp.src('src/scripts/*.js')
        .pipe(plumber())
        .pipe(uglify())
        // .pipe(concat('index.min.js'))
        .pipe(gulp.dest('dist/js'));
});
// Отслеживание изменений в файлах SCSS и JS
gulp.task('watch', () => {
    gulp.watch('src/assets/**/*', gulp.series('assets'));
    gulp.watch('src/styles/*.scss', gulp.series('sass'));
    gulp.watch('src/scripts/*.js', gulp.series('js'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('assets', 'sass', 'js', 'watch'));