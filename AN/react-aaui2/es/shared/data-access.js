import _Object$keys from "babel-runtime/core-js/object/keys";
import _extends from "babel-runtime/helpers/extends";
export function count(x) {
  return x.length;
}

export function get(x, k) {
  return x[k];
}

export function getIn(x) {
  for (var _len = arguments.length, ks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ks[_key - 1] = arguments[_key];
  }

  return ks.reduce(function (y, k) {
    return y[k];
  }, x);
}

export function set(x, k, v) {
  var _extends2;

  if (Array.isArray(x)) {
    var y = x;
    y[k] = v;
    return y;
  }

  return _extends({}, x, (_extends2 = {}, _extends2[k] = v, _extends2));
}

export function del(x, i) {
  x.splice(i, 1);
  return x;
}

export function push(x, v) {
  x.push(v);
  return x;
}

export function keys(x) {
  return _Object$keys(x);
}