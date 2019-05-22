import React from 'react';
import { string, object, node, oneOf } from 'prop-types';
import classNames from 'classnames';

var Pills = function Pills(_ref) {
  var _classNames;

  var className = _ref.className,
      style = _ref.style,
      size = _ref.size,
      children = _ref.children;

  var classes = classNames((_classNames = {
    'btn-group': true
  }, _classNames['btn-group-' + size] = size, _classNames), className);

  return React.createElement(
    'div',
    { className: classes, style: style },
    children
  );
};

Pills.displayName = 'AUIPills';
Pills.propTypes = {
  className: string,
  style: object, // eslint-disable-line
  size: oneOf(['xs', 'sm', 'lg', 'xl']),
  children: node
};

export default Pills;