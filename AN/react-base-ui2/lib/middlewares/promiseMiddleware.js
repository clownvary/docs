'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _isPromise = require('../utils/isPromise');var _isPromise2 = _interopRequireDefault(_isPromise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (_ref) {var dispatch = _ref.dispatch;return function (next) {return function (action) {
      // We wish all actions follow the FSA standard.
      // We will add strict FSA checking here in later time.
      if (!action.payload) {
        return next(action);
      }
      var promise = action.payload.promise || action.payload;
      if (!(0, _isPromise2.default)(promise)) {
        return next(action);
      }

      return promise.then(
      function (result) {
        dispatch((0, _extends3.default)({},
        action, {
          payload: result }));

      }).
      catch(
      function (error) {
        dispatch((0, _extends3.default)({},
        action, {
          payload: error,
          error: true }));

        return _promise2.default.reject(error);
      });
    };};};module.exports = exports['default'];