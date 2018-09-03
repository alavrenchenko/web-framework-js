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
 * @param {WebF.net.xdr.WFXdr} request
 */
WebF.net.xdr.XdrResponse = function (request) {
    WebF.net.WebResponse.call(this, request);

    /**
     * Gets the content of the response.
     */
    this.content = new WebF.net.xdr.XdrResponseContent(request.nativeRequest);

    /**
     * @private
     * @type {WebF.net.http.headers.HttpHeaders}
     */
    this._headers = null;
};

WebF.net.xdr.XdrResponse.prototype = Object.create(WebF.net.WebResponse.prototype);
WebF.net.xdr.XdrResponse.prototype.constructor = WebF.net.xdr.XdrResponse;

/**
 * Returns the collection of response headers.
 * 
 * @override
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.xdr.XdrResponse.prototype.getHeaders = function () {
    if (this._headers == null) {
        var headers = new WebF.net.http.headers.HttpHeaders();
        var contentType = this.request.nativeRequest.contentType;

        if (contentType != null) {
            headers.add(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, contentType);
        }

        this._headers = headers;
    }

    return this._headers;
};

/**
 * @override
 * @param {string} name The name of the header.
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.xdr.XdrResponse.prototype.getHeader = function (name) {
    var contentType = null;

    if ((name.toLowerCase() == WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE.toLowerCase()) && ((contentType = this.request.nativeRequest.contentType) != null)) {
        return new WebF.net.http.headers.HttpHeader(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, contentType);
    }

    return null;
};