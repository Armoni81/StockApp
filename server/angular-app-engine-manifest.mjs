
export default {
  basePath: 'https://Armoni81.github.io/StockApp',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
