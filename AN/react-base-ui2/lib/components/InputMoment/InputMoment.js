'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.InputMomentProps = undefined;var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _get2 = require('babel-runtime/helpers/get');var _get3 = _interopRequireDefault(_get2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _isUndefined = require('lodash/isUndefined');var _isUndefined2 = _interopRequireDefault(_isUndefined);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _debounce = require('lodash/debounce');var _debounce2 = _interopRequireDefault(_debounce);
var _InputBase2 = require('../InputBase');
var _utils = require('../../utils');
var _MomentTextProvider = require('./MomentTextProvider');var _MomentTextProvider2 = _interopRequireDefault(_MomentTextProvider);
var _Calendar = require('../Calendar');
var _consts = require('../../consts');
var _dialog = require('../../services/dialog');
var _i18n = require('../../services/i18n');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* eslint no-continue: 0 */
/* eslint default-case: 0 */

/** Default PropTypes of InputMoment.
                              * @memberof InputMoment
                             */
var InputMomentPropTypes = {
  /**
                              * Gets or sets the date value for a date input.
                             */
  value: _propTypes2.default.oneOfType([
  _propTypes2.default.instanceOf(_moment2.default),
  _propTypes2.default.instanceOf(Date),
  _propTypes.string]),

  /**
                        * Determines the minimal date that can be entered.
                       */
  min: _propTypes2.default.oneOfType([
  _propTypes2.default.instanceOf(_moment2.default),
  _propTypes2.default.instanceOf(Date)]),

  /**
                                           * Determines the maximum date that can be entered.
                                          */
  max: _propTypes2.default.oneOfType([
  _propTypes2.default.instanceOf(_moment2.default),
  _propTypes2.default.instanceOf(Date)]),

  /** The format pattern to display the date value.
                                           *
                                           * InputMoment supports two types of formats: Standard Format and Custom Format.
                                           *
                                           * A standard date and time format string uses a single format specifier to
                                           *  define the text representation of a date and time value.
                                           *
                                           *  Possible values for Standard Format are:
                                           *
                                           *  - "d": ShortDatePattern  M/D/YYYY
                                           *  - "D": LongDatePattern  dddd, MMMM DD, YYYY
                                           *  - "f": Full date and time (long date and short time)  dddd, MMMM DD, YYYY h:mm A
                                           *  - "F": Full date and time (long date and long time) dddd, MMMM DD, YYYY h:mm:ss A
                                           *  - "g": General (short date and short time) M/d/YYYY h:mm A
                                           *  - "G": General (short date and long time) M/d/YYYY h:mm:ss A
                                           *  - "m": month/day pattern MMMM DD
                                           *  - "M": month/day pattern MMMM DD
                                           *  - "s": sortable format that does not vary by culture
                                           *  -      YYYY\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss
                                           *  - "t": short time pattern h:mm A
                                           *  - "T": long time pattern h:mm:ss A
                                           *  - "u": Universal Sortable DateTime Pattern, same to s
                                           *  - "U": Full date and time (long date and long time) using universal time
                                           *  -    same to F
                                           *  - "y": month/year pattern YYYY MMMM
                                           *  - "Y": month/year pattern YYYY MMMM
                                           *
                                           *  Any date and time format string that contains more than one character, including white space,
                                           *  is interpreted as a custom date and time format string. For example:
                                           *  "mmm-DD-YYYY", "mmmm d, YYYY", "mm/DD/YYYY", "d-mmm-YYYY", "ddd, mmmm DD, YYYY" etc.
                                           *
                                           *  Below are the custom date and time format specifiers:
                                           *
                                           *  - "D": The day of the month, from 1 through 31.
                                           *  - "DD": The day of the month, from 01 through 31.
                                           *  - "ddd": The abbreviated name of the day of the week.
                                           *  - "dddd": The full name of the day of the week.
                                           *  - "m": The minute, from 0 through 59.
                                           *  - "mm": The minute, from 00 through 59.
                                           *  - "M": The month, from 1 through 12.
                                           *  - "MM": The month, from 01 through 12.
                                           *  - "MMM": The abbreviated name of the month.
                                           *  - "MMMM": The full name of the month.
                                           *  - "Y": The year, from 0 to 99.
                                           *  - "YY": The year, from 00 to 99
                                           *  - "YYYY": The year as a four-digit number
                                           *  - "h": The hour, using a 12-hour clock from 1 to 12.
                                           *  - "hh": The hour, using a 12-hour clock from 01 to 12.
                                           *  - "H": The hour, using a 24-hour clock from 0 to 23.
                                           *  - "HH": The hour, using a 24-hour clock from 00 to 23.
                                           *  - "s": The second, from 0 through 59.
                                           *  - "ss": The second, from 00 through 59.
                                           *  - "a": The am/pm designator.
                                           *  - "A": The AM/PM designator.
                                           * @type {string}
                                          */
  format: _propTypes.string,
  /**
                              * Allow spinning value by up/down key.
                             */
  allowKeySpin: _propTypes.bool,
  /**
                                  * Make the popup calender auto resize to input width
                                  */
  flexibleCalendar: _propTypes.bool,
  /**
                                      * Icon class name for the 1st trigger button.
                                     */
  triggerIcon: _propTypes.string,
  /**
                                   * Icon class name for the 1st trigger button in toggle state.
                                  */
  triggerIconToggle: _propTypes.string,
  /**
                                         * Icon class name for the 2nd trigger button.
                                        */
  triggerIcon2: _propTypes.string,
  /**
                                    * Icon class name for the 2nd trigger button in toggle state.
                                   */
  triggerIconToggle2: _propTypes.string,
  /**
                                          * Step in minutes when generating the time picker list.
                                         */
  timeStep: _propTypes.number,
  /**
                                * Callback function that will be called when the calendar is dropdown.
                               */
  onCalendarOpen: _propTypes.func,
  /**
                                    * Callback function that will be called when the calendar is closed.
                                   */
  onCalendarClose: _propTypes.func,
  /**
                                     * The onValueChange event handler.A function called when the value of the input is changed.
                                    */
  onValueChange: _propTypes.func };


/** Default Props for InputMoment */
var InputMomentProps = exports.InputMomentProps = (0, _extends3.default)({},
_InputBase2.InputBaseProps, {
  value: null,
  min: undefined,
  max: undefined,
  format: 'd',
  allowKeySpin: true,
  flexibleCalendar: false,
  triggerIcon: 'icon-calendar-m',
  triggerIconToggle: '',
  triggerIcon2: 'icon-clock-m',
  triggerIconToggle2: '',
  timeStep: 30,
  onCalendarOpen: _identity2.default,
  onCalendarClose: _identity2.default,
  onValueChange: _identity2.default });


/** InputMoment component allows you validate and enter manually date and time. */var
InputMoment = function (_InputBase) {(0, _inherits3.default)(InputMoment, _InputBase);




  function InputMoment(props) {(0, _classCallCheck3.default)(this, InputMoment);var _this = (0, _possibleConstructorReturn3.default)(this, (InputMoment.__proto__ || (0, _getPrototypeOf2.default)(InputMoment)).call(this,
    props));_this.










































































































































































































































































    onStopTyping = function () {
      if (_this.imeMode) {
        _this.setValue(_this.input.value);
      }

      if (_this.textProvider.closeBlankField()) {
        _this.updateText();
      }

      _this.highLightField();
    };var value = _this.props.value;_this.defaultValue = _this.preMoment = _utils.momentHelper.createMoment(value);_this.debouncedOnStopTyping = (0, _debounce2.default)(_this.onStopTyping, 2000);return _this;}(0, _createClass3.default)(InputMoment, [{ key: 'componentDidMount', value: function componentDidMount() {(0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'componentDidMount', this).call(this);this.resetTimeStamp();(0, _defineProperties2.default)(this, { value: { get: function get() {/* istanbul ignore next */return this.textProvider ? this.getValue() : this.input.value;}, set: function set(v) {this.setValue(v);} } });(0, _defineProperties2.default)(this, { text: { get: function get() {/* istanbul ignore next */return this.textProvider ? this.textProvider.getText() : this.input.value;}, set: function set(v) {this.setText(v);} } });} }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps, nextContext) {(0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);var _props = this.props,prevValue = _props.value,prevTimeStep = _props.timeStep,prevMin = _props.min,prevMax = _props.max,preFormat = _props.format;var nextValue = nextProps.value,nextTimeStep = nextProps.timeStep,nextMin = nextProps.min,nextMax = nextProps.max,nextFormat = nextProps.format;if (nextValue !== prevValue && !_utils.momentHelper.isSame(nextValue, prevValue)) {this.setValue(nextValue, false);this.needCheckRange = true;}if (!_utils.momentHelper.isSame(nextMin, prevMin) || !_utils.momentHelper.isSame(nextMax, prevMax)) {this.needCheckRange = true;}if (preFormat !== nextFormat) {var value = this.textProvider.getValue();this.textProvider = new _MomentTextProvider2.default(nextProps);this.setValue(value);}if (nextTimeStep !== prevTimeStep) {this.listItems = this.createListItems();}} }, { key: 'componentDidUpdate', value: function componentDidUpdate() {if (this.needCheckRange) {this.forceToRange(true);}this.needCheckRange = false;this.preMoment = _utils.momentHelper.createMoment(this.props.value);} }, { key: 'createTextProvider', value: function createTextProvider() {return new _MomentTextProvider2.default(this.props);} }, { key: 'getContainerClassName', value: function getContainerClassName() {return _consts.DefaultCSSPrefix + '-input-moment';} }, { key: 'isBlank', value: function isBlank() {return this.getValue() === null;} }, { key: 'onClear', value: function onClear() {var allowBlank = this.props.allowBlank;if (allowBlank) {this.setValue(null);}} }, { key: 'onInputClick', value: function onInputClick(e) {(0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'onInputClick', this).call(this, e);this.highLightCursor();} }, { key: 'getValue', value: function getValue() {return this.textProvider.getValue();} }, { key: 'setValue', value: function setValue(value) {var withEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;if ((0, _isString2.default)(value)) {this.textProvider.setText(value);} else {this.textProvider.setValue(value);}this.updateText();this.highLightField();this.onValueChange(withEvent);} }, { key: 'resetTimeStamp', value: function resetTimeStamp() {this.cursorPos = 0;this.timeStamp = new Date('1900/1/1');} }, { key: 'highLightField', value: function highLightField(index) {var _this2 = this;if ((0, _isUndefined2.default)(index)) {index = this.textProvider.activeFieldIndex;}if (index < 0) {return;}if (this.isFocused()) {var range = this.textProvider.getFieldRange(index); /* istanbul ignore else */if (range) {window.setTimeout(function () {_this2.select(range);});}}} }, { key: 'highLightCursor', value: function highLightCursor(pos) {if (!this.allowEdit() || !this.textProvider.isValid()) {return;}if (pos === undefined) {var selRange = this.getSelection();pos = Math.max(0, selRange.start);}var index = this.textProvider.getCursorFieldIndex(pos); /* istanbul ignore if */if (index < 0) {return;}this.setActiveField(index);this.highLightField(index);} }, { key: 'onMouseUp', value: function onMouseUp(e) {(0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'onMouseUp', this).call(this, e);if (this.isFocused() && !this.isSelectAll()) {var prevSelection = this.selection;var selRange = this.getSelection();if (selRange.start !== selRange.end && (prevSelection.start !== selRange.start || prevSelection.end !== selRange.end)) {this.selection = selRange;this.highLightCursor();}}} }, { key: 'setActiveField', value: function setActiveField(index) {if (this.textProvider.isValid() && this.textProvider.setActiveField(index)) {this.onStopTyping();this.resetTimeStamp();}} }, { key: 'toNextField', value: function toNextField() {this.setActiveField(this.textProvider.activeFieldIndex + 1);} }, { key: 'toPrevField', value: function toPrevField() {this.setActiveField(this.textProvider.activeFieldIndex - 1);} }, { key: 'toFirstField', value: function toFirstField() {this.setActiveField(0);} }, { key: 'toLastField', value: function toLastField() {this.setActiveField(this.textProvider.getFieldCount());} }, { key: 'doSpin', value: function doSpin() {var up = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; /* istanbul ignore else */if (this.textProvider[up ? 'increment' : 'decrement']()) {this.updateText();this.highLightField();this.onValueChange();}} }, { key: 'onInputFocus', value: function onInputFocus(e) {var _this3 = this;if (!this.allowEdit()) {return;}this.imeMode = false;window.setTimeout(function () {_this3.highLightCursor();_this3.resetTimeStamp();}, 10);(0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'onInputFocus', this).call(this, e);} }, { key: 'doBlur', value: function doBlur() {this.silence = true;this.onStopTyping();this.silence = false;this.forceToRange();this.imeMode = false;} }, { key: 'onInputBlur', value: function onInputBlur(e) {this.doBlur();this.onValueChange();e.value = this.getValue();(0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'onInputBlur', this).call(this, e);} }, { key: 'onIMEBreakThrough', value: function onIMEBreakThrough() {this.imeMode = true;this.initValue();} }, { key: 'getMomentRange', value: function getMomentRange() {var system = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;var momentMin = void 0;var momentMax = void 0;if (system) {momentMin = _utils.momentHelper.createMoment(new Date(1900, 0, 1));momentMax = _i18n.Globalize.getToday().add(50, 'year');} else {var _props2 = this.props,min = _props2.min,max = _props2.max;momentMin = _utils.momentHelper.createMoment(min);momentMax = _utils.momentHelper.createMoment(max);}return { min: momentMin, max: momentMax };} }, { key: 'initValue', value: function initValue(

    text) {
      text = text || this.input.value;
      if (!this.textProvider.isValid() && /^\d+$/.test(text)) {
        var num = parseInt(text, 10);
        var value = (0, _moment2.default)().date(num === 0 ? 10 : num).hour(num);
        this.setValue(value);
        return true;
      }
      return false;
    } }, { key: 'onKeyPressPreview', value: function onKeyPressPreview(

    ch) {
      var field = this.textProvider.getField();
      if (field) {
        if (ch === ' ') {
          return true;
        }

        var isDigit = /\d/.test(ch);
        if (field.allowInstanceEditing && !isDigit) {
          return true;
        }

        if (this.initValue(ch)) {
          return true;
        }

        var fieldGap = this.textProvider.isFieldGap(ch);
        if (fieldGap) {
          this.toNextField();
          return true;
        }

        var now = new Date();
        var lastTime = this.timeStamp;
        this.timeStamp = now;
        var startTyping = now.getTime() - lastTime.getTime() > 1000;
        if (startTyping) {
          this.textProvider.clearField();
        }

        var txt = startTyping ? ch : field.getText() + ch;
        var ret = field.setText(txt);
        if (ret) {
          this.updateText();
          this.highLightField();
        } else {
          this.triggerEvent('onInvalidInput', { char: ch });
        }
      }

      return true;
    } }, { key: 'onKeyDownPreview', value: function onKeyDownPreview(

    e) {
      var key = e.keyCode || e.which;
      switch (key) {
        case _consts.KeyCode.LEFT:
          this.toPrevField();
          return true;

        case _consts.KeyCode.RIGHT:
          this.toNextField();
          return true;

        case _consts.KeyCode.TAB:
        case _consts.KeyCode.SPACE:
        case _consts.KeyCode.COMMA:
        case _consts.KeyCode.DECIMAL_POINT:
        case _consts.KeyCode.FORWARD_SLASH:
          if (this.textProvider.isValid()) {
            if (e.shiftKey) {
              if (this.textProvider.activeFieldIndex > 0) {
                this.toPrevField();
                return true;
              }
            } else if (this.textProvider.activeFieldIndex < this.textProvider.getFieldCount() - 1) {
              this.toNextField();
              return true;
            }
          }
          break;

        case _consts.KeyCode.HOME:
          this.toFirstField();
          return true;

        case _consts.KeyCode.END:
          this.toLastField();
          return true;}


      return false;
    } }, { key: 'deleteSelection', value: function deleteSelection()

    {
      if (!this.allowEdit()) {return;}var

      allowBlank = this.props.allowBlank;

      if (this.isSelectAll()) {
        if (allowBlank) {
          this.setValue(null);
        }
      } else if (this.textProvider.clearField()) {
        this.updateText();
        this.highLightField();
      }
    } }, { key: 'onTextChange', value: function onTextChange()

    {
      this.forceToRange(false);
    } }, { key: 'forceToRange', value: function forceToRange()

    {var autoFix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var value = this.getValue();var _getMomentRange =
      this.getMomentRange(),min = _getMomentRange.min,max = _getMomentRange.max;

      if (value && autoFix) {
        var newValue = value;
        if (min) {
          newValue = _moment2.default.max(min, newValue);
        }

        if (max) {
          newValue = _moment2.default.min(max, newValue);
        }

        if (newValue && !_utils.momentHelper.isSame(newValue, value)) {
          this.setValue(newValue);
          value = newValue;
          newValue = null;
        }var _getMomentRange2 =

        this.getMomentRange(true),minSystem = _getMomentRange2.min,maxSystem = _getMomentRange2.max;
        min = minSystem;
        max = maxSystem;

        if (value < min) {
          (0, _dialog.confirm)('The entry date is too old (earlier than 1900).', { title: 'Out of range' });
          newValue = min;
        } else if (value > max) {
          (0, _dialog.confirm)('The entry date is too far in the future (more than fifty years).', { title: 'Out of range' });
          newValue = max;
        }

        if (newValue && !_utils.momentHelper.isSame(newValue, value)) {
          this.setValue(newValue);
          value = newValue;
        }
      }

      var outOfRange = value ? !_utils.momentHelper.isInRange(value, min, max) : false;
      this.setState({
        stateClassName: outOfRange ? 'state-out-of-range' : '' });

    } }, { key: 'onValueChange', value: function onValueChange()

    {var withEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var m = _utils.momentHelper.createMoment(this.getValue());

      if (!_utils.momentHelper.isSame(this.preMoment, m)) {
        this.preMoment = m;
        if (withEvent) {
          this.triggerEvent('onValueChange', {
            value: m,
            nativeDate: m ? m.toDate() : null });

        }
      }
    } }, { key: 'onTriggerClick', value: function onTriggerClick()

    {
      this.popupCalendar();
    } }, { key: 'onCalendarOpen', value: function onCalendarOpen()

    {
      this.triggerEvent('onCalendarOpen');
      this.doBlur();
    } }, { key: 'onCalendarClose', value: function onCalendarClose()

    {
      this.triggerEvent('onCalendarClose');
    } }, { key: 'popupCalendar', value: function popupCalendar()

    {var _this4 = this;
      var target = this.input;

      var popupOptions = (0, _extends3.default)({
        target: target,
        showShadow: true,
        distance: 4,
        closeByEscape: true,
        focus: true },
      this.props.listPopupOptions);


      var momentValue = this.getValue();
      var value = momentValue && momentValue.isValid() ? [momentValue] : [];var _props3 =
      this.props,disabledDates = _props3.disabledDates,min = _props3.min,max = _props3.max,flexibleCalendar = _props3.flexibleCalendar; // for calendar config
      var calendarOptions = (0, _extends3.default)({
        min: min,
        max: max,
        disabledDates: disabledDates,
        value: value,
        valueChanged: function valueChanged(v) {
          if (_this4.calendar) {
            _this4.calendar.cancel();
          }
          var d = v.length ? v[0] : null;
          if (d) {
            var dateStr = d.format('YYYY-MM-DD');
            var timeStr = momentValue && momentValue.isValid() ? momentValue.format('HH:mm:ss') : '00:00:00';
            var newValue = (0, _moment2.default)(dateStr + ' ' + timeStr, 'YYYY-MM-DD HH:mm:ss');
            _this4.setValue(newValue);
          }
        } },
      this.props.listConfig);

      if (flexibleCalendar) {
        calendarOptions.className = _consts.DefaultCSSPrefix + '-input-calendar__flexible';
        calendarOptions.style = {
          width: this.node.offsetWidth };

      }

      var calendar = _Calendar.Calendar.popup(calendarOptions, popupOptions);
      calendar.result.catch(function () {});

      if (calendar !== this.calendar) {
        this.calendar = calendar;
        this.onCalendarOpen();

        calendar.result.then(function () {
          _this4.onCalendarClose();
        }).catch(function () {
          _this4.onCalendarClose();
        });
      }
    } }, { key: 'generateTimeRange', value: function generateTimeRange()

    {
      var times = [];
      var start = 0;
      var end = 1440;
      var step = parseInt(this.props.timeStep, 10);
      var time = start;
      var nexttime = 0;
      do {
        times.push(time);
        nexttime = time + step;
        time = nexttime;
      } while (time < end);
      return times;
    } }, { key: 'getTimeFormat', value: function getTimeFormat()

    {
      return this.textProvider.pattern || 'hh:mm A';
    } }, { key: 'generateTimeData', value: function generateTimeData(

    times) {
      var format = this.getTimeFormat();
      return times.map(function (time, index) {
        var hours = Math.floor(time / 60);
        var minutes = time % 60;

        var timeText = (0, _moment2.default)(hours + ':' + minutes, 'HH:mm').format(format);
        var timeValue = (0, _moment2.default)(hours + ':' + minutes, 'HH:mm').format('HH:mm');
        return {
          text: timeText,
          value: timeValue,
          index: index };

      });
    } }, { key: 'onListOpen', value: function onListOpen()

    {
      (0, _get3.default)(InputMoment.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMoment.prototype), 'onListOpen', this).call(this);
      this.doBlur();
    } }, { key: 'onTrigger2Click', value: function onTrigger2Click()

    {
      this.popupList();
    } }, { key: 'createListItems', value: function createListItems()

    {
      var timeRange = this.generateTimeRange();
      return this.generateTimeData(timeRange);
    } }, { key: 'onListSelected', value: function onListSelected(

    indexes) {
      if ((0, _isEmpty2.default)(this.listItems) || (0, _isEmpty2.default)(indexes)) {
        return;
      }

      var i = indexes[0];
      if (i >= 0) {
        var item = this.listItems[i];
        if (item) {
          var dateStr = this.preMoment && this.preMoment.isValid() ? this.preMoment.format('YYYY-MM-DD') : '1970-01-01';
          var timeStr = item.value ? (0, _moment2.default)(item.value, 'HH:mm').format('HH:mm:ss') : '00:00:00';
          var newValue = (0, _moment2.default)(dateStr + ' ' + timeStr, 'YYYY-MM-DD HH:mm:ss');
          this.setValue(newValue);
        }
      }
    } }, { key: 'findInList', value: function findInList()

    {var _this5 = this;
      var text = this.getText();
      if (!text || (0, _isEmpty2.default)(this.listItems)) {
        return [-1];
      }

      var index = (0, _findIndex2.default)(this.listItems, function (item) {return (
          _utils.momentHelper.isSameTime(item.text, text, _this5.getTimeFormat()));});
      return [index];
    } }]);return InputMoment;}(_InputBase2.InputBase);


/**
                                                        * @react-component
                                                        */InputMoment.displayName = 'InputMoment';InputMoment.defaultProps = InputMomentProps;InputMoment.propTypes = InputMomentPropTypes;exports.default =
InputMoment;