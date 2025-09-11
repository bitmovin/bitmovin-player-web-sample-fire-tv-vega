/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import React, { useState } from 'react';
import type { PlayerConfig } from 'bitmovin-player';
import { Sources } from './Sources';
import BitmovinPlayer from './BitmovinPlayer';
import { Button, View } from 'react-native';

export const App = () => {
  const sources = Object.values(Sources);
  const config: PlayerConfig = {
    key: 'YOUR_PLAYER_KEY',
    ui: false,
    logs: {
      onLog: (logLevel, message, ...params) => {
        console[logLevel](`BITMOVIN-PLAYER: ${message}`, ...params);
      },
    },
    playback: {
      autoplay: true,
    },
    events: {
      playing: () => console.warn('PLAYING'),
      warning: e => console.warn('WARNING', e),
      error: e => console.warn('ERROR', e),
    },
    tweaks: {
      enable_performance_logs: true,
      app_id: 'com.bitmovin.demo.kepler',
      max_startup_buffer: 1,
    },
  };

  let [currentSourceIndex, setCurrentSourceIndex] = useState<number>(-1);

  return (
    <View>
      <Button
        title="LOAD/SWITCH SOURCE"
        onPress={() => {
          setCurrentSourceIndex((currentSourceIndex + 1) % sources.length);
        }}
      />
      {sources[currentSourceIndex] && <BitmovinPlayer config={config} source={sources[currentSourceIndex]} />}
    </View>
  );
};
