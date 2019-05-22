import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { addError } from 'shared/actions/Error';

import {
  fetchAccountConfig,
  toggleRequestRefund,
  changeRefundReason,
  changeRefundAccountAmount,
  changeRefundOtherReason
} from '../../../actions/paymentOptions/account';

import { changeRemaining } from '../../../actions';
import { getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import AMIds from '../../../automationIds';
import { fieldProps } from '../../../consts';

import './index.less';

export const OTHER_KEY = 'other';

export class Account extends UIComponent {
  constructor(props) {
    super(props);
    /* istanbul ignore next */
    const { item: { amount } = { amount: 0 } } = this.props;
    this.state = {
      amount
    };
  }

  render() {
    const {
      item,
      value,
      index,
      children,
      optionLen,
      refundConfig
    } = this.props;

    const refundReasons = refundConfig.reasons.data || [];
    const hasError = checkError(item);
    const hasAccountReasonError = checkError(item, 'refundAcountReason');

    refundReasons.push({
      id: OTHER_KEY,
      name: 'Other',
      selected: false,
      description: 'Other',
      text: 'Other',
      value: OTHER_KEY
    });

    return (
      <div>
        <div className="payment-option refund-account">
          <div
            className={classNames(
              'payment-option-list',
              'aaui-flexbox',
              { 'payment-option-list--error': hasError }
            )}
          >
            <div className="aaui-flexbox aaui-flexbox-c1">
              <Dropdown
                data={item.list}
                value={value}
                data-qa-id={AMIds.paymentOption.optionList}
                onChange={({ value: val = -1 }) => { this.props.onChange(val); }}
                disabled={index !== optionLen - 1}
              />
              {
                refundConfig.display ?
                  <Checkbox
                    checked={refundConfig.requestRefund}
                    className="refund-account__request"
                    onClick={() => {
                      hasError && this.props.clearOptionAndPaymentErrs(index);
                      this.props.toggleRequestRefund(!refundConfig.requestRefund);
                    }}
                  >Request refund</Checkbox> : ''
              }
            </div>
            <div className="aaui-flexbox aaui-flexbox-c2">
              <label className="payment-symbol" htmlFor="accountAmount">$</label>
              <InputNumeric
                id="accountAmount"
                data-qa-id={AMIds.paymentOption.optionAmount}
                value={this.state.amount}
                min={0}
                onValueChange={e => this.setState({
                  amount: e.value
                })}
                onBlur={() => this.changeAmountAndRemaining(hasError)}
              />
              {children}
            </div>
          </div>
          {
            refundConfig.requestRefund && refundConfig.display ?
              <div className="refund-account-request aaui-flexbox">
                <label className="refund-account-request__label" htmlFor="accountReason">Reason:</label>
                <div className="refund-account-request__content">
                  <Dropdown
                    id="accountReason"
                    className="refund-account-request__dropdown"
                    placeholder="Choose a reason"
                    data={refundReasons}
                    value={refundConfig.reasons.selected}
                    onChange={({ value: val }) => this.changeRefundReason(val, hasError, index)}
                  />
                  {
                    refundConfig.reasons.selected !== -1 ?
                      <textarea
                        className={classNames(
                          'refund-account-request__other',
                          {
                            'refund-account-request__other--error': hasAccountReasonError
                          }
                        )}
                        errored={hasAccountReasonError}
                        onFocus={() =>
                          hasAccountReasonError && this.props.clearOptionAndPaymentErrs(index)}
                        value={refundConfig.reasons.otherReason}
                        maxLength={300}
                        onChange={
                          e => this.changeRefundOtherReason(e.target.value, hasError, index)
                        }
                      /> : null
                  }
                </div>
              </div>
              :
              null
          }
        </div>
      </div>
    );
  }

  changeRefundReason = (val, hasError, index) => {
    this.props.changeRefundReason(val);
    hasError && this.props.clearOptionAndPaymentErrs(index);
  }

  changeRefundOtherReason = (val, hasError, index) => {
    this.props.changeRefundOtherReason(val);
    hasError && this.props.clearOptionAndPaymentErrs(index);
  }

  changeAmountAndRemaining(hasError) {
    const { index } = this.props;
    let amount = parseFloat(this.state.amount);
    const tempAmount = isNaN(amount) ? 0 : amount;
    if (tempAmount !== amount) {
      amount = tempAmount;
      this.setState({ amount });
    }
    const defaultValue = +getDefaultAmount(index);

    hasError && this.props.clearOptionAndPaymentErrs(index);

    if (amount > defaultValue) {
      amount = defaultValue;
      this.props.addError({
        payload: {
          code: -1,
          message: fieldProps.MAX_AMOUNT_MESSAGE_ON_REFUND
        }
      });
    }

    this.saveCreditCardInfo({ amount, key: index });
  }

  saveCreditCardInfo({ amount, key }) {
    const defaultValue = getDefaultAmount(key);

    const formatAccountAmount = amount.toFixed(2);
    this.setState({ amount: formatAccountAmount });
    this.props.changeRefundAccountAmount({ key, amount: formatAccountAmount, formatAccountAmount });
    const remaining = Math.max((+defaultValue) - (+amount));
    this.props.changeRemaining({ remaining: remaining.toFixed(2) });
  }
}

export default connect(
  null,
  {
    changeRefundAccountAmount,
    fetchAccountConfig,
    changeRemaining,
    toggleRequestRefund,
    changeRefundReason,
    changeRefundOtherReason,
    addError
  }
)(Account);
