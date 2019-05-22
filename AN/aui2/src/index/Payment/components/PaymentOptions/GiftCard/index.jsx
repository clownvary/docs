import React from 'react';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { addError } from 'shared/actions/Error';
import { confirm } from 'react-base-ui/lib/services/dialog';

import GiftCardModal from '../../Modals/GiftCard';
import { changeRemaining } from '../../../actions';
import { getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';
import getOptionName from '../../../utils/getOptionName';

import {
  changeGiftCardAmount,
  changeGiftCardOpiton,
  cancelSelectGiftCard,
  setGiftCardLable,
  setGiftCardMaxOverride,
  setAvaliableAmount
} from '../../../actions/paymentOptions/giftCard';
import AMIds from '../../../automationIds';
import { fieldProps, paymentTypes } from '../../../consts';

import './index.less';

export class GiftCard extends UIComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.item.amount,
      overrideMsg: '',
      giftCardId: this.props.item.giftCardId
    };
  }

  componentWillMount() {
    this.props.setGiftCardLable(getOptionName(this.props.item));

    if (this.props.item.activeVal
      && !this.props.isRefund
      && !this.props.data.giftCardDropDown.data.length) {
      this.saveGiftCardInfo({ amount: 0, key: this.props.index });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.activeVal && nextProps.data.giftCardId) {
      let availableAmount = +nextProps.item.formatGiftCardAmount;
      let availableGCList = nextProps.data.newGiftCardDropDown.data
        .concat(nextProps.data.giftCardDropDown.data);

      availableGCList = availableGCList
        .filter(gc => gc.value === nextProps.data.giftCardDropDownValue);

      if (this.props.isRefund &&
        availableGCList.length &&
        nextProps.item.giftCardId === availableGCList[0].value) {
        availableAmount = availableGCList[0].amount;
      }

      if (availableAmount !== this.state.amount) {
        this.saveGiftCardInfo({ amount: availableAmount, key: nextProps.index });
      }
    }
  }

  changeAmountAndRemaining(hasError) {
    const { isRefund, index } = this.props;

    if (hasError) {
      this.props.clearOptionAndPaymentErrs(index);
    }

    if (isRefund) {
      this.refundChangeAmountAndRemaining();
    } else {
      this.paymentChangeAmountAndRemaining();
    }
  }

  refundChangeAmountAndRemaining() {
    const { index, item, data } = this.props;
    const {
      minOverrideHasAccess,
      minOverrideExplanation,
      maxOverrideHasAccess,
      maxOverrideExplanation,
      isNoCardChosen } = data;

    const giftCardDropDownValue = data.giftCardDropDownValue;
    let amount = parseFloat(this.state.amount || 0);
    const giftCardObject = this.getRefundGiftCardAmount(item.giftCardId);

    const defaultValue = +getDefaultAmount(index);
    const noChooseGiftCard = isNoCardChosen &&
      data.giftCardDropDown.data.length
      && !giftCardDropDownValue;

    const availableAmount = noChooseGiftCard ?
      defaultValue : Math.min(defaultValue, giftCardObject.giftCardAmount);
    let message = '';

    // if no gift card choosed, should not get the detail info
    if (noChooseGiftCard) {
      this.props.setAvaliableAmount({ amount, giftCardId: item.giftCardId });
      this.saveGiftCardInfo({ amount, key: index });
      return false;
    }

    if (amount > defaultValue) {
      message = fieldProps.MAX_AMOUNT_MESSAGE_ON_REFUND;
      if (giftCardDropDownValue) {
        /* istanbul ignore next */
        amount = maxOverrideHasAccess &&
          giftCardObject.isMaxOverride ? defaultValue : availableAmount;
      } else {
        amount = defaultValue;
      }
    } else if (amount > giftCardObject.giftCardRefundMaxAmount) {
      if (maxOverrideHasAccess) {
        /* istanbul ignore else */
        if (!giftCardObject.isMaxOverride) {
          if (giftCardObject.isNewGiftCard) {
            message = `${maxOverrideExplanation}$${giftCardObject.giftCardRefundMaxAmount.toFixed(2)}.`;
          } else {
            message = `${maxOverrideExplanation}$${giftCardObject.giftCardMaxAmount.toFixed(2)} (This card has $${giftCardObject.giftCardAvailableAmount.toFixed(2)} remaining).`;
          }

          this.setState({ overrideMsg: message }, () => {
            this.openConfirm();
          });
          return false;
        }
      } else {
        if (giftCardObject.isNewGiftCard) {
          message = `${maxOverrideExplanation}$${giftCardObject.giftCardRefundMaxAmount.toFixed(2)}.`;
        } else {
          message = `${maxOverrideExplanation}$${giftCardObject.giftCardMaxAmount.toFixed(2)} (This card has $${giftCardObject.giftCardAvailableAmount.toFixed(2)} remaining).`;
        }

        amount = availableAmount;
      }
    }

    if (amount < giftCardObject.giftCardMinAmount && !giftCardObject.isMinOverride) {
      message = `${minOverrideExplanation}$${giftCardObject.giftCardMinAmount.toFixed(2)}.`;
      /* istanbul ignore else */
      if (minOverrideHasAccess) {
        this.setState({ overrideMsg: message }, () => {
          this.openConfirm();
        });
        return false;
      }
      amount = availableAmount;
    }

    if (message) {
      this.props.addError({
        payload: {
          code: -1,
          message
        }
      });
    }
    this.props.setAvaliableAmount({ amount, giftCardId: item.giftCardId });
    this.saveGiftCardInfo({ amount, key: index });

    return false;
  }

  onCancel = () => {
    const { index, item } = this.props;
    const defaultValue = +getDefaultAmount(index);
    const giftCardAmount = this.getRefundGiftCardAmount(item.giftCardId).giftCardAmount;
    const availableAmount = Math.min(defaultValue, giftCardAmount);
    this.saveGiftCardInfo({ amount: availableAmount, key: index });
  };

  openConfirm = () => {
    const option = {
      title: 'System Message',
      showCancel: true,
      cancelText: 'Cancel',
      confirmText: 'Override'
    };
    return confirm(this.state.overrideMsg, option).then(() => {
      this.onConfirm();
    }).catch(() => {
      this.onCancel();
    });
  };

  onConfirm = (callback) => {
    const { index, item, data } = this.props;
    const defaultValue = +getDefaultAmount(index);
    const availableAmount = Math.min(defaultValue, this.state.amount);

    this.props.setGiftCardMaxOverride({
      value: data.giftCardDropDownValue,
      isMax: this.state.overrideMsg.indexOf(data.maxOverrideExplanation) !== -1
    });

    this.props.setAvaliableAmount({ amount: availableAmount, giftCardId: item.giftCardId });
    this.saveGiftCardInfo({ amount: availableAmount, key: this.props.index });

    (callback && typeof callback === 'function') && callback();
  };

  getRefundGiftCardAmount(value) {
    const { giftCardDropDown, newGiftCardDropDown } = this.props.data;
    let giftCardList = giftCardDropDown.data;
    const giftCardObject = {};

    giftCardList = giftCardList.concat(newGiftCardDropDown.data);

    giftCardList.forEach((giftCard) => {
      if (giftCard.value === value) {
        giftCardObject.isNewGiftCard = !!giftCard.isNewGiftCard;
        giftCardObject.giftCardAmount = giftCard.amount;
        giftCardObject.giftCardMaxAmount = this.getMaxGiftCardAmount(value);
        giftCardObject.giftCardMinAmount = this.getMinGiftCardAmount(value);
        giftCardObject.giftCardAvailableAmount = this.getAvailableGiftCardAmount(value);
        giftCardObject.giftCardRefundMaxAmount = this.getRefundMaxGiftCardAmount(value);
        giftCardObject.isMaxOverride = giftCard.isMaxOverride;
        giftCardObject.isMinOverride = giftCard.isMinOverride;
      }
    });
    return giftCardObject;
  }

  getMinGiftCardAmount = (value) => {
    const { newGiftCardDropDown } = this.props.data;
    let giftCardMinAmount = 0;

    newGiftCardDropDown.data.forEach((giftCard) => {
      if (giftCard.value === value) {
        giftCardMinAmount = giftCard.gc_min_sale_amount;
      }
    });
    return giftCardMinAmount;
  };

  getAvailableGiftCardAmount = (value) => {
    const { giftCardDropDown, newGiftCardDropDown } = this.props.data;
    const giftCardList = giftCardDropDown.data.concat(newGiftCardDropDown.data);
    let giftCardAvailableAmount = 0;

    giftCardList.forEach((giftCard) => {
      if (giftCard.value === value) {
        giftCardAvailableAmount = giftCard.gc_available_amount;
      }
    });
    return giftCardAvailableAmount;
  };

  getMaxGiftCardAmount = (value) => {
    const { giftCardDropDown, newGiftCardDropDown } = this.props.data;
    const giftCardList = giftCardDropDown.data.concat(newGiftCardDropDown.data);
    let giftCardMaxAmount = 0;

    giftCardList.forEach((giftCard) => {
      if (giftCard.value === value) {
        giftCardMaxAmount = giftCard.gc_max_card_balance;
      }
    });
    return giftCardMaxAmount;
  };

  getRefundMaxGiftCardAmount = (value) => {
    const { giftCardDropDown, newGiftCardDropDown } = this.props.data;
    const giftCardList = giftCardDropDown.data.concat(newGiftCardDropDown.data);
    let giftCardMaxAmount = 0;

    giftCardList.forEach((giftCard) => {
      if (giftCard.value === value) {
        const canRefundAmount = giftCard.gc_max_card_balance - giftCard.gc_available_amount;
        giftCardMaxAmount = canRefundAmount > 0 ? canRefundAmount : 0;
      }
    });
    return giftCardMaxAmount;
  };

  paymentChangeAmountAndRemaining() {
    const { index, item, data } = this.props;
    const giftCardDropDownValue = data.giftCardDropDownValue;
    let amount = parseFloat(this.state.amount || 0);
    const giftCardAmount = this.getGiftCardAmount(item.giftCardId);
    const defaultValue = +getDefaultAmount(index);
    const noChooseGiftCard = (item.giftCardId && item.giftCardId === data.giftCardId) ||
      !giftCardDropDownValue;

    const availableAmount = noChooseGiftCard ?
      defaultValue : Math.min(defaultValue, giftCardAmount);

    if (availableAmount < amount) {
      amount = availableAmount;
      let message = '';
      if (defaultValue < giftCardAmount || noChooseGiftCard) {
        message = fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND;
      } else {
        const giftCardLabel = data.giftCardLabel;
        message = `The ${giftCardLabel} has a current balance of $${giftCardAmount.toFixed(2)}.`;
      }
      this.props.addError({
        payload: {
          code: -1,
          message
        }
      });
    }
    this.saveGiftCardInfo({ amount, key: index });
  }

  getGiftCardAmount(value) {
    const { giftCardDropDown } = this.props.data;
    let giftCardAmount = 0;

    giftCardDropDown.data.forEach((giftCard) => {
      if (giftCard.value === value) {
        giftCardAmount = giftCard.gc_available_amount;
      }
    });
    return giftCardAmount;
  }

  changeOption({ value, key }, clearError = false) {
    if (clearError) {
      this.props.clearOptionAndPaymentErrs(key);
    }

    this.props.changeGiftCardOpiton({ value, key });

    const defaultValue = +getDefaultAmount(key);
    /* istanbul ignore next */
    const amount = this.props.isRefund ?
      this.getRefundGiftCardAmount(value).giftCardAmount : this.getGiftCardAmount(value);
    const availableAmount = Math.min(defaultValue, amount);


    availableAmount >= 0 && this.saveGiftCardInfo({ amount: availableAmount, key });
  }

  saveGiftCardInfo({ amount, key }) {
    const defaultValue = +getDefaultAmount(key);
    const remaining = Math.max(defaultValue - amount);
    const tempAmount = isString(amount) ? parseFloat(amount) : amount;

    if (remaining >= 0) {
      const formatGiftCardAmount = tempAmount.toFixed(2);

      this.setState({ amount: formatGiftCardAmount });
      this.props.changeGiftCardAmount({ key, amount: formatGiftCardAmount, formatGiftCardAmount });
      this.props.changeRemaining({ remaining: remaining.toFixed(2) });
    }
  }

  onCancelIssueCard() {
    const { index } = this.props;

    this.props.changeGiftCardOpiton({ value: this.state.giftCardId, key: index });
  }

  render() {
    const { item, value, index, children, optionLen, data,
      isRefund, options } = this.props;

    const hasError = checkError(item);
    const hasCardListError = checkError(item, 'giftCard');

    const {
      giftCardId,
      giftCardLabel,
      giftCardDropDown,
      giftCardDropDownValue,
      isUseNewGiftCard,
      newGiftCardDropDown } = data;
    let giftCardList = isRefund ?
      newGiftCardDropDown.data.concat(giftCardDropDown.data) : giftCardDropDown.data;
    const inputDisabled = giftCardDropDown.data.length === 0;
    const optionsData = options.data;
    let processedGCOptionsID = [];
    let hasNewGiftCardOption = true;
    let dropDownDisabled = index !== optionLen - 1;
    let onlyGiftCardAndPaymentPlan = false;

    if (
      optionsData.length === 2 &&
      optionsData[0].activeVal === giftCardId &&
      optionsData[1].activeVal === paymentTypes.PAYMENTPLAN) {
      dropDownDisabled = false;
      onlyGiftCardAndPaymentPlan = true;
    }

    if (dropDownDisabled) {
      hasNewGiftCardOption = false;
      giftCardList = giftCardList.filter(gc => gc.gc_id);
    } else {
      processedGCOptionsID = optionsData.filter((option, idx) => {
        if (idx !== optionsData.length - 1 && !onlyGiftCardAndPaymentPlan) {
          return option.activeVal === giftCardId;
        }
        return false;
      }).map(gift => gift.giftCardId);

      giftCardList = giftCardList.filter(gc => !processedGCOptionsID.some(id => id === gc.gc_id));
    }

    return (
      <div className="payment-option payment-gift-card">
        <div className={`payment-option-list aaui-flexbox u-justify-content-between ${hasError ? 'payment-option-list--error' : ''}`}>
          <div className="aaui-flexbox aaui-flexbox-c1">
            <Dropdown
              data={item.list}
              value={value}
              ref={(input) => { this._searchInput = input; }}
              data-qa-id={AMIds.paymentOption.optionList}
              onChange={({ value: val }) => { this.props.onChange(val); }}
              disabled={dropDownDisabled}
            />

            {
              giftCardDropDown.data.length ?
                <Dropdown
                  placeholder={giftCardDropDownValue || `Choose ${giftCardLabel}`}
                  errored={hasCardListError}
                  value={item.giftCardId}
                  data={giftCardList}
                  showTextTip
                  className="gift-card-dropdown"
                  data-qa-id={AMIds.paymentOption.giftCardList}
                  onChange={({ value: val }) => this.changeOption({
                    value: val, key: index }, hasError || hasCardListError)}
                  disabled={dropDownDisabled}
                />
                :
                <span className="gift-card-msg">
                  {`No available ${giftCardLabel}.`}
                </span>
            }
          </div>

          <div className="aaui-flexbox">
            <label className="payment-symbol" htmlFor="paymentAmount">$</label>
            <InputNumeric
              id="paymentAmount"
              disabled={!!inputDisabled}
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
          hasNewGiftCardOption && isUseNewGiftCard ?
            <GiftCardModal
              data={data}
              amount={this.state.amount}
              index={index}
              onCancelIssueCard={() => { this.onCancelIssueCard(); }}
            />
            : ''
        }
      </div>
    );
  }
}

export default connect(
  null,
  {
    changeGiftCardAmount,
    changeGiftCardOpiton,
    cancelSelectGiftCard,
    setGiftCardLable,
    changeRemaining,
    addError,
    setGiftCardMaxOverride,
    setAvaliableAmount
  }
)(GiftCard);
