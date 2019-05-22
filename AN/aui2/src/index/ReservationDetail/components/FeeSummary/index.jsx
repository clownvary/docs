import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import FeeFooter from 'shared/components/PermitFee/FeeFooter';

import './index.less';

export default class FeeSummary extends UIComponent {

  render() {
    const { summary } = this.props;
    const feeSummary = summary.get('feeSummary');
    const amountPaid = feeSummary.get('amountPaid');
    const unpaidAmount = feeSummary.get('dueNow');
    const refundAmount = feeSummary.get('refundAmount');

    return (
      <div className="feeSummary">
        <FeeFooter
          subTotal={formatCharge(feeSummary.get('subTotal'))}
          taxes={feeSummary.get('taxes').toJS()}
          total={formatCharge(feeSummary.get('total'))}
          subTotalTxt="Subtotal of event(s)"
          amountPaid={formatCharge(amountPaid || 0)}
          unpaidAmount={formatCharge(unpaidAmount || null)}
          refundAmount={formatCharge(refundAmount ? Math.abs(refundAmount) : null)}
        />
      </div>
    );
  }
}
