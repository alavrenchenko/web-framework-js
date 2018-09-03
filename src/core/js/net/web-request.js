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
 * Represents a web request.
 * 
 * @abstract
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {XMLHttpRequest|XDomainRequest} nativeRequest
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.WebRequest = function (nativeRequest, method, requestUrl, content) {
    /**
     * @protected
     */
    this.disposed = false;

    /**
     * Gets the native request (XMLHttpRequest or XDomainRequest).
     * 
     * @readonly
     * @type {XMLHttpRequest|XDomainRequest}
     */
    this.nativeRequest = nativeRequest;

    /**
     * Gets or sets the contents of the request.
     * 
     * @readonly
     * @type {WebF.net.http.HttpContent}
     */
    this.content = (content != undefined) ? content : null;

    /**
     * Gets the collection of request headers.
     * 
     * @readonly
     */
    this.headers = new WebF.net.http.headers.HttpHeaders();

    /**
     * Gets or sets the HTTP method used by the web request.
     * 
     * @readonly
     */
    this.method = method;

    /**
     * Gets or sets the URL used for the request.
     * 
     * @readonly
     */
    this.requestUrl = requestUrl;

    this.requestState = WebF.net.WebRequestState.UNINITIALIZED;
};

/**
 * @virtual
 */
WebF.net.WebRequest.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    this.disposed = true;

    this.nativeRequest = null;
};