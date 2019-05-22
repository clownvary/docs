import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';

import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import PaymentManagerHelper from 'index/modules/Cart/Checkout/utils/PaymentManagerHelper';
import * as actions from 'index/modules/Cart/Checkout/actions/paymentManager';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentModules from 'index/modules/Cart/Checkout/consts/paymentModules';
import {
  PAYMENT_UI_UPDATE_MODULES
} from 'index/modules/Cart/Checkout/consts/actionTypes';


describe('index/modules/Cart/Checkout/actions/paymentManager', () => {
  let store = null;
  const PMInstance = new PaymentManagerHelper();
  const _params = [
    PaymentModules.PRIMARY,
    [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
    PaymentTypes.CREDIT_CARD
  ];
  const totalListForCC = [
    {
      id: '1_xxx1111',
      card_number: 'xxx1111',
      card_type_id: 1
    },
    {
      id: '2_xxx2222',
      card_number: 'xxx2222',
      card_type_id: 2
    }
  ];
  PMInstance.registerModule(..._params)
            .registerModule(
              PaymentModules.SECONDARY,
              [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
              PaymentTypes.CREDIT_CARD
            )
            .setTotalListAndUpdateModules(PaymentTypes.CREDIT_CARD, totalListForCC);
  const PREFIX = 'app.modules.cart.Checkout.components.OrderSummary.Agreement';
  const unselectedCard = PREFIX + '.unselectedCard';
  const unselectedSecondaryCard = PREFIX + '.unselectedSecondaryCard';

  const initialState = {
    systemSettings: fromJS({
      user: {
        customerid: '0455'
      }
    }),
    configurations: fromJS({
      has_eft_license: true,
      allow_public_eft: true,
      show_prior_cc: true,
      show_prior_ecp: true,
      ams_merchant_name: 'Bill Xiong'
    }),
    modules: {
      Cart: {
        Checkout: {
          billingAddress: fromJS({
            selectedBillingAddress: {
              customer_id: '0455'
            }
          }),
          paymentManager: fromJS({
            modules: PMInstance.getModules()
          }),
          agreement: fromJS({
            errors : {
              errorMessage: 'error',
              moduleName: PaymentModules.SECONDARY
           }
          })
        }
      }
    },
    intl: fromJS({
      currentLocale: 'en-us',
      messages : {
        'en-us': {
          [unselectedCard] : '',
          [unselectedSecondaryCard] : ''
        }
      }
    })
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action: fetchSavedEChecksAsyncAction', () => {
    it('Should return PAYMENT_UI_UPDATE_MODULES', (done) => {
      const { fetchSavedEChecksAsyncAction } = actions;
      store.dispatch(fetchSavedEChecksAsyncAction()).then(() => {
        expect(helper.isIncludingByOrder([{
          type: PAYMENT_UI_UPDATE_MODULES
        }], store.getActions())).toBeTruthy();
        done();
      }).catch(done);
    });
  });

  describe('Dispatch Action: fetchPaymentDataAction', () => {
    it('Should return PAYMENT_UI_UPDATE_MODULES and PAYMENT_UI_UPDATE_MODULES', (done) => {
      const _mockStore = configureStore(middlewares);
      const _store = _mockStore(initialState);
      const { fetchPaymentDataAction } = actions;
      _store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([{
          type: PAYMENT_UI_UPDATE_MODULES
        }, {
          type: PAYMENT_UI_UPDATE_MODULES
        }, {
          type: PAYMENT_UI_UPDATE_MODULES
        }], _store.getActions())).toBeTruthy();
        done();
      }).catch(done);
    });
  });

  describe('Dispatch Action(UI): registerModuleAction', () => {
    it('Should return type=PAYMENT_UI_UPDATE_MODULES and expected payload', () => {
      const { registerModuleAction } = actions;
      const params = [
        PaymentModules.PRIMARY,
        [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
        PaymentTypes.CREDIT_CARD
      ];
      const { type, payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(type).toEqual(PAYMENT_UI_UPDATE_MODULES);
      expect(payload.getIn([
        PaymentModules.PRIMARY
      ]).size > 0).toEqual(true);
    });
  });

  describe('Dispatch Action(UI): changePaymentTypeAction', () => {
    it('Should return expected Action Object.', () => {
      const { changePaymentTypeAction } = actions;
      const { payload } = store.dispatch(
        changePaymentTypeAction(PaymentModules.PRIMARY, PaymentTypes.ECHECK)
      );

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'selectedType'
      ])).toEqual(PaymentTypes.ECHECK);
    });
  });

  describe('Dispatch Action(UI): selectItemAction', () => {
    it('Should return expected Action Object.', () => {
      const { selectItemAction } = actions;
      const { payload } = store.dispatch(
        selectItemAction(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD, totalListForCC[1].id)
      );

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'selected', 'id'
      ])).toEqual(totalListForCC[1].id);
    });
    it('Should return expected Action Object. when moduleName is SECONDARY', () => {
      const { selectItemAction } = actions;
      const { payload } = store.dispatch(
        selectItemAction(PaymentModules.SECONDARY, PaymentTypes.CREDIT_CARD, totalListForCC[1].id)
      );

      expect(payload.getIn([
        PaymentModules.SECONDARY, 'selected', 'id'
      ])).toEqual(totalListForCC[1].id);
    });
  });

  const {
    addPayItemAsyncAction,
    addECPAsyncAction
  } = actions;

  const normalPayItemInfo = {
    ccNumber: '4111111111111111',
    ccExpiryYear: '11',
    ccExpiryMonth: '2017',
    ccCVVandCVC: '321',
    ccSaveForFurture: true,
    ccCardTypes: fromJS([{
      id: 11,
      card_type: 'Visa',
      selected: false,
      card_type_id: 1
    }, {
      id: 2,
      card_type: 'JCB',
      selected: false,
      card_type_id: 6
    }]),
    ccCardTypeItem: fromJS({
      id: 11,
      card_type: 'Visa',
      selected: false,
      card_type_id: 1
    }),
    ecpAccountType: '1',
    ecpAccountNumber: '4111111111111111',
    ecpRoutingNumber: '122111',
    ecpSavedForFurtureUse: 'test'
  };

  describe('Dispatch Action: addECPAsyncAction', () => {
    it('Should return expected Action Object', (done) => {
      const func = (x)=>x;
      window.AMS = {
        AccountInfo: () => {
          return {
            setAccountType: func,
            setAccountNumber: func,
            setBankID: func,
            setAccountOwner: func,
            setModulus: func,
            setCCZip: func,
            setModulus: func,
            setExponent: func
          };
        },
        getCipher:func
      };
      mockAPI(
        {
          path: '/test/json/Cart/Checkout/get_amstoken.json',
          result: {
            headers: {
              response_code: '0000'
            },
            body: {
              ams_token:{
                modulus:'test modulus'
              }
            }
          }
        },()=>{
          addECPAsyncAction('primeryPayment', normalPayItemInfo)(store.dispatch, store.getState)
            .then(() => {
              expect(helper.isIncludingByOrder([
                { type: PAYMENT_UI_UPDATE_MODULES },
                { type: PAYMENT_UI_UPDATE_MODULES }
              ], store.getActions())).toBeTruthy();
              done();
            }).catch(done);
        });
    });

    it('Should return expected Action Object if modulus != AMSCONST.LOCALDEMO_MODULUS', (done) => {
      const newNormalPayItemInfo = Object.assign({},normalPayItemInfo,{ecpSavedForFurtureUse:false});
      mockAPI(
        {
          path: '/test/json/Cart/Checkout/get_amstoken.json',
          result: {
            headers: {
              response_code: '0000'
            },
            body: {
              ams_token:{
                modulus:'localdemo'
              }
            }
          }
        }, () => {
          addECPAsyncAction('primeryPayment', newNormalPayItemInfo)(store.dispatch, store.getState)
            .then(() => {
              expect(helper.isIncludingByOrder([
                { type: PAYMENT_UI_UPDATE_MODULES },
                { type: PAYMENT_UI_UPDATE_MODULES }
              ], store.getActions())).toBeTruthy();
              done();
            }).catch(done);
        });
    });
  });

  describe('Dispatch Action: addPayItemAsyncAction', () => {
    it('Should return error by resolve when paymenttype is echeck', (done) => {
      mockAPI(
        {
          path: '/test/json/Cart/Checkout/get_amstoken.json',
          result: {
            headers: {
              response_code: '9008',
              response_message: 'failed'
            },
            body: {
              errors: {
                message: 'test error'
              }
            }
          }
        }, () => {
          store.dispatch(addPayItemAsyncAction('primeryPayment', PaymentTypes.ECHECK, normalPayItemInfo))
            .then((data) => {
              expect(data.errors.message).toEqual('test error');
              done();
            });
        });
    });

    it('should return "" when typeName is view', () => {
      const result = store.dispatch(addPayItemAsyncAction('primeryPayment', PaymentTypes.VIEW, normalPayItemInfo));
      expect(result).toEqual('');
    });
  });

  describe('Dispatch Action: getPCILocationOfCCAsyncAction', () => {
    it('should return iframeUrl', (done) => {
      const result = store.dispatch(actions.getPCILocationOfCCAsyncAction(PaymentModules.PRIMARY));
      result.then((iframeUrl) => {
        expect(!!iframeUrl).toBeTruthy();
        done();
      }).catch((e) => {
        throw e;
        done();
      });
    });
  });

  describe('Dispatch Action: setInstanceOfPCIAction', () => {
    it('should dispatch PAYMENT_UI_UPDATE_MODULES', () => {
      store.dispatch(actions.setInstanceOfPCIAction(PaymentModules.PRIMARY, PaymentTypes.CREDIT_CARD, { a: 1 }));
      expect(helper.isIncludingByOrder([
        { type: PAYMENT_UI_UPDATE_MODULES }
      ], store.getActions())).toBeTruthy();
    });
  });

  describe('Dispatch Action: submitCreditCardAsyncAction', () => {
    it('saveForFutureUse is true', (done) => {
      const _mockStore = configureStore(middlewares);
      const newState = { ...initialState };
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'],
        {
          submitIframePromise: () => {
            return Promise.resolve({ sessionId: 1, saveForFutureUse: true });
          }
        }
      );
      const _store = _mockStore(newState);
      const result = _store.dispatch(actions.submitCreditCardAsyncAction(PaymentModules.PRIMARY));
      result.then(({ moduleName, sessionId, saveForFutureUse }) => {
        expect(moduleName).toEqual(PaymentModules.PRIMARY);
        expect(sessionId).toEqual(1);
        expect(saveForFutureUse).toEqual(true);
        done();
      }).catch((e) => {
        throw e;
        done();
      });
    });

    it('saveForFutureUse is false', (done) => {
      const _mockStore = configureStore(middlewares);
      const newState = { ...initialState };
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'],
        {
          submitIframePromise: () => {
            return Promise.resolve({ sessionId: 2, saveForFutureUse: false });
          }
        }
      );
      const _store = _mockStore(newState);
      const result = _store.dispatch(actions.submitCreditCardAsyncAction(PaymentModules.PRIMARY));
      result.then(({ moduleName, sessionId, saveForFutureUse }) => {
        expect(moduleName).toEqual(PaymentModules.PRIMARY);
        expect(sessionId).toEqual(2);
        expect(saveForFutureUse).toEqual(false);
        done();
      }).catch((e) => {
        throw e;
        done();
      });
    });
  });

  describe('Dispatch Action: reloadPCIAction', () => {
    it('should call instanceOfPCI.showIframePromise in primery payment', () => {
      const _mockStore = configureStore(middlewares);
      const newState = { ...initialState };
      const showIframePromise = jest.fn();
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'],
        { showIframePromise }
      );
      const _store = _mockStore(newState);
      _store.dispatch(actions.reloadPCIAction());
      expect(showIframePromise).toHaveBeenCalled();
    });

    it('should not call instanceOfPCI.showIframePromise in primery payment', () => {
      const _mockStore = configureStore(middlewares);
      const newState = { ...initialState };
      const showIframePromise = jest.fn();
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'],
        { showIframePromise }
      );
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.PRIMARY, 'selectedType'],
        PaymentTypes.ECHECK
      );
      const _store = _mockStore(newState);
      _store.dispatch(actions.reloadPCIAction());
      expect(showIframePromise).not.toHaveBeenCalled();
    });

    it('should call instanceOfPCI.showIframePromise in secondary payment', () => {
      const _mockStore = configureStore(middlewares);
      const newState = { ...initialState };
      const showIframePromise = jest.fn();
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.SECONDARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'],
        { showIframePromise }
      );
      const _store = _mockStore(newState);
      _store.dispatch(actions.reloadPCIAction());
      expect(showIframePromise).toHaveBeenCalled();
    });

    it('should not call instanceOfPCI.showIframePromise in secondary payment', () => {
      const _mockStore = configureStore(middlewares);
      const newState = { ...initialState };
      const showIframePromise = jest.fn();
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.SECONDARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'],
        { showIframePromise }
      );
      newState.modules.Cart.Checkout.paymentManager = newState.modules.Cart.Checkout.paymentManager.setIn(
        ['modules', PaymentModules.SECONDARY, 'selectedType'],
        PaymentTypes.ECHECK
      );
      const _store = _mockStore(newState);
      _store.dispatch(actions.reloadPCIAction());
      expect(showIframePromise).not.toHaveBeenCalled();
    });
  });

  describe('Dispatch Action: checkSecondaryPaymentAction', () => {
    it('should return iframeUrl', () => {
      store.dispatch(actions.checkSecondaryPaymentAction(PaymentModules.PRIMARY, fromJS([])));
      expect(helper.isIncludingByOrder([
        { type: PAYMENT_UI_UPDATE_MODULES }
      ], store.getActions())).toBeTruthy();
    });
  });
});
