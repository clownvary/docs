import React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from './translations';
import ReceiptList from '../ReceiptList';
import ReceiptTotalAmount from '../ReceiptTotalAmount';
import ReceiptPayOnAccount from '../ReceiptPayOnAccount';
import './index.less';

export class ReceiptSummary extends React.PureComponent {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  render() {
    const { orderSummary, payOnAccount, participants
  } = this.props;

    return (
      <div className="receipt-summary__pannel">
        <div className="an-panel an-grid an-col-1">
          <div className="an-col receipt-summary__header">
            <div className="an-grid an-col-left">
              <h2 className="receipt__title"><FormattedMessage {...selfMessages.title} /></h2>
            </div>
          </div>
          <div className="an-col an-split-line receipt--bottom__line" />
          <div className="an-col">
            {
              payOnAccount.map((item, index) => (
                <ReceiptPayOnAccount
                  key={index}
                  payOnAccountList={item}
                />
              ))
            }
          </div>
          <div className="an-col">
            <ReceiptList participants={participants} />
          </div>
          <div className="an-col an-col-right">
            <ReceiptTotalAmount orderSummary={orderSummary} />
          </div>
        </div>
      </div>
    );
  }

}
export default injectIntl(ReceiptSummary);
