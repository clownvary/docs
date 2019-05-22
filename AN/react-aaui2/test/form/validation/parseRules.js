/* eslint-disable */
import parseRules from 'form/validation/parseRules'

it('should parse rules right', () => {
  expect(parseRules()).toMatchObject([])

  expect(parseRules('')).toMatchObject([])

  expect(parseRules('required')).toMatchObject([
    {
      name: 'required',
    },
  ])

  expect(
    parseRules('required|min:2|max:10|regexp:(\\d{5}|[a-z]\\d{4})'),
  ).toMatchObject([
    {
      name: 'required',
    },
    {
      name: 'min',
      param: '2',
    },
    {
      name: 'max',
      param: '10',
    },
    {
      name: 'regexp',
      param: '(\\d{5}|[a-z]\\d{4})',
    },
  ])
})
