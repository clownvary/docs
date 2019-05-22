import React from 'react';
import { findDOMNode } from 'react-dom';
import isString from 'lodash/isString';
import UIComponent from 'shared/components/UIComponent';
import { CollapsePanel } from 'react-base-ui/lib/components';
import Table from 'react-base-ui/lib/components/Table';
import { createColResizable } from 'react-base-ui/lib/helper';
import Globalize from 'react-base-ui/lib/services/i18n';
import { RECURRING_TYPES } from 'index/Resource/consts/recurringPattern';
import dateStringSorter from '../../utils/dateStringSorter';
import { buildSummary } from '../../utils/recurring';
import './index.less';

const recurringCell = (content, row) => {
  if (row.data.recurring) {
    content.unshift(<i
      key={`${parseInt(Math.random() * 100000, 10)}`}
      className="icon icon-repeat-m"
    />);
  }
  return content;
};

export default class Schedules extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  getTableProps = rows => ({
    sortable: true,
    rowSeperator: true,
    ariaLableExpand: 'Expand detail clickable arrow',
    ariaLableCollapse: 'Collapse detail clickable arrow',
    onExpand: (row) => {
      /* istanbul ignore else */
      if (row.recurring) {
        const { extraRows } = row;
        extraRows.forEach((extraRow, index) => {
          if (index !== 0) {
            extraRow.hidden = true;
          }
        });
      }
    },
    onCollapse: (row) => {
      /* istanbul ignore else */
      if (row.recurring) {
        row.extraRows.forEach((extraRow) => { extraRow.hidden = false; });
      }
    },
    rows,
    columns: [
      { title: 'RESOURCES NAME', keyName: 'resourceName', sorter: true, minWidth: 161, className: 'resource-name', render: recurringCell },
      { title: 'CENTER', keyName: 'centerName', sorter: true, minWidth: 92, className: 'center-name' },
      { title: 'EVENT NAME', keyName: 'eventName', sorter: true, minWidth: 125, className: 'event-name' },
      { title: 'START DATE', keyName: 'startDate', sorter: dateStringSorter(Globalize.ANDateTimeFormat), minWidth: 117, className: 'start-date' },
      { title: 'START TIME', keyName: 'startTime', minWidth: 115, className: 'start-time' },
      { title: 'END DATE', keyName: 'endDate', sorter: dateStringSorter(Globalize.ANDateTimeFormat), minWidth: 110, className: 'end-date' },
      { title: 'END TIME', keyName: 'endTime', minWidth: 100, className: 'end-time' }
    ]
  })

  renderExceptionDate = (date, lineBreak) => {
    /* istanbul ignore else */
    if (isString(date.date)) {
      return (<p>{date.date}{lineBreak}</p>);
    } else if (isString(date.start_date) && isString(date.end_date)) {
      const dStart = date.start_date;
      const dEnd = date.end_date;
      return dStart && dEnd && (<p>{dStart} to {dEnd}{lineBreak}</p>);
    }

    return null;
  }

  renderExceptionDates = (content) => {
    const [exceptionDates] = content;
    const newContent = [];
    exceptionDates.forEach((date, index) => {
      /* istanbul ignore next */
      const lineBreak = index === exceptionDates.length - 1 ? null : ',';
      const exceptionDate = this.renderExceptionDate(date, lineBreak);
      /* istanbul ignore else */
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

  buildRecurringSummary = (item, recurringContext) => {
    const { schedules } = item;
    const { type, frequency, is_day_of_month: isDayOfMonth } = recurringContext;
    const endDate = schedules[schedules.length - 1].end_date;

    return buildSummary({
      type,
      frequency,
      isDayOfMonth,
      startDate: item.start_date,
      startTime: item.start_time,
      endDate,
      endTime: item.end_time,
      selectedDates: schedules.map(b => b.start_date)
    });
  }
  setContentWidth = () => {
    this._refs.collapsePanel.handleToggle();
    setTimeout(() => {
      this._refs.collapsePanel.handleToggle();
    }, 200);
  }
  componentDidMount() {
    this.setContentWidth();
  }

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { permitSchedules } = this.props;

    const permitSchedulesRowsData = permitSchedules.map((item) => {
      const rowdata = {
        data: {
          resourceName: item.resource_name,
          centerName: item.center_name || '--',
          eventName: item.event_name,
          startDate: `${item.start_date} ${item.start_day_of_week}`,
          startDateSort: `${item.start_date} ${item.start_time}`,
          startTime: item.start_time,
          endDate: `${item.end_date} ${item.end_day_of_week}`,
          endDateSort: `${item.end_date} ${item.end_time}`,
          endTime: item.end_time,
          recurring: !!item.recurring_indicator
        }
      };
      if (item.recurring_indicator) {
        let recurringContext;
        const { group_pattern_content } = item;

        if (isString(group_pattern_content) && group_pattern_content.length) {
          try {
            recurringContext = JSON.parse(group_pattern_content);
          } catch (e) {
            console.log(e);
          }
        }

        rowdata.expanded = false;
        rowdata.recurring = true;
        rowdata.expandControl = 'resourceName';
        rowdata.className = 'recurring-booking';
        rowdata.extraRows = [];

        if (recurringContext) {
          rowdata.extraRows.push({
            data: { desc: this.buildRecurringSummary(item, recurringContext) },
            columns: [{ keyName: 'desc', colSpan: 7 }]
          });
        }

        rowdata.children = {};
        rowdata.children.rows = item.schedules.map(value => ({
          data: {
            startDate: `${value.start_date} ${value.start_day_of_week}`,
            startTime: value.start_time,
            endDate: `${value.end_date} ${value.end_day_of_week}`,
            endTime: value.end_time
          },
          className: 'child'
        }));

        /* istanbul ignore else */
        if (item.exceptions &&
            item.exceptions.length &&
            recurringContext &&
            recurringContext.type !== RECURRING_TYPES.OnSelectedDates
        ) {
          const exceptionRows = [{
            data: { exceptionDates: item.exceptions },
            className: 'exception-dates',
            columns: [{ keyName: 'exceptionDates', colSpan: 7, render: this.renderExceptionDates }]
          }];

          rowdata.extraRows.push(...exceptionRows);
        }
      }
      return rowdata;
    });

    const title = 'Schedules';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;

    return (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="schedules"
        onExpand={() => { createColResizable(findDOMNode(this._refs.table)); this.toggleState(); }}
        onCollapse={this.toggleState}
        ref={(t) => { this._refs.collapsePanel = t; }}
      >
        <Table
          ref={(t) => { this._refs.table = t; }}
          {...this.getTableProps(permitSchedulesRowsData)}
        />
      </CollapsePanel>
    );
  }
}
