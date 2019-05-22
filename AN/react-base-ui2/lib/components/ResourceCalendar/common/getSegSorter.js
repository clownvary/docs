'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _utils = require('./utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var getEndTime = function getEndTime(seg, exclusiveMode) {
  if ((0, _isNil2.default)(seg.end)) {
    return (0, _utils.getEndOfDay)(seg.start, exclusiveMode);
  }
  return seg.end;
};

var getSegSorter = function getSegSorter(exclusiveMode) {return function (a, b) {
    if (a.start.isSame(b.start)) {
      var endA = getEndTime(a, exclusiveMode);
      var endB = getEndTime(b, exclusiveMode);
      if (endA.isSame(endB)) {
        return a.eventOrder.localeCompare(b.eventOrder);
      }
      return endA.isBefore(endB) ? 1 : -1;
    }
    return a.start.isBefore(b.start) ? -1 : 1;
  };};exports.default =

getSegSorter;module.exports = exports['default'];