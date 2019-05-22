import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import { confirm } from 'react-base-ui/lib/services/dialog';

import UIComponent from 'shared/components/UIComponent';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import { cancelReceiptAsyncAction } from 'shared/actions/receipt';
import { confirmCancelWithRefundOrPay } from 'shared/actions/cancelPermit';
import capitalizeWording from 'shared/utils/capitalizeWording';
import {
  pay,
  payActionCache,
  submitBtnMap,
  saveModifiedPaymentPlan
} from '../../actions/paymentFooter';
import './index.less';

export class PaymentFooter extends UIComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    payment: PropTypes.object.isRequired
  }
  /* eslint-enable react/forbid-prop-types */
  render() {
    return (
      <div className="payment-footer">
        {this.renderFooter()}
      </div>
    );
  }

  alertPaymentMethod = () => {
    const option = {
      title: 'System Message',
      className: 'payment-method-exception-alert',
      confirmText: 'OK'
    };
    const message = 'Please select a payment method.';
    return confirm(message, option);
  }

  renderFooter() {
    const { payment, paymentAction } = this.props;
    const isRefund = payment.get('isRefund');
    const sourcePageIndex = payment.get('sourcePageIndex');
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    const isSelectMakeAPayment = paymentAction.get('isSelectMakeAPayment');

    /* eslint-disable */
    switch (sourcePageIndex) {
      case pages.cartPage:
        return this.renderPaymentFooter();
      case pages.permitDetailPage:
        if (isRefund) {
          payActionCache.submitBtn = submitBtnMap.refund;
          return this.renderRefundFooter();
        }
        return this.renderPaymentFooter();
      case pages.reservationDetailPage:
      case pages.refundDepositsPage:
        if (isRefund) {
          payActionCache.submitBtn = submitBtnMap.refund;
          return this.renderRefundFooter();
        }
        if (isSelectModifyPaymentPlan) {
          payActionCache.submitBtn = submitBtnMap.modifyPaymentPlan;
          return this.renderModifyPaymentPlanFooter();
        }
        if (isSelectMakeAPayment) {
          payActionCache.submitBtn = submitBtnMap.makeAPayment;
          return this.renderMakePaymentFooter();
        }

        return this.renderPaymentFooter();
      default:
        break;
    }
    /* eslint-enable */
    return '';
  }

  renderPaymentFooter() {
    const { successPay, remaining } = this.props.payment.toJS();
    const { permitWording, cancelPermit } = this.props.initialData;
    const PaymentTitle = (cancelPermit && `Cancel ${capitalizeWording(permitWording)} and ${payActionCache.submitBtn}`) ||
      payActionCache.submitBtn;

    return (
      <div className="payment-footer-split">
        {remaining > 0 ?
          <p className="payment-remaining">Remaining balance<span>${remaining}</span></p> : ''
        }
        <div className="an-page__footer fixed">
          <div className="an-page__footer__content">
            <Button
              disabled={successPay}
              onClick={() => this.back(successPay)}
            >Back</Button>
            <Button
              disabled={remaining > 0}
              type="strong"
              onClick={() => this.paynow(remaining)}
            >{ PaymentTitle }</Button>
          </div>
        </div>
        <div className="an-page__placeholder" />
      </div>
    );
  }

  renderRefundFooter() {
    const { successPay, remaining } = this.props.payment.toJS();
    const { permitWording, cancelPermit } = this.props.initialData;

    const refundTitle = (cancelPermit && `Cancel ${capitalizeWording(permitWording)} and ${payActionCache.submitBtn}`) ||
      payActionCache.submitBtn;

    return (
      <div className="payment-footer-split">
        {remaining > 0 ?
          <p className="payment-remaining">Remaining amount<span>${remaining}</span></p> : ''
        }
        <div className="an-page__footer fixed">
          <div className="an-page__footer__content">
            <Button
              disabled={successPay}
              onClick={() => this.back(successPay)}
            >Back</Button>
            <Button
              disabled={remaining > 0}
              type="strong"
              onClick={() => this.paynow(remaining)}
            >{ refundTitle }</Button>
          </div>
        </div>
        <div className="an-page__placeholder" />
      </div>
    );
  }

  renderMakePaymentFooter() {
    const { successPay, remaining } = this.props.payment.toJS();
    const isHasBalance = this.props.paymentSummary.get('hasBalance');
    const backBtnText = isHasBalance ? 'Cancel' : 'Back';

    return (
      <div className="payment-footer-split">
        {remaining > 0 ?
          <p className="payment-remaining">Remaining balance<span>${remaining}</span></p> : ''
        }
        <div className="an-page__footer fixed">
          <div className={`an-page__footer__content ${isHasBalance ? '' : 'u-justify-content-start'}`}>
            <Button
              disabled={successPay}
              onClick={() => this.backOrCancelMakeAPayment(isHasBalance, successPay)}
            >{ backBtnText }</Button>
            { isHasBalance && <Button
              disabled={remaining > 0}
              type="strong"
              onClick={() => this.makePaymentOnModification(remaining)}
            >{ payActionCache.submitBtn }</Button> }
          </div>
        </div>
        <div className="an-page__placeholder" />
      </div>
    );
  }

  renderModifyPaymentPlanFooter() {
    const isHasBalance = this.props.paymentSummary.get('hasBalance');
    const backBtnText = isHasBalance ? 'Cancel' : 'Back';

    return (
      <div className="payment-footer-split">
        <div className="an-page__footer fixed">
          <div className={`an-page__footer__content ${isHasBalance ? '' : 'u-justify-content-start'}`}>
            <Button
              onClick={() => this.cancelModifyPaymentPlan()}
            >{ backBtnText }</Button>
            { isHasBalance && <Button
              type="strong"
              onClick={() => this.savePaymentPlanOnModification()}
            >{ payActionCache.submitBtn }</Button> }
          </div>
        </div>
        <div className="an-page__placeholder" />
      </div>
    );
  }

  back(isBackBtnDisabled) {
    const { payment, initialData } = this.props;
    const {
      receiptEntryID,
      draftReceiptID,
      draftReceiptEntryID,
      batchID,
      receiptID,
      permitID
    } = initialData;
    const sourcePageIndex = payment.get('sourcePageIndex');
    const isPaymentActionValid = payment.get('isPaymentActionValid');
    const fromCancelPermit = payment.get('fromCancelPermit');

    if (isBackBtnDisabled) {
      return false;
    }

    let backUrl = '';
    let isCancelReceipt = false;

    switch (sourcePageIndex) {
      case pages.cartPage:
        backUrl = pages.buildUrl(pages.cartPage, {
          batch_id: batchID,
          receipt_id: receiptID,
          receipt_entry_id: receiptEntryID
        });
        break;
      case pages.permitDetailPage:
        backUrl = pages.buildUrl(pages.permitDetailPage, {
          permit_id: permitID,
          batch_id: batchID,
          receipt_id: draftReceiptID,
          receipt_entry_id: draftReceiptEntryID
        });
        break;
      case pages.reservationDetailPage:
        if (!isPaymentActionValid) {
          isCancelReceipt = true;
        }
        backUrl = pages.buildUrl(pages.reloadReservationDetailPage, {
          permit_id: permitID,
          batch_id: batchID,
          receipt_id: isPaymentActionValid ? receiptID : draftReceiptID
        });
        break;
      case pages.refundDepositsPage:
        isCancelReceipt = true;
        backUrl = pages.buildUrl(pages.refundDepositsPage, {
          permit_id: permitID,
          batch_id: batchID,
          receipt_id: draftReceiptID,
          [pages.cancelPermit]: fromCancelPermit
        });
        break;
      default:
        backUrl = '';
        break;
    }
    /* istanbul ignore else */
    if (backUrl !== '') {
      if (isCancelReceipt) {
        return this.props.cancelReceiptAsyncAction(batchID, receiptID, false)
          .then(() => {
            this.props.redirect(backUrl);
          });
      }

      return this.props.redirect(backUrl);
    }

    return false;
  }

  needPaymentMethod() {
    const { isRefund, payNow } = this.props.payment.toJS();
    return !isRefund && parseFloat(payNow, 10) > 0;
  }

  paynow(remaining) {
    if (remaining > 0) return false;

    const { permitWording } = this.props.initialData;
    const { fromCancelPermit } = this.props.payment.toJS();
    if (this.needPaymentMethod() && this.props.paymentMethodIsEmpty) {
      return this.alertPaymentMethod();
    }

    if (fromCancelPermit) {
      return confirmCancelWithRefundOrPay(capitalizeWording(permitWording))
        .then(
          () => this.props.pay(),
          error => Promise.reject(error)
        );
    }

    return this.props.pay();
  }

  makePaymentOnModification(remaining) {
    if (remaining > 0) return false;

    if (this.needPaymentMethod() && this.props.paymentMethodIsEmpty) {
      return this.alertPaymentMethod();
    }

    return this.props.pay();
  }

  backOrCancelMakeAPayment(isHasBalance, isBackBtnDisabled) {
    if (!isHasBalance || !isBackBtnDisabled) {
      return this.back(isBackBtnDisabled);
    }

    return false;
  }

  cancelModifyPaymentPlan() {
    this.back();
  }

  savePaymentPlanOnModification() {
    return this.props.saveModifiedPaymentPlan();
  }
}


export default connect(
  null,
  {
    redirect,
    pay,
    saveModifiedPaymentPlan,
    cancelReceiptAsyncAction
  }
)(PaymentFooter);
