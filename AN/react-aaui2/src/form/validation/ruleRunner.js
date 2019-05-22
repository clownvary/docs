import ValidationResult from './ValidationResult'
import Rules from './rules'
import parseRules from './parseRules'

const hasOwnProperty = Object.prototype.hasOwnProperty
const ruleRunner = ({ l10n, rules = '' }) => validationResult => {
  const { name, value } = validationResult
  const parsedRules = parseRules(rules)

  for (let i = 0; i < parsedRules.length; i += 1) {
    const rule = parsedRules[i]
    const ruleName = rule.name
    const ruleParam = rule.param

    // Should pass truthy value in addition to `required`
    if (ruleName !== 'required' && !value) {
      return validationResult
    }

    if (
      ruleName &&
      hasOwnProperty.call(Rules, ruleName) &&
      !Rules[ruleName](value, ruleParam)
    ) {
      return new ValidationResult(name, value, l10n[ruleName] || l10n.invalid)
    }
  }

  return validationResult
}

export default ruleRunner
