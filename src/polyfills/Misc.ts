export function polyfillElementFunctions(element: any): void {
  element.hasAttribute = (name: string) => element[name] !== undefined;
  element.removeAttribute = (name: string) => {
    delete element[name];
  };
  element.getAttribute = (name: string) => element[name];
  element.setAttribute = (name: string, value: any) => {
    element[name] = value;
  };
}
