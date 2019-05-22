import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import { bool, string, node } from 'prop-types';
import classNames from 'classnames';

var Button = function Button(_ref) {
  var _classNames;

  var noSubmit = _ref.noSubmit,
      loading = _ref.loading,
      type = _ref.type,
      size = _ref.size,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['noSubmit', 'loading', 'type', 'size', 'children', 'className']);

  var classes = classNames((_classNames = {
    btn: true
  }, _classNames['btn-' + type] = type, _classNames['btn--' + size] = size, _classNames['btn--loading'] = loading, _classNames), className);

  return React.createElement(
    'button',
    _extends({}, rest, { type: noSubmit ? 'button' : 'submit', className: classes }),
    loading && React.createElement('i', { className: 'icon-spinner icon--loading' }),
    React.createElement(
      'span',
      null,
      children
    )
  );
};

export default Button;

Button.displayName = 'AUIButton';
Button.propTypes = {
  noSubmit: bool,
  loading: bool,
  type: string,
  size: string,
  className: string,
  children: node
};

Button.defaultProps = {
  noSubmit: false,
  loading: false,
  type: 'secondary'
};