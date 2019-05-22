import React from 'react';
import Label from 'react-base-ui/lib/components/Label';
import { Icon } from 'react-base-ui/lib/components/SVG';

import { injectIntl } from 'react-intl';
import { FormattedNumber, FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';
import selfMessages from './translations';
import transactionLabelTypes from '../../../ShoppingCart/consts/transactionLabelTypes';
import transactionTypes from '../../../ShoppingCart/consts/transactionTypes';
import './index.less';

export class ReceiptTransaction extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object,
    getWording: React.PropTypes.func
  }

  static getTrasactionType = (configurations, id, messages, activityTransferOut) => {
    const typeKey = transactionLabelTypes[id];
    let type = configurations.get(typeKey) || typeKey;

    transactionTypes.TRANSFER_IN === id && (type = `${type} ${messages[selfMessages.transferLabel.id]}`);
    transactionTypes.REFUND === id && (type = `${type} ${messages[selfMessages.withdrawalLabel.id]}`);
    transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE === id && activityTransferOut && (type = `${type} ${messages[selfMessages.transferLabel.id]}`);

    return type;
  };


  render() {
    const { configurations, getWording } = this.context;

    const {
      isLastOne,
      isNameUnspecified,
      transactions: {
        description,
        item_descriptions: itemDescriptions,
        amount_include_tax: amountIncludeTax,
        has_payment_plan: hasPaymentPlan,
        transaction_type: transactionType,
        is_recurring: isRecurring,
        activity_transfer_out: activityTransferOut
      },
      intl: { messages }
    } = this.props;

    const transType = this.constructor.getTrasactionType(configurations, transactionType,
      messages, activityTransferOut);
    const descriptionFrom = activityTransferOut ? activityTransferOut.description : description;

    return (
      <div className="receipt-transaction__pannel">
        <div className="receipt__content__block">
          <div className="receipt__content__title an-grid">
            <b className="receipt__content__title--left"><FormattedDyncMessage value={descriptionFrom} /></b>
            <b className="receipt-price"><FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} /></b>
          </div>
          {
            activityTransferOut ?
              <div className="receipt__content__title--left">
                <div>
                  <Icon name="arrow-down" aria-label="transfer to icon" className="receipt__icon-wrapper" />
                </div>
                <b><FormattedDyncMessage value={description} /></b>
              </div>
            : null
            }
          <div className="transaction-detail u-color-secondarytext">
            <FormattedDyncMessage value={transType} />
          </div>
          {
            itemDescriptions && itemDescriptions.length > 0
            ? <div className="receipt__content__sub">
              {
                itemDescriptions.map((item, index) => (item
                ? (
                  <ul key={index} className="receipt__content__sub__description">
                    <li className="dsp-list">
                      <span className="dsp-key"><FormattedDyncMessage value={item.key} /></span>
                      {
                        item.value ? <span className="receipt-colon">{': '}</span> : null
                      }
                      <span className="dsp-key">
                        <FormattedDyncMessage value={item.value} />
                      </span>
                    </li>
                  </ul>
                  )
                  : null))
                }
            </div>
            : null
          }
          {
            isNameUnspecified && transactionTypes.GIFT_CERTIFICATE === transactionType ?
              <div className="transaction-detail__name-unspecified u-color-warningtext">
                <Icon name="info-circle" type="warning" />
                <span><FormattedMessage {...selfMessages.noPurchaser} /></span>
              </div> : null
          }
          <div className="receipt__label">
            {
              hasPaymentPlan ?
                <Label type="success" className="receipt__content--subplan">
                  <FormattedDyncMessage value={getWording('payment_plan_label')} />
                </Label> : null
            }
            {
              isRecurring ?
                <Label type="success" className="receipt__content--recurring">
                  <FormattedMessage {...selfMessages.labelsRecurring} />
                </Label> : null
            }
          </div>
          {
            !isLastOne
            ? <div className="an-split-line an-split-line-dotted receipt__line" />
            : null
          }
        </div>
      </div>
    );
  }

}

export default injectIntl(ReceiptTransaction);
