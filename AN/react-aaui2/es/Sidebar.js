import React from 'react';
import { bool, string, number, object, array, element, oneOfType } from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  className: string,
  style: object,
  data: array,
  links: bool,
  steps: bool,
  active: number,
  past: number,
  priority: string,
  title: string,
  linkElement: oneOfType([string, element])
};

var defaultProps = {
  priority: '5',
  steps: false,
  linkElement: 'a'
};

var Sidebar = function Sidebar(_ref) {
  var className = _ref.className,
      style = _ref.style,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      steps = _ref.steps,
      active = _ref.active,
      past = _ref.past,
      priority = _ref.priority,
      title = _ref.title,
      links = _ref.links,
      A = _ref.linkElement;

  var classes = classNames({
    sidebar: true,
    'sidebar--links': links
  }, className);
  var HeaderElement = 'h' + priority;

  return React.createElement(
    'aside',
    { className: classes, style: style },
    React.createElement(
      HeaderElement,
      null,
      title
    ),
    React.createElement(
      'ul',
      null,
      data.map(function (item, i) {
        var stepNum = steps ? i + 1 + '.' : undefined;
        var linkClasses = classNames({
          active: i === active,
          past: i === past
        });

        return React.createElement(
          'li',
          { key: i },
          React.createElement(
            A,
            { className: linkClasses, href: item.href },
            stepNum,
            ' ',
            item.text
          )
        );
      })
    )
  );
};

Sidebar.displayName = 'AUISidebar';
Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;