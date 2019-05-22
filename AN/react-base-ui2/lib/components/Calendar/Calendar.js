'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);

var _popup = require('../../services/popup');
var _i18n = require('../../services/i18n');
var _consts = require('../../consts');
var _consts2 = require('./consts');
var _utils = require('./utils');
var _Header = require('./Header');var _Header2 = _interopRequireDefault(_Header);
var _DateView = require('./DateView');var _DateView2 = _interopRequireDefault(_DateView);
var _MonthView = require('./MonthView');var _MonthView2 = _interopRequireDefault(_MonthView);
var _YearView = require('./YearView');var _YearView2 = _interopRequireDefault(_YearView);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of Calendar.
                                                                                                                                                                                        * @memberof Calendar
                                                                                                                                                                                       */
var CalendarPropTypes = {
  /**
                           * Define the unique id for usage of automation test
                          */
  'data-qa-id': _propTypes2.default.string,
  /**
                                             * Determines the skin prefix of calendar.
                                            */
  prefix: _propTypes2.default.string.isRequired,
  /**
                                                  * Determines the today of calendar.
                                                 */
  today: _propTypes2.default.instanceOf(_moment2.default),
  /**
                                                            * Determines the first day of week.
                                                           */
  firstDayOfWeek: _propTypes2.default.number,
  /**
                                               * Gets or sets the earliest date that the user can select in the calendar.
                                              */
  min: _propTypes2.default.instanceOf(_moment2.default),
  /**
                                                          * Gets or sets the latest date that the user can select in the calendar.
                                                         */
  max: _propTypes2.default.instanceOf(_moment2.default),
  /**
                                                          * Gets or sets the array of dates that the user can not select in the calendar.
                                                         */
  disabledDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /**
                                                                                                 * Gets or sets the currently selected date.
                                                                                                */
  value: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /**
                                                                                         * Determines the selection mode of calendar.
                                                                                        */
  selectMode: _propTypes2.default.oneOf(
  [_consts2.SelectionMode.SINGLE, _consts2.SelectionMode.MULTIPLE]),
  /**
                                                                      * Determines the view mode of calendar.
                                                                     */
  viewMode: _propTypes2.default.oneOf(
  [_consts2.ViewMode.DATEVIEW, _consts2.ViewMode.MONTHVIEW, _consts2.ViewMode.YEARVIEW]),
  /**
                                                                                           * Determines the minimum selectable unit of the calendar is month.
                                                                                           */
  monthMode: _propTypes2.default.bool,
  /**
                                        * Determines the display state of today button
                                        */
  displayToday: _propTypes2.default.bool,
  /**
                                           * Determines the display state of day-view header
                                           */
  displayHeader: _propTypes2.default.bool,
  todayBehavior: _propTypes2.default.oneOf(
  [_consts2.TodayBehavior.DISPLAY, _consts2.TodayBehavior.SELECT]),
  /**
                                                                     * Occurs when the value property changes,
                                                                     *   either as a result of user actions or by assignment in code.
                                                                    */
  valueChanged: _propTypes2.default.func.isRequired };


/** Default Props for Calendar */
var CalendarProps = {
  'data-qa-id': 'popupCalendar',
  prefix: _consts.DefaultCSSPrefix + '-',
  firstDayOfWeek: (0, _moment2.default)().localeData().firstDayOfWeek(),
  min: (0, _moment2.default)(new Date(1900, 0, 1)),
  disabledDates: [],
  selectMode: _consts2.SelectionMode.SINGLE,
  viewMode: _consts2.ViewMode.DATEVIEW,
  monthMode: false,
  displayToday: true,
  displayHeader: true,
  todayBehavior: _consts2.TodayBehavior.DISPLAY,
  value: [],
  valueChanged: function valueChanged() {} };


/** Calendar Component with three view mode: Date View, Month View and Year View. */var
Calendar = function (_React$PureComponent) {(0, _inherits3.default)(Calendar, _React$PureComponent);




  function Calendar(props) {(0, _classCallCheck3.default)(this, Calendar);var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this,
    props));

    _this.defaultMax = _i18n.Globalize.getToday().add(50, 'year');
    var value = (0, _utils.getSafeValue)(props.value, props.selectMode || _consts2.SelectionMode.SINGLE);
    var today = _this.props.today || _i18n.Globalize.getToday();
    var currentDate = _this.getCurrentDate(value, today);
    var viewMode = props.viewMode === _consts2.ViewMode.DATEVIEW && props.monthMode ?
    _consts2.ViewMode.MONTHVIEW : props.viewMode;
    var title = _this.getTitle(currentDate, viewMode);
    var todayLabel = _this.getTodayLabel(props.monthMode);
    _this.state = {
      viewMode: viewMode,
      currentDate: currentDate,
      title: title,
      todayLabel: todayLabel,
      value: value };


    _this.getTitle = _this.getTitle.bind(_this);return _this;
  }(0, _createClass3.default)(Calendar, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      var value = (0, _utils.getSafeValue)(nextProps.value, nextProps.selectMode || _consts2.SelectionMode.SINGLE);
      var currentDate = this.getCurrentDate(value, nextProps.today);
      if (this.state.value !== value || this.props.selectMode !== nextProps.selectMode) {
        var title = this.getTitle(currentDate, this.state.viewMode);
        var todayLabel = this.getTodayLabel(nextProps.monthMode);
        this.setState({
          value: value,
          currentDate: currentDate,
          title: title,
          todayLabel: todayLabel });

      }
      if (this.props.monthMode !== nextProps.monthMode && this.state.viewMode === _consts2.ViewMode.DATEVIEW) {
        var viewMode = _consts2.ViewMode.MONTHVIEW;
        var _title = this.getTitle(currentDate, viewMode);
        this.setState({
          viewMode: viewMode,
          title: _title,
          prevViewMode: this.state.viewMode });

      }
    } }, { key: 'onPrevClick', value: function onPrevClick()

    {
      var currentDate = this.state.currentDate.clone();

      switch (this.state.viewMode) {
        case _consts2.ViewMode.DATEVIEW:
          this.setState({ currentDate: currentDate.add(-1, 'M') }, this.updateTitle);
          break;
        case _consts2.ViewMode.MONTHVIEW:
          this.setState({ currentDate: currentDate.add(-1, 'y') }, this.updateTitle);
          break;
        case _consts2.ViewMode.YEARVIEW:
          this.setState({ currentDate: currentDate.add(-10, 'y') }, this.updateTitle);
          break;
        default:
          break;}

    } }, { key: 'onNextClick', value: function onNextClick()

    {
      var currentDate = this.state.currentDate.clone();
      switch (this.state.viewMode) {
        case _consts2.ViewMode.DATEVIEW:
          this.setState({ currentDate: currentDate.add(1, 'M') }, this.updateTitle);
          break;
        case _consts2.ViewMode.MONTHVIEW:
          this.setState({ currentDate: currentDate.add(1, 'y') }, this.updateTitle);
          break;
        case _consts2.ViewMode.YEARVIEW:
          this.setState({ currentDate: currentDate.add(10, 'y') }, this.updateTitle);
          break;
        default:
          break;}

    } }, { key: 'onTodayClick', value: function onTodayClick()

    {var _this2 = this;var _props =
      this.props,todayBehavior = _props.todayBehavior,valueChanged = _props.valueChanged;
      var todaySelect = todayBehavior === _consts2.TodayBehavior.SELECT;
      var currentDate = this.getToday().clone();

      if (this.props.monthMode) {
        currentDate = currentDate.date(1);
        var newState = {
          currentDate: currentDate,
          viewMode: _consts2.ViewMode.MONTHVIEW,
          prevViewMode: this.state.viewMode };

        if (todaySelect) {
          newState.value = [currentDate];
        }
        this.setState(newState, function () {
          _this2.updateTitle();
          todaySelect && valueChanged(newState.value);
        });
      } else {
        var _newState = {
          currentDate: currentDate,
          viewMode: _consts2.ViewMode.DATEVIEW,
          prevViewMode: this.state.viewMode };

        var validated = this.validateDate(currentDate);
        if (todaySelect && validated) {
          _newState.value = [currentDate];
        }
        this.setState(_newState, function () {
          _this2.updateTitle();
          todaySelect && validated && valueChanged(_newState.value);
        });
      }
    } }, { key: 'onTitleClick', value: function onTitleClick()

    {
      switch (this.state.viewMode) {
        case _consts2.ViewMode.DATEVIEW:
          this.setState({
            viewMode: _consts2.ViewMode.MONTHVIEW,
            prevViewMode: this.state.viewMode },
          this.updateTitle);
          break;
        case _consts2.ViewMode.MONTHVIEW:
          this.setState({
            viewMode: _consts2.ViewMode.YEARVIEW,
            prevViewMode: this.state.viewMode },
          this.updateTitle);
          break;
        case _consts2.ViewMode.YEARVIEW:
        default:
          break;}

    } }, { key: 'validateDate', value: function validateDate(

    date) {
      var isDateDisabled = false;var _props2 =
      this.props,disabledDates = _props2.disabledDates,min = _props2.min,_props2$max = _props2.max,max = _props2$max === undefined ? this.defaultMax : _props2$max;

      if (disabledDates &&
      disabledDates.some(function (d) {return (0, _utils.compareByFormat)(d, date, _consts2.DateFormat.MMDDYYYY);})) {
        isDateDisabled = true;
      }

      if (min && date.isBefore(min, 'day')) {
        isDateDisabled = true;
      }

      if (max && date.isAfter(max, 'day')) {
        isDateDisabled = true;
      }

      return !isDateDisabled;
    } }, { key: 'onDateClick', value: function onDateClick(

    day) {var _this3 = this;
      var value = this.state.value;

      if (!this.validateDate(day)) {
        return false;
      }

      switch (this.props.selectMode) {
        case _consts2.SelectionMode.SINGLE:
          value = [day];
          break;
        case _consts2.SelectionMode.MULTIPLE:
          if (value.some(function (d) {return (0, _utils.compareByFormat)(d, day, _consts2.DateFormat.MMDDYYYY);})) {
            value = value.filter(function (d) {return !(0, _utils.compareByFormat)(d, day, _consts2.DateFormat.MMDDYYYY);});
          } else {
            value.push(day);
          }
          break;
        default:
          break;}


      return this.setState({
        value: value.slice(0),
        viewMode: _consts2.ViewMode.DATEVIEW,
        prevViewMode: this.state.viewMode },
      function () {var
        valueChanged = _this3.props.valueChanged;
        var sortedValue = (0, _utils.sortedDates)(_this3.state.value);
        _this3.updateTitle();
        valueChanged(sortedValue);
      });
    } }, { key: 'onMonthClick', value: function onMonthClick(

    month) {var _this4 = this;var
      monthMode = this.props.monthMode;
      var currentDate = this.state.currentDate.clone().month(month.month());
      if (monthMode) {
        currentDate = currentDate.date(1);
        var value = [currentDate];
        this.setState({
          value: value,
          currentDate: currentDate,
          viewMode: _consts2.ViewMode.MONTHVIEW,
          prevViewMode: this.state.viewMode },
        function () {var
          valueChanged = _this4.props.valueChanged;
          _this4.updateTitle();
          valueChanged(value);
        });
      } else {
        this.setState({
          currentDate: currentDate,
          viewMode: _consts2.ViewMode.DATEVIEW,
          prevViewMode: this.state.viewMode },
        this.updateTitle);
      }
    } }, { key: 'onYearClick', value: function onYearClick(

    year) {
      this.setState({
        currentDate: this.state.currentDate.clone().year(year),
        viewMode: _consts2.ViewMode.MONTHVIEW,
        prevViewMode: this.state.viewMode },
      this.updateTitle);
    } }, { key: 'getCurrentDate', value: function getCurrentDate(

    value, today) {
      if ((0, _isArray2.default)(value) && _moment2.default.isMoment(value[0])) {
        return value[0].clone();
      }

      if (_moment2.default.isMoment(value)) {
        return value.clone();
      }

      if (_moment2.default.isMoment(today)) {
        return today.clone();
      }

      return this.getToday();
    } }, { key: 'getToday', value: function getToday()

    {var
      today = this.props.today;

      if (_moment2.default.isMoment(today)) {
        return today.clone();
      }

      return _i18n.Globalize.getToday();
    } }, { key: 'getTodayLabel', value: function getTodayLabel(

    monthMode) {
      return monthMode ? 'Current Month' : 'Today';
    } }, { key: 'getTitle', value: function getTitle(

    currentDate, viewMode) {
      var title = void 0;
      switch (viewMode) {
        case _consts2.ViewMode.DATEVIEW:
          title = currentDate.format(_consts2.DateFormat.MMMYYYY);
          break;
        case _consts2.ViewMode.MONTHVIEW:
          title = currentDate.format(_consts2.DateFormat.YYYY);
          break;
        case _consts2.ViewMode.YEARVIEW:
          title = (0, _utils.getTenYearRange)(currentDate);
          break;
        default:
          title = this.state.title;
          break;}

      return title;
    } }, { key: 'updateTitle', value: function updateTitle()

    {var _state =
      this.state,currentDate = _state.currentDate,viewMode = _state.viewMode;var
      monthMode = this.props.monthMode;
      var title = this.getTitle(currentDate, viewMode);
      var todayLabel = this.getTodayLabel(monthMode);
      this.setState({ title: title, todayLabel: todayLabel });
    } }, { key: 'render', value: function render()

    {var _this5 = this;var _props3 =
      this.props,style = _props3.style,_props3$className = _props3.className,className = _props3$className === undefined ? '' : _props3$className,displayHeader = _props3.displayHeader,dateViewRender = _props3.dateViewRender;
      var config = (0, _extends3.default)({
        prefix: this.props.prefix,
        today: this.getToday(),

        firstDayOfWeek: this.props.firstDayOfWeek,
        min: this.props.min,
        max: this.props.max || this.defaultMax,
        disabledDates: this.props.disabledDates,
        selectMode: this.props.selectMode },

      this.state);

      return (
        _react2.default.createElement('div', {
            className: this.props.prefix + 'calendar ' + className,
            style: style,
            ref: function ref(elem) {_this5.calendarContainer = elem;},
            'data-qa-id': this.props['data-qa-id'],
            tabIndex: dateViewRender ? -1 : 0 },


          displayHeader &&
          _react2.default.createElement(_Header2.default, {
            title: this.state.title,
            displayToday: this.props.displayToday,
            todayLabel: this.state.todayLabel,
            prefix: this.props.prefix,
            onPrevClick: function onPrevClick() {return _this5.onPrevClick();},
            onNextClick: function onNextClick() {return _this5.onNextClick();},
            onTitleClick: function onTitleClick() {return _this5.onTitleClick();},
            onTodayClick: function onTodayClick() {return _this5.onTodayClick();} }),



          this.state.viewMode === _consts2.ViewMode.DATEVIEW &&
          _react2.default.createElement(_DateView2.default, {
            config: config,
            dateViewRender: dateViewRender,
            onDateClick: function onDateClick(day) {return _this5.onDateClick(day);} }),



          this.state.viewMode === _consts2.ViewMode.MONTHVIEW &&
          _react2.default.createElement(_MonthView2.default, {
            config: config,
            onMonthClick: function onMonthClick(month) {return _this5.onMonthClick(month);} }),



          this.state.viewMode === _consts2.ViewMode.YEARVIEW &&
          _react2.default.createElement(_YearView2.default, {
            config: config,
            onYearClick: function onYearClick(year) {return _this5.onYearClick(year);} })));




    } }]);return Calendar;}(_react2.default.PureComponent);Calendar.displayName = 'Calendar';Calendar.defaultProps = CalendarProps;Calendar.propTypes = CalendarPropTypes;


var popupService = (0, _popup.createPopupService)(Calendar);

/**
                                                              * Popup a calendar.
                                                              * @function popup
                                                              * @param {object} calendarOptions - Configured options of Calendar
                                                              * when calling the popup.
                                                              * @param {object} popupOptions - Configured options of popup service
                                                              * when calling the popup.
                                                              * @returns {Promise} Returns a promise, from where we can get the selected date or error.
                                                              */
Calendar.popup = function () {var calendarOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var popupOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var po = (0, _extends3.default)({ closeByEscape: true, closeWhenViewChange: true }, popupOptions);
  return popupService.popup(po, calendarOptions);
};exports.default =

Calendar;module.exports = exports['default'];