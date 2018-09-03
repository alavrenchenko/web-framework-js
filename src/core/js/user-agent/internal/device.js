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

WebF.userAgent.device = {};

/**
 * Determines whether the user is using a mobile device.
 * 
 * @returns {boolean}
 */
WebF.userAgent.device.isMobile = function () {
    return (!this.isTablet() &&
        (WebF.userAgent.contains('iPod') || WebF.userAgent.contains('iPhone') ||
            WebF.userAgent.contains('Android') || WebF.userAgent.contains('IEMobile')));
};

/**
 * Determines whether the user is using a tablet.
 * 
 * @returns {boolean}
 */
WebF.userAgent.device.isTablet = function () {
    return (WebF.userAgent.contains('iPad') ||
        (WebF.userAgent.contains('Android') && !WebF.userAgent.contains('Mobile')) ||
        WebF.userAgent.contains('Silk'));
};

/**
 * Determines whether the user is using a desktop computer.
 * 
 * @returns {boolean}
 */
WebF.userAgent.device.isDesktop = function () {
    return (!this.isMobile() && !this.isTablet());
};