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
 * @abstract
 * @constructor
 * @implements {WebF.ui.IComponent}
 * @param {WebF.dom.DOMHelper} domHelper
 */
WebF.ui.Component = function (domHelper) {
    /**
     * @private
     * @readonly
     */
    this._dom = domHelper;

    /**
     * The root DOM element of this component.
     * 
     * @private
     * @type {Element}
     */
    this._element = null;

    /**
     * @readonly
     * @type {number}
     */
    this.id = WebF.ui.IdGenerator.current.getUniqueId();

    /**
     * @private
     * @type {WebF.ui.Component}
     */
    this._parent = null;

    /**
     * @type {string}
     */
    this.name = null;

    /**
     * @private
     * @type {Array<WebF.ui.Component>}
     */
    this._children = [];

    /**
     * @type {Object}
     */
    this.tag = null;

    /**
     * @private
     */
    this._disposed = false;

    /**
     * @private
     */
    this._eventDispatcher = new WebF.events.EventDispatcher(this.onEventDispatcherAction.bind(this));

    /*
     * @type {WebF.events.MultipleEventHandler<WebF.events.WFEvent>}
     */
    //this.disposed = new WebF.events.MultipleEventHandler();

    /**
     * @private
     */
    this._isInDocument = false;

    /**
     * @private
     */
    this._wasApplied = false;

    /**
     * @private
     * @type {Array<WebF.events.EventHandler>}
     */
    this._nativeEventHandlers = [];
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.ui.Component.prototype.addEventHandler = function (type, handler) {
    this._eventDispatcher.addEventHandler(type, handler);
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.ui.Component.prototype.removeEventHandler = function (type, handler) {
    this._eventDispatcher.removeEventHandler(type, handler);
};

/**
 * @param {string} type
 */
WebF.ui.Component.prototype.removeAllEventHandlers = function (type) {
    this._eventDispatcher.removeAllEventHandlers(type);
};

/**
 * @param {WebF.events.WFEvent|Event|Object} e
 */
WebF.ui.Component.prototype.dispatchEvent = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @returns {number}
 */
WebF.ui.Component.prototype.getEventTypeCount = function () {
    return this._eventDispatcher.getEventTypeCount();
};

/**
 * @param {string} [type]
 * @returns {number}
 */
WebF.ui.Component.prototype.getEventHandlerCount = function (type) {
    return this._eventDispatcher.getEventHandlerCount(type);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.ui.Component.prototype.getEventHandlers = function (type) {
    return this._eventDispatcher.getEventHandlers(type);
};

/**
 * @virtual
 * @param {WebF.events.EDActionEvent} e
 */
WebF.ui.Component.prototype.onEventDispatcherAction = function (e) {

};

/**
 * @protected
 * @returns {Array<WebF.events.EventHandler>}
 */
WebF.ui.Component.prototype.getNativeEventHandlers = function () {
    return this._nativeEventHandlers;
};

/**
 * Returns the component's parent, if any.
 * 
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getParent = function () {
    return this._parent;
};

/**
 * 
 * @param {WebF.ui.Component} parent The parent component.
 */
WebF.ui.Component.prototype.setParent = function (parent) {
    if (parent == this) {
        throw new Error('Unable to set parent component.');
    }

    if (this._parent == parent) {
        return;
    }

    this._parent = parent;

    this.onParentChanged();
};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.onParentChanged = function () {

};

/**
 * Gets the root DOM element of this component.
 * 
 * @returns {Element}
 */
WebF.ui.Component.prototype.getElement = function () {
    return this._element;
};

/**
 * Sets the root DOM element of this component.
 * 
 * @protected
 * @param {Element} element
 */
WebF.ui.Component.prototype.setElement = function (element) {
    if (this._element != null) {
        return;
    }

    this._element = element;
};

/**
 * Determines whether the component has been added to the document.
 * 
 * @returns {boolean}
 */
WebF.ui.Component.prototype.isInDocument = function () {
    return this._isInDocument;
};

/**
 * Determines whether an element was applied to the component.
 * 
 * @returns {boolean}
 */
WebF.ui.Component.prototype.wasApplied = function () {
    return this._wasApplied;
};

/**
 * Returns the dom helper that is being used on this component.
 * 
 * @returns {WebF.dom.DOMHelper}
 */
WebF.ui.Component.prototype.getDOMHelper = function () {
    return this._dom;
};

/**
 * @returns {string}
 */
WebF.ui.Component.prototype.getType = function () {
    return this.constructor.name;
};

/**
 * @override
 * @returns {string}
 */
WebF.ui.Component.prototype.toString = function () {
    return this.constructor.name;
};

/**
 * Renders the component.
 * 
 * @virtual
 * @param {Element} parentElement
 * @param {Node} [beforeNode]
 */
WebF.ui.Component.prototype.render = function (parentElement, beforeNode) {
    if (!parentElement || this._isInDocument) {
        return;
    }

    if (!this._element) {
        this.onRender();

        this.registerNativeEventHandlers();
    }

    parentElement.insertBefore(this._element, beforeNode || null);

    if (this._parent) {
        if (!this._parent.isInDocument()) {
            return;
        }
    }
    else if (!parentElement.parentElement || !this._dom.documentContains(parentElement.parentElement)) {
        return;
    }

    this.enterDocument();
};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.onRender = function () {
    if (!this._element) {
        this._element = this._dom.getDocument().createElement('div');
    }
};

WebF.ui.Component.prototype.enterDocument = function () {
    this._isInDocument = true;

    for (var x = 0; x < this._children.length; x++) {
        var child = this._children[x];

        if (!child.isInDocument() && child.getElement()) {
            child.enterDocument();
        }
    }
};

WebF.ui.Component.prototype.exitDocument = function () {
    for (var x = 0; x < this._children.length; x++) {
        var child = this._children[x];

        if (child.isInDocument()) {
            child.exitDocument();
        }
    }

    this._isInDocument = false;
};

/**
 * @virtual
 * @param {Element} element
 */
WebF.ui.Component.prototype.apply = function (element) {
    if (this._isInDocument || !element) {
        return;
    }

    if (!this._element) {
        if (!this.canApply(element)) {
            throw new Error('Invalid element.');
        }

        this._wasApplied = true;

        this._element = element;

        this.onApply();

        this.registerNativeEventHandlers();
    }
    /*
    if (!element.parentElement || !this._dom.documentContains(element.parentElement)) {
        return;
    }
    */

    if (this._parent) {
        if (!this._parent.isInDocument()) {
            return;
        }
    }
    else if (!element.parentElement || !this._dom.documentContains(element.parentElement)) {
        return;
    }

    this.enterDocument();
};

/**
 * @virtual
 * @param {Element} element
 * @returns {boolean}
 */
WebF.ui.Component.prototype.canApply = function (element) {
    return true;
};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.onApply = function () {

};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.registerNativeEventHandlers = function () {

};

/**
 * @protected
 * @virtual
 * @param {boolean} disposeChildren
 */
WebF.ui.Component.prototype.update = function (disposeChildren) {

};

/**
 * @param {WebF.ui.Component} child
 * @param {boolean} render
 */
WebF.ui.Component.prototype.addChild = function (child, render) {
    this.insertChild(this._children.length, child, render);
};

/**
 * @param {number} index
 * @param {WebF.ui.Component} child
 * @param {boolean} render
 */
WebF.ui.Component.prototype.insertChild = function (index, child, render) {
    if ((index < 0) || (index > this._children.length)) {
        throw new Error('Parameter "index" out of range.');
    }

    var childParent = child.getParent();

    if (childParent == this) {
        WebF.array.remove(this._children, child);
    }
    else if (childParent != null) {
        childParent.removeChild(child, false);
    }

    child.setParent(this);
    WebF.array.insert(this._children, index, child);

    if (child.isInDocument() || render) {
        if (!this._element) {
            this.onRender();
        }

        var beforeNodeIndex = index + 1;
        var beforeNode = (beforeNodeIndex < this._children.length) ? this._children[beforeNodeIndex].element : null;

        if (child.isInDocument()) {
            WebF.dom.DOMHelper.removeChild(child.element);
            this._element.insertBefore(child.element, beforeNode);
        }
        else {
            child.render(this._element, beforeNode);
        }
    }
    else if (this._isInDocument && !child.isInDocument() && child.element && this._dom.documentContains(child.element)) {
        child.enterDocument();
    }
};

/**
 * Returns the number of children of this component.
 * 
 * @returns {number}
 */
WebF.ui.Component.prototype.getChildCount = function () {
    return this._children.length;
};

/**
 * @returns {boolean}
 */
WebF.ui.Component.prototype.hasChildren = function () {
    return (this._children.length > 0);
};

/**
 * 
 * @param {function(WebF.ui.Component): boolean} predicate
 * @returns {WebF.ui.Component}
 * 
 * @example
 * component.getChild(function (x) {
 *     return (x.name === 'componentName');
 * });
 */
WebF.ui.Component.prototype.getChild = function (predicate) {
    return WebF.array.find(this._children, predicate);
};

/**
 * @param {number} id
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getChildById = function (id) {
    return WebF.array.findById(this._children, id);
};

/**
 * 
 * @param {string} name The name of the child.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getChildByName = function (name) {
    return WebF.array.findByPropertyValue(this._children, 'name', name);
};

/**
 * 
 * @param {number} index The name of the cookie.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getChildAt = function (index) {
    return this._children[index] || null;
};

/**
 * 
 * @param {WebF.ui.Component} child
 * @returns {number}
 */
WebF.ui.Component.prototype.indexOfChild = function (child) {
    return (child ? this._children.indexOf(child) : -1);
};

/**
 * 
 * @param {WebF.ui.Component} child
 * @param {boolean} [unrender] The default is true.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.removeChild = function (child, unrender) {
    /*
    if (!child || (child.getParent() != this)) {
        return null;
    }

    child = WebF.array.remove(this._children, child);

    if (!child) {
        return null;
    }

    if (unrender !== false) {
        child.exitDocument();

        if (child.element) {
            WebF.dom.DOMHelper.removeChild(child.element);
        }
    }

    child.setParent(null);

    return child;
    */

    if (!child || (child.getParent() != this)) {
        return null;
    }

    var index = this.indexOfChild(child);

    return (index > -1) ? this.removeChildAt(index, unrender) : null;
};

/**
 * 
 * @param {number} index
 * @param {boolean} [unrender] The default is true.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.removeChildAt = function (index, unrender) {
    //return this.removeChild(this.getChildAt(index), unrender);

    var child = this._children[index];

    if (!child) {
        return null;
    }

    child = WebF.array.removeAt(this._children, index);

    if (!child) {
        return null;
    }

    if (unrender !== false) {
        child.exitDocument();

        if (child.element) {
            WebF.dom.DOMHelper.removeChild(child.element);
        }
    }

    child.setParent(null);

    return child;
};

/**
 * @param {boolean} [unrender] The default is true.
 * @returns {Array<WebF.ui.Component>}
 */
WebF.ui.Component.prototype.removeChildren = function (unrender) {
    var removedChildren = [];

    // Chrome (v: 68.0.3440.75): < 50856
    if ((this._children.length < 30000) || (!WebF.userAgent.browser.isChrome() && (this._children.length < 500000))) {
        while (this._children.length > 0) {
            var child = this.removeChildAt(0, unrender);

            if (child) {
                removedChildren.push(child);
            }
        }
    }
    else {
        while (this._children.length > 0) {
            var child = this.removeChildAt(this._children.length - 1, unrender);

            if (child) {
                removedChildren.push(child);
            }
        }

        removedChildren.reverse();
    }

    return removedChildren;
};

/**
 * @private
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Component.prototype._onDisposed = function (e) {
    this._eventDispatcher.dispatchEvent(e);
    //this.disposed.invoke(e);
};

/**
 * @returns {boolean}
 */
WebF.ui.Component.prototype.isDisposed = function () {
    return this._disposed;
};

/**
 * @virtual
 */
WebF.ui.Component.prototype.dispose = function () {
    if (this._disposed) {
        return;
    }

    this._disposed = true;

    this._isInDocument = false;

    this._eventDispatcher.removeAllEventHandlers();
    var x;

    if (this._element) {
        for (x = 0; x < this._nativeEventHandlers.length; x++) {
            var neh = this._nativeEventHandlers[x];
            neh.source.removeEventListener(neh.eventType, neh.handler);
            neh.handler = null;
        }
    }

    this._nativeEventHandlers = null;

    for (x = 0; x < this._children.length; x++) {
        this._children[x].dispose();
    }

    if (!this._wasApplied && this._element && this._element.parentElement) {
        this._element.parentElement.removeChild(this._element);
    }

    

    this._element = null;
    this._parent = null;

    WebF.array.clear(this._children);


    

    var e = new WebF.events.WFEvent(WebF.ui.ComponentEventType.DISPOSED, this);
    this._onDisposed(e);

    
    //this.disposed.removeAllHandlers();
};