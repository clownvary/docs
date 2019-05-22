'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _AddressStatic = require('./AddressStatic');

var _AddressStatic2 = _interopRequireDefault(_AddressStatic);

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _NestedForm = require('./NestedForm');

var _NestedForm2 = _interopRequireDefault(_NestedForm);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _HField = require('./HField');

var _HField2 = _interopRequireDefault(_HField);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Combobox = require('./Combobox');

var _Combobox2 = _interopRequireDefault(_Combobox);

var _PostalCodeInput = require('./PostalCodeInput');

var _PostalCodeInput2 = _interopRequireDefault(_PostalCodeInput);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  (0, _inherits3.default)(AddressEditor, _PureComponent);

  function AddressEditor(props, context) {
    (0, _classCallCheck3.default)(this, AddressEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props, context));

    _this.reduceFields = function (country) {
      var _this$props = _this.props,
          _this$props$value = _this$props.value,
          value = _this$props$value === undefined ? {} : _this$props$value,
          getError = _this$props.api.getError;
      var countriesConfig = _this.state.countriesConfig;

      var countryConfig = countriesConfig[country];

      if (!countryConfig || !countryConfig.addressForm) {
        return (0, _extends5.default)({ country: country }, value);
      }

      var countryAddressFields = countryConfig.addressForm.addressFields;

      return (0, _keys2.default)(countryAddressFields).reduce(function (r, k) {
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
            fieldRest = (0, _objectWithoutProperties3.default)(_getFieldValue, ['value']);

        var valueArr = fieldValue.split('\n');

        var finalField = (0, _extends5.default)({}, fieldRest, {
          value: valueArr[0],
          errMsg: error[addressPart] || ''

          // It means it has multiple parts for one address part
        });if (position > 1) {
          addressPart = addressPart + '.' + position;

          finalField = (0, _extends5.default)({}, fieldRest, {
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

        return (0, _extends5.default)({}, r, (_extends2 = {}, _extends2[addressPart] = finalField, _extends2));
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

      return (0, _keys2.default)(countryAddressFields).reduce(function (r, k) {
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
          component: _TextInput2.default,
          required: required
        };

        if (options && options.length !== 0) {
          var data = options.map(function (option) {
            return {
              text: l10n.formatMessage(addressPart + '.displayName.' + code + '.' + option.fieldOptionValue),
              value: option.fieldOptionValue
            };
          });
          reducedAddressField = (0, _extends5.default)({}, reducedAddressField, {
            component: _Combobox2.default,
            maxHeight: '320px',
            data: data
          });
        }

        if (addressPart === _PostalCodeInput.POSTAL_CODE_FIELD_KEY) {
          reducedAddressField = (0, _extends5.default)({}, reducedAddressField, {
            countryConfig: countryConfig,
            component: _PostalCodeInput2.default
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

      var valueKeys = (0, _keys2.default)(values);
      var countryConfig = countriesConfig[country];

      if (!countryConfig || !countryConfig.addressForm) {
        return values;
      }

      var countryAddressFields = countryConfig.addressForm.addressFields;

      return (0, _keys2.default)(countryAddressFields).reduce(function (r, k) {
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

        return (0, _extends5.default)({}, r, (_extends3 = {}, _extends3[addressPart] = (0, _extends5.default)({}, addressPartValue, {
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
    if ((0, _keys2.default)(this.props.countriesConfig).length === 0) {
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


    return (0, _keys2.default)(countriesConfig).map(function (country) {
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
        rest = (0, _objectWithoutProperties3.default)(_props, ['fieldLayout']);

    var _getCountry3 = getCountry(rest),
        country = _getCountry3.country,
        countryField = _getCountry3.countryField;

    var fields = this.reduceFields(country);
    var countries = this.getAvailCountries();
    var reducedCountryAddressFields = this.reduceCountryAddressFields(country);

    if (this.props.static) {
      return _react2.default.createElement(_AddressStatic2.default, (0, _extends5.default)({ address: this.props.value }, rest));
    }

    return _react2.default.createElement(
      _NestedForm2.default,
      (0, _extends5.default)({}, rest, { fields: fields, preChange: this.handlePreChange }),
      _react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(FieldLayout, (0, _extends5.default)({
          maxHeight: '320px',
          name: 'country',
          label: FIELD_PREFIX + '.country',
          component: _Combobox2.default,
          data: countries,
          required: true,
          onChange: this.handleCountryChange
        }, countryField)),
        reducedCountryAddressFields.map(function (f) {
          return _react2.default.createElement(FieldLayout, (0, _extends5.default)({ key: f.name, name: f.name }, f));
        })
      )
    );
  };

  return AddressEditor;
}(_react.PureComponent);

AddressEditor.propTypes = (0, _extends5.default)({
  static: _propTypes.bool,
  country: _propTypes.string,
  countriesConfig: _propTypes.object, // eslint-disable-line
  value: _propTypes.any, // eslint-disable-line

  fieldLayout: (0, _propTypes.oneOfType)([_propTypes.node, _propTypes.func])
}, _types.FormFieldAPIPropTypes);
AddressEditor.defaultProps = {
  static: false,
  countriesConfig: {},
  country: 'US',
  fieldLayout: _HField2.default
};
exports.default = (0, _connectForm2.default)()(AddressEditor);
module.exports = exports['default'];