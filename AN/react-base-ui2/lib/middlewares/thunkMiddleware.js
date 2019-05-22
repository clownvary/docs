'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _loading = require('../services/loading');
var _isPromise = require('../utils/isPromise');var _isPromise2 = _interopRequireDefault(_isPromise);
var _error = require('./actions/error');
var _error2 = require('../common/error');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createThunkMiddleware(extraArgument) {
  return function (_ref) {var dispatch = _ref.dispatch,getState = _ref.getState;return function (next) {return function (action) {
        if (typeof action === 'function') {
          var result = action(dispatch, getState, extraArgument);

          if ((0, _isPromise2.default)(result)) {
            return result.catch(function (error) {
              if (!error.processed) {
                /* istanbul ignore if */
                if (_loading.pageLoading.isLoading()) {
                  _loading.pageLoading.hide();
                }
                /* istanbul ignore if */
                if (_error2.ErrorObj.isErrorObj(error)) {
                  dispatch((0, _error.reportError)(error));
                }
                error.processed = true;
              }
              return _promise2.default.reject(error);
            });
          }

          return result;
        }

        return next(action);
      };};};
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;exports.default =

thunk;module.exports = exports['default'];