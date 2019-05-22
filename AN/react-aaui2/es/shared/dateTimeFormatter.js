import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import { interpolate } from './utils';

var cutDigit = function cutDigit(size) {
  return function (number) {
    var length = number.toString().length;

    return length < size ? '000000'.substr(0, size - length) + number : number % Math.pow(10, size); // eslint-disable-line no-mixed-operators
  };
};

var dateTimeConfig = {
  yyyy: [function (d) {
    return d.getFullYear();
  }],
  yy: [function (d) {
    return d.getFullYear();
  }, cutDigit(2)],
  MMMM: [function (d) {
    return d.getMonth();
  }, function (i, symbol) {
    return symbol.MONTHS[i];
  }],
  MMM: [function (d) {
    return d.getMonth();
  }, function (i, symbol) {
    return symbol.SHORTMONTHS[i];
  }],
  MM: [function (d) {
    return d.getMonth() + 1;
  }, cutDigit(2)],
  M: [function (d) {
    return d.getMonth() + 1;
  }],
  EEEE: [function (d) {
    return d.getDay();
  }, function (i, symbol) {
    return symbol.WEEKDAYS[i];
  }],
  EEE: [function (d) {
    return d.getDay();
  }, function (i, symbol) {
    return symbol.SHORTWEEKDAYS[i];
  }],
  dd: [function (d) {
    return d.getDate();
  }, cutDigit(2)],
  d: [function (d) {
    return d.getDate();
  }],
  KK: [function (d) {
    return d.getHours() % 12;
  }, cutDigit(2)],
  K: [function (d) {
    return d.getHours() % 12;
  }],
  kk: [function (d) {
    return d.getHours() + 1;
  }, cutDigit(2)],
  k: [function (d) {
    return d.getHours() + 1;
  }],
  HH: [function (d) {
    return d.getHours();
  }, cutDigit(2)],
  H: [function (d) {
    return d.getHours();
  }],
  hh: [function (d) {
    return d.getHours() % 12 || 12;
  }, cutDigit(2)],
  h: [function (d) {
    return d.getHours() % 12 || 12;
  }],
  mm: [function (d) {
    return d.getMinutes();
  }, cutDigit(2)],
  m: [function (d) {
    return d.getMinutes();
  }],
  ss: [function (d) {
    return d.getSeconds();
  }, cutDigit(2)],
  s: [function (d) {
    return d.getSeconds();
  }],
  SSS: [function (d) {
    return d.getMilliseconds();
  }, cutDigit(3)],
  S: [function (d) {
    return d.getMilliseconds();
  }],
  a: [function (d) {
    return d.getHours() < 12 || d.getHours() === 24 ? 0 : 1;
  }, function (i, symbol) {
    return symbol.AMPMS[i];
  }]
};

var ruleRunner = function ruleRunner(symbol) {
  return function (dateTime, token) {
    var fns = dateTimeConfig[token];
    return fns.reduce(function (acc, fn) {
      return fn(acc, symbol);
    }, dateTime);
  };
};

var keyRegs = _Object$keys(dateTimeConfig).reduce(function (acc, key) {
  var _extends2;

  return _extends({}, acc, (_extends2 = {}, _extends2[key] = new RegExp(key, 'g'), _extends2));
}, {});

export default function dateTimeFormatter(symbol) {
  var runRule = ruleRunner(symbol);
  return function (template) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

    if (!date || (typeof date === 'undefined' ? 'undefined' : _typeof(date)) !== 'object') {
      return date;
    }

    /**
     * The template will be replaced by placeholder based on the tokens (like 'yyyy' or 'dd').
     * params will be filled with the formated data (like '2017' or '31').
     *
     * Example: template is 'MM/d/yyyy hh:mm yyyy', date is '2017/12/01 11:30 a.m.'
     *          newTemp will be '{1}/{2}/{0} {3}:{4} {0}'
     *          params will be ['2017', '12', '1', '11', '30']
     */
    var params = [];
    var newTemp = _Object$keys(dateTimeConfig).reduce(function (acc, key) {
      if (acc.indexOf(key) > -1) {
        params.push(runRule(date, key));
        return acc.replace(keyRegs[key], '{' + (params.length - 1) + '}');
      }
      return acc;
    }, template || symbol.FORMAT.LONG_DATETIME);
    return interpolate(newTemp, params);
  };
}