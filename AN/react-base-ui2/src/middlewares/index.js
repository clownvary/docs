import thunkMiddleware from './thunkMiddleware';
import promiseMiddleware from './promiseMiddleware';
import errorMiddleware from './errorMiddleware';

const presetRedux = [
  errorMiddleware,
  thunkMiddleware,
  promiseMiddleware
];

export {
  promiseMiddleware,
  thunkMiddleware,
  presetRedux
};
