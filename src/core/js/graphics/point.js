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
 * @param {number} x
 * @param {number} y
 */
WebF.graphics.Point = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Update the location by adding offsetX to X and offsetY to Y.
 *
 * @param {number} offsetX The offset in the x dimension.
 * @param {number} offsetY The offset in the y dimension.
 */
WebF.graphics.Point.prototype.offset = function (offsetX, offsetY) {
    this.x += offsetX;
    this.y += offsetY;
};

/**
 * Compares this Point with the passed in Point.
 *
 * @param {WebF.graphics.Point} point The point to compare to "this".
 * @returns {boolean}
 */
WebF.graphics.Point.prototype.equals = function (point) {
    return point && (this.x === point.x) && (this.y === point.y);
};

/**
 * Compares two Point instances for exact equality.
 *
 * @param {WebF.graphics.Point} point1 The first Point to compare.
 * @param {WebF.graphics.Point} point2 The second Point to compare.
 * @returns {boolean}
 */
WebF.graphics.Point.equals = function (point1, point2) {
    return point1 && point2 && (point1.x === point2.x) && (point1.y === point2.y);
};