import React from 'react';
import trimStart from 'lodash/trimStart';
import isFunction from 'lodash/isFunction';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import UIComponent from 'shared/components/UIComponent';

import './index.less';


export default class AmendmentReasonModal extends UIComponent {
  componentDidUpdate(prevProps) {
    if (!prevProps.shown && this.props.shown) {
      setTimeout(() => { this.textarea.focus(); }, 200);
    }
  }

  onChange = (e) => {
    const { onChange } = this.props;
    if (isFunction(onChange)) {
      onChange(trimStart(e.target.value).substring(0, 300));
    }
  }

  render() {
    const { required, shown, value } = this.props;
    const title = `Enter amendment reason (${required ? 'Required' : 'Optional'})`;

    return (
      <Modal
        className="amendment-modal"
        title={title}
        shown={shown}
        onClose={this.props.onClose}
      >
        <div className="modal-body">
          <textarea
            ref={(el) => { this.textarea = el; }}
            className="input"
            rows={4}
            value={value}
            onChange={this.onChange}
          />
        </div>
        <div className="modal-footer">
          <Button
            type="strong"
            disabled={required && value.length <= 0}
            onClick={this.props.onConfirm}
          >
            OK
          </Button>
        </div>
      </Modal>
    );
  }
}
