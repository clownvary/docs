'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _DialogBox = require('../../components/DialogBox');var _DialogBox2 = _interopRequireDefault(_DialogBox);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var dialog = function dialog() {var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Dialog';var contentView = arguments[1];var contentProps = arguments[2];var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var instance = _DialogBox2.default.popup({}, (0, _extends3.default)({
    title: title,
    contentView: contentView,
    contentProps: contentProps },
  options));


  return instance.result;
};exports.default =

dialog;module.exports = exports['default'];