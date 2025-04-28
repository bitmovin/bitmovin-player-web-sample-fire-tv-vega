import { DOMParser } from '@xmldom/xmldom';

export const DOMParserPolyfill = {
  install(): void {
    global.DOMParser = DOMParser;
  },
};
