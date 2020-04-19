import router from '../../router/router';
import { toast, getRandomCode } from '../../utils/index';

Page({
  data: { from: '' },
  onRoute({ from = '' }) {
    this.setData({
      from
    });
  },
  async registerOnTap() {
    await toast('假设注册中');
    const userid = getRandomCode(10);
    await toast(`userid:${userid}`, 3000);
    router.goBack({
      delta: 2,
      query: {
        from: 'register',
        id: userid
      }
    });
  },
  cancelOnTap() {
    router.goBack({
      delta: 2,
      query: {
        from: 'register'
      }
    });
  }
});
