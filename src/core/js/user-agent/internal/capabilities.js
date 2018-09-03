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

/**
 * Browser capabilities.
 */
WebF.userAgent.capabilities = {};

/**
 * @param {Document} [doc]
 * @returns {{hiddenPropertyName: string, visibilityStatePropertyName: string, visibilityChangeEventType: string, isSupported: boolean}}
 */
WebF.userAgent.capabilities.getPageVisibilityInfo = function (doc) {
    if (!doc) {
        doc = document;
    }

    var hiddenPropertyName = null;
    var visibilityStatePropertyName = null;
    var visibilityChangeEventType = null;

    if (typeof doc.hidden !== 'undefined') {
        hiddenPropertyName = 'hidden';
        visibilityStatePropertyName = 'visibilityState';
        visibilityChangeEventType = 'visibilitychange';
    }
    else if (typeof doc.webkitHidden !== 'undefined') {
        hiddenPropertyName = 'webkitHidden';
        visibilityStatePropertyName = 'webkitVisibilityState';
        visibilityChangeEventType = 'webkitvisibilitychange';
    }
    else if (typeof doc.mozHidden !== 'undefined') {
        hiddenPropertyName = 'mozHidden';
        visibilityStatePropertyName = 'mozVisibilityState';
        visibilityChangeEventType = 'mozvisibilitychange';
    }
    else if (typeof doc.msHidden !== 'undefined') {
        hiddenPropertyName = 'msHidden';
        visibilityStatePropertyName = 'msVisibilityState';
        visibilityChangeEventType = 'msvisibilitychange';
    }
    else if (typeof doc.oHidden !== 'undefined') {
        hiddenPropertyName = 'oHidden';
        visibilityStatePropertyName = 'oVisibilityState';
        visibilityChangeEventType = 'ovisibilitychange';
    }

    var isSupported = !!hiddenPropertyName;

    return {
        hiddenPropertyName: hiddenPropertyName,
        visibilityStatePropertyName: visibilityStatePropertyName,
        visibilityChangeEventType: visibilityChangeEventType,
        isSupported: isSupported
    };
};

/**
 * @param {Document} [doc]
 * @returns {{fullscreenEnabledPropertyName: string, fullscreenElementPropertyName: string, requestFullscreenPropertyName: string, exitFullscreenPropertyName: string, fullscreenChangeEventType: string, fullscreenErrorEventType: string}}
 */
WebF.userAgent.capabilities.getFullscreenInfo = function (doc) {
    if (!doc) {
        doc = document;
    }

    var standard = [
        'fullscreenEnabled',
        'fullscreenElement',
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenchange',
        'fullscreenerror',
    ];

    var webkit = [
        'webkitFullscreenEnabled',
        'webkitFullscreenElement',
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
    ];

    var moz = [
        'mozFullScreenEnabled',
        'mozFullScreenElement',
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozfullscreenchange',
        'mozfullscreenerror',
    ];

    var ms = [
        'msFullscreenEnabled',
        'msFullscreenElement',
        'msRequestFullscreen',
        'msExitFullscreen',
        'MSFullscreenChange',
        'MSFullscreenError',
    ];

    var array = [null, null, null, null, null, null];

    if (typeof doc.fullscreenEnabled !== 'undefined') {
        array = standard;
    }
    else if (typeof doc.webkitFullscreenEnabled !== 'undefined') {
        array = webkit;
    }
    else if (typeof doc.mozFullScreenEnabled !== 'undefined') {
        array = moz;
    }
    else if (typeof doc.msFullscreenEnabled !== 'undefined') {
        array = ms;
    }
    
    return {
        fullscreenEnabledPropertyName: array[0],
        fullscreenElementPropertyName: array[1],
        requestFullscreenPropertyName: array[2],
        exitFullscreenPropertyName: array[3],
        fullscreenChangeEventType: array[4],
        fullscreenErrorEventType: array[5]
    };
};

