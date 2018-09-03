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
 * @const
 * @enum {string}
 */
WebF.events.NativeEventType = {
    // <UI Events>
    /**
     * Trusted Targets: Window, Document, Element.
     */
    LOAD: 'load',
    /**
     * Trusted Targets: Window, Document, Element.
     */
    UNLOAD: 'unload',
    /**
     * Trusted Targets: Window, Element.
     */
    ABORT: 'abort',
    /**
     * Trusted Targets: Window, Element.
     */
    ERROR: 'error',
    /**
     * Trusted Targets: Element.
     */
    SELECT: 'select',

    /**
     * Legacy Event.
     * Trusted Targets: Element.
     */
    DOMACTIVATE: 'DOMActivate',
    // </UI Events>

    // <Focus Events>
    /**
     * Trusted Targets: Window, Element.
     */
    BLUR: 'blur',
    /**
     * Trusted Targets: Window, Element.
     */
    FOCUS: 'focus',
    /**
     * Trusted Targets: Window, Element.
     */
    FOCUSIN: 'focusin',
    /**
     * Trusted Targets: Window, Element.
     */
    FOCUSOUT: 'focusout',

    /**
     * Legacy Event.
     * Trusted Targets: Window, Element.
     */
    DOMFOCUSIN: 'DOMFocusIn',
    /**
     * Legacy Event.
     * Trusted Targets: Window, Element.
     */
    DOMFOCUSOUT: 'DOMFocusOut',
    // </Focus Events>

    // <Mouse Events>
    /**
     * Trusted Targets: Element.
     */
    CLICK: 'click',
    /**
     * Trusted Targets: Element.
     */
    DBCLICK: 'dbclick',
    /**
     * Trusted Targets: Element.
     */
    MOUSEDOWN: 'mousedown',
    /**
     * Trusted Targets: Element.
     */
    MOUSEENTER: 'mouseenter',
    /**
     * Trusted Targets: Element.
     */
    MOUSELEAVE: 'mouseleave',
    /**
     * Trusted Targets: Element.
     */
    MOUSEMOVE: 'mousemove',
    /**
     * Trusted Targets: Element.
     */
    MOUSEOUT: 'mouseout',
    /**
     * Trusted Targets: Element.
     */
    MOUSEOVER: 'mouseover',
    /**
     * Trusted Targets: Element.
     */
    MOUSEUP: 'mouseup',
    // </Mouse Events>

    // <Wheel Events>
    /**
     * Trusted Targets: Element.
     */
    WHEEL: 'wheel',
    // </Wheel Events>

    // <Input Events>
    /**
     * Trusted Targets: Element (specifically: control types such as HTMLInputElement, etc.) or any Element with contenteditable attribute enabled.
     */
    BEFOREINPUT: 'beforeinput',
    /**
     * Trusted Targets: Element (specifically: control types such as HTMLInputElement, etc.) or any Element with contenteditable attribute enabled.
     */
    INPUT: 'input',
    // </Input Events>

    // <Keyboard Events>
    /**
     * Trusted Targets: Element.
     */
    KEYDOWN: 'keydown',
    /**
     * Trusted Targets: Element.
     */
    KEYUP: 'keyup',

    /**
     * Legacy Event.
     * Trusted Targets: Element.
     */
    KEYPRESS: 'keypress',

    // </Keyboard Events>

    // <Composition Events>
    /**
     * Trusted Targets: Element.
     */
    COMPOSITIONSTART: 'compositionstart',
    /**
     * Trusted Targets: Element.
     */
    COMPOSITIONUPDATE: 'compositionupdate',
    /**
     * Trusted Targets: Element.
     */
    COMPOSITIONEND: 'compositionend',

    // <Composition Events>

    // <Mutation Events> (Legacy Events)
    /**
     * Trusted Targets: Element.
     */
    DOMATTRMODIFIED: 'DOMAttrModified',
    /**
     * Trusted Targets: Text, Comment, ProcessingInstruction.
     */
    DOMCHARACTERDATAMODIFIED: 'DOMCharacterDataModified',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEINSERTED: 'DOMNodeInserted',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEINSERTEDINTODOCUMENT: 'DOMNodeInsertedIntoDocument',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEREMOVED: 'DOMNodeRemoved',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEREMOVEDFROMDOCUMENT: 'DOMNodeRemovedFromDocument',
    /**
     * Trusted Targets: Window, Document, DocumentFragment, Element, Attr.
     */
    DOMSUBTREEMODIFIED: 'DOMSubtreeModified',
    // </Mutation Events>

    // <Drag and Drop Events>
    DRAGSTART: 'dragstart',
    DRAG: 'drag',
    DRAGENTER: 'dragenter',
    DRAGEXIT: 'dragexit',
    DRAGLEAVE: 'dragleave',
    DRAGOVER: 'dragover',
    DRAGEND: 'dragend',
    DROP: 'drop',
    // </Drag and Drop Events>

    // <Network Events>
    ONLINE: 'online',
    OFFLINE: 'offline',
    // </Network Events>

    // <Forms>
    CHANGE: 'change',
    RESET: 'reset',
    SUBMIT: 'submit',
    // </Forms>

    // <Touch Events>
    TOUCHSTART: 'touchstart',
    TOUCHEND: 'touchend',
    TOUCHMOVE: 'touchmove',
    TOUCHENTER: 'touchenter',
    TOUCHLEAVE: 'touchleave',
    TOUCHCANCEL: 'touchcancel',
    // </Touch Events>

    // <View Events>
    FULLSCREENCHANGE: 'fullscreenchange',
    FULLSCREENERROR: 'fullscreenerror',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    // </View Events>

    // <Clipboard Events>
    /**
     * Trusted Targets: Element.
     */
    CUT: 'cut',
    /**
     * Trusted Targets: Element.
     */
    COPY: 'copy',
    /**
     * Trusted Targets: Element.
     */
    PASTE: 'paste',
    BEFORECUT: 'beforecut',
    BEFORECOPY: 'beforecopy',
    BEFOREPASTE: 'beforepaste',
    // </Clipboard Events>

    // <Progress Events>
    LOADSTART: 'loadstart',
    PROGRESS: 'progress',
    TIMEOUT: 'timeout',
    LOADEND: 'loadend',
    // </Progress Events>

    // <Frame Events>
    DOMFRAMECONTENTLOADED: 'DOMFrameContentLoaded',
    // <Frame Events>

    // <Pointer Events>
    POINTEROVER: 'pointerover',
    POINTERENTER: 'pointerenter',
    POINTERDOWN: 'pointerdown',
    POINTERMOVE: 'pointermove',
    POINTERUP: 'pointerup',
    POINTERCANCEL: 'pointercancel',
    POINTEROUT: 'pointerout',
    POINTERLEAVE: 'pointerleave',
    GOTPOINTERCAPTURE: 'gotpointercapture',
    LOSTPOINTERCAPTURE: 'lostpointercapture',
    // </Pointer Events>

    // <Media Capture and Streams>
    // <Media Capture and Streams, MediaStream>
    ADDTRACK: 'addtrack',
    REMOVETRACK: 'removetrack',
    // </Media Capture and Streams, MediaStream>

    // <Media Capture and Streams, MediaStreamTrack>
    MUTE: 'mute',
    UNMUTE: 'unmute',
    OVERCONSTRAINED: 'overconstrained',
    ENDED: 'ended',
    // </Media Capture and Streams, MediaStreamTrack>

    // <Media Capture and Streams, MediaDevices>
    DEVICECHANGE: 'devicechange',
    // </Media Capture and Streams, MediaDevices>
    // </Media Capture and Streams>

    // <Orientation>
    ORIENTATIONCHANGE: 'orientationchange',
    // </Orientation>

    // <DeviceOrientation>
    DEVICEMOTION: 'devicemotion',
    DEVICEORIENTATION: 'deviceorientation',
    // </DeviceOrientation>

    // <Battery Events>
    CHARGINGCHANGE: 'chargingchange',
    CHARGINGTIMECHANGE: 'chargingtimechange',
    DISCHARGINGTIMECHANGE: 'dischargingtimechange',
    LEVELCHANGE: 'levelchange',
    // <Battery Events>

    // <PageVisibility>
    VISIBILITYCHANGE: 'visibilitychange',
    // </PageVisibility>

    // <Print Events>
    /**
     * Trusted Targets: Window.
     */
    AFTERPRINT: 'afterprint',
    /**
     * Trusted Targets: Window.
     */
    BEFOREPRINT: 'beforeprint',
    // </Print Events>

    // <History Events>
    /**
     * Trusted Targets: Window.
     */
    HASHCHANGE: 'hashchange',
    /**
     * Trusted Targets: Window.
     */
    PAGEHIDE: 'pagehide',
    /**
     * Trusted Targets: Window.
     */
    PAGESHOW: 'pageshow',
    /**
     * Trusted Targets: Window.
     */
    POPSTATE: 'popstate',
    // </History Events>

    // <Storage Events>
    /**
     * Trusted Targets: Window.
     */
    STORAGE: 'storage',
    // </Storage Events>

    // <Media Events>
    CANPLAY: 'canplay',
    CANPLAYTHROUGH: 'canplaythrough',
    DURATIONCHANGE: 'durationchange',
    EMPTIED: 'emptied',
    LOADEDDATA: 'loadeddata',
    LOADEDMETADATA: 'loadedmetadata',
    PAUSE: 'pause',
    PLAY: 'play',
    PLAYING: 'playing',
    RATECHANGE: 'ratechange',
    SEEKED: 'seeked',
    SEEKING: 'seeking',
    STALLED: 'stalled',
    SUSPEND: 'suspend',
    TIMEUPDATE: 'timeupdate',
    VOLUMECHANGE: 'volumechange',
    WAITING: 'waiting',

    // <Media Events, TextTrack>
    CUECHANGE: 'cuechange',
    // </Media Events, TextTrack>

    // <Media Events, TextTrackCue>
    ENTER: 'enter',
    EXIT: 'exit',
    // </Media Events, TextTrackCue>
    // </Media Events>

    // Misc
    CONTEXTMENU: 'contextmenu',
    /**
     * Trusted Targets: Document.
     */
    DOMCONTENTLOADED: 'DOMContentLoaded',
    /**
     * Trusted Targets: Window.
     */
    BEFOREUNLOAD: 'beforeunload',
    /**
     * Trusted Targets: Document.
     */
    READYSTATECHANGE: 'readystatechange',
    /**
     * Trusted Targets: EventSource, WebSocket.
     */
    OPEN: 'open',
    /**
     * Trusted Targets: Window, EventSource, WebSocket, MessagePort, BroadcastChannel, DedicatedWorkerGlobalScope, Worker.
     */
    MESSAGE: 'message'
};