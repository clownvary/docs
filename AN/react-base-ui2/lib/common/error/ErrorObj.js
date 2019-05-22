'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _ErrorType = require('./consts/ErrorType');var _ErrorType2 = _interopRequireDefault(_ErrorType);
var _message = require('../message');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                    * Class that represents an error, with consistent structure that will be used across the framework.
                                                                                                                                    */var
ErrorObj = function () {
  /**
                         * @constructor
                         * @param {ErrorType} type The type of the error.
                         * @see ErrorType
                         * @param {String|Array|Message} message The message of this error.
                         * The value can be a string, a array of strings, or a instance of Message.
                         * @param {Object} data Any additional data.
                         */
  function ErrorObj() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ErrorType2.default.APP;var message = arguments[1];var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};(0, _classCallCheck3.default)(this, ErrorObj);
    this.type = type;
    if (message instanceof _message.Message) {
      this.message = message;
    } else {
      this.message = new _message.Message(_message.MessageType.ERROR, message);
    }

    this.data = data;
  }

  /**
     * Detect whether the error object is an exception.
     * @static
     */(0, _createClass3.default)(ErrorObj, null, [{ key: 'isException', value: function isException(
    error) {
      return error instanceof Error;
    }

    /**
       * Detect whether the error object is an instance of ErrorObj.
       * @static
       */ }, { key: 'isErrorObj', value: function isErrorObj(
    error) {
      return error instanceof ErrorObj;
    } }]);return ErrorObj;}();exports.default =


ErrorObj;module.exports = exports['default'];