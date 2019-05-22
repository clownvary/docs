import PropTypes from 'prop-types';
import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import './index.less';

const renderUpdateDetailLabel = (payOrRefundTitle) => {
  if (typeof payOrRefundTitle === 'undefined') {
    return [
      <div className="stress-text">TOTAL</div>,
      <div>Paid</div>
    ];
  }

  return [
    <div className="amount-update amount-update-total">Total</div>,
    <div>Paid</div>,
    <div className="amount-update amount-update-detail">{ payOrRefundTitle }</div>
  ];
};

const renderUpdateDetailAmount = (total, amountPaid, updateAmount) => {
  if (typeof updateAmount === 'undefined') {
    return [
      <div className="stress-text text-color-strong">{ total }</div>,
      <div>{ amountPaid }</div>
    ];
  }

  return [
    <div className="amount-update amount-update-total">{ total }</div>,
    <div>{ amountPaid }</div>,
    <div className="amount-update amount-update-detail">{ updateAmount }</div>
  ];
};

export default class FeeFooter extends UIComponent {

  static propTypes = {
    subTotal: PropTypes.string.isRequired,
    taxes: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired
  };

  render() {
    const {
      subTotal,
      taxes,
      total,
      unpaidAmount,
      amountPaid,
      refundAmount,
      subTotalTxt
    } = this.props;
    const isShowFeeUpdateDetails = unpaidAmount || refundAmount;
    const payOrRefundTitle = unpaidAmount ? 'Unpaid' : 'Refund';
    const updateAmount = unpaidAmount || refundAmount;

    return (
      <div className="permit-fee-list-footer" >
        <div className="aaui-flex">
          <div className="afx-col afx-xl-11-12 afx-col-right fee-amount-right">
            <div className="col-name">
              <div className="subtotal-text">{ subTotalTxt || 'Subtotal'}</div>
              {
                taxes.map((tax, index) => {
                  const taxNameKey = `tax_name_${index}`;
                  const taxName = tax.name;

                  return (
                    <div className="tax-detail" key={taxNameKey}>{decodeHtmlStr(taxName)}</div>
                  );
                })
              }
              { isShowFeeUpdateDetails ?
                renderUpdateDetailLabel(payOrRefundTitle) :
                renderUpdateDetailLabel()
              }
            </div>
            <div className="col-amount">
              <div>{subTotal}</div>
              {
                taxes.map((tax, index) => {
                  const taxMountKey = `tax_mount_${index}`;
                  const taxAmount = formatCharge(tax.amount);

                  return (
                    <div key={taxMountKey}>{taxAmount}</div>
                  );
                })
              }
              { isShowFeeUpdateDetails ?
                renderUpdateDetailAmount(total, amountPaid, updateAmount) :
                renderUpdateDetailAmount(total, amountPaid)
              }
            </div>
          </div>
          <div className="afx-col afx-xl-1-12" />
        </div>
      </div>
    );
  }
}
