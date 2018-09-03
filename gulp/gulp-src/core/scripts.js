'use strict';

var config = require('../../config').core.scripts;

var path = config.path.src;

module.exports = [
    `${path}webf.js`,
    `${path}base/index.js`,
    `${path}array/index.js`,
    `${path}char/index.js`,
    `${path}object/index.js`,
    `${path}string/index.js`,
    `${path}*.js`,
    `${path}utils/index.js`,
    `${path}utils/**/*.js`,
    `${path}user-agent/index.js`,
    `${path}user-agent/**/*.js`,
    `${path}events/index.js`,
    `${path}events/wf-event.js`,
    `${path}events/wf-native-event.js`,
    `${path}events/**/*.js`,
    `${path}net/index.js`,
    `${path}net/mime/index.js`,
    `${path}net/mime/media-type-names/index.js`,
    `${path}net/mime/media-type-names/**/*.js`,
    `${path}net/mime/**/*.js`,
    `${path}net/http/index.js`,
    `${path}net/http/headers/index.js`,
    `${path}net/http/http-content.js`,
    `${path}net/web-request.js`,
    `${path}net/web-request-message.js`,
    `${path}net/web-response.js`,
    `${path}net/xhr/index.js`,
    `${path}net/xdr/index.js`,
    `${path}net/**/*.js`,
    `${path}collections/index.js`,
    `${path}collections/**/*.js`,
    `${path}graphics/index.js`,
    `${path}graphics/**/*.js`,
    `${path}**/*.js`
];