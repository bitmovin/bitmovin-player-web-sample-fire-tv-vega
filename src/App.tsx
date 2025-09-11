/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

import {
  PlayerEvent,
  type DownloadFinishedEvent,
  type PlayerConfig,
  type VideoDownloadQualityChangeEvent,
} from 'bitmovin-player/modules/bitmovinplayer-core';
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
      [PlayerEvent.Playing]: () => console.warn('PlayerEvent.Playing'),
      [PlayerEvent.Warning]: e => console.warn('PlayerEvent.Warning', e),
      [PlayerEvent.Error]: e => console.warn('PlayerEvent.Error', e),
      [PlayerEvent.DrmLicenseAdded]: e => console.warn('PlayerEvent.DrmLicenseAdded', e),
      [PlayerEvent.VideoDownloadQualityChanged]: e => {
        const { sourceQuality, targetQuality } = e as VideoDownloadQualityChangeEvent;
        console.warn(
          `PlayerEvent.VideoDownloadQualityChanged [${sourceQuality?.label}] -> [${targetQuality?.label}]`,
          e,
        );
      },
      [PlayerEvent.DownloadFinished]: e => {
        const event: DownloadFinishedEvent = e as DownloadFinishedEvent;
        console.warn(
          `PlayerEvent.DownloadFinished ${event.downloadType} ` +
            `${event.downloadTime} (TTFB=${event.timeToFirstByte.toFixed(2)})` +
            ` ${event.success ? '' : `FAILED ${event.httpStatus}`}`,
        );
      },
    },
    tweaks: {
      app_id: 'com.bitmovin.demo.kepler',
      enable_performance_logs: true,
      enable_media_element_event_logs: true,
      max_startup_buffer: 1,
    },
    network: {
      preprocessHttpRequest(type, request) {
        console.warn(`Loading ${type}`, request.url);

        return Promise.resolve(request);
      },
      preprocessHttpResponse(type, response) {
        response.status >= 400
          ? console.warn(`Error loading ${type}`, response.url, response.status, response.statusText)
          : console.warn(`Loaded ${type}`, response.url, response.status);

        return Promise.resolve(response);
      },
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
