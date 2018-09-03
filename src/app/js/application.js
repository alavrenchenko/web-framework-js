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
WebF.app.Application = function (win) {
    /**
     * @private
     * @readonly
     * @type {WebF.window.WFWindow}
     */
    this._mainWindow = new WebF.app.window.WFWindow(win);

    Object.defineProperty(this, 'mainWindow', {
        get: function () {
            return this._mainWindow;
        },
        enumerable: true
    });

    /**
     * @private
     */
    this._disposed = false;

    this._isInitialized = false;

    /**
     * @private
     * @readonly
     */
    this._window = this._mainWindow.getWindow();

    /**
     * @private
     * @type {function(Event)}
     */
    this._onlineHandler = this.onOnline.bind(this);

    /**
     * @private
     * @type {function(Event)}
     */
    this._offlineHandler = this.onOffline.bind(this);

    this._window.addEventListener(WebF.events.NativeEventType.ONLINE, this._onlineHandler);
    this._window.addEventListener(WebF.events.NativeEventType.OFFLINE, this._offlineHandler);

    /**
     * @private
     * @type {function(Event)}
     */
    this._pageInitializedHandler = null;

    this.initialize();
};

/**
 * @protected
 * @virtual
 */
WebF.app.Application.prototype.initialize = function () {
    if (this._isInitialized) {
        return;
    }

    this.createPage();

    this._isInitialized = true;

    if (this._mainWindow.page && !this._mainWindow.page.isInitialized()) {
        this._pageInitializedHandler = this.onPageInitialized.bind(this);
        this._mainWindow.page.initialized.addHandler(this._pageInitializedHandler);
    }
    else {
        this._mainWindow.page.initializeContent();
    }
};

/**
 * @protected
 * @virtual
 */
WebF.app.Application.prototype.createPage = function () {
    if (this._mainWindow.page) {
        return;
    }

    this._mainWindow.page = new WebF.app.view.Page(this._mainWindow, true);
};

WebF.app.Application.prototype.initializePageContent = function () {

};

/**
 * @returns {boolean}
 */
WebF.app.Application.prototype.isInitialized = function () {
    return this._isInitialized;
};


/**************************************************************************************
 * <App EventHandlers>
 *************************************************************************************/

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.app.Application.prototype.onPageInitialized = function (e) {
    this._mainWindow.page.initialized.removeHandler(this._pageInitializedHandler);
    this._pageInitializedHandler = null;


    this._mainWindow.page.initializeContent();
};

/**************************************************************************************
 * </App EventHandlers>
 *************************************************************************************/






/**************************************************************************************
 * <App NativeEventHandlers>
 *************************************************************************************/

 /**
  * @protected
  * @virtual
  * @param {Event} e
  */
WebF.app.Application.prototype.onOnline = function (e) {

};

/**
  * @protected
  * @virtual
  * @param {Event} e
  */
WebF.app.Application.prototype.onOffline = function (e) {

};

/**************************************************************************************
 * </App NativeEventHandlers>
 *************************************************************************************/

/**
* @returns {boolean}
*/
WebF.app.Application.prototype.isDisposed = function () {
    return this._disposed;
};

 /**
 * @virtual
 */
WebF.app.Application.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    this._window.removeEventListener(WebF.events.NativeEventType.ONLINE, this._onlineHandler);
    this._window.removeEventListener(WebF.events.NativeEventType.OFFLINE, this._offlineHandler);

    this._onlineHandler = null;
    this._offlineHandler = null;

    this._pageInitializedHandler = null;

    this._mainWindow.dispose();
};