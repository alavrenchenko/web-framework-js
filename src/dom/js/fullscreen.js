/*
 * Copyright 2018 Alexey Lavrenchenko (http://alavrenchenko.com/). All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

WebF.dom.fullscreen = new function () {
    var fullscreenInfo = WebF.userAgent.capabilities.getFullscreenInfo();

    if (fullscreenInfo.fullscreenEnabledPropertyName != null) {
        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._propertyNames = {
            fullscreenEnabled: fullscreenInfo.fullscreenEnabledPropertyName,
            fullscreenElement: fullscreenInfo.fullscreenElementPropertyName,
            requestFullscreen: fullscreenInfo.requestFullscreenPropertyName,
            exitFullscreen: fullscreenInfo.exitFullscreenPropertyName,
        };

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_CHANGE_EVENT_TYPE = fullscreenInfo.fullscreenChangeEventType;

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_ERROR_EVENT_TYPE = fullscreenInfo.fullscreenErrorEventType;
    }
    else {
        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._propertyNames = null;

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_CHANGE_EVENT_TYPE = WebF.events.NativeEventType.FULLSCREENCHANGE;

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_ERROR_EVENT_TYPE = WebF.events.NativeEventType.FULLSCREENERROR;
    }
};

/**
 * @param {Document} [doc]
 * @returns {boolean}
 */
WebF.dom.fullscreen.isSupported = function (doc) {
    if (!doc) {
        doc = document;
    }

    var elem = doc.body || doc.documentElement;

    return !!(WebF.dom.fullscreen._propertyNames && elem[WebF.dom.fullscreen._propertyNames.requestFullscreen] && doc[WebF.dom.fullscreen._propertyNames.fullscreenEnabled]);
};

/**
 * @param {Element} element
 */
WebF.dom.fullscreen.requestFullscreen = function (element) {
    if (!WebF.dom.fullscreen._propertyNames || !element[WebF.dom.fullscreen._propertyNames.requestFullscreen]) {
        return;
    }

    element[WebF.dom.fullscreen._propertyNames.requestFullscreen]();
};

/**
 * @param {Document} [doc]
 */
WebF.dom.fullscreen.exitFullscreen = function (doc) {
    if (!WebF.dom.fullscreen._propertyNames) {
        return;
    }

    if (!doc) {
        doc = document;
    }

    if (!doc[WebF.dom.fullscreen._propertyNames.exitFullscreen]) {
        return;
    }

    doc[WebF.dom.fullscreen._propertyNames.exitFullscreen]();
};

/**
 * @param {Document} [doc]
 * @returns {boolean}
 */
WebF.dom.fullscreen.isFullscreen = function (doc) {
    if (!WebF.dom.fullscreen._propertyNames) {
        return false;
    }

    if (!doc) {
        doc = document;
    }

    return (doc[WebF.dom.fullscreen._propertyNames.fullscreenElement] != null);
};

/**
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.fullscreen.getFullscreenElement = function (doc) {
    if (!WebF.dom.fullscreen._propertyNames) {
        return null;
    }

    if (!doc) {
        doc = document;
    }

    return doc[WebF.dom.fullscreen._propertyNames.fullscreenElement];
};