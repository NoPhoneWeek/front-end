var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var parallel = require('concurrent-transform');
var os = require('os');
var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  source: {
    scripts: [
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/js/**/*.js'
    ],
    styles: [
      'app/scss/**/*.scss'
    ],
    templates: [
      'app/templates/**/*.*'
    ],
    images: [
      'app/images/**/*.*'
    ]
  },
  target: {
    scripts: 'public/dist/js',
    styles: 'public/dist/css',
    templates: 'public/dist/templates',
    images: 'public/dist/images',
    sourcemaps: './maps'
  }
};

gulp.task('clean', function() {
  return del.sync(['public/dist/**/*']);
});

gulp.task('styles', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']})
  ];
  gulp.src(paths.source.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(postcss(processors))
    .pipe(nano())
    .pipe(sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.styles))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  gulp.src(paths.source.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.scripts))
    .pipe(reload({stream:true}));
});

gulp.task('images', function(){
  gulp.src(paths.source.images)
    .pipe(gulp.dest(paths.target.images));
});

gulp.task('optimizedImages', function(){
  gulp.src(paths.source.images)
    .pipe(parallel(
      imageResize({ width: 600 }),
      os.cpus().length
    ))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.target.images));
});

gulp.task('templates', function(){
  gulp.src(paths.source.templates)
    .pipe(gulp.dest(paths.target.templates));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "public"
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.source.styles, ['styles', reload]);
  gulp.watch(paths.source.scripts, ['scripts', reload]);
  gulp.watch(paths.source.templates, ['templates', reload])
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images', 'templates']);

gulp.task('default', ['scripts', 'styles', 'templates', 'browser-sync', 'watch']);
