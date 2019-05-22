import ValidationResult from './ValidationResult';
import Rules from './rules';
import parseRules from './parseRules';

var hasOwnProperty = Object.prototype.hasOwnProperty;
var ruleRunner = function ruleRunner(_ref) {
  var l10n = _ref.l10n,
      _ref$rules = _ref.rules,
      rules = _ref$rules === undefined ? '' : _ref$rules;
  return function (validationResult) {
    var name = validationResult.name,
        value = validationResult.value;

    var parsedRules = parseRules(rules);

    for (var i = 0; i < parsedRules.length; i += 1) {
      var rule = parsedRules[i];
      var ruleName = rule.name;
      var ruleParam = rule.param;

      // Should pass truthy value in addition to `required`
      if (ruleName !== 'required' && !value) {
        return validationResult;
      }

      if (ruleName && hasOwnProperty.call(Rules, ruleName) && !Rules[ruleName](value, ruleParam)) {
        return new ValidationResult(name, value, l10n[ruleName] || l10n.invalid);
      }
    }

    return validationResult;
  };
};

export default ruleRunner;