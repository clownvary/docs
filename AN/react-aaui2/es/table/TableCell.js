import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, func, node } from 'prop-types';

import { noop } from '../shared/utils';

var TableCell = function (_PureComponent) {
  _inherits(TableCell, _PureComponent);

  function TableCell() {
    _classCallCheck(this, TableCell);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  TableCell.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        Tag = _props.tagName,
        children = _props.children,
        onClick = _props.onClick,
        rest = _objectWithoutProperties(_props, ['className', 'tagName', 'children', 'onClick']);

    return React.createElement(
      Tag,
      _extends({ className: className }, rest, { onClick: onClick }),
      children
    );
  };

  return TableCell;
}(PureComponent);

TableCell.propTypes = {
  className: string,
  children: node,
  tagName: string,
  onClick: func
};
TableCell.defaultProps = {
  className: '',
  tagName: 'td',
  onClick: noop
};
export default TableCell;