import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Number$isNaN from 'babel-runtime/core-js/number/is-nan';
import React, { Component } from 'react';
import classNames from 'classnames';
import { string, object, instanceOf } from 'prop-types';

import connectForm from './connectForm';
import Dropdown from '../Dropdown';
import { FormFieldAPIPropTypes } from './types';

import './dob.less';

var minYear = 1900;
var maxYear = new Date().getFullYear();

function splitDate(date) {
  var year = void 0;
  var month = void 0;
  var day = void 0;

  if (date && !_Number$isNaN(date.getDate())) {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
  }

  return { year: year, month: month, day: day };
}

function getDropdownDataFromDateSize(from, to) {
  var data = [];
  if (from < to) {
    for (var i = from; i <= to; i += 1) {
      data.push({
        text: '' + i,
        value: '' + i
      });
    }
  } else {
    for (var _i = from; _i >= to; _i -= 1) {
      data.push({
        text: '' + _i,
        value: '' + _i
      });
    }
  }

  return data;
}

function getYears() {
  return getDropdownDataFromDateSize(maxYear, minYear);
}

function getDays() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : maxYear;
  var month = arguments[1];

  if (!month) {
    return getDropdownDataFromDateSize(1, 31);
  }

  return getDropdownDataFromDateSize(1, new Date(year, month + 1, 0).getDate());
}

function filterDate(_ref) {
  var year = _ref.year,
      month = _ref.month,
      day = _ref.day;

  var newDays = getDays(year, month);
  var newDay = day > newDays.length ? newDays.length : day;
  var newDate = new Date(year, month, newDay);
  var newValue = !_Number$isNaN(newDate.getDate()) && newDate || undefined;

  return { newValue: newValue, newDay: newDay, newDays: newDays };
}

function calculateOrder(format) {
  return format.split(/[^YyMmDd]/).map(function (v) {
    return v.split('')[0].toUpperCase();
  }).map(function (v) {
    if (v === 'Y') {
      return 'year';
    } else if (v === 'M') {
      return 'month';
    }
    return 'day';
  });
}

var DoB = function (_Component) {
  _inherits(DoB, _Component);

  function DoB(props) {
    _classCallCheck(this, DoB);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var value = props.value,
        defaultValue = props.defaultValue;

    var initValue = value || defaultValue;
    var values = splitDate(initValue);

    _this.state = {
      value: initValue,
      values: values,
      datum: {
        year: getYears(),
        day: getDays(values.year, values.month)
      }
    };
    return _this;
  }

  DoB.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        l10n = _props.l10n,
        size = _props.size,
        className = _props.className,
        style = _props.style,
        maxHeight = _props.maxHeight;
    var _state = this.state,
        datum = _state.datum,
        values = _state.values;

    var wrapperClassName = classNames('dob', className);

    var _l10n$config$dateTime = l10n.config.dateTimeSymbol,
        MONTHS = _l10n$config$dateTime.MONTHS,
        SHORT_DATE = _l10n$config$dateTime.FORMAT.SHORT_DATE;


    var data = _extends({}, datum, {
      month: MONTHS.map(function (month, key) {
        return { text: month, value: '' + key };
      })
    });

    var order = calculateOrder(SHORT_DATE);

    return React.createElement(
      'div',
      { className: wrapperClassName, style: style },
      order.map(function (v) {
        return React.createElement(Dropdown, {
          maxHeight: maxHeight,
          size: size,
          key: '' + v,
          tabIndex: 0,
          value: '' + values[v],
          onChange: _this2.handleChange('' + v),
          placeholder: l10n.formatMessage('react-aaui.form.dob.' + v),
          data: data[v]
        });
      })
    );
  };

  return DoB;
}(Component);

DoB.propTypes = _extends({
  maxHeight: string,
  size: string,
  className: string,

  style: object, // eslint-disable-line

  value: instanceOf(Date),
  defaultValue: instanceOf(Date)

}, FormFieldAPIPropTypes);
DoB.defaultProps = {
  maxHeight: '320px'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleChange = function (name) {
    return function (_ref2) {
      var _extends2;

      var value = _ref2.value;
      var _props2 = _this3.props,
          _props2$api = _props2.api,
          onValidate = _props2$api.onValidate,
          setValue = _props2$api.setValue,
          onChange = _props2.onChange;


      var newState = _extends({}, _this3.state, {
        values: _extends({}, _this3.state.values, (_extends2 = {}, _extends2[name] = parseInt(value, 10), _extends2))
      });

      var _filterDate = filterDate(newState.values),
          newValue = _filterDate.newValue,
          newDays = _filterDate.newDays,
          newDay = _filterDate.newDay;

      _this3.setState(_extends({}, newState, {
        value: newValue,
        datum: _extends({}, _this3.state.datum, {
          day: newDays
        }),
        values: _extends({}, newState.values, {
          day: newDay
        })
      }));

      onValidate(newValue);
      setValue(newValue);

      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    };
  };
};

export default connectForm()(DoB);