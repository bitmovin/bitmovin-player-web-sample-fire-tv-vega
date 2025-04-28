import { DOMParser, Element } from '@xmldom/xmldom';

export const DOMParserPolyfill = {
  install(): void {
    global.DOMParser = DOMParser;
    global.Element = Element;
  },
};
