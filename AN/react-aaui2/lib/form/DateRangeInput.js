'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _NestedForm = require('./NestedForm');

var _NestedForm2 = _interopRequireDefault(_NestedForm);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _types = require('./types');

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = (0, _extends3.default)({}, _types.FormFieldAPIPropTypes);

function isBeforeDay(date, day) {
  return date.getTime() < day.getTime();
}

function isAfterDay(date, day) {
  return date.getTime() > day.getTime();
}

var DateRangeInput = function (_PureComponent) {
  (0, _inherits3.default)(DateRangeInput, _PureComponent);

  function DateRangeInput() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DateRangeInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.getStartDateStatus = function (_ref) {
      var date = _ref.date;
      var endDate = _this.props.value.endDate;


      return {
        disabled: endDate && isAfterDay(date, new Date(endDate)) || false
      };
    }, _this.getEndDateStatus = function (_ref2) {
      var date = _ref2.date;
      var startDate = _this.props.value.startDate;


      return {
        disabled: startDate && isBeforeDay(date, new Date(startDate)) || false
      };
    }, _this.setDateClass = function (_ref3) {
      var disabled = _ref3.disabled;
      return disabled ? 'date-picker__disabled' : '';
    }, _this.handleDateClick = function (_ref4) {
      var disabled = _ref4.disabled;
      return !disabled;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  DateRangeInput.prototype.render = function render() {
    var _props = this.props,
        value = _props.value,
        rest = (0, _objectWithoutProperties3.default)(_props, ['value']);
    var startDate = value.startDate,
        endDate = value.endDate;


    return _react2.default.createElement(
      'div',
      { className: 'range-container' },
      _react2.default.createElement(
        _NestedForm2.default,
        (0, _extends3.default)({}, rest, { fields: value }),
        _react2.default.createElement(
          _Form2.default,
          null,
          _react2.default.createElement(_DateInput2.default, {
            name: 'startDate',
            value: startDate,
            getDateStatus: this.getStartDateStatus,
            onClickDate: this.handleDateClick,
            setDateClass: this.setDateClass
          }),
          _react2.default.createElement(
            'span',
            null,
            'To'
          ),
          _react2.default.createElement(_DateInput2.default, {
            name: 'endDate',
            value: endDate,
            getDateStatus: this.getEndDateStatus,
            onClickDate: this.handleDateClick,
            setDateClass: this.setDateClass
          })
        )
      )
    );
  };

  return DateRangeInput;
}(_react.PureComponent);

DateRangeInput.defaultProps = {
  value: {},
  onChange: _utils.noop
};


DateRangeInput.displayName = 'DateRangeInput';
DateRangeInput.propTypes = propTypes;

exports.default = (0, _connectForm2.default)({})(DateRangeInput);
module.exports = exports['default'];