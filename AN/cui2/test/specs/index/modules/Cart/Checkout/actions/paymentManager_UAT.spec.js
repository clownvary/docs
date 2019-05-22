import { fromJS } from 'immutable';
import expect from 'expect';
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

describe('index/modules/Cart/Checkout/actions/paymentManager(UAT)', () => {
  const mockStore = configureStore(middlewares);
  const PMInstance = new PaymentManagerHelper();
  const params = [
    PaymentModules.PRIMARY,
    [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
    PaymentTypes.CREDIT_CARD
  ];
  PMInstance.registerModule(...params)
            .registerModule(
              PaymentModules.SECONDARY,
              [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK],
              PaymentTypes.CREDIT_CARD
            );
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
      require2nd_form_of_payment: true,
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
          })
        }
      }
    }
  };
  const normalPayItemInfo = {
    ecpAccountType: 'S',
    ecpAccountNumber: '123',
    ecpRoutingNumber: '456',
    ecpSavedForFurtureUse: false,
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
    })
  };

  describe('UAT Case: Check saved ECP if the option of Show Prior Credit Cards on Receipt Payment’ under financial setting is turned on.', () => {
    it('Should show saved CC list if the setting `show_prior_cc` is true', (done) => {
      const { fetchPaymentDataAction } = actions;
      const store = mockStore(initialState);
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([{
          type: PAYMENT_UI_UPDATE_MODULES
        }, {
          type: PAYMENT_UI_UPDATE_MODULES
        }, {
          type: PAYMENT_UI_UPDATE_MODULES
        }], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘Show Prior Credit Cards on Receipt Payment’ under financial setting is turned off.', () => {
    it('Should not show saved CC list if the setting `show_prior_cc` is false', (done) => {
      const { fetchPaymentDataAction } = actions;
      const configurations = initialState.configurations.set('show_prior_cc', false);
      const store = mockStore({ ...initialState, configurations });
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: PAYMENT_UI_UPDATE_MODULES
          }, {
            type: PAYMENT_UI_UPDATE_MODULES
          }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘ECP (org system-level site licensing of allowing ECP as a payment method)’ is turned on', () => {
    it('Should show saved ECP if the setting `has_eft_license` and allow_public_eft are all true.', () => {
      const { registerModuleAction } = actions;
      const store = mockStore(initialState);
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ]).size > 0).toBe(true);
    });

    it('Should not show saved ECP if the setting `has_eft_license` is true but allow_public_eft is false.', () => {
      const { registerModuleAction } = actions;
      const configurations = initialState.configurations.set('allow_public_eft', false);
      const store = mockStore({ ...initialState, configurations });
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ])).toBe(undefined);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘ECP (org system-level site licensing of allowing ECP as a payment method)’ is turned off', () => {
    it('Should not show saved ECP if the setting `has_eft_license` is false but allow_public_eft is true.', () => {
      const { registerModuleAction } = actions;
      const configurations = initialState.configurations.set('has_eft_license', false);
      const store = mockStore({ ...initialState, configurations });
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ])).toBe(undefined);
    });

    it('Should not show saved ECP if the setting `has_eft_license` and allow_public_eft are all false.', () => {
      const { registerModuleAction } = actions;
      const configurations = initialState.configurations.set('has_eft_license', false).set('allow_public_eft', false);
      const store = mockStore({ ...initialState, configurations });
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ])).toBe(undefined);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘Allow Payment: by Electronic Check - public’ under financial setting is turned on.', () => {
    it('Should show ECP module on page if the setting `has_eft_license` and allow_public_eft are all true.', () => {
      const { registerModuleAction } = actions;
      const store = mockStore(initialState);
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ]).size > 0).toBe(true);
    });

    it('Should not show ECP module on page if the setting `has_eft_license` is false but allow_public_eft is true.', () => {
      const { registerModuleAction } = actions;
      const configurations = initialState.configurations.set('has_eft_license', false);
      const store = mockStore({ ...initialState, configurations });
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ])).toBe(undefined);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘Allow Payment: by Electronic Check - public’ under financial setting is turned off.', () => {
    it('Should not show ECP module on page if the setting `has_eft_license` is true but allow_public_eft is false.', () => {
      const { registerModuleAction } = actions;
      const configurations = initialState.configurations.set('allow_public_eft', false);
      const store = mockStore({ ...initialState, configurations });
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ])).toBe(undefined);
    });

    it('Should not show ECP module on page if the setting `has_eft_license` and allow_public_eft are all false.', () => {
      const { registerModuleAction } = actions;
      const configurations = initialState.configurations.set('has_eft_license', false).set('allow_public_eft', false);
      const store = mockStore({ ...initialState, configurations });
      const { payload } = registerModuleAction(...params)(store.dispatch, store.getState);

      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD
      ]).size > 0).toBe(true);
      expect(payload.getIn([
        PaymentModules.PRIMARY, 'types', PaymentTypes.ECHECK
      ])).toBe(undefined);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘Show Prior Electronic Checks on Receipt Payment’ under financial setting is turned on.', () => {
    it('Should show saved ECP list if the setting `show_prior_ecp`, `has_eft_license` and `allow_public_eft` are all true', (done) => {
      const { fetchPaymentDataAction } = actions;
      const store = mockStore(initialState);
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([{
          type: PAYMENT_UI_UPDATE_MODULES
        }, {
          type: PAYMENT_UI_UPDATE_MODULES
        }, {
          type: PAYMENT_UI_UPDATE_MODULES
        }], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });

    it('Should show saved ECP list if the setting `show_prior_ecp` is true, `has_eft_license` and `allow_public_eft` are all false', (done) => {
      const { fetchPaymentDataAction } = actions;
      const configurations = initialState.configurations.set('show_prior_ecp', false);
      const store = mockStore({ ...initialState, configurations });
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: PAYMENT_UI_UPDATE_MODULES
          }, {
            type: PAYMENT_UI_UPDATE_MODULES
          }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });

    it('Should show saved ECP list if the setting `show_prior_ecp` is true, `has_eft_license` is true and `allow_public_eft` is false', (done) => {
      const { fetchPaymentDataAction } = actions;
      const configurations = initialState.configurations.set('allow_public_eft', false);
      const store = mockStore({ ...initialState, configurations });
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: PAYMENT_UI_UPDATE_MODULES
          }, {
            type: PAYMENT_UI_UPDATE_MODULES
          }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });

    it('Should show saved ECP list if the setting `show_prior_ecp` is true, `has_eft_license` is false and `allow_public_eft` is true', (done) => {
      const { fetchPaymentDataAction } = actions;
      const configurations = initialState.configurations.set('has_eft_license', false);
      const store = mockStore({ ...initialState, configurations });
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: PAYMENT_UI_UPDATE_MODULES
          }, {
            type: PAYMENT_UI_UPDATE_MODULES
          }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });
  });

  describe('UAT Case: Check saved ECP if the option of ‘Show Prior Electronic Checks on Receipt Payment’ under financial setting is turned off.', () => {
    it('Should show saved ECP list if the setting `show_prior_ecp` is false but `has_eft_license` and `allow_public_eft` are all true', (done) => {
      const { fetchPaymentDataAction } = actions;
      const configurations = initialState.configurations.set('show_prior_ecp', false);
      const store = mockStore({ ...initialState, configurations });
      store.dispatch(fetchPaymentDataAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: PAYMENT_UI_UPDATE_MODULES
          }, {
            type: PAYMENT_UI_UPDATE_MODULES
          }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });
  });

  describe('UAT Case: Inspect to check Save the electronic check for future use.', () => {
    it('Should dispatch expected actions if `save the electronic check for future use` checked', (done) => {
      const { addPayItemAsyncAction } = actions;
      const store = mockStore(initialState);
      store.dispatch(addPayItemAsyncAction(
        PaymentModules.PRIMARY,
        PaymentTypes.ECHECK,
        { ...normalPayItemInfo, ecpSavedForFurtureUse: true }
      )).then(() => {
        expect(helper.isIncluding([
          { type: PAYMENT_UI_UPDATE_MODULES },
          { type: PAYMENT_UI_UPDATE_MODULES }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });

    it('Should dispatch expected actions if `save the electronic check for future use` unchecked', (done) => {
      const { addPayItemAsyncAction } = actions;
      const store = mockStore(initialState);
      store.dispatch(addPayItemAsyncAction(
        PaymentModules.PRIMARY,
        PaymentTypes.ECHECK,
        { ...normalPayItemInfo, ecpSavedForFurtureUse: false }
      )).then(() => {
        expect(helper.isIncluding([
          { type: PAYMENT_UI_UPDATE_MODULES },
          { type: PAYMENT_UI_UPDATE_MODULES }
        ], store.getActions())).toBe(true);
        done();
      }).catch(done);
    });
  });

  describe('UAT Case: Inspect if Secondary Payment Method for Future Charges show or not.', () => {
    const futureCharges = fromJS([
      {
        "index": 1,
        "description": "Recurring Donation for Fiona Campaign111 - All Sites test test test test test test testtesteststsetsetsetsetsetsetsetsetssafasdfasd ",
        "next_payment_date": 1495954800000,
        "last_payment_date": 1525590000000,
        "next_payment_date_string": "28 May 2017",
        "last_payment_date_string": "6 May 2018",
        "automatic_payment": false,
        "reno": 1,
        "checked": false,
        "disallow_user_auto_charge_option_modify": true
      }
    ]);

    describe('UAT Case: (Public) Require backup form of payment for automated billing?` is on.', () => {
      it('Should dispatch updateModules action with `false` if no automatic payment checked.', () => {
        const { checkSecondaryPaymentAction } = actions;
        const store = mockStore(initialState);
        const dispatchReturn = store.dispatch(checkSecondaryPaymentAction(
          PaymentModules.SECONDARY,
          futureCharges.setIn([0, 'checked'], false)
        ));
        expect(helper.isIncluding([
          { type: PAYMENT_UI_UPDATE_MODULES }
        ], store.getActions())).toBe(true);
        expect(dispatchReturn.payload.getIn([
          PaymentModules.SECONDARY,
          'isShow'
        ])).toBe(false);
      });

      it('Should dispatch updateModules action with modules of `true` if at least one automatic payment checked.', () => {
        const { checkSecondaryPaymentAction } = actions;
        const store = mockStore(initialState);
        const dispatchReturn = store.dispatch(checkSecondaryPaymentAction(
          PaymentModules.SECONDARY,
          futureCharges.setIn([0, 'checked'], true)
        ));
        expect(helper.isIncluding([
          { type: PAYMENT_UI_UPDATE_MODULES }
        ], store.getActions())).toBe(true);
        expect(dispatchReturn.payload.getIn([
          PaymentModules.SECONDARY,
          'isShow'
        ])).toBe(true);
      });
    });

    describe('UAT Case: (Public) Require backup form of payment for automated billing?` is off.', () => {
      it('Should dispatch showPaymentModule action with value of `false` if no automatic payment checked.', () => {
        const { checkSecondaryPaymentAction } = actions;
        const configurations = initialState.configurations.set('require2nd_form_of_payment', false);
        const store = mockStore({ ...initialState, configurations });
        const dispatchReturn = store.dispatch(checkSecondaryPaymentAction(
          PaymentModules.SECONDARY,
          futureCharges
        ));

        expect(helper.isIncluding([
          { type: PAYMENT_UI_UPDATE_MODULES }
        ], store.getActions())).toBe(true);
        expect(dispatchReturn.payload.getIn([
          PaymentModules.SECONDARY,
          'isShow'
        ])).toBe(false);
      });

      it('Should dispatch showPaymentModule action with value of `false` if at least one automatic payment checked.', () => {
        const { checkSecondaryPaymentAction } = actions;
        const configurations = initialState.configurations.set('require2nd_form_of_payment', false);
        const store = mockStore({ ...initialState, configurations });
        const dispatchReturn = store.dispatch(checkSecondaryPaymentAction(
          PaymentModules.SECONDARY,
          futureCharges.setIn([0, 'checked'], true)
        ));
        expect(helper.isIncluding([
          { type: PAYMENT_UI_UPDATE_MODULES }
        ], store.getActions())).toBe(true);
        expect(dispatchReturn.payload.getIn([
          PaymentModules.SECONDARY,
          'isShow'
        ])).toBe(false);
      });
    });

  });
});
