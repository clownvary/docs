'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  direction: (0, _propTypes.oneOf)(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']).isRequired,
  theme: (0, _propTypes.oneOf)(['', 'dark', 'light']),
  children: _propTypes.node
};

var defaultProps = {
  direction: 'e',
  theme: 'light'
};

var Popover = function Popover(_ref) {
  var _classNames;

  var className = _ref.className,
      style = _ref.style,
      direction = _ref.direction,
      theme = _ref.theme,
      children = _ref.children,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'style', 'direction', 'theme', 'children']);

  var classes = (0, _classnames2.default)((_classNames = {
    popover: true
  }, _classNames['popover--' + direction] = direction, _classNames['t-' + theme] = theme, _classNames), className);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: classes, style: style }, rest),
    children
  );
};

Popover.displayName = 'AUIPopover';
Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

exports.default = Popover;
module.exports = exports['default'];