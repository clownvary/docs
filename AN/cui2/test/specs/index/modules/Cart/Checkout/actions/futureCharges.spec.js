import { expect } from 'chai';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares'; // eslint-disable-line
import helper from 'utils/testHelper'; // eslint-disable-line
import PaymentModules from 'index/modules/Cart/Checkout/consts/paymentModules';

import * as futureChargesActions from 'index/modules/Cart/Checkout/actions/futureCharges';
import { actionTypes } from 'index/modules/Cart/Checkout/consts';


describe('index/modules/Cart/Checkout/actions/futureCharges', () => {
  let store = null;
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('getFutureChargesAction should works fine', (done) => {
    const { getFutureChargesAction } = futureChargesActions;
    store.dispatch(getFutureChargesAction()).then(() => {
      expect(helper.isIncluding([{
        type: actionTypes.FUTURECHARGES_UI_LIST
      }], store.getActions())).to.be.true;
      done();
    }).catch(done);
  });
  it('clickChargeAction should works fine', (done) => {
    const { clickChargeAction } = futureChargesActions;
    store.dispatch(clickChargeAction({ id: 1, checked: true }));
    expect(helper.isIncluding([{
      type: actionTypes.FUTURECHARGES_UI_CLICK
    }], store.getActions())).to.be.true;
    done();
  });

  it('clickChargeAction should works fine when checked is false', (done) => {
    const { clickChargeAction } = futureChargesActions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS(
            {
              data: [
                {
                  id: 1,
                  checked: false
                }
              ]
            }),
          agreement: fromJS({
            errors: {
              errorMessage: 'invalid card',
              moduleName: PaymentModules.SECONDARY
            }
          })
        }
      }
    };

    const configurations = fromJS({
      hide_payplan_details_for_online_checkout: true
    });

    store = configureStore(middlewares)({ configurations, modules });
    store.dispatch(clickChargeAction({ id: 3, checked: false }));
    expect(helper.isIncluding([{
      type: actionTypes.FUTURECHARGES_UI_CLICK
    }], store.getActions())).to.be.true;
    done();
  });

  it('clickChargeAction should works fine when all checked', (done) => {
    const { clickChargeAction } = futureChargesActions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS(
            {
              data: [
                {
                  id: 1,
                  checked: true
                }
              ]
            }),
          agreement: fromJS({
            errors: {
              errorMessage: '',
              moduleName: PaymentModules.PRIMARY
            }
          })
        }
      }
    };

    const configurations = fromJS({
      hide_payplan_details_for_online_checkout: true
    });

    store = configureStore(middlewares)({ configurations, modules });
    store.dispatch(clickChargeAction({ id: 3, checked: false }));
    expect(helper.isIncluding([{
      type: actionTypes.FUTURECHARGES_UI_CLICK
    }], store.getActions())).to.be.true;
    done();
  });

  it('clickChargeAction should clear error messages', (done) => {
    const { clickChargeAction } = futureChargesActions;

    const modules = {
      Cart: {
        Checkout: {
          futureCharges: fromJS(
            {
              data: [
                {
                  id: 1,
                  checked: false
                }
              ]
            }),
          agreement: fromJS({
            errors: {
              errorMessage: '',
              moduleName: PaymentModules.PRIMARY
            }
          })
        }
      }
    };

    const configurations = fromJS({
      hide_payplan_details_for_online_checkout: true
    });

    store = configureStore(middlewares)({ configurations, modules });
    store.dispatch(clickChargeAction({ id: 3, checked: false }));
    expect(helper.isIncluding([{
      type: actionTypes.FUTURECHARGES_UI_CLICK
    }], store.getActions())).to.be.true;
    done();
  });
});
