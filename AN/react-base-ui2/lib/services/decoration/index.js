'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.disableAll = exports.disableSelectable = exports.enableSelectable = exports.disableClearable = exports.enableClearable = exports.disableService = exports.enableService = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _clearable = require('./clearable');var _clearable2 = _interopRequireDefault(_clearable);
var _selectable = require('./selectable');var _selectable2 = _interopRequireDefault(_selectable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var enableService = exports.enableService = function enableService(el, options, Service) {
  el[Service.tag] = el[Service.tag] || new Service(el, (0, _extends3.default)({}, options, { enabled: true }));
  return el[Service.tag];
};

var disableService = exports.disableService = function disableService(el, Service) {
  if (el[Service.tag]) {
    var s = el[Service.tag];
    s.disable();

    delete el[Service.tag];
  }
};

var enableClearable = exports.enableClearable = function enableClearable(el, options) {return enableService(el, options, _clearable2.default);};
var disableClearable = exports.disableClearable = function disableClearable(el) {
  disableService(el, _clearable2.default);
};

var enableSelectable = exports.enableSelectable = function enableSelectable(el, options) {return enableService(el, options, _selectable2.default);};
var disableSelectable = exports.disableSelectable = function disableSelectable(el) {
  disableService(el, _selectable2.default);
};

var disableAll = exports.disableAll = function disableAll(el) {
  disableClearable(el);
  disableSelectable(el);
};