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
 * @param {Window} win
 */
WebF.app.window.WFWindow = function (win) {
    /**
     * @private
     * @readonly
     */
    this._window = win || window;

    /**
     * @readonly
     */
    var _dom = new WebF.dom.DOMHelper(this._window.document);

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _dom;
        },
        enumerable: true
    });

    /**
     * @type {WebF.app.view.Page}
     */
    this.page = null;

    /**
     * @private
     */
    this._disposed = false;
};

/**
 * @returns {Window}
 */
WebF.app.window.WFWindow.prototype.getWindow = function () {
    return this._window;
};

/**
 * @returns {Screen}
 */
WebF.app.window.WFWindow.prototype.getScreen = function () {
    return this._window.screen;
};

/**
 * @returns {number?}
 */
WebF.app.window.WFWindow.prototype.getDevicePixelRatio = function () {
    // IE >= 11
    if (typeof this._window.devicePixelRatio !== 'undefined') {
        return this._window.devicePixelRatio;
    }
    else if (typeof this._window.screen.deviceXDPI !== 'undefined') {
        // IE <= 10
        return (this._window.screen.deviceXDPI / this._window.screen.logicalXDPI);
    }

    return null;
};


/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getInnerWidth = function () {
    // readonly
    return this._window.innerWidth;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getInnerHeight = function () {
    // readonly
    return this._window.innerHeight;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getOuterWidth = function () {
    // readonly
    return this._window.outerWidth;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getOuterHeight = function () {
    // readonly
    return this._window.outerHeight;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getPageXOffset = function () {
    // readonly
    return this._window.pageXOffset;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getPageYOffset = function () {
    // readonly
    return this._window.pageYOffset;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenLeft = function () {
    // readonly
    return this._window.screenLeft;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenTop = function () {
    // readonly
    return this._window.screenTop;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenX = function () {
    // readonly
    return this._window.screenX;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenY = function () {
    // readonly
    return this._window.screenY;
};

/**
 * @param {number} x
 * @param {number} y
 */
WebF.app.window.WFWindow.prototype.scroll = function (x, y) {
    // scrollTo
    this._window.scroll(x, y);
};

/**
 * @param {number} value
 */
WebF.app.window.WFWindow.prototype.scrollByOnScreenPages = function (value) {
    // Firefox
    //window.scrollByPages

    this._window.scrollBy(0, this._window.innerHeight * value);
};

WebF.app.window.WFWindow.prototype.close = function () {
    this._window.close();
};

/**
 * @param {number} x
 * @param {number} y
 */
WebF.app.window.WFWindow.prototype.scrollBy = function (x, y) {
    this._window.scroll(x, y);
};



/**
* @returns {boolean}
*/
WebF.app.window.WFWindow.prototype.isDisposed = function () {
    return this._disposed;
};

/**
 * @virtual
 */
WebF.app.window.WFWindow.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    if (this.page != null) {
        this.page.dispose();
    }
};