'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _resizeable = require('./resizeable');var _resizeable2 = _interopRequireDefault(_resizeable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var createColResizable = function createColResizable(domEleTable, options) {
  if ((0, _isElement2.default)(domEleTable) && domEleTable.nodeName === 'TABLE') {
    return domEleTable.__resizable || (
    domEleTable.__resizable = new _resizeable2.default(domEleTable, options));
  }

  return null;
};exports.default =

createColResizable;module.exports = exports['default'];