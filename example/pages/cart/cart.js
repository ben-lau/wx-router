import router from '../../router/router';
import store, { STATE_TYPES } from '../../store/store';

Page({
  data: { id: '', from: '', cartCount: 0 },
  $data: {
    observer: null
  },
  onLoad() {
    this.initCart();
  },
  onUnload() {
    this.$data.observer && this.$data.observer();
  },
  onRoute({ from = '', id = '' }) {
    this.setData({
      from,
      id
    });
  },
  initCart() {
    this.setData({
      cartCount: store.getState(STATE_TYPES.cartCount)
    });
    this.$data.observer = store.observe(
      STATE_TYPES.cartCount,
      (e, cartCount) => {
        this.setData({
          cartCount
        });
      }
    );
  },
  addInCartOnTap() {
    let cartCount = store.getState(STATE_TYPES.cartCount);
    store.setState({ [STATE_TYPES.cartCount]: cartCount + 1 });
  },
  loginOnTap() {
    router.go({
      url: '/pages/login/login',
      query: {
        from: 'cart'
      }
    });
  },
  mineOnTap() {
    router.go({
      url: '/pages/mine/mine',
      query: {
        from: 'cart'
      }
    });
  }
});
