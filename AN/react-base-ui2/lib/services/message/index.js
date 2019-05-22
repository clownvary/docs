'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.configMessageService = exports.clearAll = exports.clearError = exports.clearWarning = exports.clearInfo = exports.clearSuccess = exports.showError = exports.showWarning = exports.showInfo = exports.showSuccess = undefined;var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _message = require('../../common/message');
var _MessageBoard = require('../../components/MessageBoard');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                            * @module Messages
                                                                                                                                                            * @description The module that defines static methods to show or
                                                                                                                                                            * hide informations on Message Board.
                                                                                                                                                            */

var defaultOptions = {
  noDuplicated: true,
  appendMode: false,
  dismissable: false,
  topOnly: true };


var showService = function showService(type) {return (
    function (messages) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = (0, _extends3.default)({}, defaultOptions, options);
      var msgGroup = messages instanceof _message.Message ? messages : new _message.Message(type, messages);
      msgGroup.type = type;
      _MessageBoard.emitter.emit('add/notify', msgGroup, options);

      return msgGroup.id;
    });};

var clearService = function clearService(type) {return (
    function (messages) {return _MessageBoard.emitter.emit('clear/notify', type, messages);});};

/**
                                                                                                  * @function showSuccess
                                                                                                  * @description Shows success messages on message board.
                                                                                                  * @param {String|Array|Message} messages -
                                                                                                  * A message string or an array of message strings, each corresponds to a line.
                                                                                                  * @param {Object} [options] - Options that determine the behaviors of the message group.
                                                                                                  * @param {Boolean} [options.appendMode=false] - Appends the messages to the message group.
                                                                                                  * @param {Boolean} [options.noDuplicated=true] -
                                                                                                  * Whether duplicated messages are allowed to displayed.
                                                                                                  * @param {Boolean} [options.dismissable=false] -
                                                                                                  * Whether displaying dismiss button which allows user to close the message group.
                                                                                                  * @param {Boolean} [options.topOnly=true] -
                                                                                                  * Whether only the top most message board is refreshed there exist multiple message boards.
                                                                                                  * @memberof Messages
                                                                                                  * @example
                                                                                                  * import {showSuccess} from 'react-base-ui/lib/messages'
                                                                                                  * showSuccess('Operation successed!');  // Single line
                                                                                                  * showSuccess(['Successed!', 'Your operation is accomplished.']); // Multiple lines
                                                                                                  */
var showSuccess = exports.showSuccess = showService(_message.MessageType.SUCCESS);
/**
                                                                                    * @function showInfo
                                                                                    * @description Shows general information messages on message board.
                                                                                    * @param {String|Array|Message} messages -
                                                                                    * A message string or an array of message strings, or a Message object.
                                                                                    * @param {Object} [options] - Options that determine the behaviors of the message group.
                                                                                    * @param {Boolean} [options.appendMode=false] - Appends the messages to the message group.
                                                                                    * @param {Boolean} [options.noDuplicated=true] -
                                                                                    * Whether duplicated messages are allowed to displayed.
                                                                                    * @param {Boolean} [options.dismissable=false] -
                                                                                    * Whether displaying dismiss button which allows user to close the message group.
                                                                                    * @param {Boolean} [options.topOnly=true] -
                                                                                    * Whether only the top most message board is refreshed there exist multiple message boards.
                                                                                    * @memberof Messages
                                                                                    * @example
                                                                                    * import {showInfo} from 'react-base-ui/lib/messages'
                                                                                    * showInfo('20 minutues to timeout.');  // Single line
                                                                                    * showInfo(['Tips!', 'You have 20 minutes left to use this system.']); // Multiple lines
                                                                                    */
var showInfo = exports.showInfo = showService(_message.MessageType.INFO);
/**
                                                                           * @function showWarning
                                                                           * @description Shows warning messages on message board.
                                                                           * @param {String|Array|Message} messages -
                                                                           * A message string or an array of message strings, each corresponds to a line.
                                                                           * @param {Object} [options] - Options that determine the behaviors of the message group.
                                                                           * @param {Boolean} [options.appendMode=false] - Appends the messages to the message group.
                                                                           * @param {Boolean} [options.noDuplicated=true] -
                                                                           * Whether duplicated messages are allowed to displayed.
                                                                           * @param {Boolean} [options.dismissable=false] -
                                                                           * Whether displaying dismiss button which allows user to close the message group.
                                                                           * @param {Boolean} [options.topOnly=true] -
                                                                           * Whether only the top most message board is refreshed there exist multiple message boards.
                                                                           * @memberof Messages
                                                                           * @example
                                                                           * import {showWarning} from 'react-base-ui/lib/messages'
                                                                           * showWarning('Age above 18 is required!');  // Single line
                                                                           * showWarning(['Warning!', 'Only those above 18 years old are permitted to book this item.']);
                                                                           * // Multiple lines
                                                                           */
var showWarning = exports.showWarning = showService(_message.MessageType.WARNING);
/**
                                                                                    * @function showError
                                                                                    * @description Shows erros messages on message board.
                                                                                    * @param {String|Array|Message} messages -
                                                                                    * A message string or an array of message strings, each corresponds to a line.
                                                                                    * @param {Object} [options] - Options that determine the behaviors of the message group.
                                                                                    * @param {Boolean} [options.appendMode=false] - Appends the messages to the message group.
                                                                                    * @param {Boolean} [options.noDuplicated=true] -
                                                                                    * Whether duplicated messages are allowed to displayed.
                                                                                    * @param {Boolean} [options.dismissable=false] -
                                                                                    * Whether displaying dismiss button which allows user to close the message group.
                                                                                    * @param {Boolean} [options.topOnly=true] -
                                                                                    * Whether only the top most message board is refreshed there exist multiple message boards.
                                                                                    * @memberof Messages
                                                                                    * @example
                                                                                    * import {showError} from 'react-base-ui/lib/messages'
                                                                                    * showError('DB operation failed!');  // Single line
                                                                                    * showError(['Error!', 'Your last DB operation failed.']); // Multiple lines
                                                                                    */
var showError = exports.showError = showService(_message.MessageType.ERROR);
/**
                                                                              * @function clearSuccess
                                                                              * @description Clears the success messages.
                                                                              * @param {String|Array|Message} [messages] -
                                                                              * A message string or an array of message strings to clear.
                                                                              * All messages in the group will be cleared if this parameter is not specified.
                                                                              * @memberof Messages
                                                                              * @example
                                                                              * import {clearSuccess} from 'react-base-ui/lib/messages'
                                                                              * clearSuccess();
                                                                              */
var clearSuccess = exports.clearSuccess = clearService(_message.MessageType.SUCCESS);
/**
                                                                                       * @function clearInfo
                                                                                       * @description Clears the general information messages.
                                                                                       * @param {String|Array|Message} [messages] -
                                                                                       * A message string or an array of message strings to clear.
                                                                                       * All messages in the group will be cleared if this parameter is not specified.
                                                                                       * @memberof Messages
                                                                                       * @example
                                                                                       * import {clearInfo} from 'react-base-ui/lib/messages'
                                                                                       * clearInfo();
                                                                                       */
var clearInfo = exports.clearInfo = clearService(_message.MessageType.INFO);
/**
                                                                              * @function clearWarning
                                                                              * @description Clears the warning information messages.
                                                                              * @param {String|Array|Message} [messages] -
                                                                              * A message string or an array of message strings to clear.
                                                                              * All messages in the group will be cleared if this parameter is not specified.
                                                                              * @memberof Messages
                                                                              * @example
                                                                              * import {clearWarning} from 'react-base-ui/lib/messages'
                                                                              * clearWarning();
                                                                              */
var clearWarning = exports.clearWarning = clearService(_message.MessageType.WARNING);
/**
                                                                                       * @function clearError
                                                                                       * @description Clears the error information messages.
                                                                                       * @param {String|Array|Message} [messages] -
                                                                                       * A message string or an array of message strings to clear.
                                                                                       * All messages in the group will be cleared if this parameter is not specified.
                                                                                       * @memberof Messages
                                                                                       * @example
                                                                                       * import {clearError} from 'react-base-ui/lib/messages'
                                                                                       * clearError();
                                                                                       */
var clearError = exports.clearError = clearService(_message.MessageType.ERROR);
/**
                                                                                 * @function clearAll
                                                                                 * @description Clears all the information messages from the message board.
                                                                                 * @memberof Messages
                                                                                 * @example
                                                                                 * import {clearAll} from 'react-base-ui/lib/messages'
                                                                                 * clearAll();
                                                                                 */
var clearAll = exports.clearAll = clearService();

var configMessageService = exports.configMessageService = function configMessageService(options) {
  defaultOptions = (0, _assign2.default)(defaultOptions, options);
};