'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var config = require('./gulp/config');

var coreScriptsSrc = require('./gulp/gulp-src/core/scripts');
var domScriptsSrc = require('./gulp/gulp-src/dom/scripts');
var appScriptsSrc = require('./gulp/gulp-src/app/scripts');
var uiScriptsSrc = require('./gulp/gulp-src/ui/scripts');

var uiCSSSrc = require('./gulp/gulp-src/ui/css');

var webFJSFileName = 'webf.js';
var coreJSFileName = 'webf-core.js';
var domJSFileName = 'webf-dom.js';
var appJSFileName = 'webf-app.js';
var uiJSFileName = 'webf-ui.js';

var webFCSSFileName = 'webf.css';
var uiCSSFileName = 'webf-ui.css';


var webFScriptsSrc = [
    config.core.scripts.path.build + coreJSFileName,
    config.dom.scripts.path.build + domJSFileName,
    config.ui.scripts.path.build + uiJSFileName,
    config.app.scripts.path.build + appJSFileName,
];

var webFCSSSrc = [
    config.ui.css.path.build + uiCSSFileName,
];


gulp.task('core-build', function () {
    return gulp.src(coreScriptsSrc)
        .pipe(concat(coreJSFileName))
        .pipe(gulp.dest(config.core.scripts.path.build));
});

gulp.task('dom-build', function () {
    return gulp.src(domScriptsSrc)
        .pipe(concat(domJSFileName))
        .pipe(gulp.dest(config.dom.scripts.path.build));
});

gulp.task('app-build', function () {
    return gulp.src(appScriptsSrc)
        .pipe(concat(appJSFileName))
        .pipe(gulp.dest(config.app.scripts.path.build));
});

gulp.task('ui-build', function () {
    return gulp.src(uiScriptsSrc)
        .pipe(concat(uiJSFileName))
        .pipe(gulp.dest(config.ui.scripts.path.build));
});

gulp.task('build', ['core-build', 'dom-build', 'ui-build', 'app-build'], function () {
    return gulp.src(webFScriptsSrc)
        .pipe(concat(webFJSFileName))
        .pipe(gulp.dest(config.all.scripts.path.build));
});

gulp.task('ui-css-build', function () {
    return gulp.src(uiCSSSrc)
        .pipe(concat(uiCSSFileName))
        .pipe(gulp.dest(config.ui.css.path.build));
});


gulp.task('css-build', ['ui-css-build'], function () {
    return gulp.src(webFCSSSrc)
        .pipe(concat(webFCSSFileName))
        .pipe(gulp.dest(config.all.scripts.path.build));
});
