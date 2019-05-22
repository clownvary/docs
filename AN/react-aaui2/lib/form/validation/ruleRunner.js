'use strict';

exports.__esModule = true;

var _ValidationResult = require('./ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _parseRules = require('./parseRules');

var _parseRules2 = _interopRequireDefault(_parseRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;
var ruleRunner = function ruleRunner(_ref) {
  var l10n = _ref.l10n,
      _ref$rules = _ref.rules,
      rules = _ref$rules === undefined ? '' : _ref$rules;
  return function (validationResult) {
    var name = validationResult.name,
        value = validationResult.value;

    var parsedRules = (0, _parseRules2.default)(rules);

    for (var i = 0; i < parsedRules.length; i += 1) {
      var rule = parsedRules[i];
      var ruleName = rule.name;
      var ruleParam = rule.param;

      // Should pass truthy value in addition to `required`
      if (ruleName !== 'required' && !value) {
        return validationResult;
      }

      if (ruleName && hasOwnProperty.call(_rules2.default, ruleName) && !_rules2.default[ruleName](value, ruleParam)) {
        return new _ValidationResult2.default(name, value, l10n[ruleName] || l10n.invalid);
      }
    }

    return validationResult;
  };
};

exports.default = ruleRunner;
module.exports = exports['default'];