import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { number, string, func, node, oneOf } from 'prop-types';
import classNames from 'classnames';
import Alert from './Alert';

import { noop, omit } from '../shared/utils';
import './AlertBar.less';

var AlertBar = function (_PureComponent) {
  _inherits(AlertBar, _PureComponent);

  function AlertBar() {
    var _temp, _this, _ret;

    _classCallCheck(this, AlertBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      show: false
    }, _this.setRef = function (element) {
      _this.element = element;
    }, _this.handleClose = function () {
      _this.setState({
        show: false
      });

      _this.element && _this.element.addEventListener('animationend', function () {
        _this.props.onClose();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AlertBar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var timeout = this.props.timeout;


    this.animationFrame = setTimeout(function () {
      _this2.setState({
        show: true
      });
    });

    if (timeout) {
      this.timer = setTimeout(function () {
        _this2.setState({
          show: false
        });
      }, timeout);
    }
  };

  AlertBar.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.animationFrame);
    clearTimeout(this.timer);
  };

  AlertBar.prototype.render = function render() {
    var _props = this.props,
        message = _props.message,
        type = _props.type,
        className = _props.className,
        rest = _objectWithoutProperties(_props, ['message', 'type', 'className']);

    var show = this.state.show;

    var classes = classNames({
      'alert-bar': true,
      show: show
    }, className);

    return React.createElement(
      'div',
      { className: classes, ref: this.setRef },
      React.createElement(
        Alert,
        _extends({}, omit(rest, ['timeout']), {
          type: type,
          onClose: this.handleClose
        }),
        React.createElement(
          'span',
          null,
          message
        )
      )
    );
  };

  return AlertBar;
}(PureComponent);

AlertBar.propTypes = {
  timeout: number,
  type: oneOf(['success', 'warning', 'danger', 'error', 'info']),
  onClose: func,
  message: node,
  className: string
};
AlertBar.defaultProps = {
  onClose: noop
};
export default AlertBar;