'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _HAlignment = require('../../../consts/HAlignment');var HAlignment = _interopRequireWildcard(_HAlignment);
var _VAlignment = require('../../../consts/VAlignment');var VAlignment = _interopRequireWildcard(_VAlignment);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}

var mirrorMap = {};
mirrorMap[HAlignment.LEFT] = HAlignment.RIGHT;
mirrorMap[HAlignment.CENTER] = HAlignment.CENTER;
mirrorMap[HAlignment.RIGHT] = HAlignment.LEFT;
mirrorMap[VAlignment.TOP] = VAlignment.BOTTOM;
mirrorMap[VAlignment.MIDDLE] = VAlignment.MIDDLE;
mirrorMap[VAlignment.BOTTOM] = VAlignment.TOP;

var mirror = function mirror(pos) {return mirrorMap[pos];};exports.default =

mirror;module.exports = exports['default'];