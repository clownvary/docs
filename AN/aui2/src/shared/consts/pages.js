import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import { getGlobalState, getQueryParams } from 'shared/utils/globalStateHelper';
/* This enum indicate that previous page of current page,
 and can be used for back button.
*/

export const calendarPage = 0;
export const reservationsPage = 1;
export const permitDetailPage = 2;
export const reservationDetailPage = 3;
export const cartPage = 4;
export const paymentPage = 5;
export const refundDepositsPage = 6;
export const confirmationPage = 7;
export const reloadReservationDetailPage = 8;
export const paymentModificationPage = 9;
export const stageSequencePage = 10;

// params for the redirect page
export const PAY_NOW = 1; // modify permit and must pay all in payment page immediately.
// Choose modify payment plan when click "Confirm Change" button in the reservation detail page
export const PAY_PLAN = 2;
export const PAY_IN_RESERVATION = 3; // Payment button in the action bar of reservation detail page
export const CHARGE_IN_REFUND_FEES = 4;
export const CALENDAR = 0;

// Search section of the page url
export const sourcePageKey = 'source_page_index';
export const entryPageKey = 'entry_page_index';
export const paymentPageIndex = 'payment_page_index';
export const cancelPermit = 'cancel_permit';

export const pageUrls = {
  [calendarPage]: 'ui.do?method=booking',
  [reservationsPage]: 'ui.do?method=showPermits',
  [permitDetailPage]: 'ui.do?method=showPermitDetail',
  [reservationDetailPage]: 'ui.do?method=reservationDetail',
  [cartPage]: 'ui.do?method=showCart',
  [paymentPage]: 'ui.do?method=showPayment',
  [refundDepositsPage]: 'ui.do?method=permitRefund',
  [confirmationPage]: 'ui.do?method=showConfirmation',
  [reloadReservationDetailPage]: 'ui.do?method=reloadReservationDetail',
  [paymentModificationPage]: 'ui.do?method=paymentModification',
  [stageSequencePage]: 'ui.do?method=showPermitStageSequence'
};

export const staticPageUrls = {
  [calendarPage]: 'index.Resource.html',
  [reservationsPage]: 'index.Reservation.html',
  [permitDetailPage]: 'index.PermitDetail.html',
  [reservationDetailPage]: 'index.ReservationDetail.html',
  [cartPage]: 'index.Cart.html',
  [paymentPage]: 'index.Payment.html',
  [refundDepositsPage]: 'index.RefundDeposits.html',
  [confirmationPage]: 'index.Confirmation.html',
  [reloadReservationDetailPage]: 'index.ReservationDetail.html',
  [paymentModificationPage]: 'index.Payment.html'
};

export const buildUrl = (pageIndex, objParams) => {
  const params = [];
  const isRealUrl = isString(pageIndex);
  let pageUrl = '';

  if (isRealUrl) {
    pageUrl = pageIndex;
  } else if (__STATIC__) {
    pageUrl = `${staticPageUrls[pageIndex]}?`;
  } else {
    pageUrl = pageUrls[pageIndex];
  }

  if (objParams) {
    Object.keys(objParams).forEach((key) => {
      params.push(`&${key}=${objParams[key]}`);
    });
  }

  const {
    entryPageIndex,
    calendarMonthDate,
    calendarDayDate,
    calendarView,
    calendarDateFormat
  } = getGlobalState();
  const queryParams = getQueryParams();

  if (objParams && isUndefined(objParams.entry_page_index)) {
    if (!isUndefined(entryPageIndex)) {
      params.push(`&entry_page_index=${entryPageIndex}`);
    } else {
      params.push(`&entry_page_index=${queryParams.entry_page_index}`);
    }
  }

  if (!isUndefined(calendarDateFormat)) {
    params.push(`&calendar_month_date=${calendarMonthDate}`);
    params.push(`&calendar_day_date=${calendarDayDate}`);
    params.push(`&calendar_view_type=${calendarView}`);
    params.push(`&calendar_date_format=${calendarDateFormat}`);
  } else {
    params.push(`&calendar_month_date=${queryParams.calendar_month_date}`);
    params.push(`&calendar_day_date=${queryParams.calendar_day_date}`);
    params.push(`&calendar_view_type=${queryParams.calendar_view_type}`);
    params.push(`&calendar_date_format=${queryParams.calendar_date_format}`);
  }

  const url = isRealUrl ? `${pageUrl}${params.join('')}` :
    `${window.__environment__.ROOT_URL}/${pageUrl}${params.join('')}`;
  /* istanbul ignore next */
  return `${__STATIC__ ? '' : url}`;
};
