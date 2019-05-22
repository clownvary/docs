import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { confirm } from 'react-base-ui/lib/services/dialog';

import calculate from './calculate';
import { changeCashAmount, calculateCashChange } from '../../../actions/paymentOptions/cash';
import { changeRemaining } from '../../../actions';
import formatCurrency from '../../../utils/formatCurrency';
import { getRemaining, getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import AMIds from '../../../automationIds';
import { fieldProps } from '../../../consts';

import './index.less';

let confirmCallback = () => { };

/* eslint-disable class-methods-use-this */
export class Cash extends UIComponent {
  constructor(props) {
    super(props);
    this.state = { alertMessage: '' };
  }

  render() {
    const { item, value, index, children, optionLen,
      isRefund, hasManuallySplitOption } = this.props;
    const hasError = checkError(item);
    const roundValue = this.roundAmount(item.amount);

    return (
      <div className="payment-option payment-cash">
        <div
          className={classNames(
            'payment-option-list',
            'aaui-flexbox',
            { 'payment-option-list--error': hasError }
          )}
        >
          <Dropdown
            data={item.list}
            value={value}
            data-qa-id={AMIds.paymentOption.optionList}
            onChange={({ value: val }) => { this.props.onChange(val); }}
            disabled={index !== optionLen - 1 && hasManuallySplitOption}
          />
          <div className="aaui-flexbox">
            <label className="payment-symbol" htmlFor="cashAmount">$</label>
            <InputNumeric
              id="cashAmount"
              value={roundValue}
              ref={(inputNumeric) => { this._amountInput = inputNumeric; }}
              data-qa-id={AMIds.paymentOption.optionAmount}
              min={0}
              onBlur={() => this.onBlurCashInput(hasError)}
            />
            {children}
          </div>
        </div>
        {/* eslint-disable no-use-before-define */}
        {isRefund ? null : renderChange.call(this, optionLen, hasError)}
        {/* eslint-enable */}
      </div>
    );
  }

  roundAmount(amount) {
    const { initialData: { roundCashPaymentType, roundCashPaymentTo } } = this.props;
    const roundedAmount =
      window.roundCashPayments(roundCashPaymentType, roundCashPaymentTo, amount);

    return formatCurrency(roundedAmount);
  }

  onConfirm(pConfirmCallback) {
    pConfirmCallback && typeof pConfirmCallback === 'function' && pConfirmCallback();
  }

  onBlurCashInput(hasError) {
    const amountInput = this._amountInput;
    const fixedAmount = amountInput.value.toFixed(2);
    const { item: { amount } } = this.props;

    (this.roundAmount(amount) !== fixedAmount) && this.changeAmountAndRemaining(hasError);
  }

  changeAmountAndRemaining(hasError) { // calculate remaining and the amount paid when cash allowed
    const { index, item, isRefund, initialData } = this.props;
    const { allowPaymentByCashWithChangeCalculation: allowPayByCash } = initialData;
    const amountInput = this._amountInput;
    let amount = amountInput.value;
    /* istanbul ignore next */
    amount = isNaN(amount) ? 0 : amount;
    let formatCashAmount = item.formatCashAmount;
    let remainingInfo = getRemaining(index, amount, formatCashAmount);
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
        formatCashAmount = amount.toFixed(2);
        remainingInfo = getRemaining(index, amount, formatCashAmount);
        amountInput.value = this.roundAmount(formatCashAmount);
        this.props.changeCashAmount({ index, amount: formatCashAmount, formatCashAmount });
        this.props.changeRemaining(remainingInfo);

        if (allowPayByCash && !isRefund) {
          const amountPaidInput = this._amountPaidInput;
          this.calculateChange(amountPaidInput.value, formatCashAmount);
        }
      };

      return false;
    }

    formatCashAmount = amount.toFixed(2);
    amountInput.value = this.roundAmount(formatCashAmount);
    this.props.changeCashAmount({ index, amount: formatCashAmount, formatCashAmount });
    this.props.changeRemaining(remainingInfo);

    if (allowPayByCash && !isRefund) {
      const amountPaidInput = this._amountPaidInput;
      this.calculateChange(amountPaidInput.value, formatCashAmount);
    }

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

  onBlurAmountPaidInput(value, pFormatCashAmount, hasError) {
    const fixedAmount = value.toFixed(2);
    const { item: { cashAmountPaid } } = this.props;

    this.roundAmount(cashAmountPaid) !== fixedAmount &&
      this.calculateChange(value, pFormatCashAmount, hasError);
  }

  calculateChange(pPaidAmount, pFormatCashAmount, hasError = false) {
    const { index, item } = this.props;
    const autoCalculate = !!pFormatCashAmount;

    const formatCashAmount = typeof pFormatCashAmount === 'undefined' ? item.formatCashAmount : pFormatCashAmount;
    /* istanbul ignore next */
    let paidAmount = isNaN(parseFloat(pPaidAmount)) ? 0 : parseFloat(pPaidAmount);

    if (autoCalculate) {
      paidAmount = formatCashAmount;
    } else if (paidAmount < formatCashAmount) {
      paidAmount = formatCashAmount;
    }

    paidAmount = parseFloat(paidAmount).toFixed(2);
    this._amountPaidInput.value = this.roundAmount(paidAmount);

    hasError && this.props.clearOptionAndPaymentErrs(index);

    this.props.calculateCashChange({
      index,
      change: calculate(paidAmount, formatCashAmount),
      paidAmount
    });
  }
}

function renderChange(optionLen, hasError = false) {
  const className = optionLen > 1 ? 'payment-cash-change-indent' : '';
  const {
    item,
    initialData: { allowPaymentByCashWithChangeCalculation: allowPayByCash }
  } = this.props;

  /* istanbul ignore else */
  if (allowPayByCash) {
    const roundedAmount = this.roundAmount(item.cashAmountPaid);
    const roundValue = this.roundAmount(item.amount);

    const cashChange = formatCurrency(((roundedAmount * 100) - (roundValue * 100)) / 100);

    return (<div className={`payment-cash-change ${className}`}>
      <div className="aaui-flexbox payment-cash-paid">
        <label htmlFor="cashPaid">Amount Paid</label>
        <span className="payment-symbol">$</span>
        <InputNumeric
          id="cashPaid"
          value={roundedAmount}
          ref={(inputNumeric) => { this._amountPaidInput = inputNumeric; }}
          data-qa-id={AMIds.paymentOption.optionAmount}
          min={0}
          onBlur={
            () => this.onBlurAmountPaidInput(this._amountPaidInput.value, undefined, hasError)
          }
        />
      </div>
      <div className="aaui-flexbox">
        {/* eslint-disable jsx-a11y/label-has-for */}
        <label>Change</label>
        {/* eslint-enable */}
        <span className="payment-symbol">$</span>
        <span className="payment-cash-change-amount">{cashChange}</span>
      </div>
      <i className="rectangle" />
    </div>);
  }

  return '';
}

export default connect(
  null,
  {
    changeCashAmount,
    calculateCashChange,
    changeRemaining
  }
)(Cash);
