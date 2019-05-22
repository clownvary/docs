'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _Globalize = require('./Globalize');var _Globalize2 = _interopRequireDefault(_Globalize);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var addLocaleData = function addLocaleData(data) {
  _Globalize2.default.addCldr(data);
};

var hookLocaleData = function hookLocaleData() {
  /* istanbul ignore else */
  if (global.IntlPolyfill) {
    var origAddLocaleData = global.IntlPolyfill.__addLocaleData;
    if (origAddLocaleData && !origAddLocaleData.__anHooked) {
      global.IntlPolyfill.__addLocaleData = function (data, tag) {
        origAddLocaleData(data, tag);
        addLocaleData(data);
      };
      global.IntlPolyfill.__addLocaleData.__anHooked = true;
    }
  } else if (global.Intl) {
    global.IntlPolyfill = {};
    global.IntlPolyfill.__addLocaleData = function (data) {
      addLocaleData(data);
    };
    global.IntlPolyfill.__addLocaleData.__anHooked = true;
  }
};exports.default =

hookLocaleData;module.exports = exports['default'];