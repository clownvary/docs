import { Message, MessageType } from '../../common/message';
import { emitter } from '../../components/MessageBoard';


/**
 * @module Messages
 * @description The module that defines static methods to show or
 * hide informations on Message Board.
 */

let defaultOptions = {
  noDuplicated: true,
  appendMode: false,
  dismissable: false,
  topOnly: true
};

const showService = type =>
  (messages, options = {}) => {
    options = { ...defaultOptions, ...options };
    const msgGroup = messages instanceof Message ? messages : new Message(type, messages);
    msgGroup.type = type;
    emitter.emit('add/notify', msgGroup, options);

    return msgGroup.id;
  };

const clearService = type =>
  messages => emitter.emit('clear/notify', type, messages);

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
export const showSuccess = showService(MessageType.SUCCESS);
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
export const showInfo = showService(MessageType.INFO);
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
export const showWarning = showService(MessageType.WARNING);
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
export const showError = showService(MessageType.ERROR);
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
export const clearSuccess = clearService(MessageType.SUCCESS);
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
export const clearInfo = clearService(MessageType.INFO);
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
export const clearWarning = clearService(MessageType.WARNING);
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
export const clearError = clearService(MessageType.ERROR);
/**
 * @function clearAll
 * @description Clears all the information messages from the message board.
 * @memberof Messages
 * @example
 * import {clearAll} from 'react-base-ui/lib/messages'
 * clearAll();
 */
export const clearAll = clearService();

export const configMessageService = (options) => {
  defaultOptions = Object.assign(defaultOptions, options);
};
