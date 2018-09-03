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

WebF.dom.classList = {};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.set = function (element, className) {
    element.className = className;
};

/**
 * 
 * @param {Element} element
 * @returns {Array<string>}
 */
WebF.dom.classList.get = function (element) {
    var items;
    var elemClassList;

    if ((elemClassList = element.classList)) {
        var items = new Array(elemClassList.length);

        for (var x = 0; x < elemClassList.length; x++) {
            items[x] = elemClassList[x];
        }
    }
    else {
        var nativeClassName = element.className;

        items = WebF.base.isString(nativeClassName) && nativeClassName.match(/\S+/g) || [];
    }

    return items;
};

/**
 * @param {Element} element
 * @returns {string}
 */
WebF.dom.classList.getValue = function (element) {
    return element.className;
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.add = function (element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else if (!WebF.dom.classList.contains(element, className)) {
        element.className += ((element.className.length > 0) ? ' ' : '') + className;
    }
};

/**
 * 
 * @param {Element} element
 * @param {Array<string>} classNames
 */
WebF.dom.classList.addAll = function (element, classNames) {
    var x = 0;

    if (element.classList) {
        for (; x < classNames.length; x++) {
            element.classList.add(classNames[x]);
        }
    }
    else {
        var classDictionary = {};

        for (; x < classNames.length; x++) {
            var className = classNames[x];

            if (!(className in classDictionary) && !WebF.dom.classList.contains(element, className)) {
                classDictionary[className] = true;

                element.className += ((element.className.length > 0) ? ' ' : '') + className;
            }
        }
    }
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.remove = function (element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var nativeClassName = element.className;
        var nativeClassNameLength;
        var classNameLength;

        if (!WebF.base.isString(nativeClassName) || ((nativeClassNameLength = nativeClassName.length) < 1) || ((classNameLength = className.length) < 1)) {
            return;
        }

        var removed = false;
        var result = '';
        var startIndex = 0;
        var endIndex = 0;
        var copyStartIndex = 0;

        while (true) {
            var index = nativeClassName.indexOf(className, startIndex);
            endIndex = index + classNameLength;

            if (index >= 0) {
                if (((index === 0) || WebF.char.isWhitespace(nativeClassName.charAt(index - 1))) && ((endIndex === nativeClassNameLength) || WebF.char.isWhitespace(nativeClassName.charAt(endIndex)))) {
                    if ((index - copyStartIndex) > 1) {
                        result += (removed ? ' ' : '') + nativeClassName.substring(copyStartIndex, index - 1);
                        removed = true;
                    }

                    copyStartIndex = endIndex + 1;
                }
            }
            else {
                if (copyStartIndex === 0) {
                    return;
                }

                result += (removed ? ' ' : '') + nativeClassName.substring(copyStartIndex, nativeClassNameLength);
                break;
            }

            startIndex = endIndex + 1;

            if (startIndex >= nativeClassNameLength) {
                if (copyStartIndex === 0) {
                    return;
                }

                if (copyStartIndex < nativeClassNameLength) {
                    result += (removed ? ' ' : '') + nativeClassName.substring(copyStartIndex, nativeClassNameLength);
                }

                break;
            }
        }

        /*
        var newNativeClassName = ' ' + nativeClassName + ' ';
        var newClassName = ' ' + className + ' ';

        var index = newNativeClassName.indexOf(newClassName);

        if (index < 0) {
            return;
        }

        var result = (index > 0) ? newNativeClassName.substring(0, index) : '';
        var startIndex = index + newClassName.length;

        while (startIndex < newNativeClassName.length) {
            index = newNativeClassName.indexOf(newClassName, --startIndex);

            if (index >= 0) {
                result += newNativeClassName.substring(startIndex, index);
                startIndex = index + newClassName.length;
            }
            else {
                result += newNativeClassName.substring(startIndex, newNativeClassName.length - 1);
                break;
            }
        }

        if (result.length > 0) {
            if (result[0] === ' ') {
                result = result.substring(1);
            }

            if (result[result.length - 1] === ' ') {
                result = result.substring(0, result.length - 1);
            }
        }
        */

        element.className = result;
    }
};

/**
 * 
 * @param {Element} element
 * @param {Array<string>} classNames
 */
WebF.dom.classList.removeAll = function (element, classNames) {
    var x = 0;

    if (element.classList) {
        for (; x < classNames.length; x++) {
            element.classList.remove(classNames[x]);
        }
    }
    else {
        var classDictionary = {};

        for (; x < classNames.length; x++) {
            var className = classNames[x];

            if (!(className in classDictionary)) {
                classDictionary[className] = true;

                WebF.dom.classList.remove(element, className);
            }
        }
    }
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 * @returns {boolean}
 */
WebF.dom.classList.contains = function (element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }

    var nativeClassName = element.className;
    var nativeClassNameLength;
    var classNameLength;

    if (!WebF.base.isString(nativeClassName) || ((nativeClassNameLength = nativeClassName.length) < 1) || ((classNameLength = className.length) < 1)) {
        return false;
    }

    var startIndex = 0;
    var endIndex = 0;

    while (startIndex < nativeClassNameLength) {
        var index = nativeClassName.indexOf(className, startIndex);
        endIndex = index + classNameLength;

        if (index >= 0) {
            if (((index === 0) || WebF.char.isWhitespace(nativeClassName.charAt(index - 1))) && ((endIndex === nativeClassNameLength) || WebF.char.isWhitespace(nativeClassName.charAt(endIndex)))) {
                return true;
            }
        }
        else {
            return false;
        }

        startIndex = endIndex + 1;
    }

    return false;

    //var nativeClassName = element.className;

    //return element && WebF.base.isString(nativeClassName) && ((' ' + nativeClassName + ' ').indexOf(' ' + className + ' ') !== -1);
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.toggle = function (element, className) {
    if (element.classList) {
        return element.classList.toggle(className);
    }
    else {
        return WebF.dom.classList.contains(element, className) ? (WebF.dom.classList.remove(element, className), false) : (WebF.dom.classList.add(element, className), true);
    }
};