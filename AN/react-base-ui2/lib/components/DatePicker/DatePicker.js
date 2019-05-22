'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _templateObject = (0, _taggedTemplateLiteral3.default)(['date-picker ', ''], ['date-picker ', '']);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);

var _utils = require('../../utils');
var _Input = require('../Input');var _Input2 = _interopRequireDefault(_Input);

var _Calendar = require('../Calendar');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


function defaultFormatDate(value) {
  if (!value) {
    return '';
  }

  var tmp = value;
  if ((0, _isArray2.default)(value)) {
    tmp = value[0];
  }

  tmp = (0, _moment2.default)(tmp);
  if (!tmp.isValid()) {
    return '';
  }

  return tmp.format('MM/DD/YYYY');
}

/**
   * Default PropTypes of DatePicker.
   */
var DatePickerPropTypes = {
  /**
                             * Determines the class name.
                             */
  className: _propTypes2.default.string,
  /**
                                          * Determines the style.
                                          */
  style: _propTypes2.default.object,
  /**
                                      * Determines the date picker name attribute.
                                      */
  name: _propTypes2.default.string,
  /**
                                     * whether to display the date picker icon.
                                     */
  showIcon: _propTypes2.default.bool,
  /**
                                       * whether to have errors.
                                       */
  errored: _propTypes2.default.bool,
  /**
                                      * Determines the min date.
                                      */
  min: _propTypes2.default.instanceOf(_moment2.default),
  /**
                                                          * Determines the max date.
                                                          */
  max: _propTypes2.default.instanceOf(_moment2.default),
  /**
                                                          * Determines the min date value.
                                                          */
  disabledDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /**
                                                                                                 * Determines the default date.
                                                                                                 */
  value: _propTypes2.default.oneOfType([
  _propTypes2.default.instanceOf(_moment2.default),
  _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default))]),

  /**
                                                                                    * A function called when format date.
                                                                                    */
  formatDate: _propTypes2.default.func,
  /**
                                         * A function called when format date to text.
                                         */
  formatTextValue: _propTypes2.default.func,
  /**
                                              * A function called when date changed.
                                              */
  onValueChange: _propTypes2.default.func,
  /**
                                            * A function called when date canlendar open.
                                            */
  onCalendarOpen: _propTypes2.default.func,
  /**
                                             * A function called when date canlendar close.
                                             */
  onCalendarClose: _propTypes2.default.func };



/** UI component that displays DatePicker with variant settings.*/var
DatePicker = function (_PureComponent) {(0, _inherits3.default)(DatePicker, _PureComponent);



  function DatePicker(props) {(0, _classCallCheck3.default)(this, DatePicker);var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this,
    props));_this.







    componentDidMount = function () {
      (0, _defineProperties2.default)(_this, {
        value: {
          get: function get() {
            return this.state.value;
          },
          set: function set(v) {var _this2 = this;
            this.setState({ value: (0, _Calendar.getSafeValue)(v) },
            function () {var
              onValueChange = _this2.props.onValueChange;
              if ((0, _isFunction2.default)(onValueChange)) {
                onValueChange({
                  value: _this2.state.value });

              }
            });
          } } });


    };_this.

    componentWillReceiveProps = function (nextProps) {
      var newValue = (0, _Calendar.getSafeValue)(nextProps.value);
      var oldValue = (0, _Calendar.getSafeValue)(_this.props.value);
      if (newValue.map(function (v) {return v.format('MM/DD/YYYY');}).join(';') !==
      oldValue.map(function (v) {return v.format('MM/DD/YYYY');}).join(';')) {
        _this.setState({ value: newValue });
      }
    };_this.

























































































    render = function () {var _this$props =




      _this.props,className = _this$props.className,style = _this$props.style,name = _this$props.name,showIcon = _this$props.showIcon,errored = _this$props.errored,dataQAId = _this$props['data-qa-id'];

      return (
        _react2.default.createElement('div', {
            className: (0, _utils.cls)(_templateObject, className || ''),
            style: style },

          _react2.default.createElement(_Input2.default, {
            'data-qa-id': dataQAId,
            ref: function ref(_ref) {_this.input = _ref;},
            name: name,
            postIcon: showIcon ? 'icon-calendar' : undefined,
            errored: errored,
            onFocus: function onFocus(e) {return _this.onFocus(e);},
            value: _this.getTextValue(_this.state.value) })));



    };_this.calendar = null;_this.state = { value: (0, _Calendar.getSafeValue)(props.value) };return _this;}(0, _createClass3.default)(DatePicker, [{ key: 'onFocus', value: function onFocus(e) {this.popupCalendar();var onFocus = this.props.onFocus;if ((0, _isFunction2.default)(onFocus)) {onFocus(e);}e.stopPropagation();e.preventDefault();} }, { key: 'getTextValue', value: function getTextValue(value) {var formatTextValue = this.props.formatTextValue;if ((0, _isFunction2.default)(formatTextValue)) {return formatTextValue(value);}return this.defaultFormatTextValue(value);} }, { key: 'defaultFormatTextValue', value: function defaultFormatTextValue(value) {if (!(0, _isArray2.default)(value)) {value = [value];}if ((0, _isEmpty2.default)(value)) return '';if (value.length > 1) {return value.length + ' date(s) selected';}return this.formatDate(value[0]);} }, { key: 'formatDate', value: function formatDate(value) {var formatDate = this.props.formatDate;if ((0, _isFunction2.default)(formatDate)) {return formatDate(value);}return defaultFormatDate(value);} }, { key: 'popupCalendar', value: function popupCalendar() {var _this3 = this;var target = this.input.input;var popupOptions = { target: target, showShadow: true, distance: 0, closeByEscape: true };var calendar = null;var value = this.state.value;var calendarOptions = { selectMode: _Calendar.SelectionMode.MULTIPLE, value: value, valueChanged: function valueChanged(v) {_this3.value = v;}, min: this.props.min, max: this.props.max, disabledDates: this.props.disabledDates, 'data-qa-id': this.props['data-qa-id'] && this.props['data-qa-id'] + '-calendar' };calendar = _Calendar.Calendar.popup(calendarOptions, popupOptions);if (calendar !== this.calendar) {this.calendar = calendar;var _props = this.props,onCalendarOpen = _props.onCalendarOpen,onCalendarClose = _props.onCalendarClose;if ((0, _isFunction2.default)(onCalendarOpen)) {onCalendarOpen();}calendar.result.then(function () {if ((0, _isFunction2.default)(onCalendarClose)) {onCalendarClose();}}).catch(function () {if ((0, _isFunction2.default)(onCalendarClose)) {onCalendarClose();}});}} }]);return DatePicker;}(_react.PureComponent);DatePicker.displayName = 'DatePicker';DatePicker.propTypes = DatePickerPropTypes;exports.default =


DatePicker;module.exports = exports['default'];