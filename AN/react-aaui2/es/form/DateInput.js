import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string } from 'prop-types';

import connectForm from './connectForm';
import DatePicker from '../DatePicker';
import { noop, omit } from '../shared/utils';
import { ValidationResult } from './validation';

import { FormFieldAPIPropTypes } from './types';

var format = function format(value, l10n) {
  var dateFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'yyyy-MM-dd';
  return value ? l10n.formatDateTime(value, dateFormat) : '';
};
var parse = function parse(value, l10n) {
  return typeof value === 'string' ? l10n.parseDateTime(value) : value;
};
var parser = function parser(value, _ref) {
  var l10n = _ref.l10n;
  return format(parse(value, l10n), l10n, 'SHORT_DATE');
};

var DateInput = function (_PureComponent) {
  _inherits(DateInput, _PureComponent);

  function DateInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleBlur = function (e) {
      var _this$props = _this.props,
          onValidate = _this$props.api.onValidate,
          onBlur = _this$props.onBlur;


      if (typeof onValidate === 'function') {
        onValidate(e.target.value);
      }

      onBlur(e);
    }, _this.handleChange = function (value) {
      _this.setValue(value);
      _this.props.onChange(format(value, _this.props.l10n));
    }, _this.formatDate = function (value) {
      return format(value, _this.props.l10n, 'SHORT_DATE');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DateInput.prototype.setValue = function setValue(value) {
    var _props = this.props,
        setValue = _props.api.setValue,
        l10n = _props.l10n;

    var isoFormatDate = format(value, l10n);

    if (typeof setValue === 'function') {
      setValue(isoFormatDate);
    }
  };

  DateInput.prototype.render = function render() {
    var _props2 = this.props,
        l10n = _props2.l10n,
        placeholder = _props2.placeholder,
        value = _props2.value,
        rest = _objectWithoutProperties(_props2, ['l10n', 'placeholder', 'value']);

    var _l10n$config$dateTime = l10n.config.dateTimeSymbol,
        SHORT_DATE = _l10n$config$dateTime.FORMAT.SHORT_DATE,
        monthNames = _l10n$config$dateTime.MONTHS,
        weekdayNames = _l10n$config$dateTime.WEEKDAYS,
        shortWeekdayNames = _l10n$config$dateTime.SHORTWEEKDAYS;


    return React.createElement(DatePicker, _extends({
      placeholder: placeholder || SHORT_DATE,
      value: parse(value, l10n)
    }, omit(rest, ['api', 'rules']), {
      formatDate: this.formatDate,
      monthNames: monthNames,
      weekdayNames: weekdayNames,
      shortWeekdayNames: shortWeekdayNames,
      onBlur: this.handleBlur,
      onChange: this.handleChange
    }));
  };

  return DateInput;
}(PureComponent);

DateInput.displayName = 'DateInput';
DateInput.propTypes = _extends({}, FormFieldAPIPropTypes, { placeholder: string });
DateInput.defaultProps = {
  onChange: noop,
  onBlur: noop
};


export var validator = function validator(_ref2) {
  var l10n = _ref2.l10n;
  return function (validationResult) {
    var name = validationResult.name,
        value = validationResult.value;
    var dateReg = l10n.config.dateTimeSymbol.VALIDATION_REGEX.DATE;


    if (value && !dateReg.test(value)) {
      return new ValidationResult(name, value, l10n.invalid);
    }

    return validationResult;
  };
};

export default connectForm({ validator: validator, parser: parser })(DateInput);