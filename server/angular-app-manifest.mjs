
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://Armoni81.github.io/StockApp/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/https://Armoni81.github.io/StockApp"
  },
  {
    "renderMode": 2,
    "route": "/https://Armoni81.github.io/StockApp/bookmarks"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4932, hash: 'b3d2ee3973aeb474f408cd6c633ed31f9a6a0d421979726e593ff1c33fab7d7c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1048, hash: '1884de18f12efb1042fa4493b7eb47c26960c60aabdd9e386de0b5a04e0aabbb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 10197, hash: '0dc3587552b6cb2730764a59b27ff997c648cb5331b563b968a91f6c7915b1e1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'bookmarks/index.html': {size: 10197, hash: '0dc3587552b6cb2730764a59b27ff997c648cb5331b563b968a91f6c7915b1e1', text: () => import('./assets-chunks/bookmarks_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
