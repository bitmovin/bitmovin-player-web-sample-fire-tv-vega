/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import {Button, View} from 'react-native';
import BitmovinPlayer from './BitmovinPlayer';
import React, {useState} from 'react';
import {Sources} from './Sources';
import {PlayerConfig, SourceConfig} from 'bitmovin-player';

export const ComAmazonBitmovinplayerwebsamplekeplerMain = () => {
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
      requestApi: 'fetch',
    } as any,
    tweaks: {
      enable_performance_logs: true,
    },
  };

  let [source, setSource] = useState<SourceConfig>(Sources.ZattooDash);

  return (
    <View>
      <Button
        title="SWITCH SOURCE"
        onPress={() => {
          setSource(Sources.AomDash);
        }}
      />
      <BitmovinPlayer config={config} source={source} />
    </View>
  );
};
