'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _injectL10n = require('./injectL10n');

var _injectL10n2 = _interopRequireDefault(_injectL10n);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function L10nCurrency(_ref) {
  var amount = _ref.amount,
      code = _ref.code,
      format = _ref.format,
      l10n = _ref.l10n;

  return _react2.default.createElement(
    'span',
    null,
    l10n.formatCurrency(amount, code, format)
  );
}

L10nCurrency.propTypes = {
  amount: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]),
  code: _propTypes.string,
  format: _propTypes.object, // eslint-disable-line
  l10n: _types.aauiL10nShape
};

exports.default = (0, _injectL10n2.default)()(L10nCurrency);
module.exports = exports['default'];