'use strict';

exports.__esModule = true;
exports.validator = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _DatePicker = require('../DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _utils = require('../shared/utils');

var _validation = require('./validation');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  (0, _inherits3.default)(DateInput, _PureComponent);

  function DateInput() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DateInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleBlur = function (e) {
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
        rest = (0, _objectWithoutProperties3.default)(_props2, ['l10n', 'placeholder', 'value']);
    var _l10n$config$dateTime = l10n.config.dateTimeSymbol,
        SHORT_DATE = _l10n$config$dateTime.FORMAT.SHORT_DATE,
        monthNames = _l10n$config$dateTime.MONTHS,
        weekdayNames = _l10n$config$dateTime.WEEKDAYS,
        shortWeekdayNames = _l10n$config$dateTime.SHORTWEEKDAYS;


    return _react2.default.createElement(_DatePicker2.default, (0, _extends3.default)({
      placeholder: placeholder || SHORT_DATE,
      value: parse(value, l10n)
    }, (0, _utils.omit)(rest, ['api', 'rules']), {
      formatDate: this.formatDate,
      monthNames: monthNames,
      weekdayNames: weekdayNames,
      shortWeekdayNames: shortWeekdayNames,
      onBlur: this.handleBlur,
      onChange: this.handleChange
    }));
  };

  return DateInput;
}(_react.PureComponent);

DateInput.displayName = 'DateInput';
DateInput.propTypes = (0, _extends3.default)({}, _types.FormFieldAPIPropTypes, { placeholder: _propTypes.string });
DateInput.defaultProps = {
  onChange: _utils.noop,
  onBlur: _utils.noop
};
var validator = exports.validator = function validator(_ref2) {
  var l10n = _ref2.l10n;
  return function (validationResult) {
    var name = validationResult.name,
        value = validationResult.value;
    var dateReg = l10n.config.dateTimeSymbol.VALIDATION_REGEX.DATE;


    if (value && !dateReg.test(value)) {
      return new _validation.ValidationResult(name, value, l10n.invalid);
    }

    return validationResult;
  };
};

exports.default = (0, _connectForm2.default)({ validator: validator, parser: parser })(DateInput);