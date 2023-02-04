
import dartSass from 'sass';
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

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
        .pipe(
            groupCssMediaQueries()
        )
        .pipe(
            webpcss(
                {
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                }
            )
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })
        )
        // Source comped css
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
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