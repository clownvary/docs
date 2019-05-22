'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = { rules: _propTypes.string };
var NumericInput = function NumericInput(props) {
  return _react2.default.createElement(_TextInput2.default, (0, _extends3.default)({ type: 'number' }, props, { rules: props.rules + '|number' }));
};

NumericInput.propTypes = propTypes;
NumericInput.displayName = 'NumericInput';

exports.default = NumericInput;
module.exports = exports['default'];