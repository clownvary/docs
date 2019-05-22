import { reduceFields, tryJudgeFieldsValid } from 'form/utils'

it('reduceFields', () => {
  const fields = {
    name: {
      value: 'name',
    },
    age: {
      value: 1,
      errMsg: 'Toooooooooo',
    },
  }
  const { values, errors, isValid } = reduceFields(fields)

  expect(values).toMatchObject({
    name: 'name',
    age: 1,
  })
  expect(errors).toMatchObject({
    age: 'Toooooooooo',
  })
  expect(isValid === false).toBe(true)
})

it('reduceFields without passing fields', () => {
  const { isValid } = reduceFields()

  expect(isValid).toBe(true)
})

it('tryJudgeFieldsValid', () => {
  expect(tryJudgeFieldsValid()).toBe(true)
  expect(tryJudgeFieldsValid({ age: 'Toooooooooo' })).toBe(false)
  expect(tryJudgeFieldsValid({ address: { line1: 'Toooooooooo' } })).toBe(false)
})
