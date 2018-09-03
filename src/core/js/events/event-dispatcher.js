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
WebF.events.EventDispatcher = function (actionHandler) {
    /**
     * @private
     */
    this._edActionEventHandler = WebF.base.isFunction(actionHandler) ? actionHandler : null;

    /**
     * @private
     * @type {WebF.events.EventDispatcherHandlers}
     */
    this._eventDispatcherHandlers = new WebF.events.EventDispatcherHandlers();
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.events.EventDispatcher.prototype.addEventHandler = function (type, handler) {
    var eventHandlers = this._eventDispatcherHandlers.add(type, handler);

    if (!eventHandlers) {
        return;
    }

    this._onEventDispatcherAction(WebF.events.EDAction.ADDED_EVENT_HANDLER, [eventHandlers]);
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.events.EventDispatcher.prototype.removeEventHandler = function (type, handler) {
    var eventHandlers = this._eventDispatcherHandlers.remove(type, handler);

    if (!eventHandlers) {
        return;
    }

    this._onEventDispatcherAction(WebF.events.EDAction.REMOVED_EVENT_HANDLER, [eventHandlers]);
};

/**
 * @param {string} [type]
 */
WebF.events.EventDispatcher.prototype.removeAllEventHandlers = function (type) {
    var eventHandlersArray = this._eventDispatcherHandlers.removeAll(type);

    if (!eventHandlersArray) {
        return;
    }

    this._onEventDispatcherAction(WebF.events.EDAction.REMOVED_ALL_EVENT_HANDLERS, eventHandlersArray);
};

/**
 * @param {WebF.events.WFEvent|Event|Object} e
 */
WebF.events.EventDispatcher.prototype.dispatchEvent = function (e) {
    var type = e.type;

    if (!WebF.base.isString(type) || (type.length < 1)) {
        throw new Error('Invalid event.');
    }

    var handlerArray = this._eventDispatcherHandlers.handlers[type];

    if (!handlerArray || (handlerArray.length < 1)) {
        return;
    }

    var x = 0;

    do {
        handlerArray[x++](e);
    }
    while (x < handlerArray.length);
};

/**
 * @returns {number}
 */
WebF.events.EventDispatcher.prototype.getEventTypeCount = function () {
    return this._eventDispatcherHandlers.getTypeCount();
};

/**
 * @param {string} [type]
 * @returns {number}
 */
WebF.events.EventDispatcher.prototype.getEventHandlerCount = function (type) {
    return this._eventDispatcherHandlers.getHandlerCount(type);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.events.EventDispatcher.prototype.getEventHandlers = function (type) {
    return this._eventDispatcherHandlers.getHandlers(type);
};

/**
 * @private
 * @param {WebF.events.MEHAction} action
 * @param {Array<function>} handlers
 */
WebF.events.EventDispatcher.prototype._onEventDispatcherAction = function (action, handlers) {
    if (!this._edActionEventHandler) {
        return;
    }

    var e = new WebF.events.EDActionEvent(this, action, handlers);

    this._edActionEventHandler(e);
};