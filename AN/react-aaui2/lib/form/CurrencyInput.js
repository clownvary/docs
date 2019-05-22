'use strict';

exports.__esModule = true;

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

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _utils = require('../shared/utils');

var _types = require('./types');

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNumber = function isNumber(keyCode) {
  return keyCode >= _keyCodes2.default.NUMBER0 && keyCode <= _keyCodes2.default.NUMBER9 || keyCode >= _keyCodes2.default.NUMBERPAD0 && keyCode <= _keyCodes2.default.NUMBERPAD9;
};

var isDash = function isDash(keyCode) {
  return keyCode === _keyCodes2.default.DASH || keyCode === _keyCodes2.default.SUBTRACT;
};

var isDecimalPoint = function isDecimalPoint(keyCode) {
  return keyCode === _keyCodes2.default.PERIOD || keyCode === _keyCodes2.default.DECIMAL_POINT;
};

var getCaret = function getCaret(element) {
  /* istanbul ignore else */
  if (element.selectionStart) {
    return element.selectionStart;
  } else if (document.selection) {
    // IE-specific
    element.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }

    var re = element.createTextRange();
    var rc = re.duplicate();

    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);
    return rc.text.length;
  }

  return 0;
};

var CurrencyInput = function (_PureComponent) {
  (0, _inherits3.default)(CurrencyInput, _PureComponent);

  function CurrencyInput(props) {
    (0, _classCallCheck3.default)(this, CurrencyInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _this.handleBlur = function (e) {
      var _this$props = _this.props,
          _this$props$api = _this$props.api,
          setValue = _this$props$api.setValue,
          onValidate = _this$props$api.onValidate,
          onBlur = _this$props.onBlur;

      var value = parseFloat(e.target.value);

      setValue(value);
      onValidate(value);
      onBlur(e);
    };

    _this.handleChange = function (e) {
      _this.setState({
        value: e.target.value
      });

      _this.props.onChange(e);
    };

    _this.handleKeyDown = function (e) {
      var _this$props2 = _this.props,
          l10n = _this$props2.l10n,
          code = _this$props2.code;
      var integerOnly = l10n.config.currenciesConfig[code].formatConfig.integerOnly;
      var keyCode = e.keyCode,
          target = e.target,
          value = e.target.value;

      // Numerical inputs plus decimal and minus.

      if (isNumber(keyCode) || isDecimalPoint(keyCode) || isDash(keyCode)) {
        // Disallow decimal point when `integerOnly`
        if (integerOnly && isDecimalPoint(keyCode)) {
          e.preventDefault();

          return;
        }

        if (isDecimalPoint(keyCode)) {
          // Disallows a period before a negative
          if (getCaret(target) === 0 && value.indexOf('-') === 0) {
            e.preventDefault();

            return;
          }
          // Disallows more than one decimal point
          if (value.match(/\./)) {
            e.preventDefault();
          }
        } else if (isDash(keyCode)) {
          // Disallows a dash in any other places in addition to the first character
          // negative number
          if (value.indexOf('-') === 0) {
            e.preventDefault();

            return;
          }

          // positive number
          if (getCaret(target) !== 0) {
            e.preventDefault();
          }
        } else if (value.indexOf('-') === 0 && getCaret(target) === 0) {
          // Disallows numbers before a negative.
          e.preventDefault();
        }
      }
    };

    _this.state = {
      value: 'value' in props ? props.value : props.defaultValue
    };
    return _this;
  }

  CurrencyInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  CurrencyInput.prototype.render = function render() {
    var _props = this.props,
        code = _props.code,
        rest = (0, _objectWithoutProperties3.default)(_props, ['code']);


    return _react2.default.createElement(_Input2.default, (0, _extends3.default)({
      type: 'text',
      postText: code
    }, (0, _utils.omit)(rest, ['api', 'rules', 'l10n', 'value']), {
      value: this.state.value,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown
    }));
  };

  return CurrencyInput;
}(_react.PureComponent);

CurrencyInput.displayName = 'CurrencyInput';
CurrencyInput.propTypes = (0, _extends3.default)({}, _types.FormFieldAPIPropTypes);
CurrencyInput.defaultProps = {
  defaultValue: '',
  code: 'USD',
  onChange: _utils.noop,
  onBlur: _utils.noop
};


var formatter = function formatter(value, _ref) {
  var l10n = _ref.l10n,
      _ref$code = _ref.code,
      code = _ref$code === undefined ? 'USD' : _ref$code;

  var formattedValue = '';
  var integerOnly = l10n.config.currenciesConfig[code].formatConfig.integerOnly;


  if (value && !isNaN(value)) {
    var parseValue = parseFloat(value);

    formattedValue = integerOnly ? parseValue.toFixed() : parseValue.toFixed(2);
  }

  return formattedValue;
};

exports.default = (0, _connectForm2.default)({
  formatter: formatter
})(CurrencyInput);
module.exports = exports['default'];