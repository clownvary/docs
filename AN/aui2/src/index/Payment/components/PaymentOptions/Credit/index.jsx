import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

import UIComponent from 'shared/components/UIComponent';
import { confirm } from 'react-base-ui/lib/services/dialog';
import Dropdown from 'react-base-ui/lib/components/Dropdown';

import { changeRemaining } from '../../../actions';
import { getRemaining, getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import formatCurrency from '../../../utils/formatCurrency';
import {
  changeCreditAmount,
  getCreditAccount,
  changeCreditResetStatus
} from '../../../actions/paymentOptions/credit';
import AMIds from '../../../automationIds';

import './index.less';

let confirmCallback = () => { };

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
export class Credit extends UIComponent {
  constructor(props) {
    super(props);
    this.state = { alertMessage: '' };
  }

  getGreatThanZero = amount => (amount > 0 ? amount : 0);

  render() {
    const { item, value, index, children, optionLen,
      paymentOptions, hasManuallySplitOption } = this.props;
    const overdue = paymentOptions.credit.creditOverdue;
    const hasError = checkError(item);

    return (
      <div className="payment-option payment-credit">
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
              data-qa-id={AMIds.paymentOption.optionList}
              ref={(input) => { this._searchInput = input; }}
              onChange={({ value: val }) => { this.props.onChange(val); }}
              disabled={index !== optionLen - 1 && hasManuallySplitOption}
            />
            <label className="payment-credit-label">Available <span>${paymentOptions.credit.creditAvailable}</span></label>
            {overdue ?
              <label className="payment-credit-label">Overdue <span>${overdue}</span></label> : ''
            }
          </div>
          <div className="aaui-flexbox">
            <label className="payment-symbol">$</label>
            <InputNumeric
              value={item.amount}
              ref={(inputNumeric) => { this._amountInput = inputNumeric; }}
              data-qa-id={AMIds.paymentOption.optionAmount}
              min={0}
              onBlur={() => this.updateAmountAndRemainingAfterCheckCredit(hasError)}
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

  updateAmountAndRemaining(amount) {
    const { index, item } = this.props;
    const amountInput = this._amountInput;
    let formatCreditAmount = item.formatCreditAmount;
    const remainingInfo = getRemaining(index, amount, formatCreditAmount);

    formatCreditAmount = amount.toFixed(2);
    amountInput.value = formatCreditAmount;
    this.props.changeCreditAmount({ key: index, amount: formatCreditAmount, formatCreditAmount });
    this.props.changeRemaining(remainingInfo);
  }

  updateAmountAndRemainingAfterCheckCredit(hasError) {
    const { paymentOptions, index } = this.props;
    const amountInput = this._amountInput;
    let amount = parseFloat(amountInput.value);
    /* istanbul ignore next */
    amount = isNaN(amount) ? 0 : amount;
    const available = parseFloat(paymentOptions.credit.creditAvailable);
    const overdue = paymentOptions.credit.creditOverdue;
    const realRemaining = parseFloat(getDefaultAmount(index));
    const isAmountMoreThanRemaining = amount > realRemaining;
    let alertMessage = '';
    const creditInfo = getCreditInfo(available, overdue, amount);
    const { isAmountMoreThanNetCredit, isAmountMoreThanAvailable } = creditInfo;
    let { netCredit } = creditInfo;
    netCredit = parseFloat(netCredit);

    hasError && this.props.clearOptionAndPaymentErrs(index);

    if (isAmountMoreThanRemaining) {
      if (isAmountMoreThanNetCredit) {
        if (realRemaining > netCredit) {
          netCredit = this.getGreatThanZero(netCredit);
          alertMessage = `This customer has an overdue balance of $${overdue}. The net credit is $${netCredit}.`;
          amount = netCredit;
        } else {
          amount = realRemaining;
          alertMessage = `You are attempting to pay more than the remaining balance $${formatCurrency(amount)}`;
        }
      } else {
        amount = realRemaining;
        alertMessage = `You are attempting to pay more than the remaining balance $${formatCurrency(amount)}`;
      }
    } else if (isAmountMoreThanNetCredit) {
      if (isAmountMoreThanAvailable) {
        alertMessage = `The credit available is $${formatCurrency(available)}`;
        amount = this.getGreatThanZero(netCredit);
      } else {
        netCredit = this.getGreatThanZero(netCredit);
        alertMessage = `This customer has an overdue balance of $${overdue}. The net credit is $${netCredit}.`;
      }
    }

    if (alertMessage) {
      this.setState({
        alertMessage
      }, () => {
        this.openConfirm();
      });

      confirmCallback = () => () => this.updateAmountAndRemaining(amount);
      return false;
    }

    this.updateAmountAndRemaining(amount);
    return false;
  }

  componentDidMount() {
    const self = this;
    const {
      paymentOptions,
      item
    } = self.props;
    const amount = item.amount;

    if (paymentOptions.credit.creditInitDateShouldReset) {
      self.props.getCreditAccount((accountInfo) => {
        self.setDefaultValue(accountInfo, amount);
      });
      self.props.changeCreditResetStatus(false);
      return false;
    }

    if (!paymentOptions.options.deleteAPayment) {
      self.setDefaultValue({
        available: paymentOptions.credit.creditAvailable,
        overdue: paymentOptions.credit.creditOverdue
      }, amount);
    }

    return false;
  }

  setDefaultValue({ available, overdue }, amount) {
    const { index } = this.props;
    const remainingInfo = getRemaining(index, amount, amount);
    const isAmountMoreThanRemaining = typeof remainingInfo === 'number' && remainingInfo < 0;
    let _amount = amount;
    const creditInfo = getCreditInfo(available, overdue, amount);
    const { isAmountMoreThanNetCredit } = creditInfo;
    let { netCredit } = creditInfo;
    const defaultAmount = getDefaultAmount(index);

    netCredit = netCredit > 0 ? netCredit : 0;
    if (isAmountMoreThanRemaining) {
      _amount = defaultAmount;
    } else if (isAmountMoreThanNetCredit) {
      _amount = netCredit;
    } else {
      _amount = Math.min(defaultAmount, netCredit);
    }

    if (amount !== _amount) {
      this.updateAmountAndRemaining(_amount);
    }
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
    changeCreditAmount,
    changeRemaining,
    getCreditAccount,
    changeCreditResetStatus
  }
)(Credit);

function getCreditInfo(pAvailable, pOverdue, pAmount) {
  let netCredit = 0;
  const amount = parseFloat(pAmount);
  let overdue = parseFloat(pOverdue);
  let available = parseFloat(pAvailable);

  available = isNaN(available) ? 0 : available;
  overdue = isNaN(overdue) ? 0 : overdue;
  netCredit = parseFloat(formatCurrency(((available * 100) - (overdue * 100)) / 100));

  return {
    amount,
    available,
    overdue,
    netCredit,
    isAmountMoreThanAvailable: amount > available,
    isAmountMoreThanNetCredit: amount > netCredit
  };
}
