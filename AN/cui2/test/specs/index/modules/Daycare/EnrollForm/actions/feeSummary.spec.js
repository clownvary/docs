import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import {
  fetchFeeSummary,
  resetFeeSummary
} from 'index/modules/Daycare/EnrollForm/actions/feeSummary';
import {
  FEE_SUMMARY_UI, FEE_SUMMARY_UI_RESET, RECEIPT_NUMBER
} from 'index/modules/Daycare/EnrollForm/consts/actionTypes';

describe('index/modules/Daycare/EnrollForm/actions/feeSummary', () => {
  let store = null;

  const initialState = {
    modules: {
      Daycare: {
        EnrollForm: {
          feeSummary: fromJS({
            subTotal: 0,
            tax: 0,
            total: 0
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

  describe('fetchFeeSummary', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(fetchFeeSummary()).then(() => {
        expect(helper.isIncluding([{ type: FEE_SUMMARY_UI }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
          store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  describe('resetFeeSummary', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(resetFeeSummary());
      expect(helper.isIncluding([{ type: FEE_SUMMARY_UI_RESET }],
        store.getActions())).toBeTruthy();
      done();
    });
  });
});
