import { WebCrypto } from '@amazon-devices/react-native-w3cmedia';

export const WebCryptoPolyfill = {
  install(): void {
    console.log('Installing WebCrypto polyfill');

    // @ts-ignore
    global.crypto = WebCrypto;
  },
};
