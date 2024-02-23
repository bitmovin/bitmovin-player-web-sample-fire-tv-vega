/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import React, { useState } from 'react';
import { NetworkRequestApi, PlayerConfig } from 'bitmovin-player';
import { Sources } from './Sources';
import BitmovinPlayer from './BitmovinPlayer';
import { Button, View } from 'react-native';

export const App = () => {
  const sources = Object.values(Sources);
  const config: PlayerConfig = {
    key: 'NO-NEED-TO-PROVIDE-KEY-FOR-NOW',
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
    network: {
      requestApi: NetworkRequestApi.Fetch,
    },
    tweaks: {
      enable_performance_logs: true,
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
