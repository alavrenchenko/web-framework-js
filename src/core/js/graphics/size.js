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
 * A value type which defined a size in terms of non-negative width and height.
 * 
 * @constructor
 * @param {number} width The initial width.
 * @param {number} height The initial height.
 */
WebF.graphics.Size = function (width, height) {
    if ((width < 0) || (height < 0)) {
        throw new Error('Width and height cannot be negative.');
    }

    this.width = width;
    this.height = height;
};

/**
 * Tests to see whether the specified Size with the same dimensions as "this" Size.
 *
 * @param {WebF.graphics.Size} size The size to compare to "this".
 * @returns {boolean}
 */
WebF.graphics.Size.prototype.equals = function (size) {
    return size && (this.width === size.width) && (this.height === size.height);
};

/**
 * Compares two Size instances for exact equality.
 *
 * @param {WebF.graphics.Size} size1 The first Size to compare.
 * @param {WebF.graphics.Size} size2 The second Size to compare.
 * @returns {boolean}
 */
WebF.graphics.Size.equals = function (size1, size2) {
    return size1 && size2 && (size1.width === size2.width) && (size1.height === size2.height);
};