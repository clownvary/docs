
import { promiseMiddleware } from 'src/middlewares';
import { ActionType, reportError } from 'src/middlewares/actions';

const dispatch = () => { };
const next = action => action;
let action = {};

describe('src/middlewares', () => {
  it('src/middlewares/promiseMiddleware action.payload is null', () => {
    const result = promiseMiddleware({ dispatch })(next)(action);
    expect(result).toEqual(action);
  });
  it('src/middlewares/promiseMiddleware action.payload is null', () => {
    action = {
      payload: 'test data'
    };

    const result = promiseMiddleware({ dispatch })(next)(action);
    expect(result.payload).toEqual('test data');
  });
  it('src/middlewares/promiseMiddleware action.payload is null', () => {
    action = {
      type: 'ACTION_TYPE',
      payload: Promise.resolve('foobar')
    };
    promiseMiddleware({ dispatch })(next)(action);
  });

  it('src/middlewares/promiseMiddleware action.payload is null', () => {
    action = {
      type: 'ACTION_TYPE',
      payload: Promise.reject('foobar')
    };
    promiseMiddleware({ dispatch })(next)(action);
  });

  it('src/middlewares/actions action tpyes', () => {
    expect(ActionType.BASE_REPORT_ERROR_ACTION).toEqual('React-Base-UI/BASE_REPORT_ERROR_ACTION');
  });

  it('src/middlewares/actions action tpyes', () => {
    expect(reportError('error data')).toEqual({
      error: true,
      payload: 'error data',
      type: 'React-Base-UI/BASE_REPORT_ERROR_ACTION'
    });
  });
});
