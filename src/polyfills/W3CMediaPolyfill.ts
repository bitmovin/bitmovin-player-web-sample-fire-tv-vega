/*
 * Copyright 2022-2023 Amazon.com, Inc. or its affiliates. All rights reserved.
 *
 * AMAZON PROPRIETARY/CONFIDENTIAL
 *
 * You may not use this file except in compliance with the terms and
 * conditions set forth in the accompanying LICENSE.TXT file.
 *
 * THESE MATERIALS ARE PROVIDED ON AN "AS IS" BASIS. AMAZON SPECIFICALLY
 * DISCLAIMS, WITH RESPECT TO THESE MATERIALS, ALL WARRANTIES, EXPRESS,
 * IMPLIED, OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
 */
import {
  requestMediaKeysSystemAccess,
  MediaSource,
} from '@amzn/react-native-w3cmedia';

class W3CMediaPolyfill {
  static install() {
    console.log('Installing W3CMedia polyfills');
    global.MediaSource = global.MediaSource = MediaSource;
    global.navigator.requestMediaKeySystemAccess = requestMediaKeysSystemAccess;
    // work around for shaka player
    global.HTMLMediaElement = {}; // TODO: Find right way to install HTMLMediaElement polyfill
    global.HTMLMediaElement.HAVE_CURRENT_DATA = 2; // TODO: Find right way to set these constants
    global.HTMLMediaElement.HAVE_METADATA = 1; // TODO: Find right way to set these constants
  }
}

export default W3CMediaPolyfill;
