import {WebCrypto} from '@amzn/react-native-w3cmedia';

export const WebCryptoPolyfill = {
  install(): void {
    // @ts-ignore
    global.crypto = WebCrypto;
  },
};
