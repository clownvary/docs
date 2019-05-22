'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

reportError = reportError;var _ActionType = require('./consts/ActionType');function reportError(error) {
  return {
    type: _ActionType.BASE_REPORT_ERROR_ACTION,
    payload: error,
    error: true };

}