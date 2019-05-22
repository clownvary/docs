import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';

import connectForm from './connectForm';
import Input from '../Input';
import { omit, noop } from '../shared/utils';
import { FormFieldAPIPropTypes } from './types';
import KEY_CODES from '../shared/keyCodes';

var isNumber = function isNumber(keyCode) {
  return keyCode >= KEY_CODES.NUMBER0 && keyCode <= KEY_CODES.NUMBER9 || keyCode >= KEY_CODES.NUMBERPAD0 && keyCode <= KEY_CODES.NUMBERPAD9;
};

var isDash = function isDash(keyCode) {
  return keyCode === KEY_CODES.DASH || keyCode === KEY_CODES.SUBTRACT;
};

var isDecimalPoint = function isDecimalPoint(keyCode) {
  return keyCode === KEY_CODES.PERIOD || keyCode === KEY_CODES.DECIMAL_POINT;
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
  _inherits(CurrencyInput, _PureComponent);

  function CurrencyInput(props) {
    _classCallCheck(this, CurrencyInput);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

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
        rest = _objectWithoutProperties(_props, ['code']);

    return React.createElement(Input, _extends({
      type: 'text',
      postText: code
    }, omit(rest, ['api', 'rules', 'l10n', 'value']), {
      value: this.state.value,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown
    }));
  };

  return CurrencyInput;
}(PureComponent);

CurrencyInput.displayName = 'CurrencyInput';
CurrencyInput.propTypes = _extends({}, FormFieldAPIPropTypes);
CurrencyInput.defaultProps = {
  defaultValue: '',
  code: 'USD',
  onChange: noop,
  onBlur: noop
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

export default connectForm({
  formatter: formatter
})(CurrencyInput);