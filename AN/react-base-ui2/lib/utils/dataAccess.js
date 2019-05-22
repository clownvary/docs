'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);exports.

isImmutable = isImmutable;exports.



is = is;exports.



count = count;exports.



get = get;exports.



getIn = getIn;exports.






set = set;exports.







del = del;exports.







push = push;exports.







keys = keys;var _immutable = require('immutable');var _immutable2 = _interopRequireDefault(_immutable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function isImmutable(x) {return _immutable.Iterable.isIterable(x);}function is(x, y) {return _immutable2.default.is(x, y);}function count(x) {return isImmutable(x) ? x.size : x.length;}function get(x, k) {return isImmutable(x) ? x.get(k) : x[k];}function getIn(x) {for (var _len = arguments.length, ks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {ks[_key - 1] = arguments[_key];}if (isImmutable(x)) {return x.getIn(ks);}return ks.reduce(function (y, k) {return y[k];}, x);}function set(x, k, v) {if (isImmutable(x)) {return x.set(k, v);}x[k] = v;return x;}function del(x, i) {if (isImmutable(x)) {return x.delete(i);}x.splice(i, 1);return x;}function push(x, v) {if (isImmutable(x)) {return x.push(v);}x.push(v);return x;}function keys(x) {
  if (isImmutable(x)) {
    return x.keySeq();
  }
  return x.keys ? x.keys() : (0, _keys2.default)(x);
}