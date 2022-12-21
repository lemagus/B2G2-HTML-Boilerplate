const gulp = require("gulp")
const uglify = require("gulp-uglify")
const sass = require('gulp-sass')(require('sass'));

const browserSync = require('browser-sync').create();

const html = (done) => {

    gulp.src("./src/*.html")
        .pipe(gulp.dest('./dist'))

    done()
}

const javascript = (done) => {

    gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream())

    done()
}

const styles = (done) => {

    gulp.src("./src/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())

    done()
}

const browserSyncServer = (done) => {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    done()
}

const watchFiles = (done) => {

    gulp.watch("./src/*.html", html);
    gulp.watch("./src/js/*.js", javascript);
    gulp.watch("./src/scss/*.scss", styles);

    gulp.watch("./dist/*.html").on('change', browserSync.reload);

    done()
}

exports.default = gulp.series(html, javascript, styles)
exports.watch = gulp.parallel(
        gulp.series(html, javascript, styles, watchFiles),
        browserSyncServer
);