'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.responsivePropTypes = exports.withResponsiveProvider = exports.detachResizeEvent = exports.attachResizeEvent = exports.Responsive = undefined;var _Responsive = require('./Responsive');var _Responsive2 = _interopRequireDefault(_Responsive);
var _Provider = require('./components/Provider');var _Provider2 = _interopRequireDefault(_Provider);
var _resizeEvent = require('./resizeEvent');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.





Responsive = _Responsive2.default;exports.
attachResizeEvent = _resizeEvent.attachResizeEvent;exports.
detachResizeEvent = _resizeEvent.detachResizeEvent;exports.
withResponsiveProvider = _Provider2.default;exports.
responsivePropTypes = _Provider.responsivePropTypes;exports.default =


_Responsive2.default.getInstance();