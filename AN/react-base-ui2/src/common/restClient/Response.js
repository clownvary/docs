import find from 'lodash/find';
import pick from 'lodash/pick';
import normalizeKeys from '../../utils/normalizeKeys';
import * as ResponseCode from './consts/ResponseCode';

const SuccessCodes = pick(ResponseCode, ['SUCCESS', 'NO_RESULT']);

export default class Response {
  static isSuccess(responseCode) {
    const code = find(SuccessCodes, value => value === responseCode);
    return !!code;
  }

  static isSystemError(responseCode) {
    const code = parseInt(responseCode, 10);
    return (code && (code < 1000 || code === 9999));
  }

  static isValidationError(responseCode) {
    const code = parseInt(responseCode, 10);
    return code === 9008;
  }

  constructor(jsonResponse, clientKeys = false) {
    this.rawJson = jsonResponse;

    const headers = jsonResponse.headers || { responseCode: ResponseCode.UNKNOWN_ERROR, responseMessage: '' };
    const body = jsonResponse.body || {};

    this.headers = clientKeys ? normalizeKeys(headers) : headers;
    this.body = clientKeys ? normalizeKeys(body) : body;

    // Quick access to code and message
    this.code = clientKeys ? this.headers.responseCode : this.headers.response_code;
    this.message = clientKeys ? this.headers.responseMessage : this.headers.response_message;

    this.success = Response.isSuccess(this.code);
    this.isSystemError = Response.isSystemError(this.code);
    this.isBusinessError = !this.isSystemError;
    this.isValidationError = Response.isValidationError(this.code);
  }
}

