
import errorMiddleware from 'src/middlewares/errorMiddleware';
import { ErrorObj, ErrorType } from 'src/common/error';

const next = action => action;
let action = {
  error: ''
};

describe('src/middlewares/errorMiddleware', () => {
  it('src/middlewares/promiseMiddleware action.error is null', () => {
    const result = errorMiddleware()(next)(action);
    expect(result).toEqual(action);
  });

  it('src/middlewares/promiseMiddleware action.error not null', () => {
    action = {
      error: '223'
    };

    const result = errorMiddleware()(next)(action);
    expect(result).toEqual(action);
  });

  it('src/middlewares/promiseMiddleware is ErrorType.SERVICE', () => {
    const errorObj = new ErrorObj(ErrorType.SERVICE, 'msgGroup', {
      code: 500,
      response: 'test error data'
    });
    action = {
      payload: errorObj,
      error: true
    };
    const result = errorMiddleware()(next)(action);
    expect(result).toEqual(action);
  });

  it('src/middlewares/promiseMiddleware is ErrorType.HTTP', () => {
    const errorObj = new ErrorObj(ErrorType.HTTP, 'msgGroup', {
      code: 500,
      response: 'test error data'
    });
    action = {
      payload: errorObj,
      error: true
    };
    const result = errorMiddleware()(next)(action);
    expect(result).toEqual(action);
  });

  it('src/middlewares/promiseMiddleware ErrorType.APP', () => {
    const errorObj = new ErrorObj(ErrorType.APP, 'msgGroup', {
      code: 500,
      response: 'test error data'
    });
    action = {
      payload: errorObj,
      error: true
    };
    const result = errorMiddleware()(next)(action);
    expect(result).toEqual(action);
  });
  it('src/middlewares/promiseMiddleware ErrorType.APP', () => {
    const errorObj = new ErrorObj('23', 'msgGroup', {
      code: 500,
      response: 'test error data'
    });
    action = {
      payload: errorObj,
      error: true
    };
    const result = errorMiddleware()(next)(action);
    expect(result).toEqual(action);
  });
});
