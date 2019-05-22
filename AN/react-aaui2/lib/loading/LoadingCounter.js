"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingCounter = function () {
  function LoadingCounter() {
    (0, _classCallCheck3.default)(this, LoadingCounter);
    this.count = 0;
  }

  LoadingCounter.prototype.add = function add() {
    this.count += 1;
  };

  LoadingCounter.prototype.dec = function dec() {
    this.count -= 1;
  };

  LoadingCounter.prototype.isEmpty = function isEmpty() {
    return this.count <= 0;
  };

  LoadingCounter.prototype.clear = function clear() {
    this.count = 0;
  };

  return LoadingCounter;
}();

exports.default = LoadingCounter;
module.exports = exports["default"];