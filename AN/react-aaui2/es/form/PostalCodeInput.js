import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import React from 'react';
import { string, object } from 'prop-types';

import TextInput from './TextInput';

export var POSTAL_CODE_FIELD_KEY = 'postalCode';

var propTypes = {
  countryConfig: object.isRequired,
  rules: string
};

var getPostalCode = function getPostalCode(countryConfig) {
  var regexp = void 0;
  if (countryConfig && countryConfig.addressForm && countryConfig.addressForm.addressFields) {
    var addressFields = countryConfig.addressForm.addressFields;

    var postalCodeFieldKey = _Object$keys(addressFields).filter(function (field) {
      return addressFields[field].addressPart === POSTAL_CODE_FIELD_KEY;
    })[0];
    if (addressFields[postalCodeFieldKey]) {
      regexp = addressFields[postalCodeFieldKey].validationRegex || '';
    }
  } else {
    regexp = '';
  }
  return regexp;
};

var PostalCodeInput = function PostalCodeInput(props) {
  var countryConfig = props.countryConfig,
      rules = props.rules,
      rest = _objectWithoutProperties(props, ['countryConfig', 'rules']);

  var regexp = getPostalCode(countryConfig);
  return React.createElement(TextInput, _extends({
    type: 'postalCode'
  }, rest, {
    rules: rules + '|regexp:(' + regexp + ')'
  }));
};

PostalCodeInput.displayName = 'PostalCodeInput';
PostalCodeInput.propTypes = propTypes;

export default PostalCodeInput;