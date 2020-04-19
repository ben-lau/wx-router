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
 * 获取随机数位的随机数
 */
export const getRandomCode = digit =>
  `${new Array(digit).fill('0').join('')}${Math.floor(
    Math.random() * 10 ** digit
  )}`.substr(-digit);

/**
 * 深克隆json
 * @param {T} json
 * @returns {T}
 */
export const deepCloneJSON = json => JSON.parse(JSON.stringify(json));
