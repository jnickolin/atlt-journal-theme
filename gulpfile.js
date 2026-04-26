const {series, parallel, watch, src, dest} = require('gulp');
const pump = require('pump');
const fs = require('fs');
const order = require('ordered-read-streams');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const rollupStream = require('@rollup/stream');
const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const beeper = require('beeper');
const zip = require('gulp-zip');

// postcss plugins
const easyimport = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

function serve(done) {
    livereload.listen();
    done();
}

function handleError(done) {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        src('assets/css/screen.css', {sourcemaps: true}),
        postcss([
            easyimport,
            autoprefixer(),
            cssnano()
        ]),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function sharedJs() {
    return src([
        'node_modules/@tryghost/shared-theme-assets/assets/js/v1/lib/vendor/**/*.js',
        'node_modules/@tryghost/shared-theme-assets/assets/js/v1/lib/*.js',
        'node_modules/@tryghost/shared-theme-assets/assets/js/v1/main.js',
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(dest('assets/built/'))
    .pipe(livereload());
}

function js() {
    return rollupStream({
        input: 'assets/js/main.js',
        plugins: [
            rollupResolve(),
            rollupCommonjs()
        ],
        output: {
            format: 'iife',
            name: 'main'
        }
    })
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest('assets/built/'))
    .pipe(livereload());
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!yarn-error.log'
        ]),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const cssWatcher = () => watch('assets/css/**/*.css', css);
const jsWatcher = () => watch('assets/js/**/*.js', js);
const watcher = parallel(hbsWatcher, cssWatcher, jsWatcher);
const build = series(css, parallel(sharedJs, js));

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
