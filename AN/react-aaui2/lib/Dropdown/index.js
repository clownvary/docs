'use strict';

exports.__esModule = true;
exports.Select = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _NativeSelect = require('./NativeSelect');

var _NativeSelect2 = _interopRequireDefault(_NativeSelect);

var _viewport = require('../viewport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function Select(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _viewport.ShowAt,
      { smAndAbove: true },
      _react2.default.createElement(_Dropdown2.default, props)
    ),
    _react2.default.createElement(
      _viewport.HideAt,
      { smAndAbove: true },
      _react2.default.createElement(_NativeSelect2.default, props)
    )
  );
};

exports.Select = Select;
exports.default = _Dropdown2.default;