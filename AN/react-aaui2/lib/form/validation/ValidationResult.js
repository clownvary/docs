'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationResult = function ValidationResult(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var errMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  (0, _classCallCheck3.default)(this, ValidationResult);

  if (!name) {
    throw new Error('Name should not be empty!');
  }

  this.name = name;
  this.value = value;
  this.errMsg = errMsg;
};

exports.default = ValidationResult;
module.exports = exports['default'];