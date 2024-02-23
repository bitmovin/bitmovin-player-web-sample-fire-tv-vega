import {decode, encode} from 'base-64';

export const Base64Polyfill = {
  install(): void {
    global.atob = decode;
    global.btoa = encode;
  },
};
