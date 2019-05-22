import { expect } from 'chai';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';

import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import * as billingAddressActions from 'index/modules/Cart/Checkout/actions/billingAddress';
import {
  billingAddressFormFields as fields,
  formModes,
  actionTypes
} from 'index/modules/Cart/Checkout/consts';
import billingAddress from 'index/modules/Cart/Checkout/consts/billingAddress';


describe('index/modules/Cart/Checkout/actions/billingAddress', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('onCreateBillingAddressAction should works fine', (done) => {
    const {
      onCreateBillingAddressAction
    } = billingAddressActions;

    store.dispatch(onCreateBillingAddressAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_ON_CREATE
    }], actions)).to.be.true;

    done();
  });

  it('onUpdateBillingAddressAction should works fine', (done) => {
    const {
      onUpdateBillingAddressAction
    } = billingAddressActions;

    store.dispatch(onUpdateBillingAddressAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);

    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_ON_UPDATE
    }], actions)).to.be.true;

    done();
  });

  it('getBillingAddressAction should works fine', (done) => {
    const {
      getBillingAddressAction
    } = billingAddressActions;

    store.dispatch(getBillingAddressAction()).then(() => {
      const actions = store.getActions();

      expect(actions).to.have.lengthOf(1);
      expect(helper.isIncludingByOrder([{
        type: actionTypes.BILLINGADDRESS_UI_LIST
      }], actions)).to.be.true;
    }).then(done);
  });

  it('selectBillingAddressAction should works fine', (done) => {
    const {
      selectBillingAddressAction
    } = billingAddressActions;

    store.dispatch(selectBillingAddressAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_UI_SELECTED
    }], actions)).to.be.true;
    done();
  });

  it('showBillingAddressFormAction should works fine', (done) => {
    const {
      showBillingAddressFormAction
    } = billingAddressActions;
    const inputData = { payload: { display: true } };

    store.dispatch(showBillingAddressFormAction(inputData));
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_UI_FORM_SHOW
    }], actions)).to.be.true;

    done();
  });

  it('hideBillingAddressFormAction should works fine', (done) => {
    const {
      hideBillingAddressFormAction
    } = billingAddressActions;
    const inputData = { payload: { display: false } };

    store.dispatch(hideBillingAddressFormAction(inputData));
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_UI_FORM_SHOW
    }], actions)).to.be.true;

    done();
  });

  it('getCountryStateAction should works fine', (done) => {
    const {
      getCountryStateAction
    } = billingAddressActions;

    store.dispatch(getCountryStateAction()).then(() => {
      const actions = store.getActions();

      expect(actions).to.have.lengthOf(1);
      expect(helper.isIncludingByOrder([{
        type: actionTypes.BILLINGADDRESS_UI_COUNTRYSTATE
      }], actions)).to.be.true;
    }).then(done);
  });

  it('selectCountryAction should works fine', () => {
    const {
      selectCountryAction
    } = billingAddressActions;
    const inputData = { payload: { countryId: 100 } };

    store.dispatch(selectCountryAction(inputData));
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(2);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_COUNTRY_SELECTED },
      { type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD_VALIDATION }
    ], actions)).to.be.true;
  });

  it('changeFormFieldAction should works fine', (done) => {
    const {
      changeFormFieldAction
    } = billingAddressActions;
    const inputData = {
      fieldType: fields.ADDRESS1,
      value: 'address1'
    };

    store.dispatch(changeFormFieldAction(inputData));
    const actions = store.getActions();
    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD }
    ], actions)).to.be.true;

    done();
  });

  it('validateFormFieldAction should works fine', (done) => {
    const {
      validateFormFieldAction
    } = billingAddressActions;
    const inputData = {
      fieldType: fields.ADDRESS1,
      value: 'address1'
    };

    store.dispatch(validateFormFieldAction(inputData));
    const actions = store.getActions();
    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD_VALIDATION }
    ], actions)).to.be.true;

    done();
  });
  it('validateFormFieldAction should works fine when field is ZIPCODE', (done) => {
    const {
      validateFormFieldAction
    } = billingAddressActions;

    store.dispatch(validateFormFieldAction(fields.ZIPCODE, '', formModes.CREATE));
    const actions = store.getActions();
    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      {
        type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
        payload: { fieldType: fields.ZIPCODE, error: 'errorMessageRequired' }
      }
    ], actions)).to.be.true;

    store.clearActions();

    store.dispatch(validateFormFieldAction(fields.ZIPCODE, '', formModes.UPDATE));
    const actions2 = store.getActions();
    expect(actions2).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      {
        type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
        payload: { fieldType: fields.ZIPCODE, error: 'errorMessageRequired' }
      }
    ], actions2)).to.be.true;
    done();
  });

  it('submitAction should works fine (1)', () => {
    const {
      submitAction
    } = billingAddressActions;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.FIRST]: '',
                [fields.LAST]: '',
                [fields.ADDRESS1]: '',
                [fields.ADDRESS2]: '',
                [fields.COUNTRY]: '',
                [fields.CITY]: '',
                [fields.STATE]: '',
                [fields.ZIPCODE]: ''
              }
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction());

    const actions = store.getActions();
    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION }
    ], actions)).to.be.true;
  });

  it('submitAction should works fine (2)', (done) => {
    const {
      submitAction
    } = billingAddressActions;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: '',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: 'zipcode'
              },
              formMode: formModes.CREATE
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: true
      })
    });

    store.dispatch(submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions).to.have.lengthOf(3);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
      done();
    }).catch(done);
  });

  it('submitAction should works fine (3)', (done) => {
    const {
      submitAction
    } = billingAddressActions;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.CUSTOMERID]: 100,
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.MAILINGNAME]: 'mailingname',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: 'address2',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: null
              },
              formMode: formModes.UPDATE
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions).to.have.lengthOf(3);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
      done();
    }).catch(done);
  });

  it('submitAction should works fine (4)', (done) => {
    const {
      submitAction
    } = billingAddressActions;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.CUSTOMERID]: 100,
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.MAILINGNAME]: 'mailingname',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: 'address2',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: 'zipcode'
              },
              formMode: formModes.CREATE
            }),
            agreement: fromJS({
              errors: fromJS({
                errorMessage: 'test error',
                moduleName: billingAddress.BILLING_ADDRESS
              })
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions).to.have.lengthOf(3);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
      done();
    }).catch(done);
  });

  it('submitAction should works fine (5)', (done) => {
    const {
      submitAction
    } = billingAddressActions;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.CUSTOMERID]: 100,
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.MAILINGNAME]: 'mailingname',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: 'address2',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: 'zipcode'
              },
              formMode: formModes.CREATE
            }),
            agreement: fromJS({
              errors: fromJS({
                errorMessage: 'test error',
                moduleName: 'test module name'
              })
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions).to.have.lengthOf(3);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
      done();
    }).catch(done);
  });

  it('submitAction should works fine (6)', (done) => {
    const {
      submitAction
    } = billingAddressActions;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.CUSTOMERID]: 100,
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.MAILINGNAME]: 'mailingname',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: 'address2',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: 'zipcode'
              },
              formMode: formModes.UPDATE
            }),
            agreement: fromJS({
              errors: fromJS({
                errorMessage: 'test error',
                moduleName: 'test module name'
              })
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions).to.have.lengthOf(3);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
      done();
    }).catch(done);
  });

  it('cancelAction should works fine', (done) => {
    const {
      cancelAction
    } = billingAddressActions;

    store.dispatch(cancelAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_CANCEL }
    ], actions)).to.be.true;

    done();
  });
});
