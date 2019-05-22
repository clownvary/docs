'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _status = require('./consts/status');var _status2 = _interopRequireDefault(_status);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

WebSocketClient = function () {
  function WebSocketClient(_ref) {var _this = this;var instanceName = _ref.instanceName,removeInstance = _ref.removeInstance,options = (0, _objectWithoutProperties3.default)(_ref, ['instanceName', 'removeInstance']);(0, _classCallCheck3.default)(this, WebSocketClient);
    this.resolve = _identity2.default;
    this.reject = _identity2.default;

    this.options = options || {};
    this.retryReconnectCount = 0;
    this.instance = this.buildInstance();

    this.name = instanceName;
    this.removeInstance = removeInstance;

    console.log(this.options.heartbeatInterval, this.options.heartbeatMessage);
    if (this.options.heartbeatInterval > 0 && !(0, _isEmpty2.default)(this.options.heartbeatMessage)) {
      setTimeout(function () {return _this.triggerHeartBeat(_this);}, this.options.heartbeatInterval * 1000);
    }
  }(0, _createClass3.default)(WebSocketClient, [{ key: 'send', value: function send(

    message) {var _this2 = this;var waitForResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (this.instance == null || this.instance.readyState > _status2.default.OPEN) {
        if (this.options.reconnectable) {
          this.retryReconnectCount += 1;
          if (this.retryReconnectCount > this.options.reconnectRetryCount) {
            return _promise2.default.reject('fail to send message: instance is null. ');
          }
          if (this.options.isDebug) {
            console.info('try to reconnect to websocket server');
          }
          this.instance = this.buildInstance();
        } else {
          return _promise2.default.reject('fail to send message: instance is null. ');
        }
      }
      var self = this;
      return new _promise2.default(function (resolve, reject) {
        var promise = _promise2.default.resolve();

        if (_this2.instance.readyState === _status2.default.CONNECTING) {
          promise = new _promise2.default(function (resolve2, reject2) {
            self.reject = reject2;
            self.resolve = resolve2;
          });
        }

        return promise.then(function () {
          self.reject = reject;
          self.resolve = resolve;
          if (_this2.instance.readyState !== _status2.default.OPEN) {
            return self.reject('fail to send message: websocketstatus is ' + _this2.instance.readyState);
          }

          if (_this2.options.isDebug) {
            console.info('try to send message', message);
          }

          if (waitForResult) {
            return self.instance.send(message);
          }

          return self.resolve();
        });
      });
    } }, { key: 'close', value: function close()

    {
      if (this.options.isDebug) {
        console.info('try to close websocket');
      }
      if (this.instance) {
        this.instance.close();
      }
    } }, { key: 'triggerHeartBeat', value: function triggerHeartBeat(

    self) {
      if (self.options.isDebug) {
        console.info('try to send heart beat', new Date());
      }
      self.send(self.options.heartbeatMessage, false).
      then(function () {return setTimeout(
        function () {return self.triggerHeartBeat(self);}, self.options.heartbeatInterval * 1000);});
    } }, { key: 'getStatus', value: function getStatus()

    {
      return this.instance && this.instance.readyState;
    } }, { key: 'buildInstance', value: function buildInstance()

    {var _this3 = this;
      var serverUrl = 'wss://' + this.options.url + ':' + this.options.port + '/websocket';
      if (this.options.isDebug) {
        console.info('websocket server url', serverUrl);
      }
      var instance = new WebSocket(serverUrl);

      instance.onerror = function (evt) {
        if (_this3.options.isDebug) {
          console.error('onerror', evt);
        }
        return _this3.reject(evt.code + ':' + evt.reason);
      };
      instance.onmessage = function (evt) {
        if (_this3.options.isDebug) {
          console.log('onmessage', evt);
        }
        return _this3.resolve('' + evt.data);
      };
      instance.onclose = function (evt) {
        if (_this3.options.isDebug) {
          console.log('onclose', evt);
        }
        _this3.removeInstance();
        return _this3.reject(evt.code + ':' + evt.reason);
      };
      instance.onopen = function (evt) {
        if (_this3.options.isDebug) {
          console.log('onopen', evt);
          console.log('status', instance.readyState);
        }

        _this3.resolve();
      };

      return instance;
    } }]);return WebSocketClient;}(); /* istanbul ignore next */exports.default =


WebSocketClient;module.exports = exports['default'];