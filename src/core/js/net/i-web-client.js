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
 * @interface
 * @implements {WebF.IDisposable}
 */
WebF.net.IWebClient = function () { };

/**
 * Gets or sets the base URL used when sending requests.
 * 
 * @type {string}
 */
WebF.net.IWebClient.prototype.baseAddress;

/**
 * Gets or sets the timespan to wait before the request times out.
 * 
 * @type {number}
 */
WebF.net.IWebClient.prototype.timeout;

/**
 * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestProcessEvent>}
 */
WebF.net.IWebClient.prototype.requestProcess;

/**
 * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestEvent>}
 */
WebF.net.IWebClient.prototype.requestCompleted;

/**
 * @param {WebF.net.WebRequestMessage} requestMessage
 * @returns {WebF.net.WebRequest}
 */
WebF.net.IWebClient.prototype.send = function (requestMessage) {
    throw new Error('Not implemented.');
};

/**
 * Cancel all pending requests on this instance.
 */
WebF.net.IWebClient.prototype.cancelPendingRequests = WebF.base.notImplementedMethod;