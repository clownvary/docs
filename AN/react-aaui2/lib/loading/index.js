'use strict';

exports.__esModule = true;

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Loading2.default.show = function () {
  return _util.show.apply(undefined, arguments);
};

_Loading2.default.hide = function () {
  return (0, _util.hide)();
};

_Loading2.default.reset = function () {
  return (0, _util.reset)();
};

exports.default = _Loading2.default;
module.exports = exports['default'];