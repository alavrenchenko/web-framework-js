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
 * A collection of headers and their values.
 * 
 * @constructor
 */
WebF.net.http.headers.HttpHeaders = function () {
    /**
     * @private
     * @type {Array<WebF.net.http.headers.HttpHeader>}
     */
    this._items = [];
};

/**
 * Adds the specified header and its value into the collection.
 * 
 * @param {string} name The header to add to the collection.
 * @param {string} value The content of the header.
 */
WebF.net.http.headers.HttpHeaders.prototype.add = function (name, value) {
    this._items.push(new WebF.net.http.headers.HttpHeader(name, value));
};

/**
 * Removes all headers from collection.
 */
WebF.net.http.headers.HttpHeaders.prototype.clear = function () {
    this._items = [];
};

/**
 * @param {string} name The name of the header.
 * @returns {Array<WebF.net.http.headers.HttpHeader>}
 */
WebF.net.http.headers.HttpHeaders.prototype.get = function (name) {
    return WebF.array.findAllByPropertyValue(this._items, 'name', name);
};

/**
 * @returns {Array<WebF.net.http.headers.HttpHeader>}
 */
WebF.net.http.headers.HttpHeaders.prototype.getAllHeaders = function () {
    return this._items.slice(0, this._items.length);
};

/**
 * @param {number} index
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.http.headers.HttpHeaders.prototype.getByIndex = function (index) {
    if ((index < 0) || (index >= this._items.length)) {
        return null;
    }

    return this._items[index];
};

/**
 * 
 * @param {string} name The name of the header.
 * @returns {boolean}
 */
WebF.net.http.headers.HttpHeaders.prototype.contains = function (name) {
    return WebF.array.containsByPropertyValue(this._items, 'name', name);
};

/**
 * @param {string} name The name of the header.
 * @returns {boolean}
 */
WebF.net.http.headers.HttpHeaders.prototype.remove = function (name) {
    return (WebF.array.removeAllByPropertyValue(this._items, 'name', name).length > 0);
};

/**
 * @returns {number}
 */
WebF.net.http.headers.HttpHeaders.prototype.getCount = function () {
    return this._items.length;
};