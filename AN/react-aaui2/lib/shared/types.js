'use strict';

exports.__esModule = true;
exports.aauiL10nShape = exports.aauiL10nFuncPropTypes = exports.aauiL10nConfigPropTypes = exports.tabsAPIShape = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabsAPIShape = exports.tabsAPIShape = (0, _propTypes.shape)({
  select: _propTypes.func,
  getSelected: _propTypes.func
});

var aauiL10nConfigPropTypes = exports.aauiL10nConfigPropTypes = {
  locale: _propTypes.string,
  messages: _propTypes.object, // eslint-disable-line
  config: _propTypes.object // eslint-disable-line
};

var aauiL10nFuncPropTypes = exports.aauiL10nFuncPropTypes = {
  formatMessage: _propTypes.func,
  parseDateTime: _propTypes.func,
  formatDateTime: _propTypes.func,
  formatCurrency: _propTypes.func,
  subscribe: _propTypes.func
};

var aauiL10nShape = exports.aauiL10nShape = (0, _propTypes.shape)((0, _extends3.default)({}, aauiL10nConfigPropTypes, aauiL10nFuncPropTypes));