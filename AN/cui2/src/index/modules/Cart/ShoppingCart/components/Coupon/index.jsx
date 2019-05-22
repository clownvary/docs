import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import DcCoupon from './DcCoupon';
import AppliedDcCouponList from './AppliedDcCouponList';

import './index.less';

export class Coupon extends React.PureComponent {
  static contextTypes = {
    configurations: PropTypes.object
  }

  render() {
    const { coupon, expanded } = this.props;
    const {
      dcCoupons,
      appliedDcCoupons,
      selectedDcCouponId,
      showCouponSection,
      errorMessage
    } = coupon.toObject();

    const classes = classNames('coupon-wrapper', {
      'is-unexpanded': !expanded
    });
    const displayCouponList = this.context.configurations.get('display_coupon_list');

    return showCouponSection && (
      <div className={classes}>
        <div className="an-col-1-1">
          <DcCoupon
            dcCoupons={dcCoupons}
            displayCouponList={displayCouponList}
            selectedDcCouponId={selectedDcCouponId}
            errorMessage={errorMessage}
          />
          <AppliedDcCouponList
            summaryExpanded={expanded}
            appliedDcCoupons={appliedDcCoupons}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    );
  }
}

export default withResponsiveProvider(Coupon);
