import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import {
  hideWarningAlertAction,
  fetchWaiversAction,
  uiChangeAgreementEntryAction,
  changeAgreementEntryAction
} from 'index/modules/Cart/ShoppingCart/actions/waiver';
import {
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT,
  WAIVERS_UI_LIST
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';

describe('index/modules/Cart/ShoppingCart/actions/waiver(UAT)', () => {
  let store = null;
  const defaultWaiversAgreements = fromJS({
    final_system_waiver: { required: true, value: false },
    final_initials_waiver: { required: true, value: '' }
  });

  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: null,
              waiversAgreements: defaultWaiversAgreements,
              warningAlertShown: true
            })
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Waiver section in new cart:', () => {
    it('Should dispatch fetchWaiversAction correctly when transaction in cart.', (done) => {
      store.dispatch(fetchWaiversAction()).then(() => {
        expect(store.getActions()[0].type).toEqual(WAIVERS_UI_LIST);
        done();
      })
      .catch(done);
    });
  });
  describe('Inspect cannot checkout if required waivers are not all signed off before proceed.', () => {
    it('Should dispatch changeAgreementEntryAction correctly when signed off', (done) => {
      store.dispatch(changeAgreementEntryAction()).then(() => {
        expect(store.getActions()[0].type).toEqual(WAIVERS_UI_AGREEMENT);
        done();
      })
      .catch(done);
    });
    it('Should dispatch uiValidateAgreementAction correctly when waivers is {}', (done) => {
      store = mockStore({
        modules: {
          Cart: {
            ShoppingCart: {
              waiver: fromJS({
                waivers: {},
                waiversAgreements: defaultWaiversAgreements,
                warningAlertShown: true
              })
            }
          }
        }
      });
      store.dispatch(changeAgreementEntryAction()).then(() => {
        expect(store.getActions()[0].type).toEqual(WAIVERS_UI_AGREEMENT);
        done();
      })
      .catch(done);
    });
    it('Should dispatch hideWarningAlertAction when signed on.', () => {
      const expectedAction = {
        type: WAIVERS_UI_HIDE_WARNING
      };
      expect(hideWarningAlertAction()).toEqual(expectedAction);
    });
    it('Should dispatch uiChangeAgreementEntryAction when signed on or signed off.', () => {
      const expectedAction = {
        type: WAIVERS_UI_AGREEMENT,
        payload: {
          id: 1,
          value: 'abc'
        }
      };
      expect(uiChangeAgreementEntryAction({
        id: 1,
        value: 'abc'
      })).toEqual(expectedAction);
    });
  });
});
