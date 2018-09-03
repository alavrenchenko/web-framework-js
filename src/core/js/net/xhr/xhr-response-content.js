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
 * @param {XMLHttpRequest} xhr
 */
WebF.net.xhr.XhrResponseContent = function (xhr) {
    /**
     * @private
     */
    this._xhr = xhr;
};

/**
 * Returns the response body (XMLHttpRequest.response).
 * 
 * @returns {string|ArrayBuffer|Blob|Document|Object}
 */
WebF.net.xhr.XhrResponseContent.prototype.getBody = function () {
    return this._xhr.response;
};

/**
 * Returns the response text (XMLHttpRequest.responseText).
 * 
 * @returns {string}
 */
WebF.net.xhr.XhrResponseContent.prototype.getText = function () {
    return this._xhr.responseText;
};

/**
 * Returns the response document (XMLHttpRequest.responseXML).
 * 
 * @returns {Document?}
 */
WebF.net.xhr.XhrResponseContent.prototype.getXml = function () {
    return this._xhr.responseXML;
};