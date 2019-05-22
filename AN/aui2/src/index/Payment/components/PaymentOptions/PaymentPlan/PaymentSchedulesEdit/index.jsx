import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import Alert from 'react-base-ui/lib/components/Alert';
import InputDate from 'react-base-ui/lib/components/InputDate';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import { momentHelper } from 'react-base-ui/lib/utils';

import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import { formatCurrency, fixedMoney, fixedMoneyString } from 'shared/utils/currencyHelper';

import {
  showModalAction,
  showError
} from '../../../../actions/modals/paymentSchedulesEdit';

import { savePaymentSchedules } from '../../../../actions/paymentOptions/paymentPlan';
import AMIds from '../../../../automationIds';

import './index.less';


function dateCompareBase(x, y) {
  const dateDiff = moment(x.get('dueDate')).diff(moment(y.get('dueDate')));
  if (dateDiff === 0) {
    return 0;
  } else if (dateDiff > 0) {
    return 1;
  }
  return -1;
}
export class PaymentSchedulesEdit extends UIComponent {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    paymentPlanAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    paymentSchedules: PropTypes.object.isRequired,
    schedulesEdit: PropTypes.object.isRequired,
    showModalAction: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    savePaymentSchedules: PropTypes.func.isRequired
  };
  /* eslint-enable */

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: true,
      paymentSchedules: props.paymentSchedules,
      overflow: false,
      scrollBarWidth: 0
    };
    this._refs = {
      dueDate: [],
      amount: []
    };
  }

  componentWillReceiveProps(props) {
    if (
      props.schedulesEdit.showModel
      && !this.props.schedulesEdit.showModel
    ) {
      this.clearError();
      this.setState({
        paymentSchedules: props.paymentSchedules,
        canSubmit: true
      }, () => {
        // need to reset input before this.state.paymentSchedules.size update
        props.paymentSchedules.map(
          /* eslint-disable no-return-assign */
          (item, i) => this._refs.amount[i].value = fixedMoneyString(item.get('amount'))
          /* eslint-enable */
        );
      });
    }
    this.setState({ canSubmit: !props.schedulesEdit.error });
    setTimeout(() => this.setOverFlow(), 0);
  }
  render() {
    const { canSubmit, paymentSchedules, overflow, scrollBarWidth } = this.state;
    const { index } = this.props;
    const { showModel, error } = this.props.schedulesEdit;
    return (
      <Modal
        title="Payment Schedule"
        shown={showModel}
        onClose={() => this.props.showModalAction(false, index)}
      >
        <div className="modal-body">
          <div className="payment-schedule-edit aaui-flexbox">
            {error && <div className="payment-schedule-edit-alert">
              <Alert type="error" noClose="true">
                <ul className="only-one-error">
                  <li>{error}</li>
                </ul>
              </Alert>
            </div>}
            <div className="aaui-flex afx-xl-2 afx-xl-mg-24 payment-schedule-edit-header">
              <div className="afx-col ">DUE DATE</div>
              <div className="afx-col afx-right" style={overflow ? { paddingRight: `${scrollBarWidth + 15}px` } : {}}>AMOUNT</div>
            </div>
            <div className="split-line" />
            <div className="payment-schedule-edit-list" ref={(e) => { this._refs.list = e; }}>
              <div
                className="payment-schedule-edit-container"
                ref={(obj) => { this._refs.container = obj; }}
                style={overflow ? { borderBottom: 'none' } : {}}
              >
                {paymentSchedules.map((data, i) => {
                  let { amount, dueDate } = data.toJS();
                  dueDate = new Date(dueDate);
                  amount = fixedMoneyString(amount);
                  return (
                    <div className="payment-schedule-edit-item aaui-flexbox u-justify-content-between" key={dueDate + i}>
                      <div className="payment-schedule-edit-item-duedate aaui-flexbox">
                        <div className="timepicker">
                          <InputDate
                            data-qa-id={AMIds.paymentSchedulesEdit.dueDate}
                            value={momentHelper.createMoment(dueDate)}
                            showTrigger
                            allowBlank={false}
                            onValueChange={e => this.changeDate('dueDate', i, e.nativeDate)}
                          />
                        </div>
                      </div>
                      <div className="payment-schedule-edit-item-amount aaui-flexbox u-justify-content-between">
                        <label htmlFor="amount" className="payment-symbol">$</label>
                        <InputNumeric
                          name="amount"
                          value={amount}
                          ref={(inputNumeric) => { this._refs.amount[i] = inputNumeric; }}
                          data-qa-id={AMIds.paymentSchedulesEdit.amount}
                          min={0}
                          onBlur={() => this.setAmount('amount', i, this._refs.amount[i])}
                        />
                      </div>
                    </div>);
                })}
              </div>
            </div>
            {overflow && <div className="split-line" />}
          </div>

        </div>
        <div className="modal-footer">
          <Button onClick={() => this.props.showModalAction(false, index)} name="cancel">Cancel</Button>
          <Button disabled={!canSubmit} type="strong" onClick={() => this.save()} name="save">Save</Button>
        </div>
      </Modal>
    );
  }

  changeDate(type, i, value) {
    this.changeData(type, i, DateTimeFormat.formatDate(value));
  }

  setOverFlow() {
    /* istanbul ignore  if */
    if (!this._refs.list) {
      return false;
    }

    return this.setState({
      overflow:
      this._refs.list.offsetHeight <
      this._refs.container.offsetHeight,
      scrollBarWidth:
      this._refs.list.offsetWidth - this._refs.list.clientWidth
    });
  }

  clearError() {
    if (this.props.schedulesEdit.error) {
      this.props.showError('', this.props.index);
    }
  }
  setAmount(type, i, input) {
    const amount = this.state.paymentSchedules.getIn([i, 'amount']);
    const value = parseFloat(input.value) || amount;
    this._refs.amount[i].value = fixedMoneyString(value);
    if (value !== amount) {
      this.changeData(type, i, value, this.clearError);
    }
  }
  changeData(type, i, value, callback) {
    const { paymentSchedules } = this.state;
    this.setState({
      paymentSchedules: paymentSchedules.setIn([i, type], value)
    }, callback);
  }

  save() {
    const {
      paymentPlanAmount,
      index: paymentPlanIndex,
      isSelectCustomForPaymentPlan,
      hasError
    } = this.props;
    const amount = fixedMoneyString(this.state.paymentSchedules.reduce(
      (total, curr) => total + parseFloat(curr.get('amount')), 0)
    );

    if (hasError) {
      this.props.clearOptionAndPaymentErrs(paymentPlanIndex);
    }

    /* eslint-disable eqeqeq */
    if (amount == paymentPlanAmount) {  // '20.00' == 20.0 true
      this.props.savePaymentSchedules(
        this.state.paymentSchedules.sort(dateCompareBase),
        paymentPlanIndex,
        isSelectCustomForPaymentPlan);
    } else {
      const amountWithCurrency = formatCurrency(fixedMoney(amount));
      const isSmallerThanTotal = fixedMoney(amount) < fixedMoney(paymentPlanAmount);
      const diffValueWithCurrency =
        formatCurrency(Math.abs(fixedMoney(amount) - fixedMoney(paymentPlanAmount)));

      this.props.showError(
        isSmallerThanTotal ?
          `Selected amount (${amountWithCurrency}) is insufficient to cover the payment plan total. \nOutstanding Balance: ${diffValueWithCurrency}` :
          `Selected amount (${amountWithCurrency}) exceeds the payment plan total. \nSurplus Balance: ${diffValueWithCurrency}`
      ,
      paymentPlanIndex);
    }
    /* eslint-enable */
  }
}

export default connect(
  null,
  {
    showModalAction,
    showError,
    savePaymentSchedules
  }
)(PaymentSchedulesEdit);
