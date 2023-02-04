
import dartSass from 'sass';
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(
        app.path.src.scss,
        { sourcemaps: true }
    )
        // Error handlers 
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError(
                    {
                        title: "NTCAD|SCSS",
                        message: "Error: <%= error.message %>"
                    }
                )
            )
        )
        // Path replace
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        // SCSS handlers | controllers 
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(
            app.gulp.dest(app.path.build.css)
        )
        .pipe(
            app.plugins.browsersync.stream()
        )
}