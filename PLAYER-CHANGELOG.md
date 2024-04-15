# Player Changelog

All changes to the Bitmovin Player that are relevant for Kepler will be documented in this file.
For the public-facing player changelog please see https://developer.bitmovin.com/playback/docs/release-notes-web

## [8.138.0-beta.10] - 2024-04-15

### Added
- Support for CEA-608 captions on Kepler
- Player changes up to [v8.161.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81610)

---

## [8.138.0-beta.9] - 2024-03-27

### Added
- Support for WebVTT subtitles on Kepler
- Player changes up to [v8.158.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81580)

### Fixed
- Reduced frequency of playback freezing or app crashing during playback 

---

## [8.138.0-beta.8] - 2024-03-19

### Added
- Player changes up to [v8.157.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81570)

### Changed
- Utilize `webcrypto` API for decrypting ClearKey content

---

## [8.138.0-beta.7] - 2024-03-12

### Added
- Player changes up to [v8.156.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81560)

### Changed
- BREAKING: The `ReactNative` module has been removed from the monolith player.
  This means that [Modular Player](https://developer.bitmovin.com/playback/docs/getting-started-web#modular-player-version) usage is now required on Kepler.
  The demo has been updated to reflect this change. 

---

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
