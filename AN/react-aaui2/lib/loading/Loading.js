'use strict';

exports.__esModule = true;
exports.default = Loading;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Loading.less');

var _Loading = require('./Loading.gif');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loading() {
  return _react2.default.createElement(
    'div',
    { className: 'loading' },
    _react2.default.createElement('img', { alt: '', src: _Loading2.default })
  );
}
module.exports = exports['default'];