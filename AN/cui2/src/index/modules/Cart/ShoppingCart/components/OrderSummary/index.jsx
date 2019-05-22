import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import { Icon } from 'react-base-ui/lib/components/SVG';
import classNames from 'classnames';
import CommonOrderSummary from 'index/modules/Cart/shared/CommonOrderSummary';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonsMessages from 'shared/translation/messages/button';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { validateAndCheckoutShoppingCartAction } from '../../actions/checkout';
import Coupon from '../Coupon';

import './index.less';

export class OrderSummary extends React.PureComponent {
  static propTypes = {
    isSticky: PropTypes.bool,
    isCollapsable: PropTypes.bool,
    data: PropTypes.shape({})
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: !props.isCollapsable
    };
  }

  triggerCollapse() {
    const { expanded } = this.state;
    const { isCollapsable } = this.props;
    isCollapsable && this.setState({ expanded: !expanded });
  }

  buildCheckoutButton() {
    const { data: orderSummary } = this.props;
    const needPay = orderSummary.getIn(['data', 'is_need_payment']);
    return (
      <Button type="strong" onClick={() => this.handlerCheckoutClick()}>
        { needPay ? <FormattedMessage {...buttonsMessages.checkout} /> :
        <FormattedMessage {...buttonsMessages.finish} /> }
      </Button>
    );
  }

  handlerCheckoutClick() {
    const { waiver } = this.props;
    this.props.validateAndCheckoutShoppingCartAction(waiver);
  }

  render() {
    const { expanded } = this.state;
    const { isSticky, coupon, data: orderSummary } = this.props;
    const ordersummaryData = orderSummary.get('data');

    return (
      <div
        className={classNames('ordersummary-panel an-panel', {
          'is-sticky': isSticky
        })}
      >
        <div className="ordersummary-title">
          <h3>
            <a onClick={() => this.triggerCollapse()} className="ordersummary-title__collapse-trigger">
              <FormattedMessage {...orderSummaryMessages.title} />
              <Icon
                type="link"
                name={`chevron-${expanded ? 'up' : 'down'}`}
                className="ordersummary-title__icon-trigger"
                aria-label={`chevron ${expanded ? 'up icon' : 'down icon'}`}
              />
            </a>
          </h3>
        </div>
        <div
          className={classNames('an-split-line ordersummary-title__split-line', {
            'is-show': expanded
          })}
        />
        <CommonOrderSummary data={ordersummaryData} expanded={expanded} />
        <Coupon coupon={coupon} expanded={expanded} />
        { this.buildCheckoutButton() }
      </div>
    );
  }
}

export default connect(
  null,
  {
    validateAndCheckoutShoppingCartAction
  }
)(OrderSummary);
