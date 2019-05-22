import React from 'react';
import { string, object, node } from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  className: string,
  style: object,
  children: node
};

var TabsHeader = function TabsHeader(_ref) {
  var className = _ref.className,
      style = _ref.style,
      children = _ref.children;

  var classes = classNames('nav-tabs', className);

  return React.createElement(
    'ul',
    { className: classes, style: style, role: 'tablist' },
    children
  );
};

TabsHeader.displayName = 'AUITabsHeader';
TabsHeader.propTypes = propTypes;

export default TabsHeader;