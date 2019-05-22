import React from 'react';
import { compose } from 'redux';
import find from 'lodash/find';
import ReactDOM from 'react-dom';
import Button from 'react-base-ui/lib/components/Button';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import Input from 'react-base-ui/lib/components/Input';
import Select from 'react-base-ui/lib/components/Select';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonMessages from 'shared/translation/messages/button';
import CouponItem from './CouponItem';
import selfMessages from './translations';


import {
  updateCouponCodeAction,
  fetchCouponsAsyncAction,
  applyCouponAsyncAction
} from '../../actions/coupon';

import './index.less';

export class DcCoupon extends React.PureComponent {
  onSelect = (values) => {
    this.props.updateCouponCodeAction(values);
  }

  onInput = (e) => {
    const value = e.target.value;
    this.props.updateCouponCodeAction(value);
  }

  onSelectRef = (node) => {
    this.selectNode = node;
  }

  getMenuContainer = () => ReactDOM.findDOMNode(this.selectNode)// eslint-disable-line

  onApply = () => (this.props.applyCouponAsyncAction());

  /**
   * Reason for istanbul ignore next:
   *   Select using setTimeout to open menu.
   */
  setInputValue = /* istanbul ignore next */(couponsData, val) => {
    const couponItem = find(couponsData, coupon => coupon.id === val);

    if (couponItem && couponItem.text) {
      return couponItem.text;
    }

    return val;
  }

  /**
   * Reason for istanbul ignore next:
   *   Select using setTimeout to open menu that caused can't
   *   trigger menu show by enzyme simulate
   */
  renderOptions = /* istanbul ignore next */
    selectOption => <CouponItem selectOption={selectOption} />

  render() {
    const {
      dcCoupons,
      selectedDcCouponId,
      displayCouponList,
      errorMessage,
      intl: { messages },
      responsive: { isSm, isMd }
    } = this.props;

    const couponsData = dcCoupons.toJS();
    const applyDisabled = !selectedDcCouponId;
    const selectedDcCouponText = dcCoupons.filter(coupon => coupon.get('id') === selectedDcCouponId).getIn([0, 'text']) || selectedDcCouponId;
    const ariaLabel = selectedDcCouponText ?
      `coupon code input box current value is ${selectedDcCouponText}` :
      'coupon code input box please enter coupon code';

    let menuWidth = '300px';
    if (isMd) {
      menuWidth = '400px';
    } else if (isSm) {
      menuWidth = undefined;
    }

    return (
      <div className={classNames('coupon-panel', 'an-panel')}>
        <div className="coupon-panel__form">
          <div ref={this.onSelectRef} className="input-group">
            {
              displayCouponList ?
                <Select
                  aria-label={ariaLabel}
                  creatable
                  menuWidth={menuWidth}
                  inputMaxLength={20}
                  className={classNames('coupon-select', { 'is-error': errorMessage })}
                  inputValue={selectedDcCouponText}
                  optionData={couponsData}
                  placeholder={messages[selfMessages.placeHolder.id]}
                  onChange={this.onSelect}
                  optionItemRenderer={this.renderOptions}
                  getMenuContainer={this.getMenuContainer}
                  setInputValue={
                    /* istanbul ignore next */val => this.setInputValue(couponsData, val)
                  }
                /> :
                <Input
                  maxLength={20}
                  className="coupon-input"
                  aria-label={ariaLabel}
                  placeholder={messages[selfMessages.placeHolder.id]}
                  value={selectedDcCouponText}
                  onInput={this.onInput}
                  errored={errorMessage}
                />
            }
            <div className="coupon-btn-container">
              <Button type="primary" size="sm" disabled={applyDisabled} onClick={this.onApply}>
                <FormattedMessage {...buttonMessages.apply} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    {
      updateCouponCodeAction,
      fetchCouponsAsyncAction,
      applyCouponAsyncAction
    }
  ),
  injectIntl,
  withResponsiveProvider
)(DcCoupon);
