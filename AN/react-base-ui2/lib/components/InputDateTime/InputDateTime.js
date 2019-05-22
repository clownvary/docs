'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.defaultProps = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _utils = require('../../utils');
var _InputDate = require('../InputDate');var _InputDate2 = _interopRequireDefault(_InputDate);
var _InputTime = require('../InputTime');var _InputTime2 = _interopRequireDefault(_InputTime);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

func = _propTypes2.default.func,string = _propTypes2.default.string,number = _propTypes2.default.number,object = _propTypes2.default.object,oneOfType = _propTypes2.default.oneOfType;

var defaultProps = exports.defaultProps = {
  /**
                                             * Determines the default date value for a date input.
                                             */
  value: null,
  dateFormat: 'dddd, MMM DD, YYYY',
  timeFormat: 'HH:mm A',
  timeStep: 30,
  /**
                * The onValueChange event handler.
                * A function called when the value of the input is changed.
                */
  onValueChange: _identity2.default };


/**
                                        * InputDateTime Component
                                        * @class
                                        */var
InputDateTime = function (_React$PureComponent) {(0, _inherits3.default)(InputDateTime, _React$PureComponent);












  function InputDateTime(props) {(0, _classCallCheck3.default)(this, InputDateTime);var _this = (0, _possibleConstructorReturn3.default)(this, (InputDateTime.__proto__ || (0, _getPrototypeOf2.default)(InputDateTime)).call(this,
    props));var
    value = _this.props.value;
    _this.state = {
      value: (0, _moment2.default)(value) };return _this;

  }(0, _createClass3.default)(InputDateTime, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var

      prevValue =
      this.props.value;var


      nextValue =
      nextProps.value;

      if (!_utils.momentHelper.isSame(nextValue, prevValue)) {
        this.setState({
          value: nextValue });

      }
    } }, { key: 'handleValueChange', value: function handleValueChange(

    e) {var isDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var
      nextValue = e.value;var
      value = this.state.value;

      var dateValue = isDate ? nextValue : value;
      var timeValue = isDate ? value : nextValue;

      var dateStr = dateValue.format('YYYY-MM-DD');
      var timeStr = timeValue.format('HH:mm:ss');
      var newValue = (0, _moment2.default)(dateStr + ' ' + timeStr, 'YYYY-MM-DD HH:mm:ss');
      this.setState({
        value: newValue });var


      onValueChange = this.props.onValueChange;
      if ((0, _isFunction2.default)(onValueChange)) {
        onValueChange({
          value: newValue });

      }
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =







      this.props,style = _props.style,_props$className = _props.className,className = _props$className === undefined ? '' : _props$className,dateFormat = _props.dateFormat,timeFormat = _props.timeFormat,timeStep = _props.timeStep,rest = (0, _objectWithoutProperties3.default)(_props, ['style', 'className', 'dateFormat', 'timeFormat', 'timeStep']);var
      value = this.state.value;

      return (
        _react2.default.createElement('div', {
            className: 'an-input-datetime ' + className,
            style: style,
            ref: function ref(elem) {_this2.inputDateTime = elem;},
            'data-qa-id': this.props['data-qa-id'] },

          _react2.default.createElement(_InputDate2.default, (0, _extends3.default)({},
          rest, {
            value: value,
            format: dateFormat,
            className: 'an-input-datetime__date',
            onValueChange: function onValueChange(e) {return _this2.handleValueChange(e, true);},
            allowBlank: false,
            showTrigger2: false })),

          _react2.default.createElement(_InputTime2.default, {
            value: value,
            format: timeFormat,
            timeStep: timeStep,
            className: 'an-input-datetime__time',
            onValueChange: function onValueChange(e) {return _this2.handleValueChange(e, false);},
            allowBlank: false })));



    } }]);return InputDateTime;}(_react2.default.PureComponent);InputDateTime.displayName = 'InputDateTime';InputDateTime.defaultProps = defaultProps;InputDateTime.propTypes = { value: oneOfType([string, number, object]), className: string, dateFormat: string, timeFormat: string, timeStep: number, onValueChange: func };exports.default = InputDateTime;