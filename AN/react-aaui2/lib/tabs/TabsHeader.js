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
  style: _propTypes.object,
  children: _propTypes.node
};

var TabsHeader = function TabsHeader(_ref) {
  var className = _ref.className,
      style = _ref.style,
      children = _ref.children;

  var classes = (0, _classnames2.default)('nav-tabs', className);

  return _react2.default.createElement(
    'ul',
    { className: classes, style: style, role: 'tablist' },
    children
  );
};

TabsHeader.displayName = 'AUITabsHeader';
TabsHeader.propTypes = propTypes;

exports.default = TabsHeader;
module.exports = exports['default'];