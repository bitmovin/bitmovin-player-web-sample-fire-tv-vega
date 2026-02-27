import { DOMParser, Element } from '@xmldom/xmldom';

export const DOMParserPolyfill = {
  install(): void {
    console.log('Installing DOMParser polyfill');

    global.DOMParser = DOMParser;
    global.Element = Element;
  },
};
