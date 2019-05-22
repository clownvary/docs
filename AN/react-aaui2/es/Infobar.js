import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, object, func, node } from 'prop-types';

var Infobar = function (_PureComponent) {
  _inherits(Infobar, _PureComponent);

  function Infobar() {
    _classCallCheck(this, Infobar);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Infobar.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        noClose = _props.noClose,
        onClose = _props.onClose;


    return React.createElement(
      'div',
      { className: 'infobar ' + (className || ''), style: style },
      children,
      noClose || React.createElement(
        'button',
        { type: 'button', className: 'close', onClick: onClose },
        '\xD7'
      )
    );
  };

  return Infobar;
}(PureComponent);

Infobar.displayName = 'AUIInfobar';
Infobar.propTypes = {
  className: string,
  style: object, // eslint-disable-line
  children: node,
  noClose: bool,
  onClose: func
};
Infobar.defaultProps = {
  noClose: false
};
export default Infobar;