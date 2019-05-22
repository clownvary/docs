import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import classNames from 'classnames';
import { oneOf, bool, number, string, object, node, oneOfType } from 'prop-types';

var propsTypes = {
  className: string,
  fluid: bool,
  gutter: oneOfType([string, number, bool]),
  align: oneOf(['start', 'center', 'end', 'stretch']),
  justify: oneOf(['start', 'center', 'end', 'between', 'around']),
  style: object,
  children: node
};

var defaultProps = {
  fluid: false,
  gutter: true,
  align: 'start',
  justify: 'start',
  style: {}
};

export default function Row(props) {
  var _classNames;

  var fluid = props.fluid,
      justify = props.justify,
      align = props.align,
      className = props.className,
      gutter = props.gutter,
      style = props.style,
      children = props.children,
      rest = _objectWithoutProperties(props, ['fluid', 'justify', 'align', 'className', 'gutter', 'style', 'children']);

  var justifyPrefix = justify === 'between' || justify === 'around' ? 'space-' + justify : justify;

  var boolGutter = typeof gutter === 'boolean';
  var classes = classNames((_classNames = {
    row: !fluid,
    'row-fluid': fluid,
    'row-gutter': boolGutter && !!gutter
  }, _classNames['row-align-' + align] = align, _classNames['row-justify-' + justifyPrefix] = justify, _classNames), className);

  // prettier-ignore
  var rowStyle = !boolGutter && gutter > 0 ? _extends({
    marginLeft: gutter / -2,
    marginRight: gutter / -2
  }, style) : style;
  var cols = React.Children.map(children, function (col) {
    if (!boolGutter && col && col.props && gutter > 0) {
      return React.cloneElement(col, {
        style: _extends({
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2
        }, col.props.style)
      });
    }
    return col;
  });

  return React.createElement(
    'div',
    _extends({ className: classes, style: rowStyle }, rest),
    cols
  );
}

Row.propTypes = propsTypes;
Row.defaultProps = defaultProps;