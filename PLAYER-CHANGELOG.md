# Player Changelog

All changes to the Bitmovin Player that are relevant for Kepler will be documented in this file.
For the public-facing player changelog please see https://developer.bitmovin.com/playback/docs/release-notes-web

## [8.138.0-beta.23] - 2025-07-29

### Added
- Player changes up to [v8.220.0](https://developer.bitmovin.com/playback/docs/release-notes-web#82200)

## [8.138.0-beta.22] - 2025-05-13

### Added
- Player changes up to [v8.209.0](https://developer.bitmovin.com/playback/docs/release-notes-web#82090)

### Fixed
- App crash due to uncaught TypeError on startup or during playback

## [8.138.0-beta.21] - 2025-04-28

### Added
- Player changes up to [v8.207.0](https://developer.bitmovin.com/playback/docs/release-notes-web#82070)
- Support for TTML subtitles on Kepler
  Note: this requires an additional DOM polyfill for `window.Element` in the Kepler application

## [8.138.0-beta.20] - 2025-04-01

### Added
- Player changes up to [v8.204.0](https://developer.bitmovin.com/playback/docs/release-notes-web#82040)

### Fixed
- Improved stability of startup and restart after running out of buffer
- Unnecessary codec support checks during live stream playback

## [8.138.0-beta.19] - 2025-02-18

### Added
- Player changes up to [v8.199.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81990)

---

## [8.138.0-beta.18] - 2024-12-17

### Added
- Player changes up to [v8.194.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81940)

### Fixed
- Audio track switching causing playback to freeze when codec properties change

---

## [8.138.0-beta.17] - 2024-11-11

### Added
- Player changes up to [v8.189.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81890)
- Support for ClearKey-encrypted content (fixed in Kepler SDK 0.12)

---

## [8.138.0-beta.16] - 2024-10-29

### Added
- Player changes up to [v8.187.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81870)

---

## [8.138.0-beta.15] - 2024-10-15

### Added
- Player changes up to [v8.185.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81850)
- Support for AES-128 encrypted content (fixed in Kepler SDK 0.11)

### Removed
- Workaround for progressive playback due to events not firing on Kepler (fixed in Kepler SDK 0.11)

---

## [8.138.0-beta.14] - 2024-08-06

### Added
- Player changes up to [v8.176.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81760)

---

## [8.138.0-beta.13] - 2024-05-15

### Changed
- Service release, no public-facing changes

---

## [8.138.0-beta.12] - 2024-05-02

### Added
- Support for progressive source playback on Kepler
- Player changes up to [v8.163.0](https://developer.bitmovin.com/playback/docs/release-notes-web#81630)

### Fixed
- Uncaught exceptions caused by fetch request cancellations

---

## [8.138.0-beta.11] - 2024-04-18

### Changed
- BREAKING: Licensing and impression requests are now performed on Kepler.
  This means that a valid player license key is now required, along with an `app_id` tweak in the player configuration.

---

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
