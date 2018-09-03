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
 * A collection of requests.
 * 
 * @constructor
 * @implements {WebF.IDisposable}
 */
WebF.net.WebRequestCollection = function () {
    /**
     * @private
     * @type {Array<WebF.net.WebRequest>}
     */
    this._items = [];

    /**
     * @private
     */
    this._disposed = false;
};

/**
 * Adds request into the collection.
 * 
 * @param {WebF.net.WebRequest} task
 */
WebF.net.WebRequestCollection.prototype.add = function (task) {
    this._items.push(task);
};

/**
 * Removes all requests from collection.
 */
WebF.net.WebRequestCollection.prototype.clear = function () {
    this._items = [];
};

/**
 * @param {XMLHttpRequest|XDomainRequest} nativeRequest
 * @returns {WebF.net.WebRequest}
 */
WebF.net.WebRequestCollection.prototype.getByNativeRequest = function (nativeRequest) {
    return WebF.array.findByPropertyValue(this._items, 'nativeRequest', nativeRequest);
};

/**
 * 
 * @param {WebF.net.WebRequest} request
 * @returns {boolean}
 */
WebF.net.WebRequestCollection.prototype.remove = function (request) {
    return (WebF.array.remove(this._items, request) != null);
};

WebF.net.WebRequestCollection.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    if (this._items.length < 1) {
        return;
    }

    var x = 0;

    do {
        this._items[x++].dispose();
    }
    while (x < this._items.length);

    this.clear();
};