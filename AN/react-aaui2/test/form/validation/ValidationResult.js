/* eslint-disable */
import ValidationResult from 'form/validation/ValidationResult'

it('Validation result should have a name value', () => {
  expect(() => {
    new ValidationResult()
  }).toThrowError('Name should not be empty!')
})

it('Validation result should return empty string if set undefined', () => {
  const result = new ValidationResult('name')

  expect(result.name === 'name').toBe(true)
  expect(result.value === '').toBe(true)
  expect(result.errMsg === '').toBe(true)
})

it('should could have default value and errMsg', () => {
  const result = new ValidationResult('name')

  expect(result.name === 'name').toBe(true)
  expect(result.value === '').toBe(true)
  expect(result.errMsg === '').toBe(true)
})

it('should could accpet null or undefined as value', () => {
  let result = new ValidationResult('name', null, 'errMsg')

  expect(result.name === 'name').toBe(true)
  expect(result.value === null).toBe(true)
  expect(result.errMsg === 'errMsg').toBe(true)

  result = new ValidationResult('name', undefined, 'errMsg')

  expect(result.name === 'name').toBe(true)
  expect(result.value === '').toBe(true)
  expect(result.errMsg === 'errMsg').toBe(true)
})

it('Validation result value should return as expected', () => {
  const result = new ValidationResult('name', 'value', 'errMsg')

  expect(result.name === 'name').toBe(true)
  expect(result.value === 'value').toBe(true)
  expect(result.errMsg === 'errMsg').toBe(true)
})
