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
 * A class for handling browser cookies.
 * 
 * @constructor
 * @param {Document} doc
 */
WebF.net.http.Cookies = function (doc) {
    /**
     * @private
     */
    this._document = doc;

    this.cache = new WebF.net.http.CookieCollection();
};

/**
 * Returns true if cookies are enabled.
 * 
 * @returns {boolean} True if cookies are enabled.
 */
WebF.net.http.Cookies.prototype.isEnabled = function () {
    return navigator.cookieEnabled;
}

/**
 * @returns {WebF.net.http.CookieCollection}
 */
WebF.net.http.Cookies.prototype.getAll = function () {
    var cc = new WebF.net.http.CookieCollection();
    var nativeCookie = this.getNativeCookie();

    if (!nativeCookie) {
        return cc;
    }

    var parts = nativeCookie.split(';');

    for (var x = 0; x < parts.length; x++) {
        var part = WebF.string.trim(parts[x]);
        var kvp = this._parseCookiePart(part);

        cc.add(new WebF.net.http.Cookie(kvp.key, kvp.value));
    }

    return cc;
};

/**
 * @private
 * @param {string} part
 * @returns {WebF.collections.KeyValuePair}
 */
WebF.net.http.Cookies.prototype._parseCookiePart = function (part) {
    var name;
    var value;

    if (part.length > 0) {
        var index = part.indexOf('=');

        if (index > 0) {
            name = part.substring(0, index);
            value = (index < (part.length - 1)) ? part.substring(index + 1) : '';
        }
        else {
            name = '';
            value = part;
        }
    }
    else {
        name = '';
        value = '';
    }

    return new WebF.collections.KeyValuePair(name, value);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {Array<WebF.net.http.Cookie>}
 */
WebF.net.http.Cookies.prototype.get = function (name) {
    return this.getAll().getName(name);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {WebF.net.http.Cookie}
 */
WebF.net.http.Cookies.prototype.getFirst = function (name) {
    var nativeCookie = this.getNativeCookie();

    if (!nativeCookie) {
        return null;
    }

    var parts = nativeCookie.split(';');

    for (var x = 0; x < parts.length; x++) {
        var part = WebF.string.trim(parts[x]);
        var kvp = this._parseCookiePart(part);

        if (kvp.key === name) {
            return new WebF.net.http.Cookie(kvp.key, kvp.value);
        }
    }

    return null;
};

/**
 * @param {WebF.net.http.Cookie} cookie
 */
WebF.net.http.Cookies.prototype.set = function (cookie) {
    this._document.cookie = cookie.toString();
};


WebF.net.http.Cookies.prototype.updateCache = function () {
    this.cache = this.getAll();
};

/**
 * @returns {boolean}
 */
WebF.net.http.Cookies.prototype.isEmpty = function () {
    return !this.getNativeCookie();
};

/**
 * Returns the 'document.cookie'.
 * 
 * @returns {string}
 */
WebF.net.http.Cookies.prototype.getNativeCookie = function () {
    return this._document.cookie;
};

/**
 * @returns {number}
 */
WebF.net.http.Cookies.prototype.getCount = function () {
    var nativeCookie = this.getNativeCookie();

    if (!nativeCookie) {
        return 0;
    }

    return nativeCookie.split(';').length;
};

/**
 * Returns whether there is a cookie with the given name.
 * 
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.Cookies.prototype.contains = function (name) {
    return (this.getFirst(name) != null);
};

/**
 * Removes and expires a cookie.
 * 
 * @param {string} name The name of the cookie.
 * @param {string} [path] The path of the cookie. If not provided, the default is null (i.e. the current path to the current location of the document is used).
 * @param {string} [domain] The domain of the cookie. If not provided, the default is null (i.e. cookie at full request host name).
 * @returns {boolean} Whether the cookie existed before it was removed.
 */
WebF.net.http.Cookies.prototype.remove = function (name, path, domain) {
    var has = this.contains(name);

    var cookie = new WebF.net.http.Cookie(name, '');
    cookie.domain = domain;
    cookie.expires = new Date(1970, 1, 1);
    cookie.path = path;

    this.set(cookie);
};