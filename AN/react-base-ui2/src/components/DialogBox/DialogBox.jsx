import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import Modal from '../Modal';
import Button from '../Button';
import ContentView from './ContentView';
import { createPopupService } from '../../services/popup';

/**
 * Default PropTypes of DialogBox.
 */
export const DialogBoxPropTypes = {
  /**
   * The callback function that is triggered when click the cancel button.
   */
  onCancel: PropTypes.func,
  /**
   * The callback function that is triggered when click the confirm button.
   */
  onConfirm: PropTypes.func,
  /**
   * Determines dialog title.
   */
  title: PropTypes.string,
  /**
   * Determines dialog content.
   */
  contentView: PropTypes.func,
  /**
   * Determines the props of content view.
   */
  contentProps: PropTypes.object,
  /**
   * Whether to display the cancel button.
   */
  showCancel: PropTypes.bool,
  /**
   * Determines cancel text.
   */
  cancelText: PropTypes.string,
  /**
   * Determines confirm text.
   */
  confirmText: PropTypes.string,

   /**
   * Determines whether to use useDangerouslySetInnerHTML to translate text.
   */
  dangerMode: PropTypes.bool
};

/** Default Props for DialogBox. */
export const DialogBoxDefaultProps = {
  title: 'Dialog',
  cancelText: 'Cancel',
  confirmText: 'OK',
  showCancel: false,
  dangerMode: false
};

/** UI component that displays DialogBox with variant settings.*/
class DialogBox extends React.PureComponent {
  static displayName = 'DialogBox';
  static propTypes = DialogBoxPropTypes;
  static defaultProps = DialogBoxDefaultProps;

  onCancel() {
    this.contentView.onCancel();

    const { onCancel } = this.props;
    if (isFunction(onCancel)) {
      onCancel();
    }
  }

  onConfirm() {
    const data = this.contentView.getData();
    this.contentView.onConfirm(data);

    const { onConfirm } = this.props;
    if (isFunction(onConfirm)) {
      onConfirm(data);
    }
  }

  updateView(props) {
    this.contentView.update(props);
  }

  render() {
    const {
      title,
      contentView,
      contentProps = {},
      className,
      showCancel,
      cancelText,
      confirmText,
      shown,
      dangerMode
    } = this.props;

    const View = contentView || ContentView;

    return (
      <Modal shown={shown} title={title} className={classNames('dialogbox', className)} onClose={() => this.onCancel()} >
        <div className="modal-body">
          <View
            {...contentProps}
            dangerMode={dangerMode}
            ref={(c) => { this.contentView = c; }}
          />
        </div>
        <div className="modal-footer">
          {showCancel ?
            <Button type="secondary" onClick={() => this.onCancel()}>
              {cancelText}
            </Button>
          : ''
          }

          <Button type="strong" onClick={() => this.onConfirm()}>
            {confirmText}
          </Button>
        </div>
      </Modal>
    );
  }
}


const popupService = createPopupService(DialogBox);

/**
 * Popup a Dialog.
 * @function popup
 * @param {object} popupOptions - Configured options of popup service
 * when calling the popup.
 * @param {object} dialogBoxOptions - Configured options of DialogBox
 * when calling the popup.
 * @returns {Promise} Returns a promise, from where we can get the selected date or error.
 */
DialogBox.popup = (popupOptions = {}, dialogBoxOptions = {}) => {
  let popupInstance;

  popupOptions.closeByClick = false;
  popupOptions.closeByEscape = true;
  popupOptions.focus = true;
  dialogBoxOptions.shown = true;
  /* istanbul ignore next */
  dialogBoxOptions.onCancel = () => {
    if (popupInstance) {
      popupInstance.cancel();
    }
  };
  /* istanbul ignore next */
  dialogBoxOptions.onConfirm = (value) => {
    if (popupInstance) {
      popupInstance.change(value);
    }
  };

  popupInstance = popupService.popup(popupOptions, dialogBoxOptions);
  return popupInstance;
};

export default DialogBox;
