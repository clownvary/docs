import React, { Component } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { func, number, node, boolean, string } from 'prop-types';
import './index.less';

class Toast extends Component {
  static propTypes = {
    duration: number,
    onClose: func,
    children: node,
    closeIcon: node,
    closable: boolean,
    prefixCls: string
  };

  static defaultProps = {
    onClose() {},
    duration: 1.5,
    closable: true,
    prefixCls: 'an'
  };

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  onClose = () => {
    this.clearCloseTimer();
    this.props.onClose();
  }

  onClick = (e) => {
    isFunction(this.props.onClick) && this.props.onClick(e);
  }

  startCloseTimer = () => {
    const { duration } = this.props;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.onClose();
      }, duration * 1000);
    }
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  render() {
    const { prefixCls, className, closable, style, children, closeIcon } = this.props;
    const componentClass = `${prefixCls}-toast`;
    const toastClassName = classNames(
      componentClass,
      className,
      {
        [`${componentClass}--closable`]: closable
      }
    );
    return (
      <div
        className={toastClassName}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
        onClick={this.onClick}
      >
        <div className={`${componentClass}__content`}>{children}</div>
        {closable &&
          <a tabIndex="0" onClick={this.onClose} className={`${componentClass}__close`}>
            {closeIcon || <span className={`${componentClass}__close__x`} />}
          </a>
        }
      </div>
    );
  }
}


export default Toast;
