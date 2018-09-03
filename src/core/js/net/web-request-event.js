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
 * @param {string} type
 * @param {Object} source
 * @param {WebF.net.WebRequest} request
 * @param {WebF.net.WebResponse} response
 */
WebF.net.WebRequestEvent = function (type, source, request, response) {
    WebF.events.WFEvent.call(this, type, source);

    /**
     * Gets the WebRequest.
     * 
     * @readonly
     */
    this.request = request;

    /**
     * Gets the WebRequestState.
     * 
     * @readonly
     */
    this.requestState = request.requestState;

    /**
     * Gets the WebResponse.
     * 
     * @readonly
     */
    this.response = response;
};

WebF.net.WebRequestEvent.prototype = Object.create(WebF.events.WFEvent.prototype);
WebF.net.WebRequestEvent.prototype.constructor = WebF.net.WebRequestEvent;