import { promisify, stringifyQuery } from './utils';
const _routerList = Symbol('_routerList');
const _query = Symbol('_query');
const _routeHooks = Symbol('_routeHooks');

const generateRoutList = routerList => {
  let _routerList = routerList;
  try {
    __wxConfig &&
      __wxConfig.tabBar &&
      __wxConfig.tabBar.list &&
      (_routerList = routerList.map(item => {
        return {
          ...item,
          isTab: __wxConfig.tabBar.list.some(({ pagePath }) =>
            pagePath.includes(item.url)
          )
        };
      }));
  } catch (err) {}
  return _routerList;
};

const errorLog = console.error;

class WxRouter {
  [_query] = {};
  [_routerList] = [];
  [_routeHooks] = [];

  constructor(router) {
    __wxConfig &&
      __wxConfig.pages &&
      __wxConfig.pages.length !== router.length &&
      errorLog('部分页面未在路由声明');

    this[_routerList] = generateRoutList(router);

    wx.onAppRoute &&
      wx.onAppRoute(e => {
        this[_routeHooks].forEach(fn => {
          try {
            typeof fn === 'function' && fn(e, this[_query], this[_routerList]);
          } catch (err) {
            console.log(err);
          }
        });
        this[_query] = {};
      });
  }

  go({ url, name, query } = {}) {
    const routerMapItem = this[_routerList].find(
      item => item.url === url || item.name === name
    );
    if (!routerMapItem) {
      errorLog('找不到路由');
      return;
    }

    const _url = routerMapItem.url;
    this[_query] = query || {};

    if (routerMapItem.isTab) {
      return promisify(wx.switchTab)({ url: _url }).catch(() =>
        promisify(wx.navigateTo)({
          url: query ? `${_url}?${stringifyQuery(query)}` : _url
        })
      );
    } else {
      return promisify(wx.navigateTo)({
        url: query ? `${_url}?${stringifyQuery(query)}` : _url
      }).catch(() => promisify(wx.switchTab)({ url: _url }));
    }
  }

  redirect({ url, name, query } = {}) {
    const routerMapItem = this[_routerList].find(
      item => item.url === url || item.name === name
    );
    if (!routerMapItem) {
      errorLog('找不到路由');
      return;
    }

    const _url = routerMapItem.url;
    this[_query] = query || {};

    if (routerMapItem.isTab) {
      return promisify(wx.switchTab)({ url: _url }).catch(() =>
        promisify(wx.redirectTo)({
          url: query ? `${_url}?${stringifyQuery(query)}` : _url
        })
      );
    } else {
      return promisify(wx.redirectTo)({
        url: query ? `${_url}?${stringifyQuery(query)}` : _url
      }).catch(() => promisify(wx.switchTab)({ url: _url }));
    }
  }

  goBack({ delta, query } = {}) {
    this[_query] = query || {};
    return promisify(wx.navigateBack)({ delta });
  }

  reLaunch({ url, name, query } = {}) {
    const routerMapItem = this[_routerList].find(
      item => item.url === url || item.name === name
    );
    if (!routerMapItem) {
      errorLog('找不到路由');
      return;
    }

    const _url = routerMapItem.url;

    return promisify(wx.reLaunch)({
      url: query ? `${_url}?${stringifyQuery(query)}` : _url
    });
  }

  onRoute(fn) {
    this[_routeHooks].push(fn);
    return () => {
      const i = list.indexOf(fn);
      if (i > -1) list.splice(i, 1);
    };
  }
}

const _WxRouter = (() => {
  let _instance = null;

  const _Class = function (...arg) {
    if (_instance) {
      return _instance;
    }
    const _routerInstance = new WxRouter(...arg);
    _instance = _routerInstance;
    return _routerInstance;
  };

  return _Class;
})();

export default _WxRouter;
