import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import { confirm } from 'react-base-ui/lib/services/dialog';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import { redirect } from 'shared/actions/route';
import CashSummarySheet from 'shared/components/CashSummarySheet';
import {
  fetchCashSummarySheetAction,
  addCashSummarySheetCallBackAction
} from 'shared/actions/cashSummarySheet';
import { pages, AUIModuleLink } from 'shared/consts';

import './index.less';
import ReservationList from './reservationList';

import {
  reservationCheckOut,
  fetchReservationCart,
  deleteReservationCart
} from '../../actions/reservation';

export class Reservation extends UIComponent {
  constructor(props) {
    super(props);

    this.receiptEntryID = props.initialData.receiptEntryID;
    this.bind('reservationCheckOut', 'newReservation', 'modifyReservation');
  }

  reservationCheckOut() {
    this.props.addCashSummarySheetCallBackAction(() => this.props.reservationCheckOut());
    this.props.fetchCashSummarySheetAction();
  }

  showWaringAlert = () => {
    const option = {
      title: 'Delete Transaction',
      showCancel: true,
      cancelText: 'No',
      confirmText: 'Yes'
    };
    confirm('Are you sure you want to delete this transaction?', option)
    .then(() => {
      this.props.deleteReservationCart()
        .then(() => {
          this.receiptEntryID = 0;
        });
    })
    .catch(() => false);
  }

  newReservation() {
    const {
      batchID,
      receiptID
    } = this.props.initialData;

    this.props.redirect(pages.buildUrl(pages.calendarPage, {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: this.receiptEntryID
    }));
  }

  modifyReservation() {
    const {
      batchID,
      receiptID,
      receiptEntryID
    } = this.props.initialData;

    this.props.redirect(pages.buildUrl(pages.permitDetailPage, {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID
    }));
  }

  componentWillReceiveProps(nextProps) {
    const {
      batchID,
      receiptID,
      receiptEntryID
    } = this.props.initialData;

    if (nextProps.reservation.get('checkout')) {
      this.props.redirect(pages.buildUrl(pages.paymentPage, {
        batch_id: batchID,
        receipt_id: receiptID,
        receipt_entry_id: receiptEntryID,
        [pages.sourcePageKey]: pages.cartPage
      }));
    }
  }

  componentDidMount() {
    this.props.fetchReservationCart();
  }

  render() {
    const { reservation, initialData } = this.props;
    const reservationFees = reservation.get('reservationFees').toJS();
    const transactionFee = reservation.get('transactionFee');
    const transactionFeeAmount = formatCharge(transactionFee);
    const subTotal = formatCharge(reservation.get('subTotal'));
    const total = formatCharge(reservation.get('total'));
    const isLoadedData = reservation.get('isLoadedData');

    return (
      <div>
        {
          isLoadedData ?
            <div>
              <div className={`reservation ${reservationFees.length ? '' : 'u-hidden'}`}>
                <div className="panel">
                  <div className="reservation-title">Reservation</div>

                  <div className="aaui-flex reservation-header">
                    <div className="afx-col afx-xl-9-12">TRANSACTION DESCRIPTION</div>
                    <div className="afx-col afx-xl-3-12 align-right">AMOUNT</div>
                  </div>

                  <div className="reservation-list">
                    {
                      reservationFees.map((facility, index) => (
                        <ReservationList
                          key={`facility_${index}`} facility={facility} index={index}
                          showWaringAlert={this.showWaringAlert}
                          initialData={initialData}
                        />
                      ))
                    }
                  </div>

                  <div className="reservation-footer">
                    <div className="sub-fee">
                      <div className="fee-name">
                        <div>Subtotal</div>
                        <div className={transactionFee ? '' : 'u-hidden'}>Transaction Fee</div>
                      </div>
                      <div className="fee-amount">
                        <div>{subTotal}</div>
                        <div className={transactionFee ? '' : 'u-hidden'}>{transactionFeeAmount}</div>
                      </div>
                    </div>
                    <div className="total">
                      TOTAL
                    <span className="text-color-strong">{total}</span>
                    </div>
                  </div>
                </div>
                <div className="an-page__footer fixed">
                  <div className="an-page__footer__content">
                    <Button onClick={this.modifyReservation}>Back</Button>
                    <Button type="strong" onClick={this.reservationCheckOut}>Check Out</Button>
                  </div>
                </div>
                <div className="an-page__placeholder" />
              </div>
              <div className={`cart-empty ${reservationFees.length ? 'u-hidden' : ''}`}>
                <div className="icon icon-cart-m" />
                <div className="message">Your shopping cart is empty.</div>
                <div className="link" onClick={this.newReservation}>
                  <i className="icon icon-chevron-left" />
                  {`Back to ${AUIModuleLink.facility}`}
                </div>
              </div>
            </div>
            : ''
        }

        <CashSummarySheet />
      </div>
    );
  }
}

export default connect(
  null,
  {
    reservationCheckOut,
    fetchReservationCart,
    deleteReservationCart,
    redirect,
    fetchCashSummarySheetAction,
    addCashSummarySheetCallBackAction
  }
)(Reservation);
