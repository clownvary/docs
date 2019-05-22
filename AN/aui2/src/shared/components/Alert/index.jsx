import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import noop from 'lodash/noop';

export default class Alert extends UIComponent {

  static isFunc = func => typeof func === 'function' && func;

  constructor(props) {
    super(props);
    this.state = { shown: props.shown || false };
  }

  render() {
    const { title, children, cancelText = 'Cancel', confirmText = 'OK', className, disable, disableConfirm, type = 'confirm' } = this.props;
    return (
      <Modal
        className={`modal--alert ${className}`}
        title={title}
        shown={this.state.shown}
        onClose={this.onClose}
      >
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {
            type === 'confirm' &&
            <Button className={`${disable ? 'u-hidden' : ''}`} type="secondary" onClick={this.onCancel}>{cancelText}</Button>
          }
          <Button
            className={`${disable ? 'u-hidden' : ''}`}
            type="strong"
            onClick={this.onConfirm}
            disabled={disableConfirm}
          >{confirmText}</Button>
        </div>
      </Modal>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shown !== this.props.shown) {
      this.setState({
        shown: nextProps.shown
      });
    }
  }

  onCancel = () => {
    const newState = {
      shown: false
    };
    const onCancel = Alert.isFunc(this.props.onCancel) || noop;

    this.setState(newState, onCancel);
  }

  onClose = () => {
    const newState = {
      shown: false
    };
    /* istanbul ignore next */
    const onClose = Alert.isFunc(this.props.onClose) || noop;

    this.setState(newState, onClose);
  }

  onConfirm = () => {
    const newState = {
      shown: false
    };
    const onConfirm = Alert.isFunc(this.props.onConfirm);

    if (onConfirm) {
      onConfirm(() => {
        this.setState(newState, noop);
      });
    } else {
      this.setState(newState, noop);
    }
  }

  open = () => {
    const newState = {
      shown: true
    };
    const onOpen = Alert.isFunc(this.props.onOpen) || noop;

    this.setState(newState, onOpen);
  }
}

Alert.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  className: PropTypes.string,
  disable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  type: PropTypes.string,
  disableConfirm: PropTypes.bool
};
