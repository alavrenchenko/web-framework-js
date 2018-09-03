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
 * EventDispatcherActionEvent (EDActionEvent).
 * 
 * @constructor
 * @param {Object} source
 * @param {WebF.events.EDAction} action
 * @param {Array<WebF.events.EventHandlers>} handlers
 */
WebF.events.EDActionEvent = function (source, action, handlers) {
    WebF.events.WFEvent.call(this, 'edaction', source);

    /**
     * Gets the EDAction.
     * 
     * @readonly
     */
    this.action = action;

    /**
     * @readonly
     */
    this.handlers = handlers;
};

WebF.events.EDActionEvent.prototype = Object.create(WebF.events.WFEvent.prototype);
WebF.events.EDActionEvent.prototype.constructor = WebF.events.EDActionEvent;