import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { confirm } from 'react-base-ui/lib/services/dialog';

import { changeRemaining } from '../../../actions';
import { getRemaining, getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import {
  changeDebitCardAmount
} from '../../../actions/paymentOptions/debitCard';
import AMIds from '../../../automationIds';
import { fieldProps } from '../../../consts';

import './index.less';

let confirmCallback = () => {};

export class DebitCard extends UIComponent {
  constructor(props) {
    super(props);
    this.state = { alertMessage: '' };
  }

  render() {
    const { item, value, index, children, optionLen,
      isRefund, hasManuallySplitOption } = this.props;
    const hasError = checkError(item);

    return (
      <div className="payment-option payment-debit-card">
        <div
          className={classNames(
            'payment-option-list',
            'aaui-flexbox',
            { 'payment-option-list--error': hasError }
          )}
        >
          <div className="aaui-flexbox">
            <Dropdown
              data={item.list}
              value={value}
              ref={(input) => { this._searchInput = input; }}
              data-qa-id={AMIds.paymentOption.optionList}
              onChange={({ value: val }) => { this.props.onChange(val); }}
              disabled={(index !== optionLen - 1 && hasManuallySplitOption) || !!item.disabled}
            />
            <span className="payment-new-cart-msg">Card information is collected after clicking {isRefund ? ' Refund' : ' Pay' }.</span>
          </div>

          <div className="aaui-flexbox">
            <label className="payment-symbol" htmlFor="debitCardAmount">$</label>
            <InputNumeric
              id="debitCardAmount"
              disabled={!!item.disabled}
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

  /* eslint-disable class-methods-use-this */
  onConfirm(pConfirmCallback) {
    pConfirmCallback && typeof pConfirmCallback === 'function' && pConfirmCallback();
  }
  /* eslint-enable */

  changeAmountAndRemaining(hasError) {
    const { index, item, isRefund } = this.props;
    const amountInput = this._amountInput;
    /* istanbul ignore next */
    let amount = parseFloat(amountInput.value || 0);
    /* istanbul ignore next */
    amount = isNaN(amount) ? 0 : amount;
    let formatAmount = item.amount;
    let remainingInfo = getRemaining(index, amount, formatAmount);
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
        formatAmount = amount.toFixed(2);
        amountInput.value = formatAmount;
        remainingInfo = getRemaining(index, amount, formatAmount);
        this.props.changeDebitCardAmount({ key: index, amount: formatAmount });
        this.props.changeRemaining(remainingInfo);
      };

      return false;
    }

    formatAmount = amount.toFixed(2);
    amountInput.value = formatAmount;
    this.props.changeDebitCardAmount({ key: index, amount: formatAmount });
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
    changeDebitCardAmount,
    changeRemaining
  }
)(DebitCard);
