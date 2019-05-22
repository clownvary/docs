'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultOptions = {
  start: (0, _moment2.default)(),
  end: (0, _moment2.default)(),
  timeStep: 30 };var


MomentRange = function () {
  function MomentRange(_ref) {var start = _ref.start,end = _ref.end,timeStep = _ref.timeStep;(0, _classCallCheck3.default)(this, MomentRange);
    this.start = start || defaultOptions.start;
    this.end = end || defaultOptions.end;
    this.timeStep = timeStep || defaultOptions.timeStep;
  }(0, _createClass3.default)(MomentRange, [{ key: 'toString', value: function toString()

    {
      return this.start.format() + '/' + this.end.format() + '/' + this.timeStep;
    } }]);return MomentRange;}();exports.default =



MomentRange;module.exports = exports['default'];