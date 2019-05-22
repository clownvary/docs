import React from 'react';

import Transactions from './Transactions';
import ParticipantHeader from './ParticipantHeader';

import './participant.less';

export default class Participant extends React.PureComponent {

  render() {
    const {
        participant,
        participant: { transactions },
        index,
        expandedStatus,
        hasExpandedStatus,
        paymentPlans
       } = this.props;

    const {
      first_name: firstName,
      last_name: lastName
    } = participant;

    const isNameUnspecified = !(firstName || lastName);

    return (
      <div className="an-panel an-grid an-col-1 participant">
        <div className="an-col">
          <ParticipantHeader participant={participant} index={index} />
        </div>
        <div className="an-col an-split-line" />
        <div className="an-col">
          <Transactions
            transactions={transactions}
            isNameUnspecified={isNameUnspecified}
            expandedStatus={expandedStatus}
            hasExpandedStatus={hasExpandedStatus}
            paymentPlans={paymentPlans}
          />
        </div>
      </div>
    );
  }
}
