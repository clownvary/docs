'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.InputTimeRangeProps = exports.InputTimeRange = undefined;var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _templateObject = (0, _taggedTemplateLiteral3.default)(['an-input-time-range-text-area ', ' '], ['an-input-time-range-text-area ', ' ']),_templateObject2 = (0, _taggedTemplateLiteral3.default)(['icon icon-edit ', ' '], ['icon icon-edit ', ' ']),_templateObject3 = (0, _taggedTemplateLiteral3.default)(['an-input-time-range-edit-area ', ' '], ['an-input-time-range-edit-area ', ' ']);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _TimeRange = require('./TimeRange');
var _Dropdown = require('../Dropdown');
var _consts = require('../../consts');
var _utils = require('../../utils');
var _MomentRange = require('../../common/MomentRange');var _MomentRange2 = _interopRequireDefault(_MomentRange);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                               * Default PropTypes of InputTimeRange.
                                                                                                                                                                                                               */
var InputTimeRangePropTypes = {
  /**
                                 * The format pattern to display the time.
                                 */
  format: _propTypes.string,
  /**
                              * Step in time unit when generating the time picker list.
                              */
  step: _propTypes.number,
  /**
                            * Whether or not to edit time.
                            */
  disabled: _propTypes.bool,
  /**
                              * Determines the current selected timeRange
                              */
  value: (0, _propTypes.instanceOf)(_MomentRange2.default),
  /**
                                                             * Whether or not to show text tip.
                                                             */
  showTextTip: _propTypes.bool,
  /**
                                 * Determines the time range dropdowm list.
                                 */
  items: _propTypes.array };


/** Default Props for InputTimeRange */
var InputTimeRangeProps = {
  format: 'h:mm',
  step: 60,
  disabled: false,
  showTextTip: true,
  items: [],
  value: null };


/** UI component that displays InputTimeRange with variant settings.*/var
InputTimeRange = function (_React$PureComponent) {(0, _inherits3.default)(InputTimeRange, _React$PureComponent);




  function InputTimeRange(props) {(0, _classCallCheck3.default)(this, InputTimeRange);var _this = (0, _possibleConstructorReturn3.default)(this, (InputTimeRange.__proto__ || (0, _getPrototypeOf2.default)(InputTimeRange)).call(this,
    props));var _this$props =
    _this.props,format = _this$props.format,value = _this$props.value;
    var range = value || new _MomentRange2.default({
      start: (0, _moment2.default)(new Date(), format),
      end: (0, _moment2.default)(new Date(), format) });var

    start = range.start,end = range.end;
    _this.state = {
      range: range,
      startText: start ? start.format(format) : '',
      endText: end ? end.format(format) : '',
      showEditArea: false,
      start: start,
      end: end,
      value: null };return _this;

  }(0, _createClass3.default)(InputTimeRange, [{ key: 'onCancel', value: function onCancel()

    {
      this.setState({ showEditArea: false });
    } }, { key: 'onCheck', value: function onCheck(

    start, end) {var _props =
      this.props,format = _props.format,onValueChange = _props.onValueChange;
      var timeRange = new _MomentRange2.default({ start: start, end: end });

      this.setState(
      {
        showEditArea: false,
        startText: start.format(format),
        endText: end.format(format),
        range: timeRange,
        value: null },
      function () {
        onValueChange(timeRange);
      });
    } }, { key: 'onChange', value: function onChange(

    value) {var _props2 =
      this.props,format = _props2.format,onValueChange = _props2.onValueChange;
      var timeRange = new _MomentRange2.default({
        start: (0, _moment2.default)(value.start, format),
        end: (0, _moment2.default)(value.end, format) });


      this.setState({
        value: value,
        range: timeRange },
      function () {
        onValueChange(timeRange);
      });
    } }, { key: 'getContainerClassName', value: function getContainerClassName()

    {
      return _consts.DefaultCSSPrefix + '-input-time-range';
    } }, { key: 'showEditArea', value: function showEditArea()

    {
      !this.props.disabled && this.setState({ showEditArea: true });
    } }, { key: 'render', value: function render()


    {var _this2 = this;var _props3 =
      this.props,format = _props3.format,disabled = _props3.disabled,items = _props3.items,step = _props3.step,showTextTip = _props3.showTextTip;var _state =
      this.state,startText = _state.startText,endText = _state.endText,showEditArea = _state.showEditArea,range = _state.range;
      var text = startText ? startText + ' to ' + endText : '';

      return (
        _react2.default.createElement('div', { className: this.getContainerClassName() },
          _react2.default.createElement('div', { className: (0, _utils.cls)(_templateObject, showEditArea ? 'u-hidden' : '') },
            _react2.default.createElement(_Dropdown.Dropdown, {
              data: items,
              text: text,
              disabled: disabled,
              value: this.state.value,
              showTextTip: showTextTip,
              onChange: function onChange(_ref) {var value = _ref.value;return _this2.onChange(value);} }),

            _react2.default.createElement('i', {
              className: (0, _utils.cls)(_templateObject2, disabled ? 'icon-edit-disabled' : ''),
              'aria-label': 'edit time',
              'aria-disabled': disabled,
              onClick: function onClick() {return _this2.showEditArea();} })),


          _react2.default.createElement('div', { className: (0, _utils.cls)(_templateObject3, showEditArea ? '' : 'u-hidden') },
            _react2.default.createElement(_TimeRange.TimeRange, {
              format: format,
              range: range,
              step: step,
              onCheck: function onCheck(start, end) {_this2.onCheck(start, end);},
              onCancel: function onCancel() {_this2.onCancel();} }))));




    } }]);return InputTimeRange;}(_react2.default.PureComponent);InputTimeRange.displayName = 'InputTimeRange';InputTimeRange.defaultProps = InputTimeRangeProps;InputTimeRange.propTypes = InputTimeRangePropTypes;exports.



InputTimeRange = InputTimeRange;exports.
InputTimeRangeProps = InputTimeRangeProps;exports.default =


InputTimeRange;