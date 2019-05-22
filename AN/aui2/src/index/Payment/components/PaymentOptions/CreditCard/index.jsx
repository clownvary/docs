import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import PCIIframe from 'react-base-ui/lib/components/PCI';
import Radio from 'react-base-ui/lib/components/Radio';
import UIComponent from 'shared/components/UIComponent';
import { addError } from 'shared/actions/Error';

import * as creditCardActions from '../../../actions/paymentOptions/creditCard';
import { changeRemaining } from '../../../actions';
import { getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import { fieldProps, CCPaymentMethods } from '../../../consts';
import AMIds from '../../../automationIds';

import './index.less';

export class CreditCard extends UIComponent {

  constructor(props) {
    super(props);
    this.state = {
      amount: props.item.amount,
      isConfigForPCIReady: false
    };
  }

  componentWillMount() {
    const { index } = this.props;
    this.props.fetchCreditCardListAction(index)
      .then(() => {
        this.setState({
          isConfigForPCIReady: true
        });
      });
  }

  changeAmountAndRemaining(hasError) {
    const { index, isRefund } = this.props;
    let amount = parseFloat(this.state.amount);
    /* istanbul ignore next */
    const tempAmount = isNaN(amount) ? 0 : amount;
    if (amount !== tempAmount) {
      amount = tempAmount;
      this.setState({ amount });
    }
    const defaultValue = +getDefaultAmount(index);
    const availableAmount = defaultValue;

    if (hasError) {
      this.props.clearOptionAndPaymentErrs(index);
    }

    if (amount > availableAmount) {
      const message = isRefund ?
        fieldProps.MAX_AMOUNT_MESSAGE_ON_REFUND :
        fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND;

      amount = defaultValue;
      this.props.addError({
        payload: {
          code: -1,
          message
        }
      });
    }
    this.saveCreditCardInfo({ amount, key: index });
  }

  saveCreditCardInfo({ amount, key }) {
    const defaultValue = getDefaultAmount(key);

    const formatCreditCardAmount = amount.toFixed(2);
    this.setState({ amount: formatCreditCardAmount });
    this.props.changeCreditCardAmount({
      key,
      amount: formatCreditCardAmount,
      formatCreditCardAmount
    });
    const remaining = Math.max((+defaultValue) - (+amount));
    this.props.changeRemaining({ remaining: remaining.toFixed(2) });
  }

  render() {
    const { item, value, index, children, optionLen,
      hasManuallySplitOption,
      getIframeUrlAsyncAction,
      getInstanceAction,
      ccScanWithApdDevice,
      ccScanWithMagesafeDevice,
      showPriorCC,
      isRefund,
      isPayerBeDropIn
    } = this.props;
    const { CCPaymentMethod, hasSavedCC, allowNewCard } = item;
    const hasError = checkError(item);
    const tooltips = this.props.isRefund ? 'Refund' : 'Pay';
    const isUseDevice = ccScanWithApdDevice || ccScanWithMagesafeDevice;
    const creditCardMsgForNew = [
      'Card information is collected',
      !item.disabled ? ' after clicking' : '',
      !item.disabled ? ` ${tooltips}` : '',
      '.'
    ].join('');
    const isAllowSavedCC = isRefund || (!isPayerBeDropIn && showPriorCC);

    return (
      <div className="payment-option payment-credit-card">
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
              disabled={(index !== optionLen - 1 && hasManuallySplitOption) || !!item.disabled}
            />
            { (isUseDevice && hasSavedCC && isAllowSavedCC && allowNewCard) &&
              <div className="payment-credit-card-methods">
                <Radio
                  name="payment-cc-method"
                  data-qa-id={AMIds.paymentAction.action}
                  value={CCPaymentMethods.SAVED_CARD_WITH_PCI}
                  checked={CCPaymentMethod === CCPaymentMethods.SAVED_CARD_WITH_PCI}
                  onChange={
                    e => this.onChangeCreditCard(
                      index, e.target.value, CCPaymentMethod, hasError)
                  }
                >Saved credit cards</Radio>
                <Radio
                  name="payment-cc-method"
                  data-qa-id={AMIds.paymentAction.actionItem}
                  value={CCPaymentMethods.NEW_CARD_WITH_DEVICE}
                  checked={CCPaymentMethod === CCPaymentMethods.NEW_CARD_WITH_DEVICE}
                  onChange={
                    e => this.onChangeCreditCard(
                      index, e.target.value, CCPaymentMethod, hasError)
                  }
                >
                  Use new
                  {
                    CCPaymentMethod === CCPaymentMethods.NEW_CARD_WITH_DEVICE &&
                    <span className="payment-new-cart-msg">{creditCardMsgForNew}</span>
                  }
                </Radio>
              </div>
            }
            {(isUseDevice && (!hasSavedCC || !isAllowSavedCC) && allowNewCard) &&
              <span className="payment-new-cart-msg">{creditCardMsgForNew}</span>
            }
          </div>
          <div className="aaui-flexbox aaui-flexbox-c2">
            <label className="payment-symbol" htmlFor="creditCardAmount">$</label>
            <InputNumeric
              id="creditCardAmount"
              disabled={!!item.disabled}
              value={this.state.amount}
              data-qa-id={AMIds.paymentOption.optionAmount}
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
          (!isUseDevice
            || (isUseDevice && CCPaymentMethod === CCPaymentMethods.SAVED_CARD_WITH_PCI)
          ) && this.state.isConfigForPCIReady &&
          <div className="payment-credit-card-iframe">
            <PCIIframe
              getPCICheckoutIframeUrl={
                () => getIframeUrlAsyncAction(
                  isRefund || isAllowSavedCC, false, allowNewCard
                )
              }
              source="an-aui"
              getInstance={instance => getInstanceAction(instance)}
            />
          </div>
        }
      </div>
    );
  }

  onChangeCreditCard(index, selectedCCMethod, prevCCMethod, clearError) {
    const selectedCCMethodInt = parseInt(selectedCCMethod, 10);

    if (clearError) {
      this.props.clearOptionAndPaymentErrs(index);
    }

    if (selectedCCMethodInt !== prevCCMethod) {
      this.props.changeCreditCardAction(index, selectedCCMethodInt);
    }
  }
}

export default connect(
  null,
  {
    ...creditCardActions,
    changeRemaining,
    addError
  }
)(CreditCard);
