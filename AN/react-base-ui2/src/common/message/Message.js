import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import MessageType from './consts/MessageType';

/**
 * A class that represents a group of messages.
 */
class Message {
  /**
   * @constructor
   * @param {MessageType} type The message type.
   * @param {string|Array} details
   * A string or array of string that represents each line of the message.
   * @param {String} title The title for this message group.
   * @param {String} id Unique id of this message group.
   * If this id is not specified, a unique id will be generated automatically.
   */
  constructor(type = MessageType.ERROR, details, title = '', id) {
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
    this.id = id || uniqueId('messages_');

    if (!isArray(details) && isString(details)) {
      details = [details];
    }

    /**
     * @property {Array} details
     * A array of string that represents each line of the message.
     * @readonly
     */
    this.details = details;
  }
}

export default Message;
