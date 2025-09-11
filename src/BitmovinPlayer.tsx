import type { ErrorEvent, PlayerAPI, PlayerConfig, SourceConfig } from 'bitmovin-player';
import { Player, PlayerEvent } from 'bitmovin-player/modules/bitmovinplayer-core';

import type { HWEvent } from '@amzn/react-native-kepler';
import { useTVEventHandler } from '@amzn/react-native-kepler';
import { KeplerVideoSurfaceView, VideoPlayer } from '@amzn/react-native-w3cmedia';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Base64Polyfill } from './polyfills/Base64Polyfill';
import { DOMParserPolyfill } from './polyfills/DOMParserPolyfill';
import { polyfillElementFunctions } from './polyfills/Misc';
import W3CMediaPolyfill from './polyfills/W3CMediaPolyfill';
import { WebCryptoPolyfill } from './polyfills/WebCryptoPolyfill';

/**
 * Note: Due to an issue with the Metro bundler, Player Modules need to be imported using `require`.
 */
import PolyfillModule = require('bitmovin-player/modules/bitmovinplayer-polyfill');
import ReactNativeModule = require('bitmovin-player/modules/bitmovinplayer-reactnative');
import EngineBitmovinModule = require('bitmovin-player/modules/bitmovinplayer-engine-bitmovin');
import EngineNativeModule = require('bitmovin-player/modules/bitmovinplayer-engine-native');
import MseRendererModule = require('bitmovin-player/modules/bitmovinplayer-mserenderer');
import XmlModule = require('bitmovin-player/modules/bitmovinplayer-xml');
import DashModule = require('bitmovin-player/modules/bitmovinplayer-dash');
import AbrModule = require('bitmovin-player/modules/bitmovinplayer-abr');
import ContainerTSModule = require('bitmovin-player/modules/bitmovinplayer-container-ts');
import ContainerMp4Module = require('bitmovin-player/modules/bitmovinplayer-container-mp4');
import HlsModule = require('bitmovin-player/modules/bitmovinplayer-hls');
import DrmModule = require('bitmovin-player/modules/bitmovinplayer-drm');
import CryptoModule = require('bitmovin-player/modules/bitmovinplayer-crypto');

W3CMediaPolyfill.install();
WebCryptoPolyfill.install();
DOMParserPolyfill.install();
Base64Polyfill.install();

Player.addModule(PolyfillModule.default);
Player.addModule(ReactNativeModule.default);
Player.addModule(EngineNativeModule.default);
Player.addModule(EngineBitmovinModule.default);
Player.addModule(MseRendererModule.default);
Player.addModule(HlsModule.default);
Player.addModule(XmlModule.default);
Player.addModule(DashModule.default);
Player.addModule(AbrModule.default);
Player.addModule(ContainerTSModule.default);
Player.addModule(ContainerMp4Module.default);
Player.addModule(DrmModule.default);
Player.addModule(CryptoModule.default);

function createVideoElement(): VideoPlayer {
  const video = new VideoPlayer();
  polyfillElementFunctions(video);
  (global as any).gvideo = video; // document.createElement('video') is stubbed to return global.gvideo
  return video;
}

type BitmovinPlayerProps = {
  config: PlayerConfig;
  source: SourceConfig;
};

const NO_SOURCE_TITLE = 'No source loaded';

const BitmovinPlayer: React.FunctionComponent<BitmovinPlayerProps> = ({ config, source }) => {
  const video = useRef<VideoPlayer | null>(null);
  const player = useRef<PlayerAPI | null>(null);

  const [surfaceHandle, setSurfaceHandle] = useState<string | null>(null);

  const [title, setTitle] = useState<string>(NO_SOURCE_TITLE);
  const [vstMeasurement, setVstMeasurement] = useState<string>('');
  const [seekTarget, setSeekTarget] = useState<number | null>(null);

  useEffect(() => {
    async function setupPlayer(surfaceViewHandle: string) {
      updateTitle(source, 'loading');

      const tsVideoElementCreation = performance.now();
      // Note: re-using the "video element" is not supported on Kepler, we need a new on for every new source
      video.current = createVideoElement();
      await video.current.initialize();
      video.current.setSurfaceHandle(surfaceViewHandle);
      console.warn(`[Perf] Video element creation took ${(performance.now() - tsVideoElementCreation).toFixed(2)}ms`);

      const tsPlayerCreation = performance.now();
      player.current = new Player(undefined as any, config);
      global.player = player.current;
      console.warn(`[Perf] Player creation took ${(performance.now() - tsPlayerCreation).toFixed(2)}ms`);

      player.current.on(PlayerEvent.Error, e => {
        updateTitle(source, `error: ${(e as ErrorEvent).name}`);
      });

      player.current.on(PlayerEvent.Seeked, () => {
        setSeekTarget(null);
      });

      const firstPlayingListener = () => {
        const vst = (performance.now() - tsVideoElementCreation).toFixed(2);
        console.warn(`[Perf] Playback started, VST: ${vst}ms`, {
          timeSince: {
            tsVideoElementCreation: (performance.now() - tsVideoElementCreation).toFixed(2),
            tsPlayerCreation: (performance.now() - tsPlayerCreation).toFixed(2),
            tsSourceLoading: (performance.now() - tsSourceLoading).toFixed(2),
          },
        });
        setVstMeasurement(`VST: ${vst}ms`);
        player.current?.off(PlayerEvent.Playing, firstPlayingListener);
      };
      player.current.on(PlayerEvent.Playing, firstPlayingListener);

      const tsSourceLoading = performance.now();
      player.current.load(source).then(
        () => {
          console.warn('Successfully loaded source');
          console.warn(`[Perf] Source loading: ${(performance.now() - tsSourceLoading).toFixed(2)}ms`);
          updateTitle(source, 'loaded');
        },
        e => {
          console.warn('Error while loading source', e);
          updateTitle(source, 'error');
        },
      );
    }

    if (surfaceHandle) {
      setupPlayer(surfaceHandle).catch(e => {
        console.warn('Error while setting up player', e);
        updateTitle(source, 'error');
      });
    }

    return () => {
      function destroyPlayer() {
        if (player.current) {
          console.log('Destroying player');
          player.current.destroy();
        }
        video.current?.deinitialize();
        video.current?.clearSurfaceHandle('');
        setTitle(NO_SOURCE_TITLE);
        setVstMeasurement('');
      }

      destroyPlayer();
    };
  }, [source, config, surfaceHandle]);

  useTVEventHandler((evt: HWEvent) => {
    if (evt && evt.eventKeyAction === 0 && player.current) {
      if (evt.eventType === 'playpause') {
        if (player.current.isPlaying()) {
          player.current.pause();
        } else {
          player.current.play();
        }
      } else if (evt.eventType === 'play') {
        player.current.play();
      } else if (evt.eventType === 'pause') {
        player.current.pause();
      } else if (evt.eventType === 'skip_forward') {
        skip(10);
      } else if (evt.eventType === 'skip_backward') {
        skip(-10);
      }
    }
  });

  const skip = (seconds: number) => {
    const seekOrigin = seekTarget ?? player.current?.getCurrentTime() ?? 0;
    setSeekTarget(seekOrigin + seconds);
  };

  useEffect(() => {
    if (seekTarget !== null && player.current) {
      /**
       * Note: For live streams, implement a different approach using `player.current.timeShift(offset)` or enable
       * `tweaks.enable_seek_for_live` in the player configuration.
       */
      console.log('Seeking to', seekTarget);
      player.current.seek(seekTarget);
    }
  }, [seekTarget]);

  const updateTitle = (sourceConfig: SourceConfig, status: string) => {
    setTitle(`${sourceConfig.title ?? '<Untitled>'} [${status}]`);
  };

  const onSurfaceViewCreated = (surfaceViewHandle: string): void => {
    console.log('onSurfaceViewCreated', surfaceViewHandle);

    setSurfaceHandle(surfaceViewHandle);
  };

  return (
    <View>
      <Text style={styles.sourceTitle}>{title}</Text>
      <Text style={styles.vstMeasurement}>{vstMeasurement}</Text>
      <KeplerVideoSurfaceView onSurfaceViewCreated={onSurfaceViewCreated} />
    </View>
  );
};

const styles = StyleSheet.create({
  sourceTitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 50,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  vstMeasurement: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 50,
    position: 'absolute',
    top: 100,
    left: 20,
  },
});

export default BitmovinPlayer;
