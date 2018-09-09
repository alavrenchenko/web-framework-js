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

WebF.base = {};

/**
 * @type {string}
 */
WebF.base.version = '0.5.1';

/**
 * Returns true if the specified value is a string.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a string.
 */
WebF.base.isString = function (value) {
    return typeof value == 'string';
};

/**
 * Returns true if the specified value is a number.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a number.
 */
WebF.base.isNumber = function (value) {
    return typeof value == 'number';
};

/**
 * Returns true if the specified value is a boolean.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a boolean.
 */
WebF.base.isBoolean = function (value) {
    return typeof value == 'boolean';
};

/**
 * Returns true if the specified value is a function.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a function.
 */
WebF.base.isFunction = function (value) {
    return typeof value == 'function';
};

/**
 * Returns true if the specified value is an object.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is an object.
 */
WebF.base.isObject = function (value) {
    return (value != null) && (typeof value == 'object');
};

/**
 * Returns true if the specified value is a date.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a date.
 */
WebF.base.isDate = function (value) {
    return (Object.prototype.toString.call(value) === '[object Date]') && !isNaN(value.valueOf());
};

/**
 * Returns true if the specified value is null.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is null.
 */
WebF.base.isNull = function (value) {
    return value === null;
};

/**
 * Returns true if the specified value is undefined.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is undefined.
 */
WebF.base.isUndefined = function (value) {
    return value === undefined;
};

/**
 * Returns true if the specified value is null or undefined.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is null or undefined.
 */
WebF.base.isNullOrUndefined = function (value) {
    return value == null;
};

/**
 * @throws {Error}
 */
WebF.base.notImplementedMethod = function () {
    throw new Error('Not implemented.');
};

/**
 * @throws {Error} when invoked to indicate the method should be overridden.
 */
WebF.base.abstractMethod = function () {
    throw new Error('Unimplemented abstract method.');
};
