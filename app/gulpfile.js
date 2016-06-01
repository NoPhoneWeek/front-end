var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var scss = require('gulp-sass');

var npmSrc = 'node_modules/';
var assetsSourceDir = 'app/';
var assetsPublicDir = 'public/dist/';

var config = {
    sources: {
        css: {
            external: {
                files: [
                    npmSrc + 'bootstrap/dist/css/bootstrap.css'
                ]
            },
            internal: {
                dir: assetsSourceDir + 'scss/',
                files: [
                    'index.scss'
                ],
                path: function(){
                    return this.dir + this.files;
                }
            }
        },
        js: {
            external: [
                npmSrc + 'jquery/dist/jquery.js',
                npmSrc + 'bootstrap/dist/js/bootstrap.js'
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
        .pipe(scss({"bundleExec": true}))
        .pipe(concat(config.targets.css.internal.file))
        .pipe(gulp.dest(config.targets.css.internal.dir))
    ;
});

gulp.task('clean', ['clean-css', 'clean-js', 'clean-js-external']);

gulp.task('default', ['js', 'js-external', 'css']);

gulp.task('watch', ['css', 'js'], function(){
    gulp.watch(config.sources.css.internal.dir + '**/*.scss', ['css']);
    gulp.watch(config.sources.js.internal.path(), ['js']);
});
