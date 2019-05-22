'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getContext = function getContext(contextTypes) {
  return function (BaseComponent) {
    var GetContext = function GetContext(props, context) {
      return _react2.default.createElement(BaseComponent, (0, _extends3.default)({}, context, props));
    };

    GetContext.contextTypes = contextTypes;
    GetContext.WrappedComponent = BaseComponent;

    return GetContext;
  };
};

exports.default = getContext;
module.exports = exports['default'];