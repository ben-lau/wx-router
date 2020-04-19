# wx-router

> 更好用的小程序路由

## 概述

`wx-router`是一个**微信小程序路由类**，封装了小程序路由 api，并且解决了部分小程序路由 api 中不好用的一些地方，提升开发效率和语义化，以及更优雅的编程体验。

## 特性

- 支持 Promise 化调用
- 支持别名跳转
- 支持路由传值保持类型
- 调用简单化，不需要确定页面是否 tabbar 页面（合并 navigateTo 和 switchTab）
- 支持 switchTab 和 navigateBack**传值**

#### todo

- [ ] 路由守卫

## 起步

#### 下载

- 整个下载或克隆
  [点击下载](https://github.com/ben-lau/wx-router/releases)源码后解压移除`example`文件夹后可以直接放到你的项目中。当然也可以参考 example 的用例。
- npm (是的 wx-router 被用了)

```bash
npm install wx-mp-router --save
```

## 用法

#### [示例](https://github.com/ben-lau/wx-router/tree/master/example)

克隆项目后，小程序工具打开项目指向`example`文件夹即可。

#### 初始化

```javascript
import WxRouter from 'wx-mp-router';
export const router = new WxRouter([
  {
    url: '/pages/index/index',
    name: 'Index'
  },
  {
    url: '/pages/home/home',
    name: 'Home'
  }
]);
```

需要自己再维护一个路由列表，但是支持 name 跳转

## api

#### `go` -> navigateTo + switchTab

不需要区分 tab 页面和非 tab 页面

```typescript
declare function go(options: {
  url?: string;
  name?: string;
  query?: Record<string, any>;
}): Promise<any>;
```

```javascript
router.go({
  url: '/pages/index/index',
  query: { id: '123', isAuth: true }
});
router.go({
  name: 'Index', // 支持别名跳转
  query: { id: '123', isAuth: true }
});
```

#### `goBack` -> navigateBack

支持传参

```typescript
declare function goBack(options: {
  delta?: number;
  query?: Record<string, any>;
}): Promise<any>;
```

```javascript
router.goBack({
  delta: 3,
  query: { id: '123', isAuth: true }
});
```

#### `redirect` -> redirectTo

也是不需要区分 tab 页面和非 tab 页面

```typescript
declare function redirect(options: {
  url?: string;
  name?: string;
  query?: Record<string, any>;
}): Promise<any>;
```

```javascript
router.redirect({
  url: '/pages/index/index',
  query: { id: '123', isAuth: true }
});
router.redirect({
  name: 'Index', // 支持别名跳转
  query: { id: '123', isAuth: true }
});
```

#### `reLaunch` -> reLaunch

```typescript
declare function reLaunch(options: {
  url?: string;
  name?: string;
  query?: Record<string, any>;
}): Promise<any>;
```

```javascript
router.reLaunch({
  url: '/pages/index/index',
  query: { id: '123', isAuth: true }
});
router.reLaunch({
  name: 'Index', // 支持别名跳转
  query: { id: '123', isAuth: true }
});
```

#### `onRoute`

路由改变钩子,在路由改变时触发，返回一个取消订阅的方法

```typescript
declare function onRoute(callback: Function): Function;
```

```javascript
router.onRoute((e, query) => {
  console.log(
    e, // 事件
    query // 参数
  );
});
```

## 题外话

本项目起因是因为公司项目需求且小程序目前解决方案本人都觉得不优雅而发起的。旨在解决以下场景

- 1、tabbar 页面是非固定的，购物车 tab 可能在任何位置甚至不存在。（自定义小程序 tab）
- 2、navigateTo 和 switchTab 区分出两个 api，而页面动态化，所有页面都可能是 tab 页面（自定义小程序页面）
- 3、小程序中更改 tab 的 badge(setTabBarBadge,removeTabBarBadge)都需要在 tab 页面调用。（购物车数量标记）
- 4、tab 页面点击需要给触发另一个 tab 页逻辑。（switchTab 不能带参数）
- 5、跳转到很深的页面后回到很前面一页，需要出发部分逻辑，中间的页面也有可能回去也要带不同的逻辑（注册场景）

当然，以上所有场景都可以用<font color="red" size="3">全局状态</font>或者<font color="red" size="3">事件总线</font>解决，本人项目也有实现封装（有空再分享），但是并不优雅，页面与页面间耦合度高。

**PS.本人在找工作中，有没好的内推介绍一下嘿嘿。**
