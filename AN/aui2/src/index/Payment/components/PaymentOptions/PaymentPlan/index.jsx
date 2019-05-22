import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { fromJS } from 'immutable';

import Input from 'react-base-ui/lib/components/Input';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Radio from 'react-base-ui/lib/components/Radio';
import InputDate from 'react-base-ui/lib/components/InputDate';
import PCIIframe from 'react-base-ui/lib/components/PCI';
import { momentHelper } from 'react-base-ui/lib/utils';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import PopupWindowWithMenu from 'shared/utils/openTheExistingPage';
import { formatCurrency, fixedMoneyString } from 'shared/utils/currencyHelper';

import URL from '../../../urls';
import AMIds from '../../../automationIds';

import PaymentSchedulesEdit from './PaymentSchedulesEdit';

import {
  changePaymentPlanSection,
  changeAutoPaymentStatus,
  updateAutoPaymentTypeAndCCExpStatus,
  changePaymentCard,
  getBackupPayment,
  getInstanceAction,
  getIframeUrlAsyncAction
} from '../../../actions/paymentOptions/paymentPlan';
import {
  changeECheckAccount,
  changeECheckRouting,
  changeECheckAccountType,
  changeECheckSaveInformation,
  saveNewECheck
} from '../../../actions/modals/NewECheck';
import {
  resetUseNewECheckSelectedValue
} from '../../../actions/paymentOptions/electronicCheck';
import { showModalAction } from '../../../actions/modals/paymentSchedulesEdit';
import { paymentPlanPaymentTypes } from '../../../consts';
import checkError from '../utils/checkError';

import './index.less';

/* eslint-disable jsx-a11y/label-has-for */
export class PaymentPlan extends UIComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    payer: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    newECheckData: PropTypes.object.isRequired,
    creditCardData: PropTypes.object.isRequired
  }
  /* eslint-enable react/forbid-prop-types */

  render() {
    const {
      children,
      item,
      index,
      payer,
      data: {
        ppAutoCCList,
        ppAutoEcpList
      },
      newECheckData: {
        eCheckLabel
      },
      creditCardData: { creditCardLabel },
      ccScanWithApdDevice,
      ccScanWithMagesafeDevice,
      showPPPriorCC
    } = this.props;

    const {
      list,
      activeVal,
      amount,
      totalBlanceAmount,
      paymentPlanWording,
      firstPaymentDate,
      autoScheduleReadOnly,
      showAutoPaymentMethod,
      reservationPPs,
      frequecys,
      numOfPayments,
      autoPaymentTypes: {
        [paymentPlanPaymentTypes.CREDITCARD]: cc,
        [paymentPlanPaymentTypes.ELECTRONICCHECK]: ecp,
        selected: selectedAutoPayType },
      backupPaymentInfo,
      paymentSchedules,
      schedulesEdit
    } = item;

    const selectedPayPlan = reservationPPs.selected;
    const isSelectCustomForPaymentPlan = selectedPayPlan === 0;
    const isPayScheduleEditable = isSelectCustomForPaymentPlan ||
      (!autoScheduleReadOnly && (selectedPayPlan !== -1));
    const { backupPaymentType, backupPaymentCardName } = backupPaymentInfo;
    const rpData = reservationPPs.data;
    const selectedPayPlanIndex = rpData.indexOf(
      rpData.filter(rp => rp.value === selectedPayPlan)[0]);
    const showBackupPayment = payer.toJS().params.customerId > 0;

    const hasError = checkError(item);
    const hasMethodError = checkError(item, 'paymentMethod');

    return (
      <div className="payment-option payment-paymentplan">
        <div
          className={classNames(
            'payment-option-list',
            'aaui-flexbox',
            { 'payment-option-list--error': hasError }
          )}
        >
          <Dropdown
            data={list}
            data-qa-id={AMIds.paymentPlan.plan}
            value={activeVal}
            disabled
          />
          <div className="aaui-flexbox">
            <label className="payment-symbol">$</label>
            <Input defaultValue={amount} disabled />
            {children}
          </div>
        </div>
        {
          amount > 0 ?
            <div className="paymentplan-details">
              <div className="paymentplan-selection">
                <div className={`paymentplan-selection-item paymentplan-selection-item-c1 paymentplan-selection-definition ${isSelectCustomForPaymentPlan ? '' : 'pre-defined-paymentplan'}`}>
                  <label>Select {paymentPlanWording}</label>
                  <Dropdown
                    data={rpData}
                    data-qa-id={AMIds.paymentPlan.select}
                    value={selectedPayPlan}
                    defaultValue={selectedPayPlan}
                    onChange={({ value }) => { this.onChange(value, selectedPayPlan, 'reservationPPs', hasError); }}
                  />
                  {
                    !isSelectCustomForPaymentPlan &&
                    <p className="paymentplan-description">
                      {decodeHtmlStr(rpData[selectedPayPlanIndex].description)}
                    </p>
                  }
                </div>
                {isSelectCustomForPaymentPlan ?
                  <div className="paymentplan-selection-item paymentplan-selection-frequency">
                    <label>Frequency</label>
                    <Dropdown
                      data={frequecys.data}
                      data-qa-id={AMIds.paymentPlan.frequency}
                      value={frequecys.selected}
                      onChange={({ value }) => { this.onChange(value, frequecys.selected, 'frequecys', hasError); }}
                    />
                  </div> : ''
                }

                {isSelectCustomForPaymentPlan ?
                  <div className="paymentplan-selection-item paymentplan-selection-item-c1">
                    <label>Number of Payment(s)</label>
                    <Dropdown
                      data={numOfPayments.data}
                      data-qa-id={AMIds.paymentPlan.number}
                      value={numOfPayments.selected}
                      onChange={({ value }) => { this.onChange(value, numOfPayments.selected, 'numOfPayments', hasError); }}
                    />
                  </div> : ''
                }

                {isSelectCustomForPaymentPlan ?
                  <div className="paymentplan-selection-item">
                    <label>First Payment Date</label>
                    <div className="date-picker">
                      <InputDate
                        data-qa-id={AMIds.paymentPlan.firstDate}
                        value={momentHelper.createMoment(firstPaymentDate)}
                        showTrigger
                        allowBlank={false}
                        onValueChange={e => this.changeFirstPaymentDate(e.nativeDate, hasError)}
                      />
                    </div>
                  </div> : ''
                }
              </div>
              <div className="paymentplan-schedule">
                <div className="paymentplan-schedule-header">
                  <span className="paymentplan-schedule-title">Payment Schedule</span>
                  <span
                    className={`paymenmtplan-schedule-edit-btn ${isPayScheduleEditable ?
                      '' : 'pp-schedule-edit-btn-disabled'}`}
                    onClick={() => { this.onEditSchedule(isPayScheduleEditable, index); }}
                  >
                    <i className="icon icon-edit-m" />Edit schedule
              </span>
                  <PaymentSchedulesEdit
                    index={index}
                    hasError={hasError}
                    isSelectCustomForPaymentPlan={isSelectCustomForPaymentPlan}
                    paymentPlanAmount={fixedMoneyString(totalBlanceAmount || amount)}
                    schedulesEdit={schedulesEdit}
                    paymentSchedules={fromJS(paymentSchedules)}
                    clearOptionAndPaymentErrs={this.props.clearOptionAndPaymentErrs}
                  />
                </div>
                <div className="paymentplan-schedule-table">
                  <div className="paymentplan-schedule-table-head">
                    <div>DUE DATE</div>
                    <div className="paymentplan-schedule-amount">AMOUNT</div>
                  </div>
                  <div className="paymentplan-schedule-table-body">
                    {
                      paymentSchedules.map((schedule, key) =>
                        <div key={`schedule_${key}`} className="payment-schedule-detail">
                          <div>{schedule.dueDate}</div>
                          <div className="paymentplan-schedule-amount">
                            {formatCurrency(schedule.amount)}
                            {schedule.paid ?
                              <div className="paid-amount">(Paid {formatCurrency(schedule.paid)})</div> : ''
                            }
                          </div>
                        </div>)
                    }
                  </div>
                </div>
              </div>
              <div className="paymentplan-preauthorized-method">
                <div className="paymentplan-method-configuration">
                  <Checkbox
                    checked={showAutoPaymentMethod}
                    data-qa-id={AMIds.paymentPlan.setup}
                    onChange={() => {
                      this.props.changeAutoPaymentStatus(!showAutoPaymentMethod, index);
                      hasError && this.props.clearOptionAndPaymentErrs(index);
                    }}
                  />
                  <span className="paymentplan-method-statement">Setup pre-authorized payment method</span>
                </div>
                {showAutoPaymentMethod ?
                  <div className="paymentplan-method">
                    {selectedAutoPayType ?
                      <label className="paymentplan-method-label">Payment Method</label> : ''
                    }
                    {selectedAutoPayType ?
                      <div className="payment-methods-list">
                        {cc.valid ?
                          <div className="paymentplan-method-cc">
                            <Radio
                              name="paymentplan-method-type"
                              data-qa-id={AMIds.paymentPlan.creditCard}
                              value={cc.id}
                              checked={selectedAutoPayType === cc.id}
                              onChange={e => this.updateAutoPaymentType(e,
                                selectedAutoPayType,
                                index,
                                hasError || hasMethodError)}
                            >Credit Card</Radio>
                            {
                              (ccScanWithApdDevice || ccScanWithMagesafeDevice) &&
                              <div className="payment-method-card-list">
                                <Dropdown
                                  placeholder={`Choose ${creditCardLabel}`}
                                  data-qa-id={AMIds.paymentPlan.chooseCard}
                                  errored={hasMethodError && selectedAutoPayType === cc.id}
                                  className={selectedAutoPayType === cc.id ? '' : 'pay-list-hidden'}
                                  data={ppAutoCCList.data}
                                  value={ppAutoCCList.selected}
                                  onChange={({ value }) => this.changePaymentCard(
                                    index,
                                    value,
                                    paymentPlanPaymentTypes.CREDITCARD,
                                    hasError || hasMethodError
                                  )}
                                />
                              </div>
                            }
                            {
                              (!ccScanWithApdDevice && !ccScanWithMagesafeDevice
                                && selectedAutoPayType === cc.id) ?
                                  <PCIIframe
                                    getPCICheckoutIframeUrl={
                                      () => this.props.getIframeUrlAsyncAction(showPPPriorCC, true)
                                    }
                                    source="an-aui-paymentplan"
                                    style={selectedAutoPayType !== cc.id ? { display: 'none' } : {}}
                                    getInstance={
                                      instance => this.props.getInstanceAction(instance)
                                    }
                                  /> : ''
                            }
                          </div> : ''
                        }
                        {ecp.valid ?
                          <div className="paymentplan-method-ecp">
                            <Radio
                              name="paymentplan-method-type"
                              data-qa-id={AMIds.paymentPlan.electronicCheck}
                              value={ecp.id}
                              checked={selectedAutoPayType === ecp.id}
                              onChange={e => this.updateAutoPaymentType(e,
                                selectedAutoPayType, index, hasError || hasMethodError)}
                            >Electronic Check</Radio>
                            <div className="payment-method-card-list">
                              <Dropdown
                                placeholder={`Choose ${eCheckLabel}`}
                                data-qa-id={AMIds.paymentPlan.chooseElectronic}
                                errored={hasMethodError && selectedAutoPayType === ecp.id}
                                className={selectedAutoPayType === ecp.id ? '' : 'pay-list-hidden'}
                                data={ppAutoEcpList.data}
                                value={ppAutoEcpList.selected}
                                onChange={({ value }) => this.changePaymentCard(
                                  index,
                                  value,
                                  paymentPlanPaymentTypes.ELECTRONICCHECK,
                                  hasError || hasMethodError
                                )}
                              />
                            </div>
                          </div> : ''
                        }
                      </div> : ''
                    }
                    {showBackupPayment ?
                      <div className="paymentplan-backup">
                        <label className="paymentplan-backup-label">Backup Payment<span className="payment-backup-statement">(Optional)</span></label>
                        <div className="payment-backup-details">
                          {backupPaymentType ?
                            <div>
                              <span className="payment-backup-type">{backupPaymentType}</span>
                              <span className="payment-backup-info">{backupPaymentCardName}</span>
                              <span
                                className="payment-backup-action"
                                onClick={() => { this.updateBackuppayment(index, hasError); }}
                              >
                                <i className="icon icon-exchange" />Change card/account
                          </span>
                            </div> :
                            <span
                              className="payment-backup-action"
                              onClick={() => { this.updateBackuppayment(index, hasError); }}
                            >
                              <i className="icon icon-search" />Select card/account
                        </span>
                          }
                        </div>
                      </div> : ''
                    }

                  </div> : ''
                }
                <i className="rectangle" />
              </div>
            </div> : null
        }
      </div>
    );
  }


  onChange(val, prevVal, field, hasError) {
    const { index } = this.props;

    if (hasError) {
      this.props.clearOptionAndPaymentErrs(index);
    }

    val !== prevVal && this.props.changePaymentPlanSection({ index, field, val });
  }

  onEditSchedule(isPayScheduleEditable, index) {
    if (!isPayScheduleEditable) {
      return false;
    }
    return this.props.showModalAction(true, index);
  }

  changeFirstPaymentDate(date, hasError) {
    const value = DateTimeFormat.formatDate(date);
    const prevValue = this.props.item.firstPaymentDate;
    this.onChange(value, prevValue, 'firstPaymentDate', hasError);
  }

  updateBackuppayment(index, hasError) {
    const { customerId } = this.props.payer.toJS().params;

    window.__paymentBackupCallback = () => {
      this.props.getBackupPayment();
      if (hasError) {
        this.props.clearOptionAndPaymentErrs(index);
      }
    };

    const url = `${URL.paymentPlanBackupUrl}&customer_id=${customerId}&callback=__paymentBackupCallback()`;
    /* istanbul ignore else */
    if (customerId > 0) {
      return PopupWindowWithMenu(url, 'PaymentPop', '600', '600', 'yes');
    }

    return false;
  }

  updateAutoPaymentType(e, prevType, index, /* istanbul ignore next */clearError = false) {
    if (clearError) {
      this.props.clearOptionAndPaymentErrs(index);
    }
    const curType = parseFloat(e.target.value);

    if (curType !== parseFloat(prevType)) {
      this.props.updateAutoPaymentTypeAndCCExpStatus(curType, index);
    }
  }

  changePaymentCard(index, value, ppPaymentType, /* istanbul ignore next */clearError = false) {
    if (clearError) {
      this.props.clearOptionAndPaymentErrs(index);
    }
    this.props.changePaymentCard(index, value, ppPaymentType);
  }
}

export default connect(
  null,
  {
    changePaymentPlanSection,
    changeAutoPaymentStatus,
    updateAutoPaymentTypeAndCCExpStatus,
    changePaymentCard,
    getBackupPayment,
    showModalAction,

    changeECheckAccount,
    changeECheckRouting,
    changeECheckAccountType,
    changeECheckSaveInformation,
    saveNewECheck,

    resetUseNewECheckSelectedValue,

    getIframeUrlAsyncAction,
    getInstanceAction
  }
)(PaymentPlan);
