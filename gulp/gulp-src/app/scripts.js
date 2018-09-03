'use strict';

var config = require('../../config').app.scripts;

var path = config.path.src;

module.exports = [
    `${path}index.js`,
    `${path}view/index.js`,
    `${path}window/index.js`,
    `${path}**/*.js`
];