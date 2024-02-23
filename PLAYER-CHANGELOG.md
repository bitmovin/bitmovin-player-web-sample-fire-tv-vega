# Player Changelog

All changes to the Bitmovin Player that are relevant for Kepler will be documented in this file.
For the public-facing player changelog please see https://developer.bitmovin.com/playback/docs/release-notes-web

## [8.138.0-beta.6] - 2024-02-20

### Added
- Player changes up to [v8.152.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81520)

### Changed
- [NetworkConfig.requestApi](https://cdn.bitmovin.com/player/web/8/docs/interfaces/Core.NetworkConfig.html#requestApi) needs to be set to [NetworkRequestApi.Fetch](https://cdn.bitmovin.com/player/web/8/docs/enums/Core.NetworkRequestApi.html#Fetch) for Kepler

### Fixed
- App crash with Kepler SDK 0.6 caused by `TextEncoder`/`TextDecoder` polyfills
- Slow video startup time

### Removed
- Polyfills for `TextEncoder`, `TextDecoder` and `URL`

---

## [8.138.0-beta.5] - 2023-12-14

### Added
- Player changes up to [v8.144.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81440)

### Fixed
- App crash when unloading/destroying the player due to using `MediaSource.removeSourceBuffer` API

---

## [8.138.0-beta.4] - 2023-12-07

### Changed
- DRM license requests use `fetch` instead of `XHR`

---

## [8.138.0-beta.3] - 2023-12-04

### Fixed
- `window.setTimeout` calls always pass in the second parameter to avoid app crashes

---

## [8.138.0-beta.2] - 2023-11-17

### Fixed
- `navigator.requestMediaKeySystemAccess` calls only pass in a single config to workaround Kepler API limitation

---

## [8.138.0-beta.1] - 2023-11-14

### Fixed
- Crashes with Kepler SDK 0.5 due to unsupported `window.performance.getEntriesByName` API

---

## [8.138.0-beta.0] - 2023-10-24

### Added
- Polyfills for `TextEncoder`, `TextDecoder` and `URL`

### Fixed
- Playback for streams with relative URLs in manifests
- Support for player events
