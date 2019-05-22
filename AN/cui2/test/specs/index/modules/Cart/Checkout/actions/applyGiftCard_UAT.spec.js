import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import * as giftCardActions from 'index/modules/Cart/Checkout/actions/applyGiftCard';
import { actionTypes } from 'index/modules/Cart/Checkout/consts';


describe('index/modules/Cart/Checkout/actions/applyGiftCard(UAT)', () => {
  let store = null;
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('applyGiftCardAction should works fine.', (done) => {
    const { applyGiftCardAction } = giftCardActions;
    store.dispatch(applyGiftCardAction(1)).then(() => {
      const actions = store.getActions();
      expect(helper.isIncluding([
        {
          type: actionTypes.GIFTCARD_UI_SHOW_ERROR
        },
        {
          type: actionTypes.ORDERSUMMARY_UI
        },
        {
          type: actionTypes.GIFTCARD_ON_UPDATE
        },
        {
          type: actionTypes.GIFTCARD_UI_DISABLE_APPLY
        },
        {
          type: actionTypes.GIFTCARD_UI_GIFTCARD_LIST
        }
      ], actions)).toBeTruthy();
      done();
    });
  });

  it('applyGiftCardAction should works fine if api return 9008 error.', (done) => {
    const { applyGiftCardAction } = giftCardActions;
    mockAPI({
      path: '/test/json/Cart/Checkout/post_applygiftcard.json',
      result: {
        headers: {
          response_code: '9008',
          response_message: 'There are incomplete transacions in the cart.'
        },
        body: {
          errors: 'error'
        }
      }
    }, () =>
      store.dispatch(applyGiftCardAction()).catch((error) => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: actionTypes.GIFTCARD_UI_SHOW_ERROR
          }
        ], actions)).toBeTruthy();
        expect(error.message === 'error').toBeTruthy();
        done();
      })
    );
  });

  it('applyGiftCardAction should works fine if api return none 9008 error.', (done) => {
    const { applyGiftCardAction } = giftCardActions;
    mockAPI({
      path: '/test/json/Cart/Checkout/post_applygiftcard.json',
      result: {
        headers: {
          response_code: '9006',
          response_message: 'There are incomplete transacions in the cart.'
        },
        body: {
          errors: 'error'
        }
      }
    }, () =>
      store.dispatch(applyGiftCardAction()).catch((error) => {
        const actions = store.getActions();
        expect(actions.length === 0).toBeTruthy();
        expect(error.data.code === '9006').toBeTruthy();
        done();
      })
    );
  });

  it('removeGiftCardAction should works fine', (done) => {
    const { removeGiftCardAction } = giftCardActions;
    store.dispatch(removeGiftCardAction(123)).then(() => {
      const actions = store.getActions();
      expect(helper.isIncluding([
        {
          type: actionTypes.GIFTCARD_UI_GIFTCARD_LIST
        },
        {
          type: actionTypes.ORDERSUMMARY_UI
        }
      ], actions)).toBeTruthy();
      done();
    });
  });
});
