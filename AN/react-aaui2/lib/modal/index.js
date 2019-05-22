'use strict';

exports.__esModule = true;

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Modal2.default.confirm = function (props) {
  return (0, _confirm2.default)(props);
};

exports.default = _Modal2.default;
module.exports = exports['default'];