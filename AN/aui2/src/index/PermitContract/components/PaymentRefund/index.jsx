import React from 'react';
import { findDOMNode } from 'react-dom';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Table from 'react-base-ui/lib/components/Table';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import createColResizable from 'react-base-ui/lib/helper/colResizable';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import Globalize from 'react-base-ui/lib/services/i18n';
import formatAmount from '../../utils/formatAmount';
import dateStringSorter from '../../utils/dateStringSorter';
import './index.less';

const renderResourceCell = resource => (resource === '' ? '--' : resource);

class PaymentRefund extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  paymentRefundColumns = [
    { title: 'RECEIPT #', keyName: 'receipt_number', className: 'format-receipt', sorter: true, minWidth: 115 },
    { title: 'DATE', keyName: 'transaction_date', className: 'format-date', format: decodeHtmlStr, sorter: dateStringSorter(Globalize.ANDateFormat), minWidth: 86 },
    { title: 'FEE DESCRIPTION', keyName: 'charge_name', className: 'format-fee-desc', format: decodeHtmlStr, sorter: true, minWidth: 155 },
    { title: 'EVENT', keyName: 'event_name', className: 'format-event', format: decodeHtmlStr, sorter: true, minWidth: 86 },
    { title: 'RESOURCE', keyName: 'resource_name', className: 'format-resource', format: renderResourceCell, sorter: true, minWidth: 115 },
    { title: 'PAYMENT/REFUND', keyName: 'applied_amount', className: 'format-amount fee', format: formatAmount, sorter: true, minWidth: 160 }
  ];

  paymentRefundToRows = paymentRefunds =>
    paymentRefunds.map(paymentRefund => ({ data: paymentRefund }));

  tableProps = (columns, rows) => ({
    sortable: true,
    striped: true,
    columns,
    rows,
    className: 'payment-refund-table',
    ariaLableExpand: 'Expand detail clickable arrow',
    ariaLableCollapse: 'Collapse detail clickable arrow'
  });

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { paymentRefunds } = this.props;
    const title = 'Payment and Refund';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;
    return paymentRefunds && count(paymentRefunds) ? (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="section-container payment-refund"
        onExpand={() => { createColResizable(findDOMNode(this._refs.table)); this.toggleState(); }}
        onCollapse={this.toggleState}
      >
        <Table
          ref={(t) => { this._refs.table = t; }}
          {...this.tableProps(this.paymentRefundColumns, this.paymentRefundToRows(paymentRefunds))}
        />
      </CollapsePanel>
    ) : null;
  }
}

export default PaymentRefund;
