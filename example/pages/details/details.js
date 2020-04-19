import router from '../../router/router';
import store, { STATE_TYPES } from '../../store/store';

const app = getApp();

Page({
  data: { from: '', cartCount: 0 },
  $data: {
    observer: null
  },
  onLoad() {
    this.initCart();
  },
  onUnload() {
    this.$data.observer && this.$data.observer();
  },
  onRoute({ from = '' }) {
    this.setData({
      from
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
  cancelOnTap() {
    router.goBack({
      query: {
        from: 'login'
      }
    });
  }
});
