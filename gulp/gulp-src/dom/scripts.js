'use strict';

var config = require('../../config').dom.scripts;

var path = config.path.src;

module.exports = [
    `${path}index.js`,
    `${path}utils/index.js`,
    `${path}utils/**/*.js`,
    `${path}style/index.js`,
    `${path}style/**/*.js`,
    `${path}**/*.js`
];