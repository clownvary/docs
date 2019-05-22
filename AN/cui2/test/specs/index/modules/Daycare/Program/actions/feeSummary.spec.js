import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import {
  fetchEstimatePrice
} from 'index/modules/Daycare/Program/actions/feeSummary';
import {
  ESTIMATE_PRICE
} from 'index/modules/Daycare/Program/consts/actionTypes';

describe('index/modules/Daycare/Program/actions/feeSummary', () => {
  let store = null;

  const initialState = {
    modules: {
      Daycare: {
        Program: {
          feeSummary: fromJS({
            individualSelection: false,
            estimatePrice: 0,
            free: true
          })
        }
      }
    }
  };


  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchEstimatePrice', () => {
    it('Should return expected Action Object.', () => {
      return store.dispatch(fetchEstimatePrice(435)).then(() => {
        expect(helper.isIncluding([
          {
            type: ESTIMATE_PRICE
          }], store.getActions())).toBeTruthy();
      });
    });
  });
});
