import _Object$keys from 'babel-runtime/core-js/object/keys';
import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
export var filterProps = function filterProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    var propValue = void 0;

    if (Object.prototype.hasOwnProperty.call(props, name)) {
      var _extends2;

      propValue = props[name];

      return _extends({}, filtered, (_extends2 = {}, _extends2[name] = propValue, _extends2));
    } else if (Object.prototype.hasOwnProperty.call(defaults, name)) {
      var _extends3;

      propValue = defaults[name];

      return _extends({}, filtered, (_extends3 = {}, _extends3[name] = propValue, _extends3));
    }

    return _extends({}, filtered);
  }, {});
};

export var noop = function noop() {};
export var identity = function identity(r) {
  return r;
};

export var reduceReducers = function reduceReducers() {
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
export var cls = function cls(template) {
  for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    expressions[_key2 - 1] = arguments[_key2];
  }

  return template.reduce(function (accumulator, part, i) {
    return accumulator + expressions[i - 1] + part;
  }).replace(/\s+/g, ' ').trim();
};

export function interpolate() {
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
export function debounce(func, wait, immediate) {
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
export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = _Object$keys(objA);
  var keysB = _Object$keys(objB);

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

export var omit = function omit(obj) {
  var omitKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var result = {};
  var keys = _Object$keys(obj);

  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    // If not found in the `omitKeys`
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }

  return result;
};

export var filterValidProps = function filterValidProps(obj) {
  var re = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /^(aria|data)-.+/;
  return obj && _Object$keys(obj).filter(function (key) {
    return re && re.test(key);
  }).reduce(function (res, key) {
    var _extends4;

    return _extends({}, res, (_extends4 = {}, _extends4[key] = obj[key], _extends4));
  }, {});
};