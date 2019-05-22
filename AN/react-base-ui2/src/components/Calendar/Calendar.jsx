import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isArray from 'lodash/isArray';

import { createPopupService } from '../../services/popup';
import { Globalize } from '../../services/i18n';
import { DefaultCSSPrefix } from '../../consts';
import { ViewMode, DateFormat, SelectionMode, TodayBehavior } from './consts';
import { getTenYearRange, compareByFormat, getSafeValue, sortedDates } from './utils';
import Header from './Header';
import DateView from './DateView';
import MonthView from './MonthView';
import YearView from './YearView';

/** Default PropTypes of Calendar.
 * @memberof Calendar
*/
const CalendarPropTypes = {
  /**
   * Define the unique id for usage of automation test
  */
  'data-qa-id': PropTypes.string,
  /**
   * Determines the skin prefix of calendar.
  */
  prefix: PropTypes.string.isRequired,
  /**
   * Determines the today of calendar.
  */
  today: PropTypes.instanceOf(moment),
  /**
   * Determines the first day of week.
  */
  firstDayOfWeek: PropTypes.number,
  /**
   * Gets or sets the earliest date that the user can select in the calendar.
  */
  min: PropTypes.instanceOf(moment),
  /**
   * Gets or sets the latest date that the user can select in the calendar.
  */
  max: PropTypes.instanceOf(moment),
  /**
   * Gets or sets the array of dates that the user can not select in the calendar.
  */
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  /**
   * Gets or sets the currently selected date.
  */
  value: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  /**
   * Determines the selection mode of calendar.
  */
  selectMode: PropTypes.oneOf(
    [SelectionMode.SINGLE, SelectionMode.MULTIPLE]),
  /**
   * Determines the view mode of calendar.
  */
  viewMode: PropTypes.oneOf(
    [ViewMode.DATEVIEW, ViewMode.MONTHVIEW, ViewMode.YEARVIEW]),
  /**
   * Determines the minimum selectable unit of the calendar is month.
   */
  monthMode: PropTypes.bool,
  /**
   * Determines the display state of today button
   */
  displayToday: PropTypes.bool,
  /**
   * Determines the display state of day-view header
   */
  displayHeader: PropTypes.bool,
  todayBehavior: PropTypes.oneOf(
    [TodayBehavior.DISPLAY, TodayBehavior.SELECT]),
  /**
   * Occurs when the value property changes,
   *   either as a result of user actions or by assignment in code.
  */
  valueChanged: PropTypes.func.isRequired
};

/** Default Props for Calendar */
const CalendarProps = {
  'data-qa-id': 'popupCalendar',
  prefix: `${DefaultCSSPrefix}-`,
  firstDayOfWeek: moment().localeData().firstDayOfWeek(),
  min: moment(new Date(1900, 0, 1)),
  disabledDates: [],
  selectMode: SelectionMode.SINGLE,
  viewMode: ViewMode.DATEVIEW,
  monthMode: false,
  displayToday: true,
  displayHeader: true,
  todayBehavior: TodayBehavior.DISPLAY,
  value: [],
  valueChanged: () => { }
};

/** Calendar Component with three view mode: Date View, Month View and Year View. */
class Calendar extends React.PureComponent {
  static displayName = 'Calendar';
  static defaultProps = CalendarProps;
  static propTypes = CalendarPropTypes;

  constructor(props) {
    super(props);

    this.defaultMax = Globalize.getToday().add(50, 'year');
    const value = getSafeValue(props.value, props.selectMode || SelectionMode.SINGLE);
    const today = this.props.today || Globalize.getToday();
    const currentDate = this.getCurrentDate(value, today);
    const viewMode = props.viewMode === ViewMode.DATEVIEW && props.monthMode ?
      ViewMode.MONTHVIEW : props.viewMode;
    const title = this.getTitle(currentDate, viewMode);
    const todayLabel = this.getTodayLabel(props.monthMode);
    this.state = {
      viewMode,
      currentDate,
      title,
      todayLabel,
      value
    };

    this.getTitle = this.getTitle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const value = getSafeValue(nextProps.value, nextProps.selectMode || SelectionMode.SINGLE);
    const currentDate = this.getCurrentDate(value, nextProps.today);
    if (this.state.value !== value || this.props.selectMode !== nextProps.selectMode) {
      const title = this.getTitle(currentDate, this.state.viewMode);
      const todayLabel = this.getTodayLabel(nextProps.monthMode);
      this.setState({
        value,
        currentDate,
        title,
        todayLabel
      });
    }
    if (this.props.monthMode !== nextProps.monthMode && this.state.viewMode === ViewMode.DATEVIEW) {
      const viewMode = ViewMode.MONTHVIEW;
      const title = this.getTitle(currentDate, viewMode);
      this.setState({
        viewMode,
        title,
        prevViewMode: this.state.viewMode
      });
    }
  }

  onPrevClick() {
    const currentDate = this.state.currentDate.clone();

    switch (this.state.viewMode) {
      case ViewMode.DATEVIEW:
        this.setState({ currentDate: currentDate.add(-1, 'M') }, this.updateTitle);
        break;
      case ViewMode.MONTHVIEW:
        this.setState({ currentDate: currentDate.add(-1, 'y') }, this.updateTitle);
        break;
      case ViewMode.YEARVIEW:
        this.setState({ currentDate: currentDate.add(-10, 'y') }, this.updateTitle);
        break;
      default:
        break;
    }
  }

  onNextClick() {
    const currentDate = this.state.currentDate.clone();
    switch (this.state.viewMode) {
      case ViewMode.DATEVIEW:
        this.setState({ currentDate: currentDate.add(1, 'M') }, this.updateTitle);
        break;
      case ViewMode.MONTHVIEW:
        this.setState({ currentDate: currentDate.add(1, 'y') }, this.updateTitle);
        break;
      case ViewMode.YEARVIEW:
        this.setState({ currentDate: currentDate.add(10, 'y') }, this.updateTitle);
        break;
      default:
        break;
    }
  }

  onTodayClick() {
    const { todayBehavior, valueChanged } = this.props;
    const todaySelect = todayBehavior === TodayBehavior.SELECT;
    let currentDate = this.getToday().clone();

    if (this.props.monthMode) {
      currentDate = currentDate.date(1);
      const newState = {
        currentDate,
        viewMode: ViewMode.MONTHVIEW,
        prevViewMode: this.state.viewMode
      };
      if (todaySelect) {
        newState.value = [currentDate];
      }
      this.setState(newState, () => {
        this.updateTitle();
        todaySelect && valueChanged(newState.value);
      });
    } else {
      const newState = {
        currentDate,
        viewMode: ViewMode.DATEVIEW,
        prevViewMode: this.state.viewMode
      };
      const validated = this.validateDate(currentDate);
      if (todaySelect && validated) {
        newState.value = [currentDate];
      }
      this.setState(newState, () => {
        this.updateTitle();
        todaySelect && validated && valueChanged(newState.value);
      });
    }
  }

  onTitleClick() {
    switch (this.state.viewMode) {
      case ViewMode.DATEVIEW:
        this.setState({
          viewMode: ViewMode.MONTHVIEW,
          prevViewMode: this.state.viewMode
        }, this.updateTitle);
        break;
      case ViewMode.MONTHVIEW:
        this.setState({
          viewMode: ViewMode.YEARVIEW,
          prevViewMode: this.state.viewMode
        }, this.updateTitle);
        break;
      case ViewMode.YEARVIEW:
      default:
        break;
    }
  }

  validateDate(date) {
    let isDateDisabled = false;
    const { disabledDates, min, max = this.defaultMax } = this.props;

    if (disabledDates &&
      disabledDates.some(d => compareByFormat(d, date, DateFormat.MMDDYYYY))) {
      isDateDisabled = true;
    }

    if (min && date.isBefore(min, 'day')) {
      isDateDisabled = true;
    }

    if (max && date.isAfter(max, 'day')) {
      isDateDisabled = true;
    }

    return !isDateDisabled;
  }

  onDateClick(day) {
    let value = this.state.value;

    if (!this.validateDate(day)) {
      return false;
    }

    switch (this.props.selectMode) {
      case SelectionMode.SINGLE:
        value = [day];
        break;
      case SelectionMode.MULTIPLE:
        if (value.some(d => compareByFormat(d, day, DateFormat.MMDDYYYY))) {
          value = value.filter(d => !compareByFormat(d, day, DateFormat.MMDDYYYY));
        } else {
          value.push(day);
        }
        break;
      default:
        break;
    }

    return this.setState({
      value: value.slice(0),
      viewMode: ViewMode.DATEVIEW,
      prevViewMode: this.state.viewMode
    }, () => {
      const { valueChanged } = this.props;
      const sortedValue = sortedDates(this.state.value);
      this.updateTitle();
      valueChanged(sortedValue);
    });
  }

  onMonthClick(month) {
    const { monthMode } = this.props;
    let currentDate = this.state.currentDate.clone().month(month.month());
    if (monthMode) {
      currentDate = currentDate.date(1);
      const value = [currentDate];
      this.setState({
        value,
        currentDate,
        viewMode: ViewMode.MONTHVIEW,
        prevViewMode: this.state.viewMode
      }, () => {
        const { valueChanged } = this.props;
        this.updateTitle();
        valueChanged(value);
      });
    } else {
      this.setState({
        currentDate,
        viewMode: ViewMode.DATEVIEW,
        prevViewMode: this.state.viewMode
      }, this.updateTitle);
    }
  }

  onYearClick(year) {
    this.setState({
      currentDate: this.state.currentDate.clone().year(year),
      viewMode: ViewMode.MONTHVIEW,
      prevViewMode: this.state.viewMode
    }, this.updateTitle);
  }

  getCurrentDate(value, today) {
    if (isArray(value) && moment.isMoment(value[0])) {
      return value[0].clone();
    }

    if (moment.isMoment(value)) {
      return value.clone();
    }

    if (moment.isMoment(today)) {
      return today.clone();
    }

    return this.getToday();
  }

  getToday() {
    const { today } = this.props;

    if (moment.isMoment(today)) {
      return today.clone();
    }

    return Globalize.getToday();
  }

  getTodayLabel(monthMode) {
    return monthMode ? 'Current Month' : 'Today';
  }

  getTitle(currentDate, viewMode) {
    let title;
    switch (viewMode) {
      case ViewMode.DATEVIEW:
        title = currentDate.format(DateFormat.MMMYYYY);
        break;
      case ViewMode.MONTHVIEW:
        title = currentDate.format(DateFormat.YYYY);
        break;
      case ViewMode.YEARVIEW:
        title = getTenYearRange(currentDate);
        break;
      default:
        title = this.state.title;
        break;
    }
    return title;
  }

  updateTitle() {
    const { currentDate, viewMode } = this.state;
    const { monthMode } = this.props;
    const title = this.getTitle(currentDate, viewMode);
    const todayLabel = this.getTodayLabel(monthMode);
    this.setState({ title, todayLabel });
  }

  render() {
    const { style, className = '', displayHeader, dateViewRender } = this.props;
    const config = {
      prefix: this.props.prefix,
      today: this.getToday(),

      firstDayOfWeek: this.props.firstDayOfWeek,
      min: this.props.min,
      max: this.props.max || this.defaultMax,
      disabledDates: this.props.disabledDates,
      selectMode: this.props.selectMode,

      ...this.state
    };
    return (
      <div
        className={`${this.props.prefix}calendar ${className}`}
        style={style}
        ref={(elem) => { this.calendarContainer = elem; }}
        data-qa-id={this.props['data-qa-id']}
        tabIndex={dateViewRender ? -1 : 0}
      >
        {
          displayHeader &&
          <Header
            title={this.state.title}
            displayToday={this.props.displayToday}
            todayLabel={this.state.todayLabel}
            prefix={this.props.prefix}
            onPrevClick={() => this.onPrevClick()}
            onNextClick={() => this.onNextClick()}
            onTitleClick={() => this.onTitleClick()}
            onTodayClick={() => this.onTodayClick()}
          />
        }
        {
          this.state.viewMode === ViewMode.DATEVIEW &&
          <DateView
            config={config}
            dateViewRender={dateViewRender}
            onDateClick={day => this.onDateClick(day)}
          />
        }
        {
          this.state.viewMode === ViewMode.MONTHVIEW &&
          <MonthView
            config={config}
            onMonthClick={month => this.onMonthClick(month)}
          />
        }
        {
          this.state.viewMode === ViewMode.YEARVIEW &&
          <YearView
            config={config}
            onYearClick={year => this.onYearClick(year)}
          />
        }
      </div>
    );
  }
}

const popupService = createPopupService(Calendar);

/**
 * Popup a calendar.
 * @function popup
 * @param {object} calendarOptions - Configured options of Calendar
 * when calling the popup.
 * @param {object} popupOptions - Configured options of popup service
 * when calling the popup.
 * @returns {Promise} Returns a promise, from where we can get the selected date or error.
 */
Calendar.popup = (calendarOptions = {}, popupOptions = {}) => {
  const po = { closeByEscape: true, closeWhenViewChange: true, ...popupOptions };
  return popupService.popup(po, calendarOptions);
};

export default Calendar;
