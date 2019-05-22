import React from 'react';
import PropertyList from 'react-base-ui/lib/components/PropertyList';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import formatAmount from '../../utils/formatAmount';
import './index.less';

export default class ChargeSummary extends React.PureComponent {
  getChargeSummaryData() {
    const { chargeSummary } = this.props;
    const totalRentalFees = chargeSummary.charge_adjustment_for_refund;
    let { tax_list: taxList = [] } = chargeSummary;
    taxList = taxList.map(item => ({
      name: decodeHtmlStr(item.name),
      value: formatAmount(item.amount)
    }));

    const data = [
      {
        name: 'Rental Fee',
        value: formatAmount(chargeSummary.rental_fees)
      },
      ...taxList,
      {
        name: 'Discounts',
        value: formatAmount(chargeSummary.discounts)
      },
      {
        name: 'Charge Adjustment for Refund',
        value: totalRentalFees ? formatAmount(totalRentalFees) : ''
      },
      {
        name: 'Subtotal',
        value: formatAmount(chargeSummary.total_rental_fees),
        className: 'subtotal'
      },
      {
        name: 'Deposits',
        value: formatAmount(chargeSummary.deposits)
      },
      {
        name: 'Deposit Discounts',
        value: formatAmount(chargeSummary.deposits_discounts)
      },
      {
        name: 'Total Permit Fee',
        value: formatAmount(chargeSummary.total_permit_fee),
        className: 'total-fee'
      },
      {
        name: 'Total Payment',
        value: formatAmount(chargeSummary.total_payments)
      },
      {
        name: 'Refunds',
        value: formatAmount(chargeSummary.refunds)
      },
      {
        name: 'Balance',
        value: formatAmount(chargeSummary.balance)
      }
    ];

    return data;
  }

  render() {
    return (
      <div className="widget charges-container">
        <div className="charges-summary">
          <PropertyList items={this.getChargeSummaryData()} />
        </div>
      </div>
    );
  }
}

