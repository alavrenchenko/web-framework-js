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
 * @extends {WebF.net.WebRequest}
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.xhr.WFXhr = function (method, requestUrl, content) {
    WebF.net.WebRequest.call(this, new XMLHttpRequest(), method, requestUrl, content);

    /**
     * @readonly
     * @type {WebF.net.xhr.XhrResponseType}
     */
    this.responseType = WebF.net.xhr.XhrResponseType.DEFAULT;

    /**
     * @readonly
     * @type {boolean}
     */
    this.withCredentials = false;
};

WebF.net.xhr.WFXhr.prototype = Object.create(WebF.net.WebRequest.prototype);
WebF.net.xhr.WFXhr.prototype.constructor = WebF.net.xhr.WFXhr;

/**
 * @override
 */
WebF.net.xhr.WFXhr.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    var xhr = this.nativeRequest;

    if (this.requestState === WebF.net.WebRequestState.WORKING) {
        try {
            xhr.abort();
        }
        catch (e) {

        }
    }

    xhr.onabort = null;
    xhr.onerror = null;
    xhr.onload = null;
    xhr.onloadend = null;
    xhr.onloadstart = null;
    xhr.onprogress = null;
    xhr.onreadystatechange = null;
    xhr.ontimeout = null;

    WebF.net.WebRequest.prototype.dispose.call(this);
    //WebF.object.getBasePrototype(this).dispose.call(this);
};