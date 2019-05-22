import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React, { PureComponent } from 'react';

import connectForm from './connectForm';
import NestedForm from './NestedForm';
import Form from './Form';
import DateInput from './DateInput';
import { FormFieldAPIPropTypes } from './types';
import { noop } from '../shared/utils';

var propTypes = _extends({}, FormFieldAPIPropTypes);

function isBeforeDay(date, day) {
  return date.getTime() < day.getTime();
}

function isAfterDay(date, day) {
  return date.getTime() > day.getTime();
}

var DateRangeInput = function (_PureComponent) {
  _inherits(DateRangeInput, _PureComponent);

  function DateRangeInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, DateRangeInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.getStartDateStatus = function (_ref) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DateRangeInput.prototype.render = function render() {
    var _props = this.props,
        value = _props.value,
        rest = _objectWithoutProperties(_props, ['value']);

    var startDate = value.startDate,
        endDate = value.endDate;


    return React.createElement(
      'div',
      { className: 'range-container' },
      React.createElement(
        NestedForm,
        _extends({}, rest, { fields: value }),
        React.createElement(
          Form,
          null,
          React.createElement(DateInput, {
            name: 'startDate',
            value: startDate,
            getDateStatus: this.getStartDateStatus,
            onClickDate: this.handleDateClick,
            setDateClass: this.setDateClass
          }),
          React.createElement(
            'span',
            null,
            'To'
          ),
          React.createElement(DateInput, {
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
}(PureComponent);

DateRangeInput.defaultProps = {
  value: {},
  onChange: noop
};


DateRangeInput.displayName = 'DateRangeInput';
DateRangeInput.propTypes = propTypes;

export default connectForm({})(DateRangeInput);