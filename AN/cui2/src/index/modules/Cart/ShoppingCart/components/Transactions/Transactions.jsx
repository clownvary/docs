import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import Transaction from './Transaction';
import { confirmDelete, setTransactionExpandStatus } from '../../actions/transactions';

import './transactions.less';

export class Transactions extends React.PureComponent {

  render() {
    const { transactions, isNameUnspecified, expandedStatus, hasExpandedStatus,
       paymentPlans } = this.props;
    return (
      <div className="transactions">
        {transactions.map((transaction, index) => {
          let paymentPlan = {};
          if (paymentPlans && paymentPlans.length > 0) {
            paymentPlan = find(paymentPlans, p => p.reno === transaction.reno) || {};
          }
          return (<Transaction
            key={transaction.receipt_entry_identity}
            isLastOne={index === transactions.length - 1}
            showDeleteTransactionAlert={(id, receiptEntryIdentity) =>
              this.props.confirmDelete(id, receiptEntryIdentity)}
            transaction={transaction}
            isNameUnspecified={isNameUnspecified}
            expandedStatus={expandedStatus}
            hasExpandedStatus={hasExpandedStatus}
            toggleTransactionExpandStatus={receiptEntryIdentity =>
              this.props.setTransactionExpandStatus(receiptEntryIdentity)}
            paymentPlan={paymentPlan}
          />);
        })}
      </div>
    );
  }
}

export default connect(
  null,
  {
    confirmDelete,
    setTransactionExpandStatus
  }
)(Transactions);
