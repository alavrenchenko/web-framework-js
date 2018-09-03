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
 * @extends {WebF.ui.Component}
 * @param {WebF.dom.DOMHelper} domHelper
 */
WebF.ui.Control = function (domHelper) {
    WebF.ui.Component.call(this, domHelper);

    /**
     * @private
     * @type {boolean}
     */
    this._enabled = true;

    /**
     * @private
     * @type {boolean?}
     */
    this._parentIsEnabled = null;

    /**
     * @private
     * @type {WebF.ui.Visibility}
     */
    this._visibility = WebF.ui.Visibility.VISIBLE;

    /**
     * @private
     * @type {WebF.ui.ControlCSSClassName?} Value: WebF.ui.ControlCSSClassName.VISIBILITY_HIDDEN, WebF.ui.ControlCSSClassName.VISIBILITY_COLLAPSED or null.
     */
    this._visibilityClassName = null;

    /**
     * @private
     * @type {boolean}
     */
    this._visible = true;

    /**
     * @private
     * @type {boolean?}
     */
    this._parentIsVisible = null;

    /**
     * @private
     * @type {boolean}
     */
    this._focusable = false;

    /**
     * @private
     * @type {number?}
     */
    this._tabIndex = null;

    /**
     * @private
     * @type {boolean}
     */
    this._hasFocusEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasBlurEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasClickEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasMouseDownEventHandler = false;

    /**
     * @private
     * @type {Object<string, Array<WebF.events.EventHandler>>} Object<sourceName, Array<WebF.events.EventHandler>>
     */
    this._nativeEventHandlersCache = Object.create(null);

    /**
     * @private
     * @type {Object<string, Array<string>>} Object<sourceName, Array<nativeEventType>>
     */
    this._systemNativeEventTypes = Object.create(null);
};

WebF.ui.Control.prototype = Object.create(WebF.ui.Component.prototype);
WebF.ui.Control.prototype.constructor = WebF.ui.Control;

/**
 * @protected
 * @returns {Object<string, Array<WebF.events.EventHandler>>}
 */
WebF.ui.Control.prototype.getNativeEventHandlersCache = function () {
    return this._nativeEventHandlersCache;
};

/**
 * @protected
 * @returns {Object<string, Array<string>>} Object<sourceName, Array<nativeEventType>>
 */
WebF.ui.Control.prototype.getSystemNativeEventTypes = function () {
    return this._systemNativeEventTypes;
};

/**
 * @override
 * @param {WebF.events.EDActionEvent} e
 */
WebF.ui.Control.prototype.onEventDispatcherAction = function (e) {
    var elem = this.getElement();

    var controlEventTypeEnum = WebF.ui.ControlEventType;
    var nativeEventTypeEnum = WebF.events.NativeEventType;

    /**
     * @type {Array<WebF.events.EventHandlers>}
     */
    var handlers = e.handlers;
    var sourceName = 'RootElement';

    for (var x = 0; x < handlers.length; x++) {
        var eventHandlers = handlers[x];

        if (!eventHandlers) {
            continue;
        }

        var eventType = eventHandlers.eventType;
        var nativeEventType = null;
        var hasEventHandler = false;
        var hasEventHandlerPropertyName = null;
        var nativeEventHandler = null;

        switch (eventType) {
            case controlEventTypeEnum.FOCUS: {
                hasEventHandler = this._hasFocusEventHandler;
                hasEventHandlerPropertyName = '_hasFocusEventHandler';
                nativeEventType = nativeEventTypeEnum.FOCUS;
                nativeEventHandler = this.onNativeFocus.bind(this);

                break;
            }
            case controlEventTypeEnum.BLUR: {
                hasEventHandler = this._hasBlurEventHandler;
                hasEventHandlerPropertyName = '_hasBlurEventHandler';
                nativeEventType = nativeEventTypeEnum.BLUR;
                nativeEventHandler = this.onNativeBlur.bind(this);

                break;
            }
            case controlEventTypeEnum.CLICK: {
                hasEventHandler = this._hasClickEventHandler;
                hasEventHandlerPropertyName = '_hasClickEventHandler';
                nativeEventType = nativeEventTypeEnum.CLICK;
                nativeEventHandler = this.onNativeClick.bind(this);

                break;
            }
            case controlEventTypeEnum.MOUSE_DOWN: {
                hasEventHandler = this._hasMouseDownEventHandler;
                hasEventHandlerPropertyName = '_hasMouseDownEventHandler';
                nativeEventType = nativeEventTypeEnum.MOUSEDOWN;
                nativeEventHandler = this.onNativeMouseDown.bind(this);

                break;
            }
        }

        if (!nativeEventType) {
            continue;
        }

        var count = this.getEventHandlerCount(eventType);
        var neHandlers;
        var result = false;
        var neTypes = this._systemNativeEventTypes[sourceName];

        if (!hasEventHandler) {
            if (count > 0) {
                result = this.addNativeEventHandler(elem, sourceName, nativeEventType, nativeEventHandler);

                if (result || (neTypes && (neTypes.indexOf(nativeEventType) >= 0))) {
                    this[hasEventHandlerPropertyName] = true;
                }
            }
        }
        else {
            if (count < 1) {
                result = this.removeNativeEventHandler(elem, sourceName, nativeEventType);

                if (result || (neTypes && (neTypes.indexOf(nativeEventType) >= 0))) {
                    this[hasEventHandlerPropertyName] = false;
                }
            }
        }

        eventHandlers.handlers = null;
        handlers[x] = null;
    }

    WebF.ui.Component.prototype.onEventDispatcherAction.call(this, e);
};

/**
 * @protected
 * @param {Element} source
 * @param {string} sourceName
 * @param {string} nativeEventType
 * @param {function} nativeEventHandler
 * @returns {boolean}
 */
WebF.ui.Control.prototype.addNativeEventHandler = function (source, sourceName, nativeEventType, nativeEventHandler) {
    var nativeEventHandlers = this.getNativeEventHandlers();
    var result = false;

    if (source) {
        if (!WebF.array.exists(nativeEventHandlers, function (item) {
            return (item.source === source) && (item.eventType === nativeEventType);
        })) {
            source.addEventListener(nativeEventType, nativeEventHandler);
            nativeEventHandlers.push(new WebF.events.EventHandler(source, nativeEventType, nativeEventHandler));
            result = true;
        }
    }
    else {
        var add = true;
        var neHandlers = this._nativeEventHandlersCache[sourceName];

        if (neHandlers) {
            if (WebF.array.containsByPropertyValue(neHandlers, 'eventType', nativeEventType)) {
                add = false;
            }
        }
        else {
            neHandlers = [];
            this._nativeEventHandlersCache[sourceName] = neHandlers;
        }

        if (add) {
            neHandlers.push(new WebF.events.EventHandler(null, nativeEventType, nativeEventHandler));
            result = true;
        }
    }

    return result;
};

/**
 * @protected
 * @param {Element} source
 * @param {string} sourceName
 * @param {string} nativeEventType
 * @returns {boolean}
 */
WebF.ui.Control.prototype.removeNativeEventHandler = function (source, sourceName, nativeEventType) {
    var neTypes = this._systemNativeEventTypes[sourceName];

    if (neTypes && neTypes.indexOf(nativeEventType) >= 0) {
        return false;
    }

    var nativeEventHandlers = this.getNativeEventHandlers();
    var result = false;
    var neh;
    var index;

    if (source) {
        index = WebF.array.findIndex(nativeEventHandlers, function (item) {
            return (item.source === source) && (item.eventType === nativeEventType);
        });

        if (index >= 0) {
            neh = nativeEventHandlers[index];
            source.removeEventListener(nativeEventType, neh.handler);

            neh.handler = null;
            WebF.array.removeAt(nativeEventHandlers, index);
            result = true;
        }
    }
    else {
        var neHandlers = this._nativeEventHandlersCache[sourceName];

        if (neHandlers) {
            neh = WebF.array.removeByPropertyValue(neHandlers, 'eventType', nativeEventType);

            if (neh) {
                neh.handler = null;
                result = true;

                if (neHandlers.length < 1) {
                    delete this._nativeEventHandlersCache[sourceName];
                }
            }
        }
    }

    return result;
};

/**
 * @protected
 * @override
 */
WebF.ui.Control.prototype.registerNativeEventHandlers = function () {
    WebF.ui.Component.prototype.registerNativeEventHandlers.call(this);

    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    var nativeEventHandlers = this.getNativeEventHandlers();
    var sourceRootElementName = 'RootElement';

    for (var sourceName in this._nativeEventHandlersCache) {
        var neHandlers = this._nativeEventHandlersCache[sourceName];

        if (!neHandlers) {
            continue;
        }

        for (var x = 0; x < neHandlers.length; x++) {
            var neh = neHandlers[x];

            if (!neh.source) {
                if (sourceName !== sourceRootElementName) {
                    continue;
                }

                neh.source = elem;
            }

            if (!WebF.array.exists(nativeEventHandlers, function (item) {
                return (item.source === neh.source) && (item.eventType === neh.eventType);
            })) {
                neh.source.addEventListener(neh.eventType, neh.handler);
                nativeEventHandlers.push(neh);
            }
        }
    }

    this._nativeEventHandlersCache = Object.create(null);
};

/**
 * @protected
 * @override
 */
WebF.ui.Control.prototype.onParentChanged = function () {
    WebF.ui.Component.prototype.onParentChanged.call(this);

    var parent = this.getParent();

    var oldIsEnabled = this.isEnabled();

    var newParentIsEnabled = parent ? parent.isEnabled() : null;

    if (this._parentIsEnabled !== newParentIsEnabled) {
        this._parentIsEnabled = newParentIsEnabled;

        if (oldIsEnabled !== this.isEnabled()) {
            var e = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_ENABLED_CHANGED, this);

            this.onIsEnabledChanged(e);
        }
    }

    var oldIsVisible = this.isVisible();

    var newParentIsVisible = parent ? parent.isVisible() : null;

    if (this._parentIsVisible !== newParentIsVisible) {
        this._parentIsVisible = newParentIsVisible;

        if (oldIsVisible !== this.isVisible()) {
            var e2 = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_VISIBLE_CHANGED, this);

            this.onIsVisibleChanged(e2);
        }
    }
};

/**
 * @virtual
 * @returns {Object} Content: @type {WebF.ui.Component|Array<WebF.ui.Component>|null}
 */
WebF.ui.Control.prototype.getContent = function () {
    var count = this.getChildCount();

    if (count < 1) {
        return null;
    }

    if (count === 1) {
        return this.getChildAt(0);
    }

    var x = 0;
    var items = new Array(count);

    do {
        items[x] = this.getChildAt(x++);
    }
    while (x < count);

    return items;
};

/**
 * @virtual
 * @param {Object} content Content: @type {WebF.ui.Component|Array<WebF.ui.Component>|null}
 */
WebF.ui.Control.prototype.setContent = function (content) {

};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
WebF.ui.Control.prototype.onNativeFocus = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.FOCUS, this, e);

    this.onFocus(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onFocus = function (e) {
    if (!this.isEnabled() || !this.isFocusable()) {
        this.getElement().blur();
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
WebF.ui.Control.prototype.onNativeBlur = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.BLUR, this, e);

    this.onBlur(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onBlur = function (e) {
    if (!this.isEnabled() || !this.isFocusable()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {MouseEvent} e
 */
WebF.ui.Control.prototype.onNativeClick = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.CLICK, this, e);

    this.onClick(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onClick = function (e) {
    if (!this.isEnabled()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {MouseEvent} e
 */
WebF.ui.Control.prototype.onNativeMouseDown = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.MOUSE_DOWN, this, e);

    this.onMouseDown(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onMouseDown = function (e) {
    if (!this.isEnabled()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @virtual
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isFocused = function () {
    var elem;

    return (elem = this.getElement()) && this.getDOMHelper().isElementFocused(elem);
};

/**
 * @virtual
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isEnabled = function () {
    return this._enabled && (this._parentIsEnabled !== false);
};


/**
 * @virtual
 * @param {boolean} enable
 */
WebF.ui.Control.prototype.setEnabled = function (enable) {
    if (this._enabled === enable) {
        return;
    }

    var oldIsEnabled = this.isEnabled();
    this._enabled = enable;

    var elem;

    if ((elem = this.getElement())) {
        if (!enable) {
            WebF.dom.classList.add(elem, WebF.ui.ControlCSSClassName.DISABLED);
        }
        else {
            WebF.dom.classList.remove(elem, WebF.ui.ControlCSSClassName.DISABLED);
        }
    }

    if (oldIsEnabled === this.isEnabled()) {
        return;
    }

    var e = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_ENABLED_CHANGED, this);

    this.onIsEnabledChanged(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onIsEnabledChanged = function (e) {
    var elem = this.getElement();
    var dom = this.getDOMHelper();

    if (elem) {
        if (this.isEnabled()) {
            if (this._focusable) {
                dom.setTabIndex(elem, this._tabIndex);
            }
        }
        else if (this.isFocusable()) {
            dom.setTabIndex(elem, null);
        }
    }

    this._eventDispatcher.dispatchEvent(e);

    var count = this.getChildCount();

    for (var x = 0; x < count; x++) {
        this.getChildAt(x).onParentIsEnabledChanged(e);
    }
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onParentIsEnabledChanged = function (e) {
    this._parentIsEnabled = this.getParent().isEnabled();

    if (!this._enabled) {
        return;
    }

    var e2 = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_ENABLED_CHANGED, this);

    this.onIsEnabledChanged(e2);
};

/**
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isVisible = function () {
    return this._visible && (this._parentIsEnabled !== false);
};

/**
 * @returns {WebF.ui.Visibility}
 */
WebF.ui.Control.prototype.getVisibility = function () {
    return this._visibility;
};

/**
 * @param {WebF.ui.Visibility} value
 */
WebF.ui.Control.prototype.setVisibility = function (value) {
    if (this._visibility === value) {
        return;
    }

    this._visibility = value;

    this.onVisibilityChanged();
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onVisibilityChanged = function () {
    var elem;

    if ((elem = this.getElement())) {
        if (this._visibilityClassName != null) {
            WebF.dom.classList.remove(elem, this._visibilityClassName);
        }

        if (this._visibility === WebF.ui.Visibility.VISIBLE) {
            this._visibilityClassName = null;
        }
        else {
            this._visibilityClassName = (this._visibility === WebF.ui.Visibility.HIDDEN) ? WebF.ui.ControlCSSClassName.VISIBILITY_HIDDEN : WebF.ui.ControlCSSClassName.VISIBILITY_COLLAPSED;
            WebF.dom.classList.add(elem, this._visibilityClassName);
        }
    }

    this._updateVisible();
};

/**
 * @private
 */
WebF.ui.Control.prototype._updateVisible = function () {
    var visible = (this._visibility === WebF.ui.Visibility.VISIBLE);

    if (this._visible === visible) {
        return;
    }

    var oldIsVisible = this.isVisible();
    this._visible = visible;

    if (oldIsVisible === this.isVisible()) {
        return;
    }

    var e = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_VISIBLE_CHANGED, this);

    this.onIsVisibleChanged(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onIsVisibleChanged = function (e) {
    this._eventDispatcher.dispatchEvent(e);

    var count = this.getChildCount();

    for (var x = 0; x < count; x++) {
        this.getChildAt(x).onParentIsVisibleChanged(e);
    }
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onParentIsVisibleChanged = function (e) {
    this._parentIsVisible = this.getParent().isVisible();

    if (!this._visible) {
        return;
    }

    var e2 = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_VISIBLE_CHANGED, this);

    this.onIsVisibleChanged(e2);
};


/**
 * @virtual
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isFocusable = function () {
    var elem;

    return ((elem = this.getElement()) && this.getDOMHelper().isFocusableTabIndex(elem)) || (!this.isEnabled() && this._focusable);
};

/**
 * @virtual
 * @param {boolean} focusable
 */
WebF.ui.Control.prototype.setFocusable = function (focusable) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    var dom = this.getDOMHelper();
    var set = false;

    if (focusable) {
        if (!dom.isFocusableTabIndex(elem) || (elem.tabIndex !== 0)) {
            set = true;
        }

        this._focusable = true;
        this._tabIndex = 0;
    }
    else {
        if (dom.isFocusableTabIndex(elem)) {
            set = true;
        }

        this._focusable = false;
        this._tabIndex = null;
    }

    if (!set || !this.isEnabled()) {
        return;
    }

    dom.setTabIndex(elem, this._tabIndex);
};

/**
 * @param {number?} value
 */
WebF.ui.Control.prototype.setTabIndex = function (value) {
    var elem;

    if ((this._tabIndex === value) || !(elem = this.getElement())) {
        return;
    }

    var dom = this.getDOMHelper();
    this._tabIndex = value;
    this._focusable = ((value != null) || (dom.nativelySupportsFocus(elem) && this._focusable));

    if (!this.isEnabled()) {
        return;
    }

    this.getDOMHelper().setTabIndex(elem, value);
};

/**
 * @returns {number}
 */
WebF.ui.Control.prototype.getTabIndex = function () {
    var elem;

    return (elem = this.getElement()) ? elem.tabIndex : -1;
};

/**
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isSequentialFocusNavigation = function () {
    var elem;

    return (elem = this.getElement()) && this.getDOMHelper().isSequentialFocusNavigation(elem);
};

WebF.ui.Control.prototype.focus = function () {
    if (!this.isEnabled() || !this.isFocusable()) {
        return;
    }

    this.getElement().focus();
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.width : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.width = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMinWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.minWidth : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMinWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.minWidth = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMaxWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.maxWidth : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMaxWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.maxWidth = WebF.base.isNumber(value) ? (value + 'px') : value;
};



/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.height : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.height = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMinHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.minHeight : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMinHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.minHeight = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMaxHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.maxHeight : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMaxHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.maxHeight = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @override
 */
WebF.ui.Control.prototype.onRender = function () {
    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;
    var elem = this.getElement();

    if (!elem) {
        elem = doc.createElement('div');
        this.setElement(elem);
    }

    if (!this._enabled) {
        classList.add(elem, WebF.ui.ControlCSSClassName.DISABLED);
    }

    if (this._visibilityClassName != null) {
        classList.add(elem, this._visibilityClassName);
    }
};

/**
 * @override
 */
WebF.ui.Control.prototype.onApply = function () {
    var classList = WebF.dom.classList;
    var elem = this.getElement();

    if (!this._enabled) {
        classList.add(elem, WebF.ui.ControlCSSClassName.DISABLED);
    }

    if (this._visibilityClassName != null) {
        classList.add(elem, this._visibilityClassName);
    }
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
WebF.ui.Control.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element)) {
        return false;
    }

    return true;
};

/**
 * @override
 */
WebF.ui.Control.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Component.prototype.dispose.call(this);

    this._nativeEventHandlersCache = null;
    this._systemNativeEventTypes = null;
};