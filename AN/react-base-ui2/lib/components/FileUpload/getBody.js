"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = function (xhr) {
  var text = xhr.responseText;

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};module.exports = exports['default'];