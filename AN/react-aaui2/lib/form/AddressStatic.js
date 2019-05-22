'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _injectL10n = require('../shared/injectL10n');

var _injectL10n2 = _interopRequireDefault(_injectL10n);

var _types = require('./types');

var _types2 = require('../shared/types');

var _utils = require('../shared/utils');

var _utils2 = require('./utils');

var _addressFormat = require('./config/addressFormat.json');

var _addressFormat2 = _interopRequireDefault(_addressFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TEMPLET = '{address.line1}\n{address.line2}\n{address.city}, {address.stateProvince}\n{address.postalCode}\n{address.country}';

var AddressStatic = function AddressStatic(_ref) {
  var locale = _ref.locale,
      l10n = _ref.l10n,
      wrap = _ref.wrap,
      nowrap = _ref.nowrap,
      countriesFormatConfig = _ref.countriesFormatConfig,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['locale', 'l10n', 'wrap', 'nowrap', 'countriesFormatConfig']);

  var _reduceFields = (0, _utils2.reduceFields)(rest.address),
      address = _reduceFields.values;

  var config = (0, _extends3.default)({}, _addressFormat2.default, countriesFormatConfig);

  // country maybe from locale in l10n
  var country = (locale || l10n.locale).split('_');
  var template = config[country[1] || country[0]] || DEFAULT_TEMPLET;

  var __html = (0, _utils.interpolate)(template, { address: address }).split('\n').map(function (field) {
    return field.trim();
  }).filter(function (field) {
    return !!field;
  }).join(wrap && !nowrap ? '<br />' : ', ');

  return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: __html } });
};

AddressStatic.propTypes = {
  address: _types.addressPropTypes,
  locale: _propTypes.string,
  wrap: _propTypes.bool,
  nowrap: _propTypes.bool,
  l10n: _types2.aauiL10nShape,
  countriesFormatConfig: _propTypes.object // eslint-disable-line
};

AddressStatic.defaultProps = {
  wrap: true,
  nowrap: false
};

exports.default = (0, _injectL10n2.default)()(AddressStatic);
module.exports = exports['default'];