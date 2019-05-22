import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import { string, object, node, oneOf } from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  className: string,
  style: object,
  direction: oneOf(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']).isRequired,
  theme: oneOf(['', 'dark', 'light']),
  children: node
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
      rest = _objectWithoutProperties(_ref, ['className', 'style', 'direction', 'theme', 'children']);

  var classes = classNames((_classNames = {
    popover: true
  }, _classNames['popover--' + direction] = direction, _classNames['t-' + theme] = theme, _classNames), className);

  return React.createElement(
    'div',
    _extends({ className: classes, style: style }, rest),
    children
  );
};

Popover.displayName = 'AUIPopover';
Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;