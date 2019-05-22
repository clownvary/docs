import { ruleRunner, ValidationResult } from 'form/validation'
import L10n, { defaultValidationMsgKeys } from 'shared/L10n'

it('should work right without passing rules', () => {
  const validationResult = new ValidationResult('name')

  expect(ruleRunner({})(validationResult)).toMatchObject(validationResult)
})

it('rules: required', () => {
  const validationResult = new ValidationResult('name')
  const l10n = new L10n()
  const result = ruleRunner({ l10n, rules: 'required' })(validationResult)

  expect(result.errMsg === defaultValidationMsgKeys.required).toBe(true)
})

it('rules: min', () => {
  const validationResult = new ValidationResult('name', 'Hello')
  const l10n = new L10n()
  const result = ruleRunner({ l10n, rules: 'min:10' })(validationResult)

  expect(result.errMsg === defaultValidationMsgKeys.min).toBe(true)
})

it('rules: max', () => {
  const validationResult = new ValidationResult('name', 'Hello')
  const l10n = new L10n()
  const result = ruleRunner({ l10n, rules: 'max:2' })(validationResult)

  expect(result.errMsg === defaultValidationMsgKeys.max).toBe(true)
})

it('rules: invalid', () => {
  const validationResult = new ValidationResult('name', 'Hello')
  const l10n = new L10n()
  const result = ruleRunner({ l10n, rules: 'url' })(validationResult)

  expect(result.errMsg === defaultValidationMsgKeys.invalid).toBe(true)
})

it('rules: invalid (passing falsy value)', () => {
  const validationResult = new ValidationResult('name', '')
  const l10n = new L10n()
  const result = ruleRunner({ l10n, rules: 'url' })(validationResult)

  expect(result).toMatchObject(validationResult)
})
