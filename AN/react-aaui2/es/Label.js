import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, object, oneOf, node } from 'prop-types';

var Label = function (_PureComponent) {
  _inherits(Label, _PureComponent);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Label.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style,
        type = _props.type,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['className', 'style', 'type', 'children']);

    return React.createElement(
      'span',
      _extends({}, rest, {
        className: 'label label-' + type + ' ' + (className || ''),
        style: style
      }),
      children
    );
  };

  return Label;
}(PureComponent);

Label.displayName = 'AUILabel';
Label.propTypes = {
  className: string,
  style: object, // eslint-disable-line
  type: oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  children: node
};
Label.defaultProps = {
  type: 'info'
};
export default Label;