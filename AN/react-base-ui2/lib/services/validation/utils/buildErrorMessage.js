'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var buildErrorMessage = function buildErrorMessage(error) {var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var errMsg = error.replace(/{name}/g, fieldName);
  errMsg = errMsg.replace(/{param}/g, param);

  return errMsg;
};exports.



buildErrorMessage = buildErrorMessage;exports.default =


buildErrorMessage;