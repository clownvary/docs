"use strict";Object.defineProperty(exports, "__esModule", { value: true });var addEvent = function addEvent(el, name, cb) {
  if (el.attachEvent) {
    el.attachEvent("on" + name, cb);
  } else {
    el.addEventListener(name, cb);
  }
};exports.default =

addEvent;module.exports = exports['default'];