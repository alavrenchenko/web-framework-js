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

WebF.userAgent.platform = {};

/**
 * Determines whether the platform is Android.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isAndroid = function () {
    return WebF.userAgent.contains('Android');
};

/**
 * Determines whether the platform is iPad.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIPad = function () {
    return WebF.userAgent.contains('iPad');
};

/**
 * Determines whether the platform is iPod.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIPod = function () {
    return WebF.userAgent.contains('iPhone');
};

/**
 * Determines whether the platform is iPod.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIPhone = function () {
    return (WebF.userAgent.contains('iPhone') && !WebF.userAgent.platform.isIPad() && !WebF.userAgent.platform.isIPod());
};

/**
 * Determines whether the platform is iOS.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIOS = function () {
    return (WebF.userAgent.platform.isIPhone() || WebF.userAgent.platform.isIPad() || WebF.userAgent.platform.isIPod());
};

/**
 * Determines whether the platform is Macintosh.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isMacintosh = function () {
    return WebF.userAgent.contains('Macintosh');
};

/**
 * Determines whether the platform is Windows.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isWindows = function () {
    return WebF.userAgent.contains('Windows');
};

/**
 * Determines whether the platform is Linux.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isLinux = function () {
    return WebF.userAgent.contains('Linux');
};

/**
 * Determines whether the platform is ChromeOS.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isChromeOS = function () {
    return WebF.userAgent.contains('CrOS');
};

/**
 * Determines whether the platform is Chromecast.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isChromecast = function () {
    return WebF.userAgent.contains('CrKey');
};

/**
 * Determines whether the platform is KaiOS.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isKaiOS = function () {
    return WebF.userAgent.contains('KaiOS');
};

/**
 * @returns {string}
 */
WebF.userAgent.platform.getVersion = function () {
    return '';
};


