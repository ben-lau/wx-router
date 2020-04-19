/**
 * @class 事件总线管理类，就发布-订阅模式吧
 */
export default class EventBus {
  handlers = {};
  /**
   * 添加订阅者
   * @param {String} type 事件类型
   * @param {Function} callback 事件回调
   * @param {any} scope 事件回调上下文
   * @param {boolean} once 是否只消费一次事件
   * @returns unsubscribe 返回取消订阅方法
   */
  subscribe(type, callback, { scope = null, once = false } = {}) {
    const _unsubscribe = () => {
      if (this.handlers[type] && Array.isArray(this.handlers[type])) {
        const index = this.handlers[type].findIndex(item => eventItem == item);
        index >= 0 && this.handlers[type].splice(index, 1);
      }
    };
    const eventItem = { callback, scope, once, _unsubscribe };
    if (this.handlers[type] && Array.isArray(this.handlers[type])) {
      this.handlers[type].push(eventItem);
    } else {
      this.handlers[type] = [eventItem];
    }

    return _unsubscribe;
  }
  /**
   * 取消订阅者
   * @param {String} type 事件类型
   * @param {Function} callback 事件回调
   * @param {any} scope 事件上下文
   */
  unsubscribe(type, callback, scope) {
    if (this.handlers[type] && Array.isArray(this.handlers[type])) {
      const index = this.handlers[type].findIndex(
        eventItem =>
          eventItem.callback === callback && eventItem.scope === scope
      );
      index >= 0 && this.handlers[type].splice(index, 1);
    }
  }
  /**
   * 发布者
   * @param {String} type 事件内容
   * @param  {...any} params 参数集合
   * @returns {number} 受影响订阅者数量
   */
  dispatch(type, ...params) {
    let event_count = 0;
    if (this.handlers[type] && Array.isArray(this.handlers[type])) {
      const handlers = [...this.handlers[type]];
      handlers.forEach(({ callback, scope, once, _unsubscribe }) => {
        if (callback && typeof callback === 'function') {
          callback.apply(scope, [
            { type, target: this, unsubscribe: _unsubscribe },
            ...params
          ]);
          once && _unsubscribe();
          event_count++;
        }
      });
    }
    return event_count;
  }
  /**
   * 取消某个类型所有订阅者
   * @param {String} type 事件类型
   */
  removeAllSubscribers(type) {
    this.handlers[type] = null;
  }
}
