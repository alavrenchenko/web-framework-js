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

WebF.userAgent.engine = {};

/**
 * @returns {boolean} Whether the rendering engine is Trident.
 */
WebF.userAgent.engine.isTrident = function () {
    return (WebF.userAgent.contains('Trident') || WebF.userAgent.contains('MSIE'));
};

/**
 * @returns {boolean} Whether the rendering engine is Edge.
 */
WebF.userAgent.engine.isEdge = function () {
    return WebF.userAgent.contains('Edge');
};

/**
 * @returns {boolean} Whether the rendering engine is WebKit.
 */
WebF.userAgent.engine.isWebKit = function () {
    return (WebF.userAgent.contains('WebKit', true) && !WebF.userAgent.engine.isEdge());
};

/**
 * @returns {boolean} Whether the rendering engine is Gecko.
 */
WebF.userAgent.engine.isGecko = function () {
    return (WebF.userAgent.contains('Gecko') && !(WebF.userAgent.engine.isWebKit() || WebF.userAgent.engine.isTrident() || WebF.userAgent.engine.isEdge()));
};

/**
 * @returns {boolean} Whether the rendering engine is Presto.
 */
WebF.userAgent.engine.isPresto = function () {
    return WebF.userAgent.contains('Presto');
};

/**
 * @returns {string}
 */
WebF.userAgent.engine.getVersion = function () {
    return '';
};