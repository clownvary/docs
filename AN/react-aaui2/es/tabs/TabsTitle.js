import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import { string, object, node } from 'prop-types';
import classNames from 'classnames';

import { tabsAPIShape } from '../shared/types';

var propTypes = {
  className: string,
  style: object,
  name: string,
  children: node,
  auiTabsAPI: tabsAPIShape
};

var TabsTitle = function TabsTitle(_ref) {
  var name = _ref.name,
      style = _ref.style,
      className = _ref.className,
      children = _ref.children,
      _ref$auiTabsAPI = _ref.auiTabsAPI,
      select = _ref$auiTabsAPI.select,
      getSelected = _ref$auiTabsAPI.getSelected,
      rest = _objectWithoutProperties(_ref, ['name', 'style', 'className', 'children', 'auiTabsAPI']);

  var selected = name === getSelected();
  var classes = classNames({
    active: selected
  }, className);

  return React.createElement(
    'li',
    { role: 'presentation' },
    React.createElement(
      'a',
      _extends({}, rest, {
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

export default TabsTitle;