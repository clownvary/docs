'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _get = require('lodash/get');var _get2 = _interopRequireDefault(_get);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isNaN = require('lodash/isNaN');var _isNaN2 = _interopRequireDefault(_isNaN);
var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _intlMessageformat = require('intl-messageformat');var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isInteger = require('lodash/isInteger');var _isInteger2 = _interopRequireDefault(_isInteger);
var _utils = require('../../utils');
var _NumericType = require('../../consts/NumericType');var NumericType = _interopRequireWildcard(_NumericType);
var _en = require('./cultures/en');var _en2 = _interopRequireDefault(_en);
var _CurrencyCode = require('./consts/CurrencyCode');var CurrencyCode = _interopRequireWildcard(_CurrencyCode);
var _Currencies = require('./Currencies');var _Currencies2 = _interopRequireDefault(_Currencies);
var _NumericHelper = require('../../utils/NumericHelper');var _NumericHelper2 = _interopRequireDefault(_NumericHelper);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* eslint default-case: 0 */

var currencyCodeMap = {
  fr: CurrencyCode.EUR,
  zh: CurrencyCode.CNY };


/**
                           * @module Globalize
                           * @description Globalize is a singletone service that provide
                           * current culture information and globalization capability.
                           *
                           * To use Globalize, import it from react-base-ui
                           * @example
                           * import { Globalize } from 'react-base-ui/lib/i18'
                           *
                           * console.log(Globalize.intl)
                           *
                           * Globalize depends on CLDR data to get culture information. So, corresponding CLDR data
                           * need to be added to application.
                           *
                           * We will use hookLocaleData to intercept the CLDR data for later use. Something like this:
                           *
                           * import { hookLocaleData } from 'react-base-ui/lib/i18'
                           *
                           * const runApp = () => {
                           * ReactDOM.render(<App />, document.getElementById('root'));
                           * };
                           *
                           *
                           * require.ensure([
                           * 'intl',
                           * 'intl/locale-data/jsonp/en.js',
                           * 'intl/locale-data/jsonp/fr.js',
                           * 'intl/locale-data/jsonp/zh.js'
                           * ], (require) => {
                           * if (!global.Intl) {
                           *   require('intl');
                           *  }
                           *
                           * hookLocaleData();
                           * require('intl/locale-data/jsonp/en.js');
                           * require('intl/locale-data/jsonp/fr.js');
                           * require('intl/locale-data/jsonp/zh.js');
                           * runApp();
                           *});
                           */var

Globalize = function () {

  function Globalize() {var _this = this;(0, _classCallCheck3.default)(this, Globalize);this.





































































































































































































    getCurrencySymbol = function (code) {
      code = code || _this.cCode;
      return _Currencies2.default[code] ? _Currencies2.default[code].symbol : '$';
    };this.

    addCldr = function (data) {
      var locale = data.locale;
      if (locale) {
        _this.cldrs[locale] = _this.cldrs[locale] || data;
      }
    };this.







    getCldr = function (locale) {return _this.find(locale, _this.cldrs);};this.

    find = function (locale, hash) {
      locale = locale && locale.toLowerCase();
      var localeParts = (locale || '').split('-');

      while (localeParts.length > 0) {
        var l = hash[localeParts.join('-')];
        if (l) {
          return l;
        }

        localeParts.pop();
      }

      return null;
    };this.

    getRelativeData = function (locale) {return _this.find(locale, _intlMessageformat2.default.__localeData__);};this.







    getCulture = function (locale) {return _this.find(locale, _this.cultures);};this.currentIntl = null;this.cldrs = {};this.cultures = {};this.currentCulture = _en2.default;this.cCode = CurrencyCode.USD;this.currentANDateFormat = 'DD MMM YYYY';this.currentANTimeFormat = 'h:mm A';this.updateCultureContext(); /**
                                                                                                                                                                                                                                                                                                                       * @description Gets the current React-Intl instance
                                                                                                                                                                                                                                                                                                                       * @name intl
                                                                                                                                                                                                                                                                                                                       * @memberof Globalize
                                                                                                                                                                                                                                                                                                                       */(0, _defineProperties2.default)(this, { intl: { get: function get() {return this.currentIntl;}, set: function set(v) {this.currentIntl = v;this.onIntlChange();} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @description Gets current locale
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @name locale
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */(0, _defineProperties2.default)(this, { locale: { get: function get() {return this.currentIntl ? this.currentIntl.locale : 'en';} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @description Gets current culture information
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @name culture
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */(0, _defineProperties2.default)(this, { culture: { get: function get() {return this.currentCulture;} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @description Gets or sets the currency code
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @name currencyCode
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */(0, _defineProperties2.default)(this, { currencyCode: { get: function get() {return this.cCode;}, set: function set(v) {this.cCode = v;} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @description Gets or sets the AN Date Format
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @name ANDateFormat
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */(0, _defineProperties2.default)(this, { ANDateFormat: { get: function get() {return this.currentANDateFormat;}, set: function set(v) {this.currentANDateFormat = v;} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @description Gets or sets the AN Time Format
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @name ANTimeFormat
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */(0, _defineProperties2.default)(this, { ANTimeFormat: { get: function get() {return this.currentANTimeFormat;}, set: function set(v) {this.currentANTimeFormat = v;} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @description Gets the date time format
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @name ANDateTimeFormat
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */(0, _defineProperties2.default)(this, { ANDateTimeFormat: { get: function get() {return this.currentANDateFormat + ' ' + this.currentANTimeFormat;} } }); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @description Gets or sets the AN Time Zone Offset (hours)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @name ANTimeZoneOffset
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @memberof Globalize
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */(0, _defineProperties2.default)(this, { ANTimeZoneOffset: { get: function get() {return this.currentANTimeZoneOffset;}, set: function set(v) {this.currentANTimeZoneOffset = v;} } });}(0, _createClass3.default)(Globalize, [{ key: 'toMomentFormat', value: function toMomentFormat() {var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'd';var calendar = this.culture.calendars.standard;var format = calendar.patterns.d;if (f.length === 1) {switch (f) {case 'd': // ShortDatePattern
            format = this.ANDateFormat || calendar.patterns.d;break;case 'D': // LongDatePattern
            format = calendar.patterns.D;break;case 'f': // Full date and time (long date and short time)
            format = this.ANDateFormat && this.ANTimeFormat ? this.ANDateFormat + ' ' + this.ANTimeFormat : calendar.patterns.D + ' ' + calendar.patterns.t;break;case 'F': // Full date and time (long date and long time)
            format = calendar.patterns.D + ' ' + calendar.patterns.T;break;case 'g': // General (short date and short time)
            format = calendar.patterns.d + ' ' + calendar.patterns.t;break;case 'G': // General (short date and long time)
            format = calendar.patterns.d + ' ' + calendar.patterns.T;break;case 'm': // MonthDayPattern
            format = calendar.patterns.M;break;case 'M': // monthDayPattern
            format = calendar.patterns.M;break;case 's': // SortableDateTimePattern
            format = calendar.patterns.S;break;case 't': // shortTimePattern
            format = this.ANTimeFormat || this.patterns.t;break;case 'T': // LongTimePattern
            format = calendar.patterns.T;break;case 'u': // UniversalSortableDateTimePattern
            format = calendar.patterns.S;break;case 'U': // Full date and time (long date and long time) using universal time
            format = calendar.patterns.D + ' ' + calendar.patterns.T;break;case 'y': // YearMonthPattern
            format = calendar.patterns.Y;break;case 'Y': // yearMonthPattern
            format = calendar.patterns.Y;break;}} else {format = f;}return format;} /**
                                                                                     * Gets currency symbol by currency code
                                                                                     * @method
                                                                                     * @param code Currency code
                                                                                     * @memberof Globalize
                                                                                     */ /**
                                                                                         * Gets CLDR data by locale.
                                                                                         * @method
                                                                                         * @param locale The locale name.
                                                                                         * @memberof Globalize
                                                                                         */ /**
                                                                                             * Gets culture information by locale.
                                                                                             * @method
                                                                                             * @param locale The locale name.
                                                                                             * @memberof Globalize
                                                                                             */ }, { key: 'composeCulture', value: function composeCulture(locale) {var cldr = this.getCldr(locale);var name = (0, _get2.default)(cldr, 'locale', 'en');var plusSign = (0, _get2.default)(cldr, 'number.symbols.latn.plusSign', '+');var minusSign = (0, _get2.default)(cldr, 'number.symbols.latn.minusSign', '-');var decimal = (0, _get2.default)(cldr, 'number.symbols.latn.decimal', '.');var group = (0, _get2.default)(cldr, 'number.symbols.latn.group', ',');var percentSign = (0, _get2.default)(cldr, 'number.symbols.latn.percentSign', '%');var currencySymbol = this.getCurrencySymbol(currencyCodeMap[name]);var replaceNumberPattern = function replaceNumberPattern(pattern) {return pattern.replace('{plusSign}', plusSign).replace('{minusSign}', minusSign).replace('{percentSign}', percentSign).replace('{currency}', '$').replace('{number}', 'n');};var getNumberPattern = function getNumberPattern(patterName, defaultNegativePattern, defaultPositivePattern) {return [replaceNumberPattern((0, _get2.default)(cldr, 'number.patterns.' + patterName + '.negativePattern', defaultNegativePattern)), replaceNumberPattern((0, _get2.default)(cldr, 'number.patterns.' + patterName + '.positivePattern', defaultPositivePattern))];};var names = ['gregory', 'chinese', 'japanese', 'buddhist'];var calendar = null;names.forEach(function (n) {calendar = (0, _get2.default)(cldr, 'date.calendars.' + n);return !calendar;}); // istanbul ignore else
      if (!calendar) {calendar = { months: { narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], long: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'] },


          days: {
            narrow: [
            'S',
            'M',
            'T',
            'W',
            'T',
            'F',
            'S'],

            short: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'],

            long: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'] },


          eras: {
            narrow: [
            'B',
            'A',
            'BCE',
            'CE'],

            short: [
            'BC',
            'AD',
            'BCE',
            'CE'],

            long: [
            'Before Christ',
            'Anno Domini',
            'Before Common Era',
            'Common Era'] },


          dayPeriods: {
            am: 'AM',
            pm: 'PM' } };


      }

      var am = (0, _get2.default)(calendar, 'dayPeriods.am', 'AM');
      var pm = (0, _get2.default)(calendar, 'dayPeriods.pm', 'PM');

      var getCalendarProps = function getCalendarProps(prop) {return (0, _get2.default)(calendar, prop);};

      var numberFormat = {
        '.': decimal,
        ',': group,
        '+': plusSign,
        '-': minusSign,
        '%': percentSign,
        decimals: 2,
        groupSizes: [3],
        pattern: getNumberPattern('decimal', '{minusSign}{number}', '{number}') };


      var percent = (0, _extends3.default)({},
      numberFormat, {
        pattern: getNumberPattern('percent', '{minusSign}{number}{percentSign}', '{number}{percentSign}'),
        symbol: percentSign });


      var currency = (0, _extends3.default)({},
      numberFormat, {
        pattern: getNumberPattern('currency', '{minusSign}{currency}{number}', '{currency}{number}'),
        symbol: currencySymbol });


      numberFormat.percent = percent;
      numberFormat.currency = currency;

      var calendars = {
        standard: {
          // separator of parts of a date (e.g. '/' in 11/05/1955)
          '/': '/',
          // separator of parts of a time (e.g. ':' in 05:44 PM)
          ':': ':',
          // the first day of the week (0 = Sunday, 1 = Monday, etc)
          firstDay: 0,
          days: {
            // full day names
            names: getCalendarProps('days.long'),
            // abbreviated day names
            namesAbbr: getCalendarProps('days.short'),
            // shortest day names
            namesShort: getCalendarProps('days.narrow') },

          months: {
            // full month names
            names: getCalendarProps('months.long'),
            // abbreviated month names
            namesAbbr: getCalendarProps('months.short'),
            // shortest month names
            namesShort: getCalendarProps('months.narrow') },

          AM: [am, am, am],
          PM: [pm, pm, pm],
          patterns: {
            // short date pattern
            d: 'M/D/YYYY',
            // long date pattern
            D: 'dddd, MMMM DD, YYYY',
            // short time pattern
            t: 'h:mm A',
            // long time pattern
            T: 'h:mm:ss A',
            // long date, short time pattern
            f: 'dddd, MMMM DD, YYYY h:mm A',
            // long date, long time pattern
            F: 'dddd, MMMM DD, YYYY h:mm:ss A',
            // month/day pattern
            M: 'MMMM DD',
            // month/year pattern
            Y: 'YYYY MMMM' } } };




      var culture = {
        name: name,
        numberFormat: numberFormat,
        calendars: calendars };


      return culture;
    } }, { key: 'getNumericContext', value: function getNumericContext()

    {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NumericType.DECIMAL;
      var culture = this.currentCulture;
      var defaultNf = culture.numberFormat;
      var nf = culture.numberFormat;
      if (type === NumericType.PERCENT) {
        nf = culture.numberFormat.percent;
      }

      if (type === NumericType.CURRENCY) {
        nf = culture.numberFormat.currency;
      }

      // istanbul ignore next
      var cultureContext = {
        pattern: nf.pattern || defaultNf.pattern,
        groupSep: nf[','] || defaultNf[','] || ',',
        decimalSep: nf['.'] || defaultNf['.'] || '.',
        decimals: nf.decimals || defaultNf.decimals,
        groupSizes: nf.groupSizes || defaultNf.groupSizes || [3],
        currencySymbol: defaultNf.currency.symbol || this.getCurrencySymbol(),
        percentSymbol: defaultNf.percent.symbol || '%' };


      if (cultureContext.pattern.length === 1) {
        cultureContext.pattern.push('n');
      }

      // istanbul ignore if
      if ((0, _isNil2.default)(cultureContext.decimals)) {
        cultureContext.decimals = 2;
      }

      return cultureContext;
    } }, { key: 'updateCultureContext', value: function updateCultureContext()

    {
      this.decimalContext = this.getNumericContext();
      this.percentContext = this.getNumericContext(NumericType.PERCENT);
      this.currencyContext = this.getNumericContext(NumericType.CURRENCY);
    } }, { key: 'onIntlChange', value: function onIntlChange()

    {
      var locale = this.currentIntl && this.currentIntl.locale || 'en';
      this.currentCulture = this.cultures[locale] =
      this.cultures[locale] || this.composeCulture(locale);
      this.updateCultureContext();
      _moment2.default.locale(locale);
    } }, { key: 'parseDate', value: function parseDate(

    date, format) {
      return (0, _moment2.default)(date, format || this.ANDateFormat);
    } }, { key: 'parseTime', value: function parseTime(

    time, format) {
      return (0, _moment2.default)(time, format || this.ANTimeFormat);
    } }, { key: 'parseDateTime', value: function parseDateTime(

    dateTime, format) {
      return (0, _moment2.default)(dateTime, format || this.ANDateTimeFormat);
    } }, { key: 'formatDate', value: function formatDate(

    date, format) {
      var m = _utils.momentHelper.createMoment(date);
      return m ? m.format(format || this.ANDateFormat) : '';
    } }, { key: 'formatTime', value: function formatTime(

    time, format) {
      var m = _utils.momentHelper.createMoment(time);
      return m ? m.format(format || this.ANTimeFormat) : '';
    } }, { key: 'formatDateTime', value: function formatDateTime(

    dateTime, format) {
      var m = _utils.momentHelper.createMoment(dateTime);
      return m ? m.format(format || this.ANDateTimeFormat) : '';
    } }, { key: 'isSameDay', value: function isSameDay(

    start, end) {
      var d1 = this.parseDate(start);
      var d2 = this.parseDate(end);
      return d1.isSame(d2, 'day');
    } }, { key: 'getNumericCultureContext', value: function getNumericCultureContext()

    {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NumericType.DECIMAL;
      var cc = this.decimalContext;
      if (type === NumericType.CURRENCY) {
        cc = this.currencyContext;
      } else if (type === NumericType.PERCENT) {
        cc = this.percentContext;
      }

      return (0, _extends3.default)({}, cc);
    } }, { key: 'formatNumeric', value: function formatNumeric(

    value) {var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NumericType.DECIMAL;var round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;var cultureContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if ((0, _isNil2.default)(value)) return '';

      value *= 1;
      if ((0, _isNaN2.default)(value)) return '';

      var ncc = this.getNumericCultureContext(type);
      // istanbul ignore if
      if (!ncc) {
        throw new Error('Can not find culture information.');
      }

      if ((0, _isPlainObject2.default)(round)) {
        cultureContext = round;
        round = true;
      }

      var cc = (0, _extends3.default)({}, ncc, cultureContext);
      var txtValue = _NumericHelper2.default.toFixedString(value, cc.decimals, round);
      var neg = _NumericHelper2.default.isNegative(txtValue);

      var fixedValue = txtValue * 1;
      var absValue = '' + fixedValue;
      absValue = absValue.replace(/[-()]/g, '');
      var decimalPos = _NumericHelper2.default.getDecimalPos(absValue, cc);

      var text = '';
      var groupSizeIndex = 0;
      var groupCount = 0;
      var ch = void 0;
      var i = void 0;
      for (i = absValue.length - 1; i >= 0; i -= 1) {
        ch = absValue.charAt(i);
        if (i < decimalPos) {
          text = ch + text;
          groupCount += 1;
          if (groupCount === cc.groupSizes[groupSizeIndex] * 1 &&
          cc.groupSizes[groupSizeIndex] * 1 && i) {
            text = cc.groupSep + text;
            groupCount = 0;
            if (cc.groupSizes.length - 1 > groupSizeIndex) {
              groupSizeIndex += 1;
            }
          }
        }
      }
      if (cc.decimals > 0) {
        text += cc.decimalSep;
        for (i = 0; i < cc.decimals; i += 1) {
          ch = '0';
          if (i + decimalPos + 1 < absValue.length) {
            ch = absValue.charAt(i + decimalPos + 1);
          }
          text += ch;
        }
      }

      if (cc.decimals === -1) {
        if (decimalPos < absValue.length - 1) {
          text += cc.decimalSep;
          text += absValue.substr(decimalPos + 1);
        }
      }

      text = _NumericHelper2.default.removeLeadingZero(text) || '0';
      text = _NumericHelper2.default.applySymbols(text, cc, neg);

      return text;
    } }, { key: 'parseNumeric', value: function parseNumeric(

    value) {var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NumericType.DECIMAL;var cultureContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var txtValue = '' + value;
      if (txtValue.trim().length === 0) {
        return 0;
      }

      var ncc = this.getNumericCultureContext(type);

      // istanbul ignore if
      if (!ncc) {
        throw new Error('Can not find culture information.');
      }

      var cc = (0, _extends3.default)({}, ncc, cultureContext);
      var neg = _NumericHelper2.default.isNegative(txtValue);
      txtValue = _NumericHelper2.default.stripSymbols(txtValue, cc) || '0';
      var decimalValue = txtValue * 1;

      // istanbul ignore if
      if ((0, _isNaN2.default)(decimalValue)) {
        throw new Error('Can not parse the text to numeric');
      }

      txtValue = neg ? '-' + txtValue : '' + txtValue;
      return txtValue * 1;
    } }, { key: 'getToday', value: function getToday(

    timeZoneOffset) {
      var format = 'YYYYMMDD HHmmss';
      if ((0, _isInteger2.default)(timeZoneOffset) || (0, _isInteger2.default)(this.currentANTimeZoneOffset)) {
        var anOffset = (0, _isInteger2.default)(timeZoneOffset) ? timeZoneOffset : this.currentANTimeZoneOffset;
        return (0, _moment2.default)((0, _moment2.default)().utc().utcOffset(anOffset, false).format(format), format);
      }
      return (0, _moment2.default)();
    } }]);return Globalize;}();exports.default =


new Globalize();module.exports = exports['default'];