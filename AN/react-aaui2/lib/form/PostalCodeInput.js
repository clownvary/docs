'use strict';

exports.__esModule = true;
exports.POSTAL_CODE_FIELD_KEY = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POSTAL_CODE_FIELD_KEY = exports.POSTAL_CODE_FIELD_KEY = 'postalCode';

var propTypes = {
  countryConfig: _propTypes.object.isRequired,
  rules: _propTypes.string
};

var getPostalCode = function getPostalCode(countryConfig) {
  var regexp = void 0;
  if (countryConfig && countryConfig.addressForm && countryConfig.addressForm.addressFields) {
    var addressFields = countryConfig.addressForm.addressFields;

    var postalCodeFieldKey = (0, _keys2.default)(addressFields).filter(function (field) {
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
      rest = (0, _objectWithoutProperties3.default)(props, ['countryConfig', 'rules']);

  var regexp = getPostalCode(countryConfig);
  return _react2.default.createElement(_TextInput2.default, (0, _extends3.default)({
    type: 'postalCode'
  }, rest, {
    rules: rules + '|regexp:(' + regexp + ')'
  }));
};

PostalCodeInput.displayName = 'PostalCodeInput';
PostalCodeInput.propTypes = propTypes;

exports.default = PostalCodeInput;