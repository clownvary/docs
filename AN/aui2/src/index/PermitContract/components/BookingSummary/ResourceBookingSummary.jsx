import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import UIComponent from 'shared/components/UIComponent';
import * as ResourceType from 'shared/consts/ResourceType';
import Table from 'react-base-ui/lib/components/Table';
import createColResizable from 'react-base-ui/lib/helper/colResizable';
import Globalize from 'react-base-ui/lib/services/i18n';
import { RECURRING_TYPES } from 'index/Resource/consts/recurringPattern';
import formatAmount from '../../utils/formatAmount';
import dateStringSorter from '../../utils/dateStringSorter';
import { buildSummary } from '../../utils/recurring';

export default class ResourceBookingSummary extends UIComponent {

  static propTypes = {
    resource: PropTypes.shape({
      resourceName: PropTypes.string,
      eventType: PropTypes.string,
      centerName: PropTypes.string,
      eventTypeNotes: PropTypes.string,
      bookings: PropTypes.array
    })
  }

  componentDidMount() {
    createColResizable(findDOMNode(this._refs.table));
  }

  recurringCell = (content, row) => {
    if (row.data.recurring) {
      content.unshift(<i className="icon icon-repeat-m" />);
    }
    return content;
  }

  formatQuantity = quantity => (quantity ? `x${quantity}` : '--')

  buildFeeColumns = (charge) => {
    const { abbrevUnitOfMeasure, isPercentageDiscount } = charge;

    let formatter = amount => `${formatAmount(amount)} ${abbrevUnitOfMeasure}`;
    if (isPercentageDiscount) {
      formatter = amount => `${amount}%`;
    }

    return [
      { keyName: 'chargeName', colSpan: 3 },
      { keyName: 'unitFee', format: formatter },
      { keyName: 'quantity', className: 'align-right', format: this.formatQuantity },
      { keyName: 'amount', format: formatAmount, className: 'align-right fee' }
    ];
  }

  renderExceptionDate = (date, lineBreak) => {
    if (isString(date.date)) {
      return date.date && (<p>{date.date}{lineBreak}</p>);
    } else if (isString(date.startDate) && isString(date.endDate)) {
      return date.startDate && date.endDate &&
        (<p>{date.startDate} to {date.endDate}{lineBreak}</p>);
    }

    return null;
  }

  renderExceptionDates = (content) => {
    const [exceptionDates] = content;
    const newContent = [];
    exceptionDates.forEach((date, index) => {
      const lineBreak = index === exceptionDates.length - 1 ? null : ',';
      const exceptionDate = this.renderExceptionDate(date, lineBreak);
      if (exceptionDate) {
        newContent.push(exceptionDate);
      }
    });

    /* istanbul ignore else */
    if (newContent.length) {
      newContent.unshift(<p>Exception:</p>);
    }
    return newContent;
  }

  buildRecurringExtraRows = (booking, recurringContext) => {
    const extraRows = [];
    const { exceptionDates } = booking;
    const hasExceptionDates = isArray(exceptionDates) && exceptionDates.length;

    extraRows.push({
      data: { desc: this.buildRecurringSummary(booking, recurringContext) },
      columns: [{ keyName: 'desc', colSpan: 6 }]
    });

    /* istanbul ignore else */
    if (hasExceptionDates && recurringContext.type !== RECURRING_TYPES.OnSelectedDates) {
      extraRows.push({
        data: { exceptionDates },
        className: 'exception-dates',
        columns: [{ keyName: 'exceptionDates', colSpan: 6, render: this.renderExceptionDates }]
      });
    }

    return extraRows;
  }

  buildRecurringSummary = (booking, groupPatternContext) => {
    const {
      scheduleFee: {
        facilitySchedule: {
          startDate: recurringStartDate,
          startTime: recurringStartTime,
          endTime: recurringEndTime
        }
      },
      recurringItems
    } = booking;

    const {
      scheduleFee: {
        facilitySchedule: {
          endDate: recurringEndDate
        }
      }
    } = recurringItems[recurringItems.length - 1];

    const { type, frequency, is_day_of_month: isDayOfMonth } = groupPatternContext;

    return buildSummary({
      type,
      frequency,
      isDayOfMonth,
      startDate: recurringStartDate,
      startTime: recurringStartTime,
      endDate: recurringEndDate,
      endTime: recurringEndTime,
      selectedDates: recurringItems.map(b => b.scheduleFee.facilitySchedule.startDate)
    });
  }

  convertChargeToRow = (charge) => {
    const { chargeName, quantity, unitFee, amount } = charge;
    const row = {
      data: { amount, quantity, chargeName, unitFee },
      columns: this.buildFeeColumns(charge),
      className: 'child'
    };
    return row;
  }

  convertBookingToRow = (booking, isChild = false) => {
    const row = {};

    const {
      recurringItems,
      isRecurringMaster,
      resourceNum,
      scheduleFee: {
        facilityScheduleId,
        facilityCharges,
        scheduleAmount: feeAmount,
        facilitySchedule: {
          startDate,
          startTime,
          endDate,
          endTime
        }
      }
    } = booking;

    row.data = {
      startDate,
      startTime,
      endDate,
      endTime,
      resourceNum,
      feeAmount,
      facilityScheduleId,
      recurring: isRecurringMaster,
      startDateSort: `${startDate} ${startTime}`,
      endDateSort: `${endDate} ${endTime}`
    };

    if (isChild) {
      row.className = 'child';
    }

    if (isRecurringMaster) {
      row.expandControl = 'startDate';
      row.data.resourceNum = '--';
      row.className = 'recurring-booking';

      let recurringContext;
      const { groupPatternContext } = booking;

      if (isString(groupPatternContext) && groupPatternContext.length) {
        try {
          recurringContext = JSON.parse(groupPatternContext);
        } catch (e) {
          console.log(e);
        }
      }

      if (recurringContext) {
        row.extraRows = this.buildRecurringExtraRows(booking, recurringContext);

        row.children = {
          rows: recurringItems.map(recurringBooking =>
            this.convertBookingToRow(recurringBooking, true))
        };
      }
    } else {
      row.className = `${row.className || ''} normal-booking`;

      if (isArray(facilityCharges) && facilityCharges.length) {
        row.expandControl = 'feeAmount';
        row.children = {
          rows: facilityCharges.map(this.convertChargeToRow)
        };
      }
    }

    return row;
  }

  render() {
    const {
      firstResource,
      resource: {
        resourceName,
        eventType,
        centerName,
        eventTypeNotes,
        facilityNotes,
        centerNotes,
        prepCodeNotes,
        facilityType,
        bookings,
        additionfeeTotal,
        addtionalFeeDetails
      }
    } = this.props;

    const rows = [];

    bookings.forEach((booking) => {
      const row = this.convertBookingToRow(booking);
      rows.push(row);
    });

    if (
      isNumber(additionfeeTotal) &&
      isArray(addtionalFeeDetails) &&
      addtionalFeeDetails.length > 0
    ) {
      const additionalFeeRow = {
        fixed: 'bottom',
        data: { desc: 'Resource level fees', total: additionfeeTotal },
        columns: [
          { keyName: 'desc', colSpan: 5 },
          { keyName: 'total', format: formatAmount, className: 'align-right fee' }
        ]
      };

      additionalFeeRow.expandControl = 'total';
      additionalFeeRow.children = {
        rows: addtionalFeeDetails.map(this.convertChargeToRow)
      };

      rows.push(additionalFeeRow);
    }

    const tableProps = {
      striped: true,
      sortable: true,
      ariaLableExpand: 'Expand detail clickable arrow',
      ariaLableCollapse: 'Collapse detail clickable arrow',
      onExpand: (row) => {
        if (row.data.recurring) {
          const { extraRows } = row;
          /* istanbul ignore else */
          if (isArray(extraRows)) {
            row.extraRows = extraRows.map((r, index) => (index > 0 ? { ...r, hidden: true } : r));
          }
        }
      },
      onCollapse: (row) => {
        if (row.data.recurring) {
          const { extraRows } = row;
          /* istanbul ignore else */
          if (isArray(extraRows)) {
            row.extraRows = extraRows.map(r => ({ ...r, hidden: false }));
          }
        }
      },
      columns: [
        { title: 'start date', keyName: 'startDate', sorter: dateStringSorter(Globalize.ANDateTimeFormat), render: this.recurringCell, minWidth: 130 },
        { title: 'start time', keyName: 'startTime', minWidth: 125 },
        { title: 'end date', keyName: 'endDate', sorter: dateStringSorter(Globalize.ANDateTimeFormat), minWidth: 130 },
        { title: 'end time', keyName: 'endTime', minWidth: 110 },
        { title: facilityType === ResourceType.EQUIPMENT ? 'qty' : 'attendee', keyName: 'resourceNum', sorter: true, className: 'align-right', minWidth: 110 },
        { title: 'AMT W/O TAX', keyName: 'feeAmount', format: formatAmount, sorter: true, className: 'align-right fee', minWidth: 125 }
      ],
      rows
    };

    return (
      <div className="resource-booking-summary">
        <div className="resource-info">
          <div>{resourceName} ({eventType})</div>
          {
            isString(centerName) && centerName.length > 0 &&
            <div>Center: {centerName}</div>
          }
        </div>
        <Table ref={(t) => { this._refs.table = t; }} {...tableProps} />
        {
          isString(eventTypeNotes) && firstResource.eventType !== eventType
          && eventTypeNotes.length > 0 && (
            <div className="event-type-notes">
              <p className="event-type-notes__title">
                Event Type Notes
              </p>
              <p className="event-type-notes__content text-pre-wrap">
                {eventTypeNotes}
              </p>
            </div>
          )
        }
        {
          isString(facilityNotes) && facilityNotes.length > 0 && (
            <div className="event-type-notes">
              <p className="event-type-notes__title">
                Facility Notes
              </p>
              <p className="event-type-notes__content text-pre-wrap">
                {facilityNotes}
              </p>
            </div>
          )
        }
        {
          isString(centerNotes) && centerNotes.length > 0 && (
            <div className="event-type-notes">
              <p className="event-type-notes__title">
                Center Notes
              </p>
              <p className="event-type-notes__content text-pre-wrap">
                {centerNotes}
              </p>
            </div>
          )
        }
        {
          isString(prepCodeNotes) && prepCodeNotes.length > 0 && (
            <div className="event-type-notes">
              <p className="event-type-notes__title">
                Prep Code Notes
              </p>
              <p className="event-type-notes__content text-pre-wrap">
                {prepCodeNotes}
              </p>
            </div>
          )
        }
      </div>
    );
  }
}
