import PromiseMiddleware from './promiseMiddleware';
import RouteMiddleware from './routeMiddleware';
import ThunkMiddleware from './thunkMiddleware';
import API from './API';

export default [
  new ThunkMiddleware(),
  new RouteMiddleware(),
  new PromiseMiddleware(new API())
];
