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
        from: 'home'
      }
    });
  },
  cartOnTap() {
    router.go({
      url: '/pages/cart/cart',
      query: {
        from: 'home'
      }
    });
  },
  detailsOnTap(){
    router.go({
      name: 'Details',
      query: {
        from: 'home'
      }
    });
  }
});
