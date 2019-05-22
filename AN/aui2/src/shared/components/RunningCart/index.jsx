import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import LoadingBar from 'react-base-ui/lib/components/LoadingBar';
import { redirect } from 'shared/actions/route';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import { pages } from 'shared/consts';

import {
  fetchRunningCart
} from '../../actions/runningCart';

import './index.less';

export class RunningCart extends UIComponent {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };

    this.bind('handleHoverOn', 'handleHoverOff', 'goToCart');
  }

  goFetchData() {
    const { batchID, receiptID, receiptEntryID } = this.props;

    this.props.fetchRunningCart({
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID
    });
  }

  handleHoverOn() {
    if (!this.state.isExpanded) {
      this.setState({
        isExpanded: true
      }, () => {
        this.goFetchData();
      });
    } else {
      clearTimeout(this._timer);
    }
  }

  handleHoverOff() {
    /* istanbul ignore else */
    if (this.state.isExpanded) {
      this._timer = setTimeout(() => {
        this.setState({
          isExpanded: false
        });
      }, 200);
    }
  }

  goToCart() {
    // 1. fix issue: https://jirafnd.dev.activenetwork.com/browse/ANE-57387
    // change notes and customer question components, then click running-cart btn directly
    // the blur event of these component can't trigger successful
    // so need delay the running-cart click event of goto cart page, check 'disabled' first
    // 2. fix issue: https://jirafnd.dev.activenetwork.com/browse/ANE-57387
    // because the bad performance of IE11,
    // running-cart click event still happened before component's blur event
    // need delay 1 second, before running-cart get the correct 'disabled' value
    setTimeout(() => {
      const { batchID, receiptID, receiptEntryID, disabled } = this.props;

      /* istanbul ignore else */
      if (!disabled) {
        const url = pages.buildUrl(pages.cartPage, {
          batch_id: batchID,
          receipt_id: receiptID,
          receipt_entry_id: receiptEntryID
        });

        this.props.redirect(url);
      }
    }, 1000);
  }

  componentDidMount() {
    this.goFetchData();
  }

  render() {
    const { className, runningCart, disabled } = this.props;
    const cartList = runningCart.get('cartList').toJS();
    const cartLoading = runningCart.get('cartLoading');
    const cartListLength = cartList.length;
    const cartError = runningCart.get('error');
    const isCartListShown = cartListLength && !cartLoading && !cartError;
    const isCartEmptyShow = !cartListLength && !cartLoading && !cartError;
    const iscartErrorShown = !cartLoading && cartError;
    const buttonDisabled = disabled || cartListLength === 0;

    return (
      <div
        className={`runningCart-wrapper ${className || ''}`}
        onMouseEnter={this.handleHoverOn}
        onMouseLeave={this.handleHoverOff}
      >
        <Button
          size="sm"
          title="View Cart"
          disabled={buttonDisabled}
          onClick={this.goToCart}
        >
          <i className="icon icon-cart-m" />
          <span className={`cart-list-count ${cartListLength ? '' : 'u-hidden'}`}>{cartListLength}</span>
        </Button>
        <div className={`runningCart ${this.state.isExpanded ? '' : 'u-hidden'}`}>
          <div className={`cart-list-wrapper ${isCartListShown ? '' : 'u-hidden'}`}>
            <div className="cart-list">
              {
                cartList.map((list, index) => {
                  const key = `run_cart_${index}`;
                  const listAmount = formatCharge(list.reservation_fee);

                  return (
                    <div key={key} className="list">
                      <div className="col-description">{decodeHtmlStr(list.description)}</div>
                      <div className="col-amount">{listAmount}</div>
                    </div>
                  );
                })
              }
            </div>
          </div>

          <div className={`cart-empty ${isCartEmptyShow ? '' : 'u-hidden'}`}>
            <i className="icon icon-cart-m" />
            Your shopping cart is empty.
          </div>

          <LoadingBar showMask={false} spinSize="md" className={`cart-loading ${!cartLoading && 'u-hidden'}`} />

          <div className={`cart-error ${iscartErrorShown ? '' : 'u-hidden'}`}>
            <div className="cart-error-icon">
              <i className="icon icon-cart-m">
                <i className="icon icon-times-circle" />
              </i>
            </div>
            {cartError}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchRunningCart,
    redirect
  }
)(RunningCart);

// todo: error interaction when fetch cart list error.
