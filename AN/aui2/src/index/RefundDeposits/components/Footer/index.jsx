import { string, number, oneOfType, bool, arrayOf, instanceOf } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import capitalizeWording from 'shared/utils/capitalizeWording';
import UIComponent from 'shared/components/UIComponent';
import { messages } from 'shared/consts';
import { Authority } from 'shared/authorities';

import {
  confirmCancelWithRefundOrPay,
  confirmOnlyCancelPermit
} from 'shared/actions/cancelPermit';
import {
  cancelAction,
  validateAction,
  submitAction,
  changeCancelPermitAction,
  updateRefundChargeAmount,
  isDepositAndRentalTotalZero
} from '../../actions/refundDeposits';

import './index.less';

export class Footer extends UIComponent {
  static propTypes = {
    totalRefund: oneOfType([string, number]).isRequired,
    labelTotalRefund: string.isRequired,
    fromCancelPermit: bool.isRequired,
    deposits: arrayOf(instanceOf(Object)),
    rentalFees: arrayOf(instanceOf(Object)),
    permitWording: string.isRequired,
    subTotalRefund: oneOfType([string, number]).isRequired,
    labelSubTotalRefund: string.isRequired,
    refundChargeAmount: oneOfType([string, number]).isRequired,
    refundChargeDesc: string.isRequired,
    cancelPermit: bool.isRequired
  }

  static getSelectedFees = (deposits, rentalFees) =>
    deposits.concat(rentalFees)
      .filter(fee => fee.selected);

  constructor(props) {
    super(props);
    this.state = {
      lastValidRefundAmount: props.refundChargeAmount
    };
  }

  componentWillReceiveProps(nextProps) {
    const { deposits, rentalFees } = nextProps;
    const isPrevDepAndRenTotalZero = isDepositAndRentalTotalZero(
      this.props.deposits, this.props.rentalFees
    );
    const disableRefundChargeAmount = isDepositAndRentalTotalZero(deposits, rentalFees);

    if (disableRefundChargeAmount) {
      this.setState({
        lastValidRefundAmount: '0.00'
      });
    }

    if (isPrevDepAndRenTotalZero && !disableRefundChargeAmount) {
      this.setState({
        lastValidRefundAmount: this.props.defaultRefundChargeAmount
      });
    }
  }

  onSubmit = () => {
    const {
      totalRefund,
      fromCancelPermit,
      cancelPermit,
      deposits,
      rentalFees,
      permitWording
    } = this.props;
    let confirmMsgCode = -1;
    const isNoRefund = Footer.getSelectedFees(deposits, rentalFees).length === 0;
    const capitalizePermitWording = capitalizeWording(permitWording);

    // istanbul ignore else
    if (cancelPermit) {
      /*
        Two Cases:
        1. check cancel permit and with no fees/rental selected
        2. check cancel permit and with fees/rental selected, also refund amount is equal to zero
      */
      // istanbul ignore else
      if (totalRefund === 0) {
        confirmMsgCode = messages.reservationDetails.cancelPermitWithRefundOrPay_Success.code;
        // istanbul ignore else
        if (isNoRefund) {
          confirmMsgCode = messages.reservationDetails.cancelPermitInRD_Success.code;
        }

        let cancelAlert = confirmCancelWithRefundOrPay;
        // istanbul ignore else
        if (isNoRefund) {
          cancelAlert = confirmOnlyCancelPermit;
        }
        return cancelAlert(capitalizePermitWording)
          .then(
            () => this.onConfirmSubmit(
              {
                [messages.messageKey]: confirmMsgCode
              }
            ),
            error => Promise.reject(error)
          );
      }

      if ((totalRefund > 0 || totalRefund < 0) && !fromCancelPermit) {
        return confirmCancelWithRefundOrPay(capitalizePermitWording)
          .then(
            () => this.onConfirmSubmit(),
            error => Promise.reject(error)
          );
      }
    }

    // refund charge or claim charge rendered refund amount to be zero, permit is not cancelled
    // istanbul ignore else
    if (totalRefund === 0) {
      if (!isNoRefund) {
        confirmMsgCode = messages.reservationDetails.refundOrPayWithoutCancel_Success.code;
      } else {
        confirmMsgCode = messages.reservationDetails.refundDeposits_Claim_Success.code;
      }
    }

    return this.onConfirmSubmit({
      [messages.messageKey]: confirmMsgCode
    });
  }

  onConfirmSubmit = reservationDetailPageParams =>
    this.props.validateAction()
      .then(
        () => this.props.submitAction(reservationDetailPageParams),
        error => Promise.reject(error)
      );

  onChangeCancelPermit = () => {
    this.props.changeCancelPermitAction();
  }

  onBlurRefundCharge = (e) => {
    const { subTotalRefund } = this.props;
    const refundChargeAmount = e.target.value;
    const { lastValidRefundAmount } = this.state;

    // istanbul ignore else
    if (refundChargeAmount === lastValidRefundAmount) {
      return false;
    }
    // istanbul ignore else
    if (refundChargeAmount > subTotalRefund) {
      return confirm(
        'Refund charge cannot exceed refund itself.',
        {
          title: 'Refund',
          confirmText: 'OK'
        }
      ).then(
        () => this.props.updateRefundChargeAmount(lastValidRefundAmount)
      );
    }

    this.setState({
      lastValidRefundAmount: refundChargeAmount
    });
    return this.props.updateFeeTaxAndDiscount();
  }

  onChangeRefundChargeAmount = (e) => {
    this.props.updateRefundChargeAmount(e.target.value);
  }

  render() {
    const {
      totalRefund,
      labelTotalRefund,
      labelSubTotalRefund,
      deposits,
      rentalFees,
      refundChargeAmount,
      refundChargeDesc,
      cancelPermit,
      fromCancelPermit,
      permitWording,
      permitCanBeCancelled
    } = this.props;
    const selectedFees = Footer.getSelectedFees(deposits, rentalFees);
    const cancelPermitAuth = {
      disabled: Authority.isDisabled('cancelPermit'),
      hidden: Authority.isHidden('cancelPermit')
    };
    const disableRefundChargeAmount = isDepositAndRentalTotalZero(deposits, rentalFees);

    return (
      <div className="refund-deposit-footer">
        {
          refundChargeDesc && [
            <div className="aaui-flexbox total">
              <span className="total-extra-label">Subtotal to refund</span>
              <span className="total-extra-amount">{labelSubTotalRefund}</span>
            </div>,
            <div className="aaui-flexbox total">
              <span className="total-extra-label">{refundChargeDesc}</span>
              <span className="total-extra-amount aaui-flexbox">
                $
                <InputNumeric
                  className="fee-input"
                  disabled={disableRefundChargeAmount}
                  value={refundChargeAmount}
                  style={{ width: '112px' }}
                  min={0}
                  onValueChange={this.onChangeRefundChargeAmount}
                  onBlur={this.onBlurRefundCharge}
                />
              </span>
            </div>
          ]
        }
        <div className="aaui-flexbox total">
          <span className="total-label">{totalRefund < 0 ? 'CHARGE AMOUNT' : 'REFUND AMOUNT'}</span>
          <span className="total-amount">{labelTotalRefund}</span>
        </div>
        <div className="an-page__placeholder" />
        <div className="an-page__footer fixed">
          <div className="an-page__footer__content">
            <Button onClick={this.props.cancelAction}>
              Cancel
            </Button>
            <div>
              <Checkbox
                disabled={fromCancelPermit}
                checked={fromCancelPermit || cancelPermit}
                onChange={this.onChangeCancelPermit}
                className={(cancelPermitAuth.disabled || cancelPermitAuth.hidden || !permitCanBeCancelled) ? 'u-hidden' : ''}
              >
                Cancel {capitalizeWording(permitWording)}
              </Checkbox>
              <Button
                disabled={!cancelPermit && selectedFees.length === 0}
                onClick={this.onSubmit}
                type="strong"
                className="refund-deposit-footer__proceed"
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  null,
  {
    submitAction,
    validateAction,
    changeCancelPermitAction,
    cancelAction,
    updateRefundChargeAmount
  }
)(Footer);
