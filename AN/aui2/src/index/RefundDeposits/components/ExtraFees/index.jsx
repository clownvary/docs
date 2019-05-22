import PropTypes from 'prop-types';
import React from 'react';
import find from 'lodash/find';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import currencyHelper from 'shared/utils/currencyHelper';
import UIComponent from 'shared/components/UIComponent';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import AMIds from '../../automationIds';

import './index.less';

export default class ExtraFees extends UIComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    claimCharges: PropTypes.array.isRequired,
    extraFees: PropTypes.array.isRequired,
    labelTotalCharge: PropTypes.string.isRequired,
    canAddFee: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdateClaimCharge: PropTypes.func.isRequired,
    onUpdateAmount: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };
  /* eslint-disable react/forbid-prop-types */

  static getFeeTotal = (extraFees, extraFeeId) => extraFees
    .filter(fee => fee.id !== extraFeeId)
    .reduce((total, extraFee) => extraFee.amount + total, 0)

  render() {
    const { claimCharges, extraFees, labelTotalCharge, canAddFee, deposits } = this.props;
    const hasDeposits = deposits.length !== 0;

    return (
      <div className="extrafees panel">
        <div className="aaui-flexbox header">
          <h3>Claims</h3>
          <div onClick={canAddFee ? this.props.onCreate : null} className={`addfee link ${canAddFee ? '' : 'disable'}`}>
            <i className="icon icon-plus-circle" /> Add claim fee
          </div>
        </div>
        {
          hasDeposits ?
            <div>
              To deduct or withhold from a deposit, select the following fees.
            </div> :
            <div>
              Claim fees cannot be added when no deposits.
            </div>
        }
        {
          hasDeposits && extraFees && extraFees.length > 0 ?
            <div>
              {this.renderExtraFeesTable(claimCharges, extraFees)}
              <div className="aaui-flexbox extraFees-total">
                <span className="extraFees-total-label">EXTRA FEES TO CLAIM</span>
                <span className="extraFees-total-amount afx-xl-2-16">{labelTotalCharge}</span>
              </div>
            </div>
            : null
        }
      </div>
    );
  }

  renderExtraFeesTable(claimCharges, extraFees) {
    return (
      <div className="extrafeestable">
        <div className="aaui-flexbox extrafeesheader">
          <div>FEE DESCRIPTION</div>
          <div>AMOUNT</div>
        </div>
        {extraFees.map(fee => this.renderRow(claimCharges, fee))}
      </div>
    );
  }

  renderRow(claimCharges, extraFee) {
    const extraFeeId = extraFee.id;
    const extraFeeAmount = extraFee.amount;
    return (
      <div key={`extraFee_${extraFeeId}`} className="extrafeesrow">
        <div className="aaui-flexbox extrafee">
          <div>
            <Dropdown
              data={claimCharges}
              value={extraFee.claimChargeId}
              placeholder={'Choose fee'}
              data-qa-id={AMIds.extraFees.feeDescription}
              onChange={({ value }) => this.onUpdateClaimCharge(extraFeeId, value)}
              style={{ width: '320px' }}
            />
          </div>
          <div className="aaui-flexbox amount">
            <div>$</div>
            <InputNumeric
              value={extraFeeAmount}
              data-qa-id={AMIds.extraFees.amount}
              disabled={!extraFee.canEnterAmount}
              style={{ width: '112px' }}
              min={0}
              onValueChange={(e) => {
                const value = e.value;
                this.props.onUpdateAmount(extraFeeId, value);
              }}
              onBlur={() => this.onBlurFeeAmount(extraFeeId, extraFeeAmount)}
            />
            <i className="icon icon-trash link" onClick={() => this.onDelete(extraFeeId, extraFeeAmount)} />
          </div>
        </div>
        {
          extraFee.tax > 0 ?
            <div className="extrafee-detail">
              <span className="extrafee-detail__label">Tax </span>
              {currencyHelper.formatCurrency(extraFee.tax)}
            </div> : undefined
        }
        {
          extraFee.discount > 0 ?
            <div className="extrafee-detail">
              <span className="extrafee-detail__label">Discount </span>
              {`-${currencyHelper.formatCurrency(extraFee.discount)}`}
            </div> : undefined
        }
      </div>
    );
  }

  resetFeeAmount = (extraFeeId, validAmount) => confirm(
    'There\'s no sufficient deposit to claim.',
    {
      title: 'Refund',
      confirmText: 'OK'
    }
  ).then(
    () => this.props.onUpdateAmount(extraFeeId, validAmount)
  );


  onUpdateClaimCharge = (extraFeeId, claimChargeId) => {
    const { extraFees, claimCharges, totalDeposit } = this.props;
    const otherExtraFeesTotal = ExtraFees.getFeeTotal(extraFees, extraFeeId);
    const currentExtraFee = find(extraFees, extraFee => extraFee.id === extraFeeId);
    const claimCharge = find(claimCharges, cc => cc.id === claimChargeId);
    const claimChargeAmount = claimCharge.claim_charge_amount;

    this.props.onUpdateClaimCharge(extraFeeId, claimChargeId);

    if (totalDeposit - otherExtraFeesTotal < claimChargeAmount) {
      return this.resetFeeAmount(extraFeeId, currentExtraFee.validAmount)
        .then(
          () => this.props.updateFeeTaxAndDiscount({
            extraFeeId
          })
        );
    }

    return this.props.updateFeeTaxAndDiscount({
      extraFeeId
    });
  }

  onBlurFeeAmount = (extraFeeId, extraFeeAmount) => {
    const { extraFees, totalDeposit } = this.props;
    const otherExtraFeesTotal = ExtraFees.getFeeTotal(extraFees, extraFeeId);
    const currentExtraFee = find(extraFees, extraFee => extraFee.id === extraFeeId);

    if (totalDeposit - otherExtraFeesTotal < extraFeeAmount) {
      return this.resetFeeAmount(extraFeeId, currentExtraFee.validAmount);
    }

    return this.props.updateFeeTaxAndDiscount({
      extraFeeId
    });
  }

  onDelete(extraFeeId, extraFeeAmount) {
    this.props.onDelete(extraFeeId);
    /* istanbul ignore else */
    if (extraFeeAmount > 0) {
      this.props.updateFeeTaxAndDiscount();
    }
  }
}
