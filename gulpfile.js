// Dependencies
var gulp = require("gulp");
var browserSync = require("browser-sync");
var connectRewrite  = require("connect-modrewrite");

// Style
var sass = require("gulp-ruby-sass");
var autoprefixer = require("gulp-autoprefixer");

// Browserify
var transform = require("vinyl-transform");
var browserify = require("browserify");

// Templating
var template = require("gulp-template-compile");
var concat = require("gulp-concat");

// Minification
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

// Images
var jpegtran = require("imagemin-jpegtran");

// Utility
var gulpif = require("gulp-if");
var argv = require("yargs").argv;
var preprocess = require("gulp-preprocess");





// Low-level tasks
gulp.task("browser-sync", function () {

  browserSync({
    server: {
      baseDir: "./build/",
      middleware: [
        connectRewrite([
          "!\\.\\w+$ /index.html [L]"
        ])
      ]
    },
    open: false
  });
});


gulp.task("templates", function () {

  gulp.src( "./source/templates/**/*.html" )
    .pipe( template() )
    .pipe( concat("templates.js") )
    .pipe( gulp.dest("./source/templates") );
});


gulp.task("scripts", function () {

  var browserifyFiles = transform(function(filename) {
    var b = browserify({entries: filename, debug: false});
    return b.bundle();
  });

  gulp.src( "./source/scripts/main.js" )
    .pipe( browserifyFiles )
    .pipe( preprocess({context:{PRODUCTION: argv.production}})) // Updates constants
    .pipe( gulpif( argv.production, uglify()) )
    .pipe( gulpif( argv.production, rename({suffix: ".min"})) )
    .pipe( gulp.dest("./build/scripts") );
});


gulp.task("copy:images", function () {

  gulp.src( "./source/images/**/*.*" )
    .pipe( gulpif(argv.production, jpegtran()()) )
    .pipe( gulp.dest("./build/images") );
});


gulp.task("copy:vendor", function () {

  gulp.src(["./source/scripts/vendor/**/*.*" ])
    .pipe(gulp.dest("./build/scripts/vendor"));
});


gulp.task("copy:html", function () {

  gulp.src( ["./source/*.html"] )
    .pipe( gulp.dest("./build/") );
});


gulp.task("sass", function () {

  sass("./source/style/main.scss")
    .on("error", function ( err ) {
      console.error("Error: sass task", err.message);
    })
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
    }))
    .pipe( gulpif( argv.production, minifycss()) )
    .pipe( gulpif( argv.production, rename({suffix: ".min"})) )
    .pipe( gulp.dest("./build/") )
    .pipe( browserSync.reload({ stream: true }) );
});


// High level tasks
gulp.task("copy", [ "copy:vendor", "copy:html", "copy:images" ]);

gulp.task("default", [ "templates", "scripts", "sass", "copy" ]);

gulp.task("watch", [ "default", "browser-sync" ], function () {

  gulp.watch([ "source/scripts/**/*.{js,json}", "source/templates/templates.js" ], [ "scripts" ] );
  gulp.watch([ "source/templates/**/*.html" ], [ "templates" ] );
  gulp.watch([ "source/*.html" ], [ "copy:html", browserSync.reload ] );
  gulp.watch([ "source/images/**/*.*" ], [ "copy:images" ] );
  gulp.watch([ "source/style/**/*.scss" ], [ "sass" ]);

  gulp.watch([ "build/**/*.{js,html,css}" ], browserSync.reload );
});
