import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import {
  selectPickups,
  fetchDetailDataIfNeed,
  resetDetailData
} from 'index/modules/Daycare/EnrollForm/actions/enrollDetail';

describe('index/modules/Daycare/EnrollForm/actions/enrollDetail', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('selectPickups works fine', (done) => {
    const {
      PICKUP_UI_SELECTED, FORM_ERROR_CLEAN_UI
    } = actionTypes;
    store.dispatch(selectPickups([18223, 12311]));
    expect(helper.isIncluding([{ type: PICKUP_UI_SELECTED }],
      store.getActions())).toBeTruthy();
    expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
      store.getActions())).toBeTruthy();
    done();
  });

  it('fetchDetailDataIfNeed works fine', (done) => {
    const {
      PICKUP_UI_LIST, QUESTION_LIST, FORM_ERROR_CLEAN_UI, SECTION_EXPAND_UI
    } = actionTypes;
    store.dispatch(fetchDetailDataIfNeed(45, 18621)).then(() => {
      expect(helper.isIncluding([{ type: PICKUP_UI_LIST }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: QUESTION_LIST }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: SECTION_EXPAND_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('fetchDetailDataIfNeed works fine if any data has been fetched', (done) => {
    const {
      PICKUP_UI_LIST, QUESTION_LIST, FORM_ERROR_CLEAN_UI, SECTION_EXPAND_UI
    } = actionTypes;
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            enrollDetail: fromJS({
              pickupList: [{ customer_id: 2 }, { customer_id: 3 }]
            }),
            survey: fromJS({
              questions: []
            })
          }
        }
      }
    });
    store.dispatch(fetchDetailDataIfNeed(45, 18621, 3)).then(() => {
      expect(helper.isIncluding([{ type: PICKUP_UI_LIST }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: QUESTION_LIST }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: SECTION_EXPAND_UI }],
        store.getActions())).toBeFalsy();
      done();
    });
  });

  it('resetDetailData works fine', (done) => {
    const { DETAIL_UI_RESET, QUESTION_RESET, SECTION_COLLAPSE_UI } = actionTypes;
    store.dispatch(resetDetailData());
    expect(helper.isIncluding([{ type: DETAIL_UI_RESET }],
      store.getActions())).toBeTruthy();
    expect(helper.isIncluding([{ type: QUESTION_RESET }],
      store.getActions())).toBeTruthy();
    expect(helper.isIncluding([{ type: SECTION_COLLAPSE_UI }],
      store.getActions())).toBeTruthy();
    done();
  });
});
