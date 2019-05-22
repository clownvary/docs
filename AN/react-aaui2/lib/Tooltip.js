'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  label: _propTypes.string,
  style: _propTypes.object,
  direction: (0, _propTypes.oneOf)(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']).isRequired,
  theme: (0, _propTypes.oneOf)(['', 'dark', 'light']),
  children: _propTypes.node
};

var defaultProps = {
  direction: 'n',
  theme: 'dark'
};

var Tooltip = function Tooltip(_ref) {
  var _classNames;

  var className = _ref.className,
      theme = _ref.theme,
      label = _ref.label,
      direction = _ref.direction,
      style = _ref.style,
      children = _ref.children;

  var classes = (0, _classnames2.default)((_classNames = {
    tooltips: true
  }, _classNames['tooltips--' + direction] = true, _classNames['t-' + theme] = theme, _classNames), className);

  return _react2.default.createElement(
    'span',
    { className: classes, style: style },
    label,
    _react2.default.createElement(
      'span',
      { className: 'tooltips__content', role: 'tooltip' },
      children
    )
  );
};

Tooltip.displayName = 'AUITooltip';
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;
module.exports = exports['default'];