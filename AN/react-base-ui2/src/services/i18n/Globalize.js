import get from 'lodash/get';
import isNil from 'lodash/isNil';
import isNaN from 'lodash/isNaN';
import isPlainObject from 'lodash/isPlainObject';
import IntlMessageFormat from 'intl-messageformat';
import moment from 'moment';
import isInteger from 'lodash/isInteger';
import { momentHelper } from '../../utils';
import * as NumericType from '../../consts/NumericType';
import defaultCulture from './cultures/en';
import * as CurrencyCode from './consts/CurrencyCode';
import Currencies from './Currencies';
import NumericHelper from '../../utils/NumericHelper';

/* eslint default-case: 0 */

const currencyCodeMap = {
  fr: CurrencyCode.EUR,
  zh: CurrencyCode.CNY
};

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
 */

class Globalize {

  constructor() {
    this.currentIntl = null;
    this.cldrs = {};
    this.cultures = {};
    this.currentCulture = defaultCulture;
    this.cCode = CurrencyCode.USD;
    this.currentANDateFormat = 'DD MMM YYYY';
    this.currentANTimeFormat = 'h:mm A';

    this.updateCultureContext();

    /**
     * @description Gets the current React-Intl instance
     * @name intl
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      intl: {
        get() {
          return this.currentIntl;
        },
        set(v) {
          this.currentIntl = v;
          this.onIntlChange();
        }
      }
    });

    /**
     * @description Gets current locale
     * @name locale
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      locale: {
        get() {
          return this.currentIntl ? this.currentIntl.locale : 'en';
        }
      }
    });

    /**
     * @description Gets current culture information
     * @name culture
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      culture: {
        get() {
          return this.currentCulture;
        }
      }
    });

    /**
     * @description Gets or sets the currency code
     * @name currencyCode
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      currencyCode: {
        get() {
          return this.cCode;
        },
        set(v) {
          this.cCode = v;
        }
      }
    });

    /**
     * @description Gets or sets the AN Date Format
     * @name ANDateFormat
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      ANDateFormat: {
        get() {
          return this.currentANDateFormat;
        },
        set(v) {
          this.currentANDateFormat = v;
        }
      }
    });

    /**
     * @description Gets or sets the AN Time Format
     * @name ANTimeFormat
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      ANTimeFormat: {
        get() {
          return this.currentANTimeFormat;
        },
        set(v) {
          this.currentANTimeFormat = v;
        }
      }
    });

    /**
     * @description Gets the date time format
     * @name ANDateTimeFormat
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      ANDateTimeFormat: {
        get() {
          return `${this.currentANDateFormat} ${this.currentANTimeFormat}`;
        }
      }
    });

    /**
     * @description Gets or sets the AN Time Zone Offset (hours)
     * @name ANTimeZoneOffset
     * @memberof Globalize
     */
    Object.defineProperties(this, {
      ANTimeZoneOffset: {
        get() {
          return this.currentANTimeZoneOffset;
        },
        set(v) {
          this.currentANTimeZoneOffset = v;
        }
      }
    });
  }

  toMomentFormat(f = 'd') {
    const calendar = this.culture.calendars.standard;
    let format = calendar.patterns.d;
    if (f.length === 1) {
      switch (f) {
        case 'd': // ShortDatePattern
          format = this.ANDateFormat || calendar.patterns.d;
          break;
        case 'D': // LongDatePattern
          format = calendar.patterns.D;
          break;
        case 'f': // Full date and time (long date and short time)
          format = this.ANDateFormat && this.ANTimeFormat ?
            `${this.ANDateFormat} ${this.ANTimeFormat}` :
            `${calendar.patterns.D} ${calendar.patterns.t}`;
          break;
        case 'F': // Full date and time (long date and long time)
          format = `${calendar.patterns.D} ${calendar.patterns.T}`;
          break;
        case 'g': // General (short date and short time)
          format = `${calendar.patterns.d} ${calendar.patterns.t}`;
          break;
        case 'G': // General (short date and long time)
          format = `${calendar.patterns.d} ${calendar.patterns.T}`;
          break;
        case 'm': // MonthDayPattern
          format = calendar.patterns.M;
          break;
        case 'M': // monthDayPattern
          format = calendar.patterns.M;
          break;
        case 's': // SortableDateTimePattern
          format = calendar.patterns.S;
          break;
        case 't': // shortTimePattern
          format = this.ANTimeFormat || this.patterns.t;
          break;
        case 'T': // LongTimePattern
          format = calendar.patterns.T;
          break;
        case 'u': // UniversalSortableDateTimePattern
          format = calendar.patterns.S;
          break;
        case 'U': // Full date and time (long date and long time) using universal time
          format = `${calendar.patterns.D} ${calendar.patterns.T}`;
          break;
        case 'y': // YearMonthPattern
          format = calendar.patterns.Y;
          break;
        case 'Y': // yearMonthPattern
          format = calendar.patterns.Y;
          break;
      }
    } else {
      format = f;
    }

    return format;
  }

  /**
   * Gets currency symbol by currency code
   * @method
   * @param code Currency code
   * @memberof Globalize
   */
  getCurrencySymbol = (code) => {
    code = code || this.cCode;
    return Currencies[code] ? Currencies[code].symbol : '$';
  }

  addCldr = (data) => {
    const locale = data.locale;
    if (locale) {
      this.cldrs[locale] = this.cldrs[locale] || data;
    }
  };

  /**
   * Gets CLDR data by locale.
   * @method
   * @param locale The locale name.
   * @memberof Globalize
   */
  getCldr = locale => this.find(locale, this.cldrs);

  find = (locale, hash) => {
    locale = locale && locale.toLowerCase();
    const localeParts = (locale || '').split('-');

    while (localeParts.length > 0) {
      const l = hash[localeParts.join('-')];
      if (l) {
        return l;
      }

      localeParts.pop();
    }

    return null;
  }

  getRelativeData = locale => this.find(locale, IntlMessageFormat.__localeData__);

  /**
   * Gets culture information by locale.
   * @method
   * @param locale The locale name.
   * @memberof Globalize
   */
  getCulture = locale => this.find(locale, this.cultures);

  composeCulture(locale) {
    const cldr = this.getCldr(locale);

    const name = get(cldr, 'locale', 'en');
    const plusSign = get(cldr, 'number.symbols.latn.plusSign', '+');
    const minusSign = get(cldr, 'number.symbols.latn.minusSign', '-');
    const decimal = get(cldr, 'number.symbols.latn.decimal', '.');
    const group = get(cldr, 'number.symbols.latn.group', ',');
    const percentSign = get(cldr, 'number.symbols.latn.percentSign', '%');
    const currencySymbol = this.getCurrencySymbol(currencyCodeMap[name]);

    const replaceNumberPattern = pattern => pattern.replace('{plusSign}', plusSign)
      .replace('{minusSign}', minusSign)
      .replace('{percentSign}', percentSign)
      .replace('{currency}', '$')
      .replace('{number}', 'n');

    const getNumberPattern = (patterName, defaultNegativePattern, defaultPositivePattern) => [
      replaceNumberPattern(get(cldr, `number.patterns.${patterName}.negativePattern`, defaultNegativePattern)),
      replaceNumberPattern(get(cldr, `number.patterns.${patterName}.positivePattern`, defaultPositivePattern))
    ];

    const names = ['gregory', 'chinese', 'japanese', 'buddhist'];
    let calendar = null;
    names.forEach((n) => {
      calendar = get(cldr, `date.calendars.${n}`);
      return !calendar;
    });

     // istanbul ignore else
    if (!calendar) {
      calendar = {
        months: {
          narrow: [
            'J',
            'F',
            'M',
            'A',
            'M',
            'J',
            'J',
            'A',
            'S',
            'O',
            'N',
            'D'
          ],
          short: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          long: [
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
            'December'
          ]
        },
        days: {
          narrow: [
            'S',
            'M',
            'T',
            'W',
            'T',
            'F',
            'S'
          ],
          short: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ],
          long: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ]
        },
        eras: {
          narrow: [
            'B',
            'A',
            'BCE',
            'CE'
          ],
          short: [
            'BC',
            'AD',
            'BCE',
            'CE'
          ],
          long: [
            'Before Christ',
            'Anno Domini',
            'Before Common Era',
            'Common Era'
          ]
        },
        dayPeriods: {
          am: 'AM',
          pm: 'PM'
        }
      };
    }

    const am = get(calendar, 'dayPeriods.am', 'AM');
    const pm = get(calendar, 'dayPeriods.pm', 'PM');

    const getCalendarProps = prop => get(calendar, prop);

    const numberFormat = {
      '.': decimal,
      ',': group,
      '+': plusSign,
      '-': minusSign,
      '%': percentSign,
      decimals: 2,
      groupSizes: [3],
      pattern: getNumberPattern('decimal', '{minusSign}{number}', '{number}')
    };

    const percent = {
      ...numberFormat,
      pattern: getNumberPattern('percent', '{minusSign}{number}{percentSign}', '{number}{percentSign}'),
      symbol: percentSign
    };

    const currency = {
      ...numberFormat,
      pattern: getNumberPattern('currency', '{minusSign}{currency}{number}', '{currency}{number}'),
      symbol: currencySymbol
    };

    numberFormat.percent = percent;
    numberFormat.currency = currency;

    const calendars = {
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
          namesShort: getCalendarProps('days.narrow')
        },
        months: {
          // full month names
          names: getCalendarProps('months.long'),
          // abbreviated month names
          namesAbbr: getCalendarProps('months.short'),
          // shortest month names
          namesShort: getCalendarProps('months.narrow')
        },
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
          Y: 'YYYY MMMM'
        }
      }
    };

    const culture = {
      name,
      numberFormat,
      calendars
    };

    return culture;
  }

  getNumericContext(type = NumericType.DECIMAL) {
    const culture = this.currentCulture;
    const defaultNf = culture.numberFormat;
    let nf = culture.numberFormat;
    if (type === NumericType.PERCENT) {
      nf = culture.numberFormat.percent;
    }

    if (type === NumericType.CURRENCY) {
      nf = culture.numberFormat.currency;
    }

    // istanbul ignore next
    const cultureContext = {
      pattern: nf.pattern || defaultNf.pattern,
      groupSep: nf[','] || defaultNf[','] || ',',
      decimalSep: nf['.'] || defaultNf['.'] || '.',
      decimals: nf.decimals || defaultNf.decimals,
      groupSizes: nf.groupSizes || defaultNf.groupSizes || [3],
      currencySymbol: defaultNf.currency.symbol || this.getCurrencySymbol(),
      percentSymbol: defaultNf.percent.symbol || '%'
    };

    if (cultureContext.pattern.length === 1) {
      cultureContext.pattern.push('n');
    }

    // istanbul ignore if
    if (isNil(cultureContext.decimals)) {
      cultureContext.decimals = 2;
    }

    return cultureContext;
  }

  updateCultureContext() {
    this.decimalContext = this.getNumericContext();
    this.percentContext = this.getNumericContext(NumericType.PERCENT);
    this.currencyContext = this.getNumericContext(NumericType.CURRENCY);
  }

  onIntlChange() {
    const locale = (this.currentIntl && this.currentIntl.locale) || 'en';
    this.currentCulture = this.cultures[locale] =
      this.cultures[locale] || this.composeCulture(locale);
    this.updateCultureContext();
    moment.locale(locale);
  }

  parseDate(date, format) {
    return moment(date, format || this.ANDateFormat);
  }

  parseTime(time, format) {
    return moment(time, format || this.ANTimeFormat);
  }

  parseDateTime(dateTime, format) {
    return moment(dateTime, format || this.ANDateTimeFormat);
  }

  formatDate(date, format) {
    const m = momentHelper.createMoment(date);
    return m ? m.format(format || this.ANDateFormat) : '';
  }

  formatTime(time, format) {
    const m = momentHelper.createMoment(time);
    return m ? m.format(format || this.ANTimeFormat) : '';
  }

  formatDateTime(dateTime, format) {
    const m = momentHelper.createMoment(dateTime);
    return m ? m.format(format || this.ANDateTimeFormat) : '';
  }

  isSameDay(start, end) {
    const d1 = this.parseDate(start);
    const d2 = this.parseDate(end);
    return d1.isSame(d2, 'day');
  }

  getNumericCultureContext(type = NumericType.DECIMAL) {
    let cc = this.decimalContext;
    if (type === NumericType.CURRENCY) {
      cc = this.currencyContext;
    } else if (type === NumericType.PERCENT) {
      cc = this.percentContext;
    }

    return { ...cc };
  }

  formatNumeric(value, type = NumericType.DECIMAL, round = true, cultureContext = {}) {
    if (isNil(value)) return '';

    value *= 1;
    if (isNaN(value)) return '';

    const ncc = this.getNumericCultureContext(type);
    // istanbul ignore if
    if (!ncc) {
      throw new Error('Can not find culture information.');
    }

    if (isPlainObject(round)) {
      cultureContext = round;
      round = true;
    }

    const cc = { ...ncc, ...cultureContext };
    const txtValue = NumericHelper.toFixedString(value, cc.decimals, round);
    const neg = NumericHelper.isNegative(txtValue);

    const fixedValue = txtValue * 1;
    let absValue = `${fixedValue}`;
    absValue = absValue.replace(/[-()]/g, '');
    const decimalPos = NumericHelper.getDecimalPos(absValue, cc);

    let text = '';
    let groupSizeIndex = 0;
    let groupCount = 0;
    let ch;
    let i;
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

    text = NumericHelper.removeLeadingZero(text) || '0';
    text = NumericHelper.applySymbols(text, cc, neg);

    return text;
  }

  parseNumeric(value, type = NumericType.DECIMAL, cultureContext = {}) {
    let txtValue = `${value}`;
    if (txtValue.trim().length === 0) {
      return 0;
    }

    const ncc = this.getNumericCultureContext(type);

    // istanbul ignore if
    if (!ncc) {
      throw new Error('Can not find culture information.');
    }

    const cc = { ...ncc, ...cultureContext };
    const neg = NumericHelper.isNegative(txtValue);
    txtValue = NumericHelper.stripSymbols(txtValue, cc) || '0';
    const decimalValue = txtValue * 1;

    // istanbul ignore if
    if (isNaN(decimalValue)) {
      throw new Error('Can not parse the text to numeric');
    }

    txtValue = neg ? `-${txtValue}` : `${txtValue}`;
    return txtValue * 1;
  }

  getToday(timeZoneOffset) {
    const format = 'YYYYMMDD HHmmss';
    if (isInteger(timeZoneOffset) || isInteger(this.currentANTimeZoneOffset)) {
      const anOffset = isInteger(timeZoneOffset) ? timeZoneOffset : this.currentANTimeZoneOffset;
      return moment(moment().utc().utcOffset(anOffset, false).format(format), format);
    }
    return moment();
  }
}

export default new Globalize();
