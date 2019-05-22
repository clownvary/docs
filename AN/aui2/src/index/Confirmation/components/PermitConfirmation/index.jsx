import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-base-ui/lib/components/Button';
import UIComponent from 'shared/components/UIComponent';
import { redirect } from 'shared/actions/route';
import formatCharge from 'shared/utils/formatCharge';
import openTheExistingPage from 'shared/utils/openTheExistingPage';
import URL from 'shared/urls';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { newWindow } from 'shared/utils/func';
import { pages } from 'shared/consts';

import TransactionItem from './TransactionItem';
import { fetchPermitConfirmation } from '../../actions/permitConfirmation';
import './index.less';


export class PermitConfirmation extends UIComponent {
  constructor(props) {
    super(props);

    this.bind('newReservation');
  }

  render() {
    const data = this.props.data.toJS();
    const { receiptHeaderID, permitWording } = this.props.initialData;
    // if permit_number is not empty, it's permit-modify,
    // otherwise it's new reservation
    const permitNumber = data.permitNumber;

    let permitId = 0;
    let allTotalChange = 0;

    data.permitTransactions.forEach((item) => {
      allTotalChange += +item.total_charge;
      permitId = item.view_permit_id;
    });

    // if autoPrintReceipts is true, doesn't need to run openPermitPage()
    // because openReceiptPage() will open both receipt and permit pages
    // it's an existing bug, will fix in the future
    if (data.autoPrintReceipts) {
      PermitConfirmation.openReceiptPage(receiptHeaderID);
    } else if (data.autoPrintPermits) {
      data.permitTransactions.forEach((item) => {
        PermitConfirmation.openPermitPage(item.view_permit_id);
      });
    }

    return (
      <div className="permit-confirmation">
        <div className="header">
          <h1 className="title">Confirmation</h1>
          <Button type="primary" size="sm" onClick={this.newReservation}>New Reservation</Button>
        </div>
        <section className={`automatic-email-section ${permitNumber ? '' : 'u-hidden'}`}>
          <h2>Permit #{permitNumber} is successfully modified.</h2>
        </section>
        <section className={`automatic-email-section ${permitNumber ? 'u-hidden' : ''}`}>
          <h2>Transaction has been completed for {decodeHtmlStr(data.permitOwnerName)}!</h2>
          <small className={`${data.automaticReceiptEmail ? '' : 'u-hidden'}`}>
            A confirmation E-mail has been sent
            to {
              data.companyName ?
              decodeHtmlStr(data.companyName) :
              decodeHtmlStr(data.customerName)
              }.
          </small>
        </section>
        <section className={`permit-transactions-section panel ${permitNumber ? 'u-hidden' : ''}`}>
          <header className="header">
            <h3 className="title">Receipt Summary #{data.receiptNumber}</h3>
            <a
              className="link view-link"
              onClick={() => { PermitConfirmation.openReceiptPage(receiptHeaderID); }}
            >
              <i className="icon icon-file-solid-m" /> Receipt
            </a>
            <a
              className="link view-link"
              onClick={() => { PermitConfirmation.openPermitPage(permitId); }}
            >
              <i className="icon icon-file-solid-m" /> {decodeHtmlStr(permitWording)}
            </a>
          </header>
          <section className="transaction-section">
            <div className="title">TRANSACTION ITEMS</div>
            <ul className="transaction-list">
              {
                data.permitTransactions.map((item, i) => (
                  <TransactionItem key={`${item.permit_id}_${i}`} transaction={item} />
                  ))
              }
            </ul>
          </section>
          <footer className="page-footer">
            <span className="total">TOTAL</span>
            <span className="text-color-strong">{formatCharge(allTotalChange)}</span></footer>
        </section>
      </div>
    );
  }

  newReservation() {
    this.props.redirect(pages.buildUrl(pages.calendarPage, { permit_id: 0 }));
  }

  static openReceiptPage(id) {
    openTheExistingPage(`${window.__environment__.ROOT_URL}/servlet/ShowReceipt.sdi?receiptheader_id=${id}&printableversion=true&new_window=yes`,
      'receipt page', '1000', '650', 'yes');
  }

  static openPermitPage(permitID) {
    const permitContractUrl = getDynamicUrl(URL.permitContract, { permitID });
    newWindow(permitContractUrl, permitID);
  }

  componentWillMount() {
    this.props.fetchPermitConfirmation(this.props.initialData.receiptHeaderID);
  }

}

export default connect(
  null,
  {
    fetchPermitConfirmation,
    redirect
  }
)(PermitConfirmation);
