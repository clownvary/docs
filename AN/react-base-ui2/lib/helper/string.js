'use strict';Object.defineProperty(exports, "__esModule", { value: true });var isNullOrEmpty = exports.isNullOrEmpty = function isNullOrEmpty(val) {
  if (val == null) {
    return true;
  }

  if (val === '') {
    return true;
  }

  return false;
};exports.default =

{
  isNullOrEmpty: isNullOrEmpty };