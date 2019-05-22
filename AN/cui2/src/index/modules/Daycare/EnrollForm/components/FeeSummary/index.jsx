import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from 'react-base-ui/lib/components/Button';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage, FormattedNumber } from 'shared/translation/formatted';
import { Heading } from 'shared/components/Heading';
import CommonFeeSummary from 'shared/components/FeeSummary';
import summaryMessage from 'shared/translation/messages/Cart/orderSummary';
import selfMessages from './translations';

import './index.less';
/* eslint-disable no-script-url */

export class FeeSummary extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  buildCommonFeeSummaryProps = () => {
    const { feeSummary } = this.props;
    const { subTotal, tax, total, refund } = feeSummary.toJS();
    const feeItems = [
      { name: summaryMessage.subtotal, value: subTotal },
      { name: summaryMessage.taxes, value: tax }
    ];

    if (refund < 0) {
      feeItems.push({ name: summaryMessage.refundOfPriorEnrollment, value: refund });
    }

    return {
      hideZeroItem: false,
      feeItems,
      totalItem: { name: summaryMessage.total, value: total }
    };
  };

  render() {
    const { expanded } = this.state;
    const { stuck, onAddToCartButtonClick, responsive: { isSm, isMd } } = this.props;
    const isMobileOrTablet = isSm || isMd;
    const commonFeeSummaryProps = this.buildCommonFeeSummaryProps();
    const { totalItem: { value: total } } = commonFeeSummaryProps;
    return (
      <div className="ordersummary-wrapper daycare-ordersummary">
        <div
          className={classNames('an-panel', 'an-grid', 'ordersummary-panel', { 'is-sticky': stuck })}
        >
          <div className="ordersummary-title">
            <Heading level={3}>
              {
                isMobileOrTablet ?
                  <a onClick={this.toggleExpand} className="ordersummary-title__collapse-trigger" href="javascript:void(0)">
                    <FormattedMessage {...selfMessages.title} />
                    <Icon
                      type="link"
                      className="ordersummary-title__icon-trigger"
                      name={`chevron-${expanded ? 'up' : 'down'}`}
                      aria-label={`chevron ${expanded ? 'up icon' : 'down icon'}`}
                    />
                  </a> : <FormattedMessage {...selfMessages.title} />
              }
            </Heading>
          </div>
          {
            (isMobileOrTablet && expanded) || !isMobileOrTablet ?
              <CommonFeeSummary {...commonFeeSummaryProps} /> : null
          }
          {
            isMobileOrTablet && !expanded ?
              <div className="ordersummary-total u-text-right">
                <strong>
                  <FormattedMessage {...selfMessages.total} />
                </strong>
                <b className="ordersummary-total__value u-color-moneytext">
                  <FormattedNumber numberStyle="currency" currency="USD" value={total} />
                </b>
              </div> : null
          }

          <Button type="strong" onClick={onAddToCartButtonClick}>
            <FormattedMessage {...selfMessages.addToCart} />
          </Button>
        </div>
      </div>
    );
  }
}

export default withResponsiveProvider(FeeSummary);
