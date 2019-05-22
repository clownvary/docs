import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputDate from 'react-base-ui/lib/components/InputDate';
import InputTime from 'react-base-ui/lib/components/InputTime';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import Globalize from 'react-base-ui/lib/services/i18n';
import { Authority, AuthorityID } from 'shared/authorities';
import BookingDetailErrorReson from './BookingDetailErrorReson';
import BookingDetailErrorAction from './BookingDetailErrorAction';
import RecurringButton from './RecurringButton';
import reservationPeriodUnit from '../../consts/reservationPeriodUnit';
import {
  hasDateRangeError,
  hasRentalBlockError,
  hasNormalError
} from '../../utils/hasBookingItemError';
import {
  bookingPanelUpdateAttendanceAction,
  bookingPanelUpdateDateTimeAction,
  bookingPanelResetOverrideRentalBlockAction,
  bookingPanelSetOverrideRentalBlockAction
} from '../../actions/bookingPanel';
import {
  bookingPanelSetTemplateAndApplyAction
} from '../../actions/bookingPanelTemplate';
import {
  deleteRecurringBookingAction,
  deleteNormalBookingAction,
  setClearRecurringAction
} from '../../actions/bookingPanelDelete';
import {
  bookingPanelClearErrAction,
  bookingPanelSetOverrideRentalBlockErrorAction
} from '../../actions/bookingPanelValidation';
import AMIds from '../../automationIds';

import '../../assets';

class BookingDetailItem extends UIComponent {
  constructor(props) {
    super(props);

    this.state = {
      rentalBlockEditMode: false
    };
  }

  componentDidUpdate() {
    if (this._refs.rentalBlockStartTimeInput) {
      this._refs.rentalBlockStartTimeInput.focus();
      this._refs.rentalBlockStartTimeInput.highLightField(0);
    }
  }

  changeDetailDatePicker = (key, booking, resourceID, bookingID, newDate) => {
    const { isRecurring, baseBookingID } = this.props;
    let changedDate = newDate;
    const dateBeforeChanged = booking.get(key);
    const momentEventStart = booking.get('momentEventStart');
    const momentEventEnd = booking.get('momentEventEnd');
    const bookingDateObj = {};

    if (new Date(dateBeforeChanged).getTime() !== new Date(changedDate).getTime()) {
      let cleanUpDate = false;
      if (!changedDate) {
        cleanUpDate = true;
        changedDate = dateBeforeChanged;
      } else {
        changedDate = DateTimeFormat.formatDate(new Date(changedDate));
      }

      const momentChangedDate = moment(changedDate);

      if (key === 'startEventDate' && momentEventEnd) {
        const diffDate = momentEventEnd.diff(momentEventStart, 'd');
        const endDate = Globalize.formatDate(momentChangedDate.add(diffDate, 'd'));

        bookingDateObj.endEventDate = endDate;
      }

      /**
       * The calendar now don't allow the end date less than start date,
       * the date input will been reset too when input a small end date
       * so maybe the code bellow is useless.
       */
      if (
        key === 'endEventDate' &&
        momentEventStart.isSameOrAfter(moment(new Date(`${changedDate} ${booking.get('endEventTime')}`)))
      ) {
        const diffDate = momentChangedDate.diff(momentEventEnd, 'd');
        const startDate = DateTimeFormat.formatDate(momentEventStart.add(diffDate, 'd'));

        bookingDateObj.startEventDate = startDate;
      }

      if (isRecurring) {
        bookingDateObj.isRecurring = isRecurring;
        bookingDateObj.baseBookingID = baseBookingID;
      }

      bookingDateObj[key] = changedDate;
      this.props.bookingPanelUpdateDateTimeAction(resourceID, bookingID, bookingDateObj);

      /* istanbul ignore else */
      if (cleanUpDate) {
        // fix bug of https://jirafnd.dev.activenetwork.com/browse/ANE-49308
        // if clean the date in datepicker, we'll set the date as the old one
        // shouldComponentUpdate will return false, render function will not run
        // datepicker input will be empty, so need to run forceUpdate
        this.forceUpdate();
      }
    }
  };

  changeDetailTime = (key, booking, resourceID, bookingID, newTime) => {
    const { isRecurring, baseBookingID } = this.props;
    const momentEventStart = booking.get('momentEventStart');
    const momentEventEnd = booking.get('momentEventEnd');
    const startEventDate = booking.get('startEventDate');
    const endEventDate = booking.get('endEventDate');
    const bookingTimeObj = {};
    const changedTime = newTime;
    let momentUnChangedEvent = null;
    let momentChangedEvent = null;

    if (key === 'startEventTime') {
      momentUnChangedEvent = momentEventStart;
      momentChangedEvent = moment(`${startEventDate} ${changedTime}`);
    } else {
      momentUnChangedEvent = momentEventEnd;
      momentChangedEvent = moment(`${endEventDate} ${changedTime}`);

      if (momentEventStart.isSameOrAfter(momentChangedEvent)) {
        const diffDate = momentEventStart.diff(momentUnChangedEvent, 'm');
        const newStartDate = momentChangedEvent.add(diffDate, 'm');
        const startTime = Globalize.formatTime(newStartDate);
        const startDate = Globalize.formatDate(newStartDate);

        bookingTimeObj.startEventDate = startDate;
        bookingTimeObj.startEventTime = startTime;
      }
    }

    if (!momentChangedEvent.isSame(momentUnChangedEvent, 'm')) {
      if (key === 'startEventTime') {
        const diffDate = momentEventEnd.diff(momentEventStart, 'm');
        const newEndDate = momentChangedEvent.add(diffDate, 'm');
        const endTime = Globalize.formatTime(newEndDate);
        const endDate = Globalize.formatDate(newEndDate);

        bookingTimeObj.endEventDate = endDate;
        bookingTimeObj.endEventTime = endTime;
      }

      bookingTimeObj[key] = changedTime;

      if (isRecurring) {
        bookingTimeObj.isRecurring = isRecurring;
        bookingTimeObj.baseBookingID = baseBookingID;
      }

      this.props.bookingPanelUpdateDateTimeAction(resourceID, bookingID, bookingTimeObj);
    }
  };

  onAttendanceChange = (resourceID, bookingID, attendance) => {
    const { isRecurring, baseBookingID } = this.props;
    this.props.bookingPanelUpdateAttendanceAction(
      resourceID, bookingID, attendance, isRecurring, baseBookingID);
    this.props.bookingPanelSetTemplateAndApplyAction(
      resourceID,
      'attendance',
      bookingID
    );
  }

  changeDetailDropdown = (key, id, changedId, resourceID, bookingID) => {
    const {
      resourceDateRanges, resourceRentalBlocks, item, isRecurring, baseBookingID
    } = this.props;

    if (id !== changedId) {
      if (key === 'dateRangeID') {
        const bookingDateObj = {};
        const selectDateRange = resourceDateRanges.find(dateRange => dateRange.get('id') === changedId);
        const selectDateRangeName = selectDateRange.get('name');
        const dateRangeDateTime = selectDateRangeName.split(' to ');

        bookingDateObj.dateRangeID = selectDateRange.get('id') || -1;
        bookingDateObj.startEventDate = dateRangeDateTime[0];
        bookingDateObj.endEventDate = Globalize.formatDate(moment(`${dateRangeDateTime[1]} 12:00 AM`).add(1, 'd'));

        if (isRecurring) {
          bookingDateObj.isRecurring = isRecurring;
          bookingDateObj.baseBookingID = baseBookingID;
        }

        this.props.bookingPanelUpdateDateTimeAction(resourceID, bookingID, bookingDateObj);
        this.props.bookingPanelClearErrAction({
          errorKey: 'dateRangeID',
          bookingID
        });
      }

      if (key === 'rentalBlockID') {
        const isRentalBlockOverride = item.get('isRentalBlockOverride');

        // reset need be finished before sync to calendar
        if (isRentalBlockOverride) {
          this.props.bookingPanelResetOverrideRentalBlockAction(
            resourceID, bookingID, isRecurring, baseBookingID);
        }

        const bookingTimeObj = {};
        const selectRentalBlock = resourceRentalBlocks.find(RB => RB.get('id') === changedId);
        const selectRentalBlockName = selectRentalBlock.get('name');
        const rentalBlockTimes = selectRentalBlockName.split(' to ');

        bookingTimeObj.rentalBlockID = selectRentalBlock.get('id') || -1;
        bookingTimeObj.startEventTime = rentalBlockTimes[0];
        bookingTimeObj.endEventTime = rentalBlockTimes[1];

        if (isRecurring) {
          bookingTimeObj.isRecurring = isRecurring;
          bookingTimeObj.baseBookingID = baseBookingID;
        }

        this.props.bookingPanelUpdateDateTimeAction(resourceID, bookingID, bookingTimeObj);
        this.props.bookingPanelClearErrAction({
          errorKey: 'rentalBlockID',
          bookingID
        });
      }
    }
  };

  deleteDetail = () => {
    const { item, resourceID, hasRecurringBooking, baseBookingID, isRecurring } = this.props;
    const bookingID = item.get('id');

    if (!isRecurring && hasRecurringBooking) {
      return this.props.setClearRecurringAction({
        resourceID, bookingID, visible: true, clearAll: false
      });
    }

    if (isRecurring) {
      return this.props.deleteRecurringBookingAction(resourceID, bookingID, baseBookingID);
    }

    return this.props.deleteNormalBookingAction(resourceID, bookingID);
  };

  renderWeekdayLabel = (date) => {
    const weekday = DateTimeFormat.getWeekday(date);
    return (<td className="booking-item__weekday"><div className="weekday">{weekday}</div></td>);
  }

  dateRangeItem() {
    const { item, resource, resourceID, bookingError, resourceDateRanges } = this.props;
    const resourceType = resource.get('resourceType');
    const dateRangeID = item.get('dateRangeID');
    const momentEventStartDate = item.get('momentEventStartDate');
    const attendance = item.get('attendance');
    const bookingID = item.get('id');
    const isErrorField = hasDateRangeError(bookingError);

    return ([
      this.renderWeekdayLabel(momentEventStartDate),
      <td
        className={`booking-item__date-range${isErrorField ? ' error-field' : ''}`}
      >
        <Dropdown
          autoOpen
          data={resourceDateRanges.toJS()}
          value={dateRangeID}
          data-qa-id={AMIds.information.dateRange}
          onChange={({ value }) => this.changeDetailDropdown('dateRangeID', dateRangeID, value, resourceID, bookingID)}
        />
      </td>,
      <td
        className={`booking-item__qty${bookingError && bookingError.get('attendance') ? ' error-field' : ''}`}
      >
        <InputNumeric
          data-qa-id={AMIds.information.attendee}
          value={attendance}
          min={1}
          max={999999}
          decimals={0}
          textAlign="left"
          showSpinner
          iconHint={(resourceType === 1) ? 'Quantity' : 'Number of Attendees'}
          icon={(resourceType === 1) ? 'icon-cart-m' : 'icon-people-m'}
          onBlur={e => (item.get('attendance') * 1 !== e.value) &&
            this.onAttendanceChange(resourceID, bookingID, e.text)
          }
        />
      </td>
    ]);
  }

  tryOverrideRentalBlock(resourceID, bookingID, booking, rentalBlocks) {
    const { isRecurring, baseBookingID } = this.props;
    const startTimeMoment = this._refs.rentalBlockStartTimeInput.value;
    const endTimeMoment = this._refs.rentalBlockEndTimeInput.value;
    if (startTimeMoment.isSameOrAfter(endTimeMoment)) {
      return this.props.bookingPanelSetOverrideRentalBlockErrorAction(bookingID, true);
    }

    // compare with preset rental blocks and override rental block
    const formattedStartTime = Globalize.formatTime(startTimeMoment);
    const formattedEndTime = Globalize.formatTime(endTimeMoment);
    const overrideValueString = `${formattedStartTime} to ${formattedEndTime}`;
    const rentalBlock = rentalBlocks.find(item => item.get('name') === overrideValueString);
    // use existing option if find existing the same rental block
    if (rentalBlock) {
      const rentalBlockID = booking.get('rentalBlockID');
      this.changeDetailDropdown('rentalBlockID', rentalBlockID, rentalBlock.get('id'), resourceID, bookingID);
    } else {
      const overrideRentalBlockID = Date.now();
      const bookingTimeObj = {};

      bookingTimeObj.rentalBlockID = overrideRentalBlockID;
      bookingTimeObj.startEventTime = formattedStartTime;
      bookingTimeObj.endEventTime = formattedEndTime;

      if (isRecurring) {
        bookingTimeObj.isRecurring = isRecurring;
        bookingTimeObj.baseBookingID = baseBookingID;
      }

      this.props.bookingPanelSetOverrideRentalBlockAction(
        resourceID,
        bookingID,
        { name: overrideValueString, id: overrideRentalBlockID },
        isRecurring,
        baseBookingID
      );
      this.props.bookingPanelUpdateDateTimeAction(resourceID, bookingID, bookingTimeObj);
    }
    // If the rentalblock is invalid before reset, after reset should delete the invalid error
    this.props.bookingPanelClearErrAction({
      errorKey: 'rentalBlockID',
      bookingID
    });
    this.setState({ rentalBlockEditMode: false });
    return false;
  }

  cancelEditingRentalBlock = () => {
    this.props.bookingPanelSetOverrideRentalBlockErrorAction(this.props.item.get('id'), false);
    this.setState({ rentalBlockEditMode: false });
  }

  onRentalBlockTimeChange = () => {
    const bookingID = this.props.item.get('id');
    this.props.bookingPanelSetOverrideRentalBlockErrorAction(bookingID);
  }

  rentalBlockItem() {
    const {
      item,
      resource,
      resourceID,
      resourceRentalBlocks,
      bookingError
    } = this.props;
    const disableOverrideRentalBlock =
      !Authority.isEnabled(AuthorityID.BUTTON_TO_OVERRIDE_RENTAL_BLOCK);
    const { rentalBlockEditMode } = this.state;
    const resourceType = resource.get('resourceType');
    const isRentalBlockOverride = item.get('isRentalBlockOverride');
    const overrideRentalBlock = item.get('overrideRentalBlock');
    const momentEventStartDate = item.get('momentEventStartDate');
    const momentEventStart = item.get('momentEventStart');
    const momentEventEnd = item.get('momentEventEnd');
    const bookingID = item.get('id');
    const rentalBlockID = item.get('rentalBlockID');
    let composedRentalBlocks = resourceRentalBlocks;
    // compose if has override rental block
    if (isRentalBlockOverride) {
      composedRentalBlocks = composedRentalBlocks.insert(0, overrideRentalBlock);
    }
    const hasOverrideError = bookingError && bookingError.get('overrideRentalblockError');
    const isErrorField = hasRentalBlockError(bookingError);

    return ([
      this.renderWeekdayLabel(momentEventStartDate),
      <td
        className={`booking-item__date${isErrorField ? ' error-field' : ''}`}
      >
        <InputDate
          value={momentEventStartDate}
          data-qa-id={AMIds.information.startDate}
          showTrigger
          allowBlank={false}
          onValueChange={e => this.changeDetailDatePicker(
            'startEventDate',
            item,
            resourceID,
            bookingID,
            e.nativeDate || '')
          }
        />
      </td>,
      !rentalBlockEditMode ?
        <td
          className={`booking-item__rental-block${isErrorField ? ' error-field' : ''}`}
        >
          <Dropdown
            autoOpen
            data-qa-id={AMIds.information.rentalBlock}
            data={composedRentalBlocks}
            value={rentalBlockID}
            onChange={({ value }) => this.changeDetailDropdown(
              'rentalBlockID', rentalBlockID, value, resourceID, bookingID)}
          />
          {
            (disableOverrideRentalBlock || composedRentalBlocks.size <= 0) ? (
              <i
                className="icon icon-sign-m disabled"
                title={disableOverrideRentalBlock
                        ? 'You don\'t have permission to override rental block.'
                        : ''}
              />
            ) : (
              <i className="icon icon-sign-m" onClick={() => { this.setState({ rentalBlockEditMode: true }); }} />
            )
          }
        </td> :
        <td
          className={`booking-item__rental-block${isErrorField ? ' error-field' : ''}`}
          ref={el => (this.props.setEditingRentalBlock(el, this.cancelEditingRentalBlock))}
        >
          <table>
            <tbody>
              <tr>
                <td
                  className={`time${hasOverrideError ? ' error-field' : ''}`}
                >
                  <InputTime
                    ref={(c) => { this._refs.rentalBlockStartTimeInput = c; }}
                    format={Globalize.ANTimeFormat}
                    data-qa-id={AMIds.information.startTime}
                    value={momentEventStart}
                    onValueChange={this.onRentalBlockTimeChange}
                  />
                </td>
                <td className="is-dashed">{' - '}</td>
                <td
                  className={`time${hasOverrideError ? ' error-field' : ''}`}
                >
                  <InputTime
                    ref={(c) => { this._refs.rentalBlockEndTimeInput = c; }}
                    format={Globalize.ANTimeFormat}
                    data-qa-id={AMIds.information.endTime}
                    value={momentEventEnd}
                    onValueChange={this.onRentalBlockTimeChange}
                  />
                </td>
                <td>
                  <i
                    className="icon icon-check-thin"
                    onClick={
                      () =>
                        this.tryOverrideRentalBlock(
                          resourceID, bookingID, item, composedRentalBlocks
                        )
                    }
                  />
                </td>
                <td>
                  <i
                    className="icon icon-close-thin"
                    onClick={this.cancelEditingRentalBlock}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>,
      <td
        className={`booking-item__qty ${bookingError && bookingError.get('attendance') ? 'error-field' : ''}`}
      >
        <InputNumeric
          data-qa-id={AMIds.information.attendee}
          value={item.get('attendance')}
          min={1}
          max={999999}
          decimals={0}
          textAlign="left"
          showSpinner
          iconHint={(resourceType === 1) ? 'Quantity' : 'Number of Attendees'}
          icon={(resourceType === 1) ? 'icon-cart-m' : 'icon-people-m'}
          onBlur={e => (item.get('attendance') * 1 !== e.value) &&
            this.onAttendanceChange(resourceID, bookingID, e.text)
          }
        />
      </td>
    ]);
  }

  normalItem() {
    const {
      item,
      resource,
      resourceID,
      bookingError
    } = this.props;
    const RU = resource.get('reservationPeriodUnit');
    const disableTimePicker = RU === reservationPeriodUnit.DAY
      || RU === reservationPeriodUnit.WEEK
      || RU === reservationPeriodUnit.MONTH;
    const momentEventStartDate = item.get('momentEventStartDate');
    const momentEventEndDate = item.get('momentEventEndDate');
    const momentEventStart = item.get('momentEventStart');
    const momentEventEnd = item.get('momentEventEnd');
    const attendance = item.get('attendance');
    const resourceType = resource.get('resourceType');
    const bookingID = item.get('id');
    const isErrorField = hasNormalError(bookingError);

    return ([
      this.renderWeekdayLabel(momentEventStartDate),
      <td
        className={`booking-item__date${isErrorField ? ' error-field' : ''}`}
      >
        <InputDate
          value={momentEventStartDate}
          data-qa-id={AMIds.information.startDate}
          showTrigger
          allowBlank={false}
          onValueChange={e => this.changeDetailDatePicker(
            'startEventDate',
            item,
            resourceID,
            bookingID,
            e.nativeDate || '')
          }
        />
      </td>,
      <td
        className={`booking-item__time${isErrorField && !disableTimePicker ? ' error-field' : ''}`}
      >
        <InputTime
          format={Globalize.ANTimeFormat}
          data-qa-id={AMIds.information.startTime}
          value={momentEventStart}
          disabled={disableTimePicker}
          onValueChange={({ value }) => this.changeDetailTime(
            'startEventTime',
            item,
            resourceID,
            bookingID,
            DateTimeFormat.formatTime(value))
          }
        />
      </td>,
      <td className="booking-item__dashed">{'-'}</td>,
      <td
        className={`booking-item__date${isErrorField ? ' error-field' : ''}`}
      >
        <InputDate
          value={momentEventEndDate}
          data-qa-id={AMIds.information.endDate}
          showTrigger
          allowBlank={false}
          onValueChange={e => this.changeDetailDatePicker(
            'endEventDate',
            item,
            resourceID,
            bookingID,
            e.nativeDate || '')
          }
          min={momentEventStartDate}
        />
      </td>,
      <td
        className={`booking-item__time${isErrorField && !disableTimePicker ? ' error-field' : ''}`}
      >
        <InputTime
          format={Globalize.ANTimeFormat}
          data-qa-id={AMIds.information.endTime}
          value={momentEventEnd}
          disabled={disableTimePicker}
          onValueChange={({ value }) => this.changeDetailTime(
            'endEventTime',
            item,
            resourceID,
            bookingID,
            DateTimeFormat.formatTime(value))
          }
        />
      </td>,
      <td
        className={`booking-item__qty${bookingError && bookingError.get('attendance') ? ' error-field' : ''}`}
      >
        <InputNumeric
          ref={(c) => { this._refs.normalInputNumeric = c; }}
          data-qa-id={AMIds.information.attendee}
          value={attendance}
          min={1}
          max={999999}
          decimals={0}
          textAlign="left"
          showSpinner
          iconHint={(resourceType === 1) ? 'Quantity' : 'Number of Attendees'}
          icon={(resourceType === 1) ? 'icon-cart-m' : 'icon-people-m'}
          onBlur={e => (attendance * 1 !== e.value) &&
            this.onAttendanceChange(resourceID, bookingID, e.text)
          }
        />
      </td>
    ]);
  }

  renderBookingItem() {
    const { resource } = this.props;
    const RU = resource.get('reservationPeriodUnit');

    if (RU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
      return this.dateRangeItem();
    } else if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
      return this.rentalBlockItem();
    }

    return this.normalItem();
  }

  renderAllRecurringBookings() {
    const { isPendingMoved } = this.props;
    return isPendingMoved &&
      <tr>
        <td colSpan="9" className="recurring-bookings__container">
          <div className="recurring-modify">
            modified booking will be moved out of the recurring group.
          </div>
        </td>
      </tr>;
  }

  render() {
    const {
      item: booking,
      showRecurringButton,
      bookingError,
      resource,
      resourceID,
      isRecurring,
      baseBookingID,
      hasRecurringBooking,
      resourceRentalBlocks
    } = this.props;
    const item = booking.toObject();
    const bookingID = item.id;
    const classes = classNames('detail-item', 'booking-item', {
      'is-recurring': item.isRecurring,
      recurring: item.isRecurring
    });

    const isNoRentalBlockOrEmpty = !resourceRentalBlocks || !resourceRentalBlocks.size;

    return (
      <table className={classes}>
        <tbody>
          <tr>
            <td className="booking-item__left-icon">
              <BookingDetailErrorReson
                bookingError={bookingError}
              />
            </td>
            {this.renderBookingItem()}
            <td className="booking-item__right-icon">
              <BookingDetailErrorAction
                bookingError={bookingError}
                resourceID={resourceID}
                bookingID={bookingID}
                isRecurring={isRecurring}
                baseBookingID={baseBookingID}
              />
              {
                showRecurringButton &&
                  <RecurringButton
                    booking={booking}
                    bookingError={bookingError}
                    hasRecurringBooking={hasRecurringBooking}
                    isNoRentalBlockOrEmpty={isNoRentalBlockOrEmpty}
                    reservationPeriodUnit={resource.get('reservationPeriodUnit')}
                  />
              }
              <i
                className="icon icon-close"
                onClick={this.deleteDetail}
              />
            </td>
          </tr>
          {this.renderAllRecurringBookings()}
        </tbody>
      </table>
    );
  }
}

export default connect(
  null,
  {
    bookingPanelUpdateAttendanceAction,
    bookingPanelUpdateDateTimeAction,
    bookingPanelResetOverrideRentalBlockAction,
    bookingPanelSetOverrideRentalBlockAction,
    bookingPanelSetTemplateAndApplyAction,
    deleteRecurringBookingAction,
    deleteNormalBookingAction,
    setClearRecurringAction,
    bookingPanelClearErrAction,
    bookingPanelSetOverrideRentalBlockErrorAction
  }
)(BookingDetailItem);
