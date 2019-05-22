import React from 'react';
import { connect } from 'react-redux';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';

import ReservationDetail from './reservationDetail';
import { deleteReservationCart } from '../../actions/reservation';


import './index.less';

export class ReservationList extends UIComponent {
  constructor(props) {
    super(props);

    this.showCalendar = this.onShowOtherPage.bind(this, pages.calendarPage);

    this.bind('onDeleteReservation');
  }

  onShowOtherPage(pageIndex) {
    const { batchID, receiptID, receiptEntryID } = this.props.initialData;

    this.props.redirect(pages.buildUrl(pageIndex, {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID
    }));
  }

  onDeleteReservation() {
    this.props.showWaringAlert();
  }

  render() {
    const facility = this.props.facility;
    const facilityAmount = formatCharge(facility.total);
    const facilityFees = facility.facility_fees;
    const taxes = facility.taxes;
    let taxTotal = 0;
    taxes.forEach((tax) => {
      taxTotal += tax.amount;
    });

    const taxAmount = formatCharge(taxTotal);

    return (
      <div className="reservation-item">
        <div className={'aaui-flex afx-xl-mg-12 summary'}>
          <div className="afx-col afx-xl-9-12 name">{decodeHtmlStr(facility.description)}</div>
          <div className="afx-col afx-xl-3-12 align-right">{facilityAmount}</div>
        </div>
        <div className="action-group">
          <span className="action" title="Add another booking to this reservation" onClick={this.showCalendar}>
            <i className="icon icon-calendar-add-m" />
            Modify booking
          </span>
          <span className="action" title="Delete this reservation" onClick={this.onDeleteReservation}>
            <i className="icon icon-trash" />
            Delete
          </span>
        </div>
        <div className={`aaui-flex detail-list ${facilityFees.length ? '' : 'u-hidden'}`}>
          {
            facilityFees.map((facilityFee) => {
              const facilityFeeKey = `facilityFee_${facilityFee.facility_id}`;

              return (
                <ReservationDetail facilityFee={facilityFee} key={facilityFeeKey} />
              );
            })
          }
          <div className={`aaui-flex afx-xl-mg-12 detail-item ${taxTotal === 0 ? 'u-hidden' : ''}`}>
            <div className="afx-col afx-xl-9-12 name">Tax</div>
            <div className="afx-col afx-xl-3-12 align-right">{taxAmount}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    deleteReservationCart,
    redirect
  }
)(ReservationList);
