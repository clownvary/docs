import React from 'react';
import { FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';
import './index.less';
import ReceiptTransaction from '../ReceiptTransaction';
import selfMessages from '../../../ShoppingCart/components/Transactions/translations';

export default class ReceiptList extends React.PureComponent {
  static getTransactions(transactions, firstName, lastName) {
    const isNameUnspecified = !(firstName || lastName);

    return transactions && transactions.length > 0 ?
      (
        <div className="receipt-list__content--right receipt-col">
          { transactions.map((transaction, _index) => (
            <ReceiptTransaction
              key={_index}
              isLastOne={_index === transactions.length - 1}
              transactions={transaction}
              isNameUnspecified={isNameUnspecified}
            />
            ))
          }
        </div>
      ) : null;
  }

  getParticipants() {
    const { participants } = this.props;
    const participantsLength = participants.length;

    return participants && participantsLength > 0 ?
      (
        <div className="an-grid receipt__participants">
          {
            participants.map((item, index) => (
              <div key={index} className="receipt-list__content an-grid">
                <div className="receipt-list__content--left receipt-col">
                  <div className="receipt-initial__name">
                    <div className={`dync-bg-set${(index % 8) + 1}`}>
                      <FormattedDyncMessage className="receipt__shortname" value={item.shorthand_name || 'U'} />
                    </div>
                  </div>
                  {
                    item.first_name || item.last_name ?
                      <b className="customer_name">
                        <FormattedDyncMessage value={item.first_name} />
                        <FormattedDyncMessage value={item.last_name} />
                      </b> :
                      <b className="customer_name">
                        <FormattedMessage {...selfMessages.nameUnspecified} />
                      </b>
                  }
                </div>
                <div className="an-col an-split-line receipt--top__line" />
                {
                  this.constructor
                  .getTransactions(item.transactions, item.first_name, item.last_name)
                }
                {
                  index < participantsLength - 1 && <div className="an-col an-split-line" />
                }
              </div>))
          }
        </div>
      ) : null;
  }

  render() {
    return (
      <div className="receipt-list__pannel an-grid an-col-1">
        {
          this.getParticipants()
        }
        {
          this.props.participants.length ? <div className="an-col an-split-line bottom-line" /> : null
        }
      </div>
    );
  }

}
