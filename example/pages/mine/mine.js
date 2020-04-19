import router from '../../router/router';

Page({
  data: { id: '', from: '' },
  onRoute({ from = '', id = '' }) {
    this.setData({
      from,
      id
    });
  },
  loginOnTap() {
    router.go({
      url: '/pages/login/login',
      query: {
        from: 'mine'
      }
    });
  },
  homeOnTap() {
    router.go({
      url: '/pages/home/home',
      query: {
        from: 'mine'
      }
    });
  }
});
