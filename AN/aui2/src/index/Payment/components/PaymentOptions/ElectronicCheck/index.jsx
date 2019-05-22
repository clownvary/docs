import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { addError } from 'shared/actions/Error';
import UIComponent from 'shared/components/UIComponent';

import { changeRemaining } from '../../../actions';
import { getDefaultAmount } from '../utils/payment';
import checkError from '../utils/checkError';

import {
  changeECheckAmount,
  changeElectronicCheckOpiton,
  fetchECheckConfig
} from '../../../actions/paymentOptions/electronicCheck';
import { newOptions, fieldProps } from '../../../consts';
import AMIds from '../../../automationIds';

import './index.less';

export class ElectronicCheck extends UIComponent {
  static propTypes = {
    item: PropTypes.shape({
      amount: PropTypes.string.isRequired
    }),

    /* eslint-disable react/forbid-prop-types */
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    isRefund: PropTypes.bool.isRequired,
    newECheck: PropTypes.object.isRequired,
    optionLen: PropTypes.number.isRequired,
    /* eslint-enable react/forbid-prop-types */

    changeECheckAmount: PropTypes.func.isRequired,
    changeRemaining: PropTypes.func.isRequired,
    fetchECheckConfig: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    changeElectronicCheckOpiton: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired
  }


  constructor(props) {
    super(props);
    this.state = {
      amount: props.item.amount,
      overrideMsg: ''
    };
  }

  componentWillMount() {
    const eCheckList = this.props.data.eCheckListDropDown.data;

    // thie data have a defalut use-new-electronic-card option
    if (!eCheckList.length ||
      (eCheckList.length === 1 && eCheckList[0].value === newOptions.NEW_OPTION_VALUE)) {
      this.props.fetchECheckConfig();
    }
  }

  changeAmountAndRemaining(hasError) {
    const { index, isRefund } = this.props;
    let amount = parseFloat(this.state.amount || 0);
    const availableAmount = +getDefaultAmount(index);

    hasError && this.props.clearOptionAndPaymentErrs(index);

    if (availableAmount < amount) {
      amount = availableAmount;
      const message = isRefund ?
        fieldProps.MAX_AMOUNT_MESSAGE_ON_REFUND :
        fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND;
      this.props.addError({
        payload: {
          code: -1,
          message
        }
      });
    }
    this.saveECheckCardInfo({ amount, key: index });
  }

  saveECheckCardInfo({ amount, key }) {
    const defaultValue = +getDefaultAmount(key);
    const remaining = Math.max(defaultValue - amount);
    /* istanbul ignore else */
    if (remaining >= 0) {
      const formatECheckAmount = amount.toFixed(2);

      this.setState({ amount: formatECheckAmount });
      this.props.changeECheckAmount({ key, amount: formatECheckAmount, formatECheckAmount });
      this.props.changeRemaining({ remaining: remaining.toFixed(2) });
    }
  }

  render() {
    const { item, value, index, children,
      optionLen, data, hasManuallySplitOption } = this.props;
    const {
      eCheckLabel,
      eCheckListDropDown
    } = data;
    const { eCheckListDropDownValue } = item;
    const hasError = checkError(item);
    const hasCardListError = checkError(item, 'echeck');

    return (
      <div className="payment-option payment-electronic-check">
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

            <Dropdown
              placeholder={`Choose ${eCheckLabel}`}
              errored={hasCardListError}
              value={eCheckListDropDownValue}
              data={eCheckListDropDown.data}
              /* eslint-disable react/jsx-boolean-value */
              showTextTip={true}
              /* eslint-enable react/jsx-boolean-value */
              className="electronic-check-dropdown"
              data-qa-id={AMIds.paymentOption.echeckList}
              onChange={({ value: val }) =>
                this.onChangeECP(index, val, hasError || hasCardListError)}
            />

          </div>

          <div className="aaui-flexbox">
            <label className="payment-symbol" htmlFor="paymentAmount">$</label>
            <InputNumeric
              id="paymentAmount"
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

      </div>
    );
  }

  onChangeECP(index, val, clearErr) {
    if (clearErr) {
      this.props.clearOptionAndPaymentErrs(index);
    }
    this.props.changeElectronicCheckOpiton(index, val);
  }
}

export default connect(
  null,
  {
    changeECheckAmount,
    changeElectronicCheckOpiton,
    changeRemaining,
    fetchECheckConfig,
    addError
  }
)(ElectronicCheck);
