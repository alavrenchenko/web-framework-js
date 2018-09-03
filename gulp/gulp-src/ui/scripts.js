'use strict';

var config = require('../../config').ui.scripts;

var path = config.path.src;

module.exports = [
    `${path}index.js`,
    `${path}i-component.js`,
    `${path}component.js`,
    `${path}**/*.js`
];