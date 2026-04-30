/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

// Require child_process module
const { execSync } = require("child_process");
var hostArch = (execSync("uname -a").includes('ARM64')) ? 'aarch64' : 'x86_64';

module.exports = {
  dependencies: {
    '@amazon-devices/react-native-kepler': {
      platforms: {
        kepler: null, // do not use platform definition from @react-native-kepler
      },
    }
  },
  project: {
    kepler: {
      appName: "BitmovinPlayerWebSampleVega",
      type: "Application",
      version: 1.1,
      sdkVersion: "0.2",
      targetArchitecture: [ hostArch, "armv7" ],
      jsBuildConfig: "package.json",
      runtime: {
        mode: 'prebuilt',
        provider: 'system'
      }
    }
  }
}
