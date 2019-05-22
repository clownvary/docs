'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _i18n = require('../../services/i18n');
var _charValidator = require('../../utils/charValidator');var charValidator = _interopRequireWildcard(_charValidator);
var _InputResult = require('../InputBase/InputResult');var _InputResult2 = _interopRequireDefault(_InputResult);
var _ITextProvider2 = require('../InputBase/ITextProvider');var _ITextProvider3 = _interopRequireDefault(_ITextProvider2);
var _NumericType = require('../../consts/NumericType');var NumericType = _interopRequireWildcard(_NumericType);
var _NumericHelper = require('../../utils/NumericHelper');var _NumericHelper2 = _interopRequireDefault(_NumericHelper);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var MAX_LENGTH = 10;var

NumericTextProvider = function (_ITextProvider) {(0, _inherits3.default)(NumericTextProvider, _ITextProvider);
  function NumericTextProvider(props) {(0, _classCallCheck3.default)(this, NumericTextProvider);var _this = (0, _possibleConstructorReturn3.default)(this, (NumericTextProvider.__proto__ || (0, _getPrototypeOf2.default)(NumericTextProvider)).call(this,
    props));var _props$type =







    props.type,type = _props$type === undefined ? NumericType.DECIMAL : _props$type,_props$showGroup = props.showGroup,showGroup = _props$showGroup === undefined ? true : _props$showGroup,_props$decimals = props.decimals,decimals = _props$decimals === undefined ? 2 : _props$decimals,min = props.min,max = props.max;

    _this.type = type;
    _this.showGroup = showGroup;
    _this.decimals = decimals;
    _this.min = min * 1;
    _this.max = max * 1;

    _this.valueInString = '';
    _this.currentText = '';return _this;
  }(0, _createClass3.default)(NumericTextProvider, [{ key: 'updateRange', value: function updateRange(

    min, max) {
      this.min = min * 1;
      this.max = max * 1;
    } }, { key: 'updateCultureContext', value: function updateCultureContext()

    {
      this.cultureContext = _i18n.Globalize.getNumericCultureContext(this.type);

      // consider decimal definition in culture
      // <=-2:  culture decimals
      // -1:    as it is
      // >=0:   custom
      if (this.decimals >= -1) {
        this.cultureContext.decimals = this.decimals;
      }

      if (!this.showGroup) {
        this.cultureContext.groupSizes = [0];
      }
    } }, { key: 'getCultureContext', value: function getCultureContext()

    {
      if (!this.cultureContext) {
        this.updateCultureContext();
      }

      return this.cultureContext;
    } }, { key: 'isValid', value: function isValid()

    {
      return (0, _isString2.default)(this.valueInString) && this.valueInString;
    } }, { key: 'isNegative', value: function isNegative()

    {
      return _NumericHelper2.default.isNegative(this.valueInString);
    } }, { key: 'isZero', value: function isZero(

    value) {
      try {
        value = (0, _isNil2.default)(value) ? this.valueInString : value;
        return this.safeParse(value) === 0;
      } catch (e) {
        // do nothing
      }
      return false;
    } }, { key: 'getDecimalPos', value: function getDecimalPos()

    {
      var cc = this.getCultureContext();
      return _NumericHelper2.default.getDecimalPos(this.currentText, cc);
    } }, { key: 'invertSign', value: function invertSign()

    {
      var neg = this.isNegative();
      var textValue = this.valueInString || '0';
      textValue = neg ? textValue.replace(/[-()]/g, '') : '-' + textValue;

      if (this.isZero(textValue)) {
        textValue = neg ? '0' : '-0';
      }
      return this.format(textValue * 1);
    } }, { key: 'toPositive', value: function toPositive()

    {
      if (this.isNegative() || this.isBlank) {
        this.invertSign();
        return true;
      }

      return false;
    } }, { key: 'stepTo', value: function stepTo(

    step) {
      try {
        var value = this.getValue();
        var newValue = value + step;

        var decimals = this.getCultureContext().decimals;
        decimals = decimals < 0 ? 8 : decimals;
        newValue = newValue.toFixed(decimals);
        return this.format(newValue * 1, true);
      } catch (e) {
        // do nothing
      }

      return false;
    } }, { key: 'increment', value: function increment()

    {var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.stepTo(step);
    } }, { key: 'decrement', value: function decrement()

    {var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.stepTo(step * -1);
    } }, { key: 'insertAt', value: function insertAt(

    input, position) {var rh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _InputResult2.default();
      var cc = this.getCultureContext();
      if (input.length > 1) {
        input = _NumericHelper2.default.stripSymbols(input, cc);
      }

      position = this.getInputablePos(position);
      var text = this.currentText;
      var isBlank = this.isBlank;
      /* istanbul ignore next */
      var slicePos = position > text.length ? text.length - 1 : position;
      var head = text.substring(0, slicePos);

      if (!isBlank) {
        // Can't insert at the end with fixed decimals
        if (cc.decimals > 0 && text === head) {
          return false;
        }

        var decimalPos = this.getDecimalPos();
        var textInteger = _NumericHelper2.default.stripSymbols(text.substring(0, decimalPos));
        if (position <= decimalPos && textInteger.length >= MAX_LENGTH) {
          return false;
        }
      }

      rh.testPosition = head.length + input.length;
      if (head.indexOf(cc.decimalSep) === -1 && this.isZero(head)) {
        head = head.replace(/[0]/g, '');
        rh.testPosition = head.length + input.length;
      }
      var tail = text.substring(slicePos, text.length);
      var nextText = head + input + tail;
      this.parse(nextText);

      // reset cursor to decimal
      if (isBlank && !this.isBlank) {
        rh.testPosition = this.getDecimalPos();
      }

      try {
        if (input.length === 1) {
          if (this.showGroup) {
            head += input;
            var newHead = this.currentText.substring(0, rh.testPosition);

            var r = new RegExp('' + cc.groupSep, 'gi');
            var l1 = (head.match(r) || []).length;
            var l2 = (newHead.match(r) || []).length;

            if (l1 !== l2) {
              rh.testPosition += 1;
            }
          }
        }
      } catch (e) {
        // do nothing
      }

      return true;
    } }, { key: 'remove', value: function remove(

    start, end, rh) {
      var replacing = !rh;
      rh = rh || new _InputResult2.default();
      var cc = this.getCultureContext();
      rh.testPosition = start;
      try {
        if (start === end && start === this.getDecimalPos()) {
          return false;
        }

        var text = this.currentText;
        var head = text.slice(0, start);
        var tail = text.slice(end + 1);
        var nextText = head + tail;
        this.parse(replacing ? nextText || '0' : nextText);

        var n = _NumericHelper2.default.stripSymbols(nextText, cc);
        if (n === '' || n.indexOf('.') === 0) {
          if (replacing) {
            // force next inputing starting before decimal point
            this.isBlank = true;
          } else {
            rh.testPosition = this.getDecimalPos();
          }
        }

        if (replacing && this.isZero(nextText)) {
          // force next inputing starting before decimal point
          this.isBlank = true;
        }

        if (start === end && this.showGroup) {
          try {
            var groupSep = cc.groupSep;
            var newBegText = this.currentText.substring(0, start);
            if (this.countSeperator(newBegText, groupSep) !==
            this.countSeperator(nextText, groupSep)) {
              rh.testPosition -= 1;
              if (text.indexOf(cc.currencySymbol) === rh.testPosition ||
              text.indexOf(cc.percentSymbol) === rh.testPosition) {
                rh.testPosition += 1;
              }
            }
          } catch (e1) {
            // do nothing
          }
        }
      } catch (e2) {
        // do nothing
      }
      return true;
    } }, { key: 'getValue', value: function getValue()

    {
      if (this.isBlank) {
        return null;
      }
      return this.valueInString ? this.valueInString * 1 : null;
    } }, { key: 'setValue', value: function setValue(

    value) {
      return this.format(value);
    } }, { key: 'getText', value: function getText()

    {
      var text = this.isBlank ? '' : this.currentText;
      return this.isValid() ? text : '';
    } }, { key: 'setText', value: function setText(

    text) {
      this.parse(text);
    } }, { key: 'safeParse', value: function safeParse(

    value) {
      if (value === null) {return 0;}

      var cc = this.getCultureContext();
      value = _NumericHelper2.default.stripSymbols(value, cc);

      try {
        value = parseFloat(value);
        if (isNaN(value)) {
          value = 0;
        }
      } catch (e) {
        value = 0;
      }

      return value;
    } }, { key: 'countSeperator', value: function countSeperator(

    text, sep) {
      var c = 0;
      var pos = text.indexOf(sep);
      while (pos !== -1) {
        c += 1;
        pos = text.indexOf(sep, pos + 1);
      }
      return c;
    } }, { key: 'getInputablePos', value: function getInputablePos(

    position) {
      var text = this.currentText;
      position = Math.min(position, text.length);

      if (this.isBlank) {
        return this.getDecimalPos();
      }

      var cc = this.getCultureContext();
      while (position < text.length) {
        var ch = text.charAt(position);
        if (!charValidator.isDigit(ch) &&
        ch !== cc.groupSep &&
        ch !== cc.decimalSep) {
          position += 1;
        } else {
          break;
        }
      }

      return position;
    }

    // parse string value
  }, { key: 'parse', value: function parse(value) {
      var txtValue = '' + value;
      try {
        if (txtValue.trim().length === 0) {
          this.format(0);
          return true;
        }

        var parsedValue = _i18n.Globalize.parseNumeric(txtValue, this.type);
        return this.format(parsedValue);
      } catch (e) {
        // do nothing
      }

      return false;
    }

    // Parameter value is a Number
  }, { key: 'internalFormat', value: function internalFormat(value) {
      if ((0, _isNil2.default)(value)) return { value: '0', text: '' };

      var cc = this.getCultureContext();
      var txtValue = _NumericHelper2.default.toFixedString(value, cc.decimals, false);
      var text = _i18n.Globalize.formatNumeric(value, this.type, false, cc);

      return { value: txtValue, text: text };
    }

    // Format a value
  }, { key: 'format', value: function format(value) {var checkRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var updateOnly = false;
      if ((0, _isNil2.default)(value)) {
        value = this.valueInString ? this.valueInString * 1 : 0;
        updateOnly = true;
      }

      if (checkRange) {
        if (value < this.min || value > this.max) {
          return false;
        }
      }var _internalFormat =

      this.internalFormat(value),valueInString = _internalFormat.value,text = _internalFormat.text;
      this.valueInString = valueInString;
      this.currentText = text;

      if (!updateOnly) {
        this.isBlank = false;
      }

      return true;
    } }]);return NumericTextProvider;}(_ITextProvider3.default);exports.default =


NumericTextProvider;module.exports = exports['default'];