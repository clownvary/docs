'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _types = require('../shared/types');

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  name: _propTypes.string,
  children: _propTypes.node,
  auiTabsAPI: _types.tabsAPIShape
};

var handleKeyDown = function handleKeyDown(e) {
  e.persist();
  switch (e.keyCode) {
    case _keyCodes2.default.LEFTARROW:
    case _keyCodes2.default.RIGHTARROW:
      e.stopPropagation();
      break;
    default:
      break;
  }
};

var TabsContainer = function TabsContainer(_ref) {
  var className = _ref.className,
      style = _ref.style,
      name = _ref.name,
      children = _ref.children,
      getSelected = _ref.auiTabsAPI.getSelected;

  var classes = (0, _classnames2.default)({
    'u-hidden': name !== getSelected()
  }, className);

  return _react2.default.createElement(
    'div',
    {
      className: classes,
      style: style,
      role: 'tabpanel',
      'aria-hidden': name !== getSelected(),
      onKeyDown: handleKeyDown
    },
    children
  );
};

TabsContainer.displayName = 'AUITabsContainer';
TabsContainer.propTypes = propTypes;

exports.default = TabsContainer;
module.exports = exports['default'];