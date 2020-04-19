/**
 * 延迟时间 promisify封装
 * @param {Number} time
 * @return {Promise}
 */
export const wait = (time = 1000) => {
  return new Promise(res => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      res();
    }, time);
    return timer;
  });
};

/**
 * 小程序提示 (没蒙层)
 * @param {String} title
 * @param {Number} duration
 * @return {Promise}
 */
export const toast = (title = '提示', duration = 2000) => {
  wx.showToast({
    title,
    duration,
    icon: 'none'
  });
  return wait(duration);
};
