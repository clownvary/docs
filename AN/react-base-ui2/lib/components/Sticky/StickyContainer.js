'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);



var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _EventEmitter = require('../../common/EventEmitter');var _EventEmitter2 = _interopRequireDefault(_EventEmitter);
var _requestAnimationFrame = require('../../utils/requestAnimationFrame');var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                      * @description
                                                                                                                                                                                                                                                      * Container component used to monitor browser event and post it to child subscribers.
                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                      * @class
                                                                                                                                                                                                                                                      */ /* The MIT License (MIT)
                                                                                                                                                                                                                                                          * FROM  https://github.com/captivationsoftware/react-sticky
                                                                                                                                                                                                                                                          */var StickyContainer = function (_PureComponent) {(0, _inherits3.default)(StickyContainer, _PureComponent);







  function StickyContainer(props) {(0, _classCallCheck3.default)(this, StickyContainer);var _this = (0, _possibleConstructorReturn3.default)(this, (StickyContainer.__proto__ || (0, _getPrototypeOf2.default)(StickyContainer)).call(this,
    props));_this.



















    getContainerNode = function () {return _this.node;};_this.

    addListener = function (handler) {
      _this.emitter.on('scroll/notify', handler);
    };_this.

    removeListener = function (handler) {
      _this.emitter.off('scroll/notify', handler);
    };_this.

    notifyChange = function () {
      if (!_this.framePending) {
        (0, _requestAnimationFrame2.default)(function () {
          _this.framePending = false;var _this$node$getBoundin =
          _this.node.getBoundingClientRect(),top = _this$node$getBoundin.top,bottom = _this$node$getBoundin.bottom;

          _this.emitter.emit('scroll/notify', {
            distanceFromTop: top,
            distanceFromBottom: bottom });

        });
        _this.framePending = true;
      }
    };_this.

    events = [
    'resize',
    'scroll',
    'touchmove',
    'pageshow',
    'load'];_this.emitter = new _EventEmitter2.default();return _this;} /** child context type of Sticky */(0, _createClass3.default)(StickyContainer, [{ key: 'getChildContext', value: function getChildContext() {return { addListener: this.addListener, removeListener: this.removeListener, getContainerNode: this.getContainerNode };} }, { key: 'componentDidMount', value: function componentDidMount() {var _this2 = this;this.events.forEach(function (event) {return window.addEventListener(event, _this2.notifyChange);});} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {var _this3 = this;this.events.forEach(function (event) {return window.removeEventListener(event, _this3.notifyChange);});} }, { key: 'render', value: function render()


    {var _this4 = this;
      return (
        _react2.default.createElement('div', (0, _extends3.default)({},
        this.props, {
          ref: function ref(node) {_this4.node = node;} })));


    } }]);return StickyContainer;}(_react.PureComponent);StickyContainer.childContextTypes = { addListener: _propTypes2.default.func, removeListener: _propTypes2.default.func, getContainerNode: _propTypes2.default.func };exports.default = StickyContainer;module.exports = exports['default'];