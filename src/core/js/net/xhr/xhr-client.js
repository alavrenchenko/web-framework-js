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
 * @implements {WebF.IDisposable}
 */
WebF.net.xhr.XhrClient = function () {

    /**
     * @private
     * @readonly
     * @type {WebF.net.WebRequestCollection<WebF.net.xhr.WFXhr>}
     */
    this._requests = new WebF.net.WebRequestCollection();

    /**
     * @private
     */
    this._disposed = false;

    /**
     * Gets the headers which should be sent with each request.
     * 
     * @readonly
     */
    this.defaultRequestHeaders = new WebF.net.http.headers.HttpHeaders();

    /**
     * Gets or sets the base URL used when sending requests.
     * 
     * @type {string}
     */
    this.baseAddress = null;

    /**
     * Gets or sets the timespan to wait before the request times out. Time in milliseconds.
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

    /**
     * @private
     */
    this._hasResponse = ('response' in XMLHttpRequest.prototype);

    /**
     * @private
     */
    this._hasResponseBody = ('responseBody' in XMLHttpRequest.prototype);

    /**
     * @private
     */
    this._hasOnLoadEnd = ('onloadend' in XMLHttpRequest.prototype);
};

/**
 * @param {WebF.net.xhr.WFXhrMessage} requestMessage
 * @returns {WebF.net.xhr.WFXhr}
 */
WebF.net.xhr.XhrClient.prototype.send = function (requestMessage) {
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

    var request = new WebF.net.xhr.WFXhr(method, url, content);

    this._requests.add(request);

    var xhr = request.nativeRequest;

    xhr.onabort = this._onAbort.bind(this);
    xhr.onerror = this._onError.bind(this);
    xhr.onload = this._onLoad.bind(this);
    xhr.onloadend = this._onLoadEnd.bind(this);
    xhr.onloadstart = this._onLoadStart.bind(this);
    xhr.onprogress = this._onProgress.bind(this);
    xhr.onreadystatechange = this._onReadyStateChange.bind(this);
    xhr.ontimeout = this._onTimeout.bind(this);

    try {
        xhr.open(method, url, true);

        xhr.timeout = this.timeout;

        /**
         * @type {WebF.net.http.headers.HttpHeader}
         */
        var header = null;
        var x;
        var count;

        if ((count = this.defaultRequestHeaders.getCount()) > 0) {
            x = 0;

            do {
                header = this.defaultRequestHeaders.getByIndex(x++);

                request.headers.add(header.name, header.value);
                xhr.setRequestHeader(header.name, header.value);
            }
            while (x < count);
        }

        /**
         * @type {Array<WebF.net.http.headers.HttpHeader>}
         */
        var headers = requestMessage.headers;

        if ((count = headers.getCount()) > 0) {
            x = 0;

            do {
                header = headers.getByIndex(x++);

                request.headers.add(header.name, header.value);
                xhr.setRequestHeader(header.name, header.value);
            }
            while (x < count);
        }

        if (content != null) {
            headers = content.headers;

            if ((count = headers.getCount()) > 0) {
                x = 0;

                do {
                    header = headers.getByIndex(x++);

                    if (header == null) {
                        continue;
                    }

                    request.headers.add(header.name, header.value);
                    xhr.setRequestHeader(header.name, header.value);
                }
                while (x < count);
            }
        }

        if (requestMessage.responseType) {
            request.responseType = requestMessage.responseType;
            xhr.responseType = requestMessage.responseType;
        }

        if ('withCredentials' in xhr) {
            request.withCredentials = requestMessage.withCredentials;

            // https://bugzilla.mozilla.org/show_bug.cgi?id=736340
            if (xhr.withCredentials !== requestMessage.withCredentials) {
                xhr.withCredentials = requestMessage.withCredentials;
            }
        }

        request.requestState = WebF.net.WebRequestState.WORKING;

        if (data != null) {
            xhr.send(data);
        }
        else {
            xhr.send();
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
WebF.net.xhr.XhrClient.prototype._onAbort = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onAbort');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.ABORTED;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.ABORT, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onError = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onError');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.ERROR;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.ERROR, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onLoad = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onLoad');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    if (request.requestState === WebF.net.WebRequestState.WORKING) {
        request.requestState = WebF.net.WebRequestState.COMPLETED;
    }

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.LOAD, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onLoadEnd = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onLoadEnd');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }
    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.LOADEND, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onLoadStart = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onLoadStart');

    if (this.requestProcess.getHandlerCount() < 1) {
        return;
    }

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.LOADSTART, this, request);
    e2.nativeEvent = e;

    this._onRequestProcess(e2);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onProgress = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onProgress');

    if (this.requestProcess.getHandlerCount() < 1) {
        return;
    }

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.PROGRESS, this, request);
    e2.nativeEvent = e;

    this._onRequestProcess(e2);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onReadyStateChange = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onReadyStateChange');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.READYSTATECHANGE, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    // IE < 10
    if ((xhr.readyState === XMLHttpRequest.DONE) && (typeof xhr.responseText === 'undefined') && (typeof xhr.status === 'undefined') && this._hasResponseBody && !this._hasResponse) {
        request.requestState = WebF.net.WebRequestState.ABORTED;

        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onTimeout = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onTimeout');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.TIMEOUT_EXPIRED;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.TIMEOUT, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {WebF.net.xhr.WFXhr} request
 */
WebF.net.xhr.XhrClient.prototype._requestEnd = function (request) {
    this._requests.remove(request);

    if (this.requestCompleted.getHandlerCount() < 1) {
        return;
    }

    var response = new WebF.net.xhr.XhrResponse(request);

    var e = new WebF.net.WebRequestEvent(WebF.net.WebRequestEventType.REQUEST_COMPLETED, this, request, response);

    this._onRequestCompleted(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestProcessEvent} e
 */
WebF.net.xhr.XhrClient.prototype._onRequestProcess = function (e) {
    this.requestProcess.invoke(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestEvent} e
 */
WebF.net.xhr.XhrClient.prototype._onRequestCompleted = function (e) {
    this.requestCompleted.invoke(e);
};

/**
 * Cancel all pending requests on this instance.
 */
WebF.net.xhr.XhrClient.prototype.cancelPendingRequests = function () {

};

WebF.net.xhr.XhrClient.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    this.requestProcess.removeAllHandlers();
    this.requestCompleted.removeAllHandlers();

    this._requests.dispose();
};