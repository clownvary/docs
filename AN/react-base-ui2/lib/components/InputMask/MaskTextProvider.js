'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _i18n = require('../../services/i18n');
var _CharType = require('./consts/CharType');var CharType = _interopRequireWildcard(_CharType);
var _charValidator = require('../../utils/charValidator');var charValidator = _interopRequireWildcard(_charValidator);
var _CharDescriptor = require('./CharDescriptor');var _CharDescriptor2 = _interopRequireDefault(_CharDescriptor);
var _InputResult = require('../InputBase/InputResult');var _InputResult2 = _interopRequireDefault(_InputResult);
var _ITextProvider2 = require('../InputBase/ITextProvider');var _ITextProvider3 = _interopRequireDefault(_ITextProvider2);
var _Hint = require('../InputBase/consts/Hint');var Hint = _interopRequireWildcard(_Hint);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* eslint no-continue: 0 */
/* eslint default-case: 0 */
/* eslint no-bitwise: 0 */
/* eslint no-throw-literal: 0 */var

MaskedTextProvider = function (_ITextProvider) {(0, _inherits3.default)(MaskedTextProvider, _ITextProvider);

  function MaskedTextProvider(props) {(0, _classCallCheck3.default)(this, MaskedTextProvider);var _this = (0, _possibleConstructorReturn3.default)(this, (MaskedTextProvider.__proto__ || (0, _getPrototypeOf2.default)(MaskedTextProvider)).call(this,
    props));var _props$mask =








    props.mask,mask = _props$mask === undefined ? '' : _props$mask,_props$promptChar = props.promptChar,promptChar = _props$promptChar === undefined ? '_' : _props$promptChar,_props$passwordChar = props.passwordChar,passwordChar = _props$passwordChar === undefined ? '*' : _props$passwordChar,_props$allowPromptAsI = props.allowPromptAsInput,allowPromptAsInput = _props$allowPromptAsI === undefined ? false : _props$allowPromptAsI,_props$asciiOnly = props.asciiOnly,asciiOnly = _props$asciiOnly === undefined ? false : _props$asciiOnly,_props$currency = props.currency,currency = _props$currency === undefined ? 'USD' : _props$currency;

    _this.mask = mask;
    _this.promptChar = promptChar;
    _this.passwordChar = passwordChar;
    _this.allowPromptAsInput = allowPromptAsInput;
    _this.asciiOnly = asciiOnly;
    _this.descriptors = [];
    _this.noMask = !_this.mask || _this.mask.length <= 0;
    _this.testString = '';
    _this.assignedCharCount = 0;
    _this.setCurrency(currency);
    _this.build();return _this;
  }(0, _createClass3.default)(MaskedTextProvider, [{ key: 'setCurrency', value: function setCurrency()

    {var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
      this.currency = currency;
      /* istanbul ignore next */
      this.currencySymbol = _i18n.Globalize.getCurrencySymbol(this.currency) || '$';
    } }, { key: 'insertAt', value: function insertAt(

    input, pos, rh) {
      if (input === undefined) {throw 'InsertAt: input';}

      rh = rh || new _InputResult2.default();
      if (input.length === 0) {
        rh.hint = Hint.NO_EFFECT;
        rh.testPosition = pos;
        return true;
      }

      if (pos < 0 || pos >= this.testString.length) {
        rh.hint = Hint.POSITION_OUT_OF_RANGE;
        rh.testPosition = pos;
        return false;
      }

      if (this.noMask) {
        this.testString = this.testString.substring(0, pos) +
        input + this.testString.substring(pos, this.testString.length);

        rh.hint = Hint.SUCCESS;
        rh.testPosition = pos + input.length - 1;
        return true;
      }

      return this.internalInsertAt(input, pos, rh, false);
    } }, { key: 'remove', value: function remove(

    start, end, rh) {
      end = end || start;
      rh = rh || new _InputResult2.default();

      if (end >= this.testString.length) {
        rh.testPosition = end;
        rh.hint = Hint.POSITION_OUT_OF_RANGE;
        return false;
      }

      if (start >= 0 && start <= end) {
        return this.internalRemoveAt(start, end, rh, false);
      }

      rh.testPosition = start;
      rh.hint = Hint.POSITION_OUT_OF_RANGE;
      return false;
    } }, { key: 'increment', value: function increment()

    {
      return !this.noMask;
    } }, { key: 'decrement', value: function decrement()

    {
      return !this.noMask;
    } }, { key: 'setValue', value: function setValue()

    {
      return false;
    } }, { key: 'getValue', value: function getValue()

    {
      return null;
    } }, { key: 'setText', value: function setText(

    text) {
      var rh = new _InputResult2.default();
      if (!text || !text.length) {
        this.clear(rh);
        return true;
      }
      if (this.noMask) {
        this.testString = text;
        return true;
      }
      if (!this.testSetString(text, 0, rh)) {
        return false;
      }
      var n = this.findAssignedEditPositionFrom(1, true);
      if (n !== -1) {
        this.resetString(n, this.testString.length - 1);
      }
      return true;
    } }, { key: 'getText', value: function getText()








    {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { includePrompt: false, includeLiterals: false, passwordMode: false };var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.testString.length;
      start = Math.max(0, start);
      if (start >= this.testString.length) return '';
      len = Math.max(0, len);
      len = Math.min(this.testString.length - start, len);
      if (len === 0) return '';
      var end = start + len;

      var s = '';
      if (this.noMask) {
        if (options.passwordMode) {
          for (var i = 0; i < this.testString.length; i += 1) {
            s += this.passwordChar;
          }
          return s.substring(start, end);
        }
        return this.testString.substring(start, end);
      }

      if (
      !options.passwordMode &&
      options.includePrompt &&
      options.includeLiterals)
      {
        return this.testString.substring(start, end);
      }

      for (var _i = start; _i < end; _i += 1) {
        var ch = this.testString.charAt(_i);
        var cd = this.descriptors[_i];
        switch (cd.charType) {
          case CharType.OPTIONAL:
          case CharType.REQUIRED:
            if (!cd.isAssigned) {
              break;
            }
            s += options.passwordMode ? this.passwordChar : ch;
            continue;
          case CharType.REQUIRED | CharType.OPTIONAL:
            s += ch;
            continue;
          case CharType.SEPARATOR:
          case CharType.LITERAL:
            if (options.includeLiterals) {
              s += ch;
            }
            continue;
          default:
            s += ch;
            continue;}

        /* istanbul ignore if */
        if (options.includePrompt) {
          s += ch;
          continue;
        }
        s += ' ';
        continue;
      }

      return s;
    } }, { key: 'build', value: function build()

    {
      if (this.noMask) {return;}

      this.testString = '';
      this.assignedCharCount = 0;
      this.descriptors = [];
      var caseType = '';
      var escape = false;
      var charType = CharType.LITERAL;
      var fieldText = '';
      var culture = _i18n.Globalize.culture;

      for (var i = 0; i < this.mask.length; i += 1) {
        var needDesc = false;
        var ch = this.mask.charAt(i);
        var m = ch;
        if (escape) {
          escape = false;
          needDesc = true;
        }
        if (!needDesc) {
          switch (m) {
            case '#':
            case '?':
            case 'a':
            case '9':
            case 'l':
              fieldText = this.promptChar;
              charType = CharType.OPTIONAL;
              needDesc = true;
              break;
            case 'A':
            case '0':
            case 'L':
              fieldText = this.promptChar;
              charType = CharType.REQUIRED;
              needDesc = true;
              break;
            case '$':
              fieldText = this.currencySymbol;
              charType = CharType.SEPARATOR;
              needDesc = true;
              break;
            case ',':
              fieldText = culture.numberFormat[','];
              charType = CharType.SEPARATOR;
              needDesc = true;
              break;
            case '.':
              fieldText = culture.numberFormat['.'];
              charType = CharType.SEPARATOR;
              needDesc = true;
              break;
            case '/':
              fieldText = culture.calendars.standard['/'];
              charType = CharType.SEPARATOR;
              needDesc = true;
              break;
            case ':':
              fieldText = culture.calendars.standard[':'];
              charType = CharType.SEPARATOR;
              needDesc = true;
              break;
            case '<':
              caseType = 'lower';
              continue;
            case '>':
              caseType = 'upper';
              continue;
            case '|':
              caseType = '';
              continue;
            case '\\':
              escape = true;
              charType = CharType.LITERAL;
              continue;
            default:
              fieldText = ch;
              charType = CharType.LITERAL;
              needDesc = true;
              break;}

        }
        /* istanbul ignore else */
        if (needDesc) {
          var cd = new _CharDescriptor2.default(i, charType);
          if (this.isEditDesc(cd)) {
            cd.caseType = caseType;
          }
          for (var j = 0; j < fieldText.length; j += 1) {
            var c = fieldText.charAt(j);
            this.testString = this.testString + c;
            this.descriptors.push(cd);
          }
        }
      }
    } }, { key: 'setPromptChar', value: function setPromptChar(

    promptChar) {var _this2 = this;
      if (this.noMask) {return;}

      promptChar = promptChar || ' ';
      this.promptChar = promptChar;
      this.descriptors.forEach(function (cd, i) {
        if (
        (cd.charType === CharType.OPTIONAL ||
        cd.charType === CharType.REQUIRED) &&
        !cd.isAssigned)
        {
          _this2.testString = charValidator.setChar(_this2.testString, promptChar, i);
        }
      });
    } }, { key: 'isEditDesc', value: function isEditDesc(

    desc) {
      if (this.noMask || !desc) {return true;}
      return desc.charType === CharType.REQUIRED || desc.charType === CharType.OPTIONAL;
    } }, { key: 'isEditPos', value: function isEditPos(

    pos) {
      if (this.noMask) {return true;}
      if (pos < 0 || pos >= this.testString.length) {return false;}

      var cd = this.descriptors[pos];
      return this.isEditDesc(cd);
    } }, { key: 'isLiteralDesc', value: function isLiteralDesc(

    desc) {
      if (!desc) {return false;}
      return desc.charType === CharType.LITERAL || desc.charType === CharType.SEPARATOR;
    } }, { key: 'isLiteralChar', value: function isLiteralChar(

    input, pos, desc) {
      pos = Math.max(0, pos);
      desc = desc || this.descriptors[pos];
      if (this.isLiteralDesc(desc)) {
        return input === this.testString.charAt(pos);
      }
      return false;
    } }, { key: 'updatePromptChar', value: function updatePromptChar()

    {
      if (this.noMask) {return;}

      var i = void 0;
      for (i = 0; i < this.descriptors.length; i += 1) {
        var cd = this.descriptors[i];
        if (cd.charType === CharType.OPTIONAL || cd.charType === CharType.REQUIRED) {
          if (!cd.isAssigned) {
            this.testString = charValidator.setChar(this.testString, this.promptChar, i);
          }
        }
      }
    } }, { key: 'resetChar', value: function resetChar(

    pos) {
      var cd = this.descriptors[pos];
      if (this.isEditPos(pos) && cd.isAssigned) {
        cd.isAssigned = false;
        this.testString = charValidator.setChar(this.testString, this.promptChar, pos);
        this.assignedCharCount -= 1;
      }
    } }, { key: 'getAdjustedPos', value: function getAdjustedPos(

    pos) {
      if (this.noMask) {
        if (pos >= this.testString.length) {
          pos = this.testString.length - 1;
        }
      } else if (pos >= this.descriptors.length) {
        pos -= 1;
      }

      return Math.max(0, pos);
    } }, { key: 'findEditPositionFrom', value: function findEditPositionFrom(

    pos) {var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var start = direction ? pos : 0;
      var end = direction ? this.testString.length - 1 : pos;
      return this.findEditPosition(start, end, direction);
    } }, { key: 'findEditPosition', value: function findEditPosition(

    start, end, direction) {
      return this.findPosition(start, end, direction, CharType.REQUIRED | CharType.OPTIONAL);
    } }, { key: 'findPosition', value: function findPosition(

    start, end, direction, charType) {var assignedOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      start = Math.max(0, start);
      end = Math.min(end, this.testString.length - 1);

      while (start <= end) {
        var pos = direction ? start : end;
        var cd = this.descriptors[pos];
        if (!assignedOnly || assignedOnly && cd.isAssigned) {
          if ((cd.charType & charType) === cd.charType) {
            return pos;
          }
        }

        if (direction) {
          start += 1;
        } else {
          end -= 1;
        }
      }

      return -1;
    } }, { key: 'findAssignedEditPositionFrom', value: function findAssignedEditPositionFrom(

    pos, direction) {
      var start = direction ? pos : 0;
      var end = direction ? this.testString.length - 1 : pos;
      return this.findAssignedEditPosition(start, end, direction);
    } }, { key: 'findAssignedEditPosition', value: function findAssignedEditPosition(

    start, end, direction) {
      if (this.assignedCharCount === 0) {return -1;}

      return this.findPosition(start, end, direction, CharType.REQUIRED | CharType.OPTIONAL, true);
    } }, { key: 'setChar', value: function setChar(

    input, pos, desc) {
      pos = pos < 0 ? 0 : pos;
      if (!desc) {
        desc = this.descriptors[pos];
      }
      if (this.isLiteralChar(input, pos, desc)) {
        this.resetChar(pos);
      } else {
        if (charValidator.isLetter(input)) {
          if (charValidator.isUpper(input)) {
            if (desc.caseType === 'lower') {
              input = input.toLowerCase();
            }
          } else if (desc.caseType === 'upper') {
            input = input.toUpperCase();
          }
        }
        this.testString = charValidator.setChar(this.testString, input, pos);
        if (!desc.isAssigned) {
          desc.isAssigned = true;
          this.assignedCharCount += 1;
        }
      }
    } }, { key: 'internalInsertAt', value: function internalInsertAt(

    input, pos, rh, testOnly) {
      if (!this._testString(input, pos, rh)) {
        return false;
      }

      if (!testOnly) {
        var nextPos = this.setString(input, rh.testPosition);
        rh.testPosition = this.findEditPositionFrom(nextPos);
      }
      return true;
    } }, { key: 'clear', value: function clear(

    rh) {
      if (this.noMask) {
        this.testString = '';
        rh.hint = Hint.SUCCESS;
        return;
      }

      if (this.assignedCharCount === 0) {
        rh.hint = Hint.NO_EFFECT;
      } else {
        rh.hint = Hint.SUCCESS;
        for (var i = 0; i < this.testString.length; i += 1) {
          this.resetChar(i);
        }
      }
    } }, { key: 'testInputChar', value: function testInputChar(

    c, pos, rh) {
      if (!charValidator.isPrintableChar(c)) {
        rh.hint = Hint.INVALID_INPUT;
        return false;
      }
      var cd = this.descriptors[pos];
      if (!cd) {return false;}

      if (this.isLiteralDesc(cd)) {
        if (c === this.testString.charAt(pos)) {
          rh.hint = Hint.ESCAPED;
          return true;
        }
        rh.hint = Hint.NONE_EDITABLE;
        return false;
      }

      if (c === this.promptChar && !this.allowPromptAsInput) {
        rh.hint = Hint.PROMPT_NOT_ALLOWED;
        return false;
      }

      switch (this.mask.charAt(cd.maskPosition)) {
        case 'L':
          if (this.asciiOnly && !charValidator.isAsciiLetter(c)) {
            rh.hint = Hint.ASCII_EXPECTED;
            return false;
          }

          if (!charValidator.isLetter(c)) {
            rh.hint = Hint.LETTER_EXPECTED;
            return false;
          }
          break;

        case 'a':
          if (this.asciiOnly && !charValidator.isAciiAlphanumeric(c)) {
            rh.hint = Hint.ASCII_EXPECTED;
            return false;
          }

          if (!charValidator.isAlphanumeric(c) && c !== ' ') {
            rh.hint = Hint.ALPHA_NUMERIC_EXPECTED;
            return false;
          }

          break;

        case 'A':
          if (!charValidator.isAlphanumeric(c)) {
            rh.hint = Hint.ALPHA_NUMERIC_EXPECTED;
            return false;
          }
          /* istanbul ignore else */
          if (charValidator.isAciiAlphanumeric(c) || !this.asciiOnly) {
            break;
          }
          rh.hint = Hint.ASCII_EXPECTED;
          return false;

        case '?':
          if (!charValidator.isLetter(c) && c !== ' ') {
            rh.hint = Hint.LETTER_EXPECTED;
            return false;
          }
          if (!this.asciiOnly || charValidator.isAsciiLetter(c)) {
            break;
          }
          rh.hint = Hint.ASCII_EXPECTED;
          return false;

        case '#':
          if (!charValidator.isDigit(c) && c !== '-' && c !== '+' && c !== ' ') {
            rh.hint = Hint.DIGIT_EXPECTED;
            return false;
          }
          break;

        case '0':
          if (!charValidator.isDigit(c)) {
            rh.hint = Hint.DIGIT_EXPECTED;
            return false;
          }
          break;

        case '9':
          if (!charValidator.isDigit(c) && c !== ' ') {
            rh.hint = Hint.DIGIT_EXPECTED;
            return false;
          }
          break;}

      if (c === this.testString.charAt(pos) && cd.isAssigned) {
        rh.hint = Hint.NO_EFFECT;
      } else {
        rh.hint = Hint.SUCCESS;
      }
      return true;
    } }, { key: '_testString', value: function _testString(

    input, pos, rh) {
      rh.hint = Hint.UNKNOWN;
      rh.testPosition = pos;
      if (input && input.length) {
        for (var i = 0; i < input.length; i += 1) {
          var ch = input.charAt(i);
          if (pos >= this.testString.length) {
            rh.hint = Hint.POSITON_EXCEEDED;
            return i !== 0;
          }

          if (!this.isLiteralChar(ch, pos)) {
            pos = this.findEditPositionFrom(pos, true);
            if (pos === -1) {
              rh.testPosition = this.testString.length;
              rh.hint = Hint.POSITON_EXCEEDED;
              return false;
            }
          }

          if (!this.testInputChar(ch, pos, rh)) {
            return false;
          }

          if (pos === this.testString.length) {
            break;
          }
          pos += 1;
        }
      }
      return true;
    } }, { key: 'resetString', value: function resetString(

    start, end) {
      if (this.noMask) {
        this.testString = '';
        return;
      }
      start = this.findAssignedEditPositionFrom(start, true);
      if (start !== -1) {
        end = this.findAssignedEditPositionFrom(end, false);
        while (start <= end) {
          start = this.findAssignedEditPositionFrom(start, true);
          this.resetChar(start);
          start += 1;
        }
      }
    } }, { key: 'setString', value: function setString(

    input, pos) {
      for (var i = 0; i < input.length; i += 1) {
        var ch = input.charAt(i);
        if (!this.isLiteralChar(ch, pos)) {
          pos = this.findEditPositionFrom(pos, true);
        }

        if (pos < 0 || pos >= this.testString.length) {return this.testString.length;}
        this.setChar(ch, pos);
        pos += 1;
      }

      return pos;
    } }, { key: 'testSetString', value: function testSetString(

    input, pos, rh) {
      if (input.length > this.testString.length) {
        input = input.substring(0, this.testString.length);
      }

      if (this._testString(input, pos, rh)) {
        this.setString(input, pos);
        return true;
      }
      return false;
    } }, { key: 'internalRemoveAt', value: function internalRemoveAt(

    start, end, rh) {
      if (this.noMask) {
        try {
          this.testString = this.testString.substring(0, start) +
          this.testString.substring(end + 1, this.testString.length);
          rh.testPosition = start;
        } catch (e) {
          // do nothing
        }
        return true;
      }

      var exist = this.findAssignedEditPosition(start, end, true) !== -1;
      if (!exist) {
        rh.hint = Hint.NO_EFFECT;
        rh.testPosition = start;
        return true;
      }

      rh.testPosition = start;
      rh.hint = Hint.SUCCESS;

      if (start <= end) {
        this.resetString(start, end);
      }
      return true;
    } }]);return MaskedTextProvider;}(_ITextProvider3.default);exports.default =


MaskedTextProvider;module.exports = exports['default'];