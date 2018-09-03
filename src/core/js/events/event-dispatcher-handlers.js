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
 * @package
 * @constructor
 */
WebF.events.EventDispatcherHandlers = function () {
    /**
     * @package
     * @type {Object<string, Array<function>>}
     */
    this.handlers = Object.create(null);

    /**
     * @private
     * @type {number}
     */
    this._typeCount = 0;

    /**
     * @private
     * @type {number}
     */
    this._handlerCount = 0;
};

/**
 * @param {string} type
 * @param {function} handler
 * @returns {WebF.events.EventHandlers}
 */
WebF.events.EventDispatcherHandlers.prototype.add = function (type, handler) {
    if (!WebF.base.isString(type) || (type.length < 1)) {
        throw new Error('Invalid parameter "type".');
    }

    var handlerArray = this.handlers[type];

    if (!handlerArray) {
        this.handlers[type] = handlerArray = [];
        this._typeCount++;
    }

    var index = handlerArray.indexOf(handler);

    if (index >= 0) {
        return null;
    }

    handlerArray.push(handler);
    this._handlerCount++;

    return new WebF.events.EventHandlers(type, [handler]);
};

/**
 * @param {string} type
 * @param {function} handler
 * @returns {WebF.events.EventHandlers}
 */
WebF.events.EventDispatcherHandlers.prototype.remove = function (type, handler) {
    if (!WebF.base.isString(type) || (type.length < 1)) {
        throw new Error('Invalid parameter "type".');
    }

    var handlerArray = this.handlers[type];

    if (!handlerArray) {
        return null;
    }

    var index = handlerArray.lastIndexOf(handler);

    if (index < 0) {
        return null;
    }

    var handlers = handlerArray.splice(index, 1);
    this._handlerCount -= handlers.length;

    if (handlerArray.length < 1) {
        delete this.handlers[type];
        this._typeCount--;
    }

    return new WebF.events.EventHandlers(type, handlers);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.events.EventDispatcherHandlers.prototype.removeAll = function (type) {
    var handlerArray;
    var eventHandlersArray = [];

    if (type !== undefined) {
        if (!WebF.base.isString(type) || (type.length < 1)) {
            throw new Error('Invalid parameter "type".');
        }

        handlerArray = this.handlers[type];

        if (!handlerArray) {
            return null;
        }

        delete this.handlers[type];
        this._typeCount--;
        this._handlerCount -= handlerArray.length;

        eventHandlersArray.push(new WebF.events.EventHandlers(type, handlerArray));
    }
    else {
        for (var key in this.handlers) {
            handlerArray = this.handlers[key];

            delete this.handlers[key];

            eventHandlersArray.push(new WebF.events.EventHandlers(key, handlerArray));
        }

        this._typeCount = 0;
        this._handlerCount = 0;
    }

    return eventHandlersArray;
};

/**
 * @param {string} [type]
 * @returns {number}
 */
WebF.events.EventDispatcherHandlers.prototype.getHandlerCount = function (type) {
    if (type === undefined) {
        return this._handlerCount;
    }

    var handlerArray = this.handlers[type];

    return (handlerArray ? handlerArray.length : 0);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.events.EventDispatcherHandlers.prototype.getHandlers = function (type) {
    var handlerArray;
    var eventHandlersArray = [];

    if (type !== undefined) {
        if (!WebF.base.isString(type) || (type.length < 1)) {
            return eventHandlersArray;
        }

        handlerArray = this.handlers[type];

        if (!handlerArray) {
            return eventHandlersArray;
        }

        eventHandlersArray.push(new WebF.events.EventHandlers(type, handlerArray.slice(0, handlerArray.length)));
    }
    else {
        for (var key in this.handlers) {
            handlerArray = this.handlers[key];

            eventHandlersArray.push(new WebF.events.EventHandlers(key, handlerArray.slice(0, handlerArray.length)));
        }
    }

    return eventHandlersArray;
};

/**
 * @returns {number}
 */
WebF.events.EventDispatcherHandlers.prototype.getTypeCount = function () {
    return this._typeCount;
};