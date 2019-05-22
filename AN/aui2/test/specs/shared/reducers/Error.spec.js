import { fromJS, is } from 'immutable';
import { ADD_ERROR, CLEAR_ERROR } from 'shared/actions/Error';
import reducers from 'shared/reducers/Error';

describe('shared/reducers/error', () => {
  const getInitialState = () => fromJS({
    list: [],
    systemErrors: [],
    businessErrors: []
  });

  const businessErrorCode = '1050';
  const businessErrorMsg = 'Business Error';
  const businessError = {
    code: businessErrorCode,
    message: businessErrorMsg
  };

  const systemErrorCode = '0002';
  const systemErrorMsg = 'System Error';
  const systemError = {
    code: systemErrorCode,
    message: systemErrorMsg,
    isSystemError: true
  };

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(getInitialState(), state)).toBe(true);
  });

  it('Add business error success', () => {
    const action = {
      type: ADD_ERROR,
      payload: businessError
    };
    const state = reducers(getInitialState(), action);
    const list = state.get('list').toJS();
    expect(Array.isArray(list)).toBeTruthy();
    expect(list).toHaveLength(1);
    expect(list[0].code).toBe(businessErrorCode);
    expect(list[0].message).toBe(businessErrorMsg);

    const systemErrors = state.get('systemErrors').toJS();
    expect(Array.isArray(systemErrors)).toBeTruthy();
    expect(systemErrors).toHaveLength(0);

    const businessErrors = state.get('businessErrors').toJS();
    expect(Array.isArray(businessErrors)).toBeTruthy();
    expect(businessErrors).toHaveLength(1);
  });

  it('Add system error success', () => {
    const action = {
      type: ADD_ERROR,
      payload: systemError
    };
    const state = reducers(getInitialState(), action);
    const list = state.get('list').toJS();
    expect(Array.isArray(list)).toBeTruthy();
    expect(list).toHaveLength(1);
    expect(list[0].code).toBe(systemErrorCode);
    expect(list[0].message).toBe(systemErrorMsg);

    const systemErrors = state.get('systemErrors').toJS();
    expect(Array.isArray(systemErrors)).toBeTruthy();
    expect(systemErrors).toHaveLength(1);

    const businessErrors = state.get('businessErrors').toJS();
    expect(Array.isArray(businessErrors)).toBeTruthy();
    expect(businessErrors).toHaveLength(0);
  });

  it('Add existing error success', () => {
    const action = {
      type: ADD_ERROR,
      payload: businessError
    };
    const withErrorState = getInitialState().withMutations((state) => {
      state.update('list', list => list.push(businessError));
      state.update('businessErrors', businessErrors => businessErrors.push(businessError));
    });
    const state = reducers(withErrorState, action);
    const list = state.get('list').toJS();
    expect(Array.isArray(list)).toBeTruthy();
    expect(list).toHaveLength(1);
    expect(list[0].code).toBe(businessErrorCode);
    expect(list[0].message).toBe(businessErrorMsg);

    const systemErrors = state.get('systemErrors').toJS();
    expect(Array.isArray(systemErrors)).toBeTruthy();
    expect(systemErrors).toHaveLength(0);

    const businessErrors = state.get('businessErrors').toJS();
    expect(Array.isArray(businessErrors)).toBeTruthy();
    expect(businessErrors).toHaveLength(1);
  });

  it('Clear error success', () => {
    const withErrorState = getInitialState().withMutations((state) => {
      state.set('list', fromJS([businessError, systemError]));
      state.set('businessErrors', fromJS([businessError]));
      state.set('systemErrors', fromJS([systemError]));
    });
    const state = reducers(withErrorState, { type: CLEAR_ERROR });
    expect(is(getInitialState(), state)).toBe(true);
  });
});
