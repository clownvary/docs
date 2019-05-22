import React, { Component } from 'react';
import { string, number, node } from 'prop-types';
import ReactDOM from 'react-dom';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';
import Toast from './Toast';
import Position from './Position';

const defaultToastsPropTypes = {
  prefixCls: string,
  maxCount: number,
  closeIcon: node,
  className: string,
  position: string,
  zIndex: number
};

const defaultToastsProps = {
  prefixCls: 'an',
  position: Position.TOP
};

class Toasts extends Component {
  static displayName = 'Toasts';
  static propTypes = defaultToastsPropTypes;
  static defaultProps = defaultToastsProps;

  static create = (properties) => {
    const { container, ...props } = properties;
    const div = document.createElement('div');

    container.appendChild(div);

    let called = false;
    return new Promise((resolve) => {
      function ref(toaster) {
        if (called) {
          return;
        }
        called = true;
        resolve({
          show(noticeProps = {}) {
            toaster.add(noticeProps);
          },
          hide(key) {
            toaster.remove(key);
          },
          component: toaster,
          clear() {
            ReactDOM.unmountComponentAtNode(div);
            div.parentNode.removeChild(div);
          }
        });
      }

      const toastsProps = { ...defaultToastsProps, ...props };

      ReactDOM.render(<Toasts {...toastsProps} ref={ref} />, div);
    });
  }

  state = {
    notices: []
  };

  getPositionClasses = () => {
    const { position, prefixCls } = this.props;
    const positions = position.split('-');

    return positions.map(p => `${prefixCls}-toast-wrapper--${p.toLowerCase()}`);
  }

  add = (notice) => {
    const key = notice.key = notice.key || uniqueId();
    const { maxCount } = this.props;
    this.setState((previousState) => {
      const notices = previousState.notices;
      const noticeIndex = notices.map(v => v.key).indexOf(key);
      const updatedNotices = notices.concat();
      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, notice);
      } else {
        if (maxCount && notices.length >= maxCount) {
          // XXX, use key of first item to update new added (let React to move exsiting
          // instead of remove and mount). Same key was used before for both a) external
          // manual control and b) internal react 'key' prop , which is not that good.
          notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
          updatedNotices.shift();
        }
        updatedNotices.push(notice);
      }
      return {
        notices: updatedNotices
      };
    });
  }

  remove = (key) => {
    this.setState(
      previousState => ({
        notices: previousState.notices.filter(notice => notice.key !== key)
      })
    );
  }

  onClose = (notice) => {
    this.remove(notice.key);
    isFunction(notice.onClose) && notice.onClose();
  }

  render() {
    const { className, prefixCls, style, closeIcon, position, zIndex, children } = this.props;
    const { notices } = this.state;
    const toasts = children || notices.map((notice, index) => {
      const update = Boolean(index === notices.length - 1 && notice.updateKey);
      const key = notice.updateKey ? notice.updateKey : notice.key;


      return (<Toast
        prefixCls={prefixCls}
        key={key}
        update={update}
        onClose={() => this.onClose(notice)}
        onClick={notice.onClick}
        closeIcon={closeIcon}
        {...notice}
      >
        {notice.content}
      </Toast>);
    });
    const toastsClassName = classnames(
      `${prefixCls}-toast-wrapper`,
      className,
      this.getPositionClasses(position)
    );

    if (!isUndefined(zIndex)) {
      style.zIndex = zIndex;
    }

    return (
      <div className={toastsClassName} style={style}>
        {toasts}
      </div>
    );
  }
}

export default Toasts;
