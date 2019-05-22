'use strict';

exports.__esModule = true;
/* eslint-disable */
// Adapted from: http://code.google.com/p/closure-library/source/browse/trunk/closure/goog/i18n/datetimesymbols.js

/**
 * @private
 *
 * Date/time formatting symbols for locale en_US.
 */
var en_US = exports.en_US = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'M/d/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'M/d/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M/d',
    MONTH_ABBR_DATE: 'MMM d, yyyy',
    LONG_DATE: 'MMMM d, yyyy',
    LONG_DATETIME: 'MMMM d, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, MMMM d, yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_CA.
   */
};var en_CA = exports.en_CA = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'yyyy/MM/dd'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy/M/d',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'yyyy/M/d h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M/d',
    MONTH_ABBR_DATE: 'MMM d, yyyy',
    LONG_DATE: 'MMMM d, yyyy',
    LONG_DATETIME: 'MMMM d, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, MMMM d, yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}/[0-9]{1,2}/[0-9]{1,2}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_AU.
   */
};var en_AU = exports.en_AU = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM y', 'd MMMM y', 'dd/MM/yyyy', 'd/MM/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'd/M/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM, yyyy',
    LONG_DATE: 'd MMMM, yyyy',
    LONG_DATETIME: 'd MMMM, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, d MMMM, yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_NZ.
   */
};var en_NZ = exports.en_NZ = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM y', 'd MMMM y', 'dd/MM/yyyy', 'd/MM/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'd/MM/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'd/MM/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, d MMMM yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_GB.
   */
};var en_GB = exports.en_GB = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'dd/MM/yyyy H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy H:mm',
    LONG_DAYOFWEEK: 'EEEE, d MMMM yyyy',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_IE.
   */
};var en_IE = exports.en_IE = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'd/M/yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'd/M/yyyy H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy H:mm',
    LONG_DAYOFWEEK: 'EEEE d MMMM yyyy',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_SG.
   */
};var en_SG = exports.en_SG = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'M/d/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'M/d/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M/d',
    MONTH_ABBR_DATE: 'MMM d, yyyy',
    LONG_DATE: 'MMMM d, yyyy',
    LONG_DATETIME: 'MMMM d, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, MMMM d, yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_PH.
   */
};var en_PH = exports.en_PH = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'M/d/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'M/d/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M/d',
    MONTH_ABBR_DATE: 'MMM d, yyyy',
    LONG_DATE: 'MMMM d, yyyy',
    LONG_DATETIME: 'MMMM d, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, MMMM d, yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale en_ZA.
   */
};var en_ZA = exports.en_ZA = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  STANDALONEMONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy/M/d',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'yyyy/M/d h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M/d',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'dd MMMM yyyy',
    LONG_DATETIME: 'dd MMMM yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE MMMM yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}/[0-9]{1,2}/[0-9]{1,2}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }
  /**
       * @private
       *
       * Date/time formatting symbols for locale es.
       */
};var es = exports.es = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['antes de Cristo', 'anno DÃ³mini'],
  NARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  STANDALONEMONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  SHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'mayo', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  WEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  STANDALONEWEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2Âº trimestre', '3er trimestre', '4Âº trimestre'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ["EEEE d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", 'dd/MM/yyyy', 'dd/MM/yy'],
  TIMEFORMATS: ['HH:mm:ss zzzz', 'HH:mm:ss z', 'HH:mm:ss', 'HH:mm'],
  FIRSTDAYOFWEEK: 1,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 3,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd/MM/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale es_ES.
   */
};var es_ES = exports.es_ES = es;

/**
 * @private
 *
 * Date/time formatting symbols for locale es_CL.
 */
var es_CL = exports.es_CL = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['antes de Cristo', 'anno DÃ³mini'],
  NARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  STANDALONEMONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  SHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'mayo', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  WEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  STANDALONEWEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2Âº trimestre', '3er trimestre', '4Âº trimestre'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ["EEEE d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", 'd/M/yyyy', 'd/M/yy'],
  TIMEFORMATS: ['HH:mm:ss zzzz', 'HH:mm:ss z', 'HH:mm:ss', 'HH:mm'],
  FIRSTDAYOFWEEK: 1,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 3,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/M/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale es_MX.
   */
};var es_MX = exports.es_MX = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['antes de Cristo', 'anno DÃ³mini'],
  NARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  STANDALONEMONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  SHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'mayo', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  WEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  STANDALONEWEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2Âº trimestre', '3er trimestre', '4Âº trimestre'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ["EEEE d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", 'd/M/yyyy', 'd/M/yy'],
  TIMEFORMATS: ['HH:mm:ss zzzz', 'HH:mm:ss z', 'HH:mm:ss', 'HH:mm'],
  FIRSTDAYOFWEEK: 1,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 3,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/M/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale es_PR.
   */
};var es_PR = exports.es_PR = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['antes de Cristo', 'anno DÃ³mini'],
  NARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  STANDALONEMONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  SHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'mayo', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  WEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  STANDALONEWEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2Âº trimestre', '3er trimestre', '4Âº trimestre'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ["EEEE d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", 'd/M/yyyy', 'd/M/yy'],
  TIMEFORMATS: ['HH:mm:ss zzzz', 'HH:mm:ss z', 'HH:mm:ss', 'HH:mm'],
  FIRSTDAYOFWEEK: 1,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 3,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/M/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale es_PA.
   */
};var es_PA = exports.es_PA = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['antes de Cristo', 'anno DÃ³mini'],
  NARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  STANDALONEMONTHS: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  SHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['ene', 'feb', 'mar', 'abr', 'mayo', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  WEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  STANDALONEWEEKDAYS: ['domingo', 'lunes', 'martes', 'miÃ©rcoles', 'jueves', 'viernes', 'sÃ¡bado'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'miÃ©', 'jue', 'vie', 'sÃ¡b'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2Âº trimestre', '3er trimestre', '4Âº trimestre'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ["EEEE d 'de' MMMM 'de' y", "d 'de' MMMM 'de' y", 'd/M/yyyy', 'd/M/yy'],
  TIMEFORMATS: ['HH:mm:ss zzzz', 'HH:mm:ss z', 'HH:mm:ss', 'HH:mm'],
  FIRSTDAYOFWEEK: 1,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 3,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/M/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date / time formatting symbols for locale zh_CN.
   */
};var zh_CN = exports.zh_CN = {
  ERAS: ['公元前', '公元'],
  ERANAMES: ['公元前', '公元'],
  NARROWMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONENARROWMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  MONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONEMONTHS: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  SHORTMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONESHORTMONTHS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  WEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  STANDALONEWEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  SHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  STANDALONESHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  NARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  STANDALONENARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  SHORTQUARTERS: ['1季', '2季', '3季', '4季'],
  QUARTERS: ['第1季度', '第2季度', '第3季度', '第4季度'],
  AMPMS: ['上午', '下午'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  AVAILABLEFORMATS: {
    Md: 'M-d',
    MMMMd: 'MMMMdæ—¥',
    MMMd: 'MMMdæ—¥'
  },
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy-M-d',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'yyyy-M-d h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M-d',
    MONTH_ABBR_DATE: 'yyyy年M月d日',
    LONG_DATE: 'yyyy年M月d日',
    LONG_DATETIME: 'yyyy年M月d日ah:mm',
    LONG_DAYOFWEEK: 'yyyy年M月d日EEEE',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}-[0-9]{1,2}-[0-9]{1,2}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date / time formatting symbols for locale zh_SG.
   */
};var zh_SG = exports.zh_SG = {
  ERAS: ['公元前', '公元'],
  ERANAMES: ['公元前', '公元'],
  NARROWMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONENARROWMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  MONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONEMONTHS: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  SHORTMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONESHORTMONTHS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  WEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  STANDALONEWEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  SHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  STANDALONESHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  NARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  STANDALONENARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  SHORTQUARTERS: ['1季', '2季', '3季', '4季'],
  QUARTERS: ['第1季度', '第2季度', '第3季度', '第4季度'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  AVAILABLEFORMATS: {
    Md: 'M-d',
    MMMMd: 'MMMMdæ—¥',
    MMMd: 'MMMdæ—¥'
  },
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'hh:mm a',
    SHORT_DATETIME: 'dd/MM/yyyy hh:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'yyyy年M月d日',
    LONG_DATE: 'yyyy年M月d日',
    LONG_DATETIME: 'yyyy年M月d日下午hh:mm',
    LONG_DAYOFWEEK: 'yyyy年M月d日EEEE',
    TIME_INPUT: 'hh:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date / time formatting symbols for locale zh_HK.
   */
};var zh_HK = exports.zh_HK = {
  ERAS: ['西元前', '西元'],
  ERANAMES: ['西元前', '西元'],
  NARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  STANDALONENARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  MONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONEMONTHS: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  SHORTMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONESHORTMONTHS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  WEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  STANDALONEWEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  SHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  STANDALONESHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  NARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  STANDALONENARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  SHORTQUARTERS: ['1', '2', '3', '4'],
  QUARTERS: ['第1季度', '第2季度', '第3季度', '第4季度'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  AVAILABLEFORMATS: {
    Md: 'M-d',
    MMMMd: 'MMMMdæ—¥',
    MMMd: 'MMMdæ—¥'
  },
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'd/M/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'yyyy年M月d日',
    LONG_DATE: 'yyyy年M月d日',
    LONG_DATETIME: 'yyyy年M月d日下午h:mm',
    LONG_DAYOFWEEK: 'yyyy年M月d日EEEE',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date / time formatting symbols for locale zh_TW.
   */
};var zh_TW = exports.zh_TW = {
  ERAS: ['西元前', '西元'],
  ERANAMES: ['西元前', '西元'],
  NARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  STANDALONENARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  MONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONEMONTHS: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  SHORTMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONESHORTMONTHS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  WEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  STANDALONEWEEKDAYS: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  SHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  STANDALONESHORTWEEKDAYS: ['周日', '周一', '周二', ' 周三', '周四', '周五', '周六'],
  NARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  STANDALONENARROWWEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
  SHORTQUARTERS: ['1', '2', '3', '4'],
  QUARTERS: ['第1季度', '第2季度', '第3季度', '第4季度'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  AVAILABLEFORMATS: {
    Md: 'M-d',
    MMMMd: 'MMMMdæ—¥',
    MMMd: 'MMMdæ—¥'
  },
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy-M-d',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'yyyy-M-d h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M-d',
    MONTH_ABBR_DATE: 'yyyy年M月d日',
    LONG_DATE: 'yyyy年M月d日',
    LONG_DATETIME: 'yyyy年M月d日下午h:mm',
    LONG_DAYOFWEEK: 'yyyy年M月d日EEEE',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}-[0-9]{1,2}-[0-9]{1,2}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }
  /**
       * @private
       *
       * Date/time formatting symbols for locale de_DE.
       */
};var de_DE = exports.de_DE = {
  ERAS: ['v. Chr.', 'n. Chr.'],
  ERANAMES: ['v. Chr.', 'n. Chr.'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['Januar', 'Februar', ' März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  STANDALONEMONTHS: ['Januar', 'Februar', ' März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  WEEKDAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  STANDALONEWEEKDAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  SHORTWEEKDAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  STANDALONESHORTWEEKDAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  NARROWWEEKDAYS: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'dd.MM.yyyy H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd.MM',
    MONTH_ABBR_DATE: 'd. MMM yyyy',
    LONG_DATE: 'd. MMMM yyyy',
    LONG_DATETIME: 'd. MMMM yyyy H:mm',
    LONG_DAYOFWEEK: 'EEEE, d. MMMM yyyy',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale de_AT.
   */
};var de_AT = exports.de_AT = {
  ERAS: ['v. Chr.', 'n. Chr.'],
  ERANAMES: ['v. Chr.', 'n. Chr.'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['Januar', 'Februar', ' März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  STANDALONEMONTHS: ['Januar', 'Februar', ' März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  WEEKDAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  STANDALONEWEEKDAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  SHORTWEEKDAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  STANDALONESHORTWEEKDAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  NARROWWEEKDAYS: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d. MMMM yyyy', 'd. MMMM yyyy', 'd. MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'dd.MM.yyyy H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd.MM',
    MONTH_ABBR_DATE: 'd. MMM yyyy',
    LONG_DATE: 'dd. MMMM yyyy',
    LONG_DATETIME: 'dd. MMMM yyyy H:mm',
    LONG_DAYOFWEEK: 'EEEE, dd. MMMM yyyy',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale de_CH.
   */
};var de_CH = exports.de_CH = {
  ERAS: ['v. Chr.', 'n. Chr.'],
  ERANAMES: ['v. Chr.', 'n. Chr.'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['Januar', 'Februar', ' März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  STANDALONEMONTHS: ['Januar', 'Februar', ' März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  WEEKDAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  STANDALONEWEEKDAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  SHORTWEEKDAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  STANDALONESHORTWEEKDAYS: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  NARROWWEEKDAYS: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d. MMMM yyyy', 'd. MMMM yyyy', 'd. MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd.MM.yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd.MM',
    MONTH_ABBR_DATE: 'd. MMM yyyy',
    LONG_DATE: 'd. MMMM yyyy',
    LONG_DATETIME: 'd. MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE, dd. MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale fr_FR.
   */
};var fr_FR = exports.fr_FR = {
  ERAS: ['av. J.-C.', 'ap. J.-C.'],
  ERANAMES: ['avant Jésus-Christ', 'après Jésus-Christ'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  STANDALONEMONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  SHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  STANDALONESHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  WEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  STANDALONEWEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  SHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  STANDALONESHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2e trimestre', '3e trimestre', '4e trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'dd/MM/yyyy H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy H:mm',
    LONG_DAYOFWEEK: 'EEEE, d MMMM yyyy',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale fr_CA.
   */
};var fr_CA = exports.fr_CA = {
  ERAS: ['av. J.-C.', 'ap. J.-C.'],
  ERANAMES: ['avant Jésus-Christ', 'après Jésus-Christ'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  STANDALONEMONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  SHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  STANDALONESHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  WEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  STANDALONEWEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  SHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  STANDALONESHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2e trimestre', '3e trimestre', '4e trimestre'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'yyyy/MM/dd'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy/MM/dd',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'yyyy/MM/dd h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'MM/dd',
    MONTH_ABBR_DATE: 'MMM d, yyyy',
    LONG_DATE: 'MMMM d, yyyy',
    LONG_DATETIME: 'MMMM d, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, MMMM d, yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}/[0-9]{1,2}/[0-9]{1,2}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale fr_CH.
   */
};var fr_CH = exports.fr_CH = {
  ERAS: ['av. J.-C.', 'ap. J.-C.'],
  ERANAMES: ['avant Jésus-Christ', 'après Jésus-Christ'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  STANDALONEMONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  SHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  STANDALONESHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  WEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  STANDALONEWEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  SHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  STANDALONESHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2e trimestre', '3e trimestre', '4e trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd.MM.yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd.MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE, d MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale fr_BE.
   */
};var fr_BE = exports.fr_BE = {
  ERAS: ['av. J.-C.', 'ap. J.-C.'],
  ERANAMES: ['avant Jésus-Christ', 'après Jésus-Christ'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  STANDALONEMONTHS: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  SHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  STANDALONESHORTMONTHS: ['janv.', 'févr.', ' mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc'],
  WEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  STANDALONEWEEKDAYS: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  SHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  STANDALONESHORTWEEKDAYS: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1er trimestre', '2e trimestre', '3e trimestre', '4e trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/MM/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/MM/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale da_DK.
   */
};var da_DK = exports.da_DK = {
  ERAS: ['f.Kr.', 'e.Kr.'],
  ERANAMES: ['f.Kr.', 'e.Kr.'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['januar', 'februar', ' marts', 'april', ' maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'],
  STANDALONEMONTHS: ['januar', 'februar', ' marts', 'april', ' maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'],
  SHORTMONTHS: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec'],
  STANDALONESHORTMONTHS: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec'],
  WEEKDAYS: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  STANDALONEWEEKDAYS: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  SHORTWEEKDAYS: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
  STANDALONESHORTWEEKDAYS: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  SHORTQUARTERS: ['K1', 'K2', 'K3', 'K4'],
  QUARTERS: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'H.mm',
    SHORT_DATETIME: 'dd.MM.yyyy H.mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd. MMM yyyy',
    LONG_DATE: 'd. MMMM yyyy',
    LONG_DATETIME: 'd. MMMM yyyy H.mm',
    LONG_DAYOFWEEK: 'EEEE den d. MMMM yyyy',
    TIME_INPUT: 'H.mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}\\.[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale no_NO.
   */
};var no_NO = exports.no_NO = {
  ERAS: ['f.Kr.', 'e.Kr.'],
  ERANAMES: ['f.Kr.', 'e.Kr.'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
  STANDALONEMONTHS: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
  SHORTMONTHS: ['jan.', 'feb.', 'mars', 'apr.', 'mai', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des'],
  STANDALONESHORTMONTHS: ['jan.', 'feb.', 'mars', 'apr.', 'mai', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des'],
  WEEKDAYS: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  STANDALONEWEEKDAYS: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  SHORTWEEKDAYS: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.', 'søn.'],
  STANDALONESHORTWEEKDAYS: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.', 'søn.'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  SHORTQUARTERS: ['K1', 'K2', 'K3', 'K4'],
  QUARTERS: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'HH.mm',
    SHORT_DATETIME: 'dd.MM.yyyy HH.mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd.MM',
    MONTH_ABBR_DATE: 'd. MMM yyyy',
    LONG_DATE: 'd. MMMM yyyy',
    LONG_DATETIME: 'd. MMMM yyyy HH.mm',
    LONG_DAYOFWEEK: 'EEEE d. MMMM yyyy',
    TIME_INPUT: 'HH.mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}.[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale it_IT.
   */
};var it_IT = exports.it_IT = {
  ERAS: ['aC', 'dC'],
  ERANAMES: ['a.C.', 'd.C'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  STANDALONEMONTHS: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  SHORTMONTHS: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  WEEKDAYS: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
  STANDALONEWEEKDAYS: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1o trimestre', '2o trimestre', '3o trimestre', '4o trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'H.mm',
    SHORT_DATETIME: 'dd/MM/yyyy H.mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'dd MMMM yyyy',
    LONG_DATETIME: 'dd MMMM yyyy H.mm',
    LONG_DAYOFWEEK: 'EEEE, dd MMMM yyyy',
    TIME_INPUT: 'H.mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}.[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale it_CH.
   */
};var it_CH = exports.it_CH = {
  ERAS: ['aC', 'dC'],
  ERANAMES: ['a.C.', 'd.C'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  STANDALONEMONTHS: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  SHORTMONTHS: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  STANDALONESHORTMONTHS: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  WEEKDAYS: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
  STANDALONEWEEKDAYS: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  SHORTWEEKDAYS: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  STANDALONESHORTWEEKDAYS: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  NARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1o trimestre', '2o trimestre', '3o trimestre', '4o trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd.MMM.yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd.MM.yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd.MM.yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd.MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE, d MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}\\.[0-9]{2}\\.[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale nl_NL.
   */
};var nl_NL = exports.nl_NL = {
  ERAS: ['v. Chr.', 'n. Chr.'],
  ERANAMES: ['Voor Christus', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  STANDALONEMONTHS: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  SHORTMONTHS: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  STANDALONESHORTMONTHS: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  WEEKDAYS: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  STANDALONEWEEKDAYS: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  SHORTWEEKDAYS: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  STANDALONESHORTWEEKDAYS: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  NARROWWEEKDAYS: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
  STANDALONENARROWWEEKDAYS: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
  SHORTQUARTERS: ['K1', 'K2', 'K3', 'K4'],
  QUARTERS: ['1e kwartaal', '2e kwartaal', '3e kwartaal', '4e kwartaal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd-MM-yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd-MM-yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd-MM-yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd-MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}-[0-9]{2}-[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale nl_NL.
   */
};var nl_BE = exports.nl_BE = {
  ERAS: ['v. Chr.', 'n. Chr.'],
  ERANAMES: ['Voor Christus', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  STANDALONEMONTHS: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  SHORTMONTHS: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  STANDALONESHORTMONTHS: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  WEEKDAYS: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  STANDALONEWEEKDAYS: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  SHORTWEEKDAYS: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  STANDALONESHORTWEEKDAYS: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  NARROWWEEKDAYS: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
  STANDALONENARROWWEEKDAYS: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
  SHORTQUARTERS: ['K1', 'K2', 'K3', 'K4'],
  QUARTERS: ['1e kwartaal', '2e kwartaal', '3e kwartaal', '4e kwartaal'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'dd.MM.yyyy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'H:mm:ss', 'h:mm:ss a', 'H:mm', 'h:mm a'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/MM/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/MM/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale sv_SE.
   */
};var sv_SE = exports.sv_SE = {
  ERAS: ['aC', 'dC'],
  ERANAMES: ['a.C.', 'd.C'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
  STANDALONEMONTHS: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
  SHORTMONTHS: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  STANDALONESHORTMONTHS: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  WEEKDAYS: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
  STANDALONEWEEKDAYS: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
  SHORTWEEKDAYS: ['mån', 'tis', 'ons', 'tors', 'fre', 'lör', 'sön'],
  STANDALONESHORTWEEKDAYS: ['mån', 'tis', 'ons', 'tors', 'fre', 'lör', 'sön'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  SHORTQUARTERS: ['K1', 'K2', 'K3', 'K4'],
  QUARTERS: ['1:a kvartalet', '2:a kvartalet', '3:a kvartalet', '4:a kvartalet'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy/M/d',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'yyyy/M/d HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'M/d',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM yyyy',
    LONG_DATETIME: 'd MMMM yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d MMMM yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}/[0-9]{1,2}/[0-9]{1,2}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale pt_PT.
   */
};var pt_PT = exports.pt_PT = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['Antes de Cristo', 'Ano do Senhor'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  STANDALONEMONTHS: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  SHORTMONTHS: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  STANDALONESHORTMONTHS: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  WEEKDAYS: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
  STANDALONEWEEKDAYS: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
  SHORTWEEKDAYS: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  STANDALONESHORTWEEKDAYS: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  NARROWWEEKDAYS: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd/MM/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE, d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale pt_BR.
   */
};var pt_BR = exports.pt_BR = {
  ERAS: ['a.C.', 'd.C.'],
  ERANAMES: ['Antes de Cristo', 'Ano do Senhor'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  STANDALONEMONTHS: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  SHORTMONTHS: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  STANDALONESHORTMONTHS: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  WEEKDAYS: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
  STANDALONEWEEKDAYS: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
  SHORTWEEKDAYS: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  STANDALONESHORTWEEKDAYS: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  NARROWWEEKDAYS: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  STANDALONENARROWWEEKDAYS: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  SHORTQUARTERS: ['T1', 'T2', 'T3', 'T4'],
  QUARTERS: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'dd/MM/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd de MMMM de yyyy',
    LONG_DATETIME: 'd de MMMM de yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE, d de MMMM de yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale id_ID.
   */
};var id_ID = exports.id_ID = {
  ERAS: ['BCE', 'CE'],
  ERANAMES: ['BCE', 'CE'],
  NARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  STANDALONENARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  MONTHS: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  STANDALONEMONTHS: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  WEEKDAYS: ['Minggu', 'Senin', ' Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  STANDALONEWEEKDAYS: ['Minggu', 'Senin', ' Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  SHORTWEEKDAYS: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  STANDALONESHORTWEEKDAYS: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  NARROWWEEKDAYS: ['1', '2', '3', '4', '5', '6', '7'],
  STANDALONENARROWWEEKDAYS: ['1', '2', '3', '4', '5', '6', '7'],
  SHORTQUARTERS: ['K1', 'K2', 'K3', 'K4'],
  QUARTERS: ['kuartal pertama', 'kuartal kedua', 'kuartal ketiga', 'kuartal keempat'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'dd/MM/yyyy H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'dd MMMM yyyy',
    LONG_DATETIME: 'dd MMMM yyyy H:mm',
    LONG_DAYOFWEEK: 'EEEE, dd MMMM yyyy',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale ja_JP.
   */
};var ja_JP = exports.ja_JP = {
  ERAS: ['紀元前', '西暦'],
  ERANAMES: ['紀元前', '西暦'],
  NARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  STANDALONENARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  MONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONEMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  SHORTMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  STANDALONESHORTMONTHS: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  WEEKDAYS: ['日曜日', '月曜日', ' 火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  STANDALONEWEEKDAYS: ['日曜日', '月曜日', ' 火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  SHORTWEEKDAYS: ['日', '月', ' 火', ' 水', ' 木', '金', '土'],
  STANDALONESHORTWEEKDAYS: ['日', '月', ' 火', ' 水', ' 木', '金', '土'],
  NARROWWEEKDAYS: ['日', '月', ' 火', ' 水', ' 木', '金', '土'],
  STANDALONENARROWWEEKDAYS: ['日', '月', ' 火', ' 水', ' 木', '金', '土'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['第1四半期', '第2四半期', '第3四半期', '第4四半期'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'yyyy/MM/dd',
    SHORT_TIME: 'H:mm',
    SHORT_DATETIME: 'yyyy/MM/dd H:mm',
    SHORT_DATE_WITHOUT_YEAR: 'MM/dd',
    MONTH_ABBR_DATE: 'yyyy年M月d日',
    LONG_DATE: 'yyyy年M月d日',
    LONG_DATETIME: 'yyyy年M月d日 H:mm',
    LONG_DAYOFWEEK: 'yyyy年M月d日EEEE',
    TIME_INPUT: 'H:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[1-9][0-9]{3}/[0-9]{2}/[0-9]{2}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale ms_MY.
   */
};var ms_MY = exports.ms_MY = {
  ERAS: ['BCE', 'CE'],
  ERANAMES: ['S.M.', 'T.M.'],
  NARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  STANDALONENARROWMONTHS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  MONTHS: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
  STANDALONEMONTHS: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
  SHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Dis'],
  STANDALONESHORTMONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Dis'],
  WEEKDAYS: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
  STANDALONEWEEKDAYS: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
  SHORTWEEKDAYS: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
  STANDALONESHORTWEEKDAYS: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
  NARROWWEEKDAYS: ['1', '2', '3', '4', '5', '6', '7'],
  STANDALONENARROWWEEKDAYS: ['1', '2', '3', '4', '5', '6', '7'],
  SHORTQUARTERS: ['S1', 'S2', 'S3', 'S4'],
  QUARTERS: ['suku pertama', 'suku kedua', 'suku ketiga', 'suku keempat'],
  AMPMS: ['a.m.', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'dd/MM/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'dd/MM/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'dd/MM',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'dd MMM yyyy',
    LONG_DATETIME: 'dd MMM yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE d MMM yyyy',
    TIME_INPUT: 'h:mm a'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{2}/[0-9]{2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  //    /**
  //     * @private
  //     *
  //     * Date/time formatting symbols for locale fil_PH.
  //     */
  //    export const fil_PH = {
  //        ERAS:['BCE', 'CE'],
  //        ERANAMES:['BCE.', 'CE'],
  //        NARROWMONTHS:['E', 'P', 'M', 'A', 'M', 'H', 'H', 'A', 'S', 'O', 'N', 'D'],
  //        STANDALONENARROWMONTHS:['E', 'P', 'M', 'A', 'M', 'H', 'H', 'A', 'S', 'O', 'N', 'D'],
  //        MONTHS:['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'],
  //        STANDALONEMONTHS:['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'],
  //        SHORTMONTHS:['Ene', 'Peb', 'Mar', 'Abr', 'May', 'Hun', 'Hul', 'Ago', 'Set', 'Okt', 'Nob', 'Dis'],
  //        STANDALONESHORTMONTHS:['Ene', 'Peb', 'Mar', 'Abr', 'May', 'Hun', 'Hul', 'Ago', 'Set', 'Okt', 'Nob', 'Dis'],
  //        WEEKDAYS:['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
  //        STANDALONEWEEKDAYS:['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
  //        SHORTWEEKDAYS:['Lin', 'Lun', 'Mar', 'Mye', 'Huw', 'Bye', 'Sab'],
  //        STANDALONESHORTWEEKDAYS:['Lin', 'Lun', 'Mar', 'Mye', 'Huw', 'Bye', 'Sab'],
  //        NARROWWEEKDAYS:['L', 'M', 'M', 'H', 'B', 'S', 'L'],
  //        STANDALONENARROWWEEKDAYS:['L', 'M', 'M', 'H', 'B', 'S', 'L'],
  //        SHORTQUARTERS:['Q1', 'Q2', 'Q3', 'Q4'],
  //        QUARTERS:['Q1', 'Q2', 'Q3', 'Q4'],
  //        AMPMS:['a.m', 'p.m.'],
  //        DATEFORMATS:['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  //        TIMEFORMATS:['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  //        FIRSTDAYOFWEEK:6,
  //        WEEKENDRANGE:[5, 6],
  //        FIRSTWEEKCUTOFFDAY:5,
  //        PREFERREDTIMEFORMAT:'24 hour',
  //
  //        FORMAT:{
  //            SHORT_DATE:'M/d/yyyy',
  //            SHORT_TIME:'HH:mm',
  //            SHORT_DATETIME:'M/d/yyyy HH:mm',
  //            LONG_DATE:'MMMM d, yyyy',
  //            LONG_DATETIME:'MMMM d, yyyy HH:mm',
  //            LONG_DAYOFWEEK:'EEEE, MMMM d, yyyy',
  //            TIME_INPUT:"HH:mm"
  //        },
  //
  //        VALIDATION_REGEX:{
  //            DATE:new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
  //            TIME:new RegExp('^[0-9]{2}:[0-9]{2}$')
  //        }
  //    }

  /**
   * @private
   *
   * Date/time formatting symbols for locale si_LK
   */
};var si_LK = exports.si_LK = {
  ERAS: ['ක්‍රිස්තු', 'ක්‍රිස්තු වර්‍ෂ'],
  ERANAMES: ['ක්‍රි.පූ.', 'ක්‍රි.ව.'],
  NARROWMONTHS: ['ජ', 'පෙ', 'මා', 'අ', 'මැ', 'ජූ', 'ජූ', 'අ', 'සැ', 'ඔ', 'නො', 'දෙ'],
  STANDALONENARROWMONTHS: ['ජ', 'පෙ', 'මා', 'අ', 'මැ', 'ජූ', 'ජූ', 'අ', 'සැ', 'ඔ', 'නො', 'දෙ'],
  MONTHS: ['ජනවාර', ' පෙබරවාර', 'මාර්ත', 'අප්‍රේල්', 'මැයි', ' ජූන', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්'],
  STANDALONEMONTHS: ['ජනවාර', 'පෙබරවාර', 'මාර්ත', 'අප්‍රේල්', 'මැයි', ' ජූන', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්'],
  SHORTMONTHS: ['ජන', 'පෙබ', 'මාර්ත', 'අප්‍රේල', 'මැය', 'ජූන', 'ජූල', 'අගෝ', 'සැප', 'ඔක', 'නොවැ', 'දෙසැ'],
  STANDALONESHORTMONTHS: ['ජන', 'පෙබ', 'මාර්ත', 'අප්‍රේල', 'මැය', 'ජූන', 'ජූල', 'අගෝ', 'සැප', 'ඔක', 'නොවැ', 'දෙසැ'],
  WEEKDAYS: ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', ' බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
  STANDALONEWEEKDAYS: ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', ' බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
  SHORTWEEKDAYS: ['ඉරි', 'සඳු', 'අඟ', ' බදා', 'බ්‍රහ', 'සිකු', 'සෙන'],
  STANDALONESHORTWEEKDAYS: ['ඉරි', 'සඳු', 'අඟ', ' බදා', 'බ්‍රහ', 'සිකු', 'සෙන'],
  NARROWWEEKDAYS: ['ඉ', 'ස', 'අ', 'බ', 'බ්‍ර', 'සි', 'සෙ'],
  STANDALONENARROWWEEKDAYS: ['ඉ', 'ස', 'අ', 'බ', 'බ්‍ර', 'සි', 'සෙ'],
  SHORTQUARTERS: ['කාර්:1', 'කාර්:2', 'කාර්:3', 'කාර්:4'],
  QUARTERS: ['1 වන කාර්තුව', '2 වන කාර්තුව', '3 වන කාර්තුව', '4 වන කාර්තුව'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '12 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'd/M/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'yyyy MMM d',
    LONG_DATE: 'yyyy MMMM d',
    LONG_DATETIME: 'yyyy MMMM d h:mm a',
    LONG_DAYOFWEEK: 'EEEE, yyyy MMMM d',
    TIME_INPUT: 'h:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale th_TH.
   */
};var th_TH = exports.th_TH = {
  ERAS: ['ปีก่อนคริสต์ศักราช', 'คริสต์ศักราช'],
  ERANAMES: ['ปีก่อน ค.ศ.', 'ค.ศ.'],
  NARROWMONTHS: [' ม.ค.', 'ก.พ.', 'มี.ค.', 'ม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  STANDALONENARROWMONTHS: [' ม.ค.', 'ก.พ.', 'มี.ค.', 'ม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  MONTHS: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'ิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
  STANDALONEMONTHS: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'ิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
  SHORTMONTHS: [' ม.ค.', 'ก.พ.', 'มี.ค.', 'ม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  STANDALONESHORTMONTHS: [' ม.ค.', 'ก.พ.', 'มี.ค.', 'ม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  WEEKDAYS: ['ันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'ันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
  STANDALONEWEEKDAYS: ['ันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'ันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
  SHORTWEEKDAYS: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  STANDALONESHORTWEEKDAYS: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  NARROWWEEKDAYS: ['อ', 'จ', 'อ', 'พ', 'พ', 'ศ', 'ส'],
  STANDALONENARROWWEEKDAYS: ['อ', 'จ', 'อ', 'พ', 'พ', 'ศ', 'ส'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['ไตรมาส 1', 'ไตรมาส 2', 'ไตรมาส 3', 'ไตรมาส 4'],
  AMPMS: ['a.m', 'p.m.'],
  DATEFORMATS: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd/MMM/yyyy', 'dd/MM/yyyy'],
  TIMEFORMATS: ['h.mm.ss zzzz', 'H.mm.ss', 'H.mm'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '24 hour',

  FORMAT: {
    SHORT_DATE: 'd/M/yyyy',
    SHORT_TIME: 'HH:mm',
    SHORT_DATETIME: 'd/M/yyyy HH:mm',
    SHORT_DATE_WITHOUT_YEAR: 'd/M',
    MONTH_ABBR_DATE: 'd MMM yyyy',
    LONG_DATE: 'd MMMM G yyyy',
    LONG_DATETIME: 'd MMMM G yyyy HH:mm',
    LONG_DAYOFWEEK: 'EEEE d MMMM G yyyy',
    TIME_INPUT: 'HH:mm'
  },

  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{2}:[0-9]{2}$')
  }

  /**
   * @private
   *
   * Date/time formatting symbols for locale ko_KR.
   */
};var ko_KR = exports.ko_KR = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['기원전', '서기'],
  NARROWMONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  STANDALONENARROWMONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  MONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  STANDALONEMONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  SHORTMONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  STANDALONESHORTMONTHS: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  WEEKDAYS: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  STANDALONEWEEKDAYS: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  SHORTWEEKDAYS: ['일', '월', '화', '수', '목', '금', '토'],
  STANDALONESHORTWEEKDAYS: ['일', '월', '화', '수', '목', '금', '토'],
  NARROWWEEKDAYS: ['일', '월', '화', '수', '목', '금', '토'],
  STANDALONENARROWWEEKDAYS: ['일', '월', '화', '수', '목', '금', '토'],
  SHORTQUARTERS: ['1분기', '2분기', '3분기', '4분기'],
  QUARTERS: ['제 1/4분기', '제 2/4분기', '제 3/4분기', '제 4/4분기'],
  AMPMS: ['오전', '오후'],
  DATEFORMATS: ['y년 M월 d일 EEEE', 'y년 M월 d일', 'y. M. d.', 'yy. M. d.'],
  TIMEFORMATS: ['a h시 m분 s초 zzzz', 'a h시 m분 s초 z', 'a h:mm:ss', 'a h:mm'],
  DATETIMEFORMATS: ['{1} {0}', '{1} {0}', '{1} {0}', '{1} {0}'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 5,
  PREFERREDTIMEFORMAT: '12 hour', // current closure version not contains this field, make it the same as en_US

  FORMAT: {
    SHORT_DATE: 'M/d/yyyy',
    SHORT_TIME: 'h:mm a',
    SHORT_DATETIME: 'M/d/yyyy h:mm a',
    SHORT_DATE_WITHOUT_YEAR: 'M/d', // the same as en_US
    MONTH_ABBR_DATE: 'MMM d, yyyy',
    LONG_DATE: 'MMMM d, yyyy',
    LONG_DATETIME: 'MMMM d, yyyy h:mm a',
    LONG_DAYOFWEEK: 'EEEE, MMMM d',
    TIME_INPUT: 'h:mm a' // the same as en_US
  },

  // the same as en_US
  VALIDATION_REGEX: {
    DATE: new RegExp('^[0-9]{1,2}/[0-9]{1,2}/[1-9][0-9]{3}$'),
    TIME: new RegExp('^[0-9]{1,2}:[0-9]{2} a.m.|p.m.$')
  }
};