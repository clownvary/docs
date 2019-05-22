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

var _types = require('../shared/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  name: _propTypes.string,
  children: _propTypes.node,
  auiTabsAPI: _types.tabsAPIShape
};

var TabsTitle = function TabsTitle(_ref) {
  var name = _ref.name,
      style = _ref.style,
      className = _ref.className,
      children = _ref.children,
      _ref$auiTabsAPI = _ref.auiTabsAPI,
      select = _ref$auiTabsAPI.select,
      getSelected = _ref$auiTabsAPI.getSelected,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['name', 'style', 'className', 'children', 'auiTabsAPI']);

  var selected = name === getSelected();
  var classes = (0, _classnames2.default)({
    active: selected
  }, className);

  return _react2.default.createElement(
    'li',
    { role: 'presentation' },
    _react2.default.createElement(
      'a',
      (0, _extends3.default)({}, rest, {
        className: classes,
        style: style,
        onClick: function onClick() {
          return select(name);
        },
        role: 'tab',
        'aria-selected': selected,
        tabIndex: selected ? '0' : '-1'
      }),
      children
    )
  );
};

TabsTitle.displayName = 'AUITabsTitle';
TabsTitle.propTypes = propTypes;

exports.default = TabsTitle;
module.exports = exports['default'];