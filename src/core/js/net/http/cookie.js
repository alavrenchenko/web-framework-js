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
 * @constructor
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 */
WebF.net.http.Cookie = function (name, value) {
    /**
     * @type {string}
     */
    var _domain = '';

    /**
     * @type {string}
     */
    var _path = '/';

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string}
     */
    this.value = value;

    Object.defineProperty(this, 'domain', {
        get: function () {
            return _domain;
        },
        set: function (val) {
            _domain = (val != null) ? val.toLowerCase() : '';
        },
        enumerable: true
    });

    /**
     * @type {Date?}
     */
    this.expires = null;

    Object.defineProperty(this, 'path', {
        get: function () {
            return _path;
        },
        set: function (val) {
            _path = (val != null) ? val : '';
        },
        enumerable: true
    });

    /**
     * @type {boolean}
     */
    this.secure = false;

    /**
     * @type {boolean}
     */
    this.httpOnly = false;

    /**
     * @type {WebF.net.http.CookieSameSiteMode?}
     */
    this.sameSite = null;
};

WebF.net.http.Cookie.prototype.toString = function () {
    var W_string = WebF.string;

    if (W_string.isNullOrEmpty(this.name) || !WebF.net.http.Cookie.isNameValid(this.name)) {
        throw new Error('Invalid cookie name "' + this.name + '"');
    }

    if (!WebF.net.http.Cookie.isValueValid(this.value)) {
        throw new Error('Invalid cookie value "' + this.value + '"');
    }

    var cookieStr = this.name + '=';

    if (this.value != null) {
        cookieStr += this.value;
    }

    if (!W_string.isNullOrEmpty(this.domain)) {
        cookieStr += '; domain=' + this.domain;
    }

    if (this.expires != null) {
        cookieStr += '; expires=' + this.expires.toUTCString();
    }

    if (!W_string.isNullOrEmpty(this.path)) {
        cookieStr += '; path=' + this.path;
    }

    if (this.secure === true) {
        cookieStr += '; secure';
    }

    if (this.httpOnly === true) {
        cookieStr += '; HttpOnly';
    }

    if (this.sameSite != null) {
        cookieStr += '; SameSite=' + this.sameSite;
    }

    return cookieStr;
};

/**
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.Cookie.isNameValid = function (name) {
    return !(/[;=\s]/.test(name));
};

/**
 * @param {string} value The value of the cookie.
 * @returns {boolean}
 */
WebF.net.http.Cookie.isValueValid = function (value) {
    return !(/[;\r\n]/.test(value));
};

WebF.net.http.Cookie.prototype.clone = function () {
    var cookie = new WebF.net.http.Cookie(this.name, this.value);
    cookie.domain = this.domain;
    cookie.expires = this.expires;
    cookie.path = this.path;
    cookie.secure = this.secure;
    cookie.httpOnly = this.httpOnly;
    cookie.sameSite = this.sameSite;

    return cookie;
};