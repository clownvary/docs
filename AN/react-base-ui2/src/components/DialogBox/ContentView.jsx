import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import SafeText from '../SafeText';

/**
 * Default PropTypes of DialogBox
*/
export const ContentViewPropTypes = {
   /**
   * The callback function that is triggered when click the cancel button.
  */
  onCancel: PropTypes.func,
  /**
   * The callback function that is triggered when click the confirm button.
  */
  onConfirm: PropTypes.func
};

/** Default Props for ContentView */
export const ContentViewDefaultProps = {
  title: 'Confirm',
  message: '',
  cancelText: 'Cancel',
  confirmText: 'OK',
  showCancel: false
};

/** UI component that displays DialogBox with variant settings*/
class ContentView extends React.PureComponent {

  static displayName = 'ContentView';
  static propTypes = ContentViewPropTypes;
  static defaultProps = ContentViewDefaultProps;

  onChange(data) {
    const { onChange } = this.props;
    isFunction(onChange) && onChange(data, this);
  }

  onCancel(data) {
    const { onCancel } = this.props;
    isFunction(onCancel) && onCancel(data, this);
  }

  onConfirm(data) {
    const { onConfirm } = this.props;
    isFunction(onConfirm) && onConfirm(data, this);
  }

  getData() {
    const { value } = this.props;
    return value;
  }

  update() {
  }

  render() {
    const {
      message,
      dangerMode
    } = this.props;

    return (
      <div>
        {
          dangerMode ?
            <SafeText dangerMode={dangerMode} text={message} /> : <div>{ message }</div>
        }
      </div>
    );
  }
}

export default ContentView;
