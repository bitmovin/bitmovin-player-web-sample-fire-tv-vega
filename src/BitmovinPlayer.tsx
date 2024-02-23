import { Player, ModuleName, PlayerAPI, PlayerConfig, SourceConfig } from 'bitmovin-player';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import W3CMediaPolyfill from './polyfills/W3CMediaPolyfill';
import { KeplerVideoSurfaceView, VideoPlayer } from '@amzn/react-native-w3cmedia';
import { polyfillElementFunctions } from './polyfills/Misc';
import { WebCryptoPolyfill } from './polyfills/WebCryptoPolyfill';
import { DOMParserPolyfill } from './polyfills/DOMParserPolyfill';
import { Base64Polyfill } from './polyfills/Base64Polyfill';
import { HWEvent, Platform, useTVEventHandler } from '@amzn/react-native-kepler';

W3CMediaPolyfill.install();
WebCryptoPolyfill.install();
DOMParserPolyfill.install();
Base64Polyfill.install();

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
  try {
    // Remove style module as it uses a lot of DOM APIs
    Player.removeModule(ModuleName.Style);
  } catch (err) {
    // ignore
  }

  const surfaceHandle = useRef<string | null>(null);
  const video = useRef<VideoPlayer | null>(null);
  const player = useRef<PlayerAPI | null>(null);

  const [title, setTitle] = useState<string>('No source loaded');

  useEffect(() => {
    async function setupPlayer() {
      // Note: re-using the "video element" is not supported on Kepler, we need a new on for every new source
      video.current = createVideoElement();
      await video.current.initialize();
      video.current.setSurfaceHandle(surfaceHandle.current!);

      setTitle(`${source.title ?? '<Untitled>'} [loading]`);

      player.current = new Player(undefined as any, config);
      global.player = player.current;

      player.current.load(source).then(
        () => {
          console.warn('Successfully loaded source');
          setTitle(`${source.title ?? '<Untitled>'} [loaded]`);
        },
        e => {
          console.warn('Error while loading source', e);
        },
      );
    }

    setupPlayer();

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
  }, [source, config]);

  if (Platform.isTV) {
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
  }

  const setVideoSurface = (_surfaceHandle: string) => {
    if (video.current) {
      console.log('Setting video surface', _surfaceHandle);
      video.current.setSurfaceHandle(_surfaceHandle);
    }
  };

  const onSurfaceViewCreated = (_surfaceHandle: string): void => {
    console.log('onSurfaceViewCreated', _surfaceHandle);
    surfaceHandle.current = _surfaceHandle;
    setVideoSurface(_surfaceHandle);
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
