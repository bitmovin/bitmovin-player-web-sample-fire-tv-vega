import {DOMParser} from 'xmldom';

export const DOMParserPolyfill = {
  install(): void {
    global.DOMParser = DOMParser;
  },
};
