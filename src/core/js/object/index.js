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

WebF.object = {};

/**
 * 
 * @param {Object} obj Object on which modify the property.
 * @param {string} propertyName The property name.
 * @param {*} [value] The value associated with the property.
 */
WebF.object.defineReadOnly = function (obj, propertyName, value) {
    var d = {
        enumerable: true,
        writable: false
    };

    if (arguments.length === 3) {
        d.value = value;
    }

    Object.defineProperty(obj, propertyName, d);
};

/**
 * 
 * @param {Object} obj Object on which to add or modify the property.
 * @param {string} propertyName The property name.
 * @param {Function} getter 
 */
WebF.object.defineGetter = function (obj, propertyName, getter) {
    Object.defineProperty(obj, propertyName, {
        get: getter,
        enumerable: true
    });
};


/**
 * Returns the base prototype of the object.
 * 
 * @param {any} obj The object that references the prototype.
 * @returns {*}
 */
WebF.object.getBasePrototype = function (obj) {
    return Object.getPrototypeOf(Object.getPrototypeOf(obj));
};

