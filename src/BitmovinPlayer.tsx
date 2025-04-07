import { PlayerAPI, PlayerConfig, SourceConfig, PlayerEvent, ErrorEvent } from 'bitmovin-player';
import { Player } from 'bitmovin-player/modules/bitmovinplayer-core';

import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import W3CMediaPolyfill from './polyfills/W3CMediaPolyfill';
import { KeplerVideoSurfaceView, VideoPlayer } from '@amzn/react-native-w3cmedia';
import { polyfillElementFunctions } from './polyfills/Misc';
import { WebCryptoPolyfill } from './polyfills/WebCryptoPolyfill';
import { DOMParserPolyfill } from './polyfills/DOMParserPolyfill';
import { Base64Polyfill } from './polyfills/Base64Polyfill';
import { HWEvent, useTVEventHandler } from '@amzn/react-native-kepler';

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

const BitmovinPlayer: React.FunctionComponent<BitmovinPlayerProps> = ({ config, source }) => {
  const video = useRef<VideoPlayer | null>(null);
  const player = useRef<PlayerAPI | null>(null);

  const [surfaceHandle, setSurfaceHandle] = useState<string | null>(null);

  const [title, setTitle] = useState<string>('No source loaded');

  useEffect(() => {
    async function setupPlayer(surfaceHandle: string) {
      // Note: re-using the "video element" is not supported on Kepler, we need a new on for every new source
      video.current = createVideoElement();
      await video.current.initialize();
      video.current.setSurfaceHandle(surfaceHandle);

      updateTitle(source, 'loading');

      player.current = new Player(undefined as any, config);
      global.player = player.current;

      player.current.on(PlayerEvent.Error, e => {
        console.warn('Player error', e);
        updateTitle(source, `error: ${(e as ErrorEvent).name}`);
      });

      player.current.load(source).then(
        () => {
          console.warn('Successfully loaded source');
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
        player.current.seek(player.current.getCurrentTime() + 10);
      } else if (evt.eventType === 'skip_backward') {
        player.current.seek(player.current.getCurrentTime() - 10);
      }
    }
  });

  const updateTitle = (source: SourceConfig, status: string) => {
    setTitle(`${source.title ?? '<Untitled>'} [${status}]`);
  };

  const onSurfaceViewCreated = (surfaceHandle: string): void => {
    console.log('onSurfaceViewCreated', surfaceHandle);

    setSurfaceHandle(surfaceHandle);
  };

  return (
    <View>
      <Text style={styles.sourceTitle}>{title}</Text>
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
});

export default BitmovinPlayer;
