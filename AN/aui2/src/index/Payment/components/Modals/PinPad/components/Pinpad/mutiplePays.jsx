import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-base-ui/lib/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import Pinpad from './pinpad';
import PinpadTransactionFail from '../PinpadTransactionFail';
import { showFailActionBtns } from '../../actions/pinpadFail';
import './mutiplePays.less';
import {
  communicatingWithDevice,
  updateErrorMessage,
  updateCurrentPayIndex
} from '../../actions/pinpad';

function packagePays(paysArr, index, paymentErrMsg, communicating) {
  return paysArr.map((pay, key) => {
    const item = Object.assign({}, pay);

    let className = '';

    if (item.swipeSuccess) {
      item.headerHtml = item.successInfo;
      item.className = 'pinpad-success pinpad-collapse';
      return item;
    }

    if (index === key) {
      if (paymentErrMsg) {
        className += ' pinpad-collapse';

        /* istanbul ignore else */
        if (item.hasError) {
          className += ' pinpad-fail';
          item.className = className;
          item.headerHtml = 'No card information';
        }

        return item;
      }

      item.className = 'pinpad-active';
      return item;
    }

    className += ' pinpad-collapse';

    if (item.hasError) {
      className += ' pinpad-fail';
      item.headerHtml = 'No card information';
    }

    if (communicating) {
      className += ' pinpad-disabled';
    }

    item.className = className;
    return item;
  });
}

export class MutiplePays extends UIComponent {
  render() {
    const { pinpad } = this.props;
    const { payment } = pinpad;
    const { errorMessage, pays: paysOrg, currentPayIndex, communicating } = payment.toJS();
    const pays = packagePays(paysOrg, currentPayIndex, errorMessage, communicating);

    return (
      <div className="pinpad-mutiple-pays">
        <div className="pinpad-wrapper">
          {errorMessage ?
            <div className="payment-pinpad-error-wrapper aaui-flexbox payment-credit-debit-error">
              <Alert type="error" className="payment-pinpad-error-alert" noClose>
                <div className="error-content">
                  <div className="payment-pinpad-error-message">
                    <div>{errorMessage}</div>
                  </div>
                </div>
              </Alert>
            </div> : ''
          }
          {pays.map((item, key) => (
            <Pinpad
              key={`pay_${key}`}
              pinpad={pinpad}
              pay={item}
              onClick={() => this.onClick(key, item)}
            />
            ))}
        </div>
        <PinpadTransactionFail pinpad={pinpad} />
      </div>
    );
  }

  onClick(payIndex, payItem) {
    const { pinpad: { payment, pinpadModal } } = this.props;
    const { apdInterfaceApplet } = pinpadModal.toJS();
    const {
      pays,
      communicating,
      currentPayIndex,
      errorMessage,
      debitCardId
    } = payment.toJS();
    const clickPay = pays[payIndex];
    const {
      swipeSuccess,
      paymentTypeId
    } = clickPay;

    if (communicating) {
      return false;
    }

    if (!swipeSuccess) {
      if (currentPayIndex === payIndex) {
        if (payItem.className.indexOf('pinpad-collapse') > -1) {
          setTimeout(() => { // wait the fail action take work
            apdInterfaceApplet.APDInputStart(false, paymentTypeId === debitCardId);
          }, 100);
        }

        return false;
      }

      /* istanbul ignore else */
      if (errorMessage) {
        this.props.updateErrorMessage({
          message: '',
          isServerErr: true
        });
      }

      this.props.showFailActionBtns(false);
      this.props.communicatingWithDevice(true);
      this.props.updateCurrentPayIndex(payIndex);
    }

    return false;
  }
}

export default connect(
  null,
  {
    communicatingWithDevice,
    updateErrorMessage,
    showFailActionBtns,
    updateCurrentPayIndex
  }
)(MutiplePays);
