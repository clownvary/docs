'use strict';

exports.__esModule = true;
exports.dateTimeParserConfig = undefined;

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = dateTimeParser;

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isValid = function isValid(m, min, max) {
  var number = m && parseInt(m[0], 10);

  return number >= min && number <= max ? number : false;
};

/**
  * yyyy - 4 digit year <br>
  * <br>
  * MM - 2 digit month <br>
  * M - 1 or 2 digit month <br>
  * <br>
  * dd - 2 digit day <br>
  * d - 1 or 2 digit day <br>
  * <br>
  * a - am or pm <br>
  * <br>
  * HH - 2 digit hour 0-23 <br>
  * H - 1 or 2 digit hour 0-23 <br>
  * hh - 2 digit hour 1-12 <br>
  * h - 1 or 2 digit hour 1-12 <br>
  * <br>
  * KK - 2 digit hour 0-11 <br>
  * K - 1 or 2 digit hour 0-11 <br>
  * kk - 2 digit hour 1-24 <br>
  * k - 1 or 2 digit hour 1-24 <br>
  * <br>
  * mm - 2 digit minute <br>
  * m - 1 or 2 digit minute <br>
  * <br>
  * ss - 2 digit second <br>
  * s - 1 or 2 digit second <br>
  * <br>
  * SSS - 3 digit milli second <br>
  * S - 1, 2, or 3 digit milli second <br>
  *
*/
var dateTimeParserConfig = exports.dateTimeParserConfig = {
  yyyy: [function (v) {
    return v.match(/[1-9][0-9]{3}/);
  }, function (v) {
    return v && parseInt(v[0], 10);
  }],
  MM: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 0, 11);
  }],
  M: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 0, 11);
  }],
  dd: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 1, 31);
  }],
  d: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 1, 31);
  }],
  HH: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 0, 23);
  }],
  H: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 0, 23);
  }],
  hh: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 1, 12);
  }],
  h: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 1, 12);
  }],
  KK: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 0, 11);
  }],
  K: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 0, 11);
  }],
  kk: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 1, 24);
  }],
  k: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 1, 24);
  }],
  mm: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 0, 59);
  }],
  m: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 0, 59);
  }],
  ss: [function (v) {
    return v.match(/[0-9]{2}/);
  }, function (v) {
    return isValid(v, 0, 59);
  }],
  s: [function (v) {
    return v.match(/[0-9]{1,2}/);
  }, function (v) {
    return isValid(v, 0, 59);
  }],
  SSS: [function (v) {
    return v.match(/[0-9]{3}/);
  }, function (v) {
    return isValid(v, 0, 999);
  }],
  S: [function (v) {
    return v.match(/[0-9]{1,3}/);
  }, function (v) {
    return isValid(v, 0, 999);
  }],
  a: [function (v, symbol) {
    return v.match(new RegExp('(' + symbol.AMPMS.join('|') + ')'));
  }, function (v) {
    return v && v[0];
  }]
};

function dateTimeParser(symbol) {
  return function (value) {
    var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : symbol.FORMAT.SHORT_DATETIME;

    if (!template || !value) {
      return value;
    }

    var nextValue = value;
    var index = 0;
    var date = [];
    // template: yyyy年M月d日ah:mm, value: 2017年5月12日下午12:30 => [2017, 4, 12, 12, 30]
    // template: yyyy-MM-dd, value: 2017-05-12 => [2017, 4, 12]
    var tokens = (0, _keys2.default)(dateTimeParserConfig);

    // Loop all of the token keys
    for (var i = 0; i < tokens.length; i += 1) {
      var token = tokens[i];

      // Skip current loop if we don't find any token in the template
      if (template.indexOf(token) !== -1) {
        // Run the reducers for the token if found it in the template
        var reducer = _utils.reduceReducers.apply(undefined, dateTimeParserConfig[token]);
        var tokenValue = reducer(nextValue, symbol);

        // Remove the `tokenValue`
        nextValue = nextValue.replace(tokenValue, '');

        // Store the current `tokenValue` if it's truthy
        if (tokenValue) {
          // Handle `a` token
          if (!(0, _isInteger2.default)(tokenValue)) {
            if (tokenValue === symbol.AMPMS[1]) {
              if (date[3] !== 12) {
                date[3] += 12;
              }
            } else if (date[3] === 12) {
              date[3] = 0;
            }
          } else {
            date[index] = tokenValue;
            index += 1;
          }
        }
      }
    }
    // Substract one from `data[1]` as month is beginning with 0 for January to 11 for December.
    date[1] -= 1;

    return new (Function.prototype.bind.apply(Date, [null].concat(date)))();
  };
}