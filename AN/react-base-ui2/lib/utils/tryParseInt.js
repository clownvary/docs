'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _parseInt = require('lodash/parseInt');var _parseInt2 = _interopRequireDefault(_parseInt);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (value) {var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var resultValue = (0, _parseInt2.default)(value);

  if (isNaN(resultValue)) {
    return defaultValue;
  }
  return resultValue;
};module.exports = exports['default'];