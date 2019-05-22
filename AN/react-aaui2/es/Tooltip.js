import React from 'react';
import { string, object, node, oneOf } from 'prop-types';

import classNames from 'classnames';

var propTypes = {
  className: string,
  label: string,
  style: object,
  direction: oneOf(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']).isRequired,
  theme: oneOf(['', 'dark', 'light']),
  children: node
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

  var classes = classNames((_classNames = {
    tooltips: true
  }, _classNames['tooltips--' + direction] = true, _classNames['t-' + theme] = theme, _classNames), className);

  return React.createElement(
    'span',
    { className: classes, style: style },
    label,
    React.createElement(
      'span',
      { className: 'tooltips__content', role: 'tooltip' },
      children
    )
  );
};

Tooltip.displayName = 'AUITooltip';
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;