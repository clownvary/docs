import { fromJS } from 'immutable';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import mapValues from 'lodash/mapValues';
import invert from 'lodash/invert';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import { billingAddressFormFields as fields, formModes } from '../consts';
import {
  BILLINGADDRESS_UI_LIST,
  BILLINGADDRESS_UI_SELECTED,
  BILLINGADDRESS_UI_FORM_SHOW,
  BILLINGADDRESS_UI_FORM_FIELD,
  BILLINGADDRESS_UI_FORM_VALIDATION,
  BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
  BILLINGADDRESS_UI_FORM_CANCEL,
  BILLINGADDRESS_UI_COUNTRYSTATE,
  BILLINGADDRESS_ON_CREATE,
  BILLINGADDRESS_ON_UPDATE,
  BILLINGADDRESS_UI_COUNTRY_SELECTED,
  BILLINGADDRESS_UI_SET_ISINTERNATIONAL
} from '../consts/actionTypes';

const initialState = fromJS({
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
  isStateShownAsList: false,
  formMode: formModes.VIEW,
  isInternational: true,
  hasSubmitForm: false
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

const setStateShown = state =>
  state.set('isStateShownAsList', state.getIn(['selectedCountry', 'states']) &&
    state.getIn(['selectedCountry', 'states']).size > 0);


const handlers = {
  [BILLINGADDRESS_UI_COUNTRYSTATE](state, { payload: { countries } }) {
    if (!isArray(countries)) return state;

    const list = countries.map(country => ({
      id: country.id,
      text: country.country_name,
      value: country.id,
      states: country.states.map(sta => ({
        id: sta.id,
        text: sta.state_name,
        value: sta.state
      }))
    }));

    return state.set('countries', fromJS(list));
  },

  [BILLINGADDRESS_UI_LIST](state, { payload: { billingInfos } }) {
    if (!billingInfos || !isArray(billingInfos.payers)) return state;

    const billingAddresses = billingInfos.payers.map(ba => Object.assign({}, ba, {
      text: decodeHtmlStr(`${ba.first_name} ${ba.last_name}`),
      value: ba.customer_id,
      name: decodeHtmlStr(ba.name),
      first_name: decodeHtmlStr(ba.first_name),
      last_name: decodeHtmlStr(ba.last_name),
      middle_name: decodeHtmlStr(ba.middle_name),
      mailing_name: decodeHtmlStr(ba.mailing_name),
      real_mailing_name: decodeHtmlStr(ba.real_mailing_name),
      address1: decodeHtmlStr(ba.address1),
      address2: decodeHtmlStr(ba.address2),
      city: decodeHtmlStr(ba.city)
    }));

    if (billingAddresses.length > 0) {
      return state.withMutations((s) => {
        s.set('billingAddresses', fromJS(billingAddresses));
        s.set('selectedBillingAddress', fromJS(find(billingAddresses,
          ba => ba.customer_id === billingInfos.payer_id)));
      });
    }

    return setStateShown(state.withMutations((s) => {
      s.set('formData', fromJS(emptyFormData));
      s.set('selectedCountry', fromJS({}));
      s.set('selectedState', fromJS({}));

      s.set('isFormHeaderDisplay', false);
      s.set('isListDisplay', false);
      s.set('isFormDisplay', true);
      s.set('formMode', formModes.CREATE);
      s.set('formErrors', fromJS({}));
    }));
  },

  [BILLINGADDRESS_UI_SELECTED](state, { payload: { selectedCustomerId } }) {
    return state.withMutations((s) => {
      s.set('selectedBillingAddress', s.get('billingAddresses')
        .find(billingAddress => billingAddress.get('customer_id') === selectedCustomerId));
    });
  },

  [BILLINGADDRESS_ON_CREATE](state) {
    return setStateShown(state.withMutations((s) => {
      s.set('formData', fromJS(emptyFormData));
      s.set('selectedCountry', s.get('isInternational') ? fromJS({}) : s.getIn(['countries', 0]));
      s.set('selectedState', fromJS({}));
      s.set('isFormHeaderDisplay', true);
      s.set('isListDisplay', true);
      s.set('isFormDisplay', true);
      s.set('formMode', formModes.CREATE);
      s.set('formErrors', fromJS({}));
      s.set('hasSubmitForm', false);
    }));
  },

  [BILLINGADDRESS_ON_UPDATE](state) {
    return setStateShown(state.withMutations((s) => {
      const billingAddress = s.get('selectedBillingAddress');

      let selectedCountry = fromJS({});
      if (s.get('isInternational')) {
        selectedCountry = s.get('countries')
        .find(country => country.get('value') === billingAddress.get('country'));
      } else {
        selectedCountry = s.getIn(['countries', 0]);
      }

      let selectedState;
      if (selectedCountry && selectedCountry.get('states')) {
        const states = selectedCountry.get('states');
        selectedState = states.find(sta => sta.get('value') === billingAddress.get('state'));
      }

      s.set('selectedCountry', selectedCountry || fromJS({}));
      s.set('selectedState', selectedState || fromJS({}));
      s.set('formData', fromJS(
          mapValues(
            invert(fields),
            (value, key) => {
              const hasStates = selectedCountry &&
                             selectedCountry.get('states') &&
                             selectedCountry.get('states').size;
              return key === fields.STATE && hasStates && !selectedState ? '' : billingAddress.get(key);
            }
          )
        )
      );
      s.set('isFormHeaderDisplay', false);
      s.set('isListDisplay', false);
      s.set('isFormDisplay', true);
      s.set('formMode', formModes.UPDATE);
      s.set('hasSubmitForm', false);
      s.set('formErrors', fromJS({}));
    }));
  },

  [BILLINGADDRESS_UI_FORM_SHOW](state, { payload: { display } }) {
    return state.withMutations((s) => {
      s.set('isFormDisplay', display);

      if (!display) {
        s.set('formMode', formModes.VIEW);
      }
    });
  },

  [BILLINGADDRESS_UI_FORM_FIELD](state, { payload: { fieldType, value } }) {
    return setStateShown(state.withMutations((s) => {
      s.set('formData', s.get('formData').set(fieldType, value));
    }));
  },

  [BILLINGADDRESS_UI_COUNTRY_SELECTED](state, { payload: { countryId } }) {
    return setStateShown(state.withMutations((s) => {
      if (s.getIn(['selectedCountry', 'value']) !== countryId) {
        s.set('selectedCountry', s.get('countries')
          .find(country => country.get('value') === countryId) || fromJS({}));

        s.set('formData', s.get('formData')
          .set(fields.COUNTRY, countryId)
          .set(fields.STATE, ''));

        s.set('selectedState', fromJS({}));
      }
    }));
  },

  [BILLINGADDRESS_UI_FORM_VALIDATION](state, { payload: { formErrors } }) {
    return setStateShown(state.withMutations((s) => {
      s.set('formErrors', fromJS(formErrors));
      s.set('hasSubmitForm', true);
    }));
  },

  [BILLINGADDRESS_UI_FORM_FIELD_VALIDATION](state, { payload: { error, fieldType } }) {
    return setStateShown(state.withMutations((s) => {
      s.set('formErrors', state.get('formErrors').set(fieldType, error));
      s.set('hasSubmitForm', false);
    }));
  },

  [BILLINGADDRESS_UI_FORM_CANCEL](state) {
    return state.withMutations((s) => {
      s.set('isListDisplay', true);
      s.set('isFormHeaderDisplay', true);
      s.set('isFormDisplay', false);
      s.set('formData', fromJS({}));
      s.set('formMode', formModes.VIEW);
    });
  },

  [BILLINGADDRESS_UI_SET_ISINTERNATIONAL](state, { payload: { isInternational } }) {
    return state.withMutations((s) => {
      s.set('isInternational', isInternational);
    });
  }
};

export default reducerHandler(initialState, handlers);
