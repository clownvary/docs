'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _WebSocketClient = require('./WebSocketClient');var _WebSocketClient2 = _interopRequireDefault(_WebSocketClient);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                    * @module WebSocketService
                                                                                                                                                                                                                    * @description WebSocketService is a singletone service that provide
                                                                                                                                                                                                                    * create/manage websocket instance
                                                                                                                                                                                                                    *
                                                                                                                                                                                                                    * To use WebSocketService, import it from react-base-ui
                                                                                                                                                                                                                    * @example
                                                                                                                                                                                                                    * import WSService from 'react-base-ui/lib/services/websocket';
                                                                                                                                                                                                                    * // setup global config
                                                                                                                                                                                                                    * WSService.setup({ reconnectable,
                                                                                                                                                                                                                    *            heartbeatInterval,
                                                                                                                                                                                                                    *            heartbeatMessage,
                                                                                                                                                                                                                    *            url,
                                                                                                                                                                                                                    *            port,
                                                                                                                                                                                                                    *            isDebug,
                                                                                                                                                                                                                    *            maxSize });
                                                                                                                                                                                                                    *
                                                                                                                                                                                                                    * // getInstance
                                                                                                                                                                                                                    * const ws = WSService.getInstance(); // get the default web socket instance
                                                                                                                                                                                                                    * const wsCustom = WSService.getInstance({ name: 'Custom' }); // get a named web socket instance.
                                                                                                                                                                                                                    * const wsOverrideGlobalConfig = WSService.getInstance({ reconnectable: true, url: 'wss://localhost', port: '5555' }); // override global setting
                                                                                                                                                                                                                    *
                                                                                                                                                                                                                    * // send message
                                                                                                                                                                                                                    * ws.send({ initMessage })
                                                                                                                                                                                                                    *   .then(() => {
                                                                                                                                                                                                                    *     return ws.send({ openCashDrawerMessage }).then((data) => {
                                                                                                                                                                                                                    *       if (data.code) {
                                                                                                                                                                                                                    *         var r = JSON.parse(data);
                                                                                                                                                                                                                    *         if (r.status  == 'success' {
                                                                                                                                                                                                                    *           // successed
                                                                                                                                                                                                                    *         })
                                                                                                                                                                                                                    *
                                                                                                                                                                                                                    *         return Promise.reject(`${r.code}:${r.reason}`);
                                                                                                                                                                                                                    *       }
                                                                                                                                                                                                                    *     })
                                                                                                                                                                                                                    *   })
                                                                                                                                                                                                                    *   .catch((err) => {
                                                                                                                                                                                                                    *     return Promise.reject('fail to send message');
                                                                                                                                                                                                                    *   })
                                                                                                                                                                                                                    *
                                                                                                                                                                                                                    * // close ws
                                                                                                                                                                                                                    * ws.close();
                                                                                                                                                                                                                    *
                                                                                                                                                                                                                    * */var
WebSocketService = function () {

  function WebSocketService() {var _this = this;(0, _classCallCheck3.default)(this, WebSocketService);this.




























    getInstance = function () {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var instanceName = _ref.name,options = (0, _objectWithoutProperties3.default)(_ref, ['name']);
      if (_this.getInstanceCount() >= _this.options.maxSize) {
        throw new Error('instance number exceed the max size ' + _this.maxSize);
      }

      /* istanbul ignore if */
      if (!instanceName) {
        instanceName = _this.DEFAULT_INSTANCE_NAME;
      }

      /* istanbul ignore else */
      if (_this.instances[instanceName] == null) {
        _this.instances[instanceName] = new _WebSocketClient2.default((0, _extends3.default)({},
        _this.options,
        options, {
          removeInstance: function removeInstance() {return _this.removeInstance(instanceName);},
          instanceName: instanceName }));

      }

      return _this.instances[instanceName];
    };this.DEFAULT_INSTANCE_NAME = 'DEFAULTINSTANCENAME';this.instances = {};this.defaultOptions = { heartbeatInterval: 30, reconnectable: true, reconnectRetryCount: 5, isDebug: false, maxSize: 5 };}(0, _createClass3.default)(WebSocketService, [{ key: 'setup', value: function setup(options) {var _ref2 = options || {},url = _ref2.url,port = _ref2.port;if (!(0, _isString2.default)(url) || (0, _isEmpty2.default)(url)) {throw new Error('invalid url.');}if (/[^\d]/.test(port) || (0, _isEmpty2.default)(url)) {throw new Error('invalid port');}this.options = (0, _assign2.default)({}, this.defaultOptions, options);} }, { key: 'getInstanceCount', value: function getInstanceCount()

    {
      return (0, _keys2.default)(this.instances).length;
    } }, { key: 'removeInstance', value: function removeInstance(

    instanceName) {
      if (instanceName && this.instances && instanceName in this.instances) {
        delete this.instances[instanceName];
      }
    } }, { key: 'reset', value: function reset()

    {
      this.options = {};
      this.instances = {};
    } }]);return WebSocketService;}();exports.default =


WebSocketService;module.exports = exports['default'];