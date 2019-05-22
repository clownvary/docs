import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import * as giftCardActions from 'index/modules/Cart/Checkout/actions/applyGiftCard';
import { actionTypes } from 'index/modules/Cart/Checkout/consts';


describe('index/modules/Cart/Checkout/actions/applyGiftCard', () => {
  let store = null;
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchAppliedCardListAction should works fine', (done) => {
    const { fetchGiftCardAction } = giftCardActions;
    store.dispatch(fetchGiftCardAction()).then(() => {
      expect(helper.isIncluding([{
        type: actionTypes.GIFTCARD_UI_GIFTCARD_LIST
      }], store.getActions())).toBeTruthy();
      done();
    });
  });

  it('showErrorMessageAction should works fine', (done) => {
    const { showErrorMessageAction } = giftCardActions;
    store.dispatch(showErrorMessageAction('error test'));
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([{
      type: actionTypes.GIFTCARD_UI_SHOW_ERROR
    }], actions)).toBeTruthy();
    done();
  });

  it('hideErrorMessageAction should works fine', (done) => {
    const { hideErrorMessageAction } = giftCardActions;
    store.dispatch(hideErrorMessageAction());
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([{
      type: actionTypes.GIFTCARD_UI_SHOW_ERROR
    }], actions)).toBeTruthy();
    done();
  });

  it('disableApplyAction should works fine', (done) => {
    const { disableApplyAction } = giftCardActions;
    store.dispatch(disableApplyAction());
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([{
      type: actionTypes.GIFTCARD_UI_DISABLE_APPLY
    }], actions)).toBeTruthy();
    done();
  });

  it('enableApplyAction should works fine', (done) => {
    const { enableApplyAction } = giftCardActions;
    store.dispatch(enableApplyAction());
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([{
      type: actionTypes.GIFTCARD_UI_DISABLE_APPLY
    }], actions)).toBeTruthy();
    done();
  });

  it('updateCardNumberAction should works fine ', (done) => {
    const { updateCardNumberAction } = giftCardActions;
    store.dispatch(updateCardNumberAction(123));
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([
      {
        type: actionTypes.GIFTCARD_UI_DISABLE_APPLY
      },
      {
        type: actionTypes.GIFTCARD_UI_SHOW_ERROR
      },
      {
        type: actionTypes.GIFTCARD_ON_UPDATE
      }
    ], actions)).toBeTruthy();
    done();
  });

  it('updateCardNumberAction should works fine when cardnumber is undefined ', (done) => {
    const { updateCardNumberAction } = giftCardActions;
    store.dispatch(updateCardNumberAction(undefined));
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([
      {
        type: actionTypes.GIFTCARD_UI_DISABLE_APPLY
      },
      {
        type: actionTypes.GIFTCARD_ON_UPDATE
      }
    ], actions)).toBeTruthy();
    done();
  });

  it('updateCardNumberAction should works fine when cardnumber is "" ', (done) => {
    const { updateCardNumberAction } = giftCardActions;
    store.dispatch(updateCardNumberAction(''));
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([
      {
        type: actionTypes.GIFTCARD_UI_DISABLE_APPLY
      },
      {
        type: actionTypes.GIFTCARD_ON_UPDATE
      }
    ], actions)).toBeTruthy();
    done();
  });

  it('resetGiftCardStateAction should works fine', () => {
    const { resetGiftCardStateAction } = giftCardActions;
    store.dispatch(resetGiftCardStateAction());
    const actions = store.getActions();
    expect(helper.isIncludingByOrder([
      {
        type: actionTypes.GIFTCARD_RESET
      }
    ], actions)).toBeTruthy();
  });
});
