import { is, fromJS } from 'immutable';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/prerequisite';
import reducer from 'shared/reducers/prerequisite';

describe('shared -> reducers -> prerequisite', () => {
  const defaultState = {
    errors: [],
    needOverride: false,
    userName: '',
    userPassword: '',
    isOverride: false,
    haveOverrideAuthority: false,
    overrideMessage: ''
  };
  const initialState = fromJS(defaultState);
  let store = null;

  beforeEach(() => {
    store = configureStore(middlewares)(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('PREREQUISITE_ADD_ERRORS should works fine', () => {
    const errors = ['xx'];
    const state = reducer(initialState, {
      type: actions.PREREQUISITE_ADD_ERRORS,
      payload: {
        errors
      }
    });

    expect(state.get('errors').toJS()).toEqual(errors);
  });

  it('PREREQUISITE_CLEAR_ERRORS should works fine', () => {
    const errorIndex = 1;
    const state = reducer(fromJS(Object.assign(defaultState, {
      errors: ['1', '2', '3']
    })), {
      type: actions.PREREQUISITE_CLEAR_ERRORS,
      payload: {
        errorIndex
      }
    });
    expect(state.get('errors').toJS()).toEqual(['1', '3']);
  });

  it('PREREQUISITE_CLEAR_ERRORS should works fine', () => {
    const errorIndex = -1;
    const state = reducer(fromJS(Object.assign(defaultState, {
      errors: ['1', '2', '3']
    })), {
      type: actions.PREREQUISITE_CLEAR_ERRORS,
      payload: {
        errorIndex
      }
    });

    expect(state.get('errors').size).toEqual(0);
  });


  it('PREREQUISITE_UPDATE_OVERRIDE should works fine', () => {
    const state = reducer(initialState, {
      type: actions.PREREQUISITE_UPDATE_OVERRIDE,
      payload: {
        isOverride: true
      }
    });
    expect(state.get('isOverride')).toBe(true);
  });

  it('PREREQUISITE_UPDATE_NEED_OVERRIDE should works fine', () => {
    const state = reducer(initialState, {
      type: actions.PREREQUISITE_UPDATE_NEED_OVERRIDE,
      payload: {
        needOverride: true
      }
    });
    expect(state.get('needOverride')).toBe(true);
  });

  it('PREREQUISITE_UPDATE_USER_NAME should works fine', () => {
    const userName = 'test user name'
    const state = reducer(initialState, {
      type: actions.PREREQUISITE_UPDATE_USER_NAME,
      payload: {
        value: userName
      }
    });
    expect(state.get('userName')).toBe(userName);
  });
  
  it('PREREQUISITE_UPDATE_USER_PASSWORD should works fine', () => {
    const state = reducer(fromJS(initialState), {
      type: actions.PREREQUISITE_UPDATE_USER_PASSWORD,
      payload: {
        value: 'test pass'
      }
    });

    expect(state.get('userPassword')).toEqual('test pass');
  });

  it('PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY should works fine', () => {
    const state = reducer(fromJS(initialState), {
      type: actions.PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY,
      payload: {
        haveOverrideAuthority: true
      }
    });

    expect(state.get('haveOverrideAuthority')).toBe(true);
  });

  it('PREREQUISITE_UPDATE_OVERRIDE_MESSAGE should works fine', () => {
    const overrideMessage = 'override message';
    const state = reducer(fromJS(initialState), {
      type: actions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE,
      payload: {
        overrideMessage
      }
    });

    expect(state.get('overrideMessage')).toEqual(overrideMessage);
  });
});
