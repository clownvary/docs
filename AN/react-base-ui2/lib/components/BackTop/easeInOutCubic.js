"use strict";Object.defineProperty(exports, "__esModule", { value: true });var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  var tp = t / (d / 2);
  if (tp < 1) {
    return cc / 2 * tp * tp * tp + b;
  }
  return cc / 2 * ((tp -= 2) * tp * tp + 2) + b;
};exports.default =

easeInOutCubic;module.exports = exports['default'];