import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import unescape from 'lodash/unescape';
import formatCharge from 'shared/utils/formatCharge';
import fetchStatus from '../../consts/permitsTooltipFetchStatus';

export default class EventInfoTooltip extends UIComponent {
  renderEventInfo = (item) => {
    const eventNumber = da.get(item, 'event_number');
    const bookingNumber = da.get(item, 'booking_number');
    const showDates = bookingNumber !== 0;
    const companyName = da.get(item, 'company_name');
    return (<div className="an-eventinfo-tooltip__content">
      <div>
        <strong>
          { eventNumber } event{ eventNumber === 1 || eventNumber === 0 ? '' : 's'}
          &nbsp;({ bookingNumber } booking item{ bookingNumber === 1 || bookingNumber === 0 ? '' : 's'})
        </strong>
      </div>
      <div>
        <label htmlFor="eslint">Customer/Org</label>
        <span>{unescape(companyName || da.get(item, 'customer_name'))}</span>
      </div>
      {
        showDates ?
          <div>
            <label htmlFor="eslint">From</label>
            <span>{unescape(da.get(item, 'permit_start_date'))}</span>
          </div> : null
      }
      {
        showDates ?
          <div>
            <label htmlFor="eslint">To</label>
            <span>{unescape(da.get(item, 'permit_end_date'))}</span>
          </div> : null
      }
      <div>
        <label htmlFor="eslint">Status</label>{da.get(item, 'permit_status')}
      </div>
      <div>
        <label htmlFor="eslint">Invoice
          Total</label>{formatCharge(da.get(item, 'invoiceTotal'))}
      </div>
      <div>
        <label htmlFor="eslint">Outstanding
          Balance</label>{formatCharge(da.get(item, 'outstandingBalance'))}
      </div>
    </div>);
  }

  renderError = item => (
    <div className="an-eventinfo-tooltip__content">
      <p className="permit-tooltip-loading-error">
        {da.get(item, 'fetchingErrorMessage')}
      </p>
    </div>
    )

  render() {
    const { item } = this.props;
    const fetched = da.get(item, 'fetched');

    if (fetched === fetchStatus.FETCHED) {
      return this.renderEventInfo(item);
    } else if (fetched === fetchStatus.FETCHED_WITH_ERROR) {
      return this.renderError(item);
    }

    return null;
  }
}
