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
 * @implements {WebF.net.IWebClient}
 */
WebF.net.xdr.XdrClient = function () {
    /**
     * @private
     * @readonly
     * @type {WebF.net.WebRequestCollection<WebF.net.xdr.WFXdr>}
     */
    this._requests = new WebF.net.WebRequestCollection();

    /**
     * @private
     */
    this._disposed = false;

    /**
     * Gets or sets the base URL used when sending requests.
     * 
     * @type {string}
     */
    this.baseAddress = null;

    /**
     * Gets or sets the timespan to wait before the request times out.
     * 
     * @type {number}
     */
    this.timeout = 0;

    /**
     * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestProcessEvent>}
     */
    this.requestProcess = new WebF.events.MultipleEventHandler();

    /**
     * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestEvent>}
     */
    this.requestCompleted = new WebF.events.MultipleEventHandler();
};

/**
 * @param {WebF.net.WebRequestMessage} requestMessage
 * @returns {WebF.net.xdr.WFXdr}
 */
WebF.net.xdr.XdrClient.prototype.send = function (requestMessage) {
    var method = requestMessage.method;
    var url = null;

    if (!WebF.string.isNullOrWhitespace(requestMessage.requestUrl)) {
        url = requestMessage.requestUrl;
    }
    else if (!WebF.string.isNullOrWhitespace(this.baseAddress)) {
        url = this.baseAddress;
    }
    else {
        throw new Error('Invalid requestUrl.');
    }

    var content = requestMessage.content;
    var body = (content != null) ? content.getBody() : null;
    var data = null;

    if (((method === WebF.net.http.HttpMethod.GET) || (method === WebF.net.http.HttpMethod.HEAD)) && (typeof body === 'string')) {
        var index = url.indexOf('?');

        if (index < 0) {
            url += '?';
        }
        else if (index < (url.length - 1)) {
            var c = url[url.length - 1];

            if ((c !== '?' && (c !== '&'))) {
                url += '&';
            }
        }

        url += body;
    }
    else {
        data = body;
    }

    var request = new WebF.net.xdr.WFXdr(method, url, content);

    this._requests.add(request);

    var xdr = request.nativeRequest;

    xdr.onerror = this._onError.bind(this);
    xdr.onload = this._onLoad.bind(this);
    xdr.onprogress = this._onProgress.bind(this);
    xdr.ontimeout = this._onTimeout.bind(this);

    try {
        xdr.open(method, url);

        xdr.timeout = this.timeout;

        request.requestState = WebF.net.WebRequestState.WORKING;

        if (data != null) {
            xdr.send(data);
        }
        else {
            xdr.send();
        }
    }
    catch (e) {
        request.requestState = WebF.net.WebRequestState.ERROR;
        this._requests.remove(request);
        request.dispose();

        throw e;
    }

    return request;
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onError = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onError');

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.ERROR;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.ERROR, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onLoad = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onLoad');

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    if (request.requestState === WebF.net.WebRequestState.WORKING) {
        request.requestState = WebF.net.WebRequestState.COMPLETED;
    }

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.LOAD, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onProgress = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onProgress');

    if (this.requestProcess.getHandlerCount() < 1) {
        return;
    }

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.PROGRESS, this, request);
    e2.nativeEvent = e;

    this._onRequestProcess(e2);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onTimeout = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onTimeout');

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.TIMEOUT_EXPIRED;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.TIMEOUT, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {WebF.net.xdr.WFXdr} request
 */
WebF.net.xdr.XdrClient.prototype._requestEnd = function (request) {
    this._requests.remove(request);

    if (this.requestCompleted.getHandlerCount() < 1) {
        return;
    }

    var response = new WebF.net.xdr.XdrResponse(request);

    var e = new WebF.net.WebRequestEvent(WebF.net.WebRequestEventType.REQUEST_COMPLETED, this, request, response);

    this._onRequestCompleted(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestProcessEvent} e
 */
WebF.net.xdr.XdrClient.prototype._onRequestProcess = function (e) {
    this.requestProcess.invoke(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestEvent} e
 */
WebF.net.xdr.XdrClient.prototype._onRequestCompleted = function (e) {
    this.requestCompleted.invoke(e);
};

/**
 * Cancel all pending requests on this instance.
 */
WebF.net.xdr.XdrClient.prototype.cancelPendingRequests = function () {

};

WebF.net.xdr.XdrClient.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    this.requestProcess.removeAllHandlers();
    this.requestCompleted.removeAllHandlers();

    this._requests.dispose();
};