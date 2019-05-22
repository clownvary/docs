'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _remove = require('lodash/remove');var _remove2 = _interopRequireDefault(_remove);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Scroll = function () {
  function Scroll() {(0, _classCallCheck3.default)(this, Scroll);
    this.groups = {};
    this.onScroll = this.onScroll.bind(this);
  }(0, _createClass3.default)(Scroll, [{ key: 'addToGroup', value: function addToGroup(

    name, dom) {var keepRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var _this = this;var master = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var onScroll = arguments[4];
      var group = this.groups[name] || [];
      group.push(dom);
      this.groups[name] = group;

      if (master) {
        dom.sync = function () {return _this.onScroll(name, dom, keepRatio, onScroll);};
        dom.addEventListener(
        'scroll',
        dom.sync,
        0);

      }
    } }, { key: 'removeFromGroup', value: function removeFromGroup(

    name, dom) {
      var group = this.groups[name];
      if (group) {
        this.groups[name] = (0, _remove2.default)(group, function (d) {return d === dom;});
        if ((0, _isEmpty2.default)(this.groups[name])) {
          delete this.groups[name];
        }
      }

      dom.removeEventListener(
      'scroll',
      dom.sync,
      0);

    } }, { key: 'onScroll', value: function onScroll(

    name, dom, keepRatio, _onScroll) {
      var group = this.groups[name];

      var scrollX = dom.scrollLeft;
      var scrollY = dom.scrollTop;

      console.log(scrollX);

      var xRate = scrollX / (dom.scrollWidth - dom.clientWidth);
      var yRate = scrollY / (dom.scrollHeight - dom.clientHeight);

      group.forEach(function (otherDom) {
        if (otherDom !== dom) {
          if (keepRatio) {
            scrollX = Math.round(xRate * (otherDom.scrollWidth - otherDom.clientWidth));
          }
          otherDom.scrollLeft = scrollX;

          if (keepRatio) {
            scrollY = Math.round(yRate * (otherDom.scrollHeight - otherDom.clientHeight));
          }
          otherDom.scrollTop = scrollY;
        }
      });
      _onScroll && _onScroll();
    } }, { key: 'getScrollbarSize', value: function getScrollbarSize(

    dom) {
      if (dom.offsetWidth === 0 || dom.offsetHeight === 0) return null;

      var width = dom.offsetWidth - dom.clientWidth;
      var height = dom.offsetHeight - dom.clientHeight;

      width = Math.round(Math.max(0, width));
      height = Math.round(Math.max(0, height));

      return { width: width, height: height };
    } }]);return Scroll;}();exports.default =



Scroll;module.exports = exports['default'];