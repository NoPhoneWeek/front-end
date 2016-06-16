var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var bowerSrc = 'bower_components/';
var npmSrc = 'node_modules/';
var assetsSourceDir = 'app/';
var assetsPublicDir = 'public/dist/';

var config = {
  sources: {
    tpls: {
      dir: assetsSourceDir + 'tpl/',
      files: '**/*.*',
      filePath: function(){
        return this.dir + this.files;
      }
    },
    css: {
      external: {
        files: [
          npmSrc + 'bootstrap/dist/css/bootstrap.css'
        ]
      },
      internal: {
        dir: assetsSourceDir + 'scss/',
        files: [
          'app.scss'
        ],
        path: function(){
          return this.dir + this.files;
        }
      }
    },
    js: {
      external: [
        bowerSrc + 'angular/angular.js',
        bowerSrc + 'angular-route/angular-route.js',
        bowerSrc + 'angular-resource/angular-resource.js'
      ],
      internal: {
        dir: assetsSourceDir + 'js/',
        files: [
          '**/*.js'
        ],
        path: function(){
          return this.dir + this.files
        }
      }
    }
  },
  targets: {
    tpls: {
      dir: assetsPublicDir + 'tpl/'
    },
    css: {
      internal: {
        dir: assetsPublicDir + 'css/',
        file: 'bundle.css',
        filePath: function(){
          return this.dir + this.file;
        }
      }
    },
    js: {
      external: {
        dir: assetsPublicDir + 'js/',
        file: 'external.js',
        filePath: function(){
            return this.dir + this.file;
        }
      },
      internal: {
        dir: assetsPublicDir + 'js/',
        file: 'app.js',
        filePath: function(){
          return this.dir + this.file;
        }
      }
    }
  }
};

gulp.task('clean-copy-tpls', function(){
    return gulp.src(config.targets.tpls.dir, {read: false})
        .pipe(clean());
});

gulp.task('copy-tpls', ['clean-copy-tpls'], function(){
    return gulp.src(config.sources.tpls.filePath(), [{ base: config.sources.tpls.dir }])
        .pipe(gulp.dest(config.targets.tpls.dir))
        ;
});

gulp.task('clean-js-external', function(){
    return gulp.src(config.targets.js.external.filePath(), {read: false})
        .pipe(clean());
});
gulp.task('clean-js', function(){
    return gulp.src(config.targets.js.internal.filePath(), {read: false})
        .pipe(clean());
});

gulp.task('clean-css', function(){
    return gulp.src(config.targets.css.internal.filePath(), {read: false})
        .pipe(clean());
});

gulp.task('js-external', ['clean-js-external'], function(){
    return gulp.src(config.sources.js.external)
        .pipe(plumber())
        .pipe(concat(config.targets.js.external.file))
        .pipe(gulp.dest(config.targets.js.external.dir))
    ;
});

gulp.task('js', ['clean-js'], function(){
    return gulp.src(config.sources.js.internal.path())
        .pipe(plumber())
        .pipe(concat(config.targets.js.internal.file))
        .pipe(gulp.dest(config.targets.js.internal.dir))
    ;
});

gulp.task('css', ['clean-css'], function(){
    var externalCssFiles = config.sources.css.external.files;
    var internalCssFiles = config.sources.css.internal.path();
    var cssSourceFiles = externalCssFiles.concat(internalCssFiles);
    return gulp.src(cssSourceFiles)
        .pipe(sass({"bundleExec": true}))
        .pipe(concat(config.targets.css.internal.file))
        .pipe(gulp.dest(config.targets.css.internal.dir))
    ;
});

gulp.task('clean', ['clean-css', 'clean-js', 'clean-js-external', 'clean-copy-tpls']);

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "public"
    }
  });
});

gulp.task('watch', ['css', 'js', 'copy-tpls'], function(){
    gulp.watch(config.sources.css.internal.dir + '**/*.scss', ['css', reload]);
    gulp.watch(config.sources.js.internal.path(), ['js', reload]);
    gulp.watch(config.sources.tpls.filePath(), ['copy-tpls', reload])
});

gulp.task('default', ['js', 'js-external', 'css', 'copy-tpls', 'browser-sync', 'watch']);
