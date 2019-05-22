'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);exports.default =



createFSA;var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function createFSA(type) {var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _identity2.default;var metaCreator = arguments[2];
  if (!(0, _isFunction2.default)(payloadCreator)) {
    throw new TypeError('Expected payloadCreator to be a function or undefined, got ' + (typeof payloadCreator === 'undefined' ? 'undefined' : (0, _typeof3.default)(payloadCreator)));
  } else if (metaCreator !== undefined && !(0, _isFunction2.default)(metaCreator)) {
    throw new TypeError('Expected metaCreator to be a function or undefined, got ' + (typeof metaCreator === 'undefined' ? 'undefined' : (0, _typeof3.default)(metaCreator)));
  }

  var actionCreator = function actionCreator() {
    var hasError = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error;
    var action = {
      type: type };

    var payload = hasError ? arguments.length <= 0 ? undefined : arguments[0] : payloadCreator.apply(undefined, arguments);

    if (payload !== undefined) {
      action.payload = payload;
    }
    if (hasError) {
      action.error = true;
    }
    if (metaCreator) {
      action.meta = metaCreator.apply(undefined, arguments);
    }

    return action;
  };

  actionCreator.toString = function () {return type;};

  return actionCreator;
}module.exports = exports['default'];