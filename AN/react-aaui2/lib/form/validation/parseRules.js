'use strict';

exports.__esModule = true;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * `required|min:2|max:10` =>
 * [{"name":"required"},{"name":"min","param":"2"},{"name":"max","param":"10"}]
 */
var matchers = (0, _keys2.default)(_rules2.default).reduce(function (r, rule) {
  var _extends2;

  return (0, _extends4.default)({}, r, (_extends2 = {}, _extends2[rule] = new RegExp(rule + '[^|]*'), _extends2));
}, {});

matchers.regexp = /regexp:\(.*\)/;

var parseRules = function parseRules() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _keys2.default)(matchers).reduce(function (acc, key) {
    var rule = rules.match(matchers[key]);
    if (rule) {
      var _rule$0$split = rule[0].split(':'),
          name = _rule$0$split[0],
          param = _rule$0$split[1];

      return param ? [].concat(acc, [{ name: name, param: param }]) : [].concat(acc, [{ name: name }]);
    }
    return acc;
  }, []);
};

exports.default = parseRules;
module.exports = exports['default'];