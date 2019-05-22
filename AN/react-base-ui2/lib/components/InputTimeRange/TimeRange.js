'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.TimeRangeProps = exports.TimeRange = undefined;var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _propTypes = require('prop-types');
var _InputTime = require('../InputTime');
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * Default PropTypes of TimeRange.
                                                                                                                                     */
var TimeRangePropTypes = {
  /**
                            * The format pattern to display the time.
                            */
  format: _propTypes.string,
  /**
                              * Step in time unit when generating the time picker list.
                              */
  step: _propTypes.number,
  /**
                            * Which type of time unit to increase or decrease by hour or minute or second.
                            */
  unit: _propTypes.string };


/** Default Props for TimeRange */
var TimeRangeProps = {
  format: 'h:mm',
  step: 30,
  unit: 'minute' };


/** UI component that displays TimeRange with variant settings.*/var
TimeRange = function (_React$PureComponent) {(0, _inherits3.default)(TimeRange, _React$PureComponent);




  function TimeRange(props) {(0, _classCallCheck3.default)(this, TimeRange);var _this = (0, _possibleConstructorReturn3.default)(this, (TimeRange.__proto__ || (0, _getPrototypeOf2.default)(TimeRange)).call(this,
    props));var
    range = _this.props.range;var
    start = range.start,end = range.end;

    _this.state = { start: start, end: end };return _this;
  }(0, _createClass3.default)(TimeRange, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var _nextProps$range =
      nextProps.range,start = _nextProps$range.start,end = _nextProps$range.end;

      this.setState({ start: start, end: end });
    } }, { key: 'onStartChange', value: function onStartChange(

    e) {var _props =
      this.props,format = _props.format,unit = _props.unit,step = _props.step;
      var text = e.value.format(format);
      var value = (0, _moment2.default)(text, format);

      this.setState({
        start: value,
        end: e.value.add(step, unit) });

    } }, { key: 'onEndChange', value: function onEndChange(

    e) {var _this2 = this;var _state =
      this.state,start = _state.start,end = _state.end;var
      unit = this.props.unit;

      var diff = e.value.diff(start, unit);
      var isSame = start.isSame(e.value, unit);

      if (!isSame) {
        /* istanbul ignore else */
        if (diff > 0) {
          this.setState({ end: e.value });
        } else if (diff < 0) {
          this.setState({ end: e.value }, function () {
            _this2.setState({ end: end });
          });
        }
      } else {
        this.setState({ end: e.value }, function () {
          _this2.setState({ end: end });
        });
      }
    } }, { key: 'getContainerClassName', value: function getContainerClassName()

    {
      return _consts.DefaultCSSPrefix + '-time-range';
    } }, { key: 'cancelEdit', value: function cancelEdit()

    {var _props$range =
      this.props.range,start = _props$range.start,end = _props$range.end;var
      onCancel = this.props.onCancel;

      this.setState({
        start: start,
        end: end },
      function () {
        onCancel();
      });
    } }, { key: 'checkEdit', value: function checkEdit()

    {var _state2 =
      this.state,start = _state2.start,end = _state2.end;
      this.props.onCheck(start, end);
    } }, { key: 'render', value: function render()

    {var _this3 = this;var _props2 =
      this.props,format = _props2.format,step = _props2.step;var _state3 =
      this.state,start = _state3.start,end = _state3.end;

      return (
        _react2.default.createElement('div', { className: this.getContainerClassName() },
          _react2.default.createElement('div', null,
            _react2.default.createElement(_InputTime.InputTime, {
              value: start,
              format: format,
              'aria-label': 'start time',
              timeStep: step,
              onValueChange: function onValueChange(e) {
                _this3.onStartChange(e, e.value);
              } })),


          _react2.default.createElement('div', { className: 'an-time-range-gap' }, '-'),
          _react2.default.createElement('div', null,
            _react2.default.createElement(_InputTime.InputTime, {
              value: end,
              format: format,
              'aria-label': 'end time',
              timeStep: step,
              onValueChange: function onValueChange(e) {_this3.onEndChange(e);} })),


          _react2.default.createElement('i', {
            className: 'icon icon-check-thin',
            'aria-label': 'confirm editting icon',
            onClick: function onClick() {return _this3.checkEdit();} }),

          _react2.default.createElement('i', {
            className: 'icon icon-close-thin',
            'aria-label': 'canel editting icon',
            onClick: function onClick() {return _this3.cancelEdit();} })));



    } }]);return TimeRange;}(_react2.default.PureComponent);TimeRange.displayName = 'TimeRange';TimeRange.defaultProps = TimeRangeProps;TimeRange.propTypes = TimeRangePropTypes;exports.



TimeRange = TimeRange;exports.
TimeRangeProps = TimeRangeProps;exports.default =


TimeRange;