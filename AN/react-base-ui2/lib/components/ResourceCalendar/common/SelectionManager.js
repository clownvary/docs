'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);
var _dom = require('../../../utils/dom');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

SelectionManager = function () {
  function SelectionManager(el) {(0, _classCallCheck3.default)(this, SelectionManager);
    this.element = el || document;
    this.activeSeg = null;
  }(0, _createClass3.default)(SelectionManager, [{ key: 'select', value: function select(

    seg) {
      this.clear();
      this.activeSeg = seg;
      var nodes = this.element.querySelectorAll('div[data-event-id="' + seg.eventKey + '"]');
      (0, _dom.addClass)(nodes, 'seg-active');
    } }, { key: 'clear', value: function clear()

    {
      this.activeSeg = null;
      var nodes = this.element.querySelectorAll('.seg-active');
      (0, _dom.removeClass)(nodes, 'seg-active');
    } }]);return SelectionManager;}();exports.default =



new SelectionManager();module.exports = exports['default'];