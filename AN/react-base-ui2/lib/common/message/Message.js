'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _MessageType = require('./consts/MessageType');var _MessageType2 = _interopRequireDefault(_MessageType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                           * A class that represents a group of messages.
                                                                                                                                                                                                           */var
Message =
/**
           * @constructor
           * @param {MessageType} type The message type.
           * @param {string|Array} details
           * A string or array of string that represents each line of the message.
           * @param {String} title The title for this message group.
           * @param {String} id Unique id of this message group.
           * If this id is not specified, a unique id will be generated automatically.
           */
function Message() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _MessageType2.default.ERROR;var details = arguments[1];var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var id = arguments[3];(0, _classCallCheck3.default)(this, Message);
  /**
                                                                                                                                                                                                                                                                                                                  * @property {MessageType} type The message type.
                                                                                                                                                                                                                                                                                                                  * @readonly
                                                                                                                                                                                                                                                                                                                  */
  this.type = type;
  /**
                     * @property {string|Array} title The title for this message group.
                     * @readonly
                     */
  this.title = title;

  /**
                       * @property {String} id Unique id of this message group.
                       * @readonly
                       */
  this.id = id || (0, _uniqueId2.default)('messages_');

  if (!(0, _isArray2.default)(details) && (0, _isString2.default)(details)) {
    details = [details];
  }

  /**
     * @property {Array} details
     * A array of string that represents each line of the message.
     * @readonly
     */
  this.details = details;
};exports.default =


Message;module.exports = exports['default'];