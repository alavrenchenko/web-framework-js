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
 * @param {WebF.dom.DOMHelper} domHelper
 */
WebF.dom.PageVisibility = function (domHelper) {
    /**
     * @private
     * @readonly
     */
    this._dom = domHelper;

    /**
     * @private
     * @readonly
     */
    this._document = this._dom.getDocument();

    var pvInfo = WebF.userAgent.capabilities.getPageVisibilityInfo(this._document);

    this._hiddenPropertyName = pvInfo.hiddenPropertyName;
    this._visibilityStatePropertyName = pvInfo.visibilityStatePropertyName;
    this._visibilityChangeEventType = pvInfo.visibilityChangeEventType;
    this.isSupported = pvInfo.isSupported;
};

WebF.dom.PageVisibility.prototype.isVisible = function () {
    return (!this.isSupported || !this._document[this._hiddenPropertyName]);
};

WebF.dom.PageVisibility.prototype.getVisibilityState = function () {
    if (!this.isSupported) {
        return null;
    }

    return this._document[this._visibilityStatePropertyName];
};