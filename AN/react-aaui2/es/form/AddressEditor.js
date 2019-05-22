import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, object, func, node, any, oneOfType } from 'prop-types';

import AddressStatic from './AddressStatic';
import connectForm from './connectForm';
import NestedForm from './NestedForm';
import Form from './index';
import HField from './HField';
import TextInput from './TextInput';
import Combobox from './Combobox';
import PostalCodeInput, { POSTAL_CODE_FIELD_KEY } from './PostalCodeInput';
import { FormFieldAPIPropTypes } from './types';

var FIELD_PREFIX = 'addressForm.addressField';
var getFieldValue = function getFieldValue(fieldValue) {
  // `null`, `undefined` => ''
  var finalFieldValue = fieldValue == null ? '' : fieldValue;

  return typeof finalFieldValue === 'string' ? { value: finalFieldValue } : finalFieldValue;
};

var getCountry = function getCountry(props) {
  var countryField = void 0;
  if ('value' in props && props.value) {
    countryField = getFieldValue(props.value.country);
  }

  var country = countryField ? countryField.value : props.country;

  return {
    country: country,
    countryField: countryField
  };
};

var AddressEditor = function (_PureComponent) {
  _inherits(AddressEditor, _PureComponent);

  function AddressEditor(props, context) {
    _classCallCheck(this, AddressEditor);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props, context));

    _this.reduceFields = function (country) {
      var _this$props = _this.props,
          _this$props$value = _this$props.value,
          value = _this$props$value === undefined ? {} : _this$props$value,
          getError = _this$props.api.getError;
      var countriesConfig = _this.state.countriesConfig;

      var countryConfig = countriesConfig[country];

      if (!countryConfig || !countryConfig.addressForm) {
        return _extends({ country: country }, value);
      }

      var countryAddressFields = countryConfig.addressForm.addressFields;

      return _Object$keys(countryAddressFields).reduce(function (r, k) {
        var _extends2;

        var countryAddressField = countryAddressFields[k];
        var position = countryAddressField.position,
            _countryAddressField$ = countryAddressField.options,
            options = _countryAddressField$ === undefined ? [] : _countryAddressField$;

        var error = getError() || {};

        var addressPart = countryAddressField.addressPart;

        var _getFieldValue = getFieldValue(value[addressPart]),
            _getFieldValue$value = _getFieldValue.value,
            fieldValue = _getFieldValue$value === undefined ? '' : _getFieldValue$value,
            fieldRest = _objectWithoutProperties(_getFieldValue, ['value']);

        var valueArr = fieldValue.split('\n');

        var finalField = _extends({}, fieldRest, {
          value: valueArr[0],
          errMsg: error[addressPart] || ''

          // It means it has multiple parts for one address part
        });if (position > 1) {
          addressPart = addressPart + '.' + position;

          finalField = _extends({}, fieldRest, {
            value: valueArr[position - 1] || '',
            errMsg: error[addressPart] || ''
          });
        }

        // If it has multiple options (`Combobox`), we should check whether the value matches
        if (options && options.length !== 0 && fieldValue) {
          var data = options.map(function (option) {
            return option.fieldOptionValue;
          });

          if (data.indexOf(fieldValue) === -1) {
            finalField.value = '';
          }
        }

        return _extends({}, r, (_extends2 = {}, _extends2[addressPart] = finalField, _extends2));
      }, { country: country });
    };

    _this.reduceCountryAddressFields = function (country) {
      var l10n = _this.props.l10n;
      var countriesConfig = _this.state.countriesConfig;

      var countryConfig = countriesConfig[country];

      if (!countryConfig) {
        countryConfig = countriesConfig.US;
      }

      if (!countryConfig || !countryConfig.addressForm) {
        return [];
      }

      var code = countryConfig.iso3166Code;
      var countryAddressFields = countryConfig.addressForm.addressFields || [];

      return _Object$keys(countryAddressFields).reduce(function (r, k) {
        var countryAddressField = countryAddressFields[k];
        var required = countryAddressField.required,
            addressPart = countryAddressField.addressPart,
            position = countryAddressField.position,
            _countryAddressField$2 = countryAddressField.options,
            options = _countryAddressField$2 === undefined ? [] : _countryAddressField$2;

        // Find the label key

        var label = FIELD_PREFIX + '.' + code + '.' + addressPart;
        if (position > 1) {
          label = label + '.' + position;
        }
        if (!l10n.formatMessage(label)) {
          label = FIELD_PREFIX + '.' + addressPart;
        }

        var reducedAddressField = {
          name: position > 1 ? addressPart + '.' + position : addressPart,
          label: label,
          component: TextInput,
          required: required
        };

        if (options && options.length !== 0) {
          var data = options.map(function (option) {
            return {
              text: l10n.formatMessage(addressPart + '.displayName.' + code + '.' + option.fieldOptionValue),
              value: option.fieldOptionValue
            };
          });
          reducedAddressField = _extends({}, reducedAddressField, {
            component: Combobox,
            maxHeight: '320px',
            data: data
          });
        }

        if (addressPart === POSTAL_CODE_FIELD_KEY) {
          reducedAddressField = _extends({}, reducedAddressField, {
            countryConfig: countryConfig,
            component: PostalCodeInput
          });
        }

        return [].concat(r, [reducedAddressField]);
      }, []);
    };

    _this.handlePreChange = function (values) {
      var _this$props$value2 = _this.props.value,
          value = _this$props$value2 === undefined ? {} : _this$props$value2;
      var countriesConfig = _this.state.countriesConfig;
      var country = values.country;

      var valueKeys = _Object$keys(values);
      var countryConfig = countriesConfig[country];

      if (!countryConfig || !countryConfig.addressForm) {
        return values;
      }

      var countryAddressFields = countryConfig.addressForm.addressFields;

      return _Object$keys(countryAddressFields).reduce(function (r, k) {
        var _extends3;

        var countryAddressField = countryAddressFields[k];
        var addressPart = countryAddressField.addressPart,
            position = countryAddressField.position;

        var addressPartPosition = addressPart + '.' + position;
        var addressPartPositionValue = values[addressPartPosition];
        var addressPartValue = getFieldValue(value[addressPart]);

        var finalFieldValue = values[addressPart];

        // If found `line2.2`, `city.2`, `stateProvince.2`, `line2.3` or `city.3`
        if (position > 1 && addressPartPositionValue && valueKeys.indexOf(addressPartPosition)) {
          finalFieldValue = finalFieldValue + '\n' + addressPartPositionValue;
        }

        return _extends({}, r, (_extends3 = {}, _extends3[addressPart] = _extends({}, addressPartValue, {
          value: finalFieldValue
        }), _extends3));
      }, { country: country });
    };

    _this.handleCountryChange = function () {
      _this.clearError();
    };

    _this.state = _this.getInitState();
    return _this;
  }

  AddressEditor.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // Load `countryConfig.json` if not passed as prop
    if (_Object$keys(this.props.countriesConfig).length === 0) {
      import( /* webpackChunkName: "AUI/countryConfig" */
      './config/countryConfig.json').then(function (countriesConfig) {
        _this2.setState({
          countriesConfig: countriesConfig
        });
      });
    }
  };

  AddressEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _getCountry = getCountry(this.props),
        country = _getCountry.country;

    var _getCountry2 = getCountry(nextProps),
        nextCountry = _getCountry2.country;

    if (this.props.country !== nextProps.country || country !== nextCountry) {
      this.clearError();
    }
  };

  AddressEditor.prototype.getInitState = function getInitState() {
    var countriesConfig = this.props.countriesConfig;


    return {
      countriesConfig: countriesConfig
    };
  };

  AddressEditor.prototype.getAvailCountries = function getAvailCountries() {
    var l10n = this.props.l10n;
    var countriesConfig = this.state.countriesConfig;


    return _Object$keys(countriesConfig).map(function (country) {
      return {
        text: l10n.formatMessage('country.displayName.' + country),
        value: country
      };
    });
  };

  // Split field value into multiple parts for `line2.2`, `city.2`, etc.


  // Callback before triggering `onChange` of `Form`


  AddressEditor.prototype.clearError = function clearError() {
    var setError = this.props.api.setError;

    // Clear the error when country changes

    setError(null);
  };

  AddressEditor.prototype.render = function render() {
    var _props = this.props,
        FieldLayout = _props.fieldLayout,
        rest = _objectWithoutProperties(_props, ['fieldLayout']);

    var _getCountry3 = getCountry(rest),
        country = _getCountry3.country,
        countryField = _getCountry3.countryField;

    var fields = this.reduceFields(country);
    var countries = this.getAvailCountries();
    var reducedCountryAddressFields = this.reduceCountryAddressFields(country);

    if (this.props.static) {
      return React.createElement(AddressStatic, _extends({ address: this.props.value }, rest));
    }

    return React.createElement(
      NestedForm,
      _extends({}, rest, { fields: fields, preChange: this.handlePreChange }),
      React.createElement(
        Form,
        null,
        React.createElement(FieldLayout, _extends({
          maxHeight: '320px',
          name: 'country',
          label: FIELD_PREFIX + '.country',
          component: Combobox,
          data: countries,
          required: true,
          onChange: this.handleCountryChange
        }, countryField)),
        reducedCountryAddressFields.map(function (f) {
          return React.createElement(FieldLayout, _extends({ key: f.name, name: f.name }, f));
        })
      )
    );
  };

  return AddressEditor;
}(PureComponent);

AddressEditor.propTypes = _extends({
  static: bool,
  country: string,
  countriesConfig: object, // eslint-disable-line
  value: any, // eslint-disable-line

  fieldLayout: oneOfType([node, func])
}, FormFieldAPIPropTypes);
AddressEditor.defaultProps = {
  static: false,
  countriesConfig: {},
  country: 'US',
  fieldLayout: HField
};


export default connectForm()(AddressEditor);