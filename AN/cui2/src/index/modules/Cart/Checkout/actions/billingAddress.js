import createFSA from 'react-base-ui/lib/utils/createFSA';
import { ErrorObj } from 'react-base-ui/lib/common/error';
import mapValues from 'lodash/mapValues';
import invert from 'lodash/invert';
import { string as stringHelper } from 'react-base-ui/lib/helper';
import { clearError } from 'shared/utils/messages';
import billingAddress from '../consts/billingAddress';
import API from '../api';
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
  BILLINGADDRESS_UI_COUNTRY_SELECTED,
  BILLINGADDRESS_ON_CREATE,
  BILLINGADDRESS_ON_UPDATE,
  BILLINGADDRESS_UI_SET_ISINTERNATIONAL
} from '../consts/actionTypes';

const uiCountryStateAction = createFSA(BILLINGADDRESS_UI_COUNTRYSTATE);
const uiBillingAddressListAction = createFSA(BILLINGADDRESS_UI_LIST);
const uiFormShowAction = createFSA(BILLINGADDRESS_UI_FORM_SHOW);
const uiSelectBillingAddressAction = createFSA(BILLINGADDRESS_UI_SELECTED);
const uiSelectCountryAction = createFSA(BILLINGADDRESS_UI_COUNTRY_SELECTED);
const uiFormValidationAction = createFSA(BILLINGADDRESS_UI_FORM_VALIDATION);
const uiCancelAction = createFSA(BILLINGADDRESS_UI_FORM_CANCEL);
const uiFormFieldAction = createFSA(
  BILLINGADDRESS_UI_FORM_FIELD,
  (fieldType, value) => ({ fieldType, value })
);
const uiFormFieldValidationAction = createFSA(
  BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
  (fieldType, error) => ({ fieldType, error })
);
const onCreateBillingAddressActionRaw = createFSA(BILLINGADDRESS_ON_CREATE);
const onUpdateBillingAddressActionRaw = createFSA(BILLINGADDRESS_ON_UPDATE);

export const uiSetIsInternationalAction = createFSA(BILLINGADDRESS_UI_SET_ISINTERNATIONAL);

const validateField = (fieldType, value, formMode = formModes.VIEW) => {
  switch (formMode) {
    case formModes.CREATE:
      switch (fieldType) {
        case fields.FIRST:
        case fields.LAST:
        case fields.ADDRESS1:
        case fields.COUNTRY:
        case fields.CITY:
        case fields.STATE:
        case fields.ZIPCODE:
          if (stringHelper.isNullOrEmpty(value)) {
            return 'errorMessageRequired';
          }
          break;
        case fields.ZIPCODE_SERVICE:
        case fields.CUSTOMERID:
        case fields.ADDRESS2:
        case fields.MAILINGNAME:
        default:
          break;
      }
      break;
    case formModes.UPDATE:
      switch (fieldType) {
        case fields.MAILINGNAME:
        case fields.ADDRESS1:
        case fields.COUNTRY:
        case fields.CITY:
        case fields.STATE:
        case fields.ZIPCODE:
          if (stringHelper.isNullOrEmpty(value)) {
            return 'errorMessageRequired';
          }
          break;
        case fields.ZIPCODE_SERVICE:
        case fields.FIRST:
        case fields.LAST:
        case fields.CUSTOMERID:
        case fields.ADDRESS2:
        default:
          break;
      }
      break;
    default:
      break;
  }

  return '';
};

const validateForm = (formData, formMode, configurations) => {
  const _fields = { ...fields };
  if (!configurations.get('international_addr')) {
    delete _fields.COUNTRY;
  }
  const err = mapValues(invert(_fields),
    (value, key) => validateField(key, formData[key], formMode));
  err.isValidated = !Object.keys(_fields)
    .some(field => !stringHelper.isNullOrEmpty(err[_fields[field]]));

  return err;
};

const createBillingAddress = data => API.createBillingAddress({ body: data });
const updateBillingAddress = data => API.updateBillingAddress({ body: data });
const changePayer = newPayerId => API.changePayer({ body: { payer_id: newPayerId } });

export const getCountryStateAction = internationalAddr => dispatch =>
  API.getCountryState({ isDefault: !internationalAddr })
  .then(({ body: { countries } }) => {
    dispatch(uiCountryStateAction({ countries }));
  });

export const getBillingAddressAction = () => dispatch =>
  API.getBillingAddress()
  .then(({ body: { billing_infos: billingInfos } }) => {
    dispatch(uiBillingAddressListAction({ billingInfos }));
  });

export const onCreateBillingAddressAction = () =>
  dispatch => dispatch(onCreateBillingAddressActionRaw());

export const onUpdateBillingAddressAction = () =>
  dispatch => dispatch(onUpdateBillingAddressActionRaw());

export const selectBillingAddressAction = selectedCustomerId =>
  (dispatch) => {
    dispatch(uiSelectBillingAddressAction({ selectedCustomerId }));
    return changePayer(selectedCustomerId);
  };

export const showBillingAddressFormAction = () =>
  dispatch => dispatch(uiFormShowAction({ display: true }));

export const hideBillingAddressFormAction = () =>
  dispatch => dispatch(uiFormShowAction({ display: false }));

export const selectCountryAction = (countryId, formMode) => (dispatch) => {
  dispatch(uiSelectCountryAction({ countryId }));
  return dispatch(
    uiFormFieldValidationAction(fields.COUNTRY,
      validateField(fields.COUNTRY, countryId, formMode))
  );
};

export const changeFormFieldAction = (fieldType, value) =>
  dispatch => dispatch(uiFormFieldAction(fieldType, value));

export const validateFormFieldAction = (fieldType, value, formMode) =>
  dispatch => dispatch(uiFormFieldValidationAction(fieldType,
    validateField(fieldType, value, formMode)));

export const submitAction = () => (dispatch, getState) => {
  const state = getState().modules.Cart.Checkout.billingAddress;
  const formData = state.get('formData').toJS();
  const formMode = state.get('formMode');

  const configurations = getState().configurations;
  const errors = validateForm(formData, formMode, configurations);

  dispatch(uiFormValidationAction({ formErrors: errors }));

  if (errors.isValidated) {
    const result = formMode === formModes.UPDATE ?
      updateBillingAddress(formData) :
      createBillingAddress(formData);

    return result.then(() => {
      const serverErrors = getState().modules.Cart.Checkout.agreement.get('errors');

      if (serverErrors.get('errorMessage') && serverErrors.get('moduleName') === billingAddress.BILLING_ADDRESS) {
        clearError(serverErrors.get('errorMessage'));
      }
      return dispatch(getBillingAddressAction()).then(() => dispatch(uiCancelAction()));
    }
    ).catch((error) => {
      if (ErrorObj.isErrorObj(error)) {
        const { data: { response: { isValidationError, body } } } = error;
        if (isValidationError) {
          const { errors: { zip_code: zipCodeMsg } } = body || {};
          return dispatch(uiFormValidationAction({
            formErrors: {
              [fields.ZIPCODE_SERVICE]: zipCodeMsg
            }
          }));
        }
      }
      return Promise.reject(error);
    });
  }

  return Promise.reject();
};

export const cancelAction = () => dispatch => dispatch(uiCancelAction());
