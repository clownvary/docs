import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import AMIds from '../../automationIds';
/* eslint-disable object-shorthand */
const checkboxColum = {
  name: 'checkbox',
  value: 'checkbox',
  title: '',
  cellClassName: 'afx-xl-1-16 align-left',
  render(content, rowIndex, row) {
    const id = da.get(row, 'id');
    const selected = da.get(row, 'selected');
    const onSelect = this.props.onSelect;

    return (
      <div className="aaui-table-cell control-cell">
        <Checkbox
          data-qa-id={AMIds.rentalFees.fee}
          checked={selected}
          onChange={e => onSelect(id, e.target.checked)}
        />
      </div>
    );
  }
};


const descriptionColumn = {
  name: 'charge_description',
  value: 'charge_description',
  title: 'RENTAL FEE',
  cellClassName: 'afx-xl-7-16 cell',
  render(content, rowIndex, row) {
    const name = da.get(row, 'name');
    const selected = da.get(row, 'selected');
    const refundMessage = da.get(row, 'refundMessage');
    return (
      <div className="aaui-table-cell control-cell cell">
        {name}
        { selected && refundMessage ? <div className="refund-message"><i className="icon icon-exclamation-circle" />{refundMessage}</div> : null }
      </div>
    );
  }
};
/* eslint-disable object-shorthand */

const amountColumn = {
  name: 'labelChargeAmount',
  value: 'labelChargeAmount',
  title: 'AMOUNT',
  cellClassName: 'afx-xl-3-16 align-right cell'
};

const linkedCreditColumn = {
  name: 'linkedCredit',
  value: 'linkedCredit',
  title: 'LINKED CREDIT',
  cellClassName: 'afx-xl-3-16 align-right cell'
};

const paidColumn = {
  name: 'labelPaidAmount',
  value: 'labelPaidAmount',
  title: 'PAID',
  cellClassName: 'afx-xl-2-16 align-right cell'
};

export const allColumns = [
  checkboxColum,
  descriptionColumn,
  amountColumn,
  linkedCreditColumn,
  paidColumn
];

export const authorityColumns = [
  checkboxColum,
  descriptionColumn,
  amountColumn,
  linkedCreditColumn,
  paidColumn
];
