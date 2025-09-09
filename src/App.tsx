/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import type { PlayerConfig } from 'bitmovin-player';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import BitmovinPlayer from './BitmovinPlayer';
import { Sources } from './Sources';

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
    },
  };

  let [currentSourceIndex, setCurrentSourceIndex] = useState<number>(0);

  return (
    <View>
      <Button
        title="SWITCH SOURCE"
        onPress={() => {
          setCurrentSourceIndex((currentSourceIndex + 1) % sources.length);
        }}
      />
      <BitmovinPlayer config={config} source={sources[currentSourceIndex]} />
    </View>
  );
};
