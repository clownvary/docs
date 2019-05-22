import isFunction from 'lodash/isFunction';
import moment from 'moment';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from 'react-base-ui/lib/components/Button';
import Globalize from 'react-base-ui/lib/services/i18n';
import { Calendar, ViewMode } from 'react-base-ui/lib/components/Calendar';
import { TodayBehavior } from 'react-base-ui/lib/components/Calendar/consts';
import { CURRENT_SERVER_DATE_TIME } from '../FullCalendar/utils';

import './index.less';

export default class DateNav extends PureComponent {

  static propTypes = {
    onGotoDate: PropTypes.func.isRequired,
    defaultDate: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    const { defaultDate = '' } = props;
    const date = DateTimeFormat.parseDate(defaultDate);
    this.state = {
      date: date.isValid() ? date : CURRENT_SERVER_DATE_TIME
    };
  }

  componentWillReceiveProps(props) {
    const { defaultDate = '' } = props;

    if (this.props.defaultDate !== defaultDate) {
      const date = DateTimeFormat.parseDate(defaultDate);
      this.setState({ date });
    }
  }

  setDate(date) {
    const { onGotoDate } = this.props;
    this.setState({
      date
    });
    /* istanbul ignore else */
    if (isFunction(onGotoDate)) {
      onGotoDate(DateTimeFormat.formatDate(date));
    }
  }

  getDateText(date) {
    const isDayView = this.props.isDayView;
    const text = DateTimeFormat.formatDate(date);
    const weekDay = DateTimeFormat.getWeekday(date, true);
    if (isDayView) return `${weekDay}, ${text}`;

    const format = Globalize.ANDateFormat.replace('DD', '').replace(',', '');
    return DateTimeFormat.formatDate(date, format);
  }

  render() {
    const { date } = this.state;
    const selDate = new Date();
    selDate.setFullYear(date.year(), date.month(), date.date());

    const isDayView = this.props.isDayView;

    const unit = isDayView ? 'day' : 'month';
    return (
      <div className="datenav">
        <Button
          className="datenav__prev-button"
          size="sm"
          onClick={() => {
            const newDate = date.clone().add(-1, unit);
            /* istanbul ignore else */
            if (DateTimeFormat.isInDefaultRange(newDate)) {
              this.setDate(newDate);
            }
          }}
        />
        <span
          className="link datenav__date-text"
          onClick={(e) => {
            const popupOptions = {
              target: e.currentTarget,
              showShadow: true,
              showMask: false,
              distance: 1,
              closeByEscape: true,
              focus: true
            };

            /* istanbul ignore next */
            const value = selDate ? [moment(selDate)] : [];
            const viewMode = isDayView ? ViewMode.DATEVIEW : ViewMode.MONTHVIEW;
            const monthMode = !isDayView;
            const calendarOptions = {
              today: CURRENT_SERVER_DATE_TIME,
              viewMode,
              monthMode,
              value,
              todayBehavior: TodayBehavior.SELECT,
              valueChanged: (v) => {
                /* istanbul ignore else */
                if (this.calendar) {
                  this.calendar.cancel();
                }
                /* istanbul ignore next */
                const d = v.length ? v[0] : null;
                /* istanbul ignore else */
                if (d) {
                  /* istanbul ignore else */
                  if (!date.startOf('day').isSame(d.startOf('day'))) {
                    this.setDate(d.clone());
                  }
                }
              }
            };

            const calendar = Calendar.popup(calendarOptions, popupOptions);

            /* istanbul ignore else */
            if (calendar !== this.calendar) {
              this.calendar = calendar;

              calendar.result.then().catch(() => { });
            }
          }}
        >
          {this.getDateText(date)}
        </span>
        <Button
          className="datenav__next-button"
          size="sm"
          onClick={() => {
            const newDate = date.clone().add(1, unit);
            /* istanbul ignore else */
            if (DateTimeFormat.isInDefaultRange(newDate)) {
              this.setDate(newDate);
            }
          }}
        />
      </div>
    );
  }
}
