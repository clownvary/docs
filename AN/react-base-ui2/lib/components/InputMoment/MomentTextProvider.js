'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _indexOf = require('lodash/indexOf');var _indexOf2 = _interopRequireDefault(_indexOf);
var _filter = require('lodash/filter');var _filter2 = _interopRequireDefault(_filter);
var _toNumber = require('lodash/toNumber');var _toNumber2 = _interopRequireDefault(_toNumber);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _i18n = require('../../services/i18n');var _i18n2 = _interopRequireDefault(_i18n);
var _utils = require('../../utils');
var _ITextProvider2 = require('../InputBase/ITextProvider');var _ITextProvider3 = _interopRequireDefault(_ITextProvider2);
var _TokenType = require('./consts/TokenType');var TokenType = _interopRequireWildcard(_TokenType);
var _Descriptors = require('./Descriptors');var _Descriptors2 = _interopRequireDefault(_Descriptors);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* eslint no-continue: 0 */
/* eslint default-case: 0 */var

MomentTextProvider = function (_ITextProvider) {(0, _inherits3.default)(MomentTextProvider, _ITextProvider);

  function MomentTextProvider(props) {(0, _classCallCheck3.default)(this, MomentTextProvider);var _this = (0, _possibleConstructorReturn3.default)(this, (MomentTextProvider.__proto__ || (0, _getPrototypeOf2.default)(MomentTextProvider)).call(this,
    props));var _props$value =




    props.value,value = _props$value === undefined ? null : _props$value,_props$format = props.format,format = _props$format === undefined ? 'd' : _props$format;

    _this.value = _utils.momentHelper.createMoment(value);
    _this.format = format;
    _this.descriptors = [];
    _this.descPositions = [];
    _this.fields = [];
    _this.activeFieldIndex = 0;
    _this.maskPartsCount = 0;
    _this.pattern = _i18n2.default.toMomentFormat(format);
    _this.build();return _this;
  }(0, _createClass3.default)(MomentTextProvider, [{ key: 'increment', value: function increment()

    {
      var field = this.getField();
      if (this.isValid() && field) {
        field.inc();
      }
      return true;
    } }, { key: 'decrement', value: function decrement()

    {
      var field = this.getField();
      if (this.isValid() && field) {
        field.dec();
      }
      return true;
    } }, { key: 'isValid', value: function isValid()

    {
      return _utils.momentHelper.isValid(this.value);
    } }, { key: 'setValue', value: function setValue(

    value) {
      this.value = _utils.momentHelper.createMoment(value);
      return true;
    } }, { key: 'getValue', value: function getValue()

    {
      return this.value;
    } }, { key: 'setText', value: function setText(

    text) {
      var val = this.parse(text);
      this.setValue(val);
    } }, { key: 'getText', value: function getText()

    {
      var s = '';

      if (!_utils.momentHelper.isValid(this.value)) {
        return s;
      }

      try {
        var positions = [];
        for (var i = 0; i < this.descriptors.length; i += 1) {
          this.descriptors[i].startIndex = s.length;
          var txt = '' || this.descriptors[i].getText();
          s += txt;
          for (var j = 0; j < txt.length; j += 1) {
            var dp = {};
            dp.desc = this.descriptors[i];
            dp.pos = j;
            dp.text = txt;
            dp.length = txt.length;
            positions.push(dp);
          }
        }
        this.descPositions = positions;
      } catch (e) {
        // do nothing
      }

      return s;
    } }, { key: 'closeBlankField', value: function closeBlankField()

    {
      if (this.blankField) {
        this.blankField.close();
        this.blankField = null;
        return true;
      }

      this.blankField = null;
      return false;
    } }, { key: 'clearField', value: function clearField(

    index) {
      var field = this.getField(index);
      if (field && field.clear()) {
        this.blankField = field;
        return true;
      }

      this.blankField = null;
      return false;
    } }, { key: 'getFieldCount', value: function getFieldCount()

    {
      return this.fields.length;
    } }, { key: 'getField', value: function getField(

    index) {
      if ((0, _isNil2.default)(index)) {
        index = this.activeFieldIndex;
      }

      return this.fields[index];
    } }, { key: 'getActiveFieldRange', value: function getActiveFieldRange()

    {
      return this.getFieldRange();
    } }, { key: 'getFieldRange', value: function getFieldRange(

    index) {
      var desc = this.getField(index);
      return desc ? {
        start: desc.startIndex,
        end: desc.startIndex + (_utils.momentHelper.isValid(this.value) ? desc.getText().length : 0) } :
      null;
    } }, { key: 'getCursorFieldIndex', value: function getCursorFieldIndex(

    pos) {
      pos = Math.min(pos, this.descPositions.length - 1);
      pos = Math.max(pos, 0);
      var desc = this.descPositions[pos].desc;
      if (desc.type === TokenType.LITERAL) {
        var i = (0, _indexOf2.default)(this.descriptors, desc);
        var found = false;
        if (i >= 0) {
          for (var j = i - 1; j >= 0; j -= 1) {
            if (this.descriptors[j].type !== TokenType.LITERAL) {
              desc = this.descriptors[j];
              found = true;
              break;
            }
          }
          if (!found) {
            for (var _j = i + 1; _j < this.descriptors.length; _j += 1) {
              if (this.descriptors[_j].type !== TokenType.LITERAL) {
                desc = this.descriptors[_j];
                found = true;
                break;
              }
            }
          }
        }

        if (!found) {
          return -1;
        }
      }
      return (0, _indexOf2.default)(this.fields, desc);
    } }, { key: 'needToMove', value: function needToMove(

    pos, ch) {
      if (!_utils.momentHelper.isValid(this.value)) {
        return false;
      }

      var desc = this.fields[this.activeFieldIndex];
      if (pos >= desc.maxLen) {return true;}

      var val = (0, _toNumber2.default)(ch);
      if (isNaN(val)) {return false;}

      switch (desc.type) {
        case TokenType.MONTH:
        case TokenType.MONTH_TWO_DIGITS:
        case TokenType.HOUTR_12:
        case TokenType.HOUTR_12_TWO_DIGITS:
          return val > 1;

        case TokenType.HOUTR_24:
        case TokenType.HOUTR_24_TWO_DIGITS:
          return val > 2;

        case TokenType.DATE:
        case TokenType.DATE_TWO_DIGITS:
          return val > 3;

        case TokenType.MINUTE:
        case TokenType.MINUTE_TWO_DIGITS:
        case TokenType.SECOND:
        case TokenType.SECOND_TWO_DIGITS:
          return val > 6;}


      return false;
    } }, { key: 'build', value: function build()

    {var _this2 = this;
      this.descriptors = [];
      var curPattern = '';
      var prevCh = '';
      var literalNext = false;
      var escaped = false;

      var dumpPattern = function dumpPattern() {
        if (curPattern.length > 0) {
          if (!_this2.handlePattern(curPattern)) {
            _this2.descriptors.push(_this2.createDescriptor('literal', prevCh));
          }
          curPattern = '';
        }
      };

      for (var i = 0; i < this.pattern.length; i += 1) {
        var ch = this.pattern.charAt(i);

        if (ch === ']' && literalNext) {
          literalNext = false;
          continue;
        }

        if (escaped || literalNext) {
          this.descriptors.push(this.createDescriptor('literal', ch));
          curPattern = '';
          escaped = false;
          continue;
        }

        if (ch === '\\') {
          escaped = true;
          dumpPattern();
          continue;
        }

        if (ch === '[') {
          literalNext = true;
          dumpPattern();
          continue;
        }

        if (i === 0) {
          prevCh = ch;
        }
        if (prevCh !== ch && curPattern.length > 0) {
          if (!this.handlePattern(curPattern)) {
            this.descriptors.push(this.createDescriptor('literal', prevCh));
          }
          curPattern = '';
        }
        curPattern += ch;
        prevCh = ch;
      }

      dumpPattern();

      this.fields = (0, _filter2.default)(this.descriptors, function (d) {return d.type !== TokenType.LITERAL;});
    } }, { key: 'set', value: function set(

    name, value) {var autoBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      try {
        value = (0, _toNumber2.default)(value);
        if (isNaN(value)) {
          return false;
        }

        if (name === 'month') {
          value -= 1;
        }

        if (!autoBubble) {
          if (name === 'month') {
            if (value > 11 || value < 0) {
              value = 0;
            }
          }

          if (name === 'date') {
            if (value > this.value.daysInMonth() || value < 1) {
              value = 1;
            }
          }

          if (name === 'day') {
            if (value > 6) {
              value = 0;
            }
          }

          if (name === 'hour') {
            if (value > 23) {
              value = 0;
            }
          }

          if (name === 'minute' || name === 'second') {
            if (value > 59) {
              value = 0;
            }
          }
        }

        var newValue = (0, _moment2.default)(this.value);
        newValue.set(name, value);

        if (_utils.momentHelper.isValid(newValue)) {
          this.setValue(newValue);
          return true;
        }
      } catch (e) {
        // do nothing
      }
      return false;
    } }, { key: 'setYear', value: function setYear(

    year) {
      return this.set('year', year, false);
    } }, { key: 'setMonth', value: function setMonth(

    month) {var autoBubble = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.set('month', month, autoBubble);
    } }, { key: 'setDateOfMonth', value: function setDateOfMonth(

    date, autoBubble) {
      return this.set('date', date, autoBubble);
    } }, { key: 'setHours', value: function setHours(

    hour, autoBubble) {
      return this.set('hour', hour, autoBubble);
    } }, { key: 'setMinutes', value: function setMinutes(

    minute, autoBubble) {
      return this.set('minute', minute, autoBubble);
    } }, { key: 'setSeconds', value: function setSeconds(

    second, autoBubble) {
      return this.set('second', second, autoBubble);
    } }, { key: 'setDayOfWeek', value: function setDayOfWeek(

    day, autoBubble) {
      return this.set('day', day, autoBubble);
    } }, { key: 'getYear', value: function getYear()

    {
      try {
        var year = this.value.year();
        year = '' + year;
        while (year.length < 4) {
          year = '0' + year;
        }
        return '' + year;
      } catch (e) {
        // do nothing
      }
      return '';
    } }, { key: 'getMonth', value: function getMonth()

    {
      return this.value.month() + 1;
    } }, { key: 'getDateOfMonth', value: function getDateOfMonth()

    {
      return this.value.date();
    } }, { key: 'getDayOfWeek', value: function getDayOfWeek()

    {
      return this.value.day();
    } }, { key: 'getHours', value: function getHours()

    {
      return this.value.hour();
    } }, { key: 'getMinutes', value: function getMinutes()

    {
      return this.value.minute();
    } }, { key: 'getSeconds', value: function getSeconds()

    {
      return this.value.second();
    } }, { key: 'handlePattern', value: function handlePattern(

    p) {
      var reg = /Y{4}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.YEAR_FOUR_DIGITS));
        return true;
      }
      reg = /Y{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.YEAR_TWO_DIGITS));
        return true;
      }
      reg = /Y{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.YEAR));
        return true;
      }
      reg = /d{4,4}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.DAY_LONG_NAME));
        return true;
      }
      reg = /d{3,3}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.DAY_SHORT_NAME));
        return true;
      }
      reg = /D{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.DATE_TWO_DIGITS));
        return true;
      }
      reg = /D{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.DATE));
        return true;
      }
      reg = /M{4,4}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.MONTH_LONG_NAME));
        return true;
      }
      reg = /M{3,3}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.MONTH_SHORT_NAME));
        return true;
      }
      reg = /M{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.MONTH_TWO_DIGITS));
        return true;
      }
      reg = /M{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.MONTH));
        return true;
      }
      reg = /h{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.HOUTR_12_TWO_DIGITS));
        return true;
      }
      reg = /h{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.HOUTR_12));
        return true;
      }
      reg = /H{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.HOUTR_24_TWO_DIGITS));
        return true;
      }
      reg = /H{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.HOUTR_24));
        return true;
      }
      reg = /m{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.MINUTE_TWO_DIGITS));
        return true;
      }
      reg = /m{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.MINUTE));
        return true;
      }
      reg = /s{2,2}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.SECOND_TWO_DIGITS));
        return true;
      }
      reg = /s{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.SECOND));
        return true;
      }
      reg = /a{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.AMPM));
        return true;
      }
      reg = /A{1,1}/;
      if (reg.test(p)) {
        this.descriptors.push(this.createDescriptor(TokenType.AMPM_UPPER));
        return true;
      }
      return false;
    } }, { key: 'createDescriptor', value: function createDescriptor(

    token, literal) {
      var desc = null;
      var id = this.maskPartsCount;
      this.maskPartsCount += 1;

      var DescriptorClass = _Descriptors2.default[token];
      if (DescriptorClass) {
        desc = new DescriptorClass(this, id);
        if (literal) {
          desc.literal = literal;
        }
      }

      return desc;
    } }, { key: 'parse', value: function parse(


    str) {
      var pattern = this.pattern || _i18n2.default.ANDateTimeFormat;

      var m = null;
      if (pattern.indexOf('MMM') !== -1 || pattern.indexOf('MMMM') !== -1) {
        m = (0, _moment2.default)(str);
        if (m.isValid()) {
          return m;
        }
      }

      var patterns = [];
      var template = [];

      pattern = pattern.replace('DD', 'D');
      pattern = pattern.replace('A', 'a');
      pattern = pattern.replace(/d{2,4}\/*/g, '');

      if (pattern.indexOf('MMM') !== -1 || pattern.indexOf('MMMM') !== -1) {
        template.push(pattern);
        template.push(pattern.replace('MM', 'M'));
      } else {
        template.push(pattern);
      }


      template.forEach(function (p) {
        patterns.push(p);

        var patchSep = function patchSep(pt) {
          var sep = '/';
          if (pt.indexOf(sep) !== -1) {
            patterns.push(pt.replace(new RegExp(sep, 'g'), '-'));
            patterns.push(pt.replace(new RegExp(sep, 'g'), '.'));
          }
        };

        patchSep(p);
        if (p.indexOf('YYYY') !== -1) {
          p = p.replace('YYYY', 'YY');
          patterns.push(p);
          patchSep(p);
        }
      });

      m = (0, _moment2.default)(str, patterns);

      if (!m.isValid()) {
        m = _i18n2.default.getToday();
      }

      return m;
    } }, { key: 'removeLiterals', value: function removeLiterals(

    s) {
      var reg = /[\s|+|\-|.|:|()=]/g;
      return s.replace(reg, '');
    } }, { key: 'getFirstDelimiterPos', value: function getFirstDelimiterPos(

    a, b) {
      var i = 0;
      var j = 0;
      while (i < b.length && j < a.length) {
        var ch1 = b.charAt(i);
        var ch2 = a.charAt(j);
        if (ch1 === ch2) {
          j += 1;
        } else {
          return j - 1;
        }
        i += 1;
      }
      return a.length - 1;
    } }, { key: 'findAlikeArrayItemIndex', value: function findAlikeArrayItemIndex(

    arr, txt) {
      var index = -1;
      var pos = 99999;
      for (var i = 0; i < arr.length; i += 1) {
        var k = arr[i].toLowerCase().indexOf(txt.toLowerCase());
        if (k !== -1 && k < pos) {
          pos = k;
          index = i;
        }
      }
      return index;
    } }, { key: 'isFieldGap', value: function isFieldGap(

    input) {
      if (this.activeFieldIndex < this.descriptors.length) {
        var desc = this.descriptors[this.activeFieldIndex];
        return desc.type === TokenType.LITERAL && input === desc.literal;
      }

      return false;
    } }, { key: 'setActiveField', value: function setActiveField(

    index) {
      index = Math.min(index, this.getFieldCount() - 1);
      index = Math.max(index, 0);
      if (this.activeFieldIndex !== index) {
        this.activeFieldIndex = index;
        return true;
      }
      return false;
    } }]);return MomentTextProvider;}(_ITextProvider3.default);exports.default =


MomentTextProvider;module.exports = exports['default'];