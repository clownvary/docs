import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import mockAPI from 'utils/mockAPI';
import _ from 'lodash';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/ReservationDetail/actions/footer.js';
import jsonCancelReceipt from 'json/Receipt/cancelReceipt.json';
import { REDIRECT } from 'shared/actions/route.js';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

const headers = {
  response_code: '0000',
  response_message: 'Successful',
  page_info: {
    order_by: '',
    total_records_per_page: 30,
    order_option: 'ASC',
    total_page: 1,
    total_records: 0,
    page_number: 1
  }
};
const initialData = {
  permitID: '1111111',
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};

const mockPermitdetailAPI = '/json/PermitDetail/permitdetail.json';

describe('index -> ReservationDetail -> actions -> footer', () => {
  let store = null;

  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      footer: fromJS({
        confirmChangeReceiptId: 1111,
      }),
      amendmentReason: fromJS({
        value: ''
      }),
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
  });

  it('cancelReceipt should work fine', (done) => {
    const {
      CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS,
      cancelReceipt
    } = actions;

    return store.dispatch(cancelReceipt())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBeGreaterThanOrEqual(2);

        const expectedAction = myActions.find(action => action.type ===
          CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS);

        expect(expectedAction).not.toBeNull();
        expect(expectedAction.payload).toEqual(jsonCancelReceipt);
        done();
      });
  });

  it('reEnterReservationDetail should work fine', () => {
    const { reEnterReservationDetail } = actions;
    const params = { param1: 'test1' };

    mockDispatch(reEnterReservationDetail(params), store.getState());
    const mockActions = getMockActions();

    expect(mockActions).toHaveLength(1);
    expect(mockActions[0].type).toBe(REDIRECT);
    expect(Object.keys(mockActions[0].payload)).toEqual(['url', 'win', 'useReplace']);
  });

  it('gotoPaymentOrRefundPage should work fine', () => {
    const { gotoPaymentOrRefundPage } = actions;
    const params = { reservation_key_index: 2 };

    mockDispatch(gotoPaymentOrRefundPage(params), store.getState());
    const mockActions = getMockActions();
    expect(mockActions).toHaveLength(1);
    expect(mockActions[0].type).toBe(REDIRECT);
    expect(Object.keys(mockActions[0].payload)).toEqual(['url', 'win', 'useReplace']);
  });

  it('isChangeNeedPay should work fine', () => {
    const { NEED_PAY_FOR_RESERVATION_CHANGES, isChangeNeedPay } = actions;
    const isShouldPay = false;
    const confirmChangeReceiptId = 12;

    store.dispatch(isChangeNeedPay(isShouldPay, confirmChangeReceiptId));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(NEED_PAY_FOR_RESERVATION_CHANGES);
    expect(action.payload).toEqual({
      isShouldPay,
      confirmChangeReceiptId
    });
  });

  it('cancelReceiptAndReloadPage should work fine', (done) => {
    const { cancelReceiptAndReloadPage, CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS } = actions;

    store.dispatch(cancelReceiptAndReloadPage()).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(4);
      expect(myActions[1].type).toEqual(CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS);
      expect(myActions[3].type).toEqual('LOCATION_REDIRECT');
      done();
    });
  });

  it('getConfirmChangeResult should work fine', (done) => {
    const { CONFIRM_RESERVATION_CHANGE_SUCCESS, getConfirmChangeResult } = actions;
    store.dispatch(getConfirmChangeResult()).then(() => {
      const myActions = store.getActions();

      expect(myActions.length).toBeGreaterThanOrEqual(2);
      const expectedAction = myActions.find(action => action.type ===
        CONFIRM_RESERVATION_CHANGE_SUCCESS);
      expect(expectedAction).not.toBeNull();
      done();
    });
  });

  it('confirmReservationDetailChange nonMonetaryReceipt equal to true should work fine', (done) => {
    const {
      confirmReservationDetailChange,
      CONFIRM_RESERVATION_CHANGE_SUCCESS
    } = actions;

    mockAPI({
      path: mockPermitdetailAPI,
      result: {
        headers,
        body: {
          payment_or_refund: {
            batch_id: 0,
            receipt_id: 2,
            amount_due: -16.23,
            non_monetary_receipt: true,
            receipt_header_id: 0,
            is_refund: true
          }
        }
      }
    });

    store.dispatch(confirmReservationDetailChange()).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(4);
      expect(myActions[1].type).toBe(CONFIRM_RESERVATION_CHANGE_SUCCESS);
      done();
    });
  });

  it('confirmReservationDetailChange should work fine', (done) => {
    const {
      confirmReservationDetailChange
    } = actions;

    mockAPI({
      path: mockPermitdetailAPI,
      result: {
        headers,
        body: {
          payment_or_refund: {
            batch_id: 0,
            receipt_id: 2,
            amount_due: -16.23,
            non_monetary_receipt: false,
            receipt_header_id: 0,
            is_refund: true
          }
        }
      }
    });

    store = mockStore({
      footer: fromJS({
        confirmChangeReceiptId: 'event'
      }),
      amendmentReason: fromJS({
        value: ''
      }),
      initialData
    });

    store.dispatch(confirmReservationDetailChange()).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(4);
      expect(myActions[3].type).toBe('LOCATION_REDIRECT');
      done();
    });
  });

  it('confirmReservationDetailChange amount_due > 0  true should work fine', (done) => {
    const {
      confirmReservationDetailChange
    } = actions;

    mockAPI({
      path: mockPermitdetailAPI,
      result: {
        headers,
        body: {
          payment_or_refund: {
            batch_id: 0,
            receipt_id: 2,
            amount_due: 16.23,
            non_monetary_receipt: false,
            receipt_header_id: 0,
            is_refund: true
          }
        }
      }
    });

    store.dispatch(confirmReservationDetailChange()).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(3);
      expect(myActions[2].type).toBe('NEED_PAY_FOR_RESERVATION_CHANGES');

      done();
    });
  });

  it('confirmReservationDetailChange errorEvents.length > 0 should work fine', (done) => {
    const {
      confirmReservationDetailChange
    } = actions;

    mockAPI({
      path: mockPermitdetailAPI,
      result: {
        headers,
        body: {
          payment_or_refund: {
            batch_id: 0,
            receipt_id: 2,
            amount_due: -16.23,
            non_monetary_receipt: true,
            receipt_header_id: 0,
            is_refund: true
          },
          error_events: [{
            errorQuestions: [{}],
            errorWaivers: [{}]
          }]
        }
      }
    });

    store = mockStore({
      survey: fromJS({
        '1': {

        }
      }),
      amendmentReason: fromJS({
        value: ''
      }),
      initialData
    });

    store.dispatch(confirmReservationDetailChange(() => {}))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(6);
        expect(myActions[4].type).toBe('SAVE_WAIVER_ERROR_MESSAGE');
        done();
      });
  });

  it('isClickedConfirmChanges should work fine', () => {
    const { isClickedConfirmChanges, IS_CLICKED_CONFIRM_CHANGES } = actions;
    store.dispatch(isClickedConfirmChanges());
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(IS_CLICKED_CONFIRM_CHANGES);
  });

  it('isClickedConfirmChanges should work fine', () => {
    const { isClickedConfirmChanges, IS_CLICKED_CONFIRM_CHANGES } = actions;
    store.dispatch(isClickedConfirmChanges());
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(IS_CLICKED_CONFIRM_CHANGES);
  });

  it('leaveToPaymentPlanAndNext should work fine', (done) => {
    const { leaveToPaymentPlanAndNext } = actions;
    store.dispatch(leaveToPaymentPlanAndNext()).then(() => {
      const action = _.first(store.getActions());
      expect(typeof action).toBe('object');
      expect(action.type).toBe('');
      done();
    });
  });

  it('leaveToPaymentPlanAndNext nonMonetaryReceipt equal to false should work fine', (done) => {
    const { leaveToPaymentPlanAndNext } = actions;
    mockAPI({
      path: mockPermitdetailAPI,
      result: {
        headers,
        body: {
          payment_or_refund: {
            batch_id: 0,
            receipt_id: 2,
            amount_due: -16.23,
            non_monetary_receipt: false,
            receipt_header_id: 0,
            is_refund: true
          },
          error_events: [{
            errorQuestions: [{}],
            errorWaivers: [{}]
          }]
        }
      }
    });

    store.dispatch(leaveToPaymentPlanAndNext()).then(() => {
      const action = _.first(store.getActions());
      expect(typeof action).toBe('object');
      expect(action.type).toBe('');
      done();
    });
  });

  it('clickConfirmChange if exist errorMsg should work fine', () => {
    const { clickConfirmChange } = actions;
    store = mockStore({
      waiver: fromJS({
        allWaivers: {
          event_3555_0: {
            data: [],
            hasNew: false
          }
        }
      }),
      eventDetail: fromJS({
        eventValidStatus: {
          event_3555_0: false
        }
      }),
      survey: fromJS({
        '1': {
          questions: [],
          errors: [{ customquestionIndex: 1, message: 'this is a mock error' }],
          hasRequiredQuestion: true
        }
      }),
      amendmentReason: fromJS({
        value: 'test'
      }),
      initialData
    });
    store.dispatch(clickConfirmChange())
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe('SET_AMENDMENT_REASON_SHOWN');
  });

  it('clickConfirmChange if not exist errorMsg should work fine', () => {
    const { clickConfirmChange } = actions;
    store = mockStore({
      waiver: fromJS({
        allWaivers: {
          event_3555_0: {
            data: [],
            hasNew: false
          }
        }
      }),
      eventDetail: fromJS({
        eventValidStatus: {
          event_3555_0: false
        }
      }),
      survey: fromJS({
        1: {
          questions: [],
          errors: []
        }
      }),
      amendmentReason: fromJS({
        value: ''
      }),
      initialData
    });
    store.dispatch(clickConfirmChange());

    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe('SET_AMENDMENT_REASON_SHOWN');
  });

  it('clickConfirmChange allRequired equal to false should work fine', () => {
    const { clickConfirmChange } = actions;
    store = mockStore({
      waiver: fromJS({
        allWaivers: {
          event_3555_0: {
            data: [{
              waiverIndex: 1,
              displayPermitSelected: true,
              isRequired: true,
              agreetowaiverSelected: ''
            }],
            hasNew: false
          }
        }
      }),
      eventDetail: fromJS({
        eventValidStatus: {
          event_3555_0: false
        }
      }),
      survey: fromJS({
        1: {
          questions: [],
          errors: []
        }
      }),
      footer: fromJS({
        amendmentReason: '233'
      }),
      initialData
    });
    store.dispatch(clickConfirmChange());

    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe('SHOW_ALL_INVALID_EVENT_DETAIL');
  });
});
