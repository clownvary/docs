import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/Resource/actions/resourceTimeslot';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

describe('index/Resource/actions/resourceTimeslot', () => {
  let store = null;
  let API = {
    get: null
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
    API.get = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null
    };
  });

  it('fetchRentalBlock should work fine', () => {
    const {
      fetchRentalBlock,
      FETCH_RENTAL_BLOCK,
      FETCH_RENTAL_BLOCK_SUCCESS,
      FETCH_RENTAL_BLOCK_FAILURE
    } = actions;
    const resourceIds = [1, 2];

    return store.dispatch(fetchRentalBlock(resourceIds))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_RENTAL_BLOCK)).toBeTruthy();
        expect(storeActions.some(action => action.type
            === FETCH_RENTAL_BLOCK_SUCCESS)).toBeTruthy();
      });
  });

  it('fetchDateRange should work fine', () => {
    const {
      fetchDateRange,
      FETCH_DEFINED_DATE_RANGE,
      FETCH_DEFINED_DATE_RANGE_SUCCESS,
      FETCH_DEFINED_DATE_RANGE_FAILURE
    } = actions;
    const resourceIds = [1, 2];

    return store.dispatch(fetchDateRange(resourceIds))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_DEFINED_DATE_RANGE)).toBeTruthy();
        expect(storeActions.some(action => action.type
            === FETCH_DEFINED_DATE_RANGE_SUCCESS)).toBeTruthy();
      });
  });

  it('validateAfterDataFetch should work fine', () => {
    const {
      validateAfterDataFetch
    } = actions;
    const dateRangeRUList = [1, 2];
    const rentalBlockRUList = [1, 2];
    const callbackFunction = jest.fn();

    return store.dispatch(validateAfterDataFetch(dateRangeRUList, rentalBlockRUList, callbackFunction))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_DEFINED_DATE_RANGE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RENTAL_BLOCK')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RENTAL_BLOCK_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
            === 'FETCH_DEFINED_DATE_RANGE_SUCCESS')).toBeTruthy();
      });
  });

  it('validateAfterDataFetch should work fine, if no params', () => {
    const {
      validateAfterDataFetch
    } = actions;
    const dateRangeRUList = [];
    const rentalBlockRUList = [];
    const callbackFunction = null;

    return store.dispatch(validateAfterDataFetch(dateRangeRUList, rentalBlockRUList, callbackFunction))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.length).toEqual(0);
      });
  });

  it('validateAfterDataFetch should work fine, mock error', () => {
    mockAPI({
      path: '/json/Resource/definedDateRange.json',
      result: {
        "headers": {
          "response_code": "1100",
          "response_message": ""
        },
        "body": {}
      }
    })

    const {
      validateAfterDataFetch
    } = actions;
    const dateRangeRUList = [1, 2];
    const rentalBlockRUList = [1, 2];
    const callbackFunction = jest.fn();

    store.dispatch(validateAfterDataFetch(dateRangeRUList, rentalBlockRUList, callbackFunction));

    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type
      === 'FETCH_DEFINED_DATE_RANGE')).toBeTruthy();
    expect(storeActions.some(action => action.type
      === 'FETCH_RENTAL_BLOCK')).toBeTruthy();
  });

});
