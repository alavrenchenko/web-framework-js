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
 * @param {WebF.app.window.WFWindow} wfWindow
 * @param {boolean} [isLazyInit] A value indicating whether this page should be lazily initialized. The default is false.
 */
WebF.app.view.Page = function (wfWindow, isLazyInit) {
    /**
     * @readonly
     */
    var _wfWindow = wfWindow;

    Object.defineProperty(this, 'wfWindow', {
        get: function () {
            return _wfWindow;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _wfWindow.domHelper;
        },
        enumerable: true
    });

    /**
     * @private
     * @readonly
     */
    this._document = this.domHelper.getDocument();

    /**
     * @type {WebF.app.view.PageHead}
     */
    this.head = null;

    /**
     * @type {WebF.app.view.PageBody}
     */
    this.body = null;

    // <Events>

    this.initialized = new WebF.events.MultipleEventHandler();

    this.contentInitialized = new WebF.events.MultipleEventHandler();

    // </Events>

    /**
     * @private
     */
    this._disposed = false;

    /**
     * @private
     */
    this._isPreInitialized = false;

    /**
     * @private
     */
    this._isInitialized = false;

    /**
     * @private
     */
    this._isContentInitialized = false;

    this.visibility = new WebF.dom.PageVisibility(this.domHelper);

    /**
     * @private
     */
    this._isVisibleStart = this.visibility.isVisible();

    /**
     * @private
     */
    this._isLazyInitStarted = false;

    /**
     * @private
     * @type {function(Event)}
     */
    this._visibilityChangeHandler = null;


    this.preInitialize(isLazyInit);
};

/**
 * @protected
 * @virtual
 * @param {boolean} [isLazyInit] A value indicating whether this page should be lazily initialized. The default is false.
 */
WebF.app.view.Page.prototype.preInitialize = function (isLazyInit) {
    if (this._isPreInitialized) {
        return;
    }

    this.head = new WebF.app.view.PageHead(this);

    this.body = new WebF.app.view.PageBody(this);

    if (!isLazyInit || this._isVisibleStart) {
        this._isPreInitialized = true;
        this.initialize();
    }
    else {
        this._visibilityChangeHandler = this.onVisibilityChangeStart.bind(this);
        this._document.addEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
        this._isLazyInitStarted = true;
        this._isPreInitialized = true;
    }
};

/**
 * @virtual
 */
WebF.app.view.Page.prototype.initialize = function () {
    if (this._isInitialized) {
        return;
    }

    if (this._isLazyInitStarted && this._visibilityChangeHandler) {
        this._document.removeEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
    }

    this._visibilityChangeHandler = this.onVisibilityChange.bind(this);
    this._document.addEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);





    this._isInitialized = true;

    this.onInitialized(new WebF.events.WFEvent(WebF.app.view.PageEventType.INITIALIZED, this));
};

/**
 * @virtual
 */
WebF.app.view.Page.prototype.initializeContent = function () {
    if (this._isContentInitialized) {
        return;
    }

    this._isContentInitialized = true;

    this.onContentInitialized(new WebF.events.WFEvent(WebF.app.view.PageEventType.CONTENT_INITIALIZED, this));
};

/**
 * @returns {boolean}
 */
WebF.app.view.Page.prototype.isPreInitialized = function () {
    return this._isPreInitialized;
};

/**
 * @returns {boolean}
 */
WebF.app.view.Page.prototype.isInitialized = function () {
    return this._isInitialized;
};

/**
 * @returns {boolean}
 */
WebF.app.view.Page.prototype.isContentInitialized = function () {
    return this._isContentInitialized;
};


/**
 * @returns {Element}
 */
WebF.app.view.Page.prototype.getContentElement = function () {
    return this.body.getContentElement();
};

/**
 * @param {Element} element
 */
WebF.app.view.Page.prototype.setContentElement = function (element) {
    this.body.setContentElement(element);
};

WebF.app.view.Page.prototype.isFocused = function () {
    return this._document.hasFocus();
};

WebF.app.view.Page.prototype.getTitle = function () {
    return this._document.title;
};

WebF.app.view.Page.prototype.setTitle = function (title) {
    this._document.title = title;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientWidth = function () {
    // readonly
    return this._document.clientWidth;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientHeight = function () {
    // readonly
    return this._document.clientHeight;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientLeft = function () {
    // readonly
    return this._document.clientLeft;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientTop = function () {
    // readonly
    return this._document.clientTop;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollWidth = function () {
    // readonly
    return this._document.scrollWidth;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollHeight = function () {
    // readonly
    return this._document.scrollHeight;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollLeft = function () {
    return this._document.scrollLeft;
};

/**
 * @param {number} value
 */
WebF.app.view.Page.prototype.setScrollLeft = function (value) {
    this._document.scrollLeft = value;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollTop = function () {
    return this._document.scrollTop;
};

/**
 * @param {number} value
 */
WebF.app.view.Page.prototype.setScrollTop = function (value) {
    this._document.scrollTop = value;
};

/**
 * @returns {DOMRect|ClientRect} IE returns ClientRect.
 */
WebF.app.view.Page.prototype.getBoundingClientRect = function () {
    return this._document.documentElement.getBoundingClientRect();
};

/**
 * @returns {string} Document.domain.
 */
WebF.app.view.Page.prototype.getDomain = function () {
    return this._document.domain;
};





/**************************************************************************************
 * <Page NativeEventHandlers>
 *************************************************************************************/

/**
 * @protected
 * @virtual
 */
WebF.app.view.Page.prototype.onVisibilityChangeStart = function (e) {
    this.initialize();
};

 /**
  * @protected
  * @virtual
  */
WebF.app.view.Page.prototype.onVisibilityChange = function (e) {

};


/**************************************************************************************
 * </Page NativeEventHandlers>
 *************************************************************************************/

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.app.view.Page.prototype.onInitialized = function (e) {
    this.initialized.invoke(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.app.view.Page.prototype.onContentInitialized = function (e) {
    this.contentInitialized.invoke(e);
};

/**
* @returns {boolean}
*/
WebF.app.view.Page.prototype.isDisposed = function () {
    return this._disposed;
};

/**
 * @virtual
 */
WebF.app.view.Page.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    if (this.body) {
        this.body.setContentElement(null);
    }

    if (this._visibilityChangeHandler) {
        if (this._isInitialized) {
            this._document.removeEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
        }
        else if (this._isLazyInitStarted) {
            this._document.removeEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
        }

        this._visibilityChangeHandler = null;
    }

    this.initialized.removeAllHandlers();
    this.contentInitialized.removeAllHandlers();
};