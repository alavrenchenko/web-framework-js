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
 * Represents a web response.
 * 
 * @abstract
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {XMLHttpRequest} xhr
 * @param {WebF.net.WebRequest} request
 */
WebF.net.WebResponse = function (request) {
    /**
     * @protected
     */
    this.disposed = false;

    /**
     * Gets the WebRequest.
     * 
     * @readonly
     */
    this.request = request;

    /**
     * Gets the content of the response.
     */
    this.content = null;
};

/**
 * Returns the collection of response headers.
 * 
 * @virtual
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.WebResponse.prototype.getHeaders = function () {
    return new WebF.net.http.headers.HttpHeaders();
};

/**
 * @virtual
 * @param {string} name The name of the header.
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.WebResponse.prototype.getHeader = function (name) {
    return null;
};

/**
 * @virtual
 */
WebF.net.WebResponse.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    this.disposed = true;

    this.request.dispose();
};