'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);
var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _debounce = require('lodash/debounce');var _debounce2 = _interopRequireDefault(_debounce);
var _has = require('lodash/has');var _has2 = _interopRequireDefault(_has);
var _LoadingBar = require('../../components/LoadingBar');var _LoadingBar2 = _interopRequireDefault(_LoadingBar);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Loading = function () {
  function Loading() {var _this = this;var targetElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { wait: 500 };(0, _classCallCheck3.default)(this, Loading);
    if (!targetElement) {
      targetElement = document.body;
    } else if (targetElement && !(0, _isElement2.default)(targetElement)) {
      options = targetElement;
      targetElement = document.body;
    }

    this.tartgetElement = targetElement;
    this.options = options;
    this.wrapperElement = this.tartgetElement.appendChild(document.createElement('div'));
    this.counter = 0;
    this.transactions = {};

    this.hideMe = (0, _debounce2.default)(function () {
      if (_this.counter === 0) {
        _reactDom2.default.unmountComponentAtNode(_this.wrapperElement);
      }
    }, this.options.wait);
  }(0, _createClass3.default)(Loading, [{ key: 'isLoading', value: function isLoading()

    {
      return this.counter > 0;
    } }, { key: 'show', value: function show()

    {
      if (this.counter === 0) {var _options =
        this.options,_options$text = _options.text,text = _options$text === undefined ? '' : _options$text,_options$spinSize = _options.spinSize,spinSize = _options$spinSize === undefined ? 'lg' : _options$spinSize;
        try {
          _reactDom2.default.render(
          _react2.default.createElement(_LoadingBar2.default, { fullScreen: true, text: text, spinSize: spinSize }),
          this.wrapperElement);

        } catch (e) {
          console.error(e);
          this.counter = -1;
        }
      }

      this.counter = this.counter + 1;
      return this;
    } }, { key: 'hide', value: function hide()

    {
      if (this.counter > 0) {
        this.counter = this.counter - 1;

        if (this.counter === 0) {
          this.hideMe();
        }
      }
    } }, { key: 'startTransaction', value: function startTransaction()

    {var _this2 = this;var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      if ((0, _has2.default)(this.transactions, name)) {
        console.warn('Transaction ' + name + ' already exist');
      } else {
        this.transactions[name] = setTimeout(function () {
          var id = _this2.transactions[name];
          if (id) {
            console.warn('Transaction ' + name + ' time out');
            _this2.endTransaction(name);
          }
        }, 30000);
        this.show();
      }
    } }, { key: 'endTransaction', value: function endTransaction(

    name) {
      var id = this.transactions[name];
      if (id) {
        clearTimeout(id);
        delete this.transactions[name];
        this.hide();
      } else {
        console.warn('Transaction ' + name + ' not found');
      }
    } }]);return Loading;}();exports.default =


Loading;module.exports = exports['default'];