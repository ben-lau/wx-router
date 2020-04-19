import WxRouter from './../lib/WxRouter/WxRouter';

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

const router = new WxRouter(routerList);

router.onRoute((e, query) => {
  const page = getCurrentPages();
  const thisPage = page[page.length - 1];
  if (thisPage) {
    const onRoute = thisPage.onRoute;
    thisPage.$query = query;
    typeof onRoute === 'function' && onRoute(query);
  }
});

export default router;
