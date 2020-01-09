export const load = async () => {
  const polyfillElement = document.createElement('script');
  polyfillElement.src = "https://polyfill.io/v3/polyfill.js?features=es5,Array.from,Array.isArray,Array.prototype.@@iterator,Array.prototype.fill,Array.prototype.find,Array.prototype.includes,matchMedia,Intl,Object.assign,Object.create,Object.values,Object.entries,Number.isNaN,Map,Set,Symbol,Symbol.iterator,Reflect,Promise,Reflect.has,Reflect.set,Reflect.setPrototypeOf,Reflect.apply,Reflect.defineProperty,Reflect.get?flags=gated";
  document.body.appendChild(polyfillElement);
  await new Promise(r => {
    polyfillElement.addEventListener('load', () => r());
  });
  await import(
    /* webpackChunkName: 'whatwg-fetch' */
    'whatwg-fetch'
  );
};