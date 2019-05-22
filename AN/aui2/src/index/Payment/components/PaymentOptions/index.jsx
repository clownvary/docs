import React from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { confirm } from 'react-base-ui/lib/services/dialog';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import { toFixedFloat } from 'react-base-ui/lib/utils/NumericHelper';


import UIComponent from 'shared/components/UIComponent';
import { pages } from 'shared/consts';
import normalizeData from 'shared/utils/normalizeData';

import Cash from './Cash';
import Check from './Check';
import CreditCard from './CreditCard';
import ElectronicCheck from './ElectronicCheck';
import PaymentPlan from './PaymentPlan';
import GiftCard from './GiftCard';
import Credit from './Credit';
import DebitCard from './DebitCard';
import Account from './Account';
import Empty from './Empty';
import { getDefaultAmount, getRemaining } from './utils/payment';
import formatCurrency from '../../utils/formatCurrency';
import AuthorizationDetails from './ElectronicCheck/AuthorizationDetails';
import { changeRemaining, clearErrors, showErrors } from '../../actions';
import {
  resetGiftCardList,
  cancelSelectGiftCard,
  fetchGiftCardList,
  changeGiftCardOption,
  removeNewGiftCardAsyncAction
} from '../../actions/paymentOptions/giftCard';

import {
  deleteOption,
  changeOption,
  getAvailableOptionIds,
  getFormatAmount,
  createAvailableOptions,
  getDefaultOptionId,
  setDefaultOptionId
} from '../../utils/splitOptions';

import {
  splitPaymentAction,
  deletePaymentOptionAction,
  changePaymentAction,
  resetPaymentDeleteFlagAction,
  changePayNowAmountAction,
  clearOptionErrorAction,
  catchResetAction,
  cleanResetAction,
  releaseResetAction
} from '../../actions/paymentOptions/options';
import { fetchAutoPaymentMethodList, changePaymentPlanAmount } from '../../actions/paymentOptions/paymentPlan';
import AMIds from '../../automationIds';
import { fieldProps, resetTypes } from '../../consts';

import './index.less';

const CONFIRM_TYPES = {
  PAYNOW: 'paynow',
  PAYMENT_PLAN: 'payment_plan',
  DELETE_OPTION: 'delete_option'
};

function addDeleteAction(self, optionLen, key, item, hasPaymentPlanSplitOption, isPaymentPlan) {
  /* istanbul ignore next */
  return (optionLen > (hasPaymentPlanSplitOption ? 2 : 1)) ?
    <i
      className={`icon icon-trash ${item.disabled ? 'icon-trash-disabled' : ''} ${isPaymentPlan ? 'icon-trash-paymentplan' : ''}`}
      onClick={() => { self.deletePayment(key, item); }}
    /> : '';
}

/* eslint-disable */
function mapOptions(item, index, optionLen, hasManuallySplitOption, hasPaymentPlanSplitOption) {
  const self = this;
  const { isRefund, initialData, ccScanWithApdDevice, ccScanWithMagesafeDevice, isPayerBeDropIn } = self.props;
  const { showPriorCC, paymentPlanInitData: { show_prior_cc: showPPPriorCC } } = initialData;
  const paymentOptions = fromJS(self.props.paymentOptions).toJS();
  const { activeVal, ComponentName } = item;
  const {
    creditCard,
    eCheck,
    giftCard,
    options,
    paymentPlan
  } = paymentOptions;

  switch (ComponentName) {
    case 'Check':
      return (<Check
        item={item}
        isRefund={isRefund}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</Check>);
    case 'Cash':
      return (<Cash
        initialData={initialData}
        item={item}
        isRefund={isRefund}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</Cash>);
    case 'Credit':
      return (<Credit
        item={item}
        isRefund={isRefund}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        paymentOptions={paymentOptions}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</Credit>);
    case 'CreditCard':
      return (<CreditCard
        item={item}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        isRefund={this.props.isRefund}
        showPriorCC={showPriorCC}
        isPayerBeDropIn={isPayerBeDropIn}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        ccScanWithApdDevice={ccScanWithApdDevice}
        ccScanWithMagesafeDevice={ccScanWithMagesafeDevice}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</CreditCard>);
    case 'ElectronicCheck':
      return (<ElectronicCheck
        item={item}
        isRefund={isRefund}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        newECheck={this.props.newECheck}
        data={eCheck}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</ElectronicCheck>);
    case 'GiftCard':
      return (<GiftCard
        item={item}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        options={options}
        isRefund={this.props.isRefund}
        data={giftCard}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</GiftCard>);
    case 'DebitCard':
      return (<DebitCard
        item={item}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        isRefund={this.props.isRefund}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</DebitCard>);
    case 'PaymentPlan':
      return (<PaymentPlan
        item={item}
        index={index}
        payer={this.props.payer}
        showPPPriorCC={showPPPriorCC}
        data={paymentPlan}
        newECheckData={eCheck}
        creditCardData={creditCard}
        newECheck={this.props.newECheck}
        ccScanWithApdDevice={ccScanWithApdDevice}
        ccScanWithMagesafeDevice={ccScanWithMagesafeDevice}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >
        {addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption, true)}
      </PaymentPlan>);
    case 'Account':
      return (<Account
        item={item}
        optionLen={optionLen}
        value={activeVal}
        index={index}
        refundConfig={paymentOptions.account}
        onChange={(value) => { self.onChange(value, activeVal, index); }}
        hasManuallySplitOption={hasManuallySplitOption}
        clearOptionAndPaymentErrs={/* istanbul ignore next */(index) => self.clearOptionAndPaymentErrs(index)}
      >{addDeleteAction(self, optionLen, index, item, hasPaymentPlanSplitOption)}</Account>);
    default:
      return '';
  }
}
/* eslint-enable */

export class PaymentOptions extends UIComponent {

  constructor(props) {
    super(props);

    this.state = {
      echeckNeedAgreement: false,
      paynowAlert: {
        title: 'Reset Payment Method',
        message: 'Payment method will be reset, are you sure you want to continue?',
        isError: false
      },
      paymentPlanAlert: {
        title: '',
        message: '',
        isError: false
      }
    };
    this.hasGiftCardOption = true;
    this.cache = {};
  }

  render() {
    const { paymentOptions, isRefund, payment, payer, paymentAction, initialData,
      paymentMethodIsEmpty, isPermitHolderBeDropIn, isPayerBeDropIn
    } = this.props;
    const options = paymentOptions.options.get('data').toJS();
    const hasManuallySplitOption = options.filter(({ isManuallySplit }) =>
      isManuallySplit === true).length;
    const hasPaymentPlanSplitOption = options.some(opt => opt.ComponentName === 'PaymentPlan');
    const availableSplitIds = paymentOptions.options.get('availableSplitIds');
    const availableSplitIdsLen = count(availableSplitIds);
    const disableSplit = !availableSplitIdsLen || paymentMethodIsEmpty;
    const optionLen = options.length;
    const self = this;
    const eCheckOfOptions = paymentOptions.eCheck.toJS();
    const paymentPlanAmount = payment.get('paymentPlanAmount');
    const paymentPlanWording = payment.get('paymentPlanWording');
    const payerParams = payer.get('params');
    const isPayOptionsEnable = payerParams.get('customerId') > 0 || payerParams.get('companyId') > 0;
    const paymentPageIndex = payment.get('paymentPageIndex');
    const successPay = payment.get('successPay');
    const modifyMode = parseInt(initialData.permitID, 10) > 0;
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    const payAll =
      (paymentPageIndex === pages.PAY_NOW) ||
      (paymentPageIndex === pages.PAY_PLAN) ||
      (paymentPageIndex === pages.CHARGE_IN_REFUND_FEES);
    let splitAmountTitle = 'Split payment';
    let optionBlockTitle = 'payment option';
    let optionTitle = 'payment method';

    if (isRefund) {
      splitAmountTitle = 'Add refund method';
      optionBlockTitle = 'refund option';
      optionTitle = 'refund method';
    }

    if (isSelectModifyPaymentPlan) {
      optionBlockTitle = paymentPlanWording;
    }

    const isDropInCustomer = isPayerBeDropIn || isPermitHolderBeDropIn;

    return (
      <div
        className={`payment-options panel ${isPayOptionsEnable ? '' : 'u-hidden'}`}
      >
        <h2>{optionBlockTitle}</h2>
        {
          isRefund || isSelectModifyPaymentPlan ? '' :
          <div className="payment-paynow">
            <span className="paynow-label">Pay Now</span>
            <span className="payment-symbol">$</span>
            <InputNumeric
              disabled={successPay || payAll || (!modifyMode && isDropInCustomer)}
              value={payment.get('payNow')}
              ref={(inputNumeric) => { this._paynowAmount = inputNumeric; }}
              data-qa-id={AMIds.paymentOption.payNow}
              min={0}
              onBlur={() => this.changePaynowAmount()}
            />
            {!modifyMode ?
              <span>
                <span className="paymentplan-label">{paymentPlanWording}</span>
                <span className="payment-symbol">$</span>
                <InputNumeric
                  disabled={successPay || isDropInCustomer}
                  ref={(inputNumeric) => { this._paymentPlan = inputNumeric; }}
                  data-qa-id={AMIds.paymentOption.paymentPlan}
                  min={0}
                  value={paymentPlanAmount}
                  onBlur={() => this.changePaymentPlanAmount()}
                  allowBlank={false}
                />
              </span>
              : null
            }
          </div>
        }
        <div className="aaui-flexbox payment-action">
          <div className="payment-title">{optionTitle}</div>
          {!isSelectModifyPaymentPlan ?
            <div
              className={`payment-splition ${disableSplit && 'payment-splition-disabled'}`}
              onClick={() => this.splitPayment(disableSplit, true)}
            >
              <i className="icon icon-split-m" /> {splitAmountTitle}
            </div> : ''
          }
        </div>
        <div className={!modifyMode ? 'payment-list-new' : 'payment-list'}>
          {
            paymentMethodIsEmpty && <Empty
              item={{
                list: normalizeData(createAvailableOptions(getDefaultOptionId())).data,
                amount: getDefaultAmount()
              }}
              onChange={(value) => {
                setDefaultOptionId(value);
                this.props.releaseResetAction();
              }}
            />
          }
          {
            options.map((item, index) => (
              <div
                key={`${item.activeVal}-${item.giftCardId || '0'}`}
                className={classNames(
                  { 'payment-list-new__payment-plan-item': !modifyMode && item.ComponentName === 'PaymentPlan' },
                  { 'payment-list-new__item': !modifyMode && item.ComponentName !== 'PaymentPlan' }
                )}
              >
                {mapOptions.call(self, item, index, optionLen,
                  hasManuallySplitOption, hasPaymentPlanSplitOption)}
              </div>)
            )
          }
        </div>
        {
          (eCheckOfOptions.eCheckConfig.show_ach_agreement_for_ecp &&
            this.props.showAuthorizationDetails) ?
              <AuthorizationDetails
                content={eCheckOfOptions.achContent}
                cancelShowAuthorizationDetails={this.props.cancelShowAuthorizationDetails}
              /> : ''
        }
      </div>
    );
  }

  openConfirm = (type) => {
    const option = {
      cancelText: 'No',
      confirmText: 'Yes'
    };
    let confirmMessage = '';
    let confirmCallback = null;
    let cancelCallback = null;
    if (type === CONFIRM_TYPES.PAYNOW) {
      const { title, isError, message } = this.state.paynowAlert;
      option.title = title;
      option.showCancel = !isError;
      option.confirmText = isError ? 'OK' : 'Yes';
      option.className = isError ? 'paynow-alert-error' : '';
      confirmMessage = message;
      confirmCallback = () => this.confirmUpdatePaynow();
      cancelCallback = !isError ? () => this.closePaynowAlert() : () => this.confirmUpdatePaynow();
    } else if (type === CONFIRM_TYPES.PAYMENT_PLAN) {
      const { title, isError, message } = this.state.paymentPlanAlert;
      option.title = title;
      option.showCancel = false;
      option.confirmText = 'OK';
      option.className = isError ? 'paymentplan__alert--error' : '';
      confirmMessage = message;
    } else if (type === CONFIRM_TYPES.DELETE_OPTION) {
      option.title = 'Delete Option';
      option.showCancel = true;
      confirmMessage = `Are you sure you want to delete this ${this.props.isRefund ? 'refund' : 'payment'} option?`;
      confirmCallback = () => this.onConfirm();
      cancelCallback = () => this.onCancel();
    }
    return confirm(confirmMessage, option).then(() => {
      typeof (confirmCallback === 'function') && confirmCallback();
    }).catch(() => {
      typeof (cancelCallback === 'function') && cancelCallback();
    });
  }

  clearOptionAndPaymentErrs(index) {
    this.props.clearOptionErrorAction(index);
    this.props.clearErrors(index);
  }

  splitPayment(isDisabledSplit, isManuallySplit = false) {
    const { paymentAction } = this.props;
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');

    if (isDisabledSplit) {
      return false;
    } else /* istanbul ignore next */if (isSelectModifyPaymentPlan) {
      return this.props.changePayNowAmountAction(0);
    }

    if (getAvailableOptionIds().length && this.hasGiftCardOption) {
      this.props.resetGiftCardList(() => {
        this.doSplitPayment(isManuallySplit);
      });
    } else {
      this.doSplitPayment(isManuallySplit);
    }
    return false;
  }

  doSplitPayment(isManuallySplit) {
    const defaultAmount = getDefaultAmount();
    if (this.props.isRefund || isManuallySplit) {
      this.props.splitPaymentAction(defaultAmount, isManuallySplit);
      this.props.cleanResetAction();
    } else {
      this.props.catchResetAction(resetTypes.INIT, { defaultAmount, isManuallySplit });
    }
    this.props.changeRemaining(getRemaining(-1, defaultAmount));
  }

  onCancel() {
    this._deleteKey = null;
    this._deleteActiveVal = null;
  }

  onConfirm(callback) {
    const options = this.props.paymentOptions.options.toJS().data;
    const key = this._deleteKey;
    const activeVal = this._deleteActiveVal;
    const option = options[key];
    const remainingInfo = getRemaining(key, 0, getFormatAmount(option, activeVal));

    this.props.cancelSelectGiftCard({ key });
    // ANE-73067: Should not display pending gift card in refund to gift card dropdown list
    this.props.removeNewGiftCardAsyncAction(key);

    deleteOption(activeVal);
    this.props.deletePaymentOptionAction(key);
    this.props.changeRemaining(remainingInfo);

    callback && typeof callback === 'function' && callback();
  }

  deletePayment(key, { activeVal, disabled }) {
    if (disabled) {
      return false;
    }

    this._deleteKey = key;
    this._deleteActiveVal = activeVal;
    this.openConfirm(CONFIRM_TYPES.DELETE_OPTION);

    return false;
  }

  onChange(value, id, key) {
    if (value === id) return false;

    const giftCardId = this.props.paymentOptions.giftCard.toJS().giftCardId;

    this.clearOptionAndPaymentErrs(key);

    if (value === giftCardId) {
      return this.props.changeGiftCardOption(() => {
        changeOption(value, id);
        this.props.changePaymentAction({ newPaymentType: value, index: key });
      });
    }

    changeOption(value, id);

    return this.props.changePaymentAction({ newPaymentType: value, index: key });
  }

  componentWillReceiveProps(nextProps) {
    const { paymentOptions: { options: prevOptions }, payment } = this.props;
    const { paymentOptions: { options: nextOptions } } = nextProps;
    const nextOptionsData = nextOptions.toJS().data;
    const prevOptionsData = prevOptions.toJS().data;
    const paymentErrs = payment.get('errors');
    let optionErrs = [];

    if (!paymentErrs || !paymentErrs.size) {
      return false;
    }

    nextOptionsData.forEach((opt, index) => {
      if (!isEmpty(opt.errors)) {
        optionErrs = optionErrs.concat(opt.errors.map(err => ({ ...err, key: index })));
      }
    });

    /* istanbul ignore if */
    if (prevOptionsData.length !== nextOptionsData.length) {
      return this.props.showErrors(optionErrs);
    }

    let isPaymentMethodChanged = false;
    prevOptionsData.forEach((opt, index) => {
      if (!isPaymentMethodChanged && (opt.activeVal !== nextOptionsData[index].activeVal)) {
        isPaymentMethodChanged = true;
      }
    });

    /* istanbul ignore else */
    if (isPaymentMethodChanged) {
      return this.props.showErrors(optionErrs);
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const { paymentOptions, payment } = this.props;
    const prevPayNow = prevProps.payment.get('payNow');
    const curPayNow = payment.get('payNow');

    paymentOptions.options.get('deleteAPayment') && this.props.resetPaymentDeleteFlagAction();
    /* istanbul ignore next */
    if (prevPayNow > curPayNow || prevPayNow < curPayNow) {
      this._paynowAmount.value = curPayNow;
    }
  }

  componentDidMount() {
    const {
      isRefund, payment, initialData, paymentOptions, isPayerBeDropIn, isPermitHolderBeDropIn
    } = this.props;
    // if refund we need load payment options by calling api,
    // because BE don't return the pay options in the initState
    if (!isRefund) {
      const { total } = payment.toJS();
      const modifyMode = parseInt(initialData.permitID, 10) > 0;
      const giftCardId = paymentOptions.giftCard.toJS().giftCardId;

      this.hasGiftCardOption = getAvailableOptionIds().some(value => value === giftCardId);

      // if payment options have giftCard need to fetchGiftCardList
      if (this.hasGiftCardOption) {
        this.props.fetchGiftCardList().then(() => {
          this.splitPayment();
        });
      } else {
        this.splitPayment();
      }
      this.props.fetchAutoPaymentMethodList();
      const isDropInCustomer = isPayerBeDropIn || isPermitHolderBeDropIn;
      // Enhance default Payment option need show paymentplan always
      !modifyMode && !isDropInCustomer && this.props.changePaymentPlanAmount(0, total);
    }
  }

  changePaynowAmount() {
    const { total, payNow, minimumPayNowAmount, isPaymentActionValid } = this.props.payment.toJS();
    const paynowAmountStr = parseFloat(this._paynowAmount.value || 0).toFixed(2);
    const paynowAmount = parseFloat(paynowAmountStr);
    const prevPayNow = parseFloat(payNow);
    const isPaynowBeZeroWhenMakeAPayment = !paynowAmount && isPaymentActionValid;
    let finalValidPaynowAmount = paynowAmount;
    let errorMsg = '';
    const promptUser = false; // If the UX/BA want to prompt user someday then just set it to true.

    const {
      paymentPlanInitData: {
        auto_schedule_read_only: autoScheduleReadOnly,
        reservation_payment_plans: reservationPaymentPlans
      }
    } = this.props.initialData;

    if ((paynowAmount < minimumPayNowAmount) ||
      (paynowAmount > total) ||
      isPaynowBeZeroWhenMakeAPayment || reservationPaymentPlans.length === 0) {
      finalValidPaynowAmount = prevPayNow;

      this.cache.paynow = {
        updateValue: payNow,
        isDiffWithPrev: false
      };
      if (isPaymentActionValid) {
        errorMsg = fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND;
      } else {
        errorMsg = 'The Pay Now amount cannot be larger than the total amount.';
      }

      if (paynowAmount < minimumPayNowAmount) {
        errorMsg = `The Pay Now amount cannot be less than ${formatCurrency(minimumPayNowAmount)}.`;
      }

      if (isPaynowBeZeroWhenMakeAPayment) {
        errorMsg = 'Please enter the payment amount.';
      }
      /* istanbul ignore if */
      if (autoScheduleReadOnly && reservationPaymentPlans.length === 0) {
        errorMsg = 'There is no available payment plan. Please create a facility payment plan or pay in full.';
      }

      this.setState({
        paynowAlert: {
          title: 'System Message',
          message: errorMsg,
          isError: true
        }
      }, () => {
        this.openConfirm(CONFIRM_TYPES.PAYNOW);
      });

      return false;
    }

    if (finalValidPaynowAmount === prevPayNow) {
      this._paynowAmount.value = payNow;
      return false;
    }

    this.cache.paynow = {
      prevValue: payNow,
      updateValue: paynowAmountStr,
      isDiffWithPrev: true
    };

    /* istanbul ignore if */
    if (promptUser) {
      return this.setState({
        paynowAlert: {
          title: 'Reset Payment Method',
          message: 'Payment method will be reset, are you sure you want to continue?',
          isError: false
        }
      }, () => {
        this.openConfirm(CONFIRM_TYPES.PAYNOW);
      });
    }

    return this.confirmUpdatePaynow();
  }

  confirmUpdatePaynow(closeAlert) {
    const { updateValue: finalPaynowAmount, isDiffWithPrev } = this.cache.paynow;

    if (closeAlert && typeof closeAlert === 'function') {
      closeAlert();
    }

    this._paynowAmount.value = finalPaynowAmount;
    this.cache.paynow = null;

    if (isDiffWithPrev) {
      this.props.changePayNowAmountAction(finalPaynowAmount);
    }
  }

  closePaynowAlert() {
    const finalPaynowAmount = this.cache.paynow.prevValue;
    this._paynowAmount.value = finalPaynowAmount;
    this.cache.paynow = null;
  }

  changePaymentPlanAmount() {
    const { total, minimumPayNowAmount,
      paymentPlanAmount: prePaymentPlan } = this.props.payment.toJS();
    const curPaymentPlan = this._paymentPlan.value;
    const maxPaymentPlan = toFixedFloat(total - minimumPayNowAmount, 2);
    const curPaynow = toFixedFloat(total - curPaymentPlan, 2);
    let errorMsg = null;

    if (curPaymentPlan <= parseFloat(total)) {
      if (curPaymentPlan > maxPaymentPlan) {
        errorMsg = `The Pay Now amount cannot be less than ${formatCurrency(minimumPayNowAmount)}.`;
      }
    } else {
      errorMsg = 'The Payment Plan amount cannot be larger than the total amount.';
    }
    if (errorMsg) {
      this.setState({
        paymentPlanAlert: {
          title: 'System Message',
          message: errorMsg,
          isError: true
        }
      }, () => {
        // force update InputNumeric's text when preValue is equals curValue
        this._paymentPlan.setText(prePaymentPlan);
        this.openConfirm(CONFIRM_TYPES.PAYMENT_PLAN);
      });
    } else {
      this._paynowAmount.value = curPaynow;
      this.changePaynowAmount();
    }
  }
}


export default connect(
  null,
  {
    splitPaymentAction,
    deletePaymentOptionAction,
    changePaymentAction,
    resetPaymentDeleteFlagAction,
    changeRemaining,
    resetGiftCardList,
    cancelSelectGiftCard,
    fetchGiftCardList,
    changeGiftCardOption,
    changePayNowAmountAction,
    fetchAutoPaymentMethodList,
    clearOptionErrorAction,
    clearErrors,
    showErrors,
    removeNewGiftCardAsyncAction,
    changePaymentPlanAmount,
    catchResetAction,
    cleanResetAction,
    releaseResetAction
  }
)(PaymentOptions);
