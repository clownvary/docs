import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentAction';
import { PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION } from 'index/Payment/consts/actionTypes';
import { PAY_NOW_KEY } from 'index/Payment/consts/paymentActionTypesOnModification';
import { RESET_PAYER, SAVE_PAYER } from 'index/Payment/actions/payer';

describe('index/Payment/actions/paymentAction', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222,
    paymentPlanInitData: __initialState__.paymentPlanInitData
  };

  beforeEach(() => {
    store = mockStore({
      payment: fromJS({
        isPaymentActionValid: true
      }),
      paymentAction: fromJS({
        isSelectMakeAPayment: false,
        isSelectModifyPaymentPlan: true
      }),
      paymentOptions: {
        paymentPlan: fromJS({
          overrideCcExpBeforePpLast: false
        }),
        options: fromJS({
          data: []
        }),
        giftCard: fromJS({
          giftCardId: -1
        })
      },
      payer: fromJS({
        initPayer: {
          params: {
            customerId: 223,
            companyId: 0,
            agentId: 773
          }
        }
      }),
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('updatePaymentType should work fine', () => {
    const { updatePaymentType } = actions;
    store.dispatch(updatePaymentType(PAY_NOW_KEY));

    expect(store.getActions()[0].type).toEqual(PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION);
    expect(store.getActions()[0].payload).toEqual({ paymentActionType: PAY_NOW_KEY });
  });

  it('updatePaymentTypeOnModification should work fine', () => {
    const { updatePaymentTypeOnModification } = actions;
    return store.dispatch(updatePaymentTypeOnModification(PAY_NOW_KEY)).then(() => {
      const storeActions = store.getActions();

      expect(storeActions.some(action => action.type === PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION)).toBeTruthy();
      expect(storeActions.some(action => action.type === RESET_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER)).toBeTruthy();
    });
  });
});
