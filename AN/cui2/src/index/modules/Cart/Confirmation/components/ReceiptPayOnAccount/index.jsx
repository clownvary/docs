import React from 'react';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage, FormattedDyncMessage, FormattedNumber } from 'shared/translation/formatted';
import selfMessages from '../ReceiptTransaction/translations';
import './index.less';

export default class ReceiptPayOnAccount extends React.PureComponent {
  render() {
    const { payOnAccountList } = this.props;
    const {
      item_name: itemName,
      due_now: dueNow,
      receipt_numbers: receiptNumbers
    } = payOnAccountList;

    return (
      <div className="receipt-pay-on-account__pannel">
        <div className="receipt__content">
          <div className="an-grid receipt__content__title">
            <b className="receipt__content__title--left"><FormattedDyncMessage value={itemName} /></b>
            <b className="receipt-price"><FormattedNumber numberStyle="currency" currency="USD" value={dueNow} /></b>
          </div>
          <div className="pay-on-account__title u-color-secondarytext">
            <FormattedMessage {...selfMessages.payOnAccountBalance} />
          </div>
          {
            receiptNumbers && receiptNumbers.length > 0 ?
              <div className="pay-on-account__balances">
                <FormattedMessage {...selfMessages.balancesOnReceipts} />
                {
                  receiptNumbers.map((item, index) => (
                    <div key={index} className="pay-on-account__receipts">
                      <a href={item.value} target="_blank" rel="noopener noreferrer">
                        <FormattedDyncMessage value={`${item.key} `} />
                      </a>
                      <Icon
                        name="ex-link-m"
                        aria-label="open receipt icon"
                        className="icon-balances-arrow"
                      />
                      {
                        index !== receiptNumbers.length - 1 ? <span>{','}</span> : null
                      }
                    </div>
                  ))
                }
              </div> : null
          }
        </div>
        <div className="an-col an-split-line" />
      </div>
    );
  }
}
