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
 * MIME Media type: application/json.
 * 
 * @extends {WebF.net.http.HttpContent}
 * @constructor
 * @param {string} content
 */
WebF.net.http.JsonContent = function (content) {
    WebF.net.http.HttpContent.call(this);

    /**
     * @private
     */
    this._content = content;


    this.headers.add(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, WebF.net.http.JsonContent.CONTENT_TYPE);
};

WebF.net.http.JsonContent.prototype = Object.create(WebF.net.http.HttpContent.prototype);
WebF.net.http.JsonContent.prototype.constructor = WebF.net.http.JsonContent;

/**
 * @override
 * @returns {string}
 */
WebF.net.http.JsonContent.prototype.getBody = function () {
    return this._content;
};

/**
 * @const
 */
WebF.net.http.JsonContent.CONTENT_TYPE = WebF.net.mime.mediaTypeNames.Application.JSON;