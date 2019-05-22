'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./shared/utils');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var DAY_SPAN = 1000 * 60 * 60 * 24;

function findOutDays(d) {
  var firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  var startDate = new Date(firstDayOfMonth.getTime() - DAY_SPAN * firstDayOfMonth.getDay());

  function addDay(date, n) {
    var offset = date.getTimezoneOffset();
    var nextDay = new Date(date.getTime() + n * DAY_SPAN);
    var nextDayOffset = nextDay.getTimezoneOffset();
    if (nextDayOffset !== offset) {
      nextDay.setTime(nextDay.getTime() + (nextDayOffset - offset) * 60 * 1000);
    }
    return nextDay;
  }

  var days = new Array(6);
  for (var i = 0; i < 6; i += 1) {
    days[i] = new Array(7);
    for (var j = 0; j < 7; j += 1) {
      days[i][j] = addDay(startDate, i * 7 + j);
    }
  }
  return days;
}

function formatDate(d) {
  if (d == null) return '';
  return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
}

function isOtherMonth(x, y) {
  return x.getMonth() !== y.getMonth();
}

function isSameDay(x, y) {
  if (x === y) return true;
  if (x == null || y == null) return false;

  return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate();
}

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  placeholder: _propTypes.string,
  name: _propTypes.string,
  showIcon: _propTypes.bool,
  errored: _propTypes.bool,
  disabled: _propTypes.bool,
  onFocus: _propTypes.func,
  onBlur: _propTypes.func,
  transformDate: _propTypes.func,
  value: _propTypes.object,
  defaultValue: _propTypes.object,
  formatDate: _propTypes.func,
  today: _propTypes.object,
  getDateStatus: _propTypes.func,
  setDateClass: _propTypes.func,
  onClickDate: _propTypes.func,
  onChange: _propTypes.func,
  monthNames: _propTypes.array,
  weekdayNames: _propTypes.array,
  shortWeekdayNames: _propTypes.array
};

var DatePicker = function (_PureComponent) {
  (0, _inherits3.default)(DatePicker, _PureComponent);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _this.componentDidMount = function () {
      (0, _defineProperties2.default)(_this, {
        value: {
          get: function get() {
            return this.state.value;
          },
          set: function set(v) {
            if (this.props.value === undefined) {
              this.setState({ value: v });
            }
          }
        }
      });
    };

    _this.componentWillReceiveProps = function (nextProps) {
      var newState = {
        value: nextProps.value !== _this.props.value // eslint-disable-line no-nested-ternary
        ? nextProps.value : // eslint-disable-next-line no-nested-ternary
        nextProps.defaultValue !== _this.props.defaultValue ? _this.state.value === undefined ? nextProps.defaultValue : _this.state.value : _this.state.value
      };

      if (newState.value !== _this.state.value) {
        _this.setState(newState);
      }
    };

    _this.componentDidUpdate = function () {
      var formatDateProps = _this.props.formatDate;
      var value = _this.state.value;


      if (formatDateProps) {
        _this.input.value = formatDateProps(value);
      } else if (value) {
        _this.input.value = formatDate(value);
      }
    };

    _this.onClickDate = function (d, dateStatusObj) {
      var onClickDate = _this.props.onClickDate;
      onClickDate = typeof onClickDate === 'function' ? onClickDate : null;

      if (onClickDate) {
        if (onClickDate(dateStatusObj)) {
          _this.selectDate(d);
        }
        return false;
      }

      _this.selectDate(d);
      return false;
    };

    _this.setDateClass = function (c, calendarDate, today, dateStatusObj) {
      return (0, _classnames2.default)({
        'date-picker--other-month': isOtherMonth(c, calendarDate),
        'date-picker--today': isSameDay(c, today),
        'date-picker--selected': isSameDay(c, _this.state.value)
      }, _this.props.setDateClass(dateStatusObj));
    };

    _this.setRef = function (ref) {
      _this.input = ref;
    };

    _this.setInputNodeRef = function (node) {
      _this.inputNode = node;
    };

    _this.goPrevMonth = function () {
      var calendarDate = _this.state.calendarDate;
      var prevMonth = new Date(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getTime() - DAY_SPAN);
      _this.setState({
        calendarDate: prevMonth
      });
    };

    _this.goNextMonth = function () {
      var calendarDate = _this.state.calendarDate;
      var nextMonth = new Date(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getTime() + DAY_SPAN * 31);
      _this.setState({
        calendarDate: nextMonth
      });
    };

    _this.selectDate = function (d) {
      var date = _this.props.value !== undefined ? _this.state.value : d;

      _this.setState({
        value: d && date,
        isDisplayed: false
      }, function () {
        if (_this.props.onChange) _this.props.onChange(d, _this.input.value);
      });
    };

    _this.handleFocus = function (e) {
      var onFocus = _this.props.onFocus;


      _this.gainFocus();
      onFocus(e);
    };

    _this.handleBlur = function (e) {
      var onBlur = _this.props.onBlur;


      _this.loseFocus();
      onBlur(e);
    };

    _this.gainFocus = function () {
      var rect = _this.inputNode.getBoundingClientRect();
      var verDistance = document.documentElement.clientHeight - (rect.top + rect.height);
      var horDistance = document.documentElement.clientWidth - (rect.left + rect.width);

      _this.setState({
        isDisplayed: true,
        showOnTop: verDistance < 216.75 && rect.top >= 216.75, // TODO: Magic number???
        showOnLeft: horDistance < 246 && rect.width <= 246, // TODO: Magic number???
        calendarDate: _this.state.value || new Date()
      });
    };

    _this.loseFocus = function () {
      var input = _this.input;
      var value = _this.state.value;

      var transformDate = _this.props.transformDate;
      var d = new Date(transformDate ? transformDate(input.value) : input.value);

      if (isNaN(d.getTime())) {
        _this.selectDate(null);
      } else if (value == null || d.getTime() !== value.getTime()) {
        _this.selectDate(d);
      } else {
        _this.setState({
          isDisplayed: false
        });
      }
    };

    _this.preventStealingFocus = function (e) {
      e.preventDefault();
    };

    _this.displayIfNotAlready = function () {
      if (!_this.state.isDisplayed && document.activeElement === _this.input.input) {
        _this.setState({ isDisplayed: true });
      }
    };

    _this.render = function () {
      var _this$props = _this.props,
          placeholder = _this$props.placeholder,
          className = _this$props.className,
          style = _this$props.style,
          name = _this$props.name,
          showIcon = _this$props.showIcon,
          errored = _this$props.errored,
          disabled = _this$props.disabled,
          monthNames = _this$props.monthNames,
          weekdayNames = _this$props.weekdayNames,
          shortWeekdayNames = _this$props.shortWeekdayNames,
          rest = (0, _objectWithoutProperties3.default)(_this$props, ['placeholder', 'className', 'style', 'name', 'showIcon', 'errored', 'disabled', 'monthNames', 'weekdayNames', 'shortWeekdayNames']);
      var _this$state = _this.state,
          isDisplayed = _this$state.isDisplayed,
          showOnTop = _this$state.showOnTop,
          showOnLeft = _this$state.showOnLeft;

      var calendarDate = _this.state.calendarDate;
      var calendarDateStr = monthNames[calendarDate.getMonth()] + ' ' + calendarDate.getFullYear();
      var days = findOutDays(calendarDate);
      var today = _this.props.today || new Date();

      // set input element default value.
      var inputDefaultValue = _this.props.value ? _this.state.value : _this.props.defaultValue;
      inputDefaultValue = _this.props.formatDate ? _this.props.formatDate(inputDefaultValue) : formatDate(inputDefaultValue);
      var validProps = (0, _utils.filterValidProps)(rest);
      var classes = (0, _classnames2.default)('date-picker', className);
      var calendarClasses = (0, _classnames2.default)({
        'date-picker__calendar': true,
        'u-hidden': !isDisplayed,
        'date-picker__calendar--show-on-top': showOnTop,
        'date-picker__calendar--show-on-left': showOnLeft
      });

      return _react2.default.createElement(
        'div',
        { className: classes, style: style },
        _react2.default.createElement(_Input2.default, (0, _extends3.default)({
          ref: _this.setRef
        }, validProps, {
          placeholder: placeholder,
          name: name,
          postIcon: showIcon ? 'icon-calendar' : undefined,
          errored: errored,
          disabled: disabled,
          defaultValue: inputDefaultValue,
          onFocus: _this.handleFocus,
          onBlur: _this.handleBlur,
          onClick: _this.displayIfNotAlready,
          inputRef: _this.setInputNodeRef
        })),
        _react2.default.createElement(
          'div',
          {
            className: calendarClasses,
            onMouseDown: _this.preventStealingFocus
          },
          _react2.default.createElement(
            'header',
            { className: 'date-picker__header' },
            _react2.default.createElement('span', {
              className: 'icon-chevron-left date-picker__left-arrow',
              title: 'Previous month',
              onClick: _this.goPrevMonth
            }),
            _react2.default.createElement('span', {
              className: 'icon-chevron-right date-picker__right-arrow',
              title: 'Next month',
              onClick: _this.goNextMonth
            }),
            _react2.default.createElement(
              'div',
              { className: 'date-picker__calendar-title' },
              _react2.default.createElement(
                'strong',
                null,
                calendarDateStr
              )
            )
          ),
          _react2.default.createElement(
            'table',
            { className: 'date-picker__table' },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                shortWeekdayNames.map(function (v, k) {
                  return _react2.default.createElement(
                    'th',
                    { key: k, title: weekdayNames[k] },
                    v
                  );
                })
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              days.map(function (r, i) {
                return _react2.default.createElement(
                  'tr',
                  { key: i },
                  r.map(function (c, j) {
                    var dateStatusObj = _this.props.getDateStatus({
                      date: c,
                      calendarDate: calendarDate,
                      today: today
                    });

                    return _react2.default.createElement(
                      'td',
                      {
                        key: j,
                        className: _this.setDateClass(c, calendarDate, today, dateStatusObj),
                        onClick: function onClick() {
                          return _this.onClickDate(c, dateStatusObj);
                        }
                      },
                      c.getDate()
                    );
                  })
                );
              })
            )
          )
        )
      );
    };

    _this.state = {
      isDisplayed: false,
      showOnTop: false,
      showOnLeft: false,
      value: props.value || props.defaultValue,
      calendarDate: props.value || props.defaultValue || new Date()
    };
    return _this;
  }

  return DatePicker;
}(_react.PureComponent);

DatePicker.displayName = 'AUIDatePicker';
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = {
  onBlur: _utils.noop,
  onFocus: _utils.noop,
  loseFocus: _utils.noop,
  getDateStatus: _utils.noop,
  setDateClass: _utils.noop,
  monthNames: MONTH_NAMES,
  weekdayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortWeekdayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
exports.default = DatePicker;
module.exports = exports['default'];