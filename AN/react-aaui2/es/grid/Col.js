import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import classnames from 'classnames';
import { number, string, node } from 'prop-types';

var propTypes = {
  className: string,
  children: node,
  span: number,
  sm: number,
  md: number,
  lg: number
};
var defaultProps = {
  span: 12
};

export default function Col(_ref) {
  var _classnames;

  var children = _ref.children,
      span = _ref.span,
      sm = _ref.sm,
      md = _ref.md,
      lg = _ref.lg,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'span', 'sm', 'md', 'lg', 'className']);

  return React.createElement(
    'div',
    _extends({
      className: classnames('col', (_classnames = {}, _classnames['col-' + span] = span, _classnames['col-sm-' + sm] = sm, _classnames['col-md-' + md] = md, _classnames['col-lg-' + lg] = lg, _classnames), className)
    }, rest),
    children
  );
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;