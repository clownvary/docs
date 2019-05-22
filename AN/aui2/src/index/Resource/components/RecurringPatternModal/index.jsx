import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

import Modal from 'shared/components/Alert';
import Alert from 'react-base-ui/lib/components/Alert';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Input from 'react-base-ui/lib/components/Input';
import Radio from 'react-base-ui/lib/components/Radio';
import DatePicker from 'react-base-ui/lib/components/DatePicker';
import InputDate from 'react-base-ui/lib/components/InputDate';
import { momentHelper } from 'react-base-ui/lib/utils';

import UIComponent from 'shared/components/UIComponent';
import DateTimeFormat, { BO_DATE_TIME_FORMAT } from 'shared/utils/DateTimeFormat';
import reservationPeriodUnit from '../../consts/reservationPeriodUnit';
import AMIds from '../../automationIds';

import {
  setEnd,
  setEndType,
  setFrequency,
  setSelectedDates,
  setRecurringType,
  setMonthlyFrequencyType,
  clearError,
  generateRecurringBookings,
  closeRecurringPatternModal
} from '../../actions/recurringPattern';

import {
  END_TYPES,
  RECURRING_TYPES,
  MONTHLY_FREQUENCY_TYPES,
  ORDINAL_WEEK_OF_MONTH
} from '../../consts/recurringPattern';

import { weekOfMonth } from '../../utils/recurring';

import {
  setRecurringPattern,
  getBookingCountAction,
  setApplyBookings
} from '../../actions/bookingPanel';
import {
  setRecurringBookingsAction
} from '../../actions/bookingPanelRecurring';
import './index.less';

class RecurringPatternModal extends UIComponent {
  constructor(props) {
    super(props);
    this.bind('onCancel');
  }

  componentWillReceiveProps(nextProps) {
    const { changeBodyScrollStyle, recurringPattern } = this.props;
    const nowVisibleValue = recurringPattern.get('visible');
    const nextVisibleValue = nextProps.recurringPattern.get('visible');

    if (nextVisibleValue) {
      changeBodyScrollStyle(false);
    } else if (nowVisibleValue !== nextVisibleValue && !nextVisibleValue) {
      changeBodyScrollStyle(true);
    }
  }

  getModifierClass = (type) => {
    switch (type) {
      case RECURRING_TYPES.Monthly:
        return 'monthly';
      case RECURRING_TYPES.OnSelectedDates:
        return 'on-selected-dates';
      default:
        return '';
    }
  }

  getBookingEndMoment = ({ base }) => {
    const { booking, resource } = base;
    const bookingEndDatetime = resource &&
      resource.reservationPeriodUnit === reservationPeriodUnit.RENTAL_BLOCK
      ? booking && `${booking.startEventDate} 12:01 AM` // rental block will use the day it's begin
      : booking && `${booking.endEventDate} ${booking.endEventTime}`;

    const bookingEndMoment = bookingEndDatetime && DateTimeFormat.parseDateTime(bookingEndDatetime);
    const isBookingEndDayFree = bookingEndMoment && bookingEndMoment.diff(moment(bookingEndMoment).startOf('day')) <= 0;
    return moment(bookingEndMoment).startOf('day').add(isBookingEndDayFree ? 0 : 1, 'd');
  }

  disabled = ({ frequency, type, monthlyFrequencyType, end, endType, selectedDates }) => {
    switch (type) {
      case RECURRING_TYPES.OnSelectedDates:
        return selectedDates.length <= 0;
      case RECURRING_TYPES.Monthly:
        return !(frequency[type][monthlyFrequencyType] && end[type][endType]);
      default:
        return !(frequency[type] && end[type][endType]);
    }
  }

  setRecurringType = (recurringType) => {
    this.props.clearError();
    this.props.setRecurringType(recurringType);
  }

  setMonthlyFrequencyType = (type) => {
    this.props.clearError();
    this.props.setMonthlyFrequencyType(type);
  }

  setFrequency = (e, { type, oldValue }) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/ig, '').substr(0, 3), 10) || '';
    if (value !== oldValue) {
      this.props.clearError();
      this.props.setFrequency(type, value);
    }
  }

  setEndTimes = (e, { type, oldValue }) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/ig, '').substr(0, 3), 10) || '';
    if (value !== oldValue) {
      this.props.clearError();
      this.props.setEnd(type, value);
    }
  }

  setEndDate = (date, { type, oldValue }) => {
    /* istanbul ignore else */
    if (!moment(date).isSame(oldValue)) {
      this.props.clearError();
      this.props.setEnd(type, date);
    }
  }

  getPatternPayload = ({ type, endType, monthlyFrequencyType, frequency, end, selectedDates }) => {
    const pattern = { type };

    if (type === RECURRING_TYPES.OnSelectedDates) {
      pattern.dates = selectedDates.map(d => DateTimeFormat.compose(DateTimeFormat.formatDate(d), '00:00 AM'));
    } else {
      if (type === RECURRING_TYPES.Monthly) {
        pattern.frequency = frequency[type][monthlyFrequencyType];
        pattern.is_day_of_month = monthlyFrequencyType === MONTHLY_FREQUENCY_TYPES.Day;
      } else {
        pattern.frequency = frequency[type];
      }

      if (endType === END_TYPES.AfterRecurrence) {
        pattern.count = end[type][endType];
      } else {
        pattern.end_at = DateTimeFormat.compose(DateTimeFormat.formatDate(end[type][endType]), '00:00 AM');
      }
    }

    return pattern;
  }

  setSelectedDates = (dates) => {
    this.props.clearError();
    this.props.setSelectedDates(dates);
  }

  clearSelectedDates = () => {
    this.props.clearError();
    this._refs.datepickerSelected.value = [];
  }

  generateRecurringBookings = ({ base: { booking: baseBooking, resource }, ...pattern }) => {
    const reservationType =
      resource.reservationPeriodUnit === reservationPeriodUnit.RENTAL_BLOCK ? 1 : 0;

    const startEventDatetime = baseBooking.momentEventStart
      .format(BO_DATE_TIME_FORMAT);
    const endEventDatetime = baseBooking.momentEventEnd
      .format(BO_DATE_TIME_FORMAT);
    const startScheduleDatetime = baseBooking.momentStartScheduleDatetime
      .format(BO_DATE_TIME_FORMAT);
    const endScheduleDatetime = baseBooking.momentEndScheduleDatetime
      .format(BO_DATE_TIME_FORMAT);

    const bookingCount = this.props.getBookingCountAction();
    const { batchID, receiptID, receiptEntryID, eventID } = this.props.initialData;
    const recurringPattern = this.getPatternPayload(pattern);
    const payload = {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID,
      event_id: eventID || -1,
      event_booking_count: bookingCount,
      pattern: recurringPattern,
      base: [{
        transaction_id: baseBooking.transactionID,
        resource_id: baseBooking.resourceID,
        resource_number: resource.resourceNumber,
        resource_type: resource.resourceType,
        resource_name: resource.resourceName,
        reservation_type: reservationType,
        quantity: baseBooking.attendance || 0,
        rental_block_id: baseBooking.rentalBlockID || 0,
        date_range_id: baseBooking.dateRangeID || 0,
        start_event_datetime: startEventDatetime,
        end_event_datetime: endEventDatetime,
        start_schedule_datetime: startScheduleDatetime,
        end_schedule_datetime: endScheduleDatetime,
        resource_booking_id: baseBooking.resourceBookingID,
        reservation_period_unit: resource.reservationPeriodUnit
      }]
    };
    // this.props.setApplyBookings(fromJS(baseBooking));
    // this.props.setRecurringPattern(payload.pattern);
    this.props.generateRecurringBookings(payload)
      .then(({ payload: { body: { recurring_bookings: bookings } } }) => {
        this.props.setRecurringBookingsAction(bookings, baseBooking, resource, recurringPattern);
      });
  }

  renderFrequency({ type, monthlyFrequencyType, frequency, selectedDates, base }) {
    const { booking } = base;
    const frequencyValue = type === RECURRING_TYPES.Monthly
      ? frequency[type][monthlyFrequencyType]
      : frequency[type];

    const bookingStartMoment = booking && DateTimeFormat.parseDate(booking.startEventDate);

    switch (type) {
      case RECURRING_TYPES.Monthly:
        return (
          <div className={`form-group pattern-frequency ${this.getModifierClass(type)}`}>
            <label htmlFor="pattern-frequency">Recur On</label>
            <div className="radios">
              <div className="pattern-ends__selection aaui-flexbox">
                <Radio
                  className="desc"
                  checked={monthlyFrequencyType === MONTHLY_FREQUENCY_TYPES.Day}
                  onClick={() => this.setMonthlyFrequencyType(MONTHLY_FREQUENCY_TYPES.Day)}
                >
                  Day {bookingStartMoment.date()} of every
                </Radio>
                <Input
                  value={frequency[type][MONTHLY_FREQUENCY_TYPES.Day]}
                  onFocus={() => this.setMonthlyFrequencyType(MONTHLY_FREQUENCY_TYPES.Day)}
                  onChange={e => this.setFrequency(e, {
                    type: [type, MONTHLY_FREQUENCY_TYPES.Day],
                    oldValue: frequency[type][MONTHLY_FREQUENCY_TYPES.Day]
                  })}
                  onBlur={e => this.setFrequency(e, {
                    type: [type, MONTHLY_FREQUENCY_TYPES.Day],
                    oldValue: frequency[type][MONTHLY_FREQUENCY_TYPES.Day]
                  })}
                />
                <span className="tail desc">month(s)</span>
              </div>
              <div className="pattern-ends__selection aaui-flexbox">
                <Radio
                  className="desc"
                  checked={monthlyFrequencyType === MONTHLY_FREQUENCY_TYPES.Weekday}
                  onClick={() => this.setMonthlyFrequencyType(MONTHLY_FREQUENCY_TYPES.Weekday)}
                >
                  {`The ${ORDINAL_WEEK_OF_MONTH[weekOfMonth(bookingStartMoment)]} ${bookingStartMoment.format('dddd')} of every`}
                </Radio>
                <Input
                  value={frequency[type][MONTHLY_FREQUENCY_TYPES.Weekday]}
                  onFocus={() => this.setMonthlyFrequencyType(MONTHLY_FREQUENCY_TYPES.Weekday)}
                  onChange={e => this.setFrequency(e, {
                    type: [type, MONTHLY_FREQUENCY_TYPES.Weekday],
                    oldValue: frequency[type][MONTHLY_FREQUENCY_TYPES.Weekly]
                  })}
                  onBlur={e => this.setFrequency(e, {
                    type: [type, MONTHLY_FREQUENCY_TYPES.Weekday],
                    oldValue: frequency[type][MONTHLY_FREQUENCY_TYPES.Weekly]
                  })}
                />
                <span className="tail desc">month(s)</span>
              </div>
            </div>
          </div>
        );
      case RECURRING_TYPES.OnSelectedDates:
        return (
          <div className={`form-group aaui-flexbox pattern-frequency ${this.getModifierClass(type)}`}>
            <label htmlFor="pattern-frequency">Recur On</label>
            <DatePicker
              ref={(dp) => { this._refs.datepickerSelected = dp; }}
              min={this.getBookingEndMoment({ base })}
              formatDate={DateTimeFormat.formatDate}
              onValueChange={({ value }) => this.setSelectedDates(value)}
              formatTextValue={(value) => {
                if (!isArray(value)) {
                  value = [value];
                }

                if (isEmpty(value)) return '';

                return `${value.length} date(s) selected`;
              }}
            />
            <a
              className={`dates-clear ${selectedDates.length <= 0 ? 'hidden' : ''}`}
              onClick={() => this.clearSelectedDates()}
            >
              Clear
            </a>
          </div>
        );
      case RECURRING_TYPES.Weekly:
        return (
          <div className="form-group aaui-flexbox pattern-frequency">
            <label htmlFor="pattern-frequency">Recur Every</label>
            <Input
              value={frequencyValue}
              data-qa-id={AMIds.recurringPatternModal.daysRecur}
              onChange={e => this.setFrequency(e, {
                type: [type],
                oldValue: frequencyValue
              })}
              onBlur={e => this.setFrequency(e, {
                type: [type],
                oldValue: frequencyValue
              })}
            />
            <span className="tail desc">week(s) on {bookingStartMoment.format('dddd')}</span>
          </div>
        );
      default:
        return (
          <div className="form-group aaui-flexbox pattern-frequency">
            <label htmlFor="pattern-frequency">Recur Every</label>
            <Input
              value={frequencyValue}
              data-qa-id={AMIds.recurringPatternModal.daysRecur}
              onChange={e => this.setFrequency(e, {
                type: [type],
                oldValue: frequencyValue
              })}
              onBlur={e => this.setFrequency(e, {
                type: [type],
                oldValue: frequencyValue
              })}
            />
            <span className="tail desc">day(s)</span>
          </div>
        );
    }
  }

  renderStartsOn = ({ base, type }) => (
    (base.booking && type !== RECURRING_TYPES.OnSelectedDates) &&
    <div className="form-group aaui-flexbox">
      <label htmlFor="pattern-starts-on">Starts On</label>
      <span className="desc">{DateTimeFormat.formatDate(base.booking.startEventDate)}</span>
    </div>
  );

  renderEnds = ({ type, endType, end, base }) => {
    let endDate =
      type !== RECURRING_TYPES.OnSelectedDates &&
      end[type][END_TYPES.ByDate];
    if (endDate) {
      endDate = moment(endDate);
    } else {
      endDate = null;
    }

    const bookingEndDate = this.getBookingEndMoment({ base }).toDate();
    return (
      type !== RECURRING_TYPES.OnSelectedDates &&
      <div className="form-group pattern-ends">
        <label htmlFor="pattern-ends">Ends</label>
        <div className="radios">
          <div className="pattern-ends__selection aaui-flexbox">
            <Radio
              data-qa-id={AMIds.recurringPatternModal.after}
              className="desc"
              checked={endType === END_TYPES.AfterRecurrence}
              onClick={() => this.props.setEndType(END_TYPES.AfterRecurrence)}
            >
              After
            </Radio>
            <Input
              value={end[type][END_TYPES.AfterRecurrence]}
              data-qa-id={AMIds.recurringPatternModal.recurrence}
              onFocus={() => this.props.setEndType(END_TYPES.AfterRecurrence)}
              onChange={e => this.setEndTimes(e, {
                type: [type, END_TYPES.AfterRecurrence],
                oldValue: end[type][END_TYPES.AfterRecurrence]
              })}
            />
            <span className="tail desc">recurrence(s)</span>
          </div>
          <div className="pattern-ends__selection aaui-flexbox">
            <Radio
              data-qa-id={AMIds.recurringPatternModal.byDate}
              className="desc"
              checked={endType === END_TYPES.ByDate}
              onClick={() => this.props.setEndType(END_TYPES.ByDate)}
            >
              By date
            </Radio>
            <div>
              <InputDate
                data-qa-id={AMIds.recurringPatternModal.date}
                min={momentHelper.createMoment(bookingEndDate) || undefined}
                value={endDate}
                showTrigger
                onFocus={() => this.props.setEndType(END_TYPES.ByDate)}
                onValueChange={e => this.setEndDate(e.nativeDate || '', {
                  type: [type, END_TYPES.ByDate],
                  oldValue: endDate
                })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderErrors = errors => errors && (
    <Alert
      noClose
      type="error"
      className="error-box multiple"
    >
      <ul>
        {
          errors.map((error, index) => (
            <li key={index}>
              <span className="message">{error.value}</span>
            </li>
          ))
        }
      </ul>
    </Alert>
  );

  onCancel() {
    this.props.closeRecurringPatternModal();
  }

  render() {
    const recurringPattern = this.props.recurringPattern;
    const recurringPatternObject = recurringPattern.toJS();
    const {
      visible, types, type, errors, error
    } = recurringPatternObject;

    return (
      <div className="recurring-pattern-modal">
        <Modal
          title="Recurring Booking"
          confirmText="Submit"
          disableConfirm={this.disabled(recurringPatternObject)}
          shown={visible}
          onClose={this.onCancel}
          onCancel={this.onCancel}
          onConfirm={() => this.generateRecurringBookings(recurringPatternObject)}
        >
          <div className={`recurring-pattern__body ${this.getModifierClass(type)} ${error ? 'error' : ''}`}>
            {this.renderErrors(errors)}
            <div className="form-group aaui-flexbox pattern-type">
              <label htmlFor="repeat-type">Recur</label>
              <Dropdown
                data={types}
                data-qa-id={AMIds.recurringPatternModal.recur}
                value={type}
                onChange={({ value }) => this.setRecurringType(value)}
              />
            </div>
            {this.renderFrequency(recurringPatternObject)}
            {this.renderStartsOn(recurringPatternObject)}
            {this.renderEnds(recurringPatternObject)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    recurringPattern: state.recurringPattern
  }),
  {
    setEnd,
    setEndType,
    setFrequency,
    setSelectedDates,
    setRecurringType,
    setMonthlyFrequencyType,
    closeRecurringPatternModal,
    clearError,
    generateRecurringBookings,
    setRecurringPattern,
    getBookingCountAction,
    setRecurringBookingsAction,
    setApplyBookings
  },
  null,
  {
    withRef: true
  }
)(RecurringPatternModal);
