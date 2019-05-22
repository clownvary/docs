import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, node } from 'prop-types';

var BreadcrumbItem = function (_PureComponent) {
  _inherits(BreadcrumbItem, _PureComponent);

  function BreadcrumbItem() {
    _classCallCheck(this, BreadcrumbItem);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  BreadcrumbItem.prototype.render = function render() {
    var _props = this.props,
        divider = _props.divider,
        children = _props.children,
        href = _props.href,
        rest = _objectWithoutProperties(_props, ['divider', 'children', 'href']);

    return React.createElement(
      'li',
      rest,
      href != null ? React.createElement(
        'a',
        { href: href },
        children
      ) : React.createElement(
        'span',
        null,
        children
      ),
      React.createElement(
        'span',
        { className: 'crumb__divider' },
        divider
      )
    );
  };

  return BreadcrumbItem;
}(PureComponent);

BreadcrumbItem.propTypes = {
  href: string,
  divider: string,
  children: node.isRequired
};
BreadcrumbItem.defaultProps = {
  divider: '/'
};


export default BreadcrumbItem;