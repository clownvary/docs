import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent, cloneElement } from 'react';
import { string, arrayOf, shape, node, any } from 'prop-types';
import classnames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';

var Breadcrumb = function (_PureComponent) {
  _inherits(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Breadcrumb.prototype.render = function render() {
    var _props = this.props,
        data = _props.data,
        className = _props.className,
        children = _props.children,
        divider = _props.divider,
        rest = _objectWithoutProperties(_props, ['data', 'className', 'children', 'divider']);

    return React.createElement(
      'ul',
      _extends({ className: classnames('crumb', className) }, rest),
      data && data.length > 0 ? data.map(function (_ref, index) {
        var text = _ref.text,
            restData = _objectWithoutProperties(_ref, ['text']);

        return React.createElement(
          BreadcrumbItem,
          _extends({ key: index }, restData),
          text
        );
      }) : React.Children.map(children, function (element, index) {
        return cloneElement(element, {
          divider: divider,
          key: index
        });
      })
    );
  };

  return Breadcrumb;
}(PureComponent);

Breadcrumb.propTypes = {
  className: string,
  data: arrayOf(shape({
    text: any.isRequired,
    href: string
  })),
  divider: string,
  children: node
};


export default Breadcrumb;