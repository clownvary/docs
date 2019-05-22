import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import selfMessages from './translations';

import './paymentPlan.less';

export class PaymentPlan extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({}).isRequired
  };

  render() {
    const data = this.props.data;
    const paymentPlans = data.get('payment_plans') || [];
    const amountDue = data.get('current_due_amount');
    return (
      <div className="payment-plan__panel">
        {
          amountDue ?
            <div>
              <div className="payment-plan__title">
                <FormattedMessage {...selfMessages.currentChargePaymentPlan} />
              </div>
              <div className="due-content">
                <div className="payment">
                  <div className="due-wrapper due-title u-bg-color--dark-accent">
                    <div className="due-date">
                      <FormattedMessage {...selfMessages.dueDatePaymentPlan} />
                    </div>
                    <div className="due-amount">
                      <FormattedMessage {...selfMessages.amountDuePaymentPlan} />
                    </div>
                  </div>
                  <div className="due-wrapper u-bg-color--light-neutral">
                    <div className="due-date">
                      <FormattedDyncMessage value={data.get('current_due_date')} />
                    </div>
                    <div className="due-amount">
                      <FormattedNumber numberStyle="currency" currency="USD" value={data.get('current_due_amount')} />
                    </div>
                  </div>
                </div>
              </div>
            </div> : null
        }
        {
          paymentPlans.size > 0 ?
            <div>
              <div className="payment-plan__title">
                <FormattedMessage {...selfMessages.textPaymentPlan} />
                {' '}
                <FormattedNumber numberStyle="currency" currency="USD" value={data.get('total_payment_plan')} />
                {' '}
                <FormattedMessage {...selfMessages.balancePaymentPlan} />
              </div>
              {
                paymentPlans.map(
                  (item, index) =>
                    (
                      <div key={index}>
                        <div><span className="dot" />
                          <FormattedDyncMessage value={item.get('description')} />
                        </div>
                        <div className="due-content">
                          <div className="payment">
                            <div className="due-wrapper due-title u-bg-color--dark-accent">
                              <div className="due-date">
                                <FormattedMessage {...selfMessages.dueDatePaymentPlan} />
                              </div>
                              <div className="due-amount">
                                <FormattedMessage {...selfMessages.amountDuePaymentPlan} />
                              </div>
                            </div>
                            {
                              item.get('schedule_details').map(
                                detail => (
                                  <div className="due-wrapper u-bg-color--light-neutral">
                                    <div className="due-date">
                                      <FormattedDyncMessage value={detail.get('due_date')} />
                                    </div>
                                    <div className="due-amount">
                                      <FormattedNumber numberStyle="currency" currency="USD" value={detail.get('amount_due')} />
                                    </div>
                                  </div>
                                )
                              )
                            }
                            <div className="due-wrapper due-title u-bg-color--dark-accent">
                              <div className="sub-total">
                                <span>
                                  <FormattedMessage {...selfMessages.subtotalPaymentPlan} />
                                </span>
                                <FormattedNumber numberStyle="currency" currency="USD" value={item.get('sub_total')} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )
              }
            </div> : null
        }
      </div>
    );
  }
}

export default injectIntl(PaymentPlan);
