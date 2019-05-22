import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage, FormattedNumber } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';

import './commonordersummary.less';

export default class OrderSummary extends React.PureComponent {

  static contextTypes = {
    getWording: PropTypes.func
  }

  static propTypes = {
    expanded: PropTypes.bool,
    data: PropTypes.shape({}),
    enableCoupon: PropTypes.bool
  }

  static itemCanbeShow(item) {
    return item != null && item !== 0;
  }

  constructor(props) {
    super(props);
    this.state={subtotalExpanded: false};
  }

  toggleSubtotal=debounce(()=> {
    this.setState({subtotalExpanded: !this.state.subtotalExpanded});
  },100);

  renderSubtotalSection = () => {
    const originalSubtotal = this.props.data.get('original_subtotal');
    const coupon = this.props.data.get('coupon');
    return (
      OrderSummary.itemCanbeShow(coupon) && (
      <div>
        {
          OrderSummary.itemCanbeShow(originalSubtotal) ?
            <li>
              <span className="field-label normal-weight">
                <FormattedMessage {...orderSummaryMessages.originalSubtotal} />
              </span>
              <span className="field-value">
                <FormattedNumber numberStyle="currency" currency="USD" value={originalSubtotal} />
              </span>
            </li> : null
        }
            <li>
              <span className="field-label normal-weight">
                <FormattedMessage {...orderSummaryMessages.coupon} />
              </span>
              <span className="field-value coupon-text">
                  <FormattedNumber numberStyle="currency" currency="USD" value={coupon} />
              </span>
            </li>
        </div>)
    );

  }

  render() {
    const { getWording } = this.context;
    const { expanded, data } = this.props;
    const { subtotalExpanded} = this.state;
    const {
      due_now: dueNow = 0,
      payment_from_account: paymentFromAccount = 0,
      payment_plan_deferred: paymentPlanDeferred = 0,
      processing_fee: processingFee = 0,
      sub_total: subTotal = 0,
      taxes = 0,
      gift_card_amount = 0,
      processing_fee_discount: processingFeeDiscount = 0,
      coupon=0
    } = data.toJS();

    return (
      <div className={classNames("common-ordersummary", {
          'is-unexpanded': !expanded
        })}
      >
        {
          expanded ?
          <div>
            <ul className="common-ordersummary-list">
              <li>
                <span className="field-label">
                  <FormattedMessage {...orderSummaryMessages.subtotal} />
                </span>
                <span className="field-value">
                    {
                      coupon ?
                        <a onClick={this.toggleSubtotal} className="coupon-subtotal" href="javascript:void(0)" aria-expanded={subtotalExpanded}>
                          <FormattedNumber numberStyle="currency" currency="USD" value={subTotal} />
                          <Icon
                            type="link"
                            name={`chevron-${subtotalExpanded ? 'up' : 'down'}`}
                            aria-label={`${subtotalExpanded ? 'collapse subtotal fee detail clickable arrow' : 'expand subtotal fee detail clickable arrow'}`}
                          />
                        </a> :
                        <FormattedNumber numberStyle="currency" currency="USD" value={subTotal} />
                    }
                </span>
              </li>
              {subtotalExpanded ? this.renderSubtotalSection() :null }
              { OrderSummary.itemCanbeShow(taxes) ?
                <li>
                  <span className="field-label">
                    <FormattedMessage {...orderSummaryMessages.taxes} />
                  </span>
                  <span className="field-value">
                    <FormattedNumber numberStyle="currency" currency="USD" value={taxes} />
                  </span>
                </li> : null }
              { OrderSummary.itemCanbeShow(processingFee) ?
                <li>
                  <span className="field-label">
                    <FormattedMessage {...orderSummaryMessages.convenienceFee} values={{ convenience_fee_label: getWording('convenience_fee_label') }} />
                  </span>
                  <span className="field-value">
                    <FormattedNumber numberStyle="currency" currency="USD" value={processingFee} />
                  </span>
                </li> : null }
              { OrderSummary.itemCanbeShow(processingFeeDiscount) ?
                <li>
                  <span className="field-label">
                    <FormattedMessage {...orderSummaryMessages.convenienceFeeDiscount} values={{ convenience_fee_label: getWording('convenience_fee_label')}} />
                  </span>
                  <span className="field-value">
                    <FormattedNumber numberStyle="currency" currency="USD" value={processingFeeDiscount} />
                  </span>
                </li> : null }
              { OrderSummary.itemCanbeShow(paymentFromAccount) ?
                <li>
                  <span className="field-label">
                    <FormattedMessage {...orderSummaryMessages.paymentFromAccount} />
                  </span>
                  <span className="field-value">
                    <FormattedNumber numberStyle="currency" currency="USD" value={paymentFromAccount} />
                  </span>
                </li> : null }
              { OrderSummary.itemCanbeShow(paymentPlanDeferred) ?
                <li>
                  <span className="field-label">
                    <FormattedMessage {...orderSummaryMessages.deferredToPaymentPlan} values={{ payment_plan_label: getWording('payment_plan_label') }} />
                  </span>
                  <span className="field-value">
                    <FormattedNumber numberStyle="currency" currency="USD" value={paymentPlanDeferred} />
                  </span>
                </li> : null }
              { OrderSummary.itemCanbeShow(gift_card_amount) ?
                <li>
                  <span className="field-label">
                    <FormattedMessage {...orderSummaryMessages.giftCard} values={{ giftCard_label: getWording('gift_certificate_label')}} />
                  </span>
                  <span className="field-value">
                    <FormattedNumber numberStyle="currency" currency="USD" value={-gift_card_amount} />
                  </span>
                </li> : null }
            </ul>
            <div className="an-split-line" />
            <div className="common-ordersummary-duenow">
              <strong>
              {
                dueNow < 0 ?
                  <FormattedMessage {...orderSummaryMessages.totalRefund} />
                  : <FormattedMessage {...orderSummaryMessages.dueNow} />
              }
              </strong>
              <b className="u-color-moneytext">
                <FormattedNumber numberStyle="currency" currency="USD" value={Math.abs(dueNow)} />
              </b>
            </div>
          </div> :
          <div className="common-ordersummary-duenow is-unexpanded">
            <strong>
            {
              dueNow < 0 ?
                <FormattedMessage className="unexpanded-duenow" {...orderSummaryMessages.totalRefund} />
                : <FormattedMessage {...orderSummaryMessages.dueNow} />
            }
            </strong>
            <b className="u-color-moneytext">
              <FormattedNumber numberStyle="currency" currency="USD" value={Math.abs(dueNow)} />
            </b>
          </div>
        }
      </div>
    );
  }
}
