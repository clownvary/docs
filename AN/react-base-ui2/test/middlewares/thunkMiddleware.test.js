
import { thunkMiddleware } from 'src/middlewares';

const dispatch = () => { };
const next = action => action;
let action = {};

describe('src/middlewares', () => {
  it('src/middlewares/thunkMiddleware action.payload is {}', () => {
    const result = thunkMiddleware({ dispatch })(next)(action);
    expect(result).toEqual(action);
  });

  it('src/middlewares/thunkMiddleware action is function', () => {
    action = () => true;
    const result = thunkMiddleware({ dispatch })(next)(action);
    action = () => Promise.reject({ processed: false });
    thunkMiddleware({ dispatch })(next)(action);
    expect(result).toEqual(true);
  });

  it('src/middlewares/thunkMiddleware action.payload is null', () => {
    action = () => Promise.reject({ processed: 'test data' });
    thunkMiddleware({ dispatch })(next)(action);
  });
});
