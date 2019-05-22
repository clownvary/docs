import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Input from 'react-base-ui/lib/components/Input';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

import Dropdown from 'react-base-ui/lib/components/Dropdown';
import UIComponent from 'shared/components/UIComponent';
import { confirm } from 'react-base-ui/lib/services/dialog';
import { getRemaining, getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import { changeCheckAmount, updateCheckNumber } from '../../../actions/paymentOptions/check';
import { changeRemaining } from '../../../actions';
import AMIds from '../../../automationIds';

import { fieldProps } from '../../../consts';

import './index.less';

let confirmCallback = () => { };

/* eslint-disable class-methods-use-this */
export class Check extends UIComponent {
  constructor(props) {
    super(props);
    this.state = { alertMessage: '' };
  }

  render() {
    const { item, value, index, children, optionLen,
      isRefund, hasManuallySplitOption } = this.props;

    const hasError = checkError(item);
    const hasCheckNumberError = checkError(item, 'checkNumber');

    return (
      <div className="payment-option payment-check">
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
              ref={(input) => { this._searchInput = input; }}
              data-qa-id={AMIds.paymentOption.optionList}
              onChange={({ value: val }) => { this.props.onChange(val); }}
              disabled={index !== optionLen - 1 && hasManuallySplitOption}
            />
            {isRefund ? null : <Input
              name="checkNumber"
              className="payment-check-number"
              errored={hasCheckNumberError}
              data-qa-id={AMIds.paymentOption.checkNumber}
              defaultValue={item.checkNumber}
              onFocus={() => hasCheckNumberError && this.props.clearOptionAndPaymentErrs(index)}
              onBlur={e => this.updateCheckNumber(e, hasError)}
              maxLength={50}
              placeholder={`Enter ${item.list.filter(i => i.value === value)[0].name} number`}
            />}
          </div>
          <div className="aaui-flexbox aaui-flexbox-c2">
            <label className="payment-symbol" htmlFor="checkAmount">$</label>
            <InputNumeric
              id="checkAmount"
              value={item.amount}
              ref={(inputNumeric) => { this._amountInput = inputNumeric; }}
              data-qa-id={AMIds.paymentOption.optionAmount}
              min={0}
              onBlur={() => this.changeAmountAndRemaining(hasError)}
            />
            {children}
          </div>
        </div>
      </div>
    );
  }

  onConfirm(pConfirmCallback) {
    pConfirmCallback && typeof pConfirmCallback === 'function' && pConfirmCallback();
  }

  updateCheckNumber(e, hasError) {
    const optionIndex = this.props.index;

    hasError && this.props.clearOptionAndPaymentErrs(optionIndex);

    this.props.updateCheckNumber({
      checkNumber: e.target.value,
      key: optionIndex
    });
  }

  changeAmountAndRemaining(hasError) {
    const { index, item, isRefund } = this.props;
    const amountInput = this._amountInput;
    let amount = parseFloat(amountInput.value);
    /* istanbul ignore next */
    amount = isNaN(amount) ? 0 : amount;
    let formatCheckAmount = item.formatCheckAmount;
    let remainingInfo = getRemaining(index, amount, formatCheckAmount);
    let alertMessage = '';

    hasError && this.props.clearOptionAndPaymentErrs(index);

    if (typeof remainingInfo === 'number' && remainingInfo < 0) {
      alertMessage = isRefund ?
        fieldProps.MAX_AMOUNT_MESSAGE_ON_REFUND :
        fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND;

      this.setState({
        alertMessage
      }, () => {
        this.openConfirm();
      });

      confirmCallback = () => () => {
        amount = +getDefaultAmount(index);
        formatCheckAmount = amount.toFixed(2);
        amountInput.value = formatCheckAmount;
        remainingInfo = getRemaining(index, amount, formatCheckAmount);
        this.props.changeCheckAmount({ key: index, amount: formatCheckAmount, formatCheckAmount });
        this.props.changeRemaining(remainingInfo);
      };

      return false;
    }

    formatCheckAmount = amount.toFixed(2);
    amountInput.value = formatCheckAmount;
    this.props.changeCheckAmount({ key: index, amount: formatCheckAmount, formatCheckAmount });
    this.props.changeRemaining(remainingInfo);

    return false;
  }
  openConfirm = () => {
    const option = {
      title: 'System Message',
      className: 'payment-amount-exception-alert',
      confirmText: 'OK'
    };
    return confirm(this.state.alertMessage, option).then(() => {
      this.onConfirm(confirmCallback());
    });
  }
}

export default connect(
  null,
  {
    changeCheckAmount,
    changeRemaining,
    updateCheckNumber
  }
)(Check);
