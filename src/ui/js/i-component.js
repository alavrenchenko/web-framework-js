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
 * @interface
 * @implements {WebF.IDisposable}
 */
WebF.ui.IComponent = function () { };

/**
 * @type {Element}
 */
WebF.ui.IComponent.prototype.element;

/**
 * @type {number}
 */
WebF.ui.IComponent.prototype.id;

/**
 * @type {string}
 */
WebF.ui.IComponent.prototype.name;

/**
 * @type {Object}
 */
WebF.ui.IComponent.prototype.tag;

/**
 * @returns {string}
 */
WebF.ui.IComponent.prototype.getType = WebF.base.notImplementedMethod;

/*
 * Adds a event handler to listen to the Disposed event on the component.
 * 
 * @type {WebF.events.MultipleEventHandler<WebF.events.WFEvent>}
 */
//WebF.ui.IComponent.prototype.disposed;