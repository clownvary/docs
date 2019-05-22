import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import { findDOMNode } from 'react-dom';
import { CollapsePanel } from 'react-base-ui/lib/components';
import { createColResizable } from 'react-base-ui/lib/helper';
import Table from 'react-base-ui/lib/components/Table';
import Globalize from 'react-base-ui/lib/services/i18n';
import formatAmount from '../../utils/formatAmount';
import dateStringSorter from '../../utils/dateStringSorter';
import './index.less';

export default class PaymentSchedules extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  getTableProps = rows => ({
    sortable: true,
    rowSeperator: true,
    rows,
    ariaLableExpand: 'Expand detail clickable arrow',
    ariaLableCollapse: 'Collapse detail clickable arrow',
    columns: [
      { title: 'DUE DATE', keyName: 'dueDate', sorter: dateStringSorter(Globalize.ANDateFormat), minWidth: 120, className: 'due-date' },
      { title: 'AMOUNT DUE', keyName: 'amount', sorter: true, format: formatAmount, minWidth: 130, className: 'amount fee' },
      { title: 'AMOUNT PAID', keyName: 'paid', sorter: true, format: formatAmount, minWidth: 133, className: 'paid fee' },
      { title: 'WITHDRAWAL ADJUSTMENT', keyName: 'withdrawnAdjustment', format: formatAmount, sorter: true, minWidth: 220, className: 'adjustment fee' },
      { title: 'BALANCE', keyName: 'balance', sorter: true, format: formatAmount, minWidth: 100, className: 'balance fee' }
    ]
  })

  paymentSchedulesSummary() {
    const { paymentSchedules } = this.props;
    return (
      <div className="payment-schedules-summary">
        <p>
          <span>Original Balance: </span>
          <span>{formatAmount(paymentSchedules.original_balance)}</span>
        </p>
        <p>
          <span>Current Balance: </span>
          <span>{formatAmount(paymentSchedules.current_balance)}</span>
        </p>
      </div>
    );
  }

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { paymentSchedules } = this.props;
    const paymentSchedulesRowsData = paymentSchedules.schedules.map(item => ({
      data: {
        dueDate: item.due_date,
        amount: item.amount,
        paid: item.paid,
        balance: item.balance,
        withdrawnAdjustment: item.withdrawn_adjustment
      }
    }));
    const title = 'Payment Schedules';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;

    return (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="payment-schedules"
        onExpand={() => { createColResizable(findDOMNode(this._refs.table)); this.toggleState(); }}
        onCollapse={this.toggleState}
        summary={this.paymentSchedulesSummary()}
      >
        <Table
          ref={(t) => { this._refs.table = t; }}
          {...this.getTableProps(paymentSchedulesRowsData)}
        />
      </CollapsePanel>
    );
  }
}
