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
 * A container for name/value tuples encoded using application/x-www-form-urlencoded MIME type.
 * 
 * @extends {WebF.net.http.HttpContent}
 * @constructor
 * @param {Array<WebF.collections.KeyValuePair<string, string>>} nameValueCollection A array of name/value pairs.
 */
WebF.net.http.FormUrlEncodedContent = function (nameValueArray) {
    WebF.net.http.HttpContent.call(this);

    /**
     * @private
     */
    this._params = nameValueArray.slice(0, nameValueArray.length);


    this.headers.add(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, WebF.net.http.FormUrlEncodedContent.CONTENT_TYPE);
};

WebF.net.http.FormUrlEncodedContent.prototype = Object.create(WebF.net.http.HttpContent.prototype);
WebF.net.http.FormUrlEncodedContent.prototype.constructor = WebF.net.http.FormUrlEncodedContent;

/**
 * @override
 * @returns {string}
 */
WebF.net.http.FormUrlEncodedContent.prototype.getBody = function () {
    if (this._params.length < 1) {
        return null;
    }

    var p = this._params[0];
    var body = p.key + '=' + encodeURIComponent(p.value);

    if (this._params.length === 1) {
        return body;
    }

    var x = 1;

    do {
        p = this._params[x++];
        body += '&' + p.key + '=' + encodeURIComponent(p.value);
    }
    while (x < this._params.length);

    return body;
};

/**
 * @const
 */
WebF.net.http.FormUrlEncodedContent.CONTENT_TYPE = WebF.net.mime.mediaTypeNames.Application.FORM_URLENCODED;