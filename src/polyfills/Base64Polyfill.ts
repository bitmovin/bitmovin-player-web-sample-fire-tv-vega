import { decode, encode } from 'base-64';

export const Base64Polyfill = {
  install(): void {
    console.log('Installing Base64 polyfill');

    global.atob = decode;
    global.btoa = encode;
  },
};
