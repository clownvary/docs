'use strict';

exports.__esModule = true;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _Dropdown = require('../Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _types = require('./types');

require('./dob.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minYear = 1900;
var maxYear = new Date().getFullYear();

function splitDate(date) {
  var year = void 0;
  var month = void 0;
  var day = void 0;

  if (date && !(0, _isNan2.default)(date.getDate())) {
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
  var newValue = !(0, _isNan2.default)(newDate.getDate()) && newDate || undefined;

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
  (0, _inherits3.default)(DoB, _Component);

  function DoB(props) {
    (0, _classCallCheck3.default)(this, DoB);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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

    var wrapperClassName = (0, _classnames2.default)('dob', className);

    var _l10n$config$dateTime = l10n.config.dateTimeSymbol,
        MONTHS = _l10n$config$dateTime.MONTHS,
        SHORT_DATE = _l10n$config$dateTime.FORMAT.SHORT_DATE;


    var data = (0, _extends4.default)({}, datum, {
      month: MONTHS.map(function (month, key) {
        return { text: month, value: '' + key };
      })
    });

    var order = calculateOrder(SHORT_DATE);

    return _react2.default.createElement(
      'div',
      { className: wrapperClassName, style: style },
      order.map(function (v) {
        return _react2.default.createElement(_Dropdown2.default, {
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
}(_react.Component);

DoB.propTypes = (0, _extends4.default)({
  maxHeight: _propTypes.string,
  size: _propTypes.string,
  className: _propTypes.string,

  style: _propTypes.object, // eslint-disable-line

  value: (0, _propTypes.instanceOf)(Date),
  defaultValue: (0, _propTypes.instanceOf)(Date)

}, _types.FormFieldAPIPropTypes);
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


      var newState = (0, _extends4.default)({}, _this3.state, {
        values: (0, _extends4.default)({}, _this3.state.values, (_extends2 = {}, _extends2[name] = parseInt(value, 10), _extends2))
      });

      var _filterDate = filterDate(newState.values),
          newValue = _filterDate.newValue,
          newDays = _filterDate.newDays,
          newDay = _filterDate.newDay;

      _this3.setState((0, _extends4.default)({}, newState, {
        value: newValue,
        datum: (0, _extends4.default)({}, _this3.state.datum, {
          day: newDays
        }),
        values: (0, _extends4.default)({}, newState.values, {
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

exports.default = (0, _connectForm2.default)()(DoB);
module.exports = exports['default'];