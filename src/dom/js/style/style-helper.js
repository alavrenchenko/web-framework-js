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
 * @param {HTMLElement|SVGElement} element
 */
WebF.dom.style.StyleHelper = function (element) {
    /**
     * @private
     * @readonly
     */
    this._element = element;
};

/**
 * @static
 * @param {Element} element
 * @returns {CSSStyleDeclaration}
 */
WebF.dom.style.StyleHelper.getComputedStyle = function (element) {
    var doc = element.ownerDocument;
    var win;

    if (!doc || !(win = WebF.dom.DOMHelper.getWindow(doc)) || !win.getComputedStyle) {
        return null;
    }

    return win.getComputedStyle(element);
};

/**
 * Converts from "style-property" to "styleProperty".
 * 
 * @param {string} propertyName Style property name.
 * @returns {string}
 */
WebF.dom.style.StyleHelper.toCamelCase = function (propertyName) {
    throw new Error('Not implemented.');
};

// camelCase, PascalCase, snake_case, kebab-case



/**
 * Returns the element object.
 * 
 * @returns {Element}
 */
WebF.dom.style.StyleHelper.prototype.getElement = function () {
    return this._element;
};

/**
 * @param {HTMLElement|SVGElement} element
 */
WebF.dom.style.StyleHelper.prototype.setElement = function (element) {
    this._element = element;
};

/**
 * @returns {CSSStyleDeclaration}
 */
WebF.dom.style.StyleHelper.prototype.getComputedStyle = function () {
    return WebF.dom.style.StyleHelper.getComputedStyle(this._element);
};

