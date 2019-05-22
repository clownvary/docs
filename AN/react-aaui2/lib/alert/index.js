'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapProps = function wrapProps(props) {
  var finalProps = props;

  if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) !== 'object') {
    finalProps = {
      message: props
    };
  }

  return (0, _extends3.default)({}, finalProps);
};

_Alert2.default.success = function (props) {
  return (0, _util.alert)((0, _extends3.default)({
    type: 'success'
  }, wrapProps(props)));
};

_Alert2.default.warning = function (props) {
  return (0, _util.alert)((0, _extends3.default)({
    type: 'warning'
  }, wrapProps(props)));
};

_Alert2.default.error = function (props) {
  return (0, _util.alert)((0, _extends3.default)({
    type: 'danger'
  }, wrapProps(props)));
};

_Alert2.default.info = function (props) {
  return (0, _util.alert)((0, _extends3.default)({
    type: 'info'
  }, wrapProps(props)));
};

_Alert2.default.clear = function () {
  return (0, _util.clear)();
};

exports.default = _Alert2.default;
module.exports = exports['default'];