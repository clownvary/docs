"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

exports.count = count;
exports.get = get;
exports.getIn = getIn;
exports.set = set;
exports.del = del;
exports.push = push;
exports.keys = keys;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function count(x) {
  return x.length;
}

function get(x, k) {
  return x[k];
}

function getIn(x) {
  for (var _len = arguments.length, ks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ks[_key - 1] = arguments[_key];
  }

  return ks.reduce(function (y, k) {
    return y[k];
  }, x);
}

function set(x, k, v) {
  var _extends2;

  if (Array.isArray(x)) {
    var y = x;
    y[k] = v;
    return y;
  }

  return (0, _extends4.default)({}, x, (_extends2 = {}, _extends2[k] = v, _extends2));
}

function del(x, i) {
  x.splice(i, 1);
  return x;
}

function push(x, v) {
  x.push(v);
  return x;
}

function keys(x) {
  return (0, _keys2.default)(x);
}