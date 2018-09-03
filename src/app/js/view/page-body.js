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
 * @param {WebF.app.view.Page} page
 */
WebF.app.view.PageBody = function (page) {
    /**
     * @readonly
     */
    var _page = page;

    Object.defineProperty(this, 'page', {
        get: function () {
            return _page;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _page.domHelper;
        },
        enumerable: true
    });

    /**
     * @readonly
     */
    this._document = this.domHelper.getDocument();

    /**
     * @type {Element}
     */
    this._contentElement = null;
};

/**
 * @returns {Element}
 */
WebF.app.view.PageBody.prototype.getContentElement = function () {
    return this._contentElement;
};

/**
 * @param {Element} element
 */
WebF.app.view.PageBody.prototype.setContentElement = function (element) {
    this._contentElement = element;
};



