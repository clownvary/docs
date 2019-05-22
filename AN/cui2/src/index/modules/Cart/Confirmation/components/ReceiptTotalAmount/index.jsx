import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { FormattedMessage, FormattedNumber } from 'shared/translation/formatted';
import selfMessages from './translations';
import './index.less';

export default class ReceiptTotalAmount extends React.PureComponent {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  render() {
    const { getWording } = this.context;
    const {
      orderSummary: {
        sub_total: subTotal,
        processing_fee: processingFee,
        processing_fee_discount: processingFeeDiscount,
        gift_card_amount: giftCardAmount,
        payment_from_account: paymentFromAccount,
        payment_plan_deferred: paymentPlanDeferred,
        due_now: totalAmount,
        taxes
      }
    } = this.props;
    const paymentPlan = upperFirst(this.context.getWording('payment_plan_label'));
    return (
      <div className="receipt-total-amount__pannel an-grid an-col-1">
        <div className="receipt-sub">
          <ul className="receipt-sub__list">
            <li>
              <b className="receipt-sub--label"><FormattedMessage {...selfMessages.subtotal} /></b>
              <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={subTotal} /></span>
            </li>
            {
              taxes !== 0 ?
                <li className="receipt-sub__list--taxes">
                  <b className="receipt-sub--label"><FormattedMessage {...selfMessages.taxes} /></b>
                  <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={taxes} /></span>
                </li> : null
            }
            {
              processingFee !== 0 ?
                <li className="receipt-sub__list--convenience-fee">
                  <b className="receipt-sub--label"><FormattedMessage {...selfMessages.convenienceFee} values={{ convenience_fee_label: getWording('convenience_fee_label') }} /></b>
                  <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={processingFee} /></span>
                </li> : null
            }
            {
              processingFeeDiscount !== 0 ?
                <li className="receipt-sub__list--convenience-fee-discount">
                  <b className="receipt-sub--label"><FormattedMessage {...selfMessages.convenienceFeeDiscount} values={{ convenience_fee_label: getWording('convenience_fee_label') }} /></b>
                  <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={processingFeeDiscount} /></span>
                </li> : null
            }
            {
              paymentFromAccount !== 0 ?
                <li className="receipt-sub__list--payment-from-account">
                  <b className="receipt-sub--label"><FormattedMessage {...selfMessages.paymentFromAccount} /></b>
                  <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={paymentFromAccount} /></span>
                </li> : null
            }
            {
              paymentPlanDeferred !== 0 ?
                <li className="receipt-sub__list--payment-plan-deferred">
                  <b className="receipt-sub--label"><FormattedMessage {...selfMessages.deferredToPaymentAccount} values={{ paymentPlan }} /></b>
                  <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={paymentPlanDeferred} /></span>
                </li> : null
            }
            {
              giftCardAmount !== 0 ?
                <li className="receipt-sub__list--gift-card-amount">
                  <b className="receipt-sub--label"><FormattedMessage {...selfMessages.giftCard} values={{ giftCard_label: getWording('gift_certificate_label') }} /></b>
                  <span className="receipt-sub--value"><FormattedNumber numberStyle="currency" currency="USD" value={-giftCardAmount} /></span>
                </li> : null
            }
            {
              totalAmount < 0 ?
                <li className="receipt-sub__list--total-refund">
                  <strong className="receipt-sub--label"><FormattedMessage {...selfMessages.totalRefund} /></strong>
                  <strong className="receipt-sub--value receipt-total-amount u-color-moneytext"><FormattedNumber numberStyle="currency" currency="USD" value={Math.abs(totalAmount)} /></strong>
                </li> :
                <li className="receipt-sub__list--total-amount">
                  <strong className="receipt-sub--label"><FormattedMessage {...selfMessages.total} /></strong>
                  <strong className="receipt-sub--value receipt-total-amount u-color-moneytext"><FormattedNumber numberStyle="currency" currency="USD" value={totalAmount} /></strong>
                </li>
            }

          </ul>
        </div>
      </div>
    );
  }

}
