import ErrorType from './consts/ErrorType';
import { MessageType, Message } from '../message';


/**
 * Class that represents an error, with consistent structure that will be used across the framework.
 */
class ErrorObj {
  /**
   * @constructor
   * @param {ErrorType} type The type of the error.
   * @see ErrorType
   * @param {String|Array|Message} message The message of this error.
   * The value can be a string, a array of strings, or a instance of Message.
   * @param {Object} data Any additional data.
   */
  constructor(type = ErrorType.APP, message, data = {}) {
    this.type = type;
    if (message instanceof Message) {
      this.message = message;
    } else {
      this.message = new Message(MessageType.ERROR, message);
    }

    this.data = data;
  }

  /**
   * Detect whether the error object is an exception.
   * @static
   */
  static isException(error) {
    return error instanceof Error;
  }

  /**
   * Detect whether the error object is an instance of ErrorObj.
   * @static
   */
  static isErrorObj(error) {
    return error instanceof ErrorObj;
  }
}

export default ErrorObj;
