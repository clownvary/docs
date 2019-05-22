'use strict';

exports.__esModule = true;
exports.filterValidProps = exports.omit = exports.cls = exports.reduceReducers = exports.identity = exports.noop = exports.filterProps = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

exports.interpolate = interpolate;
exports.debounce = debounce;
exports.shallowEqual = shallowEqual;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterProps = exports.filterProps = function filterProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    var propValue = void 0;

    if (Object.prototype.hasOwnProperty.call(props, name)) {
      var _extends2;

      propValue = props[name];

      return (0, _extends6.default)({}, filtered, (_extends2 = {}, _extends2[name] = propValue, _extends2));
    } else if (Object.prototype.hasOwnProperty.call(defaults, name)) {
      var _extends3;

      propValue = defaults[name];

      return (0, _extends6.default)({}, filtered, (_extends3 = {}, _extends3[name] = propValue, _extends3));
    }

    return (0, _extends6.default)({}, filtered);
  }, {});
};

var noop = exports.noop = function noop() {};
var identity = exports.identity = function identity(r) {
  return r;
};

var reduceReducers = exports.reduceReducers = function reduceReducers() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  return function (previous, current) {
    return reducers.reduce(function (p, r) {
      return r(p, current);
    }, previous);
  };
};

// Tag function for class template strings.
var cls = exports.cls = function cls(template) {
  for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    expressions[_key2 - 1] = arguments[_key2];
  }

  return template.reduce(function (accumulator, part, i) {
    return accumulator + expressions[i - 1] + part;
  }).replace(/\s+/g, ' ').trim();
};

function interpolate() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var str = args.shift();
  var context = args[0];
  var toString = Object.prototype.toString;

  /* eslint-disable no-nested-ternary */
  context = args.length === 1 ? context !== null && /[object Array]|[object Object]/.test(toString.call(context)) ? context : args : args;

  return str.replace(/{([\s\S]+?)}/g, function (match, interpolateStr) {
    var replacer = interpolateStr.split('.').reduce(function (acc, k) {
      return acc ? acc[k] : acc;
    }, context || {});

    if (toString.call(replacer) === '[object Function]') {
      replacer = replacer(interpolateStr);
    }

    /* eslint-disable no-void */
    return replacer === null || replacer === void 0 ? '' : replacer;
  });
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var _this = this;

  var timeout = void 0;
  var context = void 0;
  var args = void 0;

  var later = function later() {
    timeout = null;
    if (!immediate) func.apply(context, args);
  };

  return function () {
    for (var _len4 = arguments.length, restArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      restArgs[_key4] = arguments[_key4];
    }

    var callNow = immediate && !timeout;

    context = _this;
    args = restArgs;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

// Copy from https://git.io/vMr0D
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : (0, _typeof3.default)(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : (0, _typeof3.default)(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = (0, _keys2.default)(objA);
  var keysB = (0, _keys2.default)(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i += 1) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

var omit = exports.omit = function omit(obj) {
  var omitKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var result = {};
  var keys = (0, _keys2.default)(obj);

  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    // If not found in the `omitKeys`
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }

  return result;
};

var filterValidProps = exports.filterValidProps = function filterValidProps(obj) {
  var re = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /^(aria|data)-.+/;
  return obj && (0, _keys2.default)(obj).filter(function (key) {
    return re && re.test(key);
  }).reduce(function (res, key) {
    var _extends4;

    return (0, _extends6.default)({}, res, (_extends4 = {}, _extends4[key] = obj[key], _extends4));
  }, {});
};