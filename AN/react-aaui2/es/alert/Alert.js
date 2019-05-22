import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, func, object, node, oneOf } from 'prop-types';
import classNames from 'classnames';

var icons = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  danger: 'times-circle',
  error: 'times-circle',
  info: 'info-circle'
};

var Alert = function (_PureComponent) {
  _inherits(Alert, _PureComponent);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Alert.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        style = _props.style,
        type = _props.type,
        noClose = _props.noClose,
        inverse = _props.inverse,
        onClose = _props.onClose,
        children = _props.children,
        rest = _objectWithoutProperties(_props, ['className', 'style', 'type', 'noClose', 'inverse', 'onClose', 'children']);

    var classes = classNames((_classNames = {
      alert: true
    }, _classNames['alert-' + type] = type, _classNames['alert-' + type + '--inverse'] = type && inverse, _classNames['alert-dismissable'] = !noClose, _classNames), className);

    return React.createElement(
      'div',
      _extends({}, rest, { className: classes, style: style, role: 'alert' }),
      React.createElement('span', { className: 'icon-' + icons[type] }),
      children,
      noClose ? undefined : React.createElement(
        'button',
        { type: 'button', className: 'close', onClick: onClose },
        '\xD7'
      )
    );
  };

  return Alert;
}(PureComponent);

Alert.displayName = 'AUIAlert';
Alert.propTypes = {
  type: oneOf(['success', 'warning', 'danger', 'error', 'info']).isRequired, // `error` is an alias for `danger`
  className: string,
  style: object, // eslint-disable-line
  noClose: bool,
  inverse: bool,
  onClose: func,
  children: node
};
Alert.defaultProps = {
  type: 'info',
  noClose: false,
  inverse: false
};
export default Alert;