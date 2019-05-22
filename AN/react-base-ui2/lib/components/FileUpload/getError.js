'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = function (option, xhr) {
  var msg = 'cannot post ' + option.action + ' ' + xhr.status;
  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
};module.exports = exports['default'];