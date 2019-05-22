'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');




var _map = require('lodash/map');var _map2 = _interopRequireDefault(_map);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);

var _Dropdown = require('../Dropdown');var _Dropdown2 = _interopRequireDefault(_Dropdown);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                         * Default PropTypes of Duration.
                                                                                                                                                                                         */
var DurationPropTypes = {
  /**
                           * Sets the duration, the format is 'hh:mm:ss'.
                          */
  value: _propTypes.string, // hh:mm:ss
  /**
   * Whether the duration list is disabled.
  */
  disabled: _propTypes.bool,
  /**
                              * The callback function that is triggered when changes the duration.
                             */
  onChange: _propTypes.func };


/** UI component of Duration.*/var
Duration = function (_React$PureComponent) {(0, _inherits3.default)(Duration, _React$PureComponent);(0, _createClass3.default)(Duration, null, [{ key: 'fixTwo', value: function fixTwo(



    num) {
      if (!(0, _isNil2.default)(num)) {
        var v = '0' + num;
        return v.substring(v.length - 2, v.length);
      }

      return '';
    } }, { key: 'getData', value: function getData()

    {
      var hours = (0, _map2.default)(Array(25),
      function (v, i) {return { text: Duration.fixTwo(i), value: Duration.fixTwo(i) };});
      var minutes = (0, _map2.default)(Array(60),
      function (v, i) {return { text: Duration.fixTwo(i), value: Duration.fixTwo(i) };});
      var seconds = (0, _map2.default)(Array(60),
      function (v, i) {return { text: Duration.fixTwo(i), value: Duration.fixTwo(i) };});

      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds };

    } }]);

  function Duration(props) {(0, _classCallCheck3.default)(this, Duration);var _this = (0, _possibleConstructorReturn3.default)(this, (Duration.__proto__ || (0, _getPrototypeOf2.default)(Duration)).call(this,
    props));

    _this.state = (0, _extends3.default)({},
    _this.getValue(props.value),
    Duration.getData());return _this;

  }(0, _createClass3.default)(Duration, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      if (nextProps.value !== this.props.value) {var _getValue =
        this.getValue(nextProps.value),hour = _getValue.hour,minute = _getValue.minute,second = _getValue.second;

        this.setState({
          hour: hour, minute: minute, second: second });

      }
    } }, { key: 'onChange', value: function onChange(

    durationUnit, value) {var _this2 = this;
      this.setState((0, _defineProperty3.default)({}, durationUnit, value), function () {var
        onChange = _this2.props.onChange;
        if ((0, _isFunction2.default)(onChange)) {var _state =
          _this2.state,hour = _state.hour,minute = _state.minute,second = _state.second;
          var duration = hour + ':' + minute + ':' + second;

          onChange(duration);
        }
      });
    } }, { key: 'getValue', value: function getValue(

    value) {
      var returnVal = { hour: '00', minute: '00', second: '00' };

      if ((0, _isString2.default)(value) && /^\d{1,2}:\d{1,2}:\d{1,2}$/.test(value)) {var _value$split =
        value.split(':'),_value$split2 = (0, _slicedToArray3.default)(_value$split, 3),hour = _value$split2[0],minute = _value$split2[1],second = _value$split2[2];
        returnVal.hour = Duration.fixTwo(hour);
        returnVal.minute = Duration.fixTwo(minute);
        returnVal.second = Duration.fixTwo(second);
      }

      return returnVal;
    } }, { key: 'render', value: function render()

    {var _this3 = this;var
      disabled = this.props.disabled;
      return (
        _react2.default.createElement('div', { className: 'duration' },
          _react2.default.createElement(_Dropdown2.default, {
            data: this.state.hours,
            value: this.state.hour,
            disabled: disabled,
            onChange: function onChange(_ref) {var value = _ref.value;return _this3.onChange('hour', value);} }),

          _react2.default.createElement('span', { className: 'txt' }, 'hrs'),
          _react2.default.createElement(_Dropdown2.default, {
            data: this.state.minutes,
            value: this.state.minute,
            disabled: disabled,
            onChange: function onChange(_ref2) {var value = _ref2.value;return _this3.onChange('minute', value);} }),

          _react2.default.createElement('span', { className: 'txt' }, 'min'),
          _react2.default.createElement(_Dropdown2.default, {
            data: this.state.seconds,
            value: this.state.second,
            disabled: disabled,
            onChange: function onChange(_ref3) {var value = _ref3.value;return _this3.onChange('second', value);} }),

          _react2.default.createElement('span', { className: 'txt' }, 'sec')));


    } }]);return Duration;}(_react2.default.PureComponent);Duration.displayName = 'Duration';Duration.propTypes = DurationPropTypes;exports.default =


Duration;module.exports = exports['default'];