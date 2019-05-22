import { fromJS } from 'immutable';
import find from 'lodash/find';
import * as billingAddressActions from 'index/modules/Cart/Checkout/consts/actionTypes';
import billingAddressReducer from 'index/modules/Cart/Checkout/reducers/billingAddress';
import { billingAddressFormFields as fields, formModes } from 'index/modules/Cart/Checkout/consts';
import jsonBillingAddress from 'Cart/Checkout/get_billingaddresses.json';
import jsonCountryStates from 'Cart/Checkout/get_countrystates.json';

describe('index/modules/Cart/Checkout/reducers/billingAddress', () => {
  const billingInfos = jsonBillingAddress.body.billing_infos;
  const billingAddressesList = billingInfos.payers.map(payer => ({
    ...payer,
    text: payer.name,
    value: payer.customer_id
  }));
  const payerId = billingInfos.payer_id;
  const selectedBillingAddress = fromJS(billingAddressesList)
    .find(ba => ba.get('customer_id') === payerId).toJS();
  const countries = jsonCountryStates.body.countries.map(country => ({
    ...country,
    id: country.id,
    text: country.country_name,
    value: country.id
  }));

  const defaultState = fromJS({
    billingAddresses: billingAddressesList,
    selectedBillingAddress,

    countries,
    selectedCountry: {},
    selectedState: {},

    formData: {},
    formErrors: {},
    isFormDisplay: false,
    isFormHeaderDisplay: true,
    isListDisplay: true,
    formMode: formModes.VIEW
  });

  const emptyFormData = {
    [fields.FIRST]: '',
    [fields.LAST]: '',
    [fields.MAILINGNAME]: '',
    [fields.ADDRESS1]: '',
    [fields.ADDRESS2]: '',
    [fields.COUNTRY]: '',
    [fields.CITY]: '',
    [fields.STATE]: '',
    [fields.ZIPCODE]: ''
  };

  const expectedInitialState = fromJS({
    billingAddresses: [],
    selectedBillingAddress: {},

    countries: [],
    selectedCountry: {},
    selectedState: {},

    formData: {},
    formErrors: {},
    isFormDisplay: false,
    isFormHeaderDisplay: true,
    isListDisplay: true,
    formMode: formModes.VIEW,
    isInternational: true
  });

  it('Should get countries and states successfully', () => {
    const {
      BILLINGADDRESS_UI_COUNTRYSTATE
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRYSTATE,
      payload: { countries }
    });

    expect(returnState.get('countries').toJS().length === countries.length).toBeTruthy();
    returnState.get('countries').map((country) => {
      expect(find(countries, c => country.get('id') === c.id &&
        country.get('country_name') === c.country_name &&
        country.get('states').size === c.states.length) != null);

      return country;
    });
    expect(billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRYSTATE,
      payload: { countries: undefined }
    })).toEqual(defaultState);
  });

  it('Should get billing address successfully', () => {
    const {
      BILLINGADDRESS_UI_LIST
    } = billingAddressActions;

    const returnState = billingAddressReducer(undefined, {
      type: BILLINGADDRESS_UI_LIST,
      payload: { billingInfos }
    });

    expect(returnState.get('billingAddresses').toJS().length === billingAddressesList.length).toBeTruthy();
    expect(returnState.get('selectedBillingAddress').get('customer_id')).toEqual(payerId);

    expect(billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_LIST,
      payload: { billingInfos: undefined }
    })).toEqual(defaultState);

    expect(billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_LIST,
      payload: { billingInfos: fromJS(billingInfos).set('payers', []).toJS() }
    }).get('billingAddresses')).toEqual(defaultState.get('billingAddresses'));
  });

  it('Should change billing address successfully', () => {
    const {
      BILLINGADDRESS_UI_SELECTED
    } = billingAddressActions;
    const expectedCustomerId = billingAddressesList[0].customer_id;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_SELECTED,
      payload: { selectedCustomerId: expectedCustomerId }
    });

    expect(returnState.get('selectedBillingAddress').get('customer_id')).toEqual(expectedCustomerId);
  });

  it('BILLINGADDRESS_ON_CREATE', () => {
    const {
      BILLINGADDRESS_ON_CREATE
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_ON_CREATE
    });

    expect(returnState.get('formData').toJS()).toEqual(emptyFormData);
    expect(returnState.get('selectedCountry').toJS()).toEqual(countries[0]);
    expect(returnState.get('selectedState').toJS()).toEqual({});
    expect(returnState.get('isFormHeaderDisplay')).toEqual(true);
    expect(returnState.get('isListDisplay')).toEqual(true);
    expect(returnState.get('isFormDisplay')).toEqual(true);
    expect(returnState.get('formMode')).toEqual(formModes.CREATE);
    expect(returnState.get('formErrors').find(value => !value) == null).toEqual(true);

    const defaultState2 = defaultState.set('isInternational', true);
    const returnState2 = billingAddressReducer(defaultState2, {
      type: BILLINGADDRESS_ON_CREATE
    });
    expect(returnState2.get('selectedCountry').toJS()).toEqual({});
  });

  it('BILLINGADDRESS_ON_UPDATE', () => {
    const {
      BILLINGADDRESS_ON_UPDATE
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_ON_UPDATE
    });

    const expectedFormData = {
      [fields.CUSTOMERID]: selectedBillingAddress.customer_id,
      [fields.FIRST]: selectedBillingAddress.first_name,
      [fields.LAST]: selectedBillingAddress.last_name,
      [fields.MAILINGNAME]: selectedBillingAddress.mailing_name,
      [fields.ADDRESS1]: selectedBillingAddress.address1,
      [fields.ADDRESS2]: selectedBillingAddress.address2,
      [fields.COUNTRY]: selectedBillingAddress.country,
      [fields.CITY]: selectedBillingAddress.city,
      [fields.STATE]: '',
      [fields.ZIPCODE]: selectedBillingAddress.zip_code,
      [fields.ZIPCODE_SERVICE]: ''
    };

    expect(returnState.get('isFormHeaderDisplay')).toEqual(false);
    expect(returnState.get('isListDisplay')).toEqual(false);
    expect(returnState.get('isFormDisplay')).toEqual(true);
    expect(returnState.get('formMode')).toEqual(formModes.UPDATE);
    expect(returnState.get('formErrors').toJS()).toEqual({});

    const defaultState2 = defaultState.set('isInternational', true);
    const returnState2 = billingAddressReducer(defaultState2, {
      type: BILLINGADDRESS_ON_UPDATE
    });
    expect(returnState2.get('selectedCountry').toJS()).toEqual(
      defaultState2.get('countries')
        .find(country => country.get('value') === defaultState2.getIn(['selectedBillingAddress', 'country'])).toJS()
    );

    const defaultState3 = defaultState.set('isInternational', false).set('countries', fromJS([]));
    const returnState3 = billingAddressReducer(defaultState3, {
      type: BILLINGADDRESS_ON_UPDATE
    });
    expect(returnState3.get('selectedCountry').toJS()).toEqual({});

    const defaultState4 = defaultState.set('isInternational', false).set('states', undefined);
    const returnState4 = billingAddressReducer(defaultState4, {
      type: BILLINGADDRESS_ON_UPDATE
    });
    expect(returnState4.get('selectedState').toJS()).toEqual({});
  });

  it('Should show form successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_SHOW
    } = billingAddressActions;

    let returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_SHOW,
      payload: { display: true }
    });

    expect(returnState.get('isFormDisplay')).toEqual(true);

    returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_SHOW,
      payload: { display: false }
    });

    expect(returnState.get('isFormDisplay')).toEqual(false);
    expect(returnState.get('formMode')).toEqual(formModes.VIEW);
  });

  it('Should update form field successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_FIELD
    } = billingAddressActions;

    const payload = { fieldType: fields.FIRST, value: 'first' };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_FIELD,
      payload
    });

    expect(returnState.getIn(['formData', payload.fieldType])).toEqual(payload.value);
  });

  it('Should change country list successfully', () => {
    const {
      BILLINGADDRESS_UI_COUNTRY_SELECTED
    } = billingAddressActions;

    const expectedCountry = countries[1];
    const payload = { countryId: expectedCountry.id };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRY_SELECTED,
      payload
    });

    expect(returnState.getIn(['selectedCountry', 'id'])).toEqual(payload.countryId);
    expect(returnState.getIn(['formData', fields.COUNTRY])).toEqual(payload.countryId);
    expect(returnState.getIn(['formData', fields.STATE])).toEqual('');
    expect(returnState.get('selectedState').toJS()).toEqual({});
  });

  it('Should change country list successfully if no country to be search out', () => {
    const {
      BILLINGADDRESS_UI_COUNTRY_SELECTED
    } = billingAddressActions;

    const payload = { countryId: 'xxxxx' };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRY_SELECTED,
      payload
    });

    expect(returnState.getIn(['selectedCountry', 'id'])).toEqual(undefined);
    expect(returnState.getIn(['formData', fields.COUNTRY])).toEqual(payload.countryId);
    expect(returnState.getIn(['formData', fields.STATE])).toEqual('');
    expect(returnState.get('selectedState').toJS()).toEqual({});
  });

  it('Should no change if selection country is no change', () => {
    const {
      BILLINGADDRESS_UI_COUNTRY_SELECTED
    } = billingAddressActions;

    const payload = { countryId: undefined };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRY_SELECTED,
      payload
    });

    expect(returnState.get('selectedState').toJS()).toEqual({});
  });

  it('Should update validation object successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_VALIDATION
    } = billingAddressActions;

    const payload = {
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: '',
        [fields.ADDRESS1]: '',
        [fields.ADDRESS2]: '',
        [fields.COUNTRY]: '',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_VALIDATION,
      payload
    });

    expect(returnState.get('formErrors').toJS()).toEqual(payload.formErrors);
  });

  it('Should update validation object by field successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_FIELD_VALIDATION
    } = billingAddressActions;

    const payload = {
      error: 'required',
      fieldType: fields.COUNTRY
    };

    const returnState = billingAddressReducer(fromJS({ formErrors: {} }), {
      type: BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
      payload
    });

    expect(returnState.getIn(['formErrors', payload.fieldType])).toEqual(payload.error);
  });

  it('Should cancel form successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_CANCEL
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_CANCEL
    });

    expect(returnState.get('formData').toJS()).toEqual({});
    expect(returnState.get('isFormHeaderDisplay')).toEqual(true);
    expect(returnState.get('isListDisplay')).toEqual(true);
    expect(returnState.get('isFormDisplay')).toEqual(false);
    expect(returnState.get('formMode')).toEqual(formModes.VIEW);
  });

  it('Should change isInternational successfully', () => {
    const {
      BILLINGADDRESS_UI_SET_ISINTERNATIONAL
    } = billingAddressActions;

    const payload = {
      isInternational: true
    };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_SET_ISINTERNATIONAL,
      payload
    });

    expect(returnState.get('isInternational')).toBeTruthy();

    const payload2 = {
      isInternational: false
    };

    const returnState2 = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_SET_ISINTERNATIONAL,
      payload: payload2
    });

    expect(returnState2.get('isInternational')).toBeFalsy();
  });
});
