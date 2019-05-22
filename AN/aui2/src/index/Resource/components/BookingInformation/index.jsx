import React from 'react';
import { connect } from 'react-redux';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import Button from 'react-base-ui/lib/components/Button';
import ConfirmAlert from 'shared/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { Toasts, Toast } from 'shared/components/Toast';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import BookingEvent from './BookingEvent';
import RecurringPatternModal from '../RecurringPatternModal';
import ClearRecurringConfirm from '../ClearRecurringConfirm';
import EventResource from './EventResource';
import ErrorSection from './ErrorSection';
import { bookingAPIErrorType } from '../../consts/bookingConflict';
import {
  getClientError,
  setClientErrorsAction,
  bookingPanelClearErrAction
} from '../../actions/bookingPanelValidation';
import {
  hasUnOverridedAdvancedError,
  hasUnOverridedConflict
} from '../../utils/hasBookingItemError';
import { enableScroll } from '../../utils/overflow';
import {
  showBookingPanelAction,
  existingPermitProceedAsyncAction,
  newPermitProceedAsyncAction,
  updateBookingToastContentAction
} from '../../actions/bookingPanel';
import { deleteAllBookingsAction } from '../../actions/bookingPanelDelete';
import './index.less';
import Position from '../../../../shared/components/Toast/Position';

export class BookingInformation extends UIComponent {
  constructor(props) {
    super(props);

    const { batchID, receiptID } = props.initialData;
    this.batchID = batchID;
    this.receiptID = receiptID;
    this.isShowIdentifier = true;
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqualImmutable(this.props.bookingPanel, nextProps.bookingPanel)
      || !shallowEqualImmutable(this.props.resize, nextProps.resize)
      || !shallowEqualImmutable(this.props.hideIntro, nextProps.hideIntro);
  }

  changeBodyScrollStyle = (showScroll) => {
    enableScroll(this.bodyContainer, showScroll);
  };

  getIdentifier = () => {
    const { customerCompany, permitNumber } = this.props.initialData;

    let identifier = '';

    if (customerCompany && customerCompany.customerId > 0) {
      identifier += customerCompany.customerName;
    }
    if (customerCompany && customerCompany.companyId > 0) {
      identifier += customerCompany.companyName;
    }
    if (permitNumber) {
      identifier += identifier ? ` (${permitNumber})` : permitNumber;
    }

    return identifier ? `- ${identifier}` : null;
  }

  onBookingLimitToastClose = () => {
    this.props.updateBookingToastContentAction('');
  }

  render() {
    const { bookingPanel, hideIntro, availableBookingCount, initialData,
      bookingLimitToastContent, configurationData } = this.props;
    const { permitID, eventID, receiptEntryID } = initialData;
    const display = bookingPanel.get('display');
    const bookingPanelResourceMap = bookingPanel.get('resourceMap');
    const bookingPanelRecurringMap = bookingPanel.get('recurringMap');
    const changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap');
    const waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds');
    const pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');

    const isNeedFillSchedule = bookingPanel.getIn(['template', 'isNeedFillSchedule']);
    const error = bookingPanel.get('error');
    const isBookingChanged = bookingPanel.get('isBookingChanged');
    const hasPendingBookingWhenIntoResouce = bookingPanel.get('hasPendingBookingWhenIntoResouce');
    const isEmptyDetails = availableBookingCount === 0;
    const errorBookings = error.get('bookings');
    const isValidFailed = error.get('clientMessages').size > 0 ||
      error.get('serverMessages').size > 0 ||
      error.get('eventName') ||
      hasUnOverridedConflict(errorBookings) ||
      hasUnOverridedAdvancedError(errorBookings, bookingAPIErrorType.OVER_ADVANCE_MAXIMUM) ||
      hasUnOverridedAdvancedError(errorBookings, bookingAPIErrorType.BELOW_ADVANCE_MINIMUM);

    const identifier = this.getIdentifier();
    const isDisableTheProceed = isValidFailed || isEmptyDetails
      || (
        permitID > 0 &&
        !isBookingChanged &&
        !hasPendingBookingWhenIntoResouce);

    return (
      <div ref={e => (this._refs.bookingInformation = e)} className="booking-information-wrapper">
        <ConfirmAlert
          ref={e => (this._refs.waitingListAlert = e)} className="waiting-list-alert"
          title="Reserve over Waiting List"
          type="confirm"
          onConfirm={() => { this.proceed(true); this.changeBodyScrollStyle(true); }}
          onClose={() => { this.closeWaitingListAlert(); this.changeBodyScrollStyle(true); }}
          onCancel={() => { this.closeWaitingListAlert(); this.changeBodyScrollStyle(true); }}
          cancelText="No"
          confirmText="Yes"
        >
          <div>
            <ul>
              {
                error.get('serverMessages').map((item, i) => <li key={i}>{decodeHtmlStr(item)}</li>)
              }
            </ul>
            <p>
              Proceed with the reservation?
            </p>
          </div>
        </ConfirmAlert>
        <ConfirmAlert
          ref={e => (this._refs.clearAllReservationsAlert = e)} className="clear-all-reservations-alert"
          title="Remove All Bookings"
          type="confirm"
          onConfirm={() => { this.clearAllReservations(); this.changeBodyScrollStyle(true); }}
          onClose={() => this.changeBodyScrollStyle(true)}
          onCancel={() => this.changeBodyScrollStyle(true)}
          cancelText="No"
          confirmText="Yes"
        >
          <div>
            <p>
              Are you sure you want to clear all the bookings?
            </p>
          </div>
        </ConfirmAlert>
        <RecurringPatternModal
          initialData={initialData}
          ref={e => (this._refs.recurringPatternModal = e)}
          changeBodyScrollStyle={this.changeBodyScrollStyle}
        />
        <ClearRecurringConfirm
          recurringClear={bookingPanel.get('recurringClear')}
          ref={e => (this._refs.clearRecurringModal = e)}
          changeBodyScrollStyle={this.changeBodyScrollStyle}
        />
        <div
          ref={e => (this._refs.bookingInfoTag = e)}
          className={`booking-information-tag ${hideIntro ? '' : 'intro-showElement'} intro-step-3
             ${display ? 'collapsing' : ''}
             ${isEmptyDetails ? 'no-item' : ''}`}
          onClick={this.open}
        >
          <span className={isEmptyDetails ? 'u-hidden' : ''}>
            <strong>{availableBookingCount} </strong> {`booking${availableBookingCount > 1 ? 's' : ''}`}
          </span>
        </div>
        <div className={`booking-information ${display ? 'expanding' : ''}`} ref={e => (this._refs.bookingInformationBody = e)}>
          <div className="booking-information-bg" ref={e => (this._refs.mask = e)} />
          <div className="booking-information-box">
            <div className="header">
              <div className="header__title">
                <h3>Reservation Information{' '}
                  {this.isShowIdentifier && identifier && <span>{identifier}</span>}
                </h3>
              </div>
              <i className="icon icon-close" onClick={this.close} />
            </div>
            <div className="body" ref={(ref) => { this.bodyContainer = ref; }}>
              <div className="body-top-dom" ref={e => (this._refs.bodyTopDOM = e)} />
              <ErrorSection error={error} />
              <BookingEvent
                display={display}
                eventNameErrs={error.get('eventName')}
                scheduleTypeIDErrs={error.get('scheduleTypeID')}
                eventName={bookingPanel.get('eventName')}
                scheduleTypes={configurationData.get('scheduleTypes')}
                scheduleTypeID={bookingPanel.get('scheduleTypeID')}
              />
              <EventResource
                setEditingRentalBlock={this.setEditingRentalBlock}
                configurationData={configurationData}
                bookingPanelResourceMap={bookingPanelResourceMap}
                bookingPanelRecurringMap={bookingPanelRecurringMap}
                changedBaseBookingMap={changedBaseBookingMap}
                waitingAppliedBaseBookingIds={waitingAppliedBaseBookingIds}
                pendingMovedRecurringBookingMap={pendingMovedRecurringBookingMap}
                resourceOrders={bookingPanel.get('resourceOrders')}
                isNeedFillSchedule={isNeedFillSchedule}
                resourcesErr={error.get('resources')}
                bookingsErr={errorBookings}
                display={display}
              />
              { bookingLimitToastContent &&
                <Toasts className="booking-information-toasts" position={Position.BOTTOM}>
                  <Toast
                    className="booking-limitation-toast"
                    duration={5}
                    onClose={this.onBookingLimitToastClose}
                  >
                    { bookingLimitToastContent }
                  </Toast>
                </Toasts>
              }
            </div>
            <div className="footer">
              {// Clear all reservation link should be removed when edit event.
                permitID > 0 && (eventID > 0 || receiptEntryID > 0) ? <div /> :
                <div
                  className={`clear-all ${isEmptyDetails ? 'disabled' : ''}`}
                  onClick={this.showClearAllReservationsAlert}
                >
                  <i className="icon icon-close" /> Clear Reservation
                </div>
              }
              <div className="bk-info__footer__btn-group">
                {
                  permitID > 0 &&
                  <Button
                    onClick={this.cancel}
                  >Cancel</Button>
                }
                <Button
                  className="aaui-button btn-proceed" type="strong"
                  disabled={isDisableTheProceed}
                  onClick={() => this.proceed(false)}
                >{permitID > 0 && (eventID > 0 || receiptEntryID > 0) ? 'Update Reservation' : 'Proceed'}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeWaitingListAlert = () => {
    this.props.cleanBookingInfoError();
  };

  showClearAllReservationsAlert = () => {
    this.changeBodyScrollStyle(false);
    this._refs.clearAllReservationsAlert.open();
  };

  clearAllReservations = () => {
    const { permitNumber } = this.props.initialData;

    /* istanbul ignore else */
    if (!permitNumber) {
      this.isShowIdentifier = false;
    }

    this.close();
    this.props.deleteAllBookingsAction();
    this.props.bookingPanelClearErrAction({
      errorKey: 'deleteAllBookings'
    });
    this._refs.clearAllReservationsAlert.onClose();
  };

  scrollToBodyTop = () => {
    // delay 30 milliseconds, after dom re-rendered, scroll to top
    /* istanbul ignore next */
    setTimeout(() => {
      this._refs.bodyTopDOM.scrollIntoView();
    }, 30);
  };

  conflictAllOverride = ({ key, value }) => {
    this.props.updateBookingInfoDetail({ key, value });
  };

  cancel = () => this.props.redirect(pages.buildUrl(pages.reloadReservationDetailPage, {
    batch_id: this.batchID,
    receipt_id: this.receiptID
  }))

  // actions of click proceed btn
  proceed = (checkWaitlist) => {
    // fix bug of https://jirafnd.dev.activenetwork.com/browse/ANE-50968
    // Attendance change alert message not pop
    // when there is conflict resource message display in booking information page
    // need to delay proceed, attendance can alert successfully
    const catchError = ({ payload }) => {
      const error = payload.headers;

      if (error.response_code && error.response_code === '1015') {
        this._refs.waitingListAlert.open();
        this.changeBodyScrollStyle(false);
      } else {
        this.scrollToBodyTop();
      }
    };
    setTimeout(() => {
      let isCheckForWaitlistConflict = true;
      const { bookingPanel, configurationData } = this.props;

      const permitID = this.props.initialData.permitID;

      if (checkWaitlist) {
        // close waiting-list alert
        this._refs.waitingListAlert.onClose();
        this.changeBodyScrollStyle(true);
        isCheckForWaitlistConflict = false;
      }

      const clientError = getClientError(bookingPanel, configurationData.get('resourceMap'));
      this.props.setClientErrorsAction(clientError);
      if (clientError.clientMessages.length === 0) {
        if (permitID > 0) {
          this.props.existingPermitProceedAsyncAction(isCheckForWaitlistConflict)
            .catch(catchError);
        } else {
          this.props.newPermitProceedAsyncAction(isCheckForWaitlistConflict)
            .catch(catchError);
        }
      } else {
        this.scrollToBodyTop();
      }
    });
  };

  // display booking-information popup
  open = () => {
    this.props.showBookingPanelAction();
  };

  // hide booking-information popup
  close = () => {
    this.props.showBookingPanelAction(false);
  };

  // hide booking info when click out side of it
  hideWhenClickOutSide = () => {
    const display = this.props.bookingPanel.get('display');
    /* istanbul ignore else */
    if (display) {
      this.props.showBookingPanelAction(false);
    }
  };

  cancelRentalBlockOverride = (e) => {
    if (this._refs.editingRentalBlock) {
      const { top, left, width, height } = this._refs.editingRentalBlock.getBoundingClientRect();
      if (
        e.clientX < left ||
        e.clientX > left + width ||
        e.clientY < top ||
        e.clientY > top + height
      ) {
        this.cancelEditingRentalBlock();
      }
    }
  }

  setEditingRentalBlock = (el, cancelEditingRentalBlock) => {
    this._refs.editingRentalBlock = el;
    this.cancelEditingRentalBlock = cancelEditingRentalBlock;
  }

  componentDidMount() {
    const { mask, bookingInformationBody } = this._refs;
    /* istanbul ignore else */
    if (mask) {
      mask.addEventListener('click', this.hideWhenClickOutSide);
    }
    // /* istanbul ignore else */
    if (bookingInformationBody) {
      bookingInformationBody.addEventListener('click', this.cancelRentalBlockOverride);
    }
  }

  componentWillUnmount() {
    const { mask, bookingInformationBody } = this._refs;
    /* istanbul ignore else */
    if (mask) {
      mask.removeEventListener('click', this.hideWhenClickOutSide);
    }
    /* istanbul ignore else */
    if (bookingInformationBody) {
      bookingInformationBody.removeEventListener('click', this.cancelRentalBlockOverride);
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasSystemErr = this.props.hasSystemErr;
    if (!hasSystemErr && nextProps.hasSystemErr) {
      this.changeBodyScrollStyle(false);
    } else if (hasSystemErr && !nextProps.hasSystemErr) {
      this.changeBodyScrollStyle(true);
    }
  }
}

export default connect(
  null,
  {
    showBookingPanelAction,
    existingPermitProceedAsyncAction,
    newPermitProceedAsyncAction,
    updateBookingToastContentAction,
    deleteAllBookingsAction,
    setClientErrorsAction,
    bookingPanelClearErrAction,
    redirect
  }
)(BookingInformation);
