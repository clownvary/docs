import first from 'lodash/first';
import find from 'lodash/find';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/PermitDetail/actions/permitType';

describe('index -> PermitDetail -> actions -> permitType', () => {
  let store = null;
  const value = 'test';

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('setReservationType should works fine', () => {
    const {
      setReservationType,
      SET_PERMIT_RESERVATION_TYPE
    } = actions;

    store.dispatch(setReservationType(value));
    const action = first(store.getActions());

    expect(action.type).toEqual(SET_PERMIT_RESERVATION_TYPE);
    expect(action.payload.value).toEqual(value);
  });

  it('changeReservationType should works fine', () => {
    const {
      changeReservationType,
      SET_PERMIT_RESERVATION_TYPE
    } = actions;
    const params = {};

    return store.dispatch(changeReservationType(params, value)).then(() => {
      const storeActions = store.getActions();
      const changeType = find(storeActions, action =>
        action.type === SET_PERMIT_RESERVATION_TYPE);
      const changeTypeResult = changeType.payload.value;

      expect(changeTypeResult).toEqual(value);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
    });
  });

  it('changeReservationDate should works fine', () => {
    const {
      changeReservationDate,
      SET_PERMIT_RESERVATION_DATE
    } = actions;
    const params = {};

    return store.dispatch(changeReservationDate(params, value)).then(() => {
      const storeActions = store.getActions();
      const setDate = find(storeActions, action =>
        action.type === SET_PERMIT_RESERVATION_DATE);
      const setDateResult = setDate.payload.value;

      expect(setDateResult).toEqual(value);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
    });
  });

  it('changeReservationUsers should works fine', () => {
    const {
      changeReservationUsers,
      SET_PERMIT_RESERVATION_USERS
    } = actions;
    const params = {};

    return store.dispatch(changeReservationUsers(params, value)).then(() => {
      const storeActions = store.getActions();
      const changeUser = find(storeActions, action =>
        action.type === SET_PERMIT_RESERVATION_USERS);
      const changeUserResult = changeUser.payload.value;

      expect(changeUserResult).toEqual(value);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
    });
  });

  it('changeReservationUsers should works fine, if value = null', () => {
    const {changeReservationUsers } = actions;
    const params = {};

    return store.dispatch(changeReservationUsers(params)).then(() => {
      const storeActions = store.getActions();

      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
    });
  });
});
