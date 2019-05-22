'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _injectL10n = require('./injectL10n');

var _injectL10n2 = _interopRequireDefault(_injectL10n);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function L10nMessage(_ref) {
  var id = _ref.id,
      values = _ref.values,
      l10n = _ref.l10n;

  return _react2.default.createElement(
    'span',
    null,
    l10n.formatMessage(id, values, id)
  );
}

L10nMessage.propTypes = {
  id: _propTypes.string,
  values: _propTypes.object, // eslint-disable-line
  l10n: _types.aauiL10nShape
};

exports.default = (0, _injectL10n2.default)()(L10nMessage);
module.exports = exports['default'];