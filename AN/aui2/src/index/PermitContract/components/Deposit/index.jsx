import React from 'react';
import { findDOMNode } from 'react-dom';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Table from 'react-base-ui/lib/components/Table';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import createColResizable from 'react-base-ui/lib/helper/colResizable';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import formatAmount from '../../utils/formatAmount';
import './index.less';

class Deposit extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  depositColumns = [
    { title: 'EVENT', keyName: 'event_name', className: 'format-event', format: decodeHtmlStr, sorter: true, minWidth: 93 },
    { title: 'RESOURCE', keyName: 'resource_name', className: 'format-resource', format: decodeHtmlStr, sorter: true, minWidth: 112 },
    { title: 'DEPOSIT FEE', keyName: 'charge_name', className: 'format-deposit-fee', format: decodeHtmlStr, sorter: true, minWidth: 124 },
    { title: 'CHARGE', keyName: 'charge_amount_no_tax', className: 'format-amount fee', format: formatAmount, sorter: true, minWidth: 85 },
    { title: 'TAX', keyName: 'tax', className: 'format-amount fee', format: formatAmount, sorter: true, minWidth: 55 },
    { title: 'AMOUNT PAID', keyName: 'amount_paid', className: 'format-amount-paid fee', format: formatAmount, sorter: true, minWidth: 120 },
    { title: 'REFUNDS', keyName: 'refunds', className: 'format-amount fee', format: formatAmount, sorter: true, minWidth: 90 },
    { title: 'BALANCE', keyName: 'balance', className: 'format-balance fee', format: formatAmount, sorter: true, minWidth: 100 }
  ];

  depositToRows = deposits => deposits.map(deposit => ({ data: deposit }));

  tableProps = (columns, rows) => ({
    sortable: true,
    striped: true,
    columns,
    rows,
    className: 'deposit-table',
    ariaLableExpand: 'Expand detail clickable arrow',
    ariaLableCollapse: 'Collapse detail clickable arrow'
  });

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { deposits } = this.props;
    const title = 'Deposit';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;
    return deposits && count(deposits) > 0 ? (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="section-container deposit"
        onExpand={() => { createColResizable(findDOMNode(this._refs.table)); this.toggleState(); }}
        onCollapse={this.toggleState}
      >
        <Table
          ref={(t) => { this._refs.table = t; }}
          {...this.tableProps(this.depositColumns, this.depositToRows(deposits))}
        />
      </CollapsePanel>
    ) : null;
  }
}

export default Deposit;
