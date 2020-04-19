import { promisify } from './utils/index';
import router from './router/router';
import store, { STATE_TYPES } from './store/store';

App({
  onLaunch: function () {
    this.initCartBadge();
  },
  initCartBadge() {
    try {
      let needRefresh = true;
      if (__wxConfig && __wxConfig.tabBar) {
        const cartTabIndex = __wxConfig.tabBar.list.findIndex(({ pagePath }) =>
          pagePath.includes('pages/cart/cart')
        );

        if (cartTabIndex >= 0) {
          const refreshCartBadge = async () => {
            try {
              const count = store.getState(STATE_TYPES.cartCount);
              if (count > 0) {
                await promisify(wx.setTabBarBadge)({
                  index: cartTabIndex,
                  text: String(count)
                });
              } else {
                await promisify(wx.removeTabBarBadge)({
                  index: cartTabIndex
                });
              }
              needRefresh = false;
            } catch (err) {
              needRefresh = true;
            }
          };

          store.observe(STATE_TYPES.cartCount, refreshCartBadge);

          router.onRoute(({ path }) => {
            const currentIsTabPage = __wxConfig.tabBar.list.some(
              ({ pagePath }) => pagePath.includes(path)
            );
            if (currentIsTabPage && needRefresh) {
              refreshCartBadge();
            }
          });
        }
      }
    } catch (err) {}
  }
});
