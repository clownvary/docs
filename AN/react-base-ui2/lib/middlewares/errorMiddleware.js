'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _dialog = require('../services/dialog');
var _message = require('../services/message');
var _error = require('../common/error');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var doConfirm = function doConfirm(title, details) {
  var msgs = details.map(function (line, index) {return _react2.default.createElement('div', { key: index }, line);});
  (0, _dialog.confirm)(msgs, { title: title });
};exports.default =

function () {return function (next) {return function (action) {
      if (!action.error) {
        return next(action);
      }

      var error = action.payload;

      if (_error.ErrorObj.isErrorObj(error)) {
        var title = 'Error';

        switch (error.type) {
          case _error.ErrorType.HTTP:
            title = error.message.title || 'HTTP Error';
            doConfirm(title, error.message.details);
            break;

          case _error.ErrorType.SERVICE:
            title = error.message.title || 'Service Error';
            doConfirm(title, error.message.details);
            break;

          case _error.ErrorType.APP:
            (0, _message.showError)(error.message);
            break;

          default:
            break;}

      }

      return action;
    };};};module.exports = exports['default'];