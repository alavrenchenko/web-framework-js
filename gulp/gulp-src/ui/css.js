'use strict';

var config = require('../../config').ui.css;

var path = config.path.src;

module.exports = [
    `${path}control.css`,
    `${path}**/*.css`
];