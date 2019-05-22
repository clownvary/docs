import React from 'react';
import { connect } from 'react-redux';
import { tealiumService } from 'shared/services';
import TealiumPages from 'shared/services/tealium/consts/pages';

import ReceiptCode from './components/ReceiptCode';
import ReceiptSummary from './components/ReceiptSummary';
import './index.less';

export class Confirmation extends React.PureComponent {

  componentDidMount() {
    tealiumService.sendView(TealiumPages.CONFIRMATION);
  }

  render() {
    const {
       receiptNumber,
       paymentInfo,
       orderSummary,
       payOnAccount,
       participants,
       showWidgets,
       sharingActivityName,
       sharingActivityId
      } = this.props.receiptSummary.toJS();
    return (
      <div className="module-Confirmation">
        <div className="an-grid an-col-mg-30 receiptcode__content">
          <ReceiptCode
            receiptNumber={receiptNumber}
            sharingActivityName={sharingActivityName}
            sharingActivityId={sharingActivityId}
            showWidgets={showWidgets}
          />
        </div>
        <div className="an-grid an-col-mg-30">
          <ReceiptSummary
            paymentInfo={paymentInfo}
            orderSummary={orderSummary}
            payOnAccount={payOnAccount}
            participants={participants}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    receiptSummary: state.modules.Cart.Confirmation.receiptSummary
  })
)(Confirmation);
