import WxRouter from 'wx-mp-router';

const routerList = [
  {
    url: '/pages/home/home',
    name: 'Home'
  },
  {
    url: '/pages/cart/cart',
    name: 'Cart'
  },
  {
    url: '/pages/mine/mine',
    name: 'Mine'
  },
  {
    url: '/pages/login/login',
    name: 'Login'
  },
  {
    url: '/pages/register/register',
    name: 'Register'
  },
  {
    url: '/pages/details/details',
    name: 'Details'
  }
];

export default new WxRouter(routerList);
