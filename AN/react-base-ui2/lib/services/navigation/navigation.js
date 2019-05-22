'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _omit = require('lodash/omit');var _omit2 = _interopRequireDefault(_omit);
var _loading = require('../loading');
var _dialog = require('../dialog');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Navigation = function () {

  function Navigation() {(0, _classCallCheck3.default)(this, Navigation);
    this.isRunning = false;
  }(0, _createClass3.default)(Navigation, [{ key: 'exec', value: function exec(

    execFunc, showLoading, showConfirm) {var _this = this;var confirmOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { message: 'Are you sure to leave this page?' };
      var next = function next() {
        if (showLoading) {
          _loading.pageLoading.show();
        }
        _this.setState(true);
        (0, _isFunction2.default)(execFunc) && execFunc();
      };
      if (showConfirm) {
        var options = (0, _omit2.default)(confirmOptions, ['message']);
        (0, _dialog.confirm)(confirmOptions.message, (0, _extends3.default)({
          title: 'Redirect',
          showCancel: true,
          cancelText: 'Cancel',
          confirmText: 'Ok' },
        options)).
        then(function () {
          next();
        });
      } else {
        next();
      }
    } }, { key: 'redirect', value: function redirect(

    url)




    {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { window: null, useReplace: false, showLoading: true, showConfirm: false };var
      useReplace = options.useReplace,optWindow = options.window,showLoading = options.showLoading,showConfirm = options.showConfirm;
      var win = optWindow || window;
      var execFunc = function execFunc() {
        useReplace ? win.location.replace(url) : win.location.href = url;
      };
      this.exec(execFunc, showLoading, showConfirm);
    } }, { key: 'reload', value: function reload()

    {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { window: null, showLoading: true, showConfirm: false };var
      optWindow = options.window,showLoading = options.showLoading,showConfirm = options.showConfirm;
      var win = optWindow || window;
      var execFunc = function execFunc() {win.location.reload();};
      this.exec(execFunc, showLoading, showConfirm, { message: 'Are you sure to reload this page', title: 'Reload' });
    } }, { key: 'getState', value: function getState()

    {
      return this.isRunning;
    } }, { key: 'setState', value: function setState()
    {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.isRunning = state;
    } }]);return Navigation;}();exports.default = Navigation;module.exports = exports['default'];