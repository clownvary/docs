import React from 'react';
import { string, object, node } from 'prop-types';
import classNames from 'classnames';

import { tabsAPIShape } from '../shared/types';
import KEY_CODES from '../shared/keyCodes';

var propTypes = {
  className: string,
  style: object,
  name: string,
  children: node,
  auiTabsAPI: tabsAPIShape
};

var handleKeyDown = function handleKeyDown(e) {
  e.persist();
  switch (e.keyCode) {
    case KEY_CODES.LEFTARROW:
    case KEY_CODES.RIGHTARROW:
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

  var classes = classNames({
    'u-hidden': name !== getSelected()
  }, className);

  return React.createElement(
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

export default TabsContainer;