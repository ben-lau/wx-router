import EventBus from './../lib/event-bus/EventBus';
import { deepCloneJSON } from '../utils/index';
import initial_state from './initial-state';
export { default as STATE_TYPES } from './state-types';

const _eventBus = Symbol('_eventBus');
const _store = Symbol('_store');

/**
 * 中心状态管理类
 * @param {Object} store 初始化状态对象
 */
class Store {
  constructor(store) {
    this[_eventBus] = new EventBus();
    this[_store] = store;
  }
  /**
   * 设置状态
   * @param {Object} state 批量设置的状态对象
   */
  setState(state) {
    if (state && typeof state === 'object') {
      const updateQueue = Object.keys(state).map(keyName => {
        const value = deepCloneJSON(state[keyName]);
        this[_store][keyName] = value;
        return [keyName, value];
      });

      updateQueue.forEach(([keyName, value]) => {
        this[_eventBus].dispatch(keyName, value);
      });
    } else {
      console.error('state must be an object');
    }
  }
  /**
   * 获取状态值
   * @param {String} keyName 状态名
   */
  getState(keyName) {
    const state = this[_store][keyName];
    if (state !== undefined) {
      return deepCloneJSON(state);
    } else {
      console.error(`can not find keyName '${keyName}'`);
      return null;
    }
  }
  /**
   * 注册观察者
   * @param {String} keyName 需要观察的状态名
   * @param {Function} handler 观察者回调
   */
  observe(keyName, handler) {
    return this[_eventBus].subscribe(keyName, handler);
  }
}

export default new Store(initial_state);
