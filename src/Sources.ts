import type { SourceConfig } from 'bitmovin-player';

export const Sources: Record<string, SourceConfig> = {
  AomDash: {
    title: 'AomDash',
    dash: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
  },
  AomHlsFmp4: {
    title: 'AomHlsFmp4',
    hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  },
  AomProgressive: {
    title: 'AomProgressive',
    progressive:
      'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4',
  },
  SintelDash: {
    title: 'SintelDash',
    dash: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
  },
  ShakaBbbHls: {
    title: 'ShakaBbbHls',
    hls: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
  },
  ShakaAngelOneHls: {
    title: 'ShakaAngelOneHls',
    hls: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/playlist_v-0480p-1000k-libx264.mp4.m3u8',
  },
  TosDash: {
    title: 'TosDash',
    dash: 'https://dash.akamaized.net/dash264/TestCasesIOP33/MPDChaining/fallback_chain/2/manifest_terminationEvent_fallback_MPDChaining.mpd',
  },
  DashIfLiveSim2s: {
    title: 'DashIfLiveSim2s',
    dash: 'https://livesim2.dashif.org/livesim2/utc_head/testpic_2s/Manifest.mpd',
  },
} as const;

export const DrmSources: Record<string, SourceConfig> = {
  AomDashWidevine: {
    title: 'AomDashWidevine',
    dash: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
    drm: {
      widevine: {
        LA_URL: 'https://cwip-shaka-proxy.appspot.com/no_auth',
      },
    },
  },
  AomDashPlayready: {
    title: 'AomDashPlayready',
    dash: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
    drm: {
      playready: {
        LA_URL:
          'https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==',
        utf8message: true,
        plaintextChallenge: true,
        headers: {
          'Content-Type': 'text/xml',
        },
      },
    },
  },
};
