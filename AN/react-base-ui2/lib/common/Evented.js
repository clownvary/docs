'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _EventEmitter = require('./EventEmitter');var _EventEmitter2 = _interopRequireDefault(_EventEmitter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Evented = function () {
  function Evented() {var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Evented';(0, _classCallCheck3.default)(this, Evented);
    this.emitter = new _EventEmitter2.default(prefix);
  }

  /**
     * Attach event handler
     * @param {string} event Event name
     * @param {function} fn Handler function
     * @param {object} context Calling context
     */(0, _createClass3.default)(Evented, [{ key: 'on', value: function on(
    event, fn, context) {
      this.emitter.on(event, fn, context);
    } }, { key: 'off', value: function off(

    event, fn, context) {
      this.emitter.off(event, fn, context);
    } }, { key: 'triggerEvent', value: function triggerEvent(

    name, param) {
      this.emitter.emit('change', param);
    } }]);return Evented;}();exports.default =



Evented;module.exports = exports['default'];