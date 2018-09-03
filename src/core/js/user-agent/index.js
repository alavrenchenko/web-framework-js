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

WebF.userAgent = {};

/**
 * Returns the userAgent string for the current browser.
 * 
 * @returns {string}
 */
WebF.userAgent.getUserAgentString = function () {
    return (navigator && navigator.userAgent) ? navigator.userAgent : '';
};

/**
 * Determines whether the user agent contains the given string.
 * 
 * @param {string} value The string to search.
 * @param {boolean} [ignoreCase] The default is false.
 * @returns {boolean}
 */
WebF.userAgent.contains = function (value, ignoreCase) {
    var ua = WebF.userAgent.getUserAgentString();

    if (ignoreCase === true) {
        ua = ua.toLowerCase();
        value = value.toLowerCase();
    }

    return (ua.indexOf(value) > -1);
};