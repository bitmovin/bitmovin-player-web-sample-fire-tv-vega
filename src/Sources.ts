import {SourceConfig} from 'bitmovin-player';

export const Sources: Record<string, SourceConfig> = {
  AomDash: {
    title: 'AomDash',
    dash: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
  },
  AomHls: {
    title: 'AomHls',
    hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  },
  AomDashAbsoluteUrls: {
    title: 'AomDashAbsoluteUrls',
    dash: 'https://bitmovin-player-eu-west1-ci-input.s3.amazonaws.com/general/aom/absolute-urls.mpd',
  },
  AomDashDrm: {
    title: 'AomDashDrm',
    dash: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
    drm: {
      widevine: {
        LA_URL: 'https://cwip-shaka-proxy.appspot.com/no_auth',
      },
      playready: {
        LA_URL:
          'https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==',
      },
    },
  },
  AomHlsFmp4: {
    title: 'AomHlsFmp4',
    hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  },
  KronehitDash: {
    title: 'KronehitDash',
    dash: 'https://bitcdn-kronehit.bitmovin.com/v2/dash/manifest.mpd',
  },
  ZattooDash: {
    title: 'ZattooDash',
    dash: 'https://demo-dash-live.zahs.tv/fullhd/manifest.mpd?timeshift=100',
  },
  ZattooHlsFmp4: {
    title: 'ZattooHlsFmp4',
    hls: 'https://demo-hls7-live.zahs.tv/fullhd/master.m3u8?timeshift=100',
  },
} as const;
