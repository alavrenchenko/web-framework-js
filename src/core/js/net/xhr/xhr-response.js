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
 * @extends {WebF.net.WebResponse}
 * @param {WebF.net.xhr.WFXhr} request
 */
WebF.net.xhr.XhrResponse = function (request) {
    WebF.net.WebResponse.call(this, request);

    /**
     * @private
     */
    this._xhr = request.nativeRequest;

    /**
     * Gets the content of the response.
     */
    this.content = new WebF.net.xhr.XhrResponseContent(this._xhr);

    /**
     * @private
     * @type {WebF.net.http.headers.HttpHeaders}
     */
    this._headers = null;
};

WebF.net.xhr.XhrResponse.prototype = Object.create(WebF.net.WebResponse.prototype);
WebF.net.xhr.XhrResponse.prototype.constructor = WebF.net.xhr.XhrResponse;

/**
 * Returns the collection of response headers.
 * 
 * @override
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.xhr.XhrResponse.prototype.getHeaders = function () {
    if (this._headers == null) {
        this._headers = WebF.net.xhr.XhrResponse.parseHeaders(this._xhr.getAllResponseHeaders());
    }

    return this._headers;
};

/**
 * @override
 * @param {string} name The name of the header.
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.xhr.XhrResponse.prototype.getHeader = function (name) {
    var value = this._xhr.getResponseHeader(name);

    if (value != null) {
        return new WebF.net.http.headers.HttpHeader(name, value);
    }

    return null;
};

/**
 * @returns {WebF.net.xhr.XhrResponseType}
 */
WebF.net.xhr.XhrResponse.prototype.getType = function () {
    return this._xhr.responseType;
};

/**
 * @returns {number}
 */
WebF.net.xhr.XhrResponse.prototype.getStatusCode = function () {
    return this._xhr.status;
};

/**
 * @returns {string}
 */
WebF.net.xhr.XhrResponse.prototype.getStatusText = function () {
    return this._xhr.statusText;
};

/**
 * @static
 * @param {string} headersStr The response headers as a string (XMLHttpRequest.getAllResponseHeaders()).
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.xhr.XhrResponse.parseHeaders = function (headersStr) {
    var headers = new WebF.net.http.headers.HttpHeaders();
    var parts = headersStr.split('\r\n');

    for (var x = 0; x < parts.length; x++) {
        var part = parts[x];

        if (WebF.string.isNullOrWhitespace(part)) {
            continue;
        }

        var index = part.indexOf(': ');

        if (index < 1) {
            continue;
        }

        var name = part.substring(0, index);
        var value = (index < (part.length - 2)) ? part.substring(index + 2) : '';

        headers.add(name, value);
    }

    return headers;
};