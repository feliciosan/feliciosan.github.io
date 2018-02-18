var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('concatJs', function() {
    gulp.src(['js/main.js'])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('js'));
});

// browser-sync task for starting the server.
gulp.task('browserSync', function() {
    //watch files
    var files = [
    './css/style.css',
    './*.html',
    './js/*.js'
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "localhost/index/",
    notify: false
    });
});

gulp.task('sass-production', function() {
    return gulp.src('./css/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(plumber({
            handleError: function (err) {
                console.log(err)
                this.emit('end')
            }
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./css/'))
});

gulp.task('sass', function() {
  return gulp.src('./css/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(plumber({
      handleError: function (err) {
        console.log(err)
        this.emit('end')
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass','concatJs'], function(){
  gulp.watch('./css/*.scss', ['sass']);
  // Other watchers
})

gulp.task('default', ['sass'], function() {
  console.log( 'Feito!' );
});

