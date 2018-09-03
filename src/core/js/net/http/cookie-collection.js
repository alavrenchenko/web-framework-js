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
 * A collection of cookies.
 * 
 * @constructor
 * @param {boolean} [isStrict] If isStrict == false, assumes that incoming cookie is unique. If isStrict == true, replace the cookie if found with the same name, domain, and path. The default is false.
 */
WebF.net.http.CookieCollection = function (isStrict) {
    /**
     * @private
     * @type {Array<WebF.net.http.Cookie>}
     */
    this._items = [];

    this.isStrict = (isStrict != undefined) ? isStrict : false;
};

/**
 * Adds cookie into the collection.
 * 
 * @param {WebF.net.http.Cookie} cookie
 */
WebF.net.http.CookieCollection.prototype.add = function (cookie) {
    if (this.isStrict) {
        for (var x = 0; x < this._items.length; x++) {
            var item = this._items[x];

            if (item.name !== cookie.name) {
                continue;
            }

            if ((item.domain == cookie.domain) && (item.path == cookie.path)) {
                this._items[x] = cookie;

                return;
            }
        }
    }

    this._items.push(cookie);
};

/**
 * Removes all cookies from collection.
 */
WebF.net.http.CookieCollection.prototype.clear = function () {
    this._items = [];
};

/**
 * 
 * @param {function(WebF.net.http.Cookie): boolean} predicate
 * @returns {Array<WebF.net.http.Cookie>}
 * 
 * @example
 * cookieCollection.get(function (x) {
 *     return ((x.name === 'cookieName') && (x.domain === 'cookieDomain') && (x.path === 'cookiePath'));
 * });
 */
WebF.net.http.CookieCollection.prototype.get = function (predicate) {
    return WebF.array.findAll(this._items, predicate);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {Array<WebF.net.http.Cookie>}
 */
WebF.net.http.CookieCollection.prototype.getName = function (name) {
    return WebF.array.findAllByPropertyValue(this._items, 'name', name);
};

/**
 * 
 * @param {function(WebF.net.http.Cookie): boolean} predicate
 * @returns {boolean}
 * 
 * @example
 * cookieCollection.contains(function (x) {
 *     return ((x.name === 'cookieName') && (x.domain === 'cookieDomain') && (x.path === 'cookiePath'));
 * });
 */
WebF.net.http.CookieCollection.prototype.contains = function (predicate) {
    return WebF.array.exists(this._items, predicate);
};

/**
 * 
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.CookieCollection.prototype.containsByName = function (name) {
    return WebF.array.containsByPropertyValue(this._items, 'name', name);
};

/**
 * @param {function(WebF.net.http.Cookie): boolean} predicate
 * @returns {boolean}
 * 
 * @example
 * cookieCollection.remove(function (x) {
 *     return ((x.name === 'cookieName') && (x.domain === 'cookieDomain') && (x.path === 'cookiePath'));
 * });
 */
WebF.net.http.CookieCollection.prototype.remove = function (predicate) {
    return (WebF.array.removeAllIf(this._items, predicate).length > 0);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.CookieCollection.prototype.removeByName = function (name) {
    return (WebF.array.removeAllByPropertyValue(this._items, 'name', name).length > 0);
};

/**
 * @returns {number}
 */
WebF.net.http.CookieCollection.prototype.getCount = function () {
    return this._items.length;
};

