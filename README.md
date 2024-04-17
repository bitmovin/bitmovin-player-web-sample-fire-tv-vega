# player-web-sample-kepler

This repository contains a sample video playback app for Kepler, using the [Bitmovin Player Web SDK](https://bitmovin.com/docs/player/web).
It can be run on the Kepler simulator as well as physical Kepler devices.

The sample shall be used as a starting point for integrating the Bitmovin Player into a Kepler app.

## Prerequisites

- Kepler SDK v0.6 or later
  (for Kepler SDK v0.5, use branch `support/kepler-sdk-0.5` of this repository)
- Node.js version according to [.nvmrc](./.nvmrc)

## Getting started

- Configure the player license key and app ID in [App.tsx](./src/App.tsx)
- Run `Kepler SDK: Set up launch.json` action in VS code to generate the `launch.json` for debugging on the Kepler simulator or device
- Run `npm run build` to verify building the app works

## Debugging

Simply click VS Code's `Run and Debug` to build, install and run the app on the Kepler simulator or a connected Kepler device.

## Running app manually

See https://developer.amazon.com/docs/kepler-tv/cli-tools.html and https://developer.amazon.com/docs/kepler-tv/kepler-video-app.html#build-the-app

## Features and Limitations

The application uses a custom Bitmovin Player build that is compatible with the Kepler SDK.
For player version changes that are purely relevant for Kepler, see [PLAYER-CHANGELOG.md](./PLAYER-CHANGELOG.md).

This app is in an experimental state and is primarily intended for testing purposes, but it will be updated to include more features and improvements over time.

Known Issues:
- No player UI
- No progressive source playback
- No client-side ad support
- No SSAI support
- No ClearKey DRM support
- No MPEG-TS playback
- No support for TTML subtitles

## Migration Guides

### From beta.10 to beta.11
Starting with player version `8.138.0-beta.11`, a valid player license key is required for Kepler applications.
This key must be set in the player configuration, along with an `app_id` tweak:
```ts
const config = {
  key: 'YOUR_PLAYER_LICENSE_KEY',
  tweaks: {
    app_id: 'com.example.yourapp',
  },
};
```

The license key can be obtained from the [Bitmovin Dashboard](https://bitmovin.com/dashboard).
The `app_id` follows a reverse dns pattern such as `com.bitmovin.demo.kepler` and is a replacement for the hostname in kepler applications.
It needs to be allow-listed on the Dashboard for license requests to be successful.

### From beta.6 to beta.7
Starting with player version `8.138.0-beta.7`, it is required to use the [modular player](https://developer.bitmovin.com/playback/docs/getting-started-web#modular-player-version) for Kepler applications.

1. **Remove** direct player import: `import { Player } from 'bitmovin-player';`
2. Import `Core` module: `import { Player } from 'bitmovin-player/modules/bitmovinplayer-core';`
3. Import modules:
    ```ts
    import PolyfillModule = require('bitmovin-player/modules/bitmovinplayer-polyfill');
    import ReactNativeModule = require('bitmovin-player/modules/bitmovinplayer-reactnative');
    /* ... */
    ```
    Note that ES6 import syntax does not work at this time due to an issue with the Metro bundler.
4. Add modules to player core:
    ```ts
    Player.addModule(PolyfillModule.default);
    Player.addModule(ReactNativeModule.default);
    /* ... */
    ```
