"use strict";Object.defineProperty(exports, "__esModule", { value: true });var requestAnimationFrame = window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
function raf(fn) {
    return window.setTimeout(fn, 1000 / 60);
};exports.default =

requestAnimationFrame;module.exports = exports['default'];