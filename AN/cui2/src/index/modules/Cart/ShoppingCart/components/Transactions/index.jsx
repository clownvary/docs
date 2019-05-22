import React from 'react';
import { connect } from 'react-redux';
import Participant from './Participant';
import PayOnAccount from './PayOnAccount';
import { confirmDelete, clearExpandStatustAction } from '../../actions/transactions';

import './index.less';

export class Transactions extends React.PureComponent {

  componentWillUnmount() {
    this.props.clearExpandStatustAction();
  }

  render() {
    const { transactions } = this.props;
    const { payOnAccount, isRequired, participants, expandedStatus, hasExpandedStatus,
       paymentPlans }
      = transactions.toJS();

    return (
      <div className="transactions-layouts">
        {
          payOnAccount.map((PayOnAccountList, index) => (
            <PayOnAccount
              key={index}
              isLastOne={index === PayOnAccountList.length - 1}
              showDeleteTransactionAlert={id => this.props.confirmDelete(id)}
              payOnAccountList={PayOnAccountList}
              isRequired={isRequired}
            />
          ))
        }
        {
          participants.map((item, index) =>
            (<Participant
              participant={item}
              key={index}
              index={index}
              expandedStatus={expandedStatus}
              hasExpandedStatus={hasExpandedStatus}
              paymentPlans={paymentPlans}
            />)
          )
        }
      </div>
    );
  }
}

export default connect(
  null,
  {
    confirmDelete,
    clearExpandStatustAction
  }
)(Transactions);
