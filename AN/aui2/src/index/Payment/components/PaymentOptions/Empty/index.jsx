import React from 'react';
import classNames from 'classnames';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import UIComponent from 'shared/components/UIComponent';
import Dropdown from 'react-base-ui/lib/components/Dropdown';

import checkError from '../utils/checkError';
import AMIds from '../../../automationIds';

import './index.less';

export default class Empty extends UIComponent {
  constructor(props) {
    super(props);
    this.state = { alertMessage: '' };
  }

  render() {
    const { item } = this.props;
    const hasError = checkError(item);

    return (
      <div className="payment-option payment-empty">
        <div
          className={classNames(
            'payment-option-list',
            'aaui-flexbox',
            { 'payment-option-list--error': hasError }
          )}
        >
          <Dropdown
            data={item.list}
            value={null}
            data-qa-id={AMIds.paymentOption.optionList}
            onChange={({ value: val }) => { this.props.onChange(val); }}
          />
          <div className="aaui-flexbox">
            <label className="payment-symbol" htmlFor="emptyAmount">$</label>
            <InputNumeric
              id="emptyAmount"
              disabled
              value={item.amount}
              data-qa-id={AMIds.paymentOption.optionAmount}
            />
          </div>
        </div>
      </div>
    );
  }
}
