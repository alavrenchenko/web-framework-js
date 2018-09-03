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

WebF.string = new function () {
    /**
     * Start.
     * 
     * @const
     */
    var TRIM_HEAD = 0;
    /**
     * End.
     * 
     * @const
     */
    var TRIM_TAIL = 1;
    /**
     * @const
     */
    var TRIM_BOTH = 2;

    /**
     * Removes all leading and trailing occurrences of a set of characters specified in an array from the specified 'string' object.
     * 
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @returns {string} The string that remains after all occurrences of the characters in the trimChars parameter are removed from the start and end of the specified string. If trimChars is null or an empty array, white-space characters are removed instead. If no characters can be trimmed from the specified instance, the method returns the specified instance unchanged.
     */
    this.trim = function (value, trimChars) {
        return trimHelper(value, trimChars, TRIM_BOTH);
    };

    /**
     * Removes all leading occurrences of a set of characters specified in an array from the specified 'string' object.
     * 
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @returns {string} The string that remains after all occurrences of characters in the trimChars parameter are removed from the start of the specified string. If trimChars is null or an empty array, white-space characters are removed instead.
     */
    this.trimStart = function (value, trimChars) {
        return trimHelper(value, trimChars, TRIM_HEAD);
    };

    /**
     * Removes all trailing occurrences of a set of characters specified in an array from the specified 'string' object.
     * 
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @returns {string} The string that remains after all occurrences of the characters in the trimChars parameter are removed from the end of the specified string. If trimChars is null or an empty array, white-space characters are removed instead. If no characters can be trimmed from the specified instance, the method returns the specified instance unchanged.
     */
    this.trimEnd = function (value, trimChars) {
        return trimHelper(value, trimChars, TRIM_TAIL);
    };

    /**
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @param {number} trimType TrimType: trimHead (start), trimTail (end), trimBoth.
     * @returns {string} The string that remains after all occurrences of the characters in the trimChars parameter are removed from the start and end of the specified string. If trimChars is null or an empty array, white-space characters are removed instead. If no characters can be trimmed from the specified instance, the method returns the specified instance unchanged.
     */
    function trimHelper(value, trimChars, trimType) {
        var start = 0;
        var end = value.length - 1;
        var x;

        if ((trimChars == null) || (trimChars.length < 1)) {
            if (trimType !== TRIM_TAIL) {
                for (; start < value.length; start++) {
                    if (!WebF.char.isWhitespace(value[start])) {
                        break;
                    }
                }
            }

            if (trimType !== TRIM_HEAD) {
                for (; end >= start; end--) {
                    if (!WebF.char.isWhitespace(value[end])) {
                        break;
                    }
                }
            }
        }
        else {
            if (trimType !== TRIM_TAIL) {
                for (; start < value.length; start++) {
                    var charValue = value[start];
                    x = 0;

                    for (; x < trimChars.length; x++) {
                        if (trimChars[x] === charValue) {
                            break;
                        }
                    }

                    if (x === trimChars.length) {
                        break;
                    }
                }
            }

            if (trimType !== TRIM_HEAD) {
                for (; end >= start; end--) {
                    var charValue = value[end];
                    x = 0;

                    for (; x < trimChars.length; x++) {
                        if (trimChars[x] === charValue) {
                            break;
                        }
                    }

                    if (x === trimChars.length) {
                        break;
                    }
                }
            }
        }

        var length = end - start + 1;

        if (length === value.length) {
            return value;
        }

        if (length === 0) {
            return '';
        }

        return value.substr(start, length);
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    this.isNullOrEmpty = function (value) {
        return ((value == null) || (value.length === 0));
    };

    /**
     * @param {string} value
     * @returns {boolean}
     */
    this.isNullOrWhitespace = function (value) {
        if ((value == null) || (value.length === 0)) {
            return true;
        }

        // /^[\s\xa0]*$/.test(value)
        return /^[\s\u0085]+$/.test(value);
    };
};