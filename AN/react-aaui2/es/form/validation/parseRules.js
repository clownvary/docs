import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import Rules from './rules';

/*
 * `required|min:2|max:10` =>
 * [{"name":"required"},{"name":"min","param":"2"},{"name":"max","param":"10"}]
 */
var matchers = _Object$keys(Rules).reduce(function (r, rule) {
  var _extends2;

  return _extends({}, r, (_extends2 = {}, _extends2[rule] = new RegExp(rule + '[^|]*'), _extends2));
}, {});

matchers.regexp = /regexp:\(.*\)/;

var parseRules = function parseRules() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return _Object$keys(matchers).reduce(function (acc, key) {
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

export default parseRules;