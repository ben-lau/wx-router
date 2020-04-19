declare class WxRouter {
  constructor(routeList?: RouteItem[]);
  go: NavigateFunction;
  redirect: NavigateFunction;
  reLaunch: NavigateFunction;
  goBack: NavigateBackFunction;
  onRoute: OnRoute;
}

declare interface RouteItem {
  url: string;
  name: string;
  isTab?: boolean;
}

declare interface NavigateFunction {
  (options: UrlNavigateOptions): Promise<any>;
  (options: NameNavigateOptions): Promise<any>;
}

declare interface NavigateBackFunction {
  (options: NavigateBackOptions): Promise<any>;
}

declare interface OnRoute {
  (callback: Function): Function;
}

declare interface UrlNavigateOptions {
  url: string;
  query?: Record<string, string>;
}

declare interface NameNavigateOptions {
  name: string;
  query?: Record<string, string>;
}

declare interface NavigateBackOptions {
  delta: number;
  query: Record<string, string>;
}

export default WxRouter;
