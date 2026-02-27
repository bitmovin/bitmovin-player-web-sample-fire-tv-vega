import { WebCrypto } from '@amazon-devices/react-native-w3cmedia';

export const WebCryptoPolyfill = {
  install(): void {
    // @ts-ignore
    console.log('Installing WebCrypto polyfill');

    global.crypto = WebCrypto as any;
  },
};
