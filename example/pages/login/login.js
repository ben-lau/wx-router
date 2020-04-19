import router from '../../router/router';

Page({
  data: { from: '' },
  onRoute({ from = '' }) {
    this.setData({
      from
    });
  },
  registerOnTap() {
    router.go({
      name: 'Register' // 支持name跳转
    });
  },
  cancelOnTap() {
    router.goBack({
      query: {
        from: 'login'
      }
    });
  }
});
