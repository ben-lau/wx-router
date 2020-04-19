/**
 * 将对象转为query
 * @param {Object} query
 */
export const stringifyQuery = query => {
  try {
    return Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&');
  } catch (err) {
    return '';
  }
};

/**
 * promise化微信原生api
 * @param {Function} wxapi 微信原生api
 * @returns {()=>Promise<any>}
 */
export const promisify = wxapi => (options, ...args) =>
  new Promise((res, rej) =>
    wxapi.apply(null, [
      {
        ...options,
        success: res,
        fail: err => {
          console.log(err);
          rej(err);
        }
      },
      ...args
    ])
  );
