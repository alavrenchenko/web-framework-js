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
 * @param {Document} [doc]
 */
WebF.dom.DOMHelper = function (doc) {
    /**
     * @private
     * @readonly
     */
    this._document = doc || document;
};

/**
 * @private
 * @static
 * @type {WebF.dom.DOMHelper}
 */
WebF.dom.DOMHelper._current = null;

/**
 * @static
 * @param {Document} [doc]
 * @returns {WebF.dom.DOMHelper}
 */
WebF.dom.DOMHelper.getDOMHelper = function (doc) {
    return doc ? new WebF.dom.DOMHelper(doc) : (WebF.dom.DOMHelper._current || (WebF.dom.DOMHelper._current = new WebF.dom.DOMHelper()));
};

/**
 * Returns the document object.
 * 
 * @static
 * @returns {Document}
 */
WebF.dom.DOMHelper.getDocument = function () {
    return document;
};

/**
 * Returns the window object associated with the specified or current document.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {Window}
 */
WebF.dom.DOMHelper.getWindow = function (doc) {
    return doc ? (doc.parentWindow || doc.defaultView) : window;
};

/**
 * Returns the owner document for a node.
 * 
 * @static
 * @param {Node} node
 * @returns {Document}
 */
WebF.dom.DOMHelper.getOwnerDocument = function (node) {
    return (node.nodeType === Node.DOCUMENT_NODE) ? node : node.ownerDocument;
};

/**
 * @static
 * @param {Document} [doc]
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isCSS1CompatMode = function (doc) {
    if (!doc) {
        doc = document;
    }

    return doc.compatMode == 'CSS1Compat';
};

/**
 * Returns the dimensions of the viewport.
 * 
 * @static
 * @param {Window} [win]
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.getViewportSize = function (win) {
    if (!win) {
        win = window;
    }

    var winInnerWidth = win.innerWidth || 0;
    var winInnerHeight = win.innerHeight || 0;

    var doc = win.document;

    var elem = WebF.dom.DOMHelper.isCSS1CompatMode(doc) ? doc.documentElement : doc.body;

    return new WebF.graphics.Size(Math.max(winInnerWidth, elem.clientWidth), Math.max(winInnerHeight, elem.clientHeight));
};

/**
 * Calculates the width and height of the document.
 * 
 * @static
 * @param {Window} [win]
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.getDocumentSize = function (win) {
    if (!win) {
        win = window;
    }

    var doc = win.document;
    var width = 0;
    var height = 0;

    label_GDS_1: {
        var docElem;
        var body;

        if (!(doc && (docElem = doc.documentElement) && (body = doc.body))) {
            break label_GDS_1;
        }

        var viewportSize = WebF.dom.DOMHelper.getViewportSize(win);

        if (WebF.dom.DOMHelper.isCSS1CompatMode(doc) && docElem.scrollWidth && docElem.scrollHeight) {
            width = (docElem.scrollWidth !== viewportSize.width) ? docElem.scrollWidth : docElem.offsetWidth;
            height = (docElem.scrollHeight !== viewportSize.height) ? docElem.scrollHeight : docElem.offsetHeight;
        }
        else {
            var sw = docElem.scrollWidth;
            var ow = docElem.offsetWidth;

            if (docElem.clientWidth !== ow) {
                sw = body.scrollWidth;
                ow = body.offsetWidth;
            }

            width = (sw > viewportSize.width) ? Math.max(sw, ow) : Math.min(sw, ow);

            var sh = docElem.scrollHeight;
            var oh = docElem.offsetHeight;

            if (docElem.clientHeight !== oh) {
                sh = body.scrollHeight;
                oh = body.offsetHeight;
            }

            height = (sh > viewportSize.height) ? Math.max(sh, oh) : Math.min(sh, oh);
        }
    }

    return new WebF.graphics.Size(width, height);
};

/**
 * Returns the document scroll distance as a coordinate object.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {WebF.graphics.Point}
 */
WebF.dom.DOMHelper.getDocumentScroll = function (doc) {
    var win;

    if (!doc) {
        doc = document;
        win = window;
    }
    else {
        win = WebF.dom.DOMHelper.getWindow(doc);
    }

    var elem = WebF.dom.DOMHelper.getDocumentScrollElement(doc);

    // isVersionOrHigher('10')
    if (WebF.userAgent.browser.isIE() && win.pageYOffset !== elem.scrollTop) {
        return new WebF.graphics.Point(elem.scrollLeft, elem.scrollTop);
    }

    return new WebF.graphics.Point(win.pageXOffset || elem.scrollLeft, win.pageYOffset || elem.scrollTop);
};

/**
 * Returns the document scroll element.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.DOMHelper.getDocumentScrollElement = function (doc) {
    if (!doc) {
        doc = document;
    }

    if (doc.scrollingElement) {
        return doc.scrollingElement;
    }

    if (!WebF.userAgent.engine.isWebKit() && WebF.dom.DOMHelper.isCSS1CompatMode(doc)) {
        return doc.documentElement;
    }

    return doc.body || doc.documentElement;
};

/**
 * Removes a node from its parent.
 * 
 * @static
 * @param {Node} child The node to remove.
 * @returns {Node}
 */
WebF.dom.DOMHelper.removeChild = function (child) {
    var parent;

    if (!child || ((parent = child.parentNode) == null)) {
        return null;
    }

    return parent.removeChild(child);
};

/**
 * Replaces a node in the DOM tree. Will do nothing if "oldNode" has no parent.
 * 
 * @static
 * @param {Node} newChild The new node to replace oldChild.
 * @param {Node} oldChild The existing child to be replaced.
 * @returns {Node} The replaced node.
 */
WebF.dom.DOMHelper.replaceChild = function (newChild, oldChild) {
    var parent;

    if (!newChild || !oldChild || ((parent = oldChild.parentNode) == null)) {
        return null;
    }

    return parent.replaceChild(newChild, oldChild);
};

/**
 * Removes all the child nodes on a DOM node.
 * 
 * @static
 * @param {Node} node
 */
WebF.dom.DOMHelper.removeChildNodes = function (node) {
    if (!WebF.dom.DOMHelper.isNode(node)) {
        throw new Error('Invalid Node.');
    }

    if (node.childNodes.length < 1) {
        return;
    }

    var range = WebF.dom.DOMHelper.getOwnerDocument(node).createRange();
    range.selectNodeContents(node);
    range.deleteContents();
};

/**
 * Determines whether the object is a DOM node.
 * 
 * @static
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isNode = function (obj) {
    if (!WebF.base.isObject(obj)) {
        return false;
    }

    var doc = obj.ownerDocument || obj;
    var win = doc.parentWindow || doc.defaultView || window;

    return (obj instanceof win.Node);
};

/**
 * Determines whether the object is an Element.
 * 
 * @static
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isElement = function (obj) {
    if (!WebF.base.isObject(obj)) {
        return false;
    }

    var doc = obj.ownerDocument;
    var win = doc ? (doc.parentWindow || doc.defaultView || window) : window;

    return obj instanceof win.Element;
};

/**
 * Returns true if the element has a tabindex that allows it to receive focus, false otherwise.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isFocusableTabIndex = function (element) {
    var tabIndexStr = element.getAttribute('tabindex');

    return (tabIndexStr != null) && !isNaN(+tabIndexStr) && WebF.base.isNumber(element.tabIndex);
};

/**
 * @static
 * @param {Element} element Element whose tabindex is to be changed.
 * @param {number?} value
 */
WebF.dom.DOMHelper.setTabIndex = function (element, value) {
    if (value != null) {
        element.tabIndex = value;
    }
    else {
        element.tabIndex = -1;
        element.removeAttribute('tabindex');
    }
};

/**
 * Determines whether the element has a specified tabindex.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isFocusable = function (element) {
    return WebF.dom.DOMHelper.nativelySupportsFocus(element) ? !element.disable : WebF.dom.DOMHelper.isFocusableTabIndex(element);
};

/**
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isSequentialFocusNavigation = function (element) {
    var tabIndex = element.tabIndex;

    return (WebF.base.isNumber(tabIndex) && (tabIndex >= 0));
};

/**
 * Determines whether the element is focusable even when tabindex is not set.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.nativelySupportsFocus = function (element) {
    return ((element.tagName === 'A') ||
        (element.tagName === 'BUTTON') ||
        (element.tagName == 'INPUT') ||
        (element.tagName == 'TEXTAREA') ||
        (element.tagName == 'SELECT') ||
        (element.tagName == 'DETAILS'));
};

/**
 * Determines whether the element has focus.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isElementFocused = function (element) {
    var doc = element.ownerDocument || document;
    var activeElement;

    return doc.hasFocus() && (activeElement = WebF.dom.DOMHelper.getActiveElement(doc)) && (activeElement === element);
};

/**
 * Returns the active element in the specified or current document.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.DOMHelper.getActiveElement = function (doc) {
    if (!doc) {
        doc = document;
    }

    try {
        var elem = doc.activeElement;

        return (elem && elem.nodeName) ? elem : null;
    }
    catch (e) {
        return null;
    }
};

/**
 * Returns an array-like list of child elements (only a length property and numerical indices are guaranteed to exist).
 * 
 * @static
 * @param {Element} element
 * @param {string} className
 * @param {number} [maxLevels] Maximum number of levels to search down the dom.
 * @returns {IArrayLike<Element>}
 */
WebF.dom.DOMHelper.getElementsByClassName = function (element, className, maxLevels) {
    if (maxLevels == null) {
        return element.getElementsByClassName(className);
    }

    var items = [];
    var x;

    if (maxLevels === 0) {
        for (x = 0; x < element.childNodes.length; x++) {
            var node = element.childNodes[x];

            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            if (WebF.dom.classList.contains(node, className)) {
                items.push(node);
            }
        }
    }
    else {
        for (x = 0; x <= maxLevels; x++) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var node = element.childNodes[i];

                if (node.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                if (WebF.dom.classList.contains(node, className)) {
                    items.push(node);
                }

                if (x < maxLevels) {
                    var items2 = WebF.dom.DOMHelper.getElementsByClassName(element, className, maxLevels - 1);

                    if (items2.length > 0) {
                        WebF.array.addRange(items, items2);
                    }
                }
            }
        }
    }

    return items;
};

/**
 * Returns a child element.
 * 
 * @static
 * @param {Element} element
 * @param {string} className
 * @param {number} [maxLevels] Maximum number of levels to search down the dom.
 * @returns {Element}
 */
WebF.dom.DOMHelper.getElementByClassName = function (element, className, maxLevels) {
    if (maxLevels == null) {
        return element.querySelector('.' + className);
    }

    var x;

    if (maxLevels === 0) {
        for (x = 0; x < element.childNodes.length; x++) {
            var node = element.childNodes[x];

            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            if (WebF.dom.classList.contains(node, className)) {
                return node;
            }
        }
    }
    else {
        for (x = 0; x <= maxLevels; x++) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var node = element.childNodes[i];

                if (node.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                if (WebF.dom.classList.contains(node, className)) {
                    return node;
                }

                if (x < maxLevels) {
                    var elem = WebF.dom.DOMHelper.getElementByClassName(element, className, maxLevels - 1);

                    if (elem) {
                        return elem;
                    }
                }
            }
        }
    }

    return null;
};

/**
 * Determines whether a document contains another node.
 * 
 * @static
 * @param {Document|null} doc The document that should contain the other node.
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.documentContains = function (doc, other) {
    if (!other) {
        return false;
    }

    if (!doc) {
        doc = document;
    }

    if (doc === other) {
        return true;
    }

    if ('contains' in doc) {
        return doc.contains(other);
    }

    if ('compareDocumentPosition' in doc) {
        return Boolean(doc.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    }

    if (doc.documentElement) {
        return doc.documentElement.contains(other);
    }

    return ((doc.body && doc.body.contains(other)) || doc.head.contains(other));
};

/**
 * Determines whether a node contains another node.
 * 
 * @static
 * @param {Node} node The node that should contain the other node.
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.contains = function (node, other) {
    if (!node || !other) {
        return false;
    }

    if (node === other) {
        return true;
    }

    if ('contains' in node) {
        return node.contains(other);
    }

    if ('compareDocumentPosition' in node) {
        return Boolean(node.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    }


    other = other.parentNode;

    while (other != null) {
        if (node === other) {
            return true;
        }

        other = other.parentNode;
    }

    return false;
};

/**
 * Returns the document object.
 * 
 * @returns {Document}
 */
WebF.dom.DOMHelper.prototype.getDocument = function () {
    return this._document;
};

/**
 * Returns the window object associated with the document.
 * 
 * @returns {Window}
 */
WebF.dom.DOMHelper.prototype.getWindow = function () {
    return WebF.dom.DOMHelper.getWindow(this._document);
};

/**
 * Returns the dimensions of the viewport.
 * 
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.prototype.getViewportSize = function () {
    return WebF.dom.DOMHelper.getViewportSize(this.getWindow(this._document));
};

/**
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isCSS1CompatMode = function () {
    return WebF.dom.DOMHelper.isCSS1CompatMode(this._document);
};

/**
 * Calculates the width and height of the document.
 * 
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.prototype.getDocumentSize = function () {
    return WebF.dom.DOMHelper.getDocumentSize(this.getWindow(this._document));
};

/**
 * Returns the document scroll distance as a coordinate object.
 * 
 * @returns {WebF.graphics.Point}
 */
WebF.dom.DOMHelper.prototype.getDocumentScroll = function () {
    return WebF.dom.DOMHelper.getDocumentScroll(this._document);
};

/**
 * Returns the document scroll element.
 * 
 * @returns {Element}
 */
WebF.dom.DOMHelper.prototype.getDocumentScrollElement = function () {
    return WebF.dom.DOMHelper.getDocumentScrollElement(this._document);
};

/**
 * Returns the active element in the document.
 * 
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.DOMHelper.prototype.getActiveElement = function () {
    return WebF.dom.DOMHelper.getActiveElement(this._document);
};

/**
 * Removes a node from its parent.
 * 
 * @param {Node} child The node to remove.
 * @returns {Node}
 */
WebF.dom.DOMHelper.prototype.removeChild = WebF.dom.DOMHelper.removeChild;

/**
 * Replaces a node in the DOM tree. Will do nothing if "oldNode" has no parent.
 * 
 * @param {Node} newChild The new node to replace oldChild.
 * @param {Node} oldChild The existing child to be replaced.
 * @returns {Node} The replaced node.
 */
WebF.dom.DOMHelper.prototype.replaceChild = WebF.dom.DOMHelper.replaceChild;

/**
 * Removes all the child nodes on a DOM node.
 * 
 * @param {Node} node
 */
WebF.dom.DOMHelper.prototype.removeChildNodes = WebF.dom.DOMHelper.removeChildNodes;

/**
 * Determines whether the object is a DOM node.
 * 
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isNode = WebF.dom.DOMHelper.isNode;

/**
 * Determines whether the object is an Element.
 * 
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isElement = WebF.dom.DOMHelper.isElement;

/**
 * Returns true if the element has a tabindex that allows it to receive focus, false otherwise.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isFocusableTabIndex = WebF.dom.DOMHelper.isFocusableTabIndex;

/**
 * @param {Element} element Element whose tabindex is to be changed.
 * @param {number?} value
 */
WebF.dom.DOMHelper.prototype.setTabIndex = WebF.dom.DOMHelper.setTabIndex;

/**
 * Determines whether the element has a specified tabindex.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isFocusable = WebF.dom.DOMHelper.isFocusable;

/**
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isSequentialFocusNavigation = WebF.dom.DOMHelper.isSequentialFocusNavigation;

/**
 * Determines whether the element is focusable even when tabindex is not set.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.nativelySupportsFocus = WebF.dom.DOMHelper.nativelySupportsFocus;

/**
 * Determines whether the element has focus.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isElementFocused = WebF.dom.DOMHelper.isElementFocused;

/**
 * Returns an array-like list of child elements (only a length property and numerical indices are guaranteed to exist).
 * 
 * @param {Element} element
 * @param {string} className
 * @param {number} [level] Maximum number of levels to search down the dom.
 * @returns {IArrayLike<Element>}
 */
WebF.dom.DOMHelper.prototype.getElementsByClassName = WebF.dom.DOMHelper.getElementsByClassName;

/**
 * Returns a child element.
 * 
 * @static
 * @param {Element} element
 * @param {string} className
 * @param {number} [level] Maximum number of levels to search down the dom.
 * @returns {Element}
 */
WebF.dom.DOMHelper.prototype.getElementByClassName = WebF.dom.DOMHelper.getElementByClassName;

/**
 * Determines whether a document contains another node.
 * 
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.documentContains = function (other) {
    return WebF.dom.DOMHelper.documentContains(this._document, other);
};

/**
 * Determines whether a node contains another node.
 * 
 * @param {Node} node The node that should contain the other node.
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.contains = WebF.dom.DOMHelper.contains;

