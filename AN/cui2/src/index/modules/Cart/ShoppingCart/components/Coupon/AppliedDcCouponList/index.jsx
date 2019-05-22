import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'react-base-ui/lib/components/SVG';
import ListBox from 'shared/components/ListBox';
import { FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';
import { deleteCouponAction, applyCouponAsyncAction } from '../../../actions/coupon';

import './index.less';

/* eslint-disable no-script-url */
export class AppliedDcCouponList extends React.PureComponent {
  render() {
    const { appliedDcCoupons, errorMessage } = this.props;

    return (
      <div className="coupon-list-wrapper">
        {
          errorMessage ?
            <p className="error-message u-color-errortext">
              <Icon
                name="times-circle"
                type="error"
                aria-label="error icon"
              />
              <FormattedDyncMessage value={errorMessage} />
            </p>
            : null
        }
        {
          appliedDcCoupons && appliedDcCoupons.size > 0 ?
            <ListBox
              expandAble
              horizontal={false}
              maxDisplayCount={3}
              ariaLabelExpand="Expand coupon detail clickable arrow"
              ariaLabelCollapse="Collapse coupon detail clickable arrow"
            >
              {
                appliedDcCoupons.map((item) => {
                  const {
                    coupon_code: couponCode,
                    applied_amount: appliedAmount,
                    coupon_id: couponId } = item.toJS();
                  return (
                    <ListBox.Item >
                      <span className="code u-text-break-all">
                        <FormattedDyncMessage value={couponCode} />
                      </span>
                      <span className="discount u-text-break-all">
                        <FormattedNumber numberStyle="currency" currency="USD" value={appliedAmount} />
                      </span>
                      <span className="remove">
                        <a onClick={() => this.props.deleteCouponAction(couponId)} href="javascript:void(0);">
                          <Icon name="remove" type="link" />
                          <WCAGHiddenLabel value={`coupon number ${couponCode} discount $${appliedAmount} is using, remove coupon`} />
                        </a>
                      </span>
                    </ListBox.Item>
                  );
                })
              }
            </ListBox> : null
        }
      </div>
    );
  }
}
export default connect(
  null,
/* istanbul ignore next */
  {
    applyCouponAsyncAction,
    deleteCouponAction
  }
)(AppliedDcCouponList);
