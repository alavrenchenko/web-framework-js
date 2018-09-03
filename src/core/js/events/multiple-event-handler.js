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
 * @param {function} [actionHandler]
 */
WebF.events.MultipleEventHandler = function (actionHandler) {
    /**
     * @private
     */
    this._actionHandler = WebF.base.isFunction(actionHandler) ? actionHandler : null;
    /**
     * @private
     * @type {Array<function>}
     */
    this._handlers = [];
};

/**
 * @param {function} handler
 */
WebF.events.MultipleEventHandler.prototype.addHandler = function (handler) {
    var index = this._handlers.indexOf(handler);

    if (index >= 0) {
        return;
    }

    this._handlers.push(handler);

    this._onAction(WebF.events.MEHAction.ADDED_HANDLER, [handler]);
};

/**
 * @param {function} handler
 */
WebF.events.MultipleEventHandler.prototype.removeHandler = function (handler) {
    var index = this._handlers.lastIndexOf(handler);

    if (index < 0) {
        return;
    }

    var handlers = this._handlers.splice(index, 1);

    this._onAction(WebF.events.MEHAction.REMOVED_HANDLER, handlers);
};

WebF.events.MultipleEventHandler.prototype.removeAllHandlers = function () {
    var handlers = this._handlers.splice(0, this._handlers.length);

    this._onAction(WebF.events.MEHAction.REMOVED_ALL_HANDLERS, handlers);
};

/**
 * @param {WebF.events.WFEvent|Event|Object} e
 */
WebF.events.MultipleEventHandler.prototype.invoke = function (e) {
    if (this._handlers.length < 1) {
        return;
    }

    var x = 0;

    do {
        this._handlers[x++](e);
    }
    while (x < this._handlers.length);
};

/**
 * @returns {number}
 */
WebF.events.MultipleEventHandler.prototype.getHandlerCount = function () {
    return this._handlers.length;
};

/**
 * @returns {Array<function>}
 */
WebF.events.MultipleEventHandler.prototype.getHandlers = function () {
    return this._handlers.slice(0, this._handlers.length);
};

/**
 * @private
 * @param {WebF.events.MEHAction} action
 * @param {Array<function>} handlers
 */
WebF.events.MultipleEventHandler.prototype._onAction = function (action, handlers) {
    if (!this._actionHandler) {
        return;
    }

    var e = new WebF.events.MEHActionEvent(this, action, handlers);

    this._actionHandler(e);
};