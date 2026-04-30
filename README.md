# player-web-sample-fire-tv-vega

This repository contains a sample video playback app for Vega OS (formerly Kepler OS) on Amazon Fire TV, using the [Bitmovin Player Web SDK](https://bitmovin.com/docs/player/web).

The sample may be used as a starting point for integrating the Bitmovin Player into a Vega app.

## Prerequisites

- Vega SDK v0.21 or later
- Node.js version according to [.nvmrc](./.nvmrc)

## Getting started

- Configure the player license key and app ID in [App.tsx](./src/App.tsx)
- Run `npm run build:app` to verify building the app works
- Launch the app via [Vega Studio](https://developer.amazon.com/docs/vega/0.21/setup-extension.html) or [Vega SDK CLI](https://developer.amazon.com/docs/vega/0.21/cli-tools.html)

To tailor this app to your use case, please ensure you follow the [Modular Player Best Practices](https://developer.bitmovin.com/playback/docs/getting-started-with-the-modular-player#best-practices)!

## Debugging

Use VS Code's `Run and Debug` tools to build, install and run the app on the Vega OS simulator or a connected Vega OS device.

## Running app manually

See https://developer.amazon.com/docs/vega/0.22/cli-tools.html and https://developer.amazon.com/docs/vega/0.22/build-an-app.html#vega-cli-tab

## Features and Limitations

The application uses a custom build of the Bitmovin Player that is compatible with Vega OS.
For player version changes that are specific to running on Vega OS, see [PLAYER-CHANGELOG.md](./PLAYER-CHANGELOG.md).

**Note:** Ensure that you are only using player versions in the form `8.138.0-beta.XX`.
Other player versions are currently not supported on Vega OS. 

Known Issues:
- No Bitmovin Player UI: The [bitmovin-player-ui](https://github.com/bitmovin/bitmovin-player-ui) is not compatible with Vega OS as it is HTML-based
- No client-side ad support, due to the lack of video element reusability on Vega OS
- SSAI support is limited to HLS with the same encryption characteristics across discontinuities, other use cases are currently blocked due to Vega OS API limitations
- MPEG-TS playback causing higher-than-usual CPU usage
- Bitmovin monolith player is not supported on Vega OS, usage of [modular player](https://developer.bitmovin.com/playback/docs/getting-started-with-the-modular-player) is required
