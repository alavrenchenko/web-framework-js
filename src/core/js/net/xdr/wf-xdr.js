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
WebF.net.xdr.WFXdr = function (method, requestUrl, content) {
    WebF.net.WebRequest.call(this, new XDomainRequest(), method, requestUrl, content);
};

WebF.net.xdr.WFXdr.prototype = Object.create(WebF.net.WebRequest.prototype);
WebF.net.xdr.WFXdr.prototype.constructor = WebF.net.xdr.WFXdr;

/**
 * @override
 */
WebF.net.xdr.WFXdr.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    var xdr = this.nativeRequest;

    if (this.requestState === WebF.net.WebRequestState.WORKING) {
        try {
            xdr.abort();
        }
        catch (e) {

        }
    }

    xdr.onerror = null;
    xdr.onload = null;
    xdr.onprogress = null;
    xdr.ontimeout = null;

    WebF.net.WebRequest.prototype.dispose.call(this);
    //WebF.object.getBasePrototype(this).dispose.call(this);
};