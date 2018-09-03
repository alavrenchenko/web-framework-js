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

WebF.userAgent.browser = {};

/**
 * Determines whether the user's browser is Opera.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isOpera = function () {
    return WebF.userAgent.contains('Opera');
};

/**
 * Determines whether the user's browser is IE.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isIE = function () {
    return (WebF.userAgent.contains('Trident') || WebF.userAgent.contains('MSIE'));
};

/**
 * Determines whether the user's browser is Edge.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isEdge = function () {
    return WebF.userAgent.contains('Edge');
};

/**
 * Determines whether the user's browser is Firefox.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isFirefox = function () {
    return WebF.userAgent.contains('Firefox');
};

/**
 * Determines whether the user's browser is Safari.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isSafari = function () {
    return (WebF.userAgent.contains('Safari') &&
        !(WebF.userAgent.browser.isChrome() || WebF.userAgent.browser.isOpera() || WebF.userAgent.browser.isEdge() || WebF.userAgent.browser.isCoast() || WebF.userAgent.browser.isSilk() || WebF.userAgent.contains('Android')));
};

/**
 * Determines whether the user's browser is Coast (Opera's Webkit-based iOS browser).
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isCoast = function () {
    return WebF.userAgent.contains('Coast');
};

/**
 * Determines whether the user's browser is iOS Webview.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isIOSWebview = function () {
    return ((WebF.userAgent.contains('iPad') || WebF.userAgent.contains('iPhone')) &&
        WebF.userAgent.contains('AppleWebKit') &&
        !(WebF.userAgent.browser.isSafari() || WebF.userAgent.browser.isChrome() || WebF.userAgent.browser.isCoast()));
};

/**
 * Determines whether the user's browser is Chrome.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isChrome = function () {
    return ((WebF.userAgent.contains('Chrome') || WebF.userAgent.contains('CriOS')) && !WebF.userAgent.browser.isEdge());
};

/**
 * Determines whether the user's browser is the Android browser.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isAndroidBrowser = function () {
    return (WebF.userAgent.contains('Android') && !(WebF.userAgent.browser.isChrome() || WebF.userAgent.browser.isFirefox() || WebF.userAgent.browser.isOpera() || WebF.userAgent.browser.isSilk()));
};

/**
 * Determines whether the user's browser is Silk.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isSilk = function () {
    return WebF.userAgent.contains('Silk');
};

/**
 * @returns {string}
 */
WebF.userAgent.browser.getVersion = function () {
    return '';
};
