import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Table from 'react-base-ui/lib/components/Table';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import Globalize from 'react-base-ui/lib/services/i18n';
import * as ResourceType from 'shared/consts/ResourceType';
import formatAmount from '../../utils/formatAmount';
import dateStringSorter from '../../utils/dateStringSorter';
import './index.less';

const ADD = 1;
const REVISEDFROM = 2;
const DELETE = 3;
const TO = 4;

class AmendmentEventActionDetail extends UIComponent {

  eventActions = {
    ADD: 2,
    EDIT: 4,
    DELETE: 8
  };

  bookingActions = {
    ADD: 1,
    EDIT: 2,
    DELETE: 3
  };


  questionAtionType = {
    ADD,
    REVISEDFROM,
    DELETE,
    TO
  }

  actions = {
    [ADD]: 'Added',
    [REVISEDFROM]: 'Revised from',
    [DELETE]: 'Deleted',
    [TO]: 'To'
  };

  renderQuestionCell = (content, row) => {
    const { question } = this.getQuestionAndAnswer(row);
    return (
      <div>{decodeHtmlStr(question)}</div>
    );
  };

  getQuestionAndAnswer = (row) => {
    const { data } = row;
    const actionType = data.action_type;
    let answers;
    let question;
    switch (actionType) {
      case this.questionAtionType.ADD:
        question = data.new_question;
        answers = data.new_answers;
        break;
      case this.questionAtionType.REVISEDFROM:
        question = data.old_question;
        answers = data.old_answers;
        break;
      case this.questionAtionType.TO:
        question = data.new_question;
        answers = data.new_answers;
        break;
      case this.questionAtionType.DELETE:
        question = data.old_question;
        answers = data.old_answers;
        break;
      /* istanbul ignore next */
      default:
        break;
    }
    return { answers, question };
  };

  renderAnswerCell = (content, row) => {
    /* istanbul ignore next */
    const { answers = [] } = this.getQuestionAndAnswer(row);

    return (
      <div>
        {
          answers.map((answer, index) => (
            <div key={index}>
              <span>{decodeHtmlStr(answer)}</span>
            </div>
          ))
        }
      </div>
    );
  };

  convertBookingColumns = equipment => ([
    {
      title: 'ACTION',
      keyName: 'action',
      className: 'event-detail-action',
      sorter: true,
      minWidth: 90
    },
    {
      title: 'START DATE',
      keyName: 'startDateKeyName',
      className: 'event-detail-date',
      format: decodeHtmlStr,
      render: this.renderBookingCell,
      sorter: dateStringSorter(Globalize.ANDateTimeFormat),
      minWidth: 117
    },
    {
      title: 'START TIME',
      keyName: 'startTimeKeyName',
      className: 'event-detail-time start-time',
      format: decodeHtmlStr,
      render: this.renderBookingCell,
      minWidth: 103
    },
    {
      title: 'END DATE',
      keyName: 'endDateKeyName',
      className: 'event-detail-date',
      format: decodeHtmlStr,
      render: this.renderBookingCell,
      sorter: dateStringSorter(Globalize.ANDateTimeFormat),
      minWidth: 106
    },
    {
      title: 'END TIME ',
      keyName: 'endTimeKeyName',
      className: 'event-detail-time',
      format: decodeHtmlStr,
      render: this.renderBookingCell,
      minWidth: 91
    },
    {
      title: equipment ? 'QTY' : 'ATTENDEE',
      keyName: 'attendeeKeyName',
      className: 'event-detail-attendee',
      render: this.renderBookingCell,
      sorter: true,
      minWidth: 106
    },
    {
      title: 'AMT W/O TAX',
      keyName: 'feeKeyName',
      className: 'event-detail-amount',
      format: formatAmount,
      render: this.renderBookingCell,
      sorter: true,
      minWidth: 110
    }]
  );

  renderBookingCell = (content, { data }, keyName) => {
    const { booking } = data;
    let className;

    if (data.action === 'To') {
      switch (keyName) {
        case 'startDateKeyName':
          if (booking.new_start_schedule_date !== booking.old_start_schedule_date) {
            className = 'update';
          }
          break;
        case 'startTimeKeyName':
          if (booking.new_start_schedule_time !== booking.old_start_schedule_time) {
            className = 'update';
          }
          break;
        case 'endDateKeyName':
          /* istanbul ignore else */
          if (booking.new_end_schedule_date !== booking.old_end_schedule_date) {
            className = 'update';
          }
          break;
        case 'endTimeKeyName':
          /* istanbul ignore else */
          if (booking.new_end_schedule_time !== booking.old_end_schedule_time) {
            className = 'update';
          }
          break;
        case 'attendeeKeyName':
          /* istanbul ignore else */
          if (booking.new_attendee !== booking.old_attendee) {
            className = 'update';
          }
          break;
        case 'feeKeyName':
          /* istanbul ignore else */
          if (booking.new_fee !== booking.old_fee) {
            className = 'update';
          }
          break;
        /* istanbul ignore next */
        default:
          break;
      }
    }

    return (<div className={`${className}`}>{content}</div>);
  }

  convertBookingToRows = (bookings) => {
    const datum = [];
    bookings.forEach((booking) => {
      const actionType = booking.action_type;
      const dateSortEnum = {
        startDateKeyNameSort: `${booking.new_start_schedule_date} ${booking.new_start_schedule_time}`,
        endDateKeyNameSort: `${booking.new_end_schedule_date} ${booking.new_end_schedule_time}`,
        booking
      };
      switch (actionType) {
        case this.bookingActions.ADD:
          datum.push({
            data: {
              ...dateSortEnum,
              action: this.actions[ADD],
              startDateKeyName: booking.new_start_schedule_date,
              startTimeKeyName: booking.new_start_schedule_time,
              endDateKeyName: booking.new_end_schedule_date,
              endTimeKeyName: booking.new_end_schedule_time,
              attendeeKeyName: booking.new_attendee,
              feeKeyName: booking.new_fee,
              attendeeKeyNameSort: booking.new_attendee,
              feeKeyNameSort: booking.new_fee
            },
            className: 'add'
          });
          break;
        case this.bookingActions.EDIT:
          datum.push({
            data: {
              ...dateSortEnum,
              action: this.actions[REVISEDFROM],
              startDateKeyName: booking.old_start_schedule_date,
              startTimeKeyName: booking.old_start_schedule_time,
              endDateKeyName: booking.old_end_schedule_date,
              endTimeKeyName: booking.old_end_schedule_time,
              attendeeKeyName: booking.old_attendee,
              feeKeyName: booking.old_fee,
              attendeeKeyNameSort: booking.new_attendee,
              feeKeyNameSort: booking.new_fee
            },
            className: 'edit',
            extraRows: [
              {
                data: {
                  ...dateSortEnum,
                  action: this.actions[TO],
                  startDateKeyName: booking.new_start_schedule_date,
                  startTimeKeyName: booking.new_start_schedule_time,
                  endDateKeyName: booking.new_end_schedule_date,
                  endTimeKeyName: booking.new_end_schedule_time,
                  attendeeKeyName: booking.new_attendee,
                  feeKeyName: booking.new_fee
                },
                columns: this.convertBookingColumns(),
                className: 'edit'
              }
            ]
          });
          break;
        case this.bookingActions.DELETE:
          datum.push({
            data: {
              ...dateSortEnum,
              action: this.actions[DELETE],
              startDateKeyName: booking.old_start_schedule_date,
              startTimeKeyName: booking.old_start_schedule_time,
              startDateKeyNameSort: `${booking.old_start_schedule_date} ${booking.old_start_schedule_time}`,
              endDateKeyNameSort: `${booking.old_end_schedule_date} ${booking.old_end_schedule_time}`,
              endDateKeyName: booking.old_end_schedule_date,
              endTimeKeyName: booking.old_end_schedule_time,
              attendeeKeyName: booking.old_attendee,
              feeKeyName: booking.old_fee,
              attendeeKeyNameSort: booking.old_attendee,
              feeKeyNameSort: booking.old_fee
            },
            className: 'delete'
          });
          break;
        /* istanbul ignore next */
        default:
          break;
      }
    });
    return datum;
  }

  convertQuestionColumns = () => ([
    {
      title: 'ACTION',
      keyName: 'action',
      className: 'event-question-action',
      sorter: true,
      minWidth: 90
    },
    {
      title: 'QUESTION',
      keyName: '',
      className: 'event-question-desc',
      render: this.renderQuestionCell,
      minWidth: 120
    },
    {
      title: 'ANSWER',
      keyName: '',
      className: 'event-question-answer',
      render: this.renderAnswerCell,
      minWidth: 120
    }
  ]);

  convertQuestionToRows = (questions) => {
    const datum = [];
    questions.forEach((question) => {
      const actionType = question.action_type;
      if (question.action_type !== this.bookingActions.EDIT) {
        datum.push({
          data: {
            ...question,
            action: this.actions[actionType]
          },
          className: question.action_type === this.questionAtionType.DELETE ? 'del-question' : 'add-question'
        });
      } else {
        datum.push({
          data: {
            ...question,
            action: this.actions[REVISEDFROM]
          },
          extraRows: [
            {
              data: {
                ...question,
                action_type: this.questionAtionType.TO,
                action: this.actions[TO]
              },
              columns: this.convertQuestionColumns(),
              className: 'edit-question-new'
            }
          ]
        });
      }
    });
    return datum;
  }

  buildTableProps = (columns, rows, className) => ({
    sortable: true,
    columns,
    rows,
    className: `amendment-sort-table-sub ${className}`,
    ariaLableExpand: 'Expand detail clickable arrow',
    ariaLableCollapse: 'Collapse detail clickable arrow'
  })

  renderEventHeaderView = (event) => {
    if (event.action_type === this.eventActions.EDIT) {
      const eventNameChanged = event.old_event_name !== event.new_event_name;
      const eventNoteChanged = event.old_customer_notes !== event.new_customer_notes;
      return (
        <div className="event-header">
          <div>
            <p className="event-header-name">
              {
                /* istanbul ignore next */
                (eventNameChanged || eventNoteChanged) &&
                (<span className="event-header-name-revised-from">[REVISED FROM] </span>)
              }
              Event Name: { event.old_event_name }
            </p>
            <p className="event-header-note">
              Event Notes:
            </p>
            <p className="event-header-note text-pre-wrap">{event.old_customer_notes ? event.old_customer_notes : '--'}</p>
          </div>
          {
            /* istanbul ignore next */
            (eventNameChanged || eventNoteChanged) && (
              <div className="event-header-to">
                <p className="event-header-name">
                  <span className="event-header-name-to">[TO] </span>
                  Event Name: { event.new_event_name }
                </p>
                <p className="event-header-note">
                  Event Notes:
                </p>
                <p className="event-header-note text-pre-wrap">{event.new_customer_notes ? event.new_customer_notes : '--'}</p>
              </div>
            )
          }
        </div>
      );
    }

    return (
      <div className="event-header">
        <p className="event-header-name">
          Event Name: {
          (event.action_type === this.eventActions.DELETE && event.old_event_name) ||
          (event.action_type === this.eventActions.ADD && event.new_event_name)
        }
        </p>

        {
          event.action_type === this.eventActions.ADD && event.new_customer_notes && (
            <div>
              <p className="event-header-note">
                Event Notes:
              </p>
              <p className="event-header-note text-pre-wrap">{event.new_customer_notes}</p>
            </div>
          )
        }

        {
          event.action_type === this.eventActions.DELETE && event.old_customer_notes && (
            <div>
              <p className="event-header-note">
                Event Notes:
              </p>
              <p className="event-header-note text-pre-wrap">{event.old_customer_notes}</p>
            </div>
          )
        }
      </div>
    );
  };

  renderAdditionalFeeView = resource => (
    resource.new_additional_fee !== resource.old_additional_fee ? (
      <div className="amendment-additional-fee">
        <div className="amendment-additional-fee-name">
          <div>Updated Resource Level Fees:</div>
          <div>Original Resource Level Fees:</div>
        </div>
        <div className="amendment-additional-fee-info">
          <div className="green">{formatAmount(resource.new_additional_fee)}</div>
          <div>{formatAmount(resource.old_additional_fee)}</div>
        </div>
      </div>
    ) : ''
  );

  renderBookingTableView = event => event.resource_list.map(resource => (
    <div key={resource.resource_id} className="event-detail">
      {
        (resource.booking_list && count(resource.booking_list) > 0) ||
        (resource.new_additional_fee !== resource.old_additional_fee) ||
        (resource.new_event_type_name !== resource.old_event_type_name) ? (
          <div className="event-detail-header">
            <div>
              {resource.resource_name} - {
                (resource.action_type === this.bookingActions.ADD &&
                                                                    resource.new_event_type_name) ||
                (resource.action_type === this.bookingActions.DELETE &&
                                                                    resource.old_event_type_name) ||
                (resource.action_type === this.bookingActions.EDIT && (
                  `${resource.new_event_type_name} ${resource.new_event_type_name !== resource.old_event_type_name ?
                    `(revised from ${resource.old_event_type_name})` : ''}`
                ))
              }
            </div>
            <div>
              { resource.center_name && `Center: ${resource.center_name}` }
            </div>
          </div>)
          :
        ''
      }
      {
        resource.booking_list && count(resource.booking_list) > 0 && (
        <Table
          {...this.buildTableProps(
            this.convertBookingColumns(resource.resource_type === ResourceType.EQUIPMENT,
              resource.action_type),
            this.convertBookingToRows(resource.booking_list),
            'amendment-action-resource-table'
          )}
        />)
      }
      {
        this.renderAdditionalFeeView(resource)
      }
    </div>
  ));

  renderQuestionTableView = event => (
    !!event.question_list && count(event.question_list) > 0 && (
    <Table
      {...this.buildTableProps(
        this.convertQuestionColumns(),
        this.convertQuestionToRows(event.question_list),
        'amendment-action-question-table'
      )}
    />
  ));

  render() {
    const { event } = this.props;
    return (
      <div>
        {this.renderEventHeaderView(event)}
        {this.renderBookingTableView(event)}
        {this.renderQuestionTableView(event)}
      </div>
    );
  }
}

export default AmendmentEventActionDetail;
