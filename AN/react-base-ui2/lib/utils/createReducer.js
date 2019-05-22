'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _has = require('lodash/has');var _has2 = _interopRequireDefault(_has);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var defaultErrorHandler = function defaultErrorHandler(state, error) {
  if (error) {
    console.warn(error.message || 'Error happens');
  }

  return state;
};

var createHandler = function createHandler(successHandler, errorHandler) {return function (state, action) {
    successHandler = successHandler || function (s) {return s;};
    errorHandler = errorHandler || defaultErrorHandler;
    return !action.error ? successHandler(state, action) :
    errorHandler(state, action);
  };};exports.default =

function (initialState) {
  var handlers = {};

  var reducer = function reducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;var action = arguments[1];
    var type = action.type;

    if (!handlers[type]) {
      return state;
    }

    return handlers[type](state, action);
  };

  reducer.on = function (actionType, successHandler, errorHandler) {
    if ((0, _has2.default)(handlers, actionType)) {
      console.warn('Action type ' + actionType + ' already in handlers.');
    }

    handlers[actionType] = createHandler(successHandler, errorHandler);
  };

  return reducer;
};module.exports = exports['default'];