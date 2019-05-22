'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _endsWith = require('lodash/endsWith');var _endsWith2 = _interopRequireDefault(_endsWith);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (file, validTypes) {
  if (file && validTypes) {
    var validTypesArray = Array.isArray(validTypes) ?
    validTypes :
    validTypes.split(',');
    var fileName = file.name || '';
    var mimeType = file.type || '';
    var baseMimeType = mimeType.replace(/\/.*$/, '');

    return validTypesArray.some(function (type) {
      var validType = type.trim();
      if (validType.charAt(0) === '.') {
        return (0, _endsWith2.default)(fileName.toLowerCase(), validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
};module.exports = exports['default'];