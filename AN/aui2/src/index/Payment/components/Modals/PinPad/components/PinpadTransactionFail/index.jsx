import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import { clearError } from 'shared/actions/Error';
import UIComponent from 'shared/components/UIComponent';

import {
  cancelCardPayment,
  cardLeaveBlance,
  showFailActionBtns
} from '../../actions/pinpadFail';

import {
  updateErrorMessage,
  gotoNextPage,
  clearPinpadPays
} from '../../actions/pinpad';

import { updateModalTitle, showModal } from '../../actions/pinpadModal';
import { titles } from '../../consts';
import './index.less';

export class PinpadTransactionFail extends UIComponent {
  render() {
    const { pinpadFail, payment } = this.props.pinpad;
    const { shown } = pinpadFail.toJS();
    const { apdPaymentInfo, isNewCard } = payment.toJS();

    let canCancelApdPayment = false;
    let canLeaveBalance = false;
    if (isNewCard) {
      canCancelApdPayment = true;
    } else {
      canCancelApdPayment = apdPaymentInfo.canCancelApdPayment;
      canLeaveBalance = apdPaymentInfo.canLeaveBalance;
    }

    return (
      <div className="pinpad-transaction-fail payment-pinpad-action-btns">
        {shown ?
          <div>
            {canCancelApdPayment ?
              <Button onClick={() => this.cancelPayment()}>Cancel</Button> : ''
            }

            {canLeaveBalance ?
              <Button onClick={() => this.leaveBalance()}>Leave Balance</Button> : ''
            }
          </div> : ''
        }
      </div>
    );
  }

  cancelPayment() {
    const that = this;
    const { pinpad: { payment, pinpadModal } } = that.props;
    const { apdInterfaceApplet } = pinpadModal.toJS();
    const {
      pays,
      batchID,
      receiptID,
      isNewCard
    } = payment.toJS();
    const paysLen = pays.length;

    that.props.clearError();

    that.props.cancelCardPayment({
      batchID,
      receiptID
    }, () => {
      apdInterfaceApplet && apdInterfaceApplet.APDInputEnd && apdInterfaceApplet.APDInputEnd();
      that.props.showModal(false);
      that.props.updateModalTitle(isNewCard ? titles.NEW_CARD_TITLE : titles.TRANSACTION_TITLE);
      that.props.showFailActionBtns(false);
      that.props.clearPinpadPays();
    }, (errorMsg) => {
      if (paysLen > 1) {
        that.props.updateErrorMessage({
          message: errorMsg,
          /*
            When has mutilple device payments and
            cancel the device payment will cause the server error
          */
          isServerErr: true
        });
      } else {
        that.props.updateErrorMessage({
          message: errorMsg
        });
      }
    });
  }

  leaveBalance() {
    const that = this;
    const payment = this.props.pinpad.payment.toJS();
    const {
      pays,
      apdPaymentInfo,
      batchID,
      receiptID
    } = payment;
    const {
      isPayerCashCustomer,
      hasImmediatePaymentDue
    } = apdPaymentInfo;
    const paysLen = pays.length;
    let errMsg = 'Payer is Drop-In customer. Cannot leave balance on account.';

    if (!isPayerCashCustomer && hasImmediatePaymentDue) {
      errMsg = 'Portion of balance is due immediately. Cannot leave balance on account.';
    }

    if (isPayerCashCustomer || hasImmediatePaymentDue) {
      if (paysLen > 1) {
        this.props.updateErrorMessage({
          message: errMsg,
          /*
            When has mutilple device payments and
            choose leave balance function excute fail will cause the server error
          */
          isServerErr: true
        });
      } else {
        this.props.updateErrorMessage({
          message: errMsg
        });
      }

      return false;
    }

    this.props.cardLeaveBlance({
      batchID,
      receiptID
    },
    this.props.gotoNextPage,
    (errorMsg) => {
      if (paysLen > 1) {
        that.props.updateErrorMessage({
          message: errorMsg,
          isServerErr: true
        });
      } else {
        that.props.updateErrorMessage({
          message: errorMsg
        });
      }
    });

    return false;
  }
}

export default connect(
  null,
  {
    cancelCardPayment,
    cardLeaveBlance,
    updateErrorMessage,
    updateModalTitle,
    showFailActionBtns,
    clearError,
    gotoNextPage,
    clearPinpadPays,
    showModal
  }
)(PinpadTransactionFail);
