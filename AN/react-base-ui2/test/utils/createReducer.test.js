import createReducer from 'src/utils/createReducer';

describe('utils/createReducer', () => {
  it('createReducer should work fine', () => {
    const actionType = 'TEST_TYPE';
    const initState = { obj: 'test' };
    const reducer = createReducer(initState);
    expect(reducer(undefined, { type: actionType })).toEqual(initState);
  });
  it('createReducer should work fine when has successHandler argument', () => {
    const actionType = 'TEST_TYPE';
    const initState = { obj: 'test' };
    const reducer = createReducer(initState);

    reducer.on(actionType);
    const tempHandle = reducer(initState, { type: actionType });
    expect(tempHandle).toEqual(initState);

    const successHandler = jest.fn();
    reducer.on(actionType, successHandler);
    reducer(initState, { type: actionType });
    expect(successHandler).toHaveBeenCalledWith({ ...initState }, { type: actionType });
  });
  it('createReducer should work fine when has errorHandler argument', () => {
    const actionType = 'TEST_TYPE';
    const initState = { obj: 'test' };
    const reducer = createReducer(initState);
    const tempError = new Error('test error');

    reducer.on(actionType);
    const tempHandle = reducer(initState, { type: actionType, error: tempError });
    expect(tempHandle).toEqual(initState);

    const errorHandler = jest.fn();
    reducer.on(actionType, null, errorHandler);
    reducer(initState, { type: actionType, error: tempError });
    expect(errorHandler).toHaveBeenCalledWith({ ...initState }, { type: actionType, error: tempError });
  });
});
