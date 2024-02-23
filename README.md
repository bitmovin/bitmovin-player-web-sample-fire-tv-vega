# player-web-sample-kepler

This repository contains a sample video playback app for Kepler, using the [Bitmovin Player Web SDK](https://bitmovin.com/docs/player/web).
It can be run on the Kepler simulator as well as physical Kepler devices.

The sample shall be used as a starting point for integrating the Bitmovin Player into a Kepler app.

## Prerequisites

- Kepler SDK v0.6 or later
  (for Kepler SDK v0.5, use branch `support/kepler-sdk-0.5` of this repository)
- Node.js version according to [.nvmrc](./.nvmrc)

## Getting started

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
- No subtitle support
